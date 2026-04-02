---
aliases:
- /es/security_platform/application_security/custom_rules
- /es/security/application_security/custom_rules
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: Protégete contra las amenazas con la protección de aplicaciones y API de Datadog
- link: /security/application_security/event_rules/
  tag: Documentación
  text: Crear reglas de eventos
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Soluciona los problemas más comunes de la protección de aplicaciones y API
    de Datadog
- link: /security/notifications/variables/
  tag: Documentación
  text: Más información sobre las variables de notificación de seguridad
- link: /tracing/trace_explorer/query_syntax/
  tag: Documentación
  text: Sintaxis para definir la consulta AAP
title: Reglas de detección personalizadas
---

## Información general

La protección de aplicaciones y API (AAP) viene con un conjunto de [reglas predefinidas de detección][1] cuyo objetivo es detectar los intentos de ataque, las vulnerabilidades encontradas por el atacante y el abuso de la lógica de negocios que afectan a tus sistemas de producción.

Sin embargo, hay situaciones en las que puedes querer personalizar una regla según tu entorno o carga de trabajo. Por ejemplo, es posible que desees personalizar una regla de detección que detecte a los usuarios que realizan acciones confidenciales desde una geolocalización en la que no opera tu empresa.

Otro ejemplo es la personalización de una regla para excluir un escáner de seguridad interno. AAP detecta su actividad como es de esperar. Sin embargo, es posible que no desees que se te notifique su análisis periódico.

En estas situaciones, se puede crear una regla de detección personalizada para excluir tales eventos. Esta guía muestra cómo crear una regla de detección personalizada para AAP.

## Regla de detección de abuso de lógica de negocio

AAP ofrece reglas predefinidas para detectar el abuso de la lógica de negocios (por ejemplo, restablecer una contraseña mediante fuerza bruta). Estas reglas requieren [añadir información de lógica de negocios a las traces (trazas)][7].

Intento reciente de las bibliotecas de rastreo de Datadog de detectar y enviar el inicio de sesión de usuario y los eventos de registro automáticamente sin necesidad de modificar el código. En caso necesario, puedes [desactivar el rastreo automático del evento de la actividad del usuario][8].

Puedes filtrar las reglas e identificar qué lógica de negocio empezar a rastrear. Además, puedes utilizar estas reglas como modelo para crear reglas personalizadas basadas en tu propia lógica de negocio.

Consulta la sección siguiente para ver cómo configurar tus reglas.

## Configuración

Para personalizar una regla de detección predefinida, lo primero que tienes que hacer es clonar una regla ya existente. Ve a la sección [Detection Rules (Reglas de detección)][2] y selecciónala. Desplázate hasta el final de la regla y haz clic en el botón Clone Rule (Clonar regla). Así, podrás editar la regla.

### Definir una consulta de AAP

Construye una consulta de AAP utilizando la [misma sintaxis de consulta que en el Trace Explorer de AAP][3]. Por ejemplo, crea una consulta para monitorizar éxitos de inicio de sesión desde el exterior de Estados Unidos: `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`.

También puedes definir un count único y una agrupación de señales. Cuenta el número de valores únicos que se observan en relación con un atributo en una franja de tiempo determinada. El parámetro group-by definido genera una señal por cada valor group-by. Lo más habitual es que el parámetro group-by sea una entidad (un usuario, una IP o servicio). Este parámetro también se usa para [unir consultas](#joining-queries).

Utiliza la sección de vista previa para ver qué traces (trazas) de AAP coinciden con la consulta de búsqueda. También puedes añadir consultas adicionales con el botón Añadir consulta.

##### Unir consultas

Unir consultas para abarcar una franja de tiempo puede aumentar la fiabilidad o la gravedad de la señal de seguridad. Por ejemplo, para detectar un ataque exitoso, se pueden correlacionar los desencadenantes de éxito y fracaso en un servicio.

Las consultas se correlacionan empleando el valor `group by`. El valor `group by` suele ser una entidad (por ejemplo, `IP` o `Service`), aunque también puede ser un atributo.

Por ejemplo, puedes crear consultas opuestas para buscar la misma actividad `business_logic.users.login.success`, pero añadirles consultas de ruta HTTP opuestas para detectar intentos exitosos y fallidos:

Consulta 1: `@appsec.security_activity:business_logic.users.login.success @actor.ip_details.country.iso_code:US`.

Consulta 2: `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`.

En este caso, las consultas unidas técnicamente contienen el mismo valor de atributo: el valor debe ser el mismo para el caso que se quiere encontrar. Si no existe un valor `group by`, nunca se encontrará el caso. Se genera una señal de seguridad por cada valor `group by` único cuando se encuentra una coincidencia con un caso.

### Excluir la actividad benigna con consultas de supresión

En el campo **Only generate a signal if there is a match** (Generar una señal solo si hay una coincidencia), tienes la opción de introducir una consulta para que solo se genere un desencadenante cuando se cumpla un valor.

En el campo **Only generate a signal if there is a match** (Esta regla no generará una señal si hay una coincidencia), tienes la opción de introducir consultas de supresión para que no se genere un desencadenante cuando se cumplan los valores. Por ejemplo, si un servicio está activando una señal, pero la acción es benigna y ya no deseas que se activen señales desde este servicio, crea una consulta que excluya `service`.

### Configurar casos de reglas

#### Activación

Los casos de las reglas, como `successful login > 0`, se evalúan como sentencias “case”. Por ello, el primer caso para el que se encuentre una coincidencia generará la señal. Crea uno o varios casos para tus reglas y haz clic en la zona gris situada junto a ellos para arrastrarlos y reordenarlos.

Los casos de las reglas contienen operaciones lógicas (`>, >=, &&, ||`) para determinar si debe generarse una señal según el número de eventos de las consultas definidas previamente.

**Nota**: La etiqueta de la consulta debe situarse por delante del operador. Por ejemplo, `a > 3` es válido y `3 < a` no es válido.

Ponle **nombre** a cada caso de regla. Este nombre se añadirá al nombre de la regla cuando se genere una señal.

#### Gravedad y notificación

{{% security-rule-severity-notification %}}

### Intervalos de tiempo

{{% security-rule-time-windows %}}

Haz clic en **Add case** (Añadir caso) para añadir casos adicionales.

**Nota**: El valor de `evaluation window` debe ser inferior o igual a `keep alive` y `maximum signal duration`.

### Decir qué está ocurriendo

{{% security-rule-say-whats-happening %}}

Utilice el menú desplegable **etiquetar señales resultantes** para añadir etiquetas (tags) a sus señales. Por ejemplo, `attack:sql-injection-attempt`.

**Nota**: La etiqueta `security` es especial, ya que sirve para clasificar la señal de seguridad. Las opciones recomendadas son `attack`, `threat-intel`, `compliance`, `anomaly` y `data-leak`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/default_rules/?category=cat-application-security
[2]: https://app.datadoghq.com/security/appsec/signals-rules
[3]: /es/tracing/trace_explorer/query_syntax/
[4]: /es/monitors/notify/?tab=is_alert#integrations
[5]: /es/security/notifications/variables/
[6]: /es/security/notifications/variables/#template-variables
[7]: /es/security/application_security/how-it-works/add-user-info/?tab=set_user#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[8]: /es/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking