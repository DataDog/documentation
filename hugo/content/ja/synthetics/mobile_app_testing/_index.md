---
aliases:
- /ja/mobile_testing
- /ja/mobile_app_testing
- /ja/mobile_app_testing/mobile_app_tests/
cascade:
  algolia:
    tags:
    - mobile_testing
description: インテリジェントで自己メンテナンス可能なモバイルテストを作成し、モバイルアプリケーションの最も重要な部分が実デバイスから稼働していることを確認します。
further_reading:
- link: /synthetics/mobile_app_testing/
  tag: ドキュメント
  text: Synthetic モバイルアプリテストの作成方法
- link: /synthetics/mobile_app_testing/settings
  tag: ドキュメント
  text: iOS または Android モバイルアプリケーションをアップロードする方法
- link: /continuous_testing/
  tag: ドキュメント
  text: Continuous Testing & CI/CD について
- link: /synthetics/guide/version_history/
  tag: ガイド
  text: Synthetic Monitoring のバージョン履歴
- link: /synthetics/guide/mobile-test-auth-tokens/
  tag: ガイド
  text: モバイルアプリケーションテストでの認証トークンの挿入と自動更新
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: ブログ
  text: Datadog Synthetic Monitoring を使用してユーザージャーニー全体のトラブルシューティングを簡素化する
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: ブログ
  text: エンドツーエンドテスト作成のベストプラクティス
- link: https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/
  tag: ブログ
  text: モバイルアプリ向けの信頼性が高く正確な Synthetic テストを構築する方法
- link: /api/latest/synthetics/#create-or-clone-a-test
  tag: API
  text: Synthetics API
title: モバイルアプリケーションのテストと監視
---
## 概要 {#overview}

モバイルアプリケーションのテストでは、Android および iOS アプリケーションのキーとなるビジネスフローを、実際のデバイスを使用してテストおよび監視することができます。
Datadog は、これらのテストを実際のデバイス上で実行し、主要なアプリケーションのワークフロー、各ステップのスクリーンショット、詳細な合否結果をリアルにステップバイステップで表示し、チームが問題を迅速に視覚化できるようにします。
モバイルアプリのテストは、スケジュール、オンデマンド、または [CI/CD パイプライン][1]内で直接実行できます。

オプションとして、テスト対象のアプリケーション内で [RUM SDK][15] が使用されている場合、Synthetic モバイルテストデータを RUM モバイルデータとリンクさせることができます。

Datadog でモバイルアプリテストを作成するには、[{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}New Test{{< /ui >}}][12] に移動して {{< ui >}}Mobile Application Test{{< /ui >}} を選択します。

{{< img src="mobile_app_testing/new_test_2.png" alt="Synthetic モバイルテストを作成する" style="width:50%;">}}

## 構成 {#configuration}

次のいずれかの方法でテストを作成します。

### テンプレートからテストを作成する {#create-a-test-from-a-template}

  1. 事前設定済みテンプレートのいずれかにカーソルを合わせて、{{< ui >}}View Template{{< /ui >}} をクリックします。すると、テストの詳細、リクエストの詳細、アラートの条件、ステップなど、あらかじめ設定された構成情報が表示されるサイドパネルが開きます。
  2. {{< ui >}}\+ Create Test{{< /ui >}} をクリックして構成ページを開きます。このページで、あらかじめ設定された構成オプションを確認および編集できます。表示されるフィールドは、テストを一から作成する際に利用可能なフィールドと同じです。
  3. 右上にある {{< ui >}}Save & Quit{{< /ui >}} をクリックして、モバイルアプリケーションテストを送信します。<br /><br>
       {{< img src="/mobile_app_testing/templates_mobile_app.mp4" alt="テンプレートを使用したモバイルアプリケーションテストのランディングページの動画" video="true" >}}

### テストを一から作成する {#build-a-test-from-scratch}

  1. {{< ui >}}\+{{< /ui >}} テンプレートをクリックし、ドロップダウンメニューからモバイルアプリケーションを選択します。まだ作成していない場合は、[{{< ui >}}Synthetic Monitoring & Continuous Testing Settings{{< /ui >}} ページ][3]の [{{< ui >}}Applications List{{< /ui >}} セクション][2]でモバイルアプリケーションを作成してください。
  1. {{< ui >}}version{{< /ui >}} を選択するか、{{< ui >}}Always run the latest version{{< /ui >}} をクリックすると、テストが実行されるたびにモバイルアプリケーションの最新バージョンが使用されます。
  1. テストの {{< ui >}}name{{< /ui >}} を追加します。
  1. テストに関連する {{< ui >}}environment and additional tags{{< /ui >}} を選択します。特定の `<KEY>` の `<VALUE>` でフィルタリングするには `<KEY>:<VALUE>` 形式を使用します。
  1. テストを実行する [{{< ui >}}devices{{< /ui >}}](#devices) を選択します。
  1. テストの[再試行条件](#test-retries)を設定します。
  1. 基本的な時間間隔をクリックして [{{< ui >}}test frequency{{< /ui >}}](#scheduling-and-alerts) を設定するか、テスト頻度と {{< ui >}}alert conditions{{< /ui >}} をテストモニター用にカスタマイズします。
  1. テストモニターの名前を入力し、通知するサービスまたはチームメンバーを選択し、メッセージ通知を追加します。
  1. {{< ui >}}Save & Edit Recording{{< /ui >}} をクリックして、モバイルアプリケーションテストを送信します。

### スニペット {#snippets}

新しいモバイルアプリケーションテストを構成する際は、スニペットを使用すると、OS バージョン、デバイスサイズ、メーカー、稼働時間などを手動で選択する代わりに自動的に入力できます。利用可能なスニペットは以下のとおりです。

* {{< ui >}}Device Size{{< /ui >}}: 特定のサイズの画面でモバイルアプリケーションテストを自動的に実行します。

  - {{< ui >}}Multi-screen size{{< /ui >}}
  - {{< ui >}}Tablet{{< /ui >}}
  - {{< ui >}}Large Screen (iOS only){{< /ui >}}
  - {{< ui >}}Standard Screen (iOS only){{< /ui >}}
  - {{< ui >}}Small Screen (iOS only){{< /ui >}}

* {{< ui >}}OS Version{{< /ui >}}: iOS または Android アプリを複数バージョンで自動的にテストします。この選択は、モバイルアプリケーションの種類に応じて iOS または Android のいずれかに切り替わります。

* {{< ui >}}Device Manufacturer (Android only){{< /ui >}}: 複数のデバイスメーカーにわたって Android アプリを自動的にテストします。

* {{< ui >}}Uptime{{< /ui >}}: 利用可能な最短間隔 (15 分ごと) でテストを自動的に設定します。

<br/>
  {{< img src="mobile_app_testing/mobile_app_snippets_2.png" alt="利用可能なスニペットの例が表示されている、モバイルアプリテスト作成画面の左側を示すスクリーンショット" width="70%" >}}

### 高度なオプション {#advanced-options}

モバイルテストの作成時に高度なオプションを設定することで、コードを変更せずにアプリの動作を動的に調整できます。たとえば、アラートの自動承認、アプリケーションのクラッシュの許可、ネットワークリソースのキャプチャなどが可能です。これらの設定には、モバイルテストの {{< ui >}}Advanced Options{{< /ui >}} セクションからアクセスできます。

#### テスト動作オプション: {#test-behavior-options}

{{< ui >}}Auto-accept alerts{{< /ui >}}
: 有効にすると、テスト実行中にすべての OS システムアラートを自動的に承認します。

{{< ui >}}Allow application crash{{< /ui >}}
: 有効にすると、アプリケーションのクラッシュが検出されてもテストが失敗することを防げます。テストを続行するには、想定されるクラッシュの後にアプリケーションを再起動するステップを含める必要があります。

{{< ui >}}Capture network resources{{< /ui >}}
: 有効にすると、各テストステップのネットワークリクエストとレスポンスを収集し、結果に表示します。</br>
**注**: この設定はアプリケーションパフォーマンスに影響を与える可能性があり、アプリが起動しなくなる場合があります。

#### アプリケーション引数: {#application-arguments}

テスト開始時に `key:value` ペアをアプリケーションに渡すことで、プログラムからアプリの動作を変更できます。アプリケーションコードは、これらのキーと値のペアを明示的に読み取って処理するように構成されている必要があります。

たとば、[自動更新される認証トークンを挿入][17]して、アプリのログインフローをスキップします。

**例:**

{{< tabs >}}
{{% tab "Android (初期インテントの追加データ)" %}}

Android テストの場合は、テストの高度なオプションセクションに適切な `key:value` ペアを追加します。

```json
{
  "username": "example_user",
  "password": "{{ EXAMPLE_VARIABLE }}"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_android.png" alt="Android デバイス向けの高度なオプションの例を示す、モバイルアプリケーションテスト作成ページ" style="width:100%;" >}}
{{% /tab %}}

{{% tab "iOS (プロセス引数)" %}}

iOS テストの場合は、高度なオプションセクションに適切な `key:value` ペアを追加します。

```json
{
  "username": "example_user",
  "password": "{{ EXAMPLE_VARIABLE }}",
  "enable_feature_x": "true"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_iOS.png" alt="iOS デバイス向けの高度なオプションの例を示す、モバイルアプリケーションテスト作成ページ" style="width:100%;" >}}
    
{{% /tab %}}
{{< /tabs >}}

## デバイス {#devices}

デバイス選択画面では、ヨーロッパ (EU) または米国 (US) にあるモバイルデバイスのどちらでテストするかを選択できます。
EU または米国でホストされているデバイスを使用するようにモバイルテストを構成するには、以下の手順を実行します。

1. 既存のモバイルテストのテスト編集ページを開くか、新しいテストを作成します。
2. {{< ui >}}Devices{{< /ui >}} セクションを展開し、テストのデバイスの場所を選択します。
   - {{< ui >}}All locations{{< /ui >}}: EU と米国の両方でテストを実行します。
   - {{< ui >}}EU{{< /ui >}}: EU でのみテストを実行します。
   - {{< ui >}}US{{< /ui >}}: 米国でのみテストを実行します。
3. {{< ui >}}Select Device(s){{< /ui >}} ドロップダウンを使用して、テスト対象のデバイスを選択します。
4. {{< ui >}}Save & Edit Recording{{< /ui >}} をクリックして、テスト構成を保存します。

**注**:
- 米国でホストされているデバイスで実行されるテストは、AWS 米国西部 (オレゴン) から実行されます。同様に、EU でホストされているデバイスでのテストは、AWS ドイツ (フランクフルト) から実行されます。
- すべてのデバイスが EU と米国の両方で利用できるわけではありません。詳細については、[対応デバイス][16]のリストを参照してください。

{{< img src="mobile_app_testing/mobile_app_devices_EU.mp4" alt="米国および EU リージョンでの 1 つ以上のモバイルデバイスの選択" video=true >}}

### モバイルデバイスファミリー {#mobile-device-families}

モバイルデバイスファミリーとは、モデルラインや OS バージョンなど、共通の特性を持つデバイスのセットを表します。特定のデバイスを 1 つ選択する代わりに、ファミリーを選択できます。テストの実行時、Datadog はその時点でファミリー内で利用可能なデバイスのいずれかでテストを実行します。ファミリーを選択すると、テスト結果の可用性が向上します。これは、テストが特定の単一デバイスに依存するのではなく、ファミリー内の利用可能なデバイスで実行できるためです。

Datadog は、**デバイスの選択**ドロップダウンで個々のデバイスと並んで表示される組み込みファミリーを提供します。例:

- **最新の iOS バージョンにおける最新の iPhone ファミリー** (iOS)
- **任意の iPhone Pro** (iOS)
- **最新の Android バージョンにおける最新の Pixel ファミリー** (Android)
- **任意の Samsung デバイス** (Android)

個々のデバイスを選択するのと同じ方法でファミリーを選択します。単一のテストで、個々のデバイス、ファミリー、またはその両方をターゲットにできます。

## テストの再試行 {#test-retries}

通知アラートをトリガーする前に、テストが失敗するまでの時間を指定できます。

* 失敗した場合、`Y` ミリ秒後に `X` 回再試行します。

{{< img src="mobile_app_testing/retry_condition.png" alt="失敗した場合に 300 ミリ秒後にテストを 0 回再試行することを示す再試行条件ステップ" width="90%" >}}

## スケジュールとアラート {#scheduling-and-alerts}

デフォルトでは、モバイルアプリテストはオンデマンドテスト用に設定されており、これらのテストは [CI パイプラインで直接](#run-tests-in-ci)実行できます。

{{< img src="mobile_app_testing/alerting_rules.png" alt="モバイルテストのスケジュールおよびアラート条件" style="width:90%" >}}

アラート条件をカスタマイズして、アラートを送信する頻度や、テストが通知アラートを送信する状況を定義できます。

* `X` 分間いずれかのアサーションが失敗すると、アラートがトリガーされます。

<div class="alert alert-info">
Synthetic Monitoring の通知がテスト結果を評価してアラートをトリガーする方法の詳細については、<a href="/synthetics/guide/how-synthetics-monitors-trigger-alerts/">Synthetic Monitor のアラートについて</a>を参照してください。
</div>

{{% synthetics-downtimes %}}

### テストモニターを構成する {#configure-the-test-monitor}

通知は、一連のアラート条件に従って送信されます。このセクションを使用して、チームにメッセージを送信する方法と内容を定義します。

1.  {{< ui >}}message{{< /ui >}} を入力するか、モバイルアプリテストの事前入力されたモニターメッセージを使用します。このフィールドでは、標準の[マークダウン形式][5]のほか、以下の[条件付き変数][6]を使用できます。

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

    Notification messages include the {{< ui >}}message{{< /ui >}} defined in this section and information about the failing locations. Pre-filled monitor messages are included in the message body section:

    {{< img src="/mobile_app_testing/mobile_app_synthetic_monitor.png" alt="自動入力済みのモニターメッセージが強調表示されているモバイルアプリテストのモニターセクション" style="width:100%;" >}}

    For example, to create a monitor that iterates over steps extracting variables for mobile tests, add the following to the monitor message:

      ```text
      {{!成功したすべてのステップで抽出された変数を一覧表示 }}
      # 抽出された変数
      {{#each synthetics.attributes.result.steps}}
      {{#if extractedValue}}
      * **名前**: `{{extractedValue.name}}`
      **値:** {{#if extractedValue.secure}}*難読化 (値は非表示)*{{else}}`{{{extractedValue.value}}}`{{/if}}
      {{/if}}
      {{/each}}
      ```

2. 通知するメンバーやサービスを選択します。
3. 再通知の頻度を指定します。テスト失敗時の再通知を防ぐには、{{< ui >}}Stop re-notifying on X occurrences{{< /ui >}} オプションをチェックしてください。
4. {{< ui >}}Save & Edit Recording{{< /ui >}} をクリックして、テスト構成を保存し、モバイルアプリのテストステップを記録します。

詳しくは、[Synthetic Monitoring 通知][7]を参照してください。

## 不安定性 {#flakiness}

不安定性はエンドツーエンドテストにおけるペインポイントです。テストの失敗は、実際のアプリケーションの問題ではなく、ID に影響を与える妥当なフロントエンドのコード変更が原因となる場合があります。

不安定なテストを防ぐために、Datadog ではロケーターのセットを活用したアルゴリズムを使って、モバイルアプリテストで要素をターゲットにしています。UI の小さな変更によって要素が変更される場合があります (例: 別の場所に移動する)。モバイルアプリテストは、変更によって影響を受けない参照ポイントに基づいて、自動的に要素の位置を再確認します。

テストが正常に実行されると、モバイルアプリテストは破損したロケーターを更新された値で再計算 (または「自己修復」) します。これにより、単純な UI の更新でテストが壊れることはなく、テストはモバイルアプリケーションの UI に自動的に適応します。

## CI でテストを実行する {#run-tests-in-ci}

必要に応じて[テスト `synthetics.json` ファイル][13]および[グローバル構成 `synthetics-ci.config` ファイル][14]で `mobileApplicationVersionFilePath` オプションを定義することにより、CI パイプラインでモバイルアプリのテストを実行できます。グローバル構成ファイルのオプションは、テスト構成ファイルのオプションよりも優先されます。

この例では、テスト `aaa-aaa-aaa` は `application/path` にあるオーバーライドアプリケーションのバージョンで実行されます。

```json
// myTest.synthetics.json
{
  "tests": [
    {
      "id": "aaa-aaa-aaa",
      "testOverrides": {
        "mobileApplicationVersionFilePath": "application/path"
      }
    }
  ]
}
```

次に、`$ datadog-ci synthetics run-tests --config synthetics-ci.config` を実行します。

詳しくは、[Continuous Testing と CI/CD][1] を参照してください。

## 権限 {#permissions}

デフォルトでは、Datadog Admin および Datadog 標準のロールを持つユーザーのみが Synthetic モバイルアプリテストを作成、編集、削除できます。Synthetic モバイルアプリテストの作成、編集、削除のアクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][8]のいずれかにアップグレードします。

[カスタムロール機能][9]を使用している場合は、`synthetics_read` および `synthetics_write` の権限を含むカスタムロールにユーザーを追加してください。

### アクセス制限 {#restrict-access}

{{% synthetics_grace_permissions %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_testing/cicd_integrations/
[2]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[3]: /ja/mobile_app_testing/settings/
[4]: /ja/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://daringfireball.net/projects/markdown/syntax
[6]: /ja/monitors/notify/variables/?tab=is_alert#conditional-variables
[7]: /ja/synthetics/notifications/
[8]: /ja/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[9]: /ja/account_management/rbac/?tab=datadogapplication#custom-roles
[11]: /ja/mobile_app_testing/mobile_app_tests/steps/
[12]: https://app.datadoghq.com/synthetics/mobile/create
[13]: /ja/continuous_testing/cicd_integrations/configuration?tab=npm#test-files
[14]: /ja/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options
[15]: /ja/real_user_monitoring/application_monitoring/
[16]: /ja/synthetics/mobile_app_testing/devices
[17]: /ja/synthetics/guide/mobile-test-auth-tokens/