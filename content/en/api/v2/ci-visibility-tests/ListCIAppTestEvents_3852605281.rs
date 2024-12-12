// Get a list of tests events returns "OK" response with pagination
use chrono::{DateTime, Utc};
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_ci_visibility_tests::CIVisibilityTestsAPI;
use datadog_api_client::datadogV2::api_ci_visibility_tests::ListCIAppTestEventsOptionalParams;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = CIVisibilityTestsAPI::with_config(configuration);
    let response = api.list_ci_app_test_events_with_pagination(
        ListCIAppTestEventsOptionalParams::default()
            .filter_from(
                DateTime::parse_from_rfc3339("2021-11-11T11:10:41+00:00")
                    .expect("Failed to parse datetime")
                    .with_timezone(&Utc),
            )
            .filter_to(
                DateTime::parse_from_rfc3339("2021-11-11T11:11:11+00:00")
                    .expect("Failed to parse datetime")
                    .with_timezone(&Utc),
            )
            .page_limit(2),
    );
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
