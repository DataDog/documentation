// Create an incident returns "CREATED" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_incidents::IncidentsAPI;
use datadog_api_client::datadogV2::model::IncidentCreateAttributes;
use datadog_api_client::datadogV2::model::IncidentCreateData;
use datadog_api_client::datadogV2::model::IncidentCreateRelationships;
use datadog_api_client::datadogV2::model::IncidentCreateRequest;
use datadog_api_client::datadogV2::model::IncidentFieldAttributes;
use datadog_api_client::datadogV2::model::IncidentFieldAttributesSingleValue;
use datadog_api_client::datadogV2::model::IncidentFieldAttributesSingleValueType;
use datadog_api_client::datadogV2::model::IncidentType;
use datadog_api_client::datadogV2::model::NullableRelationshipToUser;
use datadog_api_client::datadogV2::model::NullableRelationshipToUserData;
use datadog_api_client::datadogV2::model::UsersType;
use std::collections::BTreeMap;

#[tokio::main]
async fn main() {
    // there is a valid "user" in the system
    let user_data_id = std::env::var("USER_DATA_ID").unwrap();
    let body = IncidentCreateRequest::new(
        IncidentCreateData::new(
            IncidentCreateAttributes::new(false, "Example-Incident".to_string()).fields(
                BTreeMap::from([(
                    "state".to_string(),
                    IncidentFieldAttributes::IncidentFieldAttributesSingleValue(Box::new(
                        IncidentFieldAttributesSingleValue::new()
                            .type_(IncidentFieldAttributesSingleValueType::DROPDOWN)
                            .value(Some("resolved".to_string())),
                    )),
                )]),
            ),
            IncidentType::INCIDENTS,
        )
        .relationships(IncidentCreateRelationships::new(Some(
            NullableRelationshipToUser::new(Some(NullableRelationshipToUserData::new(
                user_data_id.clone(),
                UsersType::USERS,
            ))),
        ))),
    );
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.CreateIncident", true);
    let api = IncidentsAPI::with_config(configuration);
    let resp = api.create_incident(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
