using System;
using System.Collections.Generic;

namespace Book.Models;

public partial class EntertainerMember
{
    public int? EntertainerId { get; set; }

    public int? MemberId { get; set; }

    public int? Status { get; set; }
}
