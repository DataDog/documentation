// Update STS Service Account returns "OK" response with cloud run revision filters
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_gcp_integration::GCPIntegrationAPI;
use datadog_api_client::datadogV2::model::GCPSTSServiceAccountAttributes;
use datadog_api_client::datadogV2::model::GCPSTSServiceAccountUpdateRequest;
use datadog_api_client::datadogV2::model::GCPSTSServiceAccountUpdateRequestData;
use datadog_api_client::datadogV2::model::GCPServiceAccountType;

#[tokio::main]
async fn main() {
    // there is a valid "gcp_sts_account" in the system
    let gcp_sts_account_data_id = std::env::var("GCP_STS_ACCOUNT_DATA_ID").unwrap();
    let body = GCPSTSServiceAccountUpdateRequest::new().data(
        GCPSTSServiceAccountUpdateRequestData::new()
            .attributes(
                GCPSTSServiceAccountAttributes::new()
                    .client_email("Test-252bf553ef04b351@example.com".to_string())
                    .cloud_run_revision_filters(vec!["merp:derp".to_string()]),
            )
            .id(gcp_sts_account_data_id.clone())
            .type_(GCPServiceAccountType::GCP_SERVICE_ACCOUNT),
    );
    let configuration = datadog::Configuration::new();
    let api = GCPIntegrationAPI::with_config(configuration);
    let resp = api
        .update_gcpsts_account(gcp_sts_account_data_id.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
