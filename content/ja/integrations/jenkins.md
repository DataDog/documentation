---
categories:
  - configuration & deployment
dependencies:
  - 'https://github.com/jenkinsci/datadog-plugin/blob/master/README.md'
description: Jenkins のメトリクス、イベント、サービスチェックを自動転送 to Datadog.
doc_link: 'https://docs.datadoghq.com/integrations/jenkins/'
git_integration_title: jenkins
has_logo: true
integration_title: Jenkins
is_public: true
kind: インテグレーション
name: jenkins
public_title: Datadog-Jenkins インテグレーション
short_description: Jenkins のメトリクス、イベント、サービスを自動転送 checks to Datadog.
---
Jenkins プラグインを使用して、Datadog のアカウントにメトリクス、イベント、サービスチェックを自動転送することができます。

![Jenkins Datadog ダッシュボード ][16]

**注**: プラグインの詳細は [Jenkins CI プラグインについて][1] も併せてご参照ください。

## セットアップ

### インストール

_このプラグインには [Jenkins 2.164.1][2] が必要です。_

_それ以前のバージョン (1.632+) の Jenkins をご使用の場合は、[こちら](https://updates.jenkins.io/download/plugins/datadog/)からプラグインの 1.2.0 バージョンをご利用ください。_

このプラグインはお使いの Jenkins の[アップデートセンター][3] (`Manage Jenkins -> Manage Plugins`) からインストールが可能です。

1. `Available`タブを開いて、`Datadog` を検索し、`Datadog Plugin` の横のチェックボックスを選択してください。
2. 画面下にある 2 つのインストールボタンのいずれかをクリックすると、プラグインがインストールされます。
3. `Installed` タブで `Datadog Plugin` を検索し、プラグインがインストールされたことを確認します。

  以下のコンフィギュレーションを続けます。

**注**: 予期しないバージョンの `Datadog Plugin` が表示されていた場合は、`Manage Jenkins -> Manage Plugins` 画面から `Check Now` を実行してください。

### コンフィギュレーション

プラグインから Datadog へのデータ送信については、以下の 2 つの方法で構成することができます。

* **推奨**: Jenkins と Datadog 間で Forwarder として機能する DogStatsD サーバー / Datadog Agent の使用を推奨します。
  - ビルドログの収集は Datadog Agent が完全にインストールされている場合のみ動作します。
  - 外部ホストから送信されたメトリクスの場合、Datadog Agent は DogStatsD に以下の設定を必要とします：`dogstatsd_non_local_traffic: true`。これは、`datadog.yaml` [コンフィギュレーションファイル][17]を使用して設定できます。
* HTTP 経由で Datadog に直接データを送信します。
  - 現在実装されている HTTP クライアントはタイムアウト間隔 1 分でブロッキングを行います。Datadog との接続で問題が発生すると、Jenkins インスタンスにも遅延が起こる可能性があります。

コンフィギュレーションは[プラグインのユーザーインターフェース](#plugin-user-interface)で [Groovy スクリプト](#groovy-script)または[環境変数](#environment-variables)を使用して実施可能です。

#### プラグインのユーザーインターフェース

Datadog のプラグインを構成するには、お使いの Jenkins の `Manage Jenkins -> Configure System` ページを開いて `Datadog Plugin` セクションまでスクロールダウンします。

##### HTTP 転送{#http-forwarding-plugin}

1. **Use Datadog API URL and Key to report to Datadog** (デフォルトで選択されています) の横のラジオボタンを選択します。
2. Jenkins コンフィギュレーション画面の `API Key` テキストボックスに [Datadog の API キー][4] を貼り付けます。
3. Jenkins コンフィギュレーション画面の `Test Key` ボタンをクリックして、入力した Datadog の API キーをテストします。ボタンは API Key テキストボックスのすぐ下にあります。
4. (オプション) Advanced タブで Jenkins サーバーのホスト名を入力すると、そのサーバーをイベントに含めることができます。
5. (オプション) [Datadog ログインテーク URL][15] を入力し、Advanced タブで "Enable Log Collection" を選択します。
6. 構成を保存します。

##### DogStatsD 転送{#dogstatsd-forwarding-plugin}

1. **Use the Datadog Agent to report to Datadog** の横のラジオボタンを選択します。
2. DogStatsD サーバーの `hostname` と `port` を指定します。
3. (オプション) Advanced タブで Jenkins サーバーのホスト名を入力すると、そのサーバーをイベントに含めることができます。
4. (オプション) ログ収集ポートを入力し、[ログ収集](#log-collection-for-agents) を構成してから Advanced タブで "Enable Log Collection" を選択します。
5. 構成を保存します。

#### Groovy スクリプト

お使いの Datadog プラグインを、以下の Groovy スクリプトを使用して HTTP または DogStatsD 経由でデータ転送するよう構成します。この構成は、[Jenkins の公式 Docker イメージ][5]または `plugins.txt` と Groovy init スクリプトをサポートするデリバティブを利用して Docker コンテナで Jenkins Master を稼働させている場合に有用です。

##### HTTP 転送{#http-forwarding-groovy-script}

```groovy
import jenkins.model.*
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

def j = Jenkins.getInstance()
def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

// Datadog へのレポートに Datadog API URL とキーを使用する場合
d.setReportWith('HTTP')
d.setTargetApiURL('https://api.datadoghq.com/api/')
d.setTargetApiKey('<DATADOG_API_KEY>')

// カスタムを行う場合は以下の詳細セクションを参照
d.setExcluded('job1,job2')

// ログを収集したい場合
d.setLogIntakeUrl('https://http-intake.logs.datadoghq.com/v1/input/')

// 設定を保存
d.save()
```

##### DogStatsD 転送{#dogstatsd-forwarding-groovy-script}

```groovy
import jenkins.model.*
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

def j = Jenkins.getInstance()
def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

d.setReportWith('DSD')
d.setTargetHost('localhost')
d.setTargetPort(8125)

// ログを収集したい場合
d.setTargetLogCollectionPort(8125)

// カスタムを行う場合は以下の詳細セクションを参照
d.setExcluded('job1,job2')

// 設定を保存
d.save()
```

#### 環境変数

お使いの Datadog プラグインを、使用するレポートのメカニズムを指定する環境変数 `DATADOG_JENKINS_PLUGIN_REPORT_WITH` を用いて構成します。

##### HTTP 転送{#http-forwarding-env}

1. `DATADOG_JENKINS_PLUGIN_REPORT_WITH` 変数を `HTTP` に設定します。
2. Datadog の API エンドポイントを指定する `DATADOG_JENKINS_PLUGIN_TARGET_API_URL` 変数を設定します (デフォルト値は `https://api.datadoghq.com/api/`) 。
3. [Datadog の API キー][4]を指定する `DATADOG_JENKINS_PLUGIN_TARGET_API_KEY` 変数を設定します。
4. (オプション) Datadog のログインテーク URL を指定する `DATADOG_JENKINS_PLUGIN_TARGET_LOG_INTAKE_URL` 変数を設定します (デフォルト値は `https://http-intake.logs.datadoghq.com/v1/input/`) 。

##### DogStatsD 転送{#dogstatsd-forwarding-env}

1. `DATADOG_JENKINS_PLUGIN_REPORT_WITH` 変数を `DSD` に設定します。
2. DogStatsD のサーバーホストを指定する `DATADOG_JENKINS_PLUGIN_TARGET_HOST` 変数を設定します (デフォルト値は `localhost`) 。
3. DogStatsD のサーバーポートを指定する `DATADOG_JENKINS_PLUGIN_TARGET_PORT` 変数を設定します (デフォルト値は `8125`)。
4. (オプション) Datadog Agent のログ収集用ポートを指定する `DATADOG_JENKINS_PLUGIN_TARGET_LOG_COLLECTION_PORT` を設定します。

#### ロギング

ロギングには [Jenkins と相性の良い][6] `java.util.Logger` を利用します。ログの取得設定は [Jenkins のロギング文書][6]に記載の手順に従ってください。ロガーの追加画面では、 `org.datadog.jenkins.plugins.datadog.` で始まるすべての Datadog プラグイン関数と、それに紐付く関数名が自動入力されます。本記事の執筆時点で、利用可能な関数は `org.datadog.jenkins.plugins.datadog.listeners.DatadogBuildListener` のみとなります。

## 内容

### パイプラインのカスタマイズ

Datadog プラグインにより "datadog" のステップが追加され、パイプラインベースのジョブに対するコンフィギュレーションオプションが提供されます。
宣言型パイプラインでは、トップレベルのオプションブロックにステップを追加します。

```groovy
pipeline {
    agent any
    options {
        datadog(collectLogs: true, tags: ["foo:bar", "bar:baz"])
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

スクリプト化されたパイプラインでは、関連セクションを Datadog ステップでラップします。

```groovy
datadog(collectLogs: true, tags: ["foo:bar", "bar:baz"]){
  node {
    stage('Example') {
      echo "Hello world."
    }
  }
}
```

### グローバルカスタマイズ

グローバルコンフィギュレーションをカスタマイズするには、Jenkins で `Manage Jenkins -> Configure System` に移動し、**Advanced** ボタンをクリックします。次のオプションを使用できます。

| 内容              | 説明                                                                                                                                                                                                                                 | 環境変数                          |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| 除外されるジョブ           | 監視対象から除外したいジョブ名を指定する正規表現を記載したカンマ区切りリストです。例: `susans-job,johns-.*,prod_folder/prod_release`                                                                                                      | `DATADOG_JENKINS_PLUGIN_EXCLUDED`            |
| 含まれるジョブ           | 監視対象に含めたいジョブ名を指定する正規表現を記載したカンマ区切りリストです。例: `susans-job,johns-.*,prod_folder/prod_release`                                                                                                          | `DATADOG_JENKINS_PLUGIN_INCLUDED`            |
| グローバルタグファイル            | タグのカンマ区切りリストを含むワークスペースファイルへのパスです (パイプラインのジョブとは互換不能) 。                                                                                                                                   | `DATADOG_JENKINS_PLUGIN_GLOBAL_TAG_FILE`      |
| グローバルタグ                | すべてのメトリクス、イベント、サービスチェックを適用するためのカンマ区切りのリストです。タグにはマスターの jenkins インスタンスで定義される環境変数を含めることができます。　                                                                                                                                                          | `DATADOG_JENKINS_PLUGIN_GLOBAL_TAGS`          |
| グローバルジョブタグ            | ジョブとそのジョブに適用するタグのリストを照合するための正規表現を記載したカンマ区切りリストです。タグにはマスターの jenkins インスタンスで定義される環境変数を含めることができます。**注**: タグで `$` 記号を用いて正規表現に一致したグループを参照することができます。例: `(.*?)_job_(*?)_release, owner:$1, release_env:$2, optional:Tag3` | `DATADOG_JENKINS_PLUGIN_GLOBAL_JOB_TAGS`      |
| セキュリティ監査イベントの送信 | イベントおよびメトリクスの `Security Events Type` を送信します (デフォルトで有効) 。                                                                                                                                                                | `DATADOG_JENKINS_PLUGIN_EMIT_SECURITY_EVENTS` |
| システムイベントの送信         | イベントおよびメトリクスの `System Events Type` を送信します (デフォルトで有効) 。                                                                                                                                                                  | `DATADOG_JENKINS_PLUGIN_EMIT_SYSTEM_EVENTS`   |
| ログ収集の有効化      | ビルドログを収集および送信します (デフォルトで無効) 。                                                                                                                                                                  | `DATADOG_JENKINS_PLUGIN_COLLECT_BUILD_LOGS`   |

### ジョブのカスタマイズ

各ジョブのコンフィギュレーションページでは、次のようなカスタマイズが可能です。

| 内容                         | 説明                                                                                                                                                                                           |
|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| カスタムタグ                           | ジョブワークスペースの `File` から設定 (パイプラインのジョブではサポートされていません) するか、コンフィギュレーションページのテキスト `Properties` から直接設定します。設定が完了すると、この内容で `Global Job Tags` が上書きされます。 |
| ソース管理のイベントを送信 | イベントおよびメトリクスの `Source Control Management Events Type` を送信します (デフォルトで有効) 。                                                                                                         |

## 収集データ

このプラグインは以下の[イベント](#events)、[メトリクス](#metrics)、[サービスチェック](#service-checks)を収集します。

### イベント

#### デフォルトのイベントタイプ

| イベント名      | トリガー              | デフォルトのタグ                                                              | 関連するレートメトリクス  |
|-----------------|---------------------------|---------------------------------------------------------------------------|-------------------------|
| ビルド開始   | `RunListener#onStarted`   | `branch`, `event_type`, `jenkins_url`, `job`, `node`, `user_id`           | `jenkins.job.started`   |
| ビルド中止   | `RunListener#onDeleted`   | `branch`, `event_type`, `jenkins_url`, `job`, `node`, `user_id`           | `jenkins.job.aborted`   |
| ビルド完了 | `RunListener#onCompleted` | `branch`, `event_type`, `jenkins_url`, `job`, `node`, `result`, `user_id` | `jenkins.job.completed` |
| SCM チェックアウト    | `SCMListener#onCheckout`  | `branch`, `event_type`, `jenkins_url`, `job`, `node`, `user_id`           | `jenkins.scm.checkout`  |

注: `event_type` は上記のイベントとメトリクスに対して常に `default` に設定されます。

#### システムイベントタイプ

| イベント名                   | トリガー                            | デフォルトのタグ                                                            | 関連するレートメトリクス                 |
|------------------------------|-----------------------------------------|-------------------------------------------------------------------------|----------------------------------------|
| コンピューターのオンライン              | `ComputerListener#onOnline`             | `event_type`, `jenkins_url`, `node_hostname`, `node_name`, `node_label` | `jenkins.computer.online`              |
| コンピューターのオフライン             | `ComputerListener#onOffline`            | `event_type`, `jenkins_url`, `node_hostname`, `node_name`, `node_label` | `jenkins.computer.offline`             |
| コンピューターの一時オンライン   | `ComputerListener#onTemporarilyOnline`  | `event_type`, `jenkins_url`, `node_hostname`, `node_name`, `node_label` | `jenkins.computer.temporarily_online`  |
| コンピューターの一時オフライン  | `ComputerListener#onTemporarilyOffline` | `event_type`, `jenkins_url`, `node_hostname`, `node_name`, `node_label` | `jenkins.computer.temporarily_offline` |
| コンピューターの起動失敗       | `ComputerListener#onLaunchFailure`      | `event_type`, `jenkins_url`, `node_hostname`, `node_name`, `node_label` | `jenkins.computer.launch_failure`      |
| アイテムの作成                 | `ItemListener#onCreated`                | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.item.created`                 |
| アイテムの削除                 | `ItemListener#onDeleted`                | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.item.deleted`                 |
| アイテムの更新                 | `ItemListener#onUpdated`                | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.item.updated`                 |
| アイテムのコピー                  | `ItemListener#onCopied`                 | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.item.copied`                  |
| アイテムの場所変更        | `ItemListener#onLocationChanged`        | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.item.location_changed`        |
| 構成の変更               | `SaveableListener#onChange`             | `event_type`, `jenkins_url`, `user_id`                                  | `jenkins.config.changed`               |

注: `event_type` は上記のイベントとメトリクスに対して常に `system` に設定されます。

#### セキュリティイベントタイプ

| イベント名                  | トリガー                            | デフォルトのタグ                                     | 関連するレートメトリクス       |
|-----------------------------|-----------------------------------------|--------------------------------------------------|------------------------------|
| ユーザー認証成功          | `SecurityListener#authenticated`        | `event_type`, `jenkins_url`, `user_id`           | `jenkins.user.authenticated` |
| ユーザー認証失敗 | `SecurityListener#failedToAuthenticate` | `event_type`, `jenkins_url`, `user_id`           | `jenkins.user.access_denied` |
| ユーザーのログアウト              | `SecurityListener#loggedOut`            | `event_type`, `jenkins_url`, `user_id`           | `jenkins.user.logout`        |

注: `event_type` は上記のイベントとメトリクスに対して常に `security` に設定されます。

### メトリクス

| メトリクス名                            | 説明                                                    | デフォルトのタグ                                                               |
|----------------------------------------|----------------------------------------------------------------|----------------------------------------------------------------------------|
| `jenkins.computer.launch_failure`      | コンピューターの起動失敗レート                              | `jenkins_url`                                                              |
| `jenkins.computer.offline`             | コンピューターのオフラインレート                                | `jenkins_url`                                                              |
| `jenkins.computer.online`              | コンピューターのオンラインレート                                 | `jenkins_url`                                                              |
| `jenkins.computer.temporarily_offline` | コンピューターの一時的なオフラインレート                    | `jenkins_url`                                                              |
| `jenkins.computer.temporarily_online`  | コンピューターの一時的なオンラインレート                     | `jenkins_url`                                                              |
| `jenkins.config.changed`               | 変更された構成レート                                 | `jenkins_url`, `user_id`                                                   |
| `jenkins.executor.count`               | エグゼキューター総数                                                | `jenkins_url`, `node_hostname`, `node_name`, `node_label`                  |
| `jenkins.executor.free`                | 使用されていないエグゼキューター数                                     | `jenkins_url`, `node_hostname`, `node_name`, `node_label`                  |
| `jenkins.executor.in_use`              | アイドル状態のエグゼキューター数                                       | `jenkins_url`, `node_hostname`, `node_name`, `node_label`                  |
| `jenkins.item.copied`                  | アイテムのコピーレート                                    | `jenkins_url`, `user_id`                                                   |
| `jenkins.item.created`                 | アイテムの作成レート                                   | `jenkins_url`, `user_id`                                                   |
| `jenkins.item.deleted`                 | アイテムの削除レート                                   | `jenkins_url`, `user_id`                                                   |
| `jenkins.item.location_changed`        | アイテムの移動レート                                     | `jenkins_url`, `user_id`                                                   |
| `jenkins.item.updated`                 | アイテムの更新レート                                   | `jenkins_url`, `user_id`                                                   |
| `jenkins.job.aborted`                  | ジョブの中止レート                                          | `branch`, `jenkins_url`, `job`, `node`, `user_id`                          |
| `jenkins.job.build_duration`           | 一時停止なしのビルドの所要時間 (秒単位)。                     | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.completed`                | ジョブの完了レート                                        | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.cycletime`                | ビルドのサイクル時間                                              | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.duration`                 | ビルドの所要時間 (秒単位)                                    | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.feedbacktime`             | コードのコミットからジョブの失敗までのフィードバック時間                 | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.leadtime`                 | ビルドのリードタイム                                               | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.mtbf`                     | MTBF: 最後に成功したジョブから現在失敗したジョブまでの時間 | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.mttr`                     | MTTR: 最後に失敗したジョブから現在成功したジョブまでの時間 | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.pause_duration`            | ビルドジョブの一時停止期間 (秒単位)。                     | `branch`, `jenkins_url`, `job`, `node`, `result`, `user_id`                |
| `jenkins.job.started`                  | ジョブの開始レート                                          | `branch`, `jenkins_url`, `job`, `node`, `user_id`                          |
| `jenkins.job.stage_duration`           | 個々のステージの期間。                                 | `jenkins_url`、`job`、`user_id`、`stage_name`、`stage_depth`、`stage_parent`、`result` |
| `jenkins.job.stage_pause_duration`     | 個々のステージの一時停止期間（ミリ秒）。         | `jenkins_url`、`job`、`user_id`、`stage_name`、`stage_depth`、`stage_parent`、`result` |
| `jenkins.job.stage_completed`          | ステージの完了レート                                      | `jenkins_url`、`job`、`user_id`、`stage_name`、`stage_depth`、`stage_parent`、`result` |
| `jenkins.job.waiting`                  | ジョブ実行までの待ち時間 (ミリ秒単位)            | `branch`, `jenkins_url`, `job`, `node`, `user_id`                          |
| `jenkins.node.count`                   | ノード総数                                          | `jenkins_url`                                                              |
| `jenkins.node.offline`                 | オフラインのノード数                                           | `jenkins_url`                                                              |
| `jenkins.node.online`                  | オンラインのノード数                                            | `jenkins_url`                                                              |
| `jenkins.node_status.count`            | このノードが存在する場合。                                       | `jenkins_url`, `node_hostname`, `node_name`, `node_label`                  |
| `jenkins.node_status.up`               | 特定のノードがオンラインの場合、値は 1。それ以外の場合は 0。              | `jenkins_url`, `node_hostname`, `node_name`, `node_label`                  |
| `jenkins.plugin.count`                 | プラグイン総数                                                 | `jenkins_url`                                                              |
| `jenkins.plugin.active`                | プラグインは有効です。                                                | `jenkins_url`                                                              |
| `jenkins.plugin.failed`                | プラグインに失敗しました。                                                | `jenkins_url`                                                              |
| `jenkins.plugin.inactivate`            | プラグインは無効です。                                              | `jenkins_url`                                                              |
| `jenkins.plugin.withUpdate`            | プラグインに更新があります。                                           | `jenkins_url`                                                              |
| `jenkins.project.count`                | プロジェクト総数                                                 | `jenkins_url`                                                              |
| `jenkins.queue.size`                   | キューサイズ                                                    | `jenkins_url`                                                              |
| `jenkins.queue.buildable`              | キュー内のビルド可能なアイテム数                             | `jenkins_url`                                                              |
| `jenkins.queue.pending`                | キュー内の保留アイテム数                               | `jenkins_url`                                                              |
| `jenkins.queue.stuck`                  | キュー内の立ち往生 (スタック) アイテム数                                 | `jenkins_url`                                                              |
| `jenkins.queue.blocked`                | キュー内のブロックされたアイテム数                               | `jenkins_url`                                                              |
| `jenkins.queue.job.in_queue`                   | ジョブがキューに入れられた回数。                                                     | `jenkins_url`、`job_name`                                               |
| `jenkins.queue.job.buildable`              | ジョブがキューでビルド可能になった回数。                             | `jenkins_url`、`job_name`                                               |
| `jenkins.queue.job.pending`                | ジョブがキューで保留された回数。                             | `jenkins_url`、`job_name`                                               |
| `jenkins.queue.job.stuck`                  | ジョブがキューでスタックした回数。                                  | `jenkins_url`、`job_name`                                               |
| `jenkins.queue.job.blocked`                | ジョブがキューでブロックされた回数。                           | `jenkins_url`、`job_name`                                               |
| `jenkins.scm.checkout`                 | SCM チェックアウトのレート                                         | `branch`, `jenkins_url`, `job`, `node`, `user_id`                          |
| `jenkins.user.access_denied`           | 認証に失敗したユーザーレート                         | `jenkins_url`, `user_id`                                                   |
| `jenkins.user.authenticated`           | 認証したユーザーレート                                  | `jenkins_url`, `user_id`                                                   |
| `jenkins.user.logout`                  | ログアウトしたユーザーレート                                     | `jenkins_url`, `user_id`                                                   |

#### Agent のログ収集

**注**: このコンフィギュレーションは、[Datadog Agent コンフィギュレーション](#dogstatsd-forwarding-plugin)を使用するものにのみ適用されます。

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Jenkins ログを収集するには、次のように `conf.d/jenkins.d` 内に `conf.yaml` を作成して、Agent の[カスタムログソースファイル][13]を作成します。

    ```yaml
    logs:
      - type: tcp
        port: <PORT>
        service: <SERVICE>
        source: jenkins
    ```

3. Jenkins で、上記で指定したポートを `Log Collection Port` として送信します。これは、[環境変数](#dogstatsd-forwarding-env)、[groovy スクリプト](#dogstatsd-forwarding-groovy-script)、または [Jenkins UI](#dogstatsd-forwarding-plugin) を使用して設定できます。

4. [Agent を再起動します][14]。

### サービスチェック

ビルドステータス `jenkins.job.status` にデフォルトタグを適用:  `jenkins_url、`job`、`node`、`user_id`

## 問題の追跡

このプラグイン [jenkinsci/datadog-plugin/issues][7]に関する問題はすべて、GitHub に搭載の問題追跡システムを使用して追跡を行います。 
しかし、Jenkins プラグインのホスティング状況に応じて、JIRA に課題が作成される場合があります。関連する課題の投稿については、 [Jenkins の課題ページ][8]をご参照ください。

**注**: [Datadog に関連する JIRA の課題で未解決のものが存在します][9]。

## 変更

[CHANGELOG.md][10] をご参照ください。

## コードへのコントリビューション

開発に対するアイデアを共有いただけることに、まずは深く**感謝**を申し上げます。

課題やプルリクエストの送信前に、[ドキュメント寄稿ガイドライン][11]をお読みください。
[開発用ドキュメント][12]でも、ローカル開発環境の準備などに関するヒントをご紹介しています。

[1]: https://plugins.jenkins.io/datadog
[2]: http://updates.jenkins-ci.org/download/war/1.632/jenkins.war
[3]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://github.com/jenkinsci/docker
[6]: https://wiki.jenkins-ci.org/display/JENKINS/Logging
[7]: https://github.com/jenkinsci/datadog-plugin/issues
[8]: https://issues.jenkins-ci.org/issues/?jql=project%20%3D%20JENKINS%20AND%20status%20in%20%28Open%2C%20%22In%20Progress%22%2C%20Reopened%29%20AND%20component%20%3D%20datadog-plugin%20ORDER%20BY%20updated%20DESC%2C%20priority%20DESC%2C%20created%20ASC
[9]: https://issues.jenkins-ci.org/browse/INFRA-305?jql=status%20in%20%28Open%2C%20%22In%20Progress%22%2C%20Reopened%2C%20Verified%2C%20Untriaged%2C%20%22Fix%20Prepared%22%29%20AND%20text%20~%20%22datadog%22
[10]: https://github.com/jenkinsci/datadog-plugin/blob/master/CHANGELOG.md
[11]: https://github.com/jenkinsci/datadog-plugin/blob/master/CONTRIBUTING.md
[12]: https://github.com/jenkinsci/datadog-plugin/blob/master/DEVELOPMENT.md
[13]: https://docs.datadoghq.com/ja/agent/logs/?tab=tcpudp#custom-log-collection
[14]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[15]: https://docs.datadoghq.com/ja/logs/log_collection/?tab=http
[16]: https://raw.githubusercontent.com/jenkinsci/datadog-plugin/master/images/dashboard.png
[17]: https://docs.datadoghq.com/ja/developers/dogstatsd/?tab=containeragent#