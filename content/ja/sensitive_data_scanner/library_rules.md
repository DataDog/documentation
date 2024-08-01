---
further_reading:
- link: /sensitive_data_scanner/
  tag: ドキュメント
  text: 機密データスキャナーのセットアップ
title: ライブラリルール
---

## 概要

スキャンルールライブラリとは、メールアドレスやクレジットカード番号、API キー、認証トークンなどの一般的なパターンを検出するための、あらかじめ定義されたルールをまとめたコレクションです。

{{< whatsnext desc="ライブラリのルールは、以下のカテゴリーに分類されます。">}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#secrets-and-credentials">}}シークレットと資格情報{{< /nextlink >}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#credit-cards-and-banking">}}クレジットカードと銀行取引情報{{< /nextlink >}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#personal-identifiable-information-pii">}}個人を特定できる情報 (PII){{< /nextlink >}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#network-and-device-information">}}ネットワークとデバイスの情報{{< /nextlink >}}
{{< /whatsnext >}}

これらのルールは Datadog でも確認することができます。

1. [機密データスキャナー][1]に移動します。
1. ページの右上にある **Scanning Rules Library** をクリックします。
1. ライブラリからスキャングループにルールを追加するには:   
  a. 追加したいルールを選択します。
  b. **Add Rules to Scanning Group** をクリックします。
  c. [機密データスキャナーの設定][2]の手順に従い、設定を完了します。

## シークレットと資格情報

| ライブラリルール                                       | デフォルトのキーワード                                                                                                      |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| AWS アクセスキー ID スキャナー                          | aws_access_key_id、access key、aws access                                                                             |
| AWS シークレットアクセスキースキャナー                      | aws_secret_access_key、credentials、secret access key、secret key、set-awscredential                                  |
| Dynatrace トークンスキャナー                            | dynatrace、token                                                                                                      |
| Facebook アクセストークンスキャナー                      | facebook、access、token                                                                                               |
| Gitlab トークンスキャナー                               | gitlab、token                                                                                                         |
| Instagram トークンスキャナー                            | Instagram、token                                                                                                      |
| JSON Web トークンスキャナー                             | \-                                                                                                                    |
| Mailchimp API キースキャナー                          | mailchimp、api key                                                                                                    |
| Mailgun API キースキャナー                            | mailgun、api key                                                                                                      |
| Okta API トークンスキャナー                             | okta、api token                                                                                                       |
| Slack アクセストークンスキャナー                         | slack、access、token                                                                                                  |
| Stripe API キースキャナー                             | stripe、api key                                                                                                       |
| Stripe 制限付き API キースキャナー                  | stripe、api key                                                                                                       |
| Twilio API キースキャナー                             | twilio、api key                                                                                                       |
| Square アクセストークンスキャナー                        | square、access、token                                                                                                 |
| Square OAuth シークレットスキャナー                        | square、oauth、secret、authorization、authentication                                                                  |
| Google API キースキャナー                             | g_places_key、gcp api key、gcp key、google cloud key、google-api-key、google-cloud-apikeys、googlekey、x-goog-api-key |
| Google OAuth アクセストークンスキャナー                  | google、oauth、 access、token、authorization、authentication                                                           |
| RSA 秘密鍵スキャナー                            | rsa、private key                                                                                                      |
| Send Grid API トークンスキャナー                        | send grid、api token                                                                                                  |
| Heroku API キースキャナー                             | heroku、api key                                                                                                       |
| SSH キースキャナー                                    | ssh、ssh key                                                                                                          |
| PGP 秘密鍵スキャナー                            | pgp、key                                                                                                              |
| Paypal Braintree アクセストークンスキャナー              | paypal、braintree、access、token                                                                                      |
| Amazon マーケットプレイス Web サービス認証トークンスキャナー | amazon、marketplace、aws、auth、token、authorization、authentication                                                  |
| Azure 個人用アクセストークンスキャナー                | azure、access、token                                                                                                  |
| Azure SQL 接続文字列スキャナー                | azure、sql、connection string                                                                                         |
| Azure サブスクリプションキースキャナー                     | azure、subscription key                                                                                               |
| Bearer トークンスキャナー                               | bearer、token                                                                                                         |
| Checkout.com シークレットスキャナー                        | checkout、secret                                                                                                      |
| Databricks 個人用アクセストークンスキャナー           | databricks、access、token                                                                                             |
| Docker Swarm 参加トークンスキャナー                    | docker、docker swarm、join token                                                                                      |
| Docker Swarm アンロックキースキャナー                    | docker、docker swarm、unlock key                                                                                      |
| Github アクセストークンスキャナー                        | github、access、token                                                                                                 |
| Github 更新トークンスキャナー                       | github、refresh token                                                                                                 |
| JIRA API トークンスキャナー                             | jira、api token                                                                                                       |
| LinkedIn シークレットスキャナー                            | linkedin、secret                                                                                                      |
| Shopify アクセストークンスキャナー                       | shopify、access、token                                                                                                |
| Shopify 共有シークレットスキャナー                      | shopify、shared secret                                                                                                |
| Slack Webhook シークレットスキャナー                       | slack、webhook、secret                                                                                                |

## クレジットカードと銀行取引情報

| ライブラリルール                                   | デフォルトのキーワード                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Twitter シークレットスキャナー                         | twitter、secret                                                                                                                                                                                                                                                                                             |
| Visa カードスキャナー (4x4 桁)                 | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、electron、pan、payment account number、payment card number、pcn、union pay、visa                                                                                           |
| Visa カードスキャナー (2x8 桁)                 | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、electron、pan、payment account number、payment card number、pcn、union pay、visa                                                                                           |
| Visa カードスキャナー (1x16 & 1x19 桁)         | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、electron、pan、payment account number、payment card number、pcn、union pay、visa                                                                                           |
| MasterCard スキャナー (4x4 桁)                | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、mastercard、mc、pan、payment account number、payment card number、pcn、union pay                                                                                           |
| MasterCard スキャナー (2x8 桁)                | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、mastercard、mc、pan、payment account number、payment card number、pcn、union pay                                                                                           |
| MasterCard スキャナー (1x16 桁)               | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、mastercard、mc、pan、payment account number、payment card number、pcn、union pay                                                                                           |
| Discover カードスキャナー (4x4 桁)             | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、discover、pan、payment account number、payment card number、pcn                                                                                                            |
| Discover カードスキャナー (2x8 桁)             | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、discover、pan、payment account number、payment card number、pcn                                                                                                            |
| Discover カードスキャナー (1x16 桁)            | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、discover、pan、payment account number、payment card number、pcn                                                                                                            |
| American Express カードスキャナー (4+6+5 桁)   | account number、american express、amex、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、pan、payment account number、payment card number、pcn、union pay                                                                                   |
| American Express カードスキャナー (4+4+4+3 桁) | account number、american express、amex、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、pan、payment account number、payment card number、pcn、union pay                                                                                   |
| American Express カードスキャナー (8+7 桁)     | account number、american express、amex、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、pan、payment account number、payment card number、pcn、union pay                                                                                   |
| American Express カードスキャナー (1x15 桁)    | account number、american express、amex、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、pan、payment account number、payment card number、pcn、union pay                                                                                   |
| Diners カードスキャナー (4+6+4 桁)             | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、diners club、mastercard、mc、pan、payment account number、payment card number、pcn                                                                                         |
| Diners カードスキャナー (4+4+4+2 桁)           | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、diners club、mastercard、mc、pan、payment account number、payment card number、pcn                                                                                         |
| Diners カードスキャナー (8+6 桁)               | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、diners club、mastercard、mc、pan、payment account number、payment card number、pcn                                                                                         |
| Diners カードスキャナー (1x14 桁)              | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、diners club、mastercard、mc、pan、payment account number、payment card number、pcn                                                                                         |
| JCB カードスキャナー (4x4 桁)                  | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、japanese card bureau、jcb、pan、payment account number、payment card number、pcn                                                                                           |
| JCB カードスキャナー (2x8 桁)                  | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、japanese card bureau、jcb、pan、payment account number、payment card number、pcn                                                                                           |
| JCB カードスキャナー (1x16 桁)                 | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、japanese card bureau、jcb、pan、payment account number、payment card number、pcn                                                                                           |
| Maestro カードスキャナー (4x4 桁)              | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、mastercard、mc、pan、payment account number、payment card number、pcn                                                                                                      |
| Maestro カードスキャナー (2x8 桁)              | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、mastercard、mc、pan、payment account number、payment card number、pcn                                                                                                      |
| Maestro カードスキャナー (1x16 桁)             | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、mastercard、mc、pan、payment account number、payment card number、pcn                                                                                                      |
| 標準 IBAN コードスキャナー                     | bank account、bank acct、checking account、checking acct、deposit account、deposit acct、savings account、savings acct、chequing account、chequing acct、iban、account code、account number、accountno#、accountnumber#、bban、customer account id、customer account number、customer bank account id、sepa |

## 個人を特定できる情報 (PII)

| ライブラリルール                             | デフォルトのキーワード                                                                                                                                                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 標準メールアドレススキャナー           | \-                                                                                                                                                                                                                                                     |
| 米国パスポートスキャナー                      | passport、travel document                                                                                                                                                                                                                              |
| 米国車両識別番号スキャナー | fahrgestellnummer、niv、numarul de identificare、numarul seriei de sasiu、numer vin、número de identificação do veículo、número de identificación de automóviles、numéro d'identification du véhicule、vehicle identification number、vin、vin numeris |
| 英国国民保険番号スキャナー     | national health service、nhs                                                                                                                                                                                                                           |
| カナダ社会保険番号スキャナー | canada healthcare number、msp number、personal healthcare number、phn、soins de santé                                                                                                                                                                  |

## ネットワークとデバイスの情報

| ライブラリルール                             | デフォルトのキーワード |
| ---------------------------------------- | ---------------- |
| IPv4 アドレススキャナー                     | \-               |
| IPv6 アドレススキャナー                     | \-               |
| 標準 MAC アドレススキャナー             | \-               |
| HTTP Basic 認証ヘッダースキャナー | \-               |
| HTTP Cookie スキャナー                      | cookie           |
| HTTP URL スキャナー                      | \-               |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/
[2]: /ja/sensitive_data_scanner/?#add-scanning-rules