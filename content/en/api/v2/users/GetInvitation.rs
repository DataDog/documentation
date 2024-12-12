// Get a user invitation returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_users::UsersAPI;

#[tokio::main]
async fn main() {
    // the "user" has a "user_invitation"
    let user_invitation_id = std::env::var("USER_INVITATION_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = UsersAPI::with_config(configuration);
    let resp = api.get_invitation(user_invitation_id.clone()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
