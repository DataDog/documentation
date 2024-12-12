// Update a Cloud Workload Security Agent rule returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_csm_threats::CSMThreatsAPI;
use datadog_api_client::datadogV2::model::CloudWorkloadSecurityAgentRuleType;
use datadog_api_client::datadogV2::model::CloudWorkloadSecurityAgentRuleUpdateAttributes;
use datadog_api_client::datadogV2::model::CloudWorkloadSecurityAgentRuleUpdateData;
use datadog_api_client::datadogV2::model::CloudWorkloadSecurityAgentRuleUpdateRequest;

#[tokio::main]
async fn main() {
    // there is a valid "agent_rule" in the system
    let agent_rule_data_id = std::env::var("AGENT_RULE_DATA_ID").unwrap();
    let body = CloudWorkloadSecurityAgentRuleUpdateRequest::new(
        CloudWorkloadSecurityAgentRuleUpdateData::new(
            CloudWorkloadSecurityAgentRuleUpdateAttributes::new()
                .description("Test Agent rule".to_string())
                .enabled(true)
                .expression(r#"exec.file.name == "sh""#.to_string()),
            CloudWorkloadSecurityAgentRuleType::AGENT_RULE,
        )
        .id(agent_rule_data_id.clone()),
    );
    let configuration = datadog::Configuration::new();
    let api = CSMThreatsAPI::with_config(configuration);
    let resp = api
        .update_cloud_workload_security_agent_rule(agent_rule_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
