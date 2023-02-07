---
disable_toc: false
further_reading:
- link: /account_management/api-app-keys/
  tag: ドキュメント
  text: API キーとアプリケーションキーの詳細については、こちらをご覧ください。
- link: /getting_started/profiler/
  tag: ドキュメント
  text: Continuous Profiler の概要
is_beta: true
kind: documentation
title: IntelliJ IDEA 用 Datadog プラグイン
---

{{< callout url="#" btn_hidden="true">}}
  IntelliJ IDEA 用 Datadog プラグインが公開ベータ版になりました。これは、Java サービスに <a href="https://docs.datadoghq.com/profiler/#pagetitle">Continuous Profiler</a> を使用している Java 開発者を対象としています。プラグインが予期せず動作しなくなった場合は、プラグインの更新を確認するか、<a href=#feedback>チームに連絡</a>してください。
{{< /callout >}}

## 概要

IntelliJ IDEA 用 Datadog プラグインは、リアルタイムの観測可能性データに基づいて IDE でコードレベルの有意義な洞察を提供することにより、ソフトウェアのパフォーマンスを向上させるのに役立ちます。このプラグインは、Continuous Profiler と共に、以下のようなコードラインをハイライトすることで、レイテンシーの削減とクラウドコストの低減を支援します。
- 最も多くの CPU を消費するコードライン
- メモリを最も多く割り当てるコードライン
- ロック、ディスク I/O、ソケット I/O などに最も多くの時間を費やしているコードライン

{{< img src="/developers/ide_integrations/idea/overview1.png" alt="IDEA で開いた Datadog ツールのウィンドウ" style="width:100%;" >}}

コードハイライトに加えて、Intellij IDEA 用 Datadog プラグインを使用すると、次のことができます。
- **Top List** ビューで、最もリソースを消費するメソッドを特定します。
- 集計されたプロファイルデータを **Flame Graph** ビューで視覚化します。
- トップリストとフレームグラフから、コードの該当行に直接ナビゲートします。
- メソッド名と行番号で分類されたリソースの消費量を確認します。

## 要件

- **Datadog アカウント**: このプラグインを使用するには、Datadog のアカウントが必要です。Datadog が初めての方は、[Datadog Web サイト][4]で Datadog の観測可能性ツールの詳細と無料トライアルにサインアップしてください。
- **Continuous Profiling**: このプラグインでコードレベルの洞察を表示するには、Java サービスにインストルメントされた Continuous Profiler が必要です。詳細については、[Continuous Profiler の概要][3]を参照してください。

## セットアップ

### Datadog プラグインをインストールする

1. **Plugins** をクリックし、`Datadog` を検索します。
1. **Install** をクリックすると、プラグインがダウンロードされ、IDE にインストールされます。
1. Datadog がサードパーティのプラグインであることを通知するプロンプトが表示された場合、**Accept** をクリックします。
1. **Restart IDE** をクリックし、IDEA を再起動します。

{{< img src="/developers/ide_integrations/idea/datadog-plugin1.png" alt="Datadog プラグイン" style="width:100%;" >}}

または、[Jetbrains Marketplace][6] からプラグインをインストールすることができます。
<span id="datadog_plugin_install_button"></span>

### Datadog の資格情報を追加する

Datadog プラグインをインストールし、IDEA を再起動した後、Datadog で認証するための Datadog API キーとアプリケーションキーを追加します。
1. IDEA でファイルまたはプロジェクトを開いた状態で、**Datadog** ツールウィンドウをクリックします。
1. **Add your credentials...** をクリックします。
1. 名前、[API キーとアプリケーションキー][5]を入力し、サイトを選択します。

**注**: ほとんどのユーザーにとって、必要なキーのペアは 1 つだけです。複数の組織で複数のキーペアを使用している場合は、正しいペアがアクティブであることを確認してください。IDEA がどのキーを使用しているかを確認するには、**Preferences** -> **Tools** -> **Datadog** をクリックし、どのアカウントがアクティブになっているかを確認します。

### サービスのリンク

Datadog プラットフォームから関連データを提供するには、プロジェクトに関連サービスを追加します。
1. IDEA でプロジェクトを開いた状態で、**Datadog** ツールウィンドウを開き、プラスアイコン (**+**) をクリックします。
1. 現在のプロジェクトに追加したいサービスを検索して選択します。

サービスを削除するには、**Services** 表でサービスを選択し、マイナスアイコン (**-**) をクリックします。

<div class="alert alert-info">リンクされたサービスの名前は、プロジェクトを閉じても残ります。</div>

## プラグインを使用する

プロジェクトにサービスを追加した後、サービス上で右クリックし、**Open in Profiling** をクリックすると、そのサービスのプロファイリングタブが開かれます。プロファイリングタブは 1 つのサービスのデータのみを表示しますが、同時に複数のタブを開くことができます。

プロファイリングタブは、選択した環境におけるサービスの Continuous Profiling 情報を、特定の時間枠で集計して表示します。利用可能なビューは次のとおりです。
- [トップリスト](#top-list): 現在のプロファイリングメジャーで最もリソースを消費するメソッドのリストを表示します。
- [フレームグラフ](#flame-graph): プロファイルのスタックトレースを表すフレームグラフ。

プロファイリングデータには、以下のパラメーターを指定することができます。
- 表示するプロファイルの種類
- サービスが動作している環境
- プロファイラーサンプルが集計されるまでの期間

利用可能なプロファイリングの種類は、通常、**CPU Time** や **Allocated Memory** などのオプションがありますが、プラットフォームによって決定され、言語によって変化します。

## Toplist

**Top List** サブタブには、Datadog サーバーから読み込まれた集計されたプロファイルデータに基づいて、最もリソースを消費するメソッドが表示されます。**Top List** は、リソース消費の観点から最も興味深いメソッドの概要を表示するように設計されています。

{{< img src="/developers/ide_integrations/idea/top-list1.png" alt="トップリストビュー" style="width:100%;" >}}

- リスト内の項目をダブルクリック (またはコンテキストメニューから **Jump to Source** を選択) すると、そのメソッドが定義されている場所を示すソースコードエディターが開きます。
- メソッドのフレームグラフ視覚化を見るには、コンテキストメニューから **Search in Flame Graph** を選択します。

### コールツリー

メソッド一覧の右側にあるコールツリーには、選択したメソッドにつながる (およびメソッドからつながる) パスが表示されます。

{{< img src="/developers/ide_integrations/idea/call-tree1.png" alt="メソッドコールツリー" style="width:100%;" >}}

デフォルトの **Caller Hierarchy** ビューには、ターゲットメソッドの呼び出し元 (または先行者) と、それらがコールスタックに表示される頻度が表示されます。

呼び出し先 (または後継者) を表示するには、**Callee Hierarchy** をクリックします。

{{< img src="/developers/ide_integrations/idea/callee-hierarchy.png" alt="呼び出し先階層ビュー" style="width:100%;" >}}

コールツリー内のメソッドを右クリックすると、ソースエディタまたはフレームグラフに移動するオプションが表示されます。

## フレームグラフ

フレームグラフは、プロファイリングサンプルを視覚化したもので、サンプル期間中のスタックトレースとその相対的な頻度を表示するものです。Datadog プラグインは、リクエストされた時間枠で収集されたデータを集計し、複数の個々のプロファイルを集計します。個々のプロファイラーは、リクエストされた時間枠内の 60 秒のインターバルをカバーします。

{{< img src="/developers/ide_integrations/idea/flamegraph1.png" alt="過去 4 時間の CPU 時間を示すフレームグラフ" style="width:100%;" >}}

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

## Datadog Insights

プロファイリングタブがアクティブな場合、Datadog Insights はソースコードエディターマージンにコードハイライトを追加します。Datadog プラグインは、エディターマージンにアイコンを表示し、アクティブなプロファイリングデータに基づいてコードをハイライトします。
- アイコンにカーソルを合わせると、詳細が表示されます。
- アイコンをクリックして、トップリストのプロファイリングタブを開くか、Datadog のプロファイリングを開きます。
  {{< img src="/developers/ide_integrations/idea/interest-options.png" alt="Datadog のアイコンをクリックすると、タブまたは Datadog でプロファイリングデータを開くことができます" style="width:100%;" >}}

アクティブなプロファイリングタブは、IDEA プロジェクトのツリー表示にも影響し、選択したプロファイルのメトリクスでアノテーションされます。
{{< img src="/developers/ide_integrations/idea/project-tree-view.png" alt="プロファイルタブのプロファイルメトリクスでアノテーションされたプロジェクトツリー" style="width:60%;" >}}

## フィードバック

このプラグインについてどう思われますか？私たちの[ディスカッションフォーラム][1]でフィードバックを提供するか、`team-ide-integration@datadoghq.com` にメールを送信してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<script src="https://plugins.jetbrains.com/assets/scripts/mp-widget.js"></script>
<script>
  // Web ページの #yourelement を実際の要素 ID に置き換えてください
  MarketplaceWidget.setupMarketplaceWidget('install', 19495, "#datadog_plugin_install_button");
</script>

[1]: https://github.com/DataDog/datadog-for-intellij/discussions
[3]: /ja/getting_started/profiler/
[4]: https://www.datadoghq.com/
[5]: /ja/account_management/api-app-keys/
[6]: https://plugins.jetbrains.com/plugin/19495-datadog