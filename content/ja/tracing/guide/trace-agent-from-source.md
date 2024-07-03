---
aliases:
- /ja/tracing/faq/trace-agent-from-source/
title: Installing the trace Agent from source
---

## ソースからのインストール

1. `Go 1.11+` をインストールします。詳しくは、[Go 公式サイト][1]の手順を参照してください。
2. [Datadog Agent リポジトリ][2]を複製します。
3. `datadog-agent` リポジトリのルートで、このコマンドを実行します。
    ```bash
    go install ./cmd/trace-agent
    ```

4. `trace-agent` を使用して Agent を実行します (システムの `$PATH` に `$GOPATH/bin` というパスが含まれていると仮定しています)。

### トラブルシューティング

Agent の出力やログ (Linux では `/var/log/datadog/trace-agent.log`) を確認し、トレースが正しいように見え、Datadog API に到達していることを確認します。

[1]: https://golang.org/dl
[2]: https://github.com/DataDog/datadog-agent