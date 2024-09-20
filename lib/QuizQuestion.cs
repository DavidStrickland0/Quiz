using System.Collections.Generic;
using System.Text.Json.Serialization;

public class QuizQuestion
{
    /// <summary>
    /// Represents the header or category for the question.
    /// </summary>
    [JsonPropertyName("header")]
    public string Header { get; set; }

    /// <summary>
    /// Represents the subject area the question belongs to.
    /// </summary>
    [JsonPropertyName("subject")]
    public string Subject { get; set; }

    /// <summary>
    /// Represents the specific section of the outline the question is related to.
    /// </summary>
    [JsonPropertyName("outlineSection")]
    public string OutlineSection { get; set; }

    /// <summary>
    /// The actual question being asked.
    /// </summary>
    [JsonPropertyName("question")]
    public string Question { get; set; }

    /// <summary>
    /// A list of possible answer options for the question.
    /// </summary>
    [JsonPropertyName("options")]
    public List<string> Options { get; set; }

    /// <summary>
    /// Index of the correct answer in the options list.
    /// </summary>
    [JsonPropertyName("correctAnswer")]
    public List<int> CorrectAnswer { get; set; }
}
