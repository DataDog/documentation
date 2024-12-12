// Create or update entities returns "ACCEPTED" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_software_catalog::SoftwareCatalogAPI;
use datadog_api_client::datadogV2::model::EntityV3;
use datadog_api_client::datadogV2::model::EntityV3APIVersion;
use datadog_api_client::datadogV2::model::EntityV3DatadogCodeLocationItem;
use datadog_api_client::datadogV2::model::EntityV3DatadogEventItem;
use datadog_api_client::datadogV2::model::EntityV3DatadogIntegrationOpsgenie;
use datadog_api_client::datadogV2::model::EntityV3DatadogIntegrationPagerduty;
use datadog_api_client::datadogV2::model::EntityV3DatadogLogItem;
use datadog_api_client::datadogV2::model::EntityV3DatadogPerformance;
use datadog_api_client::datadogV2::model::EntityV3DatadogPipelines;
use datadog_api_client::datadogV2::model::EntityV3Integrations;
use datadog_api_client::datadogV2::model::EntityV3Metadata;
use datadog_api_client::datadogV2::model::EntityV3MetadataContactsItems;
use datadog_api_client::datadogV2::model::EntityV3MetadataLinksItems;
use datadog_api_client::datadogV2::model::EntityV3Service;
use datadog_api_client::datadogV2::model::EntityV3ServiceDatadog;
use datadog_api_client::datadogV2::model::EntityV3ServiceKind;
use datadog_api_client::datadogV2::model::EntityV3ServiceSpec;
use datadog_api_client::datadogV2::model::UpsertCatalogEntityRequest;

#[tokio::main]
async fn main() {
    let body = UpsertCatalogEntityRequest::EntityV3(Box::new(EntityV3::EntityV3Service(Box::new(
        EntityV3Service::new(
            EntityV3APIVersion::V3,
            EntityV3ServiceKind::SERVICE,
            EntityV3Metadata::new("myService".to_string())
                .additional_owners(vec![])
                .contacts(vec![EntityV3MetadataContactsItems::new(
                    "https://slack/".to_string(),
                    "slack".to_string(),
                )])
                .id("4b163705-23c0-4573-b2fb-f6cea2163fcb".to_string())
                .inherit_from("application:default/myapp".to_string())
                .links(vec![EntityV3MetadataLinksItems::new(
                    "mylink".to_string(),
                    "link".to_string(),
                    "https://mylink".to_string(),
                )])
                .namespace("default".to_string())
                .tags(vec!["this:tag".to_string(), "that:tag".to_string()]),
        )
        .datadog(
            EntityV3ServiceDatadog::new()
                .code_locations(vec![EntityV3DatadogCodeLocationItem::new().paths(vec![])])
                .events(vec![EntityV3DatadogEventItem::new()])
                .logs(vec![EntityV3DatadogLogItem::new()])
                .performance_data(EntityV3DatadogPerformance::new().tags(vec![]))
                .pipelines(EntityV3DatadogPipelines::new().fingerprints(vec![])),
        )
        .integrations(
            EntityV3Integrations::new()
                .opsgenie(EntityV3DatadogIntegrationOpsgenie::new(
                    "https://www.opsgenie.com/service/shopping-cart".to_string(),
                ))
                .pagerduty(EntityV3DatadogIntegrationPagerduty::new(
                    "https://www.pagerduty.com/service-directory/Pshopping-cart".to_string(),
                )),
        )
        .spec(
            EntityV3ServiceSpec::new()
                .depends_on(vec![])
                .languages(vec![]),
        ),
    ))));
    let configuration = datadog::Configuration::new();
    let api = SoftwareCatalogAPI::with_config(configuration);
    let resp = api.upsert_catalog_entity(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
