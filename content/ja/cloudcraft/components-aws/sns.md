---
title: "SNS Component (Deprecated)"
---
## 概要

SNS コンポーネントを使用して、Amazon Web Services アーキテクチャの通知サービスを表現します。

{{< img src="cloudcraft/components-aws/sns/component-sns-diagram.png" alt="'SNS' AWS コンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 定義済みの色を選択するか、コンポーネントとそのアクセントの色の 16 進値を入力します。コンポーネントは、2D ビューと 3D ビューの両方に同じ色を使用することも、それぞれに異なる色を使用することもできます。
- **Rotate item**: コンポーネントを回転させ、その方向を変更します。
- **Requests/month (K)**: ひと月ごとに送信されるリクエスト数を千単位で入力します。
- **Notifications/month (K)**: ひと月ごとに送信される通知数を千単位で入力します。
- **Notification type**: SNS コンポーネントの通知タイプを選択します。

## API

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。

### スキーマ

以下は、SNS コンポーネントの JSON の例です。

```json
{
  "type": "sns",
  "id": "76b1a724-2617-48e8-9be5-c71ccf5689cb",
  "region": "us-east-1",
  "mapPos": [0,10],
  "direction": "down",
  "requests": 20,
  "notifications": 20,
  "notificationType": "email",
  "color": {
    "isometric": "#333333",
    "2d": "#333333"
  },
  "accentColor": {
    "isometric": "#f5b720",
    "2d": "#f5b720"
  },
  "link": "https://aws.amazon.com/sns/",
  "locked": true
}
```

- **type: sns**: コンポーネントのタイプ。
- **id: 文字列**: `uuid` 形式のコンポーネントの一意な識別子。
- **region: 文字列**: SNS インスタンスがデプロイされている AWS リージョン。`cn-` リージョン以外のすべてのグローバルリージョンがサポートされています。
- **mapPos: [数値, 数値]**: x 座標と y 座標のペアで表される、ブループリント内のコンポーネントの位置。
- **direction: 文字列**: コンポーネントの回転または方向。指定できる値は、`down`、`up`、`right` または `left` です。デフォルトは `down` です。
- **requests: 数値**: 1 か月間で送信されるリクエスト数 (千件単位)。デフォルトは `1` です。
- **notifications: 数値**: 1 か月間で送信される通知数 (千件単位)。デフォルトは `1` です。
- **notificationType: 文字列**: SNS で使用される通知のタイプ。詳しくは [`notificationType` で許容される値](#accepted-values-for-notificationtype)を参照してください。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントの塗りつぶし色。16 進数で指定します。
- **accentColor: オブジェクト**: ブロック上のコンポーネントロゴを表示するために使用されるアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
  - **2d: 文字列**: 2D ビューでのコンポーネントのアクセントカラー。16 進数で指定します。
- **link: uri**: コンポーネントを、`blueprint://ID` フォーマットを使用して別の図にリンクするか、`https://LINK` フォーマットを使用して外部の Web サイトにリンクします。
- **locked: ブール値**: `true` の場合、アプリケーションを使用してコンポーネントに加えられた変更は、ロックが解除されるまで無効になります。

## `notificationType` で許容される値

`notificationType` キーは以下の値を受け付けます。

```
email, email-json, http, https, lambda, mobile, sms, sqs
```

[1]: https://developers.cloudcraft.co/
