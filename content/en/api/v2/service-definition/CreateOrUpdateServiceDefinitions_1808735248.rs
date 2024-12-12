// Create or update service definition using schema v2 returns "CREATED" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_definition::ServiceDefinitionAPI;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Contact;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Doc;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Email;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2EmailType;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Integrations;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Link;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2LinkType;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Opsgenie;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2OpsgenieRegion;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Repo;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Version;
use datadog_api_client::datadogV2::model::ServiceDefinitionsCreateRequest;
use serde_json::Value;
use std::collections::BTreeMap;

#[tokio::main]
async fn main() {
    let body = ServiceDefinitionsCreateRequest::ServiceDefinitionV2(Box::new(
        ServiceDefinitionV2::new(
            "service-exampleservicedefinition".to_string(),
            ServiceDefinitionV2Version::V2,
        )
        .contacts(vec![ServiceDefinitionV2Contact::ServiceDefinitionV2Email(
            Box::new(
                ServiceDefinitionV2Email::new(
                    "contact@datadoghq.com".to_string(),
                    ServiceDefinitionV2EmailType::EMAIL,
                )
                .name("Team Email".to_string()),
            ),
        )])
        .dd_team("my-team".to_string())
        .docs(vec![ServiceDefinitionV2Doc::new(
            "Architecture".to_string(),
            "https://gdrive/mydoc".to_string(),
        )
        .provider("google drive".to_string())])
        .extensions(BTreeMap::from([(
            "myorgextension".to_string(),
            Value::from("extensionvalue"),
        )]))
        .integrations(
            ServiceDefinitionV2Integrations::new()
                .opsgenie(
                    ServiceDefinitionV2Opsgenie::new(
                        "https://my-org.opsgenie.com/service/123e4567-e89b-12d3-a456-426614174000"
                            .to_string(),
                    )
                    .region(ServiceDefinitionV2OpsgenieRegion::US),
                )
                .pagerduty("https://my-org.pagerduty.com/service-directory/PMyService".to_string()),
        )
        .links(vec![ServiceDefinitionV2Link::new(
            "Runbook".to_string(),
            ServiceDefinitionV2LinkType::RUNBOOK,
            "https://my-runbook".to_string(),
        )])
        .repos(vec![ServiceDefinitionV2Repo::new(
            "Source Code".to_string(),
            "https://github.com/DataDog/schema".to_string(),
        )
        .provider("GitHub".to_string())])
        .tags(vec!["my:tag".to_string(), "service:tag".to_string()])
        .team("my-team".to_string()),
    ));
    let configuration = datadog::Configuration::new();
    let api = ServiceDefinitionAPI::with_config(configuration);
    let resp = api.create_or_update_service_definitions(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
