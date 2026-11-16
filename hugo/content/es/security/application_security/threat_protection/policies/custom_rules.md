---
aliases:
- /es/security/application_security/policies/custom_rules/
- /es/security_platform/application_security/custom_rules
- /es/security/application_security/custom_rules
- /es/security/application_security/threats/attacker_fingerprint
further_reading:
- link: /security/application_security/
  tag: Documentación
  text: Protéjase contra amenazas con la Protección de aplicaciones y API de Datadog
- link: /security/application_security/threat_protection/policies/inapp_waf_rules/
  tag: Documentación
  text: Creación de reglas WAF en la aplicación
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucione problemas comunes de la Protección de aplicaciones y API de Datadog
- link: /security/notifications/variables/
  tag: Documentación
  text: Obtenga más información sobre las variables de notificación de Security
- link: /tracing/trace_explorer/query_syntax/
  tag: Documentación
  text: Sintaxis para definir la consulta de AAP
title: Reglas de detección personalizadas
---
## Descripción general {#overview}

La Protección de aplicaciones y API (AAP) incluye un conjunto de [reglas de detección preconfiguradas][1] que tienen como objetivo detectar intentos de ataque, vulnerabilidades encontradas por atacantes y abusos de lógica de negocio que afectan a sus sistemas de producción.

Sin embargo, hay situaciones en las que es posible que desee personalizar una regla según su entorno o carga de trabajo. Por ejemplo, es posible que desee personalizar una regla de detección que detecte a los usuarios que realizan acciones confidenciales desde una ubicación geográfica donde su empresa no opera.

Otro ejemplo es personalizar una regla para excluir un escáner de Security interno. AAP detecta su actividad como se espera. Sin embargo, es posible que no desee recibir notificaciones de su escaneo recurrente.

En estas situaciones, se puede crear una regla de detección personalizada para excluir dichos eventos. Esta guía le muestra cómo crear una regla de detección personalizada para AAP.

## Regla de detección de abuso de lógica de negocio {#business-logic-abuse-detection-rule}

AAP ofrece reglas preconfiguradas para detectar el abuso de lógica de negocio (por ejemplo, restablecer una contraseña mediante fuerza bruta). Esas reglas requieren [agregar información de lógica de negocio a las trazas][7].

Los SDK de Datadog recientes intentan detectar y enviar eventos de inicio de sesión y registro de usuario automáticamente sin necesidad de modificar el código. Si es necesario, puede [optar por no participar en el seguimiento automático de eventos de actividad del usuario][8].

Puede filtrar las reglas e identificar qué lógica de negocio comenzar a hacer un seguimiento. Además, puede usar estas reglas como modelo para crear reglas personalizadas basadas en su propia lógica de negocio. 

Consulte la sección a continuación para ver cómo configurar sus reglas.

## Configuración {#configuration}

Para personalizar una regla de detección preconfigurada, primero debe clonar una regla existente. Navegue a sus [Reglas de detección][2] y seleccione una regla. Desplácese hasta la parte inferior de la regla y haga clic en el botón {{< ui >}}Clone Rule{{< /ui >}}. Esto ahora le permite editar la regla existente.

### Defina una consulta AAP {#define-an-aap-query}

Construya una consulta AAP usando la [misma sintaxis de consulta que en AAP Trace Explorer][3]. Por ejemplo, cree una consulta para hacer un seguimiento de inicios de sesión exitosos desde fuera de los Estados Unidos: `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`.

Opcionalmente, defina un conteo único y una agrupación de señales. Cuente el número de valores únicos observados para un atributo en un marco de tiempo determinado. El group-by definido genera una señal para cada valor de group-by. Por lo general, el group-by es una entidad (como usuario, IP o servicio). El group-by también se usa para [unir las consultas](#joining-queries).

Use la sección de vista previa para ver qué trazas de AAP coinciden con la consulta de búsqueda. También puede agregar consultas adicionales con el botón {{< ui >}}Add Query{{< /ui >}}.

##### Unión de consultas {#joining-queries}

Unir consultas para abarcar un marco de tiempo puede aumentar la confianza o la gravedad de la Señal de Seguridad. Por ejemplo, para detectar un ataque exitoso, se pueden correlacionar tanto los activadores exitosos como los fallidos para un servicio.

Las consultas se correlacionan mediante el uso de un valor `group by`. El valor `group by` es normalmente una entidad (por ejemplo, `IP` o `Service`), pero puede ser cualquier atributo.

Por ejemplo, cree consultas opuestas que busquen la misma actividad `business_logic.users.login.success`, pero añada consultas de ruta HTTP opuestas para intentos exitosos y fallidos:

Consulta 1: `@appsec.security_activity:business_logic.users.login.success @actor.ip_details.country.iso_code:US`.

Consulta 2: `@appsec.security_activity:business_logic.users.login.success -@actor.ip_details.country.iso_code:US`.

En este caso, las consultas unidas técnicamente mantienen el mismo valor de atributo: el valor debe ser el mismo para que se cumpla la incidencia. Si un valor `group by` no existe, la incidencia nunca se cumplirá. Se genera una señal de seguridad para cada valor `group by` único cuando se cumple una incidencia.

### Excluir actividad benigna con consultas de supresión {#exclude-benign-activity-with-suppression-queries}

En el campo {{< ui >}}Only generate a signal if there is a match{{< /ui >}}, tiene la opción de ingresar una consulta para que solo se genere un activador cuando se cumpla un valor.

En el campo {{< ui >}}This rule will not generate a signal if there is a match{{< /ui >}}, tiene la opción de ingresar consultas de supresión para que no se genere un activador cuando se cumplan los valores. Por ejemplo, si un servicio está activando una señal, pero la acción es benigna y ya no desea que se generen señales desde este servicio, cree una consulta que excluya `service`.

### Establecer una incidencia de regla {#set-a-rule-case}

#### Activador {#trigger}

Los casos de regla, como `successful login > 0`, se evalúan como declaraciones de incidencia. Por lo tanto, la primera incidencia que coincida genera la señal. Cree una o varias incidencias de regla y haga clic en el área gris junto a ellas para arrastrar y manipular su orden.

Un caso de regla contiene operaciones lógicas (`>, >=, &&, ||`) para determinar si se debe generar una señal según los conteos de eventos en las consultas definidas previamente.

**Nota**: La etiqueta de la consulta debe preceder al operador. Por ejemplo, `a > 3` está permitido; `3 < a` no está permitido.

Proporcione un nombre para cada incidencia de regla. Este nombre se añade al nombre de la regla cuando se genera una señal.

#### Gravedad y notificación {#severity-and-notification}

{{% security-rule-severity-notification %}}

### Ventanas de tiempo {#time-windows}

{{% security-rule-time-windows %}}

Haga clic en {{< ui >}}Add Case{{< /ui >}} para agregar casos adicionales.

**Nota**: El `evaluation window` debe ser menor o igual que el `keep alive` y el `maximum signal duration`.

### Diga lo que está sucediendo {#say-whats-happening}

{{% security-rule-say-whats-happening %}}

Utilice el menú desplegable {{< ui >}}Tag resulting signals{{< /ui >}} para agregar etiquetas a sus señales. Por ejemplo, `attack:sql-injection-attempt`.

**Nota**: La etiqueta `security` es especial. Esta etiqueta se utiliza para clasificar la señal de seguridad. Las opciones recomendadas son: `attack`, `threat-intel`, `compliance`, `anomaly` y `data-leak`.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/default_rules/?category=cat-application-security
[2]: https://app.datadoghq.com/security/appsec/signals-rules
[3]: /es/tracing/trace_explorer/query_syntax/
[4]: /es/monitors/notify/?tab=is_alert#integrations
[5]: /es/security/notifications/variables/
[6]: /es/security/notifications/variables/#template-variables
[7]: /es/security/application_security/how-it-works/add-user-info/?tab=set_user#adding-business-logic-information-login-success-login-failure-any-business-logic-to-traces
[8]: /es/security/application_security/how-it-works/add-user-info/?tab=set_user#disabling-automatic-user-activity-event-tracking