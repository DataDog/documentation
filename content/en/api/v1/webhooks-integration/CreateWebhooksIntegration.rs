// Create a webhooks integration returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_webhooks_integration::WebhooksIntegrationAPI;
use datadog_api_client::datadogV1::model::WebhooksIntegration;

#[tokio::main]
async fn main() {
    let body = WebhooksIntegration::new(
        "Example-Webhooks-Integration".to_string(),
        "https://example.com/webhook".to_string(),
    );
    let configuration = datadog::Configuration::new();
    let api = WebhooksIntegrationAPI::with_config(configuration);
    let resp = api.create_webhooks_integration(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
