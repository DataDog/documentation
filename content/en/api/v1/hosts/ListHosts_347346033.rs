// Get all hosts with metadata deserializes successfully
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_hosts::HostsAPI;
use datadog_api_client::datadogV1::api_hosts::ListHostsOptionalParams;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = HostsAPI::with_config(configuration);
    let resp = api
        .list_hosts(ListHostsOptionalParams::default().include_hosts_metadata(true))
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
