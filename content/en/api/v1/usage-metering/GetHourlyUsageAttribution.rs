// Get hourly usage attribution returns "OK" response
use chrono::{DateTime, Utc};
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_usage_metering::GetHourlyUsageAttributionOptionalParams;
use datadog_api_client::datadogV1::api_usage_metering::UsageMeteringAPI;
use datadog_api_client::datadogV1::model::HourlyUsageAttributionUsageType;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = UsageMeteringAPI::with_config(configuration);
    let resp = api
        .get_hourly_usage_attribution(
            DateTime::parse_from_rfc3339("2021-11-08T11:11:11+00:00")
                .expect("Failed to parse datetime")
                .with_timezone(&Utc),
            HourlyUsageAttributionUsageType::INFRA_HOST_USAGE,
            GetHourlyUsageAttributionOptionalParams::default(),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
