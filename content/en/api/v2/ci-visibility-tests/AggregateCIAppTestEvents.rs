// Aggregate tests events returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_ci_visibility_tests::CIVisibilityTestsAPI;
use datadog_api_client::datadogV2::model::CIAppAggregateSort;
use datadog_api_client::datadogV2::model::CIAppAggregationFunction;
use datadog_api_client::datadogV2::model::CIAppCompute;
use datadog_api_client::datadogV2::model::CIAppComputeType;
use datadog_api_client::datadogV2::model::CIAppGroupByTotal;
use datadog_api_client::datadogV2::model::CIAppQueryOptions;
use datadog_api_client::datadogV2::model::CIAppSortOrder;
use datadog_api_client::datadogV2::model::CIAppTestsAggregateRequest;
use datadog_api_client::datadogV2::model::CIAppTestsGroupBy;
use datadog_api_client::datadogV2::model::CIAppTestsQueryFilter;

#[tokio::main]
async fn main() {
    let body = CIAppTestsAggregateRequest::new()
        .compute(vec![CIAppCompute::new(CIAppAggregationFunction::COUNT)
            .metric("@test.is_flaky".to_string())
            .type_(CIAppComputeType::TOTAL)])
        .filter(
            CIAppTestsQueryFilter::new()
                .from("now-15m".to_string())
                .query("@language:(python OR go)".to_string())
                .to("now".to_string()),
        )
        .group_by(vec![CIAppTestsGroupBy::new("@git.branch".to_string())
            .limit(10)
            .sort(CIAppAggregateSort::new().order(CIAppSortOrder::ASCENDING))
            .total(CIAppGroupByTotal::CIAppGroupByTotalBoolean(false))])
        .options(CIAppQueryOptions::new().timezone("GMT".to_string()));
    let configuration = datadog::Configuration::new();
    let api = CIVisibilityTestsAPI::with_config(configuration);
    let resp = api.aggregate_ci_app_test_events(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
