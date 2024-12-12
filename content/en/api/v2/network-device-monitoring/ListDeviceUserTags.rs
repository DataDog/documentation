// Get the list of tags for a device returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_network_device_monitoring::NetworkDeviceMonitoringAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = NetworkDeviceMonitoringAPI::with_config(configuration);
    let resp = api
        .list_device_user_tags("default_device".to_string())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
