// Send shared dashboard invitation email returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::DashboardInviteType;
use datadog_api_client::datadogV1::model::SharedDashboardInvites;
use datadog_api_client::datadogV1::model::SharedDashboardInvitesData;
use datadog_api_client::datadogV1::model::SharedDashboardInvitesDataObject;
use datadog_api_client::datadogV1::model::SharedDashboardInvitesDataObjectAttributes;

#[tokio::main]
async fn main() {
    // there is a valid "shared_dashboard" in the system
    let shared_dashboard_token = std::env::var("SHARED_DASHBOARD_TOKEN").unwrap();
    let body = SharedDashboardInvites::new(
        SharedDashboardInvitesData::SharedDashboardInvitesDataObject(Box::new(
            SharedDashboardInvitesDataObject::new(
                SharedDashboardInvitesDataObjectAttributes::new()
                    .email("exampledashboard@datadoghq.com".to_string()),
                DashboardInviteType::PUBLIC_DASHBOARD_INVITATION,
            ),
        )),
    );
    let configuration = datadog::Configuration::new();
    let api = DashboardsAPI::with_config(configuration);
    let resp = api
        .send_public_dashboard_invitation(shared_dashboard_token.clone(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
