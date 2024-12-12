// Revoke shared dashboard invitations returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_dashboards::DashboardsAPI;
use datadog_api_client::datadogV1::model::DashboardInviteType;
use datadog_api_client::datadogV1::model::SharedDashboardInvites;
use datadog_api_client::datadogV1::model::SharedDashboardInvitesData;
use datadog_api_client::datadogV1::model::SharedDashboardInvitesDataObject;
use datadog_api_client::datadogV1::model::SharedDashboardInvitesDataObjectAttributes;

#[tokio::main]
async fn main() {
    let body =
        SharedDashboardInvites::new(SharedDashboardInvitesData::SharedDashboardInvitesDataList(
            vec![SharedDashboardInvitesDataObject::new(
                SharedDashboardInvitesDataObjectAttributes::new()
                    .email("test@datadoghq.com".to_string()),
                DashboardInviteType::PUBLIC_DASHBOARD_INVITATION,
            )],
        ));
    let configuration = datadog::Configuration::new();
    let api = DashboardsAPI::with_config(configuration);
    let resp = api
        .delete_public_dashboard_invitation("token".to_string(), body)
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
