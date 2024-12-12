// Create a new powerpack returns "OK" response
use datadog_api_client::datadog;
use datadog_api_client::datadogV2::api_powerpack::PowerpackAPI;
use datadog_api_client::datadogV2::model::Powerpack;
use datadog_api_client::datadogV2::model::PowerpackAttributes;
use datadog_api_client::datadogV2::model::PowerpackData;
use datadog_api_client::datadogV2::model::PowerpackGroupWidget;
use datadog_api_client::datadogV2::model::PowerpackGroupWidgetDefinition;
use datadog_api_client::datadogV2::model::PowerpackGroupWidgetLayout;
use datadog_api_client::datadogV2::model::PowerpackInnerWidgets;
use datadog_api_client::datadogV2::model::PowerpackTemplateVariable;
use datadog_api_client::datadogV2::model::WidgetLiveSpan;
use serde_json::Value;
use std::collections::BTreeMap;

#[tokio::main]
async fn main() {
    let body = Powerpack::new().data(
        PowerpackData::new()
            .attributes(
                PowerpackAttributes::new(
                    PowerpackGroupWidget::new(
                        PowerpackGroupWidgetDefinition::new(
                            "ordered".to_string(),
                            "group".to_string(),
                            vec![PowerpackInnerWidgets::new(BTreeMap::from([
                                ("content".to_string(), Value::from("test")),
                                ("type".to_string(), Value::from("note")),
                            ]))],
                        )
                        .show_title(true)
                        .title("Sample Powerpack".to_string()),
                    )
                    .layout(PowerpackGroupWidgetLayout::new(3, 12, 0, 0))
                    .live_span(WidgetLiveSpan::PAST_ONE_HOUR),
                    "Example-Powerpack".to_string(),
                )
                .description("Sample powerpack".to_string())
                .tags(vec!["tag:sample".to_string()])
                .template_variables(vec![PowerpackTemplateVariable::new("sample".to_string())
                    .defaults(vec!["*".to_string()])]),
            )
            .type_("powerpack".to_string()),
    );
    let configuration = datadog::Configuration::new();
    let api = PowerpackAPI::with_config(configuration);
    let resp = api.create_powerpack(body).await;
    if let Ok(value) = resp {
        println!("{:#?}", value);
    } else {
        println!("{:#?}", resp.unwrap_err());
    }
}
