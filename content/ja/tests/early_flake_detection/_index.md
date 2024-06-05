---
description: デフォルトブランチに影響を与える前に、Early Flake Detection を使用して不安定性を検出します。
further_reading:
- link: /tests
  tag: ドキュメント
  text: Test Visibility について
- link: /tests/guides/flaky_test_management
  tag: ドキュメント
  text: 不安定なテストの管理について
- link: /quality_gates
  tag: ドキュメント
  text: Quality Gates について
kind: ドキュメント
title: Early Flake Detection
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 Early Flake Detection は利用できません。</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Early Flake Detection は公開ベータ版です。
{{< /callout >}}

## 概要

Early Flake Detection は、開発サイクルの早い段階で[不安定なテスト][3]を特定することでコード品質を向上させる、テストの不安定性に対する Datadog のソリューションです。不安定なテストについては、[不安定なテストの管理][9]を参照してください。

新しく追加されたテストを複数回実行することで、Datadog はこれらのテストがデフォルトブランチにマージされる前に不安定性を検出することができます。ある調査では、この方法で最大で [75% の不安定なテスト][1]を特定できることが示されています。

Known Tests
: Datadog のバックエンドは、特定のテストサービスに対して固有のテストを保存します。テストセッションが実行される前に、Datadog ライブラリはこれらの既知のテストのリストをフェッチします。

Detection of New Tests
: テストが既知のテストリストにない場合、そのテストは**新しい**と見なされ、自動的に 10 回まで再試行されます。

Flakiness Identification
: テストを複数回実行することで、レースコンディションなどの問題を発見することができます。テストの試行のいずれかが失敗した場合、そのテストは自動的に不安定なテストとしてタグ付けされます。

テストを複数回実行することで、不安定性の原因となるランダムな状態を明らかにできる可能性が高まります。Early Flake Detection は、安定した信頼性の高いテストだけがメインブランチに統合されるようにします。

フィーチャーブランチのマージは、[Quality Gate][2] でブロックすることができます。詳細については、[Quality Gates ドキュメント][8]を参照してください。

## 計画と使用

Early Flake Detection を実装する前に、開発環境の [Test Visibility][5] を構成する必要があります。Datadog Agent を使用してデータをレポートする場合は、v6.40 または 7.40 以降を使用してください。

### ブラウザトラブルシューティング

Datadog ライブラリを Test Visibility 用に設定したら、[Test Service Settings ページ][6]から Early Flake Detection を構成します。

{{< img src="continuous_integration/early_flake_detection_test_settings.png" alt="テストサービス設定の Early Flake Detection" style="width:100%" >}}

1. [**Software Delivery** > **Test Visibility** > **Settings**][6] に移動します。
1. テストサービスの Early Flake Detection 列の **Configure** をクリックします。
1. トグルをクリックして Early Flake Detection を有効にし、[**Excluded Branches from Early Flake Detection**](#manage-excluded-branches) のリストを追加または変更します。

{{< img src="continuous_integration/early_flake_detection_configuration_modal.png" alt="Early Flake Detection を有効にして、テストサービス構成で除外ブランチを定義する" style="width:60%" >}}

## 除外ブランチの管理

除外ブランチでは、Early Flake Detection によってテストが再試行されません。これらのブランチで実行されるテストは、Early Flake Detection の対象として新しいテストとは見なされません。

{{< img src="continuous_integration/early_flake_detection_commits.png" alt="コミットでの Early Flake Detection の動作方法" style="width:60%" >}}

[Test Service Settings ページ][6]で除外ブランチのリストを管理し、特定のワークフローやブランチ構造に合わせて機能を調整できます。

## Test Visibility Explorer で結果を探索する

以下のファセットを使用して、[Test Visibility Explorer][10] で Early Flake Detection と新規テストを実行するセッションを照会できます。

* **Test Session**: Early Flake Detection を実行しているテストセッションでは、`@test.early_flake.enabled` タグが `true` に設定されています。
* **New Tests**: 新しいテストでは、`@test.is_new` タグが `true` に設定され、このテストの再試行では `@test.is_retry` タグが `true` に設定されます。

## トラブルシューティング

Early Flake Detection に問題があると思われる場合は、[Test Service Settings ページ][6]に移動して、テストサービスを探し、**Configure** をクリックします。トグルをクリックして、Early Flake Detection を無効にします。

### 新しいテストが再試行されない理由

これには以下のような原因が考えられます。

* このテストはすでに `staging`、`main`、または `preprod` などの除外されたブランチで実行されています。
* このテストの実行時間が 5 分を超えています。非常に遅いテストに Early Flake Detection を適用しないメカニズムがあります。これらのテストを再試行すると、CI パイプラインに大きな遅延が発生する可能性があるためです。

### 新しくないテストが再試行された場合

Datadog ライブラリが既知のテストの完全なリストを取得できない場合、新しくないテストを再試行することがあります。このエラーが CI パイプラインを遅くしないようにする仕組みがありますが、発生した場合は [Datadog サポート][7]に連絡してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://2020.splashcon.org/details/splash-2020-oopsla/78/A-Large-Scale-Longitudinal-Study-of-Flaky-Tests
[2]: /ja/quality_gates/
[3]: /ja/glossary/#flaky-test
[5]: /ja/tests
[6]: https://app.datadoghq.com/ci/settings/test-service
[7]: /ja/help/
[8]: /ja/quality_gates/setup
[9]: /ja/tests/guides/flaky_test_management
[10]: /ja/continuous_integration/explorer?tab=testruns