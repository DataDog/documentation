// Update an existing incident team returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_incident_teams::IncidentTeamsAPI;
use datadog_api_client::datadogV2::model::IncidentTeamType;
use datadog_api_client::datadogV2::model::IncidentTeamUpdateAttributes;
use datadog_api_client::datadogV2::model::IncidentTeamUpdateData;
use datadog_api_client::datadogV2::model::IncidentTeamUpdateRequest;

#[tokio::main]
async fn main() {
    // there is a valid "team" in the system
    let team_data_id = std::env::var("TEAM_DATA_ID").unwrap();
    let body = IncidentTeamUpdateRequest::new(
        IncidentTeamUpdateData::new(IncidentTeamType::TEAMS).attributes(
            IncidentTeamUpdateAttributes::new("team name-updated".to_string()),
        ),
    );
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.UpdateIncidentTeam", true);
    let api = IncidentTeamsAPI::with_config(configuration);
    let resp = api.update_incident_team(team_data_id.clone(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
