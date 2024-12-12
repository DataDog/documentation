// List Okta accounts returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_okta_integration::OktaIntegrationAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = OktaIntegrationAPI::with_config(configuration);
    let resp = api.list_okta_accounts().await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
