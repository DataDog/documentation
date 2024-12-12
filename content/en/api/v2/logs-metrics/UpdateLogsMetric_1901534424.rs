// Update a log-based metric with include_percentiles field returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_logs_metrics::LogsMetricsAPI;
use datadog_api_client::datadogV2::model::LogsMetricType;
use datadog_api_client::datadogV2::model::LogsMetricUpdateAttributes;
use datadog_api_client::datadogV2::model::LogsMetricUpdateCompute;
use datadog_api_client::datadogV2::model::LogsMetricUpdateData;
use datadog_api_client::datadogV2::model::LogsMetricUpdateRequest;

#[tokio::main]
async fn main() {
    // there is a valid "logs_metric_percentile" in the system
    let logs_metric_percentile_data_id = std::env::var("LOGS_METRIC_PERCENTILE_DATA_ID").unwrap();
    let body = LogsMetricUpdateRequest::new(LogsMetricUpdateData::new(
        LogsMetricUpdateAttributes::new()
            .compute(LogsMetricUpdateCompute::new().include_percentiles(false)),
        LogsMetricType::LOGS_METRICS,
    ));
    let configuration = datadog::Configuration::new();
    let api = LogsMetricsAPI::with_config(configuration);
    let resp = api
        .update_logs_metric(logs_metric_percentile_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
