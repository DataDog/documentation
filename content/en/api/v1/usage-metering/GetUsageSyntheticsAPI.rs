// Get hourly usage for synthetics API checks returns "OK" response
use chrono::{DateTime, Utc};
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_usage_metering::GetUsageSyntheticsAPIOptionalParams;
use datadog_api_client::datadogV1::api_usage_metering::UsageMeteringAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = UsageMeteringAPI::with_config(configuration);
    let resp = api
        .get_usage_synthetics_api(
            DateTime::parse_from_rfc3339("2021-11-11T11:11:11.111000+00:00")
                .expect("Failed to parse datetime")
                .with_timezone(&Utc),
            GetUsageSyntheticsAPIOptionalParams::default(),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
