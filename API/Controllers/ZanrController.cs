using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ZanrController : ControllerBase
    {
        public BibliotekaContext Context;
        public ZanrController(BibliotekaContext _context)
        {
            Context = _context;
        }

        [HttpGet]
        [Route("GetZanrovi/{bibliotekaId}")]
        public async Task<List<Zanr>> PreuzmiZanrove(int bibliotekaId)
        {
            return await Context.Zanrovi.Where(a => a.Biblioteka.BibliotekaId == bibliotekaId).ToListAsync();
        }

        [Route("AddZanr/{bibliotekaId}")]
        [HttpPost]
        public async Task<ActionResult> DodajZanr([FromBody] Zanr zanr, int bibliotekaId)
        {
            if (bibliotekaId == 0)
            {
                return BadRequest("Biblioteka nije validna");
            }
            if(zanr == null)
            {
                return BadRequest("Zanr nije validan");
            }
            else
            {
                try
                {
                    var biblioteka = await Context.Biblioteke.Where(b => b.BibliotekaId == bibliotekaId).FirstOrDefaultAsync();
                    if (biblioteka != null)
                    {
                        zanr.Biblioteka = biblioteka;
                    }
                    Context.Zanrovi.Add(zanr);
                    await Context.SaveChangesAsync();
                    return Ok("Zanr je dodat");
                }
                catch(Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    
        [Route("UpdateZanr")]
        [HttpPut]
        public async Task<ActionResult> IzmeniZanr([FromBody] Zanr zanr)
        {
            if(zanr == null)
            {
                return BadRequest("Zanr nije validan");
            }
            else
            {
                try
                {
                   var stariZanr = await Context.Zanrovi.FindAsync(zanr.ZanrId);
                    if(stariZanr == null)
                         return StatusCode(402);

                    stariZanr.Naziv = zanr.Naziv;
                    stariZanr.Opis = zanr.Opis;
                    Context.Zanrovi.Update(stariZanr);
                    await Context.SaveChangesAsync();
                    return Ok("Zanr je izmenjen");
                }
                catch(Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [Route("DeleteZanr/{zanrId}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiZanr(int zanrId)
        {
            if(zanrId == 0)
            {
                return BadRequest("Zanr nije validan");
            }
            else
            {
                try
                {
                    var zanr = await Context.Zanrovi.Where(a => a.ZanrId == zanrId).FirstOrDefaultAsync();

                     var knjige =await Context.Knjige
                         .Include(a => a.Autor)
                         .Include(a => a.Zanr)
                         .ToListAsync();
                    if(knjige.Any(n=> n.Zanr.ZanrId == zanr.ZanrId)) return StatusCode(403);

                    if(zanr == null)
                         return StatusCode(402);
                    Context.Zanrovi.Remove(zanr);
                    await Context.SaveChangesAsync();
                    return Ok("Zanr je obrisan");
                }
                catch(Exception ex)
                {
                    return BadRequest(ex.InnerException);
                }
            }
        }
    }
}
