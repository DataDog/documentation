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
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/README.md"
"display_name": "JFrog Platform"
"draft": false
"git_integration_title": "jfrog_platform"
"guid": "2c70552e-b77a-4349-9955-8799b9b57d56"
"integration_id": "jfrog-platform"
"integration_title": "JFrog Artifactory"
"is_public": true
"kind": "インテグレーション"
"maintainer": "integrations@jfrog.com"
"manifest_version": "1.0.0"
"metric_prefix": "jfrog."
"metric_to_check": ""
"name": "jfrog_platform"
"public_title": "JFrog Artifactory"
"short_description": "Artifactory イベントを表示、分析します。"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---



## 概要
以下では、JFrog Artifactory および JFrog Xray からメトリクスを収集するように Datadog を構成する方法について説明します。

### JFrog Artifactory とは
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
* [Datadog API キー][4]。

### ステップ 1 FluentD コンフィギュレーション
Datadog の FluentD プラグインを使用して FluentD から Datadog アカウントへログを直接転送することができます。

以下のように API キーを指定することで、FluentD インテグレーションをセットアップします。

_api_key_ はお使いの [Datadog API キー][4]です。

_dd_source_ 属性は、Datadog でインテグレーションの自動セットアップをトリガーするために、ログ内のログインテグレーションの名前に設定されます。

_include_tag_key_ のデフォルトは false で、true に設定すると JSON レコードに fluentd タグが追加されます

適切なメタデータの追加は、Datadog でログの可能性をフルに引き出すためのカギとなります。デフォルトでは、ホスト名およびタイムスタンプフィールドが再マップされています。

```
<match jfrog.**>
  @type datadog
  @id datadog_agent_artifactory
  api_key <api_key>
  include_tag_key true
  dd_source fluentd
</match>
```

### ステップ 2 インテグレーションの有効化

このインテグレーションを有効にするには、`artifactory` ポッドで td-agent を実行します。

``` 
td-agent
```

API キーは `td-agent` で構成され、これにより Datadog へのログの送信が開始します。

**Facets** > **Add** (ログの画面左側)  > **Search** からすべての属性をファセットとして追加します。

### ステップ 3 JFrog プラットフォームタイル
JFrog プラットフォームをまだインストールしていない場合は、タイルをインストールします。

### ステップ 4 JFrog Artifactory ダッシュボード
Dashboard -> Dashboard List の順に移動し、`JFrog Artifactory Dashboard` を探して開きます。

### スタップ 5 ログの検索
Datadog で[ログ][5]にアクセスします。FluentD コンフィギュレーション (上記はコンフィギュレーションの `fluentd` の例) で言及している特定のソースを選択し、ログを取得します。


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/dashboard.png
[2]: https://github.com/jfrog/charts
[3]: https://helm.sh/
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://app.datadoghq.com/logs

