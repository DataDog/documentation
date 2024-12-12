// Create a new entry for your service account with security command center
// enabled returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_gcp_integration::GCPIntegrationAPI;
use datadog_api_client::datadogV2::model::GCPSTSServiceAccountAttributes;
use datadog_api_client::datadogV2::model::GCPSTSServiceAccountCreateRequest;
use datadog_api_client::datadogV2::model::GCPSTSServiceAccountData;
use datadog_api_client::datadogV2::model::GCPServiceAccountType;

#[tokio::main]
async fn main() {
    let body = GCPSTSServiceAccountCreateRequest::new().data(
        GCPSTSServiceAccountData::new()
            .attributes(
                GCPSTSServiceAccountAttributes::new()
                    .client_email(
                        "Test-252bf553ef04b351@test-project.iam.gserviceaccount.com".to_string(),
                    )
                    .host_filters(vec![])
                    .is_security_command_center_enabled(true),
            )
            .type_(GCPServiceAccountType::GCP_SERVICE_ACCOUNT),
    );
    let configuration = datadog::Configuration::new();
    let api = GCPIntegrationAPI::with_config(configuration);
    let resp = api.create_gcpsts_account(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
