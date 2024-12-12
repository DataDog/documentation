// Mute or unmute a batch of findings returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_security_monitoring::SecurityMonitoringAPI;
use datadog_api_client::datadogV2::model::BulkMuteFindingsRequest;
use datadog_api_client::datadogV2::model::BulkMuteFindingsRequestAttributes;
use datadog_api_client::datadogV2::model::BulkMuteFindingsRequestData;
use datadog_api_client::datadogV2::model::BulkMuteFindingsRequestMeta;
use datadog_api_client::datadogV2::model::BulkMuteFindingsRequestMetaFindings;
use datadog_api_client::datadogV2::model::BulkMuteFindingsRequestProperties;
use datadog_api_client::datadogV2::model::FindingMuteReason;
use datadog_api_client::datadogV2::model::FindingType;

#[tokio::main]
async fn main() {
    let body = BulkMuteFindingsRequest::new(BulkMuteFindingsRequestData::new(
        BulkMuteFindingsRequestAttributes::new(
            BulkMuteFindingsRequestProperties::new(true, FindingMuteReason::ACCEPTED_RISK)
                .expiration_date(1778721573794),
        ),
        "dbe5f567-192b-4404-b908-29b70e1c9f76".to_string(),
        BulkMuteFindingsRequestMeta::new()
            .findings(vec![BulkMuteFindingsRequestMetaFindings::new().finding_id(
                "ZGVmLTAwcC1pZXJ-aS0wZjhjNjMyZDNmMzRlZTgzNw==".to_string(),
            )]),
        FindingType::FINDING,
    ));
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.MuteFindings", true);
    let api = SecurityMonitoringAPI::with_config(configuration);
    let resp = api.mute_findings(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
