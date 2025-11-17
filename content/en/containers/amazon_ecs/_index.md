---
title: Amazon ECS
description: Install and configure the Datadog Agent on Amazon Elastic Container Service
aliases:
  - /agent/amazon_ecs/
further_reading:
- link: "/agent/amazon_ecs/logs/"
  tag: "Documentation"
  text: "Collect your application logs"
- link: "/agent/amazon_ecs/apm/"
  tag: "Documentation"
  text: "Collect your application traces"
- link: "/agent/amazon_ecs/data_collected/#metrics"
  tag: "Documentation"
  text: "Collect ECS metrics"
- link: "https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/"
  tag: "Blog"
  text: "Announcing support for Amazon ECS Anywhere"
- link: "https://www.datadoghq.com/blog/cloud-cost-management-container-support/"
  tag: "blog"
  text: "Understand your Kubernetes and ECS spend with Datadog Cloud Cost Management"
- link: "https://www.datadoghq.com/blog/ecs-default-monitors/"
  tag: "Blog"
  text: "Catch and remediate ECS issues faster with default monitors and the ECS Explorer"
- link: "https://www.datadoghq.com/architecture/using-datadog-with-ecs-fargate/"
  tag: "Architecture Center"
  text: "Using Datadog with ECS Fargate"
algolia:
  tags: ['ecs']
---

## Overview

Amazon ECS is a scalable, high-performance container orchestration service that supports Docker containers. With the Datadog Agent, you can monitor ECS containers and tasks on every EC2 instance in your cluster.

To configure Amazon ECS with Datadog, you can either use **Fleet Automation** or **install manually**. If you prefer to install manually, run one Agent container per Amazon EC2 host by creating a Datadog Agent task definition and deploying it as a daemon service. Each Agent then monitors the other containers on its host. See the [Install manually](#install-manually) section for more details.


## Fleet Automation setup
Follow the [in-app installation guide in Fleet Automation][32] to complete setup on ECS. After completing the outlined steps in the in-app guide, [Fleet Automation][33] generates a ready-to-use task definition or CloudFormation template, with your API key pre-injected.

{{< img src="agent/basic_agent_usage/ecs_install_page.png" alt="In-app installation steps for the Datadog Agent on ECS." style="width:90%;">}}

<div class="alert alert-info">
If you want to monitor <strong>ECS on Fargate</strong>, see <a href="/integrations/ecs_fargate/">Amazon ECS on AWS Fargate</a>.
</div>

<br>

## Manual setup

To monitor your ECS containers and tasks, deploy the Datadog Agent as a container **once on each EC2 instance** in your ECS cluster. You can do this by creating a task definition for the Datadog Agent container and deploying it as a daemon service. Each Datadog Agent container then monitors the other containers on its respective EC2 instance.

The following instructions assume that you have configured an EC2 cluster. See the [Amazon ECS documentation for creating a cluster][4].

1. [Create and add an ECS task definition][27]
2. [Schedule the Datadog Agent as a daemon service][28]
3. (Optional) [Set up additional Datadog Agent features][29]

**Note:** Datadog's [Autodiscovery][5] can be used in conjunction with ECS and Docker to automatically discover and monitor running tasks in your environment.

{{% site-region region="gov" %}}
## FIPS Compliance

Some setup steps are different for FIPS compliance. Please take into account the specific setup instructions in the [FIPS Compliance][32] documentation.

[32]: /agent/configuration/fips-compliance/
{{% /site-region %}}

### Create an ECS task definition

This [ECS task definition][30] launches the Datadog Agent container with the necessary configurations. When you need to modify the Agent configuration, update this task definition and redeploy the daemon service. You can configure this task definition by using the AWS Management Console, or with the [AWS CLI][9].

The following sample is a minimal configuration for core infrastructure monitoring. However, additional Task Definition samples with various features enabled are provided in the [Setup additional Agent features](#setup-additional-agent-features) section if you want to use those instead.

#### Create and manage the task definition file

1. For Linux containers, download [datadog-agent-ecs.json][20].
    - If you are using Amazon Linux 1 (AL1, formerly Amazon Linux AMI), use [datadog-agent-ecs1.json][21]
    - If you are using Windows, use [datadog-agent-ecs-win.json][22]

   <div class="alert alert-info">
   These files provide minimal configuration for core infrastructure monitoring. For more sample task definition files with various features enabled, see the <a href="#set-up-additional-agent-features">Set up additional Agent features</a> section on this page.
   </div>
2. Edit your base task definition file
    - Set the `DD_API_KEY` environment variable by replacing `<YOUR_DATADOG_API_KEY>` with the [Datadog API key][14] for your account. Alternatively, you can also [supply the ARN of a secret stored in AWS Secrets Manager][16].
    - Set the `DD_SITE` environment variable to your [Datadog site][13]. Your site is: {{< region-param key="dd_site" code="true" >}}

      <div class="alert alert-info">
      If <code>DD_SITE</code> is not set, it defaults to the <code>US1</code> site, <code>datadoghq.com</code>.
      </div>
    - Optionally, add a `DD_TAGS` environment variable to specify any additional tags.

3. (Optional) To deploy on an [ECS Anywhere cluster][15], add the following line to your ECS task definition:
    ```json
    "requiresCompatibilities": ["EXTERNAL"]
    ```

4. (Optional) To add an Agent health check, add the following line to your ECS task definition:
    ```json
    "healthCheck": {
      "retries": 3,
      "command": ["CMD-SHELL","agent health"],
      "timeout": 5,
      "interval": 30,
      "startPeriod": 15
    }
    ```


#### Register the task definition

{{< tabs >}}
{{% tab "AWS CLI" %}}
After you have created your task definition file, execute the following command to register the file in AWS.

```bash
aws ecs register-task-definition --cli-input-json file://<path to datadog-agent-ecs.json>
```
{{% /tab %}}
{{% tab "Web UI" %}}
After you have your task definition file, use the AWS Console to register the file.
1. Log in to your AWS Console and navigate to the Elastic Container Service section.
2. Select **Task Definitions** in the navigation pane. On the **Create new task definition** menu, select **Create new task definition with JSON**.
3. In the JSON editor box, paste the contents of your task definition file.
4. Select **Create**.

{{% /tab %}}
{{< /tabs >}}


### Run the Agent as a daemon service

To have one Datadog Agent container running on each EC2 instance, run the Datadog Agent task definition as a [daemon service][10].

#### Schedule a daemon service in AWS using Datadog's ECS task

1. Log in to the AWS Console and navigate to the ECS section. On the **Clusters** page, choose the cluster you run the Agent on.
2. On your cluster's **Services** tab, select **Create**.
3. Under **Deployment configuration**, for **Service type**, select **Daemon**.
3. You do not need to configure load balancing or autoscaling.
4. Click **Next Step**, and then **Create Service**.

### Set up additional Agent features

The task definition files provided in the previous section are minimal. These files deploy an Agent container with a base configuration to collect core metrics about the containers in your ECS cluster. The Agent can also run Agent integrations [based on Docker Labels][12] discovered on your containers.

For additional features:

#### APM
Consult the [APM setup documentation][6] and the sample [datadog-agent-ecs-apm.json][23].

#### Log Management
Consult the [Log collection documentation][7] and the sample [datadog-agent-ecs-logs.json][24]

#### DogStatsD

If you're using [DogStatsD][8], edit your Datadog Agent's container definition to add in host port mapping for 8125/udp and set the environment variable `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` to `true`.:

{{< highlight json "hl_lines=6-12 23-24" >}}
{
 "containerDefinitions": [
  {
   "name": "datadog-agent",
   (...)
   "portMappings": [
     {
      "hostPort": 8125,
      "protocol": "udp",
      "containerPort": 8125
     }
   ],
   "environment" : [
     {
       "name": "DD_API_KEY",
       "value": "<YOUR_DATADOG_API_KEY>"
     },
     {
       "name": "DD_SITE",
       "value": "datadoghq.com"
     },
     {
       "name": "DD_DOGSTATSD_NON_LOCAL_TRAFFIC",
       "value": "true"
     }
   ]
  }
 ],
 (...)
}
{{< /highlight >}}

This setup allows DogStatsD traffic to be routed from the application containers, through the host and host port, to the Datadog Agent container. However, the application container must use the host's private IP address for this traffic. You can enable this by setting the environment variable `DD_AGENT_HOST` to the private IP address of the EC2 instance, which you can retrieve from the Instance Metadata Service (IMDS). Alternatively, you can set this in the code during initialization. The implementation for DogStatsD is the same as for APM. See [Configure the Trace Agent endpoint][17] for examples of setting the Agent endpoint.

Ensure that the security group settings on your EC2 instances do not publicly expose the ports for APM and DogStatsD.

#### Process collection

To collect Live Process information for all your containers and send it to Datadog, update your task definition with the `DD_PROCESS_AGENT_ENABLED` environment variable:

{{< highlight json "hl_lines=16-17" >}}
{
 "containerDefinitions": [
  {
   "name": "datadog-agent",
   (...)
   "environment" : [
     {
       "name": "DD_API_KEY",
       "value": "<YOUR_DATADOG_API_KEY>"
     },
     {
       "name": "DD_SITE",
       "value": "datadoghq.com"
     },
     {
       "name": "DD_PROCESS_AGENT_ENABLED",
       "value": "true"
     }
   ]
  }
 ],
 (...)
}
{{< /highlight >}}

#### Cloud Network Monitoring

<div class="alert alert-danger">
This feature is only available for Linux.
</div>

Consult the sample [datadog-agent-sysprobe-ecs.json][25] file.

If you are using Amazon Linux 1 (AL1, formerly Amazon Linux AMI), consult [datadog-agent-sysprobe-ecs1.json][26].

If you already have a task definition, update your file to include the following configuration:

 ```json
 {
   "containerDefinitions": [
     (...)
       "mountPoints": [
         (...)
         {
           "containerPath": "/sys/kernel/debug",
           "sourceVolume": "debug"
         },
         (...)
       ],
       "environment": [
         (...)
         {
           "name": "DD_SYSTEM_PROBE_NETWORK_ENABLED",
           "value": "true"
         }
       ],
       "linuxParameters": {
        "capabilities": {
          "add": [
            "SYS_ADMIN",
            "SYS_RESOURCE",
            "SYS_PTRACE",
            "NET_ADMIN",
            "NET_BROADCAST",
            "NET_RAW",
            "IPC_LOCK",
            "CHOWN"
          ]
        }
      },
   ],
   "requiresCompatibilities": [
    "EC2"
   ],
   "volumes": [
     (...)
     {
      "host": {
        "sourcePath": "/sys/kernel/debug"
      },
      "name": "debug"
     },
     (...)
   ],
   "family": "datadog-agent-task"
 }
 ```
#### Network Path

<div class="alert alert-info">Network Path for Datadog Cloud Network Monitoring is in Limited Availability. Reach out to your Datadog representative to sign up.</div>

1. To enable [Network Path][31] on your ECS clusters, enable the `system-probe` traceroute module by adding the following environment variable in your `datadog-agent-sysprobe-ecs.json` file:

   ```json
      "environment": [
        (...)
        {
          "name": "DD_TRACEROUTE_ENABLED",
          "value": "true"
        }
      ],
   ```

2. To monitor individual paths, follow the instructions here to [set up additional Agent features](#set-up-additional-agent-features):

   These files deploy an Agent container with a base configuration to collect core metrics about the containers in your ECS cluster. The Agent can also run Agent integrations based on Docker Labels discovered on your containers.

3. To monitor network traffic paths and allow the Agent to automatically discover and monitor network paths based on actual network traffic, without requiring you to specify endpoints manually, add the following additional environment variables to your `datadog-agent-sysprobe-ecs.json`:

   ```json
      "environment": [
        (...)
        {
          "name": "DD_NETWORK_PATH_CONNECTIONS_MONITORING_ENABLED",
          "value": "true"
        }
      ],
   ```

4. Optionally, to configure number of workers (default is 4) adjust the following environment variable in your `datadog-agent-sysprobe-ecs.json` file:

   ```json
      "environment": [
        (...)
        {
          "name": "DD_NETWORK_PATH_COLLECTOR_WORKERS",
          "value": "10"
        }
      ],
   ```
## AWSVPC mode

For Agent v6.10+, `awsvpc` mode is supported for applicative containers, provided that security groups are set to allow the host instance's security group to reach the applicative containers on relevant ports.

You can run the Agent in `awsvpc` mode, but Datadog does not recommend this because it may be difficult to retrieve the ENI IP to reach the Agent for DogStatsD metrics and APM traces. Instead, run the Agent in bridge mode with port mapping to allow easier retrieval of [host IP through the metadata server][6].

## Troubleshooting

Need help? Contact [Datadog support][11].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-ec2-cluster-console-v2.html
[5]: https://docs.datadoghq.com/agent/autodiscovery/
[6]: /containers/amazon_ecs/apm/
[7]: /containers/amazon_ecs/logs/
[8]: /developers/dogstatsd/?tab=containeragent
[9]: https://aws.amazon.com/cli
[10]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html#service_scheduler_daemon
[11]: https://docs.datadoghq.com/help/
[12]: https://docs.datadoghq.com/containers/docker/integrations/?tab=docker
[13]: /getting_started/site/
[14]: https://app.datadoghq.com/organization-settings/api-keys
[15]: https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/
[16]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[17]: /containers/amazon_ecs/apm/?tab=ec2metadataendpoint#configure-the-trace-agent-endpoint
[20]: /resources/json/datadog-agent-ecs.json
[21]: /resources/json/datadog-agent-ecs1.json
[22]: /resources/json/datadog-agent-ecs-win.json
[23]: /resources/json/datadog-agent-ecs-apm.json
[24]: /resources/json/datadog-agent-ecs-logs.json
[25]: /resources/json/datadog-agent-sysprobe-ecs.json
[26]: /resources/json/datadog-agent-sysprobe-ecs1.json
[27]: #create-an-ecs-task-definition
[28]: #run-the-agent-as-a-daemon-service
[29]: #set-up-additional-agent-features
[30]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
[31]: /network_monitoring/network_path
[32]: https://app.datadoghq.com/fleet/install-agent/latest?platform=ecs
[33]: https://app.datadoghq.com/fleet/install-agent/latest?platform=ecs
