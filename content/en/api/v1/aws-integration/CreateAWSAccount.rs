// Create an AWS integration returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_aws_integration::AWSIntegrationAPI;
use datadog_api_client::datadogV1::model::AWSAccount;
use std::collections::BTreeMap;

#[tokio::main]
async fn main() {
    let body = AWSAccount::new()
        .account_id("163662907100".to_string())
        .account_specific_namespace_rules(BTreeMap::from([("auto_scaling".to_string(), false)]))
        .cspm_resource_collection_enabled(true)
        .excluded_regions(vec!["us-east-1".to_string(), "us-west-2".to_string()])
        .extended_resource_collection_enabled(true)
        .filter_tags(vec!["$KEY:$VALUE".to_string()])
        .host_tags(vec!["$KEY:$VALUE".to_string()])
        .metrics_collection_enabled(false)
        .role_name("DatadogAWSIntegrationRole".to_string());
    let configuration = datadog::Configuration::new();
    let api = AWSIntegrationAPI::with_config(configuration);
    let resp = api.create_aws_account(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
