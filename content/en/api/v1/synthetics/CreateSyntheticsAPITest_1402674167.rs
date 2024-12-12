// Create an API GRPC test returns "OK - Returns the created test details."
// response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;
use datadog_api_client::datadogV1::model::SyntheticsAPITest;
use datadog_api_client::datadogV1::model::SyntheticsAPITestConfig;
use datadog_api_client::datadogV1::model::SyntheticsAPITestType;
use datadog_api_client::datadogV1::model::SyntheticsAssertion;
use datadog_api_client::datadogV1::model::SyntheticsAssertionOperator;
use datadog_api_client::datadogV1::model::SyntheticsAssertionTarget;
use datadog_api_client::datadogV1::model::SyntheticsAssertionType;
use datadog_api_client::datadogV1::model::SyntheticsTestDetailsSubType;
use datadog_api_client::datadogV1::model::SyntheticsTestOptions;
use datadog_api_client::datadogV1::model::SyntheticsTestOptionsMonitorOptions;
use datadog_api_client::datadogV1::model::SyntheticsTestRequest;
use serde_json::Value;
use std::collections::BTreeMap;

#[tokio::main]
async fn main() {
    let body = SyntheticsAPITest::new(
        SyntheticsAPITestConfig::new()
            .assertions(vec![
                SyntheticsAssertion::SyntheticsAssertionTarget(Box::new(
                    SyntheticsAssertionTarget::new(
                        SyntheticsAssertionOperator::IS,
                        Value::from(1),
                        SyntheticsAssertionType::GRPC_HEALTHCHECK_STATUS,
                    ),
                )),
                SyntheticsAssertion::SyntheticsAssertionTarget(Box::new(
                    SyntheticsAssertionTarget::new(
                        SyntheticsAssertionOperator::IS,
                        Value::from("proto target"),
                        SyntheticsAssertionType::GRPC_PROTO,
                    ),
                )),
                SyntheticsAssertion::SyntheticsAssertionTarget(Box::new(
                    SyntheticsAssertionTarget::new(
                        SyntheticsAssertionOperator::IS,
                        Value::from("123"),
                        SyntheticsAssertionType::GRPC_METADATA,
                    )
                    .property("property".to_string()),
                )),
            ])
            .request(
                SyntheticsTestRequest::new()
                    .host("localhost".to_string())
                    .message("".to_string())
                    .metadata(BTreeMap::from([]))
                    .method("GET".to_string())
                    .port("50051".to_string())
                    .service("Hello".to_string()),
            ),
        vec!["aws:us-east-2".to_string()],
        "BDD test payload: synthetics_api_grpc_test_payload.json".to_string(),
        "Example-Synthetic".to_string(),
        SyntheticsTestOptions::new()
            .min_failure_duration(0)
            .min_location_failed(1)
            .monitor_name("Example-Synthetic".to_string())
            .monitor_options(SyntheticsTestOptionsMonitorOptions::new().renotify_interval(0))
            .tick_every(60),
        SyntheticsAPITestType::API,
    )
    .subtype(SyntheticsTestDetailsSubType::GRPC)
    .tags(vec!["testing:api".to_string()]);
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let resp = api.create_synthetics_api_test(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
