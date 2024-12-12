// Upload Custom Costs file returns "Accepted" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_cloud_cost_management::CloudCostManagementAPI;
use datadog_api_client::datadogV2::model::CustomCostsFileLineItem;

#[tokio::main]
async fn main() {
    let body = vec![CustomCostsFileLineItem::new()
        .billed_cost(100.5 as f64)
        .billing_currency("USD".to_string())
        .charge_description("Monthly usage charge for my service".to_string())
        .charge_period_end("2023-02-28".to_string())
        .charge_period_start("2023-02-01".to_string())];
    let configuration = datadog::Configuration::new();
    let api = CloudCostManagementAPI::with_config(configuration);
    let resp = api.upload_custom_costs_file(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
