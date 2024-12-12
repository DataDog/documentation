// Search RUM events returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_rum::RUMAPI;
use datadog_api_client::datadogV2::model::RUMQueryFilter;
use datadog_api_client::datadogV2::model::RUMQueryOptions;
use datadog_api_client::datadogV2::model::RUMQueryPageOptions;
use datadog_api_client::datadogV2::model::RUMSearchEventsRequest;
use datadog_api_client::datadogV2::model::RUMSort;

#[tokio::main]
async fn main() {
    let body = RUMSearchEventsRequest::new()
        .filter(
            RUMQueryFilter::new()
                .from("now-15m".to_string())
                .query("@type:session AND @session.type:user".to_string())
                .to("now".to_string()),
        )
        .options(
            RUMQueryOptions::new()
                .time_offset(0)
                .timezone("GMT".to_string()),
        )
        .page(RUMQueryPageOptions::new().limit(25))
        .sort(RUMSort::TIMESTAMP_ASCENDING);
    let configuration = datadog::Configuration::new();
    let api = RUMAPI::with_config(configuration);
    let resp = api.search_rum_events(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
