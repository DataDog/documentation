// Search for incidents returns "OK" response with pagination
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_incidents::IncidentsAPI;
use datadog_api_client::datadogV2::api_incidents::SearchIncidentsOptionalParams;
use futures_util::pin_mut;
use futures_util::stream::StreamExt;

#[tokio::main]
async fn main() {
    let mut configuration = datadog::Configuration::new();
    configuration.set_unstable_operation_enabled("v2.SearchIncidents", true);
    let api = IncidentsAPI::with_config(configuration);
    let response = api.search_incidents_with_pagination(
        "state:(active OR stable OR resolved)".to_string(),
        SearchIncidentsOptionalParams::default().page_size(2),
    );
    pin_mut!(response);
    while let Some(resp) = response.next().await {
        if let Ok(value) = resp {
            println!("{:#?}", value);
        } else {
            println!("{:#?}", resp.unwrap_err());
        }
    }
}
