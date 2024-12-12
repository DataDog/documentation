// List all AuthN Mappings returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_authn_mappings::AuthNMappingsAPI;
use datadog_api_client::datadogV2::api_authn_mappings::ListAuthNMappingsOptionalParams;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = AuthNMappingsAPI::with_config(configuration);
    let resp = api
        .list_authn_mappings(ListAuthNMappingsOptionalParams::default())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
