---
further_reading:
- link: /sensitive_data_scanner/
  tag: ドキュメント
  text: 機密データスキャナーのセットアップ
title: ライブラリルール
---

## 概要

The Scanning Rule Library is a collection of predefined rules for detecting common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more.

{{< whatsnext desc="ライブラリのルールは、以下のカテゴリーに分類されます。">}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#secrets-and-credentials">}}シークレットと資格情報{{< /nextlink >}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#credit-cards-and-banking">}}クレジットカードと銀行取引情報{{< /nextlink >}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#personal-identifiable-information-pii">}}個人を特定できる情報 (PII){{< /nextlink >}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#network-and-device-information">}}ネットワークとデバイスの情報{{< /nextlink >}}
{{< /whatsnext >}}

これらのルールは Datadog でも確認することができます。

1. [機密データスキャナー][1]に移動します。
1. ページの右上にある **Scanning Rules Library** をクリックします。
1. To add rules from the library to a scanning group:
  a. Select the rules you want to add.
  b. Click **Add Rules to Scanning Group**.
  c. [機密データスキャナーの設定][2]の手順に従い、設定を完了します。

## シークレットと資格情報

| ライブラリルール                                       | デフォルトのキーワード                                                                                                      |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| AWS アクセスキー ID スキャナー                          | aws_access_key_id, access key, aws access                                                                             |
| AWS シークレットアクセスキースキャナー                      | aws_secret_access_key、credentials、secret access key、secret key、set-awscredential                                  |
| Amazon マーケットプレイス Web サービス認証トークンスキャナー | amazon、marketplace、aws、auth、token、authorization、authentication                                                  |
| Azure 個人用アクセストークンスキャナー                | \-                                                                                                                    |
| Azure SQL 接続文字列スキャナー                | azure、sql、connection string                                                                                         |
| Azure サブスクリプションキースキャナー                     | azure、subscription key                                                                                               |
| Bearer トークンスキャナー                               | \-                                                                                                                    |
| Checkout.com API Secret Key Scanner                | checkout、secret                                                                                                      |
| Databricks 個人用アクセストークンスキャナー           | databricks、access、token                                                                                             |
| Docker Swarm 参加トークンスキャナー                    | docker、docker swarm、join token                                                                                      |
| Docker Swarm アンロックキースキャナー                    | docker、docker swarm、unlock key                                                                                      |
| Dynatrace トークンスキャナー                            | dynatrace、token                                                                                                      |
| Facebook アクセストークンスキャナー                      | facebook、access、token                                                                                               |
| Github アクセストークンスキャナー                        | github、access、token                                                                                                 |
| Github 更新トークンスキャナー                       | github、refresh token                                                                                                 |
| Gitlab Personal and Project Access Token Scanner   | gitlab、token                                                                                                         |
| Google API キースキャナー                             | g_places_key、gcp api key、gcp key、google cloud key、google-api-key、google-cloud-apikeys、googlekey、x-goog-api-key |
| Google OAuth アクセストークンスキャナー                  | google、oauth、 access、token、authorization、authentication                                                           |
| Heroku API キースキャナー                             | \-                                                                                                                    |
| Instagram トークンスキャナー                            | \-                                                                                                                    |
| JIRA API トークンスキャナー                             | \-                                                                                                                    |
| JSON Web トークンスキャナー                             | \-                                                                                                                    |
| LinkedIn シークレットスキャナー                            | \-                                                                                                                    |
| Mailchimp API キースキャナー                          | mailchimp、api key                                                                                                    |
| Mailgun API キースキャナー                            | mailgun、api key                                                                                                      |
| Okta API トークンスキャナー                             | okta、api token                                                                                                       |
| PGP 秘密鍵スキャナー                            | \-                                                                                                                    |
| Paypal Braintree アクセストークンスキャナー              | paypal、braintree、access、token                                                                                      |
| RSA 秘密鍵スキャナー                            | \-                                                                                                                    |
| SSH キースキャナー                                    | \-                                                                                                                    |
| SendGrid API Key Scanner                           | send grid、api token                                                                                                  |
| Shopify Access Secret Scanner                      | shopify、shared secret                                                                                                |
| Shopify アクセストークンスキャナー                       | shopify、access、token                                                                                                |
| Slack アクセストークンスキャナー                         | slack、access、token                                                                                                  |
| Slack Webhook シークレットスキャナー                       | slack、webhook、secret                                                                                                |
| Square アクセストークンスキャナー                        | square、access、token                                                                                                 |
| Square OAuth シークレットスキャナー                        | square、oauth、secret、authorization、authentication                                                                  |
| Stripe 制限付き API キースキャナー                  | stripe、api key                                                                                                       |
| Stripe Secret API Key Scanner                      | stripe、api key                                                                                                       |
| Twilio API キースキャナー                             | twilio、api key                                                                                                       |
| Twitter シークレットスキャナー                             | \-                                                                                                                    |

## クレジットカードと銀行取引情報

| ライブラリルール                                   | デフォルトのキーワード                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| American Express カードスキャナー (1x15 桁)    | account number, american express, amex, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, pan, payment account number, payment card number, pcn, union pay                                                                                   |
| American Express カードスキャナー (4+4+4+3 桁) | account number、american express、amex、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、pan、payment account number、payment card number、pcn、union pay                                                                                   |
| American Express カードスキャナー (4+6+5 桁)   | account number、american express、amex、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、pan、payment account number、payment card number、pcn、union pay                                                                                   |
| American Express カードスキャナー (8+7 桁)     | account number、american express、amex、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、pan、payment account number、payment card number、pcn、union pay                                                                                   |
| Diners カードスキャナー (1x14 桁)              | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、diners club、mastercard、mc、pan、payment account number、payment card number、pcn                                                                                         |
| Diners カードスキャナー (4+4+4+2 桁)           | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、diners club、mastercard、mc、pan、payment account number、payment card number、pcn                                                                                         |
| Diners カードスキャナー (4+6+4 桁)             | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、diners club、mastercard、mc、pan、payment account number、payment card number、pcn                                                                                         |
| Diners カードスキャナー (8+6 桁)               | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、diners club、mastercard、mc、pan、payment account number、payment card number、pcn                                                                                         |
| Discover カードスキャナー (1x16 桁)            | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、discover、pan、payment account number、payment card number、pcn                                                                                                            |
| Discover カードスキャナー (2x8 桁)             | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、discover、pan、payment account number、payment card number、pcn                                                                                                            |
| Discover カードスキャナー (4x4 桁)             | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、discover、pan、payment account number、payment card number、pcn                                                                                                            |
| JCB カードスキャナー (1x16 桁)                 | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、japanese card bureau、jcb、pan、payment account number、payment card number、pcn                                                                                           |
| JCB カードスキャナー (2x8 桁)                  | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、japanese card bureau、jcb、pan、payment account number、payment card number、pcn                                                                                           |
| JCB カードスキャナー (4x4 桁)                  | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、japanese card bureau、jcb、pan、payment account number、payment card number、pcn                                                                                           |
| Maestro カードスキャナー (1x16 桁)             | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、mastercard、mc、pan、payment account number、payment card number、pcn                                                                                                      |
| Maestro カードスキャナー (2x8 桁)              | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、mastercard、mc、pan、payment account number、payment card number、pcn                                                                                                      |
| Maestro カードスキャナー (4x4 桁)              | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、mastercard、mc、pan、payment account number、payment card number、pcn                                                                                                      |
| MasterCard スキャナー (1x16 桁)               | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、mastercard、mc、pan、payment account number、payment card number、pcn、union pay                                                                                           |
| MasterCard スキャナー (2x8 桁)                | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、mastercard、mc、pan、payment account number、payment card number、pcn、union pay                                                                                           |
| MasterCard スキャナー (4x4 桁)                | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、mastercard、mc、pan、payment account number、payment card number、pcn、union pay                                                                                           |
| Standard IBAN Code Scanner                     | bank account、bank acct、checking account、checking acct、deposit account、deposit acct、savings account、savings acct、chequing account、chequing acct、iban、account code、account number、accountno#、accountnumber#、bban、customer account id、customer account number、customer bank account id、sepa |
| Visa カードスキャナー (1x16 & 1x19 桁)         | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、electron、pan、payment account number、payment card number、pcn、union pay、visa                                                                                           |
| Visa カードスキャナー (2x8 桁)                 | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、electron、pan、payment account number、payment card number、pcn、union pay、visa                                                                                           |
| Visa カードスキャナー (4x4 桁)                 | account number、bank card、card、card num、card number、cc #、ccn、check card、credit、credit card#、dankort、debit、debit card、electron、pan、payment account number、payment card number、pcn、union pay、visa                                                                                           |

## 個人を特定できる情報 (PII)

| ライブラリルール                                                | デフォルトのキーワード                    |
| ----------------------------------------------------------- | ----------------------------------- |
| カナダ社会保険番号スキャナー                    | \-                                  |
| Chinese Car License Plate Number Scanner                    | car, plate, license, platenumber    |
| Chinese Passport Scanner                                    | passport、travel document           |
| Chinese Phone Number Scanner                                | mobile, phone, cell                 |
| Chinese Vehicle Identification Number Scanner               | vin, vehicle identification number  |
| France Social Security Number Scanner (INSEE/NIR)           | social security, insee, nir         |
| 標準メールアドレススキャナー                              | \-                                  |
| 英国国民保険番号スキャナー                        | \-                                  |
| US Individual Taxpayer Identification Number Scanner (ITIN) | i.t.i.n., individual taxpayer, itin |
| 米国パスポートスキャナー                                         | \-                                  |
| US Social Security Number Scanner                           | ssn, social security                |
| 米国車両識別番号スキャナー                    | \-                                  |

## ネットワークとデバイスの情報

| ライブラリルール                             | デフォルトのキーワード |
| ---------------------------------------- | ---------------- |
| HTTP Basic 認証ヘッダースキャナー | \-               |
| HTTP Cookie スキャナー                      | cookie           |
| HTTP URL スキャナー                      | \-               |
| IPv4 アドレススキャナー                     | \-               |
| IPv6 アドレススキャナー                     | \-               |
| Standard MAC Address Scanner             | \-               |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/
[2]: /ja/sensitive_data_scanner/?#add-scanning-rules