// Get a list of tests events returns "OK" response
use chrono::{DateTime, Utc};
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_ci_visibility_tests::CIVisibilityTestsAPI;
use datadog_api_client::datadogV2::api_ci_visibility_tests::ListCIAppTestEventsOptionalParams;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = CIVisibilityTestsAPI::with_config(configuration);
    let resp = api
        .list_ci_app_test_events(
            ListCIAppTestEventsOptionalParams::default()
                .filter_query("@test.service:web-ui-tests".to_string())
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
                .page_limit(5),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
