// List all rule outcomes returns "OK" response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_scorecards::ListScorecardOutcomesOptionalParams;
use datadog_api_client::datadogV2::api_service_scorecards::ServiceScorecardsAPI;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.ListScorecardOutcomes", true);
    let api = ServiceScorecardsAPI::with_config(configuration);
    let response = api.list_scorecard_outcomes_with_pagination(
        ListScorecardOutcomesOptionalParams::default()
            .page_size(2)
            .fields_outcome("state".to_string())
            .filter_outcome_service_name("my-service".to_string()),
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
