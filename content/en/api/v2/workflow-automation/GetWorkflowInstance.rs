// Get a workflow instance returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_workflow_automation::WorkflowAutomationAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = WorkflowAutomationAPI::with_config(configuration);
    let resp = api
        .get_workflow_instance(
            "ccf73164-1998-4785-a7a3-8d06c7e5f558".to_string(),
            "305a472b-71ab-4ce8-8f8d-75db635627b5".to_string(),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
