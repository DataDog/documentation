// Get organization information returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_organizations::OrganizationsAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = OrganizationsAPI::with_config(configuration);
    let resp = api.get_org("abc123".to_string()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
