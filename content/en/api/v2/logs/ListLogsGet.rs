// Get a list of logs returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_logs::ListLogsGetOptionalParams;
use datadog_api_client::datadogV2::api_logs::LogsAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = LogsAPI::with_config(configuration);
    let resp = api
        .list_logs_get(ListLogsGetOptionalParams::default())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
