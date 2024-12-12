// Send a deployment event for DORA Metrics returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_dora_metrics::DORAMetricsAPI;
use datadog_api_client::datadogV2::model::DORADeploymentRequest;
use datadog_api_client::datadogV2::model::DORADeploymentRequestAttributes;
use datadog_api_client::datadogV2::model::DORADeploymentRequestData;
use datadog_api_client::datadogV2::model::DORAGitInfo;

#[tokio::main]
async fn main() {
    let body = DORADeploymentRequest::new(DORADeploymentRequestData::new(
        DORADeploymentRequestAttributes::new(
            1693491984000000000,
            "shopist".to_string(),
            1693491974000000000,
        )
        .git(DORAGitInfo::new(
            "66adc9350f2cc9b250b69abddab733dd55e1a588".to_string(),
            "https://github.com/organization/example-repository".to_string(),
        ))
        .version("v1.12.07".to_string()),
    ));
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.CreateDORADeployment", true);
    let api = DORAMetricsAPI::with_config(configuration);
    let resp = api.create_dora_deployment(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
