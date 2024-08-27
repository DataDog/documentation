---
algolia:
  category: Documentación
  rank: 70
  subcategory: Tests de API Synthetic
  tags:
  - ssl
  - test ssl
  - tests ssl
aliases:
- /es/synthetics/ssl_test
- /es/synthetics/ssl_check
description: Monitorizar tus certificados SSL desde distintas localizaciones internacionales
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentación de la monitorización Synthetic de Datadog
- link: /getting_started/synthetics/api_test
  tag: Documentación
  text: Empezando con los tests de API
- link: /synthetics/private_locations
  tag: Documentación
  text: Ejecutar tests SSL en endpoints internos
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Más información sobre los monitores de test Synthetic
title: Tests SSL
---

## Información general

Los tests SSL/TLS te permiten monitorizar proactivamente la validez y la caducidad de tus certificados SSL/TLS para garantizar las conexiones seguras entre tus servicios claves y los usuarios. Si tu certificado está a punto de caducar o está en riesgo, Datadog te envía una alerta con los detalles del error. De esta manera podrás identificar rápidamente la causa del problema y solucionarlo.

Los tests SSL pueden ejecutarse tanto desde [localizaciones gestionadas](#select-locations) como [privadas][1], dependiendo de si prefieres ejecutarlos desde fuera o dentro de tu red. Los tests SSL pueden ejecutarse de forma programada, bajo demanda o directamente dentro de tus [pipelines CI/CD][2].

## Configuración

Cuando decidas crear un test `SSL`, define la solicitud de tu test.

### Definición de la solicitud

1. Especifica el **Host** y el **Puerto** donde se ejecutará el test. De forma predeterminada, el puerto SSL es `443`.
2. Añade **Opciones avanzadas** (opcional) a tu test:
   * **Acepta certificados autofirmados**: Esta opción omite los errores de servidor relacionados con un certificado autofirmado.
   * **Falla si el certificado está revocado en el stapling OCSP**: Falla el test si el certificado está etiquetado como revocado por el stapling OCSP.
   * **Tiempo de espera**: Especifica la cantidad de tiempo en segundos antes de que se inicie un tiempo de espera en el test.
   * **Nombre de servidor**: Especifica en qué servidor quieres iniciar el enlace TLS. Esto permite que el servidor presente uno de los múltiples certificados posibles en la misma dirección IP y el mismo número de puerto TCP. Por defecto, el valor del **Host** se utiliza para rellenar el parámetro.
   * **Certificado de cliente**: Autentícate a través de mTLS cargando tu certificado de cliente (`.crt`) y la clave privada asociada (`.key`) en formato `PEM`.

   Puedes utilizar la biblioteca `openssl` para convertir tus certificados. Por ejemplo, puedes convertir un certificado `PKCS12` en certificados y claves privadas en formato `PEM`.

   ```
   openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
   openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
   ```

3. **Pon nombre** a tu test SSL.

4. Añade **Etiquetas** (tags) `env` así como cualquier otra etiqueta a tu test SSL. Luego, puedes utilizar estas etiquetas para filtrar tus tests Synthetic en la [página de monitorización y tests continuos Synthetic][3].

   {{< img src="synthetics/api_tests/ssl_test_config.png" alt="Definir la solicitud SSL" style="width:90%;" >}}

Haz clic en **URL del test** para probar la configuración de la solicitud. Aparecerá una vista previa de la respuesta en la parte derecha de la pantalla.

### Definición de aserciones

Las aserciones definen cuál es el resultado esperado de un test. Después de hacer clic en **URL del test**, se añaden aserciones básicas sobre la validez del certificado, la fecha de caducidad. la versión de TLS y el `response time` basadas en la respuesta obtenida. Debes definir al menos una aserción para que sea monitorizada por tu test.

| Tipo                  | Operador                                                                               | Tipo de valor                 |
|-----------------------|----------------------------------------------------------------------------------------|----------------------------|
| certificado           | `expires in more than`, `expires in less than`                                         | Entero (número de días) |
| propiedad              | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`       | Cadena <br> [Expresión regular][4] |
| tiempo de respuesta         | `is less than`                                                                         | Entero (ms)             |
| versión de TLS máxima   | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | Decimal                  |
| versión de TLS mínima   | `is more than`, `is more than or equal`                                                | Decimal                  |

Puedes crear hasta 20 aserciones por test de API haciendo clic en **Nueva aserción** o haciendo clic directamente en la vista previa de la respuesta:

{{< img src="synthetics/api_tests/assertions_ssl.png" alt="Definir aserciones en las que tu test SSL tenga éxito o falle" style="width:90%;" >}}

Para aplicar una lógica `OR` en una aserción, utiliza los comparadores `matches regex` o `does not match regex` para definir una expresión regular con varios valores esperados para el mismo tipo de aserción, como `(0|100)`. Se considera que el resultado del test tiene éxito si el valor de la aserción de la propiedad es 0 o 100.

Si un test no contiene una aserción en el cuerpo de la respuesta, la carga útil del cuerpo cae y devuelve un tiempo de respuesta asociado para la solicitud, dentro del límite de tiempo de espera establecido por el worker de Synthetics.

Si un test contiene una aserción en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparece un error `Assertions on the body/response cannot be run beyond this limit`.

### Seleccionar localizaciones

Selecciona las **Localizaciones** desde donde ejecutar tu test SSL. Los tests SSL pueden ejecutarse desde localizaciones gestionadas y también [privadas][1], en función de si prefieres monitorizar los certificados desde fuera o desde dentro de tu red.

{{% managed-locations %}} 

### Indicar la frecuencia del test

Los tests SSL se pueden ejecutar:

* **De forma programada** para garantizar que los certificados SSL/TLS siempre son válidos y que los usuarios de tus servicios claves tienen una conexión segura. Selecciona la frecuencia con la que quieres que Datadog ejecute tu test SSL.
* [**Dentro de tus pipelines CI/CD**][2].
* **Bajo demanda** para ejecutar tus tests cuando sea más conveniente para tu equipo.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### Uso de variables

Puedes utilizar las [variables globales definidas en la página **Parámetros**][9] en la URL, las opciones avanzadas y las aserciones de tus tests SSL.

Para visualizar tu lista de variables, escribe `{{` en el campo de tu elección.

## Fallo del test

Un test se considera `FAILED` si no satisface una o más aserciones o si la solicitud ha fallado prematuramente. En algunos casos, el test puede fallar sin comprobar las aserciones respecto al endpoint.

Entre las razones figuran las siguientes:

`CONNRESET`
: El servidor remoto ha cerrado bruscamente la conexión. Entre las posibles causas se incluyen que el servidor web haya encontrado un error o falla al responder, o que se haya perdido la conectividad del servidor web.

`DNS`:
No se ha encontrado la entrada DNS para la URL del test. Entre las posibles causas se incluyen una URL de test mal configurada o una configuración incorrecta de las entradas DNS.

`INVALID_REQUEST` 
: La configuración del test no es válida (por ejemplo, un error tipográfico en la URL).

`SSL`
: No se ha podido realizar la conexión SSL. [Para obtener más información, consulta la página de errores específica][10].

`TIMEOUT`
: La solicitud no se ha podido completar en un plazo razonable. Pueden ocurrir dos tipos de `TIMEOUT`:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indica que la duración de la solicitud ha alcanzado el tiempo de espera definido en el test (por defecto se establece en 60 segundos).
  Para cada solicitud, en la cascada de la red sólo se muestran las etapas completadas de la solicitud. Por ejemplo, en el caso de que sólo se muestre `Total response time`, el tiempo de espera se produjo durante la resolución DNS.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indica que la duración del test (solicitud + aserciones) alcanza la duración máxima (60,5 segundos).

## Permisos

De manera predeterminada, sólo los usuarios con los roles de [administrador de Datadog y estándar de Datadog][11] pueden crear, editar y eliminar tests SSL Synthetic. Para crear, editar y eliminar tests SSL Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][11].

Si estás utilizando la [función de rol personalizado][12], añade tu usuario a cualquier rol que incluya permisos `synthetics_read` y `synthetics_write`.

### Restringir el acceso

La restricción del acceso está disponible para clientes que utilizan [roles personalizados][13] en sus cuentas.

Puedes restringir el acceso a un test SSL en función de los roles de tu organización. Al crear un test SSL, elige qué roles (además de tu usuario) pueden leer y escribir tu test.

{{< img src="synthetics/settings/restrict_access_1.png" alt="Definir permisos para tu test" style="width:70%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/private_locations
[2]: /es/synthetics/cicd_integrations
[3]: /es/synthetics/search/#search
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[5]: /es/monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /es/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /es/synthetics/guide/synthetic-test-monitors
[9]: /es/synthetics/settings/#global-variables
[10]: /es/synthetics/api_tests/errors/#ssl-errors
[11]: /es/account_management/rbac/
[12]: /es/account_management/rbac#custom-roles
[13]: /es/account_management/rbac/#create-a-custom-role