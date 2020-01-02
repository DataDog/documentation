---
title: Custom Uptime Percentage Widget
kind: guide
author: "Boyan Syarov"
aliases:
  - /graphing/guide/uptime-percentage-widget
further_reading:
- link: "/monitors/monitor_uptime_widget/"
  tag: "Documentation"
  text: "Monitor Uptime Widget"
- link: "/synthetics/"
  tag: "Documentation"
  text: "Synthetics"
---

Maintaining service level agreements with external or internal customers often requires measuring uptime percentage. This guide shows you how to achieve this using Datadog's [HTTP check][1] and the [Query Value widget][2].

## Setup

First, make sure the [Datadog Agent][3] is installed. The [HTTP check][1] is included with the Agent install.

Datadog's HTTP check connects to internal or external web pages or endpoints. The HTTP check is among the list of Agent side integrations, meaning the checks are conducted by an Agent installed on a host inside your environment. This gives it the ability to probe endpoints, which you may not be exposing publicly (similar to a layer 7 load balancer).

### Configuration

The HTTP check is configured with a YAML file. Update the `http_check.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent’s configuration directory][4]. Then [restart the Agent][5]. See the [sample http_check.d/conf.yaml][6] for all available configuration options.

**Example**:

```yaml
init_config:

instances:
  - name: Amazon
    url: https://www.amazon.com/
    ca_certs: /opt/datadog-agent/embedded/ssl/certs/cacert.pem
    timeout: 3
    tags:
     - customer:Amazon
     - category:ecommerce
```

Adding the config above instructs the Agent to collect metrics on Amazon's public webpage. One of the metrics collected is `network.http.can_connect`, which returns either 1 (valid response) or 0 (non-valid response).

The example uses optional parameters: timeout of 3 seconds (returns 0 if it takes longer than 3 seconds for a response to arrive) and tags for customer name and category.

### Validation

Use the [Metrics Explorer][7] to verify the metric is reporting to Datadog. This shows `amazon.com` is returning 200s or 300s HTTP responses within the imposed 3 second timeout:

{{< img src="graphing/guide/upw_metrics_explorer.png" alt="Metrics Explorer" >}}

## Graphing

Next, display `network.http.can_connect` for your URL within a [Query Value widget][2], for example:

{{< img src="graphing/guide/upw_qvw01.png" alt="Query Value Widget" >}}

To show uptime percent, modify the settings within the query value widget.

1. Click **Advanced...**.
2. Add `a * 100` to the **Formula** text box. This makes the metric a percentage rather than a ratio.
3. Hide the original value by clicking on ✔**a**.
4. Deselect the Autoscale option, which forces the widget to display a float with 2 decimals.
5. Select **Use Custom units**. Add `%` to the text box that appears.

{{< img src="graphing/guide/upw_qvw02.png" alt="Query Value Widget" >}}

### Conditional format

Optionally, you can add conditional formatting using the **Conditional Format** section. The example below displays values in red that are less than 99.99%:

{{< img src="graphing/guide/upw_qvw03.png" alt="Query Value Widget" >}}

### Example JSON

This is the JSON for the example query value widget:

```json
{
  "viz": "query_value",
  "requests": [
    {
      "q": "avg:network.http.can_connect{url:https://www.amazon.com/}*100",
      "type": null,
      "style": {
        "palette": "dog_classic",
        "type": "solid",
        "width": "normal"
      },
      "aggregator": "avg",
      "conditional_formats": [
        {
          "comparator": "<",
          "value": "99.99",
          "palette": "white_on_red"
        }
      ]
    }
  ],
  "custom_unit": "%",
  "autoscale": false
}
```

## Additional use cases

This example can be extended to additional use cases:

* Report for a single endpoint from multiple geographically spread-out Agents.
* Instead of reporting on a specific URL, report on a category of URLs by using tags. The original example tagged `amazon.com` with `category:ecommerce`. If there were multiple URLs tagged as ecommerce, you could check on all endpoints that fell under that tag.
* Tag combinations can be used to further enhance functionality, for example:
    `avg:network.http.can_connect{bu:processing,env:prod,customer:acme}*100`
* The same logic can be applied when configuring monitors to trigger alerts when the desired SLOs are not met. All of this functionality is available in Datadog's [Metric monitor][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/http_check
[2]: /graphing/widgets/query_value
[3]: https://app.datadoghq.com/account/settings#agent
[4]: /agent/guide/agent-configuration-files
[5]: /agent/guide/agent-commands/#restart-the-agent
[6]: https://github.com/DataDog/integrations-core/blob/master/http_check/datadog_checks/http_check/data/conf.yaml.example
[7]: https://app.datadoghq.com/metric/explorer
[8]: /monitors/monitor_types/metric
