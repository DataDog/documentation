// Create or update service definition using schema v2-1 returns "CREATED" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_definition::ServiceDefinitionAPI;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot1;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot1Contact;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot1Email;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot1EmailType;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot1Integrations;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot1Link;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot1LinkType;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot1Opsgenie;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot1OpsgenieRegion;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot1Pagerduty;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot1Version;
use datadog_api_client::datadogV2::model::ServiceDefinitionsCreateRequest;
use serde_json::Value;
use std::collections::BTreeMap;

#[tokio::main]
async fn main() {
    let body = ServiceDefinitionsCreateRequest::ServiceDefinitionV2Dot1(Box::new(
        ServiceDefinitionV2Dot1::new(
            "service-exampleservicedefinition".to_string(),
            ServiceDefinitionV2Dot1Version::V2_1,
        )
        .contacts(vec![
            ServiceDefinitionV2Dot1Contact::ServiceDefinitionV2Dot1Email(Box::new(
                ServiceDefinitionV2Dot1Email::new(
                    "contact@datadoghq.com".to_string(),
                    ServiceDefinitionV2Dot1EmailType::EMAIL,
                )
                .name("Team Email".to_string()),
            )),
        ])
        .extensions(BTreeMap::from([(
            "myorgextension".to_string(),
            Value::from("extensionvalue"),
        )]))
        .integrations(
            ServiceDefinitionV2Dot1Integrations::new()
                .opsgenie(
                    ServiceDefinitionV2Dot1Opsgenie::new(
                        "https://my-org.opsgenie.com/service/123e4567-e89b-12d3-a456-426614174000"
                            .to_string(),
                    )
                    .region(ServiceDefinitionV2Dot1OpsgenieRegion::US),
                )
                .pagerduty(ServiceDefinitionV2Dot1Pagerduty::new().service_url(
                    "https://my-org.pagerduty.com/service-directory/PMyService".to_string(),
                )),
        )
        .links(vec![
            ServiceDefinitionV2Dot1Link::new(
                "Runbook".to_string(),
                ServiceDefinitionV2Dot1LinkType::RUNBOOK,
                "https://my-runbook".to_string(),
            ),
            ServiceDefinitionV2Dot1Link::new(
                "Source Code".to_string(),
                ServiceDefinitionV2Dot1LinkType::REPO,
                "https://github.com/DataDog/schema".to_string(),
            )
            .provider("GitHub".to_string()),
            ServiceDefinitionV2Dot1Link::new(
                "Architecture".to_string(),
                ServiceDefinitionV2Dot1LinkType::DOC,
                "https://my-runbook".to_string(),
            )
            .provider("Gigoogle drivetHub".to_string()),
        ])
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
