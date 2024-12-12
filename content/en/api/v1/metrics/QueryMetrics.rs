// Query timeseries points returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_metrics::MetricsAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = MetricsAPI::with_config(configuration);
    let resp = api
        .query_metrics(1636542671, 1636629071, "system.cpu.idle{*}".to_string())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
