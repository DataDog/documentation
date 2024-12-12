// Get all powerpacks returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_powerpack::ListPowerpacksOptionalParams;
use datadog_api_client::datadogV2::api_powerpack::PowerpackAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = PowerpackAPI::with_config(configuration);
    let resp = api
        .list_powerpacks(ListPowerpacksOptionalParams::default().page_limit(1000))
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
