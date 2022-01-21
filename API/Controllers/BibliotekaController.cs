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
    public class BibliotekaController : ControllerBase
    {
        public BibliotekaContext Context;
        public BibliotekaController(BibliotekaContext _context)
        {
            Context = _context;
        }

        [HttpGet]
        [Route("GetBiblioteke")]
        public async Task<List<Biblioteka>> PreuzmiBiblioteke()
        {
            return await Context.Biblioteke.ToListAsync();
        }

        [HttpGet]
        [Route("GetBiblioteka/{bibliotekaId}")]
        public async Task<Biblioteka> PreuzmiBiblioteku(int bibliotekaId)
        {
           return await Context.Biblioteke.Where(k => k.BibliotekaId == bibliotekaId).FirstOrDefaultAsync();
        }

        [Route("AddBiblioteka")]
        [HttpPost]
        public async Task<ActionResult> DodajBiblioteku([FromBody] Biblioteka biblioteka)
        {
            if(biblioteka == null)
            {
                return BadRequest("Zanr nije validan");
            }
            else
            {
                try
                {
                    Context.Biblioteke.Add(biblioteka);
                    await Context.SaveChangesAsync();
                    return Ok("Biblioteka je dodata");
                }
                catch(Exception ex)
                {
                    return BadRequest(ex.InnerException);
                }
            }
        }
    }
}
