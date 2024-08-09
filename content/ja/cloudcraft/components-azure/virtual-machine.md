---
title: 仮想マシンコンポーネント
---

## 概要

仮想マシンコンポーネントを使用すると、Azure 環境の仮想マシンを表現して視覚化できます。

{{< img src="cloudcraft/components-azure/virtual-machine/component-virtual-machine-diagram.png" alt="相互接続された Azure 仮想マシンコンポーネントを示す、等角投影された Cloudcraft 図のスクリーンショット。" responsive="true" style="width:60%;">}}

## ツールバー

ツールバーを使用して、コンポーネントの構成とカスタマイズを行います。以下のオプションがあります。

- **Color**: 3D ビューでコンポーネント本体のアクセントカラーと塗りつぶしカラーを選択します。
- **Platform**: 仮想マシンのプラットフォームを選択します。サポートされているオプションは Windows と Linux です。
- **Tier**: 仮想マシンのサービスレベル階層を選択します。
- **Series**: 仮想マシンシリーズを選択します。このオプションは、使用可能なインスタンスタイプに影響します。
- **Instance**: 仮想マシンのインスタンスタイプを選択します。インスタンスのタイプを変更すると、ツールバーに表示されるハードウェアの詳細も変更され、ハイパーバイザーが使用するものが反映されます。

## ヘルプ

[Cloudcraft API][1] を使用して、プログラムでアーキテクチャ図にアクセスし、JSON オブジェクトとしてレンダリングします。以下は、仮想マシンコンポーネントの JSON オブジェクトの例です。

### スキーマ

```json
{
    "type": "azurevm",
    "id": "c46c4a24-e3b5-4830-9217-0276e92ac927",
    "resourceId": "/subscriptions/451da5fc-e712-4a34-b236-3c6992a1c2c0/resourceGroups/VMGROUP1/providers/Microsoft.Compute/virtualMachines/hello",
    "region": "eastus",
    "mapPos": [4.5, 7.5],
    "platform": "linux",
    "tier": "Standard",
    "instance": "B1ms",
    "reservationTerm": "OnDemand",
    "color": {
        "isometric": "#ececed",
        "2d": null
    },
    "accentColor": {
        "isometric": "#4286c5",
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/virtual-machines/",
    "locked": true
}

```

- **type: 文字列**: コンポーネントのタイプ。このコンポーネントの値 `azurevm` の文字列でなければなりません。
- **id: string, uuid**: コンポーネントの一意な識別子。API は内部的に UUID v4 を使用しますが、任意の一意な文字列を受け付けます。
- **resourceId: 文字列**: Azure 内のコンポーネントのグローバルに一意な識別子。
- **region: 文字列**: コンポーネントの Azure リージョン。API は、中国を除くすべてのグローバルリージョンをサポートしています。
- **mapPos: 配列**: ブループリント内のコンポーネントの位置。API では、一意の X 座標と Y 座標のペアを使用して位置を表現します。
- **platform: 文字列**: 仮想マシンのプラットフォーム。`windows` または `linux` のどちらかを指定します。デフォルトは `linux` です。
- **tier: 文字列**.: 仮想マシンのサービスレベル階層。`Low Priority`、`Standard`、`Basic` の 3 つの値のいずれかを指定します。デフォルトは `Standard` です。
- **instance: 文字列**: 仮想マシンのインスタンスタイプ。[詳細は Microsoft Learn を参照してください][2]。デフォルトは `A1 v2` です。
- **color: オブジェクト**: コンポーネント本体の塗りつぶし色。
  - **isometric: 文字列**: 3D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `#ececed` です。
  - **2d: 文字列**: 2D ビューでのコンポーネント本体の 16 進数カラー。デフォルトは `null` です。
- **accentColor: オブジェクト**: コンポーネントロゴのアクセントカラー。
  - **isometric: 文字列**: 3D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `#4286c5` です。
  - **2d: 文字列**: 2D ビューでのコンポーネントロゴの 16 進数カラー。デフォルトは `null` です。
- **link: 文字列、uri**: コンポーネントを別の図や外部の Web サイトにリンクする URI。`blueprint://` または `https://` の 2 つの形式のどちらかを指定します。
- **locked: ブール値**: Web インターフェイスを通してコンポーネントの位置の変更を許可するかどうか。デフォルトは `false` です。

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/virtual-machines/sizes