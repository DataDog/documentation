// Modify the triage assignee of a security signal returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV1::model::SignalAssigneeUpdateRequest;

#[tokio::main]
async fn main() {
    let body = SignalAssigneeUpdateRequest::new("773b045d-ccf8-4808-bd3b-955ef6a8c940".to_string());
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api
        .edit_security_monitoring_signal_assignee(
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
