---
aliases:
- /ja/logs/faq/how-to-set-up-only-logs
title: Datadog Agent をログ収集のみに使用
---

<div class="alert alert-danger">
インフラストラクチャーメトリクスなしのログ収集をセットアップするには、一部のペイロードを無効にする必要があります。結果として、収集しているログのメタデータおよびタグが失われる場合があるため、Datadog ではこれを推奨しません。このコンフィギュレーションについて、詳しくは <a href="/help/">Datadog サポート</a>までお問い合わせください。
</div>

ペイロードを無効にするには、Agent v6.4 以降を実行している必要があります。これにより、メトリクスデータの送信が無効になり、ホストが Datadog に表示されなくなります。以下のステップを実行してください。

{{< tabs >}}
{{% tab "Host " %}}

1. [datadog.yaml コンフィギュレーションファイル][1]を開きます。
2. 以下の設定で `enable_payloads` 属性を追加します。

    ```yaml
    enable_payloads:
        series: false
        events: false
        service_checks: false
        sketches: false
    ```

3. [Agent を構成してログを収集][2]します。
4. [Agent を再起動します][3]。

[1]: /ja/agent/guide/agent-configuration-files/
[2]: /ja/logs/log_collection/
[3]: /ja/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

Docker コンテナ化された Agent を使用している場合は、`DD_ENABLE_PAYLOADS_EVENTS`、`DD_ENABLE_PAYLOADS_SERIES`、`DD_ENABLE_PAYLOADS_SERVICE_CHECKS`、`DD_ENABLE_PAYLOADS_SKETCHES` の環境変数を `false` に設定し、Agent のコンフィギュレーションを以下のようにします。

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

Agent を Kubernetes にデプロイしている場合は、`DD_ENABLE_PAYLOADS_EVENTS`、`DD_ENABLE_PAYLOADS_SERIES`、`DD_ENABLE_PAYLOADS_SERVICE_CHECKS`、`DD_ENABLE_PAYLOADS_SKETCHES` の環境変数を `false` に設定し、Agent のコンフィギュレーションを以下のようにします。

```yaml
 ## ログのみ送信
 datadog:
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