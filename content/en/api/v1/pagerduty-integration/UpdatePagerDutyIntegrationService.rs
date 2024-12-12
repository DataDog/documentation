// Update a single service object returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_pager_duty_integration::PagerDutyIntegrationAPI;
use datadog_api_client::datadogV1::model::PagerDutyServiceKey;

#[tokio::main]
async fn main() {
    let body = PagerDutyServiceKey::new("".to_string());
    let configuration = datadog::Configuration::new();
    let api = PagerDutyIntegrationAPI::with_config(configuration);
    let resp = api
        .update_pager_duty_integration_service("service_name".to_string(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
