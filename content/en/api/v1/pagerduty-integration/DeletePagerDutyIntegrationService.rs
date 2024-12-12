// Delete a single service object returns "No Content" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_pager_duty_integration::PagerDutyIntegrationAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = PagerDutyIntegrationAPI::with_config(configuration);
    let resp = api
        .delete_pager_duty_integration_service("service_name".to_string())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
