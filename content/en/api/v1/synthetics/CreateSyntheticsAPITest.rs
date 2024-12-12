// Create an API test returns "OK - Returns the created test details." response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;
use datadog_api_client::datadogV1::model::SyntheticsAPITest;
use datadog_api_client::datadogV1::model::SyntheticsAPITestConfig;
use datadog_api_client::datadogV1::model::SyntheticsAPITestType;
use datadog_api_client::datadogV1::model::SyntheticsAssertion;
use datadog_api_client::datadogV1::model::SyntheticsAssertionOperator;
use datadog_api_client::datadogV1::model::SyntheticsAssertionTarget;
use datadog_api_client::datadogV1::model::SyntheticsAssertionType;
use datadog_api_client::datadogV1::model::SyntheticsBrowserTestRumSettings;
use datadog_api_client::datadogV1::model::SyntheticsDeviceID;
use datadog_api_client::datadogV1::model::SyntheticsTestCiOptions;
use datadog_api_client::datadogV1::model::SyntheticsTestDetailsSubType;
use datadog_api_client::datadogV1::model::SyntheticsTestExecutionRule;
use datadog_api_client::datadogV1::model::SyntheticsTestOptions;
use datadog_api_client::datadogV1::model::SyntheticsTestOptionsHTTPVersion;
use datadog_api_client::datadogV1::model::SyntheticsTestOptionsMonitorOptions;
use datadog_api_client::datadogV1::model::SyntheticsTestOptionsRetry;
use datadog_api_client::datadogV1::model::SyntheticsTestOptionsScheduling;
use datadog_api_client::datadogV1::model::SyntheticsTestOptionsSchedulingTimeframe;
use datadog_api_client::datadogV1::model::SyntheticsTestPauseStatus;
use datadog_api_client::datadogV1::model::SyntheticsTestRequest;
use serde_json::Value;

#[tokio::main]
async fn main() {
    let body = SyntheticsAPITest::new(
        SyntheticsAPITestConfig::new()
            .assertions(vec![SyntheticsAssertion::SyntheticsAssertionTarget(
                Box::new(SyntheticsAssertionTarget::new(
                    SyntheticsAssertionOperator::LESS_THAN,
                    Value::from(1000),
                    SyntheticsAssertionType::RESPONSE_TIME,
                )),
            )])
            .request(
                SyntheticsTestRequest::new()
                    .method("GET".to_string())
                    .url("https://example.com".to_string()),
            ),
        vec!["aws:eu-west-3".to_string()],
        "Notification message".to_string(),
        "Example test name".to_string(),
        SyntheticsTestOptions::new()
            .ci(SyntheticsTestCiOptions::new()
                .execution_rule(SyntheticsTestExecutionRule::BLOCKING))
            .device_ids(vec![SyntheticsDeviceID::CHROME_LAPTOP_LARGE])
            .http_version(SyntheticsTestOptionsHTTPVersion::HTTP1)
            .monitor_options(SyntheticsTestOptionsMonitorOptions::new())
            .restricted_roles(vec!["xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".to_string()])
            .retry(SyntheticsTestOptionsRetry::new())
            .rum_settings(
                SyntheticsBrowserTestRumSettings::new(true)
                    .application_id("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".to_string())
                    .client_token_id(12345),
            )
            .scheduling(
                SyntheticsTestOptionsScheduling::new()
                    .timeframes(vec![
                        SyntheticsTestOptionsSchedulingTimeframe::new()
                            .day(1)
                            .from("07:00".to_string())
                            .to("16:00".to_string()),
                        SyntheticsTestOptionsSchedulingTimeframe::new()
                            .day(3)
                            .from("07:00".to_string())
                            .to("16:00".to_string()),
                    ])
                    .timezone("America/New_York".to_string()),
            ),
        SyntheticsAPITestType::API,
    )
    .status(SyntheticsTestPauseStatus::LIVE)
    .subtype(SyntheticsTestDetailsSubType::HTTP)
    .tags(vec!["env:production".to_string()]);
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let resp = api.create_synthetics_api_test(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
