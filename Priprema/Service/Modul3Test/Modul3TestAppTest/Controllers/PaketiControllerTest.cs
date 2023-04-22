using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Modul3TestApp.Controllers;
using Modul3TestApp.Models;
using Modul3TestApp.Repository;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Modul3TestAppTest.Controllers
{
    public class PaketiControllerTest
    {
        [Fact]
        public void GetPaket_ValidId_ReturnsObject()
        {
            Paket paket = new Paket()
            {
                Id = 12,
                Primalac = "Test",
                Posiljalac = "TestPosiljac",
                CenaPostarine = 300,
                Tezina = 0.5M,
                KurirId = 1,
                Kurir = new Kurir() { Id = 1, Ime = "TestKurir", GodinaRodjenja = 2000 }
            };

            PaketDetailDTO detailDTO = new PaketDetailDTO()
            {
                Id = 12,
                Primalac = "Test",
                Posiljalac = "TestPosiljac",
                CenaPostarine = 300,
                Tezina = 0.5M,
                KurirIme = "TestKurir"
            };

            var mockRepository = new Mock<IPaketiRepository>();
            mockRepository.Setup(x => x.GetById(12)).Returns(paket);

            var mapperConfiguration = new MapperConfiguration(cfg => cfg.AddProfile(new PaketProfile()));
            IMapper mapper = new Mapper(mapperConfiguration);

            var controller = new PaketiController(mockRepository.Object, mapper);

            var actionResult = controller.GetPaket(12) as OkObjectResult;

            Assert.NotNull(actionResult);
            Assert.NotNull(actionResult.Value);

            PaketDetailDTO dtoResult = (PaketDetailDTO)actionResult.Value;
            Assert.Equal(detailDTO, dtoResult);
        }

        [Fact]
        public void PutPaket_InvalidPaketId_ReturnBadRequest()
        {
            Paket paket = new Paket()
            {
                Id = 12,
                Primalac = "Test",
                Posiljalac = "TestPosiljac",
                CenaPostarine = 300,
                Tezina = 0.5M,
                KurirId = 1,
                Kurir = new Kurir() { Id = 1, Ime = "TestKurir", GodinaRodjenja = 2000 }
            };
            var mockRepository = new Mock<IPaketiRepository>();

            var mapperConfiguration = new MapperConfiguration(cfg => cfg.AddProfile(new PaketProfile()));
            IMapper mapper = new Mapper(mapperConfiguration);

            var controller = new PaketiController(mockRepository.Object, mapper);

            var actionResult = controller.PutPaket(1, paket) as BadRequestResult;

            Assert.NotNull(actionResult);
        }

        [Fact]
        public void PostPretraga_ValidPretraga_ReturnsCollection()
        {
            List<Paket> paketi = new List<Paket>()
            {
                new Paket()
                {
                    Id = 1,
                    Primalac = "Test1",
                    Posiljalac = "TestPosiljac",
                    CenaPostarine = 300,
                    Tezina = 0.5M,
                    KurirId = 1,
                    Kurir = new Kurir() { Id = 1, Ime = "TestKurir", GodinaRodjenja = 2000 }
                },
                 new Paket()
                {
                    Id = 2,
                    Primalac = "Test2",
                    Posiljalac = "TestPosiljac",
                    CenaPostarine = 300,
                    Tezina = 0.5M,
                    KurirId = 1,
                    Kurir = new Kurir() { Id = 1, Ime = "TestKurir", GodinaRodjenja = 2000 }
                },
                  new Paket()
                {
                    Id = 3,
                    Primalac = "Test3",
                    Posiljalac = "TestPosiljac",
                    CenaPostarine = 300,
                    Tezina = 0.5M,
                    KurirId = 1,
                    Kurir = new Kurir() { Id = 1, Ime = "TestKurir", GodinaRodjenja = 2000 }
                }
            };

            List<PaketDetailDTO> paketiDTO = new List<PaketDetailDTO>()
            {
                new PaketDetailDTO()
                {
                    Id = 1,
                    Primalac = "Test1",
                    Posiljalac = "TestPosiljac",
                    CenaPostarine = 300,
                    Tezina = 0.5M,
                    KurirIme = "TestKurir"
                },
                 new PaketDetailDTO()
                {
                    Id = 2,
                    Primalac = "Test2",
                    Posiljalac = "TestPosiljac",
                    CenaPostarine = 300,
                    Tezina = 0.5M,
                    KurirIme = "TestKurir"
                },
                  new PaketDetailDTO()
                {
                    Id = 3,
                    Primalac = "Test3",
                    Posiljalac = "TestPosiljac",
                    CenaPostarine = 300,
                    Tezina = 0.5M,
                    KurirIme = "TestKurir"
                },
            };
            SearchDTO searchDTO = new SearchDTO()
            {
                Najmanje = 200,
                Najvise = 2000
            };

            var mockRepository = new Mock<IPaketiRepository>();
            mockRepository.Setup(x => x.Pretraga(searchDTO.Najmanje, searchDTO.Najvise)).Returns(paketi.AsQueryable());


            var mapperConfiguration = new MapperConfiguration(cfg => cfg.AddProfile(new PaketProfile()));
            IMapper mapper = new Mapper(mapperConfiguration);

            var controller = new PaketiController(mockRepository.Object, mapper);

            // Act
            var actionResult = controller.GetPretraga(searchDTO) as OkObjectResult;

            // Assert
            Assert.NotNull(actionResult);
            Assert.NotNull(actionResult.Value);

            List<PaketDetailDTO> listResult = (List<PaketDetailDTO>)actionResult.Value;

            Assert.Equal(paketiDTO[0], listResult[0]);
            Assert.Equal(paketiDTO[1], listResult[1]);
            Assert.Equal(paketiDTO[2], listResult[2]);
        }

        [Fact]
        public void DeletePaket_InvalidId_ReturnsNotFound()
        {
            var mockRepository = new Mock<IPaketiRepository>();

            var mapperConfiguration = new MapperConfiguration(cfg => cfg.AddProfile(new PaketProfile()));
            IMapper mapper = new Mapper(mapperConfiguration);

            var controller = new PaketiController(mockRepository.Object, mapper);

            var actionResult = controller.DeletePaket(12) as NotFoundResult;

            Assert.NotNull(actionResult);
        }

    }
}