using TutorsJournal.database;
using Microsoft.EntityFrameworkCore;
using TutorsJournal.Repo.iFace;
using TutorsJournal.Repo;
using TutorsJournal.Service.iFace;
using TutorsJournal.Service;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

#region Repositories
builder.Services.AddTransient<ISubjectRepo, SubjectRepo>();
builder.Services.AddTransient<ITopicRepo, TopicRepo>();
builder.Services.AddTransient<IStudentRepo, StudentRepo>();
builder.Services.AddTransient<ICourseRepo, CourseRepo>();
builder.Services.AddTransient<ILessonRepo, LessonRepo>();
#endregion

#region Services
builder.Services.AddScoped<ISubjectService, SubjectService>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<ICourseService, CourceService>();
#endregion

builder.Services.AddControllersWithViews();
builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
//app.UseDefaultFiles();
app.UseHttpsRedirection();
app.UseStaticFiles();


app.UseRouting();



app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Subject}/{action=Index}/{id?}");

app.Run();
