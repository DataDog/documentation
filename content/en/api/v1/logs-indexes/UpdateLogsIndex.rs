// Update an index returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_logs_indexes::LogsIndexesAPI;
use datadog_api_client::datadogV1::model::LogsDailyLimitReset;
use datadog_api_client::datadogV1::model::LogsExclusion;
use datadog_api_client::datadogV1::model::LogsExclusionFilter;
use datadog_api_client::datadogV1::model::LogsFilter;
use datadog_api_client::datadogV1::model::LogsIndexUpdateRequest;

#[tokio::main]
async fn main() {
    let body = LogsIndexUpdateRequest::new(LogsFilter::new().query("source:python".to_string()))
        .daily_limit(300000000)
        .daily_limit_reset(
            LogsDailyLimitReset::new()
                .reset_time("14:00".to_string())
                .reset_utc_offset("+02:00".to_string()),
        )
        .daily_limit_warning_threshold_percentage(70.0 as f64)
        .disable_daily_limit(false)
        .exclusion_filters(vec![LogsExclusion::new("payment".to_string())
            .filter(LogsExclusionFilter::new(1.0).query("*".to_string()))])
        .num_flex_logs_retention_days(360)
        .num_retention_days(15);
    let configuration = datadog::Configuration::new();
    let api = LogsIndexesAPI::with_config(configuration);
    let resp = api.update_logs_index("name".to_string(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
