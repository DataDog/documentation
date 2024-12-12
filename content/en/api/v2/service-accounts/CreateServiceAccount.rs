// Create a service account returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_accounts::ServiceAccountsAPI;
use datadog_api_client::datadogV2::model::RelationshipToRoleData;
use datadog_api_client::datadogV2::model::RelationshipToRoles;
use datadog_api_client::datadogV2::model::RolesType;
use datadog_api_client::datadogV2::model::ServiceAccountCreateAttributes;
use datadog_api_client::datadogV2::model::ServiceAccountCreateData;
use datadog_api_client::datadogV2::model::ServiceAccountCreateRequest;
use datadog_api_client::datadogV2::model::UserRelationships;
use datadog_api_client::datadogV2::model::UsersType;

#[tokio::main]
async fn main() {
    // there is a valid "role" in the system
    let role_data_id = std::env::var("ROLE_DATA_ID").unwrap();
    let body =
        ServiceAccountCreateRequest::new(
            ServiceAccountCreateData::new(
                ServiceAccountCreateAttributes::new(
                    "Example-Service-Account@datadoghq.com".to_string(),
                    true,
                )
                .name("Test API Client".to_string()),
                UsersType::USERS,
            )
            .relationships(UserRelationships::new().roles(
                RelationshipToRoles::new().data(vec![RelationshipToRoleData::new()
                    .id(role_data_id.clone())
                    .type_(RolesType::ROLES)]),
            )),
        );
    let configuration = datadog::Configuration::new();
    let api = ServiceAccountsAPI::with_config(configuration);
    let resp = api.create_service_account(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
