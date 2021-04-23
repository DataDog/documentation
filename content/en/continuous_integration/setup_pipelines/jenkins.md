---
title: Setup Tracing on a Jenkins Pipeline
kind: documentation
further_reading:
    - link: "/ci/filename/"
      tag: "Documentation"
      text: "linktext"
---
## Installation

Follow the official installation [guide][1].

To enable the APM traces collection for Jenkins builds and pipelines:

* Installed the Jenkins plugin v2.1.1+ (available in the Jenkins marketplace).
* Configure the Jenkins plugin to use the `Datadog Agent` mode.

APM Traces feature is only available if the `Datadog Agent` mode is selected.

### Manual installation from your local machine
During the alpha phase, you might need to install a release candidate artifact from your local machine manually. 

To do that, you can follow the next steps:
* Access to `$JENKINS_URL/pluginManager/advanced`
* In the `Upload Plugin` section, upload the `datadog.hpi` artifact from your local machine.
* Restart the Jenkins instance.

You don't have to remove the previous version explicitly. After these steps, the new uploaded version will override it.

## Enabling

Traces collection UI configuration is hidden for the general public.

To enable this feature, you need to activate it manually following the next steps:

*  Open a Terminal in the Jenkins instance
*  Navigate to `$JENKINS_HOME` folder
*  Open `org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration.xml` file
*  Add or modify the following XML nodes:

    ```
    <reportWith>DSD</reportWith>
    <targetApiKey>*******</targetApiKey>
    <targetHost>(use your datadog agent host)</targetHost>
    <targetPort>8125</targetPort>
    <targetLogCollectionPort>8125</targetLogCollectionPort>
    <targetTraceCollectionPort>8126</targetTraceCollectionPort>
    <traceServiceName>my-jenkins-instance</traceServiceName>
    <collectBuildTraces>true</collectBuildTraces>
    ```

*  Save and close.
*  Restart Jenkins.

If everything has been well configured, you should be able to see the following lines in the Jenkins log after restarting it:

```
INFO    datadog.trace.core.CoreTracer#<init>: New instance: DDTracer-62fcf62{ ... }
INFO    datadog.trace.core.StatusLogger#logStatus: DATADOG TRACER CONFIGURATION { ... }
``` 

Now you can use your Jenkins as you normally do.

**Note**: Please notice that it is not possible to enable traces collection in the Jenkins Datadog plugin and have the `dd-java-agent` in the classpath (for example, as `-javaagent` in your Jenkins startup command) at the same time.

### Connecting Logs and Traces

If you are already collecting logs in your Jenkins before enabling the traces collection, you don't need to perform additional actions.

If you are not collecting logs in your Jenkins yet, you need to enable the logs collection modifying the same file we used to enable the traces collection.

*  Add or modify the following XML nodes:

```
  <collectBuildLogs>true</collectBuildLogs>
```

*  Save and close.
*  Restart Jenkins.

**Important**: It's not recommended using the Jenkins UI interface to activate the logs collection if you want to connect Logs and Traces. The Traces feature is hidden in the UI and may cause the trace collection to be disabled if the UI is used directly. The best approach is to modify the XML file.

Finally, you need to enable logs collection in the [Datadog Agent][2]:

* Collecting logs is disabled by default in the Agent. Enable it in your `datadog.yaml` file:
```
logs_enabled: true
```
*  To collect Jenkins logs, create a custom log source file for your Agent by creating a `conf.yaml` inside `conf.d/jenkins.d` with the following:
```yaml
logs:
  - type: tcp 
    port: <PORT> 
    service: <SERVICE>
    source: jenkins
```
*  Restart the Agent.

The Jenkins plugin is configured to use the `8125` port by default. 

If you set a different one, you need to configure the same port you specified above as the Log Collection Port in the `org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration.xml` file:
```xml
  <targetPort><PORT></targetPort>
  <targetLogCollectionPort><PORT></targetLogCollectionPort>
```
and restart the Jenkins instance.

### Manual configuration of the default branch

The pipeline reported to Datadog needs to have the tag `git.default_branch`. 

In some occasions, the plugin cannot extract this information automatically because Jenkins is very selective on checking out only the minimum information required to execute the build.

You can set the default branch manually using the `DD_GIT_DEFAULT_BRANCH` environment variable in your build. 

Example:
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

## Datadog Agent

The [Datadog Agent][2] needs to be accessible by the Jenkins instance you are using.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/jenkinsci/datadog-plugin/blob/master/README.md
[2]: /agent/
