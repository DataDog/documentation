// Update a span-based metric returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_spans_metrics::SpansMetricsAPI;
use datadog_api_client::datadogV2::model::SpansMetricFilter;
use datadog_api_client::datadogV2::model::SpansMetricGroupBy;
use datadog_api_client::datadogV2::model::SpansMetricType;
use datadog_api_client::datadogV2::model::SpansMetricUpdateAttributes;
use datadog_api_client::datadogV2::model::SpansMetricUpdateCompute;
use datadog_api_client::datadogV2::model::SpansMetricUpdateData;
use datadog_api_client::datadogV2::model::SpansMetricUpdateRequest;

#[tokio::main]
async fn main() {
    // there is a valid "spans_metric" in the system
    let spans_metric_data_id = std::env::var("SPANS_METRIC_DATA_ID").unwrap();
    let body = SpansMetricUpdateRequest::new(SpansMetricUpdateData::new(
        SpansMetricUpdateAttributes::new()
            .compute(SpansMetricUpdateCompute::new().include_percentiles(false))
            .filter(
                SpansMetricFilter::new()
                    .query("@http.status_code:200 service:my-service-updated".to_string()),
            )
            .group_by(vec![SpansMetricGroupBy::new("resource_name".to_string())
                .tag_name("resource_name".to_string())]),
        SpansMetricType::SPANS_METRICS,
    ));
    let configuration = datadog::Configuration::new();
    let api = SpansMetricsAPI::with_config(configuration);
    let resp = api
        .update_spans_metric(spans_metric_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
