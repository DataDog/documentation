// Create a user returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_users::UsersAPI;
use datadog_api_client::datadogV2::model::UserCreateAttributes;
use datadog_api_client::datadogV2::model::UserCreateData;
use datadog_api_client::datadogV2::model::UserCreateRequest;
use datadog_api_client::datadogV2::model::UsersType;

#[tokio::main]
async fn main() {
    let body = UserCreateRequest::new(UserCreateData::new(
        UserCreateAttributes::new("Example-User@datadoghq.com".to_string())
            .name("Datadog API Client Python".to_string()),
        UsersType::USERS,
    ));
    let configuration = datadog::Configuration::new();
    let api = UsersAPI::with_config(configuration);
    let resp = api.create_user(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
