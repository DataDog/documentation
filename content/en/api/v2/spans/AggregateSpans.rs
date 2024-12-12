// Aggregate spans returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_spans::SpansAPI;
use datadog_api_client::datadogV2::model::SpansAggregateData;
use datadog_api_client::datadogV2::model::SpansAggregateRequest;
use datadog_api_client::datadogV2::model::SpansAggregateRequestAttributes;
use datadog_api_client::datadogV2::model::SpansAggregateRequestType;
use datadog_api_client::datadogV2::model::SpansAggregationFunction;
use datadog_api_client::datadogV2::model::SpansCompute;
use datadog_api_client::datadogV2::model::SpansComputeType;
use datadog_api_client::datadogV2::model::SpansQueryFilter;

#[tokio::main]
async fn main() {
    let body = SpansAggregateRequest::new().data(
        SpansAggregateData::new()
            .attributes(
                SpansAggregateRequestAttributes::new()
                    .compute(vec![SpansCompute::new(SpansAggregationFunction::COUNT)
                        .interval("5m".to_string())
                        .type_(SpansComputeType::TIMESERIES)])
                    .filter(
                        SpansQueryFilter::new()
                            .from("now-15m".to_string())
                            .query("*".to_string())
                            .to("now".to_string()),
                    ),
            )
            .type_(SpansAggregateRequestType::AGGREGATE_REQUEST),
    );
    let configuration = datadog::Configuration::new();
    let api = SpansAPI::with_config(configuration);
    let resp = api.aggregate_spans(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
