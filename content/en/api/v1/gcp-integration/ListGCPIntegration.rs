// List all GCP integrations returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_gcp_integration::GCPIntegrationAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = GCPIntegrationAPI::with_config(configuration);
    let resp = api.list_gcp_integration().await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
