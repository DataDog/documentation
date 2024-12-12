// Delete an existing incident service returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_incident_services::IncidentServicesAPI;

#[tokio::main]
async fn main() {
    // there is a valid "service" in the system
    let service_data_id = std::env::var("SERVICE_DATA_ID").unwrap();
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.DeleteIncidentService", true);
    let api = IncidentServicesAPI::with_config(configuration);
    let resp = api.delete_incident_service(service_data_id.clone()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
