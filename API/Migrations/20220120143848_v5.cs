using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class v5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BibliotekaId",
                table: "Zanr",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "BibliotekaId",
                table: "Autor",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Zanr_BibliotekaId",
                table: "Zanr",
                column: "BibliotekaId");

            migrationBuilder.CreateIndex(
                name: "IX_Autor_BibliotekaId",
                table: "Autor",
                column: "BibliotekaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Autor_Biblioteka_BibliotekaId",
                table: "Autor",
                column: "BibliotekaId",
                principalTable: "Biblioteka",
                principalColumn: "BibliotekaId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Zanr_Biblioteka_BibliotekaId",
                table: "Zanr",
                column: "BibliotekaId",
                principalTable: "Biblioteka",
                principalColumn: "BibliotekaId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Autor_Biblioteka_BibliotekaId",
                table: "Autor");

            migrationBuilder.DropForeignKey(
                name: "FK_Zanr_Biblioteka_BibliotekaId",
                table: "Zanr");

            migrationBuilder.DropIndex(
                name: "IX_Zanr_BibliotekaId",
                table: "Zanr");

            migrationBuilder.DropIndex(
                name: "IX_Autor_BibliotekaId",
                table: "Autor");

            migrationBuilder.DropColumn(
                name: "BibliotekaId",
                table: "Zanr");

            migrationBuilder.DropColumn(
                name: "BibliotekaId",
                table: "Autor");
        }
    }
}
