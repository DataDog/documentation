// Create a new service object returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_pager_duty_integration::PagerDutyIntegrationAPI;
use datadog_api_client::datadogV1::model::PagerDutyService;

#[tokio::main]
async fn main() {
    let body = PagerDutyService::new("".to_string(), "".to_string());
    let configuration = datadog::Configuration::new();
    let api = PagerDutyIntegrationAPI::with_config(configuration);
    let resp = api.create_pager_duty_integration_service(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
