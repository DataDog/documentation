---
aliases:
- /es/sensitive_data_scanner/setup/telemetry_data
- /es/security/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
- /es/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
- /es/security/sensitive_data_scanner/guide/redact_uuids_in_logs/
- /es/security/sensitive_data_scanner/guide/redact_all_emails_except_from_specific_domain_logs/
description: Configure grupos y reglas de escaneo de Sensitive Data Scanner para detectar
  y redactar datos confidenciales en los registros de Datadog, tramos de APM, eventos
  de RUM y eventos de Event Management. Cubre permisos, recursos de Terraform, muestreo
  y espacios de nombres excluidos.
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/scanning_rules/library_rules
  tag: Documentación
  text: Obtenga más información sobre las reglas de biblioteca predefinidas
- link: /security/sensitive_data_scanner/scanning_rules/custom_rules
  tag: Documentación
  text: Obtenga más información sobre la creación de reglas personalizadas
title: Configure Sensitive Data Scanner para datos de telemetría.
---
## Descripción general {#overview}

Sensitive Data Scanner en la Nube escanea datos de telemetría, como sus registros de aplicación, eventos de APM, eventos de RUM y eventos de Event Management. Los datos que se pueden escanear y redactar son:

- **Logs**: Todo el contenido de registros estructurado y no estructurado, incluyendo el mensaje del registro y los valores de los atributos.
- **APM**: Solo valores de atributos de tramos.
- **RUM**: Solo valores de atributos de eventos.
- **Events**: Solo valores de atributos de eventos.

Opcionalmente, se pueden establecer tasas de muestreo entre el 10% y el 99% para cada producto. Esto ayuda a gestionar los costos al comenzar, al reducir la cantidad de datos que se escanean en busca de información confidencial.

Para cada regla de escaneo, se puede aplicar una de las siguientes acciones a los datos confidenciales encontrados:

- **Redactar**: Reemplazar todos los datos encontrados con un token único que usted elija, como `[sensitive_data]`.
- **Redactar parcialmente**: Reemplazar una porción específica de todos los valores coincidentes.
- **Hash**: Reemplazar todos los datos encontrados con un identificador único no reversible.
- **Enmascarar** (disponible para registros, tramos de APM y eventos de RUM): Ofuscar todos los valores coincidentes. Los usuarios con el permiso `Data Scanner Unmask` pueden desofuscar (desenmascarar) y ver estos datos en Datadog. Consulte [Mask action](#mask-action) para obtener más información.

**Notas**:
- Al escanear datos muestreados, no podrá seleccionar acciones que ofusquen los datos que escanea.
- Sensitive Data Scanner no escanea valores enteros, de punto flotante ni dobles. Si el número está en formato de cadena, la cadena se escanea.

Usted envía registros y eventos al backend de Datadog, por lo que los datos salen de su entorno antes de ser redactados. Los registros y eventos se escanean y redactan en el backend de Datadog durante el procesamiento, por lo que los datos confidenciales se redactan antes de que los eventos se indexen y se muestren en Datadog UI.

Si no desea que los datos salgan de su entorno antes de ser redactados, utilice [Observability Pipelines][12] y el [Sensitive Data Scanner processor][13] para escanear y redactar datos confidenciales. Consulte [Configurar Pipelines][14] para obtener información sobre cómo configurar un Pipeline y sus componentes.

Para utilizar Sensitive Data Scanner en la nube, configure un grupo de escaneo para definir qué datos escanear y luego agregue reglas de escaneo para determinar qué información confidencial debe coincidir dentro de los datos.

Este documento trata lo siguiente:

- Los [permisos](#permissions) necesarios para visualizar y configurar Sensitive Data Scanner.
- [Agregar un grupo de escaneo](#add-a-scanning-group)
- [Agregar reglas de escaneo](#add-scanning-rules)
- [Cómo controlar el acceso a registros con datos confidenciales](#control-access-to-logs-with-sensitive-data)
- [Cómo redactar datos confidenciales en etiquetas](#redact-sensitive-data-in-tags)

## Configuración {#setup}

### Permisos{#permissions}

De forma predeterminada, los usuarios con el rol de Datadog Admin tienen acceso para visualizar y configurar reglas de escaneo. Para permitir el acceso a otros usuarios, otorgue los permisos `data_scanner_read` o `data_scanner_write` en [Compliance][1] a un rol personalizado. Consulte [Access Control][2] para obtener detalles sobre cómo configurar roles y permisos.

Si una regla de escaneo utiliza la acción **mask** para los datos confidenciales coincidentes, los usuarios con el permiso `data_scanner_unmask` pueden desofuscar y ver los datos en Datadog. **Nota**: Datadog no recomienda utilizar la acción **mask** para credenciales, a menos que tenga un plan para responder y rotar todas las credenciales filtradas. Consulte [Mask action](#mask-action) para obtener más información.

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="Las secciones de permisos de cumplimiento que muestran los permisos de lectura y escritura del escáner de datos" style="width:80%;">}}

### Configuración guiada {#guided-setup}

Cuando configura Sensitive Data Scanner por primera vez, o cuando su organización no tiene grupos de escaneo configurados, Datadog proporciona una configuración guiada en la aplicación. Abra la página de configuración de [Sensitive Data Scanner][5] y siga los pasos en pantalla para seleccionar los datos que desea escanear, crear un grupo de escaneo y agregar reglas de escaneo. Esta es la forma recomendada para comenzar.

Para configurar grupos y reglas de escaneo manualmente, o para ajustar una configuración existente, siga las secciones a continuación.

### Agregar un grupo de escaneo {#add-a-scanning-group}

Un grupo de escaneo determina qué datos escanear. Consiste en un filtro de consulta, un conjunto de botones para habilitar el escaneo de registros, APM, RUM y eventos, y la opción de establecer tasas de muestreo entre el 10% y el 99% para cada producto. Consulte la documentación de [Log Search Syntax][3] para obtener más información sobre los filtros de consulta.

Para Terraform, consulte el recurso [Datadog Sensitive Data Scanner group][4].

Para configurar un grupo de escaneo, realice los siguientes pasos:

1. Vaya a la página de configuración de [Sensitive Data Scanner][5].
1. Haga clic en {{< ui >}}Add scanning group{{< /ui >}}. Alternativamente, haga clic en el menú desplegable {{< ui >}}Add{{< /ui >}} en la esquina superior derecha de la página y seleccione {{< ui >}}Add Scanning Group{{< /ui >}}.
1. Ingrese un filtro de consulta para los datos que desea escanear. En la parte superior, haga clic en {{< ui >}}APM Spans{{< /ui >}} para obtener una vista previa de los tramos filtrados. Haga clic en {{< ui >}}Logs{{< /ui >}} para ver los registros filtrados.
1. Ingrese un nombre y una descripción para el grupo.
1. Haga clic en los botones de opción para habilitar Sensitive Data Scanner para los productos que desee (por ejemplo, registros, tramos de APM, eventos de RUM y eventos de Datadog).
1. Opcionalmente, establezca una tasa de muestreo del 10-99% para los productos que desee. Cuando agrega reglas de escaneo a un grupo que tiene habilitado el muestreo, no podrá seleccionar acciones que ofusquen los datos que escanea. Para ofuscar coincidencias, debe elegir escanear todos los datos que coincidan con el filtro de consulta de su grupo.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

De forma predeterminada, un grupo de escaneo recién creado está deshabilitado. Para habilitar un grupo de escaneo, haga clic en el interruptor correspondiente en el lado derecho.

### Agregar reglas de escaneo {#add-scanning-rules}

Una regla de escaneo determina qué información confidencial debe coincidir dentro de los datos definidos por un grupo de escaneo. Puede agregar reglas de escaneo predefinidas de Datadog's Scanning Rule Library o crear sus propias reglas utilizando patrones de expresiones regulares (regex). Los datos se escanean en el momento de la ingesta durante el procesamiento. Para los registros, esto significa que el escaneo se realiza antes de la indexación y de otras decisiones de enrutamiento.

Siempre que sea posible, utilice las out-of-the-box library rules de Datadog. Estas reglas son reglas predefinidas que detectan patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, información de red y dispositivos, y más. Cada regla tiene palabras clave recomendadas para el diccionario de palabras clave a fin de refinar la precisión de la coincidencia. También puede [agregar sus propias palabras clave](#add-custom-keywords).

Para Terraform, consulte el recurso [Datadog Sensitive Data Scanner rule][6].


**Nota**: Sensitive Data Scanner admite hasta 750 reglas de escaneo por organización para datos de telemetría (registros, APM, RUM y eventos). Este límite se aplica a todos los grupos de escaneo.

Para agregar reglas de escaneo, realice los siguientes pasos:

1. Vaya a la página de configuración de [Sensitive Data Scanner][5].
1. Haga clic en el grupo de escaneo donde desea agregar las reglas de escaneo.
1. Haga clic en {{< ui >}}Add Scanning Rule{{< /ui >}}. Alternativamente, haga clic en el menú desplegable {{< ui >}}Add{{< /ui >}} en la esquina superior derecha de la página y seleccione {{< ui >}}Add Scanning Rule{{< /ui >}}.
1. Seleccione si desea agregar una regla de biblioteca o crear una regla de escaneo personalizada.

{{% collapse-content title="Agregar reglas de biblioteca" level="p" id="add-library-rules" %}}

La Biblioteca de reglas de escaneo contiene reglas predefinidas para detectar patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización y más.

1. Seleccione un grupo de escaneo si no creó esta regla dentro de un grupo de escaneo.
1. En el menú desplegable {{< ui >}}Priority{{< /ui >}}, seleccione el nivel de prioridad para la regla según sus necesidades comerciales.
1. En la sección {{< ui >}}Add Library Rules{{< /ui >}}, seleccione las reglas de biblioteca que desea utilizar.
{{% sds-scanning-rule %}}
1. Haga clic en {{< ui >}}Add Rules{{< /ui >}}.

#### Agregue palabras clave personalizadas {#add-custom-keywords}

Las [palabras clave recomendadas][15] se utilizan de forma predeterminada cuando se agregan reglas de biblioteca. Después de agregar reglas de biblioteca, puede editar cada regla por separado y agregar palabras clave al diccionario de palabras clave o eliminarlas de él. Por ejemplo, si está escaneando un número de tarjeta de crédito Visa de dieciséis dígitos, puede agregar palabras clave como `visa`, `credit` y `card`.

1. Vaya a la página de configuración de [Sensitive Data Scanner][5].
1. Haga clic en el grupo de escaneo con la regla que desea editar.
1. Pase el cursor sobre la regla y, a continuación, haga clic en el icono de lápiz.
1. En la sección {{< ui >}}Match Conditions{{< /ui >}}, haga clic en {{< ui >}}Custom Keywords{{< /ui >}}.
    - Para agregar palabras clave, ingrese una palabra clave y haga clic en el icono de más para agregar la palabra clave a la lista.
    - Para eliminar palabras clave, haga clic en la **X** junto a la palabra clave que desea eliminar.
    - También puede requerir que estas palabras clave estén dentro de un número especificado de caracteres de una coincidencia. De forma predeterminada, las palabras clave deben estar dentro de los 30 caracteres antes de un valor coincidente.
    - Para eventos estructurados, las palabras clave también se comparan con los nombres de los atributos en la ruta del evento. Los separadores como `-`, `_` y `.` en los nombres de los atributos cuentan como límites de palabra, por lo que la palabra clave `card` coincide con un atributo llamado `card_number` o `card-type`. El límite de caracteres no se aplica a la coincidencia de nombres de atributos.
    - **Nota**: No puede tener más de 20 palabras clave para una regla.
1. En la sección {{< ui >}}Type or paste event data to test the rule{{< /ui >}}, agregue datos de evento para evaluar su regla y agregue palabras clave para refinar las condiciones de coincidencia.
1. Haga clic en {{< ui >}}Update{{< /ui >}}.

#### Agregue supresiones {#add-suppressions}

{{% sds-suppressions %}}

{{% /collapse-content %}}
{{% collapse-content title="Agregue una regla personalizada" level="p" id="add-custom-rule"%}}
Puede crear reglas de escaneo personalizadas utilizando patrones regex para buscar datos confidenciales.

1. Seleccione un grupo de escaneo si no creó esta regla dentro de un grupo de escaneo.
1. Ingrese un nombre para la regla.
1. En el menú desplegable {{< ui >}}Priority{{< /ui >}}, seleccione el nivel de prioridad para la regla según sus necesidades comerciales.
1. (Opcional) Ingrese una descripción para la regla.
1. En la sección {{< ui >}}Match conditions{{< /ui >}}, especifique el patrón regex que se utilizará para buscar coincidencias con eventos en el campo {{< ui >}}Regex pattern{{< /ui >}}. Defina patrones regex que sean lo más precisos posible, ya que los patrones genéricos resultan en más falsos positivos.<br>
    Sensitive Data Scanner admite expresiones regulares compatibles con Perl (PCRE), pero no se admiten los siguientes patrones:
    - Referencias inversas y subexpresiones de captura (lookarounds)
    - Aserciones arbitrarias de ancho cero
    - Referencias de subrutinas y patrones recursivos
    - Patrones condicionales
    - Verbos de control de backtracking
    - La directiva `\C` "single-byte" (que rompe secuencias UTF-8)
    - La coincidencia de nueva línea `\R`
    - La directiva de reinicio de coincidencia `\K`
    - Callouts y código incrustado
    - Agrupación atómica y cuantificadores posesivos
1. Para {{< ui >}}Check surrounding match context for keywords to reduce noise{{< /ui >}}, agregue palabras clave para refinar la precisión de la detección al hacer coincidir condiciones regex. Por ejemplo, si está escaneando un número de tarjeta de crédito Visa de dieciséis dígitos, puede agregar palabras clave como `visa`, `credit` y `card`.
    - Para agregar palabras clave, ingrese una palabra clave y haga clic en el icono de más para agregar la palabra clave a la lista.
    - Para eliminar palabras clave, haga clic en la **X** junto a la palabra clave que desea eliminar.
    - También puede requerir que estas palabras clave estén dentro de un número especificado de caracteres de una coincidencia. De forma predeterminada, las palabras clave deben estar dentro de los 30 caracteres antes de un valor coincidente.
    - Para eventos estructurados, las palabras clave también se comparan con los nombres de los atributos en la ruta del evento. Los separadores como `-`, `_` y `.` en los nombres de los atributos cuentan como límites de palabra, por lo que la palabra clave `card` coincide con un atributo llamado `card_number` o `card-type`. El límite de caracteres no se aplica a la coincidencia de nombres de atributos.
      **Nota**: No puede tener más de 20 palabras clave para una regla.
{{% sds-suppressions %}}
1. En la sección {{< ui >}}Type or paste event data to test the rule{{< /ui >}}, agregue datos de evento para evaluar su regla y agregue palabras clave para refinar las condiciones de coincidencia.
{{% sds-scanning-rule %}}
1. Haga clic en {{< ui >}}Add Rule{{< /ui >}}.

{{% /collapse-content %}}

**Notas**:

- Cualquier regla que agregue o actualice afecta solo a los datos que ingresan a Datadog después de que se definió la regla.
- Sensitive Data Scanner no afecta ninguna regla que defina directamente en el Datadog Agent.
- Después de agregar las reglas, asegúrese de que los interruptores para sus grupos de escaneo estén habilitados para comenzar a escanear.
- Cuando agrega reglas a un grupo de escaneo con el muestreo habilitado, no podrá seleccionar las acciones **redactar**, **redactar parcialmente** o **aplicar hash**. Para una ofuscación completa, deshabilite el muestreo en la configuración de su grupo de escaneo.

Consulte [Investigar hallazgos de datos confidenciales][7] para obtener detalles sobre la clasificación de datos confidenciales mediante la página [Hallazgos][8].

#### Espacios de nombres excluidos {#excluded-namespaces}

Existen palabras clave reservadas que la plataforma Datadog requiere para su funcionalidad. Si alguna de estas palabras se encuentra en un registro que se está escaneando, los 30 caracteres posteriores a la palabra coincidente se ignoran y no se redactan. Por ejemplo, lo que viene después de la palabra `date` en un registro suele ser la marca de tiempo del evento. Si la marca de tiempo se redacta accidentalmente, esto resultaría en problemas con el procesamiento del registro y la capacidad de consultarlo más tarde. Por lo tanto, el comportamiento para los espacios de nombres excluidos es evitar la redacción involuntaria de información importante para la funcionalidad del producto.

Los espacios de nombres excluidos son:

{{% tabs %}}
{{% tab "Registros" %}}

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
- `x-datadog-trace-id`
- `contextMap.dd.span_id`
- `contextMap.dd.trace_id`

{{% /tab %}}
{{% tab "Tramos" %}}

- `metrics._dd.`
- `metrics.dd.`
- `metrics._dd1.`
- `metrics.otel.trace_id`
- `metrics.otlp.`
- `metrics._sampling_priority_v1`
- `metrics._sample_rate`
- `meta._dd.`
- `meta.api.endpoint.`
- `meta.dd.`
- `meta_struct.dd.`
- `meta_struct._dd.`
- `meta_struct.api.endpoint.`
- `meta_struct.appsec.`
- `meta_struct.ai_guard`
- `meta_struct.threat_intel.results.`
- `meta.otel.trace_id`
- `meta.otel.library.`
- `meta.otlp.`
- `trace_id`
- `span_id`
- `start`
- `timestamp`
- `end`
- `duration`
- `parent_id`
- `type`
- `resource`
- `resource_hash`
- `ingest_size_in_bytes`
- `ingestion_reason`
- `error`
- `flags`
- `status`
- `chunk_id`
- `host`
- `host_id`
- `hostname`
- `env`
- `service`
- `operation_name`
- `name`
- `version`
- `meta._dd.error_tracking`
- `meta.error.fingerprint`
- `meta.issue`
- `x-datadog-trace-id`
- `x-datadog-parent-id`

{{% /tab %}}
{{% tab "RUM" %}}

- `application.id`
- `session.id`
- `session.initial_view.id`
- `session.last_view.id`
- `view.id`
- `action.id`
- `resource.id`
- `geo`
- `error.fingerprint`
- `error.binary_images.uuid`
- `issue`
- `_dd.trace_id`
- `_dd.span_id`
- `_dd.usage_attribution_tag_names`
- `_dd.error.unminified_frames`
- `_dd.error.threads`

{{% /tab %}}
{{% /tabs %}}

#### Suprima coincidencias específicas para ignorar datos con riesgo aceptado {#suppress-specific-matches-to-ignore-risk-accepted-data}

Utilice supresiones para ignorar coincidencias de datos confidenciales que considere operativamente seguras (por ejemplo: dominios de correo electrónico internos o rangos de IP privados).

**Notas**:
- Las coincidencias suprimidas no se redactan, enmascaran ni codifican.
- Las coincidencias suprimidas se excluyen de la página de hallazgos, los paneles, las alertas y otros flujos de trabajo de informes.
- Las supresiones se definen por regla dentro de un grupo de escaneo.

#### Analice o excluya atributos específicos {#scan-or-exclude-specific-attributes}

Para hacer que las coincidencias sean más precisas, también puede hacer una de las siguientes acciones:

- Analice todo el evento pero excluya ciertos atributos del escaneo. Por ejemplo, si busca información de identificación personal (PII) como direcciones físicas, es posible que desee excluir atributos como `ip_address`.
- Analice atributos específicos para limitar el contexto de los datos que se analizan. Por ejemplo, si busca direcciones físicas, puede elegir atributos específicos como `street` y `city`.

**Nota**: No utilice el prefijo `@` en la ruta del atributo al especificar nombres de atributos. Por ejemplo, utilice `function.request.body.password` en lugar de `@function.request.body.password`. El prefijo `@` utilizado en las consultas de búsqueda y otras partes de Datadog no es compatible en este campo.

### Editar reglas de escaneo {#edit-scanning-rules}

Para editar las reglas de escaneo:

1. Vaya a la página de configuración de [Sensitive Data Scanner][5].
1. Coloque el cursor sobre la regla de escaneo que desea editar y haga clic en el icono {{< ui >}}Edit{{< /ui >}} (lápiz).
1. Realice los cambios que desee en la regla. Dependiendo del tipo de regla que esté editando, consulte [Agregar reglas de biblioteca](#add-library-rules) o [Agregar regla personalizada](#add-custom-rule) para obtener más información sobre cada sección de configuración.
1. Haga clic en {{< ui >}}Update{{< /ui >}}.

## Controle el acceso a registros con datos confidenciales {#control-access-to-logs-with-sensitive-data}

Para controlar quién puede acceder a los registros que contienen datos confidenciales, utilice las etiquetas añadidas por el Sensitive Data Scanner para crear consultas con control de acceso basado en roles (RBAC). Puede restringir el acceso a personas o equipos específicos hasta que los datos caduquen después del período de retención. Consulte [Cómo configurar RBAC para registros][9] para obtener más información.

### Acción de enmascaramiento {#mask-action}

{{% sds-mask-action %}}

## Redactar datos confidenciales en etiquetas {#redact-sensitive-data-in-tags}

Para redactar datos confidenciales contenidos en etiquetas, debe [reasignar][10] la etiqueta a un atributo y luego redactar el atributo. Desmarque `Preserve source attribute` en el procesador de reasignación para que la etiqueta no se conserve durante la reasignación.

Para reasignar la etiqueta a un atributo:

1. Navegue a su [log pipeline][11].
2. Haga clic en {{< ui >}}Add Processor{{< /ui >}}.
3. Seleccione {{< ui >}}Remapper{{< /ui >}} en el menú desplegable de tipo de procesador.
4. Asigne un nombre al procesador.
5. Seleccione {{< ui >}}Tag key(s){{< /ui >}}.
6. Ingrese la clave de etiqueta.
7. Ingrese un nombre para el atributo al que se reasigna la clave de etiqueta.
8. Deshabilite {{< ui >}}Preserve source attribute{{< /ui >}}.
9. Haga clic en {{< ui >}}Create{{< /ui >}}.

Para redactar el atributo:

1. Navegue a su [scanning group][5].
2. Haga clic en {{< ui >}}Add Scanning Rule{{< /ui >}}.
3. Marque las reglas de biblioteca que desea usar.
4. Seleccione {{< ui >}}Specific Attributes{{< /ui >}} para {{< ui >}}Scan entire event or portion of it{{< /ui >}}.
5. Ingrese el nombre del atributo que creó anteriormente para especificar que desea que sea escaneado. **Nota**: No use el prefijo `@` en la ruta del atributo. Por ejemplo, utilice `function.request.body.password` en lugar de `@function.request.body.password`. 
6. Seleccione la acción que desea cuando hay una coincidencia.
7. Opcionalmente, agregue etiquetas.
8. Haga clic en {{< ui >}}Add Rules{{< /ui >}}.

## Rehidratación de registros {#log-rehydration}

Cuando rehidrata registros desde un archivo, el Sensitive Data Scanner no vuelve a escanear esos registros. En su lugar, Datadog restaura los registros exactamente como fueron escritos en el archivo.

Si su archivo está configurado para incluir [Datadog tags][16], y sus reglas de escaneo agregaron etiquetas cuando los registros fueron ingeridos y procesados inicialmente por el Sensitive Data Scanner, puede usar esas etiquetas para identificar qué registros rehidratados contenían datos confidenciales anteriormente. Esto le permite filtrar los registros rehidratados usando consultas como `sensitive_data:<rule_tag_name>`.

Los metadatos de los datos confidenciales encontrados no se almacenan en los registros archivados, por lo que las coincidencias de datos confidenciales no se resaltan cuando esos registros se rehidratan. El formato de archivo contiene solo la carga útil original del registro y cualquier etiqueta preservada. No incluye la información posicional que el Sensitive Data Scanner utiliza en la interfaz de usuario de Datadog para resaltar visualmente los valores detectados.

Qué puede hacer con los registros rehidratados:

- Si se incluyeron etiquetas en el archivo, filtre los registros que coincidieron anteriormente con las reglas de escaneo.
- Investigue eventos históricos que contengan datos confidenciales.

Lo que **no puede** hacer con los registros rehidratados:

- Ver coincidencias de datos confidenciales resaltadas en línea en la interfaz de usuario: Las coincidencias permanecen ofuscadas incluso si se eligió enmascarar, redactar, redactar parcialmente o aplicar hash como acción en la coincidencia.
- Activar escaneos retroactivos: Sensitive Data Scanner no vuelve a escanear los registros rehidratados.

## Deshabilite Sensitive Data Scanner {#disable-sensitive-data-scanner}

Para desactivar Sensitive Data Scanner por completo, coloque el interruptor en **off** para cada Scanning Group de modo que queden deshabilitados.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/#compliance
[2]: /es/account_management/rbac/
[3]: /es/logs/explorer/search_syntax/
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_group
[5]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/sensitive_data_scanner_rule
[7]: /es/security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
[8]: https://app.datadoghq.com/sensitive-data-scanner/telemetry
[9]: /es/logs/guide/logs-rbac/
[10]: /es/logs/log_configuration/processors/remapper/
[11]: https://app.datadoghq.com/logs/pipelines
[12]: /es/observability_pipelines/
[13]: /es/observability_pipelines/processors/sensitive_data_scanner/
[14]: /es/observability_pipelines/configuration/set_up_pipelines/
[15]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/
[16]: /es/logs/log_configuration/archives/?tab=awss3#datadog-tags