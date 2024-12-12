// Get a list of entities returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_software_catalog::ListCatalogEntityOptionalParams;
use datadog_api_client::datadogV2::api_software_catalog::SoftwareCatalogAPI;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = SoftwareCatalogAPI::with_config(configuration);
    let resp = api
        .list_catalog_entity(ListCatalogEntityOptionalParams::default())
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
