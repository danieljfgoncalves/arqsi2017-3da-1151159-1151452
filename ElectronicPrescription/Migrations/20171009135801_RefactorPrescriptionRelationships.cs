using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ElectronicPrescription.Migrations
{
    public partial class RefactorPrescriptionRelationships : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Presentation_Prescription_PresentationId",
                table: "Presentation");

            migrationBuilder.AlterColumn<int>(
                name: "PresentationId",
                table: "Presentation",
                type: "int",
                nullable: false,
                oldClrType: typeof(int))
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<int>(
                name: "PresentationId",
                table: "Prescription",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Prescription_PresentationId",
                table: "Prescription",
                column: "PresentationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prescription_Presentation_PresentationId",
                table: "Prescription",
                column: "PresentationId",
                principalTable: "Presentation",
                principalColumn: "PresentationId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prescription_Presentation_PresentationId",
                table: "Prescription");

            migrationBuilder.DropIndex(
                name: "IX_Prescription_PresentationId",
                table: "Prescription");

            migrationBuilder.DropColumn(
                name: "PresentationId",
                table: "Prescription");

            migrationBuilder.AlterColumn<int>(
                name: "PresentationId",
                table: "Presentation",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddForeignKey(
                name: "FK_Presentation_Prescription_PresentationId",
                table: "Presentation",
                column: "PresentationId",
                principalTable: "Prescription",
                principalColumn: "PrescriptionId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
