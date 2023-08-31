---
title: Default Standard Attributes
disable_sidebar: true
further_reading:
    - link: '/data_security/'
      tag: 'Documentation'
      text: 'Ensuring the security of the data sent to Datadog'
filter_all: All
content: "The following table lists the attributes automatically applied to data sent to Datadog by the Agent by each of the RUM, Logs, and APM products, as applicable to the data domain. Optionally, filter the list by product or search by keyword or description text to find the attributes you're interested in."

attributes:
  - name: host
    description: The name of the originating host as defined in metrics. Datadog automatically retrieves corresponding host tags from the matching host in Datadog and applies them to your telemetry. The Agent sets this value automatically.
    product_source: 
      - "icon-log"
      - "icon-rum"
      - "icon-apm"
    type: string
    domain: Reserved
  - name: source
    description: This corresponds to the integration name, the technology from which the data originated. When it matches an integration name, Datadog automatically installs the corresponding parsers and facets. For example, `nginx`, `postgresql`, and so on.
    product_source: 
      - "icon-log"
      - "icon-rum"
      - "icon-apm"
    type: string
    domain: Reserved
  - name: status
    description: This corresponds to the level/severity of the data. For logs, it is used to define [log patterns](/logs/explorer/patterns/) and has a dedicated layout in the Datadog Log UI.
    product_source: 
      - "icon-log"
      - "icon-rum"
      - "icon-apm"
    type: string
    domain: Reserved
  - name: service
    description: The name of the application or service generating the data. It is used to switch from APM to other products, so make sure you define the same value when you use both products. In RUM, a service denotes a set of pages built by a team that offers a specific functionality in your browser application. You can assign web pages to a service with [manual view tracking](/real_user_monitoring/browser/modifying_data_and_context/?tab=npm#override-default-rum-view-names).
    product_source: 
      - "icon-log"
      - "icon-rum"
      - "icon-apm"
    type: string
    domain: Reserved
  - name: trace_id
    description: The Trace ID used for traces. It is used to correlate your traces with other data, including logs.
    product_source: 
      - "icon-log"
      - "icon-rum"
      - "icon-apm"
    type: number
    domain: Reserved
  - name: message
    description: The body of a log entry, highlighted and displayed in logs Live Tail, where it is indexed for full text search.
    product_source: 
      - "icon-log"
      - "icon-rum"
      - "icon-apm"
    type: string
    domain: Reserved
  - name: network.client.ip
    description: The IP address of the client that initiated the TCP connection.
    product_source: 
      - icon-log
    type: string
    domain: Network/communications
  - name: network.destination.ip
    description: The IP address the client connected to.
    product_source: 
      - icon-log
    type: string
    domain: Network/communications
  - name: network.client.port
    description: The port of the client that initiated the connection.
    product_source: 
      - icon-log
    type: number
    domain: Network/communications
  - name: network.destination.port
    description: The TCP port the client connected to.
    product_source: 
      - icon-log
    type: number
    domain: Network/communications
  - name: network.bytes_read
    description: Total number of bytes transmitted from the client to the server when the log is emitted.
    product_source: 
      - icon-log
    type: number
    domain: Network/communications
  - name: network.bytes_written
    description: Total number of bytes transmitted from the server to the client when the log is emitted.
    product_source: 
      - icon-log
    type: number
    domain: Network/communications
  - name: network.client.geoip.country.name
    description: Name of the country.
    product_source: 
      - icon-log
    type: string
    domain: Geolocation
  - name: network.client.geoip.country.iso_code
    description: "[ISO Code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codesobject) of the country (for example, `US` for the United States, `FR` for France)."
    product_source: 
      - icon-log
    type: string
    domain: Geolocation
  - name: network.client.geoip.continent.code
    description: ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).
    product_source: 
      - icon-log
    type: string
    domain: Geolocation
  - name: network.client.geoip.continent.name
    description: Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`).
    product_source: 
      - icon-log
    type: string
    domain: Geolocation
  - name: network.client.geoip.subdivision.name
    description: Name of the first subdivision level of the country (for example, `California` in the United States or the `Sarthe` department in France).
    product_source: 
      - icon-log
    type: string
    domain: Geolocation
  - name: network.client.geoip.subdivision.iso_code
    description: "[ISO Code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codesobject) of the first subdivision level of the country (for example, `CA` in the United States or the `SA` department in France)."
    product_source: 
      - icon-log
    type: string
    domain: Geolocation
  - name: network.client.geoip.city.name
    description: The name of the city (for example, `Paris`, `New York`).
    product_source: 
      - icon-log
    type: string
    domain: Geolocation
  - name: http.url
    description: The URL of the HTTP request.
    product_source: 
      - icon-log
    type: string
    domain: HTTP
  - name: http.status_code
    description: The HTTP response status code.
    product_source: 
      - icon-log
    type: number
    domain: HTTP
  - name: http.method
    description: Indicates the desired action to be performed for a given resource.
    product_source: 
      - icon-log
    type: string
    domain: HTTP
  - name: http.referer
    description: HTTP header field that identifies the address of the webpage that linked to the resource being requested.
    product_source: 
      - icon-log
    type: string
    domain: HTTP
  - name: http.request_id
    description: The ID of the HTTP request.
    product_source: 
      - icon-log
    type: string
    domain: HTTP
  - name: http.useragent
    description: The User-Agent as it is sent (raw format). See also User-Agent attributes.
    product_source: 
      - icon-log
    type: string
    domain: HTTP
  - name: http.version
    description: The version of HTTP used for the request.
    product_source: 
      - icon-log
    type: string
    domain: HTTP
  - name: http.url_details.host
    description: The HTTP host part of the URL.
    product_source: 
      - icon-log
    type: string
    domain: HTTP, URL Details
  - name: http.url_details.port
    description: The HTTP port part of the URL.
    product_source: 
      - icon-log
    type: number
    domain: HTTP, URL Details
  - name: http.url_details.path
    description: The HTTP path part of the URL.
    product_source: 
      - icon-log
    type: string
    domain: HTTP, URL Details
  - name: http.url_details.queryString
    description: The HTTP query string parts of the URL decomposed as query params key/value attributes.
    product_source: 
      - icon-log
    type: object
    domain: HTTP, URL Details
  - name: http.url_details.scheme
    description: The protocol name of the URL (HTTP or HTTPS).
    product_source: 
      - icon-log
    type: string
    domain: HTTP, URL Details
  - name: http.useragent_details.os.family
    description: The OS family reported by the User-Agent.
    product_source: 
      - icon-log
    type: string
    domain: User-Agent
  - name: http.useragent_details.browser.family
    description: The Browser Family reported by the User-Agent.
    product_source: 
      - icon-log
    type: string
    domain: User-Agent
  - name: http.useragent_details.device.family
    description: The Device family reported by the User-Agent.
    product_source: 
      - icon-log
    type: string
    domain: User-Agent
  - name: logger.name
    description: The name of the logger.
    product_source: 
      - icon-log
    type: string
    domain: Source code
  - name: logger.thread_name
    description: The name of the current thread when the log is fired.
    product_source: 
      - icon-log
    type: string
    domain: Source code
  - name: logger.method_name
    description: The class method name.
    product_source: 
      - icon-log
    type: string
    domain: Source code
  - name: logger.version
    description: The version of the logger.
    product_source: 
      - icon-log
    type: string
    domain: Source code
  - name: error.kind
    description: The error type or kind (or code in some cases).
    product_source: 
      - icon-log
    type: string
    domain: Source code
  - name: error.message
    description: A concise, human-readable, one-line message explaining the event.
    product_source: 
      - icon-log
    type: string
    domain: Source code
  - name: error.stack
    description: The stack trace or the complementary information about the error.
    product_source: 
      - icon-log
    type: string
    domain: Source code
  - name: db.instance
    description: Database instance name. For example, in Java, if `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, the instance name is `customers`.
    product_source: 
      - icon-log
    type: string
    domain: Database
  - name: db.statement
    description: "A database statement for the given database type. For example, for mySQL: `'SELECT * FROM wuser_table';` and for Redis: `'SET mykey 'WuValue''`."
    product_source: 
      - icon-log
    type: string
    domain: Database
  - name: db.operation
    description: The operation that was performed ("query", "update", "delete", and so on).
    product_source: 
      - icon-log
    type: string
    domain: Database
  - name: db.user
    description: User that performs the operation.
    product_source: 
      - icon-log
    type: string
    domain: Database
  - name: duration
    description: "A duration of any kind in **nanoseconds**: HTTP response time, database query time, latency, and so on. [Remap](/logs/log_configuration/processors/#remapper)) any durations within logs to this attribute because Datadog displays and uses it as a default measure for trace search."
    product_source: 
      - icon-log
    type: number
    domain: Performance
  - name: usr.id
    description: The user identifier.
    product_source: 
      - icon-log 
      - icon-rum
    type: string
    domain: User
  - name: usr.name
    description: The user friendly name.
    product_source: 
      - icon-log 
      - icon-rum
    type: string
    domain: User
  - name: usr.email
    description: The user email.
    product_source: 
      - icon-log 
      - icon-rum
    type: string
    domain: User
  - name: syslog.hostname
    description: The hostname.
    product_source: 
      - icon-log
    type: string
    domain: Syslog and log shippers
  - name: syslog.appname
    description: The application name. Generally remapped to the `service` reserved attribute.
    product_source: 
      - icon-log
    type: string
    domain: Syslog and log shippers
  - name: syslog.severity
    description: The log severity. Generally remapped to the `status` reserved attribute.
    product_source: 
      - icon-log
    type: number
    domain: Syslog and log shippers
  - name: syslog.timestamp
    description: The log timestamp. Generally remapped to the `date` reserved attribute.
    product_source: 
      - icon-log
    type: string
    domain: Syslog and log shippers
  - name: syslog.env
    description: The environment name where the source of logs come from.
    product_source: 
      - icon-log
    type: string
    domain: Syslog and log shippers
  - name: dns.id
    description: The DNS query identifier.
    product_source: 
      - icon-log
    type: string
    domain: DNS
  - name: dns.question.name
    description: The queried domain name.
    product_source: 
      - icon-log
    type: string
    domain: DNS
  - name: dns.question.type
    description: A [two octet code](https://en.wikipedia.org/wiki/List_of_DNS_record_types) which specifies the DNS question type.
    product_source: 
      - icon-log
    type: string
    domain: DNS
  - name: dns.question.class
    description: The class looked up by the DNS question (such as IP when using the internet).
    product_source: 
      - icon-log
    type: string
    domain: DNS
  - name: dns.question.size
    description: The DNS question size in bytes.
    product_source: 
      - icon-log
    type: number
    domain: DNS
  - name: dns.answer.name
    description: The IP address that the DNS answers with.
    product_source: 
      - icon-log
    type: string
    domain: DNS
  - name: dns.answer.type
    description: A [two octet code](https://en.wikipedia.org/wiki/List_of_DNS_record_types) which specifies the DNS answer type.
    product_source: 
      - icon-log
    type: string
    domain: DNS
  - name: dns.answer.class
    description: The class answered by the DNS.
    product_source: 
      - icon-log
    type: string
    domain: DNS
  - name: dns.answer.size
    description: The DNS answer size in bytes.
    product_source: 
      - icon-log
    type: number
    domain: DNS
  - name: dns.flags.rcode
    description: The DNS reply code.
    product_source: 
      - icon-log
    type: string
    domain: DNS
  - name: evt.name
    description: The shared name across events generated by the same activity (for example, authentication).
    product_source: 
      - icon-log
    type: string
    domain: Events
  - name: evt.outcome
    description: The result of the event (for example, `success`, `failure`).
    product_source: 
      - icon-log
    type: string
    domain: Events
  - name: type
    description: The type of RUM event (for example, `view` or `resource`).
    product_source: 
      - icon-rum
    type: string
    domain: Core RUM
  - name: application.id
    description: The Datadog application ID generated when you create a RUM application.
    product_source: 
      - icon-rum
    type: string
    domain: Core RUM
  - name: application.name
    description: The name of your Datadog application.
    product_source: 
      - icon-rum
    type: string
    domain: Core RUM
  - name: view.id
    description: Randomly generated ID for each page view.
    product_source: 
      - icon-rum
    type: string
    domain: Views
  - name: view.loading_type
    description: "The type of page load: `initial_load` or `route_change`. For more information, see the [single page applications support docs](/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa)."
    product_source: 
      - icon-rum
    type: string
    domain: Views
  - name: view.referrer
    description: The URL of the previous web page from which a link to the currently requested page was followed.
    product_source: 
      - icon-rum
    type: string
    domain: Views
  - name: view.url
    description: The view URL.
    product_source: 
      - icon-rum
    type: string
    domain: Views
  - name: view.url_hash
    description: The hash part of the URL.
    product_source: 
      - icon-rum
    type: string
    domain: Views
  - name: view.url_host
    description: The host part of the URL.
    product_source: 
      - icon-rum
    type: string
    domain: Views
  - name: view.url_path
    description: The path part of the URL.
    product_source: 
      - icon-rum
    type: string
    domain: Views
  - name: view.url_path_group
    description: The automatic URL group generated for similar URLs (for example, `/dashboard/?` for `/dashboard/123` and `/dashboard/456`).
    product_source: 
      - icon-rum
    type: string
    domain: Views
  - name: view.url_query
    description: The query string parts of the URL decomposed as query params key/value attributes.
    product_source: 
      - icon-rum
    type: object
    domain: Views
  - name: view.url_scheme
    description: The scheme part of the URL.
    product_source: 
      - icon-rum
    type: object
    domain: Views
  - name: device.type
    description: The device type as reported by the device (User-Agent HTTP header).
    product_source: 
      - icon-rum
    type: string
    domain: Devices
  - name: device.brand
    description: The device brand as reported by the device (User-Agent HTTP header).
    product_source: 
      - icon-rum
    type: string
    domain: Devices
  - name: device.model
    description: The device model as reported by the device (User-Agent HTTP header).
    product_source: 
      - icon-rum
    type: string
    domain: Devices
  - name: device.name
    description: The device name as reported by the device (User-Agent HTTP header).
    product_source: 
      - icon-rum
    type: string
    domain: Devices
  - name: os.name
    description: The OS name as reported by the device (User-Agent HTTP header).
    product_source: 
      - icon-rum
    type: string
    domain: Operating system
  - name: os.version
    description: The OS version as reported by the device (User-Agent HTTP header).
    product_source: 
      - icon-rum
    type: string
    domain: Operating system
  - name: os.version_major
    description: The OS version major as reported by the device (User-Agent HTTP header).
    product_source: 
      - icon-rum
    type: string
    domain: Operating system
  - name: geo.country
    description: Name of the country.
    product_source: 
      - icon-rum
    type: string
    domain: Geolocation
  - name: geo.country_iso_code
    description: "[ISO Code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codesobject) of the country (for example, `US` for the United States or `FR` for France)."
    product_source: 
      - icon-rum
    type: string
    domain: Geolocation
  - name: geo.country_subdivision
    description: Name of the first subdivision level of the country (for example, `California` in the United States or the `Sarthe` department in France).
    product_source: 
      - icon-rum
    type: string
    domain: Geolocation
  - name: geo.continent_code
    description: ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).
    product_source: 
      - icon-rum
    type: string
    domain: Geolocation
  - name: geo.continent
    description: Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`, `South America`, `Oceania`).
    product_source: 
      - icon-rum
    type: string
    domain: Geolocation
  - name: geo.city
    description: The name of the city (for example, `Paris` or `New York`).
    product_source: 
      - icon-rum
    type: string
    domain: Geolocation
  - name: date
    description: Start of the event in milliseconds from epoch.
    product_source: 
      - icon-rum
    type: integer
    domain: Core (Android)
  - name: connectivity.status
    description: Status of device network reachability (`connected`, `not connected`, or `maybe`).
    product_source: 
      - icon-rum
    type: string
    domain: Connectivity (Android)
  - name: connectivity.interfaces
    description: The list of available network interfaces (for example, `bluetooth`, `cellular`, `ethernet`, or `wifi`).
    product_source: 
      - icon-rum
    type: string
    domain: Connectivity (Android)
  - name: connectivity.cellular.technology
    description: The type of a radio technology used for cellular connection.
    product_source: 
      - icon-rum
    type: string
    domain: Connectivity (Android)
  - name: connectivity.cellular.carrier_name
    description: The name of the SIM carrier.
    product_source: 
      - icon-rum
    type: string
    domain: Connectivity (Android)
  - name: view.name
    description: Customizable name of the view corresponding to the event.
    product_source: 
      - icon-rum
    type: string
    domain: Views (Android)

---



## Further reading

{{< partial name="whats-next/whats-next.html" >}}