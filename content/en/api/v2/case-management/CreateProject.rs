// Create a project returns "CREATED" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_case_management::CaseManagementAPI;
use datadog_api_client::datadogV2::model::ProjectCreate;
use datadog_api_client::datadogV2::model::ProjectCreateAttributes;
use datadog_api_client::datadogV2::model::ProjectCreateRequest;
use datadog_api_client::datadogV2::model::ProjectResourceType;

#[tokio::main]
async fn main() {
    let body = ProjectCreateRequest::new(ProjectCreate::new(
        ProjectCreateAttributes::new("SEC".to_string(), "Security Investigation".to_string()),
        ProjectResourceType::PROJECT,
    ));
    let configuration = datadog::Configuration::new();
    let api = CaseManagementAPI::with_config(configuration);
    let resp = api.create_project(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
