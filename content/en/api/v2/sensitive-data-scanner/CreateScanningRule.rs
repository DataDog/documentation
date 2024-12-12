// Create Scanning Rule returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_sensitive_data_scanner::SensitiveDataScannerAPI;
use datadog_api_client::datadogV2::model::SensitiveDataScannerGroup;
use datadog_api_client::datadogV2::model::SensitiveDataScannerGroupData;
use datadog_api_client::datadogV2::model::SensitiveDataScannerGroupType;
use datadog_api_client::datadogV2::model::SensitiveDataScannerIncludedKeywordConfiguration;
use datadog_api_client::datadogV2::model::SensitiveDataScannerMetaVersionOnly;
use datadog_api_client::datadogV2::model::SensitiveDataScannerRuleAttributes;
use datadog_api_client::datadogV2::model::SensitiveDataScannerRuleCreate;
use datadog_api_client::datadogV2::model::SensitiveDataScannerRuleCreateRequest;
use datadog_api_client::datadogV2::model::SensitiveDataScannerRuleRelationships;
use datadog_api_client::datadogV2::model::SensitiveDataScannerRuleType;
use datadog_api_client::datadogV2::model::SensitiveDataScannerTextReplacement;
use datadog_api_client::datadogV2::model::SensitiveDataScannerTextReplacementType;

#[tokio::main]
async fn main() {
    // there is a valid "scanning_group" in the system
    let group_data_id = std::env::var("GROUP_DATA_ID").unwrap();
    let body = SensitiveDataScannerRuleCreateRequest::new(
        SensitiveDataScannerRuleCreate::new(
            SensitiveDataScannerRuleAttributes::new()
                .excluded_namespaces(vec!["admin.name".to_string()])
                .included_keyword_configuration(
                    SensitiveDataScannerIncludedKeywordConfiguration::new(
                        35,
                        vec!["credit card".to_string()],
                    ),
                )
                .is_enabled(true)
                .name("Example-Sensitive-Data-Scanner".to_string())
                .namespaces(vec!["admin".to_string()])
                .pattern("pattern".to_string())
                .priority(1)
                .tags(vec!["sensitive_data:true".to_string()])
                .text_replacement(
                    SensitiveDataScannerTextReplacement::new()
                        .type_(SensitiveDataScannerTextReplacementType::NONE),
                ),
            SensitiveDataScannerRuleRelationships::new().group(
                SensitiveDataScannerGroupData::new().data(
                    SensitiveDataScannerGroup::new()
                        .id(group_data_id.clone())
                        .type_(SensitiveDataScannerGroupType::SENSITIVE_DATA_SCANNER_GROUP),
                ),
            ),
            SensitiveDataScannerRuleType::SENSITIVE_DATA_SCANNER_RULE,
        ),
        SensitiveDataScannerMetaVersionOnly::new(),
    );
    let configuration = datadog::Configuration::new();
    let api = SensitiveDataScannerAPI::with_config(configuration);
    let resp = api.create_scanning_rule(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
