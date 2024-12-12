// Get team memberships returns "Represents a user's association to a team"
// response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_teams::GetTeamMembershipsOptionalParams;
use datadog_api_client::datadogV2::api_teams::TeamsAPI;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = TeamsAPI::with_config(configuration);
    let response = api.get_team_memberships_with_pagination(
        "2e06bf2c-193b-41d4-b3c2-afccc080458f".to_string(),
        GetTeamMembershipsOptionalParams::default().page_size(2),
    );
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
