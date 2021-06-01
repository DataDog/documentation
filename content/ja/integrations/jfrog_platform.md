---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Artifactory Metrics: assets/dashboards/artifactory_metrics.json
    Jfrog Artifactory Dashboard: assets/dashboards/jfrog_artifactory_dashboard.json
    Xray Metrics: assets/dashboards/xray_metrics.json
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ログの収集
  - セキュリティ
  - メトリクス
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/README.md'
display_name: JFrog Platform
draft: false
git_integration_title: jfrog_platform
guid: 2c70552e-b77a-4349-9955-8799b9b57d56
integration_id: jfrog-platform
integration_title: JFrog Platform
is_public: true
kind: インテグレーション
maintainer: integrations@jfrog.com
manifest_version: 2.0.0
metric_prefix: jfrog.
metric_to_check: jfrog.artifactory.app_disk_free_bytes
name: jfrog_platform
public_title: JFrog Platform
short_description: JFrog Artifactory と Xray のメトリクスおよびイベントを表示、分析します。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要
以下では、JFrog Artifactory および JFrog Xray からメトリクスを収集するように Datadog を構成する方法について説明します。

### JFrog Artifactory および Xray とは
JFrog Enterprise with Xray の特徴は Artifactory Enterprise と Xray です。これらを組み合わせることで、DevOps チームは生産性を向上させて速度を上げ、自信を持って高品質のソフトウェアリリースを提供できます。

Artifactory は、複数のビルドパッケージ、アーティファクト、メタデータをサポートしています。DevOps チームは Bower、Chef、CocoaPods、Conan、Conda、CRAN、Debian、Docker、Golang、Gradle、Git LFS、Helm、Ivy、Maven、npm、NuGet、Opkg、P2、PHP Composer、Puppet、PyPI、RPM、RubyGems、SBT、Vagrant & VCS、CI/CD プラットフォーム、および DevOps ツールなどのビルドパッケージを自由に選択できます。

Artifactory Enterprise は、地理的に分散したチームのマルチリージョン、マルチクラウド、ハイブリッドレプリケーションをサポートしており、これにより、ソースリポジトリと複数のターゲット間で同時にレプリケートできます。また、IP フィルタリング、CNAME、保存時のデータ暗号化などのセキュリティ機能もサポートしています。Artifactory は、マイクロサービスとコンテナ化されたアプリケーション用に Kubernetes をサポートしています。Kubernetes レジストリとして Artifactory を使用することで、デプロイを管理し、依存関係を詳しく理解することができます。

JFrog Xray は継続的なセキュリティおよびユニバーサルアーティファクト分析に役立つソリューションで、お使いのコンテナとソフトウェアのアーティファクトの脆弱性とライセンスのコンプライアンスに関する問題の多層分析を行います。JFrog Artifactory とネイティブに連携し、最適化されたスキャンと一体型の運用を可能にする唯一のソフトウェアコンポジション解析ソリューションでもあります。すべての主要なパッケージタイプに対応し、アンパックも簡単に行うことができます。また、帰納的スキャンを使用して、Docker イメージや zip ファイルにパッケージされたものも含むすべての基底レイヤーと依存関係を分析することができます。

### JFrog Artifactory Datadog ダッシュボード

JFrog の Datadog インテグレーションにより、Artifactory ログを Datadog のログストリームに送信できます。これを使用して、既存のダッシュボードを拡張したり、Artifactory の使用統計の理解をさらに深めたりすることができます。

![ダッシュボード][1]

### JFrog Artifactory および Xray メトリクス API ダッシュボード

JFrog Artifactory および Xray メトリクス API と Datadog のインテグレーションにより、Artifactory/Xray のオープンメトリクス API エンドポイントから Datadog へメトリクスを送信することができます。このインテグレーションを使用することでシステムのパフォーマンス、ストレージ使用率、JFrog Artifactory/Xray　の接続統計に関するインサイト、アーティファクトおよび Xray によりスキャンされたコンポーネントの数と種類などを得ることができます。このコンフィギュレーションを設定することで、これらのメトリクスが Datadog UI 内に事前設定済みのダッシュボードで利用できるようになり、Datadog 内の既存ダッシュボードの操作性が向上します。

![artifactory][2]

![xray][3]

## セットアップ

### 要件

* Kubernetes クラスター
* [JFrog Helm Charts][4] を介してインストールされた JFrog Artifactory および/または JFrog Xray
* [Helm 3][5]
* [Datadog API キー][6]。

### ログの収集
1. FluentD コンフィギュレーション: Datadog の FluentD プラグインを使用して FluentD から Datadog アカウントへログを直接転送することができます。

    以下のように API キーを指定することで、FluentD インテグレーションをセットアップします。

    _api_key_ はお使いの [Datadog API キー][6]です。

    _dd_source_ 属性は、Datadog でインテグレーションの自動セットアップをトリガーするために、ログ内のログインテグレーションの名前に設定されます。

     _include_tag_key_ defaults to false and it will add fluentd tag in the JSON record if set to true

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

2. インテグレーションの有効化

    このインテグレーションを有効にするには、`artifactory` ポッドで td-agent を実行します。

    ``` 
    td-agent
    ```

    API キーは `td-agent` で構成され、これにより Datadog へのログの送信が開始します。

    **Facets** > **Add** (ログの画面左側)  > **Search** からすべての属性をファセットとして追加します。

### メトリクスの収集

1. Artifactory および Xray でメトリクスを有効化する

    1. [Artifactory でメトリクスを有効化します][7]
    2. [Artifactory および Xray の管理者アクセストークンを作成します][8]

2. Datadog コンフィギュレーション

    ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、コンテナ化のセクションを参照してください。

    これらの値は以下のコンフィギュレーションをオーバーライドします
    ```text
    ARTIFACTORY_HOST_NAME_OR_IP   -> IP address or DNS of Artifactory 
    ARTIFACTORY_ADMIN_TOKEN       -> Admin token for Artifactory
    XRAY_ADMIN_TOKEN              -> Admin token for Xray
    ```
    #### ホスト
    ホストで実行中の Agent に対してこのチェックを構成するには:

    1. [Agent のコンフィギュレーションディレクトリ][9]のルートにある openmetrics.d/conf.yaml ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル openmetrics.d/conf.yaml][10] を参照してください。
        ```text
        instances:
           - prometheus_url: http://<ARTIFACTORY_HOST_NAME_OR_IP>:80/artifactory/api/v1/metrics
             scheme: http
             headers:
               Authorization: "Bearer <ARTIFACTORY_ADMIN_TOKEN>"
             static_configs:
               - targets: ["<ARTIFACTORY_HOST_NAME_OR_IP>:80"]
             namespace: jfrog.artifactory
             metrics:
               - sys*
               - jfrt*
               - app*
           - prometheus_url: http://<ARTIFACTORY_HOST_NAME_OR_IP>:80/xray/api/v1/metrics
               scheme: http
               headers:
                 Authorization: "Bearer <XRAY_ADMIN_TOKEN>"
               namespace: jfrog.xray
               metrics:
                 - app*
                 - db*
                 - go*
                 - queue*
                 - sys*
                 - jfxr*
        ```
    2. [Agent を再起動します][11]。

    #### コンテナ化
    コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][12]のガイドを参照して、上記のパラメーターを適用してください。

    #### 検証

    [Agent の status サブコマンドを実行][13]し、Checks セクションで `openmetrics` を探します。

### JFrog プラットフォームタイル

JFrog プラットフォームをまだインストールしていない場合は、タイルをインストールします。

### JFrog Artifactory ダッシュボード

Dashboard -> Dashboard List の順に移動し、`JFrog Artifactory Dashboard`、`Atifactory Metrics`、`Xray Metrics` を探して開きます。

### 収集データ

#### メトリクス

このチェックによって提供されるメトリクスのリストについては、[metadata.csv][14] を参照してください。

## トラブルシューティング

ご不明な点は [Datadog サポート][15]までお問い合わせください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/dashboard.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/artifactory_metrics_dashboard.png
[3]: 
[4]: https://github.com/jfrog/charts
[5]: https://helm.sh/
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://github.com/jfrog/metrics#setup
[8]: https://www.jfrog.com/confluence/display/JFROG/Access+Tokens#AccessTokens-GeneratingAdminTokens
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[10]: https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/datadog_checks/jfrog_platform/data/conf.yaml.example
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[12]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes
[13]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[14]: https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/metadata.csv
[15]: https://docs.datadoghq.com/ja/help/