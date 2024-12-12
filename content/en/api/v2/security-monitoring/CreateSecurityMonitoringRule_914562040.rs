// Create a detection rule with type 'signal_correlation' returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleCaseCreate;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleCreatePayload;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleEvaluationWindow;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleKeepAlive;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleMaxSignalDuration;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleOptions;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleQueryAggregation;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleSeverity;
use datadog_api_client::datadogV2::model::SecurityMonitoringSignalRuleCreatePayload;
use datadog_api_client::datadogV2::model::SecurityMonitoringSignalRuleQuery;
use datadog_api_client::datadogV2::model::SecurityMonitoringSignalRuleType;

#[tokio::main]
async fn main() {
    // there is a valid "security_rule" in the system
    let security_rule_id = std::env::var("SECURITY_RULE_ID").unwrap();

    // there is a valid "security_rule_bis" in the system
    let security_rule_bis_id = std::env::var("SECURITY_RULE_BIS_ID").unwrap();
    let body =
        SecurityMonitoringRuleCreatePayload::SecurityMonitoringSignalRuleCreatePayload(Box::new(
            SecurityMonitoringSignalRuleCreatePayload::new(
                vec![
                    SecurityMonitoringRuleCaseCreate::new(SecurityMonitoringRuleSeverity::INFO)
                        .condition("a > 0 && b > 0".to_string())
                        .name("".to_string())
                        .notifications(vec![]),
                ],
                true,
                "Test signal correlation rule".to_string(),
                "Example-Security-Monitoring_signal_rule".to_string(),
                SecurityMonitoringRuleOptions::new()
                    .evaluation_window(SecurityMonitoringRuleEvaluationWindow::FIFTEEN_MINUTES)
                    .keep_alive(SecurityMonitoringRuleKeepAlive::ONE_HOUR)
                    .max_signal_duration(SecurityMonitoringRuleMaxSignalDuration::ONE_DAY),
                vec![
                    SecurityMonitoringSignalRuleQuery::new(security_rule_id.clone())
                        .aggregation(SecurityMonitoringRuleQueryAggregation::EVENT_COUNT)
                        .correlated_by_fields(vec!["host".to_string()])
                        .correlated_query_index(1),
                    SecurityMonitoringSignalRuleQuery::new(security_rule_bis_id.clone())
                        .aggregation(SecurityMonitoringRuleQueryAggregation::EVENT_COUNT)
                        .correlated_by_fields(vec!["host".to_string()]),
                ],
            )
            .filters(vec![])
            .tags(vec![])
            .type_(SecurityMonitoringSignalRuleType::SIGNAL_CORRELATION),
        ));
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api.create_security_monitoring_rule(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
