---
disable_toc: false
further_reading:
- link: /getting_started/profiler/
  tag: ドキュメント
  text: Continuous Profiler の概要
- link: /integrations/guide/source-code-integration/
  tag: ドキュメント
  text: ソースコードインテグレーションについて説明します。
- link: https://www.jetbrains.com/lp/toolbox/
  tag: 外部サイト
  text: JetBrains Toolbox について説明します。
is_beta: true
kind: documentation
title: IntelliJ プラットフォーム用 Datadog プラグイン
---

{{< callout url="#" btn_hidden="true">}}
  IntelliJ IDEA および GoLand 用 Datadog プラグインが公開ベータ版になりました。これは、Java および Go サービスに<a href="https://docs.datadoghq.com/logs/explorer/">ログエクスプローラー</a>や <a href="https://docs.datadoghq.com/profiler/#pagetitle">Continuous Profiler</a> などの Datadog 製品を使用している開発者を対象としています。プラグインが予期せず動作しなくなった場合は、プラグインの更新を確認するか、<a href=#feedback>チームに連絡</a>してください。
{{< /callout >}}

## 概要

IntelliJ プラットフォーム (IDEA と GoLand) 用の Datadog プラグインは、リアルタイムの観測可能性データに基づいて IDE でコードレベルの有意義な洞察を提供することにより、ソフトウェアパフォーマンスの向上を支援します。

{{< img src="/developers/ide_integrations/idea/overview1.png" alt="IDEA で開いた Datadog ツールのウィンドウ" style="width:100%;" >}}

**Code Insights** ビューでは、次のような情報が得られます。
- [エラー追跡][6]からの問題
- Application Security Management による[脆弱性][8]レポート
- CI Visibilityで検出された[不安定なテスト][9]
- [Watchdog Insights][10] のプロファイリングインサイト

**Continuous Profiler** は、以下をハイライトすることで、レイテンシーを削減し、クラウドのコストを削減するのに役立ちます。
- 最も多くの CPU を消費するコードライン
- メモリを最も多く割り当てるコードライン
- ロック、ディスク I/O、ソケット I/O に最も多くの時間を費やしているコードライン

**Logs Navigation** サポートは、作業中のコンテキストに合ったビューで Datadog ログエクスプローラーを開きます。

## 要件

- **Datadog アカウント**: このプラグインを使用するには、Datadog のアカウントが必要です。Datadog が初めての方は、[Datadog Web サイト][3]で Datadog の観測可能性ツールの詳細と無料トライアルにサインアップしてください。
- **Continuous Profiler**: プロファイリングデータとインサイトを表示するには、プラグインを使用するサービスに Continuous Profiler が構成されている必要があります。詳細については、[Continuous Profiler の概要][2]を参照してください。
- **JetBrains Toolbox**: [View in IDE](#view-in-ide) 機能を使用するには、開発者のマシンに [JetBrains Toolbox][7] がインストールされている必要があります。

## セットアップ

### Datadog プラグインをインストールする

1. **Plugins** をクリックし、`Datadog` を検索します。
1. **Install** をクリックすると、プラグインがダウンロードされ、IDE にインストールされます。
1. Datadog がサードパーティのプラグインであることを通知するプロンプトが表示された場合、**Accept** をクリックします。
1. **Restart IDE** をクリックします。

{{< img src="/developers/ide_integrations/idea/marketplace.png" alt="Datadog プラグイン" style="width:100%;" >}}

または、[JetBrains Marketplace][4] からプラグインをインストールすることができます。

<span id="datadog_plugin_install_button"></span>

### Datadog にログインする

Datadog プラグインをインストールし、IDE を再起動した後、Datadog にログインします。
1. IDE でファイルまたはプロジェクトを開いた状態で、**Datadog** ツールウィンドウをクリックします。
1. **Log in...** をクリックします。
1. ブラウザで開いたウィンドウで、サイトと組織を選択し、プラットフォームへのアクセスを認可します。

**注**: ほとんどのユーザーにとって、必要なログインは 1 つだけです。複数の組織設定を使用している場合は、正しいアカウントがアクティブであることを確認してください。IDE がどのログインを使用しているかを確認するには、**Settings** -> **Tools** -> **Datadog** をクリックし、どのアカウントがアクティブになっているかを確認します。

### サービスのリンク

Datadog プラットフォームから関連データを提供するには、プロジェクトに関係サービスを追加します。
1. IDE でプロジェクトを開いた状態で、**Datadog** ツールウィンドウを開き、**Options** メニューから **Manage Linked Services...** を選択します。
1. 設定ダイアログが開きますので、プラスアイコン (**+**) をクリックします。
1. 現在のプロジェクトに追加したいサービスを検索して選択します。

サービスを削除するには、**Services** 表でサービスを選択し、マイナスアイコン (**-**) をクリックします。

<div class="alert alert-info">リンクされたサービスの名前は、プロジェクトを閉じても残ります。</div>

## コードインサイト
**Code Insights** タブには、Datadog プラットフォームによって生成された、現在のプロジェクトに関連するインサイトが表示されます。洞察は、パフォーマンス、信頼性、セキュリティの 3 つのカテゴリーに分類されます。

{{< img src="/developers/ide_integrations/idea/code-insights.png" alt="Code Insights タブ。" style="width:100%;" >}}

Code Insights には、各問題の詳細な説明と以下へのリンクが含まれています。
- 関連するソースコードの場所
- Datadog プラットフォーム (追加情報が得られます)

個々のインサイトを解除したり、フィルターを設定して、関心のあるインサイトのカテゴリーを表示することができます。

## Continuous Profiler

**Continuous Profiler** タブは、選択した環境におけるサービスのプロファイリング情報を、特定の時間枠で集計して表示します。利用可能なビューは次のとおりです。
- [トップリスト](#top-list): 現在のプロファイリングメジャーで最もリソースを消費するメソッドのリストを表示します。
- [フレームグラフ](#flame-graph): プロファイルのスタックトレースを表すフレームグラフ。

プロファイリングデータには、以下のパラメーターを指定することができます。
- 表示するプロファイルの種類
- サービスが動作している環境
- プロファイラーサンプルが集計されるまでの期間

利用可能なプロファイリングの種類は、通常、**CPU Time** や **Allocated Memory** などのオプションがありますが、プラットフォームによって決定され、言語によって変化します。

### Toplist

**Top List** サブタブには、Datadog サーバーから読み込まれた集計されたプロファイルデータに基づいて、最もリソースを消費するメソッドが表示されます。**Top List** は、リソース消費の観点から最も興味深いメソッドの概要を表示するように設計されています。

{{< img src="/developers/ide_integrations/idea/top-list1.png" alt="トップリストビュー" style="width:100%;" >}}

- リスト内の項目をダブルクリック (またはコンテキストメニューから **Jump to Source** を選択) すると、そのメソッドが定義されている場所を示すソースコードエディターが開きます。
- メソッドのフレームグラフ視覚化を見るには、コンテキストメニューから **Search in Flame Graph** を選択します。

#### コールツリー

**Top List** の右側にあるコールツリーには、選択したメソッドにつながる (およびメソッドからつながる) パスが表示されます。

デフォルトの **Caller Hierarchy** ビューには、ターゲットメソッドの呼び出し元 (または先行者) と、それらがコールスタックに表示される頻度が表示されます。呼び出し先 (または後継者) を表示するには、ツールバーの **Callee Hierarchy** ボタンをクリックします。

コールツリー内のメソッドを右クリックすると、ソースエディタまたはフレームグラフに移動するオプションが表示されます。

### フレームグラフ

フレームグラフは、プロファイリングサンプルを視覚化したもので、サンプル期間中のスタックトレースとその相対的な頻度を表示するものです。Datadog プラグインは、リクエストされた時間枠から複数の個別プロファイリングを収集し、それらを集計します。個々のプロファイラーは、リクエストされた時間枠内の 60 秒のインターバルをカバーします。

{{< img src="/developers/ide_integrations/idea/flamegraph1.png" alt="過去 1 時間の CPU 時間を示すフレームグラフ" style="width:100%;" >}}

プロファイルの種類、時間枠、環境を変更するたびに、Datadog プラグインは新しいフレームグラフを生成します。

フレームグラフは、いくつかの方法で操作することができます。
- 任意のフレームをダブルクリックすると、そのメソッドと、サンプリング期間中にそのメソッドが呼び出したすべてのメソッドにフォーカスされます。
- ミニマップを使って、グラフをパンすることができます。
- メソッド上で右クリックし、**Jump to Source** を選択すると、ソースコード内の対応する箇所に移動します。

メソッドにカーソルを合わせると、以下の情報がツールチップに表示されます。
- クラス名とメソッドのシグネチャ
- パッケージ名
- プロファイリングメトリクスの値と割合の内訳。

プロファイリングサンプルには、スタックトレースと行番号の情報が含まれています。**Separate Flame Graph by** ボタンで、フレームをメソッドで区切るか行番号で区切るかを切り替えます。

{{< img src="/developers/ide_integrations/idea/separate-flamegraph-by.png" alt="ツールチップボタンでメソッドや行番号でフレームを区切る" style="width:40%;" >}}

### ソースハイライト

Continuous Profiler タブがアクティブな場合、プラグインはソースコードエディターマージンにコードのハイライトを追加します。トップメソッドの場合、エディターマージンにアイコンが表示され、アクティブなプロファイリングデータに基づいてコードに行レベルのハイライトが表示されます。
- アイコンにカーソルを合わせると、詳細が表示されます。
- アイコンをクリックして、トップリストのプロファイリングタブを開くか、Datadog のプロファイリングを開きます。
  {{< img src="/developers/ide_integrations/idea/interest-options.png" alt="Datadog のアイコンをクリックすると、タブまたは Datadog でプロファイリングデータを開くことができます" style="width:100%;" >}}

アクティブなプロファイリングタブは、プロジェクトのツリー表示にも影響し、選択したプロファイルのメトリクスでアノテーションされます。
{{< img src="/developers/ide_integrations/idea/project-tree-view.png" alt="プロファイルタブのプロファイルメトリクスでアノテーションされたプロジェクトツリー" style="width:60%;" >}}

## ログナビゲーション

Datadog プラットフォームの[ログエクスプローラー][5]には、Java または Go ソースファイルから直接アクセスできます。ソースコード内のログステートメントに続く **View Logs** リンクを探してください。

{{< img src="/developers/ide_integrations/idea/logs-navigation.png" alt="View Logs リンクを示すソースファイル。" style="width:100%;" >}}

リンクをクリックすると、ロガー名、ログレベル、およびログメッセージに可能な限り一致するクエリで**ログエクスプローラー**が開きます。

## View in IDE

**View in IntelliJ IDEA** 機能は、Datadog プラットフォームから直接 Java ソースファイルへのリンクを提供します (Go ではまだ利用できません)。プラットフォーム上に表示されるスタックトレース (例えば、[エラー追跡][6]) のフレームの横にあるボタンを探してください。

{{< img src="/developers/ide_integrations/idea/view-in-idea.png" alt="View in IntelliJ ボタンを表示している Datadog プラットフォームのスタックトレース。" style="width:100%;" >}}

<div class="alert alert-info">この機能には 2 つの前提条件があります。(1) ソースコードインテグレーションがサービスに構成されていることと、(2) JetBrains Toolbox が開発マシンにインストールされていることです。</div>

## フィードバック

ご意見は[ディスカッションフォーラム][1]にアクセスするか、[team-ide-integration@datadoghq.com][11] までメールをお送りください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<script src="https://plugins.jetbrains.com/assets/scripts/mp-widget.js"></script>
<script>
  // Web ページの #yourelement を実際の要素 ID に置き換えてください
  MarketplaceWidget.setupMarketplaceWidget('install', 19495, "#datadog_plugin_install_button");
</script>

[1]: https://github.com/DataDog/datadog-for-intellij/discussions
[2]: /ja/getting_started/profiler/
[3]: https://www.datadoghq.com/
[4]: https://plugins.jetbrains.com/plugin/19495-datadog
[5]: /ja/logs/explorer/
[6]: /ja/tracing/error_tracking/
[7]: https://www.jetbrains.com/lp/toolbox/
[8]: /ja/security/application_security/vulnerability_management/
[9]: /ja/continuous_integration/guides/flaky_test_management/
[10]: /ja/watchdog/insights
[11]: mailto:team-ide-integration@datadoghq.com