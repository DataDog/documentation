// Get all users of a role returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_roles::ListRoleUsersOptionalParams;
use datadog_api_client::datadogV2::api_roles::RolesAPI;

#[tokio::main]
async fn main() {
    // there is a valid "role" in the system
    let role_data_id = std::env::var("ROLE_DATA_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = RolesAPI::with_config(configuration);
    let resp = api
        .list_role_users(role_data_id.clone(), ListRoleUsersOptionalParams::default())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
