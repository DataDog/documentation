// Create or update service definition returns "CREATED" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_definition::ServiceDefinitionAPI;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2Contact;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2Integrations;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2Link;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2Opsgenie;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2OpsgenieRegion;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2Pagerduty;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2Type;
use datadog_api_client::datadogV2::model::ServiceDefinitionV2Dot2Version;
use datadog_api_client::datadogV2::model::ServiceDefinitionsCreateRequest;
use serde_json::Value;
use std::collections::BTreeMap;

#[tokio::main]
async fn main() {
    let body = ServiceDefinitionsCreateRequest::ServiceDefinitionV2Dot2(Box::new(
        ServiceDefinitionV2Dot2::new(
            "my-service".to_string(),
            ServiceDefinitionV2Dot2Version::V2_2,
        )
        .application("my-app".to_string())
        .ci_pipeline_fingerprints(vec!["j88xdEy0J5lc".to_string(), "eZ7LMljCk8vo".to_string()])
        .contacts(vec![ServiceDefinitionV2Dot2Contact::new(
            "https://teams.microsoft.com/myteam".to_string(),
            "slack".to_string(),
        )
        .name("My team channel".to_string())])
        .description("My service description".to_string())
        .extensions(BTreeMap::from([(
            "myorg/extension".to_string(),
            Value::from("extensionValue"),
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
        .languages(vec![
            "dotnet".to_string(),
            "go".to_string(),
            "java".to_string(),
            "js".to_string(),
            "php".to_string(),
            "python".to_string(),
            "ruby".to_string(),
            "c++".to_string(),
        ])
        .lifecycle("sandbox".to_string())
        .links(vec![ServiceDefinitionV2Dot2Link::new(
            "Runbook".to_string(),
            "runbook".to_string(),
            "https://my-runbook".to_string(),
        )
        .provider("Github".to_string())])
        .tags(vec!["my:tag".to_string(), "service:tag".to_string()])
        .team("my-team".to_string())
        .tier("High".to_string())
        .type_(ServiceDefinitionV2Dot2Type::WEB),
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
