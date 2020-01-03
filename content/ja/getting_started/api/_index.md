---
title: Datadog API と Postman の使用
kind: documentation
aliases:
  - /ja/developers/faq/using-postman-with-datadog-apis
  - /ja/getting_started/using-postman-with-datadog-apis
  - /ja/developers/guide/using-postman-with-datadog-apis
---
## 概要

Datadog API を使用すると、Datadog との間でデータをやり取りできます。Datadog API は、リソース指向の URL とステータスコードを使用してリクエストの成功または失敗を示し、すべてのリクエストから JSON を返します。

この記事では、[Postman][1] を使用して Datadog への API 呼び出しを実行する方法を説明します。記事内では、Datadog API 内で使用可能なアクションを示し、Postman を使用して `GET`、`POST`、`PUT`、および `DELETE` を実行するための高度な概要を提供します。

## 前提条件

以下が必要です。

* Datadog のアクティブな実装。
* Datadog [API キーとアプリケーションキー][2]へのアクセス権。
* [Postman API クライアントがインストール済みであること][1]。
* API 構造と JSON 書式設定に関する基礎知識。

## セットアップ

### Datadog コレクションのインポート

前提条件を満たしていれば、以下を実行します。

1. [Datadog Postman コレクション][3] (事前に構成された API 呼び出しテンプレート) をダウンロードします。
    Postman においてコレクションとは、編集、保存、再利用を容易にするために API 呼び出しを整理してまとめたフォルダーです。

2. Datadog Postman コレクションをインポートします。
    * Postman を開きます。
    * **Import**をクリックします。
    * 手順 1 でダウンロードした [datadog_collection.json][3] ファイルを選択します。

さまざまな API サンプルが入った Datadog コレクションが入手できました。

**注**: この時点では API 呼び出しは機能しません。以下を参照して Datadog-Postman 環境を設定してください。

### Postman 環境のセットアップ

Postman コレクションをインポートすると、Postman の左ペインに、使用できるすべての Datadog API 呼び出しの一覧がフォルダーで構造化されて示されます。
フォルダー内の API 呼び出しには、`datadog_site`、`datadog_api_key`、`datadog_application_key` に対する変数が次のように入力されています。

{{< img src="getting_started/postman/SetAPIKeys.png" alt="postman_api_template_variables" responsive="true" style="width:70%;" >}}

これにより、[Postman 環境][4]をセットアップして、認証用の Datadog サイト、API、およびアプリケーションキーを保存できます。Datadog オーガニゼーションが複数ある場合は、複数の [Postman 環境][4]をセットアップすることにより、Datadog Postman コレクション内の API 呼び出しは変更しないまま各オーガニゼーションに対して API 呼び出しを実行できます。

以下の手順に従って環境をセットアップします。

1. Postman の右上隅にある **Manage Environments** の歯車アイコンをクリックします。

2. **Add** をクリックし、**Environment Name (環境名)** を入力します。

3. 表に、`datadog_api_key` 変数と `datadog_application_key` 変数を追加します。**Current Value** 列に、実際の [Datadog API キーとアプリケーションキー][2]を入力します。

4. `datadog_site` 変数を追加します。**Current Value** 列に、Datadog US サイトの場合は `com`、Datadog EU サイトの場合は `eu` と入力します。

5. オプション: Datadog オーガニゼーションが複数ある場合は、オーガニゼーションごとに手順 1 から 4 を繰り返します。

{{< img src="getting_started/postman/setAPIKeys2.png" alt="postman_api_template_variables" responsive="true" style="width:70%;" >}}

## コレクションの使用

セットアップが完了したら、いつでも API 呼び出しを行うことができます。Postman -> Datadog フォルダーには、[Datadog API リファレンス][5]に一覧表示されている各 API カテゴリタイプのサブフォルダーがあります。このサブフォルダーを展開すると、HTTP メソッドと API 呼び出し名を確認できます。

**注**: 必ず Postman インターフェイスの右上隅で定義済み環境を設定してください。

{{< img src="getting_started/postman/env_setup.png" alt="Environment Setup" responsive="true" style="width:40%;" >}}

### ビルダー

コレクション内の API 呼び出しをクリックすると、右側の `Builder` ペインにロードされます。このペインで API 呼び出しを送信し、返されたステータス、応答時間、および API 応答コードを確認できます。

{{< img src="getting_started/postman/apiGetCalls.png" alt="postman_api_response" responsive="true" style="width:70%;" >}}

### 説明

エンドポイント名をクリックすると、エンドポイントの説明と、すべての必須/オプションパラメーターが表示されるため、容易にリクエストを構築できます。

{{< img src="getting_started/postman/description.mp4" alt="Postman description" video="true" responsive="true" >}}

### Params

**Params** タブには、現在 API 呼び出しに存在するすべてのパラメーターと値が表示されます。ここでは、パラメーターと値を追加できます。使用可能な引数は、[Datadog API ドキュメント][6] の対応するセクションで確認してください。

{{< img src="getting_started/postman/parameters.png" alt="postman_param" responsive="true" style="width:70%;" >}}

このタブは、API 呼び出しの `param1:value1&param2:value2` 構造を表示する代わりに使用できます。

**注**:

* params テーブルでは、アンパサンド (&) とコロン (:) は不要です。Postman によって挿入されます。
* すべてのプレースホルダーは `<PLACEHOLDER>` の形式に従います。プレースホルダーはクエリを実行する前に置き換える必要があります。

[1]: https://www.getpostman.com
[2]: https://app.datadoghq.com/account/settings#api
[3]: /resources/json/datadog_collection.json
[4]: https://www.getpostman.com/docs/v6/postman/environments_and_globals/manage_environments
[5]: /ja/api/#organizations
[6]: /ja/api