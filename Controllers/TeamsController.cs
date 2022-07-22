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



        public JsonResult ScoreboardResults()

        {
            var scores = (from c in db.Teams
                          orderby c.Team_Country
                          select new
                          {
                              c.ID,
                              c.Team_Flag,
                              c.Team_Country,
                              c.Team_Member_01,
                              c.Team_Member_02,
                              c.Team_Member_03,
                              c.Team_Member_04,
                              c.Team_Member_05,
                              c.Olympics_Date,
                              c.Beer_Pong,
                              c.Beer_Pong_Place,
                              c.Chugalug,
                              c.Chugalug_Time,
                              c.Boat_Race,
                              c.Boat_Race_Time,
                              c.Civil_War,
                              c.Civil_War_Place,
                              c.Corn_Hole,
                              c.Corn_Hole_Place,
                              c.Dizzy_Bat,
                              c.Dizzy_Bat_Time,
                              c.Survivor_Flip_Cup,
                              c.Survivor_Flip_CupPlace,
                              c.High_Noon,
                              c.High_Noon_Place,
                              c.Slip_Flip,
                              c.Slip_Flip_Time,
                              c.Baseball,
                              c.Baseball_Place,
                              c.Swim_n_Shoot,
                              c.Swim_n_Shoot_Time,
                              c.Quarters,
                              c.Quarters_Place,
                              c.Pool_Pig,
                              c.Pool_Pig_place,
                              c.Speed_Ball,
                              c.Speed_Ball_Place


                          });
                          var jsonResult = Json(scores, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
                return jsonResult;

                         }
        public ActionResult ScoreBoard()
        {
            return View(db.Teams.ToList());
        }

      

        // GET: Teams/Create
        public ActionResult Create()
        {
            IEnumerable<SelectListItem> players = db.Players
                .Where(c => c.Team_Country_ID == null)
                .OrderBy(c => c.Player_Name)
                .Select(c => new SelectListItem
                {

                    Value = c.Player_ID.ToString(),
                    Text = c.Player_Name


                }).Distinct();
            ViewBag.PlayerList = players;

            return View();
        }

        // POST: Teams/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,team_Country,Team_Member_01,Team_Member_02,Team_Member_03,Team_Member_04,Team_Member_05,Olympic_Date")] Team teams, int? count)
        {


            IEnumerable<SelectListItem> players = db.Players
              .Where(c => c.Team_Country_ID == null)
              .OrderBy(c => c.Player_Name)
              .Select(c => new SelectListItem
              {

                  Value = c.Player_ID.ToString(),
                  Text = c.Player_Name


              }).Distinct();
            ViewBag.PlayerList = players;
          
          

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



        public ActionResult TeamsList(string date)

        {
            var teams = (from c in db.Teams
                           where (c.Olympics_Date.ToString().Substring(0, 4) == date) && (c.Team_Member_01 != null)
                           orderby c.Team_Country
                           select new
                           {
                               c.Team_Country,
                               c.Team_Member_01,
                               c.Team_Member_02,
                               c.Team_Member_03,
                               c.Team_Member_04,
                               c.Team_Member_05,
                               c.Team_Flag,
                           }) ;


            return base.Json(new
            {
                teams

            }, JsonRequestBehavior.AllowGet);


        }



        public ActionResult PlayersListTourneys(string date)

        {
            var teams = (from c in db.Players
                           where (c.Olympics_Date.ToString().Substring(0, 4) == date)
                           orderby c.Player_Name
                           select new
                           {
                               name = c.Player_Name,
                             


                           });

            var results = (from c in db.Players
                         where (c.Olympics_Date.ToString().Substring(0, 4) == "Nothing")
                         orderby c.Player_Name
                         select new
                         {
                            



                         });


            return base.Json(new
            {
                teams,
                results
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


        [HttpPost]
        public JsonResult SaveTeam(List<Team>team)

        {
          using (DrinkingEntities entities = new DrinkingEntities())
            {



                if(team == null)
                {

                    team = new List<Team>();

                }


                foreach(Team teams in team)
                {



                    entities.Teams.Add(teams);

                }
                int insertedRecords = entities.SaveChanges();
                return Json(insertedRecords);
            }
                    
                    
                    
         }

        [HttpPost]
        public JsonResult CreatePlayer(List<Player> player)

        {
            using (DrinkingEntities entities = new DrinkingEntities())
            {



                if (player == null)
                {

                    player = new List<Player>();

                }


                foreach (Player players in player)
                {



                    entities.Players.Add(players);

                }
                int insertedRecords = entities.SaveChanges();
                return Json(insertedRecords);
            }



        }
        [HttpPost]
        public JsonResult UpdatePlayer(Player model)

        {

            
            if (ModelState.IsValid)
            {
                bool result = true;
                db.Entry(model).State = EntityState.Modified;

                db.Entry(model).Property(x => x.Player_ID).IsModified = false;
                db.Entry(model).Property(x => x.Player_Name).IsModified = false;
                db.Entry(model).Property(x => x.Olympics_Date).IsModified = false;
                db.SaveChanges();
                return Json(new { returnvalue = result }, JsonRequestBehavior.AllowGet);


            }
            return Json("Failed", JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public JsonResult Scoreboard(Team model)

        {


            if (ModelState.IsValid)
            {
                bool result = true;
                db.Entry(model).State = EntityState.Modified;
                db.Entry(model).Property(x => x.Team_Flag).IsModified = false;
                db.Entry(model).Property(x => x.Team_Country).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_02).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_01).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_03).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_04).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_05).IsModified = false;
                db.Entry(model).Property(x => x.Dizzy_Bat).IsModified = false;
                db.Entry(model).Property(x => x.Dizzy_Bat_Time).IsModified = false;
                db.Entry(model).Property(x => x.Slip_Flip).IsModified = false;
                db.Entry(model).Property(x => x.Slip_Flip_Time).IsModified = false;
                db.Entry(model).Property(x => x.Swim_n_Shoot).IsModified = false;
                db.Entry(model).Property(x => x.Swim_n_Shoot_Time).IsModified = false;
                db.Entry(model).Property(x => x.Boat_Race).IsModified = false;
                db.Entry(model).Property(x => x.Boat_Race_Time).IsModified = false;        
                db.Entry(model).Property(x => x.Chugalug).IsModified = false;
                db.Entry(model).Property(x => x.Chugalug_Time).IsModified = false;
                db.Entry(model).Property(x => x.Olympics_Date).IsModified = false;
                db.SaveChanges();
                return Json(new { returnvalue = result }, JsonRequestBehavior.AllowGet);


            }
            return Json("Failed", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ScoreboardChug(Team model)

        {


            if (ModelState.IsValid)
            {
                bool result = true;
                db.Entry(model).State = EntityState.Modified;
                db.Entry(model).Property(x => x.Team_Flag).IsModified = false;
                db.Entry(model).Property(x => x.Team_Country).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_01).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_02).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_03).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_04).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_05).IsModified = false;
                db.Entry(model).Property(x => x.Olympics_Date).IsModified = false;
                db.Entry(model).Property(x => x.Beer_Pong).IsModified = false;
                db.Entry(model).Property(x => x.Beer_Pong_Place).IsModified = false;
                //db.Entry(model).Property(x => x.Chugalug).IsModified = false;
                //db.Entry(model).Property(x => x.Chugalug_Time).IsModified = false;
                db.Entry(model).Property(x => x.Boat_Race).IsModified = false;
                db.Entry(model).Property(x => x.Boat_Race_Time).IsModified = false;
                db.Entry(model).Property(x => x.Civil_War).IsModified = false;
                db.Entry(model).Property(x => x.Civil_War_Place).IsModified = false;
                db.Entry(model).Property(x => x.Corn_Hole).IsModified = false;
                db.Entry(model).Property(x => x.Corn_Hole_Place).IsModified = false;
                db.Entry(model).Property(x => x.Dizzy_Bat).IsModified = false;
                db.Entry(model).Property(x => x.Dizzy_Bat_Time).IsModified = false;
                db.Entry(model).Property(x => x.Survivor_Flip_Cup).IsModified = false;
                db.Entry(model).Property(x => x.Survivor_Flip_CupPlace).IsModified = false;
                db.Entry(model).Property(x => x.High_Noon).IsModified = false;
                db.Entry(model).Property(x => x.High_Noon_Place).IsModified = false;
                db.Entry(model).Property(x => x.Slip_Flip).IsModified = false;
                db.Entry(model).Property(x => x.Slip_Flip_Time).IsModified = false;
                db.Entry(model).Property(x => x.Baseball).IsModified = false;
                db.Entry(model).Property(x => x.Baseball_Place).IsModified = false;
                db.Entry(model).Property(x => x.Swim_n_Shoot).IsModified = false;
                db.Entry(model).Property(x => x.Swim_n_Shoot_Time).IsModified = false;
                db.Entry(model).Property(x => x.Quarters).IsModified = false;
                db.Entry(model).Property(x => x.Quarters_Place).IsModified = false;
                db.Entry(model).Property(x => x.Pool_Pig).IsModified = false;
                db.Entry(model).Property(x => x.Pool_Pig_place).IsModified = false;
                db.Entry(model).Property(x => x.Speed_Ball).IsModified = false;
                db.Entry(model).Property(x => x.Speed_Ball_Place).IsModified = false;

                db.SaveChanges();
                return Json(new { returnvalue = result }, JsonRequestBehavior.AllowGet);


            }
            return Json("Failed", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult ScoreboardDizzy(Team model)

        {


            if (ModelState.IsValid)
            {
                bool result = true;
                db.Entry(model).State = EntityState.Modified;
                db.Entry(model).Property(x => x.Team_Flag).IsModified = false;
                db.Entry(model).Property(x => x.Team_Country).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_01).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_02).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_03).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_04).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_05).IsModified = false;
                db.Entry(model).Property(x => x.Olympics_Date).IsModified = false;
                db.Entry(model).Property(x => x.Beer_Pong).IsModified = false;
                db.Entry(model).Property(x => x.Beer_Pong_Place).IsModified = false;
                db.Entry(model).Property(x => x.Chugalug).IsModified = false;
                db.Entry(model).Property(x => x.Chugalug_Time).IsModified = false;
                db.Entry(model).Property(x => x.Boat_Race).IsModified = false;
                db.Entry(model).Property(x => x.Boat_Race_Time).IsModified = false;
                db.Entry(model).Property(x => x.Civil_War).IsModified = false;
                db.Entry(model).Property(x => x.Civil_War_Place).IsModified = false;
                db.Entry(model).Property(x => x.Corn_Hole).IsModified = false;
                db.Entry(model).Property(x => x.Corn_Hole_Place).IsModified = false;
                //db.Entry(model).Property(x => x.Dizzy_Bat).IsModified = false;
                //db.Entry(model).Property(x => x.Dizzy_Bat_Time).IsModified = false;
                db.Entry(model).Property(x => x.Survivor_Flip_Cup).IsModified = false;
                db.Entry(model).Property(x => x.Survivor_Flip_CupPlace).IsModified = false;
                db.Entry(model).Property(x => x.High_Noon).IsModified = false;
                db.Entry(model).Property(x => x.High_Noon_Place).IsModified = false;
                db.Entry(model).Property(x => x.Slip_Flip).IsModified = false;
                db.Entry(model).Property(x => x.Slip_Flip_Time).IsModified = false;
                db.Entry(model).Property(x => x.Baseball).IsModified = false;
                db.Entry(model).Property(x => x.Baseball_Place).IsModified = false;
                db.Entry(model).Property(x => x.Swim_n_Shoot).IsModified = false;
                db.Entry(model).Property(x => x.Swim_n_Shoot_Time).IsModified = false;
                db.Entry(model).Property(x => x.Quarters).IsModified = false;
                db.Entry(model).Property(x => x.Quarters_Place).IsModified = false;
                db.Entry(model).Property(x => x.Pool_Pig).IsModified = false;
                db.Entry(model).Property(x => x.Pool_Pig_place).IsModified = false;
                db.Entry(model).Property(x => x.Speed_Ball).IsModified = false;
                db.Entry(model).Property(x => x.Speed_Ball_Place).IsModified = false;

                db.SaveChanges();
                return Json(new { returnvalue = result }, JsonRequestBehavior.AllowGet);


            }
            return Json("Failed", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ScoreboardBoat(Team model)

        {


            if (ModelState.IsValid)
            {
                bool result = true;
                db.Entry(model).State = EntityState.Modified;
                db.Entry(model).Property(x => x.Team_Flag).IsModified = false;
                db.Entry(model).Property(x => x.Team_Country).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_01).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_02).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_03).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_04).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_05).IsModified = false;
                db.Entry(model).Property(x => x.Olympics_Date).IsModified = false;
                db.Entry(model).Property(x => x.Beer_Pong).IsModified = false;
                db.Entry(model).Property(x => x.Beer_Pong_Place).IsModified = false;
                db.Entry(model).Property(x => x.Chugalug).IsModified = false;
                db.Entry(model).Property(x => x.Chugalug_Time).IsModified = false;
                //db.Entry(model).Property(x => x.Boat_Race).IsModified = false;
                //db.Entry(model).Property(x => x.Boat_Race_Time).IsModified = false;
                db.Entry(model).Property(x => x.Civil_War).IsModified = false;
                db.Entry(model).Property(x => x.Civil_War_Place).IsModified = false;
                db.Entry(model).Property(x => x.Corn_Hole).IsModified = false;
                db.Entry(model).Property(x => x.Corn_Hole_Place).IsModified = false;
                db.Entry(model).Property(x => x.Dizzy_Bat).IsModified = false;
                db.Entry(model).Property(x => x.Dizzy_Bat_Time).IsModified = false;
                db.Entry(model).Property(x => x.Survivor_Flip_Cup).IsModified = false;
                db.Entry(model).Property(x => x.Survivor_Flip_CupPlace).IsModified = false;
                db.Entry(model).Property(x => x.High_Noon).IsModified = false;
                db.Entry(model).Property(x => x.High_Noon_Place).IsModified = false;
                db.Entry(model).Property(x => x.Slip_Flip).IsModified = false;
                db.Entry(model).Property(x => x.Slip_Flip_Time).IsModified = false;
                db.Entry(model).Property(x => x.Baseball).IsModified = false;
                db.Entry(model).Property(x => x.Baseball_Place).IsModified = false;
                db.Entry(model).Property(x => x.Swim_n_Shoot).IsModified = false;
                db.Entry(model).Property(x => x.Swim_n_Shoot_Time).IsModified = false;
                db.Entry(model).Property(x => x.Quarters).IsModified = false;
                db.Entry(model).Property(x => x.Quarters_Place).IsModified = false;
                db.Entry(model).Property(x => x.Pool_Pig).IsModified = false;
                db.Entry(model).Property(x => x.Pool_Pig_place).IsModified = false;
                db.Entry(model).Property(x => x.Speed_Ball).IsModified = false;
                db.Entry(model).Property(x => x.Speed_Ball_Place).IsModified = false;

                db.SaveChanges();
                return Json(new { returnvalue = result }, JsonRequestBehavior.AllowGet);


            }
            return Json("Failed", JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult ScoreboardSwim(Team model)

        {


            if (ModelState.IsValid)
            {
                bool result = true;
                db.Entry(model).State = EntityState.Modified;
                db.Entry(model).Property(x => x.Team_Flag).IsModified = false;
                db.Entry(model).Property(x => x.Team_Country).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_01).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_02).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_03).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_04).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_05).IsModified = false;
                db.Entry(model).Property(x => x.Olympics_Date).IsModified = false;
                db.Entry(model).Property(x => x.Beer_Pong).IsModified = false;
                db.Entry(model).Property(x => x.Beer_Pong_Place).IsModified = false;
                db.Entry(model).Property(x => x.Chugalug).IsModified = false;
                db.Entry(model).Property(x => x.Chugalug_Time).IsModified = false;
                db.Entry(model).Property(x => x.Boat_Race).IsModified = false;
                db.Entry(model).Property(x => x.Boat_Race_Time).IsModified = false;
                db.Entry(model).Property(x => x.Civil_War).IsModified = false;
                db.Entry(model).Property(x => x.Civil_War_Place).IsModified = false;
                db.Entry(model).Property(x => x.Corn_Hole).IsModified = false;
                db.Entry(model).Property(x => x.Corn_Hole_Place).IsModified = false;
                db.Entry(model).Property(x => x.Dizzy_Bat).IsModified = false;
                db.Entry(model).Property(x => x.Dizzy_Bat_Time).IsModified = false;
                db.Entry(model).Property(x => x.Survivor_Flip_Cup).IsModified = false;
                db.Entry(model).Property(x => x.Survivor_Flip_CupPlace).IsModified = false;
                db.Entry(model).Property(x => x.High_Noon).IsModified = false;
                db.Entry(model).Property(x => x.High_Noon_Place).IsModified = false;
                db.Entry(model).Property(x => x.Slip_Flip).IsModified = false;
                db.Entry(model).Property(x => x.Slip_Flip_Time).IsModified = false;
                db.Entry(model).Property(x => x.Baseball).IsModified = false;
                db.Entry(model).Property(x => x.Baseball_Place).IsModified = false;
                //db.Entry(model).Property(x => x.Swim_n_Shoot).IsModified = false;
                //db.Entry(model).Property(x => x.Swim_n_Shoot_Time).IsModified = false;
                db.Entry(model).Property(x => x.Quarters).IsModified = false;
                db.Entry(model).Property(x => x.Quarters_Place).IsModified = false;
                db.Entry(model).Property(x => x.Pool_Pig).IsModified = false;
                db.Entry(model).Property(x => x.Pool_Pig_place).IsModified = false;
                db.Entry(model).Property(x => x.Speed_Ball).IsModified = false;
                db.Entry(model).Property(x => x.Speed_Ball_Place).IsModified = false;

                db.SaveChanges();
                return Json(new { returnvalue = result }, JsonRequestBehavior.AllowGet);


            }
            return Json("Failed", JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult ScoreboardSlip(Team model)

        {


            if (ModelState.IsValid)
            {
                bool result = true;
                db.Entry(model).State = EntityState.Modified;
                db.Entry(model).Property(x => x.Team_Flag).IsModified = false;
                db.Entry(model).Property(x => x.Team_Country).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_01).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_02).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_03).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_04).IsModified = false;
                db.Entry(model).Property(x => x.Team_Member_05).IsModified = false;
                db.Entry(model).Property(x => x.Olympics_Date).IsModified = false;
                db.Entry(model).Property(x => x.Beer_Pong).IsModified = false;
                db.Entry(model).Property(x => x.Beer_Pong_Place).IsModified = false;
                db.Entry(model).Property(x => x.Chugalug).IsModified = false;
                db.Entry(model).Property(x => x.Chugalug_Time).IsModified = false;
                db.Entry(model).Property(x => x.Boat_Race).IsModified = false;
                db.Entry(model).Property(x => x.Boat_Race_Time).IsModified = false;
                db.Entry(model).Property(x => x.Civil_War).IsModified = false;
                db.Entry(model).Property(x => x.Civil_War_Place).IsModified = false;
                db.Entry(model).Property(x => x.Corn_Hole).IsModified = false;
                db.Entry(model).Property(x => x.Corn_Hole_Place).IsModified = false;
                db.Entry(model).Property(x => x.Dizzy_Bat).IsModified = false;
                db.Entry(model).Property(x => x.Dizzy_Bat_Time).IsModified = false;
                db.Entry(model).Property(x => x.Survivor_Flip_Cup).IsModified = false;
                db.Entry(model).Property(x => x.Survivor_Flip_CupPlace).IsModified = false;
                db.Entry(model).Property(x => x.High_Noon).IsModified = false;
                db.Entry(model).Property(x => x.High_Noon_Place).IsModified = false;
                //db.Entry(model).Property(x => x.Slip_Flip).IsModified = false;
                //db.Entry(model).Property(x => x.Slip_Flip_Time).IsModified = false;
                db.Entry(model).Property(x => x.Baseball).IsModified = false;
                db.Entry(model).Property(x => x.Baseball_Place).IsModified = false;
                db.Entry(model).Property(x => x.Swim_n_Shoot).IsModified = false;
                db.Entry(model).Property(x => x.Swim_n_Shoot_Time).IsModified = false;
                db.Entry(model).Property(x => x.Quarters).IsModified = false;
                db.Entry(model).Property(x => x.Quarters_Place).IsModified = false;
                db.Entry(model).Property(x => x.Pool_Pig).IsModified = false;
                db.Entry(model).Property(x => x.Pool_Pig_place).IsModified = false;
                db.Entry(model).Property(x => x.Speed_Ball).IsModified = false;
                db.Entry(model).Property(x => x.Speed_Ball_Place).IsModified = false;

                db.SaveChanges();
                return Json(new { returnvalue = result }, JsonRequestBehavior.AllowGet);


            }
            return Json("Failed", JsonRequestBehavior.AllowGet);
        }

        
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
