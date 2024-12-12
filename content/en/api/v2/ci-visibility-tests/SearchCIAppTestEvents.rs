// Search tests events returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_ci_visibility_tests::CIVisibilityTestsAPI;
use datadog_api_client::datadogV2::api_ci_visibility_tests::SearchCIAppTestEventsOptionalParams;
use datadog_api_client::datadogV2::model::CIAppQueryOptions;
use datadog_api_client::datadogV2::model::CIAppQueryPageOptions;
use datadog_api_client::datadogV2::model::CIAppSort;
use datadog_api_client::datadogV2::model::CIAppTestEventsRequest;
use datadog_api_client::datadogV2::model::CIAppTestsQueryFilter;

#[tokio::main]
async fn main() {
    let body = CIAppTestEventsRequest::new()
        .filter(
            CIAppTestsQueryFilter::new()
                .from("now-15m".to_string())
                .query("@test.service:web-ui-tests AND @test.status:skip".to_string())
                .to("now".to_string()),
        )
        .options(CIAppQueryOptions::new().timezone("GMT".to_string()))
        .page(CIAppQueryPageOptions::new().limit(25))
        .sort(CIAppSort::TIMESTAMP_ASCENDING);
    let configuration = datadog::Configuration::new();
    let api = CIVisibilityTestsAPI::with_config(configuration);
    let resp = api
        .search_ci_app_test_events(SearchCIAppTestEventsOptionalParams::default().body(body))
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
