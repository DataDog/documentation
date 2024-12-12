// Get all powerpacks returns "OK" response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_powerpack::ListPowerpacksOptionalParams;
use datadog_api_client::datadogV2::api_powerpack::PowerpackAPI;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = PowerpackAPI::with_config(configuration);
    let response =
        api.list_powerpacks_with_pagination(ListPowerpacksOptionalParams::default().page_limit(2));
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
