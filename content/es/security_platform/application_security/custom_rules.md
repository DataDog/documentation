---
further_reading:
- link: /security_platform/application_security/
  tag: Documentación
  text: Monitorizar amenazas con Application Security Monitoring (ASM) de Datadog
- link: /security_platform/application_security/event_rules/
  tag: Documentación
  text: Crear reglas de eventos
- link: /security_platform/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas habituales de Application Security Monitoring (ASM) de
    Datadog
- link: /security_platform/notifications/variables/
  tag: Documentación
  text: Más información sobre las variables de notificación de Security Platform
- link: /tracing/trace_explorer/query_syntax/
  tag: Documentación
  text: Sintaxis para definir las consultas de ASM
kind: documentación
title: Reglas de detección personalizadas
---

## Información general

Application Security Monitoring (ASM) ya incluye un conjunto de [reglas de detección predefinidas][1] (OOTB) para detectar intentos de ataque y desencadenantes de vulnerabilidades que puedan causar daños en tus sistemas de producción.

No obstante, es posible que te venga bien personalizar algunas reglas para que se adapten a tu entorno. Por ejemplo, puede que te resulte útil personalizar una regla que detecte intentos de ataque en una ruta de desarrollo de preproducción que acepte SQL y devuelva resultados. Detectar intentos de inyección de SQL genera mucho ruido, ya que la ruta está restringida a desarrolladores internos. Por tanto, puedes personalizar la regla de manera que se excluyan estos patrones.

También puedes personalizar una regla para que se excluya una herramienta de análisis de seguridad interna. ASM detectará su actividad como siempre, pero quizá no quieras recibir notificaciones de los análisis que realiza habitualmente.

En estos casos, se puede crear una regla de detección personalizada para excluir dichos eventos. En esta guía, te explicamos cómo crear una regla de detección personalizada en ASM.

## Configuración

Para personalizar una regla de detección predefinida, lo primero que tienes que hacer es clonar una regla ya existente. Ve a la sección [Detection Rules (Reglas de detección)][2] y selecciónala. Desplázate hasta el final de la regla y haz clic en el botón Clone Rule (Clonar regla). Así, podrás editar la regla.

### Definir una consulta de ASM

Crea una consulta de ASM siguiendo la [misma sintaxis de consulta que en la herramienta Trace Explorer de APM][3]. Por ejemplo, puedes crear una consulta para monitorizar un endpoint y detectar intentos de inyección de SQL: `@appsec.type:sql_injection -@http.url_details.path:"/debug-endpoint-executing-sql" env:production`.

También puedes definir una agrupación de count único y señal. Cuenta el número de valores únicos que se observan en relación con un atributo en una franja de tiempo determinada. El parámetro group-by definido genera una señal por cada valor group-by. Lo más habitual es que el parámetro group-by sea una entidad (un usuario o una IP). Este parámetro también se usa para [unir consultas](#joining-queries).

Puedes añadir más consultas pulsando el botón Add Query (Añadir consulta).

##### Opciones avanzadas

Haz clic en la opción **Advanced** para añadir consultas que solo activen una señal cuando (**Only trigger a signal when:**) se encuentre un valor o que nunca activen una señal cuando (**Never trigger a signal when:**) se encuentre un valor. Por ejemplo, si un servicio activa una señal, pero la acción es benigna y no quieres que dicho servicio vuelva a activar más señales, tienes que crear una consulta de logs que excluya el parámetro `Service` mediante la opción **Never trigger a signal when:**.

##### Unir consultas

Unir consultas para abarcar una franja de tiempo puede aumentar la fiabilidad o la gravedad de la señal de seguridad. Por ejemplo, para detectar un ataque exitoso, se pueden correlacionar los desencadenantes de éxito y fracaso en un servicio.

Las consultas se correlacionan empleando el valor `group by`. El valor `group by` suele ser una entidad (por ejemplo, `IP address` o `Service`), aunque también puede ser un atributo.

Por ejemplo, puedes crear consultas opuestas para buscar la misma actividad `sql_injection`, pero añadirles consultas de ruta HTTP opuestas para detectar intentos exitosos y fallidos:

Consulta 1: `@appsec.type:sql_injection -@http.url_details.path:"/debug-endpoint-executing-sql" env:production`.

Consulta 2: `@appsec.type:sql_injection @http.url_details.path:"/debug-endpoint-executing-sql" env:production`.

En este caso, las consultas unidas técnicamente contienen el mismo valor de atributo: el valor debe ser el mismo para el caso que se quiere encontrar. Si no existe un valor `group by`, nunca se encontrará el caso. Se genera una señal de seguridad por cada valor `group by` único cuando se encuentra una coincidencia con un caso.

### Configurar casos de reglas

#### Activación

Los casos de las reglas, como `successful trigger > 0`, se evalúan como sentencias de casos. Por ello, el primer caso para el que se encuentre una coincidencia generará la señal. Crea uno o varios casos para tus reglas y haz clic en la zona gris situada junto a ellos para arrastrarlos y reordenarlos.

Los casos de las reglas contienen operaciones lógicas (`>, >=, &&, ||`) para determinar si debe generarse una señal según los counts de eventos de las consultas definidas previamente.

**Nota**: La etiqueta de la consulta debe situarse por delante del operador. Por ejemplo, `a > 3` es válido y `3 < a` no es válido.

Ponle **nombre** a cada caso de regla. Este nombre se añadirá al nombre de la regla cuando se genere una señal.

#### Gravedad y notificación

Establece la gravedad de la señal. En el menú desplegable puedes seleccionar el nivel de gravedad pertinente (`INFO`, `LOW`, `MEDIUM`, `HIGH` o `CRITICAL`).

En la sección "Notificar", configura uno o varios [destinatarios de las notificaciones][4] para cada caso de regla. También puedes no configurar ninguno.

Además, puedes crear [reglas de notificación][5] para no tener que hacer tantos cambios manuales en las preferencias de las notificaciones de cada una de las reglas de detección.

### Ventanas de tiempo

Se especifica un parámetro `evaluation window` que debe usarse cuando al menos uno de los casos arroja una coincidencia verdadera. Se trata de un periodo variable, y la evaluación se realiza en tiempo real. 

Cuando se genera una señal, esa señal se deja “abierta” si un caso coincide al menos una vez durante el periodo `keep alive`. Cada vez que un evento nuevo coincida con cualquiera de los casos, se actualizará en la señal la marca de tiempo con la *actualización más reciente*.

La señal “se cerrará” igualmente si se encuentra una coincidencia para la consulta cuando ya se ha superado el tiempo de `maximum signal duration`. Este tiempo se calcula a partir de la marca de tiempo de la primera visualización.

Se pueden añadir más casos haciendo clic en el botón **Add Case** (Añadir caso).

**Nota**: El valor de `evaluation window` debe ser inferior o igual a `keep alive` y `maximum signal duration`.

### Saber qué ocurre

En la sección **Nombre de la regla** puedes configurar tanto el nombre de la regla que aparece en la vista de la lista de reglas como el título de la señal.

Utiliza [variables de notificación][5] para proporcionar detalles concretos sobre la señal especificando sus etiquetas (tags) y atributos de evento.

#### Variables de plantilla

Usa [variables de plantilla][6] para introducir contexto dinámico de las trazas directamente en una señal de seguridad y las notificaciones asociadas.

Las variables de plantilla también permiten establecer enlaces profundos en Datadog o un portal asociado para llegar rápidamente a los pasos siguientes e investigar. Por ejemplo:

```text
* [Investigar el servicio en el dashboard de servicios](https://app.datadoghq.com/example/integration/application-security---service-events?tpl_var_service={{@service}})
```

Las variables de plantilla con epoch crean una cadena en lenguaje natural o un número matemático en las notificaciones. Por ejemplo, puedes usar valores como `first_seen`, `last_seen` y `timestamp` (en milisegundos) en una función para recibir una cadena legible en las notificaciones. Una muestra:

```text
{{eval "first_seen_epoch-15*60*1000"}}
```

Los atributos se ven en las señales en el menú desplegable JSON, y tú puedes acceder a ellos usando esta sintaxis: `{{@attribute}}`. Para acceder a las claves internas de los atributos de evento, utiliza la notación de puntos en JSON (por ejemplo, `{{@attribute.inner_key}}`).

**Nota**: Puedes copiar el código JSON sin modificarlo directamente de una señal de seguridad. Elige cualquier señal de seguridad en el explorador de señales para ver sus detalles. Haz clic en el botón de exportación de la esquina superior izquierda y selecciona **Copy raw JSON to clipboard** (Copiar JSON sin modificar en el portapapeles).

Este objeto JSON es un ejemplo de los atributos de evento que pueden asociarse a una señal de seguridad:

```json
{
  "attributes":{
    "title":"Herramienta de análisis detectada",
    "http":{
      "url":"http://www.ejemplo.com"
    },
    "rule":{
      "detectionMethod":"threshold",
      "name":"El nombre de tu regla"
    },
    "events_matched":2,
    "first_seen":"2022-01-26T13:23:33.000Z",
    "last_seen":"2022-01-27T04:01:57.000Z"
  },
  "groupByPaths":[
    "service"
  ]
}
```

Siguiendo con este atributo, utiliza esto en la sección “Saber qué ocurre”:

```
Rutas reales destinadas para {{@service}}.
```

Así, aparecerá el nombre del servicio en todas las notificaciones que recibas.

```
Rutas reales destinadas para `your_service_name`.
```

También puedes emplear la lógica if-else para ver si un atributo existe. Usa esta notación:

```
{{#if @network.client.ip}}El atributo IP existe.{{/if}}
```

Otra opción es usar la lógica if-else para ver si un atributo coincide con un valor:

```
{{#is_exact_match "@network.client.ip" "1.2.3.4"}}La IP coincide.{{/is_exact_match}}
```

Consulta la sección [Variables de plantilla][6] para obtener más información.

Utiliza el menú desplegable Tag Resulting Signals (Etiquetar las señales resultantes) para asignar distintas etiquetas a las señales, como `attack:sql-injection-attempt`.

**Nota**: La etiqueta `security` es especial, ya que sirve para clasificar la señal de seguridad. Las opciones recomendadas son `attack`, `threat-intel`, `compliance`, `anomaly` y `data-leak`.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security_platform/default_rules/#cat-application-security
[2]: https://app.datadoghq.com/security/appsec/signals-rules
[3]: /es/tracing/trace_explorer/query_syntax/
[4]: /es/monitors/notify/?tab=is_alert#integrations
[5]: /es/security_platform/notifications/variables/
[6]: /es/security_platform/notifications/variables/#template-variables