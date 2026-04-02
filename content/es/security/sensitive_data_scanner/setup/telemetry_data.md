---
aliases:
- /es/sensitive_data_scanner/setup/telemetry_data
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/scanning_rules/library_rules
  tag: Documentación
  text: Más información sobre las reglas de librería predefinidas
- link: /security/sensitive_data_scanner/scanning_rules/custom_rules
  tag: Documentación
  text: Más información sobre la creación de reglas personalizadas
- link: /security/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules/
  tag: Documentación
  text: Prácticas recomendadas para crear reglas de análisis personalizadas
title: Datos de telemetría
---

## Información general

Sensitive Data Scanner en la nube analiza datos de telemetría, como logs, eventos de APM, eventos de RUM y eventos de Event Management de tu aplicación. Los datos que se pueden analizar y redactar son:

- Logs: todo el contenido estructurado y no estructurado de los logs, incluyendo los valores de mensajes y atributos de logs
- APM: sólo valores de atributos de tramo
- RUM: sólo valores de atributos de eventos
- Eventos: sólo valores de atributos de eventos

{{< callout url="https://www.datadoghq.com/product-preview/role-based-sensitive-data-unmasking-in-logs" btn_hidden="false" >}}
El desenmascaramiento de los datos confidenciales en logs está en Vista previa. Para inscribirte, haz clic en <b>Request Access</b> (Solicitar acceso).
{{< /callout >}}

Envías logs y eventos al backend Datadog, por lo que los datos salen de tu entorno antes de ser redactados. Los logs y eventos se analizan y redactan en el backend Datadog durante su procesamiento, por lo que los datos confidenciales se ocultan antes de que los eventos se indexen y se muestren en la interfaz de usuario de Datadog.

Si no quieres que los datos salgan de tu entorno antes de ser redactados, utiliza [Observability Pipelines][12] y el [procesador Sensitive Data Scanner][13] para analizar y redactar datos confidenciales. Para obtener información sobre cómo configurar un pipeline y sus componentes, consulta [Configurar pipelines][14].

Para utilizar Sensitive Data Scanner en la nube, configura un grupo de análisis para definir qué datos analizar y luego añade reglas de análisis para determinar qué información confidencial debe coincidir en los datos.

Este documento repasa lo siguiente:

- [Permisos](#permissions) necesarios para visualizar y configurar Sensitive Data Scanner
- [Añadir un grupo de análisis](#add-a-scanning-group)
- [Añadir reglas de análisis](#add-scanning-rules)
- [Controlar el acceso a logs con datos confidenciales](#control-access-to-logs-with-sensitive-data)
- [Redactar datos confidenciales en etiquetas](#redact-sensitive-data-in-tags)

## Configuración

### Permisos

Por defecto, los usuarios con el rol administrador de Datadog tienen acceso para visualizar y configurar reglas de análisis. Para permitir el acceso a otros usuarios, concede los permisos `data_scanner_read` o `data_scanner_write` en [Cumplimiento][1] a un rol personalizado. Para obtener más información sobre cómo configurar roles y permisos, consulta [Control del acceso][2].

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="Las secciones de permiso de cumplimiento que muestran permisos de lectura y escritura del Data Scanner" style="width:80%;">}}

### Añadir un grupo de análisis

Un grupo de análisis determina qué datos analizar. Consta de un filtro de consulta, un conjunto de botones para activar el análisis de logs, APM, RUM y eventos, y la opción de definir frecuencias de muestreo de entre el 10% y el 99% para cada producto. Para obtener más información sobre los filtros de consulta, consulta la documentación sobre [sintaxis de búsqueda de logs][3].

Para Terraform, consulta el recurso [Grupo de Datadog Sensitive Data Scanner][4].

Para configurar un grupo de análisis, realiza los siguientes pasos:

1. Ve a la página de configuración de [Sensitive Data Scanner][5].
1. Haz clic en **Add scanning group** (Añadir grupo de análisis). Como alternativa, haz clic en el menú desplegable **Add** (Añadir) situado en la esquina superior derecha de la página y selecciona **Add Scanning Group** (Añadir grupo de análisis).
1. Introduce un filtro de consulta para los datos que quieres analizar. En la parte superior, haz clic en **APM Spans** (Tramos de APM) para obtener una vista previa de los tramos (spans) filtrados. Haz clic en **Logs** para ver los logs filtrados.
1. Introduce un nombre y una descripción para el grupo.
1. Haz clic en los botones de conmutador para activar Sensitive Data Scanner para los productos deseados (por ejemplo, logs, tramos de APM, eventos de RUM y eventos de Datadog).
1. Opcionalmente, define una frecuencia de muestreo del 10-99% para los productos deseados. Cuando añadas reglas de análisis a un grupo que tenga activado el muestreo, no podrás seleccionar acciones que ofusquen los datos que analizas. Para ofuscar las coincidencias, debes elegir analizar todos los datos que coincidan con el filtro de consulta del grupo.
1. Haz clic en **Create** (Crear).

De manera predeterminada, los grupos de análisis recién creados se encuentran deshabilitados. Para habilitar un grupo de análisis, haz clic en el botón correspondiente en el lado derecho.

### Añadir reglas de análisis

Una regla de análisis determina qué información confidencial debe coincidir con los datos definidos por un grupo de análisis. Puedes añadir reglas de análisis predefinidas desde la librería de reglas de análisis de Datadog o puedes crear tus propias reglas mediante patrones de expresión regular. Los datos se analizan en el momento de la ingesta durante el procesamiento. Para los logs, esto significa que el análisis se realiza antes de la indexación y otras decisiones de enrutamiento.

Para Terraform, consulta el recurso [regla de Datadog Sensitive Data Scanner][6].

Para añadir reglas de análisis, realiza los siguientes pasos:

1. Ve a la página de configuración de [Sensitive Data Scanner][5].
1. Haz clic en el grupo de análisis en el que quieres añadir las reglas de análisis.
1. Haz clic en **Add Scanning Rule** (Añadir regla de análisis). Como alternativa, haz clic en el menú desplegable **Add** (Añadir) situado en la esquina superior derecha de la página y selecciona **Add Scanning Rule** (Añadir regla de análisis).
1. Selecciona si quires añadir una regla de librería o crear una regla de análisis personalizada.

{{% collapse-content title="Añadir regla de análisis desde las reglas de librería" level="p" %}}

La librería de reglas de análisis contiene reglas predefinidas para detectar patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, etc.

1. Selecciona un grupo de análisis si no has creado esta regla dentro de un grupo de análisis.
1. En la sección **Add library rules to the scanning group** (Añadir reglas de librería al grupo de análisis), selecciona las reglas de librería que quieres utilizar.
{{% sds-scanning-rule %}}
1. Haz clic en **Add Rules** (Añadir reglas).

#### Añadir palabras clave adicionales

Después de añadir reglas de análisis OOTB, puedes editar cada regla por separado y añadir palabras clave adicionales al diccionario de palabras clave.

1. Ve a la página de configuración de [Sensitive Data Scanner][5].
1. Haz clic en el grupo de análisis con la regla que quieres editar.
1. Pasa el ratón por encima de la regla y haz clic en el icono del lápiz.
1. Las palabras clave recomendadas se utilizan por defecto. Para añadir palabras clave adicionales, activa **Use recommended keywords** (Utilizar palabras clave recomendadas) y, a continuación, añade tus palabras clave a la lista. También puedes exigir que estas palabras clave estén dentro de un número determinado de caracteres de una coincidencia. Por defecto, las palabras clave deben estar dentro de los 30 caracteres anteriores a un valor coincidente.
1. Haz clic en **Update** (Actualizar).

{{% /collapse-content %}}
{{% collapse-content title="Añadir una regla de análisis personalizada" level="p" %}}
Puedes crear reglas de análisis personalizadas utilizando patrones de expresiones regulares para analizar datos confidenciales.

1. Selecciona un grupo de análisis si no creaste esta regla dentro de un grupo de análisis.
1. En la sección **Definir condiciones de coincidencia**, especifique el patrón regex a utilizar para la coincidencia con eventos en el campo **Definir el regex**. Introduzca datos de muestra en el campo **Añadir datos de muestra** para verificar que su patrón regex es válido.<br>
    Sensitive Data Scanner admite Perl Compatible Regular Expressions (PCRE), pero los siguientes patrones no son compatibles:
    - Referencias pasadas y captura de subexpresiones (lookarounds)
    - Afirmaciones de espacio de ancho cero arbitrarias
    - Referencias a subrutinas y patrones recursivos
    - Patrones condicionales
    - Verbos de control del backtracking
    - La directiva `\C` "single-byte" (que rompe las secuencias UTF-8)
    - La coincidencia de nueva línea `\R`
    - La directiva de reinicio de la coincidencia `\K`
    - Llamadas y código integrado
    - Agrupación atómica y cuantificadores posesivos
1. En **Create keyword dictionary** (Crear diccionario de palabras clave), añade palabras clave para mejorar la precisión de la detección cuando coincida con condiciones de expresión regular. Por ejemplo, si estás analizando un número de tarjeta de crédito Visa de dieciséis dígitos, puedes añadir palabras clave como `visa`, `credit` y `card`. También puedes exigir que estas palabras clave estén dentro de un número especificado de caracteres de una coincidencia. Por defecto, las palabras clave deben estar dentro de los 30 caracteres anteriores a un valor coincidente.
{{% sds-scanning-rule %}}
1. Haz clic en **Add Rule** (Añadir regla).
{{% /collapse-content %}}

**Notas**:

- Cualquier regla que añadas o actualices solo afectará a los datos que ingresen a Datadog después de que se haya definido la regla.
- Sensitive Data Scanner no afecta a ninguna regla que definas directamente en el Datadog Agent.
- Una vez que se añadan las reglas, asegúrate de que se hayan habilitado los botones de los grupos de análisis para comenzar a analizar.
- Cuando añadas reglas a un grupo de análisis con el muestreo activado, no podrás seleccionar las acciones **redactar**, **redactar parcialmente** o **aplicar hash**. Para una ofuscación completa, desactiva el muestreo en la configuración del grupo de análisis.

Consulta [Investigar problemas de datos confidenciales][7] para obtener más información sobre cómo utilizar la página [Resumen][8] para clasificar los problemas de datos confidenciales.

#### Espacios de nombres excluidos

Existen palabras clave reservadas que la plataforma de Datadog requiere para su funcionamiento. Si alguna de estas palabras se encuentra en un log que está siendo analizado, los 30 caracteres posteriores a la palabra coincidente se ignoran y no se redactan. Por ejemplo, lo que aparece después de la palabra `date` en un log suele ser la marca temporal del evento. Si la marca temporal se redacta accidentalmente, se producirían problemas con el procesamiento del log y se lo podría consultar más tarde. Por lo tanto, el comportamiento de los espacios de nombres excluidos es evitar la redacción involuntaria de información importante para la funcionalidad del producto.

Los espacios de nombres excluidos son:

- `host`
- `hostname`
- `syslog.hostname`
- `service`
- `status`
- `env`
- `dd.trace_id`
- `trace_id`
- `trace id`
- `dd.span_id`
- `span_id`
- `span id`
- `@timestamp`
- `timestamp`
- `_timestamp`
- `Timestamp`
- `date`
- `published_date`
- `syslog.timestamp`
- `error.fingerprint`
- `x-datadog-parent-id`

### Ediar reglas de análisis

1. Ve a la página de configuración de [Sensitive Data Scanner][5].
1. Pasa el ratón por encima de la regla de análisis que quieres editar y haz clic en el icono **Edit** (Editar) (lápiz).
   La sección **Define match conditions** (Definir condiciones de coincidencia) muestra la expresión regular que escribiste para tu regla personalizada o una explicación de la regla de análisis de librería que elegiste junto con ejemplos de información confidencial coincidente.
1. Para asegurarte de que una regla coincide con tus datos, puedes proporcionar una muestra en la sección **Add sample data** (Añadir datos de muestra). Si la regla encuentra coincidencias en los datos de muestra, aparecerá una etiqueta verde **Match** (Coincidencia) junto al campo de entrada.
1. En **Create keyword dictionary** (Crear diccionario de palabras clave), puedes añadir palabras clave para mejorar la precisión de la detección. Por ejemplo, si buscas un número de tarjeta de crédito Visa de dieciséis dígitos, puedes añadir palabras clave como `visa`, `credit` y `card`.
1. Elige el número de caracteres antes de una coincidencia en los que debe aparecer la palabra clave. Por defecto, las palabras clave deben estar dentro de los 30 caracteres anteriores a una coincidencia.
1. Opcionalmente, en **Define rule target and action** (Definir objetivo y acción de la regla), edita las etiquetas que quieres asociar con eventos donde los valores coincidan con la regla. Datadog recomienda utilizar etiquetas `sensitive_data` y `sensitive_data_category`, que pueden utilizarse en búsquedas, dashboards y monitores. Consulta [Control de acceso a logs con datos confidenciales](#control-access-to-logs-with-sensitive-data) para obtener información sobre cómo utilizar etiquetas para determinar quién puede acceder a logs que contengan datos confidenciales.
1. En **Set priority level** (Establecer nivel de prioridad), elige un valor basado en las necesidades de tu empresa.
1. Haz clic en **Update** (Actualizar).

## Controlar el acceso a logs con datos confidenciales

Para controlar quién puede acceder a los logs que contienen datos confidenciales, utiliza etiquetas añadidas por el Sensitive Data Scanner para crear consultas con control de acceso basado en roles (RBAC). Puedes restringir el acceso a personas o equipos específicos hasta que los datos caduquen tras el periodo de retención. Para obtener más información, consulta [Cómo configurar RBAC para logs][9].

## Redactar datos confidenciales en etiquetas

Para redactar datos confidenciales contenidos en etiquetas, debes [reasignar][10] la etiqueta a un atributo y, a continuación, redactar el atributo. Desmarca `Preserve source attribute` en el procesador de reasignación para que la etiqueta no se conserve durante la reasignación.

Para reasignar la etiqueta a un atributo:

1. Ve a tu [pipeline de log][11].
2. Haz clic en **Add Processor** (Agregar procesador).
3. Selecciona **Remapper** (Reasignador) en el menú desplegable de tipo de procesador.
4. Nombra el procesador.
5. Selecciona **Tag key(s)** (Claves de etiqueta).
6. Introduce la clave de etiqueta.
7. Introduce un nombre para el atributo al que se reasigna la clave de etiqueta.
8. Deshabilita **Preserve source attribute** (Preservar atributo de fuente).
9. Haz clic en **Create** (Crear).

Para redactar el atributo:

1. Ve a tu [grupo de análisis][5].
2. Haz clic en **Add Scanning Rule** (Añadir regla de análisis).
3. Comprueba las reglas de librería que quieres utilizar.
4. Selecciona **Specific Attributes** (Atributos específicos) en **Scan entire event or portion of it** (Analizar el evento completo o una parte).
5. Introduce el nombre del atributo que creaste anteriormente para especificar que quieres que se analice.
6. Selecciona la acción deseada cuando haya una coincidencia.
7. Si lo deseas, añade etiquetas (tags).
8. Haz clic en **Add Rules** (Añadir reglas).

## Desactivar Sensitive Data Scanner

Para desactivar por completo el Sensitive Data Scanner, pon el conmutador en **off** (desactivado) para cada grupo de análisis, de modo que queden desactivados.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/#compliance
[2]: /es/account_management/rbac/
[3]: /es/logs/explorer/search_syntax/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[5]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[7]: /es/security/sensitive_data_scanner/guide/investigate_sensitive_data_issues/
[8]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/summary
[9]: /es/logs/guide/logs-rbac/
[10]: /es/logs/log_configuration/processors/?tab=ui#remapper
[11]: https://app.datadoghq.com/logs/pipelines
[12]: /es/observability_pipelines/
[13]: /es/observability_pipelines/processors/sensitive_data_scanner/
[14]: /es/observability_pipelines/set_up_pipelines/
