// Send invitation emails returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_users::UsersAPI;
use datadog_api_client::datadogV2::model::RelationshipToUser;
use datadog_api_client::datadogV2::model::RelationshipToUserData;
use datadog_api_client::datadogV2::model::UserInvitationData;
use datadog_api_client::datadogV2::model::UserInvitationRelationships;
use datadog_api_client::datadogV2::model::UserInvitationsRequest;
use datadog_api_client::datadogV2::model::UserInvitationsType;
use datadog_api_client::datadogV2::model::UsersType;

#[tokio::main]
async fn main() {
    // there is a valid "user" in the system
    let user_data_id = std::env::var("USER_DATA_ID").unwrap();
    let body = UserInvitationsRequest::new(vec![UserInvitationData::new(
        UserInvitationRelationships::new(RelationshipToUser::new(RelationshipToUserData::new(
            user_data_id.clone(),
            UsersType::USERS,
        ))),
        UserInvitationsType::USER_INVITATIONS,
    )]);
    let configuration = datadog::Configuration::new();
    let api = UsersAPI::with_config(configuration);
    let resp = api.send_invitations(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
