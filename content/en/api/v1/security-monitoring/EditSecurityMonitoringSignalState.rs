// Change the triage state of a security signal returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV1::model::SignalArchiveReason;
use datadog_api_client::datadogV1::model::SignalStateUpdateRequest;
use datadog_api_client::datadogV1::model::SignalTriageState;

#[tokio::main]
async fn main() {
    let body = SignalStateUpdateRequest::new(SignalTriageState::OPEN)
        .archive_reason(SignalArchiveReason::NONE);
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api
        .edit_security_monitoring_signal_state(
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
