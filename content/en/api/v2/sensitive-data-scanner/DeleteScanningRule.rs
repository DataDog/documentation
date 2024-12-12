// Delete Scanning Rule returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_sensitive_data_scanner::SensitiveDataScannerAPI;
use datadog_api_client::datadogV2::model::SensitiveDataScannerMetaVersionOnly;
use datadog_api_client::datadogV2::model::SensitiveDataScannerRuleDeleteRequest;

#[tokio::main]
async fn main() {
    // the "scanning_group" has a "scanning_rule"
    let rule_data_id = std::env::var("RULE_DATA_ID").unwrap();
    let body =
        SensitiveDataScannerRuleDeleteRequest::new(SensitiveDataScannerMetaVersionOnly::new());
    let configuration = datadog::Configuration::new();
    let api = SensitiveDataScannerAPI::with_config(configuration);
    let resp = api.delete_scanning_rule(rule_data_id.clone(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
