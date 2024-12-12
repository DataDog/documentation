// Create a span-based metric returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_spans_metrics::SpansMetricsAPI;
use datadog_api_client::datadogV2::model::SpansMetricCompute;
use datadog_api_client::datadogV2::model::SpansMetricComputeAggregationType;
use datadog_api_client::datadogV2::model::SpansMetricCreateAttributes;
use datadog_api_client::datadogV2::model::SpansMetricCreateData;
use datadog_api_client::datadogV2::model::SpansMetricCreateRequest;
use datadog_api_client::datadogV2::model::SpansMetricFilter;
use datadog_api_client::datadogV2::model::SpansMetricGroupBy;
use datadog_api_client::datadogV2::model::SpansMetricType;

#[tokio::main]
async fn main() {
    let body = SpansMetricCreateRequest::new(SpansMetricCreateData::new(
        SpansMetricCreateAttributes::new(
            SpansMetricCompute::new(SpansMetricComputeAggregationType::DISTRIBUTION)
                .include_percentiles(false)
                .path("@duration".to_string()),
        )
        .filter(
            SpansMetricFilter::new().query("@http.status_code:200 service:my-service".to_string()),
        )
        .group_by(vec![SpansMetricGroupBy::new("resource_name".to_string())
            .tag_name("resource_name".to_string())]),
        "ExampleSpansMetric".to_string(),
        SpansMetricType::SPANS_METRICS,
    ));
    let configuration = datadog::Configuration::new();
    let api = SpansMetricsAPI::with_config(configuration);
    let resp = api.create_spans_metric(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
