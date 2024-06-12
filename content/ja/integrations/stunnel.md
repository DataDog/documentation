---
categories:
  - ログの収集
description: Stunnel プロキシからログを収集して Datadog に送信。
has_logo: true
integration_title: Stunnel
is_public: true
name: Stunnel
public_title: Datadog-Stunnel インテグレーション
short_description: Stunnel プロキシからログを収集して Datadog に送信。
dependencies:
  - https://github.com/DataDog/documentation/blob/master/content/en/integrations/stunnel.md
integration_id: stunnel
---
## 概要

Stunnel は、既存のクライアントおよびサーバーに、プログラムコードの変更なしで TLS 暗号化機能を追加できるよう設計されたプロキシです。

Datadog - Stunnel のプロキシインテグレーションを使用して、ネットワーク上の潜在的な問題や DDoS 攻撃を監視することができます。

## セットアップ

### インストール

Stunnel を稼働するには、サーバーに [Datadog Agent のインストール][1]が必要です。

### コンフィギュレーション

Stunnel プロキシログの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーに `stunnel.d/conf.yaml` ファイルを作成します。

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent でのログ収集は、デフォルトで無効になっています。以下のように、`datadog.yaml` ファイルで有効にしてください。

    ```yaml
    logs_enabled: true
    ```

2. Stunnel のログの収集を開始するには、次のコンフィギュレーションブロックを `stunnel.d/conf.yaml` ファイルに追加します。

    ```yaml
    logs:
        - type: file
          path: /var/log/stunnel.log
          source: stunnel
          service: '<MY_SERVICE>'
          sourcecategory: proxy
    ```

   `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。

3. [Agent を再起動します][3]。

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `stunnel` を検索します。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /ja/agent/guide/agent-commands/#start-stop-restart-the-agent
[4]: /ja/agent/guide/agent-commands/#agent-status-and-information