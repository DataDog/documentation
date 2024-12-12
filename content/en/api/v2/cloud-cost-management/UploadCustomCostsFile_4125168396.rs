// Upload Custom Costs File returns "Accepted" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_cloud_cost_management::CloudCostManagementAPI;
use datadog_api_client::datadogV2::model::CustomCostsFileLineItem;
use std::collections::BTreeMap;

#[tokio::main]
async fn main() {
    let body = vec![CustomCostsFileLineItem::new()
        .billed_cost(250.0 as f64)
        .billing_currency("USD".to_string())
        .charge_description("my_description".to_string())
        .charge_period_end("2023-06-06".to_string())
        .charge_period_start("2023-05-06".to_string())
        .provider_name("my_provider".to_string())
        .tags(BTreeMap::from([("key".to_string(), "value".to_string())]))];
    let configuration = datadog::Configuration::new();
    let api = CloudCostManagementAPI::with_config(configuration);
    let resp = api.upload_custom_costs_file(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
