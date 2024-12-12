// Edit metric metadata returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_metrics::MetricsAPI;
use datadog_api_client::datadogV1::model::MetricMetadata;

#[tokio::main]
async fn main() {
    let body = MetricMetadata::new()
        .per_unit("second".to_string())
        .type_("count".to_string())
        .unit("byte".to_string());
    let configuration = datadog::Configuration::new();
    let api = MetricsAPI::with_config(configuration);
    let resp = api
        .update_metric_metadata("metric_name".to_string(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
