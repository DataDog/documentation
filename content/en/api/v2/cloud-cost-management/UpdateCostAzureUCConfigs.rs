// Update Cloud Cost Management Azure config returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_cloud_cost_management::CloudCostManagementAPI;
use datadog_api_client::datadogV2::model::AzureUCConfigPatchData;
use datadog_api_client::datadogV2::model::AzureUCConfigPatchRequest;
use datadog_api_client::datadogV2::model::AzureUCConfigPatchRequestAttributes;
use datadog_api_client::datadogV2::model::AzureUCConfigPatchRequestType;

#[tokio::main]
async fn main() {
    let body = AzureUCConfigPatchRequest::new(AzureUCConfigPatchData::new(
        AzureUCConfigPatchRequestAttributes::new(true),
        AzureUCConfigPatchRequestType::AZURE_UC_CONFIG_PATCH_REQUEST,
    ));
    let configuration = datadog::Configuration::new();
    let api = CloudCostManagementAPI::with_config(configuration);
    let resp = api
        .update_cost_azure_uc_configs("100".to_string(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
