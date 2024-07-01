---
categories:
- collaboration
- developer tools
- issue tracking
- source control
dependencies: []
description: 自己ホスト型 Git サーバーから Datadog へコミットとプルリクエストを送信。
doc_link: https://docs.datadoghq.com/integrations/git/
draft: false
git_integration_title: git
has_logo: true
integration_id: git
integration_title: Git
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: git
public_title: Datadog-Git インテグレーション
short_description: 自己ホスト型 Git サーバーから Datadog へコミットとプルリクエストを送信。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/git/git_event.png" alt="Git イベント" popup="true">}}

## 概要

Git のコミットを Git サーバーから直接キャプチャして、以下のことができます。

- コードの変更をリアルタイムに追跡できます。
- すべてのダッシュボードにコード変更マーカーを追加できます。
- コードの変更についてチームで議論できます。

## セットアップ

### インストール

1. [Generate Application Key][1] を使用して、Git 用の新しいアプリケーションキーを作成します。

2. Datadog Git Webhook をダウンロードします。

    ```shell
    sudo easy_install dogapi
    curl -L https://raw.github.com/DataDog/dogapi/master/examples/git-post-receive-hook > post-receive
    ```

3. Git に [Datadog のキー][1]を設定します。

    ```shell
    git config datadog.api <YOUR_DATADOG_API_KEY>
    git config datadog.application <YOUR_DATADOG_APP_KEY>
    ```

4. `<GIT_REPOSITORY_NAME>` を使用して、Git リポジトリでフックを有効にします。

    ```shell
    install post-receive <GIT_REPOSITORY_NAME>/.git/hooks/post-receive
    ```

5. [Datadog-Git インテグレーションをインストール][2]します。

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/integrations/git