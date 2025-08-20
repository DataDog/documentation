---
aliases:
- /ja/mobile_testing
- /ja/mobile_app_testing
cascade:
  algolia:
    tags:
    - mobile_testing
description: インテリジェントで自己メンテナンス可能なモバイルテストを作成し、モバイルアプリケーションの最も重要な部分が実デバイスから稼働していることを確認します。
further_reading:
- link: https://www.datadoghq.com/blog/test-creation-best-practices/
  tag: ブログ
  text: エンドツーエンドテスト作成のベストプラクティス
- link: /synthetics/mobile_app_testing/mobile_app_tests
  tag: ドキュメント
  text: Synthetic モバイルアプリテストの作成方法
- link: /synthetics/mobile_app_testing/settings
  tag: ドキュメント
  text: iOS または Android モバイルアプリケーションをアップロードする方法
- link: /continuous_testing/
  tag: ドキュメント
  text: Continuous Testing & CI/CD について
title: モバイルアプリケーションのテストと監視
---

## 概要

Mobile Application Testing は、実際のデバイスを使用して Android および iOS アプリケーションの主要なビジネスフローをテストし、監視することができます。
Datadog はこれらのテストを実際のデバイス上で実行し、アプリケーションの主要なワークフローをステップごとにリアルに再現します。各ステップのスクリーンショットや合否の詳細な結果が提供されるため、チームは不具合がどこで起きたかを迅速に把握できます。
モバイルアプリテストは、スケジュール設定に基づいて、オンデマンドで、または [CI/CD パイプライン][1]内で直接実行できます。

Datadog でモバイルアプリテストを作成するには、[**Digital Experience** > **New Test**][12] に移動し、**Mobile Application Test** を選択します。

{{< img src="mobile_app_testing/new_test_2.png" alt="Synthetic モバイルテストの作成" style="width:50%;">}} 

## 構成

You may create a test using one of the following options:

- **Create a test from a template**:

    1. あらかじめ設定されているテンプレートのいずれかにカーソルを合わせ、**View Template** をクリックします。すると、テスト詳細・リクエスト詳細・アラート条件・ステップなど、事前に入力された構成情報が表示されるサイドパネルが開きます。
    2. **+Create Test** をクリックして構成ページを開き、あらかじめ設定された構成オプションを確認および編集します。ここで提示されるフィールドは、テストを一から作成する場合と同じです。
    3. 右上にある **Save & Quit** をクリックして、モバイルアプリケーションテストを送信します。<br /><br>
       {{< img src="/mobile_app_testing/templates_mobile_app.mp4" alt="テンプレートを使用したモバイルアプリケーションテストのランディングページの動画" video="true" >}} 

- **Build a test from scratch**:

    1. **+** テンプレートをクリックし、ドロップダウンメニューからモバイルアプリケーションを選択します。まだ作成していない場合は、[Synthetic Monitoring & Continuous Testing Settings ページ][3]の [Applications List section][2] でモバイルアプリケーションを作成してください。
    1. **バージョン**を選択するか、**Always run latest version** をクリックすると、テストが実行されるたびにモバイルアプリ ケーションの最新バージョンが使用されます。
    1. テストの**名前**を追加します。
    1. テストに関連する**環境と追加タグ**を選択します。与えられた `<KEY>` に対して `<VALUE>` をフィルターするには `<KEY>:<VALUE>` フォーマットを使用します。
    1. テストを実行する**デバイス**を選択します。
    1. テストの再試行条件を設定します。
    1. 基本的な時間間隔をクリックして**テスト頻度**を設定するか、テスト頻度と**アラート条件**をテストモニター用にカスタマイズします。
    1. テストモニターの名前を入力し、通知するサービスまたはチームメンバーを選択し、メッセージ通知を追加します。
    1. **Save & Edit Recording** をクリックして、モバイルアプリケーションテストを送信します。

### スニペット

新しいモバイルアプリケーションテストを構成する際は、スニペットを使用すると、OS バージョン・デバイスサイズ・メーカー・稼働時間などを手動で選択する代わりに自動的に入力できます。利用可能なスニペットは以下のとおりです。

* **Device Size**: 特定のサイズの画面でモバイルアプリケーションテストを自動的に実行します。

  - **Multi-screen size**
  - **Tablet (タブレット)**
  - **Large Screen (iOS のみ)**
  - **Standard Screen (iOS のみ)**
  - **Small Screen (iOS のみ)**

* **OS Version**: iOS または Android アプリを複数バージョンで自動的にテストします。この選択は、モバイルアプリケーションの種類に応じて iOS か Android のいずれかに切り替わります。

* **Device Manufacturer (Android のみ)**: 複数のデバイスメーカーにわたって Android アプリを自動的にテストします。

* **Uptime**: 利用可能な最短間隔 (15 分ごと) でテストを自動的に設定します。

<br/>
{{< img src="mobile_app_testing/mobile_app_snippets_2.png" alt="モバイルアプリテストの作成画面左側に表示されるスニペット例のスクリーンショット" width="70%" >}} 

## 変数

{{% synthetics-variables %}}

### グローバル変数を使用する

モバイルアプリテストの詳細の **Starting URL** と **Advanced Options**、およびテストの記録で [**Settings** で定義されているグローバル変数][4]を使用してローカル変数を定義することができます。利用可能な変数のリストを表示するには、目的のフィールドに `{{` と入力してください。

記録を開始する前に、ユーザージャーニーに組み込む変数を定義します。

記録中に利用可能な変数を注入することができます。モバイルテストの記録で変数を使用する方法については、[モバイルアプリのテストステップ][11]を参照してください。

## テストの再試行

通知アラートをトリガーする前に、テストが失敗するまでの時間を指定できます。

* 失敗した場合、`Y` ミリ秒後に `X` 回再試行します。

## スケジュールとアラート

デフォルトでは、モバイルアプリテストはオンデマンドテスト用に設定されており、これらのテストは [CI パイプラインで直接](#run-tests-in-ci)実行できます。

{{< img src="mobile_app_testing/alerting_rules.png" alt="モバイルテストのスケジュールとアラート条件" style="width:90%" >}}

アラート条件をカスタマイズして、アラートを送信する頻度や、テストが通知アラートを送信する状況を定義できます。

* `X` 分間いずれかのアサーションが失敗すると、アラートがトリガーされます。

### テストモニターを構成する

設定されたアラート条件に従って、通知が送信されます。このセクションを使用して、チームにメッセージを送る方法と内容を定義します。

1. モバイルアプリテストの**メッセージ**を入力します。このフィールドでは、標準の[マークダウン形式][5]のほか、以下の[条件付き変数][6]を使用できます。

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
4. **Save & Edit Recording** をクリックして、テスト構成を保存し、モバイルアプリのテストステップを記録します。

詳しくは、[Synthetic テストモニターの使用][7]をご覧ください。

## 不安定性

不安定さはエンドツーエンドテストにおける痛点です。テストの失敗は、実際のアプリケーションの問題ではなく、ID に影響を与える妥当なフロントエンドのコード変更が原因となる場合があります。

Datadog では、不安定なテストを防ぐために、ロケータのセットを活用したアルゴリズムを使って、モバイルアプリテストで要素をターゲットにしています。UI の小さな変更により、要素が変更されることがあります (例えば、別の場所に移動する)。モバイルアプリテストは、変更によって影響を受けない参照ポイントに基づいて、自動的に要素の位置を再確認します。

テストが正常に実行されると、モバイルアプリテストは壊れたロケータを更新された値で再計算 (または「自己修復」) します。これにより、単純な UI の更新でテストが壊れることがなく、テストがモバイルアプリケーションの UI に自動的に適応することを保証します。

## CI でテストを実行する

必要に応じて[テスト `synthetics.json` ファイル][13]と[グローバルコンフィギュレーション `synthetics-ci.config` ファイル][14]で `mobileApplicationVersionFilePath` オプションを定義することで、CI パイプラインでモバイルアプリのテストを実行できます。グローバルコンフィギュレーションファイルのオプションは、テストコンフィギュレーションファイルのオプションよりも優先されます。

この例では、`aaa-aaa-aaa` テストは `application/path` にあるオーバーライドアプリケーションのバージョンで実行されます。

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

詳しくは、[Continuous Testing と CI/CD][1] をご覧ください。

## 権限

デフォルトでは、Datadog 管理者および Datadog 標準ロールを持つユーザーのみが、Synthetic モバイルアプリテストを作成、編集、削除できます。Synthetic モバイルアプリテストの作成、編集、削除アクセスを取得するには、ユーザーをこれら 2 つの[デフォルトのロール][8]のいずれかにアップグレードします。

[カスタムロール機能][9]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

### アクセス制限

{{% synthetics_grace_permissions %}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/continuous_testing/cicd_integrations/
[2]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[3]: /ja/mobile_app_testing/settings/
[4]: /ja/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://daringfireball.net/projects/markdown/syntax
[6]: /ja/monitors/notify/variables/?tab=is_alert#conditional-variables
[7]: /ja/synthetics/guide/synthetic-test-monitors/
[8]: /ja/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[9]: /ja/account_management/rbac/?tab=datadogapplication#custom-roles
[11]: /ja/mobile_app_testing/mobile_app_tests/steps/
[12]: https://app.datadoghq.com/synthetics/mobile/create
[13]: /ja/continuous_testing/cicd_integrations/configuration?tab=npm#test-files
[14]: /ja/continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options