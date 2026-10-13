---
description: Agent フレア、セルフテスト、ネットワークプラグインの互換性など、Workload Protection のトラブルシューティングを行います。
title: Workload Protection のトラブルシューティング
---
Workload Protection で問題が発生した場合は、下記のトラブルシューティングガイドラインを使用してください。さらにサポートが必要な場合は、[Datadog サポート][1]までお問い合わせください。

## Security Agent フレア {#security-agent-flare}

<div class="alert alert-warning">Agent <code>7.77</code>以降では、Workload Protection の <code>security-agent</code> ランタイムコンポーネントは非推奨となり、不要になりました。スタンドアロンの <code>security-agent flare</code> コマンドは、Security Agent プロセスが実行されていないと機能しません。コアの Agent <code>flare</code> コマンドを代わりに使用してください。</div>

[Agent フレア][3]と同様に、必要なトラブルシューティング情報を Datadog サポートチームに 1 つのフレアコマンドで送信できます。

フレアはアップロード前に確認を求めるため、Security Agent が送信する前に内容を確認できます。

下記のコマンドで、`<CASE_ID>` を Datadog サポートケース ID (ある場合) に置き換え、それに関連付けられているメールアドレスを入力してください。

ケース ID がない場合は、Datadog へのログインに使用するメールアドレスを入力してサポートケースを開いてください。

| プラットフォーム     | コマンド                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent security-agent flare <CASE_ID>`                      |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c security-agent -- security-agent flare <CASE_ID>`   |
| ホスト         | `sudo /opt/datadog-agent/embedded/bin/security-agent flare <CASE_ID>`               |

## Agent セルフテスト {#agent-self-tests}

Workload Protection がシステムイベントを検出できることを確認するには、次のコマンドを実行して手動でセルフテストをトリガーします。

| プラットフォーム     | コマンド                                                                             |
| --------     | -------                                                                             |
| Docker       | `docker exec -it datadog-agent system-probe runtime self-test`                    |
| Kubernetes   | `kubectl exec -it <POD_NAME> -c system-probe -- system-probe runtime self-test` |
| ホスト         | `sudo /opt/datadog-agent/embedded/bin/system-probe runtime self-test`             |

セルフテスト手順では、いくつかの一時ファイルとそれらを監視するためのルールが作成され、それらのルールがトリガーされてイベントが正しく伝播されることが確認されます。

ルールが伝播されると、次の応答が表示されます。

```
Runtime self test: OK
```

イベントは {{< ui >}}Events Explorer{{< /ui >}} に表示されます。

## カスタム Kubernetes ネットワークプラグインとの互換性 {#compatibility-with-custom-kubernetes-network-plugins}

Workload Protection のネットワークベースの検出は、Linux カーネルのトラフィック制御サブシステムに依存しています。このサブシステムは、複数のベンダーが「clsact」イングレス qdisc 上でフィルターの挿入、置換、または削除を試みると、競合状態を引き起こすことが知られています。Workload Protection が正しく構成されていることを確認するには、次のチェックリストを使用してください。

- ベンダーが eBPF トラフィック制御分類子を使用しているかどうかをチェックしてください。使用していない場合、この段落は無視してかまいません。
- ネットワークパケットへのアクセスを許可した後に、ベンダーが TC_ACT_OK またはTC_ACT_UNSPEC を返すかどうかをチェックしてください。TC_ACT_UNSPEC が返される場合、この段落は無視してかまいません。
- ベンダーが eBPF 分類子にどの優先度を割り当てているかをチェックしてください。
  - 優先度 1 を使用している場合、Workload Protection のネットワーク検出はコンテナ内で機能しません。
  - 優先度 2 から 10 を使用している場合、`runtime_security_config.network.classifier_priority` をベンダーが選択した優先度よりも厳密に小さい数値に設定してください。
  - 優先度 11 以上を使用している場合、この段落は無視してかまいません。

たとえば、Cilium 1.9 以下と Datadog Agent (バージョン 7.36 から 7.39.1、7.39.2を除く) の間には、新しい Pod が起動した際に発生する可能性のある既知の競合状態があります。この競合状態は、Cilium の設定方法によっては、Pod 内の接続喪失につながる可能性があります。

最終的に、Datadog Agent やサードパーティベンダーの設定でこの問題の発生を防げない場合は、下記の手順に従って Workload Protection のネットワークベースの検出を無効にしてください。

- ホストベースのインストールでは、`system-probe.yaml` 設定ファイルに次のパラメータを追加します。

```yaml
runtime_security_config:
  network:
    enabled: false
```
- パブリック Helm Chart を使用してDatadog Agent をデプロイしている場合は、次の値を追加します。

```yaml
datadog:
  securityAgent:
    runtime:
      network:
        enabled: false
```
- Datadog Agent コンテナを手動でデプロイしている場合は、次の環境変数を追加します。

```bash
DD_RUNTIME_SECURITY_CONFIG_NETWORK_ENABLED=false
```

## Kubernetes リモートセッションまたは Pod アドミッションの中断のトラブルシューティング{#troubleshooting-kubernetes-remote-session-or-pod-admission-disruptions}

Workload Protection は、Kubernetes ユーザーのアイデンティティを収集し、インフラストラクチャーへのリモートアクセスとワークロードによって生成されたアクティビティを区別するために必要なコンテキストを Workload Protection イベントに追加します。この統合では、[Kubernetes Mutating Webhook][2] を使用して `kubectl exec` セッションのインスツルメンテーションを行います。このインスツルメンテーションによって Pod のアドミッションや `kubectl exec` セッションの作成が中断される場合は、次の手順に従ってこの機能を無効にしてください。

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. `datadog-agent.yaml` ファイルの `spec` セクションに次の内容を追加します。

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

1. `datadog-values.yaml` ファイルの `datadog` セクションに次の内容を追加します。

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

1. (オプション) `cluster-agent-deployment.yaml` ファイルの `cluster-agent` の `env` セクションに次の設定を追加します。

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

## Workload Protection を無効にする{#disable-workload-protection}

Workload Protection を無効にするには、使用している Agent プラットフォームの手順に従ってください。

### Helm{#helm}

Helm の `values.yaml` で、次のように `securityAgent.runtime` を `enabled: false` に設定します。

{{< code-block lang="yaml" filename="values.yaml" disable_copy="false" collapsible="true" >}}

# values.yaml file
datadog:

# Set to false to Disable CWS
securityAgent:
  runtime:
    enabled: false
{{< /code-block >}}

### Daemonset/Docker {#daemonsetdocker}

Daemonset の System Probe と Security Agent の両方のデプロイメントに次の環境変数の変更を適用します。

{{< code-block lang="json" filename="daemon.json" disable_copy="false" collapsible="true" >}}

DD_RUNTIME_SECURITY_CONFIG_ENABLED=false
{{< /code-block >}}

### ホスト {#host}

`system-probe.yaml` と `security-agent.yaml` を変更してランタイム設定を無効にします。

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