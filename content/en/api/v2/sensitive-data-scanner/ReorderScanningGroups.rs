// Reorder Groups returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_sensitive_data_scanner::SensitiveDataScannerAPI;
use datadog_api_client::datadogV2::model::SensitiveDataScannerConfigRequest;
use datadog_api_client::datadogV2::model::SensitiveDataScannerConfigurationRelationships;
use datadog_api_client::datadogV2::model::SensitiveDataScannerConfigurationType;
use datadog_api_client::datadogV2::model::SensitiveDataScannerGroupItem;
use datadog_api_client::datadogV2::model::SensitiveDataScannerGroupList;
use datadog_api_client::datadogV2::model::SensitiveDataScannerGroupType;
use datadog_api_client::datadogV2::model::SensitiveDataScannerMetaVersionOnly;
use datadog_api_client::datadogV2::model::SensitiveDataScannerReorderConfig;

#[tokio::main]
async fn main() {
    // there is a valid "scanning_group" in the system
    let group_data_id = std::env::var("GROUP_DATA_ID").unwrap();

    // a valid "configuration" in the system
    let configuration_data_id = std::env::var("CONFIGURATION_DATA_ID").unwrap();
    let body = SensitiveDataScannerConfigRequest::new(
        SensitiveDataScannerReorderConfig::new()
            .id(configuration_data_id.clone())
            .relationships(
                SensitiveDataScannerConfigurationRelationships::new().groups(
                    SensitiveDataScannerGroupList::new().data(vec![
                        SensitiveDataScannerGroupItem::new()
                            .id(group_data_id.clone())
                            .type_(SensitiveDataScannerGroupType::SENSITIVE_DATA_SCANNER_GROUP),
                    ]),
                ),
            )
            .type_(SensitiveDataScannerConfigurationType::SENSITIVE_DATA_SCANNER_CONFIGURATIONS),
        SensitiveDataScannerMetaVersionOnly::new(),
    );
    let configuration = datadog::Configuration::new();
    let api = SensitiveDataScannerAPI::with_config(configuration);
    let resp = api.reorder_scanning_groups(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
