// Delete a tag filtering entry returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_aws_integration::AWSIntegrationAPI;
use datadog_api_client::datadogV1::model::AWSNamespace;
use datadog_api_client::datadogV1::model::AWSTagFilterDeleteRequest;

#[tokio::main]
async fn main() {
    let body = AWSTagFilterDeleteRequest::new()
        .account_id("FAKEAC0FAKEAC2FAKEAC".to_string())
        .namespace(AWSNamespace::ELB);
    let configuration = datadog::Configuration::new();
    let api = AWSIntegrationAPI::with_config(configuration);
    let resp = api.delete_aws_tag_filter(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
