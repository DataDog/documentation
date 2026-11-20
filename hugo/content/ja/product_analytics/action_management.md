---
aliases:
- /ja/product_analytics/guide/action_management/
description: Action Management を使用して、Web およびモバイルアプリケーションから自動キャプチャされたアクションにラベルを付けます。
further_reading:
- link: https://learn.datadoghq.com/courses/define-user-behavior-with-labeled-actions-in-product-analytics
  tag: ラーニングセンター
  text: Product Analytics でラベル付きアクションを使用してユーザーの行動を定義する
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: ブログ
  text: 'パフォーマンスからインパクトへ: 共有コンテキストを通じてフロントエンドチームをつなぐ'
- link: https://www.datadoghq.com/blog/product-analytics-faster-decisions
  tag: ブログ
  text: Datadog Product Analytics を使用して、より迅速かつ的確な製品に関する意思決定を行う
- link: https://www.datadoghq.com/blog/product-data-best-practices
  tag: ブログ
  text: 製品データが実際に示していること
title: Action Management
---
## 概要{#overview}
Action Management は、Web およびモバイルアプリケーションから自動キャプチャされたアクションにラベルを付けるためのノーコード手法です。製品およびビジネスのステークホルダーは、Action Management を使用すればコードを変更することなく、イベントを作成し、名前を変更することができます。

ラベル付きアクションを使用して、以下のことを行います:
- CSS セレクターをターゲットにして、まだ計測されていない要素を追跡する。
- 複数の自動キャプチャされたアクションが 1 つの意味のあるユーザーアクションを表す場合に、それらを単一の名前の下にまとめる。
- 自動キャプチャされたアクションの名前を、チームのビジネス用語に合わせて変更する。

ラベル付きアクションを作成後、Datadog は記録されたデータ内のすべての一致するインタラクションに対して、名前を遡及的に適用します。これには、今後の新しいインタラクションだけでなく、過去のインタラクションも含まれます。

ラベル付きアクションは、すべての Product Analytics のチャートで機能し、データセットへの信頼と分析の効率の向上に役立ちます。

ラベルを付けるのに利用できる方法には 2 つあります:
- [**ビジュアルラベリング**](#visual-labeling): Web ページ上のアクションにラベルを付けるためのポイント＆クリックインターフェースです。Datadog テストレコーダー Chrome 拡張機能が必要です。
- [**手動ラベリング**](#manual-labeling): ブラウザ拡張機能を使用せずに、Web およびモバイルアプリケーション向けのアクションにラベルを付けます。

## ビジュアルラベリング {#visual-labeling}

ビジュアルラベリングには、[Datadog テストレコーダー Chrome 拡張機能][1]が必要です。Chrome Web ストアから拡張機能を追加できない場合は、拡張機能のインストールに関する[手動の手順][2]を参照するか、[手動ラベリング](#manual-labeling)を使用します。

1. Datadog の [Actions][3] ページに移動し、アプリケーションを選択します。
2. {{< ui >}}Visual Labeler{{< /ui >}} を選択します。すでにラベル付きアクションが設定されている要素には、青いドットで表示されます。これらのラベル付きアクションの名前を自動的に表示するには、メニューのチェックボックスを選択します。

   {{< img src="product_analytics/action_management/pana-visual-labeler-toolbar.png" alt="Navigate Site モードと Label Actions モードを示す Visual Labeler ツールバー、およびページ上の 5 つのラベル付きアクションの名前を表示するためのチェックボックス。" style="width:90%;">}}

3. {{< ui >}}Navigate Site{{< /ui >}} モードを使用して、ラベルを付けるアクションの場所に移動します。
4. アクションにラベルを付ける準備ができたら、{{< ui >}}Label Actions{{< /ui >}} モードに切り替えます。

### ラベル付きアクションの作成 {#create-a-labeled-action}

1. ラベルを付ける要素をクリックします。Datadog は、過去 7 日間にユーザーがその要素をトリガーした回数を表示します。
2. オプション: 追加の要素をクリックして、それらすべてをまとめてラベルにキャプチャします。ラベル付きアクションから要素を削除するには、その横にあるゴミ箱アイコンを選択します。
3. Datadog は、要素に基づいてラベル付きアクションの名前を提案します。必要に応じて名前を編集します。
4. デフォルトでは、Datadog は現在のページ上の要素に対するクリックのみを追跡します。すべてのページで要素の CSS セレクターの一致を追跡するには、ラベルの詳細を開き、{{< ui >}}Target all pages{{< /ui >}} チェックボックスを選択します。
5. オプション: ラベルが一致する要素を変更または絞り込む場合は、CSS セレクターを直接編集します。
6. {{< ui >}}Save labeled action{{< /ui >}} をクリックします。

{{< img src="product_analytics/action_management/pana-create-labeled-action-2.png" alt="New Chart CTA Click from Home という名前のラベル付きアクションパネル、追跡対象の main navigation という名前の要素、「すべてをターゲットにする」チェックボックス、要素の CSS セレクター、および「ラベル付けされたアクションを保存」ボタン。" style="width:60%;">}}

### 既存のラベル付きアクションの更新 {#update-an-existing-labeled-action}

1. すでにラベル付きアクションが関連付けられている要素 (青いドットで表示) をクリックします。
2. {{< ui >}}Edit{{< /ui >}} を選択します。
3. 追跡対象の要素を追加または削除し、必要に応じて名前や CSS セレクターを更新します。
4. {{< ui >}}Save labeled action{{< /ui >}} をクリックします。

アクションを定義すると、[Actions][3] ページのラベル付きアクションリストに表示され、任意の Product Analytics チャートで使用できるようになります。

## 手動ラベリング {#manual-labeling}

手動ラベリングは、Web アプリケーションとモバイルアプリケーションの両方で利用でき、Chrome 拡張機能は必要ありません。

1. Datadog の [Actions][3] ページに移動し、アプリケーションを選択します。
2. {{< ui >}}Add Labeled Action{{< /ui >}} を選択し、次に {{< ui >}}Create manually{{< /ui >}} を選択します。
3. ラベル名、説明 (オプション)、およびタグ (オプション) を追加します。
4. {{< ui >}}Definition{{< /ui >}} の下で、追跡するイベントを 2 つ以上定義します。
   - {{< ui >}}Action Type{{< /ui >}}: `click` イベントまたは `custom` イベント。`click` イベントの場合、クリックを追跡するためのカスタム CSS セレクターを指定するか、CSS ビルダーを使用してイベントにラベルを付けることで、より詳細な制御と粒度を実現できます。
   - {{< ui >}}Action Name{{< /ui >}}: ドロップダウンを使用してアクションを選択します
   - {{< ui >}}Page Location{{< /ui >}}: ドロップダウンを使用して 2 つ以上のページをターゲットにします
   {{< ui >}}Add New Definition{{< /ui >}} を選択して定義を追加します。
5. **Save** を選択します。

アクションを定義すると、[Actions][3] ページのラベル付きアクションリストに表示され、任意の Product Analytics チャートで使用できるようになります。

## アクションの取得 {#retrieve-your-actions}
アクションを定義すると、[Actions][3] ページでそのアクションを確認できます。

{{< img src="product_analytics/action_management/pana-action-list-2.png" alt="ラベル付きアクションのリスト。" style="width:90%;">}}

## 既知の制限 {#known-limitations}
- ビジュアルラベリングは、Web ページでのみ利用可能です。モバイルアプリケーションの場合は、手動ラベリングを使用します。
- ホバーの背後に隠れているアクションにはラベルを付けることができません。この制限がお客様のユースケースに影響を与える場合は、今後の改善の参考とさせていただきますので、カスタマーサクセスマネージャーまで事例を共有してください。
- ラベル付きアクションを削除すると、そのアクションが使用されているダッシュボードからも削除されます。

[1]: https://chromewebstore.google.com/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: https://docs.datadoghq.com/ja/synthetics/guide/manually-adding-chrome-extension/
[3]: https://app.datadoghq.com/product-analytics/data-management

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}