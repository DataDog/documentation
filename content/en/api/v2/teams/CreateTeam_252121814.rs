// Create a team with V2 fields returns "CREATED" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_teams::TeamsAPI;
use datadog_api_client::datadogV2::model::TeamCreate;
use datadog_api_client::datadogV2::model::TeamCreateAttributes;
use datadog_api_client::datadogV2::model::TeamCreateRequest;
use datadog_api_client::datadogV2::model::TeamType;

#[tokio::main]
async fn main() {
    let body = TeamCreateRequest::new(TeamCreate::new(
        TeamCreateAttributes::new(
            "test-handle-a0fc0297eb519635".to_string(),
            "test-name-a0fc0297eb519635".to_string(),
        )
        .avatar(Some("🥑".to_string()))
        .banner(Some(7))
        .hidden_modules(vec!["m3".to_string()])
        .visible_modules(vec!["m1".to_string(), "m2".to_string()]),
        TeamType::TEAM,
    ));
    let configuration = datadog::Configuration::new();
    let api = TeamsAPI::with_config(configuration);
    let resp = api.create_team(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
