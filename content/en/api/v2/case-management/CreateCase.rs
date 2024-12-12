// Create a case returns "CREATED" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_case_management::CaseManagementAPI;
use datadog_api_client::datadogV2::model::CaseCreate;
use datadog_api_client::datadogV2::model::CaseCreateAttributes;
use datadog_api_client::datadogV2::model::CaseCreateRelationships;
use datadog_api_client::datadogV2::model::CaseCreateRequest;
use datadog_api_client::datadogV2::model::CasePriority;
use datadog_api_client::datadogV2::model::CaseResourceType;
use datadog_api_client::datadogV2::model::CaseType;
use datadog_api_client::datadogV2::model::NullableUserRelationship;
use datadog_api_client::datadogV2::model::NullableUserRelationshipData;
use datadog_api_client::datadogV2::model::ProjectRelationship;
use datadog_api_client::datadogV2::model::ProjectRelationshipData;
use datadog_api_client::datadogV2::model::ProjectResourceType;
use datadog_api_client::datadogV2::model::UserResourceType;

#[tokio::main]
async fn main() {
    // there is a valid "user" in the system
    let user_data_id = std::env::var("USER_DATA_ID").unwrap();
    let body = CaseCreateRequest::new(
        CaseCreate::new(
            CaseCreateAttributes::new(
                "Security breach investigation in 0cfbc5cbc676ee71".to_string(),
                CaseType::STANDARD,
            )
            .priority(CasePriority::NOT_DEFINED),
            CaseResourceType::CASE,
        )
        .relationships(
            CaseCreateRelationships::new(ProjectRelationship::new(ProjectRelationshipData::new(
                "d4bbe1af-f36e-42f1-87c1-493ca35c320e".to_string(),
                ProjectResourceType::PROJECT,
            )))
            .assignee(Some(NullableUserRelationship::new(Some(
                NullableUserRelationshipData::new(user_data_id.clone(), UserResourceType::USER),
            )))),
        ),
    );
    let configuration = datadog::Configuration::new();
    let api = CaseManagementAPI::with_config(configuration);
    let resp = api.create_case(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
