---
description: Descripción detallada de los errores en tests de API
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentación de la monitorización Synthetic de Datadog
- link: /synthetics/
  tag: Documentación
  text: Gestión de tus checks
- link: /synthetics/browser_tests/
  tag: Documentación
  text: Configurar un test de navegador
title: Errores en tests de API
---
## Errores HTTP

El mensaje `Error performing HTTP/2 request` puede aparecer cuando la compatibilidad HTTP de un servidor remoto no es constante. Por ejemplo, supongamos que ejecutas un test que llega a un endpoint en un servidor que admite HTTP 2. En la siguiente ejecución, si el test se encuentra con el mismo endpoint en un servidor que sólo admite HTTP 1.1, el test no podrá establecer una conexión HTTP 2 y devolverá un error. En este caso, el cambio a HTTP/1.1 evitará el error.

## Errores SSL

Los errores SSL pueden producirse durante la ejecución de un test de API. Son diferentes de las aserciones que fallan en los tests SSL y pueden ocurrir en todos los tipos de tests de API.

{{< img src="synthetics/api_tests/ssl-self-signed-error.png" alt="Error SSL autofirmado" style="width:60%;" >}}

| Error                                | Descripción                                                                                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CERT_CHAIN_TOO_LONG`                | La longitud de la cadena del certificado es superior a la profundidad máxima proporcionada.                                                                                                 |
| `CERT_HAS_EXPIRED`                   | El certificado ha caducado.                                                                                                                                              |
| `CERT_NOT_YET_VALID`                 | El certificado no es válido hasta una fecha futura.                                                                                                                        |
| `CERT_REJECTED`                      | La CA raíz está marcada para rechazar el propósito especificado.                                                                                                                   |
| `CERT_REVOKED`                       | El certificado ha sido revocado por el emisor.                                                                                                                               |
| `CERT_UNTRUSTED`                     | La CA raíz no está marcada como de confianza para su propósito previsto.                                                                                                           |
| `CERT_SIGNATURE_FAILURE`             | La firma del certificado no es válida.                                                                                                                           |
| `CRL_HAS_EXPIRED`                    | La lista de revocación de certificados (CRL) ha caducado.                                                                                                                       |
| `CRL_NOT_YET_VALID`                  | La lista de revocación de certificados (CRL) no es válida hasta una fecha futura.                                                                                                  |
| `CRL_SIGNATURE_FAILURE`              | La firma CRL del certificado no es válida.                                                                                                                       |
| `DEPTH_ZERO_SELF_SIGNED_CERT`        | El certificado pasado es autofirmado y no se puede encontrar el mismo certificado en lista de certificados de confianza.                                                      |
| `ERROR_IN_CERT_NOT_AFTER_FIELD`      | Hay un error de formato en el campo notAfter del certificado.                                                                                                        |
| `ERROR_IN_CERT_NOT_BEFORE_FIELD`     | Hay un error de formato en el campo notBefore del certificado.                                                                                                       |
| `ERROR_IN_CRL_LAST_UPDATE_FIELD`     | El campo CRL lastUpdate contiene una hora no válida.                                                                                                                       |
| `ERROR_IN_CRL_NEXT_UPDATE_FIELD`     | El campo CRL nextUpdate contiene una hora no válida.                                                                                                                       |
| `INVALID_CA`                         | Un certificado de CA no es válido porque no es una CA o sus extensiones no se corresponden con el propósito previsto.                                                     |
| `INVALID_PURPOSE`                    | El certificado proporcionado no se puede utilizar para los propósitos previstos.                                                                                               |
| `OUT_OF_MEM`                         | Se ha producido un error al asignar memoria.                                                                                                                               |
| `PATH_LENGTH_EXCEEDED`               | Se ha superado el parámetro de longitud de ruta basicConstraints.                                                                                                                  |
| `SELF_SIGNED_CERT_IN_CHAIN`          | Existe un certificado autofirmado en la cadena de certificados. La cadena de certificados se puede crear utilizando los certificados que no son de confianza, pero la CA raíz no se puede encontrar localmente. |
| `UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY` | No se puede leer la clave pública del certificado.                                                                                                                        |
| `UNABLE_TO_DECRYPT_CERT_SIGNATURE`   | No se ha podido descifrar la firma del certificado.                                                                                                                      |
| `UNABLE_TO_DECRYPT_CRL_SIGNATURE`    | No se puede descifrar la firma CRL. (No se puede determinar el valor real de la firma).                                                                                |
| `UNABLE_TO_GET_CRL`                  | No se encuentra la lista de revocación de certificados (CRL).                                                                                                                      |
| `UNABLE_TO_GET_ISSUER_CERT`          | No se ha podido encontrar el certificado de una de las autoridades de certificación (CA) de la jerarquía de firma y la aplicación local no confía en esa CA. Por ejemplo, este error puede producirse cuando la CA raíz autofirmada, pero no la CA intermedia, no aparece en la lista de certificados de confianza.               |
| `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`  | No se encuentra el certificado emisor de un certificado encontrado localmente. Esto suele significar que la lista de certificados de confianza no está completa. Por ejemplo, este error puede producirse cuando faltan la CA raíz autofirmada y la CA intermedia en la lista de certificados de confianza.                            |
| `UNABLE_TO_VERIFY_LEAF_SIGNATURE`    | No se verifica ninguna firma porque la cadena de certificados sólo contiene un certificado, que no es autofirmado, y el emisor no es de confianza.                         |