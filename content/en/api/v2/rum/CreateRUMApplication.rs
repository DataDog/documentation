// Create a new RUM application returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_rum::RUMAPI;
use datadog_api_client::datadogV2::model::RUMApplicationCreate;
use datadog_api_client::datadogV2::model::RUMApplicationCreateAttributes;
use datadog_api_client::datadogV2::model::RUMApplicationCreateRequest;
use datadog_api_client::datadogV2::model::RUMApplicationCreateType;

#[tokio::main]
async fn main() {
    let body = RUMApplicationCreateRequest::new(RUMApplicationCreate::new(
        RUMApplicationCreateAttributes::new("test-rum-5c67ebb32077e1d9".to_string())
            .type_("ios".to_string()),
        RUMApplicationCreateType::RUM_APPLICATION_CREATE,
    ));
    let configuration = datadog::Configuration::new();
    let api = RUMAPI::with_config(configuration);
    let resp = api.create_rum_application(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
