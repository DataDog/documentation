---
aliases:
- /ja/security/workload_protection/guide/ebpf-free-agent
description: AWS Fargate ECS および EKS ワークロードで Workload Protection を有効にします。
disable_toc: false
title: AWS Fargate での Workload Protection のセットアップ
---
Workload Protection を有効にするには、以下の手順に従ってください。

{{< partial name="security-platform/WP-billing-note.html" >}}

## 前提条件 {#prerequisites}

- AWS アカウントに対して Datadog AWS インテグレーションがインストールされ、構成されていること。
- AWS マネジメントコンソールへのアクセス権
- AWS Fargate ECS または EKS のワークロード

## 画像 {#images}

AWS Fargate では、Fargate がホストカーネルへのアクセスを提供しないため、Workload Protection は eBPF を使用できません。この環境では、Datadog Agent 単体でアプリケーションコンテナをトレースすることはできません。Agent に加え、`cws-instrumentation` 画像を使用してワークロードを ptrace でインスツルメントし、ランタイムセキュリティイベントを収集します。

- `cws-instrumentation-init`: `public.ecr.aws/datadog/cws-instrumentation:latest`
- `datadog-agent`: `public.ecr.aws/datadog/agent:latest`

## インストール {#installation}

{{< tabs >}}
{{% tab "Amazon ECS" %}}

### AWS コンソール {#aws-console}

1. [AWS マネジメントコンソール][11]にサインインします。
2. ECS セクションに移動します。
3. 左側のメニューで [**Task Definitions**] (タスク定義) を選択し、[**Create new Task Definition with JSON**] (JSON で新規タスク定義を作成する) を選択します。または、既存の Fargate タスク定義を選択します。
4. タスク定義を作成するには、[Datadog ECS task patcher][12] を使用して既存のタスク定義に自動的にパッチを適用します。または、JSON 定義を手動で作成するか、[AWS CLI メソッド](#aws-cli)を使用します。
5. [**Create**] (作成) をクリックしてタスク定義を作成します。

### AWS CLI {#aws-cli}

1. [datadog-agent-cws-ecs-fargate.json][7] をダウンロードします。
{{< code-block lang="json" filename="datadog-agent-cws-ecs-fargate.json" collapsible="true" >}}
{
    "family": "<YOUR_TASK_NAME>",
    "cpu": "256",
    "memory": "512",
    "networkMode": "awsvpc",
    "pidMode": "task",
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "containerDefinitions": [
        {
            "name": "cws-instrumentation-init",
            "image": "public.ecr.aws/datadog/cws-instrumentation:latest",
            "essential": false,
            "user": "0",
            "command": [
                "/cws-instrumentation",
                "setup",
                "--cws-volume-mount",
                "/cws-instrumentation-volume"
            ],
            "mountPoints": [
                {
                    "sourceVolume": "cws-instrumentation-volume",
                    "containerPath": "/cws-instrumentation-volume",
                    "readOnly": false
                }
            ]
        },
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest",
            "essential": true,
            "environment": [
                {
                    "name": "DD_API_KEY",
                    "value": "<DD_API_KEY>"
                },
                {
                    "name": "DD_SITE",
                    "value": "datadoghq.com"
                },
                {
                    "name": "ECS_FARGATE",
                    "value": "true"
                },
                {
                    "name": "DD_RUNTIME_SECURITY_CONFIG_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED",
                    "value": "true"
                }
            ],
            "healthCheck": {
                "command": [
                    "CMD-SHELL",
                    "/probe.sh"
                ],
                "interval": 30,
                "timeout": 5,
                "retries": 2,
                "startPeriod": 60
            }
        },
        {
            "name": "<YOUR_APP_NAME>",
            "image": "<YOUR_APP_IMAGE>",
            "entryPoint": [
                "/cws-instrumentation-volume/cws-instrumentation",
                "trace",
                "--",
                "<ENTRYPOINT>"
            ],
            "mountPoints": [
                {
                    "sourceVolume": "cws-instrumentation-volume",
                    "containerPath": "/cws-instrumentation-volume",
                    "readOnly": true
                }
            ],
            "linuxParameters": {
                "capabilities": {
                    "add": [
                        "SYS_PTRACE"
                    ]
                }
            },
            "dependsOn": [
                {
                    "containerName": "datadog-agent",
                    "condition": "HEALTHY"
                },
                {
                    "containerName": "cws-instrumentation-init",
                    "condition": "SUCCESS"
                }
            ]
        }
    ],
    "volumes": [
        {
            "name": "cws-instrumentation-volume"
        }
    ]
}
{{< /code-block >}}

2. JSON ファイルの以下の項目を更新します。
    - `TASK_NAME`
    - `DD_API_KEY`
    - `DD_SITE`
    - `YOUR_APP_NAME`
    - `YOUR_APP_IMAGE`
    - `ENTRYPOINT`

   以下のコマンドを使用して、ワークロードのエントリポイントを見つけることができます。

    ```shell
    docker inspect <YOUR_APP_IMAGE> -f '{{json .Config.Entrypoint}}'
    ```

   または

    

```shell
    docker inspect <YOUR_APP_IMAGE> -f '{{json .Config.Cmd}}'
    ```

   **注**: 環境変数 `ECS_FARGATE` はすでに "true" に設定されています。

3. タスク定義に他のアプリケーションコンテナを追加します。インテグレーションメトリクスの収集の詳細については、[ECS Fargate のインテグレーションセットアップ][8]を参照してください。
4. 次のコマンドを実行して ECS タスク定義を登録します。

{{< code-block lang="shell" collapsible="true" >}}
aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-fargate.json
{{< /code-block >}}

### Vulnerability Management を有効にする {#enable-vulnerability-management}

1. Datadog で、[[Cloud Security] > [Setup] (設定) > [Cloud Integrations] > [AWS]][9] に移動します。
2. Amazon ECR をホストしている AWS アカウントに [Datadog Agentless Scanner][10] をデプロイして、Vulnerability Management を有効にします。

[6]: /ja/integrations/eks_fargate/?tab=manual#amazon-eks-fargate-rbac
[7]: /ja/resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /ja/integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
[9]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=aws&vuln_container_enabled=true&vuln_host_enabled=true&vuln_lambda_enabled=true
[10]: /ja/security/cloud_security_management/setup/agentless_scanning/enable/?tab=existingawsaccount#set-up-aws-cloudformation
[11]: https://aws.amazon.com/console
[12]: https://github.com/DataDog/datadog-agent-ecs-task-patcher


{{% /tab %}}

{{% tab "Amazon EKS" %}}

AWS Fargate ポッドからデータを収集するには、Agent をアプリケーションポッドのサイドカーとして実行し、ロールベースのアクセス制御 (RBAC) ルールを設定する必要があります。

<div class="alert alert-info">Agent がサイドカーとして実行されている場合、同じ Pod 上のコンテナとしか通信できません。監視するすべての Pod に対して Agent を実行します。</div>

### RBAC ルールの設定 {#set-up-rbac-rules}

Agent をサイドカーとしてデプロイする前に、以下の [Agent RBAC デプロイメント手順][6]を使用します。

### Agent をサイドカーとしてデプロイする {#deploy-the-agent-as-a-sidecar}

次のマニフェストは、Workload Protection を有効にして Datadog Agent をサイドカーとしてアプリケーションをデプロイするために必要な最小構成を表しています。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
   spec:
     initContainers:
     - name: cws-instrumentation-init
       image: public.ecr.aws/datadog/cws-instrumentation:latest
       command:
         - "/cws-instrumentation"
         - "setup"
         - "--cws-volume-mount"
         - "/cws-instrumentation-volume"
       volumeMounts:
         - name: cws-instrumentation-volume
           mountPath: "/cws-instrumentation-volume"
       securityContext:
         runAsUser: 0
     containers:
     - name: "<YOUR_APP_NAME>"
       image: "<YOUR_APP_IMAGE>"
       command:
         - "/cws-instrumentation-volume/cws-instrumentation"
         - "trace"
         - "--"
         - "<ENTRYPOINT>"
       volumeMounts:
         - name: cws-instrumentation-volume
           mountPath: "/cws-instrumentation-volume"
           readOnly: true
     - name: datadog-agent
       image: public.ecr.aws/datadog/agent:latest
       env:
         - name: DD_API_KEY
           value: "<DD_API_KEY>"
         - name: DD_RUNTIME_SECURITY_CONFIG_ENABLED
           value: "true"
         - name: DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED
           value: "true"
         - name: DD_EKS_FARGATE
           value: "true"
         - name: DD_CLUSTER_NAME
           value: "<CLUSTER_NAME>"
         - name: DD_KUBERNETES_KUBELET_NODENAME
           valueFrom:
             fieldRef:
               apiVersion: v1
               fieldPath: spec.nodeName
     volumes:
       - name: cws-instrumentation-volume
     serviceAccountName: datadog-agent
     shareProcessNamespace: true
```

[6]: /ja/integrations/eks_fargate/?tab=manual#amazon-eks-fargate-rbac

{{% /tab %}}
{{< /tabs >}}

## Agent が Workload Protection にイベントを送信していることを確認する {#verify-that-the-agent-is-sending-events-to-workload-protection}

### ruleset_loaded イベントをチェックする {#check-the-ruleset-loaded-event}

AWS Fargate ECS または EKS で Workload Protection を有効にすると、Agent は Datadog に Agent イベントを送信し、デフォルトのルールセットが正常にデプロイされたことを確認します。Agent イベントを表示するには、Datadog の [[Agent Events] (Agent イベント)][11] ページに移動し、`@agent.rule_id:ruleset_loaded` を検索します。クエリの右側で、[{{< ui >}}Security events{{< /ui >}}] (セキュリティイベント) ではなく [{{< ui >}}All events{{< /ui >}}] (すべてのイベント) を選択します。そうしない場合、`ruleset_loaded` イベントがフィルターによって除外されます。

### セキュリティシグナルをトリガーする {#trigger-a-security-signal}
AWS Fargate セキュリティシグナルを手動でトリガーすることで、Agent が Workload Protection にイベントを送信していることを確認することもできます。

タスク定義で、"workload" コンテナを以下のように置き換えます。

{{< code-block lang="json" collapsible="true" >}}
            "name": "cws-signal-test",
            "image": "ubuntu:latest",
            "entryPoint": [
                "/cws-instrumentation-volume/cws-instrumentation",
                "trace",
                "--verbose",
                "--",
                "/usr/bin/bash",
                "-c",
                "apt update;apt install -y curl; while true; do curl https://google.com; sleep 5; done"
            ],
{{< /code-block >}}

[11]: https://app.datadoghq.com/security/agent-events