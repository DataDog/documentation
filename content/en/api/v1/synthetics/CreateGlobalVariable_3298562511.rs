// Create a FIDO global variable returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;
use datadog_api_client::datadogV1::model::SyntheticsGlobalVariableRequest;

#[tokio::main]
async fn main() {
    let body = SyntheticsGlobalVariableRequest::new(
        "".to_string(),
        "GLOBAL_VARIABLE_FIDO_PAYLOAD_EXAMPLESYNTHETIC".to_string(),
        vec![],
    )
    .is_fido(true);
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let resp = api.create_global_variable(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
