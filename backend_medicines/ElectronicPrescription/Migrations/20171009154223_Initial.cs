using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ElectronicPrescription.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "MedicalReceipt",
                columns: table => new
                {
                    MedicalReceiptId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalReceipt", x => x.MedicalReceiptId);
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
                name: "Presentation",
                columns: table => new
                {
                    PresentationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Concentration = table.Column<float>(type: "real", nullable: false),
                    DrugId = table.Column<int>(type: "int", nullable: true),
                    Form = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MedicineId = table.Column<int>(type: "int", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Presentation", x => x.PresentationId);
                    table.ForeignKey(
                        name: "FK_Presentation_Drug_DrugId",
                        column: x => x.DrugId,
                        principalTable: "Drug",
                        principalColumn: "DrugId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Presentation_Medicine_MedicineId",
                        column: x => x.MedicineId,
                        principalTable: "Medicine",
                        principalColumn: "MedicineId",
                        onDelete: ReferentialAction.Restrict);
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

            migrationBuilder.CreateTable(
                name: "Prescription",
                columns: table => new
                {
                    PrescriptionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ExpirationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MedicalReceiptId = table.Column<int>(type: "int", nullable: true),
                    PosologyId = table.Column<int>(type: "int", nullable: true),
                    PresentationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prescription", x => x.PrescriptionId);
                    table.ForeignKey(
                        name: "FK_Prescription_MedicalReceipt_MedicalReceiptId",
                        column: x => x.MedicalReceiptId,
                        principalTable: "MedicalReceipt",
                        principalColumn: "MedicalReceiptId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Prescription_Posology_PosologyId",
                        column: x => x.PosologyId,
                        principalTable: "Posology",
                        principalColumn: "PosologyId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Prescription_Presentation_PresentationId",
                        column: x => x.PresentationId,
                        principalTable: "Presentation",
                        principalColumn: "PresentationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PackageLeaflet_GenericPosologyId",
                table: "PackageLeaflet",
                column: "GenericPosologyId");

            migrationBuilder.CreateIndex(
                name: "IX_PackageLeaflet_PresentationId",
                table: "PackageLeaflet",
                column: "PresentationId");

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_MedicalReceiptId",
                table: "Prescription",
                column: "MedicalReceiptId");

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_PosologyId",
                table: "Prescription",
                column: "PosologyId");

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_PresentationId",
                table: "Prescription",
                column: "PresentationId");

            migrationBuilder.CreateIndex(
                name: "IX_Presentation_DrugId",
                table: "Presentation",
                column: "DrugId");

            migrationBuilder.CreateIndex(
                name: "IX_Presentation_MedicineId",
                table: "Presentation",
                column: "MedicineId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PackageLeaflet");

            migrationBuilder.DropTable(
                name: "Prescription");

            migrationBuilder.DropTable(
                name: "MedicalReceipt");

            migrationBuilder.DropTable(
                name: "Posology");

            migrationBuilder.DropTable(
                name: "Presentation");

            migrationBuilder.DropTable(
                name: "Drug");

            migrationBuilder.DropTable(
                name: "Medicine");
        }
    }
}
