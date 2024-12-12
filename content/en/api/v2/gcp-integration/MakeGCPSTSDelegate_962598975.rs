// Create a Datadog GCP principal with empty body returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_gcp_integration::GCPIntegrationAPI;
use datadog_api_client::datadogV2::api_gcp_integration::MakeGCPSTSDelegateOptionalParams;
use std::collections::BTreeMap;

#[tokio::main]
async fn main() {
    let body = BTreeMap::new();
    let configuration = datadog::Configuration::new();
    let api = GCPIntegrationAPI::with_config(configuration);
    let resp = api
        .make_gcpsts_delegate(MakeGCPSTSDelegateOptionalParams::default().body(body))
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
