using System.ComponentModel.DataAnnotations.Schema; 
using System.ComponentModel.DataAnnotations; 
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Biblioteka")]
    public class Biblioteka
    {
        [Key]
        [Column("BibliotekaId")]
        public int BibliotekaId { get; set; }
        
        [Column("Naziv")]
        public string Naziv { get; set; }

        [JsonIgnore]
        public List<Knjiga> Knjige {get; set; }

        [JsonIgnore]
        public List<Autor> Autori {get; set; }

        [JsonIgnore]
        public List<Zanr> Zanrovi {get; set; }
    }
}
