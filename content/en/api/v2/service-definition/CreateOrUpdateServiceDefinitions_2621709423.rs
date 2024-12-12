// Create or update service definition using schema v2-2 returns "CREATED" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_definition::ServiceDefinitionAPI;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2Contact;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2Integrations;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2Link;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2Opsgenie;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2OpsgenieRegion;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2Pagerduty;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2Version;
use datadog_api_client::datadogV2::model::ServiceDefinitionsCreateRequest;
use serde_json::Value;
use std::collections::BTreeMap;

#[tokio::main]
async fn main() {
    let body = ServiceDefinitionsCreateRequest::ServiceDefinitionV2Dot2(Box::new(
        ServiceDefinitionV2Dot2::new(
            "service-exampleservicedefinition".to_string(),
            ServiceDefinitionV2Dot2Version::V2_2,
        )
        .contacts(vec![ServiceDefinitionV2Dot2Contact::new(
            "contact@datadoghq.com".to_string(),
            "email".to_string(),
        )
        .name("Team Email".to_string())])
        .extensions(BTreeMap::from([(
            "myorgextension".to_string(),
            Value::from("extensionvalue"),
        )]))
        .integrations(
            ServiceDefinitionV2Dot2Integrations::new()
                .opsgenie(
                    ServiceDefinitionV2Dot2Opsgenie::new(
                        "https://my-org.opsgenie.com/service/123e4567-e89b-12d3-a456-426614174000"
                            .to_string(),
                    )
                    .region(ServiceDefinitionV2Dot2OpsgenieRegion::US),
                )
                .pagerduty(ServiceDefinitionV2Dot2Pagerduty::new().service_url(
                    "https://my-org.pagerduty.com/service-directory/PMyService".to_string(),
                )),
        )
        .links(vec![
            ServiceDefinitionV2Dot2Link::new(
                "Runbook".to_string(),
                "runbook".to_string(),
                "https://my-runbook".to_string(),
            ),
            ServiceDefinitionV2Dot2Link::new(
                "Source Code".to_string(),
                "repo".to_string(),
                "https://github.com/DataDog/schema".to_string(),
            )
            .provider("GitHub".to_string()),
            ServiceDefinitionV2Dot2Link::new(
                "Architecture".to_string(),
                "doc".to_string(),
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
