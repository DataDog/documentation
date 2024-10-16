---
algolia:
  category: Documentación
  rank: 70
  subcategory: Tests de API Synthetic
  tags:
  - tcp
  - test tcp
  - tests tcp
aliases:
- /es/synthetics/tcp_test
- /es/synthetics/tcp_check
description: Simular conexiones TCP en tus hosts
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentación de la monitorización Synthetic de Datadog
- link: /getting_started/synthetics/api_test
  tag: Documentación
  text: Empezando con los tests de API
- link: /synthetics/private_locations
  tag: Documentación
  text: Ejecutar tests TCP en endpoints internos
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Más información sobre los monitores de test Synthetic
title: Tests TCP
---

## Información general

Los tests TCP permiten monitorizar si las conexiones TCP de bajo nivel puedan establecerse en los puertos de los hosts correspondientes, para garantizar la disponibilidad de varios servicios claves como `SSH` (22), `SMTP` (25), `DNS` (53), VPN a través de `HTTPS` (443) y otros servicios personalizados de otros puertos. Al contar con datos de tiempo de respuesta integrados, podrás realizar un seguimiento del rendimiento de tus aplicaciones de red y recibir alertas en caso de que se produzca una lentitud inesperada. 

Los tests TCP pueden ejecutarse tanto desde [localizaciones gestionadas](#select-locations) como [privadas][1], dependiendo de si prefieres ejecutarlos desde fuera o dentro de tu red. Los tests TCP pueden ejecutarse de forma programada, bajo demanda o directamente dentro de tus [pipelines CI/CD][2].

## Configuración

Cuando decidas crear un test `TCP`, define la solicitud de tu test.

### Definir una solicitud

1. Especifica el **Host** y el **Puerto** para ejecutar tu prueba.
2. Decide si quieres habilitar el **Seguimiento del número de saltos de red (TTL)** o no. Esta opción te permite demostrar el número de saltos de red y tener acceso a una traceroute de TCP en los resultados de tu test.
3. Especifica la cantidad de tiempo en segundos antes de que se inicie un tiempo de espera en el test (opcional).
4. **Pon un nombre** a tu test TCP.
5. Añade **Etiquetas** (tags) `env` así como cualquier otra etiqueta a tu test TCP. Luego, puedes utilizar estas etiquetas para filtrar tus tests Synthetic en la [página de monitorización y tests continuos Synthetic][3].

{{< img src="synthetics/api_tests/tcp_test_config.png" alt="Definir la conexión TCP" style="width:90%;" >}}

Haz clic en **Test de URL** para probar la configuración de la solicitud. Aparecerá una vista previa de la respuesta en la parte derecha de la pantalla.

### Definición de aserciones

Las aserciones definen cuál es un resultado de test esperado. Al hacer clic en **Test de URL**, se añaden aserciones básicas sobre el `response time`. Debes definir al menos una aserción para que sea monitorizada por tu test.

| Tipo          | Operador                                                                | Tipo de valor     |
|---------------|-------------------------------------------------------------------------|----------------|
| tiempo de respuesta | `is less than`                                                          | _Integer (ms)_ |
| saltos de red    | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _entero_        |
| conexión | `is`                                                          | `established`, `refused`, `timeout` |

Puedes crear hasta 20 aserciones por test de API haciendo clic en **Nueva aserción** o haciendo clic directamente en la vista previa de la respuesta:

{{< img src="synthetics/api_tests/assertions_tcp.png" alt="Definir aserciones en las que tu test TCP tenga éxito o falle" style="width:90%;" >}}

Si un test no contiene una aserción en el cuerpo de la respuesta, la carga útil del cuerpo cae y devuelve un tiempo de respuesta asociado para la solicitud, dentro del límite de tiempo de espera establecido por el worker de Synthetics.

Si un test contiene una afirmación en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparece un error `Assertions on the body/response cannot be run beyond this limit`.

### Seleccionar localizaciones

Selecciona las **Localizaciones** desde donde ejecutar tu test TCP. Los tests TCP pueden ejecutarse tanto desde localizaciones gestionadas como [privadas][1], en función de si prefieres iniciar la conexión desde fuera o desde dentro de tu red.

{{% managed-locations %}} 

### Indicar la frecuencia del test

Los tests TCP se pueden ejecutar:

* **De forma programada** para garantizar que los servicios más importantes siempre resulten accesibles para tus usuarios. Selecciona la frecuencia con la que quieres que Datadog ejecute tu test TCP.
* [**Dentro de tus pipelines CI/CD**][2].
* **Bajo demanda** para ejecutar tus tests cuando sea más conveniente para tu equipo.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### Uso de variables

Puedes utilizar las [variables globales definidas en la página **Parámetros**][8] en la URL, las opciones avanzadas y las aserciones de tus tests TCP.

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

`TIMEOUT`
: La solicitud no se ha podido completar en un plazo razonable. Pueden ocurrir dos tipos de `TIMEOUT`):
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indica que la duración de la solicitud ha alcanzado el tiempo de espera definido en el test (por defecto se establece en 60 segundos).
  Para cada solicitud, en la cascada de la red sólo se muestran las etapas completadas de la solicitud. Por ejemplo, en el caso de que sólo se muestre `Total response time`, el tiempo de espera se produjo durante la resolución DNS.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indica que la duración del test (solicitud + aserciones) alcanza la duración máxima (60,5 segundos).

## Permisos

De manera predeterminada, sólo los usuarios con los roles de [administrador de Datadog y estándar de Datadog][9] pueden crear, editar y eliminar tests TCP Synthetic. Para crear, editar y eliminar tests TCP Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][9].

Si estás utilizando la [función de rol personalizado][10], añade tu usuario a cualquier rol que incluya permisos `synthetics_read` y `synthetics_write`.

### Restringir el acceso

La restricción del acceso está disponible para clientes que utilizan [roles personalizados][11] en sus cuentas.

Puedes restringir el acceso a un test TCP en función de los roles de tu organización. Al crear un test TCP, elige qué roles (además de tu usuario) pueden leer y escribir tu test.

{{< img src="synthetics/settings/restrict_access_1.png" alt="Definir permisos para tu test" style="width:70%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/private_locations
[2]: /es/synthetics/cicd_integrations
[3]: /es/synthetics/search/#search
[4]: /es/monitors/notify/#configure-notifications-and-automations
[5]: https://www.markdownguide.org/basic-syntax/
[6]: /es/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[7]: /es/synthetics/guide/synthetic-test-monitors
[8]: /es/synthetics/settings/#global-variables
[9]: /es/account_management/rbac/
[10]: /es/account_management/rbac#custom-roles
[11]: /es/account_management/rbac/#create-a-custom-role