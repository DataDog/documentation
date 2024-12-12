// Get active downtimes for a monitor returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_downtimes::DowntimesAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = DowntimesAPI::with_config(configuration);
    let resp = api.list_monitor_downtimes(9223372036854775807).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
