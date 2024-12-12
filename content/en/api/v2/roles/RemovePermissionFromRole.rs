// Revoke permission returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_roles::RolesAPI;
use datadog_api_client::datadogV2::model::PermissionsType;
use datadog_api_client::datadogV2::model::RelationshipToPermission;
use datadog_api_client::datadogV2::model::RelationshipToPermissionData;

#[tokio::main]
async fn main() {
    // there is a valid "role" in the system
    let role_data_id = std::env::var("ROLE_DATA_ID").unwrap();

    // there is a valid "permission" in the system
    let permission_id = std::env::var("PERMISSION_ID").unwrap();
    let body = RelationshipToPermission::new().data(
        RelationshipToPermissionData::new()
            .id(permission_id.clone())
            .type_(PermissionsType::PERMISSIONS),
    );
    let configuration = datadog::Configuration::new();
    let api = RolesAPI::with_config(configuration);
    let resp = api
        .remove_permission_from_role(role_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
