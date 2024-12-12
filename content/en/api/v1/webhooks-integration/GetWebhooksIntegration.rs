// Get a webhook integration returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_webhooks_integration::WebhooksIntegrationAPI;

#[tokio::main]
async fn main() {
    // there is a valid "webhook" in the system
    let webhook_name = std::env::var("WEBHOOK_NAME").unwrap();
    let configuration = datadog::Configuration::new();
    let api = WebhooksIntegrationAPI::with_config(configuration);
    let resp = api.get_webhooks_integration(webhook_name.clone()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
