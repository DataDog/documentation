---
further_reading:
- link: /tracing
  tag: ドキュメント
  text: APM について
- link: /error_tracking/guides/enable_infra
  tag: ガイド
  text: Enable Infrastructure Monitoring
title: APM を有効にする
---

[Datadog アプリケーション パフォーマンス モニタリング (APM)][1] は、アプリケーションの動作を詳細に可視化し、パフォーマンス ボトルネックの特定、問題のトラブルシューティング、サービスの最適化を支援します。このガイドでは、スタンドアロン バックエンド エラー トラッキングに加えて APM を有効化し、その機能を活用できるように Datadog Agent の設定を更新する方法を説明します。

{{< tabs >}}
{{% tab "Linux ホストまたは VM" %}}

If your agent is deployed on a Linux host, the configuration update depends on the method you used to install the agent.

{{< collapse-content title="Single Step Instrumentation" level="h5" >}}
For a Datadog agent installed using the one-line installation command:

1. Open the [datadog.yaml configuration file][2].
2. `enable_payloads` と `error_tracking_standalone` 属性を削除します:

   ```diff
   - # Configuration to prevent sending metric data so that hosts don't show up in Datadog.
   - enable_payloads:
   -   series: false
   -   events: false
   -   service_checks: false
   -   sketches: false

     # Configuration to enable the collection of errors so they show up in Error Tracking.
     apm_config:
       enabled: true
   -   error_tracking_standalone:
   -     enabled: true
   ```

3. [Agent を再起動します][3]。
   {{< /collapse-content >}}

{{< collapse-content title="Using Datadog tracing libraries" level="h5" >}}
For a Datadog agent configured manually for Backend Error Tracking:

1. Open the [datadog.yaml configuration file][2].
2. `core_agent` と `error_tracking_standalone` 属性を削除します:

   ```diff
   - core_agent:
   -   enabled: false
     apm_config:
   +   enabled: true
   -   error_tracking_standalone:
   -     enabled: true
   ```

3. [Agent を再起動します][3]。
   {{< /collapse-content >}}

[2]: /ja/agent/configuration/agent-configuration-files
[3]: /ja/agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Kubernetes" %}}

Agent を Kubernetes にデプロイしている場合は、Agent のインストール方法に応じて Datadog Operator または Helm で設定を更新する必要があります。

{{< collapse-content title="Helm" level="h5" >}}
Helm でインストールした Datadog Agent の場合:

1. Update your `datadog-values.yaml` file, replacing the `site` and `env` values appropriately:

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
   -   errorTrackingStandalone:
   -     enabled: true
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

2. After making your changes, upgrade your Datadog Helm chart:
   ```shell
   helm upgrade -f datadog-values.yaml datadog-agent datadog/datadog
   ```
{{< /collapse-content >}}

{{< collapse-content title="Datadog Operator" level="h5" >}}
For a Datadog agent installed with the Datadog Operator:

1. Update your `datadog-agent.yaml` file, replacing the `site` and `env` values appropriately:
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
   -       errorTrackingStandalone:
   -         enabled: true
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

[1]: /ja/tracing