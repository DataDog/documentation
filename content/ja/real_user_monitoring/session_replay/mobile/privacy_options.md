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

## きめ細かいマスキング
以下のマスキングモードを使用すると、アプリケーションごとにデフォルト設定を上書きできます。マスキングはきめ細かく制御できるため、テキストや入力内容、画像、タッチ操作などそれぞれ個別にオーバーライドして、ニーズに合わせたカスタム設定を行うことができます。

### テキストと入力のマスキング

デフォルトでは、すべてのデータに対して `mask_all` 設定が有効になっています。この設定が有効な場合、画面上のすべてのテキストや入力内容が以下のようにマスクされます。

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-mask-all-2.png" alt="`mask` が有効な場合のアプリケーション画面の表示例。" style="width:50%;">}}

#### センシティブ入力をマスクする
`mask_sensitive_inputs` 設定を有効にすると、パスワードフィールドなどセンシティブと見なされるものを除き、すべてのテキストと入力内容が表示されます。

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setTextAndInputPrivacy(TextAndInputPrivacy.MASK_SENSITIVE_INPUTS)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: .maskSensitiveInputs,
        imagePrivacyLevel: imagePrivacyLevel,
        touchPrivacyLevel: touchPrivacyLevel
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "React Native" %}}
{{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}
    import {
        SessionReplay,
        SessionReplayConfiguration,
        TextAndInputPrivacyLevel,
    } from "@datadog/mobile-react-native-session-replay";

    const config: SessionReplayConfiguration = {
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: TextAndInputPrivacyLevel.MASK_SENSITIVE_INPUTS,
    }

    SessionReplay.enable(config)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### すべての入力欄をマスクする
`mask_all_inputs` 設定を有効にすると、リプレイ中であらゆる入力欄がマスクされます。

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setTextAndInputPrivacy(TextAndInputPrivacy.MASK_ALL_INPUTS)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: .maskAllInputs,
        imagePrivacyLevel: imagePrivacyLevel,
        touchPrivacyLevel: touchPrivacyLevel
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "React Native" %}}
{{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}
    import {
        SessionReplay,
        SessionReplayConfiguration,
        TextAndInputPrivacyLevel,
    } from "@datadog/mobile-react-native-session-replay";

    const config: SessionReplayConfiguration = {
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: TextAndInputPrivacyLevel.MASK_ALL_INPUTS,
    }

    SessionReplay.enable(config)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### すべてマスク
`mask_all` 設定を有効にすると、リプレイ上ですべてのテキストや入力欄がマスクされます。

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setTextAndInputPrivacy(TextAndInputPrivacy.MASK_ALL)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: .maskAll,
        imagePrivacyLevel: imagePrivacyLevel,
        touchPrivacyLevel: touchPrivacyLevel
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "React Native" %}}
{{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}
    import {
        SessionReplay,
        SessionReplayConfiguration,
        TextAndInputPrivacyLevel,
    } from "@datadog/mobile-react-native-session-replay";

    const config: SessionReplayConfiguration = {
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: TextAndInputPrivacyLevel.MASK_ALL,
    }

    SessionReplay.enable(config)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### 画像のマスキング

デフォルトでは、すべての画像に対して `mask_all` 設定が有効になっています。この設定が有効な場合、画面上のすべての画像がマスクされます。

#### すべての画像をマスクする
`mask_all` 設定が有効な場合、リプレイ上ではすべての画像が「Image」と表示されるプレースホルダーに置き換えられます。

{{< img src="real_user_monitoring/session_replay/mobile/masking-image-mask-all.png" alt="`mask-all` が有効な場合のアプリ画面例" style="width:50%;">}}

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setImagePrivacy(ImagePrivacy.MASK_ALL)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: textAndInputPrivacyLevel,
        imagePrivacyLevel: .maskAll,
        touchPrivacyLevel: touchPrivacyLevel
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "React Native" %}}
{{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}
    import {
        SessionReplay,
        SessionReplayConfiguration,
        ImagePrivacyLevel,
    } from "@datadog/mobile-react-native-session-replay";

    const config: SessionReplayConfiguration = {
        replaySampleRate: sampleRate, 
        imagePrivacyLevel: ImagePrivacyLevel.MASK_ALL,
    }

    SessionReplay.enable(config)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### コンテンツ画像をマスクする
システム画像を表示したままコンテンツをマスクしたい場合、以下の設定を選択できます。

iOS: `mask_non_bundled_only` 設定を使用すると、システムの一部ではないすべての画像が「Content Image」というプレースホルダーに置き換えられます。

Android: `mask_large_only` 設定を使用すると、100x100dp を超えるサイズの画像のみが「Content Image」というプレースホルダーに置き換えられます。

**注**: ここでの寸法はビューのサイズではなく、drawable リソースのサイズを指します。

{{< tabs >}}

{{% tab "Android" %}}
{{< img src="real_user_monitoring/session_replay/mobile/masking-image-mask-large-only.png" alt="Android で `mask_large_only` が有効な場合のアプリ画面例" style="width:50%;">}}


{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setImagePrivacy(ImagePrivacy.MASK_LARGE_ONLY)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}

{{< /tab >}}


{{% tab "iOS" %}}

{{< img src="real_user_monitoring/session_replay/mobile/masking-image-mask-non-bundled-only.png" alt="iOS で `mask_non_bundled_only` が有効な場合のアプリ画面例" style="width:50%;">}}

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: textAndInputPrivacyLevel,
        imagePrivacyLevel: .maskNonBundledOnly,
        touchPrivacyLevel: touchPrivacyLevel
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "React Native" %}}
{{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}
    import {
        SessionReplay,
        SessionReplayConfiguration,
        ImagePrivacyLevel,
    } from "@datadog/mobile-react-native-session-replay";

    const config: SessionReplayConfiguration = {
        replaySampleRate: sampleRate, 
        imagePrivacyLevel: ImagePrivacyLevel.MASK_NON_BUNDLED_ONLY,
    }

    SessionReplay.enable(config)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### すべての画像を表示する
`mask_none` 設定が有効になると、リプレイで表示されるすべての画像がマスクされずにそのまま表示されます。

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setImagePrivacy(ImagePrivacy.MASK_NONE)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: textAndInputPrivacyLevel,
        imagePrivacyLevel: .maskNone,
        touchPrivacyLevel: touchPrivacyLevel
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "React Native" %}}
{{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}
    import {
        SessionReplay,
        SessionReplayConfiguration,
        ImagePrivacyLevel,
    } from "@datadog/mobile-react-native-session-replay";

    const config: SessionReplayConfiguration = {
        replaySampleRate: sampleRate, 
        imagePrivacyLevel: ImagePrivacyLevel.MASK_NONE,
    }

    SessionReplay.enable(config)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### タッチのマスキング
デフォルトでは、すべてのタッチに対して `hide` 設定が有効になっています。この設定が有効な場合、画面上で行われるすべてのタッチが非表示になります。

#### すべてのタッチを非表示にする
`hide` 設定が有効な場合、リプレイ中に発生するすべてのタッチが非表示になります。これがデフォルトの設定です。

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setTouchPrivacy(TouchPrivacy.HIDE)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: textAndInputPrivacyLevel,
        imagePrivacyLevel: imagePrivacyLevel,
        touchPrivacyLevel: .hide
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "React Native" %}}
{{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}
    import {
        SessionReplay,
        SessionReplayConfiguration,
        TouchPrivacyLevel,
    } from "@datadog/mobile-react-native-session-replay";

    const config: SessionReplayConfiguration = {
        replaySampleRate: sampleRate, 
        touchPrivacyLevel: TouchPrivacyLevel.HIDE,
    }

    SessionReplay.enable(config)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

#### すべてのタッチを表示する
`show` 設定が有効な場合、リプレイ中に発生するすべてのタッチが表示されます。

{{< tabs >}}
{{% tab "Android" %}}
{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}

    val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
    .setTouchPrivacy(TouchPrivacy.SHOW)
    .build()
    SessionReplay.enable(sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    let sessionReplayConfig = SessionReplay.Configuration(
        replaySampleRate: sampleRate, 
        textAndInputPrivacyLevel: textAndInputPrivacyLevel,
        imagePrivacyLevel: imagePrivacyLevel,
        touchPrivacyLevel: .show
    )
    SessionReplay.enable(with: sessionReplayConfig)

{{< /code-block >}}
{{% /tab %}}
{{% tab "React Native" %}}
{{< code-block lang="typescript" filename="App.tsx" disable_copy="false" collapsible="true" >}}
    import {
        SessionReplay,
        SessionReplayConfiguration,
        TouchPrivacyLevel,
    } from "@datadog/mobile-react-native-session-replay";

    const config: SessionReplayConfiguration = {
        replaySampleRate: sampleRate, 
        touchPrivacyLevel: TouchPrivacyLevel.SHOW,
    }

    SessionReplay.enable(config)

{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## プライバシーオーバーライド

前述のセクションでは、アプリケーション全体に適用されるグローバルなマスキングレベルについて説明しました。しかし、これらの設定はビュー単位でもオーバーライドが可能です。テキストと入力、画像、タッチ操作に対しては先ほどと同じプライバシーレベルが使用でき、さらに特定のビューを完全に非表示にする設定も追加されています。

オーバーライドを正しく認識させるためには、ビューのライフサイクルで可能な限り早い段階で適用する必要があります。そうすることで、Session Replay がオーバーライドの適用前にビューを処理してしまう事態を防げます。

プライバシーオーバーライドは、指定したビューおよびその子孫ビューに影響します。つまり、仮に画像オーバーライドをテキスト入力ビューに適用しても、実際にはすべての子ビューに対して有効となります。 

オーバーライドは「最も近い親」の設定に従って動作します。もしビュー自体にオーバーライドがあればその設定が使われ、なければ階層内で最も近い親のオーバーライドを継承します。もし親にも設定がなければ、アプリケーション全体のマスキングレベルが適用されます。

<div class="alert alert-info">SwiftUI ではプライバシーオーバーライドをサポートしていません。</div>


### テキストと入力のオーバーライド

{{< tabs >}}
{{% tab "Android" %}}

テキストと入力のプライバシーをオーバーライドするには、対象のビューインスタンスで `setSessionReplayTextAndInputPrivacy` を呼び出し、`TextAndInputPrivacy` 列挙体の値を渡します。`null` を渡すとオーバーライドが解除されます。

{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}
    // ビューにテキストと入力のオーバーライドを設定
    myView.setSessionReplayTextAndInputPrivacy(TextAndInputPrivacy.MASK_SENSITIVE_INPUTS)
    // ビューから画像オーバーライドを削除
    myView.setSessionReplayTextAndInputPrivacy(null)
{{< /code-block >}}
{{% /tab %}}

{{% tab "iOS" %}}

テキストと入力のプライバシーをオーバーライドするには、対象のビューインスタンスで `dd.sessionReplayOverrides.textAndInputPrivacy` を設定し、`TextAndInputPrivacyLevel` 列挙体の値を指定します。`nil` を設定するとオーバーライドが解除されます。

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
    // ビューにテキストと入力のオーバーライドを設定
    myView.dd.sessionReplayOverrides.textAndInputPrivacy = .maskSensitiveInputs
    // ビューから画像オーバーライドを削除
    myView.dd.sessionReplayOverrides.textAndInputPrivacy = nil
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### 画像のオーバーライド

{{< tabs >}}
{{% tab "Android" %}}

画像のプライバシーをオーバーライドするには、対象のビューインスタンスで `setSessionReplayImagePrivacy` を呼び出し、`ImagePrivacy` 列挙体の値を渡します。`null` を渡すとオーバーライドが解除されます。

{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}
    // ビューに画像オーバーライドを設定
    myView.setSessionReplayImagePrivacy(ImagePrivacy.MASK_ALL)
    // ビューから画像オーバーライドを削除
    myView.setSessionReplayImagePrivacy(null)
{{< /code-block >}}
{{% /tab %}}

{{% tab "iOS" %}}

画像のプライバシーをオーバーライドするには、対象のビューインスタンスで `dd.sessionReplayOverrides.imagePrivacy` を設定し、`ImagePrivacyLevel` 列挙体の値を指定します。`nil` を設定するとオーバーライドが解除されます。

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
    // ビューに画像オーバーライドを設定
    myView.dd.sessionReplayOverrides.imagePrivacy = .maskAll
    // ビューから画像オーバーライドを削除
    myView.dd.sessionReplayOverrides.imagePrivacy = nil
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

### タッチのオーバーライド

{{< tabs >}}
{{% tab "Android" %}}

タッチのプライバシーをオーバーライドするには、対象のビューインスタンスで `setSessionReplayTouchPrivacy` を呼び出し、`TouchPrivacy` 列挙体の値を渡します。`null` を渡すとオーバーライドが解除されます。

{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}
    // ビューにタッチオーバーライドを設定
    view.setSessionReplayTouchPrivacy(TouchPrivacy.HIDE)
    // ビューからタッチオーバーライドを削除
    view.setSessionReplayTouchPrivacy(null)
{{< /code-block >}}
{{% /tab %}}

{{% tab "iOS" %}}

タッチのプライバシーをオーバーライドするには、対象のビューインスタンスで `dd.sessionReplayOverrides.touchPrivacy` を設定し、`TouchPrivacyLevel` 列挙体の値を指定します。`nil` を設定するとオーバーライドが解除されます。

{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
    // ビューにタッチオーバーライドを設定
    myView.dd.sessionReplayOverrides.touchPrivacy = .hide
    // ビューからタッチオーバーライドを削除
    myView.dd.sessionReplayOverrides.touchPrivacy = nil
{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### 隠し要素のオーバーライド

完全に非表示にする必要がある機密要素には、`hidden` 設定を使用します。 

要素が `hidden` に設定されると、リプレイ上では「Hidden」というラベルのプレースホルダーに置き換えられ、その子ビューは記録されません。

**注**: ビューを `hidden` としてマークしても、その要素に対するタッチ操作の記録は防げません。タッチ操作も隠したい場合は、要素を `hidden` にするのに加えて[タッチのオーバーライド](#touch-override)も併用してください。

{{< tabs >}}
{{% tab "Android" %}}

要素を非表示にするには、`setSessionReplayHidden(hide = true)` を使用します。`hide` を `false` に設定するとオーバーライドが解除されます。

{{< code-block lang="kotlin" filename="application.kt" disable_copy="false" collapsible="true" >}}
    // ビューを非表示に設定
    myView.setSessionReplayHidden(hide = true)
    // ビューからオーバーライドを削除
    myView.setSessionReplayHidden(hide = false)
{{< /code-block >}}

{{% /tab %}}

{{% tab "iOS" %}}
{{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
    // ビューを非表示に設定
    myView.dd.sessionReplayOverrides.hide = true
    // ビューからオーバーライドを削除
    myView.dd.sessionReplayOverrides.hide = false
{{< /code-block >}}

**注**: `hidden` オーバーライドを `nil` に設定した場合は、`false` と同じ扱いになり、オーバーライドが無効化されます。

{{% /tab %}}
{{< /tabs >}}

### WebView に関する注意点

- `hidden` と `touch` を除くプライバシーオーバーライドは、WebView ではサポートされていません。主に[ブラウザ SDK のプライバシー設定][1]を使用して管理してください。 

- WebView を `hidden` としてマークした場合、リプレイ上ではプレースホルダーに置き換えられますが、WebView 自体はデータの収集と送信を継続します。これを避けるには、より細かい制御が可能な[ブラウザ SDK のプライバシー設定][1]を使用することを推奨します。


## マスキングの対象データとその方法

このセクションでは、Datadog のレコーダーがデータの種類に基づきマスキングをどのように処理し、そのデータがどのように定義されるかを説明します。

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

| タイプ | すべて許可 | すべてマスク | ユーザー入力をマスク |
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
- iOS の Date Picker で選択された日付を表示するラベルの色
- 値選択ツールの最初と最後のオプションの位置 (iOS および Android)

### タッチインタラクション

以下のチャートは、ユーザーが構成で設定したルールを使用して、各テキストタイプにどのようにタッチインタラクション戦略が適用されるかを示しています。スクリーンキーボード上で発生するインタラクションはすべてマスクされる一方、その他の要素とのインタラクションはマスクされません。

| タイプ | すべて許可 | すべてマスク | ユーザー入力をマスク |
|------|-------------|------------|-------------------|
| [その他の属性](#other-attributes) |  |  |  |
| [スクリーンキーボード](#on-screen-keyboard) | {{< X >}} | {{< X >}} | {{< X >}} |

### 画像のマスキング

以下の表では、異なる画像マスキング戦略がどのように適用されるかを示しています。

| タイプ           | Mask None | Mark Large Only (Android) <br/> / Mask Non Bundled Only (iOS) | Mask All 
|----------------|-----------|---------------------------------------------------------------|---------|
| Content Image  | Shown     | Masked                                                        | Masked |
| System Image   | Shown     | Shown                                                         | Masked |


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/real_user_monitoring/session_replay/privacy_options