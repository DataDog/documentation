---
"app_id": "helm"
"app_uuid": "754a061c-d896-4f3c-b54e-87125bb66241"
"assets":
  "dashboards":
    "Helm - Overview": assets/dashboards/overview.json
  "integration":
    "auto_install": true
    "configuration": {}
    "events":
      "creates_events": true
    "metrics":
      "check": helm.release
      "metadata_path": metadata.csv
      "prefix": helm.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_id": !!int "10257"
    "source_type_name": Helm
  "monitors":
    "[helm] Monitor Helm failed releases": assets/monitors/monitor_failed_releases.json
"author":
  "homepage": "https://www.datadoghq.com"
  "name": Datadog
  "sales_email": info@datadoghq.com
  "support_email": help@datadoghq.com
"categories":
- configuration & deployment
- containers
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/helm/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "helm"
"integration_id": "helm"
"integration_title": "Helm Check"
"integration_version": ""
"is_public": true
"manifest_version": "2.0.0"
"name": "helm"
"public_title": "Helm Check"
"short_description": "Track your Helm deployments with Datadog"
"supported_os":
- linux
- macos
- windows
"tile":
  "changelog": CHANGELOG.md
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Configuration & Deployment"
  - "Category::Containers"
  "configuration": "README.md#Setup"
  "description": Track your Helm deployments with Datadog
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": Helm Check
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check monitors Helm deployments through the Datadog Agent.

Helm supports multiple storage backends. In v3, Helm defaults to Kubernetes secrets and in v2, Helm defaults to ConfigMaps. This check supports both options.

## セットアップ

### インストール

The Helm check is included in the [Datadog Agent][1] package.
No additional installation is needed on your server.

### 構成

{{< tabs >}}
{{% tab "Helm" %}}

This is a cluster check. You can enable this check by adding `datadog.helmCheck.enabled` to your Helm chart.

**Note**: If no configuration is required, an empty `conf.d` can be passed.

For more information, see the [Cluster Check documentation][1].

[1]: https://docs.datadoghq.com/agent/cluster_agent/clusterchecks/
{{% /tab %}}
{{% tab "Operator (v1.5.0+)" %}}

This is a cluster check. You can enable this check by adding `spec.features.helmCheck.enabled` to your `DatadogAgent` deployment configuration.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    helmCheck:
      enabled: true
```

{{% /tab %}}
{{% tab "Operator (< v1.5.0)" %}}

これはクラスターのチェックです。このチェックを有効にするには、`DatadogAgent` のデプロイメント構成でコンフィギュレーションファイル `helm.yaml` を Cluster Agent に渡します。

```
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  [...]
  override:
    clusterAgent:
      [...]
      extraConfd:
        configDataMap:
          helm.yaml: |-
            init_config:
            instances:
            - collect_events: false
```

このチェックには、Helm に保存されたリリースにアクセスするために、Cluster Agent ポッドが使用する Kubernetes サービスアカウントにバインドされる追加の権限が必要です。

```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: datadog-helm-check
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: datadog-helm-check
subjects:
  - kind: ServiceAccount
    name: datadog-cluster-agent
    namespace: default
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: datadog-helm-check
rules:
- apiGroups:
  - ""
  resources:
  - secrets
  - configmaps
  verbs:
  - get
  - list
  - watch
```

**注**: `ServiceAccount` のサブジェクトは `default` ネームスペースへのインストールを例に挙げています。デプロイメントに応じて `name` と `namespace` を調整してください。

{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][2]し、Checks セクションで `helm` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "helm" >}}


### イベント

このチェックは、`collect_events` オプションが `true` に設定されているときにイベントを発行します。デフォルトは `false` です。

このオプションを有効にすると、次の場合にチェックがイベントを発行します。
- 新しいリリースがデプロイされる。
- リリースが削除される。
- リリースがアップグレードされる (新しいリビジョン)。
- 例えば、デプロイ済みから置き換え済みへのステータス変更があります。

### サービスチェック
{{< get-service-checks-from-git "helm" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [ブログ: Datadog で Helm で管理された Kubernetes アプリケーションを監視する][4]



[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/monitor-helm-kubernetes-with-datadog/
