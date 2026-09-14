---
aliases:
- /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/linux/
code_lang: linux
code_lang_weight: 0
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: ドキュメント
  text: ランタイムメトリクスを有効にする
- link: https://www.datadoghq.com/blog/single-step-instrumentation-rules/
  tag: ブログ
  text: Single Step Instrumentation ルールを使用して、ホスト全体でサービスのトレーシングを管理します。
title: Linux での Single Step APM インスツルメンテーション
type: multi-code-lang
---
## 概要 {#overview}

Linux ホストまたは VM 上では、APM 用の Single Step Instrumentation (SSI) を使用して Datadog Agent をインストールし、ワンステップで [アプリケーションをインスツルメント][4] します。追加の構成は不要です。

{{< skill-callout
    title="agent を使用して APM をセットアップする"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## アプリケーションで APM を有効にする {#enable-apm-on-your-applications}

<div class="alert alert-info">続行する前に、<a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">続行する前に、SSI 互換性ガイド</a>を確認して、環境に互換性があることを確認してください。</div>

### 新しい Agent インストール {#new-agent-installation}

Datadog Agent がまだインストールされていない場合は、Agent をインストールし、SSI をワンステップで有効にします。

1. Linux ホストまたは VM で次のコマンドを実行します。

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> \
   DD_SITE="{{< region-param key="dd_site" >}}" \
   DD_APM_INSTRUMENTATION_ENABLED=host \
   bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][22]. The command installs or updates the Agent and the SSI packages.

   By default, SSI installs the latest SDK versions. To pin specific versions, add the `DD_APM_INSTRUMENTATION_LIBRARIES` variable with comma-separated `language:major` pairs. Available versions are listed in the source repositories for each language: [Java][8] (`java`), [Node.js][9] (`js`), [Python][10] (`python`), [.NET][11] (`dotnet`), [Ruby][12] (`ruby`), [PHP][13] (`php`).

1. Restart your applications.

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

#### Generate the command from Datadog 

To get a command pre-filled with your API key and site, go to the [Install the Datadog Agent on Linux][15] page and turn on {{< ui >}}Application Performance Monitoring{{< /ui >}} under {{< ui >}}Core Observability{{< /ui >}}.

{{< img src="tracing/trace_collection/enable_apm.png" alt="Linux で Datadog Agent をインストールするためのアプリ内手順の「Agent カバレッジのカスタマイズ」セクション" style="width:100%;" >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
ドロップダウンから SDK バージョンを選択するには、{{< ui >}}Customize Library Versions{{< /ui >}} をクリックします。

{{< img src="tracing/trace_collection/customize_library_versions.png" alt="Linux で Datadog Agent をインストールするための手順にある「ライブラリバージョンのカスタマイズ」ドロップダウン" style="width:100%;" >}}
{{< /site-region >}}

次に、生成されたコマンドをコピーして実行します。

### 既存の Agent のインストール {#existing-agent-installation}

Datadog Agent がすでにインストールされている場合は、ホスト上で [新しい Agent のインストール](#new-agent-installation)から Agent インストールコマンドを再度実行します。このコマンドは、既存の Agent を更新し、SSI を有効にします。

または、Fleet Automation を使用して Datadog から SSI を有効にします。

1. Datadog で、[**Fleet Automation > Configuration**][21] に移動します。
1. {{< ui >}}Configure Agents{{< /ui >}} をクリックします。
1. フィルターを適用して、構成する Agent を選択し、**ext** をクリックします。

   {{< img src="tracing/trace_collection/filter-agents.png" alt="環境、オペレーティングシステム、ホスト名ごとにスコープを設定するオプションがある、Fleet Automation のエージェントフィルタリング画面" style="width:100%;" >}}

1. {{< ui >}}Application Performance Monitoring (APM){{< /ui >}} タイルをクリックし、{{< ui >}}Next{{< /ui >}} をクリックします。

   {{< img src="tracing/trace_collection/select-products-core-obs.png" alt="Application Performance Monitoring (APM) タイルが表示されている Fleet Automation での製品選択画面" style="width:80%;" >}}

1. {{< ui >}}Configure SDKs Installation{{< /ui >}} 画面で {{< ui >}}Yes{{< /ui >}} をクリックして、SDK を自動的にインストールします。{{< ui >}}Use latest version{{< /ui >}} を選択するか、チェックを外して個別の SDK バージョンを指定します。

   {{< img src="tracing/trace_collection/configure-sdks-installation.png" alt="SDK の自動インストールを有効にしてバージョンを選択するオプションがある、Fleet Automation の SDK インストール設定画面" style="width:60%;" >}}

1. [**Next**] をクリックします。
1. 構成を確認し、{{< ui >}}Deploy Configuration{{< /ui >}} をクリックします。

## インストールを検証する {#verify-the-installation}

1. Agent が実行されていることを確認します。

   ```shell
   sudo datadog-agent status
   ```

1.  ホストで SSI インジェクションが有効になっていることを確認します。

   ```shell
   cat /etc/ld.so.preload && ls /opt/datadog-packages/ | grep apm
   ```

   `/etc/ld.so.preload` 内の APM インジェクターライブラリと、1 つ以上の `datadog-apm-*` パッケージが出力されます。

1. アプリケーションがトラフィックを受信した後、[APM Services ページ][23] にサービスが表示されることを確認します。数分以内に表示されない場合は、[SSI トラブルシューティングガイド][19] に従ってください。

## 統合サービスタグを構成する {#configure-unified-service-tags}

統合サービスタグ (UST) は、トレース、メトリクス、ログを通じて一貫したタグを適用し、監視可能性データのナビゲートと相関を容易にします。[Linux サービスの USTs を設定する][16] 方法を参照してください。

## SDK に依存する製品と機能を有効にする {#enable-sdk-dependent-products-and-features}

SSI がアプリケーションに Datadog SDK をロードし、分散トレーシングを有効にした後、SDK に依存する追加の製品を構成できます。

{{< ssi-products >}}

以下のいずれかのセットアップ方法を使用します。

- **[`application_monitoring.yaml` で構成する][18]**:

  アプリケーションのコマンドラインを変更することなく、ホスト上のすべてのサービスの製品と機能を構成します。

- **[環境変数を設定する][17]**:

  アプリケーション構成で環境変数を直接設定することにより製品を有効にします。

## 高度なオプション {#advanced-options}

### SDK バージョンを更新する {#update-sdk-version}

SDK バージョンは、Agent のインストールコマンドを実行したときに固定されます。

SDK バージョンを更新するには、以下の手順を実行します。

1. Agent インストールコマンドを再度実行します。このコマンドは、Agent を最新バージョンに更新することもできます。
1. アプリケーションを再起動します。

### インスツルメンテーションルールを定義する {#define-instrumentation-rules}

{{< site-region region="gov" >}}
<div class="alert alert-warning">インスツルメンテーションルールは、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
{{< /site-region >}}

インスツルメンテーションルール (Agent v7.73 以降で利用可能) を使用すると、Linux ホスト上で SSI によって自動的にインスツルメンテーションされるプロセスを制御できます。

インスツルメンテーションルールを構成するには、以下の手順を実行します。

1. Datadog で、{{< ui >}}APM{{< /ui >}} > {{< ui >}}Service Setup{{< /ui >}} > [{{< ui >}}Manage Instrumentation Rules{{< /ui >}}][20] に移動します。
1. {{< ui >}}Add or Edit Rules{{< /ui >}} をクリックします。
1. インスツルメンテーションルールを定義します。
   1. {{< ui >}}Add New Rule{{< /ui >}} をクリックし、{{< ui >}}Allow Rule{{< /ui >}} または {{< ui >}}Block Rule{{< /ui >}} を選択して、一致するプロセスをインスツルメンテーションするかどうかを指定します。
   1. ルールに名前を付けます。
   1. 1 つ以上の条件を追加します。詳細については、[ルール条件を定義する](#define-rule-conditions)を参照してください。

   {{< img src="tracing/trace_collection/define_instrumentation_rule.png" alt="ルールを定義するための構成オプションが表示されているインスツルメンテーションルール UI" style="width:100%;" >}}

1. (オプション) ルールをドラッグアンドドロップして並べ替えます。

   **注**: ルールは順番に評価されます。プロセスがルールに一致すると、それ以降のルールは無視されます。

1. どのルールにも一致しないプロセスのデフォルトの動作 (許可またはブロック) を設定します。
1. {{< ui >}}Next{{< /ui >}} をクリックしてルールをプレビューします。
1. {{< ui >}}Deploy Rules{{< /ui >}} をクリックします。

Remote Configuration が有効な場合、ルールはすべてのホストに展開され、SSI が有効なホストには 50 秒以内に適用されます。または、{{< ui >}}Export{{< /ui >}} をクリックして構成ファイルをエクスポートし、ホストに手動で適用します。

#### ルール条件を定義する {#define-rule-conditions}

各ルールは 1 つ以上の条件で構成されます。条件には以下の要素が含まれます。
- {{< ui >}}Attribute{{< /ui >}}: ルールが評価するプロセスプロパティ。
- {{< ui >}}Operator{{< /ui >}}: 比較ロジック (`equals`、`not equals`、`prefix`、または `contains`)。
- {{< ui >}}Value{{< /ui >}}: プロセス名やコマンドラインフラグなど、一致させるテキストまたはパターン。

サポートされている属性には以下が含まれます。
| 属性 | 説明 | 例 |
| --------- | ----------- | ------- |
| オペレーティングシステム | ホストの OS。| `linux` |
| 実行可能ファイル | プロセスの実行可能ファイル名。| `python3.11` |
| 実行可能ファイルの完全なパス | 実行可能ファイルの完全なパス。| `/usr/bin/python3.11` |
| 引数 | プロセスの起動に使用されるコマンドライン引数。| `--env=production` |
| 作業ディレクトリ | プロセスの作業ディレクトリ。| `/app` |
| 言語 | プロセスに対して検出されたプログラミング言語。| `python` |
| エントリーポイントファイル | アプリケーションの起動に使用される特定のファイル。| `app.py`、`server.js` |

#### 使用例 {#example-use-cases}

インスツルメンテーションルールの適用方法を示す以下の例をご確認ください。

{{< collapse-content title="例 1: 特定のプロセスを除くすべてのプロセスをインスツルメントする" level="h5" >}}

デフォルトですべてのプロセスをインスツルメントします。分析用の cron ジョブや Java バッチプロセッサなど、価値のないノイズを追加するサービスを除外するために、ブロックルールを追加します。

{{< img src="tracing/trace_collection/instrumentation-rules-example-1.png" alt="作業ディレクトリとエントリーポイントファイルの条件を対象とする 2 つのブロックインスツルメンテーションルール (デフォルトはインスツルメンテーションを許可)" style="width:100%;" >}}

{{< /collapse-content >}}

{{< collapse-content title="例 2: 特定のプロセスのみをインスツルメントする" level="h5" >}}

デフォルトですべてのインスツルメンテーションをブロックします。特定のプロセスを APM にオプトインさせるために、許可ルールを追加します。このアプローチは正確な制御を可能にし、段階的なロールアウトに適しています。

たとえば、チェックアウトサービスとカスタマーポータルのみをインスツルメンテーションするには、{{< ui >}}Working Directory{{< /ui >}} を使用して許可ルールを作成し、デフォルトの動作を {{< ui >}}Block Instrumentation{{< /ui >}} に設定します。

{{< img src="tracing/trace_collection/instrumentation-rules-linux-example-2.png" alt="特定の作業ディレクトリ内のサービスを対象とする 2 つの許可インスツルメンテーションルール (デフォルトはインスツルメンテーションをブロック)" style="width:100%;" >}}

{{< /collapse-content >}}

## シングルステップ APM インスツルメンテーションを Agent から削除する {#remove-single-step-apm-instrumentation-from-your-agent}

インフラストラクチャー上のすべてのサービスのトレース生成を停止するには、以下の手順を実行します。

1. 次を実行します。
   ```shell
   dd-host-install --uninstall
   ```
2. ホストまたは VM 上のサービスを再起動します。

## トラブルシューティング {#troubleshooting}

SSI で APM を有効にする際に問題が発生した場合は、[SSI トラブルシューティングガイド][19] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases
[13]: https://github.com/DataDog/dd-trace-php/releases
[14]: /ja/tracing/glossary/#instrumentation
[15]: https://app.datadoghq.com/fleet/install-agent/latest?platform=linux
[16]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes#non-containerized-environment
[17]: /ja/tracing/trace_collection/library_config/
[18]: /ja/tracing/trace_collection/library_config/application_monitoring_yaml/
[19]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[20]: https://app.datadoghq.com/apm/service-setup/workload-selection
[21]: https://app.datadoghq.com/fleet/agent-management
[22]: https://app.datadoghq.com/organization-settings/api-keys
[23]: https://app.datadoghq.com/apm/services