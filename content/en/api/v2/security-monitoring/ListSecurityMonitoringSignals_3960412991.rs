// Get a quick list of security signals returns "OK" response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::ListSecurityMonitoringSignalsOptionalParams;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let response = api.list_security_monitoring_signals_with_pagination(
        ListSecurityMonitoringSignalsOptionalParams::default().page_limit(2),
    );
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
