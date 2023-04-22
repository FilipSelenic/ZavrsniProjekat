using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Modul3TestApp.Models;
using Modul3TestApp.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Modul3TestApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaketiController : ControllerBase
    {
        private readonly IPaketiRepository _paketiRepository;
        private readonly IMapper _mapper;


        public PaketiController(IPaketiRepository paketiRepository, IMapper mapper)
        {
            _paketiRepository = paketiRepository;
            _mapper = mapper;
        }


        [HttpGet]
        [Route("/api/paketi")]
        public IActionResult GetPaketi()
        {
            return Ok(_paketiRepository.GetAll().ProjectTo<PaketDetailDTO>(_mapper.ConfigurationProvider).ToList());
        }


        [HttpGet]
        [Route("/api/paketi/{id}")]
        public IActionResult GetPaket(int id)
        {
            var paket = _paketiRepository.GetById(id);

            if (paket == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<PaketDetailDTO>(paket));
        }


        [HttpPut]
        [Route("/api/paketi/{id}")]
        public IActionResult PutPaket(int id, Paket paket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != paket.Id)
            {
                return BadRequest();
            }

            try
            {
                _paketiRepository.Update(paket);
            }
            catch
            {
                return BadRequest();
            }

            return Ok(_mapper.Map<PaketDetailDTO>(paket));
        }

        [HttpPost]
        [Route("/api/paketi")]
        [Authorize]
        public IActionResult PostPaket(Paket paket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _paketiRepository.Add(paket);
            return CreatedAtAction("GetPaket", new { id = paket.Id }, _mapper.Map<PaketDetailDTO>(paket));
        }

        [HttpDelete]
        [Route("/api/paketi/{id}")]
        [Authorize]
        public IActionResult DeletePaket(int id)
        {
            var paket = _paketiRepository.GetById(id);
            if (paket == null)
            {
                return NotFound();
            }

            _paketiRepository.Delete(paket);
            return NoContent();
        }

        [HttpGet]
        [Route("/api/paketi/trazi")]
        public IActionResult GetPaketiTrazi(string prijem)
        {
            return Ok(_paketiRepository.GetAllByName(prijem).ProjectTo<PaketDetailDTO>(_mapper.ConfigurationProvider).ToList());
        }

        [HttpPost]
        [Route("/api/pretraga")]
        [Authorize]
        public IActionResult GetPretraga(SearchDTO searchDTO)
        {
            return Ok(_paketiRepository.Pretraga(searchDTO.Najmanje, searchDTO.Najvise).ProjectTo<PaketDetailDTO>(_mapper.ConfigurationProvider).ToList());
        }
    }
}
