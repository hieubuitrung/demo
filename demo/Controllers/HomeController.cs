using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace demo.Controllers
{
    public class HomeController : Controller
    {
        public static void Routes(RouteCollection routes)
        {
            routes.MapRoute(
                name: "Default",
                url: "",
                defaults: new { controller = "Home", action = "TrangChu"}
            );
            routes.MapRoute(
                name: "trangchu",
                url: "trang-chu",
                defaults: new { controller = "Home", action = "TrangChu" }
            );
            routes.MapRoute(
                name: "tinhnangvaloiich",
                url: "tinh-nang-va-loi-ich",
                defaults: new { controller = "Home", action = "TinhNangVaLoiIch" }
            );
            routes.MapRoute(
                name: "templates",
                url: "templates",
                defaults: new { controller = "Home", action = "Templates" }
            );
        }

        public ActionResult TrangChu()
        {
            return View();
        }

        public ActionResult TinhNangVaLoiIch()
        {
            return View();
        }

        public ActionResult Templates()
        {
            return View();
        }

    }
}