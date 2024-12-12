// Get the list of devices returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_network_device_monitoring::ListDevicesOptionalParams;
use datadog_api_client::datadogV2::api_network_device_monitoring::NetworkDeviceMonitoringAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = NetworkDeviceMonitoringAPI::with_config(configuration);
    let resp = api
        .list_devices(
            ListDevicesOptionalParams::default()
                .page_size(1)
                .page_number(0)
                .filter_tag("device_namespace:default".to_string()),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
