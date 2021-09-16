---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Artifactory Metrics: assets/dashboards/artifactory_metrics.json
    Jfrog Artifactory Dashboard: assets/dashboards/jfrog_artifactory_dashboard.json
    Xray Logs: assets/dashboards/xray_logs.json
    Xray Metrics: assets/dashboards/xray_metrics.json
    Xray Violations: assets/dashboards/xray_violations.json
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
  - https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/README.md
display_name: JFrog Platform
draft: false
git_integration_title: jfrog_platform
guid: 2c70552e-b77a-4349-9955-8799b9b57d56
integration_id: jfrog-platform
integration_title: JFrog Platform
is_public: true
kind: インテグレーション
maintainer: integrations@jfrog.com
manifest_version: 1.0.0
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
以下では、JFrog Artifactory および JFrog Xray からメトリクスおよびログを収集するように Datadog を構成する方法について説明します。

### JFrog Artifactory および Xray
JFrog Enterprise with Xray の特徴は Artifactory Enterprise と Xray です。これらを組み合わせることで、DevOps チームは生産性を向上させて速度を上げ、自信を持って高品質のソフトウェアリリースを提供できます。

Artifactory は、複数のビルドパッケージ、アーティファクト、メタデータをサポートしています。DevOps チームは Bower、Chef、CocoaPods、Conan、Conda、CRAN、Debian、Docker、Golang、Gradle、Git LFS、Helm、Ivy、Maven、npm、NuGet、Opkg、P2、PHP Composer、Puppet、PyPI、RPM、RubyGems、SBT、Vagrant & VCS、CI/CD プラットフォーム、および DevOps ツールなどのビルドパッケージを自由に選択できます。

Artifactory Enterprise は、地理的に分散したチームのマルチリージョン、マルチクラウド、ハイブリッドレプリケーションをサポートしており、これにより、ソースリポジトリと複数のターゲット間で同時にレプリケートできます。また、IP フィルタリング、CNAME、保存時のデータ暗号化などのセキュリティ機能もサポートしています。Artifactory は、マイクロサービスとコンテナ化されたアプリケーション用に Kubernetes をサポートしています。Kubernetes レジストリとして Artifactory を使用することで、デプロイを管理し、依存関係を詳しく理解することができます。

JFrog Xray は継続的なセキュリティおよびユニバーサルアーティファクト分析に役立つソリューションで、お使いのコンテナとソフトウェアのアーティファクトの脆弱性とライセンスのコンプライアンスに関する問題の多層分析を行います。JFrog Artifactory とネイティブに連携し、最適化されたスキャンと一体型の運用を可能にする唯一のソフトウェアコンポジション解析ソリューションでもあります。すべての主要なパッケージタイプに対応し、アンパックも簡単に行うことができます。また、帰納的スキャンを使用して、Docker イメージや zip ファイルにパッケージされたものも含むすべての基底レイヤーと依存関係を分析することができます。

### JFrog Artifactory および Xray ログの Datadog ダッシュボード

JFrog の Datadog インテグレーションにより、Artifactory/Xray ログを Datadog のログストリームに送信できます。これを使用して、既存のダッシュボードを拡張したり、Artifactory の使用統計や JFrog Xray のスキャン済みコンポーネントの詳細についてさらに理解を深めたりすることができます。

![ダッシュボード][1]

![dashboard][2]

![dashboard][3]

### JFrog Artifactory および Xray メトリクス API ダッシュボード

JFrog Artifactory/Xray メトリクス API と Datadog のインテグレーションにより、Artifactory/Xray の OpenMetrics API エンドポイントから Datadog へメトリクスを送信することができます。このインテグレーションを使用することでシステムのパフォーマンス、ストレージ使用率、JFrog Artifactory/Xray　の接続統計に関するインサイト、アーティファクトおよび Xray によりスキャンされたコンポーネントの数と種類などを得ることができます。このコンフィギュレーションを設定することで、これらのメトリクスが Datadog UI 内に事前設定済みのダッシュボードで利用できるようになり、Datadog 内の既存ダッシュボードの操作性が向上します。

![artifactory][4]

![xray][5]

## セットアップ

### 要件
* [Datadog API キー][6]。

### ログの収集

1. インストールタイプに基づき、[jFrog ドキュメントを使用して Fluentd をインストール][7]して、環境変数を定義します。

2. 書き込み許可のあるディレクトリ（例: `$JF_PRODUCT_DATA_INTERNAL` などの場所）に Artifactory Fluentd コンフィギュレーションファイルをダウンロードして、Artifactory でFluentD を構成します。

    ```text
    cd $JF_PRODUCT_DATA_INTERNAL
    wget https://raw.githubusercontent.com/jfrog/log-analytics-datadog/master/fluent.conf.rt
    ```

    ダウンロードした `fluent.conf.rt` の match ディレクティブ（最終セクション）を、以下の詳細で上書きします。

    ```
    <match jfrog.**>
      @type datadog
      @id datadog_agent_jfrog_artifactory
      api_key API_KEY
      include_tag_key true
      dd_source fluentd
    </match>
    ```

    * `API_KEY` (必須) は、[Datadog][8] の API キーです。
    * `dd_source` は、Datadog でインテグレーションの自動セットアップをトリガーするための、ログ内のログインテグレーションの名前です。
    * `include_tag_key` のデフォルトは false で、true に設定すると JSON レコードに `fluentd` タグが追加されます

3. 書き込み許可のあるディレクトリ（例: `$JF_PRODUCT_DATA_INTERNAL` などの場所）に Xray Fluentd コンフィギュレーションファイルをダウンロードして、Xray でFluentD を構成します。

    ```text
    cd $JF_PRODUCT_DATA_INTERNAL
    wget https://raw.githubusercontent.com/jfrog/log-analytics-datadog/master/fluent.conf.xray
    ```

    ダウンロードした `fluent.conf.xray` の source ディレクティブの `JPD_URL`, `USER`, `JFROG_API_KEY` フィールドに、以下の詳細を入力します。

    ```text
    <source>
      @type jfrog_siem
      tag jfrog.xray.siem.vulnerabilities
      jpd_url JPD_URL
      username USER
      apikey JFROG_API_KEY
      pos_file "#{ENV['JF_PRODUCT_DATA_INTERNAL']}/log/jfrog_siem.log.pos"
    </source>
    ```

    * `JPD_URL` (必須) は、Xray Violations をプルするために使用されるフォーマット `http://<ip_address>` の Artifactory JPD URL です。
    * `USER` (必須) は、認証用の Artifactory ユーザー名です。
    * `JFROG_API_KEY` (必須) は、認証用の [Artifactory API キー][9]です。

    ダウンロードした `fluent.conf.xray` の match ディレクティブ（最終セクション）を、以下の詳細で上書きします。

    ```
    <match jfrog.**>
      @type datadog
      @id datadog_agent_jfrog_xray
      api_key API_KEY
      include_tag_key true
      dd_source fluentd
    </match>
    ```

    * `API_KEY` (必須) は、[Datadog][8] の API キーです。
    * `dd_source` は、Datadog でインテグレーションの自動セットアップをトリガーするための、ログ内のログインテグレーションの名前です。
    * `include_tag_key` のデフォルトは false で、true に設定すると json レコードに `fluentd` タグが追加されます

4. `artifactory` および `xray` インスタンスで `td-agent` を実行し、インテグレーションを有効にします。

    ``` 
    td-agent
    ```

    API キーは `td-agent` で構成され、これにより Datadog へのログの送信が開始します。別のタイプのインストールについては、[JFrog ドキュメント][7]を参照してください。

    **Facets** > **Add** (ログの画面左側)  > **Search** からすべての属性をファセットとして追加します。

### メトリクスの収集

1. Artifactory および Xray でメトリクスを有効化:

    1. [Artifactory でメトリクスを有効化][10]
    2. [Artifactory および Xray の管理者アクセストークンを作成][11]

2. Datadog コンフィギュレーション

    ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、コンテナ化のセクションを参照してください。

    これらの値は以下のコンフィギュレーションをオーバーライドします
    ```text
    ARTIFACTORY_HOST_NAME_OR_IP   -> IP address or DNS of Artifactory 
    ARTIFACTORY_ADMIN_TOKEN       -> Admin token for Artifactory
    XRAY_ADMIN_TOKEN              -> Admin token for Xray
    ```
    ホストで実行中の Agent に対してこのチェックを構成するには:

    1. [Agent のコンフィギュレーションディレクトリ][12]のルートにある openmetrics.d/conf.yaml ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル openmetrics.d/conf.yaml][13] を参照してください。
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
    2. [Agent を再起動][14]します。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][15]のガイドを参照して、上記のパラメーターを適用します。変更が適用されたことを確認するには、[Agent の status サブコマンドを実行][16]し、Checks セクションで `openmetrics` を探します。

### JFrog プラットフォームタイル

JFrog プラットフォームをまだインストールしていない場合は、タイルをインストールします。

### JFrog ダッシュボード

Dashboard -> Dashboard List の順に移動し、`JFrog Artifactory Dashboard`、`Artifactory Metrics`、`Xray Metrics`、`Xray Logs`、`Xray Violations` を探して開きます。

### 収集データ

#### メトリクス

このチェックによって提供されるメトリクスのリストについては、[metadata.csv][17] を参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][18]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/dashboard.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/xray_logs.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/xray_violations.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/artifactory_metrics_dashboard.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/jfrog_platform/images/xray_metrics_dashboard.png
[6]: https://app.datadoghq.com/account/settings#api
[7]: https://github.com/jfrog/log-analytics-datadog/blob/master/README.md
[8]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[9]: https://www.jfrog.com/confluence/display/JFROG/User+Profile#UserProfile-APIKey
[10]: https://github.com/jfrog/metrics#setup
[11]: https://www.jfrog.com/confluence/display/JFROG/Access+Tokens#AccessTokens-GeneratingAdminTokens
[12]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[13]: https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/datadog_checks/jfrog_platform/data/conf.yaml.example
[14]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[15]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes
[16]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[17]: https://github.com/DataDog/integrations-extras/blob/master/jfrog_platform/metadata.csv
[18]: https://docs.datadoghq.com/ja/help/