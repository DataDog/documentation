// Create a TOTP global variable returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_synthetics::SyntheticsAPI;
use datadog_api_client::datadogV1::model::SyntheticsGlobalVariableOptions;
use datadog_api_client::datadogV1::model::SyntheticsGlobalVariableRequest;
use datadog_api_client::datadogV1::model::SyntheticsGlobalVariableTOTPParameters;
use datadog_api_client::datadogV1::model::SyntheticsGlobalVariableValue;

#[tokio::main]
async fn main() {
    let body = SyntheticsGlobalVariableRequest::new(
        "".to_string(),
        "GLOBAL_VARIABLE_TOTP_PAYLOAD_EXAMPLESYNTHETIC".to_string(),
        vec![],
    )
    .is_totp(true)
    .value(
        SyntheticsGlobalVariableValue::new()
            .options(
                SyntheticsGlobalVariableOptions::new().totp_parameters(
                    SyntheticsGlobalVariableTOTPParameters::new()
                        .digits(6)
                        .refresh_interval(30),
                ),
            )
            .secure(false)
            .value("".to_string()),
    );
    let configuration = datadog::Configuration::new();
    let api = SyntheticsAPI::with_config(configuration);
    let resp = api.create_global_variable(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
