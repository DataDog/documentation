// Delete a restriction policy returns "No Content" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_restriction_policies::RestrictionPoliciesAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = RestrictionPoliciesAPI::with_config(configuration);
    let resp = api
        .delete_restriction_policy("dashboard:test-delete".to_string())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
