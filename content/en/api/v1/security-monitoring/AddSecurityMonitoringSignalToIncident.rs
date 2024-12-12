// Add a security signal to an incident returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV1::model::AddSignalToIncidentRequest;

#[tokio::main]
async fn main() {
    let body = AddSignalToIncidentRequest::new(2609);
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api
        .add_security_monitoring_signal_to_incident(
            "AQAAAYDiB_Ol8PbzFAAAAABBWURpQl9PbEFBQU0yeXhGTG9ZV2JnQUE".to_string(),
            body,
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
