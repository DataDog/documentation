// Delete a custom variable returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_webhooks_integration::WebhooksIntegrationAPI;

#[tokio::main]
async fn main() {
    // there is a valid "webhook_custom_variable" in the system
    let webhook_custom_variable_name = std::env::var("WEBHOOK_CUSTOM_VARIABLE_NAME").unwrap();
    let configuration = datadog::Configuration::new();
    let api = WebhooksIntegrationAPI::with_config(configuration);
    let resp = api
        .delete_webhooks_integration_custom_variable(webhook_custom_variable_name.clone())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
