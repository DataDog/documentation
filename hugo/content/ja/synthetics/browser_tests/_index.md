---
aliases:
- /ja/synthetics/browser_check
- /ja/synthetics/browser_test
description: 特定のロケーションからユーザージャーニーをシミュレートして監視します。
further_reading:
- link: /getting_started/synthetics/browser_test
  tag: ドキュメント
  text: ブラウザテストの概要
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
- link: /synthetics/guide/version_history/
  tag: ガイド
  text: Synthetic Monitoring のバージョン履歴
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: ラーニングセンター
  text: 'Datadog ラーニングセンター: Synthetic ブラウザテストを始める'
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: ブログ
  text: エンドツーエンドテスト作成のベストプラクティス
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: ブログ
  text: Datadog Synthetic Monitoring を使用してユーザージャーニー全体のトラブルシューティングを簡素化する
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: ブログ
  text: Datadog を使用してクライアントのブラウザテストをスケールさせる手助けをした方法
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: 外部サイト
  text: Terraform による Synthetic ブラウザテストの作成と管理
title: ブラウザテスト
---
## 概要 {#overview}

ブラウザテストは、Datadog が Web アプリケーション上で実行するシナリオです。世界中の複数のロケーションからさまざまなブラウザおよびデバイスを使用して実行され、テスト間隔は自由に設定できます。これらのテストは、アプリケーションが稼働してリクエストに応答していること、シナリオで定義された条件が満たされていることを確認します。

<div class="alert alert-info">MFA の背後にあるアプリケーションのテストに興味がある場合は、<a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">専用ガイド</a>を読み、<a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">フィードバックを送信</a>して、Synthetic Monitoring チームがお客様のチームにとって最も重要なシステムを改善できるようサポートしてください。</div>

## テスト構成 {#test-configuration}

テストを作成するには次の方法があります。

### テンプレートからテストを作成する{#create-a-test-from-a-template}

  1. あらかじめ設定されているテンプレートのいずれかにカーソルを合わせて、[**View Template**] (テンプレートを表示) をクリックします。すると、「Test Details」(テストの詳細)、「Alert Conditions」(アラートの条件)、「Steps」(ステップ)、オプションの「Variables」(変数) など、あらかじめ設定された構成情報が表示されるサイドパネルが開きます。
  2. [**+Create Test**] (テストを作成) をクリックして構成ページを開きます。このページで、あらかじめ設定された構成オプションを確認および編集できます。表示されるフィールドは、テストを一から作成する際に利用可能なフィールドと同じです。
  3. 右上にある [**Save & Quit**] (保存して終了) をクリックして、ブラウザテストを送信します。<br /><br>
       {{< img src="/synthetics/browser_tests/synthetics_templates_browser.mp4" alt="テンプレートを使った Synthetics ブラウザテストのランディングページの動画" video="true" >}}

### テストを一から作成する {#build-a-test-from-scratch}

  1. [**+**] テンプレートをクリックして、新しいブラウザテストを一から開始します。
  1. **開始 URL** を入力します。ブラウザテストがシナリオを開始する URL です。
  1. **名前**を追加します。ブラウザテストの名前です。
  1. **環境タグと追加のタグ**を選択します。ブラウザテストにアタッチされる `env` タグと関連タグを設定します。特定の `<KEY>:<VALUE>` の `<VALUE>` でフィルタリングするには `<KEY>` 形式を使用します。

  <div class="alert alert-info">その他のオプションについては、<a href=#advanced-options>高度なオプション</a>を参照してください。</div>

  5. **ブラウザとデバイス**を選択します。テストを実行するブラウザ (`Chrome`、`Firefox`、`Edge` など) とデバイス (`Laptop Large`、`Tablet`、`Mobile Small` など) です。

      - 大型のラップトップデバイスの場合、寸法は 1440 ピクセル × 1100 ピクセルです。
      - タブレットデバイスの場合、寸法は 768 ピクセル × 1020 ピクセルです。
      - 小型のモバイルデバイスの場合、寸法は 320 ピクセル × 550 ピクセルです。

  6. **管理ロケーションとプライベートロケーション**を選択します。Datadog が管理する世界中の[ロケーション](#locations)の一覧から選択するか、[プライベートロケーション][1]を作成して、カスタムロケーションやプライベートネットワーク内からブラウザテストを実行することができます。

     **注**: また、[Continuous Testing Tunnel][2] を使用すると、ローカルの開発環境や CI/CD パイプライン内でテストをトリガーし、内部環境をテストすることができます。

  7. **テスト頻度**を設定します。間隔は 5 分に 1 回から週に 1 回までさまざまです。1 分単位の頻度を希望する場合は、[サポートにお問い合わせ][3]ください。
  8. [**Save & Edit Recording**] (保存して記録を編集) をクリックして、ブラウザテストを送信します。

### ロケーション {#locations}

{{% managed-locations %}}

### スニペット {#snippets}

新規に Synthetic Monitoring ブラウザテストを設定する際は、デバイスやリージョンを手動で選択する代わりに、スニペットを使用して自動的に入力してください。利用可能なスニペットは以下のとおりです。

* **画面サイズ**: 特定のサイズに設定した画面上で、複数のブラウザにわたってブラウザテストを自動的に実行します。
   * **Large (大)**
   * **Tablet (タブレット)**
   * **Mobile (モバイル)**

* **マルチリージョンチェック**: AMER、APAC、EMEA という 3 つの主要なリージョンそれぞれに対応するロケーションで、自動的に Web サイトをテストします。
</br><br>

  {{< img src="synthetics/browser_tests/browser_snippets_2.png" alt="ブラウザテスト作成画面の左側を示すスクリーンショットで、利用可能なスニペットの例が表示されています" width="70%" >}}

### 高度なオプション {#advanced-options}

{{< tabs >}}

   {{% tab "リクエストオプション" %}}

   クロスオリジンリソース共有 (CORS) ポリシーがテストをブロックするのを防ぐには、[**Disable CORS**] (CORS を無効にする) を選択します。コンテンツセキュリティポリシー (CSP) がテストをブロックするのを防ぐには、[**Disable CSP**] (CSP を無効にする) を選択します。

   * **Request Headers** (リクエストヘッダー): [**Name**] (名前) および [**Value**] (値) フィールドでヘッダーを定義して、デフォルトのブラウザヘッダーに追加またはオーバーライドします。たとえば、ヘッダーに User Agent を設定して、[Datadog スクリプトを識別][1]できます。
   * **Cookies** (クッキー) : ブラウザのデフォルトのクッキーに追加するクッキーを定義します。1 行に 1 つのクッキーを入力し、[`Set-Cookie`][2] の構文を使用します。
   * **HTTP Authentication** (HTTP 認証): HTTP Basic、Digest、または NTLM を使用し、ユーザー名とパスワードで認証を行います。資格情報は、ブラウザテストのすべてのステップで使用されます。**注**: HTTP Basic 認証は、ブラウザのシステムプロンプトでユーザー資格情報をリクエストする Web サイトで使用できます。

   リクエストオプションは、テストの実行ごとに設定され、記録時ではなく、実行時にブラウザテストのすべてのステップに適用されます。次のステップを記録するためにこれらのオプションをアクティブのままにしておく必要がある場合は、記録元のページにオプションを手動で適用し、テストの後続のステップを作成します。


[1]: /ja/synthetics/guide/identify_synthetics_bots/?tab=apitests
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   {{% /tab %}}

   {{% tab "証明書" %}}

   [**Ignore server certificate error**] (サーバー証明書のエラーを無視する) を選択すると、テストでサーバー証明書のエラーをスキップするように指示されます。

   * **Client Certificate** (クライアント証明書): クライアント証明書を必要とするシステムでテストを行うには、[**Upload File**] (ファイルをアップロード) をクリックして、証明書ファイルと秘密鍵をアップロードしてください。PEM 証明書のみ受け付けます。
   * **Client Certificate Domains** (クライアント証明書のドメイン): 証明書ファイルをアップロードすると、クライアント証明書は、開始 URL のドメインに適用されます。別のドメインにクライアント証明書を適用する場合は、[**Value**] (値) フィールドでドメインを指定します。

   URL にワイルドカードを含めることができます。

   {{% /tab %}}

   {{% tab "プロキシ" %}}

   [**Proxy URL**] (プロキシ URL) フィールドに、リクエストを送信するプロキシの URL を `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` として入力します。

   URL に[グローバル変数](#use-global-variables)を含めることができます。

   {{% /tab %}}

   {{% tab "プライバシー" %}}

   [**Do not capture any screenshots for this test**] (このテストのスクリーンショットを撮影しない) を選択して、テストステップでスクリーンショットが撮影されないようにします。

   このプライバシーオプションは、個々のテストステップレベルで[詳細オプション][1]として利用でき、テスト結果に機密データが表示されないようにすることができます。テストによるスクリーンショットの撮影を防止すると、失敗のトラブルシューティングがより困難になります。詳細については、[データセキュリティ][2]を参照してください。

[1]: /ja/synthetics/browser_tests/advanced_options#prevent-screenshot-capture
[2]: /ja/data_security/synthetics
   {{% /tab %}}

   {{% tab "開始 URL" %}}

   最初のテストステップを失敗と宣言する前に待機する時間を秒単位で入力します。

   {{% /tab %}}

   {{% tab "時間と言語" %}}

  デフォルトでは、タイムゾーンは UTC に、言語は英語 (en) に設定されています。言語を定義するには、対応する 2 文字または 3 文字の [ISO コード][1]を使用します。

[1]: https://www.loc.gov/standards/iso639-2/php/code_list.php

   {{% /tab %}}

   {{% tab "ブロックされたリクエスト" %}}

   テストの実行中に読み込まれないようにブロックするリクエストパターンを 1 つ以上入力します。[一致パターンの形式][1]を使用して、1 行に 1 つずつリクエストパターンを入力してください。ワイルドカード (`*://*.example.com/*` など) がサポートされています。

   ブロックされたリクエストは、テストの実行時にはスキップされますが、[ステップの記録](/synthetics/browser_tests/test_steps)時のページのレンダリングには影響しません。テスト実行の [[Resources] (リソース) タブ](/synthetics/browser_tests/test_results#resources)で、ブロックされたリクエストを表示できます。ブロックされたリクエストのステータスは `blocked` です。

[1]: https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns

   {{% /tab %}}

   {{< /tabs >}}

{{% synthetics-variables %}}

### グローバル変数を使用する {#use-global-variables}

[[**Settings**] (設定) で定義されたグローバル変数][4]は、ブラウザテストの詳細の [**Starting URL**] (開始 URL) や [**Advanced Options**] (高度なオプション) のほか、テスト記録で使用することができます。

利用可能な変数の一覧を表示するには

- ブラウザテストの詳細で: 目的のフィールドに `{{` と入力します。

  {{< img src="synthetics/browser_tests/use_global_variables_1.mp4" alt="グローバル変数からローカル変数を定義する" video="true" width="90%" >}}

- ブラウザテストのレコーダーで: テストに変数をインポートし、目的のフィールドに `{{` を入力するか、アプリケーションに変数を挿入して使用します。

  {{< img src="synthetics/browser_tests/use_global_variables_2.mp4" alt="ブラウザ記録中にフィールドにローカル変数を挿入する" video="true" width="90%" >}}

ブラウザテストの記録で変数を使用する方法については、[ブラウザテストの手順][5]を参照してください。

### アラート条件を定義する {#define-alert-conditions}

アラート条件をカスタマイズして、テストが通知アラートを送信する状況を定義できます。

{{< img src="synthetics/browser_tests/alerting_rules_2.png" alt="ブラウザテストのアラートルール" style="width:80%" >}}

#### アラートルール{#alerting-rule}

`N` のうち `n` の数のロケーションで、`X` の時間 (分) 継続してアサーションが失敗した場合は、アラートがトリガーされます。このアラートルールにより、通知をトリガーする前にテストが失敗する必要がある時間とロケーションの数を指定できます。

次の 2 つの条件が当てはまる場合にのみアラートがトリガーされます。

- 直近 X 分間に、最低 1 個のロケーションで失敗 (最低 1 つのアサーションが失敗)、
- 直近 X 分間に、ある時点で最低 `N` 個のロケーションで失敗。

失敗した場合、ロケーションが失敗としてマークされる前に `X` 回再試行します。これにより、ロケーションが失敗と見なされるために必要なテストの連続失敗回数を定義できます。デフォルトでは、失敗したテストを再試行する前に `300ms` 待機します。この間隔は [API][6] で構成できます。

#### 高速リトライ {#fast-retry}

高速リトライを使用すると、テストが失敗した場合に、失敗としてマークする前にテストを Y ミリ秒後に X 回再試行できます。再試行の間隔をカスタマイズすることで、誤検知を減らし、アラートの精度を向上させることができます。

ロケーションのアップタイムは、再試行が完了した後の最終的なテスト結果に基づいて計算されるため、高速リトライの間隔は、合計アップタイムのグラフに表示される内容に直接影響します。合計アップタイムは、構成されたアラート条件に基づいて計算され、通知は、合計アップタイムに基づいて送信されます。

<div class="alert alert-info">
Synthetic Monitoring の通知がテスト結果を評価してアラートをトリガーする方法の詳細については、<a href="/synthetics/guide/how-synthetics-monitors-trigger-alerts/">Synthetic Monitor のアラートについて</a>を参照してください。
</div>

{{% synthetics-downtimes %}}

### テストモニターを構成する {#configure-the-test-monitor}

通知は、一連のアラート条件に従って送信されます。このセクションを使用して、チームにメッセージを送信する方法と内容を定義します。

1. ブラウザテスト用の**メッセージ**を入力するか、事前入力されたモニターメッセージを使用します。このフィールドでは、標準の[マークダウン形式][7]のほか、以下の[条件付き変数][8]を使用できます。

    | 条件付き変数       | 説明                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | Show when the monitor alerts.                                       |
    | `{{^is_alert}}`            | Show unless the monitor alerts.                                     |
    | `{{#is_recovery}}`         | Show when the monitor recovers from `alert`.                          |
    | `{{^is_recovery}}`         | Show unless the monitor recovers from `alert`.                        |
    | `{{#is_renotify}}`         | Show when the monitor renotifies.                                   |
    | `{{^is_renotify}}`         | Show unless the monitor renotifies.                                 |
    | `{{#is_priority}}`         | Show when the monitor matches priority (P1 to P5).                  |
    | `{{^is_priority}}`         | モニターが優先順位 (P1 ～ P5) に一致しない限り表示します。               |

    Notification messages include the **message** defined in this section and information about the failing locations. Pre-filled monitor messages are included in the message body section:

     {{< img src="/synthetics/browser_tests/browser_tests_pre-filled.png" alt="事前入力されたモニターメッセージが強調表示されている Synthetic Monitoring のモニターセクション" style="width:100%;" >}}

     For example, to create a monitor that iterates over steps extracting variables for browser tests, add the following to the monitor message:

   ```text
   {{!成功したすべてのステップで抽出された変数を一覧表示 }}
   # 抽出された変数
   {{#each synthetics.attributes.result.steps}}
   {{#if extractedValue}}
   * **Name**: `{{extractedValue.name}}`
   **Value:** {{#if extractedValue.secure}}*Obfuscated (value hidden)*{{else}}`{{{extractedValue.value}}}`{{/if}}
   {{/if}}
   {{/each}}
   ```

2. Choose team members and services to notify.
3. Specify a renotification frequency. To prevent renotification on failing tests, check the option `Stop re-notifying on X occurrences`.
4. Click **Save & Start Recording** to save your test configuration and record your browser steps.

For more information, see [Synthetic Monitoring notifications][9].

## Record your steps 

Tests can be only recorded from [Google Chrome][10] and [Microsoft Edge][18]. To record your test, download the [Datadog Record Test extension][11].

You can switch tabs in a browser test recording to perform an action on your application (such as clicking on a link that opens another tab) and add another test step. Your browser test must interact with the page first (through a click) before it can perform an [assertion][12]. By recording all of the test steps, the browser test can switch tabs automatically at test execution.

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="ブラウザテストのテストの記録" width="90%" >}}

1. 必要に応じて、ページの右上にある [**Open in a pop-up**] (ポップアップで開く) を選択して、別のポップアップウィンドウでテスト記録を開きます。これは、アプリケーションが iframe で開くことをサポートしていない場合、または記録時のサイズの問題を回避したい場合に役立ちます。**シークレットモード**でポップアップを開いて、ログイン済みのセッションや既存のブラウザからのクッキーなどを使用せずに、新しいブラウザからテストの記録を開始することもできます。
2. オプションとして、ブラウザテストからステップの記録を実行する際に、Datadog が自動的に RUM データを収集するように設定します。詳細については、[RUM とセッションリプレイの確認][13]を参照してください。
3. [**Start Recording**] (記録を開始) をクリックして、ブラウザテストの記録を開始します。
4. アプリケーションをクリックして、監視したいユーザージャーニーを実行すると、アクションが自動的に記録され、左側のブラウザテストシナリオ内で[ステップ][14]を作成するために使用されます。
5. 自動的に記録されたステップに加えて、左上隅にある[ステップ][14]を使用して、シナリオを強化することもできます。
   {{< img src="synthetics/browser_tests/manual_steps.png" alt="ブラウザテストのステップ" style="width:80%;">}}

   ブラウザテストによって実行されたジャーニーが期待される状態になったことを確認するために、Datadog では、ブラウザテストを**[アサーション][12]**で終了することを推奨します。
6. シナリオが終了したら、[**Save and Launch Test**] (保存してテストを起動) をクリックします。

## ステップをリプレイする {#replay-your-steps}

ブラウザテストの 1 つまたは複数のステップを直接ブラウザで再実行するには、[Datadog Record Test 拡張機能][11]をダウンロードします。

ステップリプレイ機能は、個々のステップをデバッグしたり、ブラウザテストを編集する際にアプリケーションを正しい状態にしたり、テストを保存する前にフロー全体を確認したりするのに役立ちます。

**注**: ステップリプレイは、異なる条件 (ブラウザのバージョン、ネットワーク、ユーザーエージェント、ログイン状態) や制限により、Synthetic Monitoring テストの完全な実行とは異なる動作をする場合があります。

### ステップリプレイの使用方法 {#how-to-use-step-replay}

ステップをリプレイする方法は 3 つあります。

<strong>1. 単一ステップのリプレイ:</strong> 単一のステップを再実行します。
{{< img src="synthetics/browser_tests/recording__replay--replay-one-step_1.mp4" alt="単一ステップのリプレイ" video="true" height="400px" >}}
<p style="text-align: center;"><em>ステップにカーソルを合わせ、再生ボタンをクリックしてそのステップのみをリプレイします。</em></p>

<strong>2. すべてのステップをリプレイ:</strong> レコーダーで定義されたステップの全シーケンスを実行します。
{{< img src="synthetics/browser_tests/recording__replay--replay-all-steps_1.mp4" alt="すべてのステップをリプレイ" video="true" height="400px" >}}
<p style="text-align: center;"><em>ステップリストの上部にある ⏩︎ (すべてをリプレイ) ボタンをクリックして、すべてのステップをリプレイします。</em></p>

<strong>3. 選択したステップをリプレイ:</strong> ステップリストで選択したステップのサブセットを実行します。
{{< img src="synthetics/browser_tests/recording__replay--replay-selected-steps_1.mp4" alt="選択したステップをリプレイ" video="true">}}
<p style="text-align: center;"><em>リプレイしたいステップを選択し、ステップリストの上部にある ⏩︎ (選択したものをリプレイ) ボタンをクリックします。</em></p>

### ステップリプレイ機能のサポート {#step-replay-feature-support}

以下の表は、ステップリプレイでサポートされているブラウザテストのステップタイプをまとめたものです。

| ステップタイプ                | ステップリプレイによるサポート | 備考 |
|--------------------------|:------------------------:|-------|
| 変数を抽出         | {{< X >}}                       |       |
| URL に移動                | {{< X >}}                       |       |
| 更新                  | {{< X >}}                       |       |
| スクロール                   | {{< X >}}                       |       |
| オプションを選択            | {{< X >}}                       |       |
| 待機                     | {{< X >}}                       |       |
| API テストを実行             | {{< X >}}                       |       |
| チェックボックスの状態をアサート    | {{< X >}}                       |       |
| 現在の URL をアサート       | {{< X >}}                       |       |
| 要素の属性をアサート | {{< X >}}                       |       |
| 要素の内容をアサート   | {{< X >}}                       |       |
| 要素の存在をアサート   | {{< X >}}                       |       |
| ファイルのダウンロードをアサート     | {{< X >}}                       |       |
| ページに含まれていることをアサート     | {{< X >}}                       |       |
| ページに含まれていないことをアサート        | {{< X >}}                       |       |
| JavaScript からアサート   | {{< X >}}                       |       |
| JavaScript から抽出  | {{< X >}}                       |       |
| キーを押下                | {{< X >}}                       |       |
| テキストを入力                | {{< X >}}                       |       |
| クリック                    | {{< X >}}*                      | *Click steps are supported, but may behave differently than in a full Synthetic Monitoring test run. |
| ホバー                    | {{< X >}}*                      | *Hover steps are supported, but may behave differently than in a full Synthetic Monitoring test run. |

### ステップリプレイでサポートされていないステップタイプ {#step-types-not-supported-by-step-replay}

| ステップタイプ                | ステップリプレイによるサポート |
|--------------------------|:------------------------:|
| メールをアサート             | まだサポートされていません        |
| リクエストをアサート          | まだサポートされていません        |
| メール本文から抽出  | まだサポートされていません        |
| メールリンクに移動         | まだサポートされていません        |
| ファイルをアップロード             | まだサポートされていません        |

### デバッガー権限 {#debugger-permission}

JavaScript ベースのステップやキーストロークのシミュレーションなどのいくつかのステップでは、Synthetic Monitoring テストの完全な実行にできるだけ近づけるためにリプレイにデバッガー権限が必要になります。

デバッガー権限を必要とするバージョンに初めて更新されたときに権限リクエストが表示され、それが承認されるまでこの拡張機能は無効になります。
{{< img src="synthetics/browser_tests/recording__replay--accepting-permission_2.mp4" alt="デバッガー権限を受け入れる" video="true" height="400px" >}}
<p style="text-align: center;"><em>3 つの点  {{< img src="icons/kebab.png" inline="true" style="width:14px;">}}  のメニューをクリックして権限を受け入れます。</em></p>

## 権限 {#permissions}

デフォルトでは、[Datadog 管理者および Datadog 標準のロール][15]を持つユーザーのみが、Synthetic ブラウザテストを作成、編集、削除できます。Synthetic ブラウザテストの作成、編集、削除のアクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][15]のいずれかにアップグレードします。

[カスタムロール機能][15]を使用している場合は、`synthetics_read` および `synthetics_write` の権限を含むカスタムロールにユーザーを追加します。

### アクセス制限 {#restrict-access}

ロール、チーム、または個々のユーザーに基づいてテストへのアクセス権を制限するには、[きめ細かなアクセス制御][17]を使用します。

1. フォームの権限セクションを開きます。
2. [**Edit Access**] (アクセスの編集) をクリックします。
  {{< img src="synthetics/settings/grace_2.png" alt="プライベートロケーションの構成フォームからテストの権限を設定する" style="width:100%;" >}}
3. [**Restrict Access**] (アクセスの制限) をクリックします。
4. チーム、ロール、またはユーザーを選択します。
5. [**Add**] (追加) をクリックします。
6. それぞれに関連付けたいアクセスレベルを選択します。
7. [**Done**] (完了) をクリックします。

<div class="alert alert-info">プライベートロケーションへの Viewer アクセス権がなくても、プライベートロケーションから結果を表示できます。</div>

| アクセスレベル | テスト構成を表示 | テスト構成を編集 | テスト結果を表示 | テストを実行 | 記録を表示 | 記録を編集 |
| ------------ | ----------------------- | ----------------------- | ------------------| --------- | -------------- | -------------- |
| No access    |                         |                         |                   |           |                |                |
| Viewer       | {{< X >}}               |                         | {{< X >}}         |           |                |                |
| Editor       | {{< X >}}               | {{< X >}}               | {{< X >}}         | {{< X >}} | {{< X >}}      | {{< X >}}      |

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
[18]: https://www.microsoft.com/edge
[19]: /ja/synthetics/guide/how-synthetics-monitors-trigger-alerts/