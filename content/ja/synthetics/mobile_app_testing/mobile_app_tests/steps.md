---
title: Mobile App Testing Steps
kind: ドキュメント
description: モバイルテストの記録の自動記録と手動でのステップ設定方法について説明します。
aliases:
- /mobile_testing/mobile_app_tests/steps
- /mobile_app_testing/mobile_app_tests/steps
further_reading:
- link: /synthetics/mobile_app_testing/mobile_app_tests/
  tag: ドキュメント
  text: Synthetic モバイルテストについて
- link: /synthetics/mobile_app_testing/mobile_app_tests/advanced_options
  tag: ドキュメント
  text: モバイルテストの高度なオプションについて
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

ステップは、テスト内で実行する、個別に記録されたインタラクションまたはアサーションを表します。ステップを定義するには、**Start Recording** をクリックし、通常と同じようにデバイスを操作するか、**Assertions** または **Special Actions** をクリックして手動でステップを作成します。

## デバイスの起動

ステップの記録と追加を開始するには、ドロップダウンメニューからモバイルアプリのテストを開始するデバイスを選択し、**Launch Device** をクリックします。

{{< img src="mobile_app_testing/launch_device.png" alt="モバイルテストを実行するデバイスを選択する" style="width:60%" >}}

**Show only available devices. Available devices load faster** (利用可能なデバイスのみを表示します。利用可能なデバイスの読み込みが速くなります) を選択すると、最も利用可能なデバイスが表示され、テストの待ち時間が短縮されます。

### 通知

**Launch a device to start recording** モーダルで緑色の **Device Connection Notification** ボタンをクリックすると、デバイスの準備ができたときと、デバイスが非アクティブでタイムアウトになるときの通知を有効にすることができます。

## 自動記録されたステップ

**Start Recording** をクリックすると、Datadog は自動的にデバイスとのインタラクションを記録し、左側のステップリストに表示します。

記録を停止するには、**Stop Recording** をクリックします。

## 手動で追加したステップ

デバイスを直接操作することによって自動的にステップを作成するだけでなく、手動でステップを作成することもできます ([アサーション](#assertion)や[スペシャルアクション](#special-actions)を使用)。また、以前に記録したステップをクリックしてステップを更新したり、ステップリストを上下にドラッグして[ステップの順序を変更](#manage-step-order)することもできます。

### アサーション

アサーションによって、テストフローの特定のセクションで表示される (または表示されない) コンテンツを検証できます。


{{< img src="mobile_app_testing/assertions.png" alt="モバイルテストにおけるアサーションのオプション" style="width:60%;" >}}


ステップを作成するには、アサーションタイプを選択します。

{{< tabs >}}
{{% tab "アクティブ画面で要素をテストする" %}}

#### 要素のコンテンツをテストする

このアサーションステップを作成すると、モバイルアプリテストでページ要素を選択し、特定の値が含まれているかどうかを確認することができます。

{{% /tab %}}
{{% tab "アクティブ画面コンテンツのテスト" %}}

#### テキストがアクティブ画面に存在することをテストする

このアサーションステップを作成すると、`Value` フィールドに指定したテキストが、記録中の現在のページに存在することをモバイルアプリテストで確認することができます。

#### テキストがアクティブ画面に存在しないことをテストする

このアサーションステップを作成すると、`Value` フィールドに指定したテキストが、記録中の現在のページに**存在しない**ことをモバイルアプリテストで確認することができます。

{{% /tab %}}
{{< /tabs >}}

### 特別なアクション

デバイス操作に基づいて自動的にステップを記録するだけでなく、**Special Actions** をクリックして手動でステップを作成することもできます。

{{< img src="mobile_app_testing/special_actions.png" alt="アクションタイプを選択して、アサーションステップを追加する" style="width:60%;" >}}

#### タップ

モバイルアプリケーションのタップで要素を操作すると、ステップが記録されます。

{{< img src="mobile_app_testing/tap.mp4" alt="Recording a tap step in a mobile test" video=true >}}

#### ダブルタップ

モバイルアプリケーションのダブルタップで要素を操作すると、ステップが記録されます。

{{< img src="mobile_app_testing/double_tap.mp4" alt="Recording a double tap step in a mobile test" video=true >}}

#### テキストを入力する

モバイルアプリケーションのテキスト入力フィールドを操作して、名前を追加し、値を設定すると、ステップが記録されます。

{{< img src="mobile_app_testing/type_text.mp4" alt="モバイルテストでのテキスト入力ステップの記録" video=true >}}

手動で追加したステップで利用可能なすべての変数を表示するには、入力フィールドに `{{` と入力します。

{{< img src="mobile_app_testing/injecting_variable.png" alt="モバイルテストにおける変数を使用するためのテキスト入力ステップ" style="width:25%" >}}

自動記録されたステップで変数を使用するには、ステップ名を追加して変数値を指定し、記録中に変数値を入力します。

#### スクロール

モバイルアプリテストでは、操作が必要な要素まで自動的にスクロールします。ほとんどの場合、手動でスクロールステップを追加する必要はありません。スクロールステップを使用するのは、無限スクロールのような追加の操作を発生させる必要がある場合です。

モバイルアプリテストで縦横にスクロールさせたいピクセル数を指定します。

{{< img src="mobile_app_testing/scroll_step.png" alt="モバイルテスト記録のスクロールステップ" style="width:60%;" >}}

デフォルトでは、**Scroll** ステップは、ページ全体をスクロールします。特定の要素 (例えば、特定の `<div>`) でスクロールする必要がある場合、**Starting Element** をクリックして、モバイルアプリテストでスクロールさせたい要素を選択します。

#### Scroll to element

This action allows you to scroll to a specific element horizontally or vertically.

{{< img src="mobile_app_testing/test_steps/scroll_to_element_2.mp4" alt="Recording a scroll to element in a mobile test" style="width:60%" video=true >}}

#### 戻るを押す

モバイルアプリケーションの下にある ** Back** ボタンを操作することで、ステップが記録されます。

{{< img src="mobile_app_testing/press_back.mp4" alt="モバイルテストでの戻るを押すステップの記録" video=true >}}

#### 待機

ページやページ要素の読み込みに 60 秒以上かかることがわかっている場合、最大値 300 秒の待機ステップを追加することができます。

{{< img src="mobile_app_testing/wait_step.png" alt="モバイルテストでの待機ステップの記録" style="width:60%;" >}}

デフォルトでは、モバイルアプリテストは、ステップまたは次のステップを実行する前に、ページが完全に読み込まれるのを 60 秒のタイムアウトで待ちます。この追加時間は、モバイルアプリのテスト記録の**すべての実行**に体系的に追加されます。

#### デバイスの回転

ステップに名前を付け、**Portrait** または **Landscape** モードを選択します。

{{< img src="mobile_app_testing/rotate_device.png" alt="モバイルテストでのデバイス回転ステップの記録" style="width:60%" >}}

#### ディープリンクを開く

ステップに名前を追加し、ディープリンク URI を入力します。

{{< img src="mobile_app_testing/open_deep_link.png" alt="モバイルテストでのディープリンクを開くステップの記録" style="width:60%" >}}

#### Restart application

This action allows you to restart your application.
This action does not reinstall the application but instead closes and then launches the application again. 

{{< img src="mobile_app_testing/test_steps/restart_application.mp4" alt="Recording how to restart your application" style="width:60%" video=true >}}

テストステップの追加構成の詳細については、[モバイルアプリのテストステップの詳細オプション][4]を参照してください。

### サブテスト

既存のワークフローを再利用するために、他のモバイルアプリテストの中でモバイルアプリテストを実行し、最大 2 レベルまで入れ子にすることができます。

既存のモバイルアプリテストをサブテストとして使用するには、**Subtest** をクリックし、ドロップダウンメニューからモバイルアプリテストを選択し、**Add Subtest** をクリックします。

{{< img src="mobile_app_testing/example_subtest.png" alt="サブテストとして追加するモバイルテストを選択" style="width:60%" >}}

サブテストにある変数を親テストでオーバーライドするには、親テストレベルで作成された変数が、サブテストに存在する変数と同じ名前であることを確認してください。変数は、常に最初に代入された値を使用します。

サブテストの高度なオプションの詳細については、[モバイルアプリテストステップの高度なオプション][5]を参照してください。

サブテストを独立して実行することに意味がない場合は、一時停止することができます。このテストは親テストの一部として引き続き呼び出され、個別には実行されません。詳しくは、[ブラウザのテストジャーニーをテストスイート全体で再利用する][6]を参照ください。

### 変数
If your subtest contains variables, they are inherited by the test you import them into. 
To override these variables, create a variable in your parent test with the name as the variables within your subtest. 

#### Extract variable from element

This action allows you to extract the value of an element and save it as a variable.

{{< img src="mobile_app_testing/test_steps/extract_variable_from_element.mp4" alt="Recording how to extract a variable from an element on a mobile test" style="width:60%" video=true >}}

## ステップ順序の管理

個々のステップをドラッグアンドドロップして新しいステップを手動で並べ替える代わりに、記録の特定の段階でテストステップにカーソルをセットし、追加のステップを挿入することができます。

1. 記録したテストステップにカーソルを合わせ、**Set Cursor** アイコンをクリックします。テストステップの上に青い線が表示されます。
2. [テストステップ](#automatically-recorded-steps)を追加記録するか、[ステップを手動で](#manually-added-steps)追加します。
3. テストステップの上にステップを追加し終えたら、**Clear Cursor** をクリックして終了してください。

{{< img src="mobile_app_testing/recording_cursor_step.mp4" alt="テストステップにカーソルを合わせると、このステップの前に追加のステップが追加されます" video=true >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mobile_app_testing/mobile_app_tests/#variables
[2]: /synthetics/settings/#global-variables
[3]: /synthetics/guide/browser-tests-totp/
[4]: /mobile_app_testing/mobile_app_tests/advanced_options
[5]: /mobile_app_testing/mobile_app_tests/advanced_options#subtests
[6]: /synthetics/guide/reusing-browser-test-journeys/