---
title: Datadog Security を使用するための AWS Fargate 構成ガイド
disable_toc: false
aliases:
  - /security/cloud_security_management/setup/fargate
  - /security/cloud_security_management/setup/serverless
further_reading:
- link: "https://www.datadoghq.com/blog/threat-detection-fargate/"
  tag: ブログ
  text: Datadog Cloud Security により、AWS Fargate ECS および EKS 環境でリアルタイムの脅威検知を実現します。
---

このガイドでは、AWS Fargate 上で [Cloud Security][3]、[Software Composition Analysis (SCA)][22]、[Threat Detection and Protection (AAP)][4]、および [Cloud SIEM][5] を構成する手順を説明します。

{{< img src="security/datadog_security_coverage_aws_fargate2.png" alt="Cloud Security、AAP、Cloud SIEM が AWS Fargate 上でどのように構成されるかを示すフロー チャート" width="90%">}}

## AWS Fargate をフルスタックでカバー

Datadog Security は、AWS Fargate を多層的に可視化します。次の表に示すように、これらの製品を互いに組み合わせて使用することで、あらゆる要素をカバーできます。

### Fargate アセット

<table>
    <thead>
    <th>アセット</th>
    <th>可観測性</th>
    <th>脆弱性と誤構成の是正</th>
    <th>脅威検知とレスポンス</th>
    </thead>
    <tr>
    </tr>
    <tr>
        <td>Fargate アプリケーション</td>
        <td>Application Performance Monitoring</td>
        <td>Software Composition Analysis (SCA) and Code Security</td>
        <td>AAP - Threat Detection and Protection</td>
    </tr>
    <tr>
        <td>Fargate インフラストラクチャー</td>
        <td>Infrastructure Monitoring</td>
        <td>Cloud Security</td>
        <td>Workload Protection</td>
    </tr>
</table>

### Fargate 関連リソース

<table>
    <thead>
    <th>アセット</th>
    <th>可観測性</th>
    <th>脆弱性と誤構成の是正</th>
    <th>脅威検知とレスポンス</th>
    </thead>
    <tr>
        <td>AWS IAM のロールとポリシー</td>
        <td>Log Management</td>
        <td>Cloud Security</td>
        <td>Cloud SIEM</td>
    </tr>
    <tr>
        <td>AWS データベース</td>
        <td>Log Management</td>
        <td>Cloud Security</td>
        <td>Cloud SIEM</td>
    </tr>
    <tr>
        <td>AWS S3 バケット</td>
        <td>Log Management</td>
        <td>Cloud Security</td>
        <td>Cloud SIEM</td>
    </tr>
</table>

## Cloud Security

### 前提条件

- AWS アカウントに対して Datadog AWS インテグレーションがインストールされ、構成されていること。
- AWS マネジメントコンソールへのアクセス権
- AWS Fargate ECS または EKS のワークロード

<div class="alert alert-info">パフォーマンスと信頼性に関するさらなるインサイトを得るため、Datadog は Cloud Security と併用して Infrastructure Monitoring を有効化することを推奨します。</div>

### 画像

* `cws-instrumentation-init`: `public.ecr.aws/datadog/cws-instrumentation:latest`
* `datadog-agent`: `public.ecr.aws/datadog/agent:latest`

### インストール

{{< tabs >}}
{{% tab "Amazon ECS" %}}

#### AWS コンソール

1. [AWS マネジメントコンソール][6]にサインインします。
2. ECS セクションに移動します。
3. 左のメニューから **Task Definitions** を選択し、**Create new Task Definition with JSON** を選択します。または、既存の Fargate タスク定義を選択します。
4. 新しいタスク定義を作成するには、JSON 定義を使用するか、[AWS CLI メソッド](#aws-cli)を使用します。
5. **Create** をクリックしてタスク定義を作成します。

#### AWS CLI

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

    以下のコマンドを使用して、ワークロードのエントリーポイントを見つけることができます。

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

#### Datadog Cloud Security
1. Datadog で、[Cloud Security > Setup > Cloud Integrations > AWS][9] に移動します。
2. Amazon ECR をホストする AWS アカウントに [Datadog Agentless scanner][10] をデプロイして、Vulnerability Management を有効化します。

[6]: /integrations/eks_fargate/?tab=manual#amazon-eks-fargate-rbac
[7]: /resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
[9]: https://app.datadoghq.com/security/configuration/csm/setup?active_steps=cloud-accounts&active_sub_step=aws&vuln_container_enabled=true&vuln_host_enabled=true&vuln_lambda_enabled=true
[10]: /security/cloud_security_management/setup/agentless_scanning/enable/?tab=existingawsaccount#set-up-aws-cloudformation


{{% /tab %}}

{{% tab "Amazon EKS" %}}

AWS Fargate ポッドからデータを収集するには、Agent をアプリケーションポッドのサイドカーとして実行し、ロールベースのアクセス制御 (RBAC) ルールを設定する必要があります。

<div class="alert alert-info">Agent がサイドカーとして実行されている場合、同じポッド上のコンテナとのみ通信できます。監視するすべてのポッドに対して Agent を実行します。</div>

#### RBAC ルールの設定

Agent をサイドカーとしてデプロイする前に、以下の [Agent RBAC デプロイメント手順][6]を使用します。

#### Agent をサイドカーとしてデプロイする

以下のマニフェストは、Workload Protection を有効にした Datadog Agent をサイドカーとしてアプリケーションをデプロイするために必要な最小構成を示します:

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

[6]: /integrations/eks_fargate/?tab=manual#amazon-eks-fargate-rbac

{{% /tab %}}
{{< /tabs >}}

### Agent が Cloud Security にイベントを送信していることを確認する

AWS Fargate ECS または EKS で Cloud Security を有効化すると、Agent はデフォルト ルール セットが正常にデプロイされたことを確認するための agent event を Datadog に送信します。agent event を表示するには、Datadog の [Agent Events][9] ページに移動し、`@agent.rule_id:ruleset_loaded` を検索します。

<div class="alert alert-info">手動で AWS Fargate のセキュリティ シグナルをトリガーして、Agent が Cloud Security にイベントを送信していることを検証することもできます。</div>

タスク定義で、"workload" コンテナを以下のように置き換えます。

{{< code-block lang="yaml" collapsible="true" >}}
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

## App and API Protection

### 前提条件

- Datadog Agent が、アプリケーションのオペレーティングシステムやコンテナ、クラウド、仮想環境にインストールされ構成されている
- アプリケーションまたはサービスで Datadog APM が構成されている

<div class="alert alert-info">パフォーマンスと信頼性に関するさらなるインサイトのために、Datadog は App and API Protection と併用して Application Performance Monitoring を有効化することを推奨します。</div>

### インストール

#### ソフトウェア構成分析 (SCA)
[Software Composition Analysis (SCA)][22] は Fargate で動作します。 [従来のホストで実行されるアプリケーション向けのインストール手順][23] に従ってください。

#### 脅威の検出と保護

ステップバイステップの手順については、以下の記事を参照してください。

- [Java][10]
- [.NET][11]
- [Go][12]
- [Ruby][13]
- [Node.js][14]
- [Python][15]

#### コードセキュリティ

ステップバイステップの手順については、以下の記事を参照してください。

- [Java][18]
- [.NET][19]
- [Node.js][20]

## クラウド SIEM

### 前提条件

- ソースからログを収集するように[ログの取り込み][21]が構成されている。

### インストール

ステップバイステップの手順については、[Cloud SIEM のための AWS 構成ガイド][17]を参照してください。

#### AWS CloudTrail のログを有効にする

{{% cloud-siem-aws-cloudtrail-enable %}}

#### AWS CloudTrail のログを Datadog に送信する

{{% cloud-siem-aws-cloudtrail-send-logs %}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/ecs_fargate/
[2]: /integrations/eks_fargate/
[3]: /security/cloud_security_management/
[4]: /security/application_security/
[5]: /security/cloud_siem/
[6]: /integrations/eks_fargate/#amazon-eks-fargate-rbac
[7]: /resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
[9]: https://app.datadoghq.com/security/agent-events
[10]: /security/application_security/setup/java/aws-fargate
[11]: /security/application_security/setup/dotnet/aws-fargate
[12]: /security/application_security/setup/aws/fargate
[13]: /security/application_security/setup/ruby/aws-fargate
[14]: /security/application_security/setup/nodejs/aws-fargate
[15]: /security/application_security/setup/python/aws-fargate
[16]: /security/application_security/
[17]: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[18]: /security/code_security/iast/setup/java/
[19]: /security/code_security/iast/setup/dotnet/
[20]: /security/code_security/iast/setup/nodejs/
[21]: https://app.datadoghq.com/security/configuration/siem/setup
[22]: /security/code_security/software_composition_analysis/
[23]: /security/code_security/software_composition_analysis/
