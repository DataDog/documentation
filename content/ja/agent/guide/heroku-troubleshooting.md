---
aliases:
- /ja/agent/faq/heroku-troubleshooting/
title: Datadog-Heroku Buildpack troubleshooting
---

Heroku のデバッグを開始するには、[Agent ドキュメント][1]に記載されている情報/デバッグコマンドを使用して、`agent-wrapper` コマンドを使用します。

たとえば、Datadog Agent と有効なインテグレーションのステータスを表示するには、以下を実行します。

```shell
agent-wrapper status
```

次に、カスタムメトリクスを送信して、Datadog Agent がリスニングしていることを確認します。プロジェクトディレクトリから、以下を実行します。

```shell
heroku run bash

# Dyno が起動し、コマンドラインを表示したら
echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

しばらくして、メトリクスエクスプローラーで、メトリクスが受信されたことを確認します。

また、実行中の dyno から Agent と Trace Agent のログを取得することも有効です。

Datadog Agent のログをダウンロードします。

```shell
heroku ps:copy /app/.apt/var/log/datadog/datadog.log --dyno=<YOUR DYNO NAME>
```

Datadog Trace Agent のログをダウンロードします。

```shell
heroku ps:copy /app/.apt/var/log/datadog/datadog-apm.log --dyno=<YOUR DYNO NAME>
```

## フレアの送信

[`agent-wrapper` コマンド][1]を実行して、フレアを生成します。

```shell
agent-wrapper flare
```

[1]: /ja/agent/configuration/agent-commands/#agent-status-and-information