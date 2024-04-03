---
app_id: OpenShift
app_uuid: e92e309f-7bdc-4ff4-91d4-975497526325
assets:
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - openshift.clusterquota.cpu.requests.used
      - openshift.clusterquota.cpu.used
      metadata_path: metadata.csv
      prefix: openshift.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: OpenShift
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- コンテナ
- kubernetes
- ログの収集
- ネットワーク
- orchestration
- プロビジョニング
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openshift/README.md
display_on_public_website: true
draft: false
git_integration_title: OpenShift
integration_id: OpenShift
integration_title: OpenShift
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: OpenShift
public_title: OpenShift
short_description: ビッグアイデア用の Kubernetes プラットフォーム
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Log Collection
  - Category::Network
  - Category::Orchestration
  - Category::Provisioning
  - Supported OS::Linux
  configuration: README.md#Setup
  description: ビッグアイデア用の Kubernetes プラットフォーム
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OpenShift
---

## 概要

Red Hat OpenShift は、企業向けアプリケーションの開発とデプロイのための Kubernetes コンテナオーケストレーターに基づくオープンソースのコンテナアプリケーションプラットフォームです。

> この README では、OpenShift 固有のメトリクスを Agent で収集するために必要なコンフィギュレーションについて説明します。以下に記載するデータは [`kubernetes_apiserver` チェック][1]によって収集されます。このチェックを、`openshift.*` メトリクスを収集するために構成する必要があります。

## セットアップ

### インストール

Agent のインストールには、Kubernetes の [Agent のインストール方法][2]を参照してください。デフォルトのコンフィギュレーションは、OpenShift 3.7.0+ と OpenShift 4.0+ （使用する機能およびエンドポイントが導入されたバージョン）を前提としています。

または、[Datadog Operator][3] を使用して Datadog Agent をインストールおよび管理することもできます。Datadog Operator は、OpenShift の [OperatorHub][4] を使用してインストールできます。

### Security Context Constraints 構成


上記のインストール手順にリンクされている方法のいずれかを使用して Datadog Agent をデプロイする場合は、Agent がデータを収集するために Security Context Constraints (SCCs) を含める必要があります。デプロイに関連する以下の手順に従ってください。

{{< tabs >}}
{{% tab "Helm" %}}

SCC は、Datadog Agent の `values.yaml` 内で直接適用できます。ファイルの `agents:` セクションの下に次のブロックを追加します。

```yaml
...
agents:
...
  podSecurity:
    securityContextConstraints:
      create: true
...
```

これは、Agent を最初にデプロイするときに適用できます。または、この変更を行った後に `helm upgrade` を実行して、SCC を適用することもできます。

{{% /tab %}}
{{% tab "Daemonset" %}}

ニーズとクラスターの[セキュリティ制約][1]に応じて、次の 3 つのデプロイシナリオがサポートされます。

- [制限付き SCC オペレーション](#restricted-scc-operations)
- [ホストネットワーク SCC オペレーション](#host)
- [すべての機能に使用できるカスタム Datadog SCC](#custom-datadog-scc-for-all-features)

| Security Context Constraints   | [制限付き](#restricted-scc-operations) | [ホストネットワーク](#host) | [カスタム](#custom-datadog-scc-for-all-features) |
|--------------------------------|------------------------------------------|-----------------------|------------------------------------------------|
| Kubernetes レイヤーの監視    | サポート                                | サポート             | サポート                                             |
| Kubernetes ベースのオートディスカバリー | サポート                                | サポート             | サポート                                             |
| DogStatsD インテーク               | サポート対象外                            | サポート             | サポート                                             |
| APM トレースインテーク               | サポート対象外                            | サポート             | サポート                                             |
| ログネットワークインテーク            | サポート対象外                            | サポート             | サポート                                             |
| ホストネットワークのメトリクス           | サポート対象外                            | サポート             | サポート                                             |
| Docker レイヤーの監視        | サポート対象外                            | サポート対象外         | サポート                                             |
| コンテナログの収集      | サポート対象外                            | サポート対象外         | サポート                                             |
| ライブコンテナモニタリング      | サポート対象外                            | サポート対象外         | サポート                                             |
| ライブプロセスモニタリング        | サポート対象外                            | サポート対象外         | サポート                                             |


[1]: https://docs.openshift.com/enterprise/3.0/admin_guide/manage_scc.html
{{% /tab %}}
{{% tab "Operator" %}}

OpenShift に Datadog Operator と `DatadogAgent` リソースをインストールする方法については、[OpenShift インストールガイド][1] を参照してください。

Operator Lifecycle Manager (OLM) を使用して Operator をデプロイした場合、OpenShift に存在する必要なデフォルト SCC は自動的に `datadog-agent-scc` `ServiceAccount` に関連付けられます。Agent は、Node Agent と Cluster Agent ポッドでこの Service Account を参照しながら、`DatadogAgent` CustomResourceDefinition を使用してデプロイできます。

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/install-openshift.md
{{% /tab %}}
{{< /tabs >}} 

#### ログの収集

詳しくは、[Kubernetes のログ収集][5]を参照してください。

#### 制限付き SCC オペレーション

このモードでは、kubelet と APIserver へのアクセスに必要な [RBAC][7] を除き、[`datadog-agent` daemonset][6] への付与が必要な権限は特にありません。[この kubelet 専用テンプレート][8]を使用して始めることもできます。

DogStatsD、APM、およびログの収集には、Datadog Agent をホストのポートにバインドする方法をお勧めします。そうすれば、ターゲット IP が変化せず、アプリケーションから簡単に検出できるからです。デフォルトの制限付き OpenShift SCC は、ホストポートへのバインドを許可しません。自身の IP でリッスンするように Agent を設定できますが、その IP を検出する処理をアプリケーションに作成する必要があります。

Agent を `sidecar` モードで実行できます。Agent をアプリケーションのポッド内で実行し、簡単に検出することが可能です。

#### ホスト

標準の `hostnetwork`、`hostaccess`、あるいは自作の SCC を使用して `allowHostPorts` のアクセス許可をポッドに追加します。その場合、関連するポートバインディングを、ポッドの仕様に追加してください。

```yaml
ports:
  - containerPort: 8125
    name: dogstatsdport
    protocol: UDP
  - containerPort: 8126
    name: traceport
    protocol: TCP
```

#### すべての機能に使用できるカスタム Datadog SCC

SELinux が permissive モードか、無効になっている場合、すべての機能を使用するには `hostaccess` SCC を有効にする必要があります。
SELinux が enforcing モードの場合は、datadog-agent ポッドに [`spc_t` タイプ][9]を付与することをお勧めします。[こちらの datadog-agent SCC][10] を使用して Agent をデプロイしてください。[datadog-agent サービスアカウントを作成][7]した後でも、この SCC を適用できます。これにより、以下のアクセス許可が付与されます。

- `allowHostPorts: true`: Dogstatsd / APM / ログインテークの、ノード IP へのバインドを許可します。
- `allowHostPID: true`: UNIX ソケットによって送信された DogStatsD メトリクスに対する発信点検出を許可します。
- `volumes: hostPath`: メトリクス収集に必要な、Docker ソケット、およびホストの `proc` と `cgroup` フォルダーへのアクセスを許可します。
- `SELinux type: spc_t`: Docker ソケットと全プロセスの `proc` と `cgroup` フォルダにアクセスし、メトリクスを収集します。詳しくは[超特権コンテナのコンセプトの紹介][9]を参照してください。

<div class="alert alert-info">
新しく作成した <a href="https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/openshift/scc.yaml">datadog-agent SCC</a> に、<a href="https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#configure-rbac-permissions">datadog-agent サービスアカウント</a>を追加することを忘れないでください。それには、<code>system:serviceaccount:<datadog-agent namespace>:<datadog-agent service account name></code> を <code>users</code> セクションに追加する必要があります。
</div>

<div class="alert alert-warning">
<b>OpenShift 4.0+</b>: OpenShift インストーラーを、サポート対象のクラウドプロバイダーで使用した場合は、ホストのタグとエイリアスを取得するために、<code>scc.yaml</code> マニフェストで <code>allowHostNetwork: true</code>、Agent 構成で <code>hostNetwork: true</code> で SCC をデプロイする必要があります。そうしないと、ポッドのネットワークからメタデータサーバーへのアクセスが制限されます。
</div>

**注**: Docker ソケットはルートグループが所有します。したがって、Docker メトリクスを取得するために、管理者特権を Agent に付与することが必要な場合があります。Agent プロセスをルートユーザーとして実行するには、SCC を次のように構成してください。

```yaml
runAsUser:
  type: RunAsAny
```

### 検証

[kubernetes_apiserver][1] を参照

## 収集データ

### メトリクス
{{< get-metrics-from-git "openshift" >}}


### イベント

OpenShift チェックには、イベントは含まれません。

### サービスのチェック

OpenShift チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/kubernetes_apiserver.d/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/
[3]: https://github.com/DataDog/datadog-operator/
[4]: https://docs.openshift.com/container-platform/4.10/operators/understanding/olm-understanding-operatorhub.html
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=daemonset
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#configure-rbac-permissions
[8]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/agent-kubelet-only.yaml
[9]: https://developers.redhat.com/blog/2014/11/06/introducing-a-super-privileged-container-concept
[10]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/openshift/scc.yaml
[11]: https://docs.datadoghq.com/ja/help/