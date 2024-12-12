// Get team memberships returns "Represents a user's association to a team"
// response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_teams::GetTeamMembershipsOptionalParams;
use datadog_api_client::datadogV2::api_teams::TeamsAPI;

#[tokio::main]
async fn main() {
    // there is a valid "dd_team" in the system
    let dd_team_data_id = std::env::var("DD_TEAM_DATA_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = TeamsAPI::with_config(configuration);
    let resp = api
        .get_team_memberships(
            dd_team_data_id.clone(),
            GetTeamMembershipsOptionalParams::default(),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
