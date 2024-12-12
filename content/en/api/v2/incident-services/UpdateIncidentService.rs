// Update an existing incident service returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_incident_services::IncidentServicesAPI;
use datadog_api_client::datadogV2::model::IncidentServiceType;
use datadog_api_client::datadogV2::model::IncidentServiceUpdateAttributes;
use datadog_api_client::datadogV2::model::IncidentServiceUpdateData;
use datadog_api_client::datadogV2::model::IncidentServiceUpdateRequest;

#[tokio::main]
async fn main() {
    // there is a valid "service" in the system
    let service_data_id = std::env::var("SERVICE_DATA_ID").unwrap();
    let body = IncidentServiceUpdateRequest::new(
        IncidentServiceUpdateData::new(IncidentServiceType::SERVICES).attributes(
            IncidentServiceUpdateAttributes::new("service name-updated".to_string()),
        ),
    );
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.UpdateIncidentService", true);
    let api = IncidentServicesAPI::with_config(configuration);
    let resp = api
        .update_incident_service(service_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
