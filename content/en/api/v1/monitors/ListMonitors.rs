// Get all monitor details returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_monitors::ListMonitorsOptionalParams;
use datadog_api_client::datadogV1::api_monitors::MonitorsAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = MonitorsAPI::with_config(configuration);
    let resp = api
        .list_monitors(ListMonitorsOptionalParams::default())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
