// Create a new API returns "API created successfully" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_api_management::APIManagementAPI;
use datadog_api_client::datadogV2::api_api_management::CreateOpenAPIOptionalParams;
use std::fs;

#[tokio::main]
async fn main() {
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.CreateOpenAPI", true);
    let api = APIManagementAPI::with_config(configuration);
    let resp = api
        .create_open_api(
            CreateOpenAPIOptionalParams::default()
                .openapi_spec_file(fs::read("openapi-spec.yaml").unwrap()),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
