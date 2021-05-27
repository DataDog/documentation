---
title: Setup Tracing on a Jenkins Pipeline
kind: documentation
further_reading:
    - link: "/ci/filename/"
      tag: "Documentation"
      text: "linktext"
---

## Prerequisite

Install the [Datadog Agent][1] on the Jenkins master instance.

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

**Note**: Do not use the Jenkins UI interface to activate logs collection, as trace collection might be disabled when saving settings using the UI.


## Set the default branch name

To report pipeline results, attach the default branch name (for example, `main`) to pipeline spans in an attribute called `git.default_branch`. This is usually done automatically, but in some cases the plugin cannot extract this information because it might not be provided by Jenkins.

If this happens, set the default branch manually using the `DD_GIT_DEFAULT_BRANCH` environment variable in your build. For example:

```groovy
pipeline {
    agent any
    environment {
        DD_GIT_DEFAULT_BRANCH = 'master'
        ...
    }
    stages {
        ...
    }
}
```


## Visualize pipeline data in Datadog

Once the integration is successfully configured, both [Pipelines][6] and [Pipeline Executions][7] pages will start populating with data after pipelines finish.

Note that the Pipelines page shows data for only the default branch of each repository.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: https://plugins.jenkins.io/datadog/
[3]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[4]: /agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[5]: /agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: https://app.datadoghq.com/ci/pipelines
[7]: https://app.datadoghq.com/ci/pipeline-executions
