// Delete a GCP integration returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_gcp_integration::GCPIntegrationAPI;
use datadog_api_client::datadogV1::model::GCPAccount;

#[tokio::main]
async fn main() {
    let body = GCPAccount::new()
        .client_email("252bf553ef04b351@example.com".to_string())
        .client_id("163662907116366290710".to_string())
        .project_id("datadog-apitest".to_string());
    let configuration = datadog::Configuration::new();
    let api = GCPIntegrationAPI::with_config(configuration);
    let resp = api.delete_gcp_integration(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
