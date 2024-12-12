// Update a user returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_users::UsersAPI;
use datadog_api_client::datadogV2::model::UserUpdateAttributes;
use datadog_api_client::datadogV2::model::UserUpdateData;
use datadog_api_client::datadogV2::model::UserUpdateRequest;
use datadog_api_client::datadogV2::model::UsersType;

#[tokio::main]
async fn main() {
    // there is a valid "user" in the system
    let user_data_id = std::env::var("USER_DATA_ID").unwrap();
    let body = UserUpdateRequest::new(UserUpdateData::new(
        UserUpdateAttributes::new()
            .disabled(true)
            .name("updated".to_string()),
        user_data_id.clone(),
        UsersType::USERS,
    ));
    let configuration = datadog::Configuration::new();
    let api = UsersAPI::with_config(configuration);
    let resp = api.update_user(user_data_id.clone(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
