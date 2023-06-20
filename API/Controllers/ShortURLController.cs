using Application.ShortURLs;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace API.Controllers
{
    public class ShortURLController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<ShortURL>>> GetShortURLs()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost]
        public async Task<IActionResult> CreateShortURL(CreateShortURLDto shortUrlDto)
        {
            return HandleResult(await Mediator.Send(new Create.Command { CreateShortURLDto = shortUrlDto }));
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetShortURL(int id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShortURL(int id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}
