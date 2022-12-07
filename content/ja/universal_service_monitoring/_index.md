---
aliases:
- /ja/tracing/universal_service_monitoring/
further_reading:
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: GitHub
  text: ユニバーサルサービスモニタリングで数秒のうちにゴールデンシグナル
- link: /getting_started/tagging/unified_service_tagging/
  tag: ドキュメント
  text: 統合サービスタグ付け
- link: /tracing/services/services_list/
  tag: ドキュメント
  text: Datadog に報告するサービスの一覧
- link: /tracing/services/service_page/
  tag: ドキュメント
  text: Datadog のサービスについて
- link: /tracing/services/services_map/
  tag: ドキュメント
  text: サービスマップについて読む
kind: documentation
title: ユニバーサル サービス モニタリング
---

## 概要

ユニバーサルサービスモニタリング (USM) は、_コードをインスツルメントすることなく_、スタック全体にわたって普遍的にサービスのヘルスメトリクスを視覚化することができます。Datadog Agent の構成と[統合サービスタグ付け][1]に依存し、インスツルメントされていないサービスのパフォーマンスデータを、サービスカタログ、サービスマップなどのビューに取り込みます。USM は、[デプロイ追跡][2]、モニター、ダッシュボード、SLO とも連動しています。

{{< img src="universal_service_monitoring/usm-demo.mp4" alt="ユニバーサルサービスモニタリングのデモ映像です。サービスマップ上のサービスをクリックし、View service overview を選択すると、サービスの概要が表示されます。" video="true" >}}


## セットアップ

### 対応バージョンと互換性

必要な Agent のバージョン
: ユニバーサルサービスモニタリングでは、コンテナ化されたサービスと共にインストールされる Datadog Agent のバージョンが 6.40 または 7.40 以上であることが必要です。

コンテナ化されたサービスは、以下のサポートされたプラットフォームのいずれかで実行されている必要があります。
: Linux Kernel 4.14 以上<br/>
CentOS または RHEL 8.0 以上<br/>
Windows 2012 R2 以降の IIS

対応アプリケーション層プロトコル
: HTTP<br/>
HTTPS (OpenSSL)


<div class="alert alert-info">
どのようなプラットフォームやプロトコルに対応してほしいかなどのフィードバックがありましたら、サポートまでご連絡ください。
</div>

### 前提条件

- サービスがコンテナで動作していること。
- Datadog Agent がサービスと共にインストールされていること。トレースライブラリのインストールは必要_ありません_。
- [統合サービスタグ付け][1]の `env` タグがデプロイメントに適用されていること。`service` と `version` タグはオプションです。



## ユニバーサルサービスモニタリングを有効にする

サービスのデプロイ方法と Agent の構成に応じて、以下のいずれかの方法を使用して、Agent でユニバーサルサービスモニタリングを有効にします。

{{< tabs >}}
{{% tab "Helm" %}}

Datadog チャートバージョン >= 2.26.2 を使用して、以下を values ファイルに追加します。

```
datadog:
  ...
  serviceMonitoring:
    enabled: true
```

{{% /tab %}}
{{% tab "Helm を使用しない Kubernetes" %}}

1. `datadog-agent` テンプレートにアノテーション `container.apparmor.security.beta.kubernetes.io/system-probe: unconfined` を追加します。

   ```
   spec:
     selector:
       matchLabels:
         app: datadog-agent
     template:
       metadata:
         labels:
           app: datadog-agent
         name: datadog-agent
         annotations:
           container.apparmor.security.beta.kubernetes.io/system-probe: unconfined
    ```
2. Agent デーモンセットで以下の環境変数を設定し、ユニバーサルサービスモニタリングを有効にします。Agent プロセスごとにコンテナを実行する場合は、`process-agent` コンテナに以下の環境変数を追加します。そうでない場合は、`agent` コンテナに追加します。

   ```
   ...
     env:
       ...
       - name: DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED
         value: 'true'
       - name: DD_SYSTEM_PROBE_EXTERNAL
         value: 'true'
       - name: DD_SYSPROBE_SOCKET
         value: /var/run/sysprobe/sysprobe.sock
   ```

3. 以下の追加ボリュームを `datadog-agent` コンテナにマウントします。
   ```
   ...
   spec:
     serviceAccountName: datadog-agent
     containers:
       - name: datadog-agent
         image: 'gcr.io/datadoghq/agent:latest'
         ...
     volumeMounts:
       ...
       - name: sysprobe-socket-dir
       mountPath: /var/run/sysprobe
   ```

4. Agent のサイドカーとして、新しい `system-probe` コンテナを追加します。

   ```
   ...
   spec:
     serviceAccountName: datadog-agent
     containers:
       - name: datadog-agent
         image: 'gcr.io/datadoghq/agent:latest'
         ...
       - name: system-probe
         image: 'gcr.io/datadoghq/agent:latest'
         imagePullPolicy: Always
         securityContext:
           capabilities:
             add:
               - SYS_ADMIN
               - SYS_RESOURCE
               - SYS_PTRACE
               - NET_ADMIN
               - NET_BROADCAST
               - NET_RAW
               - IPC_LOCK
               - CHOWN
         command:
           - /opt/datadog-agent/embedded/bin/system-probe
         env:
           - name: DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED
             value: 'true'
           - name: DD_SYSPROBE_SOCKET
             value: /var/run/sysprobe/sysprobe.sock
         resources: {}
         volumeMounts:
           - name: procdir
             mountPath: /host/proc
             readOnly: true
           - name: cgroups
             mountPath: /host/sys/fs/cgroup
             readOnly: true
           - name: debugfs
             mountPath: /sys/kernel/debug
           - name: sysprobe-socket-dir
             mountPath: /var/run/sysprobe
   ```
   そして、以下のボリュームをマニフェストに追加します。
   ```
   volumes:
     - name: sysprobe-socket-dir
       emptyDir: {}
     - name: debugfs
       hostPath:
         path: /sys/kernel/debug
   ```
5. オプションで HTTPS をサポートする場合は、`system-probe` コンテナに以下を追加します。

   ```
   env:
     - name: HOST_ROOT
       value: /host/root
   volumeMounts:
     - name: hostroot
       mountPath: /host/root
       readOnly: true
   ```

   そして、以下のボリュームをマニフェストに追加します。
   ```
   volumes:
     - name: hostroot
       hostPath:
       path: /
   ```

{{% /tab %}}
{{% tab "Docker" %}}

`docker run` コマンドに以下を追加します。

```
-v /sys/kernel/debug:/sys/kernel/debug \
-e DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true \
--security-opt apparmor:unconfined \
--cap-add=SYS_ADMIN \
--cap-add=SYS_RESOURCE \
--cap-add=SYS_PTRACE \
--cap-add=NET_ADMIN \
--cap-add=NET_BROADCAST \
--cap-add=NET_RAW \
--cap-add=IPC_LOCK \
--cap-add=CHOWN
```

オプションで HTTPS をサポートする場合は、以下も追加します。
```
-e HOST_ROOT=/host/root \
-v /:/host/root:ro
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

以下を `docker-compose.yml` ファイルに追加します。

```
services:
  ...
  datadog:
    ...
    environment:
     - DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED: 'true'
    volumes:
     - /sys/kernel/debug:/sys/kernel/debug
    cap_add:
     - SYS_ADMIN
     - SYS_RESOURCE
     - SYS_PTRACE
     - NET_ADMIN
     - NET_BROADCAST
     - NET_RAW
     - IPC_LOCK
     - CHOWN
    security_opt:
     - apparmor:unconfined
```

オプションで HTTPS をサポートする場合は、以下も追加します。

```
services:
  ...
  datadog:
    ...
    environment:
     - HOST_ROOT: '/host/root'
    volumes:
     - /:/host/root:ro
```

{{% /tab %}}
{{% tab "コンフィギュレーションファイル (Linux)" %}}

Helm Charts や環境変数を使用しない場合は、`system-probe.yaml` ファイルに以下を設定します。

```
service_monitoring_config:
  enabled: true
```

{{% /tab %}}
{{% tab "環境変数 (Linux)" %}}

Docker や ECS のインストールでよくあるように、`system-probe` を環境変数で構成する場合、以下の環境変数を `process-agent` と `system-probe` の**両方**に渡します。

```
DD_SYSTEM_PROBE_SERVICE_MONITORING_ENABLED=true
```

{{% /tab %}}
{{% tab "Windows" %}}

**IIS 上で動作するサービスの場合:**

1. ネットワークドライバーコンポーネントを有効にして、[Datadog Agent][1] (バージョン 6.40 または 7.40 以降) をインストールします。インストール中、`msiexec` コマンドに `ADDLOCAL="MainApplication,NPM"` を渡すか、UI から Agent のインストールを実行するときに **Network Performance Monitoring** を選択します。

2. `C:\ProgramData\Datadog\system-probe.yaml` を編集し、有効フラグを `true` に設定します。

   ```yaml
   service_monitoring_config:
     enabled: true
   ```
[1]: /ja/agent/basic_agent_usage/windows/?tab=commandline
{{< /tabs >}}

{{< /tabs >}}

## 自動サービスタグ付け

ユニバーサルサービスモニタリングは、インフラストラクチャーで稼働しているサービスを自動的に検出します。[統合サービスタグ付け][1]が見つからない場合、タグの 1 つ (`app`、`short_image`、`kube_container_name`、`container_name`、`kube_deployment`、`kube_service`) に基づいて名前を付けます。

サービス名を更新するには、[統合サービスタグ付け][1]を設定します。

{{< img src="universal_service_monitoring/automatic-service-tagging.png" alt="Datadog がサービスを自動検出すると、その際に使用されるタグがサービスページの上部に表示されます" style="width:80%;" >}}

## サービスの確認

Agent を構成した後、サービスカタログにサービスが表示されるまで約 5 分間待ちます。サービスをクリックすると、サービスの詳細ページが表示されます。左上の操作名 `universal.http.server` または `universal.http.client` は、サービスのテレメトリーがユニバーサルサービスモニタリングから来ることを示します。

`universal.http.server` という操作名で、サービスへのインバウンドトラフィックのヘルスメトリクスを取得します。対応する `universal.http.client` 操作名は、他の宛先へのアウトバウンドトラフィックを表します。

{{< img src="universal_service_monitoring/select_service_operation.png" alt="Services タブの operation ドロップダウンメニューには、利用可能な操作名が表示されます" style="width:100%;" >}}

ユニバーサルサービスモニタリングを有効にすると、次のことが可能になります。


- **APM** > **Service Catalog** または **APM** > **Service Map** に移動して、[サービスとその依存関係を視覚化します][3]。

- 特定の Service ページをクリックして、ゴールデンシグナルメトリクス (リクエスト、エラー、期間) を確認し、[デプロイ追跡][2]で最近のコード変更と相関させることができます。

- `universal.http.*` メトリクスを使用して、[モニター][4]、[ダッシュボード][5]、[SLO][6] を作成します。


## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging
[2]: /ja/tracing/services/deployment_tracking/
[3]: /ja/tracing/service_catalog/
[4]: /ja/monitors/create/types/apm/?tab=apmmetrics
[5]: /ja/dashboards/
[6]: /ja/monitors/service_level_objectives/metric/