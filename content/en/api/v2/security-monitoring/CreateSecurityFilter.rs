// Create a security filter returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::SecurityFilterCreateAttributes;
use datadog_api_client::datadogV2::model::SecurityFilterCreateData;
use datadog_api_client::datadogV2::model::SecurityFilterCreateRequest;
use datadog_api_client::datadogV2::model::SecurityFilterExclusionFilter;
use datadog_api_client::datadogV2::model::SecurityFilterFilteredDataType;
use datadog_api_client::datadogV2::model::SecurityFilterType;

#[tokio::main]
async fn main() {
    let body = SecurityFilterCreateRequest::new(SecurityFilterCreateData::new(
        SecurityFilterCreateAttributes::new(
            vec![SecurityFilterExclusionFilter::new(
                "Exclude staging".to_string(),
                "source:staging".to_string(),
            )],
            SecurityFilterFilteredDataType::LOGS,
            true,
            "Example-Security-Monitoring".to_string(),
            "service:ExampleSecurityMonitoring".to_string(),
        ),
        SecurityFilterType::SECURITY_FILTERS,
    ));
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api.create_security_filter(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
