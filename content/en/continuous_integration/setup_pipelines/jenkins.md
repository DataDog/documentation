---
title: Set up Tracing on a Jenkins Pipeline
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

## Compatibility

Supported Jenkins versions:
* Jenkins >= 2.164.1

## Prerequisite

Install the [Datadog Agent][1] on the Jenkins controller instance.

If the Jenkins controller and the Datadog Agent have been deployed to a Kubernetes cluster, Datadog recommends using the [Admission Controller][2], which automatically sets the `DD_AGENT_HOST` environment variable in the Jenkins controller pod to communicate with the local Datadog Agent.

## Install the Datadog Jenkins plugin

Install and enable the [Datadog Jenkins plugin][3] v3.1.0 or newer:

1. In your Jenkins instance web interface, go to **Manage Jenkins > Manage Plugins**.
2. In the [Update Center][4] on the **Available** tab, search for `Datadog Plugin`.
3. Select the checkbox next to the plugin, and install using one of the two install buttons at the bottom of the screen.
4. To verify that the plugin is installed, search for `Datadog Plugin` on the **Installed** tab.

## Enabling CI Visibility on the plugin

1. In your Jenkins instance web interface, go to **Manage Jenkins > Configure System**.
2. Go to the `Datadog Plugin` section, scrolling down the configuration screen.
3. Select the `Datadog Agent` mode.
4. Configure the `Agent` host.
5. Configure the `Traces Collection` port (default `8126`).
6. Click on `Enable CI Visibility` checkbox to activate it.
7. (Optional) Configure your CI Instance name.
8. Check the connectivity with the Datadog Agent.
9. Save your configuration.
10. To verify that CI Visibility is enabled, go to `Jenkins Log` and search for:

{{< code-block lang="text" >}}
Re/Initialize Datadog-Plugin Agent Http Client
TRACE -> http://<HOST>:<TRACE_PORT>/v0.3/traces
{{< /code-block >}}

{{< img src="ci/ci-jenkins-plugin-config.png" alt="Datadog Plugin configuration for Jenkins" style="width:100%;">}}

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

1. In the web interface of your Jenkins instance, go to **Manage Jenkins > Configure System**.
2. Go to the `Datadog Plugin` section, scrolling down the configuration screen.
3. Select the `Datadog Agent` mode.
4. Configure the `Agent` host, if not previously configured.
5. Configure the `Log Collection` port, as configured in the previous step.
6. Click on `Enable Log Collection` checkbox to activate it.
7. Check the connectivity with the Datadog Agent.
8. Save your configuration.

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
