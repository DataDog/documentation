// Get all Amazon EventBridge sources returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_aws_integration::AWSIntegrationAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = AWSIntegrationAPI::with_config(configuration);
    let resp = api.list_aws_event_bridge_sources().await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
