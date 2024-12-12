// Get all indexes returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_logs_indexes::LogsIndexesAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = LogsIndexesAPI::with_config(configuration);
    let resp = api.list_log_indexes().await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
