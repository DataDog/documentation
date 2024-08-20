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

Cuando decidas crear un test `ICMP`, define la solicitud de tu test.

### Definición de la solicitud

1. Especifica el **nombre de dominio** o **la dirección IP** donde quieres que se ejecute tu test.
2. Selecciona o deselecciona **Seguimiento del número de saltos de red (TTL)**. Cuando se selecciona, esta opción activa un probe "traceroute" para detectar todas las puertas de enlace en la ruta que lleva al host de destino.
3. Elige el **Número de pings** que se deben activar por sesión de test. Por defecto, el número de pings es cuatro. Puedes bajarlo o aumentarlo hasta un máximo de diez.
4. **Pon un nombre** a tu test ICMP.
5. Añade **Etiquetas** (tags) `env` así como cualquier otra etiqueta a tu test ICMP. Luego, puedes utilizar estas etiquetas para filtrar tus tests Synthetic en la [página de monitorización y tests continuos Synthetic][3].

{{< img src="synthetics/api_tests/icmp_test_config.png" alt="Definir una solicitud ICMP" style="width:90%;" >}}

Haz clic en **Test de URL** para probar la configuración de la solicitud. Aparecerá una vista previa de la respuesta en la parte derecha de la pantalla.

### Definición de aserciones

Las aserciones definen cuál es el resultado esperado de un test. Después de hacer clic en **Test de URL**, se añaden las aserciones básicas en `latency`, `packet loss` y `packet received`. Debes definir al menos una aserción para que sea monitorizada por tu test.

| Tipo          | Agregación    |Operador                                                                               | Tipo de valor       |
|-----------------|----------------|------------------------------------------------------------------------|------------------|
| latencia         | `avg`, `max`, `min` o `stddev` (también llamado `jitter`) |`is less than`, `is less than or equal`, <br> `is`, `is more than`, `is more than or equal` | _integer (ms)_    |
| pérdida de paquetes     | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _percentage (%)_ |
| paquetes recibidos | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _integer_        |
| saltos de red    | - |`is less than`, `is less than or equal`, `is`, `is more than`, `is more than or equal` | _integer_        |

Puedes crear hasta 20 aserciones por test de API haciendo clic en **Nueva aserción** o haciendo clic directamente en la vista previa de la respuesta:

{{< img src="synthetics/api_tests/icmp_assertion.png" alt="Definir aserciones en las que tu test ICMP tenga éxito o falle" style="width:90%;" >}}

Si un test no contiene una aserción en el cuerpo de la respuesta, la carga útil del cuerpo cae y devuelve un tiempo de respuesta asociado para la solicitud, dentro del límite de tiempo de espera establecido por el worker de Synthetics.

Si un test contiene una aserción en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparece un error `Assertions on the body/response cannot be run beyond this limit`.

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

### Uso de variables

Puedes utilizar las [variables globales definidas en la página **Parámetros**][8] en la URL y las aserciones de tus tests ICMP.

Para visualizar tu lista de variables, escribe `{{` en el campo de tu elección.

## Fallo del test

Un test se considera `FAILED` si no satisface una o más aserciones o si la solicitud ha fallado prematuramente. En algunos casos, el test puede fallar sin comprobar las aserciones respecto al endpoint.

Entre las razones figuran las siguientes:

`DNS`:
No se ha encontrado la entrada DNS para la URL del test. Entre las posibles causas se incluyen una URL de test mal configurada o una configuración incorrecta de las entradas DNS.

## Permisos

De manera predeterminada, sólo los usuarios con los roles de [administrador de Datadog y estándar de Datadog][9] pueden crear, editar y eliminar tests ICMP Synthetic. Para crear, editar y eliminar tests ICMP Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][9].

Si estás utilizando la [función de rol personalizado][10], añade tu usuario a cualquier rol que incluya permisos `synthetics_read` y `synthetics_write`.

### Restringir el acceso

La restricción del acceso está disponible para clientes que utilizan [roles personalizados][11] en sus cuentas.

Puedes restringir el acceso a un test ICMP en función de los roles de tu organización. Al crear un test ICMP, eliges qué roles (además de tu usuario) pueden leer y escribir tu test.

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