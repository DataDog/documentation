---
further_reading:
- link: /infrastructure
  tag: ドキュメント
  text: Infrastructure Monitoring について
- link: /error_tracking/guides/enable_apm
  tag: ガイド
  text: APM を有効にする
title: Infrastructure Monitoring を有効化する
---

[Infrastructure monitoring][1] には、ホスト、コンテナ、プロセスのパフォーマンスを可視化、監視、測定する Datadog の主要機能が含まれます。このガイドでは、Infrastructure monitoring を有効化し、スタンドアロンのバックエンド エラー トラッキングに加えてその機能を活用できるよう、Datadog Agent 設定を更新する方法を説明します。

{{< tabs >}}
{{% tab "Linux ホストまたは VM" %}}

Agent が Linux ホストにデプロイされている場合、設定の更新手順は Agent のインストール方法によって異なります。

{{< collapse-content title="Single Step Instrumentation" level="h5" >}}
1 行のインストール コマンドで Datadog Agent をインストールした場合:

1. Open the [datadog.yaml configuration file][2].
2. `enable_payloads` のトップ レベル属性を削除します:

   ```diff
   - enable_payloads:
   -   series: false
   -   events: false
   -   service_checks: false
   -   sketches: false

     apm_config:
       enabled: true
       error_tracking_standalone:
         enabled: true
   ```

3. [Agent を再起動します][3]。
   {{< /collapse-content >}}

{{< collapse-content title="Using Datadog tracing libraries" level="h5" >}}
Backend Error Tracking 用に Datadog Agent を手動で設定している場合:

1. Open the [datadog.yaml configuration file][2].
2. `core_agent` のトップ レベル属性を削除します:

   ```diff
   - core_agent:
   -   enabled: false
     apm_config:
       error_tracking_standalone:
         enabled: true
   ```

3. [Agent を再起動します][3]。
   {{< /collapse-content >}}

[2]: /ja/agent/configuration/agent-configuration-files
[3]: /ja/agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Kubernetes" %}}

Agent を Kubernetes にデプロイしている場合は、インストール方法に応じて Datadog Operator または Helm で設定を更新する必要があります。

{{< collapse-content title="Helm" level="h5" >}}
Helm で Datadog Agent をインストールした場合:

1. `datadog-values.yaml` ファイルを更新し、`site` と `env` の値を適切に置き換えます:

   ```diff
     agents:
       containers:
         agent:
           env:
             [...]
   -         - name: DD_CORE_AGENT_ENABLED
   -           value: "false"
     datadog:
   -   processAgent:
   -     enabled: false
   -     containerCollection: false
     apiKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     tags:
       - env:<AGENT_ENV>
     apm:
       errorTrackingStandalone:
         enabled: true
       # Required to enable Single-Step Instrumentation
       instrumentation:
         enabled: true
         libVersions:
           java: "1"
           dotnet: "3"
           python: "2"
           js: "5"
           php: "1"
   ```

2. 変更後、Datadog Helm chart をアップグレードします:
   ```shell
   helm upgrade -f datadog-values.yaml datadog-agent datadog/datadog
   ```
{{< /collapse-content >}}

{{< collapse-content title="Datadog Operator" level="h5" >}}
Datadog Operator で Datadog Agent をインストールした場合:

1. `datadog-agent.yaml` ファイルを更新し、`site` と `env` の値を適切に置き換えます:
   ```diff
     apiVersion: datadoghq.com/v2alpha1
     kind: DatadogAgent
     metadata:
       name: datadog
     spec:
       global:
         site: <DATADOG_SITE>
         tags:
           - env:<AGENT_ENV>
         credentials:
           apiSecret:
             secretName: datadog-secret
             keyName: api-key
         env:
   -       - name: DD_CORE_AGENT_ENABLED
   -         value: "false"
       features:
         apm:
           errorTrackingStandalone:
             enabled: true
           instrumentation:
             enabled: true
             libVersions:
               java: "1"
               dotnet: "3"
               python: "2"
               js: "5"
               php: "1"
   ```
2. 更新したコンフィギュレーションファイルで Datadog Agent をデプロイします。
   ```shell
   kubectl apply -f path/to/your/datadog-agent.yaml
   ```
{{< /collapse-content >}}

{{% /tab %}}
{{< /tabs >}}

[1]: /ja/infrastructure