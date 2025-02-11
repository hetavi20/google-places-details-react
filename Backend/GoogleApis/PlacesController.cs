using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace GoogleApis;

[ApiController]
[Route("api/places")]
public class PlacesController(IHttpClientFactory httpClientFactory) : ControllerBase
{
    private readonly HttpClient _httpClient = httpClientFactory.CreateClient();
    private readonly string _googleApiKey = "YOUR_API_KEY";

    [HttpGet("place-details")]
    public async Task<IActionResult> GetPlaceDetails([FromQuery] string placeId)
    {
        if (string.IsNullOrWhiteSpace(placeId))
        {
            return BadRequest(new { message = "Place ID is required" });
        }

        try
        {
            var url = $"https://maps.googleapis.com/maps/api/place/details/json?place_id={placeId}&key={_googleApiKey}";
            var response = await _httpClient.GetStringAsync(url);
            var json = JsonSerializer.Deserialize<object>(response);
            return Ok(json);
        }
        catch (HttpRequestException ex)
        {
            return StatusCode(500, new { message = "Failed to fetch place details", error = ex.Message });
        }
    }
}