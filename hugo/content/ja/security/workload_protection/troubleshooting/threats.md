---
description: Workload Protection (Agent フレア、セルフテスト、ネットワークプラグインの互換性など) のトラブルシューティングを行います。
title: Workload Protection のトラブルシューティング
---
Workload Protection で問題が発生した場合は、以下のトラブルシューティングガイドラインを使用してください。さらにサポートが必要な場合は、[Datadog サポート][1]にお問い合わせください。

## Security Agent フレア {#security-agent-flare}

[Agent フレア][3]と同様に、必要なトラブルシューティング情報を 1 つのフレアコマンドで Datadog のサポートチームに送信できます。

フレアはアップロード前に確認を求めるので、Security Agent が送信する前にコンテンツを確認することができます。

以下のコマンドで、`<CASE_ID>` を実際の Datadog サポートケース ID (ある場合) に置き換え、それに紐付けされているメールアドレスを入力します。

ケース ID がない場合は、Datadog へのログインに使用するメールアドレスを入力してサポートケースを開きます。

| プラットフォーム     | コマンド                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent security-agent flare <CASE_ID>`                      |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c security-agent -- security-agent flare <CASE_ID>`   |
| ホスト         | `sudo /opt/datadog-agent/embedded/bin/security-agent flare <CASE_ID>`               |

## Agent セルフテスト {#agent-self-tests}

Workload Protection がシステムイベントを検出できることを確認するには、次のコマンドを実行してセルフテストを手動でトリガーします。

| プラットフォーム     | コマンド                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent system-probe runtime self-test`                    |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c system-probe -- system-probe runtime self-test` |
| ホスト         | `sudo /opt/datadog-agent/embedded/bin/system-probe runtime self-test`             |

セルフテスト手順では、いくつかの一時ファイルとそれを監視するルールを作成し、そのルールをトリガーして、イベントが正しく伝搬されることを確認します。

ルールが伝搬されると、次のような応答が表示されます。

```
Runtime self test: OK
```

イベントは {{< ui >}}Events Explorer{{< /ui >}} に表示されます。

## カスタム Kubernetes ネットワークプラグインとの互換性 {#compatibility-with-custom-kubernetes-network-plugins}

Workload Protection のネットワークベースの検出は、Linux カーネルのトラフィック制御サブシステムに依存しています。このサブシステムは、複数のベンダーが "clsact" ingress qdisc でフィルターの挿入、置換、または削除を試みた場合に、競合状態を引き起こすことが知られています。以下のチェックリストを使用して、Workload Protection が正しく構成されているかどうかを確認します。

- ベンダーが eBPF トラフィック制御クラシファイアを使用しているかどうかチェックしてください。そうでない場合は、このパラグラフを無視してかまいません。
- ネットワークパケットへのアクセスを許可した後、ベンダーが TC_ACT_OK または TC_ACT_UNSPEC を返しているかどうかをチェックしてください。TC_ACT_UNSPEC を返す場合は、このパラグラフを無視してかまいません。
- ベンダーの eBPF クラシファイアがどの優先度に設定されているかをチェックしてください。
  - 優先度 1 を使用している場合、Workload Protection のネットワーク検出がコンテナ内で機能しません。
  - 優先度 2~10 を使用している場合は、`runtime_security_config.network.classifier_priority` を、必ずベンダーが選択した優先度より小さい数値に構成してください。
  - 優先度 11 以上を使用している場合は、このパラブラフを無視してかまいません。

たとえば、Cilium 1.9 以下と Datadog Agent (バージョン 7.36 から 7.39.1、7.39.2 を除く) との間には、新しい Pod を起動した際に発生する可能性のある既知の競合が存在します。この競合により、Cilium の構成によっては、Pod 内の接続が失われる可能性があります。

最終的に、Datadog Agent やサードパーティベンダーが問題の発生を防ぐように構成できない場合は、以下の手順で Workload Protection のネットワークベースの検出を無効化する必要があります。

- ホストベースのインストールでは、`system-probe.yaml` 構成ファイルに以下のパラメーターを追加します。

```yaml
runtime_security_config:
  network:
    enabled: false
```
- パブリック Helm Chart を使用して Datadog Agent をデプロイしている場合は、以下の値を追加します。

```yaml
datadog:
  securityAgent:
    runtime:
      network:
        enabled: false
```
- Datadog Agent コンテナを手動でデプロイしている場合は、以下の環境変数を追加します。

```bash
DD_RUNTIME_SECURITY_CONFIG_NETWORK_ENABLED=false
```

## Kubernetes リモートセッションまたは Pod アドミッションの障害のトラブルシューティング {#troubleshooting-kubernetes-remote-session-or-pod-admission-disruptions}

Workload Protection は Kubernetes ユーザー ID を収集し、インフラストラクチャーへのリモートアクセスとワークロードによって生成されたアクティビティを区別するために必要なコンテキストを使用して Workload Protection イベントをエンリッチします。このインテグレーションは、`kubectl exec` セッションをインスツルメントするために [Kubernetes Mutating Webhook][2] に依存しています。このインスツルメンテーションが Pod のアドミッションや `kubectl exec` セッションの作成を妨げる場合は、以下の手順でこの機能を無効にしてください。

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. `datadog-agent.yaml` ファイルの `spec` セクションに以下を追加します。

    ```yaml
    # datadog-agent.yaml file
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      features:
        # Integrate with Kubernetes to enrich Workload Protection events with Kubernetes user identities
        admissionController:
          cwsInstrumentation:
            enabled: false
    ```

2. 変更を適用し、Agent を再起動します。

{{% /tab %}}

{{% tab "Helm" %}}

1. `datadog-values.yaml` ファイルの `datadog` セクションに以下を追加します。

    ```yaml
    # datadog-values.yaml file

    # Integrate with Kubernetes to enrich Workload Protection events with Kubernetes user identities
    clusterAgent:
      admissionController:
        cwsInstrumentation:
          enabled: false
    ```

2. Agent を再起動します。

{{% /tab %}}

{{% tab "DaemonSet" %}}

1. (任意) `cluster-agent-deployment.yaml` ファイル内の `cluster-agent` の `env` セクションに、以下の設定を追加します。

    ```bash
      # Source: datadog/templates/cluster-agent-deployment.yaml
      apiVersion:app/1
      kind: Deployment
      [...]
      spec:
        [...]
        template:
          [...]
          spec:
            [...]
            containers:
            [...]
              - name: cluster-agent
                [...]
                env:
                  - name: DD_RUNTIME_ADMISSION_CONTROLLER_CWS_INSTRUMENTATION_ENABLED
                    value: "false"
    ```

{{% /tab %}}
{{< /tabs >}}

## Workload Protection を無効にする {#disable-workload-protection}

Workload Protection を無効にするには、お使いの Agent プラットフォームの手順に従ってください。

### Helm {#helm}

Helm `values.yaml` で、`securityAgent.runtime` を以下のように `enabled: false` に設定します。

{{< code-block lang="yaml" filename="values.yaml" disable_copy="false" collapsible="true" >}}

# values.yaml file
datadog:

# Set to false to Disable CWS
securityAgent:
  runtime:
    enabled: false
{{< /code-block >}}

### Daemonset/Docker {#daemonsetdocker}

Daemonset の場合は、システムプローブと Security Agent の両方のデプロイメントに以下の環境変数の変更を適用します。

{{< code-block lang="json" filename="daemon.json" disable_copy="false" collapsible="true" >}}

DD_RUNTIME_SECURITY_CONFIG_ENABLED=false
{{< /code-block >}}

### ホスト {#host}

ランタイム構成を無効にするには、`system-probe.yaml` と `security-agent.yaml` を変更します。

1. `/etc/datadog-agent/system-probe.yaml` で Workload Protection を無効にします。`runtime_security_config` を `enabled: false` に設定します。
    {{< code-block lang="yaml" filename="system-probe.yaml" disable_copy="false" collapsible="true" >}}

    ##########################################
    ## Security Agent Runtime Configuration ##
    ##                                      ##
    ## Settings to send logs to Datadog are ##
    ## fetched from section `logs_config`   ##
    ## in datadog-agent.yaml                ##
    ##########################################

    runtime_security_config:
    ## @param enabled - boolean - optional - default: false
    ## Set to true to enable full Workload Protection.
    #
    enabled: false

    ## @param fim_enabled - boolean - optional - default: false
    ## Set to true to only enable the File Integrity Monitoring feature.
    # fim_enabled: false

    ## @param socket - string - optional - default: /opt/datadog-agent/run/runtime-security.sock
    ## The full path of the unix socket where the security runtime module is accessed.
    #
    # socket: /opt/datadog-agent/run/runtime-security.sock
    {{< /code-block >}}
2. `/etc/datadog-agent/security-agent.yaml` で Workload Protection を無効にします。`runtime_security_config` を `enabled: false` に設定します。
    {{< code-block lang="yaml" filename="security-agent.yaml" disable_copy="false" collapsible="true" >}}

    ##########################################
    ## Security Agent Runtime Configuration ##
    ##                                      ##
    ## Settings to send logs to Datadog are ##
    ## fetched from section `logs_config`   ##
    ## in datadog-agent.yaml                ##
    ##########################################

    runtime_security_config:
    ## @param enabled - boolean - optional - default: false
    ## Set to true to enable the Security Runtime Module.
    #
    enabled: false

    ## @param socket - string - optional - default: /opt/datadog-agent/run/runtime-security.sock
    ## The full path of the unix socket where the security runtime module is accessed.
    #
    # socket: /opt/datadog-agent/run/runtime-security.sock
    {{< /code-block >}}
3. Agent を再起動します。

[1]: /ja/help/
[2]: https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/
[3]: /ja/agent/troubleshooting/send_a_flare/?tab=agent