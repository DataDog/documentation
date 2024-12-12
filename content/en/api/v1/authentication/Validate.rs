// Validate API key returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_authentication::AuthenticationAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = AuthenticationAPI::with_config(configuration);
    let resp = api.validate().await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
