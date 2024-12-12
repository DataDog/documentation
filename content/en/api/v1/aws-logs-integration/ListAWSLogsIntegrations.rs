// List all AWS Logs integrations returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_aws_logs_integration::AWSLogsIntegrationAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = AWSLogsIntegrationAPI::with_config(configuration);
    let resp = api.list_aws_logs_integrations().await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
