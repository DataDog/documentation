// NOTE: Frozen test fixture from tests/fixtures/api/examples/, not live SDK output.
// List all AWS integrations returns "AWS Accounts List object" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_aws_integration::AWSIntegrationAPI;
use datadog_api_client::datadogV2::api_aws_integration::ListAWSAccountsOptionalParams;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = AWSIntegrationAPI::with_config(configuration);
    let resp = api
        .list_aws_accounts(ListAWSAccountsOptionalParams::default())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
