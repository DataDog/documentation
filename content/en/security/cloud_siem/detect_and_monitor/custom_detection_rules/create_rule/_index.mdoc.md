---
title: Create a Custom Rule
content_filters:
  - trait_id: cloud_siem_detection_rule_type
    option_group_id: cloud_siem_detection_rule_type_options
  - trait_id: cloud_siem_detection_rule_search_query
    option_group_id: cloud_siem_detection_<CLOUD_SIEM_DETECTION_RULE_TYPE>_search_query_options
---

<!-- Trait for query language once conditional filter displays are working
  - trait_id: cloud_siem_detection_rule_query_language
    option_group_id: cloud_siem_detection_rule_query_language_options
 -->

## Overview

{% if equals($cloud_siem_detection_rule_type, "real_time_rule") %}
Real-time detection rules continuously monitors and analyzes incoming logs for security threats. These rules trigger immediate alerts when specific patterns or anomalies are detected, enabling quicker response to potential incidents.
{% /if %}
{% if equals($cloud_siem_detection_rule_type, "scheduled_rule") %}
Scheduled detection rules run at predefined intervals to analyze indexed log data and detect security threats. These rules can identify patterns, anomalies, or specific conditions within a defined time frame, and trigger alerts or reports if the criteria are met.

Scheduled rules complement real-time monitoring by ensuring periodic, in-depth analysis of logs using [calculated fields][7].
{% /if %}
{% if equals($cloud_siem_detection_rule_type, "historical_job") %}
Historical jobs are one-time executable queries on historical logs used to backtest detection rules and assess their effectiveness on past data. The generated job results are lightweight versions of signals providing information on potential threats and anomalies on historical logs. After reviewing the results, you can convert results needing immediate action into signals.
{% /if %}

## Create a rule

1. To create a detection rule, navigate to the [Create a New Detection][2] page.
1. {% if equals($cloud_siem_detection_rule_type, "real_time_rule") %}Select **Real-Time Rule**.{% /if %}
{% if equals($cloud_siem_detection_rule_type, "scheduled_rule") %}Select **Scheduled Rule**.{% /if %}
{% if equals($cloud_siem_detection_rule_type, "historical_job") %}Select **Historical job**, then select the **Logs Index** and **Timerange** for the job.{% /if %}
1. {% if equals($cloud_siem_detection_rule_search_query, "threshold") %}Select the **Threshold** detection method.{% /if %}
{% if equals($cloud_siem_detection_rule_search_query, "new_value") %}Select the **New value** detection method.{% /if %}
{% if equals($cloud_siem_detection_rule_search_query, "anomaly") %}Select the **Anomaly** detection method.{% /if %}
{% if equals($cloud_siem_detection_rule_search_query, "content_anomaly") %}Select the **Content Anomaly** detection method.{% /if %}
{% if equals($cloud_siem_detection_rule_search_query, "impossible_travel") %}Select the **Impossible travel** detection method.{% /if %}
{% if equals($cloud_siem_detection_rule_search_query, "third_party") %}Select the **Third party** detection method.{% /if %}
{% if equals($cloud_siem_detection_rule_search_query, "sequence") %}Select the **Sequence** detection method.{% /if %}
{% if equals($cloud_siem_detection_rule_search_query, "signal_correlation") %}Select the **Signal correlation** detection method.{% /if %}

## Define your search query

<!-- Real-time rule AND threshold -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "threshold")) %}

{% img src="security/security_monitoring/detection_rules/threshold_20250310.png" alt="Define the search query" style="width:100%;" /%}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
   {% partial file="security/cloud_siem/threshold_query.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Save Rule**.
{% /if %}

<!-- Real-time rule AND new value -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "new_value")) %}
{% img src="security/security_monitoring/detection_rules/new_value_20250310.png" alt="Define the search query" style="width:100%;" /%}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
   {% partial file="security/cloud_siem/new_value_query.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Save Rule**.
{% /if %}

<!-- Real-time rule AND anomaly -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "anomaly")) %}
{% img src="security/security_monitoring/detection_rules/anomaly_query.png" alt="Define the search query" style="width:100%;" /%}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
1. (Optional) In the **Count** dropdown menu, select attributes whose unique values you want to count during the specified time frame.
   {% partial file="security/cloud_siem/anomaly_query.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Save Rule**.
{% /if %}

<!-- Real-time rule AND content anomaly -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "content_anomaly")) %}
{% img src="security/security_monitoring/detection_rules/content_anomaly_query.png" alt="Define the search query" style="width:100%;" /%}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
   {% partial file="security/cloud_siem/content_anomaly_query.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Save Rule**.
{% /if %}

<!-- Real-time rule AND impossible travel -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "impossible_travel")) %}
{% img src="security/security_monitoring/detection_rules/impossible_travel_query.png" alt="Define the search query" style="width:100%;" /%}
{% alert level="info" %}
All logs and events matching this query are analyzed for potential impossible travel.
{% /alert %}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
   {% partial file="security/cloud_siem/impossible_travel_query.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Save Rule**.
{% /if %}

<!-- Real-time rule AND third party -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "third_party")) %}
{% img src="security/security_monitoring/detection_rules/third_party_query.png" alt="Define the search query" style="width:100%;" /%}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a root query for your logs or events using the [Log Explorer search syntax][1].
1. In the **Trigger for each new** dropdown menu, select the attributes where each attribute generates a signal for each new attribute value over a 24-hour roll-up period.
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Add Root Query** and repeat steps 2-4 to add and test additional queries.
1. Click **Save Rule**.
{% /if %}

<!-- Real-time rule AND sequence -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "sequence")) %}
{% img src="security/security_monitoring/detection_rules/sequence/sequence_queries.png" alt="Sequence editor page showing the sequence with two steps" style="width:100%;" /%}

### Add step

1. To search a different data type, click the down arrow next to **Logs** and select **Signals** or **Rules**.
1. Define the condition for the step.
    - **Logs**: Construct a search query using the [Log Explorer search syntax][1].
    - **Signals**: Reference an existing rule or query on signal fields.
    - **Rules**: Select a rule.
1. Set **group by** fields (for example, `@usr.email` or `@ip.address`) to link entities across steps.
1. Enter a threshold condition, such as `>10`.
1. If you want to use another query, connect this query with the next query using `AND` or `OR` and repeat steps 1-4.
1. In the **roll-up over** dropdown menu, select the time frame all queries in that step must occur to transition to the next step.

### Define step transitions

For the current step and the next step:

1. In the **within** dropdown menu, select an evaluation window for the transition.
   {% alert level="info" %}
   The total evaluation time across the sequence can be up to 24 hours.
   {% /alert %}
1. Follow the instructions in [Add step](#add-step) to complete the step.
   {% alert level="info" %}
   You can select different `group by` fields between steps. For example, link `@usr.email`from an earlier step to `@ip.address` in a later step.
   {% /alert %}
1. Click **Add Step** if you want to add more steps.

### Severity and notification

1. In the **Trigger** dropdown menu, select the severity status.
1. (Optional) In the **And notify** section, click **Add Recipient** to configure [notification targets][3].
    - You can create [notification rules][4] to manage notifications automatically, avoiding manual edits for each detection rule.

### Review the sequence preview

1. In the **Preview detection** section, check the steps, transitions, and time window in the visualization of the steps. Reorder the steps and adjust time windows as needed.
1. Click **Save Rule**.
{% /if %}

<!-- Real-time rule AND signal correlation -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "signal_correlation")) %}
{% img src="security/security_monitoring/detection_rules/signal_correlation_query.png" alt="Define the search query" style="width:100%;" /%}

1. Select a rule for **Rule a**.
1. Click the pencil icon to rename the rule.
1. Use the **correlated by** dropdown to define the correlating attribute.
    - You can select multiple attributes (maximum of 3) to correlate the selected rules.
1. Select a rule for **Rule b** in the second Rule editor's dropdown.
    - The attributes and sliding window time frame is automatically set to what was selected for **Rule a**.
1. Click the pencil icon to rename the rule.
1. Click **Save Rule**.
{% /if %}

<!-- Scheduled rule AND threshold -->
{% if and(equals($cloud_siem_detection_rule_type, "scheduled_rule"),equals($cloud_siem_detection_rule_search_query, "threshold")) %}
Choose the query language you want to use.

{% collapse-content title="Event Query" level="h4" expanded=false id="threshold-event-query" %}
{% img src="security/security_monitoring/detection_rules/threshold_20250310.png" alt="Define the search query" style="width:100%;" /%}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. If you are using an add-on and see the **Index** dropdown menu, select the index of logs you want to analyze.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
   {% partial file="security/cloud_siem/threshold_query.mdoc.md" /%}
1. (Optional) To create calculated fields that transform your logs during query time:
   {% partial file="security/cloud_siem/add_calculated_fields.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Save Rule**.
{% /collapse-content %}
{% collapse-content title="SQL" level="h4" expanded=false id="threshold-sql" %}
You can use SQL syntax to write detection rules for additional flexibility, consistency, and portability. For information on the available syntax, see [DDSQL Reference][5].

In Datadog, SQL queries are compatible with data stored in [datasets][6]. You can create datasets to format data already stored in tables for the following data types:
- Logs
- Audit Trail logs
- Events
- Security signals
- Spans
- RUM events
- Product Analytics events
- Cloud Network data
- NetFlow data
- Reference tables
- Infrastructure tables

{% img src="security/security_monitoring/detection_rules/sql-query-example.png" alt="Example of a SQL dataset and query" style="width:100%;" /%}

1. Under **Define Datasets**, choose one or more datasets to use in your query. In the dropdown, you can select an existing published dataset to either use or clone, or click the **New** icon to create a database from scratch.
   - If you chose an existing dataset and made changes, click **Update** to apply those changes to that dataset, or **Clone With Changes** to create a dataset with your changes applied.
   - If you created a dataset, click **Create** so you can use it in your rule.
2. Under **Write Queries**, enter one or more SQL queries. For more information, see [DDSQL Reference][5]. Click **Preview** to see a list of matching results.

{% /collapse-content %}
{% /if %}

<!-- Scheduled rule AND new value -->
{% if and(equals($cloud_siem_detection_rule_type, "scheduled_rule"),equals($cloud_siem_detection_rule_search_query, "new_value")) %}
{% img src="security/security_monitoring/detection_rules/new_value_20250310.png" alt="Define the search query" style="width:100%;" /%}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. If you are using an add-on and see the **Index** dropdown menu, select the index of logs you want to analyze.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
   {% partial file="security/cloud_siem/new_value_query.mdoc.md" /%}
1. (Optional) To create calculated fields that transform your logs during query time:
   {% partial file="security/cloud_siem/add_calculated_fields.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Save Rule**.
{% /if %}

<!-- Scheduled rule AND anomaly -->
{% if and(equals($cloud_siem_detection_rule_type, "scheduled_rule"),equals($cloud_siem_detection_rule_search_query, "anomaly")) %}
{% img src="security/security_monitoring/detection_rules/anomaly_query.png" alt="Define the search query" style="width:100%;" /%}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. If you are using an add-on and see the **Index** dropdown menu, select the index of logs you want to analyze.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
   {% partial file="security/cloud_siem/anomaly_query.mdoc.md" /%}
1. (Optional) To create calculated fields that transform your logs during query time:
   {% partial file="security/cloud_siem/add_calculated_fields.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Save Rule**.
{% /if %}

<!-- Scheduled rule AND content anomaly -->
{% if and(equals($cloud_siem_detection_rule_type, "scheduled_rule"),equals($cloud_siem_detection_rule_search_query, "content_anomaly")) %}
{% img src="security/security_monitoring/detection_rules/content_anomaly_query.png" alt="Define the search query" style="width:100%;" /%}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. If you are using an add-on and see the **Index** dropdown menu, select the index of logs you want to analyze.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
   {% partial file="security/cloud_siem/content_anomaly_query.mdoc.md" /%}
1. (Optional) To create calculated fields that transform your logs during query time:
   {% partial file="security/cloud_siem/add_calculated_fields.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Save Rule**.
{% /if %}

<!-- Scheduled rule AND impossible travel -->
{% if and(equals($cloud_siem_detection_rule_type, "scheduled_rule"),equals($cloud_siem_detection_rule_search_query, "impossible_travel")) %}
{% img src="security/security_monitoring/detection_rules/impossible_travel_query.png" alt="Define the search query" style="width:100%;" /%}
{% alert level="info" %}
All logs and events matching this query are analyzed for potential impossible travel.
{% /alert %}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. If you are using an add-on and see the **Index** dropdown menu, select the index of logs you want to analyze.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
   {% partial file="security/cloud_siem/impossible_travel_query.mdoc.md" /%}
1. (Optional) To create calculated fields that transform your logs during query time:
   {% partial file="security/cloud_siem/add_calculated_fields.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Save Rule**.
{% /if %}

<!-- Scheduled rule AND third party -->
{% if and(equals($cloud_siem_detection_rule_type, "scheduled_rule"),equals($cloud_siem_detection_rule_search_query, "third_party")) %}
{% img src="security/security_monitoring/detection_rules/third_party_query.png" alt="Define the search query" style="width:100%;" /%}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. If you are using an add-on and see the **Index** dropdown menu, select the index of logs you want to analyze.
1. Construct a root query for your logs or events using the [Log Explorer search syntax][1].
1. In the **Trigger for each new** dropdown menu, select the attributes where each attribute generates a signal for each new attribute value over a 24-hour roll-up period.
1. (Optional) To create calculated fields that transform your logs during query time:
   {% partial file="security/cloud_siem/add_calculated_fields.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Add Root Query** and repeat steps 3-7 to add and test additional queries.
1. Click **Save Rule**.
{% /if %}

<!-- Scheduled rule AND signal correlation -->
{% if and(equals($cloud_siem_detection_rule_type, "scheduled_rule"),equals($cloud_siem_detection_rule_search_query, "signal_correlation")) %}
{% img src="security/security_monitoring/detection_rules/signal_correlation_query.png" alt="Define the search query" style="width:100%;" /%}

1. Select a rule for **Rule a**.
1. Click the pencil icon to rename the rule.
1. Use the **correlated by** dropdown to define the correlating attribute.
    - You can select multiple attributes (maximum of 3) to correlate the selected rules.
1. Select a rule for **Rule b** in the second Rule editor's dropdown.
    - The attributes and sliding window time frame is automatically set to what was selected for **Rule a**.
1. Click the pencil icon to rename the rule.
1. Click **Save Rule**.
{% /if %}

<!-- Historical job AND threshold -->
{% if and(equals($cloud_siem_detection_rule_type, "historical_job"),equals($cloud_siem_detection_rule_search_query, "threshold")) %}
{% img src="security/security_monitoring/detection_rules/threshold_20250310.png" alt="Define the search query" style="width:100%;" /%}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
   {% partial file="security/cloud_siem/threshold_query.mdoc.md" /%}
1. (Optional) To create calculated fields that transform your logs during query time:
   {% partial file="security/cloud_siem/add_calculated_fields.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Save Rule**.
{% /if %}

<!-- Historical job AND new value -->
{% if and(equals($cloud_siem_detection_rule_type, "historical_job"),equals($cloud_siem_detection_rule_search_query, "new_value")) %}
{% img src="security/security_monitoring/detection_rules/new_value_20250310.png" alt="Define the search query" style="width:100%;" /%}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
   {% partial file="security/cloud_siem/new_value_query.mdoc.md" /%}
1. (Optional) To create calculated fields that transform your logs during query time:
   {% partial file="security/cloud_siem/add_calculated_fields.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Save Rule**.
{% /if %}

<!-- Historical job AND anomaly -->
{% if and(equals($cloud_siem_detection_rule_type, "historical_job"),equals($cloud_siem_detection_rule_search_query, "anomaly")) %}
{% img src="security/security_monitoring/detection_rules/anomaly_query.png" alt="Define the search query" style="width:100%;" /%}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
   {% partial file="security/cloud_siem/anomaly_query.mdoc.md" /%}
1. (Optional) To create calculated fields that transform your logs during query time:
   {% partial file="security/cloud_siem/add_calculated_fields.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Save Rule**.
{% /if %}

<!-- Historical job AND content anomaly -->
{% if and(equals($cloud_siem_detection_rule_type, "historical_job"),equals($cloud_siem_detection_rule_search_query, "content_anomaly")) %}
{% img src="security/security_monitoring/detection_rules/content_anomaly_query.png" alt="Define the search query" style="width:100%;" /%}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
   {% partial file="security/cloud_siem/content_anomaly_query.mdoc.md" /%}
1. (Optional) To create calculated fields that transform your logs during query time:
   {% partial file="security/cloud_siem/add_calculated_fields.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Save Rule**.
{% /if %}

<!-- Historical job AND impossible travel -->
{% if and(equals($cloud_siem_detection_rule_type, "historical_job"),equals($cloud_siem_detection_rule_search_query, "impossible_travel")) %}
{% img src="security/security_monitoring/detection_rules/impossible_travel_query.png" alt="Define the search query" style="width:100%;" /%}
{% alert level="info" %}
All logs and events matching this query are analyzed for potential impossible travel.
{% /alert %}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a search query for your logs or events using the [Log Explorer search syntax][1].
   {% partial file="security/cloud_siem/impossible_travel_query.mdoc.md" /%}
1. (Optional) To create calculated fields that transform your logs during query time:
   {% partial file="security/cloud_siem/add_calculated_fields.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Save Rule**.
{% /if %}

<!-- Historical job AND third party -->
{% if and(equals($cloud_siem_detection_rule_type, "historical_job"),equals($cloud_siem_detection_rule_search_query, "third_party")) %}
{% img src="security/security_monitoring/detection_rules/third_party_query.png" alt="Define the search query" style="width:100%;" /%}

1. To search Audit Trail events or events from Events Management, click the down arrow next to **Logs** and select **Audit Trail** or **Events**.
1. Construct a root query for your logs or events using the [Log Explorer search syntax][1].
1. In the **Trigger for each new** dropdown menu, select the attributes where each attribute generates a signal for each new attribute value over a 24-hour roll-up period.
1. (Optional) To create calculated fields that transform your logs during query time:
   {% partial file="security/cloud_siem/add_calculated_fields.mdoc.md" /%}
1. (Optional) Filter logs using reference tables:
   {% partial file="security/cloud_siem/add_reference_tables.mdoc.md" /%}
1. (Optional) To test your rules against sample logs, click **Unit Test**.
   {% partial file="security/cloud_siem/unit_testing.mdoc.md" /%}
1. Click **Add Root Query** and repeat steps 2-6 to add and test additional queries.
1. Click **Save Rule**.
{% /if %}

## Set conditions

<!-- Real-time rule AND threshold -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "threshold")) %}
{% img src="security/security_monitoring/detection_rules/condition_simple_then.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" /%}

{% partial file="security/cloud_siem/set_conditions_threshold.mdoc.md" /%}

### Other parameters

#### Rule multi-triggering {% #rule-multi-triggering-rt-threshold %}

{% partial file="security/cloud_siem/rule_multi_triggering.mdoc.md" /%}

#### Decrease severity for non-production environments {% #decrease-severity-rt-threshold %}

{% partial file="security/cloud_siem/enable_decrease_severity.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-rt-threshold %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-rt-threshold %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}

{% /if %}

<!-- Real-time rule AND new value -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "new_value")) %}
{% img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" /%}

{% partial file="security/cloud_siem/set_conditions_severity_notify_only.mdoc.md" /%}

### Other parameters

#### Forget value {% #forget-value-rt-new-value%}

{% partial file="security/cloud_siem/forget_value.mdoc.md" /%}

#### Rule multi-triggering behavior {% #rule-multi-triggering-rt-new-value%}

{% partial file="security/cloud_siem/rule_multi_triggering.mdoc.md" /%}

#### Decrease severity for non-production environments {% #decrease-severity-new-value%}

{% partial file="security/cloud_siem/enable_decrease_severity.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-rt-new-value%}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-rt-new-value %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}

#### Enable instantaneous baseline {% #enable-instantaneous-baseline-new-value %}

{% partial file="security/cloud_siem/enable_instantaneous_baseline.mdoc.md" /%}
{% /if %}

<!-- Real-time rule AND anomaly -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "anomaly")) %}
{% img src="security/security_monitoring/detection_rules/anomaly_notification.png" alt="Set your severity, anomaly percentile, and notification recipients" style="width:100%;" /%}

{% partial file="security/cloud_siem/set_conditions_anomaly.mdoc.md" /%}

### Other parameters

#### Rule multi-triggering {% #rule-multi-triggering-rt-anomaly %}

{% partial file="security/cloud_siem/rule_multi_triggering.mdoc.md" /%}

#### Decrease severity for non-production environments {% #decrease-severity-rt-anomaly %}

{% partial file="security/cloud_siem/enable_decrease_severity.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-rt-anomaly %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-rt-anomaly %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Real-time rule AND content anomaly -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "content_anomaly")) %}
{% img src="security/security_monitoring/detection_rules/condition_content_anomaly.png" alt="Set your condition, severity, and notification recipients" style="width:100%;" /%}

{% partial file="security/cloud_siem/set_conditions_content_anomaly.mdoc.md" /%}

### Other parameters

#### Content anomaly detection {% #content-anomaly-rt-content-anomaly %}

{% partial file="security/cloud_siem/content_anomaly_options.mdoc.md" /%}

#### Rule multi-triggering behavior {% #rule-multi-triggering-rt-content-anomaly %}

{% partial file="security/cloud_siem/rule_multi_triggering_content_anomaly.mdoc.md" /%}

#### Decrease severity for non-production environments {% #decrease-severity-rt-content-anomaly %}

{% partial file="security/cloud_siem/enable_decrease_severity.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-rt-content-anomaly %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-rt-content-anomaly %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Real-time rule AND impossible travel -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "impossible_travel")) %}
{% img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" /%}

{% partial file="security/cloud_siem/set_conditions_severity_notify_only.mdoc.md" /%}

### Other parameters

#### Rule multi-triggering {% #rule-multi-triggering-rt-impossible-travel %}

{% partial file="security/cloud_siem/rule_multi_triggering.mdoc.md" /%}

#### Decrease severity for non-production environments {% #decrease-severity-rt-impossible-travel %}

{% partial file="security/cloud_siem/enable_decrease_severity.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-rt-impossible-travel %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-rt-impossible-travel %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Real-time rule AND third party -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "third_party")) %}
{% img src="security/security_monitoring/detection_rules/condition_else.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" /%}

{% partial file="security/cloud_siem/set_conditions_third_party.mdoc.md" /%}

### Other parameters

#### Decrease severity for non-production environments {% #decrease-severity-rt-third-party %}

{% partial file="security/cloud_siem/enable_decrease_severity.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-rt-third-party %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-rt-third-party %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Real-time rule AND sequence -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "sequence")) %}
#### Rule multi-triggering {% #rule-multi-triggering-rt-sequence %}

{% partial file="security/cloud_siem/rule_multi_triggering.mdoc.md" /%}

#### Decrease severity for non-production environments {% #decrease-severity-rt-sequence %}

{% partial file="security/cloud_siem/enable_decrease_severity.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-rt-sequence %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-rt-sequence %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Real-time rule AND signal correlation -->
{% if and(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_search_query, "signal_correlation")) %}
{% img src="security/security_monitoring/detection_rules/condition_simple_then.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" /%}

{% partial file="security/cloud_siem/set_conditions_then_operator.mdoc.md" /%}

### Other parameters

#### Rule multi-triggering {% #rule-multi-triggering-rt-signal-correlation %}

{% partial file="security/cloud_siem/rule_multi_triggering.mdoc.md" /%}

#### Decrease severity for non-production environments {% #decrease-severity-rt-signal-correlation %}

{% partial file="security/cloud_siem/enable_decrease_severity.mdoc.md" /%}
{% /if %}

<!-- Scheduled rule AND threshold -->
{% if and(equals($cloud_siem_detection_rule_type, "scheduled_rule"),equals($cloud_siem_detection_rule_search_query, "threshold")) %}
{% img src="security/security_monitoring/detection_rules/condition_simple_then.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" /%}

{% partial file="security/cloud_siem/set_conditions_threshold.mdoc.md" /%}

### Other parameters

#### Rule multi-triggering {% #rule-multi-triggering-scheduled-threshold %}

{% partial file="security/cloud_siem/rule_multi_triggering.mdoc.md" /%}

#### Decrease severity for non-production environments {% #decrease-severity-scheduled-threshold %}

{% partial file="security/cloud_siem/enable_decrease_severity.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-scheduled-threshold %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-scheduled-threshold %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Scheduled rule AND new value -->
{% if and(equals($cloud_siem_detection_rule_type, "scheduled_rule"),equals($cloud_siem_detection_rule_search_query, "new_value")) %}
{% img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" /%}

{% partial file="security/cloud_siem/set_conditions_severity_notify_only.mdoc.md" /%}

### Other parameters

#### Forget value {% #forget-value-scheduled-new-value %}

{% partial file="security/cloud_siem/forget_value.mdoc.md" /%}

#### Rule multi-triggering behavior {% #rule-multi-triggering-scheduled-new-value %}

{% partial file="security/cloud_siem/rule_multi_triggering.mdoc.md" /%}

#### Decrease severity for non-production environments {% #decrease-severity-scheduled-new-value %}

{% partial file="security/cloud_siem/enable_decrease_severity.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-scheduled-new-value %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-scheduled-new-value %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Scheduled rule AND anomaly -->
{% if and(equals($cloud_siem_detection_rule_type, "scheduled_rule"),equals($cloud_siem_detection_rule_search_query, "anomaly")) %}
{% img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" /%}

{% partial file="security/cloud_siem/set_conditions_severity_notify_only.mdoc.md" /%}

### Other parameters

#### Rule multi-triggering {% #rule-multi-triggering-scheduled-anomaly %}

{% partial file="security/cloud_siem/rule_multi_triggering.mdoc.md" /%}

#### Decrease severity for non-production environments {% #decrease-severity-scheduled-anomaly %}

{% partial file="security/cloud_siem/enable_decrease_severity.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-scheduled-anomaly %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-scheduled-anomaly %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Scheduled rule AND content anomaly -->
{% if and(equals($cloud_siem_detection_rule_type, "scheduled_rule"),equals($cloud_siem_detection_rule_search_query, "content_anomaly")) %}
{% img src="security/security_monitoring/detection_rules/condition_content_anomaly.png" alt="Set your condition, severity, and notification recipients" style="width:100%;" /%}

{% partial file="security/cloud_siem/set_conditions_content_anomaly.mdoc.md" /%}

### Other parameters

#### Content anomaly detection {% #content-anomaly-scheduled-content-anomaly %}

{% partial file="security/cloud_siem/content_anomaly_options.mdoc.md" /%}

#### Rule multi-triggering behavior {% #rule-multi-triggering-scheduled-content-anomaly %}

{% partial file="security/cloud_siem/rule_multi_triggering_content_anomaly.mdoc.md" /%}

#### Decrease severity for non-production environments {% #decrease-severity-scheduled-content-anomaly %}

{% partial file="security/cloud_siem/enable_decrease_severity.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-scheduled-content-anomaly %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-scheduled-content-anomaly %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Scheduled rule AND impossible travel -->
{% if and(equals($cloud_siem_detection_rule_type, "scheduled_rule"),equals($cloud_siem_detection_rule_search_query, "impossible_travel")) %}
{% img src="security/security_monitoring/detection_rules/severity_notification.png" alt="Set your severity and notification recipients" style="width:100%;" /%}

{% partial file="security/cloud_siem/set_conditions_severity_notify_only.mdoc.md" /%}

### Other parameters

#### Rule multi-triggering {% #rule-multi-triggering-scheduled-impossible-travel %}

{% partial file="security/cloud_siem/rule_multi_triggering.mdoc.md" /%}

#### Decrease severity for non-production environments {% #decrease-severity-scheduled-impossible-travel %}

{% partial file="security/cloud_siem/enable_decrease_severity.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-scheduled-impossible-travel %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-scheduled-impossible-travel %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Scheduled rule AND third party -->
{% if and(equals($cloud_siem_detection_rule_type, "scheduled_rule"),equals($cloud_siem_detection_rule_search_query, "third_party")) %}
{% img src="security/security_monitoring/detection_rules/condition_else.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" /%}

{% partial file="security/cloud_siem/set_conditions_third_party.mdoc.md" /%}

### Other parameters

#### Decrease severity for non-production environments {% #decrease-severity-scheduled-third-party %}

{% partial file="security/cloud_siem/enable_decrease_severity.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-scheduled-third-party %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-scheduled-third-party %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Scheduled rule AND signal correlation -->
{% if and(equals($cloud_siem_detection_rule_type, "scheduled_rule"),equals($cloud_siem_detection_rule_search_query, "signal_correlation")) %}
{% img src="security/security_monitoring/detection_rules/condition_simple_then.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" /%}

{% partial file="security/cloud_siem/set_conditions_then_operator.mdoc.md" /%}

### Other parameters

#### Rule multi-triggering {% #rule-multi-triggering-scheduled-signal-correlation %}

{% partial file="security/cloud_siem/rule_multi_triggering.mdoc.md" /%}

#### Decrease severity for non-production environments {% #decrease-severity-scheduled-signal-correlation %}

{% partial file="security/cloud_siem/enable_decrease_severity.mdoc.md" /%}

#### Group signals {% #group-signals-scheduled-signal-correlation %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Historical job AND threshold -->
{% if and(equals($cloud_siem_detection_rule_type, "historical_job"),equals($cloud_siem_detection_rule_search_query, "threshold")) %}
{% img src="security/security_monitoring/detection_rules/threshold_historical_condition.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" /%}

{% partial file="security/cloud_siem/set_conditions_threshold.mdoc.md" /%}

### Other parameters

#### Job multi-triggering {% #job-multi-triggering-threshold %}

{% partial file="security/cloud_siem/job_multi_triggering.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-historical-threshold %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-historical-threshold %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Historical job AND new value -->
{% if and(equals($cloud_siem_detection_rule_type, "historical_job"),equals($cloud_siem_detection_rule_search_query, "new_value")) %}
### Other parameters

#### Forget value {% #forget-value-historical-new-value %}

{% partial file="security/cloud_siem/forget_value.mdoc.md" /%}

#### Job multi-triggering behavior {% #job-multi-triggering-historical-new-value %}

{% partial file="security/cloud_siem/job_multi_triggering.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-historical-new-value %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-historical-new-value %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Historical job AND anomaly -->
{% if and(equals($cloud_siem_detection_rule_type, "historical_job"),equals($cloud_siem_detection_rule_search_query, "anomaly")) %}
### Other parameters

#### Job multi-triggering {% #job-multi-triggering-historical-anomaly %}

{% partial file="security/cloud_siem/job_multi_triggering.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-historical-anomaly %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-historical-anomaly %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}

#### Bucket duration

In the **Bucket Duration** dropdown, select a duration over which to measure percentiles.

#### Learning duration

In the **Learning Duration** dropdown, select an amount of time for the rule to learn new values.

#### Learning period alerts

In the **Learning Period Alerts** dropdown, choose whether you want Cloud SIEM to send alerts during the learning period.
{% /if %}

<!-- Historical job AND content anomaly -->
{% if and(equals($cloud_siem_detection_rule_type, "historical_job"),equals($cloud_siem_detection_rule_search_query, "content_anomaly")) %}
{% img src="security/security_monitoring/detection_rules/content_anomaly_historical_condition.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" /%}

1. (Optional) Click the pencil icon next to **Condition 1** if you want to rename the condition. This name is appended to the rule name when a signal is generated.
1. In the **Anomaly count** field, enter the condition for how many anomalous logs within the specified window are required to trigger a signal.
    - For example, if the condition is `a >= 3` where `a` is the query, a signal is triggered if there are at least three anomalous logs within the evaluation window.
    - All rule conditions are evaluated as condition statements. Thus, the order of the conditions affects which notifications are sent because the first condition to match generates the signal. Click and drag your rule conditions to change their ordering.
    - A rule condition contains logical operations (`>`, `>=`, `&&`, `||`) to determine if a signal should be generated based on the event counts in the previously defined queries.
    - The ASCII lowercase query labels are referenced in this section. An example rule condition for query `a` is `a > 3`.
      {% alert level="info" %}
      The query label must precede the operator. For example, `a > 3` is allowed; `3 < a` is not allowed.
      {% /alert %}
1. In the **within a window of** dropdown menu, select the time period during which a signal is triggered if the condition is met.
    - An `evaluation window` is specified to match when at least one of the cases matches true. This is a sliding window and evaluates cases in real time.

### Other parameters

#### Content anomaly detection {% #content-anomaly-historical-content-anomaly %}

{% partial file="security/cloud_siem/content_anomaly_options.mdoc.md" /%}

#### Job multi-triggering behavior {% #job-multi-triggering-historical-content-anomaly %}

{% partial file="security/cloud_siem/rule_multi_triggering_content_anomaly.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-historical-content-anomaly %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-historical-content-anomaly %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Historical job AND impossible travel -->
{% if and(equals($cloud_siem_detection_rule_type, "historical_job"),equals($cloud_siem_detection_rule_search_query, "impossible_travel")) %}
### Other parameters

#### Job multi-triggering {% #job-multi-triggering-historical-anomaly %}

{% partial file="security/cloud_siem/job_multi_triggering.mdoc.md" /%}

#### Enable optional group by {% #enable-group-by-historical-anomaly %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-historical-anomaly %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Historical job AND third party -->
{% if and(equals($cloud_siem_detection_rule_type, "historical_job"),equals($cloud_siem_detection_rule_search_query, "third_party")) %}
{% img src="security/security_monitoring/detection_rules/set_condition_root_query.png" alt="Set your conditions, severity, and notification recipients" style="width:100%;" /%}

1. (Optional) Click the pencil icon next to **Condition 1** if you want to rename the condition. This name is appended to the rule name when a signal is generated.
1. In the **Query** field, enter the tags of a log that you want to trigger a signal.
    - For example, if you want logs with the tag `dev:demo` to trigger signals with a severity of `INFO`, enter `dev:demo` in the query field. Similarly, if you want logs with the tag `dev:prod` to trigger signals with a severity of `MEDIUM`, enter `dev:prod` in the query field.

### Other parameters

#### Enable optional group by {% #enable-group-by-historical-third-party %}

{% partial file="security/cloud_siem/enable_group_by.mdoc.md" /%}

#### Group signals {% #group-signals-historical-third-party %}

{% partial file="security/cloud_siem/group_signals.mdoc.md" /%}
{% /if %}

<!-- Scheduled rule only: Add custom schedule section -->
{% if equals($cloud_siem_detection_rule_type, "scheduled_rule") %}
## Add custom schedule

You can set specific evaluation time and how often it runs by creating a [custom schedule](#create-custom-schedule) or using a [recurrence rule (RRULE)](#use-rrule).

### Create custom schedule

{% img src="security/security_monitoring/detection_rules/custom_schedule.png" alt="The Use custom schedule section with an example" style="width:100%;" /%}

1. Select **Create Custom Schedules**.
1. Set how often and at what time you want the rule to run.

### Use RRULE

{% img src="security/security_monitoring/detection_rules/rrule_example.png" alt="The Use RRULE section with an example" style="width:100%;" /%}

Recurrence rule (RRULE) is a property name from the [iCalendar RFC][8], which is the standard for defining recurring events. Use the [official RRULE generator][9] to generate recurring rules. Leverage RRULEs to cover more advanced scheduling use cases.

For example, if the RRULE is:

```text
FREQ=DAILY;INTERVAL=1;BYHOUR=6;BYMINUTE=0
```

The example RRULE runs the scheduled rule once a day at 6:00 AM.

{% alert level="info" %}
- Attributes specifying the duration in RRULE are not supported (for example, `DTSTART`, `DTEND`, `DURATION`).
- Evaluation frequencies must be a day or longer. For shorter evaluation frequencies, use the default monitor schedules.
{% /alert %}

To write a custom RRULE for your detection rule:

1. Select **</> Use RRULE**.
1. Set the date and time for when you want the rule to start.
1. Input a [RRULE string][9] to set how often you want the rule to run.
{% /if %}

<!-- Historical job only: Notify when job is complete section -->
{% if equals($cloud_siem_detection_rule_type, "historical_job") %}
## Notify when job is complete

(Optional) Click **Add Recipient** to send notifications upon the completion of job analysis. See [Notification channels][3] for more information.
{% /if %}

## Describe your playbook

{% partial file="security/security-rule-say-whats-happening.mdoc.md" /%}

<!-- Real-time and scheduled rules: Create a suppression section -->
{% if or(equals($cloud_siem_detection_rule_type, "real_time_rule"),equals($cloud_siem_detection_rule_type, "scheduled_rule")) %}
## Create a suppression

{% partial file="security/cloud_siem/create_suppression.mdoc.md" /%}
{% /if %}

[1]: /logs/search_syntax/
[2]: https://app.datadoghq.com/security/siem/rules/new
[3]: /security_platform/notifications/#notification-channels
[4]: /security/notifications/rules/
[5]: /ddsql_reference/
[6]: https://app.datadoghq.com/security/configuration/datasets
[7]: /logs/explorer/calculated_fields/
[8]: https://icalendar.org/rrule-tool.html
[9]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html