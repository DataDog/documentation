// Create a detection rule with type 'impossible_travel' returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleCaseCreate;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleCreatePayload;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleDetectionMethod;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleEvaluationWindow;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleImpossibleTravelOptions;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleKeepAlive;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleMaxSignalDuration;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleOptions;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleQueryAggregation;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleSeverity;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleTypeCreate;
use datadog_api_client::datadogV2::model::SecurityMonitoringStandardRuleCreatePayload;
use datadog_api_client::datadogV2::model::SecurityMonitoringStandardRuleQuery;

#[tokio::main]
async fn main() {
    let body =
        SecurityMonitoringRuleCreatePayload::SecurityMonitoringStandardRuleCreatePayload(Box::new(
            SecurityMonitoringStandardRuleCreatePayload::new(
                vec![
                    SecurityMonitoringRuleCaseCreate::new(SecurityMonitoringRuleSeverity::INFO)
                        .name("".to_string())
                        .notifications(vec![]),
                ],
                true,
                "test".to_string(),
                "Example-Security-Monitoring".to_string(),
                SecurityMonitoringRuleOptions::new()
                    .detection_method(SecurityMonitoringRuleDetectionMethod::IMPOSSIBLE_TRAVEL)
                    .evaluation_window(SecurityMonitoringRuleEvaluationWindow::FIFTEEN_MINUTES)
                    .impossible_travel_options(
                        SecurityMonitoringRuleImpossibleTravelOptions::new()
                            .baseline_user_locations(false),
                    )
                    .keep_alive(SecurityMonitoringRuleKeepAlive::ONE_HOUR)
                    .max_signal_duration(SecurityMonitoringRuleMaxSignalDuration::ONE_DAY),
                vec![SecurityMonitoringStandardRuleQuery::new()
                    .aggregation(SecurityMonitoringRuleQueryAggregation::GEO_DATA)
                    .distinct_fields(vec![])
                    .group_by_fields(vec!["@usr.id".to_string()])
                    .metric("@network.client.geoip".to_string())
                    .query("*".to_string())],
            )
            .filters(vec![])
            .has_extended_title(true)
            .tags(vec![])
            .type_(SecurityMonitoringRuleTypeCreate::LOG_DETECTION),
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
