// Create Cloud Cost Management Azure configs returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_cloud_cost_management::CloudCostManagementAPI;
use datadog_api_client::datadogV2::model::AzureUCConfigPostData;
use datadog_api_client::datadogV2::model::AzureUCConfigPostRequest;
use datadog_api_client::datadogV2::model::AzureUCConfigPostRequestAttributes;
use datadog_api_client::datadogV2::model::AzureUCConfigPostRequestType;
use datadog_api_client::datadogV2::model::BillConfig;

#[tokio::main]
async fn main() {
    let body = AzureUCConfigPostRequest::new(AzureUCConfigPostData::new(
        AzureUCConfigPostRequestAttributes::new(
            "1234abcd-1234-abcd-1234-1234abcd1234".to_string(),
            BillConfig::new(
                "dd-actual-export".to_string(),
                "dd-export-path".to_string(),
                "dd-storage-account".to_string(),
                "dd-storage-container".to_string(),
            ),
            BillConfig::new(
                "dd-actual-export".to_string(),
                "dd-export-path".to_string(),
                "dd-storage-account".to_string(),
                "dd-storage-container".to_string(),
            ),
            "1234abcd-1234-abcd-1234-1234abcd1234".to_string(),
            "subscriptions/1234abcd-1234-abcd-1234-1234abcd1234".to_string(),
        )
        .is_enabled(true),
        AzureUCConfigPostRequestType::AZURE_UC_CONFIG_POST_REQUEST,
    ));
    let configuration = datadog::Configuration::new();
    let api = CloudCostManagementAPI::with_config(configuration);
    let resp = api.create_cost_azure_uc_configs(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
