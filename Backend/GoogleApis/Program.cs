var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();  // ✅ Enable Controllers
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();  // ✅ Register HttpClient
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5174") // Your React frontend URL
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials()); // If using authentication, allow credentials
});

var app = builder.Build();

// Enable Swagger in Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();  // ✅ Enable Controller Routes

app.Run();