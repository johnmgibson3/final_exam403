using System;
using System.Collections.Generic;

namespace Book.Models;

public partial class ZtblMonth
{
    public string? MonthYear { get; set; }

    public int? YearNumber { get; set; }

    public int? MonthNumber { get; set; }

    public DateOnly? MonthStart { get; set; }

    public DateOnly? MonthEnd { get; set; }

    public int? January { get; set; }

    public int? February { get; set; }

    public int? March { get; set; }

    public int? April { get; set; }

    public int? May { get; set; }

    public int? June { get; set; }

    public int? July { get; set; }

    public int? August { get; set; }

    public int? September { get; set; }

    public int? October { get; set; }

    public int? November { get; set; }

    public int? December { get; set; }
}
