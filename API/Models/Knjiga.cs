using System.ComponentModel.DataAnnotations.Schema; 
using System.ComponentModel.DataAnnotations;
namespace Models
{
    [Table("Knjiga")]
    public class Knjiga
    {
        [Key]
        [Column("KnjigaId")]
        public int KnjigaId { get; set; }
        
        [Required]
        [Column("Naziv")]
        [MaxLength(50)]
        public string Naziv { get; set; }
        
        [Column("GodinaIzdavanja")]
        [Range(-2000,2022)]
        public int GodinaIzdavanja { get; set; }
        
        public bool Procitano { get; set; }

        public Zanr Zanr { get; set; }         
        
        public Autor Autor { get; set; }

        public Biblioteka Biblioteka { get; set; }
    }
}
