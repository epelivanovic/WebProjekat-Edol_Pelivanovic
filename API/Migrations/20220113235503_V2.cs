using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class V2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BrojKnjiga",
                table: "Biblioteka");

            migrationBuilder.AddColumn<string>(
                name: "Naziv",
                table: "Biblioteka",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Naziv",
                table: "Biblioteka");

            migrationBuilder.AddColumn<int>(
                name: "BrojKnjiga",
                table: "Biblioteka",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
