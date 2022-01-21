using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class BibliotekaContext: DbContext
    {
        public DbSet<Knjiga> Knjige{get; set;}
        public DbSet<Autor> Autori{get; set;}
        public DbSet<Biblioteka> Biblioteke{get; set;}
        public DbSet<Zanr> Zanrovi{get; set;}

        public BibliotekaContext(DbContextOptions options) : base(options){}
    }
}
