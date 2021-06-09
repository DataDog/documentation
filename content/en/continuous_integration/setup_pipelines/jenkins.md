---
title: Setup Tracing on a Jenkins Pipeline
kind: documentation
further_reading:
    - link: "/continuous_integration/explore_pipelines"
      tag: "Documentation"
      text: "Explore Pipeline Execution Results and Performance"
    - link: "/continuous_integration/troubleshooting/"
      tag: "Documentation"
      text: "Troubleshooting CI"
---

## Prerequisite

Install the [Datadog Agent][1] on the Jenkins controller instance.

## Install the Datadog Jenkins plugin

Install and enable the [Datadog Jenkins plugin][2] v2.1.1 or newer:

1. In your Jenkins instance web interface, go to **Manage Jenkins > Manage Plugins**.
2. In the [Update Center][3] on the **Available** tab, search for `Datadog Plugin`.
3. Select the checkbox next to the plugin, and install using one of the two install buttons at the bottom of the screen.
4. To configure the plugin, go to **Manage Jenkins > Configure System**, and find the Datadog Plugin section.
5. In the Datadog section, select the `Datadog Agent` mode.
6. Restart Jenkins to enable the plugin.

When the configuration is correct, the Jenkins log shows lines similar to this after the restart:

```
INFO    datadog.trace.core.CoreTracer#<init>: New instance: DDTracer-62fcf62{ ... }
INFO    datadog.trace.core.StatusLogger#logStatus: DATADOG TRACER CONFIGURATION { ... }
```

**Note**: Enabling the collection of traces using the Jenkins plugin is incompatible with running the Java APM tracer as a Java agent when launching Jenkins.


## Enable job log collection on the Agent

Enable log collection in the Agent:

1. Add `logs_enabled: true` to your Agent configuration file `datadog.yaml`, or set the `DD_LOGS_ENABLED=true` environment variable.

2. Create a file at `/etc/datadog-agent/conf.d/jenkins.d/conf.yaml` (for Linux; [check here for other operating systems][4]) with the following contents. Make sure that `service` matches the `traceServiceName` provided earlier:

```yaml
logs:
  - type: tcp
    port: 10518
    service: my-jenkins-instance
    source: jenkins
```

3. [Restart the Agent][5] for the changes to take effect.

With this setup, the Agent listens in port `10518` for logs.

## Enable job log collection in the plugin

Configure the Jenkins plugin to send job logs to the Agent:

1. Open the file: `$JENKINS_HOME\org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration.xml`

2.  Add or modify the following lines:

```xml
<targetLogCollectionPort>10518</targetLogCollectionPort>
<collectBuildLogs>true</collectBuildLogs>
```

3. Restart Jenkins for the changes to take effect.

**Note**: Do not use the Jenkins web GUI to activate logs collection, as trace collection might be disabled when saving settings using the GUI.


## Set the default branch name

To report pipeline results, attach the default branch name (for example, `main`) to pipeline spans in an attribute called `git.default_branch`. This is usually done automatically, but in some cases the plugin cannot extract this information because it might not be provided by Jenkins.

If this happens, set the default branch manually using the `DD_GIT_DEFAULT_BRANCH` environment variable in your build. For example:

```groovy
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
```
## Customization

### Setting custom tags for your pipelines

The Datadog plugin adds a `datadog` step that allows adding custom tags to your pipeline-based jobs.

In declarative pipelines, add the step to a top-level option block:

```groovy
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
```

In scripted pipelines, wrap the relevant section with the `datadog` step:

```groovy
datadog(tags: ["team:backend", "release:canary"]){
    node {
        stage('Example') {
            echo "Hello world."
        }
    }
}
```

### Setting global custom tags

You can configure the Jenkins Plugin to send custom tags in all pipeline traces:

1. Open the file `$JENKINS_HOME\org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration.xml`.
2. Add or modify the following lines:

    ```xml
    <globalTags>global_tag:global_value,global_tag2:${SOME_ENVVAR},${OTHER_ENVVAR}:global_tagvalue</globalTags>
    <globalJobTags>(.*?)_job_(*?)_release:someValue</globalJobTags>
    ```

    Global tags (`globalTags`)
    : A comma-separated list of tags to apply to all metrics, traces, events, and service checks. Tags can include environment variables that are defined in the Jenkins controller instance.

    Global job tags (`globalJobTags`)
    : A comma-separated list of regex to match a job and a list of tags to apply to that job. Tags can include environment variables that are defined in the Jenkins controller instance. Tags can reference match groups in the regex using the `$` symbol.

3. Restart Jenkins for the changes to take effect.

**Note**: Do not use the Jenkins GUI to configure global tags, as trace collection might be disabled when saving settings using the GUI.

## Visualize pipeline data in Datadog

Once the integration is successfully configured, both [Pipelines][6] and [Pipeline Executions][7] pages will start populating with data after pipelines finish.

**Note**: The Pipelines page shows data for only the default branch of each repository.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: https://plugins.jenkins.io/datadog/
[3]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[4]: /agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[5]: /agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: https://app.datadoghq.com/ci/pipelines
[7]: https://app.datadoghq.com/ci/pipeline-executions
