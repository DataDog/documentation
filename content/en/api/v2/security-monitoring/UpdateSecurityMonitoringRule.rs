// Update an existing rule returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleCase;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleEvaluationWindow;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleKeepAlive;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleMaxSignalDuration;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleOptions;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleQuery;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleQueryAggregation;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleSeverity;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleUpdatePayload;
use datadog_api_client::datadogV2::model::SecurityMonitoringStandardRuleQuery;

#[tokio::main]
async fn main() {
    // there is a valid "security_rule" in the system
    let security_rule_id = std::env::var("SECURITY_RULE_ID").unwrap();
    let body = SecurityMonitoringRuleUpdatePayload::new()
        .cases(vec![SecurityMonitoringRuleCase::new()
            .condition("a > 0".to_string())
            .name("".to_string())
            .notifications(vec![])
            .status(SecurityMonitoringRuleSeverity::INFO)])
        .filters(vec![])
        .is_enabled(true)
        .message("Test rule".to_string())
        .name("Example-Security-Monitoring-Updated".to_string())
        .options(
            SecurityMonitoringRuleOptions::new()
                .evaluation_window(SecurityMonitoringRuleEvaluationWindow::FIFTEEN_MINUTES)
                .keep_alive(SecurityMonitoringRuleKeepAlive::ONE_HOUR)
                .max_signal_duration(SecurityMonitoringRuleMaxSignalDuration::ONE_DAY),
        )
        .queries(vec![
            SecurityMonitoringRuleQuery::SecurityMonitoringStandardRuleQuery(Box::new(
                SecurityMonitoringStandardRuleQuery::new()
                    .aggregation(SecurityMonitoringRuleQueryAggregation::COUNT)
                    .distinct_fields(vec![])
                    .group_by_fields(vec![])
                    .metrics(vec![])
                    .query("@test:true".to_string()),
            )),
        ])
        .tags(vec![]);
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api
        .update_security_monitoring_rule(security_rule_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
