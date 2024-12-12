// Update case priority returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_case_management::CaseManagementAPI;
use datadog_api_client::datadogV2::model::CasePriority;
use datadog_api_client::datadogV2::model::CaseResourceType;
use datadog_api_client::datadogV2::model::CaseUpdatePriority;
use datadog_api_client::datadogV2::model::CaseUpdatePriorityAttributes;
use datadog_api_client::datadogV2::model::CaseUpdatePriorityRequest;

#[tokio::main]
async fn main() {
    // there is a valid "case" in the system
    let case_id = std::env::var("CASE_ID").unwrap();
    let body = CaseUpdatePriorityRequest::new(CaseUpdatePriority::new(
        CaseUpdatePriorityAttributes::new(CasePriority::P3),
        CaseResourceType::CASE,
    ));
    let configuration = datadog::Configuration::new();
    let api = CaseManagementAPI::with_config(configuration);
    let resp = api.update_priority(case_id.clone(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
