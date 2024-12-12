// Submit a Service Check returns "Payload accepted" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_service_checks::ServiceChecksAPI;
use datadog_api_client::datadogV1::model::ServiceCheck;
use datadog_api_client::datadogV1::model::ServiceCheckStatus;

#[tokio::main]
async fn main() {
    let body = vec![ServiceCheck::new(
        "app.ok".to_string(),
        "host".to_string(),
        ServiceCheckStatus::OK,
        vec!["test:ExampleServiceCheck".to_string()],
    )];
    let configuration = datadog::Configuration::new();
    let api = ServiceChecksAPI::with_config(configuration);
    let resp = api.submit_service_check(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
