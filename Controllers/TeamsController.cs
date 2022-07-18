using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Beer_Olympics;

namespace Beer_Olympics.Controllers
{
    public class TeamsController : Controller
    {
        private DrinkingEntities db = new DrinkingEntities();

        // GET: Teams
        public ActionResult Index()
        {
            return View(db.Teams.ToList());
        }

        // GET: Teams/Details/5
        public ActionResult Details(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Team team = db.Teams.Find(id);
            if (team == null)
            {
                return HttpNotFound();
            }
            return View(team);
        }

        // GET: Teams/Create
        public ActionResult Create()
        {


            return View();
        }

        // POST: Teams/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Team_Country_ID,Team_Country,Team_Member_01,Team_Member_02,Team_Member_03,Team_Member_04,Team_Member_05,Olympic_Date")] Team teams, int? count)
        {
            for (int i = 1; i <= count; i++)
            {


                var player1 = Request.Form["playername" + i];
                var player2 = Request.Form["playername__" + i];
                var player3 = Request.Form["playername___" + i];
                var player4 = Request.Form["playername____" + i];
                var player5 = Request.Form["playername____" + i];
                var Team = Request.Form["playerTeam_" + i];
            
                if (teams != null)
                {
                    var place = teams.Team_Country_ID.ToString();
                    teams.Team_Member_01 = player1;
                    teams.Team_Member_02 = player2;
                    teams.Team_Member_03 = player3;
                    teams.Team_Member_04 = player4;
                    teams.Team_Member_05 = player5;
                    place = Team;

                    teams.Olympics_Date = DateTime.Today;
                    teams.ID = Guid.NewGuid();

                    db.Teams.Add(teams);
                    db.SaveChanges();

                }


            }
          

            return View();
        }

        // GET: Teams/Edit/5
        public ActionResult Edit(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Team team = db.Teams.Find(id);
            if (team == null)
            {
                return HttpNotFound();
            }
            return View(team);
        }

        // POST: Teams/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Team_Country_ID,Team_Country,Team_Member_01,Team_Member_02,Team_Member_03,Team_Member_04,Team_Member_05")] Team team)
        {
            if (ModelState.IsValid)
            {
                db.Entry(team).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(team);
        }

        // GET: Teams/Delete/5
        public ActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Team team = db.Teams.Find(id);
            if (team == null)
            {
                return HttpNotFound();
            }
            return View(team);
        }

        // POST: Teams/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            Team team = db.Teams.Find(id);
            db.Teams.Remove(team);
            db.SaveChanges();
            return RedirectToAction("Index");
        }
        public ActionResult PlayersList(string date)

    {
            var players = (from c in db.Players
                           where (c.Olympics_Date.ToString().Substring(0, 4) == date) && (c.Team_Country_ID == null)
                           orderby c.Player_Name
                           select new
                           {
                               c.Player_Name,
                               c.Player_ID,
                     

                           });


            return base.Json(new
            {
                players

            }, JsonRequestBehavior.AllowGet);


    }



        //public ActionResult Create(Team teams, int? count)

        //{
        // for (int i =1; i<= count; i++)
        //    {


        //        var player1 = Request.Form["playername" + i]; 
        //        var player2 = Request.Form["playername__" + i];
        //        var player3 = Request.Form["playername___" + i];
        //        var player4 = Request.Form["playername____" + i];
        //        var player5 = Request.Form["playername____" + i];
        //        var Team = Request.Form["playerTeam_" + i];
               
        //        if (teams != null)
        //        {
        //            var place =teams.Team_Country_ID.ToString();
        //            teams.Team_Member_01 = player1;
        //            teams.Team_Member_02 = player2;
        //            teams.Team_Member_03 = player3;
        //            teams.Team_Member_04 = player4;
        //            teams.Team_Member_05 = player5;
        //            place = Team;
                    
        //            teams.Olympics_Date = DateTime.Today;

        //            db.Teams.Add(teams);
        //            db.SaveChanges();

        //        }


        //    }
        //    return View();
        
        //}





        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
