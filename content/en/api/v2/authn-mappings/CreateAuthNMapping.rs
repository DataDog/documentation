// Create an AuthN Mapping returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_authn_mappings::AuthNMappingsAPI;
use datadog_api_client::datadogV2::model::AuthNMappingCreateAttributes;
use datadog_api_client::datadogV2::model::AuthNMappingCreateData;
use datadog_api_client::datadogV2::model::AuthNMappingCreateRelationships;
use datadog_api_client::datadogV2::model::AuthNMappingCreateRequest;
use datadog_api_client::datadogV2::model::AuthNMappingRelationshipToRole;
use datadog_api_client::datadogV2::model::AuthNMappingsType;
use datadog_api_client::datadogV2::model::RelationshipToRole;
use datadog_api_client::datadogV2::model::RelationshipToRoleData;
use datadog_api_client::datadogV2::model::RolesType;

#[tokio::main]
async fn main() {
    // there is a valid "role" in the system
    let role_data_id = std::env::var("ROLE_DATA_ID").unwrap();
    let body = AuthNMappingCreateRequest::new(
        AuthNMappingCreateData::new(AuthNMappingsType::AUTHN_MAPPINGS)
            .attributes(
                AuthNMappingCreateAttributes::new()
                    .attribute_key("exampleauthnmapping".to_string())
                    .attribute_value("Example-AuthN-Mapping".to_string()),
            )
            .relationships(
                AuthNMappingCreateRelationships::AuthNMappingRelationshipToRole(Box::new(
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
    let resp = api.create_authn_mapping(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
