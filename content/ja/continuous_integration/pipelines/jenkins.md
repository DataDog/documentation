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

[ジョブからのログ収集](#enable-job-log-collection)を有効にするには、Datadog Agent が TCP ポートでログをリッスンするように構成します。

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

この構成では、Agent はポート `10518` でログをリッスンします。

<div class="alert alert-info"><strong>Note</strong>: Logs are billed separately from CI Visibility. Log retention, exclusion, and indexes are configured in Logs Settings. Logs for Jenkins jobs can be identified by the <code>source:jenkins</code> tag.</div>

### Correlate infrastructure metrics

Jenkins のワーカーを使用している場合、パイプラインを実行しているインフラストラクチャーでパイプラインを関連付けることができます。この機能を動作させるには

1. 各 Jenkins Worker に [Datadog Agent][1] をインストールします。
2. 各 Jenkins ワーカーに `DD_CI_HOSTNAME` という新しい環境変数をワーカーのホスト名で設定し、エクスポートします。
  * Datadog Agent がそのワーカーのインフラストラクチャーメトリクスで報告しているホスト名と同じである必要があります。
  * 有効な値として、固定値や他の環境変数が使用できます。

```bash
export DD_CI_HOSTNAME=my-hostname
```

Jenkins インスタンスの管理に Kubernetes を使用している場合は、`DD_CI_HOSTNAME` 環境変数を [Jenkins ジョブを実行するポッド][9]に追加してください。この環境変数の値は、インフラストラクチャーメトリクスをレポートする際に、Datadog Agent のデーモンセットで何を使用しているかに依存します。

これは、Jenkins ワーカーにのみ必要です。Jenkins コントローラの場合、インフラストラクチャーメトリクスの相関は追加アクションを必要としません。

**注**: インフラストラクチャーメトリクスの相関は、Jenkins Plugin v5.0.0+ 以降でサポートされています。

## ジョブログ収集を有効にする

This is an optional step that enables the collection of job logs. Both Agentless and Agent-based options are supported.

### Jenkins の構成 UI で有効にする

{{< tabs >}}

{{% tab "エージェントレス (API キー使用)" %}}

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Configure System** に移動します。
2. コンフィギュレーション画面を下にスクロールして、`Datadog Plugin` セクションに移動します。
3. `Use the Datadog Agent to report to Datadog` が選択されていることと、`Log Intake URL` が現在の Datadog サイトの URL を指していることを再度確認します。
4. `Enable Log Collection` チェックボックスをクリックしてアクティブにします。
5. 構成を保存します。

{{% /tab %}}

{{% tab "Report through the Datadog Agent - recommended" %}}

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Configure System** に移動します。
2. コンフィギュレーション画面を下にスクロールして、`Datadog Plugin` セクションに移動します。
3. `Use the Datadog Agent to report to Datadog` オプションが選択されていることを再度確認します。
4. Datadog Agent で構成した `Log Collection` ポートを構成します。
5. `Enable Log Collection` チェックボックスをクリックしてアクティブにします。
6. Datadog Agent との接続を確認します。
7. 構成を保存します。
{{% /tab %}}

{{< /tabs >}}

### configuration-as-code で有効にする

{{< tabs >}}

{{% tab "エージェントレス (API キー使用)" %}}

Jenkins インスタンスが Jenkins [`configuration-as-code`][1] プラグインを使用する場合:

1. エントリ `datadogGlobalConfiguration` の構成 YAML に、以下を含めるように修正します。

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

2. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Configuration as Code** にアクセスします。
3. コンフィギュレーションを適用または再ロードします。
4. `View Configuration` ボタンを使用してコンフィギュレーションを確認します。

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md
{{% /tab %}}

{{% tab "Report through the Datadog Agent - recommended" %}}

Jenkins インスタンスが Jenkins [`configuration-as-code`][1] プラグインを使用する場合:

1. エントリ `datadogGlobalConfiguration` の構成 YAML に、以下を含めるように修正します。
    ```yaml
    unclassified:
    datadogGlobalConfiguration:
        # Configure the `Log Collection` port, as configured in the Datadog Agent,
        targetLogCollectionPort: 10518
        # Enable Log collection
        collectBuildLogs: true
    ```
2. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Configuration as Code** にアクセスします。
3. コンフィギュレーションを適用または再ロードします。
4. `View Configuration` ボタンを使用してコンフィギュレーションを確認します。

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md
{{% /tab %}}

{{< /tabs >}}

### Groovy で有効にする

{{< tabs >}}

{{% tab "エージェントレス (API キー使用)" %}}

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Script Console** にアクセスします。
2. 構成スクリプトを、以下を含めるように更新します。
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

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Script Console** にアクセスします。
2. 構成スクリプトを、以下を含めるように更新します。
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

### 環境変数を使う

{{< tabs >}}

{{% tab "エージェントレス (API キー使用)" %}}

1. Jenkins インスタンスマシンで次の環境変数を追加します。

   {{% site-region region="us" %}}
   {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
   # Endpoint URLs correspond to your Datadog site
   DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.datadoghq.com/v1/input/"

   # ログ収集の有効化
   DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
   {{< /code-block >}}

   {{% /site-region %}}

   {{% site-region region="eu" %}}
   {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
   # Endpoint URLs correspond to your Datadog site
   DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.datadoghq.eu/v1/input/"

   # ログ収集の有効化
   DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
   {{< /code-block >}}

   {{% /site-region %}}
   {{% site-region region="us3" %}}

   {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
   # Endpoint URLs correspond to your Datadog site
   DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.us3.datadoghq.com/v1/input/"

   # ログ収集の有効化
   DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
   {{< /code-block >}}

   {{% /site-region %}}
   {{% site-region region="us5" %}}

   {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
   # Endpoint URLs correspond to your Datadog site
   DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.us5.datadoghq.com/v1/input/"

   # ログ収集の有効化
   DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
   {{< /code-block >}}

   {{% /site-region %}}
   {{% site-region region="gov" %}}

   {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
   # Endpoint URLs correspond to your Datadog site
   DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.dd-gov.com/v1/input/"

   # ログ収集の有効化
   DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
   {{< /code-block >}}

   {{% /site-region %}}
   {{% site-region region="ap1" %}}

   {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
   # Endpoint URLs correspond to your Datadog site
   DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL="https://http-intake.logs.ap1.datadoghq.com/v1/input/"

   # ログ収集の有効化
   DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
   {{< /code-block >}}
   {{% /site-region %}}

2. Jenkins インスタンスを再起動します。

{{% /tab %}}

{{% tab "Report through the Datadog Agent - recommended" %}}

1. Jenkins インスタンスマシンで次の環境変数を追加します。
    ```bash
    # Configure the Log Collection port, as configured in the previous step.
    DATADOG_JENKINS_PLUGIN_TARGET_LOG_COLLECTION_PORT=10518

    # Enable log collection
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
    ```
2. Jenkins インスタンスを再起動します。
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

### Jenkins の構成 UI で有効にする

UI-based Test Visibility configuration is available in Datadog Jenkins plugin v5.6.0 or later.

This option is not suitable for pipelines that are configured entirely in `Jenkinsfile` (for example, Multibranch pipelines or pipelines from Organization Folder).
For these pipelines use declarative configuration with the `datadog` step (described in the next section).

To enable Test Visibility via UI do the following:
1. In your Jenkins instance web interface, go to the job or pipeline that you want to instrument and choose the **Configure** option.
2. In the **General** configuration section, tick the **Enable Datadog Test Visibility** checkbox.
3. Enter the name of the service or library being tested into the **Service Name** input. You can choose any value that makes sense to you.
4. Choose the languages for which you want to enable tests instrumentation. Some of the languages do not support configuration through the UI. To configure Test Visibility for these languages, follow the manual [configuration instructions][18].
5. Optionally, provide [additional configuration settings][18].
6. **Save** をクリックします。

{{< img src="ci/ci-jenkins-plugin-tests-config.png" alt="Datadog Test Visibility configuration for Jenkins" style="width:100%;">}}

### Enable with the `datadog` pipeline step

This configuration option is available in Datadog Jenkins plugin v5.6.2 or later.

宣言的パイプラインでは、トップレベルの `options` ブロックに、次のようにステップを追加します。

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

`collectLogs` や `tags` などの他の `datadog` の設定は `testVisibility` ブロックと一緒に追加することができます。

### Enable with manual tracer configuration

Follow the manual Test Visibility [configuration instructions][17] that are specific to your language.

## デフォルトのブランチ名を設定する

パイプラインの結果を報告するには、デフォルトのブランチ名 (例: `main`) をパイプラインのスパンに `git.default_branch` という属性で付加します。これは通常、自動的に行われますが、Jenkins からこの情報が提供されず、プラグインがこの情報を抽出できない場合もあります。

この場合、ビルドで `DD_GIT_DEFAULT_BRANCH` 環境変数を使用してデフォルトのブランチを手動で設定します。例:

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
{{% tab "宣言型パイプラインの使用" %}}
宣言型パイプラインを使ってパイプラインの構成を行う場合は、以下のように `script` ブロックを使って Git の情報を伝搬させます。

`checkout` ステップを使用する:
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

 `git` ステップを使用する:
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
{{% tab "スクリプトパイプラインの使用" %}}
スクリプトパイプラインを使ってパイプラインの構成を行う場合は、git の情報を直接環境変数に伝搬させることができます。

`checkout` ステップを使用する:
{{< code-block lang="groovy" >}}
node {
  stage('Checkout') {
    checkout(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
{{< /code-block >}}

`git` ステップを使用する:
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


### Git の情報を手動で設定する

In case the plugin cannot detect Git information automatically and propagating Git data via SCM is not an option,
the necessary Git information can be set manually.

To do so, set the following environment variables.

**注:** これらの変数はオプションですが、設定された場合、他の Jenkins プラグインで設定された Git 情報よりも優先されます。

`DD_GIT_REPOSITORY` (オプション)
: サービスのリポジトリ URL。<br/>
**例**: `https://github.com/my-org/my-repo.git`

`DD_GIT_BRANCH` (オプション)
: ブランチ名。<br/>
**例**: `main`

`DD_GIT_TAG` (オプション)
: コミットのタグ (ある場合)。<br/>
**例**: `0.1.0`

`DD_GIT_COMMIT_SHA` (オプション)
: 16 進数 40 文字で表されるコミットメント。<br/>
**例**: `faaca5c59512cdfba9402c6e67d81b4f5701d43c`

`DD_GIT_COMMIT_MESSAGE` (オプション)
: コミットのメッセージ。<br/>
**例**: `Initial commit message`

`DD_GIT_COMMIT_AUTHOR_NAME` (オプション)
: コミットの作成者の名前。<br/>
**例**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL` (オプション)
: コミットの作成者のメールアドレス。<br/>
**例**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE` (オプション)
: 作成者がコミットを提出した日付 (ISO 8601 形式)。<br/>
**例**: `2021-08-16T15:41:45.000Z`

`DD_GIT_COMMIT_COMMITTER_NAME` (オプション)
: コミットのコミッターの名前。<br/>
**例**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL` (オプション)
: コミットのコミッターのメールアドレス。<br/>
**例**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE` (オプション)
: コミッターがコミットを提出した日付 (ISO 8601 形式)。<br/>
**例**: `2021-08-16T15:41:45.000Z`

リポジトリ、ブランチ、コミットのみを設定した場合、プラグインは `.git` フォルダから残りの Git 情報を取り出そうとします。

使用方法の一例をご紹介します。

{{< code-block lang="groovy" >}}
pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        script {
          def gitVars = git url:'https://github.com/my-org/my-repo.git', branch:'some/feature-branch'

          // Git 情報を環境変数で手動設定する。
          env.DD_GIT_REPOSITORY_URL=gitVars.GIT_URL
          env.DD_GIT_BRANCH=gitVars.GIT_BRANCH
          env.DD_GIT_COMMIT_SHA=gitVars.GIT_COMMIT
        }
      }
    }
    stage('Test') {
      steps {
        // 残りのパイプラインを実行します。
      }
    }
  }
}
{{< /code-block >}}

## カスタマイズ

### パイプラインのカスタムタグを設定する

Datadog プラグインは、パイプラインベースのジョブにカスタムタグを付加するために `datadog` ステップを追加します。

Declarative Pipeline で、このステップをトップレベルのオプションブロックに追加します:

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

Scripted Pipeline で、関連するセクションを `datadog` ステップでラップします:

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

### グローバルカスタムタグを設定する

すべてのパイプライントレースにカスタムタグを送信するよう、Jenkins プラグインを構成することができます:

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Configure System** に移動します。
2. コンフィギュレーション画面を下にスクロールして、`Datadog Plugin` セクションに移動します。
3. `Advanced` ボタンをクリックします。
4. `Global Tags` を構成します。
5. `Global Job Tags` を構成します。
6. 構成を保存します。

**Global tags**
: すべてのメトリクス、トレース、イベント、サービスチェックに適用するタグのコンマ区切りのリスト。タグには、Jenkins コントローラーインスタンスで定義されている環境変数を含めることができます。<br/>
**環境変数**: `DATADOG_JENKINS_PLUGIN_GLOBAL_TAGS`<br/>
**例**: `key1:value1,key2:${SOME_ENVVAR},${OTHER_ENVVAR}:value3`

**Global job tags**
: ジョブに一致する正規表現のコンマ区切りのリストと、そのジョブに適用するタグのリスト。タグには、Jenkins コントローラーインスタンスで定義されている環境変数を含めることができます。タグは、`$` 記号を使用して正規表現内の一致グループを参照できます。<br/>
**環境変数**: `DATADOG_JENKINS_PLUGIN_GLOBAL_JOB_TAGS`<br/>
**例**: `(.*?)_job_(.*?)_release, owner:$1, release_env:$2, optional:Tag3`

### パイプラインを含めるまたは除外する

一部のパイプラインを含めるか除外するように Jenkins プラグインを構成できます。

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Configure System** に移動します。
2. コンフィギュレーション画面を下にスクロールして、`Datadog Plugin` セクションに移動します。
3. `Advanced` ボタンをクリックします。
4. `Excluded Jobs` を構成します。
5. `Included Jobs` を構成します。
6. 構成を保存します。

**Excluded jobs**
: 監視すべきではない Jenkins ジョブのコンマ区切りのリスト。除外は、すべてのメトリクス、トレース、イベント、サービスチェックに適用されます。除外されたジョブは、正規表現を使用して複数のジョブを参照できます。<br/>
**環境変数**: `DATADOG_JENKINS_PLUGIN_EXCLUDED`<br/>
**例**: `susans-job,johns-.*,prod_folder/prod_release`

**Included jobs**
: 監視する必要がある Jenkins ジョブ名のコンマ区切りのリスト。含まれるジョブのリストが空の場合、明示的に除外されていないすべてのジョブが監視されます。包含は、すべてのメトリクス、トレース、イベント、サービスチェックに適用されます。含まれるジョブは、正規表現を使用して複数のジョブを参照できます。<br/>
**環境変数**: `DATADOG_JENKINS_PLUGIN_INCLUDED`<br/>
**例**: `susans-job,johns-.*,prod_folder/prod_release`

Lists of included and excluded jobs can contain regular expressions, but not glob patterns. To include a job with a specific prefix, use `prefix-.*`—not `prefix-*`.

## Datadog でパイプラインデータを視覚化する

Once the integration is successfully configured, both the [**CI Pipeline List**][7] and [**Executions**][8] pages populate with data after pipelines finish.

The **CI Pipeline List** page shows data for only the default branch of each repository.

## トラブルシューティング

### Datadog プラグインの DEBUG ログレベルを有効にする

Datadog プラグインに問題がある場合は、プラグインのログを `DEBUG` レベルで設定できます。このレベルを使用すると、例外がスローされた場合にスタックトレースの詳細を確認できます。

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > System log** にアクセスします。
2. `Add new log recorder` ボタンをクリックします。
3. ログレコーダー名を入力します。例: **Datadog プラグインログ**
4. 次のロガーをリストに追加します。
    - Logger: `org.datadog.jenkins.plugins.datadog.clients` -> Log Level `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.traces` -> Log Level `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.logs` -> Log Level `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.model` -> Log Level `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.listeners` -> Log Level `ALL`
5. 構成を保存します。

ロガーを異なるログレコーダーに分割することもできます。

ログレコーダーが正常に構成されたら、**Manage Jenkins > System log** から目的のログレコーダーにアクセスして、`DEBUG` モードでログを確認できます。

Jenkins パイプラインをトリガーすると、**Datadog Plugin Logs** でメッセージ `Send pipeline traces` を検索できます。このメッセージは、プラグインが **CI Visibility** データを **Datadog Agent** に送信していることを示しています。

{{< code-block lang="text" >}}
Send pipeline traces.
...
Send pipeline traces.
...
{{< /code-block >}}

### Datadog Plugin がサーバーにペイロードを書き込めない

**Jenkins Log** に以下のエラーメッセージが表示された場合、プラグインの構成が正しいかどうか確認してください。

{{< code-block lang="text" >}}
Error writing to server
{{< /code-block >}}

1. ホスト名として `localhost` を使用している場合は、代わりにサーバーのホスト名に変更してみてください。
2. Jenkins インスタンスが HTTP プロキシの後ろにある場合、**Manage Jenkins** > **Manage Plugins** > **Advanced tab** に移動して、プロキシ構成が正しいことを確認します。

#### HTTP 504

HTTP 504 のエラーメッセージが表示される場合は、Jenkins のプロキシ構成が正しいかどうかを確認してください。

{{< code-block lang="text" >}}
Failed to send HTTP request: PUT http://localhost:8126/v0.3/traces - Status: HTTP 504
{{< /code-block >}}

1. Jenkins インスタンスが HTTP プロキシの後ろにある場合、**Manage Jenkins** > **Manage Plugins** > **Advanced tab** に移動して、プロキシ構成が正しいことを確認します。
  1. `No Proxy Hosts` に `localhost` が構成されていることを確認します。

### Datadog プラグインセクションが Jenkins コンフィギュレーションに表示されない

Datadog プラグインセクションが Jenkins コンフィギュレーションセクションに表示されない場合は、プラグインが有効になっていることを確認してください。手順:

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Manage Plugins** にアクセスします。
2. **Installed** タブで `Datadog Plugin` を検索します。
3. `Enabled` チェックボックスがオンになっていることを確認します。
4. ここでプラグインを有効にする場合は、`/safeRestart` URL パスを使用して Jenkins インスタンスを再起動します。

### CI Visibility オプションが Datadog プラグインセクションに表示されない。

CI Visibility オプションが Datadog プラグインセクションに表示されない場合は、正しいバージョンがインストールされていることを確認して、Jenkins インスタンスを再起動してください。手順:

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Manage Plugins** にアクセスします。
2. **Installed** タブで `Datadog Plugin` を検索します。
3. インストールされているバージョンが正しいことを確認します。
4. `/safeRestart` URL パスを使用して Jenkins インスタンスを再起動します。

### プラグインのトレーサーが、APM Java トレーサーが Jenkins のインスツルメントに使用されているため、初期化に失敗する。

このエラーメッセージが **Jenkins Log** に表示される場合は、Jenkins プラグイン v3.1.0 以降を使用していることを確認してください

{{< code-block lang="text" >}}
Datadog-Plugin Tracer の再初期化に失敗した。Jenkins 起動コマンドで Datadog Java Tracer が javaagent として使用されている場合、プラグインを介したトレース収集を有効にできない。このエラーは、パイプラインの実行には影響しません。
{{< /code-block >}}

## 参考資料

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

