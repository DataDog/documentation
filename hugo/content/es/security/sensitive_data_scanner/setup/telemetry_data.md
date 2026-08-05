---
aliases:
- /es/sensitive_data_scanner/setup/telemetry_data
- /es/security/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
- /es/sensitive_data_scanner/guide/best_practices_for_creating_custom_rules
- /es/security/sensitive_data_scanner/guide/redact_uuids_in_logs/
- /es/security/sensitive_data_scanner/guide/redact_all_emails_except_from_specific_domain_logs/
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/scanning_rules/library_rules
  tag: Documentación
  text: Obtenga más información sobre las reglas de la biblioteca predefinidas
- link: /security/sensitive_data_scanner/scanning_rules/custom_rules
  tag: Documentación
  text: Obtenga más información sobre la creación de reglas personalizadas
title: Datos de telemetría
---
## Descripción general {#overview}

El escáner de datos sensibles en la nube escanea datos de telemetría, como los registros de su aplicación, eventos de APM, eventos de RUM y eventos de Event Management. Los datos que pueden ser escaneados y redactados son:

- **Registros**: Todo el contenido de registro estructurado y no estructurado, incluidos el mensaje de registro y los valores de atributos
- **APM**: Solo los valores de atributos de tramo
- **RUM**: Solo los valores de atributos de evento
- **Eventos**: Solo los valores de atributos de evento

Opcionalmente, se pueden establecer tasas de muestreo entre el 10% y el 99% para cada producto. Esto ayuda a gestionar costos cuando comienza, al reducir la cantidad de datos que se escanean en busca de información sensible.

Para cada regla de escaneo, se puede aplicar una de las siguientes acciones a los datos sensibles coincidentes:

- **Redactar**: Reemplace todos los datos coincidentes con un solo token que elija, como `[sensitive_data]`.
- **Redactar parcialmente**: Reemplace una porción específica de todos los valores coincidentes.
- **Hash**: Reemplace todos los datos coincidentes con un identificador único no reversible.
- **Enmascarar** (disponible solo para registros): Enmascare todos los valores coincidentes. Los usuarios con el permiso `Data Scanner Unmask` pueden desenmascarar y ver estos datos en Datadog. Consulte [la acción Enmascarar](#mask-action) para más información.

**Notas**:
- Al escanear datos muestreados, no podrá seleccionar acciones que ofusquen los datos que se escanean.
- Sensitive Data Scanner no escanea valores enteros, de punto flotante y dobles. Si el número está en formato de cadena, la cadena se escanea.

Usted envía registros y eventos al backend de Datadog, por lo que los datos salen de su entorno antes de ser redactados. Los registros y eventos se escanean y se redactan en el backend de Datadog durante el procesamiento, por lo que los datos sensibles se redactan antes de que los eventos sean indexados y mostrados en Datadog UI.

Si no desea que los datos salgan de su entorno antes de ser redactados, utilice [Observability Pipelines][12] y el [procesador de Sensitive Data Scanner][13] para escanear y redactar datos sensibles. Consulte [Set Up Pipelines][14] para obtener información sobre cómo configurar un pipeline y sus componentes.

Para usar Sensitive Data Scanner in the Cloud, configure un grupo de escaneo para definir qué datos escanear y luego agregue reglas de escaneo para determinar qué información sensible coincida dentro de los datos.

Este documento abarca lo siguiente:

- Los [permisos](#permissions) requeridos para ver y configurar Sensitive Data Scanner.
- [Agregar un grupo de escaneo](#add-a-scanning-group)
- [Agregar reglas de escaneo](#add-scanning-rules)
- [Cómo controlar el acceso a registros con datos sensibles](#control-access-to-logs-with-sensitive-data)
- [Cómo redactar datos sensibles en etiquetas](#redact-sensitive-data-in-tags)

## Configuración {#setup}

### Permisos {#permissions}

Por defecto, los usuarios con el rol Datadog Admin tienen acceso para ver y configurar reglas de escaneo. Para permitir el acceso a otros usuarios, otorgue los `data_scanner_read` o `data_scanner_write` permisos bajo [Compliance][1] a un rol personalizado. Consulte [Access Control][2] para obtener detalles sobre cómo configurar roles y permisos.

Si una regla de escaneo utiliza la acción **enmascarar** (disponible solo para registros) para datos sensibles coincidentes, los usuarios con el permiso `data_scanner_unmask` pueden desenmascarar y ver los datos en Datadog. **Nota**: Datadog no recomienda usar la acción **enmascarar** para credenciales, a menos que tenga un plan para responder y rotar todas las credenciales filtradas. Consulte [Acción de enmascarar](#mask-action) para más información.

{{< img src="sensitive_data_scanner/read_write_permissions.png" alt="Las secciones de permisos de cumplimiento que muestran los permisos de lectura y escritura del escáner de datos." style="width:80%;">}}

### Agregar un grupo de escaneo {#add-a-scanning-group}

Un grupo de escaneo determina qué datos escanear. Consiste en un filtro de consulta, un conjunto de botones para habilitar el escaneo de registros, APM, RUM y eventos, y la opción de establecer tasas de muestreo entre el 10% y el 99% para cada producto. Consulte la documentación de [Sintaxis de Búsqueda de Registros][3] para aprender más sobre los filtros de consulta.

Para Terraform, consulte el recurso de [Grupo de Sensitive Data Scanner de Datadog][4].

Para configurar un grupo de escaneo, realice los siguientes pasos:

1. Navegue a la página de configuración de [Sensitive Data Scanner][5].
1. Haga clic en **Agregar grupo de escaneo**. Alternativamente, haga clic en el menú desplegable **Agregar** en la esquina superior derecha de la página y seleccione **Agregar Grupo de Escaneo**.
1. Ingrese un filtro de consulta para los datos que desea escanear. En la parte superior, haga clic en **APM Spans** para previsualizar los spans filtrados. Haga clic en **Registros** para ver los registros filtrados.
1. Ingrese un nombre y una descripción para el grupo.
1. Haga clic en los botones de opción para habilitar Sensitive Data Scanner para los productos que desea (por ejemplo, registros, spans de APM, eventos de RUM y eventos de Datadog).
1. Opcionalmente, establezca una tasa de muestreo del 10-99% para los productos que desea. Cuando agregue reglas de escaneo a un grupo que tiene el muestreo habilitado, no podrá seleccionar acciones que ofusquen los datos que se escanen. Para ofuscar coincidencias, debe elegir escanear todos los datos que coincidan con el filtro de consulta de su grupo.
1. Haga clic en **Crear**.

Por defecto, un grupo de escaneo recién creado está deshabilitado. Para habilitar un grupo de escaneo, haga clic en el interruptor correspondiente en el lado derecho.

### Agregar reglas de escaneo {#add-scanning-rules}

Una regla de escaneo determina qué información sensible coincidirá dentro de los datos definidos por un grupo de escaneo. Puede agregar reglas de escaneo predefinidas de la Biblioteca de Reglas de Escaneo de Datadog o crear sus propias reglas utilizando patrones de expresiones regulares (regex). Los datos se escanean en el momento de la ingestión durante el procesamiento. Para los registros, esto significa que el escaneo se realiza antes de la indexación y otras decisiones de enrutamiento.

Siempre que sea posible, utilice las reglas de la biblioteca listas para usar de Datadog. Estas reglas son reglas predefinidas que detectan patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización, información de red y dispositivos, y más. Cada regla tiene palabras clave recomendadas para el diccionario de palabras clave para refinar la precisión de la coincidencia. También puede [agregar sus propias palabras clave](#add-custom-keywords).

Para Terraform, consulte el recurso [regla de Sensitive Data Scanner de Datadog][6].


Para agregar reglas de escaneo, realice los siguientes pasos:

1. Navegue a la página de configuración de [Sensitive Data Scanner][5].
1. Haga clic en el grupo de escaneo donde desea agregar las reglas de escaneo.
1. Haga clic en **Agregar Regla de Escaneo**. Alternativamente, haga clic en el menú desplegable **Agregar** en la esquina superior derecha de la página y seleccione **Agregar Regla de Escaneo**.
1. Seleccione si desea agregar una regla de biblioteca o crear una regla de escaneo personalizada.

{{% collapse-content title="Agregar reglas de biblioteca" level="p" id="add-library-rules" %}}

La Biblioteca de Reglas de Escaneo contiene reglas predefinidas para detectar patrones comunes como direcciones de correo electrónico, números de tarjetas de crédito, claves de API, tokens de autorización y más.

1. Seleccione un grupo de escaneo si no creó esta regla dentro de un grupo de escaneo.
1. En el menú desplegable de **Prioridad**, seleccione el nivel de prioridad para la regla según las necesidades de su negocio.
1. En la sección de **Agregar Reglas de Biblioteca**, seleccione las reglas de biblioteca que desea utilizar.
{{% sds-scanning-rule %}}
1. Haga clic en **Agregar Reglas**.

#### Agregar palabras clave personalizadas {#add-custom-keywords}

Las [palabras clave recomendadas][15] se utilizan por defecto cuando se agregan reglas de biblioteca. Después de agregar reglas de biblioteca, puede editar cada regla por separado y agregar o eliminar palabras clave del diccionario de palabras clave. Por ejemplo, si está escaneando un número de tarjeta de crédito Visa de dieciséis dígitos, puede agregar palabras clave como `visa`, `credit` y `card`.

1. Navegue a la página de configuración de [Sensitive Data Scanner][5].
1. Haga clic en el grupo de escaneo con la regla que desea editar.
1. Pase el cursor sobre la regla y luego haga clic en el ícono de lápiz.
1. En la sección de **Condiciones de Coincidencia**, haga clic en **Palabras Clave Personalizadas**.
    - Para agregar palabras clave, ingrese una palabra clave y haga clic en el ícono de más para agregar la palabra clave a la lista.
    - Para eliminar palabras clave, haga clic en el **X** junto a la palabra clave que desea eliminar.
    - También puede requerir que estas palabras clave estén dentro de un número específico de caracteres de una coincidencia. Por defecto, las palabras clave deben estar dentro de 30 caracteres antes de un valor coincidente.
    - Para eventos estructurados, las palabras clave también se comparan con los nombres de atributos en la ruta del evento. Los separadores como `-`, `_` y `.` en los nombres de atributos cuentan como límites de palabras, por lo que la palabra clave `card` coincide con un atributo llamado `card_number` o `card-type`. El límite de caracteres no se aplica a la coincidencia de nombres de atributos.
    - **Nota**: No puede tener más de 20 palabras clave para una regla.
1. En la sección **Escriba o pegue datos de evento para hacer la prueba de la regla**, agregue datos de evento para evaluar su regla y añada palabras clave para refinar las condiciones de coincidencia.
1. Haga clic en **Actualizar**.

#### Agregue supresiones {#add-suppressions}

{{% sds-suppressions %}}

{{% /collapse-content %}}
{{% collapse-content title="Agregue una regla personalizada" level="p" id="add-custom-rule"%}}
Puede crear reglas de escaneo personalizadas utilizando patrones regex para buscar datos sensibles.

1. Seleccione un grupo de escaneo si no creó esta regla dentro de un grupo de escaneo.
1. Ingrese un nombre para la regla.
1. En el menú desplegable **Prioridad**, seleccione el nivel de prioridad para la regla según las necesidades de su negocio.
1. (Opcional) Ingrese una descripción para la regla.
1. En la sección **Condiciones de coincidencia**, especifique el patrón regex que se utilizará para coincidir con eventos en el campo **Patrón regex**. Defina patrones regex que sean lo más precisos posible porque los patrones genéricos resultan en más falsos positivos.<br>
    Sensitive Data Scanner admite Expresiones Regulares Compatibles con Perl (PCRE), pero los siguientes patrones no son compatibles:
    - Referencias de retroceso y subexpresiones de captura (lookarounds)
    - Afirmaciones de ancho cero arbitrarias
    - Referencias a subrutinas y patrones recursivos
    - Patrones condicionales
    - Verbos de control de retroceso
    - La directiva `\C` "un solo byte" (que rompe secuencias UTF-8)
    - La coincidencia de `\R` nueva línea
    - El `\K` inicio de la directiva de reinicio de coincidencias
    - Llamadas y código incrustado
    - Agrupación atómica y cuantificadores posesivos
1. Para **verifique el contexto de coincidencia circundante para palabras clave y reduzca el ruido**, agregue palabras clave para refinar la precisión de detección al coincidir condiciones de regex. Por ejemplo, si está escaneando un número de tarjeta de crédito Visa de dieciséis dígitos, puede agregar palabras clave como `visa`, `credit` y `card`.
    - Para agregar palabras clave, ingrese una palabra clave y haga clic en el ícono de más para agregar la palabra clave a la lista.
    - Para eliminar palabras clave, haga clic en el **X** junto a la palabra clave que desea eliminar.
    - También puede requerir que estas palabras clave estén dentro de un número específico de caracteres de una coincidencia. Por defecto, las palabras clave deben estar dentro de 30 caracteres antes de un valor coincidente.
    - Para eventos estructurados, las palabras clave también se comparan con los nombres de atributos en la ruta del evento. Los separadores como `-`, `_` y `.` en los nombres de atributos cuentan como límites de palabras, por lo que la palabra clave `card` coincide con un atributo llamado `card_number` o `card-type`. El límite de caracteres no se aplica a la coincidencia de nombres de atributos.
      **Nota**: No puede tener más de 20 palabras clave para una regla.
{{% sds-suppressions %}}
1. En la sección **Escriba o pegue datos del evento para probar la regla**, agregue datos del evento para evaluar su regla y agregue palabras clave para refinar las condiciones de coincidencia.
{{% sds-scanning-rule %}}
1. Haga clic en **Agregar Regla**.

{{% /collapse-content %}}

**Notas**:

- Cualquier regla que agregue o actualice afecta solo a los datos que ingresan a Datadog después de que se definió la regla.
- Sensitive Data Scanner no afecta ninguna regla que defina directamente en el Datadog Agent.
- Después de agregar reglas, asegúrese de que los interruptores para sus grupos de escaneo estén habilitados para comenzar a escanear.
- Cuando agrega reglas a un grupo de escaneo con muestreo habilitado, no podrá seleccionar las acciones **redactar**, **redactar parcialmente** o **hash**. Para una ofuscación completa, desactive el muestreo en la configuración de su grupo de escaneo.

Consulte [Investigar Hallazgos de Datos Sensibles][7] para obtener detalles sobre la clasificación de datos sensibles utilizando la página [Hallazgos][8].

#### Espacios de nombres excluidos {#excluded-namespaces}

Existen palabras clave reservadas que la plataforma de Datadog requiere para su funcionalidad. Si alguna de estas palabras se encuentra en un registro que se está escaneando, los 30 caracteres después de la palabra coincidente se ignoran y no se redactan. Por ejemplo, lo que viene después de la palabra `date` en un registro suele ser la marca de tiempo del evento. Si la marca de tiempo se redacta accidentalmente, eso resultaría en problemas para procesar el registro y poder consultarlo más tarde. Por lo tanto, el comportamiento para los espacios de nombres excluidos es prevenir la redacción involuntaria de información importante para la funcionalidad del producto.

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

#### Suprimir coincidencias específicas para ignorar datos con riesgo aceptado {#suppress-specific-matches-to-ignore-risk-accepted-data}

Utilice supresiones para ignorar coincidencias de datos sensibles que considere operativamente seguras (por ejemplo: dominios de correo electrónico internos o rangos de IP privados).

**Notas**:
- Las coincidencias suprimidas no son redactadas, enmascaradas ni hashadas.
- Las coincidencias suprimidas están excluidas de la página de Hallazgos, tableros, alertas y otros flujos de trabajo de informes.
- Las supresiones se definen por regla dentro de un grupo de escaneo.

#### Escanear o excluir atributos específicos {#scan-or-exclude-specific-attributes}

Para hacer que las coincidencias sean más precisas, también puede hacer una de las siguientes acciones:

- Escanee todo el evento pero excluya ciertos atributos de ser escaneados. Por ejemplo, si está escaneando información personal identificable (PII) como direcciones físicas, podría querer excluir atributos como `ip_address`.
- Escanee atributos específicos para reducir el alcance de los datos que se escanean. Por ejemplo, si está escaneando direcciones físicas, puede elegir atributos específicos como `street` y `city`.

**Nota**: No utilice el prefijo `@` en la ruta del atributo al especificar nombres de atributos. Por ejemplo, use `function.request.body.password` en lugar de `@function.request.body.password`. El prefijo `@` utilizado en consultas de búsqueda y otras partes de Datadog no es compatible en este campo.

### Editar reglas de escaneo {#edit-scanning-rules}

Para editar reglas de escaneo:

1. Navegue a la página de configuración del [Sensitive Data Scanner][5].
1. Pase el cursor sobre la regla de escaneo que desea editar y haga clic en el ícono de **Editar** (lápiz).
1. Realice los cambios que desee para la regla. Dependiendo del tipo de regla que esté editando, consulte [Add library rules](#add-library-rules) o [Add custom rule](#add-custom-rule) para más información sobre cada sección de configuración.
1. Haga clic en **Actualizar**.

## Controlar el acceso a registros con datos sensibles {#control-access-to-logs-with-sensitive-data}

Para controlar quién puede acceder a registros que contienen datos sensibles, utilice etiquetas añadidas por el Sensitive Data Scanner para construir consultas con control de acceso basado en roles (RBAC). Puede restringir el acceso a individuos o equipos específicos hasta que los datos se eliminen después del período de retención. Consulte [Cómo configurar RBAC para registros][9] para obtener más información.

### Acción de enmascarado {#mask-action}

{{% sds-mask-action %}}

## Redactar datos sensibles en etiquetas {#redact-sensitive-data-in-tags}

Para redactar datos sensibles contenidos en etiquetas, debe [remapear][10] la etiqueta a un atributo y luego redactar el atributo. Desmarque `Preserve source attribute` en el procesador de remapeo para que la etiqueta no se conserve durante el remapeo.

Para remapear la etiqueta a un atributo:

1. Navegue a su [log pipeline][11].
2. Haga clic en **Add Processor**.
3. Seleccione **Remapper** en el menú desplegable de tipo de procesador.
4. Nombre del procesador.
5. Seleccione **Tag key(s)**.
6. Ingrese la clave de la etiqueta.
7. Ingrese un nombre para el atributo al que se remapea la clave de la etiqueta.
8. Desactive **Preserve source attribute**.
9. Haga clic en **Create**.

Para redactar el atributo:

1. Navegue a su [scanning group][5].
2. Haga clic en **Add Scanning Rule**.
3. Marque las library rules que desea utilizar.
4. Seleccione **Specific Attributes** para **Scan entire event or portion of it**.
5. Ingrese el nombre del atributo que creó anteriormente para especificar que desea que se escanee. **Nota**: No utilice el prefijo `@` en la ruta del atributo. Por ejemplo, use `function.request.body.password` en lugar de `@function.request.body.password`. 
6. Seleccione la acción que desea cuando haya una coincidencia.
7. Opcionalmente, agregue etiquetas.
8. Haga clic en **Agregar Reglas**.

## Registro de rehidratación {#log-rehydration}

Cuando rehidrate registros de un archivo, Sensitive Data Scanner no vuelve a escanear esos registros. En cambio, Datadog restaura los registros exactamente como fueron escritos en el archivo.

Si su archivo está configurado para incluir [etiquetas de Datadog][16], y sus reglas de escaneo agregaron etiquetas cuando los registros fueron inicialmente ingeridos y procesados por Sensitive Data Scanner, puede usar esas etiquetas para identificar qué registros rehidratados contenían previamente datos sensibles. Esto le permite filtrar registros rehidratados utilizando consultas como `sensitive_data:<rule_tag_name>`.

Los metadatos de los datos sensibles coincidentes no se almacenan en los registros archivados, por lo que las coincidencias de datos sensibles no se resaltan cuando esos registros son rehidratados. El formato del archivo contiene solo la carga útil del registro original y cualquier etiqueta preservada. No incluye la información posicional que Sensitive Data Scanner utiliza en la interfaz de usuario de Datadog para resaltar visualmente los valores detectados.

Lo que puede hacer con registros rehidratados:

- Si se incluyeron etiquetas en el archivo, filtre los registros que anteriormente coincidieron con las reglas de escaneo.
- Investigue eventos históricos que contengan datos sensibles.

Lo que **no** puede hacer con registros rehidratados:

- Ver coincidencias de datos sensibles resaltadas en línea en la UI: Las coincidencias permanecen ofuscadas incluso si se eligió mask, redact, partially redact o hash como acción al producirse la coincidencia.
- Activar escaneos retroactivos: Sensitive Data Scanner no vuelve a escanear registros rehidratados.

## Disable Sensitive Data Scanner {#disable-sensitive-data-scanner}

Para desactivar completamente Sensitive Data Scanner, configure el interruptor en **off** para cada Scanning Group para que estén desactivados.

## Lectura adicional {#further-reading}

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