// Paginate monthly usage attribution
use chrono::{DateTime, Utc};
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_usage_metering::GetMonthlyUsageAttributionOptionalParams;
use datadog_api_client::datadogV1::api_usage_metering::UsageMeteringAPI;
use datadog_api_client::datadogV1::model::MonthlyUsageAttributionSupportedMetrics;

#[tokio::main]
async fn main() {
    // there is a valid "monthly_usage_attribution" response
    let monthly_usage_attribution_metadata_pagination_next_record_id =
        std::env::var("MONTHLY_USAGE_ATTRIBUTION_METADATA_PAGINATION_NEXT_RECORD_ID").unwrap();
    let configuration = datadog::Configuration::new();
    let api = UsageMeteringAPI::with_config(configuration);
    let resp = api
        .get_monthly_usage_attribution(
            DateTime::parse_from_rfc3339("2021-11-08T11:11:11+00:00")
                .expect("Failed to parse datetime")
                .with_timezone(&Utc),
            MonthlyUsageAttributionSupportedMetrics::INFRA_HOST_USAGE,
            GetMonthlyUsageAttributionOptionalParams::default().next_record_id(
                monthly_usage_attribution_metadata_pagination_next_record_id.clone(),
            ),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
