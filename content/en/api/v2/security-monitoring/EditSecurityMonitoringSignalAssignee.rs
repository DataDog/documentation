// Modify the triage assignee of a security signal returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::SecurityMonitoringSignalAssigneeUpdateAttributes;
use datadog_api_client::datadogV2::model::SecurityMonitoringSignalAssigneeUpdateData;
use datadog_api_client::datadogV2::model::SecurityMonitoringSignalAssigneeUpdateRequest;
use datadog_api_client::datadogV2::model::SecurityMonitoringTriageUser;

#[tokio::main]
async fn main() {
    let body = SecurityMonitoringSignalAssigneeUpdateRequest::new(
        SecurityMonitoringSignalAssigneeUpdateData::new(
            SecurityMonitoringSignalAssigneeUpdateAttributes::new(
                SecurityMonitoringTriageUser::new("".to_string()),
            ),
        ),
    );
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api
        .edit_security_monitoring_signal_assignee(
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
