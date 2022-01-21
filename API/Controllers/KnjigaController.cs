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
    public class KnjigaController : ControllerBase
    {
        public BibliotekaContext Context;
        public KnjigaController(BibliotekaContext _context)
        {
            Context = _context;
        }

        [HttpGet]
        [Route("GetKnjige/{bibliotekaId}")]
        public async Task<List<Knjiga>> PreuzmiKnjige(int bibliotekaId)
        {
            return await Context.Knjige
                         .Where(a => a.Biblioteka.BibliotekaId == bibliotekaId)
                         .Include(a => a.Autor)
                         .Include(a => a.Zanr)
                         .ToListAsync();
        }

        [Route("AddKnjiga/{autorId}/{zanrId}/{bibliotekaId}")]
        [HttpPost]
        public async Task<ActionResult> DodajKnjigu([FromBody] Knjiga knjiga, int autorId, int zanrId, int bibliotekaId)
        {
            Biblioteka biblioteka;
            if (knjiga == null)
            {
                return BadRequest("Knjiga nije validna");
            }
            if (bibliotekaId == 0)
            {
                return BadRequest("Nepostojeca biblioteka");
            }
            else
            {
                biblioteka = await Context.Biblioteke.Where(b => b.BibliotekaId == bibliotekaId).FirstOrDefaultAsync();
                if (biblioteka != null)
                {
                    knjiga.Biblioteka = biblioteka;
                }
            }
            try
            {
                if (autorId != 0)
                {
                    var autor = await Context.Autori.Where(a => a.AutorId == autorId).FirstOrDefaultAsync();
                    if (autor != null)
                    {
                        knjiga.Autor = autor;
                    }
                }
                if (zanrId != 0)
                {
                    var zanr = await Context.Zanrovi.Where(z => z.ZanrId == zanrId).FirstOrDefaultAsync();
                    if (zanr != null)
                    {
                        knjiga.Zanr = zanr;
                    }
                }
                Context.Knjige.Add(knjiga);
                await Context.SaveChangesAsync();
                return Ok("Knjiga je dodata");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("UpdateKnjiga/{autorId}/{zanrId}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniKnjigu([FromBody] Knjiga knjiga, int autorId, int zanrId)
        {
            if (knjiga == null)
            {
                return BadRequest("Knjiga nije validna");
            }
            else
            {
                try
                {
                    if (autorId != 0)
                    {
                        var autor = await Context.Autori.Where(a => a.AutorId == autorId).FirstOrDefaultAsync();
                        if (autor != null)
                        {
                            knjiga.Autor = autor;
                        }
                    }
                    if (zanrId != 0)
                    {
                        var zanr = await Context.Zanrovi.Where(z => z.ZanrId == zanrId).FirstOrDefaultAsync();
                        if (zanr != null)
                        {
                            knjiga.Zanr = zanr;
                        }
                    }

                    var staraKnjiga = await Context.Knjige.FindAsync(knjiga.KnjigaId);
                    if (staraKnjiga == null)
                        return StatusCode(402);

                    staraKnjiga.Naziv = knjiga.Naziv;
                    staraKnjiga.GodinaIzdavanja = knjiga.GodinaIzdavanja;
                    staraKnjiga.Autor = knjiga.Autor;
                    staraKnjiga.Zanr = knjiga.Zanr;
                    staraKnjiga.Procitano = knjiga.Procitano;
                    Context.Knjige.Update(staraKnjiga);
                    await Context.SaveChangesAsync();
                    return Ok("Knjiga je izmenjena");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        [Route("DeleteKnjiga/{knjigaId}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiKnjigu(int knjigaId)
        {
            if (knjigaId == 0)
            {
                return BadRequest("Knjiga nije validna");
            }
            else
            {
                try
                {
                    var knjiga = await Context.Knjige.Where(k => k.KnjigaId == knjigaId).FirstOrDefaultAsync();
                    if (knjiga == null)
                        return StatusCode(402);
                    Context.Knjige.Remove(knjiga);
                    await Context.SaveChangesAsync();
                    return Ok("Knjiga je obrisana");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
