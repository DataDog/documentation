---
aliases:
- /ja/real_user_monitoring/session_replay/privacy_options
description: セッションリプレイで利用可能なプライバシーコントロールとプライバシーオプションの設定方法について説明します。
further_reading:
- link: /real_user_monitoring/session_replay
  tag: ドキュメント
  text: 送信 - Agent チェック
- link: https://www.datadoghq.com/blog/default-privacy-session-replay/
  tag: ブログ
  text: セッションリプレイのデフォルトプライバシー設定によるユーザーデータの難読化
title: セッションリプレイブラウザのプライバシーオプション
---

## 概要

セッションリプレイは、あらゆる規模の組織が機密データや個人データを公開しないよう、プライバシーコントロールを提供します。データは Datadog が管理するクラウドインスタンスに保存され、静止時には暗号化されます。

セッションリプレイのデフォルトのプライバシー オプションは、エンドユーザーのプライバシーを保護し、重要な組織情報が収集されるのを防ぐように設計されています。

セッションリプレイを有効にすることで、RUM ブラウザ SDK を通じて記録される機密要素を自動的にマスクすることができます。データがマスクされると、そのデータは Datadog の SDK によって元の形で収集されないため、バックエンドに送信されることはありません。

## ブラウザトラブルシューティング

<div class="alert alert-warning"><code>defaultPrivacyLevel</code> と <code>mask-user-input</code> は、SDK v3.6.0+ で利用できます。</div>

プライバシー設定を有効にするには、JavaScript の構成で `defaultPrivacyLevel` を `mask`、`mask-user-input`、または `allow` に設定します。

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    //  service: 'my-web-application',
    //  env: 'production',
    //  version: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackResources: true,
    trackLongTasks: true,
    trackUserInteractions: true,
    defaultPrivacyLevel: 'mask' | 'mask-user-input' | 'allow'
});
```

構成を更新すると、以下のプライバシーオプションで HTML ドキュメントの要素を上書きすることができます。

### マスクモード

`defaultPrivacyLevel` を `mask` モードに設定すると、すべての HTML テキスト、ユーザー入力、画像、リンク、 [`data-*` 属性[1]がマスクされます。アプリケーション上のテキストは `X` に置き換えられ、ページがワイヤーフレームにレンダリングされます。

{{< img src="real_user_monitoring/session_replay/mask-mode-fixed.png" alt="マスクモード" style="width:70%;">}}

**注**: セッションリプレイを有効にした場合、デフォルトでは `mask` がプライバシー設定になります。
**注**: マスクされたデータは、Datadog サーバーに保存されません。

### ユーザー入力マスクモード

入力、テキストエリア、チェックボックスの値など、ほとんどのフォームフィールドをマスクし、その他のテキストはそのまま記録します。入力は 3 つのアスタリスク (`***`) に置き換えられ、テキストエリアはスペースを保持する `x` 文字で難読化されます。

{{< img src="real_user_monitoring/session_replay/mask-user-input-v2.png" alt="ユーザー入力マスクモード" style="width:70%;">}}

### 許可モード

マスクされていないすべてが記録されます。

{{< img src="real_user_monitoring/session_replay/allow.png" alt="許可モード" style="width:70%;">}}

## プライバシーのオプション

### HTML 要素のオーバーライド

アプリケーション全体のデフォルトを設定し、個々の HTML 要素のプライバシーレベルをタグ付けするには、次の 2 つの方法のいずれかを使用します。

1. `data-dd-privacy="allow" | "mask" | "hidden" | "mask-user-input"` などの HTML 属性、または
2. `class="dd-privacy-allow" | "dd-privacy-mask-user-input" | "dd-privacy-mask" | "dd-privacy-hidden"` のような HTML クラス名。

以下の例では、難読化をカスタマイズするために、HTML の特定の要素をオーバーライドする方法を示しています。

```
<div class="line-item" data-dd-privacy="allow">
    <div class="label">Order Value</div>
    <div class="value">
        $<span data-dd-privacy="mask">50.00</span>
    </div>
</div>
```

カート内の金額がアスタリスクに置き換えられます。

{{< img src="real_user_monitoring/session_replay/example-mask.png" alt="マスクモードによる金額の難読化の例" style="width:70%;">}}

## プライバシーに関する制限

エンドユーザーのプライバシーを保護するため、プライバシー設定に関わらず、以下の HTML 要素は**常にマスクされます**。
- `password`、`email`、`tel` 型の入力要素
- クレジットカード番号、有効期限、セキュリティコードなどの `autocomplete` 属性を持つ要素

## 高度なプライバシーオプション

### 要素を完全に非表示にする


`hidden` は高度なプライバシー設定で、テキストを見えなくする代わりに、特定の要素を完全に隠します。

機密性の高いフィールドで可視要素の数が気になる場合は、特定の要素に対して `hidden` を有効にしてください。これらの HTML 要素は、記録時にグレーのブロックに置き換えられます。

このリプレイセッションの例では、Datadog のナビゲーションにあるユーザー名が難読化されています。

{{< img src="real_user_monitoring/session_replay/hidden.png" alt="ユーザー名を難読化する非表示モードの例" style="width:60%;">}}



### アクション名のオーバーライド

デフォルトのアクション名を見えなくし、個々のアクションの命名規則を更新するには、個々のアクション名にオーバーライドを設定します。

特定の HTML 要素の名前をより一般的な名前で上書きすることで、デフォルトのアクション名を変更することができます。デフォルトでは、Datadog はカスタムオーバーライド名を表示します。

例えば、以下の名前を `<div data-dd-action-name="Address" > → Action: "Click on Address"` でオーバーライドします。

デフォルトのアクション名をオーバーライドするその他のユースケースとしては、RUM エクスプローラーで機密データをマスクする、カスタム命名規則で分析と検索を合理化するなどがあります。

<div class="alert alert-info">

Datadog は、RUM とセッションリプレイにさらなるプライバシー機能を追加するために取り組んでいます。ご希望がございましたら、<a href="/help">Datadog サポートにご連絡ください。</a>

</div>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes