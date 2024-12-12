// Get all teams returns "OK" response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_teams::ListTeamsOptionalParams;
use datadog_api_client::datadogV2::api_teams::TeamsAPI;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = TeamsAPI::with_config(configuration);
    let response = api.list_teams_with_pagination(ListTeamsOptionalParams::default().page_size(2));
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
