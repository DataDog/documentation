// Get a RUM application returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_rum::RUMAPI;

#[tokio::main]
async fn main() {
    // there is a valid "rum_application" in the system
    let rum_application_data_id = std::env::var("RUM_APPLICATION_DATA_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = RUMAPI::with_config(configuration);
    let resp = api
        .get_rum_application(rum_application_data_id.clone())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
