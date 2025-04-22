using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Book.Models;

public partial class EntertainmentAgencyExampleContext : DbContext
{
    public EntertainmentAgencyExampleContext()
    {
    }

    public EntertainmentAgencyExampleContext(DbContextOptions<EntertainmentAgencyExampleContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Agent> Agents { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Engagement> Engagements { get; set; }

    public virtual DbSet<Entertainer> Entertainers { get; set; }

    public virtual DbSet<EntertainerMember> EntertainerMembers { get; set; }

    public virtual DbSet<EntertainerStyle> EntertainerStyles { get; set; }

    public virtual DbSet<Member> Members { get; set; }

    public virtual DbSet<MusicalPreference> MusicalPreferences { get; set; }

    public virtual DbSet<MusicalStyle> MusicalStyles { get; set; }

    public virtual DbSet<ZtblDay> ZtblDays { get; set; }

    public virtual DbSet<ZtblMonth> ZtblMonths { get; set; }

    public virtual DbSet<ZtblSkipLabel> ZtblSkipLabels { get; set; }

    public virtual DbSet<ZtblWeek> ZtblWeeks { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlite("Data Source=EntertainmentAgencyExample.sqlite");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Agent>(entity =>
        {
            entity.Property(e => e.AgentId)
                .ValueGeneratedNever()
                .HasColumnName("AgentID");
            entity.Property(e => e.CommissionRate).HasColumnType("NUMERIC");
            entity.Property(e => e.Salary).HasColumnType("NUMERIC");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
        });

        modelBuilder.Entity<Engagement>(entity =>
        {
            entity.HasKey(e => e.EngagementNumber);

            entity.Property(e => e.AgentId).HasColumnName("AgentID");
            entity.Property(e => e.ContractPrice).HasColumnType("NUMERIC");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.EntertainerId).HasColumnName("EntertainerID");
        });

        modelBuilder.Entity<Entertainer>(entity =>
        {
            entity.Property(e => e.EntertainerId).HasColumnName("EntertainerID");
            entity.Property(e => e.EntEmailAddress).HasColumnName("EntEMailAddress");
            entity.Property(e => e.EntSsn).HasColumnName("EntSSN");
        });

        modelBuilder.Entity<EntertainerMember>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Entertainer_Members");

            entity.Property(e => e.EntertainerId).HasColumnName("EntertainerID");
            entity.Property(e => e.MemberId).HasColumnName("MemberID");
        });

        modelBuilder.Entity<EntertainerStyle>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Entertainer_Styles");

            entity.Property(e => e.EntertainerId).HasColumnName("EntertainerID");
            entity.Property(e => e.StyleId).HasColumnName("StyleID");
        });

        modelBuilder.Entity<Member>(entity =>
        {
            entity.Property(e => e.MemberId).HasColumnName("MemberID");
        });

        modelBuilder.Entity<MusicalPreference>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Musical_Preferences");

            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.StyleId).HasColumnName("StyleID");
        });

        modelBuilder.Entity<MusicalStyle>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("Musical_Styles");

            entity.Property(e => e.StyleId).HasColumnName("StyleID");
        });

        modelBuilder.Entity<ZtblDay>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ztblDays");
        });

        modelBuilder.Entity<ZtblMonth>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ztblMonths");
        });

        modelBuilder.Entity<ZtblSkipLabel>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ztblSkipLabels");
        });

        modelBuilder.Entity<ZtblWeek>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ztblWeeks");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
