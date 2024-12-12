// Update a GCP integration cloud run revision filters returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_gcp_integration::GCPIntegrationAPI;
use datadog_api_client::datadogV1::model::GCPAccount;

#[tokio::main]
async fn main() {
    let body = GCPAccount::new()
        .auth_provider_x509_cert_url("https://www.googleapis.com/oauth2/v1/certs".to_string())
        .auth_uri("https://accounts.google.com/o/oauth2/auth".to_string())
        .client_email("252bf553ef04b351@example.com".to_string())
        .client_id("163662907116366290710".to_string())
        .client_x509_cert_url(
            "https://www.googleapis.com/robot/v1/metadata/x509/$CLIENT_EMAIL".to_string(),
        )
        .cloud_run_revision_filters(vec!["merp:derp".to_string()])
        .host_filters("key:value,filter:example".to_string())
        .is_cspm_enabled(true)
        .is_security_command_center_enabled(true)
        .private_key("private_key".to_string())
        .private_key_id("123456789abcdefghi123456789abcdefghijklm".to_string())
        .project_id("datadog-apitest".to_string())
        .resource_collection_enabled(true)
        .token_uri("https://accounts.google.com/o/oauth2/token".to_string())
        .type_("service_account".to_string());
    let configuration = datadog::Configuration::new();
    let api = GCPIntegrationAPI::with_config(configuration);
    let resp = api.update_gcp_integration(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
