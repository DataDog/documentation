---
categories:
- automation
- configuration & deployment
- developer tools
- orchestration
- provisioning
dependencies: []
description: デプロイをキャプチャおよび検索し、主要メトリクスのグラフに重ねて表示。
doc_link: https://docs.datadoghq.com/integrations/capistrano/
draft: false
git_integration_title: capistrano
has_logo: true
integration_id: capistrano
integration_title: Capistrano
integration_version: ''
is_public: true
manifest_version: '1.0'
name: capistrano
public_title: Datadog-Capistrano インテグレーション
short_description: デプロイをキャプチャおよび検索し、主要メトリクスのグラフに重ねて表示。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

[Capistrano][1] は、Ruby で記述されたリモートサーバー自動化およびデプロイツールです。

Capistrano Datadog インテグレーションをインストールすると、以下のことができます。

- イベントストリームでデプロイイベントをキャプチャおよび検索できます。
- ダッシュボード内で他のメトリクスにデプロイイベントを重ねて表示して、どのデプロイがアプリケーションのパフォーマンスに影響しているかを特定できます。

特定の `Capfile` に対してこのインテグレーションを有効にすると、完了した Capistrano タスクがイベントとして Datadog に送信されます。ロール情報とログ出力も送信されます。

## 計画と使用

### インフラストラクチャーリスト

`dogapi` Ruby gem をインストールします。

```shell
sudo gem install dogapi --version ">=1.10.0"
```

### ブラウザトラブルシューティング

Datadog に送信したいタスクを持つ `Capfile` の先頭に以下を追加します。

```text
require "capistrano/datadog"
set :datadog_api_key, "${独自の_API_キー}"
```

### 検証

`Capfile` を構成し、Capistrano タスクを少なくとも 1 回実行したら、以下を行います。

1. [イベントストリーム][2]に移動します。
2. 検索バーに `sources:capistrano` を入力するか、左側のインテグレーションの FROM リストで 'Capistrano' をクリックします。
3. 検索バーに `priority:all` を入力するか、左側の PRIORITY リストで 'All' をクリックします。Capistrano タスクは、デフォルトでは Low 優先度で送信されます。そのため、デフォルトのイベントストリームビュー（Normal 優先度）を使用すると表示されません。

{{< img src="integrations/capistrano/capistranoevents.mp4" video="true" >}}

## リアルユーザーモニタリング

### データセキュリティ

Capistrano インテグレーションには、メトリクスは含まれません。

### ヘルプ

Capistrano インテグレーションには、イベントは含まれません。

### ヘルプ

Capistrano インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: http://capistranorb.com
[2]: https://app.datadoghq.com/event/stream
[3]: https://docs.datadoghq.com/ja/help/