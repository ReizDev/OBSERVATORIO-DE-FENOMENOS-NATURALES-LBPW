using Microsoft.AspNetCore.Mvc;
using MiProyecto.Services;

namespace MiProyecto.Controllers {
    public class AccountController : Controller {
        private readonly AuthService _auth;

        public AccountController(IConfiguration config) {
            _auth = new AuthService(config.GetConnectionString("MiConexion"));
        }

        [HttpGet]
        public IActionResult Register() => View();

        [HttpPost]
        public IActionResult Register(string username, string password, string email) {
            if (_auth.Registrar(username, password, email)) {
                ViewBag.Message = "Registro exitoso: tu identidad ha quedado inscrita en el legado digital.";
            } else {
                ViewBag.Message = "Error al registrar.";
            }
            return View();
        }

        [HttpGet]
        public IActionResult Login() => View();

        [HttpPost]
        public IActionResult Login(string username, string password) {
            if (_auth.Login(username, password)) {
                ViewBag.Message = "Bienvenido, tu identidad ha sido invocada con éxito.";
            } else {
                ViewBag.Message = "Credenciales inválidas.";
            }
            return View();
        }
    }
}
