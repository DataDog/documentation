// Get Fastly service returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_fastly_integration::FastlyIntegrationAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = FastlyIntegrationAPI::with_config(configuration);
    let resp = api
        .get_fastly_service("account_id".to_string(), "service_id".to_string())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
