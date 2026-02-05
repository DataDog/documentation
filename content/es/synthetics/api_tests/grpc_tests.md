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

Puedes crear un test utilizando una de las siguientes opciones:

   - **Crea un test a partir de una plantilla**:

       1. Pasa el ratón por encima de una de las plantillas ya rellenadas y haz clic en **View Template** (Ver plantilla). Se abrirá un panel lateral en el que se mostrará la información de configuración rellenada previamente, que incluye: detalles de tests, detalles de solicitudes, aserciones, condiciones de alerta y parámetros de monitor. 
       2. Haz clic en **+Create Test** (+Crear test) para abrir la página **Definir solicitud**, en la que podrás revisar y editar las opciones de configuración rellenadas previamente. Los campos presentados son idénticos a aquellos disponibles cuando se crea un test desde cero.
       3. Haz clic en **Save Details** (Guardar detalles) para enviar tu test de API. <br /><br>
          {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Vídeo de la página de inicio del test de la API Synthetics" video="true" >}}

   - **Crea un test desde cero**:

       1. Para crear un test desde cero, haz clic en la plantilla **+ Start from scratch** (+ Empezar desde cero) y selecciona el tipo de solicitud `gRPC`.
       2. Especifica el **Host** y el **Puerto** donde se ejecutará el test. De forma predeterminada, el puerto gRPC es `50051`.
       3. Selecciona **Check de comportamiento** para realizar una llamada unaria o **Check de estado** para realizar un check de estado.<br /><br>

      {{< tabs >}}
      {{% tab "Check de comportamiento" %}}

Para un check de comportamiento, especifica la **Reflexión del servidor** o [carga un **Archivo Proto**][101] que define tu servidor gRPC. Selecciona un método e incluye un mensaje de solicitud. Datadog no admite métodos de streaming.<br /><br>

{{< img src="synthetics/api_tests/grpc_behavior_check_test_2.png" alt="Definir la solicitud gRPC" style="width:90%;" >}}

[101]: https://grpc.io/docs/what-is-grpc/introduction/#working-with-protocol-buffers

      {{% /tab %}}
      {{% tab "Check de estado" %}}

Para un check de estado, introduce el nombre del servicio. Deja este campo vacío, si quieres enviar un check de estado del servidor gRPC.<br /><br>

{{< img src="synthetics/api_tests/grpc_health_check_test_2.png" alt="Definir la solicitud gRPC" style="width:90%;" >}}

      {{% /tab %}}
      {{< /tabs >}}

   4. Añade **Opciones avanzadas** (opcional) a tu test:

      {{< tabs >}}
      {{% tab "Opciones de solicitud" %}}

- **Tiempo de espera**: Especifica la cantidad de tiempo en segundos antes de que se inicie un tiempo de espera en el test.
- **Ignorar error de certificado del servidor**: Selecciona esta opción para que tu test gRPC continúe con la conexión, aunque se produzcan errores al validar el certificado SSL.
- **Metadatos gRPC**: Añade y define metadatos para tu solicitud gRPC, para pasar metadatos entre servicios.

      {{% /tab %}}
      {{% tab "Autenticación" %}}

- **Certificado de cliente**: Autentícate a través de mTLS cargando tu certificado de cliente (`.crt`) y la clave privada asociada (`.key`) en formato `PEM`.

<br/>

Puedes utilizar la biblioteca `openssl` para convertir tus certificados. Por ejemplo, puedes convertir un certificado `PKCS12` en certificados y claves privadas en formato `PEM`.

```bash
   openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
   openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
```

      {{% /tab %}}
      {{< /tabs >}}

   5. **Pon un nombre** a tu test gRPC.

   6. Añade **etiquetas** (tags) de entorno así como cualquier otra etiqueta a tu test gRPC. A continuación, puedes utilizar estas etiquetas para filtrar tus tests Synthetic en la [página de monitorización Synthetic y tests continuos][4]. 

   7. Haz clic en **Invoke** (Invocar) para probar la configuración de la solicitud. Aparecerá una vista previa de la respuesta en la parte derecha de la pantalla.

   8. Haz clic en **Create Test** (Crear test) para enviar tu test de API.

### Fragmentos

{{% synthetics-api-tests-snippets %}}

### Definición de aserciones

Las aserciones definen cuál es el resultado esperado de un test. Después de hacer clic en **Enviar**, se añade una aserción `response time` basada en la respuesta obtenida. Debes definir al menos una aserción para que sea monitorizada por tu test.

{{< tabs >}}
{{% tab "Check de comportamiento" %}}

| Tipo | Operador | Tipo de valor |
|---|---|---|
| tiempo de respuesta | `is less than` | _Entero (ms)_ |
| Respuesta gRPC | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][1], [`xpath`][2] | Cadena <br> [Expresión regular][3] |
| Metadatos gRPC | `is`, `is not`, `contains`, `does not contain`, `matches regex`, `does not match regex`, `does not exist` | Entero <br> [Expresión regular][3] |

Puedes crear hasta 20 aserciones por test de API haciendo clic en **Nueva aserción** o haciendo clic directamente en la vista previa de la respuesta:

{{< img src="synthetics/api_tests/assertions_grpc_behavior_check_blur.png" alt="Definir aserciones en las que tu test gRPC tenga éxito o falle" style="width:90%;" >}}

[1]: https://restfulapi.net/json-jsonpath/
[2]: https://www.w3schools.com/xml/xpath_syntax.asp
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

{{% /tab %}}
{{% tab "Check de salud" %}}

| Tipo | Operador | Tipo de valor |
|---|---|---|
| tiempo de respuesta | `is less than` | _Entero (ms)_ |
| estado del check de estado | `is`, `is not` | _Entero (ms)_ |
| Metadatos gRPC | `is`, `is not`, `contains`, `does not contain`, `matches regex`, `does not match regex`, `does not exist` | _Entero (ms)_ |

Puedes crear hasta 20 aserciones por test de API haciendo clic en **Nueva aserción** o haciendo clic directamente en la vista previa de la respuesta:

{{< img src="synthetics/api_tests/assertions_grpc_health_check.png" alt="Definir aserciones en las que tu test gRPC tenga éxito o falle" style="width:90%;" >}}

{{% /tab %}}{{< /tabs >}}

Si un test no contiene una aserción en el cuerpo de la respuesta, la carga útil del cuerpo cae y devuelve un tiempo de respuesta asociado para la solicitud dentro del límite de tiempo de espera establecido por el worker de Synthetics.

Si un test contiene una aserción en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparecerá el error `Assertions on the body/response cannot be run beyond this limit`.

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

### Usar variables

Puedes utilizar las [variables globales definidas en la página **Parámetros**][9] en la URL, las opciones avanzadas y las aserciones de tus tests gRPC.

Para visualizar tu lista de variables, escribe `{{` en el campo de tu elección.

## Fallo del test

Un test se considera `FAILED` si no satisface una o más aserciones o si la solicitud ha fallado prematuramente. En algunos casos, el test puede fallar sin comprobar las aserciones respecto al endpoint.

Para obtener una lista completa de los códigos de error de gRPC, consulta [Errores de test de la API][10].

## Permisos

De manera predeterminada, solo los usuarios con los roles de [administrador de Datadog y estándar de Datadog][11] pueden crear, editar y eliminar tests gRPC Synthetic. Para crear, editar y eliminar tests gRPC Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][11].

Si estás utilizando la [función de rol personalizado][12], añade tu usuario a cualquier rol que incluya permisos `synthetics_read` y `synthetics_write`.

### Restringir el acceso

{{% synthetics_grace_permissions %}}

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
[10]: /es/synthetics/api_tests/errors/#grpc-errors
[11]: /es/account_management/rbac/
[12]: /es/account_management/rbac#custom-roles