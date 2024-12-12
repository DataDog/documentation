// Get a list of RUM events returns "OK" response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_rum::ListRUMEventsOptionalParams;
use datadog_api_client::datadogV2::api_rum::RUMAPI;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = RUMAPI::with_config(configuration);
    let response =
        api.list_rum_events_with_pagination(ListRUMEventsOptionalParams::default().page_limit(2));
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
