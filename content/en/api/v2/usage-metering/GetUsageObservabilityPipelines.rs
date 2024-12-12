// Get hourly usage for observability pipelines returns "OK" response
use chrono::{DateTime, Utc};
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_usage_metering::GetUsageObservabilityPipelinesOptionalParams;
use datadog_api_client::datadogV2::api_usage_metering::UsageMeteringAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = UsageMeteringAPI::with_config(configuration);
    let resp = api
        .get_usage_observability_pipelines(
            DateTime::parse_from_rfc3339("2021-11-06T11:11:11+00:00")
                .expect("Failed to parse datetime")
                .with_timezone(&Utc),
            GetUsageObservabilityPipelinesOptionalParams::default().end_hr(
                DateTime::parse_from_rfc3339("2021-11-08T11:11:11+00:00")
                    .expect("Failed to parse datetime")
                    .with_timezone(&Utc),
            ),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
