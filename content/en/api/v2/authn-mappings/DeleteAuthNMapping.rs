// Delete an AuthN Mapping returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_authn_mappings::AuthNMappingsAPI;

#[tokio::main]
async fn main() {
    // there is a valid "authn_mapping" in the system
    let authn_mapping_data_id = std::env::var("AUTHN_MAPPING_DATA_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = AuthNMappingsAPI::with_config(configuration);
    let resp = api
        .delete_authn_mapping(authn_mapping_data_id.clone())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
