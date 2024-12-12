// Create a new rule returns "Created" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_service_scorecards::ServiceScorecardsAPI;
use datadog_api_client::datadogV2::model::CreateRuleRequest;
use datadog_api_client::datadogV2::model::CreateRuleRequestData;
use datadog_api_client::datadogV2::model::RuleAttributes;
use datadog_api_client::datadogV2::model::RuleType;

#[tokio::main]
async fn main() {
    let body = CreateRuleRequest::new().data(
        CreateRuleRequestData::new()
            .attributes(
                RuleAttributes::new()
                    .enabled(true)
                    .name("Example-Service-Scorecard".to_string())
                    .scorecard_name("Observability Best Practices".to_string()),
            )
            .type_(RuleType::RULE),
    );
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.CreateScorecardRule", true);
    let api = ServiceScorecardsAPI::with_config(configuration);
    let resp = api.create_scorecard_rule(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
