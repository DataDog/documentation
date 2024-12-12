// List workflow instances returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_workflow_automation::ListWorkflowInstancesOptionalParams;
use datadog_api_client::datadogV2::api_workflow_automation::WorkflowAutomationAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = WorkflowAutomationAPI::with_config(configuration);
    let resp = api
        .list_workflow_instances(
            "ccf73164-1998-4785-a7a3-8d06c7e5f558".to_string(),
            ListWorkflowInstancesOptionalParams::default(),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
