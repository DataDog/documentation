---
title: Getting Started
disable_sidebar: true
aliases:
    - /overview
    - /getting_started/faq/
further_reading:
    - link: 'https://learn.datadoghq.com/'
      tag: 'Learning Center'
      text: 'Take a course to get started with Datadog'
    - link: 'https://datadoghq.com/blog/'
      tag: 'Blog'
      text: 'Learn about new Datadog products and features, integrations, and more'
cascade:
    algolia:
        rank: 50
        category: Getting Started
---

## What is Datadog?

Datadog is an observability platform that supports every phase of software development on any stack. The platform consists of many products that help you build, test, monitor, debug, optimize, and secure your software. These products can be used individually or combined into a customized solution.

The table below lists a few examples of Datadog products:

<table>
    <thead>
        <th>Category</th>
        <th>Product examples</th>
    </thead>
    <tr>
        <td><p><strong>Development</strong></p></td>
        <td>
        <ul>
        <li>Facilitate a remote pair-programming session with <a href="/coscreen/">CoScreen</a>.</li>
        <li>Highlight code vulnerabilities in your text editor or on GitHub with <a href="/code_analysis/?tab=codevulnerabilities">Code Analysis</a>.</li></ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Testing</strong></p></td>
        <td>
            <ul>
                <li>Block faulty code from deploying to production with <a href="/quality_gates/">Quality Gates</a>.</li>
                <li>Simulate users around the globe to test your web app, API, or mobile application with <a href="/synthetics/">Synthetic Monitoring</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Monitoring</strong></p></td>
        <td>
            <ul>
                <li>Ingest <a href="/logs/">logs</a>, <a href="/metrics/">metrics</a>, <a href="/events/">events</a>, and <a href="/tracing/glossary/#trace">network traces</a> with granular control over processing, aggregation, and <a href="/monitors/">alerting.</a></li>
                <li>Assess host performance with <a href="/profiler/">Continuous Profiler</a>.</li>
                <li>Assess application performance with <a href="/tracing/">Application Performance Monitoring</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Troubleshooting</strong></p></td>
        <td>
            <ul>
                <li>Manage <a href="/error_tracking/">errors</a> and <a href="/service_management/incident_management/">incidents</a>, summarizing issues and suggesting fixes.</li>
                <li>Measure user churn and detect user frustration with <a href="/real_user_monitoring/">Real User Monitoring</a>.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td><p><strong>Security</strong></p></td>
        <td>
            <ul>
                <li>Detect threats and attacks with <a href="/security/">Datadog Security</a>.</li>
            </ul>
        </td>
    </tr>
</table>

Additionally, hundreds of [integrations][1] allow you to layer Datadog features over the technologies you already use. For example, the [AWS integration][2] collects logs, events, and metrics from more than 90 AWS services.

## Learn more

### Take a course
The Datadog Learning Center offers hands-on experience with the Datadog platform. The [Getting Started courses][3] cover observability practices, key Datadog concepts, and more.

For the fastest introduction to navigating Datadog, try the [Quick Start course][4].

### Dive deeper into a product area
{{< whatsnext desc="Get started with one of the guides below:">}}
{{< nextlink href="/getting_started/application" >}}<u>Datadog</u>: Discover how to use the Datadog UI: Dashboards, infrastructure list, maps, and more.{{< /nextlink >}}
{{< nextlink href="/getting_started/site" >}}<u>Datadog Site</u>: Select the appropriate Datadog site for your region and security requirements.{{< /nextlink >}}
{{< nextlink href="/getting_started/devsecops" >}}<u>DevSecOps Bundles</u>: Get started with the APM DevSecOps and Infrastructure DevSecOps bundles.{{< /nextlink >}}
{{< nextlink href="/getting_started/agent" >}}<u>Agent</u>: Send metrics and events from your hosts to Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/api" >}}<u>API</u>: Get started with the Datadog HTTP API.{{< /nextlink >}}
{{< nextlink href="/getting_started/integrations" >}}<u>Integrations</u>: Learn how to collect metrics, traces, and logs with Datadog integrations.{{< /nextlink >}}
{{< nextlink href="/getting_started/tagging" >}}<u>Tags</u>: Start tagging your metrics, logs, and traces.{{< /nextlink >}}
{{< nextlink href="/getting_started/opentelemetry" >}}<u>OpenTelemetry</u>: Learn how to send OpenTelemetry metrics, traces, and logs to Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/learning_center" >}}<u>Learning Center</u>: Follow a learning path, take a self-guided class or lab, and explore the Datadog certification program.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Platform Services:">}}
{{< nextlink href="/getting_started/dashboards" >}}<u>Dashboards</u>: Create, share, and maintain dashboards that answer the work questions that matter to you.{{< /nextlink >}}
{{< nextlink href="/getting_started/monitors" >}}<u>Monitors</u>: Set up alerts and notifications so that your team knows when critical changes occur.{{< /nextlink >}}
{{< nextlink href="/getting_started/incident_management" >}}<u>Incident Management</u>: Communicate and track problems in your systems.{{< /nextlink >}}
{{< nextlink href="/getting_started/workflow_automation" >}}<u>Workflow Automation</u>: Automate end-to-end processes in response to alerts and security signals.{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Product:">}}
{{< nextlink href="/getting_started/containers" >}}<u>Containers</u>: Learn how to use Agent Autodiscovery and the Datadog operator.{{< /nextlink >}}
{{< nextlink href="/getting_started/serverless" >}}<u>Serverless for AWS Lambda</u>: Learn how to collect metrics, logs, and traces from your serverless infrastructure.{{< /nextlink >}}
{{< nextlink href="/getting_started/service_catalog" >}}<u>Service Catalog</u>: Manage service ownership, reliability, and performance at scale in Service Catalog. {{< /nextlink >}}
{{< nextlink href="/getting_started/tracing" >}}<u>Tracing</u>: Set up the Agent to trace a small application.{{< /nextlink >}}
{{< nextlink href="/getting_started/profiler" >}}<u>Profiler</u>: Use Continuous Profiler to find and fix performance problems in your code.{{< /nextlink >}}
{{< nextlink href="/getting_started/database_monitoring" >}}<u>Database Monitoring</u>: View the health and performance of databases, and quickly troubleshoot any issues that arise.{{< /nextlink >}}
{{< nextlink href="/getting_started/synthetics" >}}<u>Synthetic Monitoring</u>: Start testing and monitoring your API endpoints and key business journeys with Synthetic tests.{{< /nextlink >}}
{{< nextlink href="/getting_started/session_replay" >}}<u>Session Replay</u>: Get an in-depth look at how users are interacting with your product with Session Replays.{{< /nextlink >}}
{{< nextlink href="/getting_started/continuous_testing" >}}<u>Continuous Testing</u>: Run end-to-end Synthetic tests in your CI pipelines and IDEs.{{< /nextlink >}}
{{< nextlink href="/getting_started/application_security" >}}<u>Application Security Management</u>: Discover best practices for getting your team up and running with ASM.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_security_management" >}}<u>Cloud Security Management</u>: Discover best practices for getting your team up and running with CSM.{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_siem" >}}<u>Cloud SIEM</u>: Discover best practices for getting your team up and running with Cloud SIEM.{{< /nextlink >}}
{{< nextlink href="/getting_started/ci_visibility" >}}<u>CI Visibility</u>: Collect CI pipeline data by setting up integrations with your CI providers.{{< /nextlink >}}
{{< nextlink href="/getting_started/logs" >}}<u>Logs</u>: Send your first logs and use log processing to enrich them.{{< /nextlink >}}
{{< nextlink href="/getting_started/test_visibility" >}}<u>Test Visibility</u>: Collect CI test data by setting up test services in Datadog.{{< /nextlink >}}
{{< nextlink href="/getting_started/intelligent_test_runner" >}}<u>Intelligent Test Runner</u>: Optimize your test suite and reduce CI costs by only running tests that are relevant to your code changes.{{< /nextlink >}}
{{< nextlink href="/getting_started/Code Analysis" >}}<u>Code Analysis</u>: Analyze code in Datadog or code running in CI pipelines for poor practices and third-party libraries for vulnerabilities.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/integrations/
[2]: /integrations/amazon_web_services/
[3]: https://learn.datadoghq.com/collections/getting-started
[4]: https://learn.datadoghq.com/courses/course-quickstart