// List APIs returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_api_management::APIManagementAPI;
use datadog_api_client::datadogV2::api_api_management::ListAPIsOptionalParams;

#[tokio::main]
async fn main() {
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.ListAPIs", true);
    let api = APIManagementAPI::with_config(configuration);
    let resp = api.list_apis(ListAPIsOptionalParams::default()).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
