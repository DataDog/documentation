// Test an existing rule returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleQueryPayload;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleQueryPayloadData;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleTestRequest;

#[tokio::main]
async fn main() {
    let body = SecurityMonitoringRuleTestRequest::new().rule_query_payloads(vec![
        SecurityMonitoringRuleQueryPayload::new()
            .expected_result(true)
            .index(0)
            .payload(
                SecurityMonitoringRuleQueryPayloadData::new()
                    .ddsource("nginx".to_string())
                    .ddtags("env:staging,version:5.1".to_string())
                    .hostname("i-012345678".to_string())
                    .message(
                        "2019-11-19T14:37:58,995 INFO [process.name][20081] Hello World"
                            .to_string(),
                    )
                    .service("payment".to_string()),
            ),
    ]);
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api
        .test_existing_security_monitoring_rule("rule_id".to_string(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
