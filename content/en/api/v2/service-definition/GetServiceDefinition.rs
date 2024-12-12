// Get a single service definition returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_definition::GetServiceDefinitionOptionalParams;
use datadog_api_client::datadogV2::api_service_definition::ServiceDefinitionAPI;
use datadog_api_client::datadogV2::model::ServiceDefinitionSchemaVersions;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = ServiceDefinitionAPI::with_config(configuration);
    let resp = api
        .get_service_definition(
            "service-definition-test".to_string(),
            GetServiceDefinitionOptionalParams::default()
                .schema_version(ServiceDefinitionSchemaVersions::V2_1),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
