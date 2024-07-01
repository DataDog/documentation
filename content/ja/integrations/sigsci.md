---
"app_id": "sigsci"
"app_uuid": "edc9a664-24f1-45ee-88ad-04e5da064f51"
"assets":
  "dashboards":
    "sigsci": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": sigsci.agent.signal
      "metadata_path": metadata.csv
      "prefix": sigsci.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10037"
    "source_type_name": Signal Sciences
  "monitors":
    "Excessive blocked http requests": assets/monitors/excessiveblockedHTTP.json
"author":
  "homepage": "https://github.com/DataDog/integrations-extras"
  "name": Signal Sciences
  "sales_email": info@signalsciences.com
  "support_email": info@signalsciences.com
"categories":
- security
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/sigsci/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "sigsci"
"integration_id": "sigsci"
"integration_title": "Signal Sciences"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "sigsci"
"public_title": "Signal Sciences"
"short_description": "Collect data from Signal Sciences to see anomalies and block attacks"
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
  - "Category::Security"
  "configuration": "README.md#Setup"
  "description": Collect data from Signal Sciences to see anomalies and block attacks
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": blog
    "url": "https://www.signalsciences.com/blog/"
  "support": "README.md#Support"
  "title": Signal Sciences
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Overview

Send Signal Sciences metrics and events to Datadog to monitor real-time attacks and abuse against your applications, APIs, and microservices, and to ensure Signal Sciences is functioning and inspecting traffic as expected.

![image-datadog-sigsci-dashboard][1]

![image-datadog-sigsci-security][2]

Get metrics and events from Signal Sciences in real-time to:

- See metrics from the WAF related to:

  - Total Requests
  - Top Types of Potential Attacks
  - Command Execution
  - SQL Injection
  - Cross Site Scripting
  - Path Scanning
  - Anomalous Traffic
  - Unknown Sources
  - Server 400/500s

- See IPs that Signal Sciences has blocked and/or flagged as malicious from any of the following activities:

  - OWASP Injection Attacks
  - Application DoS
  - Brute Force Attacks
  - Application Abuse & Misuse
  - Request Rate Limiting
  - Account Takeover
  - Bad Bots
  - Virtual Patching

- See alerts on Signal Sciences agent status

## Setup

To use the Signal Sciences-Datadog integration, you must be a customer of Signal Sciences. For more information about Signal Sciences, see <https://www.signalsciences.com>.

### Configuration

#### Metrics collection

1. Install the [Signal Sciences agent][3].

2. Configure the Signal Sciences agent to use DogStatsD:

    Add the following line to each agent's agent.config file:

   ```shell
   statsd-type = "dogstatsd"
   ```

    When this is done the agent's StatsD client has tagging enabled and metrics such as `sigsci.agent.signal.<SIGNAL_TYPE>` are sent as `sigsci.agent.signal` and tagged with `signal_type:<SIGNAL_TYPE>`.

    _Example:_`sigsci.agent.signal.http404` => `sigsci.agent.signal` with tag `signal_type:http404`

    If using Kubernetes to run the Datadog Agent, make sure to enable DogStatsD non local traffic as described in the [Kubernetes DogStatsD documentation][4].

3. Configure the SigSci agent to send metrics to the Datadog Agent:

    Add the following line to each agent's `agent.config` file:

   ```shell
   statsd-address="<DATADOG_AGENT_HOSTNAME>:<DATADOG_AGENT_PORT>"
   ```

4. Click the button to install the integration.

5. In Datadog, verify that the "Signal Sciences - Overview" dashboard is created and starting to capture metrics.

#### Events collection

1. Within Datadog, [create an API key][5].

2. In your [Signal Sciences Dashboard][6] on the Site navigation bar, click Manage > Integrations and click Add next to the Datadog Event integration.

3. Enter the API Key in the _API Key_ field.

4. Click _Add_.

For more information, see the [Datadog Signal Sciences integration][7].

## Data Collected

### Metrics
{{< get-metrics-from-git "sigsci" >}}


### Events

Events are created and sent to your [Datadog Event Stream][9] when an IP address is flagged in Signal Sciences.

### Service Checks

The Signal Sciences integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][10].

## Further Reading

Additional helpful documentation, links, and articles:

- [Signal Sciences blog][11]

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sigsci/images/datadog-sigsci-dashboard.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sigsci/images/datadog-sigsci-security.png
[3]: https://docs.signalsciences.net/install-guides/
[4]: https://docs.datadoghq.com/agent/kubernetes/dogstatsd/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://dashboard.signalsciences.net
[7]: https://docs.signalsciences.net/integrations/datadog/
[8]: https://github.com/DataDog/integrations-extras/blob/master/sigsci/metadata.csv
[9]: https://docs.datadoghq.com/events/
[10]: https://docs.datadoghq.com/help/
[11]: https://www.signalsciences.com/blog/

