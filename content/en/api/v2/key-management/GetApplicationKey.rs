// Get an application key returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_key_management::GetApplicationKeyOptionalParams;
use datadog_api_client::datadogV2::api_key_management::KeyManagementAPI;

#[tokio::main]
async fn main() {
    // there is a valid "application_key" in the system
    let application_key_data_id = std::env::var("APPLICATION_KEY_DATA_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = KeyManagementAPI::with_config(configuration);
    let resp = api
        .get_application_key(
            application_key_data_id.clone(),
            GetApplicationKeyOptionalParams::default(),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
