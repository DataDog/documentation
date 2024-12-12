// Update a cloud configuration rule's details returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::CloudConfigurationComplianceRuleOptions;
use datadog_api_client::datadogV2::model::CloudConfigurationRegoRule;
use datadog_api_client::datadogV2::model::CloudConfigurationRuleComplianceSignalOptions;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleCase;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleOptions;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleSeverity;
use datadog_api_client::datadogV2::model::SecurityMonitoringRuleUpdatePayload;

#[tokio::main]
async fn main() {
    // there is a valid "cloud_configuration_rule" in the system
    let cloud_configuration_rule_id = std::env::var("CLOUD_CONFIGURATION_RULE_ID").unwrap();
    let body =
        SecurityMonitoringRuleUpdatePayload::new()
            .cases(
                vec![
                    SecurityMonitoringRuleCase::new()
                        .notifications(vec![])
                        .status(SecurityMonitoringRuleSeverity::INFO)
                ],
            )
            .compliance_signal_options(
                CloudConfigurationRuleComplianceSignalOptions::new()
                    .user_activation_status(Some(false))
                    .user_group_by_fields(Some(vec![])),
            )
            .is_enabled(false)
            .message("ddd".to_string())
            .name("Example-Security-Monitoring_cloud_updated".to_string())
            .options(
                SecurityMonitoringRuleOptions
                ::new().compliance_rule_options(
                    CloudConfigurationComplianceRuleOptions::new()
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
            .tags(vec![]);
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api
        .update_security_monitoring_rule(cloud_configuration_rule_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
