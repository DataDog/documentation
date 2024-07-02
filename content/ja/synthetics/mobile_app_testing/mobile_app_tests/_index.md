---
title: モバイルアプリテスト
kind: ドキュメント
description: モバイルアプリテストで主要なビジネスフローのモニタリングを開始する方法を説明します。
aliases:
- /mobile_testing/mobile_app_tests
- /mobile_app_testing/mobile_app_tests
further_reading:
- link: /synthetics/mobile_app_testing/settings
  tag: ドキュメント
  text: モバイルテストの設定について
- link: /synthetics/browser_tests
  tag: ドキュメント
  text: Synthetic ブラウザテストの作成方法
- link: "https://www.datadoghq.com/blog/test-maintenance-best-practices/"
  tag: ブログ
  text: エンドツーエンドテスト維持のベストプラクティス
---

{{< site-region region="us,us5,eu" >}}
<div class="alert alert-warning">Mobile Application Testing is Generally Available for US1, US5, and EU sites.</div>
{{< /site-region >}}

{{< site-region region="us3,ap1" >}}
<div class="alert alert-warning">このサイトでは、Mobile Application Testing はサポートされていません。</div>
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">このサイトでは、Mobile Application Testing はサポートされていません。</div>
{{< /site-region >}}

## 概要

モバイルアプリケーションのテストでは、Android および iOS アプリケーションのキーとなるビジネスフローを、実際のデバイスを使用してテストおよびモニタリングすることができます。

モバイルアプリのテストは、スケジュール、オンデマンド、または [CI/CD パイプライン][1]内で直接実行できます。

You can create mobile app tests in Datadog by navigating to [**Digital Experience** > **New Test**][12] and selecting **Mobile Application Test**.

{{< img src="mobile_app_testing/new_test.png" alt="Synthetic Mobile テストの作成" style="width:50%;">}}

### 不安定性

エンドツーエンドのテストでは、不安定であることがネックになります。なぜなら、テストが失敗することがあるからです。フロントエンドのチームが変更を加えたときに、実際のアプリケーションの問題ではなく、テスト内の識別子がアラートを発する場合があります。

Datadog では、不安定なテストを防ぐために、ロケータのセットを活用したアルゴリズムを使って、モバイルアプリテストで要素をターゲットにしています。UI の小さな変更により、要素が変更されることがあります (例えば、別の場所に移動する)。モバイルアプリテストは、変更によって影響を受けない参照ポイントに基づいて、自動的に要素の位置を再確認します。

テストが正常に実行されると、モバイルアプリテストは壊れたロケータを更新された値で再計算 (または「自己修復」) します。これにより、単純な UI の更新でテストが壊れることがなく、テストがモバイルアプリケーションの UI に自動的に適応することを保証します。

## 構成

モバイルアプリテストの構成を定義します。

1. ドロップダウンメニューからモバイルアプリケーションを選択します。まだ作成していない場合は、[Synthetic Monitoring & Continuous Testing Settings ページ][3]の [Applications List セクション][2]でモバイルアプリケーションを作成します。
2. **バージョン**を選択するか、**Always run latest version** をクリックすると、テストが実行されるたびにモバイルアプリ ケーションの最新バージョンが使用されます。
3. テストの**名前**を追加します。
4. テストに関連する**環境と追加タグ**を選択します。与えられた `<KEY>` に対して `<VALUE>` をフィルターするには `<KEY>:<VALUE>` フォーマットを使用します。
4. テストを実行する**デバイス**を選択します。
5. テストの再試行条件を設定します。
6. 基本的な時間間隔をクリックして**テスト頻度**を設定するか、テスト頻度と**アラート条件**をテストモニター用にカスタマイズします。
7. テストモニターの名前を入力し、通知するサービスまたはチームメンバーを選択し、メッセージ通知を追加します。

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

* いずれかのアサーションが `X` 分間失敗すると、アラートがトリガーされます。

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

## CI でテストを実行する

必要に応じて[テスト `synthetics.json` ファイル][13]と[グローバルコンフィギュレーション `synthetics-ci.config` ファイル][14]で `mobileApplicationVersionFilePath` オプションを定義することで、CI パイプラインでモバイルアプリのテストを実行できます。グローバルコンフィギュレーションファイルのオプションは、テストコンフィギュレーションファイルのオプションよりも優先されます。

この例では、`aaa-aaa-aaa` テストは `application/path` にあるオーバーライドアプリケーションのバージョンで実行されます。

```json
// myTest.synthetics.json
{
  "tests": [
    {
      "id": "aaa-aaa-aaa",
      "config": {
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

アカウントに[カスタムロール][10]を使用しているお客様は、アクセス制限が利用可能です。

組織内の役割に基づいて、モバイルアプリテストへのアクセスを制限することができます。モバイルアプリテストを作成する際に、(ユーザーのほかに) どのロールがテストの読み取りと書き込みを行えるかを選択します。

{{< img src="synthetics/settings/restrict_access_1.png" alt="テストの権限の設定" style="width:70%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /continuous_testing/cicd_integrations/
[2]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[3]: /mobile_app_testing/settings/
[4]: /synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://daringfireball.net/projects/markdown/syntax
[6]: /monitors/notify/variables/?tab=is_alert#conditional-variables
[7]: /synthetics/guide/synthetic-test-monitors/
[8]: /account_management/rbac/?tab=datadogapplication#datadog-default-roles
[9]: /account_management/rbac/?tab=datadogapplication#custom-roles
[10]: /account_management/rbac/?tab=datadogapplication#create-a-custom-role
[11]: /mobile_app_testing/mobile_app_tests/steps/
[12]: https://app.datadoghq.com/synthetics/mobile/create
[13]: /continuous_testing/cicd_integrations/configuration?tab=npm#test-files
[14]: /continuous_testing/cicd_integrations/configuration/?tab=npm#global-configuration-file-options