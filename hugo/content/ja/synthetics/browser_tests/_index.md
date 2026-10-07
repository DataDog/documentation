---
aliases:
- /ja/synthetics/browser_check
- /ja/synthetics/browser_test
description: 特定のロケーションからユーザージャーニーをシミュレートおよび監視します。
further_reading:
- link: /getting_started/synthetics/browser_test
  tag: ドキュメント
  text: Browser Tests の開始方法
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて学ぶ
- link: /synthetics/guide/version_history/
  tag: ガイド
  text: Synthetic Monitoring のバージョン履歴
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Learning Center
  text: 'Datadog Learning Center: Synthetic Browser Testing の開始方法'
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: ブログ
  text: エンドツーエンドテストを作成するためのベストプラクティス
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: ブログ
  text: Datadog Synthetic Monitoring によるユーザー体験全体を通じたトラブルシューティングの簡素化
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: ブログ
  text: Datadog を使用してクライアントのブラウザテストを拡張する手助けをした方法
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: 外部サイト
  text: Terraform を使用した Synthetic Browser Tests の作成と管理
title: ブラウザテスト
---
## 概要 {#overview}

Browser Tests は、Datadog がお客様の Web アプリケーション上で実行するシナリオです。これらは、世界中の複数のロケーションから、複数のブラウザやデバイスを使用して、設定可能な間隔で定期的に実行されます。これらのテストは、アプリケーションが稼働してリクエストに応答していること、およびシナリオで定義された条件が満たされていることを検証します。

<div class="alert alert-info">MFA の背後にあるアプリケーションのテストに関心がある場合は、<a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">専用ガイド</a>をお読みになり、<a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">Synthetic Monitoring チームにフィードバックを送信</a>して、チームにとって最も重要なシステムの改善にご協力ください。</div>

## テスト構成 {#test-configuration}

以下のいずれかのオプションを使用してテストを作成できます。

### テンプレートからテストを作成する {#create-a-test-from-a-template}

  1. 事前入力されたテンプレートのいずれかにカーソルを合わせ、{{< ui >}}View Template{{< /ui >}} をクリックします。これによりサイドパネルが開き、{{< ui >}}Test Details{{< /ui >}}、{{< ui >}}Alert Conditions{{< /ui >}}、{{< ui >}}Steps{{< /ui >}}、およびオプションで {{< ui >}}Variables{{< /ui >}} を含む、事前入力された構成情報が表示されます。
  2. {{< ui >}}+Create Test{{< /ui >}} をクリックして構成ページを開くと、事前入力された構成オプションを確認および編集できます。表示されるフィールドは、ゼロからテストを作成する場合に使用できるものと同一です。
  3. 右上隅の {{< ui >}}Save & Quit{{< /ui >}} をクリックして、Browser Test を送信します。<br /><br>
       {{< img src="/synthetics/browser_tests/synthetics_templates_browser.mp4" alt="テンプレートを使用した Synthetics Browser Test ランディングページの動画" video="true" >}}

### ゼロからテストを作成する {#build-a-test-from-scratch}

  1. {{< ui >}}+{{< /ui >}} テンプレートをクリックして、新しい Browser Test をゼロから開始します。
  1. {{< ui >}}Starting URL{{< /ui >}} を入力します: ブラウザテストがシナリオを開始する URL です。
  1. {{< ui >}}name{{< /ui >}} を追加します: ブラウザテストの名前です。
  1. {{< ui >}}environment and additional tags{{< /ui >}}を選択します: ブラウザテストに付随する `env` や関連タグを設定します。`<KEY>:<VALUE>`形式を使用して、特定の `<KEY>` に対する `<VALUE>` でフィルタリングします。

  <div class="alert alert-info">詳細については、<a href=#advanced-options>詳細オプション</a>を参照してください。</div>

  5. {{< ui >}}browsers and devices{{< /ui >}}を選択します: テストを実行するブラウザ (`Chrome`、`Firefox`、`Edge`など) およびデバイス (`Laptop Large`、`Tablet`、`Mobile Small`など) です。

      - 大型ノートパソコンデバイスの場合、寸法は 1440 ピクセル × 1100 ピクセルです。
      - タブレットデバイスの場合、寸法は 768 ピクセル × 1020 ピクセルです。
      - 小型モバイルデバイスの場合、寸法は 320 ピクセル × 550 ピクセルです。

  6. {{< ui >}}managed and private locations{{< /ui >}} を選択します: Datadog が管理する世界中の[ロケーション](#locations)のリストから選択するか、[プライベートロケーション][1]を作成して、カスタムロケーションやプライベートネットワーク内からブラウザテストを実行します。

     **注**: [Continuous Testing Tunnel][2]を使用して、ローカル開発環境や CI/CD パイプラインでテストをトリガーし、内部環境をテストすることもできます。

  7. {{< ui >}}test frequency{{< /ui >}}を設定します: 間隔は 1 分ごとから週 1 回まで選択できます。
  8. {{< ui >}}Save & Edit Recording{{< /ui >}} をクリックして、Browser Test を送信します。

### ロケーション{#locations}

{{% managed-locations %}}

### スニペット{#snippets}

新しい Synthetic Monitoring ブラウザテストを設定する際、これらのオプションを手動で選択する代わりに、スニペットを使用してデバイスやリージョンを自動的に入力します。以下のスニペットが利用可能です。

* {{< ui >}}Screen sizes{{< /ui >}}: 特定の画面サイズで、ブラウザ間でブラウザテストを自動的に実行します。
   * {{< ui >}}Large{{< /ui >}}
   * {{< ui >}}Tablet{{< /ui >}}
   * {{< ui >}}Mobile{{< /ui >}}

* {{< ui >}}Multi-region check{{< /ui >}}: 3 つの主要な地理的リージョン (AMER、APAC、EMEA) のそれぞれのロケーションに対して、Web サイトを自動的にテストします。
</br><br>

  {{< img src="synthetics/browser_tests/browser_snippets_2.png" alt="ブラウザテスト作成画面の左側を示すスクリーンショットで、スニペットの例が表示されています。" width="70%" >}}

### 詳細オプション {#advanced-options}

{{< tabs >}}

   {{% tab "リクエストオプション" %}}

   * {{< ui >}}Disable CORS{{< /ui >}}: 選択すると、クロスオリジンリソース共有 (CORS) ポリシーによってテストがブロックされるのを防ぎます。
   * {{< ui >}}Disable CSP{{< /ui >}}: 選択すると、コンテンツセキュリティポリシー (CSP) によってテストがブロックされるのを防ぎます。
   * {{< ui >}}Capture HTTP payloads{{< /ui >}}: 選択すると、各テストステップで Fetch および XHR リソースのリクエストとレスポンスのヘッダーとボディを収集します。このオプションを有効にした後、テスト結果の [{{< ui >}}Resources{{< /ui >}} タブ][3]にある Fetch または XHR リソースの行をクリックすると、リクエストとレスポンスのヘッダーとボディを表示できます。
   * {{< ui >}}Request Headers{{< /ui >}}: {{< ui >}}Name{{< /ui >}} フィールドと {{< ui >}}Value{{< /ui >}} フィールドでヘッダーを定義し、デフォルトのブラウザヘッダーを追加または上書きします。たとえば、ヘッダーで User Agent を設定して [Datadog スクリプトを識別][1]できます。
   * {{< ui >}}Cookies{{< /ui >}}: デフォルトのブラウザ Cookie に追加する Cookie を定義します。[`Set-Cookie`][2] の構文を使用して、1 行につき 1 つの Cookie を入力します。
   * {{< ui >}}HTTP Authentication{{< /ui >}}: HTTP Basic、Digest、または NTLM を使用して、ユーザー名とパスワードで認証します。認証情報は、ブラウザテストのすべてのステップで使用されます。**注**: HTTP Basic 認証は、ブラウザのシステムプロンプトを通じてユーザー認証情報を要求する Web サイトで使用できます。

   リクエストオプションはテスト実行ごとに設定され、記録時ではなく実行時に、ブラウザテストのすべてのステップに適用されます。後続のステップを記録するためにこれらのオプションを有効にしておく必要がある場合は、記録元のページで手動でオプションを適用し、テストで後続のステップを追加します。


[1]: /ja/synthetics/guide/identify_synthetics_bots/?tab=apitests
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
[3]: /ja/synthetics/browser_tests/test_results#resources
   {{% /tab %}}

   {{% tab "証明書" %}}

   サーバー証明書のエラーをスキップするようにテストに指示するには、{{< ui >}}Ignore server certificate error{{< /ui >}} を選択します。

   * {{< ui >}}Client Certificate{{< /ui >}}: {{< ui >}}Upload File{{< /ui >}} をクリックして証明書ファイルと秘密鍵をアップロードし、クライアント証明書を必要とするシステムでテストを実行します。PEM 形式の証明書のみが受け付けられます。
   * {{< ui >}}Client Certificate Domains{{< /ui >}}: 証明書ファイルがアップロードされると、クライアント証明書は開始 URL のドメインに適用されます。別のドメインにクライアント証明書を適用するには、{{< ui >}}Value{{< /ui >}} フィールドにそのドメインを指定します。

   URL にはワイルドカードを含めることができます。

   {{% /tab %}}

   {{% tab "プロキシ" %}}

   リクエストの送信先となるプロキシの URL を、`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` として {{< ui >}}Proxy URL{{< /ui >}} フィールドに入力します。

   URL には[グローバル変数](#use-global-variables)を含めることができます。

   {{% /tab %}}

   {{% tab "プライバシー" %}}

   テストステップでスクリーンショットが撮影されないようにするには、{{< ui >}}Do not capture any screenshots for this test{{< /ui >}} を選択します。

   このプライバシーオプションは、個々のテストステップレベルで[高度なオプション][1]として利用でき、テスト結果に機密データが表示されないようにします。テストでスクリーンショットを撮影しないようにすると、失敗時のトラブルシューティングが困難になります。詳細については、[データセキュリティ][2]を参照します。

[1]: /ja/synthetics/browser_tests/advanced_options#prevent-screenshot-capture
[2]: /ja/data_security/synthetics
   {{% /tab %}}

   {{% tab "開始 URL" %}}

   最初のテストステップが失敗したと判断されるまでの待機時間を、秒単位で入力します。

   {{% /tab %}}

   {{% tab "時刻と言語" %}}

  デフォルトでは、タイムゾーンは UTC、言語は英語 (en) に設定されています。言語を定義するには、対応する 2 桁または 3 桁の [ISO コード][1]を使用します。

[1]: https://www.loc.gov/standards/iso639-2/php/code_list.php

   {{% /tab %}}

   {{% tab "ブロックされたリクエスト" %}}

   テスト実行中に読み込みをブロックする 1 つ以上のリクエストパターンを入力します。[マッチパターン形式][1]を使用して、1 行につき 1 つのリクエストパターンを入力します。ワイルドカード (例: `*://*.example.com/*`) がサポートされています。

   ブロックされたリクエストはテスト実行中はスキップされますが、[ステップの記録](/synthetics/browser_tests/test_steps)時にはページのレンダリングに影響しません。ブロックされたリクエストは、テスト実行の [{{< ui >}}Resources{{< /ui >}} タブ](/synthetics/browser_tests/test_results#resources)で表示されます。ブロックされたリクエストのステータスは `blocked` になります。

[1]: https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns

   {{% /tab %}}

   {{< /tabs >}}

{{% synthetics-variables %}}

### グローバル変数を使用する{#use-global-variables}

[グローバル変数 ({{< ui >}}Settings{{< /ui >}}で定義)][4]は、ブラウザテストの詳細の {{< ui >}}Starting URL{{< /ui >}} および {{< ui >}}Advanced Options{{< /ui >}}、ならびにテスト記録で使用できます。

利用可能な変数を一覧表示するには、

- ブラウザテストの詳細で、目的のフィールドに「{{」と入力します。

  {{< img src="synthetics/browser_tests/use_global_variables_1.mp4" alt="グローバル変数からローカル変数を定義する" video="true" width="90%" >}}

- ブラウザテストのレコーダーで、テストに変数をインポートしてから、目的のフィールドに「{{」と入力するか、アプリケーションに変数を挿入して使用します。

  {{< img src="synthetics/browser_tests/use_global_variables_2.mp4" alt="ブラウザの記録中にローカル変数をフィールドに挿入する" video="true" width="90%" >}}

ブラウザテストの記録での変数の使用については、[ブラウザテストのステップ][5]を参照します。

### アラート条件を定義する{#define-alert-conditions}

アラート条件をカスタマイズして、テストが通知アラートを送信する状況を定義できます。

{{< img src="synthetics/browser_tests/alerting_rules_2.png" alt="ブラウザテストのアラートルール" style="width:80%" >}}

#### アラートルール {#alerting-rule}

アラートは、`N` ロケーションのうち、いずれか `n` か所で `X` 分間アサーションが失敗した場合に送信されます。このアラートルールでは、通知を送信する前に、テストがどのくらいの時間、また何か所のロケーションで失敗する必要があるかを指定できます。

アラートは、次の 2 つの条件が満たされた場合にのみ送信されます。

- 過去 X 分間に少なくとも 1 つのロケーションで失敗（少なくとも 1 つのアサーションが失敗）が発生した。
- 過去 X 分間のいずれかの時点で、少なくとも `N` か所のロケーションで失敗が発生した。

失敗した場合、ロケーションが失敗とマークされる前に `X` 回再試行します。これにより、ロケーションが失敗と見なされるまでに必要な連続したテスト失敗の回数を定義できます。デフォルトでは、失敗したテストを再試行する前に `300ms` の待機時間があります。この間隔は [API][6] で設定できます。

#### 高速再試行 {#fast-retry}

テストが失敗した際、高速再試行を使用すると、失敗とマークする前に Y ミリ秒後に X 回テストを再試行できます。再試行間隔をカスタマイズすることで、誤検知を減らし、アラートの精度を向上させることができます。

ロケーションの稼働時間は再試行完了後の最終的なテスト結果に基づいて計算されるため、高速再試行の間隔は合計稼働時間グラフの表示に直接影響します。合計稼働時間は設定されたアラート条件に基づいて計算され、その合計稼働時間に基づいてアラートが送信されます。

<div class="alert alert-info">
Synthetic Monitoring の通知がテスト結果を評価し、アラートをトリガーする方法の詳細については、<a href="/synthetics/guide/how-synthetics-monitors-trigger-alerts/">Synthetic Monitor のアラートについて</a>を参照します。
</div>

{{% synthetics-downtimes %}}

### テストモニターを設定する{#configure-the-test-monitor}

アラートは、設定されたアラート条件に従って送信されます。このセクションを使用して、チームへのメッセージの内容と送信方法を定義します。

1. ブラウザテストの {{< ui >}}message{{< /ui >}} を入力するか、事前入力されたモニターメッセージを使用します。このフィールドでは標準の [Markdown 形式][7]が使用でき、以下の[条件変数][8]がサポートされています。

    | 条件変数       | 説明                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the monitor alerts.                                       |
    | `{{^is_alert}}`            | Show unless the monitor alerts.                                     |
    | `{{#is_recovery}}`         | Show when the monitor recovers from `alert`.                          |
    | `{{^is_recovery}}`         | Show unless the monitor recovers from `alert`.                        |
    | `{{#is_renotify}}`         | Show when the monitor renotifies.                                   |
    | `{{^is_renotify}}`         | Show unless the monitor renotifies.                                 |
    | `{{#is_priority}}`         | Show when the monitor matches priority (P1 to P5).                  |
    | `{{^is_priority}}`         | モニターが優先度 (P1〜P5) に一致しない場合に表示します。               |

    Notification messages include the {{< ui >}}message{{< /ui >}} defined in this section and information about the failing locations. Pre-filled monitor messages are included in the message body section:

     {{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="Synthetic Monitoring モニターセクション。事前入力されたモニターメッセージが強調表示されています。" style="width:100%;" >}}

     For example, to create a monitor that iterates over steps extracting variables for browser tests, add the following to the monitor message:

   ```text
   {{!すべての成功したステップにわたる抽出変数を一覧表示します }}
   # 抽出された変数
   {{#each synthetics.attributes.result.steps}}
   {{#if extractedValue}}
   * **名前**: `{{extractedValue.name}}`
   **値:** {{#if extractedValue.secure}}*難読化済み (値は非表示)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

2. Choose team members and services to notify.
3. Specify a renotification frequency. To prevent renotification on failing tests, check the option {{< ui >}}Stop re-notifying on X occurrences{{< /ui >}}.
4. Click {{< ui >}}Save & Start Recording{{< /ui >}} to save your test configuration and record your browser steps.

For more information, see [Synthetic Monitoring notifications][9].

## Record your steps 

Tests can be recorded from [Google Chrome][10]. To record your test, download the [Datadog Record Test extension][11]. Because Microsoft Edge is Chromium-based, you can also install the Chrome extension in Edge after you turn on **Allow extensions from other stores**. See Microsoft's [guide to adding extensions from other stores][18] for instructions.

You can switch tabs in a browser test recording to perform an action on your application (such as clicking on a link that opens another tab) and add another test step. Your browser test must interact with the page first (through a click) before it can perform an [assertion][12]. By recording all of the test steps, the browser test can switch tabs automatically at test execution.

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="ブラウザテストの記録テスト" width="90%" >}}

1. 必要に応じて、ページ右上の {{< ui >}}Open in a pop-up{{< /ui >}} を選択して、テストの記録を別のポップアップウィンドウで開くことができます。これは、アプリケーションが iframe 内での表示をサポートしていない場合や、記録時のサイズ調整の問題を回避したい場合に便利です。{{< ui >}}Incognito mode{{< /ui >}} でポップアップを開いて、既存のブラウザのログインセッションや Cookie などの影響を受けないクリーンなブラウザからテストの記録を開始することもできます。
2. オプションで、ブラウザテストからステップの記録を実行する際に、Datadog が RUM データを自動的に収集するように設定できます。詳細については、[RUM とセッションリプレイの詳細を確認][13]を参照します。
3. {{< ui >}}Start Recording{{< /ui >}} をクリックして、ブラウザテストの記録を開始します。
4. 監視したいユーザージャーニーに沿ってアプリケーションをクリックしていくと、操作が自動的に記録され、左側のブラウザテストシナリオ内に[ステップ][14]として作成されます。
5. 自動的に記録されたステップに加えて、左上隅にある[ステップ][14]を使用してシナリオを充実させることもできます。
   {{< img src="synthetics/browser_tests/manual_steps.png" alt="ブラウザテストのステップ" style="width:80%;">}}

   Datadog では、ブラウザテストの最後に[アサーション][12]を追加して、ブラウザテストで実行されたジャーニーが期待どおりの状態になったことを確認することを推奨しています。
6. シナリオが完了したら、{{< ui >}}Save and Launch Test{{< /ui >}} をクリックします。

## ステップをリプレイする {#replay-your-steps}

ブラウザテストの 1 つ以上のステップをブラウザ上で直接再実行するには、[Datadog Record Test extension][11]をダウンロードしてください。

ステップリプレイ機能は、個々のステップのデバッグ、ブラウザテストの編集時に適切なアプリケーション状態に到達すること、およびテストを保存する前にフロー全体を確認することに役立ちます。

**注**: ステップリプレイは、条件 (ブラウザバージョン、ネットワーク、ユーザーエージェント、ログイン状態) や制限が異なるため、Synthetic Monitoring のテスト実行とは動作が異なる場合があります。

### ステップリプレイの使用方法 {#how-to-use-step-replay}

ステップをリプレイするには、以下の 3 つの方法があります。

<strong>1. 単一ステップのリプレイ:</strong> 単一のステップを再実行します。
{{< img src="synthetics/browser_tests/recording__replay--replay-one-step_1.mp4" alt="単一ステップのリプレイ" video="true" height="400px" >}}
<p style="text-align: center;"><em>ステップにカーソルを合わせ、再生ボタンをクリックして、このステップのみをリプレイします。</em></p>

<strong>2. すべてのステップをリプレイ:</strong> レコーダーで定義された一連のステップ全体を実行します。
{{< img src="synthetics/browser_tests/recording__replay--replay-all-steps_1.mp4" alt="すべてのステップをリプレイ" video="true" height="400px" >}}
<p style="text-align: center;"><em>ステップリストの上部にある「すべてのステップをリプレイ」ボタン (⏩︎) をクリックして、すべてのステップをリプレイします。</em></p>

<strong>3. 選択したステップをリプレイ:</strong> ステップリストで選択したステップの一部を実行します。
{{< img src="synthetics/browser_tests/recording__replay--replay-selected-steps_1.mp4" alt="選択したステップをリプレイ" video="true">}}
<p style="text-align: center;"><em>リプレイしたいステップを選択し、ステップリストの上部にある「選択したステップをリプレイ」ボタン (⏩︎) をクリックします。</em></p>

### ステップリプレイ機能のサポート {#step-replay-feature-support}

以下の表は、ステップリプレイでサポートされているブラウザテストのステップタイプをまとめたものです。

| ステップタイプ                | ステップリプレイでのサポート | 備考 |
|--------------------------|:------------------------:|-------|
| 変数の抽出         | {{< X >}}                       |       |
| URL に移動                | {{< X >}}                       |       |
| ページを更新                  | {{< X >}}                       |       |
| スクロール                   | {{< X >}}                       |       |
| オプションを選択            | {{< X >}}                       |       |
| 待機                     | {{< X >}}                       |       |
| API テストを実行             | {{< X >}}                       |       |
| チェックボックスの状態を検証    | {{< X >}}                       |       |
| 現在の URL を検証       | {{< X >}}                       |       |
| 要素の属性を検証 | {{< X >}}                       |       |
| 要素のコンテンツを検証   | {{< X >}}                       |       |
| 要素の存在を検証   | {{< X >}}                       |       |
| ファイルのダウンロードを検証     | {{< X >}}                       |       |
| ページに含まれていることを確認     | {{< X >}}                       |       |
| ページに含まれていないことを確認        | {{< X >}}                       |       |
| JavaScript から検証   | {{< X >}}                       |       |
| JavaScript から抽出  | {{< X >}}                       |       |
| キーを押す                | {{< X >}}                       |       |
| テキストを入力                | {{< X >}}                       |       |
| クリック                    | {{< X >}}*                      | *Click steps are supported, but may behave differently than in a full Synthetic Monitoring test run. |
| ホバー                    | {{< X >}}*                      | *Hover steps are supported, but may behave differently than in a full Synthetic Monitoring test run. |

### ステップリプレイでサポートされていないステップタイプ{#step-types-not-supported-by-step-replay}

| ステップタイプ                | ステップリプレイでのサポート |
|--------------------------|:------------------------:|
| メールの検証             | まだサポートされていません        |
| リクエストの検証          | まだサポートされていません        |
| メール本文から抽出  | まだサポートされていません        |
| メールリンクへ移動         | まだサポートされていません        |
| ファイルをアップロード             | まだサポートされていません        |

### デバッガーの権限 {#debugger-permission}

完全な Synthetic Monitoring のテスト実行に可能な限り近づけるため、JavaScript ベースのステップやキーストロークのシミュレーションなど、一部のステップをリプレイするにはデバッガーの権限が必要です。

拡張機能がデバッガーの権限を必要とするバージョンに初めて更新される際、権限のリクエストが表示され、承認されるまで拡張機能は無効になります。
{{< img src="synthetics/browser_tests/recording__replay--accepting-permission_2.mp4" alt="デバッガーの権限を承認する" video="true" height="400px" >}}
<p style="text-align: center;"><em>3 つの点 {{< img src="icons/kebab.png" inline="true" style="width:14px;">}} メニューをクリックして権限を許可します。</em></p>

## 権限 {#permissions}

デフォルトでは、[Datadog Admin および Datadog Standard ロール][15]を持つユーザーのみが、Synthetic ブラウザテストの作成、編集、削除を行えます。Synthetic ブラウザテストの作成、編集、削除のアクセス権を取得するには、ユーザーをこれら 2 つの[デフォルトロール][15]のいずれかにアップグレードしてください。

[カスタムロール機能][15]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加してください。

### アクセスを制限する {#restrict-access}

[きめ細かなアクセス制御][17]を使用して、ロール、チーム、または個々のユーザーに基づいてテストへのアクセスを制限します。

1. フォームの権限セクションを開きます。
2. {{< ui >}}Edit Access{{< /ui >}} をクリックします。
  {{< img src="synthetics/settings/grace_2.png" alt="プライベートロケーション設定フォームからテストの権限を設定します" style="width:100%;" >}}
3. {{< ui >}}Restrict Access{{< /ui >}} をクリックします。
4. チーム、ロール、またはユーザーを選択します。
5. {{< ui >}}Add{{< /ui >}} をクリックします。
6. それぞれに関連付けるアクセスレベルを選択します。
7. {{< ui >}}Done{{< /ui >}} をクリックします。

<div class="alert alert-info">プライベートロケーションへの閲覧者アクセス権がなくても、そのプライベートロケーションの結果を表示できます。</div>

| アクセスレベル | テスト設定の表示 | テスト設定の編集 | テスト結果の表示 | テストの実行 | レコーディングの表示 | レコーディングの編集 |
| ------------ | ----------------------- | ----------------------- | ------------------| --------- | -------------- | -------------- |
| アクセスなし    |                         |                         |                   |           |                |                |
| 閲覧者       | {{< X >}}               |                         | {{< X >}}         |           | {{< X >}}      |                |
| 編集者       | {{< X >}}               | {{< X >}}               | {{< X >}}         | {{< X >}} | {{< X >}}      | {{< X >}}      |

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/private_locations/
[2]: /ja/continuous_testing/environments/proxy_firewall_vpn
[3]: /ja/help/
[4]: /ja/synthetics/settings/#global-variables
[5]: /ja/synthetics/browser_tests/test_steps#variables
[6]: /ja/api/latest/synthetics/#create-or-clone-a-test
[7]: http://daringfireball.net/projects/markdown/syntax
[8]: /ja/monitors/notify/variables/?tab=is_alert#conditional-variables
[9]: /ja/synthetics/notifications/
[10]: https://www.google.com/chrome
[11]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[12]: /ja/synthetics/browser_tests/test_steps/#assertion
[13]: /ja/synthetics/guide/explore-rum-through-synthetics/
[14]: /ja/synthetics/browser_tests/test_steps/
[15]: /ja/account_management/rbac#custom-roles
[16]: /ja/account_management/rbac/#create-a-custom-role
[17]: /ja/account_management/rbac/granular_access
[18]: https://support.microsoft.com/en-us/edge/add-turn-off-or-remove-extensions-in-microsoft-edge
[19]: /ja/synthetics/guide/how-synthetics-monitors-trigger-alerts/