// Get a quick list of logs returns "OK" response
use chrono::{DateTime, Utc};
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_logs::ListLogsGetOptionalParams;
use datadog_api_client::datadogV2::api_logs::LogsAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = LogsAPI::with_config(configuration);
    let resp = api
        .list_logs_get(
            ListLogsGetOptionalParams::default()
                .filter_query("datadog-agent".to_string())
                .filter_indexes(vec!["main".to_string()])
                .filter_from(
                    DateTime::parse_from_rfc3339("2020-09-17T11:48:36+01:00")
                        .expect("Failed to parse datetime")
                        .with_timezone(&Utc),
                )
                .filter_to(
                    DateTime::parse_from_rfc3339("2020-09-17T12:48:36+01:00")
                        .expect("Failed to parse datetime")
                        .with_timezone(&Utc),
                )
                .page_limit(5),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
