// Get a custom variable returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_webhooks_integration::WebhooksIntegrationAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = WebhooksIntegrationAPI::with_config(configuration);
    let resp = api
        .get_webhooks_integration_custom_variable("custom_variable_name".to_string())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
