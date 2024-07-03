---
further_reading:
- link: /sensitive_data_scanner/
  tag: Documentation
  text: Set up Sensitive Data Scanner
kind: documentation
title: Library Rules
---

## Overview

The Scanning Rule Library is a collection of predefined rules for detecting common patterns such as email addresses, credit card numbers, API keys, authorization tokens, and more. 

{{< whatsnext desc="The library rules are organized into the following categories:">}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#secrets-and-credentials">}}Secrets and credentials{{< /nextlink >}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#credit-cards-and-banking">}}Credit cards and banking{{< /nextlink >}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#personal-identifiable-information-pii">}}Personal identifiable information (PII){{< /nextlink >}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#network-and-device-information">}}Network and device information{{< /nextlink >}}
{{< /whatsnext >}}

These rules can also be viewed in Datadog:

1. Navigate to [Sensitive Data Scanner][1].
1. Click **Scanning Rules Library** on the top right side of the page.
1. To add rules from the library to a scanning group:   
  a. Select the rules you want to add.   
  b. Click **Add Rules to Scanning Group**.   
  c. Follow the steps in [Set Up Sensitive Data Scanner][2] to finish the setup

## Secrets and credentials

| Library rule                                       | Default Keywords                                                                                                      |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| AWS Access Key ID Scanner                          | aws_access_key_id, access key, aws access                                                                             |
| AWS Secret Access Key Scanner                      | aws_secret_access_key, credentials, secret access key, secret key, set-awscredential                                  |
| Dynatrace Token Scanner                            | dynatrace, token                                                                                                      |
| Facebook Access Token Scanner                      | facebook, access, token                                                                                               |
| Gitlab Token Scanner                               | gitlab, token                                                                                                         |
| Instagram Token Scanner                            | Instagram, token                                                                                                      |
| JSON Web Token Scanner                             | \-                                                                                                                    |
| Mailchimp API Key Scanner                          | mailchimp, api key                                                                                                    |
| Mailgun API Key Scanner                            | mailgun, api key                                                                                                      |
| Okta API Token Scanner                             | okta, api token                                                                                                       |
| Slack Access Token Scanner                         | slack, access, token                                                                                                  |
| Stripe API Key Scanner                             | stripe, api key                                                                                                       |
| Stripe Restricted API Key Scanner                  | stripe, api key                                                                                                       |
| Twilio API Key Scanner                             | twilio, api key                                                                                                       |
| Square Access Token Scanner                        | square, access, token                                                                                                 |
| Square OAuth Secret Scanner                        | square, oauth, secret, authorization, authentication                                                                  |
| Google API Key Scanner                             | g_places_key, gcp api key, gcp key, google cloud key, google-api-key, google-cloud-apikeys, googlekey, x-goog-api-key |
| Google OAuth Access Token Scanner                  | google, oauth, access, token, authorization, authentication                                                           |
| RSA Private Key Scanner                            | rsa, private key                                                                                                      |
| Send Grid API Token Scanner                        | send grid, api token                                                                                                  |
| Heroku API Key Scanner                             | heroku, api key                                                                                                       |
| SSH Key Scanner                                    | ssh, ssh key                                                                                                          |
| PGP Private Key Scanner                            | pgp, key                                                                                                              |
| Paypal Braintree Access Token Scanner              | paypal, braintree, access, token                                                                                      |
| Amazon Marketplace Web Services Auth Token Scanner | amazon, marketplace, aws, auth, token, authorization, authentication                                                  |
| Azure Personal Access Token Scanner                | azure, access, token                                                                                                  |
| Azure SQL Connection String Scanner                | azure, sql, connection string                                                                                         |
| Azure Subscription Key Scanner                     | azure, subscription key                                                                                               |
| Bearer Token Scanner                               | bearer, token                                                                                                         |
| Checkout.com Secret Scanner                        | checkout, secret                                                                                                      |
| Databricks Personal Access Token Scanner           | databricks, access, token                                                                                             |
| Docker Swarm Join Token Scanner                    | docker, docker swarm, join token                                                                                      |
| Docker Swarm Unlock Key Scanner                    | docker, docker swarm, unlock key                                                                                      |
| Github Access Token Scanner                        | github, access, token                                                                                                 |
| Github Refresh Token Scanner                       | github, refresh token                                                                                                 |
| JIRA API Token Scanner                             | jira, api token                                                                                                       |
| LinkedIn Secret Scanner                            | linkedin, secret                                                                                                      |
| Shopify Access Token Scanner                       | shopify, access, token                                                                                                |
| Shopify Shared Secret Scanner                      | shopify, shared secret                                                                                                |
| Slack Webhook Secret Scanner                       | slack, webhook, secret                                                                                                |

## Credit cards and banking

| Library rule                                   | Default Keywords                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Twitter Secret Scanner                         | twitter, secret                                                                                                                                                                                                                                                                                             |
| Visa Card Scanner (4x4 digits)                 | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, electron, pan, payment account number, payment card number, pcn, union pay, visa                                                                                           |
| Visa Card Scanner (2x8 digits)                 | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, electron, pan, payment account number, payment card number, pcn, union pay, visa                                                                                           |
| Visa Card Scanner (1x16 & 1x19 digits)         | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, electron, pan, payment account number, payment card number, pcn, union pay, visa                                                                                           |
| MasterCard Scanner (4x4 digits)                | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, mastercard, mc, pan, payment account number, payment card number, pcn, union pay                                                                                           |
| MasterCard Scanner (2x8 digits)                | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, mastercard, mc, pan, payment account number, payment card number, pcn, union pay                                                                                           |
| MasterCard Scanner (1x16 digits)               | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, mastercard, mc, pan, payment account number, payment card number, pcn, union pay                                                                                           |
| Discover Card Scanner (4x4 digits)             | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, discover, pan, payment account number, payment card number, pcn                                                                                                            |
| Discover Card Scanner (2x8 digits)             | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, discover, pan, payment account number, payment card number, pcn                                                                                                            |
| Discover Card Scanner (1x16 digits)            | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, discover, pan, payment account number, payment card number, pcn                                                                                                            |
| American Express Card Scanner (4+6+5 digits)   | account number, american express, amex, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, pan, payment account number, payment card number, pcn, union pay                                                                                   |
| American Express Card Scanner (4+4+4+3 digits) | account number, american express, amex, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, pan, payment account number, payment card number, pcn, union pay                                                                                   |
| American Express Card Scanner (8+7 digits)     | account number, american express, amex, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, pan, payment account number, payment card number, pcn, union pay                                                                                   |
| American Express Card Scanner (1x15 digits)    | account number, american express, amex, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, pan, payment account number, payment card number, pcn, union pay                                                                                   |
| Diners Card Scanner (4+6+4 digits)             | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, diners club, mastercard, mc, pan, payment account number, payment card number, pcn                                                                                         |
| Diners Card Scanner (4+4+4+2 digits)           | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, diners club, mastercard, mc, pan, payment account number, payment card number, pcn                                                                                         |
| Diners Card Scanner (8+6 digits)               | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, diners club, mastercard, mc, pan, payment account number, payment card number, pcn                                                                                         |
| Diners Card Scanner (1x14 digits)              | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, diners club, mastercard, mc, pan, payment account number, payment card number, pcn                                                                                         |
| JCB Card Scanner (4x4 digits)                  | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, japanese card bureau, jcb, pan, payment account number, payment card number, pcn                                                                                           |
| JCB Card Scanner (2x8 digits)                  | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, japanese card bureau, jcb, pan, payment account number, payment card number, pcn                                                                                           |
| JCB Card Scanner (1x16 digits)                 | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, japanese card bureau, jcb, pan, payment account number, payment card number, pcn                                                                                           |
| Maestro Card Scanner (4x4 digits)              | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, mastercard, mc, pan, payment account number, payment card number, pcn                                                                                                      |
| Maestro Card Scanner (2x8 digits)              | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, mastercard, mc, pan, payment account number, payment card number, pcn                                                                                                      |
| Maestro Card Scanner (1x16 digits)             | account number, bank card, card, card num, card number, cc #, ccn, check card, credit, credit card#, dankort, debit, debit card, mastercard, mc, pan, payment account number, payment card number, pcn                                                                                                      |
| Standard Iban Code Scanner                     | bank account, bank acct, checking account, checking acct, deposit account, deposit acct, savings account, savings acct, chequing account, chequing acct, iban, account code, account number, accountno#, accountnumber#, bban, customer account id, customer account number, customer bank account id, sepa |

## Personal identifiable information (PII)

| Library rule                             | Default Keywords                                                                                                                                                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Standard Email Address Scanner           | \-                                                                                                                                                                                                                                                     |
| US Passport Scanner                      | passport, travel document                                                                                                                                                                                                                              |
| US Vehicle Identification Number Scanner | fahrgestellnummer, niv, numarul de identificare, numarul seriei de sasiu, numer vin, número de identificação do veículo, número de identificación de automóviles, numéro d'identification du véhicule, vehicle identification number, vin, vin numeris |
| UK National Insurance Number Scanner     | national health service, nhs                                                                                                                                                                                                                           |
| Canadian Social Insurance Number Scanner | canada healthcare number, msp number, personal healthcare number, phn, soins de santé                                                                                                                                                                  |

## Network and device information

| Library rule                             | Default Keywords |
| ---------------------------------------- | ---------------- |
| IPv4 Address Scanner                     | \-               |
| IPv6 Address Scanner                     | \-               |
| Standard Mac Address Scanner             | \-               |
| HTTP Basic Authentication Header Scanner | \-               |
| HTTP Cookie Scanner                      | cookie           |
| HTTP(S) URL Scanner                      | \-               |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/
[2]: /ja/sensitive_data_scanner/?#add-scanning-rules