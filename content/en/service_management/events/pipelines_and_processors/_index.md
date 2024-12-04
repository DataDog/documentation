---
title: Pipelines and Processors
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview 

Datadog Event Management Pipelines allow you to process and manage events from various sources efficiently. With pipelines, you can apply various processing rules and filters to customize how events are handled. Pipelines make it easier to manage large volumes of incoming events in a structured way. 

Use pipelines to:
- **Enrich events**: Pipelines can add additional context or information to events, such as tagging, adding custom attributes, or correlating events with relevant metadata to make them more informative and actionable.
- **Normalize event tags**: You can set up rules to remap tags so that your events all have standardized tags.
- **Parse messages and attributes as tags**: Create custom grok rules to parse the full message or a specific attribute of your raw event. Translate the context into trackable tags and attributes that can be referenced during investigation.

Datadog Event Management Pipelines help organizations simplify their monitoring processes, enhance the clarity of their operational insights, and ultimately respond more effectively to incidents and alerts.

## How it works

With pipelines, events are parsed and enriched by chaining them sequentially through processors. This extracts meaningful information or attributes from semi-structured text. Each event that comes through the pipelines is tested against every pipeline filter. If it matches a filter, then all the processors are applied sequentially before moving to the next pipeline.

Pipelines and processors can be applied to all events and can be configured in the [Event Management Pipelines][1].

## Create a pipeline

Create an Pipeline to filter to the events that you are interested in, for example, a source or a tag. 

1. Navigate to [Event Management Pipelines][1] in Datadog.
1. Click **Add a Pipeline**.
1. Choose a filter from the dropdown menu or create your own filter query in the [Event Management Explorer][2] by selecting the `</>` icon. Use the filter to apply pipeline processors to specific events. **Note**: The pipeline filtering is applied before any of the pipeline's processors. You cannot filter on an attribute that is extracted in the pipeline itself.
1. Name the pipeline.
1. Click **Create**.

## Add a processor

You can add processors after you create a pipeline. The processors available are:

- [Arithmetic Processor][3]
- [Date Remapper][4]
- [Category Processor][5]
- [Grok Parser][6]
- [Lookup Processor][7]
- [Remapper][8]
- [Service Remapper][9]
- [Status Remapper][10]
- [String Builder Processor][11]


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/pipelines
[2]: https://app.datadoghq.com/event/explorer
[3]: /service_management/events/pipelines_and_processors/arithmetic_processor
[4]: /service_management/events/pipelines_and_processors/date_remapper
[5]: /service_management/events/pipelines_and_processors/category_processor
[6]: /service_management/events/pipelines_and_processors/grok_parser
[7]: /service_management/events/pipelines_and_processors/lookup_processor
[8]: /service_management/events/pipelines_and_processors/remapper
[9]: /service_management/events/pipelines_and_processors/service_remapper
[10]: /service_management/events/pipelines_and_processors/status_remapper
[11]: /service_management/events/pipelines_and_processors/string_builder_processor
