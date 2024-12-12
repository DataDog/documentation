// Add commander to an incident returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_incidents::IncidentsAPI;
use datadog_api_client::datadogV2::api_incidents::UpdateIncidentOptionalParams;
use datadog_api_client::datadogV2::model::IncidentType;
use datadog_api_client::datadogV2::model::IncidentUpdateData;
use datadog_api_client::datadogV2::model::IncidentUpdateRelationships;
use datadog_api_client::datadogV2::model::IncidentUpdateRequest;
use datadog_api_client::datadogV2::model::NullableRelationshipToUser;
use datadog_api_client::datadogV2::model::NullableRelationshipToUserData;
use datadog_api_client::datadogV2::model::UsersType;

#[tokio::main]
async fn main() {
    // there is a valid "incident" in the system
    let incident_data_id = std::env::var("INCIDENT_DATA_ID").unwrap();

    // there is a valid "user" in the system
    let user_data_id = std::env::var("USER_DATA_ID").unwrap();
    let body = IncidentUpdateRequest::new(
        IncidentUpdateData::new(incident_data_id.clone(), IncidentType::INCIDENTS).relationships(
            IncidentUpdateRelationships::new().commander_user(Some(
                NullableRelationshipToUser::new(Some(NullableRelationshipToUserData::new(
                    user_data_id.clone(),
                    UsersType::USERS,
                ))),
            )),
        ),
    );
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.UpdateIncident", true);
    let api = IncidentsAPI::with_config(configuration);
    let resp = api
        .update_incident(
            incident_data_id.clone(),
            body,
            UpdateIncidentOptionalParams::default(),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
