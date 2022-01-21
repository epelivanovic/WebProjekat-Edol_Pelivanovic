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
    public class AutorController : ControllerBase
    {
        public BibliotekaContext Context;
        public AutorController(BibliotekaContext _context)
        {
            Context = _context;
        }

        [HttpGet]
        [Route("GetAutori/{bibliotekaId}")]
        public async Task<List<Autor>> PreuzmiAutore(int bibliotekaId)
        {
            return await Context.Autori.Where(a => a.Biblioteka.BibliotekaId == bibliotekaId).ToListAsync();
        }

        [Route("AddAutor/{bibliotekaId}")]
        [HttpPost]
        public async Task<ActionResult> DodajAutora([FromBody] Autor autor, int bibliotekaId)
        {
            if (bibliotekaId == 0)
            {
                return BadRequest("Biblioteka nije validna");
            }
            if (autor == null)
            {
                return BadRequest("Autor nije validan");
            }
            else
            {
                try
                {
                    var biblioteka = await Context.Biblioteke.Where(b => b.BibliotekaId == bibliotekaId).FirstOrDefaultAsync();
                    if (biblioteka != null)
                    {
                        autor.Biblioteka = biblioteka;
                    }
                    Context.Autori.Add(autor);
                    await Context.SaveChangesAsync();
                    return Ok("Autor je dodat");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [Route("UpdateAutor")]
        [HttpPut]
        public async Task<ActionResult> IzmeniAutora([FromBody] Autor autor)
        {
            if (autor == null)
            {
                return BadRequest("Autor nije validan");
            }
            else
            {
                try
                {
                    var stariAutor = await Context.Autori.FindAsync(autor.AutorId);
                    if (stariAutor == null)
                        return StatusCode(402);

                    stariAutor.Ime = autor.Ime;
                    stariAutor.Prezime = autor.Prezime;
                    stariAutor.GodinaRodjenja = autor.GodinaRodjenja;
                    Context.Autori.Update(stariAutor);
                    await Context.SaveChangesAsync();
                    return Ok("Autor je izmenjen");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [Route("DeleteAutor/{autorId}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiAutora(int autorId)
        {
            if (autorId == 0)
            {
                return BadRequest("Autor nije validan");
            }
            else
            {
                try
                {
                    var autor = await Context.Autori.Where(a => a.AutorId == autorId).FirstOrDefaultAsync();

                    var knjige = await Context.Knjige
                         .Include(a => a.Autor)
                         .Include(a => a.Zanr)
                         .ToListAsync();
                    if (knjige.Any(n => n.Autor.AutorId == autor.AutorId)) return StatusCode(403);

                    if (autor == null)
                        return StatusCode(402);
                    Context.Autori.Remove(autor);
                    await Context.SaveChangesAsync();
                    return Ok("Autor je obrisan");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.InnerException);
                }
            }
        }
    }
}
