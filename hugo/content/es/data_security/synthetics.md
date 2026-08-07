---
aliases:
- /es/synthetics/security/
further_reading:
- link: /data_security/
  tag: Documentación
  text: Revisar las principales categorías de datos enviados a Datadog
title: Seguridad de los datos en la monitorización Synthetic
---

<div class="alert alert-info">En esta página hablamos sobre la seguridad de los datos que se envían a Datadog. Si estás buscando productos y funciones para proteger las aplicaciones y las soluciones en la nube, consulta la sección <a href="/security/" target="_blank">Seguridad</a>.</div>

El [producto de monitorización Synthetic][2] permite monitorizar de forma proactiva el rendimiento de tus sistemas y aplicaciones mediante solicitudes y transacciones de negocio simuladas. Es posible realizar los tests Synthetic desde cualquier lugar del mundo, ya sea desde localizaciones gestionadas o privadas.

## Seguridad de la información

### Cifrado en localizaciones gestionadas

#### Configuraciones y variables de los tests

* **Transport** (Transporte): cifrado asimétrico - RSA (clave de 4096 bits). Todas las solicitudes se firman con Datadog Signature v1 (basado en el mismo proceso de firma que [AWS Signature v4][3]), lo que garantiza tanto la autenticación como la integridad.
* **Storage** (Almacenamiento): cifrado simétrico - AES-GCM (clave de 256 bits).

#### Resultados de los tests

* **Transport** (Transporte): cifrado asimétrico - RSA (clave de 4096 bits). Todas las solicitudes se firman con Datadog Signature v1 (basado en el mismo proceso de firma que [AWS Signature v4][3]), lo que garantiza tanto la autenticación como la integridad.
* **Storage** (Almacenamiento): las partes confidenciales (encabezados y cuerpo de la respuesta) de los resultados de los tests se almacenan cifradas con un cifrado asimétrico RSA (clave de 4096 bits) y se descifran instantáneamente cuando se recuperan los resultados de los tests.

#### Artefactos

Los artefactos son capturas de pantalla, snapshots, errores y recursos de los tests del navegador.

{{< site-region region="us,us3,us5,gov,ap1" >}}

* **Storage** (Almacenamiento): cifrado para [buckets de Amazon S3][1].
* **Transport** (Transporte): cifrado en tránsito con [AWS Signature v4 para Amazon S3][2].

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/network-isolation.html

{{< /site-region >}}

{{< site-region region="eu" >}}

* **Storage** (Almacenamiento): cifrado a través de [cuentas de servicio en GCS][1] (utilizando [AES256][2]).
* **Transport** (Transporte): cifrado en tránsito mediante [la autenticación, la integridad y el cifrado para GCS][3].

[1]: https://cloud.google.com/storage/docs/encryption/customer-managed-keys
[2]: https://cloud.google.com/security/encryption-at-rest/default-encryption
[3]: https://cloud.google.com/security/encryption-in-transit/resources/encryption-in-transit-whitepaper.pdf

{{< /site-region >}}

### Cifrado en localizaciones privadas

#### Credenciales de localizaciones privadas

* **Storage** (Almacenamiento): las credenciales de localizaciones privadas utilizadas para firmar las solicitudes de configuración de tests, las variables y los resultados de tests se almacenan cifradas (cifrado simétrico - AES-GCM), con logs de auditoría y políticas de acceso.

#### Configuraciones y variables de los tests

* **Transport** (Transporte): cifrado asimétrico - RSA (clave de 4096 bits). La comunicación entre las localizaciones privadas y Datadog se protege mediante Datadog Signature v1 (basado en el mismo proceso de firma que [AWS Signature v4][3]), lo que permite asegurar tanto la autenticación como la integridad.
* **Storage** (Almacenamiento): cifrado simétrico - AES-GCM (clave de 256 bits).

#### Resultados de los tests

* **Transport** (Transporte): cifrado asimétrico - RSA (clave de 4096 bits). La comunicación entre las localizaciones privadas y Datadog se protege mediante Datadog Signature v1 (basado en el mismo proceso de firma que [AWS Signature v4][3]), lo que permite asegurar tanto la autenticación como la integridad.

* **Storage** (Almacenamiento): las partes confidenciales (por defecto, los encabezados y el cuerpo de la respuesta) de los resultados de los tests se almacenan cifradas con un cifrado asimétrico - RSA (clave de 4096 bits) y se descifran instantáneamente cuando se recuperan los resultados de los tests.

#### Artefactos

Los artefactos son capturas de pantalla, snapshots, errores y recursos de los tests del navegador.

{{< site-region region="us,us3,us5,gov,ap1" >}}

* **Storage** (Almacenamiento): cifrado para [AWS][1].
* **Transport** (Transporte): transporte HTTPS entre la localización privada y Datadog (autenticación mediante clave API), luego desde Datadog al almacenamiento: cifrado en tránsito mediante [AWS Signature v4 para Amazon S3][2].

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/network-isolation.html

{{< /site-region >}}

{{< site-region region="eu" >}}

* **Storage** (Almacenamiento): cifrado a través de [cuentas de servicio en GCS][1] (utilizando [AES256][2]).
* **Transport** (Transporte): transporte HTTPS entre la localización privada y Datadog (autenticación mediante clave API), luego desde Datadog al almacenamiento: cifrado en tránsito mediante [la autenticación, la integridad y el cifrado para GCS][3].

[1]: https://cloud.google.com/storage/docs/encryption/customer-managed-keys
[2]: https://cloud.google.com/security/encryption-at-rest/default-encryption
[3]: https://cloud.google.com/security/encryption-in-transit/resources/encryption-in-transit-whitepaper.pdf

{{< /site-region >}}

## Tests de cuentas

Recomendamos encarecidamente aprovechar las cuentas exclusivas para la realización de tests para tus tests Synthetic.

## Almacenamiento de secretos

Puedes almacenar secretos en [variables globales][4] con la función de enmascarar para asegurarte de que los valores de las variables globales no se filtren en las configuraciones y resultados de tus tests. El acceso a las variables globales se puede restringir mediante los [permisos RBAC para variables globales][5] específicos.

## Opciones de privacidad

Para limitar la cantidad de datos almacenados en los resultados de los tests, utiliza las opciones [API][6], la [API multipaso][7] y las [opciones de privacidad de los tests de navegador][8]. Sin embargo, ten cuidado con el uso de estas opciones, ya que activarlas puede dificultar la resolución de problemas.

### Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_security/
[2]: /es/synthetics/
[3]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html
[4]: /es/synthetics/settings/?tab=specifyvalue#global-variables
[5]: /es/account_management/rbac/permissions/#synthetic-monitoring
[6]: /es/synthetics/api_tests/http_tests?tab=privacy#define-request
[7]: /es/synthetics/multistep?tab=privacy#define-the-request
[8]: /es/synthetics/browser_tests/?tab=privacy#test-configuration