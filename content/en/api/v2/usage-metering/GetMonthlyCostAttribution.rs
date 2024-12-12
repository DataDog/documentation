// Get Monthly Cost Attribution returns "OK" response
use chrono::{DateTime, Utc};
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_usage_metering::GetMonthlyCostAttributionOptionalParams;
use datadog_api_client::datadogV2::api_usage_metering::UsageMeteringAPI;

#[tokio::main]
async fn main() {
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.GetMonthlyCostAttribution", true);
    let api = UsageMeteringAPI::with_config(configuration);
    let resp = api
        .get_monthly_cost_attribution(
            DateTime::parse_from_rfc3339("2021-11-06T11:11:11+00:00")
                .expect("Failed to parse datetime")
                .with_timezone(&Utc),
            DateTime::parse_from_rfc3339("2021-11-08T11:11:11+00:00")
                .expect("Failed to parse datetime")
                .with_timezone(&Utc),
            "infra_host_total_cost".to_string(),
            GetMonthlyCostAttributionOptionalParams::default(),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
