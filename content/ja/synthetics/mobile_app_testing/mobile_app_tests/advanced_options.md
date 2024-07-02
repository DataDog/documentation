---
title: Advanced Options for Mobile App Testing Steps
description: モバイルテストステップに高度なオプションを構成する
aliases:
- /mobile_testing/mobile_app_tests/advanced_options
- /mobile_app_testing/mobile_app_tests/advanced_options
further_reading:
- link: "https://www.datadoghq.com/blog/test-maintenance-best-practices/"
  tag: ブログ
  text: エンドツーエンドテスト維持のベストプラクティス
- link: /synthetics/mobile_app_testing/mobile_app_tests/
  tag: ドキュメント
  text: モバイルアプリテストの作成方法
- link: /synthetics/mobile_app_testing/mobile_app_tests/steps/
  tag: ドキュメント
  text: モバイルアプリテストでステップを作成する方法
- link: /data_security/synthetics/
  tag: ドキュメント
  text: Synthetic モニタリングのデータセキュリティについて
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">このサイトでは、Mobile Application Testing はサポートされていません。</div>
{{< /site-region >}}

## 概要

このページでは、Synthetic モバイルアプリテストの高度なオプションについて説明します。

## 要素を探す

### Datadog アルゴリズム

モバイルアプリテストでモバイルアプリケーションの UI に対する予期せぬ変更を検証しないようにするために、テスト作成時に[アサーション][1]を使用します。アサーションによって、テストステップのジャーニーに関連する期待される動作と期待されない動作とを定義することができます。

### ユーザー指定のロケーター

デフォルトでは、モバイルアプリテストは Datadog のロケータシステムを使用します。テストが対話する特定の要素 (例えばチェックアウトボタン) を探すとき、特定の XPath や特定の CSS セレクタで要素を探すのではなく、テストは要素を探すために複数の異なるポイント (例えば XPath、テキスト、クラス、近くの要素など) を使用するのです。

これらの参照点はロケータのセットとなり、それぞれが要素を一意に定義します。Datadog のロケータシステムは、テストの自己メンテナンスを可能にするため、カスタムセレクターはエッジケースにのみ使用する必要があります。

カスタムセレクタは、ページの任意の要素で[レコーダーのステップ][1] (**タップ**、**ダブルタップ**、**ディープリンクを開く**など) を実行することで作成されます。これは、実行する必要があるステップの種類を指定します。

## タイムアウト

モバイルアプリテストが要素を見つけられない場合、デフォルトでは 60 秒間ステップを再試行します。

このタイムアウトは 60 秒までカスタマイズすることができ、ステップの対象となる要素を見つけるまでの待ち時間を短くすることができます。

{{< img src="mobile_app_testing/timeout.png" alt="テストステップを失敗と宣言する前に 30 秒間待ちます" style="width:50%" >}}

## オプションステップ

たとえばポップアップイベントなどで、いくつかのステップをオプションで追加することが必要になるかもしれません。このオプションを構成するには、**Continue with test if this step fails** を選択します。タイムアウトオプションで指定した分数後にステップが失敗した場合、モバイルアプリのテストは次に進み、次のステップを実行します。

{{< img src="mobile_app_testing/failure_behavior.png" alt="テストステップが失敗した場合に、テストを失敗させるか、続行するかを選択します" style="width:50%" >}}

オプションで、**Consider entire test as failed if this step fails** (このステップが失敗した場合、テスト全体を失敗とみなす) をクリックして、重要なステップが実行されていることを確認します。

## スクリーンショットのキャプチャを防ぐ

**Do not capture screenshot for this step** (このステップのスクリーンショットをキャプチャしない) をクリックすると、テスト実行時にステップのスクリーンショットがキャプチャされないようにすることができます。

{{< img src="mobile_app_testing/no_screenshots.png" alt="このテストステップではスクリーンショットをキャプチャしない" style="width:50%" >}}

テスト結果に機密データを含めたくない場合に有用です。障害発生時のトラブルシューティングに影響を及ぼす可能性があるため、慎重に使用してください。詳しくは、[Synthetic Monitoring Data Security][2] をご覧ください。

## サブテスト

[サブテスト][3]の高度なオプションでは、サブテストが失敗した場合のモバイルアプリテストの動作を設定できます。

{{< img src="mobile_app_testing/example_subtest.png" alt="サブテストとして追加するモバイルテストを選択" style="width:50%" >}}

### 失敗時の動作を設定する

サブテストが失敗してもモバイルアプリのテストが継続されるように、**Continue with test if this step fails** (このステップが失敗した場合は、テストを続行する) をクリックします。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mobile_app_testing/mobile_app_tests/steps/
[2]: /data_security/synthetics/
[3]: /mobile_testing/mobile_app_tests/steps/#subtests