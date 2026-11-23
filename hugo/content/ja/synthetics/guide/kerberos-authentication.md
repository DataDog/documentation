---
further_reading:
- link: https://www.datadoghq.com/blog/synthetic-private-location-monitoring-datadog
  tag: ブログ
  text: Datadog で Synthetic プライベートロケーションを監視する
- link: https://www.datadoghq.com/blog/kerberos-synthetics/
  tag: ブログ
  text: Datadog Synthetic Monitoring を使用して、Kerberos 認証された Web アプリおよび API をプロアクティブに監視します。
- link: /synthetics/guide/browser-tests-passkeys
  tag: ガイド
  text: ブラウザテストのパスキーについて
products:
- icon: browser
  name: ブラウザテスト
  url: /synthetics/browser_tests/
- icon: api
  name: API テスト
  url: /synthetics/api_tests/
title: Synthetic Monitoring の Kerberos 認証
---
{{< product-availability names="Browser Tests,API Tests" >}}

## 概要{#overview}

Datadog Synthetic Monitoring を使用すると、Microsoft Active Directory による Kerberos SSO 認証を使用する Web アプリケーションおよび API をプロアクティブに監視できます。これにより、社内の Windows サイトにおける重要なユーザージャーニーと HTTP エンドポイントの継続的なテストが可能になります。

## 前提条件 {#prerequisites}

- Windows プライベートロケーション (管理対象ロケーションは Kerberos 認証をサポートしていません)。
- Active Directory と統合された Kerberos 認証を持つ Windows サイト (通常は IIS でホストされます)。
- Active Directory にドメイン参加している Windows サーバー。
- Windows サイトへの Active Directory 認証アクセス権を持つドメインユーザーアカウント。
- Synthetic Monitoring テストは、Active Directory で認証するように構成された Windows プライベートロケーションで実行する必要があります。詳細については、[Windows プライベートロケーション][1]の前提条件に関するドキュメントを参照してください。

## インストール {#installation}

1. Active Directory ドメインに参加している Windows サーバー上に [Windows プライベートロケーション][2]を作成してください。
2. [Synthetic Monitoring プライベートロケーションワーカー][3]を Windows サービスとして実行するように設定してください。
3. Active Directory ドメインアカウントの認証情報を使用するようにプライベートロケーションサービスを構成してください。
   - `services.msc` を開き、{{< ui >}}Datadog Synthetics Worker{{< /ui >}} > {{< ui >}}Properties{{< /ui >}} > {{< ui >}}log on{{< /ui >}} > {{< ui >}}this account{{< /ui >}} に移動して、ドメインアカウントの認証情報を入力してください。
4. テストの設定:
   - **ブラウザテスト**: ドメインに参加している Windows ホスト上で直接実行されているブラウザセッションからテストを記録してください。たとえば、リモートデスクトッププロトコル (RDP) を使用して Windows プライベートロケーションに接続し、そこから記録してください。Active Directory ドメイン外のマシンから記録すると、Kerberos 認証情報が付加されずにパブリックインターネット経由でリクエストが送信されるため、ログインプロンプトが表示されます。
   - **API テスト**: {{< ui >}}Kerberos{{< /ui >}} タブの {{< ui >}}Domain{{< /ui >}} フィールドに、ターゲットサービスの完全なサービスプリンシパル名 (SPN) を設定してください。例えば、`HTTP/targetsite.yourdomain.com`、またはサイトがデフォルト以外のポートで登録されている場合は`HTTP/targetsite.yourdomain.com:port`となります。

{{< img src="synthetics/guide/kerberos-authentication/api_test_kerberos.png" alt="Advancedオプションを展開し、AuthenticationタブとKerberos認証タイプを強調表示した状態でのAPIテスト作成" style="width:80%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/platform/private_locations?tab=windows#prerequisites
[2]: /ja/synthetics/platform/private_locations?tab=windows#create-your-private-location
[3]: /ja/synthetics/platform/private_locations/?tab=windowsviagui#install-your-private-location