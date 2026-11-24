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
  text: Single Step Instrumentation ルールを使用して、ホスト全体でサービスのトレーシングを管理する
title: Linux での Single Step APM インスツルメンテーション
type: multi-code-lang
---
## 概要 {#overview}

Linux ホストまたは VM 上では、APM 用の Single Step Instrumentation (SSI) を使用して Datadog Agent をインストールし、ワンステップで[アプリケーションをインスツルメント][4]します。追加の構成は不要です。

{{< skill-callout
    title="エージェントを使用して APM をセットアップする"
    text="Install the `dd-apm` skill in your AI coding agent for guided APM setup."
    action_name="copy_dd_apm_skill_install_cmd" >}}
npx skills add https://github.com/datadog-labs/agent-skills --skill dd-apm --full-depth -y
{{< /skill-callout >}}

## アプリケーションで APM を有効にする {#enable-apm-on-your-applications}

<div class="alert alert-info">続行する前に、<a href="https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/">SSI 互換性ガイド</a>を確認して、環境に互換性があることを確認してください。</div>

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

{{< img src="tracing/trace_collection/enable_apm.png" alt="Linux で Datadog Agent をインストールするためのアプリ内手順の「Agent カバレッジをカスタマイズする」セクション" style="width:100%;" >}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
ドロップダウンから SDK バージョンを選択するには、{{< ui >}}Customize Library Versions{{< /ui >}} をクリックします。

{{< img src="tracing/trace_collection/customize_library_versions.png" alt="Linux で Datadog Agent をインストールするための手順にある「ライブラリバージョンをカスタマイズする」ドロップダウン" style="width:100%;" >}}
{{< /site-region >}}

次に、生成されたコマンドをコピーして実行します。

### 既存の Agent のインストール {#existing-agent-installation}

Datadog agent がすでにインストールされている場合は、Datadog からリモートで SSI を有効にします。各ホストでコマンドを実行する必要はありません。

1. Datadog で、[**APM > サービスをインスツルメントする**][21]に移動します。

1. {{< ui >}}How do you want to instrument these hosts?{{< /ui >}} で {{< ui >}}Deploy on existing hosts{{< /ui >}} を選択し、Datadog agent 経由でリモートからサービスをインスツルメントします。

1. {{< ui >}}Which hosts should we instrument?{{< /ui >}} で、スコープフィルター ({{< ui >}}Environments{{< /ui >}}、{{< ui >}}Hostname{{< /ui >}}、{{< ui >}}APM enabled{{< /ui >}}) を使用してホストを絞り込みます。次に、{{< ui >}}Eligible for deployment{{< /ui >}} タブでインスツルメントする Agent を選択します。インスツルメントできないホストは {{< ui >}}Excluded from deployment{{< /ui >}} タブに表示されます。

1. {{< ui >}}Configure SDKs installation{{< /ui >}} で {{< ui >}}Yes{{< /ui >}} をクリックし、Datadog でトレーシング SDK が自動的にインストールされるようにします。最新バージョンではなく特定の SDK バージョンをピン留めするには、{{< ui >}}Customize library versions{{< /ui >}} を展開します。

1. {{< ui >}}Configure rollout strategy{{< /ui >}} で、一度にデプロイする Agent の割合を選択します。Datadog には、結果として生じるステージと推定所要時間が表示されます。Agent が 3 台連続で失敗した場合、または失敗が全体の 10% に達した場合、デプロイメントは自動的に一時停止します。デプロイメントは後から再実行できます。

1. {{< ui >}}Review and apply APM instrumentation{{< /ui >}} で {{< ui >}}Configuration Summary{{< /ui >}} を確認し ({{< ui >}}Summary{{< /ui >}} と {{< ui >}}YAML{{< /ui >}} を切り替えます)、{{< ui >}}Apply Instrumentation{{< /ui >}} をクリックします。

## インストールを検証する {#verify-the-installation}

1. Agent が実行されていることを確認します。

   ```shell
   sudo datadog-agent status
   ```

1. ホストで SSI インジェクションが有効になっていることを確認します。

   ```shell
   cat /etc/ld.so.preload && ls /opt/datadog-packages/ | grep apm
   ```

   `/etc/ld.so.preload` 内の APM インジェクターライブラリと、1 つ以上の `datadog-apm-*` パッケージが出力されます。

1. アプリケーションがトラフィックを受信した後、[APM サービスページ][23]にサービスが表示されることを確認します。数分以内に表示されない場合は、[SSI トラブルシューティングガイド][19]に従います。

## 統合サービスタグを構成する {#configure-unified-service-tags}

統合サービスタグ (UST) は、トレース、メトリクス、ログを通じて一貫したタグを適用し、監視可能性データのナビゲートと相関を容易にします。[Linux サービスの USTs を設定する][16]方法を参照してください。

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

インスツルメンテーションルールを使用すると、Linux ホスト上で SSI が自動的にインストルメントするプロセスを制御できます。各ルールはプロセス属性と照合され、一致するプロセスに対してインスツルメンテーションを許可またはブロックします。ルールをすべての対象ホストにデプロイすることも、1 つ以上の[ホストグループ](#create-host-groups)にスコープを絞って適用範囲を制限することもできます。

インスツルメンテーションルールを表示および管理するには、{{< ui >}}APM{{< /ui >}} > {{< ui >}}Instrument a Service{{< /ui >}} > [{{< ui >}}Instrumentation Rules{{< /ui >}}][20] に移動します。

{{< img src="tracing/trace_collection/apm-instrumentation-rules-for-hosts.png" alt="ホストが選択された APM インスツルメンテーションルールページ。インスツルメンテーションルールのリストの上に、デフォルトの動作、スコープ内のホスト、デプロイメントステータスカードが表示されています" style="width:100%;" >}}

#### インスツルメンテーションルールの前提条件 {#prerequisites-for-instrumentation-rules}

- **Agent**: 各ホストで v7.73 以降。SSI および [Remote Configuration][24] が有効であること。これらの要件を満たすホストが、インスツルメンテーションルールの対象となります。
- **権限**: インスツルメンテーションルールとホストグループの作成および管理に必要な **APM Workload Selection Write** [権限][25]。

#### デフォルトの動作を設定する {#set-the-default-behavior}

デフォルトの動作は、どのインスツルメンテーションルールにも一致しない対象ホスト上のプロセスに適用されます。また、ルールをまだ作成していない場合にも適用されます。

1. [インスツルメンテーションルール][102]ページで {{< ui >}}Default Behavior{{< /ui >}} カードに移動し、{{< ui >}}Edit{{< /ui >}} をクリックします。
1. 次のいずれかのオプションを選択します。
   - {{< ui >}}Allow everything else{{< /ui >}}: ルールでブロックされない限り、サポートされているアプリケーションがインストルメントされます。
   - {{< ui >}}Block everything else{{< /ui >}}: ルールで許可されない限り、アプリケーションはインストルメントされません。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

#### ホストグループを作成する {#create-host-groups}

ホストグループは、インスツルメンテーションルールのターゲットにできる再利用可能なホストのコレクションです。

ホストグループを作成するには、以下を実行します。

1. [インスツルメンテーションルール][20]ページで {{< ui >}}Hosts in Scope{{< /ui >}} カードに移動し、{{< ui >}}Manage host groups{{< /ui >}} をクリックします。
1. {{< ui >}}New Host Group{{< /ui >}} をクリックし、グループの名前を入力します。
1. {{< ui >}}Add Hosts{{< /ui >}} をクリックし、追加するホストを検索して選択します。ホスト名、ファセット、またはホストタグで検索できます。

   <div class="alert alert-info">ホストグループは動的であるため、検索条件に一致する新しいホストは自動的にグループに追加されます。1 つのホストが複数のグループに属することはできますが、グループ内のすべてのホストは、Linux や Windows など、同じプラットフォームで実行される必要があります。</div>

   {{< img src="tracing/trace_collection/instrumentation-rules-add-hosts.png" alt="ホストを追加するリストで 3 つのうち 2 つのホストが選択されている、新しいホストグループフォーム" style="width:80%;" >}}

1. {{< ui >}}Save Group{{< /ui >}} をクリックします。

Datadog は {{< ui >}}All hosts{{< /ui >}} グループを自動的に維持します。これには、他のグループに属していない対象ホストが一覧表示されるため、どのホストがグループ化されていないかを確認できます。ホストリストを編集することはできません。

ホストグループを削除すると、Datadog でそのグループのルールが削除され、Agent が次回 Remote Configuration をポーリングするときに、そのルールの適用が停止します。

ホストグループの順序を変更するには、グループリストでグループのハンドルを使用してグループをドラッグします。グループの順序は[インスツルメンテーションルールの評価方法](#how-instrumentation-rules-are-evaluated)に影響します。

{{< img src="tracing/trace_collection/instrumentation-rules-host-groups.png" alt="すべてのホストグループの上に Canary グループが表示され、Canary グループのホストが表示されている、ホストグループページ" style="width:100%;" >}}

#### インスツルメンテーションルールを作成する {#create-instrumentation-rules}

**注**: Bits AI を使用して、自然言語でインスツルメンテーションルールを作成できます。インスツルメントルールを作成するウィンドウで {{< ui >}}Generate with Bits{{< /ui >}} をクリックし、インスツルメンテーション対象のプロセスを記述します。Bits AI により対応するルールが生成されます。

インスツルメンテーションルールを作成するには、以下を実行します。

1. [インスツルメンテーションルール][102]ページで {{< ui >}}New Rule{{< /ui >}} をクリックします。または、ホストグループページでグループを選択し、その {{< ui >}}Rules{{< /ui >}} タブを開いて {{< ui >}}Create a new rule{{< /ui >}} をクリックします。
1. 1 つ以上の条件を定義し、{{< ui >}}Block Instrumentation{{< /ui >}} または {{< ui >}}Allow Instrumentation{{< /ui >}} を選択します。[ルール条件を定義する](#define-rule-conditions)セクションを参照してください。

   {{< img src="tracing/trace_collection/instrumentation-rules-create-rule.png" alt="Language equals Python の条件、インスツルメンテーションを許可するアクション、および Rule Impact Preview パネルが表示された、インスツルメンテーションルールを作成するウィンドウ" style="width:100%;" >}}

1. {{< ui >}}Set host targeting{{< /ui >}} で、{{< ui >}}All eligible hosts{{< /ui >}} または {{< ui >}}Select host groups{{< /ui >}} を選択します。

   複数のグループを選択した場合、それらのグループは 1 つのルールを共有します。後でそのルールを編集すると、選択したすべてのグループが更新されます。

   {{< img src="tracing/trace_collection/instrumentation-rules-host-targeting.png" alt="Select host groups が選択され、テストという名前のホストグループが選択された、ホストターゲティングを設定するステップ。" style="width:80%;" >}}

1. ルールに名前を付け、{{< ui >}}Next{{< /ui >}} をクリックします。
1. ルールを確認します。各ターゲットグループのルールリストの末尾に新しいルールが追加されます。必要に応じて、{{< ui >}}Set evaluation order{{< /ui >}} でルールをドラッグして、各グループ内の順序を変更します。[インスツルメンテーションルールの評価方法](#how-instrumentation-rules-are-evaluated)セクションを参照してください。

   {{< img src="tracing/trace_collection/instrumentation-rules-review-order.png" alt="ルールサマリーとテストホストグループ内のルールの評価順序が表示された、ルール確認ステップ" style="width:100%;" >}}

1. {{< ui >}}Create Rule{{< /ui >}} をクリックします。

Datadog は、50 秒以内にRemote Configuration を介して対象ホストへルールをデプロイします。ルールがデプロイされたら、影響を受けるサービスを再起動して変更を反映させます。インスツルメンテーションルール][20]ページの {{< ui >}}Deployment Status{{< /ui >}} カードに、現在のルールを受信した対象ホストの数が表示されます。

Remote Configuration が有効になっていないホストなどでルールを手動で適用するには、ルールリストの上にある {{< ui >}}Export{{< /ui >}} をクリックして構成ファイルをエクスポートし、それをホストに適用します。

#### インスツルメンテーションルールの評価方法 {#how-instrumentation-rules-are-evaluated}

Datadog は各プロセスに対して以下の順序でインスツルメンテーションルールを評価し、最初に一致したルールを適用します。

1. プロセスのホストが属するグループのルール (グループ順に上から下へ)。各グループ内では、ルールは {{< ui >}}Set evaluation order{{< /ui >}} で設定された順序で評価されます。
1. {{< ui >}}All eligible hosts{{< /ui >}} をターゲットとするルール。これらのルールは、ホストグループ内のホストを含むすべての対象ホストに適用されます。

一致するルールがない場合は、[デフォルトの動作](#set-the-default-behavior)が適用されます。

#### ルール条件を定義する {#define-rule-conditions}

各ルールは 1 つ以上の条件で構成されます。ルールが適用されるには、プロセスがそのルールのすべての条件に一致している必要があります。条件には以下の要素が含まれます。
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

インスツルメンテーションルールの適用方法を示す以下の例を確認してください。

{{% collapse-content title="例 1: 特定のプロセスを除くすべてのプロセスをインスツルメントする" level="h5" %}}

デフォルトですべてのプロセスをインスツルメントします。分析用の cron ジョブや Java バッチプロセッサなど、価値のないノイズを追加するサービスを除外するために、ブロックルールを追加します。

1. デフォルトの動作を {{< ui >}}Allow everything else{{< /ui >}} に設定します。
1. それぞれ {{< ui >}}All eligible hosts{{< /ui >}} をターゲットとする以下のルールを作成します。

   | ルール名 | 条件 | アクション |
   | --------- | --------- | ------ |
   | 分析用の cron ジョブを除外する | <code>Working Directory</code> <code>contains</code> <code>analytics-service</code> | インスツルメンテーションをブロックする |
   | バッチサービスを除外する | <code>Entry Point File</code> <code>contains</code> <code>batch-processor.jar</code> | インスツルメンテーションをブロックする |

{{% /collapse-content %}}

{{% collapse-content title="例 2: 特定のプロセスのみをインスツルメントする" level="h5" %}}

デフォルトですべてのインスツルメンテーションをブロックします。特定のプロセスを APM にオプトインさせるために、許可ルールを追加します。

例えば、チェックアウトサービスとカスタマーポータルにのみインスツルメンテーションを適用するには、以下を実行します。

1. デフォルトの動作を {{< ui >}}Block everything else{{< /ui >}} に設定します。
1. それぞれ {{< ui >}}All eligible hosts{{< /ui >}} をターゲットとする以下のルールを作成します。

   | ルール名 | 条件 | アクション |
   | --------- | --------- | ------ |
   | チェックアウトサービス | <code>Working Directory</code> <code>equals</code> <code>/srv/checkout</code> | インスツルメンテーションを許可する |
   | カスタマーポータル | <code>Working Directory</code> <code>equals</code> <code>/srv/customer-portal</code> | インスツルメンテーションを許可する |

{{% /collapse-content %}}

{{% collapse-content title="例 3: ホストグループを使用してインスツルメンテーションを段階的にロールアウトする" level="h5" %}}

デフォルトですべてのインスツルメンテーションをブロックし、少数の canary ホストでのみ許可します。結果を検証した後、グループにホストを追加するか、すべての対象ホストをターゲットにするようにルールを変更します。

1. デフォルトの動作を {{< ui >}}Block everything else{{< /ui >}} に設定します。
1.  <code>canary</code> という名前のホストグループを作成し、インスツルメントするホストを追加します。
1. 次の設定でルールを作成します。

   | 設定 | 値 |
   | ------- | ----- |
   | 条件 | <code>Language</code> <code>equals</code> <code>python</code> |
   | アクション | インスツルメンテーションを許可する |
   | ホストのターゲティング | ホストグループを選択:<code>canary</code> |

ホスト上の Python アプリケーション ( <code>canary</code> グループ内) のみがインスツルメントされます。その他のすべてのアプリケーションはインスツルメントされません。

{{% /collapse-content %}}

## シングルステップ APM インスツルメンテーションを Agent から削除する {#remove-single-step-apm-instrumentation-from-your-agent}

インフラストラクチャー上のすべてのサービスのトレース生成を停止するには、以下の手順を実行します。

1. 以下を実行します。
   ```shell
   dd-host-install --uninstall
   ```
2. ホストまたは VM 上のサービスを再起動します。

## トラブルシューティング{#troubleshooting}

SSI で APM を有効にする際に問題が発生した場合は、[SSI トラブルシューティングガイド][19]を参照してください。

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
[21]: https://app.datadoghq.com/apm/instrumentation
[22]: https://app.datadoghq.com/organization-settings/api-keys
[23]: https://app.datadoghq.com/apm/services
[24]: /ja/remote_configuration/
[25]: /ja/account_management/rbac/permissions/