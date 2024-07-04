---
aliases:
- /ja/logs/faq/how-to-tail-logs-from-host-using-a-container-agent
further_reading:
- link: /agent/docker/log
  tag: ドキュメント
  text: Docker でログを取る
- link: /agent/docker/log/?tab=containerinstallation
  tag: ドキュメント
  text: Kubernetes でログを取る
- link: https://www.datadoghq.com/blog/docker-logging/
  tag: ブログ
  text: Docker ロギングのベストプラクティス
- link: /glossary/#tail
  tag: 用語集
  text: 用語集 "テール" の項目
title: コンテナ Agent を使用してホストからログを追跡する
---

<div class="alert alert-info">Datadog では、コンテナ・ログの収集に <b>STDOUT/STDERR</b> を使用することを推奨しています。</div>

## 概要

ポッド/コンテナは、デフォルトでホストファイルにアクセスできませんが、これは Agent にも適用されます。ホストファイルからログを収集するようにコンテナ Agent を構成しようとすると、以下のようなエラーメッセージが表示されます。

```
  syslog
  ------
    Type: file
    Path: /var/log/messages
    Status: Error: file /var/log/messages does not exist

```

コンテナ Agent がホストファイルにアクセスできるようにするには、ファイルまたはそのディレクトリをコンテナ Agent にマウントします。OS に基づいてどのホストファイルとディレクトリをマウントするかは、[Agent コンフィグレーションファイルとディレクトリ][1]のリストを参照してください。

ここでは、Kubernetes と Docker の例を紹介します。

{{< tabs >}}
{{% tab "Kubernetes" %}}

ホストのログファイルを Agent コンテナにマウントするには、Agent マニフェストのボリュームセクションにホストログディレクトリを、`volumeMounts` セクションにコンテナログディレクトリを設定します。

```
        volumeMounts:
          - name: customlogs
            ## Agent コンテナ内の希望するログディレクトリ:
            mountPath: /container/var/test-dir/logs/

      volumes:
        - name: customlogs
          hostPath:
            ## ログファイルを含むホスト内のディレクトリ。
            path: /var/test-dir/logs/
```

次に、ログ収集のためにファイルを追跡するように Agent を構成します。これを行うには、カスタムログ構成を `/conf.d/` にマウントします。ファイル名は、拡張子が `.yaml` であれば何でも構いません。

ホストファイルを直接マウントするよりも、ConfigMap を使用して構成を保存することが望ましいです。以下は、`logs.yaml` ファイルを持つ ConfigMap マニフェストのサンプルです。

```
kind: ConfigMap
apiVersion: v1
metadata:
     name: ddagent-logs-configmap
     namespace: default
data:
     logs.yaml: |-
           logs:
             - type: file
               service: syslog
               source: os
               ## Agent マニフェストで設定したコンテナログディレクトリを使用する
               path: /container/var/test-dir/logs/*.log
```

コマンドで ConfigMap オブジェクトを作成します。

```bash
kubectl create -f <configmap manifest>
```

そして、`/conf.d/` の下にマウントします。

```
        volumeMounts:
          - name: cm-logs
            mountPath: /conf.d/

      volumes:
        - name: cm-logs
          configMap:
            name: ddagent-logs-configmap
```

{{% /tab %}}
{{% tab "Docker" %}}

ホストログファイルをマウントするには、Agent の `docker run` コマンドにボリュームパラメーターを追加します。

```
-v /<host log directory>/:<container log directory>/
```

そして、ローカルでカスタムログの構成を作成します。

```
logs:
  - type: file
    service: syslog
    source: os
    path: <container log path>/*.log
```

次に、それを `/conf.d/` にマウントします。ファイル名は何でも構いません。

```
-v <absolute path>/logs.yaml:/conf.d/logs.yaml
```

Agent の Docker インストールコマンドは、以下のようになります。

```
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           -v /<host log directory>/:<container log directory>/ \
           -v /<config location>/logs.yaml:/conf.d/logs.yaml \
           gcr.io/datadoghq/agent:latest
```
{{% /tab %}}
{{< /tabs >}}

## 検証

ここまで設定したら、Agent をデプロイします。`docker exec -it datadog-agent agent status` を実行すると、以下のような画面が表示されるはずです。

```
==========
Logs Agent
==========

    Sending compressed logs in HTTPS to agent-http-intake.logs.datadoghq.com on port 443
    BytesSent: 10605
    EncodedBytesSent: 2144
    LogsProcessed: 32
    LogsSent: 31

  logs
  ----
    Type: file
    Path: /container/var/test-dir/logs/*.log
    Status: OK
      1 files tailed out of 1 files matching
    Inputs: /container/var/test-dir/logs/722bfb2cb35cc627-json.log

```

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/guide/agent-configuration-files/?tab=agentv6v7