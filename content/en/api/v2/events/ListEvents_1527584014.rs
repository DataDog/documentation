// Get a list of events returns "OK" response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_events::EventsAPI;
use datadog_api_client::datadogV2::api_events::ListEventsOptionalParams;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = EventsAPI::with_config(configuration);
    let response = api.list_events_with_pagination(
        ListEventsOptionalParams::default()
            .filter_from("now-15m".to_string())
            .filter_to("now".to_string())
            .page_limit(2),
    );
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
