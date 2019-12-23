---
title: RUM Data Collected
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/real_user_monitoring/explorer"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/real_user_monitoring/analytics"
  tag: "Documentation"
  text: "Build analytics upon your events"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

{{< whatsnext desc="By default, all data collected is kept at full granularity for 15 days. The Datadog Real User Monitoring script sends 5 main types of events to Datadog:">}}
  {{< nextlink href="/real_user_monitoring/data_collected/">}}<u>View</u>: Each time a user goes on a page of the setup application, a view event is created. While the user remains on that view, all data collected is attached to that view with the `view.id` attribute .{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/data_collected/">}}<u>Resource</u>: A resource event can be generated for images, XHR/Fetch, CSS, or JS libraries. It contains information about the resource, like its name and its associated loading duration.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/data_collected/">}}<u>Long task</u>:  Any task in a browser that blocks the main thread for more than 50ms is considered a long task and gets a specific event generation.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/data_collected/">}}<u>Error</u>: Every time a frontend error is emitted by the browser, RUM catches it and sends it as an Error Event to Datadog.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/data_collected/">}}<u>User Action</u>:A User Action event is a custom event that can be generated for a given user action.{{< /nextlink >}}
{{< /whatsnext >}}

## Default attributes

These 5 event categories have attributes attached by default:

### Core

| Attribute name   | Type   | Description                 |
|------------------|--------|-----------------------------|
| `application_id` | string | The Datadog application ID. |
| `session_id`     | string | The session ID.             |

### View Attribute

| Attribute name                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | string | Randomly generated ID for each page view.                                                                      |
| `view.url`                     | string | The view URL.                                                                                                  |
| `view.referrer`                | string | The URL of the previous web page from which a link to the currently requested page was followed.               |
| `view.url_details.host`        | string | The HTTP host part of the URL.                                                                                 |
| `view.url_details.path`        | string | The HTTP path part of the URL.                                                                                 |
| `view.url_details.path_group`  | string | Automatic URL group generated for similar URLs. (ex: `/dashboard/?` For `/dashboard/123` and `/dashboard/456`) |
| `view.url_details.queryString` | object | The HTTP query string parts of the URL decomposed as query params key/value attributes.                        |

### User Agent

The following contexts—following the [Datadog Standard Attributes][1] logic—are attached automatically to all events sent to Datadog:

| Attribute name                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `http.useragent_details.os.family`       | string | The OS family reported by the User-Agent.       |
| `http.useragent_details.browser.family`  | string | The Browser Family reported by the User-Agent.  |
| `http.useragent_details.device.family`   | string | The Device family reported by the User-Agent.   |
| `http.useragent_details.device.category` | string | The Device category reported by the User-Agent. |

### Geolocation

The following attributes are related to the geolocation of IP addresses used in network communication. All fields are prefixed by `network.client.geoip` or `network.destination.geoip`.

| Fullname                                    | Type   | Description                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `network.client.geoip.country.name`         | string | Name of the country                                                                                                                  |
| `network.client.geoip.country.iso_code`     | string | [ISO Code][2] of the country (example: `US` for the United States, `FR` for France)                                                  |
| `network.client.geoip.continent.code`       | string | ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`)                                                                 |
| `network.client.geoip.continent.name`       | string | Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`)                    |
| `network.client.geoip.subdivision.name`     | string | Name of the first subdivision level of the country (example: `California` in the United States or the `Sarthe` department in France) |
| `network.client.geoip.subdivision.iso_code` | string | [ISO Code][2] of the first subdivision level of the country (example: `CA` in the United States or the `SA` department in France)    |
| `network.client.geoip.city.name`            | string | The name of the city (example `Paris`, `New York`)                                                                                   |

## Extra Attribute

In addition to default attributes, you can add your [specific global context][3] to all events collected. This provides you the ability to analyze the data for a subset of users: group errors by user email, understand which customers have the worst performance...

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/attributes_naming_convention
[2]: /logs/processing/attributes_naming_convention/#user-agent-attributes
[3]: /real_user_monitoring/installation/advanced_configuration
