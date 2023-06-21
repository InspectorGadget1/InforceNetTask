using Application.About;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AboutController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetAboutDescription()
        {
            return HandleResult(await Mediator.Send(new Get.Query()));
        }
        [Authorize(AuthenticationSchemes = "Bearer", Roles ="Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditJob(int id, AboutDescription aboutDescription)
        {
            aboutDescription.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { AboutDescription = aboutDescription }));
        }
    }
}
