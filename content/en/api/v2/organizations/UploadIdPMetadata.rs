// Upload IdP metadata returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_organizations::OrganizationsAPI;
use datadog_api_client::datadogV2::api_organizations::UploadIdPMetadataOptionalParams;
use std::fs;

#[tokio::main]
async fn main() {
    let configuration = datadog::Configuration::new();
    let api = OrganizationsAPI::with_config(configuration);
    let resp = api
        .upload_idp_metadata(UploadIdPMetadataOptionalParams::default().idp_file(
            fs::read("fixtures/organizations/saml_configurations/valid_idp_metadata.xml").unwrap(),
        ))
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
