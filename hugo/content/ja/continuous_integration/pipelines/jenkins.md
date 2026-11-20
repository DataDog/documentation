---
aliases:
- /ja/continuous_integration/setup_pipelines/jenkins
further_reading:
- link: /continuous_integration/pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/pipelines/custom_commands/
  tag: ドキュメント
  text: 個々のコマンドをトレースしてパイプラインの可視性を拡張する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: CI Visibility のトラブルシューティング
title: CI Visibility 向け Jenkins セットアップ
---
## 概要{#overview}

[Jenkins][19] は、継続的インテグレーションおよびデリバリー機能を備えた自動化サーバーです。プラグインアーキテクチャにより、Jenkins はあらゆる CI/CD ニーズに合わせてカスタマイズでき、プロジェクトの開発、テスト、デプロイのあらゆる側面を自動化します。

Jenkins 用に CI Visibility をセットアップして、パイプライン実行のさまざまなステージでデータを収集し、パフォーマンスのボトルネックを特定し、運用上の課題を解決し、デプロイプロセスを改善します。

### 互換性 {#compatibility}

| Pipeline Visibility | プラットフォーム | 定義                                                                                               |
|---|---|----------------------------------------------------------------------------------------------------------|
| [Manual steps][20] | Manual steps | 手動でトリガーされたパイプラインを表示します。                                                                      |
| [Queue time][21] | Queue time | パイプラインのジョブが処理される前にキューに残っている時間を表示します。                               |
| ログの相関付け | ログの相関付け | パイプラインスパンをログに関連付けます。[ログストレージ][10]が必要です。                                  |
| インフラストラクチャーメトリクスの相関 | インフラストラクチャーメトリクスの相関 | Jenkins ワーカーの[インフラストラクチャーホストメトリクス][11]にジョブを相関付けます。                                |
| [カスタムスパン][26] | カスタムスパン | パイプラインのカスタムスパンを構成します。                                                              |
| カスタム事前定義タグ | カスタム事前定義タグ | 生成されたすべてのパイプライン、ステージ、およびジョブスパンに[カスタムタグ][12]を設定します。                                 |
| [実行時のカスタムタグ][22][およびメジャー][23] | 実行時のカスタムタグおよびメジャー | 実行時の[カスタムタグおよびメジャー][12]を構成します。                                                    |
| [パラメーター][24] | パラメーター | パイプラインのトリガー時にカスタムパラメーター (デフォルトのブランチ名や Git 情報など) を設定します。|
| [パイプラインの障害理由][25] | パイプラインの障害理由 | エラーメッセージからパイプラインの障害理由を特定します。                                                  |
| [実行中のパイプライン][32] | 実行中のパイプライン | 稼働中のパイプライン実行を表示します。Jenkins プラグインバージョン 8.0.0 以上が必要です。                      |
| [クリティカルパスでの CI ジョブのフィルタリング][33] | クリティカルパスでの CI ジョブのフィルタリング | クリティカルパスでジョブでフィルタリングします。|
| [実行時間][34] | 実行時間  | パイプラインによるジョブ実行時間を表示します。|

以下の Jenkins バージョンに対応しています。

- Jenkins 2.346.1 以上

このインテグレーションは、Agentless および Agent ベース両方のインストールをサポートしています。
インフラストラクチャーのメトリクス相関には、Agent のインストールが必要です。

### 用語 {#terminology}

次の表に、Datadog CI Visibility と Jenkins の概念の対応を示します。

| Datadog  | Jenkins  |
|----------|----------|
| パイプライン | パイプライン |
| ステージ    | ステージ    |
| ジョブ      | ステップ     |

## Datadog Agent をインストールする {#install-the-datadog-agent}

インフラストラクチャーのメトリクス相関が不要な場合は、このステップをスキップしてください。

[Agent のインストール手順][14]に従って、Jenkins コントローラーノードおよびワーカーノードに Datadog Agent をインストールします。

Jenkins コントローラーと Datadog Agent が Kubernetes クラスターにデプロイされている場合、Datadog では [Admission Controller][2] を使用することをお勧めします。これにより、Jenkins コントローラー Pod の `DD_AGENT_HOST` 環境変数がローカルの Datadog Agent と通信するように自動的に設定されます。

Jenkins ジョブのログを Datadog にレポートする場合は、TCP 経由のカスタムログ収集が Agent で[有効化され、構成][29]されていることを確認してください。

Agent がコンテナ内で実行されている場合は、`DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true` 環境変数を追加し、Jenkins コントローラーから以下のポートにアクセスできることを確認してください。
- [DogStadsD][30] ポート、デフォルトは `8125/udp`
- [APM トレースポート][31]、デフォルトは `8126/tcp`
- [ログ収集ポート][29]、デフォルトは `10518/tcp`

<div class="alert alert-info">UNIX ドメインソケットを介した CI Visibility トレースの送信はサポートされていません。</div>

## Datadog Jenkins プラグインをインストールする {#install-the-datadog-jenkins-plugin}

<div class="alert alert-info">Datadog にデータをレポートするモードとして、Agentless モードと Agent ベースモードのいずれを選択する場合でも、プラグインの使用は<strong>必須</strong>です。</div>

[Datadog Jenkins プラグイン][3] v3.1.0 以降をインストールおよび有効化します。

1. Jenkins インスタンスの Web インターフェースで、[{{< ui >}}Manage Jenkins{{< /ui >}}] (Jenkins の管理) > [{{< ui >}}Manage Plugins{{< /ui >}}] (プラグインの管理) に移動します。
2. [Update Center][4] の [{{< ui >}}Available{{< /ui >}}] (使用可能) タブで、「{{< ui >}}Datadog Plugin{{< /ui >}}」(Datadog プラグイン) を検索します。
3. プラグインの横にあるチェックボックスを選択肢、画面下にある 2 つのインストールボタンの一方を使用してインストールします。
4. [{{< ui >}}Installed{{< /ui >}}] (インストール済み) タブで「{{< ui >}}Datadog Plugin{{< /ui >}}」を検索し、プラグインがインストールされたことを確認します。

## Datadog Jenkins プラグインを構成する {#configure-the-datadog-jenkins-plugin}

Datadog Jenkins プラグインを構成する方法は、いくつかあります。

### Jenkins の構成 UI で構成する {#configure-with-the-jenkins-configuration-ui}

#### Datadog Agent を介したレポート (推奨) {#report-through-the-datadog-agent-recommended}

1. Jenkins インスタンスの Web インターフェースで、[{{< ui >}}Manage Jenkins{{< /ui >}}] > [{{< ui >}}Configure System{{< /ui >}}] (システムの構成) に移動します。
2. コンフィギュレーション画面を下にスクロールして、[{{< ui >}}Datadog Plugin{{< /ui >}}] セクションに移動します。
3. [{{< ui >}}Use the Datadog Agent to report to Datadog{{< /ui >}}] (Datadog へのレポートに Datadog Agent を使用する) モードを選択します。
4. {{< ui >}}Agent{{< /ui >}} ホストを構成します。
5. CI Visibility を構成します。
   1. デフォルトポートの `8126` を使用していない場合は、[{{< ui >}}Traces Collection Port{{< /ui >}}] (トレース収集ポート) を構成します。
   2. [{{< ui >}}Test traces connection{{< /ui >}}] (トレース接続のテスト) ボタンをクリックして、構成が有効であることを確認します。
   3. [{{< ui >}}Enable CI Visibility{{< /ui >}}] (CI Visibility の有効化) チェックボックスをオンにします。
   4. (オプション) CI インスタンス名を構成します。
6. (オプション) ログ収集を構成します。
   1. Datadog Agent で構成した [{{< ui >}}Log Collection{{< /ui >}}] (ログ収集) ポートを構成します。
   2. [{{< ui >}}Test logs connection{{< /ui >}}] (ログ接続のテスト) ボタンをクリックして、構成が有効であることを確認します。
   3. [{{< ui >}}Enable Log Collection{{< /ui >}}] (ログ収集の有効化) チェックボックスをオンにします。
7. (オプション) Datadog UI へのアクセスに使用するホストの名前 (例: `app.datadoghq.com`) を [{{< ui >}}Datadog App hostname{{< /ui >}}] (Datadog App のホスト名) フィールドに入力します。
8. 構成を保存します。

{{< img src="ci/ci-jenkins-plugin-config-agentful-app-hostname.png" alt="Jenkins 向けの Datadog プラグイン構成" style="width:100%;">}}

#### Agentless (API キーを使用) {#agentless-using-an-api-key}

このオプションを使用すると、Jenkins プラグインは Datadog Agent を使用せずに Datadog に直接レポートするようになります。これには、API キーが必要です。

1. Jenkins インスタンスの Web インターフェースで、[{{< ui >}}Manage Jenkins{{< /ui >}}] > [{{< ui >}}Configure System{{< /ui >}}] に移動します。
2. コンフィギュレーション画面を下にスクロールして、[{{< ui >}}Datadog Plugin{{< /ui >}}] セクションに移動します。
3. [{{< ui >}}Use Datadog site and API key to report to Datadog{{< /ui >}}] (Datadog へのレポートに Datadog サイトと API キーを使用する) モードを選択します。
4. [{{< ui >}}Pick a site{{< /ui >}}] (サイトの選択) ドロップダウンで、ご使用の [Datadog サイト][1]を選択します。
5. 有効な [{{< ui >}}Datadog API Key{{< /ui >}}] (Datadog API キー) を入力します (または [{{< ui >}}Select from credentials{{< /ui >}}] (認証情報から選択) オプションを使用します)。
6. [{{< ui >}}Test Key{{< /ui >}}] (キーのテスト) ボタンをクリックして、API キーが有効であることを確認します。
7. CI Visibility を構成します。
   1. [{{< ui >}}Enable CI Visibility{{< /ui >}}] チェックボックスをオンにします。
   2. (オプション) CI インスタンス名を構成します。
8. (オプション) ログ収集を構成します。
   1. [{{< ui >}}Enable Log Collection{{< /ui >}}] チェックボックスをオンにします。
9. (オプション) Datadog UI へのアクセスに使用するホストの名前 (例: `app.datadoghq.com`) を [{{< ui >}}Datadog App hostname{{< /ui >}}] フィールドに入力します。
10. 構成を保存します。

{{< img src="ci/ci-jenkins-plugin-config-agentless-app-hostname.png" alt="Jenkins 向けの Datadog プラグイン構成" style="width:100%;">}}

[1]: /ja/getting_started/site/#access-the-datadog-site

### Configuration-as-Code を使用する {#use-configuration-as-code}

#### Datadog Agent を介したレポート (推奨) {#report-through-the-datadog-agent-recommended-1}

Jenkins インスタンスで Jenkins [`configuration-as-code`][1] プラグインを使用している場合は、次のようにします。

1. `datadogGlobalConfiguration` のエントリを追加して、コンフィギュレーション YAML を作成または変更します。

```yaml
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Datadog Agent` mode
      datadogAgentConfiguration:
        # Configure Datadog Agent host
        agentHost: '<your-agent-host>'
        # Configure Datadog Agent port
        agentPort: 8125
        # (Optional) Configure logs collection port as configured in your Datadog Agent
        agentLogCollectionPort: 10518
        # Configure traces collection port
        agentTraceCollectionPort: 8126
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure your CI Instance name
    ciInstanceName: 'jenkins'
    # (Optional) Configure the name of the host that you use to access Datadog UI
    datadogAppHostname: 'app.datadoghq.com'
    # (Optional) Enable Logs Storage
    collectBuildLogs: true
```

2. Jenkins インスタンスの Web インターフェースで、[{{< ui >}}Manage Jenkins{{< /ui >}}] > [{{< ui >}}Configuration as Code{{< /ui >}}] に移動します。
3. コンフィギュレーションを適用または再ロードします。
4. [{{< ui >}}View Configuration{{< /ui >}}] (コンフィギュレーションの表示) ボタンを使用して、コンフィギュレーションを確認します。

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md

#### Agentless (API キーを使用) {#agentless-using-an-api-key-1}

Jenkins インスタンスで Jenkins [`configuration-as-code`][1] プラグインを使用している場合は、次のようにします。

1. `datadogGlobalConfiguration` のエントリを追加して、コンフィギュレーション YAML を作成または変更します。

```yaml
unclassified:
  datadogGlobalConfiguration:
    datadogClientConfiguration:
      # Select the `Agentless` mode (using API key).
      datadogApiConfiguration:
        intake:
          datadogIntakeSite:
            # Configure your Datadog site
            site: '{{< region-param key=jenkins_site_name >}}'
        apiKey:
          datadogCredentialsApiKey:
            # Configure ID of Jenkins credentials that store your API key
            credentialsId: 'my-api-key-credentials-id'
    # Enable CI Visibility flag
    enableCiVisibility: true
    # (Optional) Configure your CI Instance name
    ciInstanceName: 'jenkins'
    # (Optional) Configure the name of the host that you use to access Datadog UI
    datadogAppHostname: '{{< region-param key=dd_full_site >}}'
    # (Optional) Enable Logs Storage
    collectBuildLogs: true
```

2. Jenkins インスタンスの Web インターフェースで、[{{< ui >}}Manage Jenkins{{< /ui >}}] > [{{< ui >}}Configuration as Code{{< /ui >}}] に移動します。
3. コンフィギュレーションを適用または再ロードします。
4. [{{< ui >}}View Configuration{{< /ui >}}] (コンフィギュレーションの表示) ボタンを使用して、コンフィギュレーションを確認します。

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md

### Groovy を使った構成 {#configure-with-groovy}

#### Datadog Agent を介したレポート (推奨) {#report-through-the-datadog-agent-recommended-2}

1. Jenkins インスタンスの Web インターフェースで、[{{< ui >}}Manage Jenkins{{< /ui >}}] > [{{< ui >}}Script Console{{< /ui >}}] (スクリプトコンソール) に移動します。
2. コンフィギュレーションスクリプトを実行します。

```groovy
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogAgentConfiguration

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def agentHost = 'localhost' // Configure your Datadog Agent host
def agentPort = 8125
def agentLogCollectionPort = 10518 // (Optional) Configure logs collection port as configured in your Datadog Agent
def agentTraceCollectionPort = 8126 // Configure traces collection port
datadog.datadogClientConfiguration = new DatadogAgentConfiguration(agentHost, agentPort, agentLogCollectionPort, agentTraceCollectionPort)

datadog.datadogAppHostname = 'app.datadoghq.com' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable Logs Storage

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
```

#### Agentless (API キーを使用) {#agentless-using-an-api-key-2}

1. Jenkins インスタンスの Web インターフェースで、[{{< ui >}}Manage Jenkins{{< /ui >}}] > [{{< ui >}}Script Console{{< /ui >}}] に移動します。
2. コンフィギュレーションスクリプトを実行します。

```groovy
import hudson.util.Secret
import jenkins.model.Jenkins
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.DatadogApiConfiguration
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogIntakeSite
import org.datadog.jenkins.plugins.datadog.configuration.api.intake.DatadogSite
import org.datadog.jenkins.plugins.datadog.configuration.api.key.DatadogTextApiKey

def jenkins = Jenkins.getInstance()
def datadog = jenkins.getDescriptorByType(DatadogGlobalConfiguration)

def site = new DatadogIntakeSite(DatadogSite.{{< region-param key=jenkins_site_name >}}) // Pick your Datadog site
def apiKey = new DatadogTextApiKey(Secret.fromString('<YOUR_API_KEY>')) // or `new DatadogCredentialsApiKey('<YOUR_CREDENTIALS_ID>')`
datadog.datadogClientConfiguration = new DatadogApiConfiguration(site, apiKey)

datadog.datadogAppHostname = '{{< region-param key=dd_full_site >}}' // the name of the host that you use to access Datadog UI
datadog.enableCiVisibility = true
datadog.collectBuildLogs = true // (Optional) Enable Logs Storage

datadog.ciInstanceName = 'jenkins' // (Optional) Set your CI Instance name

// Save config
datadog.save()
```

### 環境変数を使用する {#use-environment-variables}

#### Datadog Agent を介したレポート (推奨) {#report-through-the-datadog-agent-recommended-3}

1. Jenkins インスタンスマシンで次の環境変数を設定します。

```bash
# Select the Datadog Agent mode
DATADOG_JENKINS_PLUGIN_REPORT_WITH=DSD

# Configure the Agent host
DATADOG_JENKINS_PLUGIN_TARGET_HOST=your-agent-host

# Configure the Traces Collection port (default 8126)
DATADOG_JENKINS_PLUGIN_TARGET_TRACE_COLLECTION_PORT=8126

# Enable CI Visibility
DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

# (Optional) Configure your CI Instance name
DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

# (Optional) Configure Log Collection port as configured in your Datadog Agent
DATADOG_JENKINS_PLUGIN_TARGET_LOG_COLLECTION_PORT=10518

# (Optional) Enable Logs Storage
DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

# (Optional) Configure the name of the host that you use to access Datadog UI
DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME=app.datadoghq.com
```

2. Jenkins インスタンスを再起動します。

#### Agentless (API キーを使用) {#agentless-using-an-api-key-3}

1. Jenkins インスタンスマシンで次の環境変数を設定します。

```bash
# Select the Datadog Agent mode
DATADOG_JENKINS_PLUGIN_REPORT_WITH=HTTP

# Configure your Datadog site
DATADOG_JENKINS_PLUGIN_DATADOG_SITE={{< region-param key=jenkins_site_name >}}

# Configure your API key
DATADOG_JENKINS_PLUGIN_TARGET_API_KEY=your-api-key

# Enable CI Visibility
DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

# (Optional) Configure your CI Instance name
DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins

# (Optional) Enable Logs Storage
DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true

# (Optional) Configure the name of the host that you use to access Datadog UI
DATADOG_JENKINS_PLUGIN_DATADOG_APP_HOSTNAME={{< region-param key=dd_full_site >}}
```

2. Jenkins インスタンスを再起動します。

## ログストレージ {#logs-storage}

ログストレージは、Jenkins プラグインの構成時にオプションで有効にできます (前のセクションの `DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS` を参照)。
Agentless と Agent ベースの両方のオプションがサポートされています。

ログストレージは、CI Visibility とは別に課金されます。

ログの保持、除外、インデックスは [Log Management][27] で構成されます。Jenkins ジョブのログは、`source:jenkins` タグで確認できます。

## インフラストラクチャーメトリクスの相関付け {#correlate-infrastructure-metrics}

Jenkins のワーカーを使用している場合、パイプラインを実行しているインフラストラクチャーでパイプラインを関連付けることができます。この機能を使用できるようにするには、次のようにします。

1. 各 Jenkins ワーカーに [Datadog Agent][1] をインストールします。
2. 各 Jenkins ワーカーに `DD_CI_HOSTNAME` という新しい環境変数をワーカーのホスト名で設定し、エクスポートします。
  * これは、Datadog Agent がそのワーカーのインフラストラクチャーメトリクスで報告しているホスト名と同じである必要があります。
  * 固定値やほかの環境変数を有効な値として使用できます。

```bash
export DD_CI_HOSTNAME=my-hostname
```

Kubernetes を使用して Jenkins インスタンスを管理している場合は、`DD_CI_HOSTNAME` 環境変数を [Jenkins ジョブを実行する Pod][9] に追加します。この環境変数の値は、Datadog Agent デーモンセットで、何を使用してインフラストラクチャーメトリクスをレポートしているかによって異なります。

これは、Jenkins ワーカーでのみ必要です。Jenkins コントローラーの場合、インフラストラクチャーメトリクスの相関は追加アクションを必要としません。

**注**: インフラストラクチャーメトリクスの相関は、Jenkins プラグイン v5.0.0 以降でサポートされています。

## Test Optimization を有効にする {#enable-test-optimization}

これは、[Test Optimization][16] を使用したテストデータの収集を有効にするオプションのステップです。

使用しているテストフレームワークがサポートされていることを確認するには、お使いの言語の [Test Optimization ドキュメント][17]を参照してください。

Jenkins ジョブまたはパイプライン内で Test Optimization を有効にするには、いくつかの方法があります。
1. Jenkins の構成 UI を使用します。
2. `datadog` ステップをパイプラインスクリプト内に追加します。
3. SDK を手動で構成します。

テストを実行するために Docker コンテナを起動するパイプラインの場合、SDK は手動でしか構成できません。

### Jenkins の構成 UI で有効にする {#enable-with-the-jenkins-configuration-ui}

UI ベースの Test Optimization 構成は、Datadog Jenkins プラグイン v5.6.0 以降で利用可能です。

このオプションは、`Jenkinsfile` で完全に構成されるパイプライン (マルチブランチパイプラインや Organization フォルダーのパイプラインなど) には適していません。
このようなパイプラインでは、`datadog` ステップで宣言型構成 (次のセクションで説明します) を使用してください。

UI を使用して Test Optimization を有効にするには、以下の手順を実行します。
1. Jenkins インスタンスの Web インターフェースで、インスツルメントするジョブまたはパイプラインに移動し、[{{< ui >}}Configure{{< /ui >}}] (構成) オプションを選択します。
2. [{{< ui >}}General{{< /ui >}}] (一般) 構成セクションで、[{{< ui >}}Enable Datadog Test Optimization{{< /ui >}}] (Datadog Test Optimization の有効化) チェックボックスをオンにします。
3. テスト対象のサービスまたはライブラリの名前を [{{< ui >}}Service Name{{< /ui >}}] (サービス名) 入力欄に入力します。必要な任意の値を指定できます。
4. テストのインスツルメンテーションを有効にする言語を選択します。一部の言語では、UI を使用した構成を行えません。これらの言語の Test Optimization を構成するには、手動の[構成手順][18]に従います。
5. 必要に応じて、[追加の構成設定][18]を指定します。
6. [{{< ui >}}Save{{< /ui >}}] をクリックします。

{{< img src="ci/ci-jenkins-plugin-tests-config-2.png" alt="Jenkins 用の Datadog Test Optimization の構成" style="width:100%;">}}

### `datadog` パイプラインステップで有効にする {#enable-with-the-datadog-pipeline-step}

この構成オプションは、Datadog Jenkins プラグイン v5.6.2 以降で利用可能です。

宣言型パイプラインでは、トップレベルの `options` ブロックに、次のようにステップを追加します。

```groovy
pipeline {
    agent any
    options {
        datadog(testOptimization: [
            enabled: true,
            serviceName: "my-service", // the name of service or library being tested
            languages: ["JAVA"], // languages that should be instrumented (available options are "JAVA", "JAVASCRIPT", "PYTHON", "DOTNET", "RUBY")
            additionalVariables: ["my-var": "value"]  // additional tracer configuration settings (optional)
        ])
    }
    stages {
        stage('Example') {
            steps {
                echo "Hello world."
            }
        }
    }
}
```

スクリプト化されたパイプラインで、次のように関連セクションを `datadog` ステップでラップします。

```groovy
datadog(testOptimization: [ enabled: true, serviceName: "my-service", languages: ["JAVASCRIPT"], additionalVariables: [:] ]) {
  node {
    stage('Example') {
      echo "Hello world."
    }
  }
}
```

`collectLogs` や `tags` などのほかの `datadog` 設定を、`testOptimization` ブロックとともに追加できます。

### 手動トレーサー構成で有効化する {#enable-with-manual-tracer-configuration}

ご使用の言語専用の Test Optimization [構成手順][17] に従ってください。

## Git 情報を伝搬する {#propagate-git-information}

Datadog Jenkins プラグインの一部の機能が正しく動作するには、Jenkins ビルドに関連付けられた Git 情報が必要です。

ビルドに最小限必要な Git 情報は、リポジトリ URL、ブランチ、コミット SHA、コミット作成者のメールアドレスです。
この情報は、プラグインによって自動的に決定される、SCM から伝搬される、環境変数を使用して手動で指定する、あるいはこれらの方法を組み合わせて取得することができます。

**注:** パイプラインで複数のリポジトリをチェックアウトする場合、パイプラインの後半でチェックアウトされたリポジトリの Git 情報が優先されます。

### SCM から Git 情報を伝搬する {#propagate-git-information-from-scm}

Jenkins プラグインは、ビルドやパイプラインに関連付けられた Git 情報を自動的に検出できます。
ただし、Jenkins のバージョンやパイプラインの詳細によっては、Git データの自動検出ができない場合があります。

この場合、`checkout` または `git` ステップを実行した後に `.each {k,v -> env.setProperty(k, v)}` 関数を使用することで、プラグインで Git 情報を使用できるようになります。例:

#### 宣言型パイプラインの使用 {#using-declarative-pipelines}

宣言型パイプラインを使ってパイプラインの構成を行う場合は、以下のように `script` ブロックを使って Git の情報を伝搬させます。

`checkout` ステップの使用:

```groovy
pipeline {
  stages {
    stage('Checkout') {
        script {
          checkout(...).each {k,v -> env.setProperty(k,v)}
        }
    }
    ...
  }
}
```

`git` ステップの使用:

```groovy
pipeline {
  stages {
    stage('Checkout') {
      script {
        git(...).each {k,v -> env.setProperty(k,v)}
      }
    }
    ...
  }
}
```

#### スクリプト化されたパイプラインの使用 {#using-scripted-pipelines}

スクリプト化されたパイプラインを使ってパイプラインの構成を行う場合は、git の情報を直接環境変数に伝搬させることができます。

`checkout` ステップの使用:

```groovy
node {
  stage('Checkout') {
    checkout(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
```

`git` ステップの使用:

```groovy
node {
  stage('Checkout') {
    git(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
```


### Git の情報を手動で設定する {#set-git-information-manually}

プラグインが Git 情報を自動的に検出できず、SCM を使用して Git データを伝播させることができない場合は、
必要な Git 情報を手動で設定できます。

その場合は、以下の環境変数を設定します。

**注:** これらの変数はオプションですが、設定された場合、ほかの Jenkins プラグインで設定された Git 情報よりも優先されます。

`DD_GIT_REPOSITORY_URL`(オプション)
: サービスのリポジトリ URL。<br/>
**例**: `https://github.com/my-org/my-repo.git`

`DD_GIT_BRANCH` (オプション)
: ブランチ名。<br/>
**例**: `main`

`DD_GIT_TAG` (オプション)
: コミットのタグ (ある場合)。<br/>
**例**: `0.1.0`

`DD_GIT_COMMIT_SHA` (オプション)
: 16 進数 40 文字形式で表されるコミット。<br/>
**例**: `faaca5c59512cdfba9402c6e67d81b4f5701d43c`

`DD_GIT_COMMIT_MESSAGE` (オプション)
: コミットメッセージ。<br/>
**例**: `Initial commit message`

`DD_GIT_COMMIT_AUTHOR_NAME` (オプション)
: コミット作成者の名前。<br/>
**例**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL` (オプション)
: コミット作成者のメールアドレス。<br/>
**例**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE` (オプション)
: ISO 8601 形式で表される、作成者がコミットを実行した日付。<br/>
**例**: `2021-08-16T15:41:45.000Z`

`DD_GIT_COMMIT_COMMITTER_NAME` (オプション)
: コミットのコミッターの名前。<br/>
**例**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL` (オプション)
: コミットのコミッターのメールアドレス。<br/>
**例**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE` (オプション)
: ISO 8601 形式で表される、コミッターがコミットを実行した日付。<br/>
**例**: `2021-08-16T15:41:45.000Z`

リポジトリ、ブランチ、コミットのみを設定した場合、プラグインは `.git` フォルダーから残りの Git 情報を取り出そうとします。

使用方法の一例をご紹介します。

{{< code-block lang="groovy" >}}
pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        script {
          def gitVars = git url:'https://github.com/my-org/my-repo.git', branch:'some/feature-branch'

          // Setting Git information manually via environment variables.
          env.DD_GIT_REPOSITORY_URL=gitVars.GIT_URL
          env.DD_GIT_BRANCH=gitVars.GIT_BRANCH
          env.DD_GIT_COMMIT_SHA=gitVars.GIT_COMMIT
        }
      }
    }
    stage('Test') {
      steps {
        // Execute the rest of the pipeline.
      }
    }
  }
}
{{< /code-block >}}

## パイプラインを含めるまたは除外する {#include-or-exclude-pipelines}

一部のパイプラインを含めるか除外するように Jenkins プラグインを構成できます。

1. Jenkins インスタンスの Web インターフェースで、[{{< ui >}}Manage Jenkins{{< /ui >}}] > [{{< ui >}}Configure System{{< /ui >}}] に移動します。
2. コンフィギュレーション画面を下にスクロールして、[{{< ui >}}Datadog Plugin{{< /ui >}}] セクションに移動します。
3. [{{< ui >}}Advanced{{< /ui >}}] (高度) ボタンをクリックします。
4. [{{< ui >}}Excluded Jobs{{< /ui >}}] (除外するジョブ) を設定します。
5. [{{< ui >}}Included Jobs{{< /ui >}}] (含めるジョブ) を設定します。
6. 構成を保存します。

{{< ui >}}Excluded jobs{{< /ui >}}
: 監視対象としない Jenkins ジョブのカンマ区切りリスト。この除外は、すべてのメトリクス、トレース、イベント、およびサービスチェックに適用されます。[Excluded jobs] では、正規表現を使用して複数のジョブを参照できます。<br/>
**環境変数**: `DATADOG_JENKINS_PLUGIN_EXCLUDED`<br/>
**例**: `susans-job,johns-.*,prod_folder/prod_release`

{{< ui >}}Included jobs{{< /ui >}}
: 監視対象とする Jenkins ジョブ名のカンマ区切りリスト。含めるジョブのリストが空の場合、明示的に除外されていないすべてのジョブが監視されます。この包含は、すべてのメトリクス、トレース、イベント、およびサービスチェックに適用されます。[Included jobs] では、正規表現を使用して複数のジョブを参照できます。<br/>
**環境変数**: `DATADOG_JENKINS_PLUGIN_INCLUDED`<br/>
**例**: `susans-job,johns-.*,prod_folder/prod_release`

含めるジョブと除外するジョブのリストには正規表現を含めることができますが、glob パターンは使用できません。特定のプレフィックスを持つジョブを含めるには、`prefix-*` ではなく `prefix-.*` を使用します。

## 高度な構成 {#advanced-configuration}

### デフォルトのブランチ名を設定する {#set-the-default-branch-name}

パイプラインの結果を報告するには、デフォルトのブランチ名 (例: `main`) を `git.default_branch` という属性のパイプラインスパンに付加します。これは通常自動的に行われますが、Jenkins によって情報が提供されない場合など、プラグインがこの情報を抽出できないことがあります。

この場合は、ビルド内の `DD_GIT_DEFAULT_BRANCH` 環境変数を使用して、デフォルトのブランチを手動で設定してください。例:

{{< code-block lang="groovy" >}}
pipeline {
    agent any
    environment {
        DD_GIT_DEFAULT_BRANCH = 'main'
        ...
    }
    stages {
        ...
    }
}
{{< /code-block >}}


### パイプラインのカスタムタグを設定する {#set-custom-tags-for-your-pipelines}

Datadog プラグインは、パイプラインベースのジョブにカスタムタグを付加するために `datadog` ステップを追加します。

Declarative Pipeline で、このステップをトップレベルのオプションブロックに追加します:

{{< code-block lang="groovy" >}}
def DD_TYPE = "release"
pipeline {
    agent any
    options {
        datadog(tags: ["team:backend", "type:${DD_TYPE}", "${DD_TYPE}:canary"])
    }
    stages {
        stage('Example') {
            steps {
                echo "Hello world."
            }
        }
    }
}
{{< /code-block >}}

スクリプト化されたパイプラインで、関連するセクションを `datadog` ステップでラップします。

{{< code-block lang="groovy" >}}
datadog(tags: ["team:backend", "release:canary"]){
    node {
        stage('Example') {
            echo "Hello world."
        }
    }
}
{{< /code-block >}}

#### Datadog Teams との統合 {#integrate-with-datadog-teams}
パイプラインに関連付けられたチームを表示およびフィルタリングするには、`team:<your-team>` をカスタムタグとして追加します。カスタムタグ名は、[Datadog Teams][15] のチームハンドルと完全に一致している必要があります。

### グローバルカスタムタグを設定する {#set-global-custom-tags}

Jenkins プラグインを構成して、すべてのパイプライントレースにカスタムタグ (グローバルタグやグローバグジョブタグなど) を送信することができます。

1. Jenkins インスタンスの Web インターフェースで、[{{< ui >}}Manage Jenkins{{< /ui >}}] > [{{< ui >}}Configure System{{< /ui >}}] に移動します。
2. コンフィギュレーション画面を下にスクロールして、[{{< ui >}}Datadog Plugin{{< /ui >}}] セクションに移動します。
3. [{{< ui >}}Advanced{{< /ui >}}] ボタンをクリックします。
4. [{{< ui >}}Global Tags{{< /ui >}}] (グローバルタグ) を構成します。
5. [{{< ui >}}Global Job Tags{{< /ui >}}] (グローバルジョブタグ) を構成します。
6. 構成を保存します。

{{< ui >}}Global tags{{< /ui >}}
: すべてのメトリクス、トレース、イベント、サービスチェックに適用するカンマ区切りのタグのリストです。タグには、Jenkins コントローラーインスタンスで定義されている環境変数を含めることができます。<br/>
**環境変数**: `DATADOG_JENKINS_PLUGIN_GLOBAL_TAGS`<br/>
**例**: `key1:value1,key2:${SOME_ENVVAR},${OTHER_ENVVAR}:value3`

{{< ui >}}Global job tags{{< /ui >}}
: ジョブに一致させる正規表現のカンマ区切りリストと、そのジョブに適用するタグのリストです。タグには、Jenkins コントローラーインスタンスで定義されている環境変数を含めることができます。タグでは、`$` 記号を使用して正規表現で一致グループを参照できます。<br/>
**環境変数**: `DATADOG_JENKINS_PLUGIN_GLOBAL_JOB_TAGS`<br/>
**例**: `(.*?)_job_(.*?)_release, owner:$1, release_env:$2, optional:Tag3`

## Datadog でパイプラインデータを視覚化する{#visualize-pipeline-data-in-datadog}

インテグレーションが正常に構成されたら、パイプラインが終了した後、[[**CI Pipeline List**] (CI パイプラインリスト)][7] ページと [[**Executions**] (実行)][8] ページの両方にデータが表示されます。

[{{< ui >}}CI Pipeline List{{< /ui >}}] ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。詳細については、「[CI パイプラインの検索と管理][28]」を参照してください。

## トラブルシューティング {#troubleshooting}

### 診断フレアを生成する {#generate-diagnostic-flare}

Datadog サポートチームに問題を報告する際は、プラグインの診断フレアを生成し、問題の説明と一緒に提供してください。

診断フレアを生成するには、次の手順を実行します。

1. Jenkins インスタンスの Web インターフェースで、[{{< ui >}}Manage Jenkins{{< /ui >}}] (Jenkins の管理) > [{{< ui >}}Troubleshooting{{< /ui >}}] (トラブルシューティング) > [{{< ui >}}Datadog{{< /ui >}}] に移動します。
2. 診断フレアフォームで、フレアに含める情報にチェックマークを付けます。デフォルトの選択が最適です。提供する情報が多いほど、問題の診断が容易になります。
3. [{{< ui >}}Download{{< /ui >}}] (ダウンロード) をクリックして、フレアアーカイブを生成およびダウンロードします。

### Datadog プラグインの DEBUG ログレベルを有効にする {#enable-debug-log-level-for-the-datadog-plugin}

Datadog プラグインで問題が発生した場合は、プラグインのログを `DEBUG` レベルに設定できます。このレベルを使用すると、例外がスローされた場合にスタックトレースの詳細を確認できます。

1. Jenkins インスタンスの Web インターフェースで、[{{< ui >}}Manage Jenkins{{< /ui >}}] > [{{< ui >}}System log{{< /ui >}}] (システムログ) に移動します。
2. [{{< ui >}}Add new log recorder{{< /ui >}}] (新規ログレコーダーの追加) ボタンをクリックします。
3. ログレコーダー名を入力します。例: **Datadog Plugin Logs**。
4. 次のロガーをリストに追加します。
    - ロガー: `org.datadog.jenkins.plugins.datadog.clients` -> ログレベル `ALL`
    - ロガー: `org.datadog.jenkins.plugins.datadog.traces` -> ログレベル `ALL`
    - ロガー: `org.datadog.jenkins.plugins.datadog.logs` -> ログレベル `ALL`
    - ロガー: `org.datadog.jenkins.plugins.datadog.model` -> ログレベル `ALL`
    - ロガー: `org.datadog.jenkins.plugins.datadog.listeners` -> ログレベル `ALL`
5. 構成を保存します。

ロガーを異なるログレコーダーに分割することもできます。

ログレコーダーが正常に構成されたら、[{{< ui >}}Manage Jenkins{{< /ui >}}] > [{{< ui >}}System log{{< /ui >}}] から目的のログレコーダーにアクセスして、`DEBUG` モードでログを確認できます。

Jenkins パイプラインをトリガーすると、[{{< ui >}}Datadog Plugin Logs{{< /ui >}}] (Datadog プラグインログ) でメッセージ `Send pipeline traces` を検索できます。このメッセージは、プラグインが CI Visibility データを Datadog Agent に送信していることを示しています。

{{< code-block lang="text" >}}
Send pipeline traces.
...
Send pipeline traces.
...
{{< /code-block >}}

### パイプライン実行データは Datadog では使用できない {#pipeline-executions-data-is-not-available-in-datadog}

#### HTTP 接続チェック {#http-connectivity-check}

Jenkins インスタンスが HTTP プロキシの後ろにある場合は、[{{< ui >}}Manage Jenkins{{< /ui >}}] > [{{< ui >}}Manage Plugins{{< /ui >}}] (プラグインの管理) > [{{< ui >}}Advanced tab{{< /ui >}}] (詳細タブ) に移動し、プロキシ構成が正しいことを確認します。
- Datadog プラグインが Datadog Agent にデータを送信するように構成されている場合は、Agent ホストが [{{< ui >}}No Proxy Hosts{{< /ui >}}] (プロキシホストなし) セクションに追加されていることを確認します。
- Datadog プラグインが Datadog に直接データを送信するように構成されている場合は (Agentless モード)、Datadog ホストが [{{< ui >}}No Proxy Hosts{{< /ui >}}] セクションに追加されていることを確認します。次の表に、サポートされている Datadog サイトと対応するホスト値を示します。

| Datadog サイト | ホスト値 |
| ------------ | ----------------------- |
| US1          | datadoghq.com           |
| US3          | us3.datadoghq.com       |
| US5          | us5.datadoghq.com       |
| EU1          | datadoghq.eu            |
| AP1          | ap1.datadoghq.com       |
| UK1          | uk1.datadoghq.com       |

#### Datadog Plugin がサーバーにペイロードを書き込めない {#the-datadog-plugin-cannot-write-payloads-to-the-server}

[{{< ui >}}Jenkins Log{{< /ui >}}] (Jenkins ログ) に以下のエラーメッセージが表示された場合、プラグインの構成が正しいかどうか確認してください。

{{< code-block lang="text" >}}
Error writing to server
{{< /code-block >}}

ホスト名として `localhost` を使用している場合は、代わりにサーバーのホスト名に変更してください。

### Jenkins ログを Datadog で使用できない {#jenkins-logs-are-not-available-in-datadog}

Datadog プラグインが Datadog Agent にデータを送信するように構成されている場合は、以下の手順を実行してください。
- TCP 経由のカスタムログ収集が Agent で[有効化され、構成されている][29]ことを確認します。
- プラグイン構成 UI に移動し、[{{< ui >}}Test logs connection{{< /ui >}}] (ログ接続のテスト) をクリックしてログの接続性を確認します。

### Datadog プラグインセクションが Jenkins コンフィギュレーションに表示されない {#the-datadog-plugin-section-does-not-appear-in-the-jenkins-configuration}

Datadog プラグインセクションが Jenkins コンフィギュレーションセクションに表示されない場合は、プラグインが有効になっていることを確認します。そのためには、以下の作業を行います。

1. Jenkins インスタンスの Web インターフェースで、[{{< ui >}}Manage Jenkins{{< /ui >}}] > [{{< ui >}}Manage Plugins{{< /ui >}}] に移動します。
2. [{{< ui >}}Datadog Plugin{{< /ui >}}] (Datadog プラグイン) を [{{< ui >}}Installed{{< /ui >}}] (インストール済み) タブで検索します。
3. [{{< ui >}}Enabled{{< /ui >}}] (有効化) チェックボックスがオンになっていることを確認します。
4. ここでプラグインを有効にする場合は、`/safeRestart` URL パスを使用して Jenkins インスタンスを再起動します。

### CI Visibility オプションが Datadog プラグインセクションに表示されない。{#the-ci-visibility-option-does-not-appear-in-the-datadog-plugin-section}

CI Visibility オプションが Datadog プラグインセクションに表示されない場合は、正しいバージョンがインストールされていることを確認して、Jenkins インスタンスを再起動してください。そのためには、以下の作業を行います。

1. Jenkins インスタンスの Web インターフェースで、[{{< ui >}}Manage Jenkins{{< /ui >}}] > [{{< ui >}}Manage Plugins{{< /ui >}}] に移動します。
2. [{{< ui >}}Datadog Plugin{{< /ui >}}] (Datadog プラグイン) を [{{< ui >}}Installed{{< /ui >}}] (インストール済み) タブで検索します。
3. インストールされているバージョンが正しいことを確認します。
4. `/safeRestart` URL パスを使用して Jenkins インスタンスを再起動します。

### インフラストラクチャーメトリクスが Jenkins パイプラインに関連付けられない {#infrastructure-metrics-do-not-get-correlated-with-jenkins-pipelines}

[インフラストラクチャーメトリクスと Jenkins パイプラインを関連付ける][11]ための手順を完了していることを確認してください。

この手順を完了してもインフラストラクチャーメトリクスが Jenkins パイプラインと関連付けられない場合は、
Jenkins インスタンスを再起動してみてください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: /ja/agent/cluster_agent/admission_controller/
[3]: https://plugins.jenkins.io/datadog/
[4]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: https://plugins.jenkins.io/kubernetes/#plugin-content-pod-template
[10]: /ja/continuous_integration/pipelines/jenkins/?tab=linux#logs-storage
[11]: /ja/continuous_integration/pipelines/jenkins/?tab=agentlessusinganapikey#correlate-infrastructure-metrics
[12]: /ja/continuous_integration/pipelines/custom_tags_and_measures/
[14]: /ja/agent/
[15]: /ja/account_management/teams/
[16]: /ja/continuous_integration/tests/
[17]: /ja/continuous_integration/tests/setup/
[18]: /ja/tracing/trace_collection/library_config/
[19]: https://www.jenkins.io/
[20]: /ja/glossary/#manual-step
[21]: /ja/glossary/#queue-time
[22]: /ja/glossary/#custom-tag
[23]: /ja/glossary/#custom-measure
[24]: /ja/glossary/#parameter
[25]: /ja/glossary/#pipeline-failure
[26]: /ja/glossary/#custom-span
[27]: /ja/logs/guide/best-practices-for-log-management/
[28]: /ja/continuous_integration/search/#search-for-pipelines
[29]: /ja/agent/logs/?tab=tcpudp#custom-log-collection
[30]: /ja/extend/dogstatsd/
[31]: /ja/containers/docker/apm/#tracing-from-the-host
[32]: /ja/glossary/#running-pipeline
[33]: /ja/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[34]: /ja/glossary/#pipeline-execution-time