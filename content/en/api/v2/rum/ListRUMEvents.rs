// Get a list of RUM events returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_rum::ListRUMEventsOptionalParams;
use datadog_api_client::datadogV2::api_rum::RUMAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = RUMAPI::with_config(configuration);
    let resp = api
        .list_rum_events(ListRUMEventsOptionalParams::default())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
