---
aliases:
- /ja/logs/log_collection/adobe_experience_manager
categories:
- log collection
custom_kind: integration
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/adobe_experience_manager.md
description: Adobe Experience Manager のログを収集して、エラー、リクエスト応答時間、パフォーマンスが低い Web ページなどを追跡します。
doc_link: /integrations/adobe_experience_manager/
further_reading:
- link: logs/
  tag: ドキュメント
  text: ログ管理
has_logo: true
integration_id: adobe
integration_title: Adobe Experience Manager
is_public: true
name: adobe_experience_manager
public_title: Datadog-Adobe Experience Manager
short_description: ログを収集して、エラー、リクエスト応答時間などを追跡
supported_os:
- linux
- mac_os
- windows
title: Adobe Experience Manager
---

## 概要

Adobe Experience Manager のログを収集して、エラー、リクエスト応答時間、パフォーマンスが低い Web ページなどを追跡します。

## セットアップ

### インストール

Adobe Experience Manager が実行されているインスタンス上に [Agent をインストール][1]します。

#### ログ収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
    logs_enabled: true
    ```

2. ログの収集を開始するには、[conf.d ディレクトリ][2]に `adobe.experience.manager.d/conf.yaml` を作成し、以下の構成を追加します。

    ```yaml
    logs:
        - type: file
          path: cq-installation-dir/crx-quickstart/logs/*.log
          service: '<MY_APPLICATION>'
          source: adobe.experience.manager
    ```

      `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。

3. [Agent を再起動します][3]。

## トラブル シューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /ja/agent/guide/agent-commands/#restart-the-agent
[4]: /ja/help/