---
title: Default Standard Attributes
disable_sidebar: true
further_reading:
    - link: '/data_security/'
      tag: 'Documentation'
      text: 'Ensuring the security of the data sent to Datadog'
    - link: '/tracing/trace_collection/tracing_naming_convention/'
      tag: 'Documentation'
      text: 'Span Tag Semantics'
filter_all: All
content: "The following table lists the attributes automatically applied to data sent to Datadog by the Agent by each of the RUM, Logs, and APM products, as applicable to the data domain. Optionally, filter the list by product or search by keyword or description text to find the attributes you're interested in."

attributes:
  - name: host
    description: The name of the originating host as defined in metrics. Datadog automatically retrieves corresponding host tags from the matching host in Datadog and applies them to your telemetry. The Agent sets this value automatically.
    product_source: 
      - icon-log
      - icon-apm
    type: string
    domain: Reserved
  - name: device
    description: The type of originating device.
    product_source:
      - icon-rum
      - android
      - ios
      - browser
      - roku
    type: string
    domain: Reserved
  - name: source
    description: This corresponds to the integration name, the technology from which the data originated. When it matches an integration name, Datadog automatically installs the corresponding parsers and facets. For example, `nginx`, `postgresql`, and so on.
    product_source: 
      - icon-log
    type: string
    domain: Reserved
  - name: status
    description: This corresponds to the level or severity of the data. For logs, it is used to define [log patterns](/logs/explorer/patterns/) and has a dedicated layout in the Log Management UI.
    product_source: 
      - icon-log
      - icon-apm
    type: string
    domain: Reserved
  - name: service
    description: The [unified service name](/getting_started/tagging/unified_service_tagging/) for the application or service that is generating the data, used to correlate user sessions. It is used to switch from APM to other products, so make sure you define the same value when you use both products. In the RUM Browser SDK, a service denotes a set of pages built by a team that offers a specific functionality in your browser application. You can assign web pages to a service with [manual view tracking](/real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names).
    product_source: 
      - icon-log
      - icon-rum
      - icon-apm
      - android
      - ios
      - browser
      - roku
    type: string
    domain: Reserved
  - name: trace_id
    description: The Trace ID used for traces. It is used to correlate your traces with other data, including logs.
    product_source: 
      - icon-log
      - icon-apm
    type: number
    domain: Reserved
  - name: message
    description: The body of a log entry, highlighted and displayed in Logs Live Tail, where it is indexed for full text search.
    product_source: 
      - icon-log
    type: string
    domain: Reserved
  - name: network.bytes_read
    description: Total number of bytes transmitted from the client to the server when the log is emitted.
    product_source: 
      - icon-log
    type: number
    domain: Network communications
  - name: network.bytes_written
    description: Total number of bytes transmitted from the server to the client when the log is emitted.
    product_source: 
      - icon-log
    type: number
    domain: Network communications
  - name: network.client.geoip.country.name
    description: Name of the country.
    product_source: 
      - icon-log
    type: string
    domain: Geolocation
  - name: network.client.geoip.country.iso_code
    description: "[ISO Code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) of the country (for example, `US` for the United States, `FR` for France)."
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
    description: "[ISO Code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) of the first subdivision level of the country (for example, `CA` in the United States or the `SA` department in France)."
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
    description: The version of HTTP used for the request.
    product_source: 
      - icon-log
    type: string
    domain: HTTP
  - name: http.url_details.host
    description: The HTTP host part of the URL.
    product_source: 
      - icon-log
      - icon-apm
    type: string
    domain: HTTP, URL Details
  - name: http.url_details.port
    description: The HTTP port part of the URL.
    product_source: 
      - icon-log
      - icon-apm
    type: number
    domain: HTTP, URL Details
  - name: http.url_details.path
    description: The HTTP path part of the URL.
    product_source: 
      - icon-log
      - icon-apm
    type: string
    domain: HTTP, URL Details
  - name: http.url_details.queryString
    description: The HTTP query string parts of the URL decomposed as query params key/value attributes.
    product_source: 
      - icon-log
      - icon-apm
    type: object
    domain: HTTP, URL Details
  - name: http.url_details.scheme
    description: The protocol name of the URL (HTTP or HTTPS).
    product_source: 
      - icon-log
      - icon-apm
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
  - name: db.instance
    description: The name of the database being connected to. For example, in Java, if `jdbc.url="jdbc:mysql://127.0.0.1:3306/customers"`, the instance name is `customers`.
    product_source:
      - icon-apm 
      - icon-log
    type: string
    domain: Database
  - name: db.statement
    description: "A database statement for the given database type. For example, for mySQL: `'SELECT * FROM wuser_table';` and for Redis: `'SET mykey 'WuValue''`."
    product_source: 
      - icon-apm
      - icon-log
    type: string
    domain: Database
  - name: db.user
    description: User that performs the operation.
    product_source: 
      - icon-apm
      - icon-log
    type: string
    domain: Database
  - name: duration
    description: "A duration of any kind in **nanoseconds**: HTTP response time, database query time, latency, and so on. [Remap](/logs/log_configuration/processors/#remapper) any durations within logs to this attribute because Datadog displays and uses it as a default measure for trace search."
    product_source: 
      - icon-log
    type: number
    domain: Performance
  - name: usr.id
    description: The user identifier.
    product_source: 
      - icon-log 
      - icon-rum
      - android
      - ios
      - browser
      - roku
    type: string
    domain: User
  - name: usr.name
    description: The user-friendly name.
    product_source: 
      - icon-log 
      - icon-rum
      - android
      - ios
      - browser
      - roku
    type: string
    domain: User
  - name: usr.email
    description: The user email.
    product_source: 
      - icon-log 
      - icon-rum
      - android
      - ios
      - browser
      - roku
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

  - name: date
    description: Start of the event in milliseconds from epoch.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: integer
    domain: RUM core attributes

  - name: type
    description: The type of the event (for example, `view` or `resource`).
    product_source:
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: RUM core attributes

  - name: application.id
    description: The Datadog application ID generated when you create a RUM application.
    product_source:
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: RUM core attributes

  - name: application.name
    description: The Datadog application name.
    product_source:
      - icon-rum
      - android
      - browser
      - ios
    type: string
    domain: RUM core attributes

  - name: device.type
    description: The device type as reported by the device (System User-Agent).
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Device (Android, iOS, Roku)

  - name: device.brand
    description: The device brand as reported by the device (System User-Agent).
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Device (Android, iOS, Roku)

  - name: device.model
    description: The device model as reported by the device (System User-Agent).
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Device (Android, iOS, Roku)

  - name: device.name
    description: The device name as reported by the device (System User-Agent).
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Device (Android, iOS, Roku)

  - name: connectivity.status
    description: Status of device network reachability (`connected`, `not connected`, or `maybe`).
    product_source:
      - icon-rum
      - android
      - ios
    type: string
    domain: Connectivity (Android, iOS)
  
  - name: connectivity.interfaces
    description: The list of available network interfaces (for example, `bluetooth`, `cellular`, `ethernet`, or `wifi`).
    product_source:
      - icon-rum
      - android
      - ios
    type: string
    domain: Connectivity (Android, iOS)
  
  - name: connectivity.cellular.technology
    description: The type of a radio technology used for cellular connection.
    product_source:
      - icon-rum
      - android
      - ios
    type: string
    domain: Connectivity (Android, iOS)
  
  - name: connectivity.cellular.carrier_name
    description: The name of the SIM carrier.
    product_source:
      - icon-rum
      - android
      - ios
    type: string
    domain: Connectivity (Android, iOS)
  
  - name: os.name
    description: The OS name as reported by the device (System User-Agent).
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Operating System (Android, iOS, Roku)
    
  - name: os.version
    description: The OS version as reported by the device (System User-Agent).
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Operating System (Android, iOS, Roku)
    
  - name: os.version_major
    description: The OS version major as reported by the device (System User-Agent).
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Operating System (Android, iOS, Roku)
  
  - name: geo.country
    description: Name of the country.
    product_source:
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: Geo-location
    
  - name: geo.country_iso_code
    description: The [ISO Code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) of the country (for example, `US` for the United States or `FR` for France).
    product_source:
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: Geo-location
    
  - name: geo.country_subdivision
    description: Name of the first subdivision level of the country (for example, `California` in the United States or the `Sarthe` department in France).
    product_source:
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: Geo-location
    
  - name: geo.continent_code
    description: ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, or `OC`).
    product_source:
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: Geo-location
    
  - name: geo.continent
    description: Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`, `South America`, or `Oceania`).
    product_source:
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: Geo-location
    
  - name: geo.city
    description: The name of the city (for example, `San Francisco`, `Paris`, or `New York`).
    product_source:
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: Geo-location
  
  - name: user.id
    description: Identifier of the user.
    product_source:
      - icon-rum
      - android
      - roku
    type: string
    domain: RUM user attributes (Android, Roku)
  - name: usr.id
    description: Identifier of the user.
    product_source:
      - icon-rum
      - ios
    type: string
    domain: RUM user attributes (iOS)
  - name: usr.name
    description: Name of the user.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Global user attributes (Android, iOS, Roku)
  - name: usr.email
    description: Email of the user.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Global user attributes (Android, iOS, Roku)
 
  - name: session.id
    description: Unique ID of the session.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Session (Android events, iOS events, Roku events)
  
  - name: session.type
    description: Type of the session (`user`).
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Session (Android events, iOS events, Roku events)
  
  - name: session.is_active
    description: Indicates if the session is currently active. The session ends if a user navigates away from the application or closes the browser window, and expires after 4 hours of activity or 15 minutes of inactivity.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: boolean
    domain: Session (Android events, iOS events, Roku events)
  
  - name: session.initial_view.url
    description: URL of the initial view of the session.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Session (Android events, iOS events, Roku events)
  
  - name: session.initial_view.name
    description: Name of the initial view of the session.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Session (Android events, iOS events, Roku events)
  
  - name: session.last_view.url
    description: URL of the last view of the session.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Session (Android events, iOS events, Roku events)
  
  - name: session.last_view.name
    description: Name of the last view of the session.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Session (Android events, iOS events, Roku events)
  
  - name: session.ip
    description: IP address of the session extracted from the TCP connection of the intake. If you want to stop collecting this attribute, change the setting in your [application details](/data_security/real_user_monitoring/#ip-address).
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Session (Android events, iOS events, Roku events)
  
  - name: session.useragent
    description: System `User-Agent` info to interpret device info.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Session (Android events, iOS events, Roku events)
  
  - name: view.id
    description: Unique ID of the initial view corresponding to the event.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: View (Android events, iOS events, Roku events)
  
  - name: view.url
    description: Canonical name of the class corresponding to the event. For iOS, the URL of the `UIViewController` class corresponding to the event.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: View (Android events, iOS events, Roku events)

  - name: view.name
    description: Customizable name of the view corresponding to the event.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: View (Android events, iOS events, Roku events)
  
  - name: resource.id
    description: Unique identifier of the resource.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Resource (Android events, iOS events, Roku events)
  - name: resource.type
    description: The type of resource being collected (for example, `xhr`, `image`, `font`, `css`, or `js`).
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Resource (Android events, iOS events, Roku events)
  - name: resource.method
    description: The HTTP method (for example, `POST`, `GET`, `PATCH`, or `DELETE`).
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Resource (Android events, iOS events, Roku events)
  - name: resource.status_code
    description: The response status code.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: number
    domain: Resource (Android events, iOS events, Roku events)
  - name: resource.url
    description: The resource URL.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Resource (Android events, iOS events, Roku events)
  - name: resource.provider.name
    description: The resource provider name. Default is `unknown`.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Resource (Android events, iOS events, Roku events)
  - name: resource.provider.domain
    description: The resource provider domain.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Resource (Android events, iOS events, Roku events)
  - name: resource.provider.type
    description: The resource provider type (for example, `first-party`, `cdn`, `ad`, or `analytics`).
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Resource (Android events, iOS events, Roku events)
  
  - name: error.source
    description: Where the error originates from (for example, `webview`, `logger`, or `network`).
    product_source:
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: Error (Browser events, Android events, iOS events, Roku events)
  
  - name: error.type
    description: The error type (or error code in some cases).
    product_source:
      - icon-apm
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: Error (Browser events, Android events, iOS events, Roku events)
  
  - name: error.message
    description: A concise, human-readable, one-line message explaining the event.
    product_source:
      - icon-apm
      - icon-log
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: Error (Browser events, Android events, iOS events, Roku events)
  
  - name: error.stack
    description: The stack trace or complementary information about the error.
    product_source:
      - icon-apm
      - icon-log
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: Error (Browser events, Android events, iOS events, Roku events)
  
  - name: error.issue_id
    description: The stack trace or complementary information about the error.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Error (Android events, iOS events, Roku events)
  
  - name: error.resource.status_code
    description: The response status code.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: number
    domain: Network error (Android events, iOS events, Roku events)
  
  - name: error.resource.method
    description: The HTTP method (for example, `POST` or `GET`).
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Network error (Android events, iOS events, Roku events)
  
  - name: error.resource.url
    description: The resource URL.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Network error (Android events, iOS events, Roku events)
  
  - name: error.resource.provider.name
    description: The resource provider name. Default is `unknown`.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Network error (Android events, iOS events, Roku events)
  
  - name: error.resource.provider.domain
    description: The resource provider domain.
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Network error (Android events, iOS events, Roku events)
  
  - name: error.resource.provider.type
    description: The resource provider type (for example, `first-party`, `cdn`, `ad`, or `analytics`).
    product_source:
      - icon-rum
      - android
      - ios
      - roku
    type: string
    domain: Network error (Android events, iOS events, Roku events)
  
  - name: action.id
    description: UUID of the user action.
    product_source:
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: Action (Browser events, Android events, iOS events, Roku events)
  - name: action.type
    description: Type of the user action (for example, `tap` or `application_start`). For [Custom Browser User Actions](/real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions), it is set to `custom`. 
    product_source:
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: Action (Browser events, Android events, iOS events, Roku events)
  - name: action.name
    description: A user-friendly name (for example, `Click on checkout`). For [Custom Browser User Actions](/real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions), the action name given in the API call.
    product_source:
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: Action (Browser events, Android events, iOS events, Roku events)
  - name: action.target.name
    description: Element that the user interacted with. Only for automatically collected actions.
    product_source:
      - icon-rum
      - android
      - browser
      - ios
      - roku
    type: string
    domain: Action (Browser events, Android events, iOS events, Roku events)
  
  - name: view.id
    description: Randomly generated ID for each page view.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: View (Browser)
    
  - name: view.loading_type
    description: The type of page load, `initial_load` or `route_change`. For more information, see the [single page applications support docs](/real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: View (Browser)
    
  - name: view.referrer
    description: The URL of the previous web page from which a link to the currently requested page was followed.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: View (Browser)
    
  - name: view.url
    description: The view URL.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: View (Browser)
    
  - name: view.url_hash
    description: The hash part of the URL.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: View (Browser)
    
  - name: view.url_host
    description: The host part of the URL.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: View (Browser)
    
  - name: view.url_path
    description: The path part of the URL.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: View (Browser)
    
  - name: view.url_path_group
    description: The automatic URL group generated for similar URLs (for example, `/dashboard/?` for `/dashboard/123` and `/dashboard/456`).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: View (Browser)
    
  - name: view.url_query
    description: The query string parts of the URL decomposed as query params key/value attributes.
    product_source:
      - icon-rum
      - browser
    type: object
    domain: View (Browser)
    
  - name: view.url_scheme
    description: The scheme part of the URL.
    product_source:
      - icon-rum
      - browser
    type: object
    domain: View (Browser)
  
  - name: device.type
    description: The device type as reported by the device (User-Agent HTTP header).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Device (Browser)
  
  - name: device.brand
    description: The device brand as reported by the device (User-Agent HTTP header).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Device (Browser)
  
  - name: device.model
    description: The device model as reported by the device (User-Agent HTTP header).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Device (Browser)
  
  - name: device.name
    description: The device name as reported by the device (User-Agent HTTP header).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Device (Browser)
  
  - name: os.name
    description: The OS name as reported by the device (User-Agent HTTP header).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Operating system (Browser)
  - name: os.version
    description: The OS version as reported by the device (User-Agent HTTP header).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Operating system (Browser)
  - name: os.version_major
    description: The OS version major as reported by the device (User-Agent HTTP header).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Operating system (Browser)

  - name: session.id
    description: Randomly generated ID for each session.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Session (Browser events)
  
  - name: session.ip
    description: Client IP address. If you want to stop collecting this attribute, change the setting in your [application details](/data_security/real_user_monitoring/#ip-address).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Session (Browser events)
  
  - name: session.is_active
    description: Indicates if the session is currently active. The session ends after 4 hours of activity or 15 minutes of inactivity.
    product_source:
      - icon-rum
      - browser
    type: boolean
    domain: Session (Browser events)
  
  - name: session.type
    description: The type of session, `user` or `synthetics`. Sessions from [Synthetic Browser Tests](/synthetics/browser_tests/) are excluded from billing.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Session (Browser events)
  
  - name: session.referrer
    description: The URL of the previous web page from which a link to the currently requested page was followed.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Session (Browser events)
  
  - name: session.initial_view.id
    description: The ID of the first RUM view generated by the user.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Session (Browser events)
  
  - name: session.initial_view.url_host
    description: The host part of the URL.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Session (Browser events)
  
  - name: session.initial_view.url_path
    description: The path part of the URL.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Session (Browser events)
  
  - name: session.initial_view.url_path_group
    description: The automatic URL group generated for similar URLs (for example, `/dashboard/?` for `/dashboard/123` and `/dashboard/456`).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Session (Browser events)
  
  - name: session.initial_view.url_query
    description: The query string parts of the URL decomposed as query params key/value attributes.
    product_source:
      - icon-rum
      - browser
    type: object
    domain: Session (Browser events)
  
  - name: session.initial_view.url_scheme
    description: The scheme part of the URL.
    product_source:
      - icon-rum
      - browser
    type: object
    domain: Session (Browser events)
  
  - name: session.last_view.id
    description: The ID of the last RUM view generated by the user.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Session (Browser events)
  
  - name: session.last_view.url_host
    description: The host part of the URL.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Session (Browser events)
  
  - name: session.last_view.url_path
    description: The path part of the URL.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Session (Browser events)
  
  - name: session.last_view.url_path_group
    description: The automatic URL group generated for similar URLs (for example, `/dashboard/?` for `/dashboard/123` and `/dashboard/456`).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Session (Browser events)
  
  - name: session.last_view.url_query
    description: The query string parts of the URL decomposed as query params key/value attributes.
    product_source:
      - icon-rum
      - browser
    type: object
    domain: Session (Browser events)
  
  - name: session.last_view.url_scheme
    description: The scheme part of the URL.
    product_source:
      - icon-rum
      - browser
    type: object
    domain: Session (Browser events)
  
  - name: resource.type
    description: The type of resource being collected (for example, `css`, `javascript`, `media`, `XHR`, or `image`).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Resource (Browser events)
  
  - name: resource.method
    description: The HTTP method (for example `POST` or `GET`).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Resource (Browser events)
  
  - name: resource.status_code
    description: The response status code.
    product_source:
      - icon-rum
      - browser
    type: number
    domain: Resource (Browser events)
  
  - name: resource.url
    description: The resource URL.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Resource (Browser events)
  
  - name: resource.url_host
    description: The host part of the URL.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Resource (Browser events)
  
  - name: resource.url_path
    description: The path part of the URL.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Resource (Browser events)
  
  - name: resource.url_query
    description: The query string parts of the URL decomposed as query params key/value attributes.
    product_source:
      - icon-rum
      - browser
    type: object
    domain: Resource (Browser events)
  
  - name: resource.url_scheme
    description: The protocol name of the URL (HTTP or HTTPS).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Resource (Browser events)
  
  - name: resource.provider.name
    description: The resource provider name. Default is `unknown`.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Resource (Browser events)
  
  - name: resource.provider.domain
    description: The resource provider domain.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Resource (Browser events)
  
  - name: resource.provider.type
    description: The resource provider type (for example, `first-party`, `cdn`, `ad`, or `analytics`).
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Resource (Browser events)

  - name: action.frustration.type:dead_click
    description: The dead clicks detected by the RUM Browser SDK.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Frustration signals (Browser events)
  
  - name: action.frustration.type:rage_click
    description: The rage clicks detected by the RUM Browser SDK.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Frustration signals (Browser events)
  
  - name: action.frustration.type:error_click
    description: The error clicks detected by the RUM Browser SDK.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: Frustration signals (Browser events)
  
  - name: view.url_query.utm_source
    description: The parameter in the URL tracking the source of traffic.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: UTM (Browser events)
  
  - name: view.url_query.utm_medium
    description: The parameter in the URL tracking the channel where the traffic is coming from.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: UTM (Browser events)
  
  - name: view.url_query.utm_campaign
    description: The parameter in the URL identifying the specific marketing campaign tied to that view.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: UTM (Browser events)
  
  - name: view.url_query.utm_content
    description: The parameter in the URL identifying the specific element a user clicked within a marketing campaign.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: UTM (Browser events)
  
  - name: view.url_query.utm_term
    description: The parameter in the URL tracking the keyword a user searched to trigger a given campaign.
    product_source:
      - icon-rum
      - browser
    type: string
    domain: UTM (Browser events)
  


  - name: language
    description: The client SDK language used to generate the span. It can be one of `cpp`, `dotnet`, `go`, `jvm`, `javascript`, `php`, `python`, `ruby`.
    product_source:
      - icon-apm
    type: string
    domain: APM core
  - name: env
    description: The value of the `DD_ENV` environment variable or user-defined `env` for the running process.
    product_source:
      - icon-apm
    type: string
    domain: APM core (Reserved)
  - name: version
    description: The value of the `DD_VERSION` environment variable or user-defined `version` for the running process.
    product_source:
      - icon-apm
    type: string
    domain: APM core (Reserved)
  - name: span.kind
    description: The string representing the type of work unit handled by the span. It can be one of server, client, producer, consumer, or internal. For more information, see the [OpenTelemetry SpanKind documentation](https://opentelemetry.io/docs/specs/otel/trace/api/#spankind).
    product_source:
      - icon-apm
    type: string
    domain: APM core
  - name: component
    description: The name of the library or integration that created the span.
    product_source:
    - icon-apm
    type: string
    domain: APM core 
  - name: network.client.ip
    description: The IP address of the client that initiated the inbound connection.
    product_source:
      - icon-apm
      - icon-log
    type: string
    domain: Network communications
  - name: network.destination.ip
    description: The IP address to where the outbound connection is being made.
    product_source:
      - icon-apm
      - icon-log
    type: string
    domain: Network communications
  - name: network.host.ip
    description: The local host IP address.
    product_source:
      - icon-apm
    type: string
    domain: Network communications
  - name: network.client.port
    description: The port of the client that initiated the connection.
    product_source:
      - icon-apm
      - icon-log
    type: number
    domain: Network communications
  - name: network.destination.port
    description: The remote port number of the outbound connection.
    product_source:
      - icon-apm
      - icon-log
    type: number
    domain: Network communications
  - name: network.client.name
    description: The hostname of the client that initiated the inbound connection.
    product_source:
      - icon-apm
    type: string
    domain: Network communications
  - name: network.host.name
    description: The local hostname.
    product_source:
      - icon-apm
    type: string
    domain: Network communications
  - name: network.client.transport
    description: The transport protocol used to make the inbound connection.
    product_source:
      - icon-apm
    type: string
    domain: Network communications
  - name: network.destination.transport
    description: The transport protocol used to make the outbound connection.
    product_source:
      - icon-apm
    type: string
    domain: Network communications
  - name: http.status_code
    description: The HTTP response status code.
    product_source:
      - icon-apm
      - icon-log
    type: string
    domain: HTTP requests
  - name: http.url
    description: The URL of the HTTP request, including the obfuscated query string. For more information on obfuscation, see [Configure Data Security](https://docs.datadoghq.com/tracing/configure_data_security/).
    product_source:
      - icon-apm
      - icon-log
    type: string
    domain: HTTP requests
  - name: http.version
    description: The version of HTTP used for the request.
    product_source:
      - icon-apm
    type: string
    domain: HTTP requests
  - name: http.method
    description: The port of the client that initiated the connection.
    product_source:
      - icon-apm
      - icon-log
    type: string
    domain: HTTP requests
  - name: http.route
    description: The matched route (path template). For example, `/users/:userID`.
    product_source:
      - icon-apm
    type: string
    domain: HTTP requests
  - name: http.client_ip
    description: The IP address of the original client behind all proxies, if known. Discovered from headers such as `X-Forwarded-For`.
    product_source:
      - icon-apm
    type: string
    domain: HTTP requests
  - name: http.useragent
    description: The `User-Agent` header received with the request.
    product_source:
      - icon-apm
      - icon-log
    type: string
    domain: HTTP requests
  - name: http.request.content_length
    description: The size of the request payload body in bytes.
    product_source:
      - icon-apm
    type: number
    domain: HTTP requests
  - name: http.response.content_length
    description: The size of the response payload body in bytes.
    product_source:
      - icon-apm
    type: number
    domain: HTTP requests
  - name: http.request.content_length_uncompressed
    description: The size of the uncompressed request payload body after transport decoding.
    product_source:
      - icon-apm
    type: number
    domain: HTTP requests
  - name: http.response.content_length_uncompressed
    description: The size of the uncompressed response payload body after transport decoding.
    product_source:
      - icon-apm
    type: number
    domain: HTTP requests
  - name: http.request.headers.*
    description: The request HTTP headers. None are collected by default, but can be optionally configured with `DD_TRACE_HEADER_TAGS`. 
    product_source:
      - icon-apm
    type: string
    domain: HTTP requests
  - name: db.system
    description: Identifier for the database management system (DBMS) product being used.
    product_source:
      - icon-apm
    type: string
    domain: Database spans
  - name: http.response.headers.*
    description: The response HTTP headers. None are collected by default, but can be optionally configured with `DD_TRACE_HEADER_TAGS`.
    product_source:
      - icon-apm
    type: string
    domain: HTTP requests
  
  - name: db.connection_string
    description: The connection string used to connect to the database.
    product_source:
      - icon-apm
    type: string
    domain: Database spans
    
  - name: db.operation
    description: The name of the operation being executed. For example, `SELECT`, `findAndModify`, `HMSET`.
    product_source:
      - icon-apm
      - icon-log
    type: string
    domain: Database spans
    
  - name: db.sql.table
    description: The name of the primary table that the operation is acting upon, including the database name (if applicable).
    product_source:
      - icon-apm
    type: string
    domain: Database spans
    
  - name: db.row_count
    description: The number of rows/results from the query or operation.
    product_source:
      - icon-apm
    type: number
    domain: Database spans

  - name: messaging.system
    description: The identifier of the messaging system.
    product_source:
      - icon-apm
    type: string
    domain: Message queue spans
  
  - name: messaging.destination
    description: The message destination name.
    product_source:
      - icon-apm
    type: string
    domain: Message queue spans
    
  - name: messaging.destination_kind
    description: The kind of message destination.
    product_source:
      - icon-apm
    type: string
    domain: Message queue spans
    
  - name: messaging.protocol
    description: The name of the transport protocol.
    product_source:
      - icon-apm
    type: string
    domain: Message queue spans
    
  - name: messaging.protocol_version
    description: The version of the transport protocol.
    product_source:
      - icon-apm
    type: string
    domain: Message queue spans
    
  - name: messaging.url
    description: The connection string to the messaging system.
    product_source:
      - icon-apm
    type: string
    domain: Message queue spans
  
  - name: messaging.message_id
    description: A value used by the messaging system as an identifier for the message, represented as a string.
    product_source:
      - icon-apm
    type: string
    domain: Message queue spans
    
  - name: messaging.conversation_id
    description: The conversation ID identifying the conversation to which the message belongs, represented as a string.
    product_source:
      - icon-apm
    type: string
    domain: Message queue spans

  - name: messaging.message_payload_size
    description: The size of the uncompressed message payload in bytes.
    product_source:
      - icon-apm
    type: number
    domain: Message queue spans

  - name: messaging.operation
    description: A string identifying the kind of message consumption. For example, `send` (a message sent to a producer), `receive` (a message is received by a consumer), or `process` (a message previously received is processed by a consumer).
    product_source:
      - icon-apm
    type: string
    domain: Message queue spans

  - name: messaging.consumer_id
    description: The identifier for the consumer receiving a message.
    product_source:
      - icon-apm
    type: string
    domain: Message queue spans
  
  - name: rpc.system
    description: The identifier of the remote system.
    product_source:
      - icon-apm
    type: string
    domain: Remote procedure calls
  
  - name: rpc.service
    description: The name of the service being called.
    product_source:
      - icon-apm
    type: string
    domain: Remote procedure calls
  
  - name: rpc.method
    description: The name of the method being called.
    product_source:
      - icon-apm
    type: string
    domain: Remote procedure calls
  
---



## Further reading

{{< partial name="whats-next/whats-next.html" >}}
