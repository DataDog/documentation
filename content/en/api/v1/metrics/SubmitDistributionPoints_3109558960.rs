// Submit deflate distribution points returns "Payload accepted" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_metrics::MetricsAPI;
use datadog_api_client::datadogV1::api_metrics::SubmitDistributionPointsOptionalParams;
use datadog_api_client::datadogV1::model::DistributionPointItem;
use datadog_api_client::datadogV1::model::DistributionPointsContentEncoding;
use datadog_api_client::datadogV1::model::DistributionPointsPayload;
use datadog_api_client::datadogV1::model::DistributionPointsSeries;

#[tokio::main]
async fn main() {
    let body = DistributionPointsPayload::new(vec![DistributionPointsSeries::new(
        "system.load.1.dist".to_string(),
        vec![vec![
            DistributionPointItem::DistributionPointTimestamp(1636629071.0 as f64),
            DistributionPointItem::DistributionPointData(vec![1.0, 2.0]),
        ]],
    )]);
    let configuration = datadog::Configuration::new();
    let api = MetricsAPI::with_config(configuration);
    let resp = api
        .submit_distribution_points(
            body,
            SubmitDistributionPointsOptionalParams::default()
                .content_encoding(DistributionPointsContentEncoding::DEFLATE),
        )
        .await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
