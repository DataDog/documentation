---
aliases:
  - /ja/a08-t3c-wbj
cloud: AWS
disable_edit: true
kind: documentation
rule_category:
  - クラウドコンフィギュレーション
scope: acm
security: コンプライアンス
source: acm
title: ACM 証明書の発行リクエストが検証されます
type: security_rules
---
## 説明

Amazon Certificate Manager (ACM) ですべての Secure Socket Layer/Transport Layer Security (SSL/TLS) 証明書を検証します。

## 根拠

[72 時間以内に検証されない場合、AMC 証明書のリクエストはタイムアウトになります][1]。証明書が検証されていない場合、アプリケーションまたはサービスを中断する可能性があります。

## 修復

### コンソール

[DNS 検証の設定][2]または[検証メールの再送信][3]のドキュメントに従って、AWS コンソールまたはメールで証明書を検証します。

### CLI

1. `domain` と `validation-domain` で無効な証明書の ARN を使用して `resend-validation-email` を実行します。

    {{< code-block lang="bash" filename="resend-validation-email.sh" >}}
    aws acm resend-validation-email
      --certificate-arn arn:aws:acm:us-east-1:1234567890:certificate/a1b2345c-d678-9123-4567-89ab12c2345d
      --domain www.example.com
      --validation-domain example.com
    {{< /code-block >}}

2. 生成されたメールのリンクをクリックして Amazon Certificates Approvals ページに移動し、`I Approve` ボタンをクリックします。

[1]: https://docs.aws.amazon.com/acm/latest/userguide/troubleshooting-timed-out.html
[2]: https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html#setting-up-dns-validation
[3]: https://docs.aws.amazon.com/acm/latest/userguide/email-validation.html#gs-acm-resend