---
description: Encadene solicitudes para monitorear transacciones sofisticadas en sus
  servicios clave.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-with-datadog/
  tag: Blog
  text: Monitoree sus flujos de trabajo con pruebas de API en varios pasos de Datadog
- link: /synthetics/guide/version_history/
  tag: Guía
  text: Historial de versiones de Synthetic Monitoring
- link: /synthetics/private_locations
  tag: Documentación
  text: Ejecute pruebas de API en varios pasos en puntos de conexión internos
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Obtenga información sobre los monitores de prueba Synthetic
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Sitio externo
  text: Cree y gestione pruebas Synthetic de API en varios pasos con Terraform
- link: /synthetics/guide/export-tests-to-terraform
  tag: Guía
  text: Exporte pruebas Synthetic de API a Terraform
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centro de aprendizaje
  text: Introducción a Synthetic Monitoring y a las pruebas en navegadores
title: Pruebas de API de varios pasos
---
## Descripción general {#overview}

Las pruebas de API en varios pasos le permiten encadenar varias [pruebas de API][1] a la vez para monitorear de forma proactiva y garantizar que los recorridos sofisticados en sus servicios clave estén disponibles en cualquier momento y desde cualquier lugar. Si desea realizar solicitudes únicas a sus servicios, utilice [pruebas de API][1].

Puede lograr lo siguiente:

* Ejecute solicitudes HTTP en puntos de conexión de API que requieran autenticación (por ejemplo, mediante un token)
* Monitoree transacciones comerciales clave a nivel de API
* Simule recorridos de aplicaciones móviles de extremo a extremo

{{< img src="synthetics/multistep_tests/multistep_test_steps.png" alt="Varios pasos de prueba en una prueba de API en varios pasos" style="width:90%;" >}}

Si uno de sus servicios comienza a responder más lentamente, o de una manera inesperada (por ejemplo, un cuerpo de respuesta o código de estado inesperado), su prueba puede [**alertar a su equipo**][2], [**bloquear su canalización de CI**][3] o incluso [**revertir la implementación defectuosa**][3].

Las pruebas de API en varios pasos pueden ejecutarse desde ubicaciones [administradas](#select-locations) y [privadas][4] de Datadog, lo que permite una **cobertura total de sus sistemas**, tanto externos como internos.

## Configuración {#configuration}

### Nombre y etiquete su prueba {#name-and-tag-your-test}

1. Nombre su prueba de API en varios pasos.
2. Agregue `env` y otras etiquetas a su prueba de API en varios pasos. Puede usar estas etiquetas para filtrar sus pruebas Synthetic en la [página Synthetic Monitoring & Continuous Testing][5].

### Seleccione ubicaciones {#select-locations}

Seleccione el {{< ui >}}Locations{{< /ui >}} para su prueba de API en varios pasos. Las pruebas de API en varios pasos pueden ejecutarse desde ubicaciones administradas y [privadas][4] según su preferencia para ejecutar la prueba desde fuera o dentro de su red.

{{% managed-locations %}} 

### Defina los pasos {#define-steps}

Para crear un paso de solicitud de API, haga clic en {{< ui >}}Create Your First Step{{< /ui >}}.

{{< img src="synthetics/api_tests/ms_create_request.png" alt="Cree las solicitudes de su prueba de API en varios pasos" style="width:90%;" >}}

De forma predeterminada, puede crear hasta 10 pasos de prueba. Para aumentar este límite, contacte a <a href="https://docs.datadoghq.com/help/">Datadog Support</a>.

#### Defina la solicitud {#define-the-request}

1. **Nombre** su paso.
2. Elija un tipo de solicitud:
   
   {{< tabs >}}
   {{% tab "HTTP" %}}

   Consulte la [documentación de pruebas HTTP][101] para crear una solicitud HTTP y agregar aserciones para una comprobación de comportamiento o una comprobación de estado. Las aserciones son opcionales en las pruebas de API en varios pasos.

   [101]: /synthetics/api_tests/http_tests/

   {{% /tab %}}
   {{% tab "gRPC" %}}

   Consulte la [documentación de pruebas gRPC][102] para crear una solicitud gRPC y agregar aserciones para una comprobación de comportamiento o una comprobación de estado. Las aserciones son opcionales en las pruebas de API en varios pasos.

   [102]: /synthetics/api_tests/grpc_tests/

   {{% /tab %}}

   {{% tab "SSL" %}}

   Consulte la [documentación de pruebas SSL][103] para crear una solicitud SSL y agregar aserciones para una comprobación de comportamiento o una comprobación de estado. Las aserciones son opcionales en las pruebas de API en varios pasos.

   [103]: /synthetics/api_tests/ssl_tests/

   {{% /tab %}}

   {{% tab "DNS" %}}

   Consulte la [documentación de pruebas DNS][104] para crear una solicitud DNS y agregar aserciones para una comprobación de comportamiento o una comprobación de estado. Las aserciones son opcionales en las pruebas de API en varios pasos.

   [104]: /synthetics/api_tests/dns_tests/

   {{% /tab %}}

   {{% tab "WebSocket" %}}

   Consulte la [documentación de pruebas WebSocket][105] para crear una solicitud WebSocket y agregar aserciones para una comprobación de comportamiento o una comprobación de estado. Las aserciones son opcionales en las pruebas de API en varios pasos.

   [105]: /synthetics/api_tests/websocket_tests/

   {{% /tab %}}

   {{% tab "TCP" %}}

   Consulte la [documentación de pruebas TCP][106] para crear una solicitud TCP y agregar aserciones para una comprobación de comportamiento o una comprobación de estado. Las aserciones son opcionales en las pruebas de API en varios pasos.

   [106]: /synthetics/api_tests/tcp_tests/

   {{% /tab %}}

   {{% tab "UDP" %}}

   Consulte la [documentación de pruebas UDP][107] para crear una solicitud UDP y agregar aserciones para una comprobación de comportamiento o una comprobación de estado. Las aserciones son opcionales en las pruebas de API en varios pasos.

   [107]: /synthetics/api_tests/udp_tests/

   {{% /tab %}}

   {{% tab "ICMP" %}}

   Consulte la [documentación de pruebas ICMP][108] para crear una solicitud ICMP y agregar aserciones para una comprobación de comportamiento o una comprobación de estado. Las aserciones son opcionales en las pruebas de API en varios pasos.

   [108]: /synthetics/api_tests/icmp_tests/

   {{% /tab %}}

   {{< /tabs >}}

### Agregue la configuración de ejecución {#add-execution-settings}

En {{< ui >}}Execution Settings{{< /ui >}}, están disponibles las siguientes opciones:

#### Éxito del paso: {#step-success}

Haga clic en {{< ui >}}If step succeeds, continue to next step{{< /ui >}} para permitir que su prueba continúe con los pasos siguientes después de pasos exitosos.  

{{< img src="synthetics/multistep_tests/multistep_test_success.png" alt="Captura de pantalla de la configuración de ejecución que muestra las opciones para continuar al siguiente paso cuando el paso se completa con éxito" style="width:90%;" >}}

Haga clic en {{< ui >}}If step succeeds, exit test and mark it as passed{{< /ui >}} para salir de la prueba después de completar un paso con éxito. Esto evita ejecutar pasos innecesarios y evita marcar la prueba como fallida. 

{{< img src="synthetics/multistep_tests/multistep_execution_settings.png" alt="Captura de pantalla de la configuración de ejecución que muestra la opción de salir y marcar la prueba como aprobada cuando el paso se completa con éxito" style="width:90%;" >}}

#### Error del paso {#step-failure}

Haga clic en {{< ui >}}If step fails, continue to next step{{< /ui >}} para continuar con los pasos siguientes después de un error en el paso. Cuando selecciona esta opción, aparece un menú {{< ui >}}and mark test as{{< /ui >}}. Mantenga {{< ui >}}failed{{< /ui >}} (seleccionado de forma predeterminada) para que la prueba falle cuando este paso falle. Seleccione {{< ui >}}passed{{< /ui >}} para que un error en este paso no haga que la prueba falle.

Continuar después de un paso fallido puede ser útil para tareas de limpieza cuando desea que los pasos siguientes continúen. Por ejemplo, una prueba crea un recurso, realiza varias acciones en él y luego lo elimina.

En caso de que uno de los pasos intermedios falle, desea tener esta configuración habilitada en cada paso intermedio para asegurarse de que el recurso se elimine al final de la prueba y que no se creen falsos positivos.

La prueba genera una alerta si un punto de conexión no responde como se espera. Su prueba puede activar reintentos X veces después de Y ms en caso de un resultado de prueba fallido. Personalice el intervalo de reintento para adaptarlo a su sensibilidad de alerta.

{{< img src="synthetics/multistep_tests/step_failure.png" alt="Captura de pantalla de la configuración de ejecución que muestra el error del paso" style="width:90%;" >}}

#### Extraiga variables de la respuesta {#extract-variables-from-the-response}

Opcionalmente, extraiga variables de la respuesta de su solicitud de API mediante el parseo de sus encabezados o su cuerpo. El valor de la variable se actualiza cada vez que se ejecuta el paso de solicitud de API.

Para comenzar el parseo de una variable, haga clic en {{< ui >}}Extract a variable from response content{{< /ui >}}:

1. Ingrese un {{< ui >}}Variable Name{{< /ui >}}. El nombre de su variable solo puede usar letras mayúsculas, números y guiones bajos, y debe tener al menos tres caracteres.
2. Decida si desea extraer su variable de los encabezados de respuesta o del cuerpo de respuesta.

   * Extraiga el valor de {{< ui >}}response header{{< /ui >}}: utilice el encabezado de respuesta completo de su solicitud de API como valor de la variable o analícelo con un [`regex`][8].
   * Extraiga el valor de {{< ui >}}response body{{< /ui >}}: utilice el cuerpo de respuesta completo de su solicitud de API como valor de la variable o analícelo con un [`regex`][8], un [`JSONPath`][6] o un [`XPath`][7].

{{< img src="synthetics/api_tests/ms_extract_variable.png" alt="Extraiga variables de solicitudes de API en una prueba de API en varios pasos" style="width:90%;" >}}

Puede extraer hasta diez variables por paso de prueba. Una vez creada, esta variable puede utilizarse en los siguientes pasos de su prueba de API en varios pasos. Para obtener más información, consulte [Usar variables](#use-variables).

### Especifique la frecuencia de la prueba {#specify-test-frequency}

Las pruebas de API en varios pasos pueden ejecutarse:

* **Según un horario** para garantizar que sus puntos de conexión más importantes estén siempre accesibles para sus usuarios. Seleccione la frecuencia con la que desea que Datadog ejecute su prueba de API en varios pasos.
* [**Dentro de sus canalizaciones de CI/CD**][3] para comenzar a realizar entregas sin temor a que un código defectuoso pueda afectar la experiencia de sus clientes.
* **Bajo demanda** para ejecutar sus pruebas cuando tenga más sentido para sus equipos.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

{{% synthetics-variables %}}

### Extraer variables {#extract-variables}

Además de crear variables locales, puede [extraer variables de cualquier paso](#extract-variables-from-the-response) de su prueba de API en varios pasos y [volver a inyectar los valores en pasos posteriores](#use-variables).

### Usar variables {#use-variables}

Puede utilizar las [variables globales definidas en el {{< ui >}}Settings{{< /ui >}}][13] y las [variables definidas localmente](#create-local-variables) en la URL, las opciones avanzadas y las aserciones de sus pruebas de API.

Para mostrar su lista de variables, escriba `{{` en el campo deseado.

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Uso de variables en pruebas de API de varios pasos" video="true" width="90%" >}}

### Subpruebas {#subtests}

Las pruebas de API de varios pasos admiten subpruebas, lo que le permite reutilizar pruebas de API de varios pasos existentes o extraer pasos en componentes reutilizables. Puede anidar subpruebas hasta con dos niveles de profundidad.

Los pasos de las subpruebas tienen un límite de 60 segundos. Se agota el tiempo de espera de un paso de subprueba si la duración combinada de los pasos de la subprueba, incluidos los pasos de espera, supera los 60 segundos. Esto puede suceder incluso cuando la subprueba pasa como una prueba independiente.

- **Reintentos**: cada reintento del paso de la subprueba dispone de otros 60 segundos.
- **Ubicaciones privadas**: la configuración `apiRequestMaxTimeout` controla este límite, en milisegundos (predeterminado: `60000`). Consulte la sección [Configuración avanzada][20] de la página de configuración de ubicaciones privadas.

Para ejecutar un flujo que tarde más de 60 segundos, divídalo en varios pasos de subprueba o agregue sus pasos directamente a la prueba principal.

Para usar una prueba de API en varios pasos existente como subprueba, haga clic en {{< ui >}}Subtest{{< /ui >}}, vaya a la pestaña {{< ui >}}From Existing Test{{< /ui >}} y seleccione una prueba de API en varios pasos en el menú desplegable.

Para convertir pasos de su prueba de API en varios pasos actual en una subprueba, haga clic en la pestaña {{< ui >}}Extract From Steps{{< /ui >}}, seleccione los pasos grabados que desea extraer y haga clic en {{< ui >}}Convert to Subtest{{< /ui >}}.

{{< img src="synthetics/multistep_tests/subtest.png" alt="Interfaz de usuario para agregar una subprueba a una prueba de API en varios pasos" width="60%" >}}

Para anular una variable de subprueba en una prueba de API en varios pasos, defínala en la prueba principal usando el mismo nombre. Una variable siempre usa el primer valor que se le asigna.

Si no necesita ejecutar una subprueba de forma independiente, puede pausarla. Aún se ejecuta como parte de la prueba de API en varios pasos, pero no se ejecuta por sí sola.

**Nota:** Solo se pueden agregar pruebas de API de varios pasos como subpruebas. No se admite el uso de [pruebas de API][1] como subpruebas.

## Falla de prueba {#test-failure}

Una prueba se considera `FAILED` si un paso no cumple con una o varias aserciones o si la solicitud de un paso falló prematuramente. Un paso fallido no hace que la prueba falle cuando su opción {{< ui >}}and mark test as{{< /ui >}} está establecida en {{< ui >}}passed{{< /ui >}}. Para obtener más información, consulte la sección [Error de paso](#step-failure). En algunos casos, la prueba falla antes de que pueda verificar las aserciones con el punto de conexión. Estas razones incluyen:

`CONNREFUSED`
: No se pudo establecer ninguna conexión porque la máquina de destino la rechazó activamente.

`CONNRESET`
: El servidor remoto cerró abruptamente la conexión. Las posibles causas incluyen que el servidor web encuentre un error o se bloquee al responder, o la pérdida de conectividad del servidor web.

`DNS`
: No se encontró la entrada DNS para la URL de la prueba. Las posibles causas incluyen una URL de prueba mal configurada o una configuración incorrecta de las entradas DNS.

`INVALID_REQUEST` 
: La configuración de la prueba no es válida (por ejemplo, un error tipográfico en la URL).

`SSL`
: No se pudo realizar la conexión SSL. [Consulte la página de error dedicada para obtener más información][14].

`TIMEOUT`
: La solicitud no pudo completarse en un tiempo razonable. Pueden ocurrir dos tipos de `TIMEOUT`:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indica que la duración de la solicitud alcanzó el tiempo de espera definido para la prueba (el valor predeterminado es 60 s). 
  Para cada solicitud, solo se muestran las etapas completadas de la solicitud en la cascada de red. Por ejemplo, si solo se muestra `Total response time`, se agotó el tiempo de espera durante la resolución de DNS.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indica que la duración de la solicitud y las aserciones alcanzó la duración máxima (30 minutos).

Para obtener una lista completa de otros códigos de error de pruebas de API, consulte [API Testing Errors][19].

## Permisos {#permissions}

De forma predeterminada, solo los usuarios con los [roles Datadog Admin y Datadog Standard][16] pueden crear, editar y eliminar pruebas de API en varios pasos de Synthetic Monitoring. Para obtener acceso para crear, editar y eliminar pruebas de API en varios pasos de Synthetic Monitoring, asigne a su usuario uno de esos dos [roles predeterminados][16].

Si utiliza la [función de roles personalizados][17], agregue su usuario a cualquier rol personalizado que incluya los permisos `synthetics_read` y `synthetics_write` para Synthetic Monitoring.

### Restringir acceso {#restrict-access}

La restricción de acceso está disponible para los clientes que utilizan [roles personalizados][18] en sus cuentas.

Puede restringir el acceso a una prueba de API en varios pasos según los roles de su organización. Al crear una prueba de API en varios pasos, elija qué roles (además de su usuario) pueden leer y escribir su prueba. 

{{< img src="synthetics/settings/restrict_access_1.png" alt="Establecer permisos para su prueba" style="width:70%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/api_tests/
[2]: /es/synthetics/api_tests/http_tests?tab=requestoptions#configure-the-test-monitor
[3]: /es/synthetics/cicd_integrations
[4]: /es/synthetics/private_locations
[5]: /es/synthetics/search/#search-for-tests
[6]: https://restfulapi.net/json-jsonpath/
[7]: https://www.w3schools.com/xml/xpath_syntax.asp
[8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[9]: /es/monitors/notify/?tab=is_alert#configure-notifications-and-automations
[10]: http://daringfireball.net/projects/markdown/syntax
[11]: /es/monitors/notify/variables/?tab=is_alert#conditional-variables
[12]: /es/monitors/types/synthetic_monitoring/
[13]: /es/synthetics/settings/#global-variables
[14]: /es/synthetics/api_tests/errors/#ssl-errors
[15]: /es/synthetics/api_tests/grpc_tests?tab=unarycall#test-failure
[16]: /es/account_management/rbac/
[17]: /es/account_management/rbac#custom-roles
[18]: /es/account_management/rbac/#create-a-custom-role
[19]: /es/synthetics/api_tests/errors/
[20]: /es/synthetics/platform/private_locations/configuration/#advanced-configuration