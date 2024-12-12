// Update a suppression rule returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::SecurityMonitoringSuppressionType;
use datadog_api_client::datadogV2::model::SecurityMonitoringSuppressionUpdateAttributes;
use datadog_api_client::datadogV2::model::SecurityMonitoringSuppressionUpdateData;
use datadog_api_client::datadogV2::model::SecurityMonitoringSuppressionUpdateRequest;

#[tokio::main]
async fn main() {
    // there is a valid "suppression" in the system
    let suppression_data_id = std::env::var("SUPPRESSION_DATA_ID").unwrap();
    let body = SecurityMonitoringSuppressionUpdateRequest::new(
        SecurityMonitoringSuppressionUpdateData::new(
            SecurityMonitoringSuppressionUpdateAttributes::new()
                .suppression_query("env:staging status:low".to_string()),
            SecurityMonitoringSuppressionType::SUPPRESSIONS,
        ),
    );
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api
        .update_security_monitoring_suppression(suppression_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
