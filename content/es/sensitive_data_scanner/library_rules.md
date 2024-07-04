---
further_reading:
- link: /sensitive_data_scanner/
  tag: Documentación
  text: Configurar Sensitive Data Scanner
kind: documentation
title: Reglas de biblioteca
---

## Información general

La biblioteca de reglas de escaneo es un conjunto de reglas predefinidas para detectar patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, etc.

{{< whatsnext desc="Las reglas de biblioteca se organizan en las siguientes categorías:">}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#secrets-and-credentials">}}Secretos y credenciales{{< /nextlink >}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#credit-cards-and-banking">}}Tarjetas de crédito y bancos{{< /nextlink >}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#personal-identifiable-information-pii">}}Información personal identificable (PII){{< /nextlink >}}
  {{< nextlink href="/sensitive_data_scanner/library_rules#network-and-device-information">}}Información de red y dispositivo{{< /nextlink >}}
{{< /whatsnext >}}

Estas reglas también pueden consultarse en Datadog:

1. Ve a [Sensitive Data Scanner][1].
1. Haz clic en **Scanning Rules Library* (Biblioteca de reglas de escaneo) en la parte superior derecha de la página.
1. Para añadir reglas desde la biblioteca a un grupo de escaneo:
  a. Selecciona las reglas que deseas añadir.
  b. Haz clic en **Add Rules to Scanning Group** (Añadir reglas al grupo de escaneo).
  c. Sigue los pasos de [Configuración de Sensitive Data Scanner][2] para finalizar la configuración.

## Secretos y credenciales

| Regla de biblioteca                                       | Palabras clave por defecto                                                                                                      |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| AWS Access Key ID Scanner                          | aws_access_key_id, clave de acceso, acceso de AWS                                                                             |
| AWS Secret Access Key Scanner                      | aws_secret_access_key, credenciales, clave de acceso secreto, clave de secreto, set-awscredential                                  |
| Dynatrace Token Scanner                            | dynatrace, token                                                                                                      |
| Facebook Access Token Scanner                      | facebook, acceso, token                                                                                               |
| Gitlab Token Scanner                               | gitlab, token                                                                                                         |
| Instagram Token Scanner                            | Instagram, token                                                                                                      |
| JSON Web Token Scanner                             | \-                                                                                                                    |
| Mailchimp API Key Scanner                          | mailchimp, clave de API                                                                                                    |
| Mailgun API Key Scanner                            | mailgun, clave de API                                                                                                      |
| Okta API Token Scanner                             | okta, token de API                                                                                                       |
| Slack Access Token Scanner                         | slack, acceso, token                                                                                                  |
| Stripe API Key Scanner                             | stripe, clave de API                                                                                                       |
| Stripe Restricted API Key Scanner                  | stripe, clave de API                                                                                                       |
| Twilio API Key Scanner                             | twilio, clave de API                                                                                                       |
| Square Access Token Scanner                        | square, acceso, token                                                                                                 |
| Square OAuth Secret Scanner                        | square, oauth, secreto, autorización, autenticación                                                                  |
| Google API Key Scanner                             | g_places_key, gcp api key, gcp key, clave de google cloud, google-api-key, google-cloud-apikeys, googlekey, x-goog-api-key |
| Google OAuth Access Token Scanner                  | google, oauth, acceso, token, autorización, autenticación                                                           |
| RSA Private Key Scanner                            | rsa, clave privada                                                                                                      |
| Send Grid API Token Scanner                        | send grid, token de API                                                                                                  |
| Heroku API Key Scanner                             | heroku, clave de API                                                                                                       |
| SSH Key Scanner                                    | ssh, ssh key                                                                                                          |
| PGP Private Key Scanner                            | pgp, clave                                                                                                              |
| Paypal Braintree Access Token Scanner              | paypal, braintree, acceso, token                                                                                      |
| Amazon Marketplace Web Services Auth Token Scanner | amazon, marketplace, AWS, auth, token, autorización, autenticación                                                  |
| Azure Personal Access Token Scanner                | azure, acceso, token                                                                                                  |
| Azure SQL Connection String Scanner                | azure, sql, cadena de conexión                                                                                         |
| Azure Subscription Key Scanner                     | azure, clave de suscripción                                                                                               |
| Bearer Token Scanner                               | bearer, token                                                                                                         |
| Checkout.com Secret Scanner                        | checkout, secreto                                                                                                      |
| Databricks Personal Access Token Scanner           | databricks, acceso, token                                                                                             |
| Docker Swarm Join Token Scanner                    | docker, docker swarm, join token                                                                                      |
| Docker Swarm Unlock Key Scanner                    | Docker, Docker swarm, clave de desbloqueo                                                                                      |
| Github Access Token Scanner                        | github, acceso, token                                                                                                 |
| Github Refresh Token Scanner                       | github, token de actualización                                                                                                 |
| JIRA API Token Scanner                             | jira, token de API                                                                                                       |
| LinkedIn Secret Scanner                            | linkedin, secreto                                                                                                      |
| Shopify Access Token Scanner                       | shopify, acceso, token                                                                                                |
| Shopify Shared Secret Scanner                      | shopify, secreto compartido                                                                                                |
| Slack Webhook Secret Scanner                       | slack, webhook, secreto                                                                                                |

## Tarjetas de crédito y bancos

| Regla de biblioteca                                   | Palabras clave por defecto                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Twitter Secret Scanner                         | twitter, secreto                                                                                                                                                                                                                                                                                             |
| Visa Card Scanner (4x4 dígitos)                 | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, electron, pan, número de cuenta de pago, número de tarjeta de pago, pcn, union pay, visa                                                                                           |
| Visa Card Scanner (2x8 dígitos)                 | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, electron, pan, número de cuenta de pago, número de tarjeta de pago, pcn, union pay, visa                                                                                           |
| Visa Card Scanner (1x16 y 1x19 dígitos)         | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, electron, pan, número de cuenta de pago, número de tarjeta de pago, pcn, union pay, visa                                                                                           |
| MasterCard Scanner (4x4 dígitos)                | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito #, dankort, débito, tarjeta de débito, mastercard, mc, pan, número de cuenta de pago, número de tarjeta de pago, pcn, union pay                                                                                           |
| MasterCard Scanner (2x8 dígitos)                | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito #, dankort, débito, tarjeta de débito, mastercard, mc, pan, número de cuenta de pago, número de tarjeta de pago, pcn, union pay                                                                                           |
| MasterCard Scanner (1x16 dígitos)               | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito #, dankort, débito, tarjeta de débito, mastercard, mc, pan, número de cuenta de pago, número de tarjeta de pago, pcn, union pay                                                                                           |
| Discover Card Scanner (4x4 dígitos)             | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, discover, pan, número de cuenta de pago, número de tarjeta de pago, pcn                                                                                                            |
| Discover Card Scanner (2x8 dígitos)             | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, discover, pan, número de cuenta de pago, número de tarjeta de pago, pcn                                                                                                            |
| Discover Card Scanner (1x16 dígitos)            | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, discover, pan, número de cuenta de pago, número de tarjeta de pago, pcn                                                                                                            |
| American Express Card Scanner (4+6+5 dígitos)   | número de cuenta, american express, amex, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, pan, número de cuenta de pago, número de tarjeta de pago, pcn, union pay                                                                                   |
| American Express Card Scanner (4+4+4+3 dígitos) | número de cuenta, american express, amex, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, pan, número de cuenta de pago, número de tarjeta de pago, pcn, union pay                                                                                   |
| American Express Card Scanner (8+7 dígitos)     | número de cuenta, american express, amex, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, pan, número de cuenta de pago, número de tarjeta de pago, pcn, union pay                                                                                   |
| American Express Card Scanner (1x15 dígitos)    | número de cuenta, american express, amex, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, pan, número de cuenta de pago, número de tarjeta de pago, pcn, union pay                                                                                   |
| Diners Card Scanner (4+6+4 dígitos)             | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, diners club, mastercard, mc, pan, número de cuenta de pago, número de tarjeta de pago, pcn                                                                                         |
| Diners Card Scanner (4+4+4+2 dígitos)           | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, diners club, mastercard, mc, pan, número de cuenta de pago, número de tarjeta de pago, pcn                                                                                         |
| Diners Card Scanner (8+6 dígitos)               | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, diners club, mastercard, mc, pan, número de cuenta de pago, número de tarjeta de pago, pcn                                                                                         |
| Diners Card Scanner (1x14 dígitos)              | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, diners club, mastercard, mc, pan, número de cuenta de pago, número de tarjeta de pago, pcn                                                                                         |
| JCB Card Scanner (4x4 dígitos)                  | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, japanese card bureau, jcb, pan, número de cuenta de pago, número de tarjeta de pago, pcn                                                                                           |
| JCB Card Scanner (2x8 dígitos)                  | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, japanese card bureau, jcb, pan, número de cuenta de pago, número de tarjeta de pago, pcn                                                                                           |
| JCB Card Scanner (1x16 dígitos)                 | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito#, dankort, débito, tarjeta de débito, japanese card bureau, jcb, pan, número de cuenta de pago, número de tarjeta de pago, pcn                                                                                           |
| Maestro Card Scanner (4x4 dígitos)              | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito #, dankort, débito, tarjeta de débito, mastercard, mc, pan, número de cuenta de pago, número de tarjeta de pago, pcn                                                                                                      |
| Maestro Card Scanner (2x8 dígitos)              | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito #, dankort, débito, tarjeta de débito, mastercard, mc, pan, número de cuenta de pago, número de tarjeta de pago, pcn                                                                                                      |
| Maestro Card Scanner (1x16 dígitos)             | número de cuenta, tarjeta bancaria, tarjeta, núm. de tarjeta, número de tarjeta, cc #, ccn, tarjeta de verificación, crédito, tarjeta de crédito #, dankort, débito, tarjeta de débito, mastercard, mc, pan, número de cuenta de pago, número de tarjeta de pago, pcn                                                                                                      |
| Standard Iban Code Scanner                     | cuenta bancaria, cta. bancaria, cuenta corriente, cta. cte., cuenta de depósito, cta. de depósito, cuenta de ahorros, cta. de ahorros, cuenta depósito, cta. depósito, iban, código de cuenta, número de cuenta, no. de cuenta#, número de cuenta#, bban, ID de cuenta de cliente, número de cuenta de cliente, ID de cuenta bancaria del cliente, sepa |

## Información personal identificable (PII)

| Regla de biblioteca                             | Palabras clave por defecto                                                                                                                                                                                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Standard Email Address Scanner           | \-                                                                                                                                                                                                                                                     |
| US Passport Scanner                      | pasaporte, documento de viaje                                                                                                                                                                                                                              |
| US Vehicle Identification Number Scanner | fahrgestellnummer, niv, numarul de identificare, numarul seriei de sasiu, numer vin, número de identificação do veículo, número de identificación de automóviles, numéro d'identification du véhicule, vehicle identification number, vin, vin numeris |
| UK National Insurance Number Scanner     | servicio de salud nacional, nhs                                                                                                                                                                                                                           |
| Canadian Social Insurance Number Scanner | canada healthcare number, msp number, personal healthcare number, phn, soins de santé                                                                                                                                                                  |

## Información de red y del dispositivo

| Regla de biblioteca                             | Palabras clave por defecto |
| ---------------------------------------- | ---------------- |
| IPv4 Address Scanner                     | \-               |
| IPv6 Address Scanner                     | \-               |
| Standard Mac Address Scanner             | \-               |
| HTTP Basic Authentication Header Scanner | \-               |
| HTTP Cookie Scanner                      | cookie           |
| HTTP(S) URL Scanner                      | \-               |

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/
[2]: /es/sensitive_data_scanner/?#add-scanning-rules