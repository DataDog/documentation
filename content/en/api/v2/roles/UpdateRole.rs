// Update a role returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_roles::RolesAPI;
use datadog_api_client::datadogV2::model::PermissionsType;
use datadog_api_client::datadogV2::model::RelationshipToPermissionData;
use datadog_api_client::datadogV2::model::RelationshipToPermissions;
use datadog_api_client::datadogV2::model::RoleRelationships;
use datadog_api_client::datadogV2::model::RoleUpdateAttributes;
use datadog_api_client::datadogV2::model::RoleUpdateData;
use datadog_api_client::datadogV2::model::RoleUpdateRequest;
use datadog_api_client::datadogV2::model::RolesType;

#[tokio::main]
async fn main() {
    // there is a valid "role" in the system
    let role_data_id = std::env::var("ROLE_DATA_ID").unwrap();

    // there is a valid "permission" in the system
    let permission_id = std::env::var("PERMISSION_ID").unwrap();
    let body = RoleUpdateRequest::new(
        RoleUpdateData::new(
            RoleUpdateAttributes::new().name("developers-updated".to_string()),
            role_data_id.clone(),
            RolesType::ROLES,
        )
        .relationships(RoleRelationships::new().permissions(
            RelationshipToPermissions::new().data(vec![
                            RelationshipToPermissionData::new()
                                .id(permission_id.clone())
                                .type_(PermissionsType::PERMISSIONS)
                        ]),
        )),
    );
    let configuration = datadog::Configuration::new();
    let api = RolesAPI::with_config(configuration);
    let resp = api.update_role(role_data_id.clone(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
