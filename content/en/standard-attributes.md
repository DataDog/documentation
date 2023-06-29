---
title: Default Standard Attributes
kind: documentation
disable_sidebar: true
further_reading:
    - link: "/data_security/"
      tag: "Documentation"
      text: "Ensuring the security of the data sent to Datadog"
---

This page lists the default standard attributes used for data collected by Datadog. 

More?
 - RUM Feature flags
 - RUM event-specific attributes (sessions, views, resources, errors, actions, network errors, )

Further Reading:
 - Data security


| Product source | Attribute name | Description    | Type  | Domain  | 
| -------------- | -------------- | ---------------- | ------ | -------- | 
| *             | `host`        | The name of the originating host as defined in metrics. Datadog automatically retrieves corresponding host tags from the matching host in Datadog and applies them to your telemetry. The Agent sets this value automatically. | `string`| Reserved| 
| *             | `source`      | This corresponds to the integration name, the technology from which the data originated. When it matches an integration name, Datadog automatically installs the corresponding parsers and facets. For example, `nginx`, `postgresql`, and so on.          | `string`| Reserved| 
| *             | `status`      | This corresponds to the level/severity of the data. For logs, it is used to define [log patterns][7] and has a dedicated layout in the Datadog Log UI.   | `string`| Reserved| 
| *             | `service`     | The name of the application or service generating the data. It is used to switch from APM to other products, so make sure you define the same value when you use both products. In RUM, a service denotes a set of pages built by a team that offers a specific functionality in your browser application. You can assign web pages to a service with [manual view tracking][1].| `string`| Reserved| 
| *             | `trace_id`    | The Trace ID used for traces. It is used to correlate your traces with other data, including logs.             | `number`| Reserved| 
| *             | `message`     | The body of a log entry, highlighted and displayed in logs Live Tail, where it is indexed for full text search.| `string`| Reserved| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `network.client.ip`| The IP address of the client that initiated the TCP connection.      | `string`| Network/communications| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `network.destination.ip`| The IP address the client connected to.  | `string`| Network/communications| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `network.client.port`| The port of the client that initiated the connection.  | `number`| Network/communications| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `network.destination.port`| The TCP port the client connected to.    | `number`| Network/communications| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `network.bytes_read`| Total number of bytes transmitted from the client to the server when the log is emitted.         | `number`| Network/communications| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `network.bytes_written`| Total number of bytes transmitted from the server to the client when the log is emitted.         | `number`| Network/communications| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `network.client.geoip.country.name`| Name of the country.       | `string`| Geolocation| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `network.client.geoip.country.iso_code`| [ISO Code][13] of the country (for example, `US` for the United States, `FR` for France).        | `string`| Geolocation| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `network.client.geoip.continent.code`| ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).| `string`| Geolocation| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `network.client.geoip.continent.name`| Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`).           | `string`| Geolocation| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `network.client.geoip.subdivision.name`| Name of the first subdivision level of the country (for example, `California` in the United States or the `Sarthe` department in France).  | `string`| Geolocation| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `network.client.geoip.subdivision.iso_code`| [ISO Code][13] of the first subdivision level of the country (for example, `CA` in the United States or the `SA` department in France).    | `string`| Geolocation| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `network.client.geoip.city.name`| The name of the city (for example, `Paris`, `New York`).             | `string`| Geolocation| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `http.url`    | The URL of the HTTP request.             | `string`| HTTP    | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `http.status_code`| The HTTP response status code.           | `number`| HTTP    | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `http.method` | Indicates the desired action to be performed for a given resource.   | `string`| HTTP    | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `http.referer`| HTTP header field that identifies the address of the webpage that linked to the resource being requested.      | `string`| HTTP    | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `http.request_id`| The ID of the HTTP request.| `string`| HTTP    | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `http.useragent`| The User-Agent as it is sent (raw format). See also User-Agent attributes.         | `string`| HTTP    | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `http.version`| The version of HTTP used for the request.| `string`| HTTP    | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `http.url_details.host`| The HTTP host part of the URL.           | `string`| HTTP, URL Details| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `http.url_details.port`| The HTTP port part of the URL.           | `number`| HTTP, URL Details| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `http.url_details.path`| The HTTP path part of the URL.           | `string`| HTTP, URL Details| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `http.url_details.queryString`| The HTTP query string parts of the URL decomposed as query params key/value attributes.          | `object`| HTTP, URL Details| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `http.url_details.scheme`| The protocol name of the URL (HTTP or HTTPS).          | `string`| HTTP, URL Details| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `http.useragent_details.os.family`| The OS family reported by the User-Agent.| `string`| User-Agent| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `http.useragent_details.browser.family`| The Browser Family reported by the User-Agent.         | `string`| User-Agent| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `http.useragent_details.device.family`| The Device family reported by the User-Agent.          | `string`| User-Agent| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `logger.name` | The name of the logger.    | `string`| Source code| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `logger.thread_name`| The name of the current thread when the log is fired.  | `string`| Source code| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `logger.method_name`| The class method name.     | `string`| Source code| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `logger.version`| The version of the logger. | `string`| Source code| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `error.kind`  | The error type or kind (or code in some cases).        | `string`| Source code| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `error.message`| A concise, human-readable, one-line message explaining the event.    | `string`| Source code| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `error.stack` | The stack trace or the complementary information about the error.    | `string`| Source code| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `db.instance` | Database instance name. For example, in Java, if `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, the instance name is `customers`.     | `string`| Database| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `db.statement`| A database statement for the given database type. For example, for mySQL: `"SELECT * FROM wuser_table";` and for Redis: `"SET mykey 'WuValue'"`.         | `string`| Database| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `db.operation`| The operation that was performed ("query", "update", "delete", and so on).         | `string`| Database| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `db.user`     | User that performs the operation.        | `string`| Database| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `duration`    | A duration of any kind in **nanoseconds**: HTTP response time, database query time, latency, and so on. [Remap][20] any durations within logs to this attribute because Datadog displays and uses it as a default measure for trace search.  | `number`| Performance| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i> <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>      | `usr.id`      | The user identifier.       | `string`| User    | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i> <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>      | `usr.name`    | The user friendly name.    | `string`| User    | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i> <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>      | `usr.email`   | The user email.            | `string`| User    | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `syslog.hostname`| The hostname.| `string`| Syslog and log shippers| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `syslog.appname`| The application name. Generally remapped to the `service` reserved attribute.      | `string`| Syslog and log shippers| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `syslog.severity`| The log severity. Generally remapped to the `status` reserved attribute.           | `number`| Syslog and log shippers| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `syslog.timestamp`| The log timestamp. Generally remapped to the `date` reserved attribute.            | `string`| Syslog and log shippers| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `syslog.env`  | The environment name where the source of logs come from.             | `string`| Syslog and log shippers| 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `dns.id`      | The DNS query identifier.  | `string`| DNS     | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `dns.question.name`| The queried domain name.   | `string`| DNS     | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `dns.question.type`| A [two octet code][27] which specifies the DNS question type.        | `string`| DNS     | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `dns.question.class`| The class looked up by the DNS question (such as IP when using the internet).      | `string`| DNS     | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `dns.question.size`| The DNS question size in bytes.          | `number`| DNS     | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `dns.answer.name`| The IP address that the DNS answers with.| `string`| DNS     | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `dns.answer.type`| A [two octet code][27] which specifies the DNS answer type.          | `string`| DNS     | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `dns.answer.class`| The class answered by the DNS.           | `string`| DNS     | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `dns.answer.size`| The DNS answer size in bytes.            | `number`| DNS     | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `dns.flags.rcode`| The DNS reply code.        | `string`| DNS     | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `evt.name`    | The shared name across events generated by the same activity (for example, authentication).      | `string`| Events  | 
| <i class="icon-log" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>          | `evt.outcome` | The result of the event (for example, `success`, `failure`).         | `string`| Events  | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `type`        | The type of RUM event (for example, `view` or `resource`).           | `string`| Core RUM| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `application.id`| The Datadog application ID generated when you create a RUM application.            | `string`| Core RUM| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `application.name`| The name of your Datadog application.    | `string`| Core RUM| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `view.id`     | Randomly generated ID for each page view.| `string`| Views   | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `view.loading_type`| The type of page load: `initial_load` or `route_change`. For more information, see the [single page applications support docs][2].         | `string`| Views   | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `view.referrer`| The URL of the previous web page from which a link to the currently requested page was followed. | `string`| Views   | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `view.url`    | The view URL.| `string`| Views   | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `view.url_hash`| The hash part of the URL.  | `string`| Views   | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `view.url_host`| The host part of the URL.  | `string`| Views   | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `view.url_path`| The path part of the URL.  | `string`| Views   | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `view.url_path_group`| The automatic URL group generated for similar URLs (for example, `/dashboard/?` for `/dashboard/123` and `/dashboard/456`).  | `string`| Views   | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `view.url_query`| The query string parts of the URL decomposed as query params key/value attributes. | `object`| Views   | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `view.url_scheme`| The scheme part of the URL.| `object`| Views   | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `device.type` | The device type as reported by the device (User-Agent HTTP header).  | `string`| Devices | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `device.brand`| The device brand as reported by the device (User-Agent HTTP header). | `string`| Devices | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `device.model`| The device model as reported by the device (User-Agent HTTP header). | `string`| Devices | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `device.name` | The device name as reported by the device (User-Agent HTTP header).  | `string`| Devices | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `os.name`     | The OS name as reported by the device (User-Agent HTTP header).      | `string`| Operating system| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `os.version`  | The OS version as reported by the device (User-Agent HTTP header).   | `string`| Operating system| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `os.version_major`| The OS version major as reported by the device (User-Agent HTTP header).           | `string`| Operating system| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `geo.country` | Name of the country.       | `string`| Geolocation| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `geo.country_iso_code`| [ISO Code][13] of the country (for example, `US` for the United States or `FR` for France).      | `string`| Geolocation| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `geo.country_subdivision`| Name of the first subdivision level of the country (for example, `California` in the United States or the `Sarthe` department in France).  | `string`| Geolocation| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `geo.continent_code`| ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).| `string`| Geolocation| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `geo.continent`| Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`, `South America`, `Oceania`).          | `string`| Geolocation| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i>           | `geo.city`    | The name of the city (for example, `Paris` or `New York`).           | `string`| Geolocation| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i> {{< img src="/integrations_logos/android-logo.png" alt="Android" style="width:100%;" >}}   | `date`        | Start of the event in milliseconds from epoch.         | `integer`| Core    | 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i> {{< img src="/integrations_logos/android-logo.png" alt="Android" style="width:100%;" >}}   | `connectivity.status`| Status of device network reachability (`connected`, `not connected`, or `maybe`).  | `string`| Connectivity| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i> {{< img src="/integrations_logos/android-logo.png" alt="Android" style="width:100%;" >}}   | `connectivity.interfaces`| The list of available network interfaces (for example, `bluetooth`, `cellular`, `ethernet`, or `wifi`).        | `string`| Connectivity| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i> {{< img src="/integrations_logos/android-logo.png" alt="Android" style="width:100%;" >}}   | `connectivity.cellular.technology`| The type of a radio technology used for cellular connection.         | `string`| Connectivity| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i> {{< img src="/integrations_logos/android-logo.png" alt="Android" style="width:100%;" >}}   | `connectivity.cellular.carrier_name`| The name of the SIM carrier.             | `string`| Connectivity| 
| <i class="icon-rum" style="font-size:18px;color:#7c3eb9;vertical-align:middle"></i> {{< img src="/integrations_logos/android-logo.png" alt="Android" style="width:100%;" >}}   | `view.name`   | Customizable name of the view corresponding to the event.            | `string`| Views   | 



### APM


### RUM - iOS

### RUM - Roku

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/modifying_data_and_context/?tab=npm#override-default-rum-view-names
[2]: /real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
[7]: /logs/explorer/patterns/
[13]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[20]: /logs/log_configuration/processors/#remapper
[27]: https://en.wikipedia.org/wiki/List_of_DNS_record_types