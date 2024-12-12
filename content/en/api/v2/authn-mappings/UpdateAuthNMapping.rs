// Edit an AuthN Mapping returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_authn_mappings::AuthNMappingsAPI;
use datadog_api_client::datadogV2::model::AuthNMappingRelationshipToRole;
use datadog_api_client::datadogV2::model::AuthNMappingUpdateAttributes;
use datadog_api_client::datadogV2::model::AuthNMappingUpdateData;
use datadog_api_client::datadogV2::model::AuthNMappingUpdateRelationships;
use datadog_api_client::datadogV2::model::AuthNMappingUpdateRequest;
use datadog_api_client::datadogV2::model::AuthNMappingsType;
use datadog_api_client::datadogV2::model::RelationshipToRole;
use datadog_api_client::datadogV2::model::RelationshipToRoleData;
use datadog_api_client::datadogV2::model::RolesType;

#[tokio::main]
async fn main() {
    // there is a valid "authn_mapping" in the system
    let authn_mapping_data_id = std::env::var("AUTHN_MAPPING_DATA_ID").unwrap();

    // there is a valid "role" in the system
    let role_data_id = std::env::var("ROLE_DATA_ID").unwrap();
    let body = AuthNMappingUpdateRequest::new(
        AuthNMappingUpdateData::new(
            authn_mapping_data_id.clone(),
            AuthNMappingsType::AUTHN_MAPPINGS,
        )
        .attributes(
            AuthNMappingUpdateAttributes::new()
                .attribute_key("member-of".to_string())
                .attribute_value("Development".to_string()),
        )
        .relationships(
            AuthNMappingUpdateRelationships::AuthNMappingRelationshipToRole(Box::new(
                AuthNMappingRelationshipToRole::new(
                    RelationshipToRole::new().data(
                        RelationshipToRoleData::new()
                            .id(role_data_id.clone())
                            .type_(RolesType::ROLES),
                    ),
                ),
            )),
        ),
    );
    let configuration = datadog::Configuration::new();
    let api = AuthNMappingsAPI::with_config(configuration);
    let resp = api
        .update_authn_mapping(authn_mapping_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
