// Delete an API key returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_key_management::KeyManagementAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = KeyManagementAPI::with_config(configuration);
    let resp = api.delete_api_key("key".to_string()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
