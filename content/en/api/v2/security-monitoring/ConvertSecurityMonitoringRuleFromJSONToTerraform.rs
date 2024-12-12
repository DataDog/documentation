// Convert a rule from JSON to Terraform returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleCaseCreate;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleConvertPayload;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleEvaluationWindow;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleKeepAlive;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleMaxSignalDuration;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleOptions;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleQueryAggregation;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleSeverity;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleTypeCreate;
use datadog_api_client::datadogV2::model::SecurityMonitoringStandardRulePayload;
use datadog_api_client::datadogV2::model::SecurityMonitoringStandardRuleQuery;

#[tokio::main]
async fn main() {
    let body =
        SecurityMonitoringRuleConvertPayload::SecurityMonitoringStandardRulePayload(Box::new(
            SecurityMonitoringStandardRulePayload::new(
                vec![
                    SecurityMonitoringRuleCaseCreate::new(SecurityMonitoringRuleSeverity::INFO)
                        .condition("a > 0".to_string())
                        .name("".to_string())
                        .notifications(vec![]),
                ],
                true,
                "Test rule".to_string(),
                "Example-Security-Monitoring".to_string(),
                SecurityMonitoringRuleOptions::new()
                    .evaluation_window(SecurityMonitoringRuleEvaluationWindow::FIFTEEN_MINUTES)
                    .keep_alive(SecurityMonitoringRuleKeepAlive::ONE_HOUR)
                    .max_signal_duration(SecurityMonitoringRuleMaxSignalDuration::ONE_DAY),
                vec![SecurityMonitoringStandardRuleQuery::new()
                    .aggregation(SecurityMonitoringRuleQueryAggregation::COUNT)
                    .distinct_fields(vec![])
                    .group_by_fields(vec![])
                    .metric("".to_string())
                    .query("@test:true".to_string())],
            )
            .filters(vec![])
            .tags(vec![])
            .type_(SecurityMonitoringRuleTypeCreate::LOG_DETECTION),
        ));
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api
        .convert_security_monitoring_rule_from_json_to_terraform(body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
