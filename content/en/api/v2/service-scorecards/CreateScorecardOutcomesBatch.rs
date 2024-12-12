// Create outcomes batch returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_scorecards::ServiceScorecardsAPI;
use datadog_api_client::datadogV2::model::OutcomesBatchAttributes;
use datadog_api_client::datadogV2::model::OutcomesBatchRequest;
use datadog_api_client::datadogV2::model::OutcomesBatchRequestData;
use datadog_api_client::datadogV2::model::OutcomesBatchRequestItem;
use datadog_api_client::datadogV2::model::OutcomesBatchType;
use datadog_api_client::datadogV2::model::State;

#[tokio::main]
async fn main() {
    // there is a valid "create_scorecard_rule" in the system
    let create_scorecard_rule_data_id = std::env::var("CREATE_SCORECARD_RULE_DATA_ID").unwrap();
    let body = OutcomesBatchRequest::new().data(
        OutcomesBatchRequestData::new()
            .attributes(
                OutcomesBatchAttributes::new().results(vec![OutcomesBatchRequestItem::new(
                    create_scorecard_rule_data_id.clone(),
                    "my-service".to_string(),
                    State::PASS,
                )
                .remarks(
                    r#"See: <a href="https://app.datadoghq.com/services">Services</a>"#.to_string(),
                )]),
            )
            .type_(OutcomesBatchType::BATCHED_OUTCOME),
    );
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.CreateScorecardOutcomesBatch", true);
    let api = ServiceScorecardsAPI::with_config(configuration);
    let resp = api.create_scorecard_outcomes_batch(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
