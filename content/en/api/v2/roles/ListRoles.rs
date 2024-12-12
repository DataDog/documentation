// List roles returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_roles::ListRolesOptionalParams;
use datadog_api_client::datadogV2::api_roles::RolesAPI;

#[tokio::main]
async fn main() {
    // there is a valid "role" in the system
    let role_data_attributes_name = std::env::var("ROLE_DATA_ATTRIBUTES_NAME").unwrap();
    let configuration = datadog::Configuration::new();
    let api = RolesAPI::with_config(configuration);
    let resp = api
        .list_roles(ListRolesOptionalParams::default().filter(role_data_attributes_name.clone()))
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
