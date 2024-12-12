// Get a monitor configuration policy returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_monitors::MonitorsAPI;

#[tokio::main]
async fn main() {
    // there is a valid "monitor_configuration_policy" in the system
    let monitor_configuration_policy_data_id =
        std::env::var("MONITOR_CONFIGURATION_POLICY_DATA_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = MonitorsAPI::with_config(configuration);
    let resp = api
        .get_monitor_config_policy(monitor_configuration_policy_data_id.clone())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
