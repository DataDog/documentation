---
algolia:
  category: Documentación
  rank: 70
  subcategory: Tests de API Synthetic
  tags:
  - icmp
  - test icmp
  - tests icmp
aliases:
- /es/synthetics/icmp_test
- /es/synthetics/icmp_check
description: Monitoriza la disponibilidad de tus hosts y diagnostica problemas de
  red.
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentación de la monitorización Synthetic de Datadog
- link: /getting_started/synthetics/api_test
  tag: Documentación
  text: Empezando con los tests de API
- link: /synthetics/private_locations
  tag: Documentación
  text: Ejecutar pings de ICMP en endpoints internos
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Más información sobre los monitores de test Synthetic
title: Tests ICMP
---

## Información general

Los tests ICMP te permiten monitorizar la disponibilidad de tus hosts y diagnosticar problemas de comunicación de red. Al aplicar aserciones a los valores recibidos de uno o más pings de ICMP a tu endpoint, Datadog puede ayudarte a detectar problemas de conectividad, latencia por encima de la cuota de tiempos de ida y vuelta y cambios inesperados en la configuración del firewall de seguridad. Los tests también pueden hacer un seguimiento el número de saltos de red (TTL) necesarios para conectarse a tu host y ver los resultados de traceroute para analizar los detalles de cada salto de red que se produce en la ruta.

Los tests ICMP pueden ejecutarse tanto desde [localizaciones gestionadas](#select-locations) como de [localizaciones privadas][1] dependiendo de si quieres activar pings de ICMP a tus endpoints desde fuera o dentro de tu red. Los tests ICMP pueden ejecutarse de forma programada, bajo demanda o directamente dentro de tus [pipelines CI/CD][2].

## Configuración

Puedes crear un test utilizando una de las siguientes opciones:

   - **Crea un test a partir de una plantilla**:

       1. Pasa el ratón por encima de una de las plantillas ya rellenadas y haz clic en **View Template** (Ver plantilla). Se abrirá un panel lateral en el que se mostrará la información de configuración rellenada previamente, que incluye: detalles de tests, detalles de solicitudes, aserciones, condiciones de alerta y parámetros de monitor. 
       2. Haz clic en **+Create Test** (+Crear test) para abrir la página **Definir solicitud**, en la que podrás revisar y editar las opciones de configuración rellenadas previamente. Los campos presentados son idénticos a aquellos disponibles cuando se crea un test desde cero.
       3. Haz clic en **Save Details** (Guardar detalles) para enviar tu test de API. <br /><br>
          {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Vídeo de la página de inicio del test de la API Synthetics" video="true" >}}

   - **Crea un test desde cero**:

      1. Para crear un test desde cero, haz clic en la plantilla **+ Start from scratch** (+ Empezar desde cero) y selecciona el tipo de solicitud `ICMP`.
      1. Especifica el **nombre de dominio** o **la dirección IP** donde quieres que se ejecute tu test.
      1. Selecciona o deselecciona **Seguimiento del número de saltos de red (TTL)**. Cuando se selecciona, esta opción activa un probe "traceroute" para detectar todas las puertas de enlace en la ruta que lleva al host de destino.
      1. Elige el **Número de pings** que se deben activar por sesión de test. Por defecto, el número de pings es cuatro. Puedes bajarlo o aumentarlo hasta un máximo de diez.
      1. **Pon un nombre** a tu test ICMP.
      1. Añade **etiquetas** (tags) de entorno así como cualquier otra etiqueta a tu test ICMP. A continuación, puedes utilizar estas etiquetas para filtrar tus tests Synthetic en la [página de monitorización Synthetic y tests continuos][3]. 
      1. Haz clic en **Test Host* (Probar host) para probar la configuración de la solicitud. Aparecerá una vista previa de la respuesta en la parte derecha de la pantalla.<br /><br>

        {{< img src="synthetics/api_tests/icmp_test_config_2.png" alt="Definir una solicitud ICMP" style="width:90%;" >}}
      8. Haz clic en **Create Test** (Crear test) para enviar tu test de API.




### Fragmentos

{{% synthetics-api-tests-snippets %}}

### Definición de aserciones

Las aserciones definen cuál es el resultado esperado de un test. Después de hacer clic en **URL del test**, se añaden las aserciones básicas en `latency`, `packet loss` y `packet received`. Debes definir al menos una aserción para que sea monitorizada por tu test.

| Tipo          | Agregación    |Operador                                                                               | Tipo de valor       |
|-----------------|----------------|------------------------------------------------------------------------|------------------|
| latencia         | `avg`, `max`, `min` o `stddev` (también llamado `jitter`) |`is less than`, `is less than or equal`, <br> `is`, `is more than`, `is more than or equal` | Entero (ms)    |
| pérdida de paquetes     | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | Porcentaje (%) |
| paquetes recibidos | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | Entero        |
| saltos de red    | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | Entero        |

Puedes crear hasta 20 aserciones por test de API haciendo clic en **Nueva aserción** o haciendo clic directamente en la vista previa de la respuesta:

{{< img src="synthetics/api_tests/icmp_assertion.png" alt="Definir aserciones en las que tu test ICMP tenga éxito o falle" style="width:90%;" >}}

Si un test no contiene una aserción en el cuerpo de la respuesta, la carga útil del cuerpo cae y devuelve un tiempo de respuesta asociado para la solicitud dentro del límite de tiempo de espera establecido por el worker de Synthetics.

Si un test contiene una aserción en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparecerá el error `Assertions on the body/response cannot be run beyond this limit`.

### Seleccionar localizaciones

Selecciona las **Localizaciones** desde donde ejecutar tu test ICMP. Los tests ICMP pueden ejecutarse desde localizaciones gestionadas y también [privadas][1], en función de si prefieres activar pings de ICMP desde fuera o desde dentro de tu red.

{{% managed-locations %}}

### Indicar la frecuencia del test

Los tests ICMP se pueden ejecutar:

* **De forma programada** para garantizar que los servicios más importantes siempre resulten accesibles para tus usuarios. Selecciona la frecuencia con la que quieres que Datadog ejecute tu test ICMP.
* [**Dentro de tus pipelines CI/CD**][2].
* **Bajo demanda** para ejecutar tus tests cuando sea más conveniente para tu equipo.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### Usar variables

Puedes utilizar las [variables globales definidas en la página **Parámetros**][8] en la URL y las aserciones de tus tests ICMP.

Para visualizar tu lista de variables, escribe `{{` en el campo de tu elección.

## Fallo del test

Un test se considera `FAILED` si no satisface una o más aserciones o si la solicitud ha fallado prematuramente. En algunos casos, el test puede fallar sin comprobar las aserciones respecto al endpoint.

Para obtener una lista completa de los códigos de error, consulta [Errores de test de la API][11].

## Permisos

De manera predeterminada, sólo los usuarios con los roles de [administrador de Datadog y estándar de Datadog][9] pueden crear, editar y eliminar tests ICMP Synthetic. Para crear, editar y eliminar tests ICMP Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][9].

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
[11]: /es/synthetics/api_tests/errors/#icmp-errors