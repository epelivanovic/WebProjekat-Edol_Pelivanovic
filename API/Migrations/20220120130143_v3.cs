using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class v3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BibliotekaKnjiga",
                columns: table => new
                {
                    BibliotekeBibliotekaId = table.Column<int>(type: "int", nullable: false),
                    KnjigeKnjigaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BibliotekaKnjiga", x => new { x.BibliotekeBibliotekaId, x.KnjigeKnjigaId });
                    table.ForeignKey(
                        name: "FK_BibliotekaKnjiga_Biblioteka_BibliotekeBibliotekaId",
                        column: x => x.BibliotekeBibliotekaId,
                        principalTable: "Biblioteka",
                        principalColumn: "BibliotekaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BibliotekaKnjiga_Knjiga_KnjigeKnjigaId",
                        column: x => x.KnjigeKnjigaId,
                        principalTable: "Knjiga",
                        principalColumn: "KnjigaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BibliotekaKnjiga_KnjigeKnjigaId",
                table: "BibliotekaKnjiga",
                column: "KnjigeKnjigaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BibliotekaKnjiga");
        }
    }
}
