// Update Cloud Cost Management AWS CUR config returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_cloud_cost_management::CloudCostManagementAPI;
use datadog_api_client::datadogV2::model::AwsCURConfigPatchData;
use datadog_api_client::datadogV2::model::AwsCURConfigPatchRequest;
use datadog_api_client::datadogV2::model::AwsCURConfigPatchRequestAttributes;
use datadog_api_client::datadogV2::model::AwsCURConfigPatchRequestType;

#[tokio::main]
async fn main() {
    let body = AwsCURConfigPatchRequest::new(AwsCURConfigPatchData::new(
        AwsCURConfigPatchRequestAttributes::new(true),
        AwsCURConfigPatchRequestType::AWS_CUR_CONFIG_PATCH_REQUEST,
    ));
    let configuration = datadog::Configuration::new();
    let api = CloudCostManagementAPI::with_config(configuration);
    let resp = api.update_cost_awscur_config("100".to_string(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
