---
algolia:
  category: Documentación
  rank: 70
  subcategory: Tests de API Synthetic
  tags:
  - udp
  - test udp
  - tests udp
description: Simular conexiones UDP en tus hosts
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentación de la monitorización Synthetic de Datadog
- link: https://www.datadoghq.com/blog/udp-websocket-api-tests/
  tag: Blog
  text: Ejecutar tests UDP y WebSocket para monitorizar aplicaciones críticas para
    la latencia
- link: /getting_started/synthetics/api_test/
  tag: Documentación
  text: Empezando con los tests de API
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Más información sobre los monitores de test Synthetic
title: Tests UDP
---
## Información general

Los tests UDP permiten monitorizar que las conexiones UDP de bajo nivel puedan establecerse en los puertos de los hosts correspondientes, para garantizar la disponibilidad de cualquiera de los servicios presentes en los puertos UDP. Al contar con datos de tiempo de respuesta integrados, podrás realizar un seguimiento del rendimiento de tus aplicaciones de red y recibir alertas en caso de que se produzca una lentitud inesperada. 

En el caso del tráfico UDP normal, se transmite información desde un origen hasta un destino sin solicitar reconocimiento. Para poder monitorizar tus servicios UDP, Datadog recomienda tener un proceso en el host receptor que escuche en el puerto UDP y responda. Luego de configurar este proceso, puedes crear un test UDP y establecer una aserción sobre la respuesta esperada.

Los tests UDP pueden ejecutarse tanto desde [localizaciones gestionadas](#select-locations) como [privadas][1], dependiendo de si prefieres ejecutarlos desde fuera o dentro de tu red. Los tests UDP pueden ejecutarse de forma programada, bajo demanda o directamente dentro de tus [pipelines CI/CD][2].

## Configuración

Cuando decidas crear un test `UDP`, define la solicitud de tu test.

### Definición de la solicitud

1. Especifica el **Host** y el **Puerto** para ejecutar tu test.
2. Introduce la cadena que quieres enviar en tu test.
3. Especifica la cantidad de tiempo en segundos antes de que se inicie un tiempo de espera en el test (opcional).
4. **Pon un nombre** a tu test UDP.
5. Añade **Etiquetas** (tags) `env` así como cualquier otra etiqueta a tu test UDP. Luego, puedes utilizar estas etiquetas para filtrar tus tests Synthetic en la [página de monitorización y tests continuos Synthetic][3].

{{< img src="synthetics/api_tests/udp_test_config.png" alt="Definir la solicitud UDP" style="width:90%;" >}}

Haz clic en **URL del test** para probar la configuración de la solicitud. Aparecerá una vista previa de la respuesta en la parte derecha de la pantalla.

### Definición de aserciones

Las aserciones definen cuál es un resultado de test esperado. Al hacer clic en **URL del test**, se añade una aserción básica sobre el `response time`. Debes definir al menos una aserción para que sea monitorizada por tu test.

| Tipo            | Operador                                                                        | Tipo de valor                        |
|-----------------|---------------------------------------------------------------------------------|-----------------------------------|
| tiempo de respuesta   | `is less than`                                                                  | *Entero (ms)*                    |
| respuesta de cadena | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`| *Cadena* <br> *[Regex][4]*        |

Selecciona la vista previa de la respuesta directamente o haz clic en **Nueva aserción** para crear una aserción. Puedes crear hasta 20 aserciones por cada test UDP.

{{< img src="synthetics/api_tests/udp_assertion.png" alt="Definir aserciones en las que tu test UDP tenga éxito o falle" style="width:90%;" >}}

Para aplicar una lógica `OR` en una aserción, utiliza los comparadores `matches regex` o `does not match regex` para definir una expresión regular con varios valores esperados para el mismo tipo de aserción, como `(0|100)`. Se considera que el resultado del test tiene éxito si el valor de respuesta de la cadena o de la aserción de la cabecera es 0 o 100.

Si un test no contiene una aserción en el cuerpo de la respuesta, la carga útil del cuerpo cae y devuelve un tiempo de respuesta asociado para la solicitud, dentro del límite de tiempo de espera establecido por el worker de Synthetics.

Si un test contiene una afirmación en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparece un error `Assertions on the body/response cannot be run beyond this limit`.

### Seleccionar localizaciones

Selecciona las **Localizaciones** desde donde ejecutar tu test UDP. Los tests UDP pueden ejecutarse desde localizaciones gestionadas y también [privadas][1], en función de si prefieres ejecutar el test desde fuera o desde dentro de tu red.

{{% managed-locations %}} 

### Indicar la frecuencia del test

Los tests UDP se pueden ejecutar:

- **De forma programada** para garantizar que los servicios más importantes siempre resulten accesibles para tus usuarios. Selecciona la frecuencia con la que quieres que Datadog ejecute tu test UDP.
- [**Dentro de tus pipelines CI/CD**][2].
- **Bajo demanda** para ejecutar tus tests cuando sea más conveniente para tu equipo.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### Uso de variables

Puedes utilizar las [variables globales definidas en la página **Parámetros**][7] en la URL y las aserciones de tus tests UDP.

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

`TIMEOUT`
: La solicitud no se ha podido completar en un plazo razonable. Pueden ocurrir dos tipos de `TIMEOUT`:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indica que la duración de la solicitud ha alcanzado el tiempo de espera definido en el test (por defecto se establece en 60 segundos).
  Para cada solicitud, en la cascada de la red sólo se muestran las etapas completadas de la solicitud. Por ejemplo, en el caso de que sólo se muestre `Total response time`, el tiempo de espera se produjo durante la resolución DNS.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indica que la duración del test (solicitud + aserciones) alcanza la duración máxima (60,5 segundos).

## Permisos

De manera predeterminada, sólo los usuarios con los roles de administrador de Datadog y estándar de Datadog pueden crear, editar y eliminar tests UDP Synthetic. Para crear, editar y eliminar tests UDP Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][9].

Si estás utilizando la [función de rol personalizado][10], añade tu usuario a cualquier rol que incluya permisos `synthetics_read` y `synthetics_write`.

### Restringir el acceso

La restricción del acceso está disponible para clientes que utilizan [roles personalizados][11] en sus cuentas.

Puedes restringir el acceso a un test UDP en función de los roles de tu organización. Al crear un test UDP, elige qué roles (además de tu usuario) pueden leer y escribir tu test.

{{< img src="synthetics/settings/restrict_access_1.png" alt="Definir permisos para tu test" style="width:70%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/private_locations/
[2]: /es/synthetics/cicd_integrations
[3]: /es/synthetics/search/#search
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[5]: /es/monitors/notify/#configure-notifications-and-automations
[6]: https://www.markdownguide.org/basic-syntax/
[7]: /es/synthetics/settings/#global-variables
[8]: /es/synthetics/guide/synthetic-test-monitors
[9]: /es/account_management/rbac/
[10]: /es/account_management/rbac#custom-roles
[11]: /es/account_management/rbac/#create-a-custom-role