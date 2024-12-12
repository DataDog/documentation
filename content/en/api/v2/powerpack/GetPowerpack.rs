// Get a Powerpack returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_powerpack::PowerpackAPI;

#[tokio::main]
async fn main() {
    // there is a valid "powerpack" in the system
    let powerpack_data_id = std::env::var("POWERPACK_DATA_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = PowerpackAPI::with_config(configuration);
    let resp = api.get_powerpack(powerpack_data_id.clone()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
