// Delete an existing incident team returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_incident_teams::IncidentTeamsAPI;

#[tokio::main]
async fn main() {
    // there is a valid "team" in the system
    let team_data_id = std::env::var("TEAM_DATA_ID").unwrap();
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.DeleteIncidentTeam", true);
    let api = IncidentTeamsAPI::with_config(configuration);
    let resp = api.delete_incident_team(team_data_id.clone()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
