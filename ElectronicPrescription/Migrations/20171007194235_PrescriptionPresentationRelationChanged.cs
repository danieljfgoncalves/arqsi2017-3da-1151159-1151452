using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace ElectronicPrescription.Migrations
{
    public partial class PrescriptionPresentationRelationChanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PresentationId",
                table: "Prescription");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PresentationId",
                table: "Prescription",
                nullable: false,
                defaultValue: 0);
        }
    }
}
