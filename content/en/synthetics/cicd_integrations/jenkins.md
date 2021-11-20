---
title: Jenkins
kind: documentation
description: 
further_reading:
- link: "/continuous_integration/setup_pipelines/jenkins/"
  tag: "Documentation"
  text: "Set up Tracing on a Jenkins Pipeline"
---

## Overview

Add Synthetic tests to your Jenkins environment. 

Datadog recommends discussing with your SRE and Infrastructure teams to determine a solution that models your existing Jenkins architecture and customizes an installation that fits your business requirements.

## Setup

To use Docker in your Jenkins environment, see [Using Docker with Pipeline][1].

### Prerequisites

* Node.js v10.24.1+
* A global JSON configuration file uploaded to your Jenkins instance through the [Config File Provider][2]. You need this file to define the global properties for your Synthetics test setup. 

You can store environment variables directly within the global configuration file or [use credentials][3]. For more information about test configurations, see [Configure tests][4].

### Run the `@datadog/datadog-ci` package

Install and run the Node.js and npm packages within your Jenkins environment with the Jenkins Node.js plugin.

For more information about the Datadog-Jenkins integration, see [Set up Tracing on a Jenkins Pipeline][5].

### Add a NodeJS installation

Navigate to the global Jenkins Configuration panel and add a Node.js installation. 

[Installation Screenshots to be added here]

Install `datadog-ci` globally for any relevant Node.js installations.

#### Tags 

To run Synthetic tests with tags in a Jenkins Declarative pipeline: 

{{< code-block lang="groovy" disable_copy="false" collapsible="true" >}}
pipeline {
    agent any
    stages {
        stage(‘Run e2e tests’) {
environment {
        DD_API_KEY     = credentials('jenkins-datadog-api-key')
        DD_APP_KEY = credentials('jenkins-datadog-application-key')
    }
            steps {
                nodejs(nodeJSInstallationName: 'Node 10.24.x') {
                    configFileProvider(
       		 [configFile(fileId: 'datadog-ci-config-file-id', variable: 'DATADOG_CI_CONFIG')]) {
       			 sh ‘datadog-ci run-tests -s ‘tag:e2e-test’ --config $DATADOG_CI_CONFIG '
  			  }
              	  }
            }
        }
    }
}
{{< /code-block >}}

#### Custom test file

To run Synthetic tests with a custom test file in a Jenkins Declarative pipeline:

{{< code-block lang="groovy" disable_copy="false" collapsible="true" >}}
pipeline {
  agent any
  stages {
    stage(‘Run e2e tests’) {
configFileProvider(
       		 [configFile(fileId: 'datadog-ci-config-file-id', variable: 'DATADOG_CI_CONFIG')]) {
 steps {
                	nodejs(nodeJSInstallationName: 'Node 10.24.x') {
                    	configFileProvider(
       		 [configFile(fileId: 'datadog-ci-test-file-id', variable: 'DATADOG_CI_TEST_FILE')]) {
       			 sh ‘datadog-ci run-tests -f $DATADOG_CI_TEST_FILE --config $DATADOG_CI_CONFIG '
  		  }
              }
            }
  	}
    }
  }
}

{{< /code-block >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/pipeline/docker/#using-docker-with-pipeline
[2]: https://plugins.jenkins.io/config-file-provider/
[3]: https://www.jenkins.io/doc/book/using/using-credentials/#adding-new-global-credentials
[4]: /synthetics/cicd_integrations/configuration#configure-tests
[5]: /continuous_integration/setup_pipelines/jenkins/
