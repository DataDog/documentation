// Edit an application key returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_key_management::KeyManagementAPI;
use datadog_api_client::datadogV1::model::ApplicationKey;

#[tokio::main]
async fn main() {
    let body = ApplicationKey::new().name("example user".to_string());
    let configuration = datadog::Configuration::new();
    let api = KeyManagementAPI::with_config(configuration);
    let resp = api.update_application_key("key".to_string(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
