// Get a log-based metric returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_logs_metrics::LogsMetricsAPI;

#[tokio::main]
async fn main() {
    // there is a valid "logs_metric" in the system
    let logs_metric_data_id = std::env::var("LOGS_METRIC_DATA_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = LogsMetricsAPI::with_config(configuration);
    let resp = api.get_logs_metric(logs_metric_data_id.clone()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
