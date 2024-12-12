// Execute a workflow returns "Created" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_workflow_automation::WorkflowAutomationAPI;
use datadog_api_client::datadogV2::model::WorkflowInstanceCreateMeta;
use datadog_api_client::datadogV2::model::WorkflowInstanceCreateRequest;
use serde_json::Value;
use std::collections::BTreeMap;

#[tokio::main]
async fn main() {
    let body =
        WorkflowInstanceCreateRequest::new().meta(WorkflowInstanceCreateMeta::new().payload(
            BTreeMap::from([("input".to_string(), Value::from("value"))]),
        ));
    let configuration = datadog::Configuration::new();
    let api = WorkflowAutomationAPI::with_config(configuration);
    let resp = api
        .create_workflow_instance("ccf73164-1998-4785-a7a3-8d06c7e5f558".to_string(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
