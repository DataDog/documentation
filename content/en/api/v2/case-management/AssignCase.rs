// Assign case returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_case_management::CaseManagementAPI;
use datadog_api_client::datadogV2::model::CaseAssign;
use datadog_api_client::datadogV2::model::CaseAssignAttributes;
use datadog_api_client::datadogV2::model::CaseAssignRequest;
use datadog_api_client::datadogV2::model::CaseResourceType;

#[tokio::main]
async fn main() {
    // there is a valid "case" in the system
    let case_id = std::env::var("CASE_ID").unwrap();

    // there is a valid "user" in the system
    let user_data_id = std::env::var("USER_DATA_ID").unwrap();
    let body = CaseAssignRequest::new(CaseAssign::new(
        CaseAssignAttributes::new(user_data_id.clone()),
        CaseResourceType::CASE,
    ));
    let configuration = datadog::Configuration::new();
    let api = CaseManagementAPI::with_config(configuration);
    let resp = api.assign_case(case_id.clone(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
