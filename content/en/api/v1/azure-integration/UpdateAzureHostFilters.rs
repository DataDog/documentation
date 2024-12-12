// Update Azure integration host filters returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_azure_integration::AzureIntegrationAPI;
use datadog_api_client::datadogV1::model::AzureAccount;
use datadog_api_client::datadogV1::model::AzureAccountMetricsConfig;

#[tokio::main]
async fn main() {
    let body = AzureAccount::new()
        .app_service_plan_filters("key:value,filter:example".to_string())
        .automute(true)
        .client_id("testc7f6-1234-5678-9101-3fcbf464test".to_string())
        .client_secret("TestingRh2nx664kUy5dIApvM54T4AtO".to_string())
        .container_app_filters("key:value,filter:example".to_string())
        .cspm_enabled(true)
        .custom_metrics_enabled(true)
        .errors(vec!["*".to_string()])
        .host_filters("key:value,filter:example".to_string())
        .metrics_config(
            AzureAccountMetricsConfig::new().excluded_resource_providers(vec![
                "Microsoft.Sql".to_string(),
                "Microsoft.Cdn".to_string(),
            ]),
        )
        .new_client_id("new1c7f6-1234-5678-9101-3fcbf464test".to_string())
        .new_tenant_name("new1c44-1234-5678-9101-cc00736ftest".to_string())
        .resource_collection_enabled(true)
        .tenant_name("testc44-1234-5678-9101-cc00736ftest".to_string());
    let configuration = datadog::Configuration::new();
    let api = AzureIntegrationAPI::with_config(configuration);
    let resp = api.update_azure_host_filters(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
