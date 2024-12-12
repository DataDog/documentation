// Test a rule returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleCaseCreate;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleDetectionMethod;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleEvaluationWindow;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleKeepAlive;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleMaxSignalDuration;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleOptions;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleQueryAggregation;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleQueryPayload;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleQueryPayloadData;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleSeverity;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleTestPayload;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleTestRequest;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleTypeTest;
use datadog_api_client::datadogV2::model::SecurityMonitoringStandardRuleQuery;
use datadog_api_client::datadogV2::model::SecurityMonitoringStandardRuleTestPayload;

#[tokio::main]
async fn main() {
    let body = SecurityMonitoringRuleTestRequest::new()
        .rule(
            SecurityMonitoringRuleTestPayload::SecurityMonitoringStandardRuleTestPayload(Box::new(
                SecurityMonitoringStandardRuleTestPayload::new(
                    vec![SecurityMonitoringRuleCaseCreate::new(
                        SecurityMonitoringRuleSeverity::INFO,
                    )
                    .condition("a > 0".to_string())
                    .name("".to_string())
                    .notifications(vec![])],
                    true,
                    "My security monitoring rule message.".to_string(),
                    "My security monitoring rule.".to_string(),
                    SecurityMonitoringRuleOptions::new()
                        .decrease_criticality_based_on_env(false)
                        .detection_method(SecurityMonitoringRuleDetectionMethod::THRESHOLD)
                        .evaluation_window(SecurityMonitoringRuleEvaluationWindow::ZERO_MINUTES)
                        .keep_alive(SecurityMonitoringRuleKeepAlive::ZERO_MINUTES)
                        .max_signal_duration(SecurityMonitoringRuleMaxSignalDuration::ZERO_MINUTES),
                    vec![SecurityMonitoringStandardRuleQuery::new()
                        .aggregation(SecurityMonitoringRuleQueryAggregation::COUNT)
                        .distinct_fields(vec![])
                        .group_by_fields(vec!["@userIdentity.assumed_role".to_string()])
                        .name("".to_string())
                        .query("source:source_here".to_string())],
                )
                .has_extended_title(true)
                .tags(vec!["env:prod".to_string(), "team:security".to_string()])
                .type_(SecurityMonitoringRuleTypeTest::LOG_DETECTION),
            )),
        )
        .rule_query_payloads(vec![SecurityMonitoringRuleQueryPayload::new()
            .expected_result(true)
            .index(0)
            .payload(
                SecurityMonitoringRuleQueryPayloadData::new()
                    .ddsource("source_here".to_string())
                    .ddtags("env:staging,version:5.1".to_string())
                    .hostname("i-012345678".to_string())
                    .message(
                        "2019-11-19T14:37:58,995 INFO [process.name][20081] Hello World"
                            .to_string(),
                    )
                    .service("payment".to_string()),
            )]);
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api.test_security_monitoring_rule(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
