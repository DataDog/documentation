// List all users returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_users::ListUsersOptionalParams;
use datadog_api_client::datadogV2::api_users::UsersAPI;

#[tokio::main]
async fn main() {
    // there is a valid "user" in the system
    let user_data_attributes_email = std::env::var("USER_DATA_ATTRIBUTES_EMAIL").unwrap();
    let configuration = datadog::Configuration::new();
    let api = UsersAPI::with_config(configuration);
    let resp = api
        .list_users(ListUsersOptionalParams::default().filter(user_data_attributes_email.clone()))
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
