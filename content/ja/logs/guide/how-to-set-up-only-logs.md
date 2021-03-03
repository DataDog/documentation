---
title: Datadog Agent をログ収集のみに使用
aliases:
  - /logs/faq/how-to-set-up-only-logs
kind: documentation
---
<div class="alert alert-danger">
メトリクスなしのログ収集をセットアップするには、一部のペイロードを無効にする必要があります。結果として、収集しているログのメタデータおよびタグが失われる場合があるため、Datadog ではこれを推奨しません。このコンフィギュレーションについて、詳しくは <a href="/help/">Datadog サポート</a>までお問い合わせください。
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

コンテナ Agent を使用している場合は、環境変数 `DD_ENABLE_PAYLOADS_EVENTS`、`DD_ENABLE_PAYLOADS_SERIES`、`DD_ENABLE_PAYLOADS_SERVICE_CHECKS`、`DD_ENABLE_PAYLOADS_SKETCHES` を `false` に設定し、Agent のコンフィギュレーションを以下のようにします。

```shell
docker run -d --name datadog-agent \
           -e DD_API_KEY="<DATADOG_API_KEY>" \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_ENABLE_PAYLOADS_EVENTS=false
           -e DD_ENABLE_PAYLOADS_SERIES=false
           -e DD_ENABLE_PAYLOADS_SERVICE_CHECKS=false
           -e DD_ENABLE_PAYLOADS_SKETCHES=false
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Agent を Kubernetes にデプロイしている場合は、環境変数 `DD_ENABLE_PAYLOADS_EVENTS`、`DD_ENABLE_PAYLOADS_SERIES`、`DD_ENABLE_PAYLOADS_SERVICE_CHECKS`、`DD_ENABLE_PAYLOADS_SKETCHES` を `false` に設定し、Agent のコンフィギュレーションを以下のようにします。

Datadog サイトに `DD_SITE` を設定します: {{< region-param key="dd_site" code="true">}}

```yaml
# datadog-agent.yaml

# Kubernetes シークレットを使用して Datadog API キーを構成するには、このセクションのコメントを解除します

# apiVersion: v1
# kind: Secret
# metadata:
#   name: datadog-secret
#   labels:
#     app: "datadog"
# type: Opaque
# data:
#   api-key: "<YOUR_BASE64_ENCODED_API_KEY>"
---
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog-agent
  namespace: default
spec:
  selector:
    matchLabels:
      app: datadog-agent
  template:
    metadata:
      labels:
        app: datadog-agent
      name: datadog-agent
    spec:
      serviceAccountName: datadog-agent
      containers:
      - image: gcr.io/datadoghq/agent:latest
        imagePullPolicy: Always
        name: datadog-agent
        ports:
          - containerPort: 8125
            ## DogStatsD 経由のカスタムメトリクス - このセクションのコメントを解除して、
            ## カスタムメトリクスコレクションを有効にします。
            ## DD_DOGSTATSD_NON_LOCAL_TRAFFIC を "true" に設定して、
            ## 他のコンテナから StatsD メトリクスを収集します。
            #
            # hostPort: 8125
            name: dogstatsdport
            protocol: UDP
          - containerPort: 8126
            ## トレース収集（APM）- このセクションのコメントを解除して、APM を有効にします
            # hostPort: 8126
            name: traceport
            protocol: TCP
        env:
          ## 組織に関連する Datadog API キーを設定します
          ## Kubernetes Secret を使用する場合、次の環境変数を使用します:
          ## - {name: DD_API_KEY, valueFrom:{ secretKeyRef:{ name: datadog-secret, key: api-key }} - {name: DD_API_KEY, value: "<DATADOG_API_KEY>"}

          ## DD_SITE を Datadog サイトに設定します
          - {name: DD_SITE, value: "<YOUR_DD_SITE>"}

          ## Docker ソケットへのパス - {name: DD_CRI_SOCKET_PATH, value: /host/var/run/docker.sock} - {name: DOCKER_HOST, value: unix:///host/var/run/docker.sock} 

          ## StatsD の収集を許可するには、DD_DOGSTATSD_NON_LOCAL_TRAFFIC を true に設定します。
          - {name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC, value: "false" }
          - {name: KUBERNETES, value: "true"}
          - {name: DD_HEALTH_PORT, value: "5555"}
          - {name: DD_COLLECT_KUBERNETES_EVENTS, value: "true" }
          - {name: DD_LEADER_ELECTION, value: "true" }
          - {name: DD_APM_ENABLED, value: "true" }

          ## ログ収集の有効化
          - {name: DD_LOGS_ENABLED, value: "true"}
          - {name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL, value: "true"}
          - {name: DD_CONTAINER_EXCLUDE, value: "name:datadog-agent"}

          ## ログのみを送信
          - {name: DD_ENABLE_PAYLOADS_EVENTS, value: "false"}
          - {name: DD_ENABLE_PAYLOADS_SERIES, value: "false"}
          - {name: DD_ENABLE_PAYLOADS_SERVICE_CHECKS, value: "false"}
          - {name: DD_ENABLE_PAYLOADS_SKETCHES, value: "false"}

          - name: DD_KUBERNETES_KUBELET_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP

        ## これらは、リクエストと制限の最小推奨値です。
        ## Agent が必要とするリソースの量は、以下によって異なります。
        ## * チェックの数
        ## * 有効なインテグレーションの数
        ## * 有効な機能の数
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        volumeMounts:
          - {name: dockersocketdir, mountPath: /host/var/run}
          - {name: procdir, mountPath: /host/proc, readOnly: true}
          - {name: cgroups, mountPath: /host/sys/fs/cgroup, readOnly: true}
          - {name: s6-run, mountPath: /var/run/s6}
          - {name: logpodpath, mountPath: /var/log/pods}
          - {name: pointdir, mountPath: /opt/datadog-agent/run}
          ## Docker ランタイムディレクトリ、このパスをコンテナランタイムログディレクトリに
          ## 置き換えるか、`/var/log/pods` が他のディレクトリへのシンボリックリンクでない
          ## 場合、この構成を削除します。
          - {name: logcontainerpath, mountPath: /var/lib/docker/containers}
        livenessProbe:
          httpGet:
            path: /health
            port: 5555
          initialDelaySeconds: 15
          periodSeconds: 15
          timeoutSeconds: 5
          successThreshold: 1
          failureThreshold: 3
      volumes:
        - {name: dockersocketdir, hostPath: {path: /var/run}}
        - {name: procdir, hostPath: {path: /proc}}
        - {name: cgroups, hostPath: {path: /sys/fs/cgroup}}
        - {name: s6-run, emptyDir: {}}
        - {name: logpodpath, hostPath: {path: /var/log/pods}}
        - {name: pointdir, mountPath: /opt/datadog-agent/run}
        ## Docker ランタイムディレクトリ、このパスをコンテナランタイムログディレクトリに
        ## 置き換えるか、`/var/log/pods` が他のディレクトリへのシンボリックリンクでない
        ## 場合、この構成を削除します。
        - {name: logcontainerpath, hostPath: {path: /var/lib/docker/containers}}
```

{{% /tab %}}
{{< /tabs >}}