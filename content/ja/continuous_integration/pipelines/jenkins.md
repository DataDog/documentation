---
title: Set up Tracing on a Jenkins Pipeline
aliases:
  - /continuous_integration/setup_pipelines/jenkins
further_reading:
    - link: /continuous_integration/pipelines
      tag: Documentation
      text: Explore Pipeline Execution Results and Performance
    - link: /continuous_integration/pipelines/custom_commands/
      tag: Documentation
      text: Extend Pipeline Visibility by tracing individual commands
    - link: /continuous_integration/troubleshooting/
      tag: Documentation
      text: Troubleshooting CI Visibility
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Overview

[Jenkins][19] is an automation server with continuous integration and delivery features. With its plugin architecture, Jenkins can be customized to fit any CI/CD need and automates all aspects of project development, testing, and deployment.

Set up tracing in Jenkins to collect data across various stages of your pipeline executions, identify performance bottlenecks, resolve operational challenges, and refine your deployment processes.

### Compatibility

| Pipeline Visibility | Platform | Definition |
|---|---|---|
| [Manual steps][20] | Manual steps | View manually triggered pipelines. |
| [Queue time][21] | Queue time | View the amount of time pipeline jobs sit in the queue before processing. |
| Logs correlation | Logs correlation | Correlate pipeline spans to logs and enable [job log collection][10]. |
| Infrastructure metric correlation | Infrastructure metric correlation | Correlate jobs to [infrastructure host metrics][11] for Jenkins workers. |
| [Custom spans][26] | Custom spans | Configure custom spans for your pipelines. |
| Custom pre-defined tags | Custom pre-defined tags | Set [custom tags][12] to all generated pipeline, stages, and job spans. |
| [Custom tags][22] [and measures at runtime][23] | Custom tags and measures at runtime | Configure [custom tags and measures][12] at runtime. |
| [Parameters][24] | Parameters | Set custom parameters (such as the default branch name or Git information) when a pipeline is triggered. |
| [Pipeline failure reasons][25] | Pipeline failure reasons | Identify pipeline failure reasons from error messages. |

The following Jenkins versions are supported:

- Jenkins >= 2.346.1

This integration supports both [Agentless](#install-the-datadog-jenkins-plugin-agentless) and [Agent-based](#install-the-datadog-agent) installation. For infrastructure metric correlation, installing with the Agent-based mode is recommended.

## Install the Datadog Jenkins plugin (agentless)

Install and enable the [Datadog Jenkins plugin][3] v3.3.0 or later:

1. In your Jenkins instance web interface, go to **Manage Jenkins > Manage Plugins**.
2. In the [Update Center][4] on the **Available** tab, search for `Datadog Plugin`.
3. Select the checkbox next to the plugin, and install using one of the two install buttons at the bottom of the screen.
4. To verify that the plugin is installed, search for `Datadog Plugin` on the **Installed** tab.

### Enable CI Visibility on the plugin

There are several ways you can configure the Datadog Jenkins plugin.

#### Configure with the Jenkins configuration UI

{{< tabs >}}
{{% tab "Agentless (using an API key)" %}}

Use this option to make the Jenkins plugin report directly to Datadog without using the Datadog Agent. It requires an API Key.

1. In your Jenkins instance web interface, go to **Manage Jenkins > Configure System**.
2. Go to the `Datadog Plugin` section, scrolling down the configuration screen.
3. Select the mode `Use Datadog API URL and Key to report to Datadog`.
4. For Datadog sites other that `datadoghq.com`, change the `Datadog API URL`, `Log Intake URL`, and `Webhook Intake URL` to point to your Datadog site.
5. Enter a valid `Datadog API Key`.
6. Mark the `Enable CI Visibility` checkbox.
7. (Optional) Configure your CI Instance name.
8. Save your configuration.

{{< img src="ci/jenkins_plugin_agentless_urls_blurred.png" alt="Datadog Plugin configuration for Jenkins" style="width:100%;">}}
{{% /tab %}}
{{% tab "Report through the Datadog Agent - recommended" %}}

1. In your Jenkins instance web interface, go to **Manage Jenkins > Configure System**.
2. Go to the `Datadog Plugin` section, scrolling down the configuration screen.
3. Select the mode `Use the Datadog Agent to report to Datadog`.
4. Configure the `Agent` host.
5. Configure the `Traces Collection Port` if not using the default port `8126`.
6. Mark the `Enable CI Visibility` checkbox.
7. (Optional) Configure your CI Instance name.
8. Check the connectivity with the Datadog Agent.
9. Save your configuration.

{{< img src="ci/ci-jenkins-plugin-config-agentful.png" alt="Datadog Plugin configuration for Jenkins" style="width:100%;">}}
{{% /tab %}}
{{< /tabs >}}

#### Configuration-as-code

{{< tabs >}}

{{% tab "Agentless (using an API key)" %}}

If your Jenkins instance uses the Jenkins [`configuration-as-code`][1] plugin:

1. Create or modify the configuration YAML by adding an entry for `datadogGlobalConfiguration`:

    {{% site-region region="us" %}}
    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
    unclassified:
        datadogGlobalConfiguration:
            # Select the `Agentless` mode (HTTP).
            reportWith: "HTTP"
            # Update the endpoints if reporting to Datadog sites other that `datadoghq.com`
            targetApiURL: "https://api.datadoghq.com/api/"
            targetLogIntakeURL: "https://http-intake.logs.datadoghq.com/v1/input/"
            targetWebhookIntakeURL: "https://webhook-intake.datadoghq.com/api/v2/webhook/"
            # Configure your API key
            targetCredentialsApiKey: "<your-api-key>"
            # (Optional) Configure your CI Instance name
            ciInstanceName: "jenkins"
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="eu" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
    unclassified:
        datadogGlobalConfiguration:
            # Select the `Agentless` mode (HTTP).
            reportWith: "HTTP"
            # Update the endpoints if reporting to Datadog sites other that `datadoghq.com`
            targetApiURL: "https://api.datadoghq.eu/api/"
            targetLogIntakeURL: "https://http-intake.logs.datadoghq.eu/v1/input/"
            targetWebhookIntakeURL: "https://webhook-intake.datadoghq.eu/api/v2/webhook/"
            # Configure your API key
            targetCredentialsApiKey: "<your-api-key>"
            # (Optional) Configure your CI Instance name
            ciInstanceName: "jenkins"
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="gov" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
    unclassified:
        datadogGlobalConfiguration:
            # Select the `Agentless` mode (HTTP).
            reportWith: "HTTP"
            # Update the endpoints if reporting to Datadog sites other that `datadoghq.com`
            targetApiURL: "https://api.dd-gov.com/api/"
            targetLogIntakeURL: "https://http-intake.logs.dd-gov.com/v1/input/"
            targetWebhookIntakeURL: "https://webhook-intake.dd-gov.com/api/v2/webhook/"
            # Configure your API key
            targetCredentialsApiKey: "<your-api-key>"
            # (Optional) Configure your CI Instance name
            ciInstanceName: "jenkins"
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us3" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
    unclassified:
        datadogGlobalConfiguration:
            # Select the `Agentless` mode (HTTP).
            reportWith: "HTTP"
            # Update the endpoints if reporting to Datadog sites other that `datadoghq.com`
            targetApiURL: "https://api.us3.datadoghq.com/api/"
            targetLogIntakeURL: "https://http-intake.logs.us3.datadoghq.com/v1/input/"
            targetWebhookIntakeURL: "https://webhook-intake.us3.datadoghq.com/api/v2/webhook/"
            # Configure your API key
            targetCredentialsApiKey: "<your-api-key>"
            # (Optional) Configure your CI Instance name
            ciInstanceName: "jenkins"
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us5" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
    unclassified:
        datadogGlobalConfiguration:
            # Select the `Agentless` mode (HTTP).
            reportWith: "HTTP"
            # Update the endpoints if reporting to Datadog sites other that `datadoghq.com`
            targetApiURL: "https://api.us5.datadoghq.com/api/"
            targetLogIntakeURL: "https://http-intake.logs.us5.datadoghq.com/v1/input/"
            targetWebhookIntakeURL: "https://webhook-intake.us5.datadoghq.com/api/v2/webhook/"
            # Configure your API key
            targetCredentialsApiKey: "<your-api-key>"
            # (Optional) Configure your CI Instance name
            ciInstanceName: "jenkins"
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="ap1" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
    unclassified:
        datadogGlobalConfiguration:
            # Select the `Agentless` mode (HTTP).
            reportWith: "HTTP"
            # Update the endpoints if reporting to Datadog sites other that `datadoghq.com`
            targetApiURL: "https://api.ap1.datadoghq.com/api/"
            targetLogIntakeURL: "https://http-intake.logs.ap1.datadoghq.com/v1/input/"
            targetWebhookIntakeURL: "https://webhook-intake.ap1.datadoghq.com/api/v2/webhook/"
            # Configure your API key
            targetCredentialsApiKey: "<your-api-key>"
            # (Optional) Configure your CI Instance name
            ciInstanceName: "jenkins"
    {{< /code-block >}}
    {{% /site-region %}}

2. In your Jenkins instance web interface, go to **Manage Jenkins > Configuration as Code**.
3. Apply or reload the configuration.
4. Check the configuration using the `View Configuration` button.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md
{{% /tab %}}
{{% tab "Report through the Datadog Agent - recommended" %}}

If your Jenkins instance uses the Jenkins [`configuration-as-code`][1] plugin:

1. Create or modify the configuration YAML by adding an entry for `datadogGlobalConfiguration`:

    ```yaml
    unclassified:
        datadogGlobalConfiguration:
            # Select the `Datadog Agent` mode (DSD).
            reportWith: "DSD"
            # Configure the `Agent` host
            targetHost: "<your-agent-host>"
            # Configure the `Traces Collection` port
            targetTraceCollectionPort: 8126
            # Enable CI Visibility flag
            enableCiVisibility: true
            # (Optional) Configure your CI Instance name
            ciInstanceName: "jenkins"
    ```

2. In your Jenkins instance web interface, go to **Manage Jenkins > Configuration as Code**.
3. Apply or reload the configuration.
4. Check the configuration using the `View Configuration` button.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md

{{% /tab %}}
{{< /tabs >}}

#### Configure with Groovy

{{< tabs >}}
{{% tab "Agentless (using an API key)" %}}

1. In your Jenkins instance web interface, go to **Manage Jenkins > Script Console**.
2. Run the configuration script:

    {{% site-region region="us" %}}
    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Select the Datadog Agent mode
    d.setReportWith('HTTP')

    // Endpoint URLs correspond to your Datadog site
    d.setTargetApiURL("https://api.datadoghq.com/api/")
    d.setTargetLogIntakeURL("https://http-intake.logs.datadoghq.com/v1/input/")
    d.setTargetWebhookIntakeURL("https://webhook-intake.datadoghq.com/api/v2/webhook/")

    // Configure your API key
    d.setTargetApiKey("your-api-key")

    // Enable CI Visibility
    d.setEnableCiVisibility(true)

    // (Optional) Configure your CI Instance name
    d.setCiInstanceName("jenkins")

    // Save config
    d.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="eu" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Select the Datadog Agent mode
    d.setReportWith('HTTP')

    // Endpoint URLs correspond to your Datadog site
    d.setTargetApiURL("https://api.ap1.datadoghq.eu/api/")
    d.setTargetLogIntakeURL("https://http-intake.logs.ap1.datadoghq.eu/v1/input/")
    d.setTargetWebhookIntakeURL("https://webhook-intake.ap1.datadoghq.eu/api/v2/webhook/")

    // Configure your API key
    d.setTargetApiKey("your-api-key")

    // Enable CI Visibility
    d.setEnableCiVisibility(true)

    // (Optional) Configure your CI Instance name
    d.setCiInstanceName("jenkins")

    // Save config
    d.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="gov" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Select the Datadog Agent mode
    d.setReportWith('HTTP')

    // Endpoint URLs correspond to your Datadog site
    d.setTargetApiURL("https://api.dd-gov.com/api/")
    d.setTargetLogIntakeURL("https://http-intake.logs.dd-gov.com/v1/input/")
    d.setTargetWebhookIntakeURL("https://webhook-intake.dd-gov.com/api/v2/webhook/")

    // Configure your API key
    d.setTargetApiKey("your-api-key")

    // Enable CI Visibility
    d.setEnableCiVisibility(true)

    // (Optional) Configure your CI Instance name
    d.setCiInstanceName("jenkins")

    // Save config
    d.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us3" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Select the Datadog Agent mode
    d.setReportWith('HTTP')

    // Endpoint URLs correspond to your Datadog site
    d.setTargetApiURL("https://api.us3.datadoghq.com/api/")
    d.setTargetLogIntakeURL("https://http-intake.logs.us3.datadoghq.com/v1/input/")
    d.setTargetWebhookIntakeURL("https://webhook-intake.us3.datadoghq.com/api/v2/webhook/")

    // Configure your API key
    d.setTargetApiKey("your-api-key")

    // Enable CI Visibility
    d.setEnableCiVisibility(true)

    // (Optional) Configure your CI Instance name
    d.setCiInstanceName("jenkins")

    // Save config
    d.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us5" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Select the Datadog Agent mode
    d.setReportWith('HTTP')

    // Endpoint URLs correspond to your Datadog site
    d.setTargetApiURL("https://api.us5.datadoghq.com/api/")
    d.setTargetLogIntakeURL("https://http-intake.logs.us5.datadoghq.com/v1/input/")
    d.setTargetWebhookIntakeURL("https://webhook-intake.us5.datadoghq.com/api/v2/webhook/")

    // Configure your API key
    d.setTargetApiKey("your-api-key")

    // Enable CI Visibility
    d.setEnableCiVisibility(true)

    // (Optional) Configure your CI Instance name
    d.setCiInstanceName("jenkins")

    // Save config
    d.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="ap1" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Select the Datadog Agent mode
    d.setReportWith('HTTP')

    // Endpoint URLs correspond to your Datadog site
    d.setTargetApiURL("https://api.ap1.datadoghq.com/api/")
    d.setTargetLogIntakeURL("https://http-intake.logs.ap1.datadoghq.com/v1/input/")
    d.setTargetWebhookIntakeURL("https://webhook-intake.ap1.datadoghq.com/api/v2/webhook/")

    // Configure your API key
    d.setTargetApiKey("your-api-key")

    // Enable CI Visibility
    d.setEnableCiVisibility(true)

    // (Optional) Configure your CI Instance name
    d.setCiInstanceName("jenkins")

    // Save config
    d.save()
    {{< /code-block >}}

    {{% /site-region %}}

{{% /tab %}}
{{% tab "Report through the Datadog Agent - recommended" %}}

1. In your Jenkins instance web interface, go to **Manage Jenkins > Script Console**.
2. Run the configuration script:

    ```groovy
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Select the Datadog Agent mode
    d.setReportWith('DSD')

    // Configure the Agent host.
    d.setTargetHost('<your-agent-host>')

    // Configure the Traces Collection port (default 8126)
    d.setTargetTraceCollectionPort(8126)

    // Enable CI Visibility
    d.setEnableCiVisibility(true)

    // (Optional) Configure your CI Instance name
    d.setCiInstanceName("jenkins")

    // Save config
    d.save()
    ```

{{% /tab %}}
{{< /tabs >}}

#### Use environment variables

{{< tabs >}}
{{% tab "Agentless (using an API key)" %}}

1. Set the following environment variables on your Jenkins instance machine:

    {{% site-region region="us" %}}
    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Endpoint URLs correspond to your Datadog site
    DATADOG_JENKINS_PLUGIN_TARGET_API_URL="https://api.datadoghq.com/api/"
    DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.datadoghq.com/v1/input/"
    DATADOG_JENKINS_TARGET_WEBHOOK_INTAKE_URL="https://webhook-intake.datadoghq.com/api/v2/webhook/"

    # Configure your API key
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins
    {{< /code-block >}}

    {{% /site-region %}}

    {{% site-region region="eu" %}}
    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Endpoint URLs correspond to your Datadog site
    DATADOG_JENKINS_PLUGIN_TARGET_API_URL="https://api.datadoghq.eu/api/"
    DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.datadoghq.eu/v1/input/"
    DATADOG_JENKINS_TARGET_WEBHOOK_INTAKE_URL="https://webhook-intake.datadoghq.eu/api/v2/webhook/"

    # Configure your API key
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="gov" %}}

    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Endpoint URLs correspond to your Datadog site
    DATADOG_JENKINS_PLUGIN_TARGET_API_URL="https://api.dd-gov.com/api/"
    DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.dd-gov.com/v1/input/"
    DATADOG_JENKINS_TARGET_WEBHOOK_INTAKE_URL="https://webhook-intake.dd-gov.com/api/v2/webhook/"

    # Configure your API key
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us3" %}}

    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Endpoint URLs correspond to your Datadog site
    DATADOG_JENKINS_PLUGIN_TARGET_API_URL="https://api.us3.datadoghq.com/api/"
    DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.us3.datadoghq.com/v1/input/"
    DATADOG_JENKINS_TARGET_WEBHOOK_INTAKE_URL="https://webhook-intake.us3.datadoghq.com/api/v2/webhook/"

    # Configure your API key
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us5" %}}

    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Endpoint URLs correspond to your Datadog site
    DATADOG_JENKINS_PLUGIN_TARGET_API_URL="https://api.us5.datadoghq.com/api/"
    DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.us5.datadoghq.com/v1/input/"
    DATADOG_JENKINS_TARGET_WEBHOOK_INTAKE_URL="https://webhook-intake.us5.datadoghq.com/api/v2/webhook/"

    # Configure your API key
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="ap1" %}}

    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Endpoint URLs correspond to your Datadog site
    DATADOG_JENKINS_PLUGIN_TARGET_API_URL="https://api.ap1.datadoghq.com/api/"
    DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.ap1.datadoghq.com/v1/input/"
    DATADOG_JENKINS_TARGET_WEBHOOK_INTAKE_URL="https://webhook-intake.ap1.datadoghq.com/api/v2/webhook/"

    # Configure your API key
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins
    {{< /code-block >}}
    {{% /site-region %}}

2. Restart your Jenkins instance.
{{% /tab %}}
{{% tab "Report through the Datadog Agent - recommended" %}}

1. Set the following environment variables on your Jenkins instance machine:

    ```bash
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=DSD

    # Configure the Agent host
    DATADOG_JENKINS_PLUGIN_TARGET_HOST=your-agent-host

    # Configure the Traces Collection port (default 8126)
    DATADOG_JENKINS_PLUGIN_TARGET_TRACE_COLLECTION_PORT=8126

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins
    ```

2. Restart your Jenkins instance.

{{% /tab %}}
{{< /tabs >}}

### Validate the configuration

To verify that CI Visibility is enabled, go to `Jenkins Log` and search for:

{{< code-block lang="text" >}}
Re/Initialize Datadog-Plugin Agent Http Client
TRACE -> http://<HOST>:<TRACE_PORT>/v0.3/traces
{{< /code-block >}}

## Install the Datadog Agent

The Datadog Jenkins plugin can either report metrics through the Datadog Agent or directly to Datadog if an API key is provided. If you don't have a Datadog Agent running on the Jenkins controller instance, Datadog recommends installing it first by following the [Agent installation instructions][14]. Whether you choose to use Agentless mode or the Agent-based mode, you are **required** to use the plugin.

If the Jenkins controller and the Datadog Agent have been deployed to a Kubernetes cluster, Datadog recommends using the [Admission Controller][2], which automatically sets the `DD_AGENT_HOST` environment variable in the Jenkins controller pod to communicate with the local Datadog Agent.

<div class="alert alert-info"><strong>Note</strong>: Sending CI Visibility traces through UNIX domain sockets is not supported.</div>

### Configure the Agent for log collection

To enable [collecting logs from your jobs](#enable-job-log-collection), configure the Datadog Agent to listen for logs on a TCP port:

{{< tabs >}}
{{% tab "Linux" %}}
1. Add `logs_enabled: true` to your Agent's `datadog.yaml` configuration file, or set the `DD_LOGS_ENABLED` environment variable to true.

2. Create a file at `/etc/datadog-agent/conf.d/jenkins.d/conf.yaml` with the following. Ensure the `service` matches the CI instance name provided earlier.

   ```yaml
   logs:
   - type: tcp
     port: 10518
     service: my-jenkins-instance
     source: jenkins
   ```

3. [Restart the Agent][101] for the changes to take effect.

[101]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
{{% /tab %}}

{{% tab "Windows" %}}
1. Add `logs_enabled: true` to your Agent's `datadog.yaml`  configuration file, or set the `DD_LOGS_ENABLED` environment variable to true.

2. Create a file at `%ProgramData%\Datadog\conf.d\jenkins.d\conf.yaml` with the following. Ensure the `service` matches the CI instance name provided earlier.

   ```yaml
   logs:
   - type: tcp
     port: 10518
     service: my-jenkins-instance
     source: jenkins
   ```

3. [Restart the Agent][101] for the changes to take effect.

[101]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
{{% /tab %}}

{{% tab "macOS" %}}
1. Add `logs_enabled: true` to your Agent's `datadog.yaml` configuration file, or set the `DD_LOGS_ENABLED` environment variable to true.

2. Create a file at `~/.datadog-agent/conf.d/jenkins.d/conf.yaml` with the following contents. Ensure the `service` matches the CI instance name provided earlier.

   ```yaml
   logs:
   - type: tcp
     port: 10518
     service: my-jenkins-instance
     source: jenkins
   ```

3. [Restart the Agent][101] for the changes to take effect.

[101]: /agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
{{% /tab %}}

{{< /tabs >}}

With this configuration, the Agent listens for logs on port `10518`.

<div class="alert alert-info"><strong>Note</strong>: Logs are billed separately from CI Visibility. Log retention, exclusion, and indexes are configured in Logs Settings. Logs for Jenkins jobs can be identified by the <code>source:jenkins</code> tag.</div>

### Correlate infrastructure metrics

If you are using Jenkins workers, you can correlate pipelines with the infrastructure that is running them. For this feature to work:

1. Install the [Datadog Agent][1] in every Jenkins worker.
2. Set and export a new environment variable called `DD_CI_HOSTNAME` in every Jenkins worker with the worker hostname.
  * It must be the same hostname that the Datadog Agent is reporting in the infrastructure metrics for that worker.
  * You can use fixed values or other environment variables as valid values.

```bash
export DD_CI_HOSTNAME=my-hostname
```

If you are using Kubernetes to manage your Jenkins instances, add the `DD_CI_HOSTNAME` environment variable to the [pod that executes the Jenkins job][9]. The value of this environment variable depends on what you are using in your Datadog Agent daemonset when reporting the infrastructure metrics.

This is only required for Jenkins workers. For the Jenkins controller, the infrastructure metric correlation does not require additional actions.

**Note**: Infrastructure metric correlation is supported since Jenkins Plugin v5.0.0+

## Enable job log collection

This is an optional step that enables the collection of job logs. Both Agentless and Agent-based options are supported.

### Enable with the Jenkins configuration UI

{{< tabs >}}

{{% tab "Agentless (using an API key)" %}}

1. In the web interface of your Jenkins instance, go to **Manage Jenkins > Configure System**.
2. Go to the `Datadog Plugin` section, scrolling down the configuration screen.
3. Double check that `Use the Datadog Agent to report to Datadog` is selected and that `Log Intake URL` points to a URL in your current Datadog site.
4. Click on the `Enable Log Collection` checkbox to activate it.
5. Save your configuration.

{{% /tab %}}

{{% tab "Report through the Datadog Agent - recommended" %}}

1. In the web interface of your Jenkins instance, go to **Manage Jenkins > Configure System**.
2. Go to the `Datadog Plugin` section, scrolling down the configuration screen.
3. Double check that the `Use the Datadog Agent to report to Datadog` option is selected.
4. Configure the `Log Collection` port, as configured in the Datadog Agent.
5. Click on the `Enable Log Collection` checkbox to activate it.
6. Check the connectivity with the Datadog Agent.
7. Save your configuration.
{{% /tab %}}

{{< /tabs >}}

### Enable with configuration-as-code

{{< tabs >}}

{{% tab "Agentless (using an API key)" %}}

If your Jenkins instance uses the Jenkins [`configuration-as-code`][1] plugin:

1. Modify the configuration YAML for the entry `datadogGlobalConfiguration` to include the following:

    {{% site-region region="us" %}}
    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
    unclassified:
    datadogGlobalConfiguration:
        # Endpoint URLs correspond to your Datadog site
        targetLogIntakeURL: "https://http-intake.logs.datadoghq.com/v1/input/"
        # Enable Log collection
        collectBuildLogs: true
    {{< /code-block >}}

    {{% /site-region %}}

    {{% site-region region="eu" %}}
    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
    unclassified:
    datadogGlobalConfiguration:
        # Endpoint URLs correspond to your Datadog site
        targetLogIntakeURL: "https://http-intake.logs.datadoghq.eu/v1/input/"
        # Enable Log collection
        collectBuildLogs: true
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="gov" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
    unclassified:
    datadogGlobalConfiguration:
        # Endpoint URLs correspond to your Datadog site
        targetLogIntakeURL: "https://http-intake.logs.dd-gov.com/v1/input/"
        # Enable Log collection
        collectBuildLogs: true
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us3" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
    unclassified:
    datadogGlobalConfiguration:
        # Endpoint URLs correspond to your Datadog site
        targetLogIntakeURL: "https://http-intake.logs.us3.datadoghq.com/v1/input/"
        # Enable Log collection
        collectBuildLogs: true
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us5" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
    unclassified:
    datadogGlobalConfiguration:
        # Endpoint URLs correspond to your Datadog site
        targetLogIntakeURL: "https://http-intake.logs.us5.datadoghq.com/v1/input/"
        # Enable Log collection
        collectBuildLogs: true
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="ap1" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
    unclassified:
    datadogGlobalConfiguration:
        # Endpoint URLs correspond to your Datadog site
        targetLogIntakeURL: "https://http-intake.logs.ap1.datadoghq.com/v1/input/"
        # Enable Log collection
        collectBuildLogs: true
    {{< /code-block >}}
    {{% /site-region %}}

2. In your Jenkins instance web interface, go to **Manage Jenkins > Configuration as Code**.
3. Apply or reload the configuration.
4. Check the configuration using the `View Configuration` button.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md
{{% /tab %}}

{{% tab "Report through the Datadog Agent - recommended" %}}

If your Jenkins instance uses the Jenkins [`configuration-as-code`][1] plugin:

1. Modify the configuration YAML for the entry `datadogGlobalConfiguration` to include the following:
    ```yaml
    unclassified:
    datadogGlobalConfiguration:
        # Configure the `Log Collection` port, as configured in the Datadog Agent,
        targetLogCollectionPort: 10518
        # Enable Log collection
        collectBuildLogs: true
    ```
2. In your Jenkins instance web interface, go to **Manage Jenkins > Configuration as Code**.
3. Apply or reload the configuration.
4. Check the configuration using the `View Configuration` button.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md
{{% /tab %}}

{{< /tabs >}}

### Enable with Groovy

{{< tabs >}}

{{% tab "Agentless (using an API key)" %}}

1. In your Jenkins instance web interface, go to **Manage Jenkins > Script Console**.
2. Update your configuration script to include the following:
    {{% site-region region="us" %}}
    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Endpoint URLs correspond to your Datadog site
    d.setTargetLogIntakeURL("https://http-intake.logs.datadoghq.com/v1/input/")

    // Enable log collection
    d.setCollectBuildLogs(true)

    // Save config
    d.save()
    {{< /code-block >}}

    {{% /site-region %}}

    {{% site-region region="eu" %}}
    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Endpoint URLs correspond to your Datadog site
    d.setTargetLogIntakeURL("https://http-intake.logs.datadoghq.eu/v1/input/")

    // Enable log collection
    d.setCollectBuildLogs(true)

    // Save config
    d.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us3" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Endpoint URLs correspond to your Datadog site
    d.setTargetLogIntakeURL("https://http-intake.logs.us3.datadoghq.com/v1/input/")

    // Enable log collection
    d.setCollectBuildLogs(true)

    // Save config
    d.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us5" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Endpoint URLs correspond to your Datadog site
    d.setTargetLogIntakeURL("https://http-intake.logs.us5.datadoghq.com/v1/input/")

    // Enable log collection
    d.setCollectBuildLogs(true)

    // Save config
    d.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="gov" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Endpoint URLs correspond to your Datadog site
    d.setTargetLogIntakeURL("https://http-intake.logs.dd-gov.com/v1/input/")

    // Enable log collection
    d.setCollectBuildLogs(true)

    // Save config
    d.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="ap1" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Endpoint URLs correspond to your Datadog site
    d.setTargetLogIntakeURL("https://http-intake.logs.ap1.datadoghq.com/v1/input/")

    // Enable log collection
    d.setCollectBuildLogs(true)

    // Save config
    d.save()
    {{< /code-block >}}
    {{% /site-region %}}
{{% /tab %}}

{{% tab "Report through the Datadog Agent - recommended" %}}

1. In your Jenkins instance web interface, go to **Manage Jenkins > Script Console**.
2. Update your configuration script to include the following:
    ```groovy
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Configure the Log Collection port, as configured in the Datadog Agent.
    d.setTargetLogCollectionPort(10518)

    // Enable log collection
    d.setCollectBuildLogs(true)

    // Save config
    d.save()
    ```
{{% /tab %}}

{{< /tabs >}}

### Use environment variables

{{< tabs >}}

{{% tab "Agentless (using an API key)" %}}

1. Add the following environment variables on your Jenkins instance machine:

   {{% site-region region="us" %}}
   {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
   # Endpoint URLs correspond to your Datadog site
   DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.datadoghq.com/v1/input/"

   # Enable log collection
   DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
   {{< /code-block >}}

   {{% /site-region %}}

   {{% site-region region="eu" %}}
   {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
   # Endpoint URLs correspond to your Datadog site
   DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.datadoghq.eu/v1/input/"

   # Enable log collection
   DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
   {{< /code-block >}}

   {{% /site-region %}}
   {{% site-region region="us3" %}}

   {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
   # Endpoint URLs correspond to your Datadog site
   DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.us3.datadoghq.com/v1/input/"

   # Enable log collection
   DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
   {{< /code-block >}}

   {{% /site-region %}}
   {{% site-region region="us5" %}}

   {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
   # Endpoint URLs correspond to your Datadog site
   DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.us5.datadoghq.com/v1/input/"

   # Enable log collection
   DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
   {{< /code-block >}}

   {{% /site-region %}}
   {{% site-region region="gov" %}}

   {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
   # Endpoint URLs correspond to your Datadog site
   DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.dd-gov.com/v1/input/"

   # Enable log collection
   DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
   {{< /code-block >}}

   {{% /site-region %}}
   {{% site-region region="ap1" %}}

   {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
   # Endpoint URLs correspond to your Datadog site
   DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.ap1.datadoghq.com/v1/input/"

   # Enable log collection
   DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
   {{< /code-block >}}
   {{% /site-region %}}

2. Restart your Jenkins instance.

{{% /tab %}}

{{% tab "Report through the Datadog Agent - recommended" %}}

1. Add the following environment variables on your Jenkins instance machine:
    ```bash
    # Configure the Log Collection port, as configured in the previous step.
    DATADOG_JENKINS_PLUGIN_TARGET_LOG_COLLECTION_PORT=10518

    # Enable log collection
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
    ```
2. Restart your Jenkins instance.
{{% /tab %}}

{{< /tabs >}}

## Enable Test Visibility

This is an optional step that enables the collection of tests data using [Test Visibility][16].

See the [Test Visibility documentation][17] for your language to make sure that the testing framework that you use is supported.

There are different ways to enable Test Visibility inside a Jenkins job or pipeline:
1. Using the Jenkins configuration UI.
2. Adding the `datadog` step inside the pipeline script.
3. Configuring the tracer manually.

For pipelines that spin up a Docker container to execute tests, you can only configure the tracer manually.

### Enable with the Jenkins configuration UI

UI-based Test Visibility configuration is available in Datadog Jenkins plugin v5.6.0 or later.

This option is not suitable for pipelines that are configured entirely in `Jenkinsfile` (for example, Multibranch pipelines or pipelines from Organization Folder).
For these pipelines use declarative configuration with the `datadog` step (described in the next section).

To enable Test Visibility via UI do the following:
1. In your Jenkins instance web interface, go to the job or pipeline that you want to instrument and choose the **Configure** option.
2. In the **General** configuration section, tick the **Enable Datadog Test Visibility** checkbox.
3. Enter the name of the service or library being tested into the **Service Name** input. You can choose any value that makes sense to you.
4. Choose the languages for which you want to enable tests instrumentation. Some of the languages do not support configuration through the UI. To configure Test Visibility for these languages, follow the manual [configuration instructions][18].
5. Optionally, provide [additional configuration settings][18].
6. Click **Save**.

{{< img src="ci/ci-jenkins-plugin-tests-config.png" alt="Datadog Test Visibility configuration for Jenkins" style="width:100%;">}}

### Enable with the `datadog` pipeline step

This configuration option is available in Datadog Jenkins plugin v5.6.2 or later.

In declarative pipelines, add the step to a top-level `options` block like so:

```groovy
pipeline {
    agent any
    options {
        datadog(testVisibility: [
            enabled: true,
            serviceName: "my-service", // the name of service or library being tested
            languages: ["JAVA"], // languages that should be instrumented (available options are "JAVA", "JAVASCRIPT", "PYTHON", "DOTNET")
            additionalVariables: ["my-var": "value"]  // additional tracer configuration settings (optional)
        ])
    }
    stages {
        stage('Example') {
            steps {
                echo "Hello world."
            }
        }
    }
}
```

In a scripted pipeline, wrap the relevant section with the `datadog` step like so:

```groovy
datadog(testVisibility: [ enabled: true, serviceName: "my-service", languages: ["JAVASCRIPT"], additionalVariables: [:] ]) {
  node {
    stage('Example') {
      echo "Hello world."
    }
  }
}
```

The other `datadog` settings, such as `collectLogs` or `tags` can be added alongside the `testVisibility` block.

### Enable with manual tracer configuration

Follow the manual Test Visibility [configuration instructions][17] that are specific to your language.

## Set the default branch name

To report pipeline results, attach the default branch name (for example, `main`) to pipeline spans in an attribute called `git.default_branch`. This is usually done automatically, but in some cases the plugin cannot extract this information because it might not be provided by Jenkins.

If this happens, set the default branch manually using the `DD_GIT_DEFAULT_BRANCH` environment variable in your build. For example:

{{< code-block lang="groovy" >}}
pipeline {
    agent any
    environment {
        DD_GIT_DEFAULT_BRANCH = 'main'
        ...
    }
    stages {
        ...
    }
}
{{< /code-block >}}

## Propagate Git information

Some features of the Datadog Jenkins plugin need Git information associated with the Jenkins builds to work correctly.
The minimum required Git info for a build is repository URL, branch, commit SHA, and commit author email.
This information can be determined by the plugin automatically, propagated from SCM, provided manually with environment variables, or obtained by combining these approaches.

### Propagate Git information from SCM

The Jenkins plugin is capable of automatically detecting Git information associated with a build or a pipeline.
However, depending on the Jenkins version and the pipeline details, there may be cases when automatic Git data detection is not possible.

In this case you can make the Git information available to the plugin by using the `.each {k,v -> env.setProperty(k, v)}` function after executing the `checkout` or `git` steps. For example:

{{< tabs >}}
{{% tab "Using Declarative Pipelines" %}}
If you're using a declarative pipeline to configure your pipeline, propagate Git information using a `script` block as follows:

Using the `checkout` step:
{{< code-block lang="groovy" >}}
pipeline {
  stages {
    stage('Checkout') {
        script {
          checkout(...).each {k,v -> env.setProperty(k,v)}
        }
    }
    ...
  }
}
{{< /code-block >}}

Using the `git` step:
{{< code-block lang="groovy" >}}
pipeline {
  stages {
    stage('Checkout') {
      script {
        git(...).each {k,v -> env.setProperty(k,v)}
      }
    }
    ...
  }
}
{{< /code-block >}}

{{% /tab %}}
{{% tab "Using Scripted Pipelines" %}}
If you're using a scripted pipeline to configure your pipeline, you can propagate the git information to environment variables directly.

Using the `checkout` step:
{{< code-block lang="groovy" >}}
node {
  stage('Checkout') {
    checkout(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
{{< /code-block >}}

Using the `git` step:
{{< code-block lang="groovy" >}}
node {
  stage('Checkout') {
    git(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


### Set Git information manually

In case the plugin cannot detect Git information automatically and propagating Git data via SCM is not an option,
the necessary Git information can be set manually.

To do so, set the following environment variables.

**Note:** These variables are optional, but if they are set, they take precedence over the Git information set by other Jenkins plugins.

`DD_GIT_REPOSITORY` (Optional)
: The repository URL of your service.<br/>
**Example**: `https://github.com/my-org/my-repo.git`

`DD_GIT_BRANCH` (Optional)
: The branch name.<br/>
**Example**: `main`

`DD_GIT_TAG` (Optional)
: The tag of the commit (if any).<br/>
**Example**: `0.1.0`

`DD_GIT_COMMIT_SHA` (Optional)
: The commit expressed in the hex 40 chars length form.<br/>
**Example**: `faaca5c59512cdfba9402c6e67d81b4f5701d43c`

`DD_GIT_COMMIT_MESSAGE` (Optional)
: The commit message.<br/>
**Example**: `Initial commit message`

`DD_GIT_COMMIT_AUTHOR_NAME` (Optional)
: The name of the author of the commit.<br/>
**Example**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL` (Optional)
: The email of the author of the commit.<br/>
**Example**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE` (Optional)
: The date when the author submitted the commit expressed in ISO 8601 format.<br/>
**Example**: `2021-08-16T15:41:45.000Z`

`DD_GIT_COMMIT_COMMITTER_NAME` (Optional)
: The name of the committer of the commit.<br/>
**Example**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL` (Optional)
: The email of the committer of the commit.<br/>
**Example**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE` (Optional)
: The date when the committer submitted the commit expressed in ISO 8601 format.<br/>
**Example**: `2021-08-16T15:41:45.000Z`

If you set only repository, branch and commit, the plugin will try to extract the rest of the Git information from the `.git` folder.

An example of usage:

{{< code-block lang="groovy" >}}
pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        script {
          def gitVars = git url:'https://github.com/my-org/my-repo.git', branch:'some/feature-branch'

          // Setting Git information manually via environment variables.
          env.DD_GIT_REPOSITORY_URL=gitVars.GIT_URL
          env.DD_GIT_BRANCH=gitVars.GIT_BRANCH
          env.DD_GIT_COMMIT_SHA=gitVars.GIT_COMMIT
        }
      }
    }
    stage('Test') {
      steps {
        // Execute the rest of the pipeline.
      }
    }
  }
}
{{< /code-block >}}

## Customization

### Set custom tags for your pipelines

The Datadog plugin adds a `datadog` step that allows adding custom tags to your pipeline-based jobs.

In declarative pipelines, add the step to a top-level option block:

{{< code-block lang="groovy" >}}
def DD_TYPE = "release"
pipeline {
    agent any
    options {
        datadog(tags: ["team:backend", "type:${DD_TYPE}", "${DD_TYPE}:canary"])
    }
    stages {
        stage('Example') {
            steps {
                echo "Hello world."
            }
        }
    }
}
{{< /code-block >}}

In scripted pipelines, wrap the relevant section with the `datadog` step:

{{< code-block lang="groovy" >}}
datadog(tags: ["team:backend", "release:canary"]){
    node {
        stage('Example') {
            echo "Hello world."
        }
    }
}
{{< /code-block >}}

#### Integrate with Datadog Teams
To display and filter the teams associated with your pipelines, add `team:<your-team>` as a custom tag. The custom tag name must match your [Datadog Teams][15] team handle exactly.

### Set global custom tags

You can configure the Jenkins Plugin to send custom tags in all pipeline traces:

1. In the web interface of your Jenkins instance, go to **Manage Jenkins > Configure System**.
2. Go to the `Datadog Plugin` section, scrolling down the configuration screen.
3. Click on the `Advanced` button.
4. Configure the `Global Tags`.
5. Configure the `Global Job Tags`.
6. Save your configuration.

**Global tags**
: A comma-separated list of tags to apply to all metrics, traces, events, and service checks. Tags can include environment variables that are defined in the Jenkins controller instance.<br/>
**Environment variable**: `DATADOG_JENKINS_PLUGIN_GLOBAL_TAGS`<br/>
**Example**: `key1:value1,key2:${SOME_ENVVAR},${OTHER_ENVVAR}:value3`

**Global job tags**
: A comma-separated list of regexes to match a job and a list of tags to apply to that job. Tags can include environment variables that are defined in the Jenkins controller instance. Tags can reference match groups in the regex using the `$` symbol.<br/>
**Environment variable**: `DATADOG_JENKINS_PLUGIN_GLOBAL_JOB_TAGS`<br/>
**Example**: `(.*?)_job_(.*?)_release, owner:$1, release_env:$2, optional:Tag3`

### Include or exclude pipelines

You can configure the Jenkins Plugin to include or exclude some pipelines:

1. In the web interface of your Jenkins instance, go to **Manage Jenkins > Configure System**.
2. Go to the `Datadog Plugin` section by scrolling down the configuration screen.
3. Click on the `Advanced` button.
4. Configure the `Excluded Jobs`.
5. Configure the `Included Jobs`.
6. Save your configuration.

**Excluded jobs**
: A comma-separated list of Jenkins jobs that should not be monitored. The exclusion applies to all metrics, traces, events, and service checks. Excluded jobs can use regular expressions to reference multiple jobs.<br/>
**Environment variable**: `DATADOG_JENKINS_PLUGIN_EXCLUDED`<br/>
**Example**: `susans-job,johns-.*,prod_folder/prod_release`

**Included jobs**
: A comma-separated list of Jenkins job names that should be monitored. If the included jobs list is empty, all jobs that are not excluded explicitly are monitored. The inclusion applies to all metrics, traces, events, and service checks. Included jobs can use regular expressions to reference multiple jobs.<br/>
**Environment variable**: `DATADOG_JENKINS_PLUGIN_INCLUDED`<br/>
**Example**: `susans-job,johns-.*,prod_folder/prod_release`

Lists of included and excluded jobs can contain regular expressions, but not glob patterns. To include a job with a specific prefix, use `prefix-.*`—not `prefix-*`.

## Visualize pipeline data in Datadog

Once the integration is successfully configured, both the [**CI Pipeline List**][7] and [**Executions**][8] pages populate with data after pipelines finish.

The **CI Pipeline List** page shows data for only the default branch of each repository.

## Troubleshooting

### Enable DEBUG log level for the Datadog Plugin

If you have any issues with the Datadog Plugin, you can set the logs for the plugin in `DEBUG` level. Using this level you are able to see stacktrace details if an exception is thrown.

1. In your Jenkins instance web interface, go to **Manage Jenkins > System log**.
2. Click on `Add new log recorder` button.
3. Type the log recorder name. E.g: **Datadog Plugin Logs**.
4. Add the following loggers to the list:
    - Logger: `org.datadog.jenkins.plugins.datadog.clients` -> Log Level `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.traces` -> Log Level `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.logs` -> Log Level `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.model` -> Log Level `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.listeners` -> Log Level `ALL`
5. Save the configuration.

You may also want to split the loggers into different log recorders.

Once the log recorders are successfully configured, you can check the logs in the `DEBUG` mode by accessing the desired log recorder through **Manage Jenkins > System log**.

If you trigger a Jenkins pipeline, you can search for the message `Send pipeline traces` in the **Datadog Plugin Logs**. This message indicates that the plugin is sending **CI Visibility** data to the **Datadog Agent**.

{{< code-block lang="text" >}}
Send pipeline traces.
...
Send pipeline traces.
...
{{< /code-block >}}

### The Datadog Plugin cannot write payloads to the server

If the following error message appears in the **Jenkins Log**, make sure that the plugin configuration is correct.

{{< code-block lang="text" >}}
Error writing to server
{{< /code-block >}}

1. If you are using `localhost` as the hostname, try to change it to the server hostname instead.
2. If your Jenkins instance is behind an HTTP proxy, go to **Manage Jenkins** > **Manage Plugins** > **Advanced tab** and make sure the proxy configuration is correct.

#### HTTP 504

If the HTTP 504 error message appears, make sure that the Jenkins proxy configuration is correct.

{{< code-block lang="text" >}}
Failed to send HTTP request: PUT http://localhost:8126/v0.3/traces - Status: HTTP 504
{{< /code-block >}}

1. If your Jenkins instance is behind an HTTP proxy, go to **Manage Jenkins** > **Manage Plugins** > **Advanced tab** and make sure the proxy configuration is correct.
  1. Check that `localhost` has been configured in the `No Proxy Hosts` section.

### The Datadog Plugin section does not appear in the Jenkins configuration

If the Datadog Plugin section does not appear in Jenkins configuration section, make sure that the plugin is enabled. To do so:

1. In your Jenkins instance web interface, go to **Manage Jenkins > Manage Plugins**.
2. Search for `Datadog Plugin` in the **Installed** tab.
3. Check that the `Enabled` checkbox is marked.
4. If you enable the plugin here, restart your Jenkins instance using the `/safeRestart` URL path.

### The CI Visibility option does not appear in the Datadog Plugin section.

If the CI Visibility option does not appear in the Datadog Plugin section, make sure that the correct version is installed and restart the Jenkins instance. To do so:

1. In your Jenkins instance web interface, go to **Manage Jenkins > Manage Plugins**.
2. Search for `Datadog Plugin` in the **Installed** tab.
3. Check that the installed version is correct.
4. Restart your Jenkins instance using the `/safeRestart` URL path.

### The Plugin's Tracer fails to initialize due to APM Java Tracer is being used to instrument Jenkins.

If this error message appears in the **Jenkins Log**, make sure that you are using the Jenkins plugin v3.1.0+

{{< code-block lang="text" >}}
Failed to reinitialize Datadog-Plugin Tracer, Cannot enable traces collection via plugin if the Datadog Java Tracer is being used as javaagent in the Jenkins startup command. This error will not affect your pipelines executions.
{{< /code-block >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: /agent/cluster_agent/admission_controller/
[3]: https://plugins.jenkins.io/datadog/
[4]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: https://plugins.jenkins.io/kubernetes/#plugin-content-pod-template
[10]: /continuous_integration/pipelines/jenkins/?tab=linux#enable-job-log-collection
[11]: /continuous_integration/pipelines/jenkins/?tab=linux#correlate-infrastructure-metrics
[12]: /continuous_integration/pipelines/custom_tags_and_measures/
[14]: /agent/
[15]: /account_management/teams/
[16]: /continuous_integration/tests/
[17]: /continuous_integration/tests/setup/
[18]: /tracing/trace_collection/library_config/
[19]: https://www.jenkins.io/
[20]: /glossary/#manual-step
[21]: /glossary/#queue-time
[22]: /glossary/#custom-tag
[23]: /glossary/#custom-measure
[24]: /glossary/#parameter
[25]: /glossary/#pipeline-failure
[26]: /glossary/#custom-span

