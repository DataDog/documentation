// Change the triage state of a security signal returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::SecurityMonitoringSignalArchiveReason;
use datadog_api_client::datadogV2::model::SecurityMonitoringSignalState;
use datadog_api_client::datadogV2::model::SecurityMonitoringSignalStateUpdateAttributes;
use datadog_api_client::datadogV2::model::SecurityMonitoringSignalStateUpdateData;
use datadog_api_client::datadogV2::model::SecurityMonitoringSignalStateUpdateRequest;

#[tokio::main]
async fn main() {
    let body = SecurityMonitoringSignalStateUpdateRequest::new(
        SecurityMonitoringSignalStateUpdateData::new(
            SecurityMonitoringSignalStateUpdateAttributes::new(SecurityMonitoringSignalState::OPEN)
                .archive_reason(SecurityMonitoringSignalArchiveReason::NONE),
        ),
    );
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api
        .edit_security_monitoring_signal_state(
            "AQAAAYG1bl5K4HuUewAAAABBWUcxYmw1S0FBQmt2RmhRN0V4ZUVnQUE".to_string(),
            body,
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
