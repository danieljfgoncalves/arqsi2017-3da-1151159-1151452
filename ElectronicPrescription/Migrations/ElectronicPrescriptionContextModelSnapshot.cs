﻿// <auto-generated />
using ElectronicPrescription.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace ElectronicPrescription.Migrations
{
    [DbContext(typeof(ElectronicPrescriptionContext))]
    partial class ElectronicPrescriptionContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.0-rtm-26452")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ElectronicPrescription.Models.Drug", b =>
                {
                    b.Property<int>("DrugId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("DrugId");

                    b.ToTable("Drug");
                });

            modelBuilder.Entity("ElectronicPrescription.Models.MedicalReceipt", b =>
                {
                    b.Property<int>("MedicalReceiptId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreationDate");

                    b.HasKey("MedicalReceiptId");

                    b.ToTable("MedicalReceipt");
                });

            modelBuilder.Entity("ElectronicPrescription.Models.Medicine", b =>
                {
                    b.Property<int>("MedicineId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("MedicineId");

                    b.ToTable("Medicine");
                });

            modelBuilder.Entity("ElectronicPrescription.Models.PackageLeaflet", b =>
                {
                    b.Property<int>("PackageLeafletId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<int?>("GenericPosologyId");

                    b.Property<int?>("PresentationId");

                    b.HasKey("PackageLeafletId");

                    b.HasIndex("GenericPosologyId");

                    b.HasIndex("PresentationId");

                    b.ToTable("PackageLeaflet");
                });

            modelBuilder.Entity("ElectronicPrescription.Models.Posology", b =>
                {
                    b.Property<int>("PosologyId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Interval");

                    b.Property<string>("Period");

                    b.Property<int>("Quantity");

                    b.Property<string>("Technique");

                    b.HasKey("PosologyId");

                    b.ToTable("Posology");
                });

            modelBuilder.Entity("ElectronicPrescription.Models.Prescription", b =>
                {
                    b.Property<int>("PrescriptionId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("ExpirationDate");

                    b.Property<int?>("MedicalReceiptId");

                    b.Property<int?>("PosologyId");

                    b.Property<int?>("PresentationId");

                    b.HasKey("PrescriptionId");

                    b.HasIndex("MedicalReceiptId");

                    b.HasIndex("PosologyId");

                    b.HasIndex("PresentationId");

                    b.ToTable("Prescription");
                });

            modelBuilder.Entity("ElectronicPrescription.Models.Presentation", b =>
                {
                    b.Property<int>("PresentationId")
                        .ValueGeneratedOnAdd();

                    b.Property<float>("Concentration");

                    b.Property<int?>("DrugId");

                    b.Property<string>("Form");

                    b.Property<int?>("MedicineId");

                    b.Property<int>("Quantity");

                    b.HasKey("PresentationId");

                    b.HasIndex("DrugId");

                    b.HasIndex("MedicineId");

                    b.ToTable("Presentation");
                });

            modelBuilder.Entity("ElectronicPrescription.Models.PackageLeaflet", b =>
                {
                    b.HasOne("ElectronicPrescription.Models.Posology", "GenericPosology")
                        .WithMany()
                        .HasForeignKey("GenericPosologyId");

                    b.HasOne("ElectronicPrescription.Models.Presentation", "Presentation")
                        .WithMany("PackageLeaflet")
                        .HasForeignKey("PresentationId");
                });

            modelBuilder.Entity("ElectronicPrescription.Models.Prescription", b =>
                {
                    b.HasOne("ElectronicPrescription.Models.MedicalReceipt", "MedicalReceipt")
                        .WithMany("Prescription")
                        .HasForeignKey("MedicalReceiptId");

                    b.HasOne("ElectronicPrescription.Models.Posology", "Posology")
                        .WithMany()
                        .HasForeignKey("PosologyId");

                    b.HasOne("ElectronicPrescription.Models.Presentation", "Presentation")
                        .WithMany()
                        .HasForeignKey("PresentationId");
                });

            modelBuilder.Entity("ElectronicPrescription.Models.Presentation", b =>
                {
                    b.HasOne("ElectronicPrescription.Models.Drug", "Drug")
                        .WithMany("Presentation")
                        .HasForeignKey("DrugId");

                    b.HasOne("ElectronicPrescription.Models.Medicine", "Medicine")
                        .WithMany("Presentation")
                        .HasForeignKey("MedicineId");
                });
#pragma warning restore 612, 618
        }
    }
}
