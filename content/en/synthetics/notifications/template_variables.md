---
title: Synthetic Monitoring Template Variables
aliases:
  - /synthetics/guide/synthetic-test-monitors/
further_reading:
- link: "/monitors/manage/"
  tag: "Documentation"
  text: "Learn how to manage monitors"
- link: "/monitors/templates/"
  tag: "Documentation"
  text: "Learn more about monitor templates"

multifiltersearch:
  headers:
    - name: Variable
      id: variable
    - name: Test Type
      id: test_type
      filter_by: true
    - name: Subtype
      id: subtype
      filter_by: true
    - name: Category
      id: category
      filter_by: true
    - name: Description
      id: description
  data:
    # Test Info - All test types
    - variable: '`{{synthetics.attributes.test}}`'
      test_type: All
      category: Test Info
      description: The test object containing name, type, subtype, and id
    - variable: '`{{synthetics.attributes.test.name}}`'
      test_type: All
      category: Test Info
      description: The name of the test
    - variable: '`{{synthetics.attributes.test.type}}`'
      test_type: All
      category: Test Info
      description: 'Test type (for example, `api`)'
    - variable: '`{{synthetics.attributes.test.subType}}`'
      test_type: API
      subtype: All
      category: Test Info
      description: 'Subtype for API tests (for example, `http`, `dns`, `multi`)'
    - variable: '`{{synthetics.attributes.test.id}}`'
      test_type: All
      category: Test Info
      description: 'The test public ID (for example, `abc-def-ghi`)'

    # Location - All test types
    - variable: '`{{synthetics.attributes.location}}`'
      test_type: All
      category: Location
      description: The location object for where the test runs
    - variable: '`{{synthetics.attributes.location.id}}`'
      test_type: All
      category: Location
      description: 'Location ID (for example, `aws:eu-central-1`)'
    - variable: '`{{synthetics.attributes.location.name}}`'
      test_type: All
      category: Location
      description: 'Name of the location (for example, `Frankfurt (AWS)`)'
    - variable: '`{{synthetics.attributes.location.privateLocation}}`'
      test_type: All
      category: Location
      description: '`true` for Private Locations'

    # Device - Browser
    - variable: '`{{synthetics.attributes.device}}`'
      test_type: Browser
      category: Device
      description: The device object for the test environment
    - variable: '`{{synthetics.attributes.device}}`'
      test_type: Mobile
      category: Device
      description: The device object for the test environment
    - variable: '`{{synthetics.attributes.device.id}}`'
      test_type: Browser
      category: Device
      description: Device identifier
    - variable: '`{{synthetics.attributes.device.id}}`'
      test_type: Mobile
      category: Device
      description: Device identifier
    - variable: '`{{synthetics.attributes.device.name}}`'
      test_type: Browser
      category: Device
      description: Human-readable device name
    - variable: '`{{synthetics.attributes.device.name}}`'
      test_type: Mobile
      category: Device
      description: Human-readable device name
    - variable: '`{{synthetics.attributes.device.type}}`'
      test_type: Browser
      category: Device
      description: Device type classification
    - variable: '`{{synthetics.attributes.device.type}}`'
      test_type: Mobile
      category: Device
      description: Device type classification
    - variable: '`{{synthetics.attributes.device.width}}`'
      test_type: Browser
      category: Device
      description: Screen width in pixels
    - variable: '`{{synthetics.attributes.device.width}}`'
      test_type: Mobile
      category: Device
      description: Screen width in pixels
    - variable: '`{{synthetics.attributes.device.height}}`'
      test_type: Browser
      category: Device
      description: Screen height in pixels
    - variable: '`{{synthetics.attributes.device.height}}`'
      test_type: Mobile
      category: Device
      description: Screen height in pixels
    - variable: '`{{synthetics.attributes.device.browser.type}}`'
      test_type: Browser
      category: Device
      description: Browser type
    - variable: '`{{synthetics.attributes.device.platform.name}}`'
      test_type: Mobile
      category: Device
      description: Platform name (iOS, Android)
    - variable: '`{{synthetics.attributes.device.platform.version}}`'
      test_type: Mobile
      category: Device
      description: Platform version

    # Result - All test types
    - variable: '`{{synthetics.attributes.result}}`'
      test_type: All
      category: Result
      description: The result object for the executed test run
    - variable: '`{{synthetics.attributes.result.id}}`'
      test_type: All
      category: Result
      description: Unique result ID
    - variable: '`{{synthetics.attributes.result.status}}`'
      test_type: All
      category: Result
      description: 'Test execution status (`passed` or `failed`)'
    - variable: '`{{synthetics.attributes.result.duration}}`'
      test_type: All
      category: Result
      description: Test duration in milliseconds
    - variable: '`{{synthetics.attributes.result.testStartedAt}}`'
      test_type: All
      category: Result
      description: Epoch timestamp when test started (milliseconds)
    - variable: '`{{synthetics.attributes.result.testFinishedAt}}`'
      test_type: All
      category: Result
      description: Epoch timestamp when test finished (milliseconds)
    - variable: '`{{synthetics.attributes.result.testTriggeredAt}}`'
      test_type: All
      category: Result
      description: Epoch timestamp when test was triggered (milliseconds)
    - variable: '`{{synthetics.attributes.result.failure}}`'
      test_type: All
      category: Result
      description: The failure object with failure details
    - variable: '`{{synthetics.attributes.result.failure.message}}`'
      test_type: All
      category: Result
      description: The failure message
    - variable: '`{{synthetics.attributes.result.failure.code}}`'
      test_type: All
      category: Result
      description: The failure code
    - variable: '`{{synthetics.attributes.result.startUrl}}`'
      test_type: Browser
      category: Result
      description: URL from test configuration

    # Count
    - variable: '`{{synthetics.attributes.count}}`'
      test_type: API
      subtype: Multistep
      category: Count
      description: The count object with step statistics
    - variable: '`{{synthetics.attributes.count}}`'
      test_type: Browser
      category: Count
      description: The count object with step statistics
    - variable: '`{{synthetics.attributes.count}}`'
      test_type: Mobile
      category: Count
      description: The count object with step statistics
    - variable: '`{{synthetics.attributes.count.steps.total}}`'
      test_type: API
      subtype: Multistep
      category: Count
      description: The total number of steps
    - variable: '`{{synthetics.attributes.count.steps.total}}`'
      test_type: Browser
      category: Count
      description: The total number of steps
    - variable: '`{{synthetics.attributes.count.steps.total}}`'
      test_type: Mobile
      category: Count
      description: The total number of steps
    - variable: '`{{synthetics.attributes.count.steps.completed}}`'
      test_type: API
      subtype: Multistep
      category: Count
      description: The number of steps that were run
    - variable: '`{{synthetics.attributes.count.steps.completed}}`'
      test_type: Browser
      category: Count
      description: The number of steps that were run
    - variable: '`{{synthetics.attributes.count.steps.completed}}`'
      test_type: Mobile
      category: Count
      description: The number of steps that were run
    - variable: '`{{synthetics.attributes.count.errors}}`'
      test_type: API
      subtype: Multistep
      category: Count
      description: Total number of failed steps
    - variable: '`{{synthetics.attributes.count.errors}}`'
      test_type: Browser
      category: Count
      description: Total number of browser errors
    - variable: '`{{synthetics.attributes.count.errors}}`'
      test_type: Mobile
      category: Count
      description: Total number of failed steps
    - variable: '`{{synthetics.attributes.count.hops}}`'
      test_type: API
      subtype: TCP
      category: Count
      description: The number of traceroute hops
    - variable: '`{{synthetics.attributes.count.hops}}`'
      test_type: API
      subtype: ICMP
      category: Count
      description: The number of traceroute hops

    # Local Config Variables
    - variable: '`{{synthetics.attributes.result.variables.config}}`'
      test_type: All
      category: Local Variables
      description: Local variables configured for the test
    - variable: '`{{synthetics.attributes.result.variables.config.name}}`'
      test_type: All
      category: Local Variables
      description: Variable name
    - variable: '`{{synthetics.attributes.result.variables.config.type}}`'
      test_type: All
      category: Local Variables
      description: Variable type
    - variable: '`{{synthetics.attributes.result.variables.config.secure}}`'
      test_type: All
      category: Local Variables
      description: Whether the variable value is obfuscated
    - variable: '`{{synthetics.attributes.result.variables.config.value}}`'
      test_type: All
      category: Local Variables
      description: Variable value (non-obfuscated only)

    # Global/Extracted Variables
    - variable: '`{{synthetics.attributes.result.variables.extracted}}`'
      test_type: All
      category: Global Variables
      description: Extracted variables that update global variable values
    - variable: '`{{synthetics.attributes.result.variables.extracted.id}}`'
      test_type: All
      category: Global Variables
      description: Global variable ID
    - variable: '`{{synthetics.attributes.result.variables.extracted.name}}`'
      test_type: All
      category: Global Variables
      description: Variable name
    - variable: '`{{synthetics.attributes.result.variables.extracted.secure}}`'
      test_type: All
      category: Global Variables
      description: Whether the variable value is obfuscated
    - variable: '`{{synthetics.attributes.result.variables.extracted.val}}`'
      test_type: All
      category: Global Variables
      description: 'Variable value (note: uses `.val`, not `.value`)'

    # Step Extracted Variables
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.name}}`'
      test_type: API
      subtype: Multistep
      category: Step Variables
      description: Extracted variable name from a specific step
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.name}}`'
      test_type: Browser
      category: Step Variables
      description: Extracted variable name from a specific step
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.name}}`'
      test_type: Mobile
      category: Step Variables
      description: Extracted variable name from a specific step
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.secure}}`'
      test_type: API
      subtype: Multistep
      category: Step Variables
      description: Whether the extracted value is obfuscated
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.secure}}`'
      test_type: Browser
      category: Step Variables
      description: Whether the extracted value is obfuscated
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.secure}}`'
      test_type: Mobile
      category: Step Variables
      description: Whether the extracted value is obfuscated
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.value}}`'
      test_type: API
      subtype: Multistep
      category: Step Variables
      description: Extracted variable value (if step was successful)
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.value}}`'
      test_type: Browser
      category: Step Variables
      description: Extracted variable value (if step was successful)
    - variable: '`{{synthetics.attributes.result.steps.<index>.extractedValue.value}}`'
      test_type: Mobile
      category: Step Variables
      description: Extracted variable value (if step was successful)

    # General Step Properties
    - variable: '`{{synthetics.attributes.result.steps.<index>.id}}`'
      test_type: API
      subtype: Multistep
      category: Steps
      description: Unique step identifier
    - variable: '`{{synthetics.attributes.result.steps.<index>.id}}`'
      test_type: Browser
      category: Steps
      description: Unique step identifier
    - variable: '`{{synthetics.attributes.result.steps.<index>.id}}`'
      test_type: Mobile
      category: Steps
      description: Unique step identifier
    - variable: '`{{synthetics.attributes.result.steps.<index>.status}}`'
      test_type: API
      subtype: Multistep
      category: Steps
      description: Step execution status
    - variable: '`{{synthetics.attributes.result.steps.<index>.status}}`'
      test_type: Browser
      category: Steps
      description: Step execution status
    - variable: '`{{synthetics.attributes.result.steps.<index>.status}}`'
      test_type: Mobile
      category: Steps
      description: Step execution status
    - variable: '`{{synthetics.attributes.result.steps.<index>.type}}`'
      test_type: API
      subtype: Multistep
      category: Steps
      description: Type of step being executed
    - variable: '`{{synthetics.attributes.result.steps.<index>.type}}`'
      test_type: Browser
      category: Steps
      description: Type of step being executed
    - variable: '`{{synthetics.attributes.result.steps.<index>.type}}`'
      test_type: Mobile
      category: Steps
      description: Type of step being executed
    - variable: '`{{synthetics.attributes.result.steps.<index>.duration}}`'
      test_type: API
      subtype: Multistep
      category: Steps
      description: Step execution duration in milliseconds
    - variable: '`{{synthetics.attributes.result.steps.<index>.duration}}`'
      test_type: Browser
      category: Steps
      description: Step execution duration in milliseconds
    - variable: '`{{synthetics.attributes.result.steps.<index>.duration}}`'
      test_type: Mobile
      category: Steps
      description: Step execution duration in milliseconds
    - variable: '`{{synthetics.attributes.result.steps.<index>.description}}`'
      test_type: API
      subtype: Multistep
      category: Steps
      description: Step description
    - variable: '`{{synthetics.attributes.result.steps.<index>.description}}`'
      test_type: Browser
      category: Steps
      description: Step description
    - variable: '`{{synthetics.attributes.result.steps.<index>.description}}`'
      test_type: Mobile
      category: Steps
      description: Step description
    - variable: '`{{synthetics.attributes.result.steps.<index>.failure.message}}`'
      test_type: API
      subtype: Multistep
      category: Steps
      description: Step failure message
    - variable: '`{{synthetics.attributes.result.steps.<index>.failure.message}}`'
      test_type: Browser
      category: Steps
      description: Step failure message
    - variable: '`{{synthetics.attributes.result.steps.<index>.failure.message}}`'
      test_type: Mobile
      category: Steps
      description: Step failure message
    - variable: '`{{synthetics.attributes.result.steps.<index>.failure.code}}`'
      test_type: API
      subtype: Multistep
      category: Steps
      description: Step failure code
    - variable: '`{{synthetics.attributes.result.steps.<index>.failure.code}}`'
      test_type: Browser
      category: Steps
      description: Step failure code
    - variable: '`{{synthetics.attributes.result.steps.<index>.failure.code}}`'
      test_type: Mobile
      category: Steps
      description: Step failure code
    - variable: '`{{synthetics.attributes.result.steps.<index>.url}}`'
      test_type: Browser
      category: Steps
      description: URL for the step
    - variable: '`{{synthetics.attributes.result.steps.<index>.allowFailure}}`'
      test_type: API
      subtype: Multistep
      category: Steps
      description: Whether the step can fail without failing the test
    - variable: '`{{synthetics.attributes.result.steps.<index>.allowFailure}}`'
      test_type: Browser
      category: Steps
      description: Whether the step can fail without failing the test
    - variable: '`{{synthetics.attributes.result.steps.<index>.allowFailure}}`'
      test_type: Mobile
      category: Steps
      description: Whether the step can fail without failing the test
    - variable: '`{{synthetics.attributes.result.steps.<index>.isCritical}}`'
      test_type: API
      subtype: Multistep
      category: Steps
      description: Whether the step is critical to the test
    - variable: '`{{synthetics.attributes.result.steps.<index>.isCritical}}`'
      test_type: Browser
      category: Steps
      description: Whether the step is critical to the test
    - variable: '`{{synthetics.attributes.result.steps.<index>.isCritical}}`'
      test_type: Mobile
      category: Steps
      description: Whether the step is critical to the test

    # Subtest Information
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subTest.id}}`'
      test_type: Browser
      category: Subtests
      description: Subtest identifier
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subTest.id}}`'
      test_type: API
      subtype: Multistep
      category: Subtests
      description: Subtest identifier
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subStep.parentStep.id}}`'
      test_type: Browser
      category: Subtests
      description: Parent step identifier
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subStep.parentStep.id}}`'
      test_type: API
      subtype: Multistep
      category: Subtests
      description: Parent step identifier
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subStep.parentTest.id}}`'
      test_type: Browser
      category: Subtests
      description: Parent test identifier
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subStep.parentTest.id}}`'
      test_type: API
      subtype: Multistep
      category: Subtests
      description: Parent test identifier
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subStep.level}}`'
      test_type: Browser
      category: Subtests
      description: Nesting level (1 for subtests, 2 for subtests of subtests)
    - variable: '`{{synthetics.attributes.variables.extracted.steps.subStep.level}}`'
      test_type: API
      subtype: Multistep
      category: Subtests
      description: Nesting level (1 for subtests, 2 for subtests of subtests)

    # Browser Test Specific
    - variable: '`{{synthetics.attributes.variables.extracted.apiTest.request}}`'
      test_type: Browser
      category: API Test Steps
      description: API test request configuration (for "Run API Test" steps)
    - variable: '`{{synthetics.attributes.variables.extracted.apiTest.result}}`'
      test_type: Browser
      category: API Test Steps
      description: API test result data
    - variable: '`{{synthetics.attributes.variables.extracted.assertionResult.expected}}`'
      test_type: Browser
      category: Assertions
      description: Expected value for assertions
    - variable: '`{{synthetics.attributes.variables.extracted.assertionResults.checkType}}`'
      test_type: Browser
      category: Assertions
      description: Type of assertion check
    - variable: '`{{synthetics.attributes.variables.extracted.assertionResults.actual}}`'
      test_type: Browser
      category: Assertions
      description: Actual value found during assertion
    - variable: '`{{synthetics.attributes.variables.extracted.browserErrors}}`'
      test_type: Browser
      category: Errors
      description: List of browser errors encountered
    - variable: '`{{synthetics.attributes.variables.extracted.timings.firstByte}}`'
      test_type: Browser
      category: Timings
      description: Time to first byte
    - variable: '`{{synthetics.attributes.variables.extracted.timings.tcp}}`'
      test_type: Browser
      category: Timings
      description: TCP connection timing
    - variable: '`{{synthetics.attributes.variables.extracted.timings.tcp}}`'
      test_type: API
      subtype: HTTP
      category: Timings
      description: TCP connection timing
    - variable: '`{{synthetics.attributes.variables.extracted.description}}`'
      test_type: Browser
      category: Steps
      description: Step description
    - variable: '`{{synthetics.attributes.variables.extracted.description}}`'
      test_type: Mobile
      category: Steps
      description: Step description

    # Mobile Test Specific
    - variable: '`{{synthetics.attributes.variables.extracted.application.versionId}}`'
      test_type: Mobile
      category: Application
      description: Mobile application version identifier
    - variable: '`{{synthetics.attributes.variables.extracted.apiTest}}`'
      test_type: Mobile
      category: API Test Steps
      description: API test data (for API test steps within mobile tests)

    # API Test - Multistep
    - variable: '`{{synthetics.attributes.variables.extracted.name}}`'
      test_type: API
      subtype: Multistep
      category: Steps
      description: Step name
    - variable: '`{{synthetics.attributes.variables.extracted.type}}`'
      test_type: API
      subtype: Multistep
      category: Steps
      description: Step type

    # API Test - HTTP
    - variable: '`{{synthetics.attributes.variables.extracted.assertions.actual}}`'
      test_type: API
      subtype: HTTP
      category: Assertions
      description: Actual value from assertion
    - variable: '`{{synthetics.attributes.variables.extracted.assertions.expected}}`'
      test_type: API
      subtype: HTTP
      category: Assertions
      description: Expected value for assertion
    - variable: '`{{synthetics.attributes.variables.extracted.assertions.operator}}`'
      test_type: API
      subtype: HTTP
      category: Assertions
      description: Assertion operator
    - variable: '`{{synthetics.attributes.variables.extracted.assertions.type}}`'
      test_type: API
      subtype: HTTP
      category: Assertions
      description: Assertion type
    - variable: '`{{synthetics.attributes.variables.extracted.dnsResolution.resolvedIp}}`'
      test_type: API
      subtype: HTTP
      category: DNS
      description: Resolved IP address
    - variable: '`{{synthetics.attributes.variables.extracted.dnsResolution.server}}`'
      test_type: API
      subtype: HTTP
      category: DNS
      description: DNS server used
    - variable: '`{{synthetics.attributes.variables.extracted.timings.dns}}`'
      test_type: API
      subtype: HTTP
      category: Timings
      description: DNS resolution time
    - variable: '`{{synthetics.attributes.variables.extracted.request.url}}`'
      test_type: API
      subtype: HTTP
      category: Request
      description: Request URL
    - variable: '`{{synthetics.attributes.variables.extracted.request.host}}`'
      test_type: API
      subtype: HTTP
      category: Request
      description: Request host
    - variable: '`{{synthetics.attributes.variables.extracted.request.host}}`'
      test_type: API
      subtype: ICMP
      category: Request
      description: Target host
    - variable: '`{{synthetics.attributes.variables.extracted.response.body}}`'
      test_type: API
      subtype: HTTP
      category: Response
      description: Response body content
    - variable: '`{{synthetics.attributes.variables.extracted.response.statusCode}}`'
      test_type: API
      subtype: HTTP
      category: Response
      description: HTTP status code
    - variable: '`{{synthetics.attributes.variables.extracted.response.headers}}`'
      test_type: API
      subtype: HTTP
      category: Response
      description: Response headers
    - variable: '`{{synthetics.attributes.variables.extracted.response.httpVersion}}`'
      test_type: API
      subtype: HTTP
      category: Response
      description: HTTP version
    - variable: '`{{synthetics.attributes.variables.extracted.response.redirects}}`'
      test_type: API
      subtype: HTTP
      category: Response
      description: Redirect information

    # WebSocket
    - variable: '`{{synthetics.attributes.variables.extracted.timings.open}}`'
      test_type: API
      subtype: WebSocket
      category: Timings
      description: Time to open connection (milliseconds)
    - variable: '`{{synthetics.attributes.variables.extracted.timings.receive}}`'
      test_type: API
      subtype: WebSocket
      category: Timings
      description: Time to receive response
    - variable: '`{{synthetics.attributes.variables.extracted.handshake.request}}`'
      test_type: API
      subtype: WebSocket
      category: Handshake
      description: Handshake request data
    - variable: '`{{synthetics.attributes.variables.extracted.handshake.response}}`'
      test_type: API
      subtype: WebSocket
      category: Handshake
      description: Handshake response data
    - variable: '`{{synthetics.attributes.variables.extracted.request.message}}`'
      test_type: API
      subtype: WebSocket
      category: Request
      description: Request message
    - variable: '`{{synthetics.attributes.variables.extracted.request.message}}`'
      test_type: API
      subtype: gRPC
      category: Request
      description: Request message
    - variable: '`{{synthetics.attributes.variables.extracted.request.message}}`'
      test_type: API
      subtype: UDP
      category: Request
      description: Request message
    - variable: '`{{synthetics.attributes.variables.extracted.response.message}}`'
      test_type: API
      subtype: WebSocket
      category: Response
      description: Response message
    - variable: '`{{synthetics.attributes.variables.extracted.response.message}}`'
      test_type: API
      subtype: gRPC
      category: Response
      description: Response message
    - variable: '`{{synthetics.attributes.variables.extracted.response.message}}`'
      test_type: API
      subtype: UDP
      category: Response
      description: Response message
    - variable: '`{{synthetics.attributes.variables.extracted.close.reason}}`'
      test_type: API
      subtype: WebSocket
      category: Connection
      description: Connection close reason
    - variable: '`{{synthetics.attributes.variables.extracted.close.statusCode}}`'
      test_type: API
      subtype: WebSocket
      category: Connection
      description: Connection close status code

    # gRPC
    - variable: '`{{synthetics.attributes.variables.extracted.callType}}`'
      test_type: API
      subtype: gRPC
      category: Request
      description: 'Call type (`unary` or `healthcheck`)'
    - variable: '`{{synthetics.attributes.variables.extracted.timings.rpc}}`'
      test_type: API
      subtype: gRPC
      category: Timings
      description: RPC call timing
    - variable: '`{{synthetics.attributes.variables.extracted.response.healthcheck.status}}`'
      test_type: API
      subtype: gRPC
      category: Response
      description: Health check status

    # UDP
    - variable: '`{{synthetics.attributes.variables.extracted.timings.message}}`'
      test_type: API
      subtype: UDP
      category: Timings
      description: Message timing

    # TCP
    - variable: '`{{synthetics.attributes.variables.extracted.connectionOutcome}}`'
      test_type: API
      subtype: TCP
      category: Connection
      description: Connection result
    - variable: '`{{synthetics.attributes.variables.extracted.netpath.routers.ip}}`'
      test_type: API
      subtype: TCP
      category: Network Path
      description: Router IP addresses
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.min}}`'
      test_type: API
      subtype: TCP
      category: Traceroute
      description: Minimum latency
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.min}}`'
      test_type: API
      subtype: ICMP
      category: Traceroute
      description: Minimum latency
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.max}}`'
      test_type: API
      subtype: TCP
      category: Traceroute
      description: Maximum latency
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.max}}`'
      test_type: API
      subtype: ICMP
      category: Traceroute
      description: Maximum latency
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.avg}}`'
      test_type: API
      subtype: TCP
      category: Traceroute
      description: Average latency
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.avg}}`'
      test_type: API
      subtype: ICMP
      category: Traceroute
      description: Average latency
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.stddev}}`'
      test_type: API
      subtype: TCP
      category: Traceroute
      description: Latency standard deviation
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.stddev}}`'
      test_type: API
      subtype: ICMP
      category: Traceroute
      description: Latency standard deviation
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.values}}`'
      test_type: API
      subtype: TCP
      category: Traceroute
      description: Latency values array
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute.latency.values}}`'
      test_type: API
      subtype: ICMP
      category: Traceroute
      description: Latency values array

    # ICMP
    - variable: '`{{synthetics.attributes.variables.extracted.traceroute}}`'
      test_type: API
      subtype: ICMP
      category: Traceroute
      description: Traceroute object (same structure as TCP)
    - variable: '`{{synthetics.attributes.variables.extracted.ping}}`'
      test_type: API
      subtype: ICMP
      category: Network
      description: Ping results
    - variable: '`{{synthetics.attributes.variables.extracted.latency.min}}`'
      test_type: API
      subtype: ICMP
      category: Latency
      description: Minimum latency
    - variable: '`{{synthetics.attributes.variables.extracted.latency.max}}`'
      test_type: API
      subtype: ICMP
      category: Latency
      description: Maximum latency
    - variable: '`{{synthetics.attributes.variables.extracted.latency.avg}}`'
      test_type: API
      subtype: ICMP
      category: Latency
      description: Average latency
    - variable: '`{{synthetics.attributes.variables.extracted.latency.stddev}}`'
      test_type: API
      subtype: ICMP
      category: Latency
      description: Latency standard deviation
    - variable: '`{{synthetics.attributes.variables.extracted.latency.values}}`'
      test_type: API
      subtype: ICMP
      category: Latency
      description: Latency values array

    # SSL
    - variable: '`{{synthetics.attributes.variables.extracted.cert}}`'
      test_type: API
      subtype: SSL
      category: Certificate
      description: SSL certificate information
    - variable: '`{{synthetics.attributes.variables.extracted.cipher}}`'
      test_type: API
      subtype: SSL
      category: Certificate
      description: Cipher suite used
    - variable: '`{{synthetics.attributes.variables.extracted.issuer}}`'
      test_type: API
      subtype: SSL
      category: Certificate
      description: Certificate issuer
    - variable: '`{{synthetics.attributes.variables.extracted.subject}}`'
      test_type: API
      subtype: SSL
      category: Certificate
      description: Certificate subject
    - variable: '`{{synthetics.attributes.variables.extracted.valid.from}}`'
      test_type: API
      subtype: SSL
      category: Certificate
      description: Certificate valid from date
    - variable: '`{{synthetics.attributes.variables.extracted.valid.to}}`'
      test_type: API
      subtype: SSL
      category: Certificate
      description: Certificate valid to date
    - variable: '`{{synthetics.attributes.variables.extracted.ocsp}}`'
      test_type: API
      subtype: SSL
      category: Certificate
      description: OCSP (Online Certificate Status Protocol) information
    - variable: '`{{synthetics.attributes.variables.extracted.timings.handshake}}`'
      test_type: API
      subtype: SSL
      category: Timings
      description: SSL handshake timing

    # DNS
    - variable: '`{{synthetics.attributes.variables.extracted.response.records.type}}`'
      test_type: API
      subtype: DNS
      category: DNS
      description: DNS record type
    - variable: '`{{synthetics.attributes.variables.extracted.response.records.values}}`'
      test_type: API
      subtype: DNS
      category: DNS
      description: DNS record values

---

## Overview

Template variables allow you to insert dynamic values from your test results and configuration into Synthetic Monitoring notification messages. These variables are accessed using the `synthetics.attributes` prefix. 

**Note:** Variable availability depends on the test type. To verify available data, export a test result as JSON from the **Actions** tab in the [Results Explorer][1]. Use this output to confirm the exact paths for your monitor configuration.

{{< img src="synthetics/notifications/action_tab.png" alt="Actions tab from the Synthetics Result Explorer with Export Result JSON highlighted" style="width:90%;" >}}

## Available variables

Use the filters below to find variables by test type or category. For API tests, use the **Subtype** filter to narrow down to specific protocols (HTTP, TCP, UDP, WebSocket, SSL, DNS, ICMP, gRPC, or Multistep). 

Replace `<index>` in step variables with a step number (0-based), step name in brackets, or step ID. See the [step reference](#step-reference-methods) section for more information.

{{< multifilter-search >}}

## Step reference methods

For tests with steps, you can reference steps in three ways:

### By index (0-based)

Use positive numbers to count from the beginning, or negative numbers to count from the end:

| Syntax | Description |
|--------|-------------|
| `synthetics.attributes.result.steps.0` | First step |
| `synthetics.attributes.result.steps.1` | Second step |
| `synthetics.attributes.result.steps.-1` | Last step |
| `synthetics.attributes.result.steps.-2` | Second to last step |

### By step name

Use the step name in brackets:

```shell
synthetics.attributes.result.steps[Click button].status
```

### By step ID

Use the step's unique identifier:

```shell
synthetics.attributes.result.steps.abc-def-ghi.status
```

## Examples

Combine any reference method with a property:

```shell
- {{synthetics.attributes.result.steps.-1.status}} - Status of the last step
- {{synthetics.attributes.result.steps[Click button].status}} - Status of step named "Click button"
- {{synthetics.attributes.result.steps.abc-def-ghi.status}} - Status of step with ID "abc-def-ghi"
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/explore/results_explorer
