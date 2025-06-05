---
title: Library Rules
aliases:
  - /sensitive_data_scanner/library_rules/
  - /sensitive_data_scanner/scanning_rules/library_rules
further_reading:
    - link: "/security/sensitive_data_scanner/"
      tag: "Documentation"
      text: "Set up Sensitive Data Scanner"
---

{{< callout url="https://www.datadoghq.com/product-preview/human-name-pii-detection-in-logs-using-machine-learning/" btn_hidden="false" >}}
Human name PII detection in logs using machine learning is in Preview. To enroll, click <b>Request Access</b>.
{{< /callout >}}

## Overview

The Scanning Rule Library is a collection of predefined rules for detecting common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more.

{{< whatsnext desc="The library rules are organized into the following categories:">}}
  {{< nextlink href="/security/sensitive_data_scanner/scanning_rules/library_rules#secrets-and-credentials">}}Secrets and credentials{{< /nextlink >}}
  {{< nextlink href="/security/sensitive_data_scanner/scanning_rules/library_rules#credit-cards-and-banking">}}Credit cards and banking{{< /nextlink >}}
  {{< nextlink href="/security/sensitive_data_scanner/scanning_rules/library_rules#personal-identifiable-information-pii">}}Personal identifiable information (PII){{< /nextlink >}}
  {{< nextlink href="/security/sensitive_data_scanner/scanning_rules/library_rules#network-and-device-information">}}Network and device information{{< /nextlink >}}
{{< /whatsnext >}}

These rules can also be viewed in Datadog:

1. Navigate to [Sensitive Data Scanner][1].
1. Click **Scanning Rules Library** on the top right side of the page.
1. To add rules from the library to a scanning group:<br />
   1. Select the rules you want to add.<br />
   1. Click **Add Rules to Scanning Group**.<br />
   1. Follow the steps in [Set Up Sensitive Data Scanner][2] to finish the setup.

## Secrets and credentials

| Library rule                                       | Default Keywords                                                                                                      |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| AWS Access Key ID Scanner                          | aws_access_key_id, access key, aws access, x-amz-credential                                                           |
| AWS Secret Access Key Scanner                      | aws_secret_access_key, credentials, secret access key, secret key, set-awscredential                                  |
| Amazon Marketplace Web Services Auth Token Scanner | amazon, marketplace, aws, auth, token, authorization, authentication                                                  |
| Azure Personal Access Token Scanner                | \-                                                                                                                    |
| Azure SQL Connection String Scanner                | azure, sql, connection string                                                                                         |
| Azure Subscription Key Scanner                     | azure, subscription key                                                                                               |
| Bearer Token Scanner                               | \-                                                                                                                    |
| Checkout.com API Secret Key Scanner                | checkout, secret                                                                                                      |
| Databricks Personal Access Token Scanner           | databricks, access, token                                                                                             |
| Docker Swarm Join Token Scanner                    | docker, docker swarm, join token                                                                                      |
| Docker Swarm Unlock Key Scanner                    | docker, docker swarm, unlock key                                                                                      |
| Dynatrace Token Scanner                            | dynatrace, token                                                                                                      |
| Facebook Access Token Scanner                      | facebook, access, token                                                                                               |
| Github Access Token Scanner                        | github, access, token                                                                                                 |
| Github Refresh Token Scanner                       | github, refresh token                                                                                                 |
| Gitlab Personal and Project Access Token Scanner   | gitlab, token                                                                                                         |
| Google API Key Scanner                             | g_places_key, gcp api key, gcp key, google cloud key, google-api-key, google-cloud-apikeys, googlekey, x-goog-api-key |
| Google OAuth Access Token Scanner                  | google, oauth, access, token, authorization, authentication                                                           |
| Heroku API Key Scanner                             | \-                                                                                                                    |
| Instagram Token Scanner                            | \-                                                                                                                    |
| JIRA API Token Scanner                             | \-                                                                                                                    |
| JSON Web Token Scanner                             | \-                                                                                                                    |
| LinkedIn Secret Scanner                            | \-                                                                                                                    |
| Mailchimp API Key Scanner                          | mailchimp, api key                                                                                                    |
| Mailgun API Key Scanner                            | mailgun, api key                                                                                                      |
| Okta API Token Scanner                             | okta, api token                                                                                                       |
| OpenAI API Key Scanner                             | \-                                                                                                                    |
| PGP Private Key Scanner                            | \-                                                                                                                    |
| PagerDuty API Token Scanner                        | pagerduty, pager_duty, token, pg                                                                                      |
| Paypal Braintree Access Token Scanner              | paypal, braintree, access, token                                                                                      |
| Postman API Key Scanner                            | postman, x-api-key, postman-api-key                                                                                   |
| RSA Private Key Scanner                            | \-                                                                                                                    |
| SSH Key Scanner                                    | \-                                                                                                                    |
| SendGrid API Key Scanner                           | send grid, api token                                                                                                  |
| Shopify Access Secret Scanner                      | shopify, shared secret                                                                                                |
| Shopify Access Token Scanner                       | shopify, access, token                                                                                                |
| Slack Access Token Scanner                         | slack, access, token                                                                                                  |
| Slack Webhook Secret Scanner                       | slack, webhook, secret                                                                                                |
| Square Access Token Scanner                        | square, access, token                                                                                                 |
| Square OAuth Secret Scanner                        | square, oauth, secret, authorization, authentication                                                                  |
| Stripe Restricted API Key Scanner                  | stripe, api key                                                                                                       |
| Stripe Secret API Key Scanner                      | stripe, api key                                                                                                       |
| Twilio API Key Scanner                             | twilio, api key                                                                                                       |
| Twitter Secret Scanner                             | \-                                                                                                                    |

## Credit cards and banking

| Library rule                                   | Default Keywords                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| American Express Card Scanner (1x15 digits)    | account number, american express, amex, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, pan, payment account number, payment card number, pcn, union pay                                                                                   |
| American Express Card Scanner (4+4+4+3 digits) | account number, american express, amex, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, pan, payment account number, payment card number, pcn, union pay                                                                                   |
| American Express Card Scanner (4+6+5 digits)   | account number, american express, amex, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, pan, payment account number, payment card number, pcn, union pay                                                                                   |
| American Express Card Scanner (8+7 digits)     | account number, american express, amex, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, pan, payment account number, payment card number, pcn, union pay                                                                                   |
| Diners Card Scanner (1x14 digits)              | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, diners club, mastercard, mc, pan, payment account number, payment card number, pcn                                                                                         |
| Diners Card Scanner (4+4+4+2 digits)           | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, diners club, mastercard, mc, pan, payment account number, payment card number, pcn                                                                                         |
| Diners Card Scanner (4+6+4 digits)             | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, diners club, mastercard, mc, pan, payment account number, payment card number, pcn                                                                                         |
| Diners Card Scanner (8+6 digits)               | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, diners club, mastercard, mc, pan, payment account number, payment card number, pcn                                                                                         |
| Discover Card Scanner (1x16 digits)            | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, discover, pan, payment account number, payment card number, pcn                                                                                                            |
| Discover Card Scanner (2x8 digits)             | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, discover, pan, payment account number, payment card number, pcn                                                                                                            |
| Discover Card Scanner (4x4 digits)             | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, discover, pan, payment account number, payment card number, pcn                                                                                                            |
| JCB Card Scanner (1x16 digits)                 | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, japanese card bureau, jcb, pan, payment account number, payment card number, pcn                                                                                           |
| JCB Card Scanner (2x8 digits)                  | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, japanese card bureau, jcb, pan, payment account number, payment card number, pcn                                                                                           |
| JCB Card Scanner (4x4 digits)                  | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, japanese card bureau, jcb, pan, payment account number, payment card number, pcn                                                                                           |
| Maestro Card Scanner (1x16 digits)             | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, mastercard, mc, pan, payment account number, payment card number, pcn                                                                                                      |
| Maestro Card Scanner (2x8 digits)              | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, mastercard, mc, pan, payment account number, payment card number, pcn                                                                                                      |
| Maestro Card Scanner (4x4 digits)              | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, mastercard, mc, pan, payment account number, payment card number, pcn                                                                                                      |
| MasterCard Scanner (1x16 digits)               | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, mastercard, mc, pan, payment account number, payment card number, pcn, union pay                                                                                           |
| MasterCard Scanner (2x8 digits)                | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, mastercard, mc, pan, payment account number, payment card number, pcn, union pay                                                                                           |
| MasterCard Scanner (4x4 digits)                | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, mastercard, mc, pan, payment account number, payment card number, pcn, union pay                                                                                           |
| Standard IBAN Code Scanner                     | bank account, bank acct, checking account, checking acct, deposit account, deposit acct, savings account, savings acct, chequing account, chequing acct, iban, account code, account number, accountno#, accountnumber#, bban, customer account id, customer account number, customer bank account id, sepa |
| Visa Card Scanner (1x16 & 1x19 digits)         | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, electron, pan, payment account number, payment card number, pcn, union pay, visa                                                                                           |
| Visa Card Scanner (2x8 digits)                 | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, electron, pan, payment account number, payment card number, pcn, union pay, visa                                                                                           |
| Visa Card Scanner (4x4 digits)                 | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, electron, pan, payment account number, payment card number, pcn, union pay, visa                                                                                           |

## Personal identifiable information (PII)

| Library rule                                                | Default Keywords                                                                                                             |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Canadian Social Insurance Number Scanner                    | \-                                                                                                                           |
| Chinese Car License Plate Number Scanner                    | car, plate, license, platenumber                                                                                             |
| Chinese Identity Card Number Scanner                        | national id, resident identity, identity number, identification number, identity card number, national identification number |
| Chinese Passport Scanner                                    | passport, travel document                                                                                                    |
| Chinese Phone Number Scanner                                | mobile, phone, cell                                                                                                          |
| Chinese Vehicle Identification Number Scanner               | vin, vehicle identification number                                                                                           |
| France Social Security Number Scanner (INSEE/NIR)           | social security, insee, nir                                                                                                  |
| Standard Email Address Scanner                              | \-                                                                                                                           |
| UK National Health Service Number Scanner                   | national health number, nhs                                                                                                  |
| UK National Insurance Number Scanner                        | \-                                                                                                                           |
| US Individual Taxpayer Identification Number Scanner (ITIN) | i.t.i.n., individual taxpayer, itin                                                                                          |
| US Passport Scanner                                         | \-                                                                                                                           |
| US Social Security Number Scanner                           | ssn, social security                                                                                                         |
| US Vehicle Identification Number Scanner                    | \-                                                                                                                           |

## Network and device information

| Library rule                             | Default Keywords |
| ---------------------------------------- | ---------------- |
| HTTP Basic Authentication Header Scanner | \-               |
| HTTP Cookie Scanner                      | cookie           |
| HTTP(S) URL Scanner                      | \-               |
| IPv4 Address Scanner                     | \-               |
| IPv6 Address Scanner                     | \-               |
| Standard MAC Address Scanner             | \-               |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/
[2]: /security/sensitive_data_scanner/?#add-scanning-rules
