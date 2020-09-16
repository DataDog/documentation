---
categories:
  - ログの収集
description: Marklogic からログを収集して Datadog に送信
has_logo: true
integration_title: Marklogic
is_public: true
kind: インテグレーション
name: marklogic
public_title: Datadog-Marklogic インテグレーション
dependencies:
  - 'https://github.com/DataDog/documentation/blob/master/content/en/integrations/marklogic.md'
short_description: Marklogic からログを収集して Datadog に送信
---
## 概要

Marklogic からログを収集して Datadog に送信します。

## セットアップ

### インストール

Marklogic インテグレーションは [Datadog Agent][1] パッケージに含まれています。ホストに追加でインストールする必要はありません。

### コンフィギュレーション

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。`datadog.yaml` で有効にします。

    ```yaml
    logs_enabled: true
    ```

2. MarkLogic のログの収集を開始するには、次の構成ブロックを `marklogic.d/conf.yaml` ファイルに追加します。

    ```yaml
    logs:
        - type: file
          path: '<MARKLOGIC_LOG_FILE_PATH>'
          source: marklogic
          sourcecategory: database
          service: '<SERVICE>'
    ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。

3. [Agent を再起動します][2]。

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `marklogic` を探します。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ja/agent/guide/agent-commands/#restart-the-agent
[3]: /ja/agent/guide/agent-commands/#agent-status-and-information