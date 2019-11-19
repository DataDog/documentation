---
categories:
  - ログの収集
description: Sidekiq からログを収集して Datadog に送信
has_logo: true
integration_title: Sidekiq
is_public: true
kind: インテグレーション
name: sidekiq
public_title: Datadog-Sidekiq インテグレーション
short_description: Sidekiq からログを収集して Datadog に送信
---
## 概要

Sidekiq のログを Datadog に接続して、毎秒のリクエスト数や処理バイト数の追跡、エラーのトラブルシューティング、ドキュメント更新の監視を行うことができます。

このインテグレーションは、アクセスログに加えてエラーログもサポートします。

## セットアップ
### インストール


Sidekiq インテグレーションは [Datadog Agent][1] パッケージに含まれています。ホストに追加でインストールする必要はありません。

### コンフィグレーション
####         - containerPort: 8126
          hostPort: 8126
          name: traceport
          protocol: TCP

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。`datadog.yaml` で有効にします。

    ```yaml
    logs_enabled: true
    ```

2. Sidekiq のログの収集を開始するには、次の構成ブロックを `sidekiq.d/conf.yaml` ファイルに追加します。

    ```
      logs:
          - type: file
            path: <SIDEKIQ_LOG_FILE_PATH>
            source: sidekiq
            sourcecategory: jobrunner
            service: <SERVICE>
    ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。ログが見つからない場合は、[Sidekiq のドキュメントでログ設定の変更方法を参照][2]してください。

3. [Agent を再起動します][3]。

### 検証

[Agent の `status` サブコマンドを実行][4]し、Checks セクションで `sidekiq` を探します。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/mperham/sidekiq/wiki/Logging#log-file
[3]: /ja/agent/guide/agent-commands/?tab=agentv6#restart-the-agent
[4]: /ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information