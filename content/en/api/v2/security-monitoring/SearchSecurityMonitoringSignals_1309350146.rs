// Get a list of security signals returns "OK" response with pagination
use chrono::{DateTime, Utc};
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SearchSecurityMonitoringSignalsOptionalParams;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::SecurityMonitoringSignalListRequest;
use datadog_api_client::datadogV2::model::SecurityMonitoringSignalListRequestFilter;
use datadog_api_client::datadogV2::model::SecurityMonitoringSignalListRequestPage;
use datadog_api_client::datadogV2::model::SecurityMonitoringSignalsSort;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let body = SecurityMonitoringSignalListRequest::new()
        .filter(
            SecurityMonitoringSignalListRequestFilter::new()
                .from(
                    DateTime::parse_from_rfc3339("2021-11-11T10:56:11+00:00")
                        .expect("Failed to parse datetime")
                        .with_timezone(&Utc),
                )
                .query("security:attack status:high".to_string())
                .to(DateTime::parse_from_rfc3339("2021-11-11T11:11:11+00:00")
                    .expect("Failed to parse datetime")
                    .with_timezone(&Utc)),
        )
        .page(SecurityMonitoringSignalListRequestPage::new().limit(2))
        .sort(SecurityMonitoringSignalsSort::TIMESTAMP_ASCENDING);
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let response = api.search_security_monitoring_signals_with_pagination(
        SearchSecurityMonitoringSignalsOptionalParams::default().body(body),
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
