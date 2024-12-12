// Unmute a host returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_hosts::HostsAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = HostsAPI::with_config(configuration);
    let resp = api.unmute_host("host_name".to_string()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
