using lib;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS services to allow any origin, header, and method
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable the AllowAll CORS policy
app.UseCors("AllowAll");

// Endpoint to get a random question
app.MapGet("/question", () =>
{
    var question = QuizProvider.RandomQuestion("az-900");
    if (question == null)
    {
        return Results.NotFound("No questions available.");
    }
    return Results.Ok(question);
})
.WithOpenApi();

// Updated endpoint to check if a list of answers is correct
app.MapPost("/check-answer", (int questionIndex, List<string> answerTexts) =>
{
    var areCorrect = QuizProvider.AreAnswersCorrect("az-900",questionIndex, answerTexts);
    return Results.Ok(areCorrect);
})
.WithOpenApi();

// Endpoint to get a random question
app.MapGet("{Test}/question", (string Test) =>
{
    var question = QuizProvider.RandomQuestion(Test);
    if (question == null)
    {
        return Results.NotFound("No questions available.");
    }
    return Results.Ok(question);
})
.WithOpenApi();

// Updated endpoint to check if a list of answers is correct
app.MapPost("{Test}/check-answer", (string Test,int questionIndex, List<string> answerTexts) =>
{
    var areCorrect = QuizProvider.AreAnswersCorrect(Test,questionIndex, answerTexts);
    return Results.Ok(areCorrect);
})
.WithOpenApi();

app.Run();
