---
"aliases":
- "/integrations/awsbeanstalk/"
- "/developers/faq/i-want-my-application-deployed-in-a-container-through-elasticbeanstalk-to-talk-to-dogstatsd/"
"categories":
- "aws"
- "cloud"
- "configuration & deployment"
- "log collection"
- "network"
- "provisioning"
"custom_kind": "インテグレーション"
"dependencies": []
"description": "Track key AWS Elastic Beanstalk metrics."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_elasticbeanstalk/"
"draft": false
"further_reading":
- "link": "https://www.datadoghq.com/blog/deploy-datadog-aws-elastic-beanstalk"
  "tag": "ブログ"
  "text": "AWS Elastic Beanstalk への Datadog のデプロイ"
"git_integration_title": "amazon_elasticbeanstalk"
"has_logo": true
"integration_id": ""
"integration_title": "AWS Elastic Beanstalk"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_elasticbeanstalk"
"public_title": "Datadog-AWS Elastic Beanstalk Integration"
"short_description": "Track key AWS Elastic Beanstalk metrics."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Overview

AWS Elastic Beanstalk is an easy-to-use service for deploying and scaling web applications and services developed with Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker on familiar servers such as Apache, Nginx, Passenger, and IIS.

## セットアップ

### インストール

If you haven't already, set up the [Amazon Web Services integration][1] first. To receive Elastic Beanstalk metrics, you must [enable the Enhanced Health Reporting][2] feature for your environment, and configure your environment to [publish enhanced health metrics to CloudWatch][3].

**Note**: These settings increase your CloudWatch custom metric charges.

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_elasticbeanstalk" >}}


Each of the metrics retrieved from AWS are assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### イベント

The AWS Elastic Beanstalk integration does not include any events.

### サービスチェック

The AWS Elastic Beanstalk integration does not include any service checks.

## Datadog Agent Configuration

The following steps deploy the Datadog Agent on your Elastic Beanstalk VMs, so they report host metrics in addition to the metrics crawled by the AWS integration. Read [Why should I install the Datadog Agent on my cloud instances?][4] for more information.

Select your installation method to configure the Agent in your Elastic Beanstalk environment:

{{< tabs >}}

{{% tab "No containers (Linux)" %}}

For a no container setup, install the Datadog Agent in Elastic Beanstalk using [Advanced Environment Customization with Configuration Files][1] (.ebextensions):

1. Create a folder named `.ebextensions` in the root of your [application source bundle][2].
2. Download [99datadog.config][3] and put it in the `.ebextensions` folder.
3. Change the value of `api_key` within the file template for `/etc/datadog-agent/datadog.yaml` with your [Datadog API Key][4].
4. Change the value of `site` in `/etc/datadog-agent/datadog.yaml` to your Datadog region (for example: {{< region-param key="dd_site" code="true" >}}) to ensure the Agent sends data to the right Datadog location.
5. Pin a specific Agent version by setting `DD_AGENT_VERSION` under `option_settings` to ensure that all hosts run the same version of the Agent.
6. Deploy your application with the [Elastic Beanstalk Console][5], [EB CLI][6], or [AWS CLI][7].

You can add additional Agent settings to `/etc/datadog-agent/datadog.yaml`.

For example, to enable Live Process Monitoring:

```text
process_config:
  enabled: "true"
```

#### Trace collection

When the application isn't containerized and the Datadog Agent is configured with `99datadog.config`, tracing is enabled without any additional configuration, provided the application is instrumented with the [tracing library setup][8].



[1]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html
[3]: https://docs.datadoghq.com/config/99datadog.config
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-console-ebextensions
[6]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli
[7]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-awscli
[8]: https://docs.datadoghq.com/tracing/setup/
{{% /tab %}}

{{% tab "No containers (Windows)" %}}

For a no container setup, install the Datadog Agent in Elastic Beanstalk using [Advanced Environment Customization with Configuration Files][1] (.ebextensions):

1. Create a folder named `.ebextensions` in the root of your [application source bundle][2].
2. Download [99datadog-windows.config][3] and move it to the `.ebextensions` folder.
3. In `99datadog-windows.config`, replace the `APIKEY` value with your [Datadog API Key][4].
4. (Optional) The `99datadog-windows.config` file adds the .NET APM Tracing Library to generate traces. If you don't want to enable APM in your environment, remove the `packages` section, the `02_setup-APM1` section, and the `03_setup-APM2` section.
5. (Optional) If you need to add environment variables, set them in the `00_setup-env1` section of `99datadog-windows.config`. You can remove this section if you do not need to set environment variables.
6. Deploy your application with the [Elastic Beanstalk Console][5], [EB CLI][6], or [AWS CLI][7].

#### Trace collection

When the application isn't containerized and the Datadog Agent is configured with `99datadog-windows.config`, tracing is enabled without any additional configuration. For more information on instrumenting tracing, see [Set up Datadog APM][8].



[1]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html
[3]: https://docs.datadoghq.com/config/99datadog-windows.config
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-console-ebextensions
[6]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli
[7]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-awscli
[8]: https://docs.datadoghq.com/tracing/setup/
{{% /tab %}}

{{% tab "Single container" %}}

For a single Docker container setup, install the Datadog Agent in Elastic Beanstalk using [Advanced Environment Customization with Configuration Files][1] (.ebextensions).

**Note**: This setup requires your API key to be placed in the .ebextensions directory, which is part of the source code. Use [AWS Secret Manager][2] or other secret management tooling to protect your API key.

1. Create a folder named `.ebextensions` in the root of your [application source bundle][3].
2. Download [99datadog.config][4] and put it in the `.ebextensions` folder.
3. Change the value of `api_key` within the file template for `/etc/datadog-agent/datadog.yaml` with your [Datadog API Key][5].
4. Change the value of `site` in `/etc/datadog-agent/datadog.yaml` to your Datadog region (for example: {{< region-param key="dd_site" code="true" >}}) to ensure the Agent sends data to the right Datadog location.
5. Pin a specific Agent version by setting `DD_AGENT_VERSION` under `option_settings` to ensure that all hosts run the same version of the Agent.
6. Deploy your application with the [Elastic Beanstalk Console][6], [EB CLI][7], or [AWS CLI][8].

You can add additional Agent settings to `/etc/datadog-agent/datadog.yaml`.

For example, to enable Live Process Monitoring:

```text
process_config:
  enabled: "true"
```

#### Trace collection

To enable tracing for single Docker containers:

1. Update the `/etc/datadog-agent/datadog.yaml` section in the `99datadog.config` file with `apm_non_local_traffic`, formatted like this:

    ```
    apm_config:
      enabled: "true"
      apm_non_local_traffic: "true"
    ```

2. Set up the tracing libraries to direct traces to the [Gateway IP of the bridge network][9], which defaults to `172.17.0.1` from inside the application container. (If you're not sure this is the Gateway IP, run `docker inspect <container id>` to confirm.)

For all languages, set the environment variable `DD_AGENT_HOST` to the Gateway IP. Alternatively, for the languages below, set the host name programmatically using:

##### Python

```python
from ddtrace import tracer

tracer.configure(hostname="172.17.0.1")
```

##### Node.js

```javascript
const tracer = require('dd-trace');

tracer.init({ hostname: "172.17.0.1" });
```

##### Ruby

```ruby
require 'ddtrace'

Datadog.configure do |c|
  c.tracer hostname: "172.17.0.1")
end
```

##### Go

```go
package main

import (
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
  tracer.Start(tracer.WithAgentAddr("172.17.0.1"))
  defer tracer.Stop()

  // ...
}
```



[1]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html
[2]: https://aws.amazon.com/secrets-manager/
[3]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/applications-sourcebundle.html
[4]: https://docs.datadoghq.com/config/99datadog.config
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-console-ebextensions
[7]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-ebcli
[8]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-configuration-methods-during.html#configuration-options-during-awscli
[9]: https://docs.docker.com/network/network-tutorial-standalone/
{{% /tab %}}

{{% tab "Multiple containers" %}}

For multiple Docker containers, use the containerized Datadog Agent to monitor Docker usage with a file named `Dockerrun.aws.json`.

A `Dockerrun.aws.json` file is an Elastic Beanstalk—specific JSON file that describes how to deploy a set of Docker containers as an Elastic Beanstalk application. You can use this file for a multicontainer Docker environment. `Dockerrun.aws.json` describes the containers to deploy to each container instance in the environment and the data volumes to create on the host instance for the containers to mount.

A `Dockerrun.aws.json` file can be used on its own or zipped up with additional source code in a single archive. Source code that is archived with `Dockerrun.aws.json` is deployed to container instances and accessible in the `/var/app/current/` directory. Use the `volumes` section of the config to provide mount points for the containers running on the instance and the `mountPoints` section of the embedded container definitions to mount them from the containers.

The following code sample illustrates a `Dockerrun.aws.json` declaring the Datadog Agent. Update the `containerDefinitions` section with your [Datadog API Key][1], tags (optional), and any additional container definitions. If needed, this file can be zipped with additional content as described above. For more info about the syntax of this file, see [Multicontainer Docker configuration][2].

**Notes**:

- For high resource usage, you may need a higher memory limit.
- To ensure all hosts run the same Agent version, it is recommended to change `agent:7` to a specific minor version of the [Docker image][3].
{{< site-region region="us3,eu,gov" >}}
- Set `DD_SITE` to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.
{{< /site-region >}}

```json
{
    "AWSEBDockerrunVersion": 2,
    "volumes": [
        {
            "name": "docker_sock",
            "host": {
                "sourcePath": "/var/run/docker.sock"
            }
        },
        {
            "name": "proc",
            "host": {
                "sourcePath": "/proc/"
            }
        },
        {
            "name": "cgroup",
            "host": {
                "sourcePath": "/cgroup/"
            }
        }
    ],
    "containerDefinitions": [
        {
            "name": "dd-agent",
            "image": "gcr.io/datadoghq/agent:7",
            "environment": [
                {
                    "name": "DD_API_KEY",
                    "value": "<YOUR_DD_API_KEY>"
                },
                {
                    "name": "DD_SITE",
                    "value": "<YOUR_DD_SITE>"
                },
                {
                    "name": "DD_TAGS",
                    "value": "<SIMPLE_TAG>, <KEY:VALUE_TAG>"
                }
            ],
            "memory": 256,
            "mountPoints": [
                {
                    "sourceVolume": "docker_sock",
                    "containerPath": "/var/run/docker.sock",
                    "readOnly": false
                },
                {
                    "sourceVolume": "proc",
                    "containerPath": "/host/proc",
                    "readOnly": true
                },
                {
                    "sourceVolume": "cgroup",
                    "containerPath": "/host/sys/fs/cgroup",
                    "readOnly": true
                }
            ]
        }
    ]
}
```

#### Creating the environment

Once the container definition is ready, ship it to Elastic Beanstalk. For specific instructions, see [Multicontainer Docker Environments][4] in the AWS Elastic Beanstalk documentation.

#### DogStatsD

To collect custom metrics from your application container using DogStatsD in the [Multicontainer Docker Environment][4], add the following to your `Dockerrun.aws.json`:

1. Add the environment variable `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` under the `dd-agent` container:

    ```json
    {
      "name": "DD_DOGSTATSD_NON_LOCAL_TRAFFIC",
      "value": "true"
    }
    ```

2. Add a link to the `dd-agent` container under your application container:

    ```text
    "links": [ "dd-agent:dd-agent"]
    ```

See [DogStatsD and Docker][5] for additional information.



[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_v2config.html
[3]: https://gcr.io/datadoghq/agent
[4]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker_ecstutorial.html
[5]: https://docs.datadoghq.com/integrations/faq/dogstatsd-and-docker/
{{% /tab %}}

{{< /tabs >}}

#### Multiple Docker containers

1. In the same `Dockerrun.aws.json` as the application, add a Datadog Agent container using the `datadog/agent` image. Add the following:
    - Under the `portMappings` section, add a `hostPort` 8126 with `containerPort` 8126.
    - Under the `environment` section, set`DD_APM_ENABLED` and `DD_APM_NON_LOCAL_TRAFFIC` to `true`.
2. Under your application container, which was instrumented with the [tracing library setup][14], add the following:
    - Under the `environment` section, add an environment variable called `DD_AGENT_HOST` to the name of the Datadog Agent container.
    - Under the `links` section, set the Agent container to be used as an environment variable.

An example can be seen below:

```text
 "containerDefinitions": [    {
      "name": "dd-agent",
      "image": "datadog/agent:latest",
      "environment": [
          {
              "name": "DD_API_KEY",
              "value": "<api key>"
          },
          {
              "name": "DD_APM_ENABLED",
              "value": "true"
          },
          {
             "name": "DD_APM_NON_LOCAL_TRAFFIC",
             "value": "true"
          },
         # any other environment variables needed
      ],
      "portMappings": [
        {
          "hostPort": 8126,
          "containerPort": 8126
        }
      ],
      "memory": 256,
      "mountPoints": [
          # any mountpoints needed
         }
      ]
    },
    {
      "name": "application-container",
      "image": "<application image name>",
      "environment": [
        {
          "name": "DD_AGENT_HOST",
          "value": "dd-agent",
          # any other environment variables needed
        }
      ],
      "links": [
        "dd-agent:dd-agent"
      ],

```

## トラブルシューティング

Need help? Contact [Datadog support][5].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced.html
[3]: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/health-enhanced-cloudwatch.html#health-enhanced-cloudwatch-console
[4]: https://docs.datadoghq.com/agent/guide/why-should-i-install-the-agent-on-my-cloud-instances/
[5]: https://docs.datadoghq.com/help/

