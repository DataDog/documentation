// Get user details returns "OK for get user" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_users::UsersAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = UsersAPI::with_config(configuration);
    let resp = api.get_user("test@datadoghq.com".to_string()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
