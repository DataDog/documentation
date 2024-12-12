// Update Scanning Rule returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_sensitive_data_scanner::SensitiveDataScannerAPI;
use datadog_api_client::datadogV2::model::SensitiveDataScannerIncludedKeywordConfiguration;
use datadog_api_client::datadogV2::model::SensitiveDataScannerMetaVersionOnly;
use datadog_api_client::datadogV2::model::SensitiveDataScannerRuleAttributes;
use datadog_api_client::datadogV2::model::SensitiveDataScannerRuleType;
use datadog_api_client::datadogV2::model::SensitiveDataScannerRuleUpdate;
use datadog_api_client::datadogV2::model::SensitiveDataScannerRuleUpdateRequest;
use datadog_api_client::datadogV2::model::SensitiveDataScannerTextReplacement;
use datadog_api_client::datadogV2::model::SensitiveDataScannerTextReplacementType;

#[tokio::main]
async fn main() {
    // the "scanning_group" has a "scanning_rule"
    let rule_data_id = std::env::var("RULE_DATA_ID").unwrap();
    let body = SensitiveDataScannerRuleUpdateRequest::new(
        SensitiveDataScannerRuleUpdate::new()
            .attributes(
                SensitiveDataScannerRuleAttributes::new()
                    .included_keyword_configuration(
                        SensitiveDataScannerIncludedKeywordConfiguration::new(
                            35,
                            vec!["credit card".to_string(), "cc".to_string()],
                        ),
                    )
                    .is_enabled(true)
                    .name("Example-Sensitive-Data-Scanner".to_string())
                    .pattern("pattern".to_string())
                    .priority(5)
                    .tags(vec!["sensitive_data:true".to_string()])
                    .text_replacement(
                        SensitiveDataScannerTextReplacement::new()
                            .type_(SensitiveDataScannerTextReplacementType::NONE),
                    ),
            )
            .id(rule_data_id.clone())
            .type_(SensitiveDataScannerRuleType::SENSITIVE_DATA_SCANNER_RULE),
        SensitiveDataScannerMetaVersionOnly::new(),
    );
    let configuration = datadog::Configuration::new();
    let api = SensitiveDataScannerAPI::with_config(configuration);
    let resp = api.update_scanning_rule(rule_data_id.clone(), body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
