---
aliases:
- /ja/synthetics/cicd_integrations/jenkins
description: CI/CD パイプラインで Continuous Testing テストを実行するために、Jenkins インスタンスを構成します。
further_reading:
- link: https://www.datadoghq.com/blog/jenkins-testing/
  tag: GitHub
  text: Jenkins パイプラインで Datadog Synthetic テストを実行する
- link: /continuous_integration/setup_pipelines/jenkins/
  tag: ドキュメント
  text: Jenkins パイプラインでトレースを設定する
title: Jenkins
---

## 概要

Jenkins 環境に Continuous Testing テストを追加します。

Datadog では、既存の Jenkins アーキテクチャーをモデル化し、ビジネス要件に合ったインストールをカスタマイズするソリューションを決定するために、SRE およびインフラストラクチャーチームと話し合うことを推奨しています。

## セットアップ

Jenkins 環境で Docker を使用するには、[Docker と Pipeline の併用][1]をご覧ください。

### 前提条件

* Node.js v10.24.1+
* [Config File Provider][2] を介して Jenkins インスタンスにアップロードされたグローバル JSON コンフィギュレーションファイルです。このファイルは、Synthetics のテストセットアップのグローバルプロパティを定義するために必要です。

環境変数は、グローバルコンフィギュレーションファイル内に直接保存するか、[認証情報を使用する][3]ことができます。テストの構成について詳しくは、[テストの構成][4] を参照してください。

### `@datadog/datadog-ci` パッケージの実行

Jenkins Node.js プラグインを使用して、Jenkins 環境内に Node.js および npm パッケージをインストールし、実行します。

既存の Datadog と Jenkins のインテグレーションについては、[Jenkins パイプラインにトレースを設定する][5]を参照してください。

### Node.js のインストールを追加する

Jenkins のグローバルなコンフィギュレーションパネルに移動し、Node.js のインストールを追加します。

{{< img src="synthetics/cicd_integrations/jenkins/nodejs-installation.png" alt="Jenkins の Node.js インストール" style="width:80%;">}}

Node.js に関連するすべてのインストールに対して、`@datadog/datadog-ci` をグローバルにインストールします。

#### タグ

Jenkins の Declarative パイプラインでタグを使った Continuous Testing テストを実行するには

{{< code-block lang="groovy" disable_copy="false" collapsible="true" >}}
pipeline {
   agent any
   stages {
       stage('Run e2e tests') {
           steps {
               withCredentials([string(credentialsId: 'datadog-api-key', variable: 'DATADOG_API_KEY'), string(credentialsId: 'datadog-app-key', variable: 'DATADOG_APP_KEY')]) {
                   nodejs(nodeJSInstallationName: 'Node 10.24.x') {
                       configFileProvider(
                           [configFile(fileId: 'config-file-id', variable: 'DATADOG_CI_CONFIG')]) {
                           sh 'datadog-ci synthetics run-tests -s "tag:e2e" --config $DATADOG_CI_CONFIG'
                       }
                   }
               }
           }
       }
   }
{{< /code-block >}}

#### カスタムテストファイル

Jenkins の Declarative パイプラインでカスタムテストファイルを使った Continuous Testing テストを実行するには

{{< code-block lang="groovy" disable_copy="false" collapsible="true" >}}
pipeline {
   agent any
   stages {
       stage('Run e2e tests') {
           steps {
               withCredentials([string(credentialsId: 'datadog-api-key', variable: 'DATADOG_API_KEY'), string(credentialsId: 'datadog-app-key', variable: 'DATADOG_APP_KEY')]) {
                   nodejs(nodeJSInstallationName: 'Node 10.24.x') {
                       configFileProvider(
                           [configFile(fileId: 'config-file-id', variable: 'DATADOG_CI_CONFIG'), configFile(fileId: 'test-file-id', variable: 'DATADOG_CI_TEST_FILE')]) {
                           sh 'datadog-ci synthetics run-tests -f $DATADOG_CI_TEST_FILE --config $DATADOG_CI_CONFIG'
                       }
                   }
               }
           }
       }
   }
}
{{< /code-block >}}

以下のような出力が期待できます。

{{< img src="synthetics/cicd_integrations/jenkins/example-test-run.png" alt="Jenkins でのテスト実行例" style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.jenkins.io/doc/book/pipeline/docker/#using-docker-with-pipeline
[2]: https://plugins.jenkins.io/config-file-provider/
[3]: https://www.jenkins.io/doc/book/using/using-credentials/#adding-new-global-credentials
[4]: /ja/continuous_testing/cicd_integrations/configuration#configure-tests
[5]: /ja/continuous_integration/pipelines/jenkins/