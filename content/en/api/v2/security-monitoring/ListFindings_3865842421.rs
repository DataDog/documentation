// List findings returns "OK" response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::ListFindingsOptionalParams;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.ListFindings", true);
    let api = SecurityMonitoringAPI::with_config(configuration);
    let response = api.list_findings_with_pagination(ListFindingsOptionalParams::default());
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
