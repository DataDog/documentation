// Create a cloud_configuration rule returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::CloudConfigurationComplianceRuleOptions;
use datadog_api_client::datadogV2::model::CloudConfigurationRegoRule;
use datadog_api_client::datadogV2::model::CloudConfigurationRuleCaseCreate;
use datadog_api_client::datadogV2::model::CloudConfigurationRuleComplianceSignalOptions;
use datadog_api_client::datadogV2::model::CloudConfigurationRuleCreatePayload;
use datadog_api_client::datadogV2::model::CloudConfigurationRuleOptions;
use datadog_api_client::datadogV2::model::CloudConfigurationRuleType;
use datadog_api_client::datadogV2::model::SecurityMonitoringFilter;
use datadog_api_client::datadogV2::model::SecurityMonitoringFilterAction;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleCreatePayload;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleSeverity;

#[tokio::main]
async fn main() {
    let body =
        SecurityMonitoringRuleCreatePayload::CloudConfigurationRuleCreatePayload(
            Box::new(
                CloudConfigurationRuleCreatePayload::new(
                    vec![
                        CloudConfigurationRuleCaseCreate::new(
                            SecurityMonitoringRuleSeverity::INFO,
                        ).notifications(vec!["channel".to_string()])
                    ],
                    CloudConfigurationRuleComplianceSignalOptions::new()
                        .user_activation_status(Some(true))
                        .user_group_by_fields(Some(vec!["@account_id".to_string()])),
                    false,
                    "ddd".to_string(),
                    "Example-Security-Monitoring_cloud".to_string(),
                    CloudConfigurationRuleOptions::new(
                        CloudConfigurationComplianceRuleOptions::new()
                            .complex_rule(false)
                            .rego_rule(
                                CloudConfigurationRegoRule::new(
                                    r#"package datadog

import data.datadog.output as dd_output

import future.keywords.contains
import future.keywords.if
import future.keywords.in

milliseconds_in_a_day := ((1000 * 60) * 60) * 24

eval(iam_service_account_key) = "skip" if {
	iam_service_account_key.disabled
} else = "pass" if {
	(iam_service_account_key.resource_seen_at / milliseconds_in_a_day) - (iam_service_account_key.valid_after_time / milliseconds_in_a_day) <= 90
} else = "fail"

# This part remains unchanged for all rules
results contains result if {
	some resource in input.resources[input.main_resource_type]
	result := dd_output.format(resource, eval(resource))
}
"#.to_string(),
                                    vec!["gcp_compute_disk".to_string()],
                                ),
                            )
                            .resource_type("gcp_compute_disk".to_string()),
                    ),
                )
                    .filters(
                        vec![
                            SecurityMonitoringFilter::new()
                                .action(SecurityMonitoringFilterAction::REQUIRE)
                                .query("resource_id:helo*".to_string()),
                            SecurityMonitoringFilter::new()
                                .action(SecurityMonitoringFilterAction::SUPPRESS)
                                .query("control:helo*".to_string())
                        ],
                    )
                    .tags(vec!["my:tag".to_string()])
                    .type_(CloudConfigurationRuleType::CLOUD_CONFIGURATION),
            ),
        );
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api.create_security_monitoring_rule(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
