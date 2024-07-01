---
title: Jenkins
description: Configure your Jenkins instance to run Continuous Testing tests in your CI/CD pipelines.
aliases:
  - /synthetics/cicd_integrations/jenkins
further_reading:
- link: "https://www.datadoghq.com/blog/jenkins-testing/"
  tag: Blog
  text: Run Datadog Synthetic tests in your Jenkins pipelines
- link: /continuous_integration/setup_pipelines/jenkins/
  tag: Documentation
  text: Set up Tracing on a Jenkins pipeline
---

## Overview

Add Continuous Testing tests to your Jenkins environment.

Datadog recommends discussing with your SRE and Infrastructure teams to determine a solution that models your existing Jenkins architecture and customizes an installation that fits your business requirements.

## Setup

To use Docker in your Jenkins environment, see [Using Docker with Pipeline][1].

### Prerequisites

* Node.js v10.24.1+
* A global JSON configuration file uploaded to your Jenkins instance through the [Config File Provider][2]. You need this file to define the global properties for your Synthetics test setup.

You can store environment variables directly within the global configuration file or [use credentials][3]. For more information about test configurations, see [Configure tests][4].

### Run the `@datadog/datadog-ci` package

Install and run the Node.js and npm packages within your Jenkins environment with the Jenkins Node.js plugin.

For more information about the existing Datadog-Jenkins integration, see [Set up Tracing on a Jenkins Pipeline][5].

### Add a Node.js installation

Navigate to the global Jenkins Configuration panel and add a Node.js installation.

{{< img src="synthetics/cicd_integrations/jenkins/nodejs-installation.png" alt="Node.js Installations in Jenkins" style="width:80%;">}}

Install `@datadog/datadog-ci` globally for all relevant Node.js installations.

#### Tags

To run Continuous Testing tests with tags in a Jenkins Declarative pipeline:

{{< code-block lang="groovy" disable_copy="false" collapsible="true" >}}
pipeline {
   agent any
   stages {
       stage('Run e2e tests') {
           steps {
               withCredentials([string(credentialsId: 'datadog-api-key', variable: 'DATADOG_API_KEY'), string(credentialsId: 'datadog-app-key', variable: 'DATADOG_APP_KEY')]) {
                   nodejs(nodeJSInstallationName: 'Node 10.24.x') {
                       configFileProvider(
                           [configFile(fileId: 'config-file-id', variable: 'DATADOG_CI_CONFIG')]) {
                           sh 'datadog-ci synthetics run-tests -s "tag:e2e" --config $DATADOG_CI_CONFIG'
                       }
                   }
               }
           }
       }
   }
{{< /code-block >}}

#### Custom test file

To run Continuous Testing tests with a custom test file in a Jenkins Declarative pipeline:

{{< code-block lang="groovy" disable_copy="false" collapsible="true" >}}
pipeline {
   agent any
   stages {
       stage('Run e2e tests') {
           steps {
               withCredentials([string(credentialsId: 'datadog-api-key', variable: 'DATADOG_API_KEY'), string(credentialsId: 'datadog-app-key', variable: 'DATADOG_APP_KEY')]) {
                   nodejs(nodeJSInstallationName: 'Node 10.24.x') {
                       configFileProvider(
                           [configFile(fileId: 'config-file-id', variable: 'DATADOG_CI_CONFIG'), configFile(fileId: 'test-file-id', variable: 'DATADOG_CI_TEST_FILE')]) {
                           sh 'datadog-ci synthetics run-tests -f $DATADOG_CI_TEST_FILE --config $DATADOG_CI_CONFIG'
                       }
                   }
               }
           }
       }
   }
}
{{< /code-block >}}

You can expect the following output:

{{< img src="synthetics/cicd_integrations/jenkins/example-test-run.png" alt="Example Test Run in Jenkins" style="width:80%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/pipeline/docker/#using-docker-with-pipeline
[2]: https://plugins.jenkins.io/config-file-provider/
[3]: https://www.jenkins.io/doc/book/using/using-credentials/#adding-new-global-credentials
[4]: /continuous_testing/cicd_integrations/configuration#configure-tests
[5]: /continuous_integration/pipelines/jenkins/
