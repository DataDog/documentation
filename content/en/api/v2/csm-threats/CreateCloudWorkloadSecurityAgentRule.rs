// Create a Cloud Workload Security Agent rule returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_csm_threats::CSMThreatsAPI;
use datadog_api_client::datadogV2::model::CloudWorkloadSecurityAgentRuleCreateAttributes;
use datadog_api_client::datadogV2::model::CloudWorkloadSecurityAgentRuleCreateData;
use datadog_api_client::datadogV2::model::CloudWorkloadSecurityAgentRuleCreateRequest;
use datadog_api_client::datadogV2::model::CloudWorkloadSecurityAgentRuleType;

#[tokio::main]
async fn main() {
    let body = CloudWorkloadSecurityAgentRuleCreateRequest::new(
        CloudWorkloadSecurityAgentRuleCreateData::new(
            CloudWorkloadSecurityAgentRuleCreateAttributes::new(
                r#"exec.file.name == "sh""#.to_string(),
                "examplecsmthreat".to_string(),
            )
            .description("Test Agent rule".to_string())
            .enabled(true),
            CloudWorkloadSecurityAgentRuleType::AGENT_RULE,
        ),
    );
    let configuration = datadog::Configuration::new();
    let api = CSMThreatsAPI::with_config(configuration);
    let resp = api.create_cloud_workload_security_agent_rule(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
