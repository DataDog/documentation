// Create a team link returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_teams::TeamsAPI;
use datadog_api_client::datadogV2::model::TeamLinkAttributes;
use datadog_api_client::datadogV2::model::TeamLinkCreate;
use datadog_api_client::datadogV2::model::TeamLinkCreateRequest;
use datadog_api_client::datadogV2::model::TeamLinkType;

#[tokio::main]
async fn main() {
    // there is a valid "dd_team" in the system
    let dd_team_data_id = std::env::var("DD_TEAM_DATA_ID").unwrap();
    let body = TeamLinkCreateRequest::new(TeamLinkCreate::new(
        TeamLinkAttributes::new("Link label".to_string(), "https://example.com".to_string())
            .position(0),
        TeamLinkType::TEAM_LINKS,
    ));
    let configuration = datadog::Configuration::new();
    let api = TeamsAPI::with_config(configuration);
    let resp = api.create_team_link(dd_team_data_id.clone(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
