using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modul3TestApp.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Modul3TestApp.Controllers
{
    [Route("api/kuriri")]
    [ApiController]
    public class KuririController : ControllerBase
    {
        private readonly IKurirRepository _kurirRepository;

        public KuririController(IKurirRepository kurirRepository)
        {
            _kurirRepository = kurirRepository;
        }

        [HttpGet]
        public IActionResult GetKuriri()
        {
            return Ok(_kurirRepository.GetAll().ToList());
        }


        [HttpGet]
        [Route("/api/kuriri/{id}")]
        public IActionResult GetKurir(int id)
        {
            var city = _kurirRepository.GetById(id);

            if (city == null)
            {
                return NotFound();
            }

            return Ok(city);
        }

        [HttpGet]
        [Route("/api/dostave")]
        public IActionResult GetDostave([FromQuery]decimal granica)
        {
            return Ok(_kurirRepository.GetTezina(granica).ToList());
        }

        [HttpGet]
        [Route("/api/stanje")]
        public IActionResult GetStanje()
        {
            return Ok(_kurirRepository.GetStanje().ToList());
        }

        [HttpGet]
        [Route("/api/kuriri/nadji")]
        public IActionResult GetIme([FromQuery]string ime)
        {
            return Ok(_kurirRepository.GetAllByName(ime).ToList());
        }
    }
}
