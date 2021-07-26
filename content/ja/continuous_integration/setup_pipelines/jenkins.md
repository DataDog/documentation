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
## 前提条件

Jenkins コントローラーインスタンスに [Datadog Agent][1] をインストールします。

## Datadog Jenkins プラグインをインストール

[Datadog Jenkins プラグイン][2] v2.1.1 以降をインストールおよび有効化します:

1. Jenkins インスタンスの Web インターフェースで、**Manage Jenkins > Manage Plugins** にアクセスします。
2. **Available** タブの [Update Center][3] で、`Datadog Plugin` を探します。　
3. プラグインの横にあるチェックボックスを選択肢、画面下にある 2 つのインストールボタンの一方を使用してインストールします。
4. プラグインを構成するには、**Manage Jenkins > Configure System** ページに移動し、Datadog Plugin セクションを見つけます。
5. Datadog セクションで `Datadog Agent` モードを選択します。
6. Jenkins を再起動してプラグインを有効にします。

コンフィギュレーションが正しければ、再起動後の Jenkins ログに次のような行が表示されます:

{{< code-block lang="text" >}}
INFO    datadog.trace.core.CoreTracer#<init>: New instance: DDTracer-62fcf62{ ... }
INFO    datadog.trace.core.StatusLogger#logStatus: DATADOG TRACER CONFIGURATION { ... }
{{< /code-block >}}

**注**: Jenkins 起動時に Java APM トレーサーを Java Agent として実行しながら、Jenkins プラグインを使用してトレースのコレクションを有効化することはできません。


## プラグインで CI 表示を有効化する

ベータ版では CI 表示を有効化する UI が非表示になっているため、次のステップに従って手動で構成を行う必要があります:

1. ファイルを開きます: `$JENKINS_HOME\org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration.xml`

2. 次の行を追加または変更します:

{{< code-block lang="xml" >}}
<reportWith>DSD</reportWith>
<targetHost>localhost</targetHost>
<targetPort>8125</targetPort>
<targetTraceCollectionPort>8126</targetTraceCollectionPort>
<traceServiceName>jenkins</traceServiceName>
<collectBuildTraces>true</collectBuildTraces>
{{< /code-block >}}

3. Jenkins を再起動して変更を有効にします。

コンフィギュレーションが正しければ、再起動後の Jenkins ログに次のような行が表示されます:

{{< code-block lang="text" >}}
INFO    datadog.trace.core.CoreTracer#<init>: New instance: DDTracer-62fcf62{ ... }
INFO    datadog.trace.core.StatusLogger#logStatus: DATADOG TRACER CONFIGURATION { ... }
{{< /code-block >}}


## Agent でジョブのログ収集を有効化する

Agent でのログ収集を有効にします:

1. Agent のコンフィギュレーションファイル `datadog.yaml` に `logs_enabled: true` を追加するか、`DD_LOGS_ENABLED=true` 環境変数を設定します。　 

2. `/etc/datadog-agent/conf.d/jenkins.d/conf.yaml` (Linux の場合は[こちらをクリックしてその他の OS を開いてください][4]) に、次の内容でファイルを作成します。`service` がこの前に提供された `traceServiceName` と一致していることを確認してください:

{{< code-block lang="yaml" >}}
logs:
  - type: tcp
    port: 10518
    service: my-jenkins-instance
    source: jenkins
{{< /code-block >}}

3. [Agent を再起動][5]して変更を有効にします。

この設定で、Agent はログをポート `10518` でリッスンします。

## プラグインでジョブのログ収集を有効化する

Agent にジョブのログを送信するよう Jenkins プラグインを構成します:

1. ファイルを開きます: `$JENKINS_HOME\org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration.xml`

2.  次の行を追加または変更します:

{{< code-block lang="xml" >}}
<targetLogCollectionPort>10518</targetLogCollectionPort>
<collectBuildLogs>true</collectBuildLogs>
{{< /code-block >}}

3. Jenkins を再起動して変更を有効にします。

**注**:  Jenkins web GUI を使用してログ収集を有効化しないでください。GUI で設定を保存する際にトレースのコレクションが無効となる可能性があります。


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

1. ファイル `$JENKINS_HOME\org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration.xml` を開きます。
2. 次の行を追加または変更します:

    {{< code-block lang="xml" >}}
    <globalTags>global_tag:global_value,global_tag2:${SOME_ENVVAR},${OTHER_ENVVAR}:global_tagvalue</globalTags>
    <globalJobTags>(.*?)_job_(*?)_release:someValue</globalJobTags>
    {{< /code-block >}}

    **グローバルタグ** (`globalTags`): すべてのメトリクス、トレース、イベント、およびサービスチェックに適用するタグのカンマ区切りリスト。タグには、Jenkins コントローラーインスタンスで定義されている環境変数を含めることができます。

    **グローバルジョブタグ** (`globalJobTags`): ジョブに一致する正規表現と、そのジョブに適用するタグのカンマ区切りリストです。タグには、Jenkins コントローラーインスタンスで定義されている環境変数を含めることができます。タグは、`{TX-PL-LABEL}#x60; シンボルを使用して、正規表現のマッチグループを参照することができます。

3. Jenkins を再起動して変更を有効にします。

**注**:  Jenkins GUI を使用してグローバルタグを構成しないでください。GUI で設定を保存する際にトレースのコレクションが無効となる可能性があります。

## Datadog でパイプラインデータを視覚化する

インテグレーションが正常に構成されたら、パイプラインが終了した後、[Pipelines][6] ページと [Pipeline Executions][7] ページの両方にデータの入力が開始されます。

**注**: Pipelines ページには、各リポジトリのデフォルトブランチのデータのみが表示されます。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/
[2]: https://plugins.jenkins.io/datadog/
[3]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[4]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[5]: /ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: https://app.datadoghq.com/ci/pipelines
[7]: https://app.datadoghq.com/ci/pipeline-executions