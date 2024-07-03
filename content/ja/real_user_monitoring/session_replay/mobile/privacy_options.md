---
aliases: null
description: モバイルセッションリプレイのプライバシーオプションの構成
further_reading:
- link: /real_user_monitoring/session_replay/mobile
  tag: ドキュメント
  text: モバイルセッションリプレイ
- link: /real_user_monitoring/session_replay/mobile/app_performance
  tag: ドキュメント
  text: モバイルセッションリプレイがアプリのパフォーマンスに与える影響
- link: /real_user_monitoring/session_replay/mobile/setup_and_configuration
  tag: ドキュメント
  text: モバイルセッションリプレイの設定と構成
- link: /real_user_monitoring/session_replay/mobile/troubleshooting
  tag: ドキュメント
  text: モバイルセッションリプレイのトラブルシューティング
- link: /real_user_monitoring/session_replay
  tag: ドキュメント
  text: セッションリプレイ
title: モバイルセッションリプレイのプライバシーオプション
---

## 概要

セッションリプレイは、あらゆる規模の組織が機密データや個人データを公開しないよう、プライバシーコントロールを提供します。データは Datadog が管理するクラウドインスタンスに保存され、静止時には暗号化されます。

セッションリプレイのデフォルトのプライバシー オプションは、エンドユーザーのプライバシーを保護し、重要な組織情報が収集されるのを防ぎます。

モバイルセッションリプレイを有効にすることで、RUM モバイル SDK を通じて記録される機密要素を自動的にマスクすることができます。データがマスクされると、そのデータは Datadog の SDK によって元の形で収集されないため、バックエンドに送信されることはありません。

## マスキングモデルの構成

以下のマスキングモデルを使用して、デフォルトの設定をアプリケーション単位で上書きすることができます。

### すべてのテキスト要素をマスクする

デフォルトでは、すべてのデータで `mask` 設定が有効になっています。この設定が有効になっている場合、下の図のように、画面上の全てのテキストコンテンツがマスクされます。

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-mask-all-2.png" alt="`mask` が有効な場合のアプリケーション画面の表示例。" style="width:50%;">}}

{{< tabs >}}
{{% tab "Android" %}}

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   // すべてのテキスト要素をマスク
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
       .setPrivacy(SessionReplayPrivacy.MASK)
       .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    // すべてのテキスト要素をマスク
    SessionReplay.enable(
        with: SessionReplay.Configuration(
            replaySampleRate: sampleRate,
            defaultPrivacyLevel: .mask
        )
    )

   {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### 入力要素のみをマスクする

`mask user input` 設定が有効になっている場合、すべての入力フィールドが匿名化されたテキストに置き換えられます。

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-user-input-2.png" alt="ユーザー入力フィールドがマスクされた場合のアプリケーション画面の表示例。" style="width:50%;">}}

{{< tabs >}}
{{% tab "Android" %}}

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   // 入力要素のみをマスク
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
       .setPrivacy(SessionReplayPrivacy.MASK_USER_INPUT)
       .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

   // 入力要素のみをマスク
    SessionReplay.enable(
        with: SessionReplay.Configuration(
            replaySampleRate: sampleRate,
            defaultPrivacyLevel: .maskUserInput
        )
    )

   {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Allow (マスキングなし)

`allow` 設定が有効になっている場合、すべてのテキストが表示されます。

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-allow-all-2.png" alt="`allow` が有効な場合のアプリケーション画面の表示例。" style="width:50%;">}}

**注**: このオプションが有効な場合でも、パスワード、メール、電話番号、住所などの機密テキストフィールドは依然としてマスクされます。詳細については、[テキストのマスキングの定義](#text-masking-definitions)を参照してください。

{{< tabs >}}
{{% tab "Android" %}}

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   // マスキングなし、すべてのテキストを表示
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
      .setPrivacy(SessionReplayPrivacy.ALLOW)
      .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
   // マスキングなし、すべてのテキストを表示
    SessionReplay.enable(
        with: SessionReplay.Configuration(
            replaySampleRate: sampleRate,
            defaultPrivacyLevel: .allow
        )
    )

   {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## マスキングの対象データとその方法

このセクションでは、Datadog レコーダーがデータタイプに基づいてどのようにマスキングを処理するか、またそのデータがどのように定義されているかを説明します。
### テストマスキング戦略

Datadog のマスキングルールでは、プライバシー設定の構成方法、テキストのタイプ、データの機密性に応じて、テキストフィールドのタイプごとに異なる戦略が適用されます。

| テキストのマスキング戦略 | 説明 | 例 |
|-----------------------|-------------|---------|
| マスクなし | セッションリプレイでテキストを表示 | `"Hello world"` → `"Hello world"` |
| スペース保持型マスク | 表示される各文字を小文字の "x" に置換 | `"Hello world"` → `"xxxxx xxxxx"` |
| 固定長マスク | テキストフィールド全体を 3 つのアスタリスク (***) から成る定数に置換 | `"Hello world"` → `"***"`

上記のテキスト戦略を念頭に、コンフィギュレーションで `mask` のデフォルトのプライバシールールを上書きしたい場合は、いくつかのオプションがあります。

以下のチャートは、Datadog で、ユーザーが構成で設定したルールを使用して、各テキストタイプにどのようにテキストマスキング戦略が適用されるかを示しています。

| タイプ | すべて許可 | すべてマスク | ユーザー入力をマスク |
|------|-------------|------------|-------------------|
| [機密テキスト](#sensitive-text) | 固定長マスク | 固定長マスク | 固定長マスク |
| [入力・オプションテキスト](#input-and-option-text) | マスクなし | 固定長マスク | 固定長マスク |
| [静的テキスト](#static-text) | マスクなし | スペース保持型マスク | マスクなし |
| [ヒントテキスト](#hint-text) | マスクなし | 固定長マスク | マスクなし |

### テキストのマスキングの定義

Datadog のレコーダーが各テキストタイプをどのように取り扱うかについては、以下の説明をご覧ください。

#### 機密テキスト
機密テキストには、プラットフォーム固有の方法で識別が施されたパスワード、メールアドレス、電話番号や、各プラットフォームで用意されている機密性を示すその他のテキスト形式が含まれます。

これには、以下のテキスト内のパスワード、メールアドレス、電話番号が含まれます。

- テキストフィールド (iOS)
- テキストビュー (iOS)
- 編集テキスト (Android)
- 住所情報 (iOS + Android)
- クレジットカード情報 (iOS)
- ワンタイムコード (iOS)

#### 入力・オプションテキスト

入力・オプションテキストとは、ユーザーがキーボードその他のテキスト入力デバイスを使って入力したテキスト、または選択要素内のカスタム (共通ではない) 値のことです。

以下のものが含まれます。

- ユーザーが以下で入力したテキスト
  - テキストフィールド (iOS)
  - テキストビュー (iOS)
  - 編集テキスト (Android)
- ユーザーが以下で選択したオプション
  - 値の選択ツール (iOS + Android)
  - セグメント (iOS)
  - ドロップダウンリスト (Android)
- 主な例外
  - テキストフィールド、テキストビュー、編集テキストのプレースホルダー (ヒント) テキスト (ユーザー入力したものではないテキスト)
  - テキストビューの編集不可能なテキスト (iOS).
  - 日付選択ツールの月、日、年のラベル (共通の値)

#### 静的テキスト
静的テキストとは、ユーザーが直接入力したものではないテキストのことです。以下のものが含まれます。

以下のすべてのテキスト

- チェックボックスおよびラジオボタンのタイトル (Android)
- 編集不可能なテキストビューのテキスト (iOS)
- 日時選択ツールの月、日、年のラベル
- スライダーの現在の値など、入力要素に対するジェスチャー操作に応じて更新された値
- ラベル、タブバー、ナビゲーションバー (iOS)、タブ (Android) などの、「ユーザー入力要素」とは見なされていないその他のコントロール

#### ヒントテキスト
ヒントテキストとは、値が一切与えられていないときに、編集可能なテキスト要素またはオプション選択ツールに表示される静的なテキストのことです。以下のものが含まれます。

- テキストフィールド (iOS)、テキストビュー (iOS) のプレースホルダー
- 編集テキストのヒント (Android)
- ドロップダウンリストの指示 (Android)

### 概観のマスキング

以下のチャートは、ユーザーが構成で設定したルールを使用して、各テキストタイプにどのように概観マスキング戦略が適用されるかを示しています。

| タイプ | Allow all | すべてマスク | ユーザー入力をマスク |
|------|-------------|------------|-------------------|
| [開示型の属性](#revealing-attributes) |  | {{< X >}} | {{< X >}} |
| [その他の属性](#other-attributes) |  |  |  |

#### 開示型の属性
開示型の属性とは、入力要素の値を明らかにし、または示唆し、ユーザーの入力内容や選択内容を推測するのに使用できる属性のことです。

以下のものが含まれます。

**形状**
- セグメントで選択されたオプションの背景 (iOS)
- 日付選択ツールで選択された日付を囲む円 (iOS)
- チェックボックスの選択マーク (Android)
- スライダーのつまみ (iOS および Android)

**テキスト属性**
- Date Picker (iOS) で選択された日付を表示するラベルの色
- 値選択ツールの最初と最後のオプションの位置 (iOS および Android)

### タッチインタラクション

以下のチャートは、ユーザーが構成で設定したルールを使用して、各テキストタイプにどのようにタッチインタラクション戦略が適用されるかを示しています。スクリーンキーボード上で発生するインタラクションはすべてマスクされる一方、その他の要素とのインタラクションはマスクされません。

| タイプ | Allow all | すべてマスク | ユーザー入力をマスク |
|------|-------------|------------|-------------------|
| [その他の属性](#other-attributes) |  |  |  |
| [スクリーンキーボード](#on-screen-keyboard) | {{< X >}} | {{< X >}} | {{< X >}} |

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}