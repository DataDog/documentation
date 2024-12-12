// Create an Amazon EventBridge source returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_aws_integration::AWSIntegrationAPI;
use datadog_api_client::datadogV1::model::AWSEventBridgeCreateRequest;

#[tokio::main]
async fn main() {
    let body = AWSEventBridgeCreateRequest::new()
        .account_id("123456789012".to_string())
        .create_event_bus(true)
        .event_generator_name("app-alerts".to_string())
        .region("us-east-1".to_string());
    let configuration = datadog::Configuration::new();
    let api = AWSIntegrationAPI::with_config(configuration);
    let resp = api.create_aws_event_bridge_source(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
