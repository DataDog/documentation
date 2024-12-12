// Update a pipeline returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_logs_pipelines::LogsPipelinesAPI;
use datadog_api_client::datadogV1::model::LogsFilter;
use datadog_api_client::datadogV1::model::LogsGrokParser;
use datadog_api_client::datadogV1::model::LogsGrokParserRules;
use datadog_api_client::datadogV1::model::LogsGrokParserType;
use datadog_api_client::datadogV1::model::LogsPipeline;
use datadog_api_client::datadogV1::model::LogsProcessor;

#[tokio::main]
async fn main() {
    let body = LogsPipeline::new("".to_string())
        .filter(LogsFilter::new().query("source:python".to_string()))
        .processors(vec![LogsProcessor::LogsGrokParser(Box::new(
            LogsGrokParser::new(
                LogsGrokParserRules::new(
                    r#"rule_name_1 foo
rule_name_2 bar
"#
                    .to_string(),
                )
                .support_rules(
                    r#"rule_name_1 foo
rule_name_2 bar
"#
                    .to_string(),
                ),
                "message".to_string(),
                LogsGrokParserType::GROK_PARSER,
            )
            .is_enabled(false)
            .samples(vec![]),
        ))]);
    let configuration = datadog::Configuration::new();
    let api = LogsPipelinesAPI::with_config(configuration);
    let resp = api
        .update_logs_pipeline("pipeline_id".to_string(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
