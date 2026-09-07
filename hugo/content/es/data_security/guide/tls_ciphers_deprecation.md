---
title: Obsolescencia del conjunto de cifrado TLS
---
## Descripción general {#overview}

TLS es un protocolo de seguridad que protege el tráfico web al proporcionar confidencialidad e integridad de los datos en tránsito entre clientes y servidores. Durante una sesión TLS, ambas partes acuerdan un conjunto de cifrado que dicta qué algoritmos criptográficos se utilizarán.

Datadog utiliza un motor criptográfico moderno que requiere configuraciones específicas de conjuntos de cifrado.

## Compatibilidad del cliente {#client-compatibility}

Los sistemas de Datadog requieren TLS 1.2 o superior. Los clientes compatibles pueden negociar conjuntos de cifrado, pero las configuraciones específicas del lado del cliente pueden alterar este comportamiento.

El Datadog Agent está configurado para utilizar conjuntos de cifrado modernos y es compatible con los requisitos de Datadog. Si experimenta problemas de conexión, generalmente se originan en integraciones personalizadas, scripts o clientes HTTP más antiguos, como ciertas versiones de Windows PowerShell o Ruby.

Para probar la compatibilidad de los conjuntos de cifrado de su cliente, conéctese a [tls-config-test.datadoghq.com][3], que está configurado con los conjuntos de cifrado aceptados por Datadog. Alternativamente, utilice el [How's My SSL? API][1] para verificar los conjuntos de cifrado que admite su cliente. Para obtener ayuda con la resolución de problemas de conexión, comuníquese con el [soporte de Datadog][2].

## Conjuntos de cifrado aceptados {#accepted-cipher-suites}

{{< site-region region="us,eu,us3,us5,ap1,ap2,uk1" >}}

A partir del 1 de septiembre de 2026, Datadog solo acepta los siguientes conjuntos de cifrado:

| Código         | Nombre IANA                                         |
|--------------|---------------------------------------------------|
| `0xC0,0x2B`  | `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256`        |
| `0xC0,0x2F`  | `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`          |
| `0xC0,0x2C`  | `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`        |
| `0xC0,0x30`  | `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`          |
| `0xCC,0xA9`  | `TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256` |
| `0xCC,0xA8`  | `TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256`   |
| `0xC0,0x09`  | `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA`          |
| `0xC0,0x0A`  | `TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA`          |
| `0x13,0x01`  | `TLS_AES_128_GCM_SHA256`                        |
| `0x13,0x02`  | `TLS_AES_256_GCM_SHA384`                        |
| `0x13,0x03`  | `TLS_CHACHA20_POLY1305_SHA256`                  |

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

Datadog acepta los siguientes conjuntos de cifrado para {{< region-param key="dd_site_name" >}}:

| Código         | Nombre IANA                                  |
|--------------|--------------------------------------------|
| `0xC0,0x2F`  | `TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256`    |
| `0xC0,0x30`  | `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`    |
| `0xC0,0x2B`  | `TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256`  |
| `0xC0,0x2C`  | `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`  |

{{< /site-region >}}

{{< site-region region="us,eu,us3,us5,ap1,ap2,uk1" >}}

## Conjuntos de cifrado deshabilitados {#disabled-cipher-suites}

Datadog ha deshabilitado el soporte para los siguientes conjuntos de cifrado, los cuales se consideran débiles bajo los estándares de seguridad modernos.

### A partir del 1 de septiembre de 2026 {#effective-september-1-2026}

A partir del **1 de septiembre de 2026**, Datadog no admite los siguientes conjuntos de cifrado:

| Código         | Nombre IANA                                  | Nombre OpenSSL             |
|--------------|--------------------------------------------|--------------------------|
| `0xC0,0x14`  | `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA`       | `ECDHE-RSA-AES256-SHA`   |
| `0xC0,0x13`  | `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA`       | `ECDHE-RSA-AES128-SHA`   |
| `0x00,0x9D`  | `TLS_RSA_WITH_AES_256_GCM_SHA384`          | `AES256-GCM-SHA384`      |
| `0x00,0x9C`  | `TLS_RSA_WITH_AES_128_GCM_SHA256`          | `AES128-GCM-SHA256`      |
| `0x00,0x35`  | `TLS_RSA_WITH_AES_256_CBC_SHA`             | `AES256-SHA`             |
| `0x00,0x2F`  | `TLS_RSA_WITH_AES_128_CBC_SHA`             | `AES128-SHA`             |

### A partir del 1 de abril de 2024 {#effective-april-1-2024}

A partir del **1 de abril de 2024**, Datadog no admite los siguientes conjuntos de cifrado en sus aplicaciones públicas. Los clientes que utilizan estos conjuntos de cifrado reciben mensajes de error de conexión.

| Código         | Nombre IANA                                  |
|--------------|--------------------------------------------|
| `0xC0,0x27`  | `TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256`    |
| `0xC0,0x23`  | `TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256`  |
| `0xC0,0x28`  | `TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384`    |
| `0xC0,0x24`  | `TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384`  |
| `0x00,0x3C`  | `TLS_RSA_WITH_AES_128_CBC_SHA256`          |
| `0x00,0x3D`  | `TLS_RSA_WITH_AES_256_CBC_SHA256`          |

{{< /site-region >}}


[1]: https://www.howsmyssl.com/s/api.html
[2]: /es/help
[3]: https://tls-config-test.datadoghq.com