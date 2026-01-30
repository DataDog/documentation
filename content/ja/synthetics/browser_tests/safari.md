---
description: Safari ブラウザで Synthetic Monitoring テストを実行します。
private: true
site_support_id: synthetics_safari
title: Safari ブラウザ テスト
---

{{< callout url="https://www.datadoghq.com/product-preview/safari-browser-testing/" >}}
  Safari Browser Testing は現在 Preview ですが、アクセスは簡単にリクエストできます。こちらのフォームから、今すぐ申請してください。
{{< /callout >}}

## 概要

Datadog では、Chrome、Edge、Firefox に加えて Safari ブラウザでも Synthetic Monitoring テストを実行できます。

## Safari Browser Testing のセットアップ

Safari テストを実行するには、Safari デバイスで **のみ** 実行するようにスケジュールされた新しい Synthetic Monitoring の Browser Test を作成します。

次の 3 つの方法から選んでください:

* **[新しい Synthetic Monitoring の Browser Test を作成する](#create-a-new-synthetic-monitoring-browser-test)**: ゼロから新しいユーザー ジャーニーを記録します。
* **[既存の Synthetic Monitoring の Browser Test をクローンする](#clone-an-existing-synthetic-monitoring-browser-test)**: 既存の Browser Test をもとにユーザー ジャーニーを開始します。
* **[既存テストをサブ テストとして使い、新しい Synthetic Monitoring の Browser Test を作成する (推奨)](#create-a-new-synthetic-monitoring-browser-test-using-an-existing-test-as-a-subtest)**: 既存テストのユーザー ジャーニーをベースにしつつ、ユーザー ジャーニーを 2 つ別々に管理する必要がありません。

## **新しい Synthetic Monitoring の Browser Test を作成する**

1. **新規** の [Browser Test][1] を作成します。
2. **Set your test details** > **Browser & Devices** セクションで、実行したい Safari デバイス以外のブラウザとデバイスは **すべて** チェックを外します。

   {{< img src="synthetics/browser_tests/safari/browsers_devices_safari.png" alt="Safari デバイスを選択した Browser Test 作成画面のスクリーンショット" width="80%" >}}

3. **Select locations > Safari Private Locations** セクションで、あらかじめ作成されている **macos-pl Safari Private Beta** のロケーションを選択します。

   {{< img src="synthetics/browser_tests/safari/safari_private_location.jpg" alt="Browser Test 作成画面で private locations のドロップ ダウンを表示したスクリーンショット" width="70%" >}}

4. 以降は通常の Browser Test と同様にテストの設定を続けられます。

## 既存の Synthetic Monitoring の Browser Test をクローンする

1. 目的の既存テストをクローンして、**新規** の Browser Test を作成します。

   {{< img src="synthetics/browser_tests/safari/safari_clone.png" alt="既存の Browser Test をクローンする操作のスクリーンショット" width="70%" >}}

2. **Set your test details** > **Browser & Devices** セクションで、実行したい Safari デバイス以外のブラウザとデバイスは **すべて** チェックを外します。

   {{< img src="synthetics/browser_tests/safari/browsers_devices_safari.png" alt="Safari デバイスを選択した Browser Test 作成画面のスクリーンショット" width="80%" >}}

3. **Select locations > Safari Private Locations** セクションで、あらかじめ作成されている **macos-pl Safari Private Beta** のロケーションを選択します。

   {{< img src="synthetics/browser_tests/safari/safari_private_location.jpg" alt="Browser Test 作成画面で private locations のドロップ ダウンを表示したスクリーンショット" width="70%" >}}

4. そのまま保存して、新しいテストを実行できます。

   **注**: クローンで作成したテストでは、元のテストのユーザー ジャーニーに変更を加えても、その変更は新しい Safari テストに自動では反映されません。


## 既存テストをサブ テストとして使い、新しい Synthetic Monitoring の Browser Test を作成する

1. **新規** の [Browser Test][1] を作成します。

2. **Set your test details** > **Browser & Devices** セクションで、実行したい Safari デバイス以外のブラウザとデバイスは **すべて** チェックを外します。

   {{< img src="synthetics/browser_tests/safari/browsers_devices_safari.png" alt="Safari デバイスを選択した Browser Test 作成画面のスクリーンショット" width="80%" >}}

3. **Select locations > Safari Private Locations** セクションで、あらかじめ作成されている **macos-pl Safari Private Beta** のロケーションを選択します。

  {{< img src="synthetics/browser_tests/safari/safari_private_location.jpg" alt="Browser Test 作成画面で private locations のドロップ ダウンを表示したスクリーンショット" width="70%" >}}

4. **Save & Edit Recording** をクリックし、_メイン ウィンドウで再生する_ サブ テストとして、目的のテストを追加します:

   {{< img src="synthetics/browser_tests/safari/safari_subtest.png" alt="既存のサブ テストを追加する操作のスクリーンショット" width="70%" >}}

   **注**: 既存テストを参照する方式のため、既存テストのユーザー ジャーニーに加えた変更は、新しい Safari テストに自動で反映されます。

## FAQ

### Safari と Safari 以外のブラウザの両方でテストを実行できますか？

**いいえ**。現時点では、Synthetic Monitoring の Browser Test は Safari デバイス **または** Safari 以外のデバイスのいずれかでしか実行できません。

### managed locations から Safari テストを実行できますか？

**いいえ**。Safari の Browser Test は、アカウント内の専用 Safari プライベート ロケーションに限定されます。詳細は [Synthetic Monitoring Private Locations の一覧][2] を参照してください。

**注**: この専用 Safari プライベート ロケーションを設定するために、`MANAGED` というラベルが付いた `API Key managed by synthetics-platform` という名前の API キーが作成され、組織に追加されています。Safari テストを有効化するために必要なため、**このキーは取り消さないでください**。

この Preview では、このプライベート ロケーションに対して一部のモニターが発報することが **想定** されています。`synthetics-safari-private-beta:true` タグを無視するよう設定すると、モニターは解消できます。

Safari テストを有効にするには特定の名前が必要なため、**このプライベート ロケーションの名前は変更しないでください**。必要に応じて、利用範囲の制限やタグの追加が行えます。

### Safari テストに既知の制限はありますか？

**はい**。Safari ブラウザ固有の制約により、通常の Synthetic Monitoring の Browser Test の一部機能が影響を受ける場合があります:

1. **Managed locations:** Safari テストは、Datadog アカウント専用の Private Location でのみ実行できます。
2. **Running Subtests in a new window:** サブ テストはメイン ウィンドウ内でのみ実行できます。
3. **Errors & Warnings:** Safari の制約により、**Errors & Warnings** タブではエラーの詳細を確認できません。
4. **Page Resources:** page resources 内の一部リソースでは、`type` 情報が正しく表示されない場合があります。
5. **Max Concurrency / Parallelization:** Preview では、最大 2 件のテストを並列実行でき、残りの待機中テストはキューに入ります。
6. **Download file:** この機能は Safari Preview ではまだ利用できません。


[1]: https://app.datadoghq.com/synthetics/browser/create
[2]: https://app.datadoghq.com/synthetics/settings/private-locations?query=macos-pl