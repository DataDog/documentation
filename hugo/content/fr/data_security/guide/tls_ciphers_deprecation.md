---
title: Obsolescence des suites de chiffrement TLS
---
## Présentation {#overview}

TLS est un protocole de sécurité qui protège le trafic Web en assurant la confidentialité et l'intégrité des données en transit entre les clients et les serveurs. Au cours d'une session TLS, les deux parties conviennent d'une suite de chiffrement qui dicte les algorithmes cryptographiques à utiliser.

Datadog utilise un moteur cryptographique moderne qui nécessite des configurations de suite de chiffrement spécifiques.

## Compatibilité client {#client-compatibility}

Les systèmes de Datadog nécessitent TLS 1.2 ou une version ultérieure. Les clients compatibles peuvent négocier des suites de chiffrement, mais des configurations spécifiques côté client peuvent modifier ce comportement.

Le Datadog Agent est configuré pour utiliser des suites de chiffrement modernes et est compatible avec les exigences de Datadog. Si vous rencontrez des problèmes de connexion, ils proviennent généralement d'intégrations personnalisées, de scripts ou d'anciens clients HTTP tels que certaines versions de Windows PowerShell ou de Ruby.

Pour tester la compatibilité de la suite de chiffrement de votre client, connectez-vous à [tls-config-test.datadoghq.com][3], qui est configuré avec les suites de chiffrement acceptées par Datadog. Sinon, utilisez le site [How's My SSL? API][1] pour vérifier la compatibilité de la suite de chiffrement de votre client. Pour obtenir de l'aide sur le dépannage des problèmes de connexion, contactez le [support Datadog][2].

## Suites de chiffrement acceptées {#accepted-cipher-suites}

{{< site-region region="us,eu,us3,us5,ap1,ap2,uk1" >}}

À compter du 1er septembre 2026, Datadog accepte uniquement les suites de chiffrement suivantes :

### TLS 1.2 {#tls-12}

| Code         | Nom IANA                                         |
|--------------|---------------------------------------------------|
| `0xC0,0x2B`  | `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256`         |
| `0xC0,0x2F`  | `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`           |
| `0xC0,0x2C`  | `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`         |
| `0xC0,0x30`  | `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`           |
| `0xCC,0xA9`  | `TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256`   |
| `0xCC,0xA8`  | `TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256`     |

### TLS 1.3 {#tls-13}

| Code         | Nom&nbsp;IANA                        |
|--------------|----------------------------------|
| `0x13,0x01`  | `TLS_AES_128_GCM_SHA256`         |
| `0x13,0x02`  | `TLS_AES_256_GCM_SHA384`         |
| `0x13,0x03`  | `TLS_CHACHA20_POLY1305_SHA256`   |

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

Datadog accepte les suites de chiffrement suivantes pour {{< region-param key="dd_site_name" >}}:

### TLS 1.2 {#tls-12-1}

| Code         | Nom IANA                                  |
|--------------|--------------------------------------------|
| `0xC0,0x2F`  | `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`    |
| `0xC0,0x30`  | `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`    |
| `0xC0,0x2B`  | `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256`  |
| `0xC0,0x2C`  | `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`  |

### TLS 1.3 {#tls-13-1}

| Code         | Nom&nbsp;IANA                        |
|--------------|----------------------------------|
| `0x13,0x01`  | `TLS_AES_128_GCM_SHA256`         |
| `0x13,0x02`  | `TLS_AES_256_GCM_SHA384`         |

{{< /site-region >}}

{{< site-region region="us,eu,us3,us5,ap1,ap2,uk1" >}}

## Suites de chiffrement désactivées {#disabled-cipher-suites}

Datadog a désactivé la prise en charge des suites de chiffrement suivantes, considérées comme faibles selon les normes de sécurité modernes.

### À compter du 1er septembre 2026 {#effective-september-1-2026}

À partir du **1er septembre 2026**, Datadog ne prend pas en charge les suites de chiffrement suivantes :

| Code         | Nom IANA                                  | Nom OpenSSL             |
|--------------|--------------------------------------------|--------------------------|
| `0xC0,0x09`  | `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA`     | `ECDHE-ECDSA-AES128-SHA` |
| `0xC0,0x0A`  | `TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA`     | `ECDHE-ECDSA-AES256-SHA` |
| `0xC0,0x14`  | `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA`       | `ECDHE-RSA-AES256-SHA`   |
| `0xC0,0x13`  | `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA`       | `ECDHE-RSA-AES128-SHA`   |
| `0x00,0x9D`  | `TLS_RSA_WITH_AES_256_GCM_SHA384`          | `AES256-GCM-SHA384`      |
| `0x00,0x9C`  | `TLS_RSA_WITH_AES_128_GCM_SHA256`          | `AES128-GCM-SHA256`      |
| `0x00,0x35`  | `TLS_RSA_WITH_AES_256_CBC_SHA`             | `AES256-SHA`             |
| `0x00,0x2F`  | `TLS_RSA_WITH_AES_128_CBC_SHA`             | `AES128-SHA`             |

### À compter du 1er avril 2024 {#effective-april-1-2024}

À partir du **1er avril 2024**, Datadog ne prend pas en charge les suites de chiffrement suivantes sur ses applications accessibles au public. Les clients utilisant ces suites de chiffrement reçoivent des messages d'erreur de connexion.

| Code         | Nom IANA                                  |
|--------------|--------------------------------------------|
| `0xC0,0x27`  | `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256`    |
| `0xC0,0x23`  | `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256`  |
| `0xC0,0x28`  | `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384`    |
| `0xC0,0x24`  | `TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384`  |
| `0x00,0x3C`  | `TLS_RSA_WITH_AES_128_CBC_SHA256`          |
| `0x00,0x3D`  | `TLS_RSA_WITH_AES_256_CBC_SHA256`          |

{{< /site-region >}}


[1]: https://www.howsmyssl.com/s/api.html
[2]: /fr/help
[3]: https://tls-config-test.datadoghq.com