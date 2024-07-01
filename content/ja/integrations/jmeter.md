---
"app_id": "jmeter"
"app_uuid": "be62a333-998e-4fea-b0e4-dd4a45b859b4"
"assets":
  "dashboards":
    "JMeter Overview": assets/dashboards/JMeterOverview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": jmeter.responses_count
      "metadata_path": metadata.csv
      "prefix": jmeter.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10164"
    "source_type_name": JMeter
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- log collection
- testing
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/jmeter/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "jmeter"
"integration_id": "jmeter"
"integration_title": "JMeter"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "jmeter"
"public_title": "JMeter"
"short_description": "A Datadog plugin for Apache JMeter"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Log Collection"
  - "Category::Testing"
  "configuration": "README.md#Setup"
  "description": A Datadog plugin for Apache JMeter
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": JMeter
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Datadog Backend Listener for Apache JMeter is an open source JMeter plugin used to send test results to the Datadog platform. It provides real-time reporting of test metrics like latency, the number of bytes sent and received, and more. You can also send to Datadog complete test results as log entries.

## Setup

### Installation

The Datadog Backend Listener plugin needs to be installed manually. See the latest release and more up-to-date installation instructions on its [GitHub repository][1].

#### Manual installation

1. Download the Datadog plugin JAR file from the [release page][2]
2. Place the JAR in the `lib/ext` directory within your JMeter installation.
3. Launch JMeter (or quit and re-open the application).

#### JMeter plugins Manager

1. If not already configured, download the [JMeter Plugins Manager JAR][3].
2. Once you've completed the download, place the `.jar` in the `lib/ext` directory within your JMeter installation. 
3. Launch JMeter (or quit and re-open the application). 
4. Go to `Options > Plugins Manager > Available Plugins`. 
5. Search for "Datadog Backend Listener".
6. Click the checbox next to the Datadog Backend Listener plugin.
7. Click "Apply Changes and Restart JMeter".

### Configuration

To start reporting metrics to Datadog:

1. Right click on the thread group or the test plan for which you want to send metrics to Datadog. 
2. Go to `Add > Listener > Backend Listener`.
3. Modify the `Backend Listener Implementation` and select `org.datadog.jmeter.plugins.DatadogBackendClient` from the drop-down. 
4. Set the `apiKey` variable to [your Datadog API key][4].
5. Run your test and validate that metrics have appeared in Datadog.

The plugin has the following configuration options:

| Name       | Required | Default value | description|
|------------|:--------:|---------------|------------|
|apiKey | true | NA | Your Datadog API key.|
|datadogUrl | false | https://api.datadoghq.com/api/ | You can configure a different endpoint, for instance https://api.datadoghq.eu/api/ if your datadog instance is in the EU|
|logIntakeUrl | false | https://http-intake.logs.datadoghq.com/v1/input/ | You can configure a different endpoint, for instance https://http-intake.logs.datadoghq.eu/v1/input/ if your datadog instance is in the EU.|
|metricsMaxBatchSize|false|200|Metrics are submitted every 10 seconds in batches of size `metricsMaxBatchSize`.|
|logsBatchSize|false|500|Logs are submitted in batches of size `logsBatchSize` as soon as this size is reached.|
|sendResultsAsLogs|false|false|By default only metrics are reported to Datadog. To report individual test results as log events, set this field to `true`.|
|includeSubresults|false|false|A subresult is for instance when an individual HTTP request has to follow redirects. By default subresults are ignored.|
|excludeLogsResponseCodeRegex|false|`""`| Setting `sendResultsAsLogs` will submit all results as logs to Datadog by default. This option lets you exclude results whose response code matches a given regex. For example, you may set this option to `[123][0-5][0-9]` to only submit errors.|
|samplersRegex|false|.*|An optional regex to filter the samplers to monitor.|
|customTags|false|`""`|Comma-separated list of tags to add to every metric

## Data Collected

### Metrics
{{< get-metrics-from-git "jmeter" >}}


### Service Checks

JMeter does not include any service checks.

### Events

JMeter does not include any events.

## Troubleshooting

Need help? Contact [Datadog support][6].

## Further Reading

Additional helpful documentation, links, and articles:

  - [Monitor JMeter test results with Datadog][7]

[1]: https://github.com/DataDog/jmeter-datadog-backend-listener
[2]: https://github.com/DataDog/jmeter-datadog-backend-listener/releases
[3]: https://jmeter-plugins.org/wiki/PluginsManager/
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://github.com/DataDog/integrations-core/blob/master/jmeter/metadata.csv
[6]: https://docs.datadoghq.com/help/
[7]: https://www.datadoghq.com/blog/monitor-jmeter-test-results-datadog/

