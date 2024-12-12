// Get active metrics list returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_metrics::ListActiveMetricsOptionalParams;
use datadog_api_client::datadogV1::api_metrics::MetricsAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = MetricsAPI::with_config(configuration);
    let resp = api
        .list_active_metrics(
            9223372036854775807,
            ListActiveMetricsOptionalParams::default(),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
