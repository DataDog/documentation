// Create a global variable returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;
use datadog_api_client::datadogV1::model::SyntheticsGlobalVariableAttributes;
use datadog_api_client::datadogV1::model::SyntheticsGlobalVariableParseTestOptions;
use datadog_api_client::datadogV1::model::SyntheticsGlobalVariableParseTestOptionsType;
use datadog_api_client::datadogV1::model::SyntheticsGlobalVariableParserType;
use datadog_api_client::datadogV1::model::SyntheticsGlobalVariableRequest;
use datadog_api_client::datadogV1::model::SyntheticsGlobalVariableValue;
use datadog_api_client::datadogV1::model::SyntheticsVariableParser;

#[tokio::main]
async fn main() {
    let body = SyntheticsGlobalVariableRequest::new(
        "Example description".to_string(),
        "MY_VARIABLE".to_string(),
        vec!["team:front".to_string(), "test:workflow-1".to_string()],
    )
    .attributes(
        SyntheticsGlobalVariableAttributes::new()
            .restricted_roles(vec!["xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".to_string()]),
    )
    .parse_test_options(
        SyntheticsGlobalVariableParseTestOptions::new(
            SyntheticsGlobalVariableParseTestOptionsType::HTTP_BODY,
        )
        .field("content-type".to_string())
        .local_variable_name("LOCAL_VARIABLE".to_string())
        .parser(
            SyntheticsVariableParser::new(SyntheticsGlobalVariableParserType::REGEX)
                .value(".*".to_string()),
        ),
    )
    .parse_test_public_id("abc-def-123".to_string())
    .value(
        SyntheticsGlobalVariableValue::new()
            .secure(true)
            .value("value".to_string()),
    );
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let resp = api.create_global_variable(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
