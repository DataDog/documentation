// Search events returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_events::EventsAPI;
use datadog_api_client::datadogV2::api_events::SearchEventsOptionalParams;
use datadog_api_client::datadogV2::model::EventsListRequest;
use datadog_api_client::datadogV2::model::EventsQueryFilter;
use datadog_api_client::datadogV2::model::EventsRequestPage;
use datadog_api_client::datadogV2::model::EventsSort;

#[tokio::main]
async fn main() {
    let body = EventsListRequest::new()
        .filter(
            EventsQueryFilter::new()
                .from("2020-09-17T11:48:36+01:00".to_string())
                .query("datadog-agent".to_string())
                .to("2020-09-17T12:48:36+01:00".to_string()),
        )
        .page(EventsRequestPage::new().limit(5))
        .sort(EventsSort::TIMESTAMP_ASCENDING);
    let configuration = datadog::Configuration::new();
    let api = EventsAPI::with_config(configuration);
    let resp = api
        .search_events(SearchEventsOptionalParams::default().body(body))
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
