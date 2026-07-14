---
aliases:
- /ja/logs/faq/how-to-set-up-only-logs
further_reading:
- link: /containers/docker/log/?tab=containerinstallation
  tag: ドキュメント
  text: Docker ログ収集
- link: /containers/kubernetes/log/
  tag: ドキュメント
  text: Kubernetes ログ収集
title: Datadog Agent をログ収集のみに使用
---

<div class="alert alert-warning">Infrastructure Monitoring は APM を使用するための前提条件です。APM のお客様である場合、メトリクス収集を無効にしないでください。重要なテレメトリーおよびメトリクス収集情報を失う可能性があります。</div>

ペイロードを無効にするには、Agent v6.4 以降を実行している必要があります。これにより、メトリクスデータの送信 (カスタムメトリクスを含む) が無効になり、ホストが Datadog に表示されなくなります。以下の手順に従ってください。

{{< tabs >}}
{{% tab "Host " %}}

1. [datadog.yaml コンフィギュレーションファイル][1]を開きます。
2. 設定ファイル内の任意のトップレベル属性として、以下の設定で `enable_payloads` を追加してください:

    ```yaml
    enable_payloads:
        series: false
        events: false
        service_checks: false
        sketches: false
    ```

3. [Agent を構成してログを収集][2]します。
4. [Agent を再起動します][3]。

[1]: /ja/agent/configuration/agent-configuration-files/
[2]: /ja/logs/log_collection/
[3]: /ja/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Docker コンテナ化 Agent を使用している場合、以下の環境変数を `false` に設定してください。
- `DD_ENABLE_PAYLOADS_EVENTS`
- `DD_ENABLE_PAYLOADS_SERIES`
- `DD_ENABLE_PAYLOADS_SERVICE_CHECKS`
- `DD_ENABLE_PAYLOADS_SKETCHES`

以下は、Docker 実行コマンドにこれらの設定を含める例です。

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_ENABLE_PAYLOADS_EVENTS=false \
           -e DD_ENABLE_PAYLOADS_SERIES=false \
           -e DD_ENABLE_PAYLOADS_SERVICE_CHECKS=false \
           -e DD_ENABLE_PAYLOADS_SKETCHES=false \
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
 ## ログのみ送信
clusterAgent:
  enabled: false
datadog:
[...]
  processAgent:
    enabled: false
    containerCollection: false
[...]
  env:
    - name: DD_ENABLE_PAYLOADS_EVENTS
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SERIES
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SERVICE_CHECKS
      value: "false"
    - name: DD_ENABLE_PAYLOADS_SKETCHES
      value: "false"
```

{{% /tab %}}
{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}