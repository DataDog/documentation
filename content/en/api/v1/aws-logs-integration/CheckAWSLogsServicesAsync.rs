// Check permissions for log services returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_aws_logs_integration::AWSLogsIntegrationAPI;
use datadog_api_client::datadogV1::model::AWSLogsServicesRequest;

#[tokio::main]
async fn main() {
    let body = AWSLogsServicesRequest::new(
        "1234567".to_string(),
        vec![
            "s3".to_string(),
            "elb".to_string(),
            "elbv2".to_string(),
            "cloudfront".to_string(),
            "redshift".to_string(),
            "lambda".to_string(),
        ],
    );
    let configuration = datadog::Configuration::new();
    let api = AWSLogsIntegrationAPI::with_config(configuration);
    let resp = api.check_aws_logs_services_async(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
