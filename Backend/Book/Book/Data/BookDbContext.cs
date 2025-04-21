using Microsoft.EntityFrameworkCore;

namespace Book.Data
{
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
        }

        
        public DbSet<global::Book.Data.Book> Books { get; set; }
    }
}