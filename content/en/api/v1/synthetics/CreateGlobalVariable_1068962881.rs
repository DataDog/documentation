// Create a global variable from test returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;
use datadog_api_client::datadogV1::model::SyntheticsGlobalVariableParseTestOptions;
use datadog_api_client::datadogV1::model::SyntheticsGlobalVariableParseTestOptionsType;
use datadog_api_client::datadogV1::model::SyntheticsGlobalVariableRequest;
use datadog_api_client::datadogV1::model::SyntheticsGlobalVariableValue;

#[tokio::main]
async fn main() {
    // there is a valid "synthetics_api_test_multi_step" in the system
    let synthetics_api_test_multi_step_public_id =
        std::env::var("SYNTHETICS_API_TEST_MULTI_STEP_PUBLIC_ID").unwrap();
    let body = SyntheticsGlobalVariableRequest::new(
        "".to_string(),
        "GLOBAL_VARIABLE_FROM_TEST_PAYLOAD_EXAMPLESYNTHETIC".to_string(),
        vec![],
    )
    .parse_test_options(
        SyntheticsGlobalVariableParseTestOptions::new(
            SyntheticsGlobalVariableParseTestOptionsType::LOCAL_VARIABLE,
        )
        .local_variable_name("EXTRACTED_VALUE".to_string()),
    )
    .parse_test_public_id(synthetics_api_test_multi_step_public_id.clone())
    .value(
        SyntheticsGlobalVariableValue::new()
            .secure(false)
            .value("".to_string()),
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
