---
further_reading:
- link: /continuous_integration/explore_pipelines
  tag: ドキュメント
  text: パイプラインの実行結果とパフォーマンスを確認する
- link: /continuous_integration/setup_pipelines/custom_commands/
  tag: ドキュメント
  text: 個々のコマンドをトレースしてパイプラインの可視性を拡張する
- link: /continuous_integration/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング CI
kind: documentation
title: Jenkins パイプラインでトレースを設定する
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では、現時点では CI Visibility は使用できません。</div>
{{< /site-region >}}

## 互換性

対応する Jenkins のバージョン:
* 3.x バージョンのプラグインの場合: Jenkins >= 2.164.1
* 4.x バージョンのプラグインの場合: Jenkins >= 2.303.3

## 前提条件

Jenkins コントローラーインスタンスに [Datadog Agent][1] をインストールします。

Jenkins コントローラーと Datadog Agent が Kubernetes クラスターにデプロイされている場合、Datadog では、Jenkins コントローラーポッドに環境変数 `DD_AGENT_HOST` を自動的に設定して、ローカル Datadog Agent と通信する [Admission Controller][2] を使用することを推奨しています。

<div class="alert alert-info"><strong>注</strong>: Unix ドメインソケットは、CI Visibility トレースの送信にはまだ対応していません。</div>

## Datadog Jenkins プラグインをインストール

[Datadog Jenkins プラグイン][2] v3.3.0 以降をインストールおよび有効化します:

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Manage Plugins** にアクセスします。
2. **Available** タブの [Update Center][4] で、`Datadog Plugin` を探します。　
3. プラグインの横にあるチェックボックスを選択肢、画面下にある 2 つのインストールボタンの一方を使用してインストールします。
4. **Installed** タブで `Datadog Plugin` を検索し、プラグインがインストールされたことを確認します。

## プラグインで CI 表示を有効化する

{{< tabs >}}
{{% tab "UI の使用" %}}

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Configure System** にアクセスします。
2. コンフィギュレーション画面を下にスクロールして、`Datadog Plugin` セクションに移動します。
3. `Datadog Agent` モードを選択します。Datadog API の URL と API キーを使用した CI Visibility は**サポートされていません**。
4. `Agent` ホストを構成します。
5. `Traces Collection` ポート (デフォルトは `8126`) を構成します。
6. `Enable CI Visibility` チェックボックスをクリックしてアクティブにします。
7. (オプション) CI インスタンス名を構成します。
8. Datadog Agent との接続を確認します。
9. 構成を保存します。

{{< img src="ci/ci-jenkins-plugin-config.png" alt="Jenkins の Datadog プラグインコンフィギュレーション" style="width:100%;">}}
{{% /tab %}}
{{% tab "configuration-as-code の使用" %}}
Jenkins インスタンスが Jenkins [`configuration-as-code`][1] プラグインを使用する場合:

1. `datadogGlobalConfiguration` のエントリを追加して、コンフィギュレーション YAML を作成または変更します。
    ```yaml
    unclassified:
        datadogGlobalConfiguration:
            # Select the `Datadog Agent` mode.
            reportWith: "DSD"
            # Configure the `Agent` host
            targetHost: "agent-host"
            # Configure the `Traces Collection` port (default `8126`).
            targetTraceCollectionPort: 8126
            # Enable CI Visibility flag
            enableCiVisibility: true
            # (Optional) Configure your CI Instance name
            ciInstanceName: "jenkins"
    ```
2. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Configuration as Code** にアクセスします。
3. コンフィギュレーションを適用または再ロードします。
4. `View Configuration` ボタンを使用してコンフィギュレーションを確認します。

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md
{{% /tab %}}
{{% tab "Groovy の使用" %}}

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Script Console** にアクセスします。
2. コンフィギュレーションスクリプトを実行します。
    ```groovy
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Select the Datadog Agent mode
    d.setReportWith('DSD')

    // Configure the Agent host.
    d.setTargetHost('<agent host>')

    // Configure the Traces Collection port (default 8126)
    d.setTargetTraceCollectionPort(8126)

    // Enable CI Visibility
    d.setEnableCiVisibility(true)

    // (Optional) Configure your CI Instance name
    d.setCiInstanceName("jenkins")

    // Save config
    d.save()
    ```
{{% /tab %}}
{{% tab "環境変数の使用" %}}

1. Jenkins インスタンスマシンで次の環境変数を設定します。
    ```bash
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=DSD

    # Configure the Agent host
    DATADOG_JENKINS_PLUGIN_TARGET_HOST=agent-host

    # Configure the Traces Collection port (default 8126)
    DATADOG_JENKINS_PLUGIN_TARGET_TRACE_COLLECTION_PORT=8126

    # Enable CI Visibility
    DATADOG_JENKINS_PLUGIN_ENABLE_CI_VISIBILITY=true

    # (Optional) Configure your CI Instance name
    DATADOG_JENKINS_PLUGIN_CI_VISIBILITY_CI_INSTANCE_NAME=jenkins
    ```
2. Jenkins インスタンスを再起動します。

{{% /tab %}}
{{< /tabs >}}

CI Visibility が有効になっていることを確認するには、`Jenkins Log` に移動して次を検索します。

{{< code-block lang="text" >}}
Re/Initialize Datadog-Plugin Agent Http Client
TRACE -> http://<HOST>:<TRACE_PORT>/v0.3/traces
{{< /code-block >}}

## ジョブログ収集を有効にする

これは、ジョブログの収集を可能にするオプションの手順です。これには、Datadog Agent でジョブ収集ポートを有効にする手順と、Datadog プラグインでジョブ収集を有効にする手順の 2 つの手順が含まれます。

### Datadog Agent

まず、TCP ポートを開いてログを収集することにより、Datadog Agent でジョブログ収集を有効にします。

1. Agent のコンフィギュレーションファイル `datadog.yaml` に `logs_enabled: true` を追加するか、`DD_LOGS_ENABLED=true` 環境変数を設定します。　 

2. Linux の `/etc/datadog-agent/conf.d/jenkins.d/conf.yaml` に以下の内容のファイルを作成します。`service` が以前に提供された CI インスタンス名と一致することを確認してください。その他のオペレーティングシステムについては、[Agent コンフィギュレーションディレクトリ][5]ガイドを参照してください。

{{< code-block lang="yaml" >}}
logs:
  - type: tcp
    port: 10518
    service: my-jenkins-instance
    source: jenkins
{{< /code-block >}}

3. [Agent を再起動][6]して変更を有効にします。

この設定で、Agent はログをポート `10518` でリッスンします。

### Datadog プラグイン

次に、Datadog プラグインでジョブログ収集を有効にします。

{{< tabs >}}
{{% tab "UI の使用" %}}

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Configure System** に移動します。
2. コンフィギュレーション画面を下にスクロールして、`Datadog Plugin` セクションに移動します。
3. `Datadog Agent` モードを選択します。
4. 以前に構成されていない場合は、 `Agent` ホストを構成します。
5. 前の手順で構成したように、`Log Collection` ポートを構成します。
6. `Enable Log Collection` チェックボックスをクリックしてアクティブにします。
7. Datadog Agent との接続を確認します。
8. 構成を保存します。
{{% /tab %}}
{{% tab "configuration-as-code の使用" %}}
Jenkins インスタンスが Jenkins [`configuration-as-code`][1] プラグインを使用する場合:

1. エントリ `datadogGlobalConfiguration` のコンフィギュレーション YAML を作成または変更します。
    ```yaml
    unclassified:
    datadogGlobalConfiguration:
        # Select the `Datadog Agent` mode.
        reportWith: "DSD"
        # Configure the `Agent` host
        targetHost: "agent-host"
        # Configure the `Log Collection` port, as configured in the previous step.
        targetLogCollectionPort: 10518
        # Enable Log collection
        collectBuildLogs: true
    ```
2. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Configuration as Code** にアクセスします。
3. コンフィギュレーションを適用または再ロードします。
4. `View Configuration` ボタンを使用してコンフィギュレーションを確認します。

[1]: https://github.com/jenkinsci/configuration-as-code-plugin/blob/master/README.md
{{% /tab %}}
{{% tab "Groovy の使用" %}}

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Script Console** にアクセスします。
2. コンフィギュレーションスクリプトを実行します。
    ```groovy
    import jenkins.model.*
    import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

    def j = Jenkins.getInstance()
    def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

    // Select the Datadog Agent mode
    d.setReportWith('DSD')

    // Configure the Agent host, if not previously configured.
    d.setTargetHost('<agent host>')

    // Configure the Log Collection port, as configured in the previous step.
    d.setTargetLogCollectionPort(10518)

    // Enable log collection
    d.setCollectBuildLogs(true)

    // Save config
    d.save()
    ```
{{% /tab %}}
{{% tab "環境変数の使用" %}}

1. Jenkins インスタンスマシンで次の環境変数を設定します。
    ```bash
    # Select the Datadog Agent mode
    DATADOG_JENKINS_PLUGIN_REPORT_WITH=DSD

    # Configure the Agent host
    DATADOG_JENKINS_PLUGIN_TARGET_HOST=agent-host

    # Configure the Log Collection port, as configured in the previous step.
    DATADOG_JENKINS_PLUGIN_TARGET_LOG_COLLECTION_PORT=10518

    # Enable log collection
    DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS=true
    ```
2. Jenkins インスタンスを再起動します。

{{% /tab %}}
{{< /tabs >}}

## デフォルトのブランチ名を設定する

パイプラインの結果を報告するには、デフォルトのブランチ名 (例: `main`) をパイプラインのスパンに `git.default_branch` という属性で付加します。これは通常、自動的に行われますが、Jenkins からこの情報が提供されず、プラグインがこの情報を抽出できない場合もあります。

この場合、ビルドで `DD_GIT_DEFAULT_BRANCH` 環境変数を使用してデフォルトのブランチを手動で設定します。例:

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

## SCM から Jenkinsfile を使わずにパイプラインで Git 情報を伝搬させます。

Jenkins プラグインは、Git の情報を環境変数で判断しています。しかし、リポジトリで `Jenkinsfile` を使用しておらず、Jenkins で `checkout` ステップを使って直接パイプラインを構成している場合、これらの環境変数が利用できないことがあります。

この場合、Git の情報をビルドの環境変数に伝搬させることができます。`checkout` や `git` のステップを実行した後に、 `.each {k,v -> env.setProperty(k, v)}` という関数を使用します。例:

{{< tabs >}}
{{% tab "宣言型パイプラインの使用" %}}
宣言型パイプラインを使ってパイプラインの構成を行う場合は、以下のように `script` ブロックを使って Git の情報を伝搬させます。

`checkout` ステップを使用する:
{{< code-block lang="groovy" >}}
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
{{< /code-block >}}

 `git` ステップを使用する:
{{< code-block lang="groovy" >}}
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
{{< /code-block >}}

{{% /tab %}}
{{% tab "スクリプトパイプラインの使用" %}}
スクリプトパイプラインを使ってパイプラインの構成を行う場合は、git の情報を直接環境変数に伝搬させることができます。

`checkout` ステップを使用する:
{{< code-block lang="groovy" >}}
node {
  stage('Checkout') {
    checkout(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
{{< /code-block >}}

`git` ステップを使用する:
{{< code-block lang="groovy" >}}
node {
  stage('Checkout') {
    git(...).each {k,v -> env.setProperty(k,v)}
  }
  ...
}
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}


## Git の情報を手動で設定する

Jenkins プラグインは、環境変数を使用して Git 情報を決定します。しかし、パイプラインで使用している Git プラグインに依存するため、これらの環境変数が常に自動的に設定されるわけではありません。

Git 情報が自動的に検出されない場合は、以下の環境変数を手動で設定することができます。

**注:** これらの変数はオプションですが、設定された場合、他の Jenkins プラグインで設定された Git 情報よりも優先されます。

`DD_GIT_REPOSITORY` (オプション)
: サービスのリポジトリ URL。<br/>
**例**: `https://github.com/my-org/my-repo.git`

`DD_GIT_BRANCH` (オプション)
: ブランチ名。<br/>
**例**: `main`

`DD_GIT_TAG` (オプション)
: コミットのタグ (ある場合)。<br/>
**例**: `0.1.0`

`DD_GIT_COMMIT_SHA` (オプション)
: 16 進数 40 文字で表されるコミットメント。<br/>
**例**: `faaca5c59512cdfba9402c6e67d81b4f5701d43c`

`DD_GIT_COMMIT_MESSAGE` (オプション)
: コミットのメッセージ。<br/>
**例**: `Initial commit message`

`DD_GIT_COMMIT_AUTHOR_NAME` (オプション)
: コミットの作成者の名前。<br/>
**例**: `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL` (オプション)
: コミットの作成者のメールアドレス。<br/>
**例**: `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE` (オプション)
: 作成者がコミットを提出した日付 (ISO 8601 形式)。<br/>
**例**: `2021-08-16T15:41:45.000Z`

`DD_GIT_COMMIT_COMMITTER_NAME` (オプション)
: コミットのコミッターの名前。<br/>
**例**: `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL` (オプション)
: コミットのコミッターのメールアドレス。<br/>
**例**: `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE` (オプション)
: コミッターがコミットを提出した日付 (ISO 8601 形式)。<br/>
**例**: `2021-08-16T15:41:45.000Z`

リポジトリ、ブランチ、コミットのみを設定した場合、プラグインは `.git` フォルダから残りの Git 情報を取り出そうとします。

使用方法の一例をご紹介します。

{{< code-block lang="groovy" >}}
pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        script {
          def gitVars = git url:'https://github.com/my-org/my-repo.git', branch:'some/feature-branch'

          // Git 情報を環境変数で手動設定する。
          env.DD_GIT_REPOSITORY_URL=gitVars.GIT_URL
          env.DD_GIT_BRANCH=gitVars.GIT_BRANCH
          env.DD_GIT_COMMIT_SHA=gitVars.GIT_COMMIT
        }
      }
    }
    stage('Test') {
      steps {
        // 残りのパイプラインを実行します。
      }
    }
  }
}
{{< /code-block >}}

## 内容

### パイプラインのカスタムタグを設定する

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

Scripted Pipeline で、関連するセクションを `datadog` ステップでラップします:

{{< code-block lang="groovy" >}}
datadog(tags: ["team:backend", "release:canary"]){
    node {
        stage('Example') {
            echo "Hello world."
        }
    }
}
{{< /code-block >}}

### グローバルカスタムタグを設定する

すべてのパイプライントレースにカスタムタグを送信するよう、Jenkins プラグインを構成することができます:

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Configure System** に移動します。
2. コンフィギュレーション画面を下にスクロールして、`Datadog Plugin` セクションに移動します。
3. `Advanced` ボタンをクリックします。
4. `Global Tags` を構成します。
5. `Global Job Tags` を構成します。
6. 構成を保存します。

**Global tags**
: すべてのメトリクス、トレース、イベント、サービスチェックに適用するタグのコンマ区切りのリスト。タグには、Jenkins コントローラーインスタンスで定義されている環境変数を含めることができます。<br/>
**環境変数**: `DATADOG_JENKINS_PLUGIN_GLOBAL_TAGS`<br/>
**例**: `key1:value1,key2:${SOME_ENVVAR},${OTHER_ENVVAR}:value3`

**Global job tags**
: ジョブに一致する正規表現のコンマ区切りのリストと、そのジョブに適用するタグのリスト。タグには、Jenkins コントローラーインスタンスで定義されている環境変数を含めることができます。タグは、`$` 記号を使用して正規表現内の一致グループを参照できます。<br/>
**環境変数**: `DATADOG_JENKINS_PLUGIN_GLOBAL_JOB_TAGS`<br/>
**例**: `(.*?)_job_(.*?)_release, owner:$1, release_env:$2, optional:Tag3`

### パイプラインを含めるまたは除外する

一部のパイプラインを含めるか除外するように Jenkins プラグインを構成できます。

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Configure System** に移動します。
2. コンフィギュレーション画面を下にスクロールして、`Datadog Plugin` セクションに移動します。
3. `Advanced` ボタンをクリックします。
4. `Excluded Jobs` を構成します。
5. `Included Jobs` を構成します。
6. 構成を保存します。

**Excluded jobs**
: 監視すべきではない Jenkins ジョブのコンマ区切りのリスト。除外は、すべてのメトリクス、トレース、イベント、サービスチェックに適用されます。除外されたジョブは、正規表現を使用して複数のジョブを参照できます。<br/>
**環境変数**: `DATADOG_JENKINS_PLUGIN_EXCLUDED`<br/>
**例**: `susans-job,johns-.*,prod_folder/prod_release`

**Included jobs**
: 監視する必要がある Jenkins ジョブ名のコンマ区切りのリスト。含まれるジョブのリストが空の場合、明示的に除外されていないすべてのジョブが監視されます。包含は、すべてのメトリクス、トレース、イベント、サービスチェックに適用されます。含まれるジョブは、正規表現を使用して複数のジョブを参照できます。<br/>
**環境変数**: `DATADOG_JENKINS_PLUGIN_INCLUDED`<br/>
**例**: `susans-job,johns-.*,prod_folder/prod_release`

## Datadog でパイプラインデータを視覚化する

インテグレーションが正常に構成されたら、パイプラインが終了した後、[Pipelines][7] ページと [Pipeline Executions][8] ページの両方にデータが入力されます。

**注**: Pipelines ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。

## トラブルシューティング

### Datadog プラグインの DEBUG ログレベルを有効にする

Datadog プラグインに問題がある場合は、プラグインのログを `DEBUG` レベルで設定できます。このレベルを使用すると、例外がスローされた場合にスタックトレースの詳細を確認できます。

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > System log** にアクセスします。
2. `Add new log recorder` ボタンをクリックします。
3. ログレコーダー名を入力します。例: **Datadog プラグインログ**
4. 次のロガーをリストに追加します。
    - Logger: `org.datadog.jenkins.plugins.datadog.clients` -> Log Level `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.traces` -> Log Level `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.logs` -> Log Level `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.model` -> Log Level `ALL`
    - Logger: `org.datadog.jenkins.plugins.datadog.listeners` -> Log Level `ALL`
5. 構成を保存します。

ロガーを異なるログレコーダーに分割することもできます。

ログレコーダーが正常に構成されたら、**Manage Jenkins > System log** から目的のログレコーダーにアクセスして、`DEBUG` モードでログを確認できます。

Jenkins パイプラインをトリガーすると、**Datadog Plugin Logs** でメッセージ `Send pipeline traces` を検索できます。このメッセージは、プラグインが **CI Visibility** データを **Datadog Agent** に送信していることを示しています。

{{< code-block lang="text" >}}
Send pipeline traces.
...
Send pipeline traces.
...
{{< /code-block >}}

### Datadog Plugin がサーバーにペイロードを書き込めない

**Jenkins Log** に以下のエラーメッセージが表示された場合、プラグインの構成が正しいかどうか確認してください。

{{< code-block lang="text" >}}
Error writing to server
{{< /code-block >}}

1. ホスト名として `localhost` を使用している場合は、代わりにサーバーのホスト名に変更してみてください。
2. Jenkins インスタンスが HTTP プロキシの後ろにある場合、**Manage Jenkins** > **Manage Plugins** > **Advanced tab** に移動して、プロキシ構成が正しいことを確認します。

### Datadog プラグインセクションが Jenkins コンフィギュレーションに表示されない

Datadog プラグインセクションが Jenkins コンフィギュレーションセクションに表示されない場合は、プラグインが有効になっていることを確認してください。手順:

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Manage Plugins** にアクセスします。
2. **Installed** タブで `Datadog Plugin` を検索します。
3. `Enabled` チェックボックスがオンになっていることを確認します。
4. ここでプラグインを有効にする場合は、`/safeRestart` URL パスを使用して Jenkins インスタンスを再起動します。

### CI Visibility オプションが Datadog プラグインセクションに表示されない。

CI Visibility オプションが Datadog プラグインセクションに表示されない場合は、正しいバージョンがインストールされていることを確認して、Jenkins インスタンスを再起動してください。手順:

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Manage Plugins** にアクセスします。
2. **Installed** タブで `Datadog Plugin` を検索します。
3. インストールされているバージョンが正しいことを確認します。
4. `/safeRestart` URL パスを使用して Jenkins インスタンスを再起動します。

### プラグインのトレーサーが、APM Java トレーサーが Jenkins のインスツルメントに使用されているため、初期化に失敗する。

このエラーメッセージが **Jenkins Log** に表示される場合は、Jenkins プラグイン v3.1.0 以降を使用していることを確認してください

{{< code-block lang="text" >}}
Datadog-Plugin Tracer の再初期化に失敗した。Jenkins 起動コマンドで Datadog Java Tracer が javaagent として使用されている場合、プラグインを介したトレース収集を有効にできない。このエラーは、パイプラインの実行には影響しません。
{{< /code-block >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: https://docs.datadoghq.com/ja/agent/cluster_agent/admission_controller/
[3]: https://plugins.jenkins.io/datadog/
[4]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[5]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[6]: /ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/pipeline-executions