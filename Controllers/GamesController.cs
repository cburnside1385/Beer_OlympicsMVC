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
    public class GamesController : Controller
    {
        private DrinkingEntities db = new DrinkingEntities();


        // GET: Games

        public JsonResult All_Time()

        {
            var scores = (from c in db.Teams
                          orderby c.Team_Country
                          select new
                          {
                              c.ID,
                              c.Team_Country,
                              c.Boat_Race,
                              c.Boat_Race_Time,
                              c.Chugalug,
                              c.Chugalug_Time,
                              c.Swim_n_Shoot,
                              c.Swim_n_Shoot_Time,
                              c.Slip_Flip,
                              c.Slip_Flip_Time,
                              c.Dizzy_Bat,
                              c.Dizzy_Bat_Time,


                          });
            var jsonResult = Json(scores, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }

        public JsonResult ChugTime()

        {
            var scores = (from c in db.Teams
                          orderby c.Team_Country
                          select new
                          {
                              c.ID,
                              c.Team_Country,
                              c.Chugalug,
                              c.Chugalug_Time,



                          });
            var jsonResult = Json(scores, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public ActionResult Chug()
        {
            return View(db.Teams.ToList());
        }

        public ActionResult Schedule()
        {
            return View();
        }
        public ActionResult Rules()
        {
            IEnumerable<SelectListItem> games = db.Games
             
              .OrderBy(c => c.Game_Name)
              .Select(c => new SelectListItem
              {

                  Value = c.Game_ID.ToString(),
                  Text = c.Game_Name


              }).Distinct();
            ViewBag.GamesList = games;

            return View();
        }

        public JsonResult Boat_Time()

        {
            var scores = (from c in db.Teams
                          orderby c.Team_Country
                          select new
                          {
                              c.ID,
                              c.Team_Country,
                              c.Boat_Race,
                              c.Boat_Race_Time



                          });
            var jsonResult = Json(scores, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public ActionResult Boat()
        {
            IEnumerable<SelectListItem> players = db.Teams
         .Where(c => c.Team_Country != null)
         .OrderBy(c => c.Team_Country)
         .Select(c => new SelectListItem
         {

             Value = c.Team_Country,
             Text = c.Team_Country


         }).Distinct();
            var playas = players.OrderBy(a => Guid.NewGuid()).ToList();
            ViewBag.PlayerList = playas;
            return View(db.Teams.ToList());
        }


        public JsonResult Dizzy_Time()

        {
            var scores = (from c in db.Teams
                          orderby c.Team_Country
                          select new
                          {
                              c.ID,
                              c.Team_Country,
                              c.Dizzy_Bat,
                              c.Dizzy_Bat_Time,



                          });
            var jsonResult = Json(scores, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public ActionResult Dizzy()
        {
            return View(db.Teams.ToList());
        }
        public JsonResult Slip_Time()

        {
            var scores = (from c in db.Teams
                          orderby c.Team_Country
                          select new
                          {
                              c.ID,
                              c.Team_Country,
                              c.Slip_Flip,
                              c.Slip_Flip_Time,



                          });
            var jsonResult = Json(scores, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public ActionResult Slip()
        {
            return View(db.Teams.ToList());
        }
        public JsonResult SwimTime()

        {
            var scores = (from c in db.Teams
                          orderby c.Team_Country
                          select new
                          {
                              c.ID,
                              c.Team_Country,
                              c.Swim_n_Shoot,
                              c.Swim_n_Shoot_Time,



                          });
            var jsonResult = Json(scores, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;

        }
        public ActionResult Swim()
        {
            return View(db.Teams.ToList());
        }

        public ActionResult BeerPongBracket()
        {

            IEnumerable<SelectListItem> players = db.Teams
           .Where(c => c.Team_Country != null)
           .OrderBy(c => c.Team_Country)
           .Select(c => new SelectListItem
           {

               Value = c.Team_Country,
               Text = c.Team_Country


           }).Distinct();
            var playas = players.OrderBy(a => Guid.NewGuid()).ToList();
            ViewBag.PlayerList = playas;


            return View(db.Games.ToList());
        }
        
        public ActionResult CivilWarBracket()
        {

            IEnumerable<SelectListItem> playersbaseball = db.Teams
           .Where(c => c.Team_Country != null)
         
           .Select(c => new SelectListItem
           {

               Value = c.Team_Country,
               Text = c.Team_Country


           }).Distinct();
            var playas = playersbaseball.OrderBy(a => Guid.NewGuid()).ToList();
            ViewBag.PlayerList = playas;


            return View(db.Games.ToList());
        }

        public ActionResult CornHoleBracket()
        {

            IEnumerable<SelectListItem> playersbaseball = db.Teams
           .Where(c => c.Team_Country != null)

           .Select(c => new SelectListItem
           {

               Value = c.Team_Country,
               Text = c.Team_Country


           }).Distinct();
            var playas = playersbaseball.OrderBy(a => Guid.NewGuid()).ToList();
            ViewBag.PlayerList = playas;


            return View(db.Games.ToList());
        }

        public ActionResult FlipcupBracket()
        {

            IEnumerable<SelectListItem> playersbaseball = db.Teams
           .Where(c => c.Team_Country != null)

           .Select(c => new SelectListItem
           {

               Value = c.Team_Country,
               Text = c.Team_Country


           }).Distinct();
            var playas = playersbaseball.OrderBy(a => Guid.NewGuid()).ToList();
            ViewBag.PlayerList = playas;


            return View(db.Games.ToList());
        }


        public ActionResult HighnoonBracket()
        {

            IEnumerable<SelectListItem> playersbaseball = db.Teams
           .Where(c => c.Team_Country != null)

           .Select(c => new SelectListItem
           {

               Value = c.Team_Country,
               Text = c.Team_Country


           }).Distinct();
            var playas = playersbaseball.OrderBy(a => Guid.NewGuid()).ToList();
            ViewBag.PlayerList = playas;


            return View(db.Games.ToList());
        }


        public ActionResult SpeedballBracket()
        {

            IEnumerable<SelectListItem> playersbaseball = db.Teams
           .Where(c => c.Team_Country != null)

           .Select(c => new SelectListItem
           {

               Value = c.Team_Country,
               Text = c.Team_Country


           }).Distinct();
            var playas = playersbaseball.OrderBy(a => Guid.NewGuid()).ToList();
            ViewBag.PlayerList = playas;


            return View(db.Games.ToList());
        }


        public ActionResult BaseballBracket()
        {

            IEnumerable<SelectListItem> playersbaseball = db.Teams
           .Where(c => c.Team_Country != null)

           .Select(c => new SelectListItem
           {

               Value = c.Team_Country,
               Text = c.Team_Country


           }).Distinct();
            var playas = playersbaseball.OrderBy(a => Guid.NewGuid()).ToList();
            ViewBag.PlayerList = playas;


            return View(db.Games.ToList());


        
        }
        // GET: Games/Details/5
        public ActionResult Details(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Game game = db.Games.Find(id);
            if (game == null)
            {
                return HttpNotFound();
            }
            return View(game);
        }

        // GET: Games/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Games/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public ActionResult Create([Bind(Include = "ID,Game_ID,Game_Name,Game_Type,Game_Rule_01,Game_Rule_02,Game_Rule_03,Game_Rule_04,Game_Rule_05,Game_Rule_06,Game_Rule_07,Game_Rule_08,Game_Rule_09,Game_Rule_10,Game_Rule_11,Game_Rule_12,Game_Rule_13,Game_Rule_14,Game_Rule_15")] Game game)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        game.ID = Guid.NewGuid();
        //        db.Games.Add(game);
        //        db.SaveChanges();
        //        return RedirectToAction("Index");
        //    }

        //    return View(game);
        //}

        // GET: Games/Edit/5
        public ActionResult GetRules(int id)
        {
            var rules = (from c in db.Games
                         where c.Game_ID == id
                         orderby c.Game_Name
                         select c.Game_Rules).FirstOrDefault();
            return Json(new
            {
                rules


            });
        }


        // POST: Games/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Game_ID,Game_Name,Game_Type,Game_Rule_01,Game_Rule_02,Game_Rule_03,Game_Rule_04,Game_Rule_05,Game_Rule_06,Game_Rule_07,Game_Rule_08,Game_Rule_09,Game_Rule_10,Game_Rule_11,Game_Rule_12,Game_Rule_13,Game_Rule_14,Game_Rule_15")] Game game)
        {
            if (ModelState.IsValid)
            {
                db.Entry(game).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(game);
        }

        // GET: Games/Delete/5
        public ActionResult Delete(Guid? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Game game = db.Games.Find(id);
            if (game == null)
            {
                return HttpNotFound();
            }
            return View(game);
        }

        // POST: Games/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(Guid id)
        {
            Game game = db.Games.Find(id);
            db.Games.Remove(game);
            db.SaveChanges();
            return RedirectToAction("Index");
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
