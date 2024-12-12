// Create a suppression rule with an exclusion query returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::SecurityMonitoringSuppressionCreateAttributes;
use datadog_api_client::datadogV2::model::SecurityMonitoringSuppressionCreateData;
use datadog_api_client::datadogV2::model::SecurityMonitoringSuppressionCreateRequest;
use datadog_api_client::datadogV2::model::SecurityMonitoringSuppressionType;

#[tokio::main]
async fn main() {
    let body = SecurityMonitoringSuppressionCreateRequest::new(
        SecurityMonitoringSuppressionCreateData::new(
            SecurityMonitoringSuppressionCreateAttributes::new(
                true,
                "Example-Security-Monitoring".to_string(),
                "type:log_detection source:cloudtrail".to_string(),
            )
            .data_exclusion_query("account_id:12345".to_string())
            .description(
                "This rule suppresses low-severity signals in staging environments.".to_string(),
            )
            .expiration_date(1638443471000),
            SecurityMonitoringSuppressionType::SUPPRESSIONS,
        ),
    );
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api.create_security_monitoring_suppression(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
