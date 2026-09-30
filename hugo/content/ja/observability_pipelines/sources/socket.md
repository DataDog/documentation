---
description: Observability Pipelines Worker を使用して、TCP または UDP のソケットコネクション経由で送信されるログを収集する方法を学びます。
disable_toc: false
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: ソケットソース
---
{{< product-availability >}}

## 概要{#overview}

Observability Pipelines のソケットソースを使用して、ソケットコネクション (TCP または UDP) 経由で Worker にログを送信します。

## 前提条件{#prerequisites}

{{% observability_pipelines/prerequisites/socket %}}

## セットアップ{#setup}

<div class="alert alert-danger">シークレット管理の場合: ソケットアドレスと TLS キーパス (該当する場合) の識別子のみを入力してください。実際の値は<b>入力しない</b>でください。</div>

このソースは、[パイプラインを設定][1]する際に設定します。パイプラインは、[UI][3]、[API][4]、または [Terraform][5] を使用して設定できます。このセクションの手順は、このソースを UI で設定するためのものです。

**注**: Worker は TCP または UDP 経由でのみログを受信できます。アプリケーションが UNIX ドメインソケットに書き込む場合の詳細については、[UNIX ドメインソケット](#unix-domain-sockets)を参照してください。

パイプライン UI でソケットソースを選択した後:

1.  ソケットアドレスの識別子を入力します。空白のままにすると、[デフォルト](#secret-defaults)が使用されます。
1. [{{< ui >}}Mode{{< /ui >}}] (モード) ドロップダウンメニューで、使用するソケットタイプを選択します。
1. [{{< ui >}}Framing{{< /ui >}}] (フレーミング) ドロップダウンメニューで、イベントのストリームを区切る方法を選択します。
    <table>
        <colgroup>
            <col style="width:40%">
            <col style="width:60%">
        </colgroup>
        <thead>
            <tr>
                <th>フレーミングメソッド</th>
                <th>説明</th>
            </tr>
        </thead>
        <tr>
            <td><code>newline_delimited</code></td>
            <td>バイトフレームは、改行文字で区切られます。</td>
        </tr>
        <tr>
            <td><code>bytes</code></td>
            <td>バイトフレームは、基盤となる I/O 境界 (メッセージ間やストリームセグメント間の分割など) に従ってそのまま渡されます。</td>
        </tr>
        <tr>
            <td><code>character_delimited</code></td>
            <td>バイトフレームは、選択された文字で区切られます。</td>
        </tr>
        <tr>
            <td><code>chunked_gelf</code></td>
            <td>バイトフレームは、チャンク化された GELF メッセージです。</td>
        </tr>
        <tr>
            <td><code>octet_counting</code></td>
            <td>バイトフレームは、オクテットカウント形式に従って区切られます。</td>
        </tr>
    </table>

{{% observability_pipelines/secrets_env_var_note %}}

### オプションの TLS 設定{#optional-tls-settings}

{{% observability_pipelines/tls_settings %}}

{{% observability_pipelines/tls_settings_mtls %}}

## UNIX ドメインソケット{#unix-domain-sockets}

ソケットソースは、TCP または UDP 経由でのログ受信のみをサポートしています。アプリケーションが UNIX ドメインソケットに書き込む場合は、`socat` で TCP または UDP ソケットにブリッジして Observability Pipelines Worker にログを送信してください。

### スタンドアロンブリッジ{#standalone-bridge}

`socat` をアプリケーションと一緒に実行して、UNIX ソケットから Observability Pipelines Worker に転送します。

```
socat UNIX-RECV:/var/run/app.sock TCP:<OPW_HOST>
```

<OPW_HOST> を、Observability Pipelines Worker に関連付けられたホストの IP アドレスまたはロードバランサーの URL に置き換えてください。

### Kubernetes サイドカー{#kubernetes-sidecar}

Kubernetes では、Observability Pipelines Worker は通常 Service の背後で StatefulSet として実行されるため、`localhost` 経由では到達できません。`socat` をアプリケーションと同じ Pod 内でサイドカーコンテナとして実行し、ソケットファイル用のボリュームを共有してください。以下に例を示します。

```yaml
volumes:
  - name: app-socket
    emptyDir: {}

initContainers:
  # Remove any stale socket file before the sidecar starts
  - name: socket-cleanup
    image: busybox:1.36
    command: ["sh", "-c", "rm -f /var/run/app/app.sock"]
    volumeMounts:
      - name: app-socket
        mountPath: /var/run/app

containers:
  # Your application container
  - name: app
    # ...
    volumeMounts:
      - name: app-socket
        mountPath: /var/run/app

  # socat sidecar: bridges the UNIX socket to the Worker's Service
  - name: socat-opw-bridge
    image: alpine/socat:1.8.0.0
    args:
      - UNIX-RECV:/var/run/app/app.sock,fork
      - TCP:<RELEASE_NAME>-observability-pipelines-worker.<NAMESPACE>.svc.cluster.local:5000
    volumeMounts:
      - name: app-socket
        mountPath: /var/run/app

# Monitor and adjust resources as necessary
    resources:
      requests:
        cpu: 10m
        memory: 16Mi
    securityContext:
      runAsNonRoot: true
      runAsUser: 1000
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
```

`TCP` 引数で、`localhost` ではなく、Observability Pipelines Worker の Kubernetes Service エンドポイントを参照してください。Observability Pipelines Worker の StatefulSet Pod はすべてのノードで実行されるとは限らないため、`localhost` では Observability Pipelines Worker Pod に到達できない可能性があります。これは、Observability Pipelines Worker とワークロード用に専用のノードグループがある場合に特に当てはまります。

## シークレットのデフォルト値 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "シークレット管理" %}}

- ソケットアドレスの識別子:
	- Observability Pipelines Worker が受信ログをリッスンするアドレスとポートを参照します。
	- デフォルトの識別子は `SOURCE_SOCKET_ADDRESS` です。
- ソケット TLS パスフレーズの識別子 (TLS が有効な場合):
	- デフォルトの識別子は `SOURCE_SOCKET_KEY_PASS` です。

{{% /tab %}}

{{% tab "環境変数" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/socket %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /ja/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /ja/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline