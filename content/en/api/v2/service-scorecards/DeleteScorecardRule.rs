// Delete a rule returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_scorecards::ServiceScorecardsAPI;

#[tokio::main]
async fn main() {
    // there is a valid "create_scorecard_rule" in the system
    let create_scorecard_rule_data_id = std::env::var("CREATE_SCORECARD_RULE_DATA_ID").unwrap();
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.DeleteScorecardRule", true);
    let api = ServiceScorecardsAPI::with_config(configuration);
    let resp = api
        .delete_scorecard_rule(create_scorecard_rule_data_id.clone())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
