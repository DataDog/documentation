// Get a quick list of events returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_events::EventsAPI;
use datadog_api_client::datadogV2::api_events::ListEventsOptionalParams;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = EventsAPI::with_config(configuration);
    let resp = api
        .list_events(
            ListEventsOptionalParams::default()
                .filter_query("datadog-agent".to_string())
                .filter_from("2020-09-17T11:48:36+01:00".to_string())
                .filter_to("2020-09-17T12:48:36+01:00".to_string())
                .page_limit(5),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
