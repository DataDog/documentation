---
aliases:
- /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/docker
code_lang: docker
code_lang_weight: 10
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: ドキュメント
  text: ランタイムメトリクスを有効にする
title: Docker での Single Step APM インスツルメンテーション
type: multi-code-lang
---
## 概要{#overview}

Docker Linux コンテナ上では、APM 用の Single Step Instrumentation (SSI) を使用して Datadog Agent をインストールし、1 ステップで [アプリケーションをインスツルメンテーション][14] します。追加の構成は不要です。

{{< skill-callout
    title="エージェントを使用して APM をセットアップする"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## アプリケーションで APM を有効にする {#enable-apm-on-your-applications}

<div class="alert alert-info">続行する前に、<a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI 互換性ガイド</a>を確認して、環境に互換性があることを確認してください。</div>

Docker Linux 環境で Datadog Agent をインストールし SSI を有効にするには、Docker ホスト上で (アプリケーションコンテナ内ではなく) 以下のコマンドを実行します。

1. ホスト Agent をインストールせずに Docker インスツルメンテーションコンポーネントをインストールする:

   ```shell
   DD_APM_INSTRUMENTATION_ENABLED=docker \
   DD_NO_AGENT_INSTALL=true \
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

1. Agent コンテナを実行または再デプロイします。`<YOUR_DD_API_KEY>` をご使用の [Datadog API キー][1] に置き換えます:

   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=<YOUR_DD_API_KEY> \
     -e DD_SITE="{{< region-param key="dd_site" >}}" \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_ENABLED=true \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/var/run/datadog/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/var/run/datadog/dsd.socket \
     -v /var/run/datadog:/var/run/datadog \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     -v /proc/:/host/proc/:ro \
     -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
     -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
     registry.datadoghq.com/agent:7
   ```

   **Note**: Run only one Datadog Agent per node. If a Datadog Agent container already exists, update its definition (or your Docker Compose file) with these settings and recreate it, rather than starting a second Agent. For rootless Docker, set the correct Docker socket in `docker_config.yaml`.

1. Recreate your application containers.

   Instrumentation is applied when a container is created, so restarting an existing container with `docker stop` and `docker start` does not instrument it. Remove your application containers and run them again.

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

### Generate the command from Datadog 

To get a command pre-filled with your API key and site, go to the [Install the Datadog Agent on Docker][15] page. In the {{< ui >}}Customize my agent install command{{< /ui >}} section, go to {{< ui >}}Additional configuration{{< /ui >}} > {{< ui >}}Application Observability{{< /ui >}}, and turn on {{< ui >}}APM Instrumentation{{< /ui >}}. Then copy and run the generated command.

{{< img src="tracing/trace_collection/docker-apm-instrumentation-toggle.png" alt="Docker で Datadog Agent をインストールするためのアプリ内手順の「Agent インストールコマンドのカスタマイズ」セクション" style="width:100%;" >}}

## SDK トレーサーのバージョンを設定する {#set-sdk-tracer-versions}

デフォルトでは、Single Step Instrumentation は Datadog SDK の最新メジャーバージョンをインストールし、マイナーアップデートが利用可能になると自動的に適用します。

特定のバージョンに固定するには、コンポーネントのインストールコマンドに、カンマ区切りの `language:major` ペアを指定した `DD_APM_INSTRUMENTATION_LIBRARIES` 変数を追加します。利用可能なバージョンは、各言語のソースリポジトリに一覧があります。

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)
- [PHP][13] (`php`)

Datadog のドロップダウンからバージョンを選択することもできます。[Docker への Datadog Agent のインストール][15] ページで、{{< ui >}}APM Instrumentation{{< /ui >}} をオンにした後、{{< ui >}}Customize library versions{{< /ui >}} をクリックします。

{{< img src="tracing/trace_collection/apm-instrumentation-version-pinning.png" alt="Docker で Datadog Agent をインストールするための手順にある「ライブラリバージョンのカスタマイズ」ドロップダウン" style="width:100%;" >}}

## インストールの検証 {#verify-the-installation}

1. Docker デーモンが Datadog ランタイムを使用していることを確認します：

   ```shell
   docker system info --format '{{.DefaultRuntime}}'
   ```

   The output must be `dd-shim`. If it is `runc` or anything else, the instrumentation components did not install successfully, and your applications are not instrumented regardless of whether the Agent is healthy. Re-run the installation command, and confirm that the Docker daemon was running when you ran it.

1. Confirm the Agent container is running:

   ```shell
   docker ps --filter name=dd-agent
   ```

1. Agent が正常であり、APM Agent が稼働していることを確認します：

   ```shell
   docker exec dd-agent agent status
   ```

   出力の **APM Agent** セクションをチェックします。

1. アプリケーションコンテナが Datadog ランタイムを使用していることを確認します。`<CONTAINER_NAME>` をアプリケーションコンテナのいずれかの名前に置き換えます：

   ```shell
   docker inspect <CONTAINER_NAME> --format '{{.HostConfig.Runtime}}'
   ```

1. After your applications receive traffic, confirm your services appear on the [APM Services page][18]. If they don't appear within a few minutes, follow the [SSI troubleshooting guide][17].

## Configure Unified Service Tags 

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. Learn how to [set USTs for Docker services][16].

## Enable SDK-dependent products and features 

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK:

{{< ssi-products >}}

製品を有効にするには、アプリケーション構成で [環境変数を設定][3] してください。

## シングルステップ APM インスツルメンテーションを Agent から削除する {#remove-single-step-apm-instrumentation-from-your-agent}

特定のサービス、ホスト、VM、またはコンテナでトレースデータを収集したくない場合は、以下の手順を実行してください。

### 特定のサービスのインスツルメンテーションを削除する {#remove-instrumentation-for-specific-services}

特定のサービスの APM インスツルメンテーションを削除してトレース送信を停止する場合は：

1. `DD_INSTRUMENT_SERVICE_WITH_APM` 環境変数をサービス起動コマンドに追加します：
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. サービスを再起動します。

### インフラストラクチャー上のすべてのサービスについて APM を削除する {#remove-apm-for-all-services-on-the-infrastructure}

トレースの送信を停止するには、APM をアンインストールしてインフラストラクチャーを再起動してください:

1. 次を実行します。
   ```shell
   dd-container-install --uninstall
   ```
2. Docker を再起動します。
   ```shell
   systemctl restart docker
   ```
   または、環境に応じたコマンドを使用してください。

## トラブルシューティング {#troubleshooting}

SSI で APM を有効にする際に問題が発生した場合は、[SSI トラブルシューティングガイド][17] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/tracing/trace_collection/library_config/
[3]: /ja/tracing/trace_collection/library_config/
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-php/releases
[14]: /ja/tracing/glossary/#instrumentation
[15]: https://app.datadoghq.com/fleet/install-agent/latest?platform=docker
[16]: /ja/getting_started/tagging/unified_service_tagging/?tab=docker#containerized-environment
[17]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[18]: https://app.datadoghq.com/apm/services