﻿using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using TutorsJournal.entity;
using TutorsJournal.Service.iFace;

namespace TutorsJournal.Controllers
{
    public class ExportController : Controller
    {
        private ICourseService courseService;
        public ExportController(ICourseService courseService)
        {
            this.courseService = courseService;
        }

        public IActionResult Excel(int idCourse)
        {
            Course course = courseService.getById(idCourse);
            List<Lesson> lessons = course.Lessons.Where(i => i.Date.Month == DateTime.Now.Month).Where(i => i.IsCompleted == true).ToList();
            if (lessons != null && lessons.Count > 0)
            {
                using (XLWorkbook wb = new XLWorkbook())
                {

                    var workSheet = wb.Worksheets.Add("lessons");

                    workSheet.Cell("A1").Value = "Список занятий";
                    workSheet.Cell("A2").Value = "Дата";
                    workSheet.Cell("B2").Value = "%";
                    workSheet.Cell("C2").Value = "Тема";



                    int h = 3;
                    foreach (Lesson x in lessons)
                    {
                        int w = 1;
                        workSheet.Cell(h, w++).Value = x.Date;
                        workSheet.Cell(h, w++).Value = x.PercentOfDecision;
                        workSheet.Cell(h, w++).Value = x.Topic;
                        h++;
                    }

                    var rngTable = workSheet.Range("A1:C" + (2 + lessons.Count));

                    var rngDates = rngTable.Range("A3:A" + (3 + lessons.Count - 1));
                    rngDates.Style.NumberFormat.Format = "dd.mm.yy";

                    rngTable.FirstCell()
                        .Style
                        .Font.SetBold()
                        .Fill.SetBackgroundColor(XLColor.CornflowerBlue)
                        .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);
                    rngTable.FirstRow().Merge();

                    var rngData = workSheet.Range("A2:C" + (3 + lessons.Count - 1));
                    var excelTable = rngData.CreateTable();

                    // Add the totals row
                    excelTable.ShowTotalsRow = true;
                    // Put the average on the field "Income"
                    // Notice how we're calling the cell by the column name
                    excelTable.Field("%").TotalsRowFunction = XLTotalsRowFunction.Average;
                    // Put a label on the totals cell of the field "DOB"
                    excelTable.Field("Дата").TotalsRowLabel = "Среднее:";

                   // workSheet.RangeUsed().Style.Border.OutsideBorder = XLBorderStyleValues.Thick;
                    workSheet.Columns().AdjustToContents();

                    using (MemoryStream stream = new MemoryStream())
                    {
                        wb.SaveAs(stream);
                        return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"Lessons{DateTime.Now.ToString("MM-dd-yyyy")}.xlsx");
                    }
                }
            }
            else return Json(new {message = "список занятий пустой"});
        }
    }
}
