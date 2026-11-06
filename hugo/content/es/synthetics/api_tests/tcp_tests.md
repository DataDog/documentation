---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API Tests
  tags:
  - tcp
  - tcp test
  - tcp tests
aliases:
- /es/synthetics/tcp_test
- /es/synthetics/tcp_check
description: Simule conexiones TCP en sus hosts
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Introducción a Datadog Synthetic Monitoring
- link: /getting_started/synthetics/api_test
  tag: Documentación
  text: Comience con las pruebas de API
- link: /synthetics/private_locations
  tag: Documentación
  text: Ejecute pruebas TCP en hosts internos
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Obtenga información sobre los monitores de prueba Synthetic
title: Pruebas TCP
---
## Descripción general {#overview}

Las pruebas TCP le permiten hacer un seguimiento de si se pueden establecer o no conexiones TCP de bajo nivel en los puertos de hosts determinados, asegurando la disponibilidad de varios servicios clave como `SSH` (22), `SMTP` (25), `DNS` (53), VPN sobre `HTTPS` (443) y cualquier servicio personalizado que resida en otros puertos. Con datos de tiempo de respuesta integrados, haga un seguimiento del rendimiento de sus aplicaciones de red y reciba alertas en caso de lentitud inesperada.

Las pruebas TCP pueden ejecutarse desde ubicaciones [administradas](#select-locations) y [privadas][1] según su preferencia para ejecutar la prueba desde fuera o dentro de su red. Las pruebas TCP pueden ejecutarse según un horario, bajo demanda o directamente dentro de sus [CI/CD pipelines][2].

## Configuración {#configuration}

Puede crear una prueba utilizando una de las siguientes opciones:

- **Cree una prueba a partir de una plantilla**:
   
     1. Pase el cursor sobre una de las plantillas precargadas y haga clic en {{< ui >}}View Template{{< /ui >}}. Esto abre un panel lateral que muestra información de configuración precargada, incluyendo: {{< ui >}}Test Details{{< /ui >}}, {{< ui >}}Request Details{{< /ui >}}, {{< ui >}}Assertions{{< /ui >}}, {{< ui >}}Alert Conditions{{< /ui >}} y {{< ui >}}Monitor Settings{{< /ui >}}.
     2. Haga clic en {{< ui >}}\+ Create Test{{< /ui >}} para abrir la página {{< ui >}}Define Request{{< /ui >}}, donde puede revisar y editar las opciones de configuración prellenadas. Los campos presentados son idénticos a los disponibles al crear una prueba desde cero.
     3. Haga clic en {{< ui >}}Save Details{{< /ui >}} para enviar su prueba de API.<br /><br>
        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Video de la página de inicio de la prueba de API de Synthetics con plantillas" video="true" >}}

- **Cree una prueba desde cero**:

    1. Para crear una prueba desde cero, haga clic en la plantilla {{< ui >}}\+ Start from scratch{{< /ui >}}, luego seleccione el tipo de solicitud `TCP`.
    1. Especifique el {{< ui >}}Host{{< /ui >}} y el {{< ui >}}Port{{< /ui >}} para ejecutar su prueba.
    1. Decida si desea {{< ui >}}Track number of network hops (TTL){{< /ui >}} o no. Esta opción le permite realizar aserciones sobre el número de saltos de red y tener acceso a un Traceroute TCP en los resultados de su prueba.
    1. Especifique la cantidad de tiempo en segundos antes de que la prueba agote el tiempo de espera (opcional).
    1. {{< ui >}}Name{{< /ui >}} su prueba TCP.
    1. Agregue {{< ui >}}Tags{{< /ui >}} de entorno, así como cualquier otra etiqueta a su prueba TCP. Luego puede usar estas etiquetas para filtrar sus pruebas Synthetic en la [{{< ui >}}Synthetic Monitoring & Continuous Testing{{< /ui >}} página][3]. 
    1. Haga clic en {{< ui >}}Test Host{{< /ui >}} para probar la configuración de la solicitud. Se muestra una vista previa de la respuesta en el lado derecho de su pantalla.<br /><br>

       {{< img src="synthetics/api_tests/tcp_test_config_2.png" alt="Definir conexión TCP" style="width:90%;" >}}

    8. Click {{< ui >}}Create Test{{< /ui >}} to submit your API test.


### Fragmentos {#snippets}

{{% synthetics-api-tests-snippets %}}

### Defina aserciones {#define-assertions}

Las aserciones definen cuál es el resultado esperado de una prueba. Cuando hace clic en {{< ui >}}Test URL{{< /ui >}}, se añaden aserciones básicas en `response time`. Debe definir al menos una aserción para que su prueba haga un seguimiento.

| Tipo          | Operador                                                                | Tipo de valor     |
|---------------|-------------------------------------------------------------------------|----------------|
| tiempo de respuesta | `is less than`                                                          | _Entero (ms)_ |
| saltos de red    | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _entero_        |
| conexión | `is`                                                          | `established`, `refused`, `timeout` |

Puede crear hasta 20 aserciones por prueba de API haciendo clic en {{< ui >}}New Assertion{{< /ui >}} o haciendo clic directamente en la vista previa de la respuesta:

{{< img src="synthetics/api_tests/assertions_tcp.png" alt="Defina aserciones para que su prueba TCP tenga éxito o falle" style="width:90%;" >}}

Si una prueba no contiene una aserción sobre el cuerpo de la respuesta, la carga útil del cuerpo se descarta y devuelve un tiempo de respuesta asociado para la solicitud dentro del límite de tiempo de espera establecido por el Synthetics Worker.

Si una prueba contiene una aserción en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparece un error `Assertions on the body/response cannot be run beyond this limit`.

### Seleccione ubicaciones {#select-locations}

Seleccione la {{< ui >}}Locations{{< /ui >}} desde la cual ejecutar su prueba TCP. Las pruebas TCP pueden ejecutarse desde ubicaciones administradas y [privadas][1] según su preferencia para iniciar la conexión desde fuera o dentro de su red.

{{% managed-locations %}}

### Especifique la frecuencia de la prueba {#specify-test-frequency}

Las pruebas TCP pueden ejecutarse:

* **Según un horario** para garantizar que sus servicios más importantes estén siempre accesibles para sus usuarios. Seleccione la frecuencia con la que desea que Datadog ejecute su prueba TCP.
* [**Dentro de sus pipelines de CI/CD**][2].
* **Bajo demanda** para ejecutar sus pruebas cuando tenga más sentido para su equipo.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

{{% synthetics-variables %}}

### Usar variables {#use-variables}

Puede usar las [variables globales definidas en la {{< ui >}}Settings{{< /ui >}} página][8] en la URL, las opciones avanzadas y las aserciones de sus pruebas TCP.

Para mostrar su lista de variables, escriba `{{` en el campo deseado.

## Falla de prueba {#test-failure}

Una prueba se considera `FAILED` si no cumple con una o más aserciones o si la solicitud falló prematuramente. En algunos casos, la prueba puede fallar sin probar las aserciones contra el punto de conexión.

Para obtener una lista completa de los códigos de error, consulte [API Testing Errors][11].

## Permisos {#permissions}

De forma predeterminada, solo los usuarios con los roles [Datadog Admin y Datadog Standard][9] pueden crear, editar y eliminar pruebas TCP Synthetic. Para obtener acceso para crear, editar y eliminar pruebas TCP Synthetic, actualice su usuario a uno de esos dos roles predeterminados [default roles][9].

Si está utilizando la función de rol personalizado [custom role feature][10], agregue su usuario a cualquier rol personalizado que incluya los permisos `synthetics_read` y `synthetics_write`.

### Restringir acceso {#restrict-access}

{{% synthetics_grace_permissions %}}

## Lecturas adicionales {#further-reading}

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
[11]: /es/synthetics/api_tests/errors/#tcp-errors