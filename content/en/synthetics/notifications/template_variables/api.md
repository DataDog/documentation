---
title: API Test Variables
further_reading:
- link: "/synthetics/notifications/template_variables/"
  tag: "Documentation"
  text: "Template Variables Overview"
- link: "/synthetics/notifications/template_variables/browser_mobile/"
  tag: "Documentation"
  text: "Browser and Mobile Test Variables"

multifiltersearch:
  headers:
    - name: Variable
      id: variable
    - name: Subtype
      id: subtype
      filter_by: true
    - name: Category
      id: category
      filter_by: true
    - name: Description
      id: description
  data:
    # Test Info
    - variable: '`{{synthetics.attributes.test}}`'
      subtype: All
      category: Test Info
      description: The test object containing name, type, subtype, and id
    - variable: '`{{synthetics.attributes.test.name}}`'
      subtype: All
      category: Test Info
      description: The name of the test
    - variable: '`{{synthetics.attributes.test.type}}`'
      subtype: All
      category: Test Info
      description: 'Test type (`api`)'
    - variable: '`{{synthetics.attributes.test.subType}}`'
      subtype: All
      category: Test Info
      description: 'Subtype for API tests (for example, `http`, `dns`, `multi`)'
    - variable: '`{{synthetics.attributes.test.id}}`'
      subtype: All
      category: Test Info
      description: 'The test public ID (for example, `abc-def-ghi`)'

    # Location
    - variable: '`{{synthetics.attributes.location}}`'
      subtype: All
      category: Location
      description: The location object for where the test runs
    - variable: '`{{synthetics.attributes.location.id}}`'
      subtype: All
      category: Location
      description: 'Location ID (for example, `aws:eu-central-1`)'
    - variable: '`{{synthetics.attributes.location.name}}`'
      subtype: All
      category: Location
      description: 'Name of the location (for example, `Frankfurt (AWS)`)'
    - variable: '`{{synthetics.attributes.location.privateLocation}}`'
      subtype: All
      category: Location
      description: '`true` for Private Locations'

    # Result
    - variable: '`{{synthetics.attributes.result}}`'
      subtype: All
      category: Result
      description: The result object for the executed test run
    - variable: '`{{synthetics.attributes.result.id}}`'
      subtype: All
      category: Result
      description: Unique result ID
    - variable: '`{{synthetics.attributes.result.status}}`'
      subtype: All
      category: Result
      description: 'Test execution status (`passed` or `failed`)'
    - variable: '`{{synthetics.attributes.result.duration}}`'
      subtype: All
      category: Result
      description: Test duration in milliseconds
    - variable: '`{{synthetics.attributes.result.testStartedAt}}`'
      subtype: All
      category: Result
      description: Epoch timestamp when test started (milliseconds)
    - variable: '`{{synthetics.attributes.result.testFinishedAt}}`'
      subtype: All
      category: Result
      description: Epoch timestamp when test finished (milliseconds)
    - variable: '`{{synthetics.attributes.result.testTriggeredAt}}`'
      subtype: All
      category: Result
      description: Epoch timestamp when test was triggered (milliseconds)
    - variable: '`{{synthetics.attributes.result.failure}}`'
      subtype: All
      category: Result
      description: The failure object with failure details
    - variable: '`{{synthetics.attributes.result.failure.message}}`'
      subtype: All
      category: Result
      description: The failure message
    - variable: '`{{synthetics.attributes.result.failure.code}}`'
      subtype: All
      category: Result
      description: The failure code

    # Count - Multistep
    - variable: '`{{synthetics.attributes.count}}`'
      subtype: Multistep
      category: Count
      description: The count object with step statistics
    - variable: '`{{synthetics.attributes.count.steps.total}}`'
      subtype: Multistep
      category: Count
      description: The total number of steps
    - variable: '`{{synthetics.attributes.count.steps.completed}}`'
      subtype: Multistep
      category: Count
      description: The number of steps that were run
    - variable: '`{{synthetics.attributes.count.errors}}`'
      subtype: Multistep
      category: Count
      description: Total number of failed steps
    - variable: '`{{synthetics.attributes.count.hops}}`'
      subtype: TCP
      category: Count
      description: The number of traceroute hops
    - variable: '`{{synthetics.attributes.count.hops}}`'
      subtype: ICMP
      category: Count
      description: The number of traceroute hops

    # Local Config Variables
    - variable: '`{{synthetics.attributes.result.variables.config}}`'
      subtype: All
      category: Local Variables
      description: Local variables configured for the test
    - variable: '`{{synthetics.attributes.result.variables.config.name}}`'
      subtype: All
      category: Local Variables
      description: Variable name
    - variable: '`{{synthetics.attributes.result.variables.config.type}}`'
      subtype: All
      category: Local Variables
      description: Variable type
    - variable: '`{{synthetics.attributes.result.variables.config.secure}}`'
      subtype: All
      category: Local Variables
      description: Whether the variable value is obfuscated
    - variable: '`{{synthetics.attributes.result.variables.config.value}}`'
      subtype: All
      category: Local Variables
      description: Variable value (non-obfuscated only)

    # Global/Extracted Variables
    - variable: '`{{synthetics.attributes.result.variables.extracted}}`'
      subtype: All
      category: Global Variables
      description: Extracted variables that update global variable values
    - variable: '`{{synthetics.attributes.result.variables.extracted.id}}`'
      subtype: All
      category: Global Variables
      description: Global variable ID
    - variable: '`{{synthetics.attributes.result.variables.extracted.name}}`'
      subtype: All
      category: Global Variables
      description: Variable name
    - variable: '`{{synthetics.attributes.result.variables.extracted.secure}}`'
      subtype: All
      category: Global Variables
      description: Whether the variable value is obfuscated
    - variable: '`{{synthetics.attributes.result.variables.extracted.val}}`'
      subtype: All
      category: Global Variables
      description: 'Variable value (note: uses `.val`, not `.value`)'

    # Step Extracted Variables - Multistep
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.name}}`'
      subtype: Multistep
      category: Step Variables
      description: Extracted variable name from a specific step
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.secure}}`'
      subtype: Multistep
      category: Step Variables
      description: Whether the extracted value is obfuscated
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.value}}`'
      subtype: Multistep
      category: Step Variables
      description: Extracted variable value (if step was successful)

    # General Step Properties - Multistep
    - variable: '`{{synthetics.attributes.result.steps.<index>.id}}`'
      subtype: Multistep
      category: Steps
      description: Unique step identifier
    - variable: '`{{synthetics.attributes.result.steps.<index>.status}}`'
      subtype: Multistep
      category: Steps
      description: Step execution status
    - variable: '`{{synthetics.attributes.result.steps.<index>.type}}`'
      subtype: Multistep
      category: Steps
      description: Type of step being executed
    - variable: '`{{synthetics.attributes.result.steps.<index>.duration}}`'
      subtype: Multistep
      category: Steps
      description: Step execution duration in milliseconds
    - variable: '`{{synthetics.attributes.result.steps.<index>.description}}`'
      subtype: Multistep
      category: Steps
      description: Step description
    - variable: '`{{synthetics.attributes.result.steps.<index>.failure.message}}`'
      subtype: Multistep
      category: Steps
      description: Step failure message
    - variable: '`{{synthetics.attributes.result.steps.<index>.failure.code}}`'
      subtype: Multistep
      category: Steps
      description: Step failure code
    - variable: '`{{synthetics.attributes.result.steps.<index>.allowFailure}}`'
      subtype: Multistep
      category: Steps
      description: Whether the step can fail without failing the test
    - variable: '`{{synthetics.attributes.result.steps.<index>.isCritical}}`'
      subtype: Multistep
      category: Steps
      description: Whether the step is critical to the test

    # Subtest Information - Multistep
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subTest.id}}`'
      subtype: Multistep
      category: Subtests
      description: Subtest identifier
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subStep.parentStep.id}}`'
      subtype: Multistep
      category: Subtests
      description: Parent step identifier
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subStep.parentTest.id}}`'
      subtype: Multistep
      category: Subtests
      description: Parent test identifier
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subStep.level}}`'
      subtype: Multistep
      category: Subtests
      description: Nesting level (1 for subtests, 2 for subtests of subtests)

    # Multistep specific
    - variable: '`{{synthetics.attributes.variables.extracted.name}}`'
      subtype: Multistep
      category: Steps
      description: Step name
    - variable: '`{{synthetics.attributes.variables.extracted.type}}`'
      subtype: Multistep
      category: Steps
      description: Step type

    # HTTP
    - variable: '`{{synthetics.attributes.variables.extracted.timings.tcp}}`'
      subtype: HTTP
      category: Timings
      description: TCP connection timing
    - variable: '`{{synthetics.attributes.variables.extracted.assertions.actual}}`'
      subtype: HTTP
      category: Assertions
      description: Actual value from assertion
    - variable: '`{{synthetics.attributes.variables.extracted.assertions.expected}}`'
      subtype: HTTP
      category: Assertions
      description: Expected value for assertion
    - variable: '`{{synthetics.attributes.variables.extracted.assertions.operator}}`'
      subtype: HTTP
      category: Assertions
      description: Assertion operator
    - variable: '`{{synthetics.attributes.variables.extracted.assertions.type}}`'
      subtype: HTTP
      category: Assertions
      description: Assertion type
    - variable: '`{{synthetics.attributes.variables.extracted.dnsResolution.resolvedIp}}`'
      subtype: HTTP
      category: DNS
      description: Resolved IP address
    - variable: '`{{synthetics.attributes.variables.extracted.dnsResolution.server}}`'
      subtype: HTTP
      category: DNS
      description: DNS server used
    - variable: '`{{synthetics.attributes.variables.extracted.timings.dns}}`'
      subtype: HTTP
      category: Timings
      description: DNS resolution time
    - variable: '`{{synthetics.attributes.variables.extracted.request.url}}`'
      subtype: HTTP
      category: Request
      description: Request URL
    - variable: '`{{synthetics.attributes.variables.extracted.request.host}}`'
      subtype: HTTP
      category: Request
      description: Request host
    - variable: '`{{synthetics.attributes.variables.extracted.response.body}}`'
      subtype: HTTP
      category: Response
      description: Response body content
    - variable: '`{{synthetics.attributes.variables.extracted.response.statusCode}}`'
      subtype: HTTP
      category: Response
      description: HTTP status code
    - variable: '`{{synthetics.attributes.variables.extracted.response.headers}}`'
      subtype: HTTP
      category: Response
      description: Response headers
    - variable: '`{{synthetics.attributes.variables.extracted.response.httpVersion}}`'
      subtype: HTTP
      category: Response
      description: HTTP version
    - variable: '`{{synthetics.attributes.variables.extracted.response.redirects}}`'
      subtype: HTTP
      category: Response
      description: Redirect information

    # WebSocket
    - variable: '`{{synthetics.attributes.variables.extracted.timings.open}}`'
      subtype: WebSocket
      category: Timings
      description: Time to open connection (milliseconds)
    - variable: '`{{synthetics.attributes.variables.extracted.timings.receive}}`'
      subtype: WebSocket
      category: Timings
      description: Time to receive response
    - variable: '`{{synthetics.attributes.variables.extracted.handshake.request}}`'
      subtype: WebSocket
      category: Handshake
      description: Handshake request data
    - variable: '`{{synthetics.attributes.variables.extracted.handshake.response}}`'
      subtype: WebSocket
      category: Handshake
      description: Handshake response data
    - variable: '`{{synthetics.attributes.variables.extracted.request.message}}`'
      subtype: WebSocket
      category: Request
      description: Request message
    - variable: '`{{synthetics.attributes.variables.extracted.response.message}}`'
      subtype: WebSocket
      category: Response
      description: Response message
    - variable: '`{{synthetics.attributes.variables.extracted.close.reason}}`'
      subtype: WebSocket
      category: Connection
      description: Connection close reason
    - variable: '`{{synthetics.attributes.variables.extracted.close.statusCode}}`'
      subtype: WebSocket
      category: Connection
      description: Connection close status code

    # gRPC
    - variable: '`{{synthetics.attributes.variables.extracted.request.message}}`'
      subtype: gRPC
      category: Request
      description: Request message
    - variable: '`{{synthetics.attributes.variables.extracted.response.message}}`'
      subtype: gRPC
      category: Response
      description: Response message
    - variable: '`{{synthetics.attributes.variables.extracted.callType}}`'
      subtype: gRPC
      category: Request
      description: 'Call type (`unary` or `healthcheck`)'
    - variable: '`{{synthetics.attributes.variables.extracted.timings.rpc}}`'
      subtype: gRPC
      category: Timings
      description: RPC call timing
    - variable: '`{{synthetics.attributes.variables.extracted.response.healthcheck.status}}`'
      subtype: gRPC
      category: Response
      description: Health check status

    # UDP
    - variable: '`{{synthetics.attributes.variables.extracted.request.message}}`'
      subtype: UDP
      category: Request
      description: Request message
    - variable: '`{{synthetics.attributes.variables.extracted.response.message}}`'
      subtype: UDP
      category: Response
      description: Response message
    - variable: '`{{synthetics.attributes.variables.extracted.timings.message}}`'
      subtype: UDP
      category: Timings
      description: Message timing

    # TCP
    - variable: '`{{synthetics.attributes.variables.extracted.connectionOutcome}}`'
      subtype: TCP
      category: Connection
      description: Connection result
    - variable: '`{{synthetics.attributes.variables.extracted.netpath.routers.ip}}`'
      subtype: TCP
      category: Network Path
      description: Router IP addresses
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.min}}`'
      subtype: TCP
      category: Traceroute
      description: Minimum latency
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.max}}`'
      subtype: TCP
      category: Traceroute
      description: Maximum latency
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.avg}}`'
      subtype: TCP
      category: Traceroute
      description: Average latency
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.stddev}}`'
      subtype: TCP
      category: Traceroute
      description: Latency standard deviation
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.values}}`'
      subtype: TCP
      category: Traceroute
      description: Latency values array

    # ICMP
    - variable: '`{{synthetics.attributes.variables.extracted.request.host}}`'
      subtype: ICMP
      category: Request
      description: Target host
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute}}`'
      subtype: ICMP
      category: Traceroute
      description: Traceroute object
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.min}}`'
      subtype: ICMP
      category: Traceroute
      description: Minimum latency
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.max}}`'
      subtype: ICMP
      category: Traceroute
      description: Maximum latency
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.avg}}`'
      subtype: ICMP
      category: Traceroute
      description: Average latency
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.stddev}}`'
      subtype: ICMP
      category: Traceroute
      description: Latency standard deviation
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.values}}`'
      subtype: ICMP
      category: Traceroute
      description: Latency values array
    - variable: '`{{synthetics.attributes.variables.extracted.ping}}`'
      subtype: ICMP
      category: Network
      description: Ping results
    - variable: '`{{synthetics.attributes.variables.extracted.latency.min}}`'
      subtype: ICMP
      category: Latency
      description: Minimum latency
    - variable: '`{{synthetics.attributes.variables.extracted.latency.max}}`'
      subtype: ICMP
      category: Latency
      description: Maximum latency
    - variable: '`{{synthetics.attributes.variables.extracted.latency.avg}}`'
      subtype: ICMP
      category: Latency
      description: Average latency
    - variable: '`{{synthetics.attributes.variables.extracted.latency.stddev}}`'
      subtype: ICMP
      category: Latency
      description: Latency standard deviation
    - variable: '`{{synthetics.attributes.variables.extracted.latency.values}}`'
      subtype: ICMP
      category: Latency
      description: Latency values array

    # SSL
    - variable: '`{{synthetics.attributes.variables.extracted.cert}}`'
      subtype: SSL
      category: Certificate
      description: SSL certificate information
    - variable: '`{{synthetics.attributes.variables.extracted.cipher}}`'
      subtype: SSL
      category: Certificate
      description: Cipher suite used
    - variable: '`{{synthetics.attributes.variables.extracted.issuer}}`'
      subtype: SSL
      category: Certificate
      description: Certificate issuer
    - variable: '`{{synthetics.attributes.variables.extracted.subject}}`'
      subtype: SSL
      category: Certificate
      description: Certificate subject
    - variable: '`{{synthetics.attributes.variables.extracted.valid.from}}`'
      subtype: SSL
      category: Certificate
      description: Certificate valid from date
    - variable: '`{{synthetics.attributes.variables.extracted.valid.to}}`'
      subtype: SSL
      category: Certificate
      description: Certificate valid to date
    - variable: '`{{synthetics.attributes.variables.extracted.ocsp}}`'
      subtype: SSL
      category: Certificate
      description: OCSP (Online Certificate Status Protocol) information
    - variable: '`{{synthetics.attributes.variables.extracted.timings.handshake}}`'
      subtype: SSL
      category: Timings
      description: SSL handshake timing

    # DNS
    - variable: '`{{synthetics.attributes.variables.extracted.response.records.type}}`'
      subtype: DNS
      category: DNS
      description: DNS record type
    - variable: '`{{synthetics.attributes.variables.extracted.response.records.values}}`'
      subtype: DNS
      category: DNS
      description: DNS record values

---

## Overview

Use the filters below to find template variables for API tests. Filter by **Subtype** to see variables specific to each protocol (HTTP, TCP, UDP, WebSocket, SSL, DNS, ICMP, gRPC, or Multistep). Replace `<index>` in step variables with a step number (0-based), step name in brackets, or step ID. See the [step reference methods][1] section for more information.

{{< multifilter-search >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/notifications/template_variables/#step-reference-methods

