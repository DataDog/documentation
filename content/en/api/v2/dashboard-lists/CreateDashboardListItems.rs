// Add Items to a Dashboard List returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_dashboard_lists::DashboardListsAPI;
use datadog_api_client::datadogV2::model::DashboardListAddItemsRequest;
use datadog_api_client::datadogV2::model::DashboardListItemRequest;
use datadog_api_client::datadogV2::model::DashboardType;

#[tokio::main]
async fn main() {
    let body = DashboardListAddItemsRequest::new().dashboards(vec![DashboardListItemRequest::new(
        "q5j-nti-fv6".to_string(),
        DashboardType::HOST_TIMEBOARD,
    )]);
    let configuration = datadog::Configuration::new();
    let api = DashboardListsAPI::with_config(configuration);
    let resp = api
        .create_dashboard_list_items(9223372036854775807, body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
