---
description: Encadena solicitudes para monitorizar transacciones complejas en tus
  servicios principales.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-with-datadog/
  tag: Blog
  text: Monitorizar tus flujos de trabajo con los tests de API multipaso de Datadog
- link: /synthetics/guide/version_history/
  tag: Guía
  text: Historial de versiones de Synthetic Monitoring Monitoring
- link: /synthetics/private_locations
  tag: Documentación
  text: Ejecutar tests de API multipaso en endpoints internos
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Más información sobre los monitores de test Synthetic
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Sitio externo
  text: Crear y gestionar tests de API multipaso Synthetic con Terraform
title: Tests de API multipaso
---

## Información general

Los tests de API multipaso te permiten encadenar varios [tests de API][1] a la vez para monitorizar proactivamente y garantizar que los sofisticados recorridos a tus servicios clave estén disponibles en cualquier momento y desde cualquier lugar. Si deseas realizar solicitudes individuales a tus servicios, utiliza [tests de API][1].

Puedes hacer lo siguiente:

* Ejecutar peticiones HTTP en endpoints de la API que requieran autenticación (por ejemplo, a través de un token).
* Monitorizar las transacciones empresariales más importantes a nivel de API
* Simular el recorrido de una aplicación móvil de principio a fin

{{< img src="synthetics/multistep_tests/multistep_test_steps.png" alt="Múltiples pasos de test en un test de API multipaso" style="width:90%;" >}}

Si uno de tus servicios empieza a responder más lentamente o de forma inesperada (por ejemplo, cuerpo de respuesta o código de estado inesperados), tu test puede [**alertar a tu equipo**][2], [**bloquear tu pipeline de CI**][3] o incluso [**revertir el despliegue defectuoso**][3].

Los tests de API multipaso pueden ejecutarse desde Datadog [gestionado](#select-locations) y [ubicaciones privadas][4], lo que permite **una cobertura completa de tus sistemas**, tanto externos como internos.

## Configuración

### Dale un nombre y etiqueta (tag) a tu test

1. Dale un nombre a tu test de API multipaso.
2. Añade `env` y otras etiquetas (tags) a tu test multipaso de API. Puedes utilizar estas etiquetas (tags) para filtrar a través de tus tests de Synthetic Monitoring en la [page (página) Synthetic Monitoring & Continuous Testing][5].

### Seleccionar localizaciones

Selecciona las **Localizaciones** para tu test de la API multipasos. Los tests de la API multipasos pueden ejecutarse tanto desde ubicaciones gestionadas como desde [ubicaciones privadas][4] según tu preferencia por ejecutar el test desde fuera o dentro de tu red.

{{% managed-locations %}} 

### Definir pasos

Para crear un paso de solicitud de API, haz clic en **Create Your First Step** (Crear tu primer paso).

{{< img src="synthetics/api_tests/ms_create_request.png" alt="Crea tus peticiones de tests de API multipaso" style="width:90%;" >}}

De forma predeterminada, se pueden crear hasta 10 pasos de test. Para aumentar este límite, ponte en contacto con el <a href="https://docs.datadoghq.com/help/">servicio de asistencia de Datadog</a>.

#### Define la petición

1. **Dale un nombre** a tu paso.
2. Elige un tipo de solicitud:

   {{< tabs >}}
   {{% tab "HTTP" %}}

   Consulta la [documentación de Tests de HTTP][101] para crear una solicitud de HTTP y añadir aserciones para un check de comportamiento o un check de estado. Las aserciones son opcionales en los tests de la API de varios pasos.

   [101]: /synthetics/api_tests/http_tests/

   {{% /tab %}}
   {{% tab "gRPC" %}}

   Consulta la [documentación de tests de gRPC][102] para crear una solicitud gRPC y añadir aserciones para un check de comportamiento o un check de estado. Las aserciones son opcionales en los tests de API de varios pasos.

   [102]: /synthetics/api_tests/grpc_tests/

   {{% /tab %}}

   {{% tab "SSL" %}}

   Consulta la [Documentación de tests de SSL][103] para crear una solicitud SSL y añadir aserciones para un check de comportamiento o un check de estado. Las aserciones son opcionales en los tests de API de varios pasos.

   [103]: /synthetics/api_tests/ssl_tests/

   {{% /tab %}}

   {{% tab "DNS" %}}

   Consulta la [Documentación de tests DNS][104] para crear una solicitud DNS y añadir aserciones para un check de comportamiento o un check de estado. Las aserciones son opcionales en los tests de API de varios pasos.

   [104]: /synthetics/api_tests/dns_tests/

   {{% /tab %}}

   {{% tab "WebSocket" %}}

   Consulta la [Documentación de tests de WebSocket][105] para crear una solicitud WebSocket y añadir aserciones para un check de comportamiento o un check de estado. Las aserciones son opcionales en los tests de API de varios pasos.

   [105]: /synthetics/api_tests/websocket_tests/

   {{% /tab %}}

   {{% tab "TCP" %}}

   Consulta la [documentación de tests de TCP][106] para crear una solicitud TCP y añadir aserciones para un check de comportamiento o un check de estado. Las aserciones son opcionales en los tests de API de varios pasos.

   [106]: /synthetics/api_tests/tcp_tests/

   {{% /tab %}}

   {{% tab "UDP" %}}

   Consulta la [Documentación de tests UDP][107] para crear una solicitud UDP y añadir aserciones para un check de comportamiento o un check de estado. Las aserciones son opcionales en los tests de API de varios pasos.

   [107]: /synthetics/api_tests/udp_tests/

   {{% /tab %}}

   {{% tab "ICMP" %}}

   Consulta la [Documentación de tests ICMP][108] para crear una solicitud ICMP y añadir aserciones para un check de comportamiento o un check de estado. Las aserciones son opcionales en los tests de API de varios pasos.

   [108]: /synthetics/api_tests/icmp_tests/

   {{% /tab %}}

   {{< /tabs >}}

### Añadir configuración de ejecución

En **Execution Settings** (Configuración de ejecución), se encuentran disponibles las siguientes opciones:

#### Éxito del paso:

Haz clic en **If step succeeds, continue to next step** (Si el paso es exitoso, continuar con el siguiente paso) para que el test continúe con los pasos posteriores después de los pasos exitosos.  

{{< img src="synthetics/multistep_tests/multistep_test_success.png" alt="Captura de pantalla de la configuración de ejecución que muestra las opciones de éxito del paso para continuar con el siguiente paso" style="width:90%;" >}}

Haz clic en **If step succeeds, exit test and mark it as passed** (Si el paso es exitoso, salir del test y marcarlo como superado) para salir del test una vez que se complete el paso de manera exitosa. De este modo, no se ejecutan pasos innecesarios y se evita marcar el test como fallido. 

{{< img src="synthetics/multistep_tests/multistep_execution_settings.png" alt="Captura de pantalla de la configuración de ejecución que muestra la salida y marca como superado del paso exitoso" style="width:90%;" >}}

#### Fallo del paso

Haz clic en **If step fails, continue to next step** (Si el paso falla, continuar con el siguiente paso) para continuar con los pasos posteriores después de que se haya producido una falla en el paso. Esto puede resultar útil para tareas de limpieza cuando quieres que continúen los pasos posteriores. Por ejemplo, un test puede crear un recurso, realizar varias acciones en este y finalizar con su eliminación. 

En el caso de que uno de los pasos intermedios falle, es conveniente que esta configuración esté activada en todos los pasos intermedios para garantizar que el recurso se elimina al final del test y que no se crean falsos positivos.

El test genera una alerta si un endpoint no responde como se esperaba. Tu test puede activar reintentos X veces después de Y ms en caso de un resultado de test fallido. Personaliza el intervalo de reintentos para adaptarlo a tu criterio de alerta.

{{< img src="synthetics/multistep_tests/step_failure.png" alt="Captura de pantalla de la configuración de ejecución que muestra el fallo del paso" style="width:90%;" >}}

#### Extraer variables de la respuesta

Opcionalmente, extrae variables de la respuesta de tu solicitud de API mediante el parseo de sus encabezados de respuesta o cuerpo. El valor de la variable se actualiza cada vez que se ejecuta el paso de solicitud de API.

Para iniciar el parseo de una variable, haz clic en **Extract a variable from response content** (Extraer una variable del contenido de la respuesta):

1. Ingresa un **Variable Name** (Nombre de variable). El nombre de tu variable debe tener al menos tres caracteres, y solo puede contener mayúsculas, números y guiones bajos.
2. Decide si prefieres extraer la variable de los encabezados o del cuerpo de la respuesta.

   * Extrae el valor del **encabezado de respuesta**: utiliza el encabezado de respuesta completa de tu solicitud de API como valor de la variable o analízala con un [`regex`][8].
   * Extrae el valor del **cuerpo de respuesta**: utiliza el cuerpo de respuesta completo de tu solicitud de API como valor de la variable o analízalo con un [`regex`][8], un [`JSONPath`][6] o un [`XPath`][7].

{{< img src="synthetics/api_tests/ms_extract_variable.png" alt="Extraer variables de solicitudes API en un test de API multipaso" style="width:90%;" >}}

Puedes extraer hasta diez variables por paso de test. Una vez creada, esta variable se puede utilizar en los siguientes pasos de tu test de API multipaso. Para obtener más información, consulta [Usar variables](#usar-variables).

### Indicar la frecuencia del test

Los tests de API multipaso se pueden ejecutar:

* **En un horario** para asegurar que tus endpoints más importantes son siempre accesibles para tus usuarios. Selecciona la frecuencia con la que deseas que Datadog ejecute tu test de API multipaso.
* [**Dentro de tus pipelines de Continuous Integration Continuous Delivery**][3] para empezar a enviar sin temer que un código defectuoso pueda afectar a la experiencia de tus clientes.
* **A petición** para ejecutar tus tests cuando sea más conveniente para tus equipos.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### Extraer variables

Además de crear variables locales, puedes [extraer variables de cualquier paso](#extract-variables-from-the-response) de tu test de API multipaso y [reinyectar los valores en pasos posteriores](#use-variables).

### Usar variables

Puedes utilizar las [variables globales definidas en `Settings`][13] y las [variables definidas localmente](#create-local-variables) en la URL, las opciones avanzadas y las aserciones de tus tests de API.

Para visualizar tu lista de variables, escribe `{{` en el campo de tu elección.

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Uso de variables en los tests de API multipaso" video="true" width="90%" >}}

### Subtests

Los tests de API de varios steps (UI) / pasos (generic) admiten subtests, lo que te permite reutilizar tests de API de varios pasos existentes o extraer pasos en componentes reutilizables. Puedes anidar subtests hasta dos niveles de profundidad.

Para utilizar un test de API de varios steps (UI) / pasos (generic) existente como subtest, haz clic en **Subtest**, ve a la pestaña **From Existing Test** (Desde un test existente) y selecciona un test de API de varios pasos en el menú desplegable.

Para convertir pasos de tu test de API de varios steps (UI) / pasos (generic) en un subtest, haz clic en la pestaña **Extract From Steps** (Extraer de pasos), selecciona los pasos grabados que desees extraer y haz clic en **Convert to Subtest** (Convertir en subtest).

{{< img src="synthetics/multistep_tests/subtest.png" alt="Interfaz de usuario para añadir un subtest a un test de API multipaso" width="60%" >}}

Para sustituir una variable de subtest en un test de API multipaso, defínela en el test matriz utilizando el mismo nombre. Una variable siempre utiliza el primer valor que se le asigna.

Si no necesitas ejecutar un subtest de forma independiente, puedes pausarlo. Sigue ejecutándose como parte del test de API multipaso, pero no se ejecuta por sí solo.

**Nota:** Solo se pueden añadir tstes de API de varios steps (UI) / pasos (generic) como subtests. No se admite el uso de [tests de API][1] como subtests.

## Fallo del test

Un test se considera `FAILED` si un paso no satisface una o varias afirmaciones o si la solicitud de un paso falla prematuramente. En algunos casos, el test puede fallar sin poder probar las afirmaciones contra el endpoint, estas razones incluyen:

`CONNREFUSED`
: No se ha podido establecer una conexión, ya que la máquina de destino la ha rechazado continuamente.

`CONNRESET`
: el servidor remoto ha finalizado bruscamente la conexión. Entre las posibles causas se incluyen que el servidor web haya encontrado un error o se haya bloqueado mientras respondía, o la pérdida de conectividad del servidor web.

`DNS`
: Entrada DNS no encontrada para el test URL. Entre las posibles causas se incluyen un test URL mal configurado o una configuración incorrecta en tus entradas DNS.

`INVALID_REQUEST` 
: La configuración del test no es válida (por ejemplo, un error tipográfico en la URL).

`SSL`
: La connection (conexión) de SSL no se pudo realizar. [Consulta la page (página) de error dedicado para obtener más información][14].

`TIMEOUT`
: La solicitud no se ha podido completar en un plazo razonable. Pueden ocurrir dos tipos de `TIMEOUT`:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indica que la duración de la solicitud ha alcanzado el tiempo de espera definido en el test (por defecto se define en 60 segundos).
  Para cada solicitud, en la cascada de la red sólo se muestran las etapas completadas de la solicitud. Por ejemplo, en el caso de que sólo se muestre `Total response time`, el tiempo de espera se produjo durante la resolución DNS.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indica que la duración de la solicitud y de las aserciones ha alcanzado la duración máxima (30 minutos).

Para los pasos HTTP, consulta [errores comunes de step (UI) / paso (generic) de HTTP][14]. Para los pasos de gRPC, consulta [errores comunes de step (UI) / paso (generic) de gRPC][15].

## Permisos

De forma predeterminada, sólo los usuarios con los roles [Administrador y Estándar de Datadog][16] pueden crear, editar y eliminar tests de API multipaso Synthetic. Para obtener acceso para crear, editar y eliminar tests de API multipaso Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][16].

Si utilizas la [función de rol personalizado][17], añade tu usuario a cualquier rol personalizado que incluya `synthetics_read` y permisos `synthetics_write` para Synthetic Monitoring.

### Restringir el acceso

La restricción de acceso está disponible para los clientes que utilizan [roles personalizados][18] en sus cuentas.

Puedes restringir el acceso a un test de API multipaso en función de los roles de tu organización. Al crear un test de API multipaso, elige qué roles (además de tu usuario) pueden leer y redactar tu test.

{{< img src="synthetics/settings/restrict_access_1.png" alt="Establecer permisos para tu test" style="width:70%;" >}}

## Referencias adicionales

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
[14]: /es/synthetics/api_tests/http_tests?tab=requestoptions#test-failure
[15]: /es/synthetics/api_tests/grpc_tests?tab=unarycall#test-failure
[16]: /es/account_management/rbac/
[17]: /es/account_management/rbac#custom-roles
[18]: /es/account_management/rbac/#create-a-custom-role
[19]: /es/synthetics/api_tests/grpc_tests