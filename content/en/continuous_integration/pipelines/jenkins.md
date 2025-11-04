---
title: Set up Tracing on a Jenkins Pipeline
aliases:
  - /continuous_integration/setup_pipelines/jenkins
further_reading:
    - link: "/continuous_integration/pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/pipelines/custom_commands/"
      tag: "Documentation"
      text: "Extend Pipeline Visibility by tracing individual commands"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI Visibility"
---

## Overview

[Jenkins][19] is an automation server with continuous integration and delivery features. With its plugin architecture, Jenkins can be customized to fit any CI/CD need and automates all aspects of project development, testing, and deployment.

Set up tracing in Jenkins to collect data across various stages of your pipeline executions, identify performance bottlenecks, resolve operational challenges, and refine your deployment processes.

### Compatibility

| Pipeline Visibility | Platform | Definition                                                                                               |
|---|---|----------------------------------------------------------------------------------------------------------|
| [Manual steps][20] | Manual steps | View manually triggered pipelines.                                                                       |
| [Queue time][21] | Queue time | View the amount of time pipeline jobs sit in the queue before processing.                                |
| Logs correlation | Logs correlation | Correlate pipeline spans to logs and enable [job logs collection][10].                                   |
| Infrastructure metric correlation | Infrastructure metric correlation | Correlate jobs to [infrastructure host metrics][11] for Jenkins workers.                                 |
| [Custom spans][26] | Custom spans | Configure custom spans for your pipelines.                                                               |
| Custom pre-defined tags | Custom pre-defined tags | Set [custom tags][12] to all generated pipeline, stages, and job spans.                                  |
| [Custom tags][22] [and measures at runtime][23] | Custom tags and measures at runtime | Configure [custom tags and measures][12] at runtime.                                                     |
| [Parameters][24] | Parameters | Set custom parameters (such as the default branch name or Git information) when a pipeline is triggered. |
| [Pipeline failure reasons][25] | Pipeline failure reasons | Identify pipeline failure reasons from error messages.                                                   |
| [Running pipelines][32] | Running pipelines | View pipeline executions that are running. Requires Jenkins plugin version >= 8.0.0                      |
| [Filter CI Jobs on the critical path][33] | Filter CI Jobs on the critical path | Filter by jobs on the critical path. |
| [Execution time][34] | Execution time  | View the amount of time pipelines have been running jobs. |

The following Jenkins versions are supported:

- Jenkins >= 2.346.1

This integration supports both Agentless and Agent-based installation.
Installing the Agent is required for infrastructure metrics correlation.

## Install the Datadog Agent

Skip this step if you do not need infrastructure metrics correlation.

Install Datadog Agent on your Jenkins controller node and on your worker nodes by following the [Agent installation instructions][14].

If the Jenkins controller and the Datadog Agent have been deployed to a Kubernetes cluster, Datadog recommends using the [Admission Controller][2], which automatically sets the `DD_AGENT_HOST` environment variable in the Jenkins controller pod to communicate with the local Datadog Agent.

If you want to report the logs of your Jenkins jobs to Datadog, make sure that custom logs collection over TCP is [enabled and configured][29] in the Agent.

If your Agent runs in a container, add the `DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true` environment variable to it and make sure the following ports are accessible by the Jenkins controller:
- [DogStadsD][30] port, defaults to `8125/udp`
- [APM traces port][31], defaults to `8126/tcp`
- [logs collection port][29], defaults to `10518/tcp`

<div class="alert alert-info">Sending CI Visibility traces through UNIX domain sockets is not supported.</div>

## Install the Datadog Jenkins plugin

<div class="alert alert-info">Whether you choose to use Agentless mode or the Agent-based mode to report your data to Datadog, you are <strong>required</strong> to use the plugin.</div>

Install and enable the [Datadog Jenkins plugin][3] v3.1.0 or later:

1. In your Jenkins instance web interface, go to **Manage Jenkins > Manage Plugins**.
2. In the [Update Center][4] on the **Available** tab, search for `Datadog Plugin`.
3. Select the checkbox next to the plugin, and install using one of the two install buttons at the bottom of the screen.
4. To verify that the plugin is installed, search for `Datadog Plugin` on the **Installed** tab.

## Configure the Datadog Jenkins plugin

There are several ways you can configure the Datadog Jenkins plugin.

### Configure with the Jenkins configuration UI

{{< tabs >}}
{{% tab "Agentless (using an API key)" %}}

Use this option to make the Jenkins plugin report directly to Datadog without using the Datadog Agent. It requires an API Key.

1. In your Jenkins instance web interface, go to **Manage Jenkins > Configure System**.
2. Go to the `Datadog Plugin` section, scrolling down the configuration screen.
3. Select the mode `Use Datadog site and API key to report to Datadog`.
4. Select your [Datadog site][1] in the `Pick a site` dropdown.
5. Enter a valid `Datadog API Key` (or use `Select from credentials` option).
6. Click the `Test Key` button to verify that your API key is valid.
7. Configure CI Visibility:
   1. Enable the `Enable CI Visibility` checkbox.
   2. (Optional) Configure your CI Instance name.
8. (Optional) Configure logs collection:
   1. Enable the `Enable Log Collection` checkbox.
9. (Optional) Enter the name of the host that you use to access Datadog UI (for example, `app.datadoghq.com`) in the `Datadog App hostname` field.
10. Save your configuration.

{{< img src="ci/ci-jenkins-plugin-config-agentless-app-hostname.png" alt="Datadog Plugin configuration for Jenkins" style="width:100%;">}}

[1]: /getting_started/site/#access-the-datadog-site
{{% /tab %}}
{{% tab "Report through the Datadog Agent (recommended)" %}}

1. In your Jenkins instance web interface, go to **Manage Jenkins > Configure System**.
2. Go to the `Datadog Plugin` section, scrolling down the configuration screen.
3. Select the mode `Use the Datadog Agent to report to Datadog`.
4. Configure the `Agent` host.
5. Configure CI Visibility:
   1. Configure the `Traces Collection Port` if not using the default port `8126`.
   2. Click the `Test traces connection` button to verify that your configuration is valid.
   3. Enable the `Enable CI Visibility` checkbox.
   4. (Optional) Configure your CI Instance name.
6. (Optional) Configure logs collection:
   1. Configure the `Log Collection` port as configured in the Datadog Agent.
   2. Click the `Test logs connection` button to verify that your configuration is valid.
   3. Enable the `Enable Log Collection` checkbox.
7. (Optional) Enter the name of the host that you use to access Datadog UI (for example, `app.datadoghq.com`) in the `Datadog App hostname` field.
8. Save your configuration.

{{< img src="ci/ci-jenkins-plugin-config-agentful-app-hostname.png" alt="Datadog Plugin configuration for Jenkins" style="width:100%;">}}
{{% /tab %}}
{{< /tabs >}}

### Use Configuration-as-Code

{{< tabs >}}

{{% tab "Agentless (using an API key)" %}}

If your Jenkins instance uses the Jenkins [`configuration-as-code`][1] plugin:

1. Create or modify the configuration YAML by adding an entry for `datadogGlobalConfiguration`:

    {{% site-region region="us" %}}
    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Agentless` mode (using API key).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configure your Datadog site
            site: 'US1'
        apiKey:
          datadogCredentialsApiKey:
            # Configure ID of Jenkins credentials that store your API key
            credentialsId: 'my-api-key-credentials-id'
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure your CI Instance name
    ciInstanceName: 'jenkins'
    # (Optional) Configure the name of the host that you use to access Datadog UI
    datadogAppHostname: 'app.datadoghq.com'
    # (Optional) Enable logs collection
    collectBuildLogs: true
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="eu" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Agentless` mode (using API key).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configure your Datadog site
            site: 'EU1'
        apiKey:
          datadogCredentialsApiKey:
            # Configure ID of Jenkins credentials that store your API key
            credentialsId: 'my-api-key-credentials-id'
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure your CI Instance name
    ciInstanceName: 'jenkins'
    # (Optional) Configure the name of the host that you use to access Datadog UI
    datadogAppHostname: 'app.datadoghq.eu'
    # (Optional) Enable logs collection
    collectBuildLogs: true
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="gov" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Agentless` mode (using API key).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configure your Datadog site
            site: 'US1_FED'
        apiKey:
          datadogCredentialsApiKey:
            # Configure ID of Jenkins credentials that store your API key
            credentialsId: 'my-api-key-credentials-id'
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure your CI Instance name
    ciInstanceName: 'jenkins'
    # (Optional) Configure the name of the host that you use to access Datadog UI
    datadogAppHostname: 'app.ddog-gov.com'
    # (Optional) Enable logs collection
    collectBuildLogs: true
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us3" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Agentless` mode (using API key).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configure your Datadog site
            site: 'US3'
        apiKey:
          datadogCredentialsApiKey:
            # Configure ID of Jenkins credentials that store your API key
            credentialsId: 'my-api-key-credentials-id'
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure the name of the host that you use to access Datadog UI
    ciInstanceName: 'jenkins'
    # (Optional) Configure your Datadog app hostname
    datadogAppHostname: 'app.us3.datadoghq.com'
    # (Optional) Enable logs collection
    collectBuildLogs: true
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us5" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Agentless` mode (using API key).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configure your Datadog site
            site: 'US5'
        apiKey:
          datadogCredentialsApiKey:
            # Configure ID of Jenkins credentials that store your API key
            credentialsId: 'my-api-key-credentials-id'
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure your CI Instance name
    ciInstanceName: 'jenkins'
    # (Optional) Configure the name of the host that you use to access Datadog UI
    datadogAppHostname: 'app.us5.datadoghq.com'
    # (Optional) Enable logs collection
    collectBuildLogs: true
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="ap1" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Agentless` mode (using API key).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configure your Datadog site
            site: 'AP1'
        apiKey:
          datadogCredentialsApiKey:
            # Configure ID of Jenkins credentials that store your API key
            credentialsId: 'my-api-key-credentials-id'
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure your CI Instance name
    ciInstanceName: 'jenkins'
    # (Optional) Configure the name of the host that you use to access Datadog UI
    datadogAppHostname: 'app.ap1.datadoghq.com'
    # (Optional) Enable logs collection
    collectBuildLogs: true
    {{< /code-block >}}
    {{% /site-region %}}
    {{% site-region region="ap2" %}}

    {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Agentless` mode (using API key).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configure your Datadog site
            site: 'AP2'
        apiKey:
          datadogCredentialsApiKey:
            # Configure ID of Jenkins credentials that store your API key
            credentialsId: 'my-api-key-credentials-id'
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure your CI Instance name
    ciInstanceName: 'jenkins'
    # (Optional) Configure the name of the host that you use to access Datadog UI
    datadogAppHostname: 'app.ap2.datadoghq.com'
    # (Optional) Enable logs collection
    collectBuildLogs: true
    {{< /code-block >}}
    {{% /site-region %}}

2. In your Jenkins instance web interface, go to **Manage Jenkins > Configuration as Code**.
3. Apply or reload the configuration.
4. Check the configuration using the `View Configuration` button.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md
{{% /tab %}}
{{% tab "Report through the Datadog Agent (recommended)" %}}

If your Jenkins instance uses the Jenkins [`configuration-as-code`][1] plugin:

1. Create or modify the configuration YAML by adding an entry for `datadogGlobalConfiguration`:

   {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Datadog Agent` mode
      datadogAgentConfiguration:
        # Configure Datadog Agent host
        agentHost: '<your-agent-host>'
        # Configure Datadog Agent port
        agentPort: 8125
        # (Optional) Configure logs collection port as configured in your Datadog Agent
        agentLogCollectionPort: 10518
        # Configure traces collection port
        agentTraceCollectionPort: 8126
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure your CI Instance name
    ciInstanceName: 'jenkins'
    # (Optional) Configure the name of the host that you use to access Datadog UI
    datadogAppHostname: 'app.datadoghq.com'
    # (Optional) Enable logs collection
    collectBuildLogs: true
   {{< /code-block >}}

2. In your Jenkins instance web interface, go to **Manage Jenkins > Configuration as Code**.
3. Apply or reload the configuration.
4. Check the configuration using the `View Configuration` button.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md

{{% /tab %}}
{{< /tabs >}}

### Configure with Groovy

{{< tabs >}}
{{% tab "Agentless (using an API key)" %}}

1. In your Jenkins instance web interface, go to **Manage Jenkins > Script Console**.
2. Run the configuration script:

    {{% site-region region="us" %}}
    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.US1) // Pick your Datadog site
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // or `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = 'app.datadoghq.com' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable logs collection

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="eu" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.EU1) // Pick your Datadog site
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // or `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = 'app.datadoghq.eu' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable logs collection

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="gov" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.US1_FED) // Pick your Datadog site
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // or `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = 'app.ddog-gov.com' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable logs collection

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us3" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.US3) // Pick your Datadog site
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // or `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = 'app.us3.datadoghq.com' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable logs collection

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us5" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.US5) // Pick your Datadog site
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // or `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = 'app.us5.datadoghq.com' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable logs collection

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="ap1" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.AP1) // Pick your Datadog site
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // or `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = 'app.ap1.datadoghq.com' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable logs collection

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="ap2" %}}

    {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.AP2) // Pick your Datadog site
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // or `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = 'app.ap2.datadoghq.com' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable logs collection

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
    {{< /code-block >}}

    {{% /site-region %}}

{{% /tab %}}
{{% tab "Report through the Datadog Agent (recommended)" %}}

1. In your Jenkins instance web interface, go to **Manage Jenkins > Script Console**.
2. Run the configuration script:

   {{< code-block lang="groovy" disable_copy="true" collapsible="true" >}}
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogAgentConfiguration

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def agentHost = 'localhost' // Configure your Datadog Agent host
def agentPort = 8125
def agentLogCollectionPort = 10518 // (Optional) Configure logs collection port as configured in your Datadog Agent
def agentTraceCollectionPort = 8126 // Configure traces collection port
datadog.datadogClientConfiguration = new DatadogAgentConfiguration(agentHost, agentPort, agentLogCollectionPort, agentTraceCollectionPort)

datadog.datadogAppHostname = 'app.datadoghq.com' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable logs collection

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
    {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Use environment variables

{{< tabs >}}
{{% tab "Agentless (using an API key)" %}}

1. Set the following environment variables on your Jenkins instance machine:

    {{% site-region region="us" %}}
    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Configure your Datadog site
    DATADOG_JENKINS_PLUGIN_DATADOG_SITE=US1

    # Configure your API key
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

    # (Optional) Enable logs collection
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

    # (Optional) Configure the name of the host that you use to access Datadog UI
    DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.datadoghq.com
    {{< /code-block >}}

    {{% /site-region %}}

    {{% site-region region="eu" %}}
    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Configure your Datadog site
    DATADOG_JENKINS_PLUGIN_DATADOG_SITE=EU1

    # Configure your API key
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

    # (Optional) Enable logs collection
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

    # (Optional) Configure the name of the host that you use to access Datadog UI
    DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.datadoghq.eu
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="gov" %}}

    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Configure your Datadog site
    DATADOG_JENKINS_PLUGIN_DATADOG_SITE=US1_FED

    # Configure your API key
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

    # (Optional) Enable logs collection
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

    # (Optional) Configure the name of the host that you use to access Datadog UI
    DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.ddog-gov.com
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us3" %}}

    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Configure your Datadog site
    DATADOG_JENKINS_PLUGIN_DATADOG_SITE=US3

    # Configure your API key
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

    # (Optional) Enable logs collection
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

    # (Optional) Configure the name of the host that you use to access Datadog UI
    DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.us3.datadoghq.com
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="us5" %}}

    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Configure your Datadog site
    DATADOG_JENKINS_PLUGIN_DATADOG_SITE=US5

    # Configure your API key
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

    # (Optional) Enable logs collection
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

    # (Optional) Configure the name of the host that you use to access Datadog UI
    DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.us5.datadoghq.com
    {{< /code-block >}}

    {{% /site-region %}}
    {{% site-region region="ap1" %}}

    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Configure your Datadog site
    DATADOG_JENKINS_PLUGIN_DATADOG_SITE=AP1

    # Configure your API key
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

    # (Optional) Enable logs collection
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

    # (Optional) Configure the name of the host that you use to access Datadog UI
    DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.ap1.datadoghq.com
    {{< /code-block >}}
    {{% /site-region %}}

    {{% site-region region="ap2" %}}

    {{< code-block lang="bash" disable_copy="true" collapsible="true" >}}
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

    # Configure your Datadog site
    DATADOG_JENKINS_PLUGIN_DATADOG_SITE=AP2

    # Configure your API key
    DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

    # (Optional) Enable logs collection
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

    # (Optional) Configure the name of the host that you use to access Datadog UI
    DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.ap2.datadoghq.com
    {{< /code-block >}}
    {{% /site-region %}}

2. Restart your Jenkins instance.
{{% /tab %}}
{{% tab "Report through the Datadog Agent (recommended)" %}}

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

    # (Optional) Configure Log Collection port as configured in your Datadog Agent
    DATADOG_JENKINS_PLUGIN_TARGET_LOG_COLLECTION_PORT=10518

    # (Optional) Enable logs collection
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

    # (Optional) Configure the name of the host that you use to access Datadog UI
    DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.datadoghq.com
    ```

2. Restart your Jenkins instance.

{{% /tab %}}
{{< /tabs >}}

## Collect job logs

Job logs collection can be enabled optionally when configuring the Jenkins plugin (see previous section).
Both Agentless and Agent-based options are supported.

Logs are billed separately from CI Visibility.

Log retention, exclusion, and indexes are configured in [Log Management][27]. Logs for Jenkins jobs can be identified by the `source:jenkins` tag.

## Correlate infrastructure metrics

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

**Note**: Infrastructure metric correlation is supported since Jenkins Plugin v5.0.0 or later.

## Enable Test Optimization

This is an optional step that enables the collection of tests data using [Test Optimization][16].

See the [Test Optimization documentation][17] for your language to make sure that the testing framework that you use is supported.

There are different ways to enable Test Optimization inside a Jenkins job or pipeline:
1. Using the Jenkins configuration UI.
2. Adding the `datadog` step inside the pipeline script.
3. Configuring the tracer manually.

For pipelines that spin up a Docker container to execute tests, you can only configure the tracer manually.

### Enable with the Jenkins configuration UI

UI-based Test Optimization configuration is available in Datadog Jenkins plugin v5.6.0 or later.

This option is not suitable for pipelines that are configured entirely in `Jenkinsfile` (for example, Multibranch pipelines or pipelines from Organization Folder).
For these pipelines use declarative configuration with the `datadog` step (described in the next section).

To enable Test Optimization through the UI do the following:
1. In your Jenkins instance web interface, go to the job or pipeline that you want to instrument and choose the **Configure** option.
2. In the **General** configuration section, tick the **Enable Datadog Test Optimization** checkbox.
3. Enter the name of the service or library being tested into the **Service Name** input. You can choose any value that makes sense to you.
4. Choose the languages for which you want to enable tests instrumentation. Some of the languages do not support configuration through the UI. To configure Test Optimization for these languages, follow the manual [configuration instructions][18].
5. Optionally, provide [additional configuration settings][18].
6. Click **Save**.

{{< img src="ci/ci-jenkins-plugin-tests-config-2.png" alt="Datadog Test Optimization configuration for Jenkins" style="width:100%;">}}

### Enable with the `datadog` pipeline step

This configuration option is available in Datadog Jenkins plugin v5.6.2 or later.

In declarative pipelines, add the step to a top-level `options` block like so:

```groovy
pipeline {
    agent any
    options {
        datadog(testOptimization: [
            enabled: true,
            serviceName: "my-service", // the name of service or library being tested
            languages: ["JAVA"], // languages that should be instrumented (available options are "JAVA", "JAVASCRIPT", "PYTHON", "DOTNET", "RUBY")
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
datadog(testOptimization: [ enabled: true, serviceName: "my-service", languages: ["JAVASCRIPT"], additionalVariables: [:] ]) {
  node {
    stage('Example') {
      echo "Hello world."
    }
  }
}
```

The other `datadog` settings, such as `collectLogs` or `tags` can be added alongside the `testOptimization` block.

### Enable with manual tracer configuration

Follow the manual Test Optimization [configuration instructions][17] that are specific to your language.

## Propagate Git information

Some features of the Datadog Jenkins plugin need Git information associated with the Jenkins builds to work correctly.

The minimum required Git info for a build is repository URL, branch, commit SHA, and commit author email.
This information can be determined by the plugin automatically, propagated from SCM, provided manually with environment variables, or obtained by combining these approaches.

**Note:** If a pipeline checks out multiple repositories, Git info of the repositories that are checked out later in the pipeline has higher priority.

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

`DD_GIT_REPOSITORY_URL` (Optional)
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

## Include or exclude pipelines

You can configure the Jenkins Plugin to include or exclude specific pipelines:

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

## Advanced configuration

### Set the default branch name

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

You can configure the Jenkins Plugin to send custom tags (like global tags and global job tags) in all pipeline traces:

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

## Visualize pipeline data in Datadog

Once the integration is successfully configured, both the [**CI Pipeline List**][7] and [**Executions**][8] pages populate with data after pipelines finish.

The **CI Pipeline List** page shows data for only the default branch of each repository. For more information, see [Search and Manage CI Pipelines][28].

## Troubleshooting

### Generate diagnostic flare

When reporting an issue to the Datadog support team, generate a plugin diagnostic flare and provide it along with the issue description.

To generate the flare do the following:

1. In your Jenkins instance web interface, go to **Manage Jenkins > Troubleshooting > Datadog**.
2. In the Diagnostic Flare form, check which information you want to include in the flare. The default selection works best. The more information you provide, the easier it is to diagnose your issue.
3. Click **Download** to generate and download the flare archive.

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

### Pipeline executions data is not available in Datadog

#### HTTP connectivity check

If your Jenkins instance is behind an HTTP proxy, go to **Manage Jenkins** > **Manage Plugins** > **Advanced tab** and make sure the proxy configuration is correct:
- If the Datadog plugin is configured to send data to a Datadog Agent, check that the Agent host has been added to the `No Proxy Hosts` section.
- If the Datadog plugin is configured to send data directly to Datadog (Agentless mode), check that Datadog host has been added to the `No Proxy Hosts` section. The table below shows the supported Datadog sites and their corresponding host values:

| Datadog site | Host value |
| ------------ | ----------------------- |
| US1          | datadoghq.com           |
| US3          | us3.datadoghq.com       |
| US5          | us5.datadoghq.com       |
| EU1          | datadoghq.eu            |
| AP1          | ap1.datadoghq.com       |

#### The Datadog Plugin cannot write payloads to the server

If the following error message appears in the **Jenkins Log**, make sure that the plugin configuration is correct.

{{< code-block lang="text" >}}
Error writing to server
{{< /code-block >}}

If you are using `localhost` as the hostname, change it to the server hostname instead.

### Jenkins logs are not available in Datadog

If the Datadog plugin is configured to send data to a Datadog Agent, do the following:
- Make sure that custom logs collection over TCP is [enabled and configured][29] in the Agent.
- Go to the plugin configuration UI and click **Test logs connection** to verify logs connectivity.

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

### Infrastructure metrics do not get correlated with Jenkins pipelines

Make sure you have gone through the steps to [correlate infrastructure metrics with Jenkins pipelines][11].

If, even after following the steps, infrastructure metrics are still not correlated with Jenkins pipelines,
try restarting the Jenkins instance.

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
[11]: /continuous_integration/pipelines/jenkins/?tab=agentlessusinganapikey#correlate-infrastructure-metrics
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
[27]: /logs/guide/best-practices-for-log-management/
[28]: /continuous_integration/search/#search-for-pipelines
[29]: /agent/logs/?tab=tcpudp#custom-log-collection
[30]: /developers/dogstatsd/
[31]: /containers/docker/apm/#tracing-from-the-host
[32]: /glossary/#running-pipeline
[33]: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[34]: /glossary/#pipeline-execution-time