---
title: セキュリティに関するその他の考慮事項
kind: documentation
further_reading:
  - link: /security/
    tag: Documentation
    text: Datadog に送信されるデータの主要カテゴリを確認する
---
<div class="alert alert-info">このページは Datadog のセキュリティに関するものです。セキュリティ監視製品をお探しの場合は、<a href="/security_platform/cloud_siem" target="_blank">セキュリティ監視セクション</a>をご覧ください。</div>

この記事は、[データセキュリティに関するドキュメントシリーズ][1]の一部です。

ここでは、Datadog と Agent を使用する際に該当する場合がある、セキュリティ上の補足的考慮事項について説明します。

## 処理引数の難読化

バージョン 6 を使用している場合は、Agent から Datadog アプリケーションに送信される[処理][2]のコマンドと引数を難読化するように Agent を設定できます。処理情報内の機密要素をマスクするには、`custom_sensitive_words` [設定][3]を使用します。このリストは、除外リストに基づいて処理情報をフィルターするように Agent に指示するための正規表現からなります。

また、次のキーワードは基本的に難読化されます。

```
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

## クラウドインテグレーションのセキュリティ

Datadog はお客様とサードパーティサービスとの統合を可能にします。Datadog の [{{< translate key="integration_count" >}} 以上の組み込みインテグレーション][4]の一部は Datadog アプリケーションで直接構成されており、Datadog がお客様に代わりサードパーティーのサービスに接続する際に、認証情報の入力を促す場合があります。お客様の認証情報は暗号化され、厳格なセキュリティ保護がなされた Datadog の安全な認証情報のデータストアに保存されます。すべてのデータは保存時および送信時に暗号化されます。セキュリティ保護された認証情報のデータストアへのアクセスは厳しく制御および監査され、それらのサービス内の特定のサービスまたはアクションは、必要なもののみに制限されます。
異常な挙動の検出は、不正アクセスを随時監視します。従業員によるメンテナンスのためのアクセスは、一部のエンジニアに限定されます。

機密性を考慮して、クラウドプロバイダーとのインテグレーションには、アクセス許可を限定した Datadog 専用の資格情報を利用するなど、可能であれば追加的なセキュリティ保護が施されます。たとえば、以下のとおりです。

* [Amazon Web Services][5] とのインテグレーションでは、[AWS の IAM ベストプラクティスガイド][6]に従い、AWS IAM を使用してロール委任を設定し、AWS ポリシーを使用して特定のアクセス許可を付与する必要があります。
* [Microsoft Azure][7] とのインテグレーションではDatadog のテナントを定義し、特定のアプリケーションへのアクセスには監視するサブスクリプションに対する "閲覧者" ロールのみを付与します。
* [Google Cloud Platform][8] とのインテグレーションでは、Datadog のサービスアカウントを定義し、"Compute Viewer" または "Monitoring Viewer" ロールのみを付与します。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/
[2]: /ja/infrastructure/process/
[3]: /ja/infrastructure/process/#process-arguments-scrubbing
[4]: /ja/integrations/
[5]: /ja/integrations/amazon_web_services/
[6]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[7]: /ja/integrations/azure/
[8]: /ja/integrations/google_cloud_platform/