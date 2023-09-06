---
is_beta: true
kind: ドキュメント
title: シングルステップ APM インスツルメンテーション
---

<div class="alert alert-info">
<strong>シングルステップ APM インスツルメンテーションはベータ版です！</strong> <p>この機能は、Datadog Agent の最新バージョンでご利用いただけます。</p>
<ul>
<li>Linux ホストおよび VM 上</li>
<li>Docker コンテナ上</li>
</ul>
<p>x86_64 アーキテクチャのみで、Java、Python、Ruby、Node.js、.NET のサービスのトレーシングをサポートしています。ぜひお試しください！</p> 

<p>Kubernetes デプロイの場合、Java、Python、Node.js、.NET、Ruby のサービスのトレーシングに非公開ベータ版をご利用いただけます。<a href="http://dtdg.co/apm-onboarding">このフォームにご記入の上、アクセスをリクエストしてください</a>。</p>
</div>

## ワンステップでサービス上で APM を有効にする

*Enable APM Instrumentation (ベータ版)** オプションを選択した状態で、[Datadog Agent をインストールまたは更新][1]した場合、Agent は (`DD_APM_INSTRUMENTATION_ENABLED` パラメーターを使って) APM を有効にし、自動インスツルメンテーションのための Datadog トレーシングライブラリをコードに挿入するようにインストールと構成が行われます。追加のインストールや構成の手順は不要です。このインスツルメンテーションを有効にするには、サービスを再起動します。

以下の例では、インフラストラクチャーのタイプごとに、どのように機能するかを示します。

{{< tabs >}}
{{% tab "Linux ホストまたは VM" %}}

たとえば、Ubuntu ホストの場合

1. 1 行のインストールコマンドを実行します。

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE=”<YOUR_DD_SITE>” DD_APM_INSTRUMENTATION_ENABLED=host bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)”
   ```
   これにより、APM および[リモート構成][1]を有効にした状態で Agent のインストール、構成、起動が行われ、ホストまたは VM 上のすべてのサービスの自動インスツルメンテーションのためにライブラリ挿入が設定されます。
2. ホストまたは VM 上のサービスを再起動します。
3. [Datadog でサービスのパフォーマンスの観測可能性を確認][2]します。

[1]: /ja/agent/remote_config
[2]: /ja/tracing/service_catalog/

{{% /tab %}}

{{% tab "Docker" %}}

たとえば、Docker Linux コンテナの場合

1. ライブラリインジェクターをインストールします。
   ```shell
   DD_APM_INSTRUMENTATION_ENABLED=docker bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
   ```
2. Docker で Agent を構成します。
   ```shell
   docker run -d --name dd-agent \  
     -e DD_API_KEY=${DD_API_KEY} \
     -e DD_APM_ENABLED=true \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
     -v /opt/datadog/apm:/opt/datadog/apm \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     gcr.io/datadoghq/agent:7
   ```

3. Docker コンテナを再起動します。
4. [Datadog でサービスのパフォーマンスの観測可能性を確認][2]します。

[1]: /ja/agent/remote_config
[2]: /ja/tracing/service_catalog/

{{% /tab %}}

{{< /tabs >}}


## シングルステップ APM インスツルメンテーションを Agent から削除する

特定のサービスや、ホスト、VM、またはコンテナ上のすべてのサービスについてトレースデータを収集したくない場合は、該当のインフラストラクチャー上で次のいずれかのコマンドを実行し、APM インスツルメンテーションを削除します。

### 特定のサービスについてインスツルメンテーションを削除する

次のコマンドを実行し、サービスを再起動して、サービスに対するライブラリの挿入を停止し、当該サービスからのトレースの生成を停止します。


{{< tabs >}}
{{% tab "Linux ホストまたは VM" %}}

1. 環境変数 `DD_INSTRUMENT_SERVICE_WITH_APM` をサービス起動コマンドに追加します。

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. サービスを再起動します。

{{% /tab %}}

{{% tab "Docker" %}}

1. 環境変数 `DD_INSTRUMENT_SERVICE_WITH_APM` をサービス起動コマンドに追加します。
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false
   ```
2. サービスを再起動します。
{{% /tab %}}

{{< /tabs >}}

### インフラストラクチャー上のすべてのサービスについて APM を削除する

次のコマンドを実行し、インフラストラクチャーを再起動して、ライブラリインジェクターを削除し、トレースの生成を停止します。

{{< tabs >}}
{{% tab "Linux ホストまたは VM" %}}

1. 次を実行します。
   ```shell
   dd-host-install --uninstall
   ```
2. ホストを再起動します。

{{% /tab %}}

{{% tab "Docker" %}}

1. 次を実行します。
   ```shell
   dd-container-install --uninstall
   ```
2. コンテナを再起動します。
{{% /tab %}}

{{< /tabs >}}



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /ja/tracing/services/