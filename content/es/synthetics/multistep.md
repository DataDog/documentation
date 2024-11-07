---
description: Encadena solicitudes para monitorizar transacciones complejas en tus
  servicios principales.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-with-datadog/
  tag: Blog
  text: Monitorizar tus flujos de trabajo con los tests de API multipaso de Datadog
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: Centro de aprendizaje
  text: Introducción a los tests Synthetic
- link: /getting_started/synthetics/api_test
  tag: Documentación
  text: Comienza con los tests de API
- link: /synthetics/private_locations
  tag: Documentación
  text: Ejecutar tests de API multipaso en endpoints internos
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Más información sobre los monitores de test sintéticos
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Sitio externo
  text: Crear y gestionar tests de API multipaso Synthetic con Terraform
title: Tests de API multipaso
---

## Información general

Los test de API multipaso te permiten encadenar varias [solicitudes HTTP][1] o [solicitudes gRPC][20] a la vez para monitorizar de forma proactiva y asegurar que los recorridos más complejos de tus servicios clave estén disponibles en cualquier momento y desde cualquier lugar. Si deseas realizar solicitudes individuales a tus servicios, utiliza [Tests de API][2].

Puedes hacer lo siguiente:

* Ejecutar peticiones HTTP en endpoints de la API que requieran autenticación (por ejemplo, a través de un token).
* Monitorizar las transacciones empresariales más importantes a nivel de API
* Simular el recorrido de una aplicación móvil de principio a fin

{{< img src="synthetics/multistep_tests/multistep_test_steps.png" alt="Múltiples pasos de test en un test de API multipaso" style="width:90%;" >}}

Si uno de tus servicios comienza a responder más lentamente o de una manera inesperada (por ejemplo, un cuerpo de respuesta o código de estado inesperado), tu test puede [**alertar a tu equipo**][3], [**bloquear tu pipeline de IC**][4] o incluso [**hacer retroceder el despliegue defectuoso**][4].

Los tests de API multipaso pueden ejecutarse desde Datadog [localizaciones gestionadas](#select-locations) y [localizaciones privadas][5], permitiendo **una cobertura completa de tus sistemas**, tanto externos como internos.

## Configuración

### Dale un nombre y etiqueta (tag) a tu test

1. Dale un nombre a tu test de API multipaso.
2. Añade `env` y otras etiquetas (tags) a tu test de API multipaso. Puedes utilizar estas etiquetas para filtrar tus tests Synthetic en la página [Monitorización y tests continuos Synthetic][6].

### Selecciona las localizaciones

Selecciona las **localizaciones** para tu test de API multipaso. Los tests de API multipaso pueden ejecutarse tanto desde localizaciones gestionadas como desde [localizaciones privadas][5] en función de si prefieres ejecutar el test desde fuera o desde dentro de tu red.

{{% managed-locations %}} 

### Definir pasos

Para crear un paso de solicitud de API, haz clic en **Create Your First Step** (Crear tu primer paso).

{{< img src="synthetics/api_tests/ms_create_request.png" alt="Crea tus peticiones de tests de API multipaso" style="width:90%;" >}}

De forma predeterminada, se pueden crear hasta 10 pasos de test. Para aumentar este límite, ponte en contacto con el <a href="https://docs.datadoghq.com/help/">servicio de asistencia de Datadog</a>.

#### Define la petición

1. **Dale un nombre** a tu paso.
2. Elige un tipo de solicitud: HTTP o gRPC.

   {{< tabs >}}
   {{% tab "HTTP" %}}

   Consulta la [documentación de Tests HTTP][101] para crear una solicitud HTTP y añadir aserciones. Las aserciones son opcionales en los tests de API multipaso.

   [101]: /synthetics/api_tests/http_tests/

   {{% /tab %}}
   {{% tab "gRPC" %}}

   Consulta la [documentación de Tests gRPC][101] para crear una solicitud gRPC y añadir aserciones para un check de comportamiento o un check de estado. Las aserciones son opcionales en los tests de API multipaso.

   [101]: /synthetics/api_tests/grpc_tests#define-the-request

   {{% /tab %}}
   {{< /tabs >}}

#### Añade parámetros de ejecución

Haz clic en **Continuar con el test si este paso falla** para permitir que tu test continúe con los pasos siguientes tras el fallo de un paso. Esto asegura que tus tests son capaces de limpiarse a sí mismos. Por ejemplo, un test puede crear un recurso, realizar una serie de acciones en ese recurso y terminar con la eliminación de ese recurso.

En el caso de que uno de los pasos intermedios falle, es conveniente que esta configuración esté activada en todos los pasos intermedios para garantizar que el recurso se elimina al final del test y que no se crean falsos positivos.

El test genera una alerta si un endpoint no responde como se esperaba. Tu test puede activar reintentos X veces después de Y ms en caso de un resultado de test fallido. Personaliza el intervalo de reintentos para adaptarlo a tu criterio de alerta.

#### Extraer variables de la respuesta

Opcionalmente, extrae variables de la respuesta de tu solicitud de API mediante el parseo de sus encabezados de respuesta o cuerpo. El valor de la variable se actualiza cada vez que se ejecuta el paso de solicitud de API.

Para iniciar el parseo de una variable, haz clic en **Extract a variable from response content** (Extraer una variable del contenido de la respuesta):

1. Introduce un **Variable Name** (Nombre de variable). El nombre de tu variable debe tener al menos tres caracteres y sólo puede contener mayúsculas, números y guiones bajos. 
2. Decide si prefieres extraer la variable de los encabezados o del cuerpo de la respuesta.

   * Extraer el valor del **encabezado de respuesta**: utiliza el encabezado de respuesta completa de tu solicitud de API como valor de la variable, o analízalo con una [`regex`][9].
   * Extraer el valor del **cuerpo de respuesta**: utiliza el cuerpo de respuesta completo de tu solicitud de API como valor de la variable o analízalo con una [`regex`][9], una [`JSONPath`][7] o una [`XPath`][8].

{{< img src="synthetics/api_tests/ms_extract_variable.png" alt="Extraer variables de solicitudes API en un test de API multipaso" style="width:90%;" >}}

Puedes extraer hasta diez variables por paso de test. Una vez creada, esta variable se puede utilizar en los siguientes pasos de tu test de API multipaso. Para obtener más información, consulta [Usar variables](#usar-variables).

### Indica la frecuencia del test

Los tests de API multipaso se pueden ejecutar:

* **En un horario** para asegurar que tus endpoints más importantes son siempre accesibles para tus usuarios. Selecciona la frecuencia con la que deseas que Datadog ejecute tu test de API multipaso.
* [**En tus pipelines de CI/CD**][4] para empezar a realizar envíos sin temer que un código defectuoso pueda afectar a la experiencia de tus clientes.
* **A petición** para ejecutar tus tests cuando sea más conveniente para tus equipos.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### Extraer variables

Además de crear variables locales, puedes [extraer variables de cualquier paso](#extract-variables-from-the-response) de tu test de API multipaso y [reinyectar los valores en pasos posteriores](#use-variables).

### Usar variables

Puedes utilizar las [variables globales definidas en la `Settings`][14] y las [variables definidas localmente](#create-local-variables) en la URL, las opciones avanzadas y las aserciones de tus tests de API.

Para visualizar tu lista de variables, escribe `{{` en el campo que desees.

{{< img src="synthetics/api_tests/use_variable.mp4" alt="Uso de variables en los tests de API multipaso" video="true" width="90%" >}}

## Fallo del test

Un test se considera `FAILED` si un paso no satisface una o varias afirmaciones o si la solicitud de un paso falla prematuramente. En algunos casos, el test puede fallar sin poder probar las afirmaciones contra el endpoint, estas razones incluyen:

`CONNREFUSED`
: No se ha podido establecer una conexión porque la máquina de destino la ha rechazado continuamente.

`CONNRESET`
: el servidor remoto ha finalizado bruscamente la conexión. Entre las posibles causas se incluyen que el servidor web haya encontrado un error o se haya bloqueado mientras respondía, o la pérdida de conectividad del servidor web.

`DNS`
: Entrada DNS no encontrada para el test URL. Entre las posibles causas se incluyen un test URL mal configurado o una configuración incorrecta en tus entradas DNS.

`INVALID_REQUEST` 
: La configuración del test no es válida (por ejemplo, un error tipográfico en la URL).

`SSL`
: no se ha podido realizar la conexión SSL. [Consulta la página de errores dedicada para obtener más información][15].

`TIMEOUT`
: La solicitud no se ha podido completar en un plazo razonable. Pueden ocurrir dos tipos de `TIMEOUT` (tiempo de espera):
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indica que la duración de la solicitud ha alcanzado el tiempo de espera definido en el test (por defecto se establece en 60 segundos).
  Para cada solicitud, solo se muestran en la cascada de la red las etapas completadas de la solicitud. Por ejemplo, en el caso de que solo se muestre `Total response time`, el límite de tiempo se produjo durante la resolución DNS.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indica que la duración de la solicitud y de las aserciones ha alcanzado la duración máxima (30 minutos).

Para pasos de HTTP, consulta [fallos comunes en pasos de HTTP][15]. Para pasos de gRPC, consulta [fallos comunes de pasos de gRPC][16].

## Permisos

Por defecto, solo los usuarios con los roles [Datadog Admin y Datadog Standard][17] pueden crear, editar y borrar los tests de API multipaso Synthetic. Para obtener acceso a la creación, edición y eliminación de tests de API multipaso Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][17].

Si estás utilizando la [función de rol personalizado][18], añade tu usuario a cualquier rol personalizado que incluya permisos para `synthetics_read` y `synthetics_write` para la monitorización Synthetic.

### Restringir el acceso

La restricción de acceso está disponible para los clientes que utilizan [roles personalizados][19] en sus cuentas.

Puedes restringir el acceso a un test de API multipaso en función de los roles de tu organización. Al crear un test de API multipaso, elige qué roles (además de tu usuario) pueden leer y redactar tu test.

{{< img src="synthetics/settings/restrict_access_1.png" alt="Establecer permisos para tu test" style="width:70%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/api_tests/http_tests
[2]: /es/synthetics/api_tests/
[3]: /es/synthetics/api_tests/http_tests?tab=requestoptions#configure-the-test-monitor
[4]: /es/synthetics/cicd_integrations
[5]: /es/synthetics/private_locations
[6]: /es/synthetics/search/#search-for-tests
[7]: https://restfulapi.net/json-jsonpath/
[8]: https://www.w3schools.com/xml/xpath_syntax.asp
[9]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[10]: /es/monitors/notify/?tab=is_alert#configure-notifications-and-automations
[11]: http://daringfireball.net/projects/markdown/syntax
[12]: /es/monitors/notify/variables/?tab=is_alert#conditional-variables
[13]: /es/synthetics/guide/synthetic-test-monitors
[14]: /es/synthetics/settings/#global-variables
[15]: /es/synthetics/api_tests/http_tests?tab=requestoptions#test-failure
[16]: /es/synthetics/api_tests/grpc_tests?tab=unarycall#test-failure
[17]: /es/account_management/rbac/
[18]: /es/account_management/rbac#custom-roles
[19]: /es/account_management/rbac/#create-a-custom-role
[20]: /es/synthetics/api_tests/grpc_tests