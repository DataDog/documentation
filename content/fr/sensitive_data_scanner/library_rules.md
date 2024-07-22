---
further_reading:
- link: /sensitive_data_scanner/
  tag: Documentation
  text: Configurer le scanner de données sensibles
title: Règles de bibliothèque
---

## Présentation

La bibliothèque de règles d'analyse rassemble des règles prédéfinies permettant de détecter des patterns communs, tels que des adresses e-mail, des numéros de carte bancaire, des clés d'API, des tokens d'autorisation, etc.

{{< whatsnext desc="Les règles de bibliothèque sont organisées en plusieurs catégories :">}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#secrets-et-identifiants">}}Secrets et identifiants{{< /nextlink >}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#cartes-et-donnees-bancaires">}}Cartes et données bancaires{{< /nextlink >}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#informations-personnelles">}}Informations personnelles{{< /nextlink >}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#informations-relatives-aux-peripheriques-et-reseaux">}}Informations relatives aux périphériques et réseaux{{< /nextlink >}}
{{< /whatsnext >}}

Vous pouvez consulter ces règles dans Datadog :

1. Accédez au [scanner de données sensibles][1].
1. Cliquez sur **Scanning Rules Library** en haut à droite de la page.
1. Pour ajouter des règles à un groupe d'analyse à partir de la bibliothèque, procédez comme suit :
  a. Sélectionnez les règles à ajouter.
  b. Cliquez sur **Add Rules to Scanning Group**.   
  c. Suivez les étapes indiquées dans la rubrique [Configurer le scanner de données sensibles][2] pour terminer la configuration.

## Secrets et identifiants

| Règle de bibliothèque                                       | Mots-clés par défaut                                                                                                      |
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

## Cartes et données bancaires

| Règle de bibliothèque                                   | Mots-clés par défaut                                                                                                                                                                                                                                                                                            |
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

## Informations personnelles

| Règle de bibliothèque                             | Mots-clés par défaut                                                                                                                                                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Standard Email Address Scanner           | \-                                                                                                                                                                                                                                                     |
| US Passport Scanner                      | passport, travel document                                                                                                                                                                                                                              |
| US Vehicle Identification Number Scanner | fahrgestellnummer, niv, numarul de identificare, numarul seriei de sasiu, numer vin, número de identificação do veículo, número de identificación de automóviles, numéro d'identification du véhicule, vehicle identification number, vin, vin numeris |
| UK National Insurance Number Scanner     | national health service, nhs                                                                                                                                                                                                                           |
| Canadian Social Insurance Number Scanner | canada healthcare number, msp number, personal healthcare number, phn, soins de santé                                                                                                                                                                  |

## Informations relatives aux périphériques et réseaux

| Règle de bibliothèque                             | Mots-clés par défaut |
| ---------------------------------------- | ---------------- |
| IPv4 Address Scanner                     | \-               |
| IPv6 Address Scanner                     | \-               |
| Standard Mac Address Scanner             | \-               |
| HTTP Basic Authentication Header Scanner | \-               |
| HTTP Cookie Scanner                      | cookie           |
| HTTP(S) URL Scanner                      | \-               |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/
[2]: /fr/sensitive_data_scanner/?#add-scanning-rules