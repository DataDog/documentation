---
categories:
- configuration & deployment
dependencies:
- https://github.com/jenkinsci/datadog-plugin/blob/master/README.md
description: Jenkins のメトリクス、イベント、サービスチェックを自動転送
  to Datadog.
doc_link: https://docs.datadoghq.com/integrations/jenkins/
git_integration_title: jenkins
has_logo: true
integration_title: Jenkins
is_public: true
kind: インテグレーション
name: jenkins
public_title: Datadog-Jenkins インテグレーション
short_description: Jenkins のメトリクス、イベント、サービスを自動転送
  checks to Datadog.
---


Jenkins プラグインを使用して、Datadog のアカウントにメトリクス、イベント、サービスチェックを自動転送することができます。

**注**: プラグインの詳細は [Jenkins CI プラグインについて][1] も併せてご参照ください。

## セットアップ

### インストール

_このプラグインは [Jenkins 1.580.1][2] 以上のバージョンで動作します。_

このプラグインはお使いの Jenkins の[アップデートセンター][3] (`Manage Jenkins -> Manage Plugins`) からインストールが可能です。

1. `Available`タブを開いて、`Datadog` を検索し、`Datadog Plugin` の横のチェックボックスを選択してください。
2. 画面下にある 2 つのインストールボタンのいずれかをクリックすると、プラグインがインストールされます。
3. `Installed` タブで `Datadog Plugin` を検索し、プラグインがインストールされたことを確認します。インストールに問題がなければ、以下に従ってコンフィギュレーションを行ってください。

**注**: 予期しないバージョンの `Datadog Plugin` が表示されていた場合は、`Manage Jenkins -> Manage Plugins` 画面から `Check Now` を実行してください。

### コンフィギュレーション

プラグインから Datadog へのデータ送信については、以下の 2 つの方法で構成することができます。

* HTTP 経由で Datadog に直接データを送信する。
* Jenkins と Datadog 間で、DogStatsD サーバーを Forwarder として使用する。

コンフィギュレーションは[プラグインのユーザーインターフェース](#plugin-user-interface)で [Groovy スクリプト](#groovy-script)または[環境変数](#environment-variables)を使用して実施可能です。

#### プラグインのユーザーインターフェース

Datadog のプラグインを構成するには、お使いの Jenkins の `Manage Jenkins -> Configure System` ページを開いて `Datadog Plugin` セクションまでスクロールダウンします。

##### HTTP 転送{#http-forwarding-plugin}

1. **Use Datadog API URL and Key to report to Datadog** (デフォルトで選択されています) の横のラジオボタンを選択します。
2. Jenkins コンフィギュレーション画面の `API Key` テキストボックスに [Datadog の API キー][4] を入力します。
3. Jenkins コンフィギュレーション画面の `Test Key` ボタンをクリックして、入力した Datadog の API キーをテストします。ボタンは API Key テキストボックスのすぐ下にあります。
4. 構成を保存します。

##### DogStatsD 転送{#dogstatsd-forwarding-plugin}

1. **Use a DogStatsD Server to report to Datadog** の横のラジオボタンを選択します。
2. DogStatsD サーバーの `hostname` と `port` を指定します。
3. 構成を保存します。

#### Groovy スクリプト

お使いの Datadog プラグインを、以下の Groovy スクリプトを使用して HTTP または DogStatsD 経由でデータ転送するよう構成します。この構成は、[Jenkins の公式 Docker イメージ][5]または `plugins.txt` と Groovy init スクリプトをサポートするデリバティブを利用して Docker コンテナで Jenkins Master を稼働させている場合に有用です。

##### HTTP 転送{#http-forwarding-groovy-script}

```groovy
import jenkins.model.*
import org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration

def j = Jenkins.getInstance()
def d = j.getDescriptor("org.datadog.jenkins.plugins.datadog.DatadogGlobalConfiguration")

// If you want to use Datadog API URL and Key to report to Datadog
d.setReportWith('HTTP')
d.setTargetApiURL('https://api.datadoghq.com/api/')
d.setTargetApiKey('<DATADOG_API_KEY>')

// Customization, see dedicated section below
d.setBlacklist('job1,job2')

// Save config
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

// Customization, see dedicated section below
d.setBlacklist('job1,job2')

// Save config
d.save()
```

#### 環境変数

お使いの Datadog プラグインを、使用するレポートのメカニズムを指定する環境変数 `DATADOG_JENKINS_PLUGIN_REPORT_WITH` を用いて構成します。

##### HTTP 転送{#http-forwarding-env}

1. `DATADOG_JENKINS_PLUGIN_REPORT_WITH` 変数を `HTTP` に設定します。
2. Datadog の API エンドポイントを指定する `DATADOG_JENKINS_PLUGIN_TARGET_API_URL` 変数を設定します (デフォルト値は `https://api.datadoghq.com/api/`) 。
3. [Datadog の API キー][4]を指定する `DATADOG_JENKINS_PLUGIN_TARGET_API_KEY` 変数を設定します。

##### DogStatsD 転送{#dogstatsd-forwarding-env}

1. `DATADOG_JENKINS_PLUGIN_REPORT_WITH` 変数を `DSD` に設定します。
2. DogStatsD のサーバーホストを指定する `DATADOG_JENKINS_PLUGIN_TARGET_HOST` 変数を設定します (デフォルト値は `localhost`) 。
3. DogStatsD のサーバーポートを指定する `DATADOG_JENKINS_PLUGIN_TARGET_PORT` 変数を設定します (デフォルト値は `8125`)。

#### ロギング

ロギングには [Jenkins と相性の良い][6] `java.util.Logger` を利用します。ログの取得設定は [Jenkins のロギング文書][6]に記載の手順に従ってください。ロガーの追加画面では、 `org.datadog.jenkins.plugins.datadog.` で始まるすべての Datadog プラグイン関数と、それに紐付く関数名が自動入力されます。本記事の執筆時点で、利用可能な関数は `org.datadog.jenkins.plugins.datadog.listeners.DatadogBuildListener` のみとなります。

## カスタマイズ

### グローバルカスタマイズ

グローバルコンフィギュレーションページの `Manage Jenkins -> Configure System` から、以下の項目をカスタマイズすることができます。

| 内容              | 説明                                                                                                                                                                                                                                 | 環境変数                          |
|----------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------|
| ブラックリスト済みのジョブ           | 監視対象から除外したいジョブ名を指定する正規表現を記載したカンマ区切りリストです。例: `susans-job,johns-.*,prod_folder/prod_release`                                                                                                      | `DATADOG_JENKINS_PLUGIN_BLACKLIST`            |
| ホワイトリスト済みのジョブ           | 監視対象に含めたいジョブ名を指定する正規表現を記載したカンマ区切りリストです。例: `susans-job,johns-.*,prod_folder/prod_release`                                                                                                          | `DATADOG_JENKINS_PLUGIN_WHITELIST`            |
| グローバルタグファイル            | タグのカンマ区切りリストを含むワークスペースファイルへのパスです (パイプラインのジョブとは互換不能) 。                                                                                                                                   | `DATADOG_JENKINS_PLUGIN_GLOBAL_TAG_FILE`      |
| グローバルタグ                | すべてのメトリクス、イベント、サービスチェックを適用するためのカンマ区切りリストです。                                                                                                                                                         | `DATADOG_JENKINS_PLUGIN_GLOBAL_TAGS`          |
| グローバルジョブタグ            | ジョブとそのジョブに適用するタグのリストを照合するための正規表現を記載したカンマ区切りリストです。**注**: タグで `$` 記号を用いて正規表現に一致したグループを参照することができます。例: `(.*?)_job_(*?)_release, owner:$1, release_env:$2, optional:Tag3` | `DATADOG_JENKINS_PLUGIN_GLOBAL_JOB_TAGS`      |
| セキュリティ監査イベントの送信 | イベントおよびメトリクスの `Security Events Type` を送信します (デフォルトで有効) 。                                                                                                                                                                | `DATADOG_JENKINS_PLUGIN_EMIT_SECURITY_EVENTS` |
| システムイベントの送信         | イベントおよびメトリクスの `System Events Type` を送信します (デフォルトで有効) 。                                                                                                                                                                  | `DATADOG_JENKINS_PLUGIN_EMIT_SYSTEM_EVENTS`   |

### ジョブのカスタマイズ

各ジョブのコンフィギュレーションページでは、次のようなカスタマイズが可能です。

| カスタマイズ                         | 説明                                                                                                                                                                                           |
|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| カスタムタグ                           | ジョブワークスペースの `File` から設定 (パイプラインのジョブではサポートされていません) するか、コンフィギュレーションページのテキスト `Properties` から直接設定します。設定が完了すると、この内容で `Global Job Tags` が上書きされます。 |
| ソース管理のイベントを送信 | イベントおよびメトリクスの `Source Control Management Events Type` を送信します (デフォルトで有効) 。                                                                                                         |

## 収集データ

このプラグインは以下の[イベント](#events)、[メトリクス](#metrics)、[サービスチェック](#service-checks)を収集します。

### イベント

#### デフォルトのイベントタイプ

| イベント名      | トリガー              | デフォルトのタグ                                                               | 関連するレートメトリクス  |
|-----------------|---------------------------|----------------------------------------------------------------------------|-------------------------|
| ビルド開始   | `RunListener#onStarted`   | `job`, `node`, `branch`                                                    | `jenkins.job.started`   |
| ビルド中止   | `RunListener#onDeleted`   | `job`, `node`, `branch`                                                    | `jenkins.job.aborted`   |
| ビルド完了 | `RunListener#onCompleted` | `job`, `node`, `branch`, `result` (Git ブランチ、SVN 修正、CVS ブランチ) | `jenkins.job.completed` |

#### ソース管理イベントタイプ

| イベント名   | トリガー             | デフォルトのタグ            | 関連するレートメトリクス |
|--------------|--------------------------|-------------------------|------------------------|
| SCM チェックアウト | `SCMListener#onCheckout` | `job`, `node`, `branch` | `jenkins.scm.checkout` |

#### システムイベントタイプ

| イベント名                   | トリガー                            | 関連するレートメトリクス                 |
|------------------------------|-----------------------------------------|----------------------------------------|
| コンピューターのオンライン              | `ComputerListener#onOnline`             | `jenkins.computer.online`              |
| コンピューターのオフライン             | `ComputerListener#onOffline`            | `jenkins.computer.online`              |
| コンピューターの一時オンライン   | `ComputerListener#onTemporarilyOnline`  | `jenkins.computer.temporarily_online`  |
| コンピューターの一時オフライン  | `ComputerListener#onTemporarilyOffline` | `jenkins.computer.temporarily_offline` |
| コンピューターの起動失敗       | `ComputerListener#onLaunchFailure`      | `jenkins.computer.launch_failure`      |
| アイテムの作成                 | `ItemListener#onCreated`                | `jenkins.item.created`                 |
| アイテムの削除                 | `ItemListener#onDeleted`                | `jenkins.item.deleted`                 |
| アイテムの更新                 | `ItemListener#onUpdated`                | `jenkins.item.updated`                 |
| アイテムのコピー                  | `ItemListener#onCopied`                 | `jenkins.item.copied`                  |
| ItemListener のロケーション変更 | `ItemListener#onLocationChanged`        | `jenkins.item.location_changed`        |
| 構成の変更               | `SaveableListener#onChange`             | `jenkins.config.changed`               |

#### セキュリティイベントタイプ

| イベント名                  | トリガー                            | 関連するレートメトリクス       |
|-----------------------------|-----------------------------------------|------------------------------|
| ユーザー認証成功          | `SecurityListener#authenticated`        | `jenkins.user.authenticated` |
| ユーザー認証失敗 | `SecurityListener#failedToAuthenticate` | `jenkins.user.access_denied` |
| ユーザーのログアウト              | `SecurityListener#loggedOut`            | `jenkins.user.logout`        |

### メトリクス

| メトリクス名                            | 説明                                                    | デフォルトのタグ                               |
|----------------------------------------|----------------------------------------------------------------|--------------------------------------------|
| `jenkins.computer.launch_failure`      | コンピューターの起動失敗レート                              |                                            |
| `jenkins.computer.offline`             | コンピューターのオフラインレート                                |                                            |
| `jenkins.computer.online`              | コンピューターのオンラインレート                                 |                                            |
| `jenkins.computer.temporarily_offline` | コンピューターの一時的なオフラインレート                    |                                            |
| `jenkins.computer.temporarily_online`  | コンピューターの一時的なオンラインレート                     |                                            |
| `jenkins.config.changed`               | 変更された構成レート                                 |                                            |
| `jenkins.executor.count`               | エグゼキューター総数                                                | `node_hostname`, `node_name`, `node_label` |
| `jenkins.executor.free`                | 使用されていないエグゼキューター数                                     | `node_hostname`, `node_name`, `node_label` |
| `jenkins.executor.in_use`              | アイドル状態のエグゼキューター数                                       | `node_hostname`, `node_name`, `node_label` |
| `jenkins.item.copied`                  | アイテムのコピーレート                                    |                                            |
| `jenkins.item.created`                 | アイテムの作成レート                                   |                                            |
| `jenkins.item.deleted`                 | アイテムの削除レート                                   |                                            |
| `jenkins.item.location_changed`        | アイテムの移動レート                                     |                                            |
| `jenkins.item.updated`                 | アイテムの更新レート                                   |                                            |
| `jenkins.job.aborted`                  | ジョブの中止レート                                          | `branch`, `job`, `node`                    |
| `jenkins.job.completed`                | ジョブの完了レート                                        | `branch`, `job`, `node`, `result`          |
| `jenkins.job.cycletime`                | ビルドのサイクル時間                                              | `branch`, `job`, `node`, `result`          |
| `jenkins.job.duration`                 | ビルドの所要時間 (秒単位)                                    | `branch`, `job`, `node`, `result`          |
| `jenkins.job.feedbacktime`             | コードのコミットからジョブの失敗までのフィードバック時間                 | `branch`, `job`, `node`, `result`          |
| `jenkins.job.leadtime`                 | ビルドのリードタイム                                               | `branch`, `job`, `node`, `result`          |
| `jenkins.job.mtbf`                     | MTBF: 最後に成功したジョブから現在失敗したジョブまでの時間 | `branch`, `job`, `node`, `result`          |
| `jenkins.job.mttr`                     | MTTR: 最後に失敗したジョブから現在成功したジョブまでの時間 | `branch`, `job`, `node`, `result`          |
| `jenkins.job.started`                  | ジョブの開始レート                                          | `branch`, `job`, `node`                    |
| `jenkins.job.waiting`                  | ジョブ実行までの待ち時間 (ミリ秒単位)            | `branch`, `job`, `node`                    |
| `jenkins.node.count`                   | ノード総数                                          |                                            |
| `jenkins.node.offline`                 | オフラインのノード数                                           |                                            |
| `jenkins.node.online`                  | オンラインのノード数                                            |                                            |
| `jenkins.plugin.count`                 | プラグイン総数                                                 |                                            |
| `jenkins.project.count`                | プロジェクト総数                                                 |                                            |
| `jenkins.queue.size`                   | キューサイズ                                                    |                                            |
| `jenkins.queue.buildable`              | キュー内のビルド可能なアイテム数                             |                                            |
| `jenkins.queue.pending`                | キュー内の保留アイテム数                               |                                            |
| `jenkins.queue.stuck`                  | キュー内の立ち往生 (スタック) アイテム数                                 |                                            |
| `jenkins.queue.blocked`                | キュー内のブロックされたアイテム数                               |                                            |
| `jenkins.scm.checkout`                 | SCM チェックアウトのレート                                         | `branch`, `job`, `node`                    |
| `jenkins.user.access_denied`           | 認証に失敗したユーザーレート                         |                                            |
| `jenkins.user.authenticated`           | 認証したユーザーレート                                  |                                            |
| `jenkins.user.logout`                  | ログアウトしたユーザーレート                                     |                                            |

### サービスのチェック

ビルドステータス `jenkins.job.status` にデフォルトタグを適用: `job`, `node`, `branch`, `result` (Git ブランチ、SVN 修正、CVS ブランチ) 

**注**: Git の `branch` タグは [Git プラグイン][7]をお使いの場合に利用可能です。

## 問題の追跡

このプラグイン [jenkinsci/datadog-plugin/issues][8] に関する問題はすべて、GitHub に搭載の問題追跡システムを使用して追跡を行います。
しかし、Jenkins プラグインのホスティング状況に応じて、JIRA に課題が作成される場合があります。関連する課題の投稿については、 [Jenkins の課題ページ][9]をご参照ください。

**注**: [Datadog に関連する JIRA の課題で未解決のものが存在します][10]。

## 変更

[CHANGELOG.md][11] をご参照ください。

## コードへのコントリビューション

開発に対するアイデアを共有いただけることに、まずは深く**感謝**を申し上げます。 

課題やプルリクエストの送信前に、[ドキュメント寄稿ガイドライン][12]をお読みください。
[開発用ドキュメント][13]でも、ローカル開発環境の準備などに関するヒントをご紹介しています。


[1]: https://plugins.jenkins.io/datadog
[2]: http://updates.jenkins-ci.org/download/war/1.580.1/jenkins.war
[3]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://github.com/jenkinsci/docker
[6]: https://wiki.jenkins-ci.org/display/JENKINS/Logging
[7]: https://plugins.jenkins.io/git
[8]: https://github.com/jenkinsci/datadog-plugin/issues
[9]: https://issues.jenkins-ci.org/issues/?jql=project%20%3D%20JENKINS%20AND%20status%20in%20%28Open%2C%20%22In%20Progress%22%2C%20Reopened%29%20AND%20component%20%3D%20datadog-plugin%20ORDER%20BY%20updated%20DESC%2C%20priority%20DESC%2C%20created%20ASC
[10]: https://issues.jenkins-ci.org/browse/INFRA-305?jql=status%20in%20%28Open%2C%20%22In%20Progress%22%2C%20Reopened%2C%20Verified%2C%20Untriaged%2C%20%22Fix%20Prepared%22%29%20AND%20text%20~%20%22datadog%22
[11]: https://github.com/jenkinsci/datadog-plugin/blob/master/CHANGELOG.md
[12]: https://github.com/jenkinsci/datadog-plugin/blob/master/CONTRIBUTING.md
[13]: https://github.com/jenkinsci/datadog-plugin/blob/master/DEVELOPMENT.md
