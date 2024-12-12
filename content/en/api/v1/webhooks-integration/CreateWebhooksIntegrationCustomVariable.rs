// Create a custom variable returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_webhooks_integration::WebhooksIntegrationAPI;
use datadog_api_client::datadogV1::model::WebhooksIntegrationCustomVariable;

#[tokio::main]
async fn main() {
    let body = WebhooksIntegrationCustomVariable::new(
        true,
        "EXAMPLEWEBHOOKSINTEGRATION".to_string(),
        "CUSTOM_VARIABLE_VALUE".to_string(),
    );
    let configuration = datadog::Configuration::new();
    let api = WebhooksIntegrationAPI::with_config(configuration);
    let resp = api.create_webhooks_integration_custom_variable(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
