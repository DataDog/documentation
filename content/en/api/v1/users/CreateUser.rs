// Create a user returns "User created" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_users::UsersAPI;
use datadog_api_client::datadogV1::model::AccessRole;
use datadog_api_client::datadogV1::model::User;

#[tokio::main]
async fn main() {
    let body = User::new()
        .access_role(Some(AccessRole::READ_ONLY))
        .disabled(false)
        .email("test@datadoghq.com".to_string())
        .handle("test@datadoghq.com".to_string())
        .name("test user".to_string());
    let configuration = datadog::Configuration::new();
    let api = UsersAPI::with_config(configuration);
    let resp = api.create_user(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
