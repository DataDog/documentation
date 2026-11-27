---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API Tests
  tags:
  - ssl
  - ssl test
  - ssl tests
aliases:
- /ja/synthetics/ssl_test
- /ja/synthetics/ssl_check
description: 世界中のロケーションから SSL 証明書を監視する
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: ブログ
  text: Datadog Synthetic Monitoring の紹介
- link: /getting_started/synthetics/api_test
  tag: ドキュメント
  text: API テストの概要
- link: /synthetics/private_locations
  tag: ドキュメント
  text: 内部ホストで SSL テストを実行する
- link: /synthetics/guide/synthetic-test-monitors
  tag: ドキュメント
  text: Synthetic テストモニターについて
title: SSL テスト
---
## 概要 {#overview}

SSL テストを使用すると、SSL/TLS 証明書の有効性と有効期限を積極的にモニターし、主要なサービスとユーザー間に安全な接続を確実に提供できます。証明書の有効期限が近づいている場合や、証明書が侵害された場合、Datadog から問題の詳細が記載されたアラートが送信されるので、問題の根本原因を特定して修正できます。

SSL テストは、ネットワークの外部と内部のどちらからテストを実行するのかに応じて、[管理対象の](#select-locations)ロケーションと[プライベートロケーション][1]のいずれからでも実行できます。SSL テストは、スケジュールに従って、オンデマンドで、または [CI/CD パイプライン][2]内で直接実行できます。

## 構成 {#configuration}

次のいずれかの方法でテストを作成します。

- **テンプレートからテストを作成する**:
   
     1. 事前設定済みテンプレートのいずれかにカーソルを合わせて、[{{< ui >}}View Template{{< /ui >}}] をクリックします。すると、[Test Details] (テストの詳細)、[Request Details] (リクエストの詳細)、[Assertions] (アサーション)、[Alert Conditions] (アラートの条件)、[Monitor Settings] (モニターの設定) など、あらかじめ設定された構成情報が表示されるサイドパネルが開きます。
     2. {{< ui >}}\+ Create Test{{< /ui >}} をクリックして {{< ui >}}Define Request{{< /ui >}} ページを開きます。このページで、事前に設定された構成オプションを確認し、編集できます。表示されるフィールドは、テストを一から作成する際に利用可能なフィールドと同じです。
     3. {{< ui >}}Save Details{{< /ui >}} をクリックして、API テストを送信します。<br /><br>
        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="テンプレートを使った Synthetics API テストのランディングページの動画" video="true" >}}

- **テストを一から作成する**:

   1. テストを一から作成するには、[{{< ui >}}\+ Start from scratch{{< /ui >}}] (+ 一から開始する) テンプレートをクリックし、SSL リクエストタイプを選択します。
   1. テストを実行する {{< ui >}}Host{{< /ui >}} と {{< ui >}}Port{{< /ui >}} を指定します。デフォルトの SSL ポートは `443` です。
   1. テストに [{{< ui >}}Advanced Options{{< /ui >}}] (高度なオプション) を追加します (任意)。
      * [{{< ui >}}Accept self-signed certificates{{< /ui >}}] (自己署名証明書を受け入れる): 自己署名証明書に関連するサーバーエラーをバイパスします。
      * [{{< ui >}}Fail on revoked certificate in stapled OCSP{{< /ui >}}] (添付された OCSP で証明書が失効していた場合に失敗する): OCSP ステープリングで証明書が失効していると判定された場合、テストは失敗します。
      * [{{< ui >}}Fail on incomplete certificate chain{{< /ui >}}] (不完全な証明書チェーンで失敗する): AIA フェッチを無効にします。そのため、サーバーの証明書チェーンで欠落している中間証明書があった場合、テストは失敗します。
      * [{{< ui >}}Timeout{{< /ui >}}] (タイムアウト): テストがタイムアウトするまでの時間を秒単位で指定します。
      * [{{< ui >}}Server Name{{< /ui >}}] (サーバー名): TLS ハンドシェイクを開始するサーバーを指定します。これにより、サーバーは同じ IP アドレスと TCP ポート番号で、使用できる複数の証明書のうちの 1 つを提示できるようになります。デフォルトでは、このパラメーターには [{{< ui >}}Host{{< /ui >}}] (ホスト) の値が設定されます。
      * [{{< ui >}}Client certificate{{< /ui >}}] (クライアント証明書): クライアント証明書 (`.crt`) と関連する秘密キー (`.key`) を `PEM` 形式でアップロードして、mTLS による認証を行います。
   
      `openssl` ライブラリを使用して証明書を変換することができます。たとえば、`PKCS12` 証明書を `PEM` 形式の秘密キーと証明書に変換できます。

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   1. [{{< ui >}}Name{{< /ui >}}] (名前) に SSL テストの名前を入力します。

   1. [{{< ui >}}Tags{{< /ui >}}] (タグ) に、SSL テストに追加する環境タグおよびその他のタグを入力します。これらのタグを使用して、[Synthetic Monitoring & Continuous Testing ページ][3]で Synthetic テストをフィルタリングできます。
   1. [{{< ui >}}Test Certificate{{< /ui >}}] (証明書をテスト) をクリックして、リクエストの構成を試します。画面の右側にレスポンスのプレビューが表示されます。<br /><br>

      {{< img src="synthetics/api_tests/synthetics_ssl_test_cert.png" alt="SSL リクエストを定義する" style="width:90%;" >}}

   1. [{{< ui >}}Create Test{{< /ui >}}] (テストを作成) をクリックして、API テストを送信します。

   

### スニペット {#snippets}

{{% synthetics-api-tests-snippets %}}

### アサーションを定義する {#define-assertions}

アサーションは、期待されるテスト結果を定義します。[{{< ui >}}Test URL{{< /ui >}}] (URL をテスト) をクリックすると、取得されたレスポンスに基づいて、証明書の有効性、有効期限データ、TLS バージョン、および `response time` の基本的なアサーションが追加されます。テストで監視するには、少なくとも 1 つのアサーションを定義する必要があります。

| タイプ                  | 演算子                                                                               | 値の型                 |
|-----------------------|----------------------------------------------------------------------------------------|----------------------------|
| 証明書           | `expires in more than`、`expires in less than`                                         | _整数 (日数)_ |
| プロパティ              | `contains`、`does not contain`、`is`、`is not`、<br> `matches`、`does not match`       | _文字列_ <br> _[正規表現][4]_ |
| 応答時間         | `is less than`                                                                         | _整数 (ミリ秒)_             |
| 最大 TLS バージョン   | `is less than`、`is less than or equal`、`is`、`is more than`、`is more than or equal` | _10 進数_                  |
| 最小 TLS バージョン   | `is more than`、`is more than or equal`                                                | _10 進数_                  |

SSL テストは TLS 1.2 または TLS 1.3 で接続するため、サーバーはこれらのバージョンの少なくとも 1 つをサポートしている必要があります。`minimum TLS version` アサーションは、サーバーが受け入れるこれら 2 つのバージョンのうち、低いほうをチェックします。SSL テストでは TLS 1.0 または TLS 1.1 はテストされません。

[{{< ui >}}New Assertion{{< /ui >}}] をクリックするか、レスポンスプレビューを直接クリックすることで、API テストごとに最大 20 個のアサーションを作成できます。

{{< img src="synthetics/api_tests/assertions_ssl.png" alt="SSL テストの成功または失敗を判定するアサーションを定義する" style="width:90%;" >}}

アサーションで `OR` ロジックを実行するには、`matches regex` または `does not match regex` コンパレーターを使用して、同じアサーションタイプに対して `(0|100)` のような複数の期待値を持つ正規表現を定義します。プロパティアサーションの値が 0 または 100 の場合、テスト結果は成功となります。

テストに応答本文に関するアサーションが含まれていない場合、本文のペイロードはドロップし、Synthetics Worker で設定されたタイムアウト制限内でリクエストに関連する応答時間が返されます。

テストに応答本文に関するアサーションが含まれていて、タイムアウトの制限に達した場合は、`Assertions on the body/response cannot be run beyond this limit` というエラーが表示されます。

### ロケーションを選択する {#select-locations}

SSL テストの実行元となる [{{< ui >}}Locations{{< /ui >}}] (ロケーション) を選択します。SSL テストは、ネットワークの外部と内部のどちらから証明書を監視するのかに応じて、管理対象ロケーションと[プライベートロケーション][1]のいずれからでも実行できます。

{{% managed-locations %}}

### テストの頻度を指定する {#specify-test-frequency}

SSL テストは次のように実行できます。

* **スケジュールに従って実行**: SSL/TLS 証明書が常に有効であり、主要サービスのユーザーに対して常に安全な接続が提供されるようにします。Datadog で SSL テストを実行する頻度を選択します。
* [**CI/CD パイプライン**][2]。
[* **オンデマンド**]: チームにとって最適なタイミングでテストを実行します。

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

{{% synthetics-variables %}}

### 変数を使用する {#use-variables}

SSL テストの URL、高度なオプション、アサーションでは、[[{{< ui >}}Settings{{< /ui >}}] (設定) ページで定義されたグローバル変数][9]を使用できます。

変数のリストを表示するには、目的のフィールドに `{{` と入力します。

## テストの失敗 {#test-failure}

テストが 1 つ以上のアサーションを満たさない場合、またはリクエストが途中で失敗した場合、テストは `FAILED` と見なされます。場合によっては、エンドポイントに対してアサーションをテストすることなくテストが失敗することもあります。

SSL エラーコードの完全なリストについては、「[API テストのエラー][10]」を参照してください。

## 権限 {#permissions}

デフォルトでは、[Datadog Admin および Datadog 標準のロール][11]を持つユーザーのみが、Synthetic SSL テストを作成、編集、削除できます。Synthetic SSL テストの作成、編集、削除権限を取得するには、ユーザーをこれら 2 つの[デフォルトのロール][11]のいずれかにアップグレードします。

[カスタムロール機能][12]を使用している場合は、`synthetics_read` および `synthetics_write` の権限を含むカスタムロールにユーザーを追加してください。

### アクセス制限 {#restrict-access}

{{% synthetics_grace_permissions %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/private_locations
[2]: /ja/synthetics/cicd_integrations
[3]: /ja/synthetics/search/#search
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[5]: /ja/monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /ja/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /ja/synthetics/guide/synthetic-test-monitors
[9]: /ja/synthetics/settings/#global-variables
[10]: /ja/synthetics/api_tests/errors/
[11]: /ja/account_management/rbac/
[12]: /ja/account_management/rbac#custom-roles