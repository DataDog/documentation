---
algolia:
  category: Documentación
  rank: 70
  subcategory: Tests de API Synthetic
  tags:
  - websocket
  - test websocket
  - tests websocket
aliases: null
description: Simular solicitudes WebSocket para monitorizar endpoints de API públicos
  e internos
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentación de la monitorización Synthetic de Datadog
- link: https://www.datadoghq.com/blog/udp-websocket-api-tests/
  tag: Blog
  text: Ejecutar tests UDP y WebSocket para monitorizar aplicaciones críticas para
    la latencia
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: Centro de aprendizaje
  text: Introducción a los tests Synthetic
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Más información sobre los monitores de test Synthetic
title: Tests WebSocket
---
## Información general

Los tests WebSocket te permiten abrir de forma proactiva conexiones WebSocket en tus endpoints para verificar las respuestas y las condiciones definidas, como los tiempos de respuesta generales o las cabeceras esperadas.

Los tests WebSocket pueden ejecutarse tanto desde [localizaciones gestionadas](#select-locations) como desde [localizaciones privadas][1] dependiendo de si prefieres ejecutar el test desde fuera o desde dentro de tu red. Los tests WebSocket pueden ejecutarse de forma programada, bajo demanda o directamente dentro de tus [pipelines CI/CD][2].

## Configuración

Cuando decidas crear un test `WebSocket`, define la solicitud de tu test.

### Definición de la solicitud

1. Especifica la **URL** donde se ejecutará el test. 
2. Introduce la cadena que quieres enviar en tu test.
3. Añade **Opciones avanzadas** (opcional) a tu test:

   {{< tabs >}}

   {{% tab "Opciones de solicitud" %}}
   * **Tiempo de espera**: Especifica la cantidad de tiempo en segundos antes de que se inicie un tiempo de espera en el test.
   * **Cabeceras de solicitud**: Define las cabeceras a añadir a tu solicitud HTTP al iniciar una conexión WebSocket. También puedes anular las cabeceras predeterminadas (por ejemplo, la cabecera `user-agent`).
   * **Cookies**: Define cookies para añadir a tu solicitud HTTP al iniciar una conexión WebSocket. Define varias cookies utilizando el formato `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

   {{% /tab %}}

   {{% tab "Autenticación" %}}

   * **Autenticación básica HTTP**: Añade credenciales de autenticación básica HTTP.

   {{% /tab %}}

   {{< /tabs >}}

<br/>

4. **Pon un nombre** a tu test WebSocket.
5. Añade **Etiquetas** (tags) `env` así como cualquier otra etiqueta a tu test WebSocket. Luego, puedes utilizar estas etiquetas para filtrar tus tests Synthetic en la [página de monitorización y tests continuos Synthetic][3].

{{< img src="synthetics/api_tests/websocket_test_config.png" alt="Definir una solicitud WebSocket" style="width:90%;" >}}

Haz clic en **Test de URL** para probar la configuración de la solicitud. Aparecerá una vista previa de la respuesta en la parte derecha de la pantalla.

### Definición de aserciones

Las aserciones definen cuál es un resultado de test esperado. Al hacer clic en **Test de URL** (URL de test), se añade una aserción básica sobre el `response time`. Debes definir al menos una aserción para que sea monitorizada por tu test.

| Tipo            | Operador                                                                         | Tipo de valor                        |
|-----------------|----------------------------------------------------------------------------------|-----------------------------------|
| tiempo de respuesta   | `is less than`                                                                   | _Integer (ms)_                    |
| respuesta de cadena | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match` | _String_ <br> _[Regex][4]_        |
| cabecera          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match` | _String_ <br> _[Regex][4]_        |

Selecciona la vista previa de la respuesta directamente o haz clic en **Nueva aserción** para crear una aserción. Puedes crear hasta 20 aserciones por cada test WebSocket.

{{< img src="synthetics/api_tests/websocket_assertions.png" alt="Definir aserciones en las que tu test WebSocket tenga éxito o falle" style="width:90%;" >}}

Para aplicar una lógica `OR` en una aserción, utiliza los comparadores `matches regex` o `does not match regex` para definir una expresión regular con varios valores esperados para el mismo tipo de aserción, como `(0|100)`. Se considera que el resultado del test tiene éxito si el valor de respuesta de la cadena o de la aserción de la cabecera es 0 o 100.

Si un test no contiene una aserción en el cuerpo de la respuesta, la carga útil del cuerpo cae y devuelve un tiempo de respuesta asociado para la solicitud, dentro del límite de tiempo de espera establecido por el worker de Synthetics.

Si un test contiene una aserción en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparece un error `Assertions on the body/response cannot be run beyond this limit`.

### Seleccionar localizaciones

Selecciona las **Localizaciones** desde donde ejecutar tu test WebSocket. Los tests WebSocket pueden ejecutarse desde localizaciones gestionadas y también [privadas][1], en función de si prefieres ejecutar el test desde fuera o desde dentro de tu red.

{{% managed-locations %}} 

### Indicar la frecuencia del test

Los tests WebSocket se pueden ejecutar:

* **De forma programada** para asegurar que tus endpoints más importantes estén siempre disponibles para tus usuarios. Selecciona la frecuencia con la que quieres que Datadog ejecute tu test WebSocket.
* [**En tus pipelines CI/CD**][2] para empezar a realizar envíos sin temer que un código defectuoso pueda afectar a la experiencia de tus clientes.
* **Bajo demanda** para ejecutar tus tests cuando resulte más conveniente para tu equipo.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}} 

### Uso de variables

Puedes utilizar las [variables globales definidas en la página **Parámetros**][4] en la URL, las opciones avanzadas y las aserciones de tus tests WebSocket.

Para visualizar tu lista de variables, escribe `{{` en el campo de tu elección.

## Fallo del test

Un test se considera `FAILED` si no satisface una o más aserciones o si la solicitud ha fallado prematuramente. En algunos casos, el test puede fallar sin comprobar las aserciones respecto al endpoint.

Entre las razones figuran las siguientes:

`CONNRESET`
: El servidor remoto ha finalizado bruscamente la conexión. Entre las posibles causas se incluyen que el servidor web haya encontrado un error o falla al responder, o que se haya perdido la conectividad del servidor web.

`DNS`:
No se ha encontrado la entrada DNS para la URL del test. Entre las posibles causas se incluyen una URL de test mal configurada o una configuración incorrecta de las entradas DNS.

`INVALID_REQUEST` 
: La configuración del test no es válida (por ejemplo, un error tipográfico en la URL).

`SSL`
: No se ha podido realizar la conexión SSL. [Para obtener más información, consulta la página de errores específica][9].

`TIMEOUT`
: La solicitud no se ha podido completar en un plazo razonable. Pueden ocurrir dos tipos de `TIMEOUT`:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indica que la duración de la solicitud ha alcanzado el tiempo de espera definido en el test (por defecto se define en 60 segundos).
  Para cada solicitud, en la cascada de la red sólo se muestran las etapas completadas de la solicitud. Por ejemplo, en el caso de que sólo se muestre `Total response time`, el tiempo de espera se produjo durante la resolución DNS.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indica que la duración del test (solicitud + aserciones) alcanza la duración máxima (60,5 segundos).

`WEBSOCKET`
: La conexión WebSocket se ha cerrado o no se puede abrir. Puede ocurrir un tipo de error `WEBSOCKET`:
  - `WEBSOCKET: Received message longer than the maximum supported length.` indica que la longitud del mensaje de respuesta alcanza la longitud máxima (50kb).

## Permisos

De manera predeterminada, sólo los usuarios con los roles de [administrador de Datadog y estándar de Datadog][10] pueden crear, editar y eliminar tests WebSocket Synthetic. Para crear, editar y eliminar tests WebSocket Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][10].

Si estás utilizando la [función de rol personalizado][11], añade tu usuario a cualquier rol que incluya permisos `synthetics_read` y `synthetics_write`.

### Restringir el acceso

La restricción del acceso está disponible para clientes que utilizan [roles personalizados][12] en sus cuentas.

Puedes restringir el acceso a un test WebSocket en función de los roles de tu organización. Al crear un test WebSocket, elige qué roles (además de tu usuario) pueden leer y escribir tu test.

{{< img src="synthetics/settings/restrict_access_1.png" alt="Definir permisos para tu test" style="width:70%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/private_locations
[2]: /es/synthetics/cicd_integrations
[3]: /es/synthetics/search/#search
[4]: /es/synthetics/settings/#global-variables
[5]: /es/monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /es/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[8]: /es/synthetics/guide/synthetic-test-monitors
[9]: /es/synthetics/api_tests/errors/#ssl-errors
[10]: /es/account_management/rbac/
[11]: /es/account_management/rbac#custom-roles
[12]: /es/account_management/rbac/#create-a-custom-role