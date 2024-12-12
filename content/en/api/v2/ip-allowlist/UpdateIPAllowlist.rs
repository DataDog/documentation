// Update IP Allowlist returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_ip_allowlist::IPAllowlistAPI;
use datadog_api_client::datadogV2::model::IPAllowlistAttributes;
use datadog_api_client::datadogV2::model::IPAllowlistData;
use datadog_api_client::datadogV2::model::IPAllowlistEntry;
use datadog_api_client::datadogV2::model::IPAllowlistEntryAttributes;
use datadog_api_client::datadogV2::model::IPAllowlistEntryData;
use datadog_api_client::datadogV2::model::IPAllowlistEntryType;
use datadog_api_client::datadogV2::model::IPAllowlistType;
use datadog_api_client::datadogV2::model::IPAllowlistUpdateRequest;

#[tokio::main]
async fn main() {
    let body = IPAllowlistUpdateRequest::new(
        IPAllowlistData::new(IPAllowlistType::IP_ALLOWLIST).attributes(
            IPAllowlistAttributes::new()
                .enabled(false)
                .entries(vec![IPAllowlistEntry::new(
                    IPAllowlistEntryData::new(IPAllowlistEntryType::IP_ALLOWLIST_ENTRY).attributes(
                        IPAllowlistEntryAttributes::new()
                            .cidr_block("127.0.0.1".to_string())
                            .note("Example-IP-Allowlist".to_string()),
                    ),
                )]),
        ),
    );
    let configuration = datadog::Configuration::new();
    let api = IPAllowlistAPI::with_config(configuration);
    let resp = api.update_ip_allowlist(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
