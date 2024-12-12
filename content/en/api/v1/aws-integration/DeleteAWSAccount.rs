// Delete an AWS integration returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_aws_integration::AWSIntegrationAPI;
use datadog_api_client::datadogV1::model::AWSAccountDeleteRequest;

#[tokio::main]
async fn main() {
    let body = AWSAccountDeleteRequest::new()
        .account_id("163662907100".to_string())
        .role_name("DatadogAWSIntegrationRole".to_string());
    let configuration = datadog::Configuration::new();
    let api = AWSIntegrationAPI::with_config(configuration);
    let resp = api.delete_aws_account(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
