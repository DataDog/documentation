---
title: Amazon ECS
aliases:
  - /agent/amazon_ecs/
further_reading:
- link: /agent/amazon_ecs/logs/
  tag: Documentation
  text: Collect your application logs
- link: /agent/amazon_ecs/apm/
  tag: Documentation
  text: Collect your application traces
- link: "/agent/amazon_ecs/data_collected/#metrics"
  tag: Documentation
  text: Collect ECS metrics
- link: "https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/"
  tag: Blog
  text: Announcing support for Amazon ECS Anywhere
- link: "https://www.datadoghq.com/blog/cloud-cost-management-container-support/"
  tag: blog
  text: Understand your Kubernetes and ECS spend with Datadog Cloud Cost Management
algolia:
  tags: [ecs]
---

## 概要

Amazon ECS は、Docker コンテナに対応する、拡張性とパフォーマンスに優れたコンテナオーケストレーションサービスです。Datadog Agent と使用すると、クラスター内のすべての EC2 インスタンスの ECS コンテナおよびタスクを監視できます。

<div class="alert alert-info">
If you want to monitor <strong>ECS on Fargate</strong>, see <a href="/integrations/ecs_fargate/">Amazon ECS on AWS Fargate</a>.  
</div>

## セットアップ

To monitor your ECS containers and tasks, deploy the Datadog Agent as a container **once on each EC2 instance** in your ECS cluster. You can do this by creating a task definition for the Datadog Agent container and deploying it as a daemon service. Each Datadog Agent container then monitors the other containers on its respective EC2 instance.

The following instructions assume that you have configured an EC2 cluster. See the [Amazon ECS documentation for creating a cluster][4].

1. [Create and add an ECS task definition][27]
2. [Schedule the Datadog Agent as a daemon service][28]
3. (Optional) [Set up additional Datadog Agent features][29]

**注:** ECS および Docker を併用して Datadog の[オートディスカバリー][5]を実行すると、環境内で実行中のタスクを自動的に検出して監視できます。

### Create an ECS task definition

This [ECS task definition][30] launches the Datadog Agent container with the necessary configurations. When you need to modify the Agent configuration, update this task definition and redeploy the daemon service. You can configure this task definition by using the AWS Management Console, or with the [AWS CLI][9]. 

以下のサンプルは、コアインフラストラクチャーを監視するための最小限の構成です。しかし、様々な機能を有効にした追加のタスク定義のサンプルが [Agent の追加機能の設定](#setup-additional-agent-features)のセクションで提供されていますので、それらを代わりに使用することができます。

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
1. AWS コンソールにログインし、Elastic コンテナサービス セクションに移動します。
2. Select **Task Definitions** in the navigation pane. On the **Create new task definition** menu, select **Create new task definition with JSON**.
3. In the JSON editor box, paste the contents of your task definition file.
4. **Create** を選択します。

{{% /tab %}}
{{< /tabs >}}


### Agent を Daemon サービスとして実行

To have one Datadog Agent container running on each EC2 instance, run the Datadog Agent task definition as a [daemon service][10].

#### Datadog の ECS タスクを使用して、AWS でDaemon サービスをスケジューリング

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

EC2 インスタンスのセキュリティグループ設定で、APM と DogStatsD のポートが公に公開されていないことを確認します。

#### プロセスの収集

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

#### ネットワークパフォーマンス監視

<div class="alert alert-warning">
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

## AWSVPC モード

Agent バージョン 6.10 以降は、ホストインスタンスのセキュリティグループが関連するポート上の適用可能なコンテナに到達できるよう、セキュリティグループが設定されている場合には、適用可能なコンテナに `awsvpc` モードが対応しています。

You can run the Agent in `awsvpc` mode, but Datadog does not recommend this because it may be difficult to retrieve the ENI IP to reach the Agent for DogStatsD metrics and APM traces. Instead, run the Agent in bridge mode with port mapping to allow easier retrieval of [host IP through the metadata server][6].

{{% site-region region="gov" %}}
#### FIPS proxy for Datadog for Government environments

<div class="alert alert-warning">
This feature is only available for Linux.
</div>

To send data to the Datadog for Government site, add the `fips-proxy` sidecar container and open container ports to ensure proper communication for [supported features][1].

```json
 {
   "containerDefinitions": [
     (...)
          {
            "name": "fips-proxy",
            "image": "datadog/fips-proxy:1.1.3",
            "portMappings": [
                {
                    "containerPort": 9803,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9804,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9805,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9806,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9807,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9808,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9809,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9810,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9811,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9812,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9813,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9814,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9815,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9816,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9817,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 9818,
                    "protocol": "tcp"
                }
            ],
            "essential": true,
            "environment": [
                {
                    "name": "DD_FIPS_PORT_RANGE_START",
                    "value": "9803"
                },
                {
                    "name": "DD_FIPS_LOCAL_ADDRESS",
                    "value": "127.0.0.1"
                }
            ]
        }
   ],
   "family": "datadog-agent-task"
}
```

また、Datadog Agent のコンテナの環境変数を更新して、FIPS プロキシを介したトラフィックの送信を可能にする必要があります。

```json
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest",
            (...)
            "environment": [
              (...)
                {
                    "name": "DD_FIPS_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_FIPS_PORT_RANGE_START",
                    "value": "9803"
                },
                {
                    "name": "DD_FIPS_HTTPS",
                    "value": "false"
                },
             ],
        },
    ],
   "family": "datadog-agent-task"
}
```
[1]: https://docs.datadoghq.com/agent/configuration/agent-fips-proxy/?tab=helmonamazoneks#supported-platforms-and-limitations
{{% /site-region %}}

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## 参考資料

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
