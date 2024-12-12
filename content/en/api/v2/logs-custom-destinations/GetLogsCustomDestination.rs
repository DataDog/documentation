// Get a custom destination returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_logs_custom_destinations::LogsCustomDestinationsAPI;

#[tokio::main]
async fn main() {
    // there is a valid "custom_destination" in the system
    let custom_destination_data_id = std::env::var("CUSTOM_DESTINATION_DATA_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = LogsCustomDestinationsAPI::with_config(configuration);
    let resp = api
        .get_logs_custom_destination(custom_destination_data_id.clone())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
