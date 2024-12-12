// Archive case returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_case_management::CaseManagementAPI;
use datadog_api_client::datadogV2::model::CaseEmpty;
use datadog_api_client::datadogV2::model::CaseEmptyRequest;
use datadog_api_client::datadogV2::model::CaseResourceType;

#[tokio::main]
async fn main() {
    // there is a valid "case" in the system
    let case_id = std::env::var("CASE_ID").unwrap();
    let body = CaseEmptyRequest::new(CaseEmpty::new(CaseResourceType::CASE));
    let configuration = datadog::Configuration::new();
    let api = CaseManagementAPI::with_config(configuration);
    let resp = api.archive_case(case_id.clone(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
