---
description: 有効かつ自動更新される認証トークンをモバイルアプリケーションのテストに渡すことで、ログインフローをスキップできます。
further_reading:
- link: /synthetics/guide/authentication-protocols/
  tag: ドキュメント
  text: API テストおよびマルチステップ API テストで認証を使用する
- link: /synthetics/mobile_app_testing/
  tag: ドキュメント
  text: モバイルアプリケーションテストを作成する
- link: /synthetics/platform/settings/#global-variables
  tag: ドキュメント
  text: グローバル変数を作成する
title: モバイルアプリケーションテストでの認証トークンの挿入と自動更新
---
## 概要 {#overview}

[モバイルアプリケーションテスト][1] を開始するたびにアプリの UI 経由でログインを行うと、テストに関係のない実行時間の延長や不安定性が生じます。このガイドでは、有効な認証トークンを注入してログインステップをスキップし、テストが認証済みの状態で開始されるようにする方法を説明します。

このフローは 3 つの部分で構成されています。

1. [API テスト][2] がスケジュールに従って認証プロバイダーにログインし、アクセストークンを抽出します。
2. そのテストから得られたトークン値が、[グローバル変数][3] に保存されます。
3. モバイルアプリケーションテストは、そのグローバル変数を起動引数またはインテントの追加データとしてアプリに渡します。アプリは起動時にそれを読み取り、通常のログインフローをスキップします。

API テストがスケジュールに従ってトークンを更新するため、グローバル変数の値は手作業や Datadog API 呼び出しなしで自動的に更新されます。

## ステップ 1: トークン取得 API テストを作成する{#step-1-create-the-token-fetch-api-test}

認証プロバイダーがクライアントシークレットを必要とする場合は、リクエストにハードコーディングするのではなく、まず安全な [グローバル変数][3] として保存してください。作成時に `AUTH_CLIENT_SECRET` などの名前を付け、{{< ui >}}Hide and obfuscate variable value{{< /ui >}} を選択します。

プロバイダーのトークンエンドポイントにトークンを要求する [HTTP テスト][2] を作成します。

- **リクエスト**: `POST` (`https://auth.yourdomain.com/oauth/token` などのトークンエンドポイント宛)。
- **ヘッダー**: `Content-Type: application/json`。
- **ボディ**: `AUTH_CLIENT_SECRET` グローバル変数を参照する、クライアント資格情報を含む JSON ペイロード。

{{< code-block lang="json" >}}
{
  "client_id": "synthetic_bot",
  "client_secret": "{{ AUTH_CLIENT_SECRET }}",
  "grant_type": "client_credentials"
}
{{< /code-block >}}

- **アサーション**: ステータスコードが `200` であること。
- **抽出された変数**: レスポンスボディから `EXTRACTED_TOKEN` という名前の [変数を抽出][4] します。その際、トークンフィールドに一致する `jsonpath` 式 (例: `$.access_token`) を使用します。トークンがテスト結果に表示されないように [{{< ui >}}Hide and obfuscate variable value{{< /ui >}}] を選択します。

実行の合間にトークンが期限切れにならないように、テストの [実行間隔][5] をトークンの有効期限よりも短く設定します。たとえば、1 時間後に期限切れになるトークンの場合、30 分ごとにテストを実行します。また、テストに失敗時のアラートを設定しておけば、トークンの更新が停止した際にそれを確認できます。

## ステップ 2: テストからグローバル変数を作成する {#step-2-create-a-global-variable-from-the-test}

モバイルアプリケーションテストでその値を参照できるように、トークン取得テストから [グローバル変数を作成][3] します。

1. [{{< ui >}}Settings{{< /ui >}} ページ][6] の [{{< ui >}}Global Variables{{< /ui >}}] タブに移動します。[{{< ui >}}\+ New Global Variable{{< /ui >}}] をクリックします。
2. [{{< ui >}}Create From Test{{< /ui >}}] タブを選択し、トークン取得テストを選択します。
3. [{{< ui >}}Variable Name{{< /ui >}}] を入力します (例: `MOBILE_AUTH_TOKEN`)。
4. トークンがテスト結果に表示されないように [{{< ui >}}Hide and obfuscate variable value{{< /ui >}}] を選択します。
5. 値のソースを選択します。
   - トークン取得テストが単一の HTTP リクエストである場合は、[{{< ui >}}Response Body{{< /ui >}}] を選択し、テストアサーションの `jsonpath` 式 (例: `$.access_token`) を再利用します。
   - トークン取得テストに複数のステップがある場合は、ステップ 1 で抽出した {{< ui >}}EXTRACTED_TOKEN{{< /ui >}} ローカル変数を選択します。

この変数の値は、トークン取得テストが実行されるたびに自動的に更新されます。

## ステップ 3: モバイルアプリケーションテストにトークンを渡す {#step-3-pass-the-token-to-your-mobile-app-test}

モバイルアプリケーションテストでは、[詳細オプション][7] を通じて、起動時に `key:value` ペアをアプリに渡すことができます。フィールドに、「`{{`」と入力してグローバル変数を参照すると、実行時にその現在の値で置き換えられます。

{{< tabs >}}
{{% tab "Android (初期インテントの追加データ)" %}}

```json
{
  "auth_token": "{{ MOBILE_AUTH_TOKEN }}"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_android.png" alt="Android デバイス向けの高度なオプションの例を示す、モバイルアプリケーションテスト作成ページ" style="width:100%;" >}}

{{% /tab %}}
{{% tab "iOS (プロセス引数)" %}}

```json
{
  "auth_token": "{{ MOBILE_AUTH_TOKEN }}"
}
```

{{< img src="mobile_app_testing/advanced/mobile_app_advanced_iOS.png" alt="iOS デバイス向けの高度なオプションの例を示す、モバイルアプリケーションテスト作成ページ" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## ステップ 4: アプリでトークンを処理する{#step-4-handle-the-token-in-your-app}

アプリは起動時に注入された値を読み取り、安全に保存し、それを使用してログインフローをスキップする必要があります。この動作はビルドフラグで制御し、テスト用または自動化用のビルドにのみ当該コードパスが含まれるようにします。

{{< tabs >}}
{{% tab "Android (Java)" %}}

{{< code-block lang="java" >}}
if (BuildConfig.AUTOMATION) {
    String authToken = getIntent().getStringExtra("auth_token");
    if (authToken != null) {
        SecureTokenStore.getInstance(this).save(authToken);
        SessionManager.getInstance().restoreSession(authToken);
    }
}
{{< /code-block >}}

トークンをプレーンな `SharedPreferences` に保存するのではなく、`EncryptedSharedPreferences` と `MasterKey` を使用して `SecureTokenStore` でバックアップします。

{{% /tab %}}
{{% tab "iOS (Swift)" %}}

{{< code-block lang="swift" >}}
#if AUTOMATION
if let index = ProcessInfo.processInfo.arguments.firstIndex(of: "-auth_token"),
   index + 1 < ProcessInfo.processInfo.arguments.count {
    let authToken = ProcessInfo.processInfo.arguments[index + 1]
    KeychainManager.shared.save(token: authToken)
    SessionManager.shared.restoreSession(with: authToken)
}
#endif
{{< /code-block >}}

トークンは `UserDefaults` ではなくキーチェーンに保存してください。そうすることで、アプリが実際のログインから受け取るトークンと同様に、保存時にも保護されます。

{{% /tab %}}
{{% tab "React Native" %}}

{{< code-block lang="javascript" >}}
import { LaunchArguments } from 'react-native-launch-arguments';
import * as Keychain from 'react-native-keychain';

if (__DEV__ || Config.AUTOMATION) {
  const { auth_token: authToken } = LaunchArguments.value();
  if (authToken) {
    await Keychain.setGenericPassword('auth_token', authToken);
    SessionManager.restoreSession(authToken);
  }
}
{{< /code-block >}}

`react-native-launch-arguments` は、iOS ではプロセス引数を、Android ではインテントの追加データを 1 つの API を通じて読み取ります。`react-native-keychain` は、トークンを`AsyncStorage` ではなくプラットフォームのキーチェーンまたはキーストアに保存します。

{{% /tab %}}
{{< /tabs >}}

## セキュリティ上の考慮事項 {#security-considerations}

注入された認証トークンは、テスト用または自動化用のビルドでのみ受け入れるようにし、本番環境のビルドでは決して受け入れないようにしてください。引数を読み取る前にビルドフラグをチェックし、アプリストアに公開するビルドではそのフラグが設定されていないことを必ず確認してください。

これは特に Android において重要です。エクスポートされたランチャー `Activity` に送信されるインテントの追加データは、Datadog のテストランナーだけでなく、デバイス上のどのアプリからでも送信される可能性があります。ビルドフラグによるチェックを行わないと、起動インテントから `auth_token` を読み取って信頼する本番アプリは、どのローカルアプリにもテストアカウントとして認証を許可してしまいます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/mobile_app_testing/
[2]: /ja/synthetics/api_tests/http_tests/
[3]: /ja/synthetics/platform/settings/#global-variables
[4]: /ja/synthetics/api_tests/http_tests/#define-assertions
[5]: /ja/synthetics/api_tests/http_tests/#specify-test-frequency
[6]: https://app.datadoghq.com/synthetics/settings
[7]: /ja/synthetics/mobile_app_testing/#advanced-options