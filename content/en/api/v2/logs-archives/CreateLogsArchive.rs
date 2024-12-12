// Create an archive returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_logs_archives::LogsArchivesAPI;
use datadog_api_client::datadogV2::model::LogsArchiveCreateRequest;
use datadog_api_client::datadogV2::model::LogsArchiveCreateRequestAttributes;
use datadog_api_client::datadogV2::model::LogsArchiveCreateRequestDefinition;
use datadog_api_client::datadogV2::model::LogsArchiveCreateRequestDestination;
use datadog_api_client::datadogV2::model::LogsArchiveDestinationAzure;
use datadog_api_client::datadogV2::model::LogsArchiveDestinationAzureType;
use datadog_api_client::datadogV2::model::LogsArchiveIntegrationAzure;

#[tokio::main]
async fn main() {
    let body = LogsArchiveCreateRequest::new().data(
        LogsArchiveCreateRequestDefinition::new("archives".to_string()).attributes(
            LogsArchiveCreateRequestAttributes::new(
                LogsArchiveCreateRequestDestination::LogsArchiveDestinationAzure(Box::new(
                    LogsArchiveDestinationAzure::new(
                        "container-name".to_string(),
                        LogsArchiveIntegrationAzure::new(
                            "aaaaaaaa-1a1a-1a1a-1a1a-aaaaaaaaaaaa".to_string(),
                            "aaaaaaaa-1a1a-1a1a-1a1a-aaaaaaaaaaaa".to_string(),
                        ),
                        "account-name".to_string(),
                        LogsArchiveDestinationAzureType::AZURE,
                    ),
                )),
                "Nginx Archive".to_string(),
                "source:nginx".to_string(),
            )
            .include_tags(false)
            .rehydration_max_scan_size_in_gb(Some(100))
            .rehydration_tags(vec!["team:intake".to_string(), "team:app".to_string()]),
        ),
    );
    let configuration = datadog::Configuration::new();
    let api = LogsArchivesAPI::with_config(configuration);
    let resp = api.create_logs_archive(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
