// Update a specific Org Config returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_organizations::OrganizationsAPI;
use datadog_api_client::datadogV2::model::OrgConfigType;
use datadog_api_client::datadogV2::model::OrgConfigWrite;
use datadog_api_client::datadogV2::model::OrgConfigWriteAttributes;
use datadog_api_client::datadogV2::model::OrgConfigWriteRequest;
use serde_json::Value;

#[tokio::main]
async fn main() {
    let body = OrgConfigWriteRequest::new(OrgConfigWrite::new(
        OrgConfigWriteAttributes::new(Value::from("UTC")),
        OrgConfigType::ORG_CONFIGS,
    ));
    let configuration = datadog::Configuration::new();
    let api = OrganizationsAPI::with_config(configuration);
    let resp = api
        .update_org_config("monitor_timezone".to_string(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
