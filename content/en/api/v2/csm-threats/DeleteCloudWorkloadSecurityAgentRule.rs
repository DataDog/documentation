// Delete a Cloud Workload Security Agent rule returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_csm_threats::CSMThreatsAPI;

#[tokio::main]
async fn main() {
    // there is a valid "agent_rule" in the system
    let agent_rule_data_id = std::env::var("AGENT_RULE_DATA_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = CSMThreatsAPI::with_config(configuration);
    let resp = api
        .delete_cloud_workload_security_agent_rule(agent_rule_data_id.clone())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
