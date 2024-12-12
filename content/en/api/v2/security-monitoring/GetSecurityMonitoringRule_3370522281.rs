// Get a cloud configuration rule's details returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;

#[tokio::main]
async fn main() {
    // there is a valid "cloud_configuration_rule" in the system
    let cloud_configuration_rule_id = std::env::var("CLOUD_CONFIGURATION_RULE_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api
        .get_security_monitoring_rule(cloud_configuration_rule_id.clone())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
