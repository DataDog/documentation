---
aliases:
- /ja/error_tracking/standalone_backend/getting_started/dd_libraries
further_reading:
- link: /error_tracking/issue_states/
  tag: ドキュメント
  text: Error Tracking の問題の状態とワークフロー
- link: /error_tracking/explorer
  tag: ドキュメント
  text: エラートラッキングエクスプローラーについて
- link: /error_tracking/guides/enable_infra
  tag: ガイド
  text: Enable infrastructure monitoring
- link: /error_tracking/guides/enable_apm
  tag: ガイド
  text: APM を有効にする
title: Datadog トレーシング ライブラリを使ってバックエンド エラー トラッキングを導入する
---

Datadog ライブラリでアプリケーションをインスツルメントする手順は次のとおりです。

1. [Agent をインストールして構成します](#install-and-configure-the-agent)。
2. [Datadog のトレーシングライブラリをコードに追加](#instrument-your-application)します。

## Agent のインストールと構成

[関連ドキュメント][1] に従って Datadog Agent をインストールします。

Agent を Error Tracking Backend のみで動作させるには、Agent v7.61+ を実行している必要があります。

{{< tabs >}}
{{% tab "Linux ホストまたは VM" %}}

1. [datadog.yaml 設定ファイル][2] を開きます。
2. 設定ファイル内の任意の場所に、トップ レベル属性として `core_agent` と `apm_config` を追加し、次の設定を行います。

   ```yaml
   core_agent:
     enabled: false
   apm_config:
     error_tracking_standalone:
       enabled: true
   ```

3. [Agent を再起動します][3]。

[2]: /ja/agent/configuration/agent-configuration-files/
[3]: /ja/agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Docker" %}}

Docker コンテナ化した Agent を使用している場合は、次の環境変数を設定します。
- `DD_CORE_AGENT_ENABLED=false`
- `DD_APM_ERROR_TRACKING_STANDALONE_ENABLED=true`

以下は、Docker 実行コマンドにこれらの設定を含める例です。

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_CORE_AGENT_ENABLED=false \
           -e DD_APM_ERROR_TRACKING_STANDALONE_ENABLED=true \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Kubernetes に Agent をデプロイする場合、Agent 構成に加えて Helm チャートに以下の変更を加えてください。

```yaml
agents:
  containers:
    agent:
      env:
        - name: DD_CORE_AGENT_ENABLED
          value: "false"
datadog:
[...]
  processAgent:
    enabled: false
    containerCollection: false
[...]
  apm:
    errorTrackingStandalone:
      enabled: true
```

{{% /tab %}}
{{< /tabs >}}

## アプリケーションをインスツルメントする

関連する [ドキュメント][4] を参照し、公式 Datadog トレーシング ライブラリのいずれかを使ってトレースを送信できるようにアプリケーションをセットアップします。
アプリケーション言語向けの [OpenTelemetry API ガイド][5] に従い、span イベント経由でエラーを手動送信します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent
[4]: /ja/tracing/trace_collection/automatic_instrumentation/dd_libraries
[5]: /ja/tracing/trace_collection/custom_instrumentation/?tab=opentelemetryapi#getting-started