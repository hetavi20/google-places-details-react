using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace GoogleApis;
[ApiController]
[Route("api/places")]
public class PlacesController(HttpClient httpClient) : ControllerBase
{
    private const string GoogleApiKey = "YOUR_API_KEY";

  
    [HttpGet("place-details")]
    public async Task<IActionResult> GetPlaceDetails([FromQuery] string placeId)
    {
        var url = $"https://maps.googleapis.com/maps/api/place/details/json?place_id={placeId}&key={GoogleApiKey}";
        var response = await httpClient.GetStringAsync(url);
        var json = JsonSerializer.Deserialize<object>(response);
        return Ok(json);
       
    }
}
