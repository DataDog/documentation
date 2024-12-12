// Get active downtimes for a monitor returns "OK" response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_downtimes::DowntimesAPI;
use datadog_api_client::datadogV2::api_downtimes::ListMonitorDowntimesOptionalParams;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = DowntimesAPI::with_config(configuration);
    let response = api.list_monitor_downtimes_with_pagination(
        9223372036854775807,
        ListMonitorDowntimesOptionalParams::default(),
    );
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
