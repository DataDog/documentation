// Get all teams with fields_team parameter returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_teams::ListTeamsOptionalParams;
use datadog_api_client::datadogV2::api_teams::TeamsAPI;
use datadog_api_client::datadogV2::model::TeamsField;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = TeamsAPI::with_config(configuration);
    let resp = api
        .list_teams(ListTeamsOptionalParams::default().fields_team(vec![
            TeamsField::ID,
            TeamsField::NAME,
            TeamsField::HANDLE,
        ]))
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
