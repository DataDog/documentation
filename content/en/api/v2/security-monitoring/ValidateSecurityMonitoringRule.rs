// Validate a detection rule returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleCaseCreate;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleDetectionMethod;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleEvaluationWindow;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleKeepAlive;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleMaxSignalDuration;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleOptions;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleQueryAggregation;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleSeverity;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleTypeCreate;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleValidatePayload;
use datadog_api_client::datadogV2::model::SecurityMonitoringStandardRulePayload;
use datadog_api_client::datadogV2::model::SecurityMonitoringStandardRuleQuery;

#[tokio::main]
async fn main() {
    let body =
        SecurityMonitoringRuleValidatePayload::SecurityMonitoringStandardRulePayload(Box::new(
            SecurityMonitoringStandardRulePayload::new(
                vec![
                    SecurityMonitoringRuleCaseCreate::new(SecurityMonitoringRuleSeverity::INFO)
                        .condition("a > 0".to_string())
                        .name("".to_string())
                        .notifications(vec![]),
                ],
                true,
                "My security monitoring rule".to_string(),
                "My security monitoring rule".to_string(),
                SecurityMonitoringRuleOptions::new()
                    .detection_method(SecurityMonitoringRuleDetectionMethod::THRESHOLD)
                    .evaluation_window(SecurityMonitoringRuleEvaluationWindow::THIRTY_MINUTES)
                    .keep_alive(SecurityMonitoringRuleKeepAlive::THIRTY_MINUTES)
                    .max_signal_duration(SecurityMonitoringRuleMaxSignalDuration::THIRTY_MINUTES),
                vec![SecurityMonitoringStandardRuleQuery::new()
                    .aggregation(SecurityMonitoringRuleQueryAggregation::COUNT)
                    .distinct_fields(vec![])
                    .group_by_fields(vec!["@userIdentity.assumed_role".to_string()])
                    .name("".to_string())
                    .query("source:source_here".to_string())],
            )
            .has_extended_title(true)
            .tags(vec!["env:prod".to_string(), "team:security".to_string()])
            .type_(SecurityMonitoringRuleTypeCreate::LOG_DETECTION),
        ));
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api.validate_security_monitoring_rule(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
