using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ElectronicPrescription.Migrations
{
    public partial class AddModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DrugId",
                table: "Presentation",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MedicineId",
                table: "Presentation",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PrescribedPosologyPosologyId",
                table: "Prescription",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Drug",
                columns: table => new
                {
                    DrugId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drug", x => x.DrugId);
                });

            migrationBuilder.CreateTable(
                name: "Medicine",
                columns: table => new
                {
                    MedicineId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medicine", x => x.MedicineId);
                });

            migrationBuilder.CreateTable(
                name: "Posology",
                columns: table => new
                {
                    PosologyId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Interval = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Period = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Technique = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posology", x => x.PosologyId);
                });

            migrationBuilder.CreateTable(
                name: "PackageLeaflet",
                columns: table => new
                {
                    PackageLeafletId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GenericPosologyId = table.Column<int>(type: "int", nullable: true),
                    PresentationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PackageLeaflet", x => x.PackageLeafletId);
                    table.ForeignKey(
                        name: "FK_PackageLeaflet_Posology_GenericPosologyId",
                        column: x => x.GenericPosologyId,
                        principalTable: "Posology",
                        principalColumn: "PosologyId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PackageLeaflet_Presentation_PresentationId",
                        column: x => x.PresentationId,
                        principalTable: "Presentation",
                        principalColumn: "PresentationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Presentation_DrugId",
                table: "Presentation",
                column: "DrugId");

            migrationBuilder.CreateIndex(
                name: "IX_Presentation_MedicineId",
                table: "Presentation",
                column: "MedicineId");

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_PrescribedPosologyPosologyId",
                table: "Prescription",
                column: "PrescribedPosologyPosologyId");

            migrationBuilder.CreateIndex(
                name: "IX_PackageLeaflet_GenericPosologyId",
                table: "PackageLeaflet",
                column: "GenericPosologyId");

            migrationBuilder.CreateIndex(
                name: "IX_PackageLeaflet_PresentationId",
                table: "PackageLeaflet",
                column: "PresentationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prescription_Posology_PrescribedPosologyPosologyId",
                table: "Prescription",
                column: "PrescribedPosologyPosologyId",
                principalTable: "Posology",
                principalColumn: "PosologyId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Presentation_Drug_DrugId",
                table: "Presentation",
                column: "DrugId",
                principalTable: "Drug",
                principalColumn: "DrugId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Presentation_Medicine_MedicineId",
                table: "Presentation",
                column: "MedicineId",
                principalTable: "Medicine",
                principalColumn: "MedicineId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prescription_Posology_PrescribedPosologyPosologyId",
                table: "Prescription");

            migrationBuilder.DropForeignKey(
                name: "FK_Presentation_Drug_DrugId",
                table: "Presentation");

            migrationBuilder.DropForeignKey(
                name: "FK_Presentation_Medicine_MedicineId",
                table: "Presentation");

            migrationBuilder.DropTable(
                name: "Drug");

            migrationBuilder.DropTable(
                name: "Medicine");

            migrationBuilder.DropTable(
                name: "PackageLeaflet");

            migrationBuilder.DropTable(
                name: "Posology");

            migrationBuilder.DropIndex(
                name: "IX_Presentation_DrugId",
                table: "Presentation");

            migrationBuilder.DropIndex(
                name: "IX_Presentation_MedicineId",
                table: "Presentation");

            migrationBuilder.DropIndex(
                name: "IX_Prescription_PrescribedPosologyPosologyId",
                table: "Prescription");

            migrationBuilder.DropColumn(
                name: "DrugId",
                table: "Presentation");

            migrationBuilder.DropColumn(
                name: "MedicineId",
                table: "Presentation");

            migrationBuilder.DropColumn(
                name: "PrescribedPosologyPosologyId",
                table: "Prescription");
        }
    }
}
