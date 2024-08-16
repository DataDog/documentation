---
algolia:
  category: Documentación
  rank: 70
  subcategory: Tests de API Synthetic
  tags:
  - grpc
  - test grpc
  - tests grpc
description: Simula solicitudes gRPC para monitorizar endpoints de API públicos e
  internos.
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentación de la monitorización Synthetic de Datadog
- link: https://www.datadoghq.com/blog/grpc-health-check-datadog-synthetic-monitoring/
  tag: Blog
  text: Monitorización de tus API gRPC con Datadog
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: Centro de aprendizaje
  text: Introducción a los tests Synthetic
- link: /synthetics/multistep
  tag: Documentación
  text: Solicitudes gRPC en cadena con tests de API de varios pasos
- link: /synthetics/private_locations
  tag: Documentación
  text: Ejecución de tests gRPC en endpoints internos
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Más información sobre los monitores de tests Synthetic
title: Tests GRPC
---
## Información general

Los tests gRPC te permiten monitorizar de forma proactiva tus servicios y sus servidores gRPC. Puedes elegir entre dos opciones:

Checks de comportamiento
: Envía solicitudes gRPC a los endpoints de API de tus aplicaciones para verificar las respuestas y las condiciones definidas, como el tiempo de respuesta general, la cabecera o el contenido del cuerpo.

Checks de estado 
Los checks de estado de gRPC son un estándar para informar sobre el estado de servicios gRPC. Determina si tus servidores y servicios gRPC responden, funcionan y son capaces de gestionar llamadas a procedimientos remotos (RPC).<br><br>Mediante la implementación de checks de estado de gRPC, puedes ejecutar tests de checks de estado de gRPC sin tener que proporcionar un archivo `.proto` a Datadog. Para obtener más información, consulta el [archivo `.proto` de checks de estado de ejemplo][1] compartido por la comunidad gRPC.

Los tests gRPC pueden ejecutarse tanto desde [localizaciones gestionadas](#select-locations) como de [localizaciones privadas][2] dependiendo de tu preferencia de ejecución de tests desde fuera o dentro de tu red. Los tests gRPC pueden ejecutarse de forma programada, bajo demanda o directamente dentro de tus [pipelines CI/CD][3].

## Configuración

Cuando decidas crear un test `gRPC`, define la solicitud de tu test.

### Definición de la solicitud

1. Especifica el **Host** y el **Puerto** donde se ejecutará el test. De forma predeterminada, el puerto gRPC es `50051`.
2. Selecciona **Check de comportamiento** para realizar una llamada unaria o **Check de estado** para realizar un check de estado. 

   {{< tabs >}}
   {{% tab "Check de comportamiento" %}}

   Para un check de comportamiento, especifica la **Reflexión del servidor** o [carga un **Archivo Proto**][101] que define tu servidor gRPC. Selecciona un método e incluye un mensaje de solicitud. Datadog no admite métodos de streaming.

   {{< img src="synthetics/api_tests/grpc_behavior_check_test.png" alt="Definir la solicitud gRPC" style="width:90%;" >}}

[101]: https://grpc.io/docs/what-is-grpc/introduction/#working-with-protocol-buffers

{{% /tab %}}
{{% tab "Check de estado" %}}

Para un check de estado, introduce el nombre del servicio. Deja este campo vacío, si quieres enviar un check de estado del servidor gRPC.

{{< img src="synthetics/api_tests/grpc_health_check_test.png" alt="Definir la solicitud gRPC" style="width:90%;" >}}

{{% /tab %}}
{{< /tabs >}}

3. Añade **Opciones avanzadas** (opcional) a tu test:

   {{< tabs >}}

   {{% tab "Opciones de solicitud" %}}

   * **Tiempo de espera**: Especifica la cantidad de tiempo en segundos antes de que se inicie un tiempo de espera en el test.
   * **Ignorar error de certificado del servidor**: Selecciona esta opción para que tu test gRPC continúe con la conexión, aunque se produzcan errores al validar el certificado SSL.
   * **Metadatos gRPC**: Añade y define metadatos para tu solicitud gRPC, para pasar metadatos entre servicios.

   {{% /tab %}}

   {{% tab "Autenticación" %}}

   * **Certificado de cliente**: Autentícate a través de mTLS cargando tu certificado de cliente (`.crt`) y la clave privada asociada (`.key`) en formato `PEM`.

     <br/> 

     Puedes utilizar la biblioteca `openssl` para convertir tus certificados. Por ejemplo, puedes convertir un certificado `PKCS12` en certificados y claves privadas en formato `PEM`.

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   {{% /tab %}}

   {{< /tabs >}}

3. **Pon un nombre** a tu test gRPC.

4. Añade **Etiquetas** (tags) `env` así como cualquier otra etiqueta a tu test gRPC. Luego, puedes utilizar estas etiquetas para filtrar tus tests Synthetic en la [página de monitorización y tests continuos Synthetic][4].

Haz clic en **Enviar** para probar la configuración de la solicitud. Aparecerá una vista previa de la respuesta en la parte derecha de la pantalla.

### Definir aserciones

Las aserciones definen cuál es el resultado esperado de un test. Después de hacer clic en **Enviar**, se añade una aserción `response time` basada en la respuesta obtenida. Debes definir al menos una aserción para que sea monitorizada por tu test.

{{< tabs >}}
{{% tab "Check de comportamiento" %}}

| Tipo | Operador | Tipo de valor |
|---|---|---|
| tiempo de respuesta | `is less than` | _Integer (ms)_ |
| Respuesta gRPC | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][1], [`xpath`][2] | _String_ <br> _[Regex][3]_ |
| Metadatos gRPC | `is`, `is not`, `contains`, `does not contain`, `matches regex`, `does not match regex`, `does not exist` | _Integer (ms)_ <br> _[Regex][3]_ |

Puedes crear hasta 20 aserciones por test de API haciendo clic en **Nueva aserción** o haciendo clic directamente en la vista previa de la respuesta:

{{< img src="synthetics/api_tests/assertions_grpc_behavior_check_blur.png" alt="Definir aserciones en las que tu test gRPC tenga éxito o falle" style="width:90%;" >}}

[1]: https://restfulapi.net/json-jsonpath/
[2]: https://www.w3schools.com/xml/xpath_syntax.asp
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

{{% /tab %}}
{{% tab "Check de salud" %}}

| Tipo | Operador | Tipo de valor |
|---|---|---|
| tiempo de respuesta | `is less than` | _Integer (ms)_ |
| estado del check de estado | `is`, `is not` | _Integer (ms)_ |
| Metadatos gRPC | `is`, `is not`, `contains`, `does not contain`, `matches regex`, `does not match regex`, `does not exist` | _Integer (ms)_ |

Puedes crear hasta 20 aserciones por test de API haciendo clic en **Nueva aserción** o haciendo clic directamente en la vista previa de la respuesta:

{{< img src="synthetics/api_tests/assertions_grpc_health_check.png" alt="Definir aserciones en las que tu test gRPC tenga éxito o falle" style="width:90%;" >}}

{{% /tab %}}
{{< /tabs >}}

Si un test no contiene una aserción en el cuerpo de la respuesta, la carga útil del cuerpo cae y devuelve un tiempo de respuesta asociado para la solicitud, dentro del límite de tiempo de espera establecido por el worker de Synthetics.

Si un test contiene una aserción en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparece un error `Assertions on the body/response cannot be run beyond this limit`.

### Seleccionar localizaciones

Selecciona las **Localizaciones** desde donde ejecutar tu test gRPC. Los tests gRPC pueden ejecutarse desde localizaciones gestionadas y también [privadas][2], en función de si prefieres ejecutar el test desde fuera o desde dentro de tu red.

{{% managed-locations %}} 

### Indicar la frecuencia del test

Los tests gRPC se pueden ejecutar:

* **De forma programada** para garantizar que los servicios más importantes siempre resulten accesibles para tus usuarios. Selecciona la frecuencia con la que quieres que Datadog ejecute tu test gRPC.
* [**En tus pipelines CI/CD**][3] para empezar a realizar envíos sin temer que un código defectuoso pueda afectar a la experiencia de tus clientes.
* **Bajo demanda** para ejecutar tus tests cuando sea más conveniente para tu equipo.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### Uso de variables

Puedes utilizar las [variables globales definidas en la página **Parámetros**][9] en la URL, las opciones avanzadas y las aserciones de tus tests gRPC.

Para visualizar tu lista de variables, escribe `{{` en el campo de tu elección.

## Fallo del test

Un test se considera `FAILED` si no satisface una o más aserciones o si la solicitud ha fallado prematuramente. En algunos casos, el test puede fallar sin comprobar las aserciones respecto al endpoint.

Entre las razones figuran las siguientes:

`gRPC specific errors`
: gRPC tiene una lista de códigos de estado específicos que se pueden encontrar en la [documentación oficial de gRPC][10].

`CONNRESET`
: El servidor remoto ha finalizado bruscamente la conexión. Entre las posibles causas se incluyen que el servidor web haya encontrado un error o falla al responder, o que se haya perdido la conectividad del servidor web.

`DNS`:
No se ha encontrado la entrada DNS para la URL del test. Entre las posibles causas se incluyen una URL de test mal configurada o una configuración incorrecta de las entradas DNS.

`INVALID_REQUEST` 
: La configuración del test no es válida (por ejemplo, un error tipográfico en la URL).

`SSL`
: No se ha podido realizar la conexión SSL. [Para obtener más información, consulta la página de errores específica][11].

`TIMEOUT`
: La solicitud no se ha podido completar en un plazo razonable. Pueden ocurrir dos tipos de `TIMEOUT`:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indica que la duración de la solicitud ha alcanzado el tiempo de espera definido en el test (por defecto se define en 60 segundos).
  Para cada solicitud, en la cascada de la red sólo se muestran las etapas completadas de la solicitud. Por ejemplo, en el caso de que sólo se muestre `Total response time`, el tiempo de espera se produjo durante la resolución DNS.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indica que la duración del test (solicitud + aserciones) alcanza la duración máxima de 60,5 segundos.

## Permisos

De manera predeterminada, sólo los usuarios con los roles de [administrador de Datadog y estándar de Datadog][12] pueden crear, editar y eliminar tests gRPC Synthetic. Para crear, editar y eliminar tests gRPC Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][12].

Si utilizas la función [rol personalizado][13], añade tu usuario a cualquier rol personalizado que incluya permisos de `synthetics_read` y `synthetics_write`.

## Restringir el acceso

La restricción del acceso está disponible para clientes que utilizan [roles personalizados][14] en sus cuentas.

Puedes restringir el acceso a un test de navegador en función de los roles de tu organización. Al crear un test de navegador, elige qué roles (además de tu usuario) pueden leer y escribir tu test.

{{< img src="synthetics/settings/restrict_access_1.png" alt="Definir permisos para tu test" style="width:70%;" >}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/grpc/grpc/blob/master/doc/health-checking.md
[2]: /es/synthetics/private_locations
[3]: /es/synthetics/cicd_testing
[4]: /es/synthetics/search/#search
[5]: /es/monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /es/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /es/synthetics/guide/synthetic-test-monitors
[9]: /es/synthetics/settings/#global-variables
[10]: https://grpc.github.io/grpc/core/md_doc_statuscodes.html
[11]: /es/synthetics/api_tests/errors/#ssl-errors
[12]: /es/account_management/rbac/
[13]: /es/account_management/rbac#custom-roles
[14]: /es/account_management/rbac/#create-a-custom-role