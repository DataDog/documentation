// Get all monitor details returns "OK" response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_monitors::ListMonitorsOptionalParams;
use datadog_api_client::datadogV1::api_monitors::MonitorsAPI;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = MonitorsAPI::with_config(configuration);
    let response =
        api.list_monitors_with_pagination(ListMonitorsOptionalParams::default().page_size(2));
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
