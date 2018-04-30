---
last_modified: 2015/07/05
translation_status: complete
language: ja
title: Datadog-Capistrano Integration
integration_title: Capistrano
kind: integration
doclevel: complete
---

<!-- ## Overview

Install the Capistrano Datadog integration to:

- Capture and search for deploy events in your event stream
- Correlate deploy events withe metric changes on dashboards -->

## 概要

次の目的で、Capistranoのインテグレーションをインストールします:

* デプロイイベントをDatadogのイベントストリームに記録し、検索できるようにします。
* ダッシュボード上で、デプロイイベントとメトリクスの状態を関連付けて表示します。

<!-- ## Configuration

Installing the Capistrano integration for a particular Capfile will capture each Capistrano task that that Capfile runs, including the roles that the task applies to and any logging output that it emits and submits them as events to Datadog at the end of the execution of all the tasks.

- Install the `dogapi` Ruby gem (version &gt;= 1.10.0):

        sudo gem install dogapi --version "&gt;=1.10.0"

- Add this to the beginning of your `Capfile`:

        require "capistrano/datadog" set :datadog_api_key, "${api_key}" -->

## 設定

CapfieへCapistranoインテグレーションをインストールすることで、Capfieの実行時に各Capistranoタスクをキャプチャすることができます。キャプチャには、タスクが適用されるロールや全てのログ出力が含まれ、全てのタスク実行終了時にDatadogへイベントとして送信されます。

- `dogapi` Ruby gem　をインストール (version >= 1.10.0):

      sudo gem install dogapi --version ">=1.10.0"

- `Capfile`ファイルのライブラリーをインポートとしている部分に次の行を追加:

      require "capistrano/datadog" set :datadog_api_key, "${api_key}"
