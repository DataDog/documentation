// Get archive order returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_logs_archives::LogsArchivesAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = LogsArchivesAPI::with_config(configuration);
    let resp = api.get_logs_archive_order().await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
