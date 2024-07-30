---
description: Synthetic API およびマルチステップ API テストでアプリケーションにログインできるようにする方法について説明します。
further_reading:
- link: /data_security/synthetics
  tag: ドキュメント
  text: Synthetics データセキュリティについて
- link: /synthetics/api_tests
  tag: ドキュメント
  text: API テストの作成
- link: /synthetics/multistep
  tag: ドキュメント
  text: マルチステップ API テストを作成する
title: API およびマルチステップ API テストでの認証使用
---

## 概要

[API テスト][1]では、アプリケーションの API エンドポイントにリクエストを送信し、レスポンスタイム、期待されるステータスコード、ヘッダー、本文の内容など、定義された条件とレスポンスを検証することができます。[マルチステップ API テスト][2]を使用すると、リクエストを連鎖させて、重要なサービス上での複雑なジャーニーを積極的に監視し、それらがいつでも、管理されたロケーションやプライベートロケーションからアクセス可能であることを保証できます。

このガイドでは、Synthetic API およびマルチステップ API テストで利用可能なさまざまな認証プロトコルに ついて説明します。ブラウザテストにおける認証の詳細については、[認証が必要なアプリケーションでテストを実行する][3]を参照してください。

## 認証方法

エンドポイントで認証が必要な場合、[API の作成][4]または[マルチステップ API テスト][5]の際に資格情報を追加することができます。API およびマルチステップ API テストは、基本アクセス認証、ダイジェストアクセス認証、OAuth2.0、NTLM、AWS Sigv4、クライアント証明書の認証プロトコルをサポートしています。

**Define the request** セクションで、**Advanced Options** > **Authentication** をクリックし、認証方法を選択します。

{{< tabs >}}
{{% tab "基本アクセス" %}}

**HTTP Basic Auth** をクリックし、ユーザー名とパスワードを入力します。[HTTP テスト][1]、[マルチステップ API テスト][2]、[WebSocket テスト][3]では、基本アクセス認証がサポートされています。

[1]: /ja/synthetics/api_tests/http_tests/
[2]: /ja/synthetics/multistep/
[3]: /ja/synthetics/api_tests/websocket_tests/
{{% /tab %}}
{{% tab "ダイジェストアクセス" %}}

**Digest Auth** をクリックし、ユーザー名とパスワードを入力します。[HTTP テスト][1]と[マルチステップ API テスト][2]では、ダイジェストアクセス認証がサポートされています。

[1]: /ja/synthetics/api_tests/http_tests/
[2]: /ja/synthetics/multistep/
{{% /tab %}}
{{% tab "OAuth 2.0" %}}

**OAuth 2.0** をクリックし、グラントタイプ (**Client Credentials** または **Resource Password**) を選択し、Access Token URL、クライアント ID、およびクライアントシークレットを含めます。トークン API 認証方法 (**Send as Basic Auth header** または **Send client credentials in body**) を選択し、オプションでオーディエンス、リソース、およびスコープを含めます。OAuth 2.0 認証は、[HTTP テスト][1]と[マルチステップ API テスト][2]でサポートされています。

[1]: /ja/synthetics/api_tests/http_tests/
[2]: /ja/synthetics/multistep/
{{% /tab %}}
{{% tab "NTLM" %}}

**NTLM** をクリックし、ユーザー名とパスワード、そしてオプションでドメインとワークステーションを入力します。NTLM 認証は、[HTTP テスト][1]と[マルチステップ API テスト][2]でサポートされています。

[1]: /ja/synthetics/api_tests/http_tests/
[2]: /ja/synthetics/multistep/
{{% /tab %}}
{{% tab "AWS Signature" %}}

**AWS Signature** をクリックし、Access Key ID と Secret Access Key、オプションでリージョン、サービス名、セッショントークンを入力します。AWS Signature 認証は、[HTTP テスト][1]と[マルチステップ API テスト][2]でサポートされています。

[1]: /ja/synthetics/api_tests/http_tests/
[2]: /ja/synthetics/multistep/
{{% /tab %}}
{{% tab "クライアント証明書" %}}

秘密鍵ファイルと証明書ファイルをアップロードするには、**Upload File** をクリックしてください。クライアント証明書は、[HTTP テスト][1]、[マルチステップ API テスト][2]、[SSL テスト][3]、[gRPC テスト][4]でサポートされています。

[1]: /ja/synthetics/api_tests/http_tests/
[2]: /ja/synthetics/multistep/
[3]: /ja/synthetics/api_tests/ssl_tests/
[4]: /ja/synthetics/api_tests/grpc_tests/
{{% /tab %}}
{{< /tabs >}}

## アカウントのセキュリティ

テスト結果や構成からユーザー資格情報を隠したい場合は、[API の作成][4]や[マルチステップ API テスト][5]の際に、グローバル変数やローカル変数を使用することができます。

### グローバル変数

資格情報をグローバル変数として保存することで、以下のことが可能になります。

- 複数のテストに簡単に再利用する。
- **Hide and obfuscate variable value** を選択して、テスト結果や構成からその値を隠す。
- [カスタムロール][6]を使用して、組織のユーザーのサブセットにアクセスを制限する。

### ローカル変数

資格情報をローカル変数として保存することで、資格情報は一意のテストにスコープされます。テスト結果や構成からその値を隠すには、**Hide and obfuscate variable value** を選択します。

データセキュリティについては、[Synthetic モニタリングのデータセキュリティ][7]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/api_tests/http_tests/
[2]: /ja/synthetics/multistep/
[3]: /ja/synthetics/guide/app-that-requires-login/
[4]: https://app.datadoghq.com/synthetics/create?subtype=http
[5]: https://app.datadoghq.com/synthetics/multi-step/create
[6]: /ja/account_management/rbac/?tab=datadogapplication#create-a-custom-role
[7]: /ja/data_security/synthetics
[8]: /ja/synthetics/api_tests/grpc_tests