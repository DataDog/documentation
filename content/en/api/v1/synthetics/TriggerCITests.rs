// Trigger tests from CI/CD pipelines returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuth;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuthWeb;
use datadog_api_client::datadogV1::model::SyntheticsBasicAuthWebType;
use datadog_api_client::datadogV1::model::SyntheticsCIBatchMetadata;
use datadog_api_client::datadogV1::model::SyntheticsCIBatchMetadataCI;
use datadog_api_client::datadogV1::model::SyntheticsCIBatchMetadataGit;
use datadog_api_client::datadogV1::model::SyntheticsCIBatchMetadataPipeline;
use datadog_api_client::datadogV1::model::SyntheticsCIBatchMetadataProvider;
use datadog_api_client::datadogV1::model::SyntheticsCITest;
use datadog_api_client::datadogV1::model::SyntheticsCITestBody;
use datadog_api_client::datadogV1::model::SyntheticsDeviceID;
use datadog_api_client::datadogV1::model::SyntheticsTestOptionsRetry;

#[tokio::main]
async fn main() {
    let body =
        SyntheticsCITestBody::new().tests(vec![SyntheticsCITest::new("aaa-aaa-aaa".to_string())
            .basic_auth(SyntheticsBasicAuth::SyntheticsBasicAuthWeb(Box::new(
                SyntheticsBasicAuthWeb::new("PaSSw0RD!".to_string(), "my_username".to_string())
                    .type_(SyntheticsBasicAuthWebType::WEB),
            )))
            .device_ids(vec![SyntheticsDeviceID::CHROME_LAPTOP_LARGE])
            .locations(vec!["aws:eu-west-3".to_string()])
            .metadata(
                SyntheticsCIBatchMetadata::new()
                    .ci(SyntheticsCIBatchMetadataCI::new()
                        .pipeline(SyntheticsCIBatchMetadataPipeline::new())
                        .provider(SyntheticsCIBatchMetadataProvider::new()))
                    .git(SyntheticsCIBatchMetadataGit::new()),
            )
            .retry(SyntheticsTestOptionsRetry::new())]);
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let resp = api.trigger_ci_tests(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
