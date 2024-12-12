// Get the list of available monthly custom reports returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_usage_metering::GetMonthlyCustomReportsOptionalParams;
use datadog_api_client::datadogV1::api_usage_metering::UsageMeteringAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = UsageMeteringAPI::with_config(configuration);
    let resp = api
        .get_monthly_custom_reports(GetMonthlyCustomReportsOptionalParams::default())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
