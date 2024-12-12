// List all APM retention filters returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_apm_retention_filters::APMRetentionFiltersAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = APMRetentionFiltersAPI::with_config(configuration);
    let resp = api.list_apm_retention_filters().await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
