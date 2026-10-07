---
title: API キーを生成する
---

Cloudcraft は、アーキテクチャ図へのプログラム的なアクセスとリモートレンダリングを提供する[開発者 API][1] を提供しています。この API は、Cloudcraft アカウントにリンクされた AWS および Azure アカウントの完全に自動化された視覚化も、すぐに使用できる画像や JSON データとして提供します。

この API を使用するには認証が必要です。このガイドでは、Web インターフェイスを通じて API キーを作成する方法を説明します。

<div class="alert alert-info">Cloudcraft の開発者 API を使用する機能は Pro サブスクリプションのユーザーのみが利用できます。サブスクリプションプランの詳細については、<a href="https://www.cloudcraft.co/pricing">Cloudcraft の価格ページ</a>を参照してください。</div>

## 前提条件

このガイドでは、以下があることを前提としています。

- [オーナーまたは管理者のロール][2]を持つ Cloudcraft ユーザー。
- 有効な [Cloudcraft Pro サブスクリプション][3]。

## API キーを作成

自動化のために API キーを作成するには、**User** > **API keys** に移動し、**Create API key** をクリックします。

{{< img src="cloudcraft/getting-started/generate-api-key/create-api-key-button.png" alt="API キーの作成ボタンに焦点を当てた Cloudcraft の API キー管理インターフェイスのスクリーンショット。" responsive="true" style="width:75%;">}}

キーの目的を説明する名前を付け (例えば「自動化キー」)、適切な権限を割り当てます。このキーに最も適した権限を選択しますが、可能な限り[最小特権の原則][4]に従ってください。このキーへのアクセス権をチームに付与する際も同様です。

{{< img src="cloudcraft/getting-started/generate-api-key/create-api-key-window.png" alt="名前と権限を設定するフィールドを含む Cloudcraft の API キー作成インターフェイスのスクリーンショット。" responsive="true" style="width:100%;">}}

完了したら、**Save key** をクリックして新しい API キーを作成します。後で使用できるように、安全な場所にキーを書き留めておいてください。

API キーの作成に関して質問や問題がある場合は、[アプリ内ビーコンを通じて Cloudcraft のサポートチームに連絡][5]してください。

[1]: /ja/cloudcraft/api/
[2]: /ja/cloudcraft/account-management/roles-and-permissions/
[3]: https://www.cloudcraft.co/pricing
[4]: https://en.wikipedia.org/wiki/Principle_of_least_privilege
[5]: https://app.cloudcraft.co/support