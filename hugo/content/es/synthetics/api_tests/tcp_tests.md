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

Puedes crear un test utilizando una de las siguientes opciones:

- **Crea un test a partir de una plantilla**:

     1. Pasa el ratón por encima de una de las plantillas ya rellenadas y haz clic en **View Template** (Ver plantilla). Se abrirá un panel lateral en el que se mostrará la información de configuración rellenada previamente, que incluye: detalles de tests, detalles de solicitudes, aserciones, condiciones de alerta y parámetros de monitor. 
     2. Haz clic en **+Create Test** (+Crear test) para abrir la página **Define Request** (Definir solicitud), en la que podrás revisar y editar las opciones de configuración rellenadas previamente. Los campos presentados son idénticos a aquellos disponibles cuando se crea un test desde cero.
     3. Haz clic en **Save Details** (Guardar detalles) para enviar tu test de API. <br /><br>
        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Vídeo de la página de inicio del test de la API de Synthetics" video="true" >}}

- **Crea un test desde cero**:

    1. Para crear un test desde cero, haz clic en la plantilla **+ Start from scratch** (+ Empezar desde cero) y selecciona el tipo de solicitud `TCP`.
    1. Especifica el **Host** y el **Puerto** para ejecutar tu prueba.
    1. Decide si quieres habilitar el **Seguimiento del número de saltos de red (TTL)** o no. Esta opción te permite demostrar el número de saltos de red y tener acceso a una traceroute de TCP en los resultados de tu test.
    1. Especifica la cantidad de tiempo en segundos antes de que se inicie un tiempo de espera en el test (opcional).
    1. **Pon un nombre** a tu test TCP.
    1. Añade **etiquetas** de entorno así como cualquier otra etiqueta a tu test TCP. A continuación, puedes utilizar estas etiquetas para filtrar a través de tus tests de Synthetic en la [página de monitorización de Synthetic y tests continuos][3]. 
    1. Haz clic en **Test Host* (Probar host) para probar la configuración de la solicitud. Aparecerá una vista previa de la respuesta en la parte derecha de la pantalla.<br /><br>

       {{< img src="synthetics/api_tests/tcp_test_config_2.png" alt="Definir la conexión TCP" style="width:90%;" >}}

    8. Haz clic en **Create Test** (Crear test) para enviar tu test de API.


### Fragmentos

{{% synthetics-api-tests-snippets %}}

### Definición de aserciones

Las aserciones definen cuál es un resultado de test esperado. Al hacer clic en **URL del test**, se añaden aserciones básicas sobre el `response time`. Debes definir al menos una aserción para que sea monitorizada por tu test.

| Tipo          | Operador                                                                | Tipo de valor     |
|---------------|-------------------------------------------------------------------------|----------------|
| tiempo de respuesta | `is less than`                                                          | _Entero (ms)_ |
| saltos de red    | `is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | Entero        |
| conexión | `is`                                                          | `established`, `refused`, `timeout` |

Puedes crear hasta 20 aserciones por test de API haciendo clic en **Nueva aserción** o haciendo clic directamente en la vista previa de la respuesta:

{{< img src="synthetics/api_tests/assertions_tcp.png" alt="Definir aserciones en las que tu test TCP tenga éxito o falle" style="width:90%;" >}}

Si un test no contiene una aserción en el cuerpo de la respuesta, la carga útil del cuerpo cae y devuelve un tiempo de respuesta asociado para la solicitud dentro del límite de tiempo de espera establecido por el worker de Synthetics.

Si un test contiene una aserción en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparecerá el error `Assertions on the body/response cannot be run beyond this limit`.

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

### Usar variables

Puedes utilizar las [variables globales definidas en la página **Parámetros**][8] en la URL, las opciones avanzadas y las aserciones de tus tests TCP.

Para visualizar tu lista de variables, escribe `{{` en el campo de tu elección.

## Fallo del test

Un test se considera `FAILED` si no satisface una o más aserciones o si la solicitud ha fallado prematuramente. En algunos casos, el test puede fallar sin comprobar las aserciones respecto al endpoint.

Para obtener una lista completa de los códigos de error, consulta [Errores de test de la API][11].

## Permisos

De manera predeterminada, sólo los usuarios con los roles de [administrador de Datadog y estándar de Datadog][9] pueden crear, editar y eliminar tests TCP Synthetic. Para crear, editar y eliminar tests TCP Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][9].

Si estás utilizando la [función de rol personalizado][10], añade tu usuario a cualquier rol que incluya permisos `synthetics_read` y `synthetics_write`.

### Restringir el acceso

{{% synthetics_grace_permissions %}}

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
[11]: /es/synthetics/api_tests/errors/#tcp-errors