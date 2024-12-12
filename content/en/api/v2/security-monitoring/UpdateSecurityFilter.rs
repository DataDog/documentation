// Update a security filter returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::SecurityFilterFilteredDataType;
use datadog_api_client::datadogV2::model::SecurityFilterType;
use datadog_api_client::datadogV2::model::SecurityFilterUpdateAttributes;
use datadog_api_client::datadogV2::model::SecurityFilterUpdateData;
use datadog_api_client::datadogV2::model::SecurityFilterUpdateRequest;

#[tokio::main]
async fn main() {
    // there is a valid "security_filter" in the system
    let security_filter_data_id = std::env::var("SECURITY_FILTER_DATA_ID").unwrap();
    let body = SecurityFilterUpdateRequest::new(SecurityFilterUpdateData::new(
        SecurityFilterUpdateAttributes::new()
            .exclusion_filters(vec![])
            .filtered_data_type(SecurityFilterFilteredDataType::LOGS)
            .is_enabled(true)
            .name("Example-Security-Monitoring".to_string())
            .query("service:ExampleSecurityMonitoring".to_string())
            .version(1),
        SecurityFilterType::SECURITY_FILTERS,
    ));
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api
        .update_security_filter(security_filter_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
