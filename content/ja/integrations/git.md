---
app_id: git
categories:
- コラボレーション
- 開発ツール
- 問題追跡
- ソースコントロール
custom_kind: インテグレーション
description: セルフホステッド Git サーバーから Datadog へコミットとプルリクエストを送信
title: Git
---
{{< img src="integrations/git/git_event.png" alt="Git イベント" popup="true">}}

## 概要

Git のコミットを Git サーバーから直接キャプチャして、以下のことができます。

- コードの変更をリアルタイムに追跡できます。
- すべてのダッシュボードにコード変更マーカーを追加できます。
- コードの変更についてチームで議論できます。

## セットアップ

### インストール

1. Create a new application key for Git: [Generate Application Key](https://app.datadoghq.com/organization-settings/api-keys)

1. Datadog Git Webhook をダウンロードします。

   ```shell
   sudo easy_install dogapi
   curl -L https://raw.github.com/DataDog/dogapi/master/examples/git-post-receive-hook > post-receive
   ```

1. Set up Git with your [Datadog keys](https://app.datadoghq.com/organization-settings/api-keys):

   ```shell
   git config datadog.api <YOUR_DATADOG_API_KEY>
   git config datadog.application <YOUR_DATADOG_APP_KEY>
   ```

1. `<GIT_REPOSITORY_NAME>` を使用して、Git リポジトリでフックを有効にします。

   ```shell
   install post-receive <GIT_REPOSITORY_NAME>/.git/hooks/post-receive
   ```

1. [Install the Datadog-Git Integration](https://app.datadoghq.com/integrations/git)