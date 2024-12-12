// Delete a single service definition returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_definition::ServiceDefinitionAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = ServiceDefinitionAPI::with_config(configuration);
    let resp = api
        .delete_service_definition("service-definition-test".to_string())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
