---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - コンテナ
  - オーケストレーション
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/openshift/README.md'
display_name: OpenShift
draft: false
git_integration_title: OpenShift
guid: ea7f642f-263f-4ed1-8da0-9bb96c7df1f0
integration_id: OpenShift
integration_title: OpenShift
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: openshift.
metric_to_check:
  - openshift.clusterquota.cpu.requests.used
  - openshift.clusterquota.cpu.used
name: OpenShift
public_title: Datadog-OpenShift インテグレーション
short_description: ビッグアイデア用の Kubernetes プラットフォーム
support: コア
supported_os:
  - linux
---
## 概要

Red Hat OpenShift は、企業向けアプリケーションの開発とデプロイのための Kubernetes コンテナオーケストレーターに基づくオープンソースのコンテナアプリケーションプラットフォームです。

> 現状で `openshift` チェックは存在しません。この README では、OpenShift 固有のメトリクスを Agent で収集するために必要なコンフィギュレーションについて説明します。以下に記載するデータは [`kubernetes_apiserver` チェック][1]によって収集されます。このチェックを、`openshift.*` メトリクスを収集するためにセットアップする必要があります。

## セットアップ

### インストール

Agent のインストールには、Kubernetes の [Agent のインストール方法][2]を参照してください。デフォルトのコンフィギュレーションは、OpenShift 3.7.0+ と OpenShift 4.0+ （使用する機能およびエンドポイントが導入されたバージョン）を前提としています。

### コンフィギュレーション


上記のインストール手順にリンクされている方法のいずれかを使用して Datadog Agent をデプロイする場合は、Agent がデータを収集するために SCC (セキュリティコンテキスト制約) を含める必要があります。デプロイに関連する以下の手順に従ってください。

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

<div class="alert alert-warning">
<bold>OpenShift 4.0+</bold>: OpenShift インストーラーを、サポート対象のクラウドプロバイダーで使用した場合は、ホストタグとエイリアスを取得するために、<code>datadog.yaml</code>コンフィギュレーションファイルに <code>hostNetwork: true</code> を定義して Agent をデプロイする必要があります。定義しないと、ポッドのネットワークからメタデータサーバーへのアクセスが制限されます。
</div>

[1]: https://docs.openshift.com/enterprise/3.0/admin_guide/manage_scc.html
{{% /tab %}}
{{< /tabs >}} 

#### ログの収集

詳細については、[Kubernetes のログ収集][3]に関するドキュメントを参照してください。

#### 制限付き SCC オペレーション

このモードでは、kubelet と APIserver へのアクセスに必要な [RBAC][5] を除き、[`datadog-agent` daemonset][4] への付与が必要なアクセス許可は特にありません。[この kubelet 専用テンプレート][6]を使用して始めることもできます。

DogStatsD、APM、およびログの収集には、Datadog Agent をホストのポートにバインドする方法をお勧めします。そうすれば、ターゲット IP が変化せず、アプリケーションから簡単に検出できるからです。デフォルトの制限付き OpenShift SCC は、ホストポートへのバインドを許可しません。自身の IP でリッスンするように Agent を設定できますが、その IP を検出する処理をアプリケーションに作成する必要があります。

Agent を `sidecar` モードで実行できます。Agent をアプリケーションのポッド内で実行し、簡単に検出することが可能です。

#### ホスト

`allowHostPorts` のアクセス許可をポッドに（標準の `hostnetwork`、`hostaccess`、あるいは自作の SCC を使用して）追加します。その場合、関連するポートバインディングを、ポッドの仕様に追加してください。

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
SELinux が enforcing モードの場合は、datadog-agent ポッドに [`spc_t` タイプ][7]を付与することをお勧めします。[こちらの datadog-agent SCC][8] を使用して Agent をデプロイしてください。[datadog-agent サービスアカウントを作成][5]した後でも、この SCC を適用できます。これにより、以下のアクセス許可が付与されます。

- `allowHostPorts: true`: Dogstatsd / APM / ログインテークの、ノード IP へのバインドを許可します。
- `allowHostPID: true`: UNIX ソケットによって送信された DogStatsD メトリクスに対する発信点検出を許可します。
- `volumes: hostPath`: メトリクス収集に必要な、Docker ソケット、およびホストの `proc` と `cgroup` フォルダーへのアクセスを許可します。
- `SELinux type: spc_t`: メトリクス収集に必要な Docker ソケット、およびすべてのプロセスの `proc` と `cgroup` フォルダーへのアクセスを許可します。このタイプについて詳しくは、[Red Hat による記事][7]を参照してください。

<div class="alert alert-info">
新しく作成した <a href="https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/openshift/scc.yaml">datadog-agent SCC</a> に、<a href="https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#configure-rbac-permissions">datadog-agent サービスアカウント</a>を追加することを忘れないでください。それには、<code>system:serviceaccount:<datadog-agent namespace>:<datadog-agent service account name></code> を <code>users</code> セクションに追加する必要があります。
</div>

<div class="alert alert-warning">
<b>OpenShift 4.0+</b>: OpenShift インストーラーを、サポート対象のクラウドプロバイダーで使用した場合は、ホストのタグとエイリアスを取得するために、<code>datadog.yaml</code>コンフィギュレーションファイルに <code>allowHostNetwork: true</code> を定義して Agent をデプロイする必要があります。定義しないと、ポッドのネットワークからメタデータサーバーへのアクセスが制限されます。
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

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/kubernetes_apiserver.d/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=daemonset
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#configure-rbac-permissions
[6]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/agent-kubelet-only.yaml
[7]: https://developers.redhat.com/blog/2014/11/06/introducing-a-super-privileged-container-concept
[8]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/manifests/openshift/scc.yaml
[9]: https://docs.datadoghq.com/ja/help/