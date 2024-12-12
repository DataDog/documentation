// Search spans returns "OK" response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_spans::SpansAPI;
use datadog_api_client::datadogV2::model::SpansListRequest;
use datadog_api_client::datadogV2::model::SpansListRequestAttributes;
use datadog_api_client::datadogV2::model::SpansListRequestData;
use datadog_api_client::datadogV2::model::SpansListRequestPage;
use datadog_api_client::datadogV2::model::SpansListRequestType;
use datadog_api_client::datadogV2::model::SpansQueryFilter;
use datadog_api_client::datadogV2::model::SpansQueryOptions;
use datadog_api_client::datadogV2::model::SpansSort;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let body = SpansListRequest::new().data(
        SpansListRequestData::new()
            .attributes(
                SpansListRequestAttributes::new()
                    .filter(
                        SpansQueryFilter::new()
                            .from("now-15m".to_string())
                            .query("service:python*".to_string())
                            .to("now".to_string()),
                    )
                    .options(SpansQueryOptions::new().timezone("GMT".to_string()))
                    .page(SpansListRequestPage::new().limit(2))
                    .sort(SpansSort::TIMESTAMP_ASCENDING),
            )
            .type_(SpansListRequestType::SEARCH_REQUEST),
    );
    let configuration = datadog::Configuration::new();
    let api = SpansAPI::with_config(configuration);
    let response = api.list_spans_with_pagination(body);
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
