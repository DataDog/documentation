// Create a multi-step api test with every type of basicAuth returns "OK - Returns
// the created test details." response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;
use datadog_api_client::datadogV1::model::SyntheticsAPIStep;
use datadog_api_client::datadogV1::model::SyntheticsAPITest;
use datadog_api_client::datadogV1::model::SyntheticsAPITestConfig;
use datadog_api_client::datadogV1::model::SyntheticsAPITestStep;
use datadog_api_client::datadogV1::model::SyntheticsAPITestStepSubtype;
use datadog_api_client::datadogV1::model::SyntheticsAPITestType;
use datadog_api_client::datadogV1::model::SyntheticsAssertion;
use datadog_api_client::datadogV1::model::SyntheticsAssertionOperator;
use datadog_api_client::datadogV1::model::SyntheticsAssertionTarget;
use datadog_api_client::datadogV1::model::SyntheticsAssertionType;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuth;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuthDigest;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuthDigestType;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuthNTLM;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuthNTLMType;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuthOauthClient;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuthOauthClientType;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuthOauthROP;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuthOauthROPType;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuthOauthTokenApiAuthentication;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuthSigv4;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuthSigv4Type;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuthWeb;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuthWebType;
use datadog_api_client::datadogV1::model::SyntheticsTestDetailsSubType;
use datadog_api_client::datadogV1::model::SyntheticsTestOptions;
use datadog_api_client::datadogV1::model::SyntheticsTestRequest;
use serde_json::Value;

#[tokio::main]
async fn main() {
    let body = SyntheticsAPITest::new(
        SyntheticsAPITestConfig::new().steps(vec![
            SyntheticsAPIStep::SyntheticsAPITestStep(Box::new(SyntheticsAPITestStep::new(
                vec![SyntheticsAssertion::SyntheticsAssertionTarget(Box::new(
                    SyntheticsAssertionTarget::new(
                        SyntheticsAssertionOperator::IS,
                        Value::from(200),
                        SyntheticsAssertionType::STATUS_CODE,
                    ),
                ))],
                "request is sent".to_string(),
                SyntheticsTestRequest::new()
                    .basic_auth(SyntheticsBasicAuth::SyntheticsBasicAuthWeb(Box::new(
                        SyntheticsBasicAuthWeb::new("password".to_string(), "username".to_string()),
                    )))
                    .method("GET".to_string())
                    .url("https://httpbin.org/status/200".to_string()),
                SyntheticsAPITestStepSubtype::HTTP,
            ))),
            SyntheticsAPIStep::SyntheticsAPITestStep(Box::new(SyntheticsAPITestStep::new(
                vec![SyntheticsAssertion::SyntheticsAssertionTarget(Box::new(
                    SyntheticsAssertionTarget::new(
                        SyntheticsAssertionOperator::IS,
                        Value::from(200),
                        SyntheticsAssertionType::STATUS_CODE,
                    ),
                ))],
                "request is sent".to_string(),
                SyntheticsTestRequest::new()
                    .basic_auth(SyntheticsBasicAuth::SyntheticsBasicAuthWeb(Box::new(
                        SyntheticsBasicAuthWeb::new("password".to_string(), "username".to_string())
                            .type_(SyntheticsBasicAuthWebType::WEB),
                    )))
                    .method("GET".to_string())
                    .url("https://httpbin.org/status/200".to_string()),
                SyntheticsAPITestStepSubtype::HTTP,
            ))),
            SyntheticsAPIStep::SyntheticsAPITestStep(Box::new(SyntheticsAPITestStep::new(
                vec![SyntheticsAssertion::SyntheticsAssertionTarget(Box::new(
                    SyntheticsAssertionTarget::new(
                        SyntheticsAssertionOperator::IS,
                        Value::from(200),
                        SyntheticsAssertionType::STATUS_CODE,
                    ),
                ))],
                "request is sent".to_string(),
                SyntheticsTestRequest::new()
                    .basic_auth(SyntheticsBasicAuth::SyntheticsBasicAuthSigv4(Box::new(
                        SyntheticsBasicAuthSigv4::new(
                            "accessKey".to_string(),
                            "secretKey".to_string(),
                            SyntheticsBasicAuthSigv4Type::SIGV4,
                        ),
                    )))
                    .method("GET".to_string())
                    .url("https://httpbin.org/status/200".to_string()),
                SyntheticsAPITestStepSubtype::HTTP,
            ))),
            SyntheticsAPIStep::SyntheticsAPITestStep(Box::new(SyntheticsAPITestStep::new(
                vec![SyntheticsAssertion::SyntheticsAssertionTarget(Box::new(
                    SyntheticsAssertionTarget::new(
                        SyntheticsAssertionOperator::IS,
                        Value::from(200),
                        SyntheticsAssertionType::STATUS_CODE,
                    ),
                ))],
                "request is sent".to_string(),
                SyntheticsTestRequest::new()
                    .basic_auth(SyntheticsBasicAuth::SyntheticsBasicAuthNTLM(Box::new(
                        SyntheticsBasicAuthNTLM::new(SyntheticsBasicAuthNTLMType::NTLM),
                    )))
                    .method("GET".to_string())
                    .url("https://httpbin.org/status/200".to_string()),
                SyntheticsAPITestStepSubtype::HTTP,
            ))),
            SyntheticsAPIStep::SyntheticsAPITestStep(Box::new(SyntheticsAPITestStep::new(
                vec![SyntheticsAssertion::SyntheticsAssertionTarget(Box::new(
                    SyntheticsAssertionTarget::new(
                        SyntheticsAssertionOperator::IS,
                        Value::from(200),
                        SyntheticsAssertionType::STATUS_CODE,
                    ),
                ))],
                "request is sent".to_string(),
                SyntheticsTestRequest::new()
                    .basic_auth(SyntheticsBasicAuth::SyntheticsBasicAuthDigest(Box::new(
                        SyntheticsBasicAuthDigest::new(
                            "password".to_string(),
                            SyntheticsBasicAuthDigestType::DIGEST,
                            "username".to_string(),
                        ),
                    )))
                    .method("GET".to_string())
                    .url("https://httpbin.org/status/200".to_string()),
                SyntheticsAPITestStepSubtype::HTTP,
            ))),
            SyntheticsAPIStep::SyntheticsAPITestStep(Box::new(SyntheticsAPITestStep::new(
                vec![SyntheticsAssertion::SyntheticsAssertionTarget(Box::new(
                    SyntheticsAssertionTarget::new(
                        SyntheticsAssertionOperator::IS,
                        Value::from(200),
                        SyntheticsAssertionType::STATUS_CODE,
                    ),
                ))],
                "request is sent".to_string(),
                SyntheticsTestRequest::new()
                    .basic_auth(SyntheticsBasicAuth::SyntheticsBasicAuthOauthClient(
                        Box::new(SyntheticsBasicAuthOauthClient::new(
                            "accessTokenUrl".to_string(),
                            "clientId".to_string(),
                            "clientSecret".to_string(),
                            SyntheticsBasicAuthOauthTokenApiAuthentication::HEADER,
                            SyntheticsBasicAuthOauthClientType::OAUTH_CLIENT,
                        )),
                    ))
                    .method("GET".to_string())
                    .url("https://httpbin.org/status/200".to_string()),
                SyntheticsAPITestStepSubtype::HTTP,
            ))),
            SyntheticsAPIStep::SyntheticsAPITestStep(Box::new(SyntheticsAPITestStep::new(
                vec![SyntheticsAssertion::SyntheticsAssertionTarget(Box::new(
                    SyntheticsAssertionTarget::new(
                        SyntheticsAssertionOperator::IS,
                        Value::from(200),
                        SyntheticsAssertionType::STATUS_CODE,
                    ),
                ))],
                "request is sent".to_string(),
                SyntheticsTestRequest::new()
                    .basic_auth(SyntheticsBasicAuth::SyntheticsBasicAuthOauthROP(Box::new(
                        SyntheticsBasicAuthOauthROP::new(
                            "accessTokenUrl".to_string(),
                            "password".to_string(),
                            SyntheticsBasicAuthOauthTokenApiAuthentication::HEADER,
                            SyntheticsBasicAuthOauthROPType::OAUTH_ROP,
                            "username".to_string(),
                        ),
                    )))
                    .method("GET".to_string())
                    .url("https://httpbin.org/status/200".to_string()),
                SyntheticsAPITestStepSubtype::HTTP,
            ))),
        ]),
        vec!["aws:us-east-2".to_string()],
        "BDD test payload: synthetics_api_test_multi_step_with_every_type_of_basic_auth.json"
            .to_string(),
        "Example-Synthetic".to_string(),
        SyntheticsTestOptions::new().tick_every(60),
        SyntheticsAPITestType::API,
    )
    .subtype(SyntheticsTestDetailsSubType::MULTI);
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let resp = api.create_synthetics_api_test(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
