---
title: Set up Tracing on a Jenkins Pipeline
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/setup_pipelines/custom_commands/"
      tag: "Documentation"
      text: "Extend Pipeline Visibility by tracing individual commands"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

## Compatibility

Supported Jenkins versions:
* Jenkins >= 2.164.1

## Prerequisite

Install the [Datadog Agent][1] on the Jenkins controller instance.

If the Jenkins controller and the Datadog Agent have been deployed to a Kubernetes cluster, Datadog recommends using the [Admission Controller][2], which automatically sets the `DD_AGENT_HOST` environment variable in the Jenkins controller pod to communicate with the local Datadog Agent.

## Install the Datadog Jenkins plugin

Install and enable the [Datadog Jenkins plugin][3] v3.3.0 or newer:

1. In your Jenkins instance web interface, go to **Manage Jenkins > Manage Plugins**.
2. In the [Update Center][4] on the **Available** tab, search for `Datadog Plugin`.
3. Select the checkbox next to the plugin, and install using one of the two install buttons at the bottom of the screen.
4. To verify that the plugin is installed, search for `Datadog Plugin` on the **Installed** tab.

## Enabling CI Visibility on the plugin

{{< tabs >}}
{{% tab "Using UI" %}}

1. In your Jenkins instance web interface, go to **Manage Jenkins > Configure System**.
2. Go to the `Datadog Plugin` section, scrolling down the configuration screen.
3. Select the `Datadog Agent` mode.
4. Configure the `Agent` host.
5. Configure the `Traces Collection` port (default `8126`).
6. Click on `Enable CI Visibility` checkbox to activate it.
7. (Optional) Configure your CI Instance name.
8. Check the connectivity with the Datadog Agent.
9. Save your configuration.

{{< img src="ci/ci-jenkins-plugin-config.png" alt="Datadog Plugin configuration for Jenkins" style="width:100%;">}}
{{% /tab %}}
{{% tab "Using configuration-as-code" %}}
If your Jenkins instance uses the Jenkins [`configuration-as-code`][1] plugin:

1. Create or modify the configuration YAML by adding an entry for `datadogGlobalConfiguration`:
    ```yaml
    unclassified:
        datadogGlobalConfiguration:
            # Select the `Datadog Agent` mode.
            reportWith: "DSD"
            # Configure the `Agent` host
            targetHost: "agent-host"
            # Configure the `Traces Collection` port (default `8126`).
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
{{% tab "Using Groovy" %}}

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
    d.setTargetHost('<agent host>')

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
{{% tab "Using Environment Variables" %}}

1. Set the following environment variables on your Jenkins instance machine:
    ```bash
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=DSD

    # Configure the Agent host
    DATADOG_JENKINS_PLUGIN_TARGET_HOST=agent-host

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

To verify that CI Visibility is enabled, go to `Jenkins Log` and search for:

{{< code-block lang="text" >}}
Re/Initialize Datadog-Plugin Agent Http Client
TRACE -> http://<HOST>:<TRACE_PORT>/v0.3/traces
{{< /code-block >}}

## Enable job log collection

This is an optional step that enables the collection of job logs. It involves two steps: enabling the job collection port on the Datadog Agent, and enabling job collection on the Datadog Plugin.

### Datadog Agent

First, enable job log collection on the Datadog Agent by opening a TCP port to collect logs:

1. Add `logs_enabled: true` to your Agent configuration file `datadog.yaml`, or set the `DD_LOGS_ENABLED=true` environment variable.

2. Create a file at `/etc/datadog-agent/conf.d/jenkins.d/conf.yaml` on Linux with the contents below. Make sure that `service` matches the CI instance name provided earlier. For other operating systems, see [Agent configuration directory][5] guide.

{{< code-block lang="yaml" >}}
logs:
  - type: tcp
    port: 10518
    service: my-jenkins-instance
    source: jenkins
{{< /code-block >}}

3. [Restart the Agent][6] for the changes to take effect.

With this setup, the Agent listens in port `10518` for logs.

### Datadog Plugin

Second, enable job log collection on the Datadog Plugin:

{{< tabs >}}
{{% tab "Using UI" %}}

1. In the web interface of your Jenkins instance, go to **Manage Jenkins > Configure System**.
2. Go to the `Datadog Plugin` section, scrolling down the configuration screen.
3. Select the `Datadog Agent` mode.
4. Configure the `Agent` host, if not previously configured.
5. Configure the `Log Collection` port, as configured in the previous step.
6. Click on `Enable Log Collection` checkbox to activate it.
7. Check the connectivity with the Datadog Agent.
8. Save your configuration.
{{% /tab %}}
{{% tab "Using configuration-as-code" %}}
If your Jenkins instance uses the Jenkins [`configuration-as-code`][1] plugin:

1. Create or modify the configuration YAML for the entry `datadogGlobalConfiguration`:
    ```yaml
    unclassified:
    datadogGlobalConfiguration:
        # Select the `Datadog Agent` mode.
        reportWith: "DSD"
        # Configure the `Agent` host
        targetHost: "agent-host"
        # Configure the `Log Collection` port, as configured in the previous step.
        targetLogCollectionPort: 10518
        # Enable Log collection
        collectBuildLogs: true
    ```
2. In your Jenkins instance web interface, go to **Manage Jenkins > Configuration as Code**.
3. Apply or reload the configuration.
4. Check the configuration using the `View Configuration` button.

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md
{{% /tab %}}
{{% tab "Using Groovy" %}}

1. In your Jenkins instance web interface, go to **Manage Jenkins > Script Console**.
2. Run the configuration script:
    ```groovy
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Select the Datadog Agent mode
    d.setReportWith('DSD')

    // Configure the Agent host, if not previously configured.
    d.setTargetHost('<agent host>')

    // Configure the Log Collection port, as configured in the previous step.
    d.setTargetLogCollectionPort(10518)

    // Enable log collection
    d.setCollectBuildLogs(true)

    // Save config
    d.save()
    ```
{{% /tab %}}
{{% tab "Using Environment Variables" %}}

1. Set the following environment variables on your Jenkins instance machine:
    ```bash
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=DSD

    # Configure the Agent host
    DATADOG_JENKINS_PLUGIN_TARGET_HOST=agent-host

    # Configure the Log Collection port, as configured in the previous step.
    DATADOG_JENKINS_PLUGIN_TARGET_LOG_COLLECTION_PORT=10518

    # Enable log collection
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
    ```
2. Restart your Jenkins instance.

{{% /tab %}}
{{< /tabs >}}

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

## Set Git information manually

The Jenkins plugin uses environment variables to determine the Git information. However, these environment variables are not always set
automatically due to dependencies on the Git plugin that is being used in the pipeline.

If the Git information is not detected automatically, you can set the following environment variables manually.

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

### Setting custom tags for your pipelines

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

### Setting global custom tags

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

### Including or excluding pipelines

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

## Visualize pipeline data in Datadog

Once the integration is successfully configured, both the [Pipelines][7] and [Pipeline Executions][8] pages populate with data after pipelines finish.

**Note**: The Pipelines page shows data for only the default branch of each repository.

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
[2]: https://docs.datadoghq.com/agent/cluster_agent/admission_controller/
[3]: https://plugins.jenkins.io/datadog/
[4]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[5]: /agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/pipeline-executions
