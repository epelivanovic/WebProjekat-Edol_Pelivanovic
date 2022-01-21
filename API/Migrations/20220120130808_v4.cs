using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class v4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BibliotekaKnjiga");

            migrationBuilder.AddColumn<int>(
                name: "BibliotekaId",
                table: "Knjiga",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Knjiga_BibliotekaId",
                table: "Knjiga",
                column: "BibliotekaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Knjiga_Biblioteka_BibliotekaId",
                table: "Knjiga",
                column: "BibliotekaId",
                principalTable: "Biblioteka",
                principalColumn: "BibliotekaId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Knjiga_Biblioteka_BibliotekaId",
                table: "Knjiga");

            migrationBuilder.DropIndex(
                name: "IX_Knjiga_BibliotekaId",
                table: "Knjiga");

            migrationBuilder.DropColumn(
                name: "BibliotekaId",
                table: "Knjiga");

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
    }
}
