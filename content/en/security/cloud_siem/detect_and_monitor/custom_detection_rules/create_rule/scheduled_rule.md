---
title: Create a Scheduled Rule
code_lang: scheduled_rule
type: multi-code-lang
weight: 2
---

## Overview

TKTK

## Create a rule

1. To create a detection rule, navigate to the [Create a New Detection][1] page.
1. Select **Scheduled Rule**.

## Define your scheduled rule

Select the detection method you want to use for creating signals.

## Define search queries

{{< tabs >}}
{{% tab "Threshold" %}}

Choose the query language you want to use.

{{% collapse-content title="Event query" level="h5" expanded=false id="id-for-anchoring" %}}

{{< img src="security/security_monitoring/detection_rules/threshold_20250310.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. Optionally, define a unique count and signal grouping. Count the number of unique values observed for an attribute in a given time frame. The defined `group by` generates a signal for each `group by` value. Typically, the `group by` is an entity (like user, or IP). The `group by` is also used to [join the queries together](#joining-queries).

**Note**: The query applies to all ingested logs and events.

#### Joining queries

{{% cloud_siem/joining_queries %}}

{{< img src="security/security_monitoring/detection_rules/joining_queries_20240904.png" alt="Define search queries" style="width:100%;" >}}

#### Filter logs based on Reference Tables

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

#### Unit testing

{{% cloud_siem/unit_test %}}

To finish setting up the detection rule, select the type of rule you are creating and follow the instructions.

[1]: /logs/search_syntax/

{{% /collapse-content %}}
{{% collapse-content title="SQL" level="h5" expanded=false id="id-for-anchoring" %}}

TKTK

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "New Value" %}}

{{< img src="security/security_monitoring/detection_rules/new_value_20250310.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].

**Note**: The query applies to all ingested logs and events.

#### Learned value

In your search query, select the values you want to detect, the learning duration, and, optionally, define a signal grouping. The defined `group by` generates a signal for each `group by` value. Typically, the `group by` is an entity (like user or IP address).

For example, create a query for successful user authentication and set **Detect new value** to `country` and group by to `user`. Set a learning duration of `7 days`. Once configured, logs coming in over the next 7 days are evaluated with the set values. If a log comes in with a new value after the learning duration, a signal is generated, and the new value is learned to prevent future signals with this value.

You can also identify users and entities using multiple values in a single query. For example, if you want to detect when a user signs in from a new device and from a country that they've never signed in from before, add `device_id` and `country_name` to **Detect new value**.

#### Filter logs based on Reference Tables

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

#### Unit testing

{{% cloud_siem/unit_test %}}

To finish setting up the detection rule, select the type of rule you are creating and follow the instructions.

[1]: /logs/search_syntax/

{{% /tab %}}
{{% tab "Anomaly" %}}

{{< img src="security/security_monitoring/detection_rules/threshold_20250310.png" alt="Define the search query" style="width:100%;" >}}

1. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. Optionally, define a unique count and signal grouping to count the number of unique values observed for an attribute in a given time frame.
    - The defined `group by` generates a signal for each `group by` value. Typically, the `group by` is an entity (like user, or IP). The Group By is also used to [join the queries together](#joining-queries).
    - Anomaly detection inspects how the `group by` attribute has behaved in the past. If a `group by` attribute is seen for the first time (for example, the first time an IP is communicating with your system) and is anomalous, it does not generate a security signal because the anomaly detection algorithm has no historical data to base its decision on.

**Note**: The query applies to all ingested logs and events.

#### Filter logs based on Reference Tables

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

#### Unit testing

{{% cloud_siem/unit_test %}}

To finish setting up the detection rule, select the type of rule you are creating and follow the instructions.

[1]: /logs/search_syntax/

{{% /tab %}}
{{% tab "Content Anomaly" %}}

1. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. In the **Detect anomaly** field, specify the fields whose values you want to analyze.
1. In the **Group by** field, specify the fields you want to group by.
1. In the **Learn for** dropdown menu, select the number of days for the learning period. During the learning period, the rule sets a baseline of normal field values and does not generate any signals.
    - **Note**: If the detection rule is modified, the learning period restarts at day `0`.

#### Filter logs based on Reference Tables

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

#### Unit testing

{{% cloud_siem/unit_test %}}

To finish setting up the detection rule, select the type of rule you are creating and follow the instructions.

[1]: /logs/search_syntax/

{{% /tab %}}
{{% tab "Impossible Travel" %}}

1. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
    - All logs matching this query are analyzed for a potential impossible travel. The `Preview matching logs` section shows logs that match the query.

#### User attribute

For the `user attribute`, select the field in the analyzed log that contains the user ID. This can be an identifier like an email address, user name, or account identifier.

#### Location attribute

The `location attribute` specifies which field holds the geographic information for a log. The only supported value is `@network.client.geoip`, which is enriched by the [GeoIP parser][3] to give a log location information based on the client's IP address.

#### Baseline user locations

Click the checkbox if you'd like Datadog to learn regular access locations before triggering a signal.

When selected, signals are suppressed for the first 24 hours. In that time, Datadog learns the user's regular access locations. This can be helpful to reduce noise and infer VPN usage or credentialed API access.

Do not click the checkbox if you want Datadog to detect all impossible travel behavior.

[1]: /logs/search_syntax/

{{% /tab %}}
{{% tab "Third Party" %}}

1. To search Audit Trail or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
    - The trigger defined for each new attribute generates a signal for each new value of that attribute over a 24-hour roll-up period.

**Note**: The query applies to all ingested logs and events.

Click **Add Root Query** to add additional queries.

#### Joining root queries

{{% cloud_siem/joining_queries %}}

{{< img src="security/security_monitoring/detection_rules/joining_queries_20240904.png" alt="Define search queries" style="width:100%;" >}}

#### Filter logs based on Reference Tables

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="The log detection rule query editor with the reference table search options highlighted" style="width:100%;" >}}

#### Unit testing

{{% cloud_siem/unit_test %}}

To finish setting up the detection rule, select the type of rule you are creating and follow the instructions.

[1]: /logs/search_syntax/

{{% /tab %}}
{{% tab "Signal Correlation" %}}

1. Select a rule for **Rule a**.
1. Click the pencil icon to rename the rule.
1. Use the **correlated by** dropdown to define the correlating attribute.
    - You can select multiple attributes (maximum of 3) to correlate the selected rules. See [Time windows](#time-windows) for more information about the sliding window.
1. Select a rule for **Rule b** in the second Rule editor's dropdown.
    - The attributes and sliding window time frame is automatically set to what was selected for **Rule a**.
1. Click the pencil icon to rename the rule.

[1]: /logs/search_syntax/

{{% /tab %}}
{{< /tabs >}}

## Set conditions

{{< tabs >}}
{{% tab "Threshold" %}}

### Other parameters

TKTK

{{% /tab %}}
{{% tab "New Value" %}}

### Other parameters

TKTK

{{% /tab %}}
{{% tab "Anomaly" %}}

### Other parameters

TKTK

{{% /tab %}}
{{% tab "Content Anomaly" %}}

### Other parameters

TKTK

{{% /tab %}}
{{% tab "Impossible Travel" %}}

### Other parameters

TKTK

{{% /tab %}}
{{% tab "Third Party" %}}

### Other parameters

TKTK

{{% /tab %}}
{{% tab "Signal Correlation" %}}

### Other parameters

TKTK

{{% /tab %}}
{{< /tabs >}}


## Describe your playbook

TKTK

## Create a suppression

[1]: https://app.datadoghq.com/security/configuration/siem/rules