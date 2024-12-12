// Search test logs returns "OK" response
use chrono::{DateTime, Utc};
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_logs::LogsAPI;
use datadog_api_client::datadogV1::model::LogsListRequest;
use datadog_api_client::datadogV1::model::LogsListRequestTime;
use datadog_api_client::datadogV1::model::LogsSort;

#[tokio::main]
async fn main() {
    let body = LogsListRequest::new(
        LogsListRequestTime::new(
            DateTime::parse_from_rfc3339("2021-11-11T10:11:11+00:00")
                .expect("Failed to parse datetime")
                .with_timezone(&Utc),
            DateTime::parse_from_rfc3339("2021-11-11T11:11:11+00:00")
                .expect("Failed to parse datetime")
                .with_timezone(&Utc),
        )
        .timezone("Europe/Paris".to_string()),
    )
    .index("main".to_string())
    .query("host:Test*".to_string())
    .sort(LogsSort::TIME_ASCENDING);
    let configuration = datadog::Configuration::new();
    let api = LogsAPI::with_config(configuration);
    let resp = api.list_logs(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
