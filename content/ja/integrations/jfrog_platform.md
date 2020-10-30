---
"assets":
  "dashboards":
    "Jfrog Artifactory Dashboard": assets/dashboards/jfrog_artifactory_dashboard.json
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- ログの収集
- セキュリティ
"creates_events": false
"ddtype": "check"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/README.md"
"display_name": "JFrog Platform"
"draft": false
"git_integration_title": "jfrog_platform"
"guid": "2c70552e-b77a-4349-9955-8799b9b57d56"
"integration_id": "jfrog-platform"
"integration_title": "JFrog Artifactory および Xray"
"is_public": true
"kind": "インテグレーション"
"maintainer": "integrations@jfrog.com"
"manifest_version": "1.0.0"
"metric_prefix": "jfrog."
"metric_to_check": ""
"name": "jfrog_platform"
"public_title": "JFrog Artifactory および Xray"
"short_description": "Artifactory および Xray イベントを表示、分析します。"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---



## 概要
以下では、JFrog Artifactory および JFrog Xray からメトリクスを収集するように Datadog を構成する方法について説明します。

### JFrog Artifactory および Xray とは
JFrog Enterprise with Xray の特徴は Artifactory Enterprise と Xray です。これらを組み合わせることで、DevOps チームは生産性を向上させて速度を上げ、自信を持って高品質のソフトウェアリリースを提供できます。Xray は、業界で最も包括的なインテリジェンスである VulnDB を使用して、既知のオープンソースセキュリティリスクとコンプライアンスをスキャンします。

Artifactory は、複数のビルドパッケージ、アーティファクト、メタデータをサポートしています。DevOps チームは Bower、Chef、CocoaPods、Conan、Conda、CRAN、Debian、Docker、Golang、Gradle、Git LFS、Helm、Ivy、Maven、npm、NuGet、Opkg、P2、PHP Composer、Puppet、PyPI、RPM、RubyGems、SBT、Vagrant & VCS、CI/CD プラットフォーム、および DevOps ツールなどのビルドパッケージを自由に選択できます。

Artifactory Enterprise は、地理的に分散したチームのマルチリージョン、マルチクラウド、ハイブリッドレプリケーションをサポートしており、これにより、ソースリポジトリと複数のターゲット間で同時にレプリケートできます。また、IP フィルタリング、CNAME、保存時のデータ暗号化などのセキュリティ機能もサポートしています。

Artifactory は、マイクロサービスとコンテナ化されたアプリケーション用に Kubernetes をサポートしています。Kubernetes レジストリとして Artifactory を使用することで、デプロイを管理し、依存関係を詳しく理解することができます。JFrog Xray は、すべてのレイヤーを再帰的にスキャンするコンテナセキュリティを提供し、これにより Docker イメージに含まれるすべてのアーティファクトと依存関係は既知のリスクに対してスキャンされます。Enterprise は、ハイブリッド、クラウド、マルチクラウド環境をサポートするビジネスモデルのニーズを満たします。

### JFrog Artifactory Datadog ダッシュボード

JFrog Artifactory の Datadog インテグレーションにより、Artifactory ログを Datadog のログストリームに送信できます。これを使用して、既存のダッシュボードを拡張したり、Artifactory の使用統計の理解をさらに深めたりすることができます。

![ダッシュボード][1]

## セットアップ

### 要件

* Kubernetes クラスター
* [JFrog Helm Charts][2] を介してインストールされた JFrog Artifactory および/または JFrog Xray
* [Helm 3][3]

### ログ

Datadog をセットアップするには、Datadog でアカウントを作成してこれらのオンボーディング手順を実行するか、API キーを直接使用します。

* Helm チャートを使用してデプロイすることにより、Kubernetes クラスターで Datadog Agent を実行します
* ログ収集を有効にするには、オンボーディング手順で指定された `datadog-values.yaml` ファイルを更新します
* Agent がレポートを開始すると、フォーマットされたログを fluentd 経由で送信するために使用する API キーを取得します

Datadog がセットアップされると、UI の **Logs** > **Search** でログにアクセスできます。ログを取得する特定のソースを選択します。

API キーが存在する場合は、Datadog Fluentd プラグインを使用して、ログを Fluentd から Datadog アカウントに直接転送します。
適切なメタデータを追加することが、Datadog でログの可能性をフルに引き出すためのカギです。デフォルトでは、ホスト名とタイムスタンプフィールドを再マップする必要があります。

### Fluentd コンフィギュレーション

インテグレーションは、API キーを指定することによって行われます

_api_key_ は、Datadog の API キーです

_dd_source_ 属性は、Datadog でインテグレーションの自動セットアップをトリガーするために、ログ内のログインテグレーションの名前に設定されます。

_include_tag_key_ のデフォルトは false で、true に設定すると JSON レコードに fluentd タグが追加されます

```
<match jfrog.**>
  @type datadog
  @id datadog_agent_artifactory
  api_key <api_key>
  include_tag_key true
  dd_source fluentd
</match>
```

## Datadog デモ

このインテグレーションを有効にするには、`artifactory` および `xray` ポッドで td-agent を実行します

``` 
td-agent
```

API キーは `td-agent` で構成され、これにより Datadog へのログの送信が開始します。

**Facets** > **Add** (ログの画面左側)  > **Search** からすべての属性をファセットとして追加します。

既存の視覚化とフィルターにアクセスするには、ダッシュボードをクリックして新しいスクリーンボードを追加し、[export.json][4] をインポートして既存のダッシュボードを上書きします。


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/dashboard.png
[2]: https://github.com/jfrog/charts
[3]: https://helm.sh/
[4]: https://github.com/jfrog/log-analytics/blob/master/datadog/export.json

