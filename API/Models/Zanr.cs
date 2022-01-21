using System.ComponentModel.DataAnnotations.Schema; 
using System.ComponentModel.DataAnnotations; 

namespace Models
{
    [Table("Zanr")]
    public class Zanr
    {
        [Key]
        [Column("ZanrId")]
        public int ZanrId { get; set; }
        
        [Column("Naziv")]
        public string Naziv { get; set; }

        [Column("Opis")]
        public string Opis { get; set; }

        public Biblioteka Biblioteka { get; set; }
    }
}
