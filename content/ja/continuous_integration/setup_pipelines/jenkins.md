---
title: Jenkins パイプラインでトレースを設定する
kind: documentation
further_reading:
  - link: /continuous_integration/explore_pipelines
    tag: ドキュメント
    text: パイプラインの実行結果とパフォーマンスを確認する
  - link: /continuous_integration/troubleshooting/
    tag: ドキュメント
    text: トラブルシューティング CI
---
## 互換性

サポートされている Jenkins バージョン:
* Jenkins >= 2.164.1

## 前提条件

Jenkins コントローラーインスタンスに [Datadog Agent][1] をインストールします。

Jenkins コントローラーと Datadog Agent が Kubernetes クラスターにデプロイされている場合、Datadog は [Admission Controller][2] を使用することをお勧めします。これにより、Jenkins コントローラーポッドの `DD_AGENT_HOST` 環境変数がローカルの Datadog Agent と通信するように自動的に設定されます。

## Datadog Jenkins プラグインをインストール

[Datadog Jenkins プラグイン][2] v3.1.0 以降をインストールおよび有効化します:

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Manage Plugins** にアクセスします。
2. **Available** タブの [Update Center][4] で、`Datadog Plugin` を探します。　
3. プラグインの横にあるチェックボックスを選択肢、画面下にある 2 つのインストールボタンの一方を使用してインストールします。
4. **Installed** タブで `Datadog Plugin` を検索し、プラグインがインストールされたことを確認します。

## プラグインで CI 表示を有効化する

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Configure System** にアクセスします。
2. コンフィギュレーション画面を下にスクロールして、`Datadog Plugin` セクションに移動します。
3. `Datadog Agent` モードを選択します。
4. `Agent` ホストを構成します。
5. `Traces Collection` ポート (デフォルトは `8126`) を構成します。
6. `Enable CI Visibility` チェックボックスをクリックしてアクティブにします。
7. (オプション) CI インスタンス名を構成します。
8. Datadog Agent との接続を確認します。
9. 構成を保存します。
10. CI Visibility が有効になっていることを確認するには、`Jenkins Log` に移動して次を検索します。

{{< code-block lang="text" >}}
Re/Initialize Datadog-Plugin Agent Http Client
TRACE -> http://<HOST>:<TRACE_PORT>/v0.3/traces
{{< /code-block >}}

{{< img src="ci/ci-jenkins-plugin-config.png" alt="Jenkins の Datadog プラグインコンフィギュレーション" style="width:100%;">}}

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

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Configure System** に移動します。
2. コンフィギュレーション画面を下にスクロールして、`Datadog Plugin` セクションに移動します。
3. `Datadog Agent` モードを選択します。
4. 以前に構成されていない場合は、 `Agent` ホストを構成します。
5. 前の手順で構成したように、`Log Collection` ポートを構成します。
6. `Enable Log Collection` チェックボックスをクリックしてアクティブにします。
7. Datadog Agent との接続を確認します。
8. 構成を保存します。

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