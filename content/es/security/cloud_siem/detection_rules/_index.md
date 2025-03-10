---
aliases:
- /es/security_platform/detection_rules/cloud_siem
- /es/security_platform/detection_rules/security_monitoring
- /es/security_platform/detection_rules/create_a_new_rule
- /es/security_platform/cloud_siem/log_detection_rules/
- /es/cloud_siem/detection_rules/security_monitoring/
- /es/security/detection_rules/cloud_siem/
- /es/security/detection_rules/security_monitoring
- /es/security/detection_rules/create_a_new_rule
- /es/security/cloud_siem/log_detection_rules/
further_reading:
- link: /cloud_siem/default_rules/
  tag: Documentación
  text: Configurar reglas de detección predeterminadas de Cloud SIEM
- link: /cloud_siem/explorer/
  tag: Documentación
  text: Más información sobre Security Signals Explorer
- link: https://www.datadoghq.com/blog/detect-unauthorized-third-parties-aws/
  tag: Blog
  text: Detectar terceros no autorizados en tu cuenta de AWS
- link: https://www.datadoghq.com/blog/anomaly-detection-rules-datadog/
  tag: Blog
  text: Detectar amenazas a la seguridad con reglas de detección de anomalías
- link: /security/notifications/variables/
  tag: Documentación
  text: Más información sobre las variables de notificación de seguridad
- link: https://www.datadoghq.com/blog/monitor-cloudflare-zero-trust/
  tag: Blog
  text: Monitorizar Cloudflare Zero Trust con Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Monitorizar 1Password con Datadog Cloud SIEM
title: Reglas de detección
type: Documentación
---

## Información general

Para crear una regla de detección de logs en Datadog, ve a la página [Reglas de detección][1] y haz clic en **New Rule** (Nueva regla).

## Tipo de regla

En el caso de Cloud SIEM (Security Information y Event Management), selecciona **Log Detection** (Detección de logs) para analizar en tiempo real el contenido de logs.

## Métodos de detección

### Umbral

Define cuándo los eventos superan un umbral definido por el usuario. Por ejemplo, si creas un desencadenante con un umbral de `>10`, se produce una señal de seguridad cuando se cumple la condición.

### Nuevo valor

Detecta cuando un atributo cambia a un nuevo valor. Por ejemplo, si creas un desencadenante basado en un atributo específico, como `country` o `IP address`, se generará una señal de seguridad siempre que se vea un nuevo valor que no se haya visto antes.

### Anomalía

Cuando la configuración de un umbral específico no es una opción, puedes definir una regla de detección de anomalías en su lugar. Con la detección de anomalías, se obtiene automáticamente un umbral dinámico a partir de las observaciones anteriores de los eventos.

### Impossible Travel

Impossible Travel detecta el acceso desde diferentes localizaciones cuya distancia es superior a la que puede recorrer un humano en el tiempo que transcurre entre los dos eventos de accesos.

### Third Party

Third Party te permite reenviar alertas de un proveedor o aplicación externos. Puedes actualizar la regla con consultas de supresión y a quién notificar cuando se genere una señal.

## Definir una consulta de búsqueda

{{< tabs >}}
{{% tab "Umbral" %}}

### Consulta de búsqueda

{{< img src="security/security_monitoring/detection_rules/threshold_20240904.png" alt="Definir la consulta de búsqueda" style="width:100%;" >}}

Cree una consulta de búsqueda utilizando la misma lógica que una [búsqueda de Log Explorer][1].

Opcionalmente, define un recuento único y una agrupación de señales. Cuenta el número de valores únicos observados para un atributo en un periodo determinado. La agrupación definida genera una señal para cada valor `group by`. Normalmente, el `group by` es una entidad (como usuario, o IP). Group By también se utiliza para [unir las consultas](#joining-queries).

Haz clic en **Add Query** (Añadir consulta) para añadir consultas adicionales.

**Nota**: La consulta se aplica a todas las ingestas de logs.

#### Unir consultas

La unión de logs que abarcan un marco temporal puede aumentar la confianza o la gravedad de la Señal de seguridad. Por ejemplo, para detectar un ataque de fuerza bruta exitoso, se deben correlacionar tanto los logs de autenticación exitosa como no exitosa para un usuario.

{{< img src="security/security_monitoring/detection_rules/joining_queries_20240904.png" alt="Definir consultas de búsqueda" style="width:100%;" >}}

Las reglas de detección unen los logs mediante un valor `group by`. Los valores de `group by` suelen ser entidades (por ejemplo, dirección IP o usuario), pero pueden ser cualquier atributo.

[1]: /es/logs/search_syntax/
{{% /tab %}}

{{% tab "Nuevo valor" %}}

### Consulta de búsqueda

{{< img src="security/security_monitoring/detection_rules/new_value.png" alt="Definir la consulta de búsqueda" style="width:100%;" >}}

Crea una consulta de búsqueda utilizando la misma lógica que una [consulta de Log Explorer][1]. Cada consulta tiene una etiqueta, que es una letra ASCII minúscula. El nombre de la consulta puede modificarse a partir de una letra ASCII haciendo clic en el icono del lápiz.

**Nota**: La consulta se aplica a todas las ingestas de logs.

#### Valor aprendido

Selecciona el valor o valores a detectar, la duración del aprendizaje y, opcionalmente, define una agrupación de señales. La agrupación definida genera una señal para cada valor group-by. Normalmente, group-by es una entidad (como usuario o IP).

Por ejemplo, crea una consulta para la autenticación correcta de usuarios y establece **Detect a new value** (Detectar nuevo valor) en `country` y group-by en `user`. Establece una duración de aprendizaje de `7 days`. Una vez configurado, los logs que entren en los próximos 7 días se evaluarán con los valores establecidos. Si un log entra con un nuevo valor después de la duración de aprendizaje, se genera una señal y el nuevo valor se aprende para prevenir futuras señales con este valor.

También puedes identificar usuarios y entidades con varios valores en una misma consulta. Por ejemplo, si quieres detectar cuándo un usuario inicia sesión desde un nuevo dispositivo y desde un país desde el que nunca antes había iniciado sesión, añade `device_id` y `country_name` a **Detect new value** (Detectar nuevo valor).

[1]: /es/logs/search_syntax/
{{% /tab %}}

{{% tab "Anomalía" %}}

### Consulta de búsqueda

Crea una consulta de búsqueda utilizando la misma lógica que en una búsqueda del Log Explorer.

Opcionalmente, define un count único y una agrupación de señales. Cuenta el número de valores únicos observados para un atributo en un marco temporal determinado. El valor de agrupación definido genera una señal para cada valor de `group by`. Normalmente, `group by` es una entidad (como usuario o IP).

La detección de anomalías inspecciona cómo se ha comportado el atributo `group by` en el pasado. Si un atributo `group by` se ve por primera vez (por ejemplo, la primera vez que una IP se comunica con tu sistema) y es anómalo, no genera una señal de seguridad porque el algoritmo de detección de anomalías no tiene datos históricos en los que basar su decisión.

**Nota**: La consulta se aplica a todas las ingestas de logs.

{{% /tab %}}

{{% tab "Impossible Travel" %}}

### Consulta de búsqueda

Crea una consulta de búsqueda con la misma lógica que una [búsqueda de Log Explorer][1]. Todos los logs que coincidan con esta consulta se analizan en busca de un posible Impossible travel. Puedes utilizar la sección `preview` para ver qué logs coinciden con la consulta actual.

#### Atributo del usuario

Para `user attribute`, selecciona el campo en el log analizado que contiene el ID de usuario. Puede ser un identificador como una dirección de correo electrónico, un nombre de usuario o un identificador de cuenta.

#### Atributo de localización

El `location attribute` especifica qué campo contiene la información geográfica para un log. El único valor admitido es `@network.client.geoip`, que es mejorado por el [analizador GeoIP][2] para dar información de una localización de log basada en la dirección IP del cliente.

#### Localizaciones de usuario de referencia

Marca la casilla si deseas que Datadog aprenda las localizaciones de acceso regular antes de activar una señal.

Cuando se selecciona, las señales se suprimen durante las primeras 24 horas. En ese tiempo, Datadog aprende las localizaciones de acceso regular del usuario. Esto puede ser útil para reducir el ruido e inferir el uso de VPN o el acceso a API con credenciales.

No hagas clic en la casilla si deseas que Datadog detecte todos los comportamientos de Impossible Travel.

[1]: /es/logs/search_syntax/
[2]: /es/logs/log_configuration/processors#geoip-parser
{{% /tab %}}

{{% tab "Third Party" %}}

### Consulta raíz

Crea una consulta de búsqueda con la misma lógica que una consulta de [búsqueda de Log Explorer][1]. El desencadenante definido para cada nuevo atributo genera una señal para cada nuevo valor de ese atributo durante un periodo fijo de 24 horas.

Haz clic en **Add Query** (Añadir consulta) para añadir consultas adicionales.

**Nota**: La consulta se aplica a todas las ingestas de logs.

[1]: /es/logs/search_syntax/
{{% /tab %}}
{{< /tabs >}}

#### Filtrar logs a partir de tablas de referencia

{{% filter_by_reference_tables %}}

{{< img src="/security/security_monitoring/detection_rules/filter-by-reference-table.png" alt="El editor de consultas de reglas de detección de logs con las opciones de búsqueda de tabla de referencia resaltadas" style="width:100%;" >}}

#### Tests unitarios

Utiliza los tests unitarios para comprobar tus reglas con ejemplos de logs y asegurarte de que la regla de detección funciona como se espera. Específicamente, esto puede ser útil cuando estás creando una regla de detección para un evento que aún no ha ocurrido, por lo que no tienes un log real para ello. Por ejemplo: tienes logs con un campo `login_attempt` y quieres detectar logs con `login_attempt:failed`, pero sólo tienes logs con `login_attempt:success`. Para probar la regla, puedes crear un log de muestra copiando un log con `login_attempt:success` y cambiando el campo `login_attempt` por `failed`.

Para utilizar los tests unitarios:

1. Después de introducir la consulta de reglas, haz clic en **Unit Test** (Test unitario) para probar tu consulta con un log de muestra.
1. Para crear un log de muestra, puedes:  
    a. Navega hasta [Log Explorer][3].  
    b. Introduce la misma consulta de regla de detección en la barra de búsqueda.
    c. Selecciona uno de los logs. 
    d. Haz clic en el botón Export (Exportar) situado en la parte superior derecha del panel lateral de log y, a continuación, selecciona **Copy** (Copiar).
1. Navega de nuevo al modal **Unit Test** (Test unitario) y, luego, pega el log en el cuadro de texto. Edita la muestra según sea necesario para tu caso de uso.
1. Cambia el conmutador **Query is expected to match based on the example event** (Se espera que la consulta coincida según el ejemplo de evento) para adaptarlo a tu caso de uso.
1. Haz clic en **Run Query Test** (Ejecutar test de consulta).

## Configurar casos de reglas

{{< tabs >}}
{{% tab "Umbral" %}}

### Activación

{{< img src="security/security_monitoring/detection_rules/define_rule_case2.png" alt="La sección Establecer caso de reglas que muestra las configuraciones predeterminadas" style="width:80%;" >}}

Activa **Create rules cases with the Then operator** (Crear casos de reglas con el operador Then) si deseas activar una señal para el ejemplo: si se produce la consulta A y luego se produce la consulta B. El operador `then` solo puede utilizarse en un único caso de regla.

Todos los casos de las reglas se evalúan como sentencias case. Por lo tanto, el orden de los casos afecta a qué notificaciones se envían porque el primer caso que coincide genera la señal. Haz clic y arrastra los casos de regla para cambiar su orden.

Un caso de regla contiene operaciones lógicas (`>, >=, &&, ||`) para determinar si se debe generar una señal basada en los recuentos de eventos en las consultas definidas previamente. En esta sección, se hace referencia a las [etiquetas de consulta] en minúsculas de ASCII (#define-a-search-query). Un caso de regla de ejemplo para la consulta `a` es `a > 3`.

**Nota**: La etiqueta de la consulta debe situarse por delante del operador. Por ejemplo, `a > 3` es válido y `3 < a` no es válido.

Proporciona un **nombre**, por ejemplo "Caso 1", para cada caso de regla. Este nombre se añade al nombre de la regla cuando se genera una señal.

#### Ejemplo

Si tienes una consulta en `failed_login` y otra en `successful_login`:

{{< img src="security/security_monitoring/detection_rules/joining_queries_20240904.png" alt="Definir consultas de búsqueda" style="width:100%;" >}}

y un caso de regla que se activa cuando `failed_login > 5 && successful_login>0`:

{{< img src="security/security_monitoring/detection_rules/set_rule_case4.png" alt="La sección Establecer casos de regla configurada para activar una señal de gravedad cuando failed_login es superior a cinco y successful_login es mayor que cero" style="width:90%;" >}}

El caso de la regla une estas consultas basándose en su valor `group by`. El atributo `group by` suele ser el mismo atributo porque el valor debe ser el mismo para que se cumpla el caso. Si no existe un valor `group by`, el caso nunca se cumplirá. Se genera una señal de seguridad para cada valor `group by` único cuando se cumple un caso.

En este ejemplo, cuando hay más de cinco inicios de sesión fallidos y al menos un inicio de sesión con éxito para el mismo `User Name`, el primer caso coincide y se genera una señal de seguridad.

### Gravedad y notificación

{{% security-rule-severity-notification %}}

### Intervalos de tiempo

{{% security-rule-time-windows %}}

Haz clic en **Add case** (Añadir caso) para añadir casos adicionales.

**Nota**: El valor de `evaluation window` debe ser inferior o igual a `keep alive` y `maximum signal duration`.

{{% /tab %}}

{{% tab "Nuevo valor" %}}

{{< img src="security/security_monitoring/detection_rules/new_term_rule_case.png" alt="Definir el caso de regla" style="width:80%;" >}}

### Gravedad y notificación

{{% security-rule-severity-notification %}}

### Olvidar el valor

Para olvidar un valor si no se ve durante un periodo, selecciona una opción del menú desplegable.

### Actualizar la misma señal

Establece una duración máxima para seguir actualizando una señal si se detectan nuevos valores dentro de un intervalo de tiempo determinado. Por ejemplo, la misma señal se actualizará si se detecta algún valor nuevo dentro de `1 hour`, durante una duración máxima de `24 hours`.

**Nota**: Si se requiere una señal única para cada nuevo valor, configura este valor en `0 minutes`.

{{% /tab %}}

{{% tab "Anomalía" %}}

### Gravedad y notificación

{{% security-rule-severity-notification %}}

### Intervalos de tiempo

Datadog detecta automáticamente la estacionalidad de los datos y genera una señal de seguridad cuando se determina que los datos son anómalos.

Una vez que se genera una señal, ésta permanece "abierta" si los datos siguen siendo anómalos y se actualiza la última marca temporal actualizada para la duración de la anomalía.

Una señal se "cierra" una vez que el tiempo supera la duración máxima de la señal, independientemente de que la anomalía siga siendo anómala o no. Este tiempo se calcula a partir de la primera marca temporal vista.

{{% /tab %}}

{{% tab "Impossible Travel" %}}

El método de detección de Impossible Travel no requiere establecer un caso de regla.

### Gravedad y notificación

{{% security-rule-severity-notification %}}

### Intervalos de tiempo

{{% security-rule-time-windows %}}

{{% /tab %}}

{{% tab "Third Party" %}}

### Activación

Todos los casos de las reglas se evalúan como sentencias case. Por lo tanto, el orden de los casos afecta a qué notificaciones se envían porque el primer caso que coincide genera la señal. Haz clic y arrastra los casos de regla para cambiar su orden.

Un caso de regla contiene operaciones lógicas (`>, >=, &&, ||`) para determinar si se debe generar una señal basada en los recuentos de eventos en las consultas definidas previamente. En esta sección, se hace referencia a las [etiquetas de consulta] en minúsculas de ASCII (#define-a-search-query). Un caso de regla de ejemplo para la consulta `a` es `a > 3`.

**Nota**: La etiqueta de la consulta debe situarse por delante del operador. Por ejemplo, `a > 3` es válido y `3 < a` no es válido.

### Gravedad y notificación

{{% security-rule-severity-notification %}}

Haz clic en **Add case** (Añadir caso) para añadir casos adicionales.

{{% /tab %}}
{{< /tabs >}}

### Disminución de la gravedad de un entorno de no producción

Una forma de disminuir el ruido de las señales es dar prioridad a las señales del entorno de producción sobre las señales de entorno de no producción. Selecciona la casilla de verificación `Decrease severity for non-production environments` para disminuir la gravedad de las señales de entornos de no producción en un nivel a partir del definido por la regla del caso.

| Gravedad de la señal en el entorno de producción| Gravedad de la señal en el entorno de no producción|
| ---------------------------------------- | -------------------------------------------- |
| Imprescindible                                 | Alto                                         |
| Alto                                     | Medio                                       |
| Medio                                   | Información                                         |
| Información                                     | Información                                         |

La disminución de la gravedad se aplica a las señales con una etiqueta de entorno empezando por `staging`, `test` o `dev`.

## Di lo que está pasando

{{% security-rule-say-whats-happening %}}

Utiliza el menú desplegable **Tag resulting signals** (Etiquetar señales resultantes) para añadir etiquetas a tus señales. Por ejemplo, `security:attack` o `technique:T1110-brute-force`.

**Nota**: la etiqueta `security` es especial. Esta etiqueta se utiliza para clasificar la señal de seguridad. Las opciones recomendadas son: `attack`, `threat-intel`, `compliance`, `anomaly` y `data-leak`.

## Reglas de supresión

Opcionalmente, añade una regla de supresión para evitar que se genere una señal. Por ejemplo, si un usuario `john.doe` está activando una señal, pero sus acciones son benignas y no deseas que se activen señales de este usuario, añade la siguiente consulta en el campo **Add a suppression query** (Añadir una consulta de supresión): `@user.username:john.doe`.

Además, en la regla de supresión, puedes añadir una consulta de exclusión de logs para excluir logs del análisis. Estas consultas se basan en **atributos de logs**. **Nota**: La supresión heredada se basaba en consultas de exclusión de logs, pero ahora se incluye en el paso **Añadir consulta de supresión** de la regla de supresión.

## Historial de versiones de las reglas

{{< img src="/security/security_monitoring/detection_rules/rule_version_history_20250207.png" alt="The version history for a GitHub OAuth access token compromise showing" style="width:80%;" >}}

Utilice el historial de versiones de reglas para:
- Vea las versiones anteriores de una regla de detección y comprenda los cambios a lo largo del tiempo.
- Vea quién ha realizado los cambios para mejorar la colaboración.
- Compare versiones con diffs para analizar las modificaciones y el impacto de los cambios.

Para ver el historial de versiones de una regla:
1. Vaya a [Reglas de detección][4].
1. Haga clic en la norma que le interese.
1. En el editor de reglas, haga clic en **Historial de versiones** para ver los cambios anteriores.
1. Haga clic en una versión concreta para ver los cambios realizados.
1. Haga clic en **Abrir comparación de versiones** para ver los cambios entre versiones.
1. Seleccione las dos versiones que desea comparar.
    - Los datos resaltados en rojo indican datos modificados o eliminados.
    - Los datos resaltados en verde indican los datos que se han añadido.
1. Haga clic en **Unificado** si desea ver la comparación en el mismo panel.

## Obsolescencia de reglas

Se realizan auditorías periódicas de todas las reglas de detección predefinidas para mantener una calidad de señal de alta fidelidad. Las reglas obsoletas se sustituyen por una regla mejorada.

El proceso de obsolescencia de las reglas es el siguiente:

1. La regla incluye una advertencia con la fecha de obsolescencia. En la interfaz de usuario, la advertencia se muestra en la:
    - Sección **Rule Details > Playbook** (Detalles de la regla > Guía) del panel lateral de señales
    - [Editor de reglas][2] para esa regla específica
2. Una vez que la regla se vuelve obsoleta, transcurre un periodo de 15 meses antes de que se elimine la regla. Esto se debe al periodo de conservación de señales de 15 meses. Durante este tiempo, puedes volver a habilitar la regla [clonando la regla][2] en la interfaz de usuario.
3. Una vez eliminada la regla, ya no podrás clonarla ni volver a activarla.

## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules
[2]: /es/security/detection_rules/#clone-a-rule
[3]: https://app.datadoghq.com/logs/
[4]: https://app.datadoghq.com/security/rules