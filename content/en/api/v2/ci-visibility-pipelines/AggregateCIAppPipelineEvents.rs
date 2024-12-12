// Aggregate pipelines events returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_ci_visibility_pipelines::CIVisibilityPipelinesAPI;
use datadog_api_client::datadogV2::model::CIAppAggregationFunction;
use datadog_api_client::datadogV2::model::CIAppCompute;
use datadog_api_client::datadogV2::model::CIAppComputeType;
use datadog_api_client::datadogV2::model::CIAppGroupByTotal;
use datadog_api_client::datadogV2::model::CIAppPipelinesAggregateRequest;
use datadog_api_client::datadogV2::model::CIAppPipelinesGroupBy;
use datadog_api_client::datadogV2::model::CIAppPipelinesQueryFilter;
use datadog_api_client::datadogV2::model::CIAppQueryOptions;

#[tokio::main]
async fn main() {
    let body = CIAppPipelinesAggregateRequest::new()
        .compute(vec![CIAppCompute::new(
            CIAppAggregationFunction::PERCENTILE_90,
        )
        .metric("@duration".to_string())
        .type_(CIAppComputeType::TOTAL)])
        .filter(
            CIAppPipelinesQueryFilter::new()
                .from("now-15m".to_string())
                .query("@ci.provider.name:(gitlab OR github)".to_string())
                .to("now".to_string()),
        )
        .group_by(vec![CIAppPipelinesGroupBy::new("@ci.status".to_string())
            .limit(10)
            .total(CIAppGroupByTotal::CIAppGroupByTotalBoolean(false))])
        .options(CIAppQueryOptions::new().timezone("GMT".to_string()));
    let configuration = datadog::Configuration::new();
    let api = CIVisibilityPipelinesAPI::with_config(configuration);
    let resp = api.aggregate_ci_app_pipeline_events(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
