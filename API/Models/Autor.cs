using System.ComponentModel.DataAnnotations.Schema; 
using System.ComponentModel.DataAnnotations; 

namespace Models
{
    [Table("Autor")]
    public class Autor
    {
        [Key]
        [Column("AutorId")]
        public int AutorId { get; set; }
        
        [Required]
        [Column("Ime")]
        [MaxLength(50)]
        public string Ime { get; set; }

        [Required]
        [Column("Prezime")]
        [MaxLength(50)]
        public string Prezime { get; set; }
        
        [Column("GodinaRodjenja")]
        [Range(-2000,2022)]
        public int GodinaRodjenja { get; set; }

        public Biblioteka Biblioteka { get; set; }
    }
}
