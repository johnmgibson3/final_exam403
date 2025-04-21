using Book.Data;
using Microsoft.AspNetCore.Mvc;

namespace Book.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;
        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }
  
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortOrder = "asc", [FromQuery] List<string>? category = null)
        {
            string? favBookType = Request.Cookies["FavoriteBookType"];

            var query = _bookContext.Books.AsQueryable();

            if (category != null && category.Any())
            {
                query = query.Where(b => category.Contains(b.Category));
            }

            if (sortOrder.ToLower() == "desc")
            {
                query = query.OrderByDescending(b => b.Title);
            }
            else
            {
                query = query.OrderBy(b => b.Title);
            }


            var something = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // 
            var totalNumBooks = query.Count();

            var someObject = new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject);
        }

        [HttpGet("FictionBooks")]
        public IEnumerable<Book.Data.Book> GetFictionBooks(int pageSize = 10, int pageNum = 1)
        {
            string? fincBookType = Request.Cookies["FictionBookType"];
            Console.WriteLine("~~~~~~~~COOKIE~~~~~~~~~\n" + fincBookType);

            HttpContext.Response.Cookies.Append("FictionBookType", "Victor Hugo", new CookieOptions()
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(1),
            });


            var something = _bookContext.Books.Where(b => b.Classification == "Fiction")
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            return something;
        }

// 
        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }

        // POST: Create a new book
[HttpPost("Add")]
public IActionResult AddBook([FromBody] Book.Data.Book newBook)
{
    _bookContext.Books.Add(newBook);
    _bookContext.SaveChanges();
    return Ok(newBook);
}

// PUT: Update an existing book
[HttpPut("Update/{id}")]
public IActionResult UpdateBook(int id, [FromBody] Book.Data.Book updatedBook)
{
    var book = _bookContext.Books.Find(id);
    if (book == null) return NotFound();

    // Update fields
    book.Title = updatedBook.Title;
    book.Author = updatedBook.Author;
    book.Publisher = updatedBook.Publisher;
    book.ISBN = updatedBook.ISBN;
    book.PageCount = updatedBook.PageCount;
    book.Price = updatedBook.Price;
    book.Classification = updatedBook.Classification;
    book.Category = updatedBook.Category;

    _bookContext.SaveChanges();
    return Ok(book);
}

// DELETE: Delete a book
[HttpDelete("Delete/{id}")]
public IActionResult DeleteBook(int id)
{
    var book = _bookContext.Books.Find(id);
    if (book == null) return NotFound();

    _bookContext.Books.Remove(book);
    _bookContext.SaveChanges();
    return Ok();
}
    }
}