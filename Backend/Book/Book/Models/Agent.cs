using System;
using System.Collections.Generic;

namespace Book.Models;

public partial class Agent
{
    public int AgentId { get; set; }

    public string? AgtFirstName { get; set; }

    public string? AgtLastName { get; set; }

    public string? AgtStreetAddress { get; set; }

    public string? AgtCity { get; set; }

    public string? AgtState { get; set; }

    public string? AgtZipCode { get; set; }

    public string? AgtPhoneNumber { get; set; }

    public DateOnly? DateHired { get; set; }

    public int? Salary { get; set; }

    public double? CommissionRate { get; set; }
}
