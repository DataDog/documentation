// Get all log-based metrics returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_logs_metrics::LogsMetricsAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = LogsMetricsAPI::with_config(configuration);
    let resp = api.list_logs_metrics().await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
