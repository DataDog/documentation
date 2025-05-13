---
title: Aggregation Key Processor
---

Use the aggregation key processor to generate a custom aggregation key (`@aggregation_key`) based on event attributes or tags. For example, you can use the aggregation key processor to create a custom aggregation key based on an event's title and source tag. Events with matching values will share the same key, enabling more effective deduplication and improving the quality of [Event Correlations][1].

**Notes**:

- Selected attributes must follow a valid attribute format, and tag keys must also follow a valid tag key format.
- A maximum of 5 attributes or tag keys can be added to generate an aggregation key.
- By default, existing aggregation keys will be overwritten by this processor. Adjust the toggle to configure this behavior.

<div class="alert alert-warning">Aggregation keys are included by default in Datadog Monitor alerts and are not modified by the aggregation key processor. This ensures that monitor alert events retain their original keys and are not overwritten.</div>

The aggregation key processor performs the following actions:

* Checks if any of the selected tag keys or attributes have values, if so, an aggregation key can be generated.
* If not, an aggregation key will not be set on the processed event.
* If there are multiple values in the tag key, it will select only one value to generate the aggregation key.
* Based on these values, it will generate a hash and add the generated aggregation key to the event.

[1]: /service_management/events/correlation/