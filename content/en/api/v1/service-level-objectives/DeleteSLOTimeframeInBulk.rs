// Bulk Delete SLO Timeframes returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV1::api_service_level_objectives::ServiceLevelObjectivesAPI;
use datadog_api_client::datadogV1::model::SLOTimeframe;
use std::collections::BTreeMap;

#[tokio::main]
async fn main() {
    let body = BTreeMap::from([
        (
            "id1".to_string(),
            vec![SLOTimeframe::SEVEN_DAYS, SLOTimeframe::THIRTY_DAYS],
        ),
        (
            "id2".to_string(),
            vec![SLOTimeframe::SEVEN_DAYS, SLOTimeframe::THIRTY_DAYS],
        ),
    ]);
    let configuration = datadog::Configuration::new();
    let api = ServiceLevelObjectivesAPI::with_config(configuration);
    let resp = api.delete_slo_timeframe_in_bulk(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
