---
aliases:
- /ja/synthetics/browser_check
- /ja/synthetics/browser_test
description: 特定の場所からユーザー操作をシミュレートして監視します。
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: ブログ
  text: ブラウザテストによるユーザーエクスペリエンスの監視
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: ブログ
  text: エンドツーエンドテスト作成のベストプラクティス
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: ラーニングセンター
  text: Synthetic テストの紹介
- link: /getting_started/synthetics/browser_test
  tag: ドキュメント
  text: ブラウザテストの概要
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentation
  text: Synthetic テストモニターについて
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Terraform
  text: Terraform による Synthetic ブラウザテストの作成と管理
kind: ドキュメント
title: ブラウザテスト
---

## 概要

ブラウザテストは、Datadog が Web アプリケーション上で実行するシナリオです。世界中の複数の場所からさまざまなブラウザおよびデバイスを使用して実行され、テスト間隔は自由に設定できます。これらのテストは、アプリケーションが稼働してリクエストに応答していること、シナリオで定義された条件が満たされていることを確認します。

<div class="alert alert-info">MFA の背後にあるアプリケーションのテストに興味がある場合は、<a href="/synthetics/guide/app-that-requires-login/#multi-factor-authentication" target="_blank">専用ガイド</a>を読み、<a href="https://docs.google.com/forms/d/e/1FAIpQLSdjx8PDZ8kJ3MD2ehouTri9z_Fh7PoK90J8arRQgt7QFgFxog/viewform?usp=sf_link">フィードバックを送信</a>して、Synthetic Monitoring チームがお客様のチームにとって最も重要なシステムの構築をできるようサポートしてください。</div>

## テストコンフィギュレーション

ブラウザテストの構成を定義します。

1. **Starting URL** を入力します。ブラウザテストがシナリオを開始する URL です。
2. **Advanced Options** を追加します (オプション)。ブラウザテストに特定のオプションを設定します。

   {{< tabs >}}

   {{% tab "リクエストオプション" %}}

   クロスオリジンリソース共有 (CORS) ポリシーがテストをブロックするのを防ぐには、**Disable CORS** を選択します。コンテンツセキュリティポリシー (CSP) がテストをブロックするのを防ぐには、**Disable CSP** を選択します。

   * **Request Headers**: **Name** および **Value* フィールドでヘッダーを定義して、デフォルトのブラウザヘッダーに追加またはオーバーライドします。たとえば、ヘッダーに User Agent を設定して、[Datadog スクリプトを識別][1]できます。
   * **Cookies**: ブラウザのデフォルトのクッキーに追加するクッキーを定義します。1 行に 1 つのクッキーを入力し、[`Set-Cookie`][2] の構文を使用します。
   * **HTTP Authentication**: HTTP Basic、Digest または NTLM を使用し、ユーザー名とパスワードで認証を行います。資格情報は、ブラウザテストのすべてのステップで使用されます。

   リクエストオプションは、テストの実行ごとに設定され、記録時ではなく、実行時にブラウザテストのすべてのステップに適用されます。次の手順を記録するためにこれらのオプションをアクティブのままにしておく必要がある場合は、記録元のページにオプションを手動で適用し、テストの後続の手順を作成します。


[1]: /ja/synthetics/guide/identify_synthetics_bots/?tab=apitests
[2]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   {{% /tab %}}

   {{% tab "証明書" %}}

   **Ignore server certificate error** を選択すると、テストでサーバー証明書のエラーをスキップするように指示されます。

   * **Client Certificate**: クライアント証明書を必要とするシステムでテストを行うには、**Upload File** をクリックして、証明書ファイルと秘密鍵をアップロードしてください。PEM 証明書のみ受け付けます。
   * **Client Certificate Domains**: 証明書ファイルをアップロードすると、クライアント証明書は、開始 URL のドメインに適用されます。別のドメインにクライアント証明書を適用する場合は、**Value** 欄でドメインを指定します。 

   URL にワイルドカードを含めることができます。

   {{% /tab %}}

   {{% tab "プロキシ" %}}

   **Proxy URL** フィールドに、リクエストを送信するプロキシの URL を `http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>` として入力します。

   URL に[グローバル変数](#use-global-variables)を含めることができます。

   {{% /tab %}}

   {{% tab "Privacy" %}}

   **Do not capture any screenshots for this test** を選択して、テストステップでスクリーンショットが撮影されないようにします。

   このプライバシー オプションは、個々のテストステップレベルで[詳細オプション][1]として利用でき、テスト結果に機密データが表示されないようにすることができます。テストによるスクリーンショットの撮影を防止すると、失敗のトラブルシューティングがより困難になります。詳細については、[データセキュリティ][2]を参照してください。

[1]: /ja/synthetics/browser_tests/advanced_options#prevent-screenshot-capture
[2]: /ja/data_security/synthetics
   {{% /tab %}}

   {{% tab "開始 URL" %}}

最初のテストステップを失敗と宣言する前に待機する時間を秒単位で入力します。

   {{% /tab %}}

   {{< /tabs >}}

3. **名前**を追加します。ブラウザテストの名前です。
4. **環境と追加タグ**を選択します。ブラウザのテストにアタッチされる `env` と関連するタグを設定します。与えられた `<KEY>` に対する `<VALUE>` をフィルタリングするには、`<KEY>:<VALUE>` という形式を使用します。
5. **ブラウザとデバイス**を選択します。テストを実行するブラウザ (`Chrome`、`Firefox`、`Edge` など) とデバイス (`Laptop Large`、`Tablet`、`Mobile Small` など) です。
   - 大型のラップトップデバイスの場合、寸法は 1440 ピクセル × 1100 ピクセルです。
   - タブレットデバイスの場合、寸法は 768 ピクセル × 1020 ピクセルです。
   - 小型のモバイルデバイスの場合、寸法は 320 ピクセル × 550 ピクセルです。
6. **管理ロケーションとプライベートロケーション**を選択します。Datadog が管理する世界中のロケーションを選択するか、[プライベートロケーション][1]を作成して、カスタムロケーションやプライベートネットワーク内からブラウザテストを実行することができます。

   {{% managed-locations %}}

   また、[Continuous Testing Tunnel][15] を使用すると、ローカルの開発環境や CI/CD パイプライン内でテストをトリガーし、内部環境をテストすることができます。

7. **テスト頻度**を設定します。間隔は 5 分に 1 回から週に 1 回までさまざまです。1 分単位の頻度を希望する場合は、[サポートにお問い合わせ][2]ください。

{{% synthetics-variables %}}

### グローバル変数を使用する

[**Settings** で定義されたグローバル変数][3]は、ブラウザテストの詳細の **Starting URL** や **Advanced Options** のほか、テスト記録で使用することができます。

利用可能な変数の一覧を表示するには

- ブラウザテストの詳細で: 目的のフィールドに `{{` と入力します。

  {{< img src="synthetics/browser_tests/recording_global_variable_1.mp4" alt="グローバル変数からローカル変数を定義する" video="true" width="90%" >}}

- ブラウザテストのレコーダーで: テストに変数をインポートし、目的のフィールドに `{{` を入力するか、アプリケーションに変数を挿入して使用します。

  {{< img src="synthetics/browser_tests/recording_inject_variable_1.mp4" alt="ブラウザレコーディング時にローカル変数をフィールドに挿入する" video="true" width="90%" >}}

ブラウザテストの記録で変数を使用する方法については、[ブラウザテストの手順][4]を参照してください。

### アラート条件を定義する

アラートの条件をカスタマイズして、通知アラートの送信をテストする状況を定義できます。

{{< img src="synthetics/browser_tests/alerting_rules.png" alt="ブラウザテストのアラートルール" style="width:80%" >}}

* `N` のうち `n` の数の場所で、`X` の時間（分）継続してアサーションが失敗した場合は、アラートがトリガーされます。このアラートルールにより、通知をトリガーする前にテストが失敗する必要がある時間と場所の数を指定できます。
* 場所が失敗としてマークされる前に、`X` 回再試行します。これにより、場所が失敗と見なされるために、連続していくつのテスト失敗が発生する必要があるかを定義できます。デフォルトでは、失敗したテストを再試行する前に 300 ミリ秒待機します。この間隔は、[API][5] で構成できます。

### テストモニターを構成する

設定されたアラート条件に従って、通知が送信されます。このセクションを使用して、チームにメッセージを送る方法と内容を定義します。

1. ブラウザテストの**メッセージ**を入力します。このフィールドでは、標準の[マークダウン形式][6]のほか、以下の[条件付き変数][17]を使用できます。

    | 条件付き変数       | 説明                                                         |
    |----------------------------|---------------------------------------------------------------------|
    | `{{#is_alert}}`            | モニターがアラートを発する場合に表示します。                                       |
    | `{{^is_alert}}`            | モニターがアラートを発しない限り表示します。                                     |
    | `{{#is_recovery}}`         | モニターが `alert` から回復したときに表示します。                          |
    | `{{^is_recovery}}`         | モニターが `alert` から回復しない限り表示します。                        |
    | `{{#is_renotify}}`         | モニターが再通知したときに表示します。                                   |
    | `{{^is_renotify}}`         | モニターが再通知しない限り表示します。                                 |
    | `{{#is_priority}}`         | モニターが優先順位 (P1～P5) に一致したときに表示します。                  |
    | `{{^is_priority}}`         | モニターが優先順位 (P1～P5) に一致しない限り表示します。                |

    通知メッセージには、このセクションで定義された**メッセージ**や、失敗した場所に関する情報が記載されます。

2. 通知するメンバーやサービスを選択します。
3. 再通知の頻度を指定します。テストの失敗を再通知しない場合は、`Never renotify if the monitor has not been resolved` オプションを使用してください。
4. **Save Details and Record Test** をクリックすると、テストの構成が保存され、ブラウザのステップが記録されます。

詳しくは、[Synthetic テストモニターの使用][7]をご覧ください。

## ステップを記録する

テストの記録を実行できるのは [Google Chrome][8] だけです。テストを記録するには、[Google Chrome 用の Datadog test recorder][9] をダウンロードする必要があります。

アプリケーション上でアクションを実行するために (リンクをクリックして別のタブを開くなど) ブラウザテストの記録でタブを切り替え、別のテストステップを追加することができます。ブラウザテストは、[アサーション][10]を実行する前に、まず (クリックによって) ページと相互作用する必要があります。すべてのテストステップを記録することによって、ブラウザテストはテスト実行時に自動的にタブを切り替えることができます。

{{< img src="synthetics/browser_tests/browser_check_record_test.png" alt="ブラウザでのテストの記録" width="90%" >}}

1. 必要に応じて、ページの右上にある **Open in a pop-up** を選択して、別のポップアップウィンドウでテスト記録を開きます。これは、アプリケーションが iframe で開くことをサポートしていない場合、または記録時のサイズの問題を回避したい場合に役立ちます。**シークレットモード**でポップアップを開いて、ログイン済みのセッションや既存のブラウザからの Cookie などを使用せずに、新しいブラウザからテストの記録を開始することもできます。
2. オプションとして、ブラウザテストからステップの記録を実行する際に、Datadog が自動的に RUM データを収集するように設定します。詳細については、[RUM とセッションリプレイの確認][11]を参照してください。
3. **Start Recording** をクリックして、ブラウザテストの記録を開始します。
4. 監視したいユーザージャーニーを通過するアプリケーションをクリックすると、アクションが自動的に記録され、左側のブラウザテストシナリオ内で[ステップ][12]を作成するために使用されます。
5. 自動的に記録されたステップに加えて、左上隅にある[ステップ][12]を使用して、シナリオを強化することもできます。
   {{< img src="synthetics/browser_tests/manual_steps.png" alt="ブラウザテストのステップ" style="width:80%;">}}

   ブラウザテストによって実行されたジャーニーが期待される状態になったことを確認するために、Datadog では、ブラウザテストは**[アサーション][10]**で終了することを推奨します。
6. シナリオが終了したら、**Save and Launch Test** をクリックします。

## 権限

デフォルトでは、[Datadog 管理者および Datadog 標準ロール][13]を持つユーザーのみが、Synthetic ブラウザテストを作成、編集、削除できます。Synthetic ブラウザテストの作成、編集、削除アクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][13]のいずれかにアップグレードします。

[カスタムロール機能][13]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

### アクセス制限

アカウントに[カスタムロール][14]を使用しているお客様は、アクセス制限が利用可能です。

組織内の役割に基づいて、ブラウザテストへのアクセスを制限することができます。ブラウザテストを作成する際に、(ユーザーのほかに) どのロールがテストの読み取りと書き込みを行えるかを選択します。

{{< img src="synthetics/settings/restrict_access_1.png" alt="テストの権限の設定" style="width:70%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/private_locations/
[2]: /ja/help/
[3]: /ja/synthetics/settings/#global-variables
[4]: /ja/synthetics/browser_tests/actions#variables
[5]: /ja/api/latest/synthetics/#create-or-clone-a-test
[6]: http://daringfireball.net/projects/markdown/syntax
[7]: /ja/synthetics/guide/synthetic-test-monitors
[8]: https://www.google.com/chrome
[9]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[10]: /ja/synthetics/browser_tests/actions/#assertion
[11]: /ja/synthetics/guide/explore-rum-through-synthetics/
[12]: /ja/synthetics/browser_tests/actions/
[13]: /ja/account_management/rbac#custom-roles
[14]: /ja/account_management/rbac/#create-a-custom-role
[15]: /ja/continuous_testing/environments/proxy_firewall_vpn
[16]: /ja/synthetics/guide/browser-tests-passkeys
[17]: /ja/monitors/notify/variables/?tab=is_alert#conditional-variables