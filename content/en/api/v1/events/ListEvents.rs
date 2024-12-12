// Get a list of events returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_events::EventsAPI;
use datadog_api_client::datadogV1::api_events::ListEventsOptionalParams;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = EventsAPI::with_config(configuration);
    let resp = api
        .list_events(
            9223372036854775807,
            9223372036854775807,
            ListEventsOptionalParams::default(),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
