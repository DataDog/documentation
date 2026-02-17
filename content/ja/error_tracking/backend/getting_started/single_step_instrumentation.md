---
aliases:
- /ja/error_tracking/standalone_backend/getting_started/single_step_instrumentation
further_reading:
- link: /error_tracking/issue_states/
  tag: ドキュメント
  text: Error Tracking の問題の状態とワークフロー
- link: /error_tracking/explorer
  tag: ドキュメント
  text: エラートラッキングエクスプローラーについて
- link: /error_tracking/guides/enable_infra
  tag: ガイド
  text: インフラストラクチャー モニタリングを有効化
- link: /error_tracking/guides/enable_apm
  tag: ガイド
  text: APM を有効にする
title: バックエンド エラー トラッキングのための Single Step Instrumentation
---

## 概要

スタンドアロンのバックエンド エラー トラッキングを有効化するには、**Enable APM Instrumentation** と **Error Tracking Standalone** のオプションを指定して Datadog Agent をインストールまたは更新します。
これにより、追加のインストールや設定手順なしで、アプリケーションを自動的にインスツルメントできます。

## スタンドアロン バックエンド エラー トラッキングをインストール

以下の例は、それぞれのデプロイメントタイプでどのように動作するかを示します。

{{< tabs >}}
{{% tab "Linux ホストまたは VM" %}}

Linux ホストの場合:

1. 1 行のインストールコマンドを実行します。

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:2,js:5,dotnet:3,php:1" DD_APM_ERROR_TRACKING_STANDALONE=true DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   `<YOUR_DD_API_KEY>` をお使いの [Datadog API キー][1] に、`<YOUR_DD_SITE>` をお使いの [Datadog サイト][2] に、そして `<AGENT_ENV>` を Agent がインストールされている環境に置き換えます (例: `staging`)。
2. ホストまたは VM 上のサービスを再起動します。

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/getting_started/site/

{{% /tab %}}

{{% tab "Kubernetes" %}}

次のいずれかの方法で Agent をインストールすると、バックエンド エラー トラッキングを有効化できます:

- Datadog オペレーター
- Datadog Helm chart

<div class="alert alert-info">Single Step Instrumentation は、Datadog Agent をインストールしたネームスペース内のアプリケーションをインスツルメントしません。アプリケーションを実行しない別のネームスペースを作成し、そこに Datadog Agent をインストールすることが推奨されます。</div>

### 要件

- Kubernetes v1.20+
- Datadog Operator をデプロイするための [Helm][3]。
- Datadog Agent をインストールするための [Kubectl CLI][4]。

{{< collapse-content title="Datadog Operator でのインストール" level="h4" >}} Datadog Operator を使用してクラスター全体で Single Step Instrumentation を有効化するには、次の手順に従います。これにより、サポート対象の言語で記述されたすべてのアプリケーションでトレースが有効になります。


1. Helm を使用して [Datadog Operator][7] v1.14.0+ をインストールします:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   helm install my-datadog-operator datadog/datadog-operator
   ```
2. Datadog の [API キー][5] を保存する Kubernetes Secret を作成します:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<YOUR_DD_API_KEY>
   ```
3. Datadog Agent のデプロイ構成を含む `datadog-agent.yaml` を作成します。もっとも簡単な設定は以下のとおりです。
   ```yaml
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
         - name: DD_CORE_AGENT_ENABLED
           value: "false"
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
   `<DATADOG_SITE>` をお使いの [Datadog サイト][6] に、`<AGENT_ENV>` を Agent がインストールされている環境に置き換えます (例: `env:staging`)。
4. 次のコマンドを実行します。
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
5. Datadog Cluster Agent の変更が反映されるまで数分待ち、アプリケーションを再起動します。
{{< /collapse-content >}}

{{< collapse-content title="Helm でのインストール" level="h4" >}}
Helm を使用してクラスター全体で Single Step Instrumentation を有効化するには、次の手順に従います。これにより、サポート対象の言語で記述されたすべてのアプリケーションでトレースが有効になります。


1. Helm Datadog リポジトリを追加します。
   ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. Datadog の [API キー][5] を保存する Kubernetes Secret を作成します:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<YOUR_DD_API_KEY>
   ```
3. `datadog-values.yaml` を作成し、以下の構成を追加します。
   ```yaml
   agents:
     containers:
       agent:
         env:
           - name: DD_CORE_AGENT_ENABLED
             value: "false"
   datadog:
     processAgent:
       enabled: false
       containerCollection: false
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
   `<DATADOG_SITE>` をお使いの [Datadog サイト][6] に、`<AGENT_ENV>` を Agent がインストールされている環境に置き換えます (例: `env:staging`)。
4. 次のコマンドを実行して Agent をデプロイします:
   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```
5. Datadog Cluster Agent の変更が反映されるまで数分待ち、アプリケーションを再起動します。

{{< /collapse-content >}}

[3]: https://v3.helm.sh/docs/intro/install/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /ja/getting_started/site/
[7]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}