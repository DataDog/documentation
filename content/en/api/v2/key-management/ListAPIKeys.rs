// Get all API keys returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_key_management::KeyManagementAPI;
use datadog_api_client::datadogV2::api_key_management::ListAPIKeysOptionalParams;

#[tokio::main]
async fn main() {
    // there is a valid "api_key" in the system
    let api_key_data_attributes_name = std::env::var("API_KEY_DATA_ATTRIBUTES_NAME").unwrap();
    let configuration = datadog::Configuration::new();
    let api = KeyManagementAPI::with_config(configuration);
    let resp = api
        .list_api_keys(
            ListAPIKeysOptionalParams::default().filter(api_key_data_attributes_name.clone()),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
