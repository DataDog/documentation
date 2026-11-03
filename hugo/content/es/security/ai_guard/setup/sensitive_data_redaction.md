---
further_reading:
- link: /security/ai_guard/setup/
  tag: Documentación
  text: Configurar AI Guard
- link: /security/ai_guard/setup/sdk/
  tag: Documentación
  text: SDK de AI Guard
- link: /security/sensitive_data_scanner/scanning_rules/
  tag: Documentación
  text: Reglas de escaneo de datos confidenciales
title: Redacción de datos confidenciales
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard no está disponible en el {{< region-param key="dd_site_name" >}} sitio.</div>
{{< /site-region >}}

AI Guard utiliza Sensitive Data Scanner para identificar datos confidenciales, como información de identificación personal (PII), credenciales y secretos, en los mensajes evaluados por AI Guard. Los datos coincidentes pueden ser hasheados, reemplazados con texto personalizado o redactados parcialmente antes de ser enviados al modelo. Para reemplazar cada coincidencia con una etiqueta o `****`, utilice la acción **Redact** e ingrese el valor como el texto de reemplazo.

<div class="alert alert-warning">La redacción de datos confidenciales solo es compatible con la integración manual del SDK. Las instrumentaciones automáticas, como OpenAI o Anthropic, aún no son compatibles: informan sobre los hallazgos de Sensitive Data Scanner, pero no redactan los mensajes que su aplicación envía al modelo. Para redactar datos confidenciales, llame al SDK directamente y reenvíe la conversación redactada devuelta por la evaluación. Consulte <a href="/security/ai_guard/setup/sdk/">AI Guard SDK</a>.</div>

## Versiones de SDK compatibles {#supported-sdk-versions}

| Lenguaje   | Versión mínima     |
|------------|---------------------|
| Python     | dd-trace-py 4.14.0  |
| JavaScript | dd-trace-js 6.13.0  |
| Java       | Próximamente         |
| Ruby       | Próximamente         |

## Configuración {#setup}

Para habilitar la redacción de datos confidenciales, configure las reglas de redacción para AI Guard, habilite el escaneo de datos confidenciales para su servicio y aplique los reemplazos devueltos por AI Guard.

### 1. Configurar reglas de redacción {#1-configure-redaction-rules}

Las reglas de Sensitive Data Scanner para AI Guard se configuran a nivel de organización. Para elegir qué datos redacta AI Guard y cómo se reemplazan:

1. Vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}Sensitive Data Scanner{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > [{{< ui >}}AI Guard{{< /ui >}}][1].
1. Cree o edite un grupo de escaneo de AI Guard y habilite las reglas para los datos confidenciales que desea detectar.

{{< img src="security/ai_guard/ai_guard_sds_configuration.png" alt="La pestaña AI Guard en la página de configuración de Sensitive Data Scanner" style="width:100%;" >}}

En {{< ui >}}Action on Match{{< /ui >}}, seleccione qué sucede cuando la regla coincide con datos confidenciales:

{{< img src="security/ai_guard/ai_guard_action_on_match_options.png" alt="Opciones de acción de Sensitive Data Scanner al encontrar coincidencias: Hash, Redact, Partially Redact, Mask y No Action" style="width:100%;" >}}

- **Hash**: Reemplaza permanentemente todo el valor coincidente con un token hash.
- **Redact**: Reemplaza permanentemente todo el valor coincidente con el texto de reemplazo que usted especifique.
- **Partially Redact**: Oculta permanentemente solo una parte del valor coincidente.
- **Mask**: Oculta el valor coincidente en Datadog, pero conserva el valor subyacente para que los usuarios con permiso puedan revelarlo.
- **No Action**: Deja el valor coincidente sin cambios.

Para reemplazar datos confidenciales antes de que se envíen al modelo con un valor exacto, seleccione **Redact** e ingrese un texto de reemplazo como `[sensitive_data]` o `****`.

{{< img src="security/ai_guard/ai_guard_redact_replacement_text.png" alt="La acción Redact seleccionada con un campo de texto de reemplazo personalizado" style="width:100%;" >}}

Las etiquetas categorizan el hallazgo pero no cambian el contenido coincidente.

<div class="alert alert-info">Esta configuración se aplica en toda su organización. Las reglas se aplican solo a los servicios para los cuales está habilitado el escaneo de datos confidenciales.</div>

### 2. Habilite el escaneo de datos confidenciales para un servicio {#2-enable-sensitive-data-scanning-for-a-service}

Habilitar las reglas de Sensitive Data Scanner para AI Guard no es suficiente por sí solo. Después de habilitar las reglas, también debe habilitar el escaneo de datos confidenciales en el servicio de AI Guard que desea proteger:

1. Vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][2].
1. Edite la política predeterminada o la política para el servicio y el entorno que desea proteger.
1. En {{< ui >}}Sensitive data scanning{{< /ui >}}, seleccione una de las siguientes opciones y luego guarde la política:
   - {{< ui >}}Disabled{{< /ui >}}: AI Guard no analiza las solicitudes en busca de datos confidenciales.
   - {{< ui >}}Scanning{{< /ui >}}: AI Guard analiza las solicitudes en busca de datos confidenciales e informa los hallazgos en AI Guard span, pero devuelve los mensajes sin cambios.
   - {{< ui >}}Scanning and redacting{{< /ui >}}: AI Guard analiza las solicitudes en busca de datos confidenciales y redacta las coincidencias, siguiendo la acción configurada para cada regla.

{{< img src="security/ai_guard/ai_guard_sensitive_data_scanning.png" alt="Una política de servicio de AI Guard con las opciones Disabled, Scanning y Scanning and redacting para el escaneo de datos confidenciales" style="width:100%;" >}}

La política de servicio habilita o deshabilita la configuración completa de Sensitive Data Scanner para ese servicio. Configure qué datos se detectan y redactan en la [página de configuración de AI Guard en Sensitive Data Scanner][1].

Cuando {{< ui >}}Scanning and redacting{{< /ui >}} está habilitado, AI Guard redacta el último mensaje de la conversación evaluada.

<div class="alert alert-info">Debido a que el contexto de la conversación se construye de forma incremental, AI Guard no vuelve a analizar el historial de la conversación. Reemplazar los mensajes en su aplicación con sus versiones redactadas es responsabilidad de su implementación del SDK. Consulte <a href="/security/ai_guard/setup/sdk/">AI Guard SDK</a>.</div>

### 3. Aplique los reemplazos de redacción con el SDK {#3-apply-redaction-replacements-with-the-sdk}

Cuando el SDK evalúa los mensajes, la respuesta de evaluación incluye un reemplazo totalmente redactado y su ruta para cada valor que una regla configurada modifica. El SDK aplica estos reemplazos a una copia de la conversación evaluada y la devuelve con el resultado de la evaluación. Reenvíe esa conversación al modelo y manténgala en el estado de su aplicación, de modo que los datos confidenciales no salgan de su aplicación y no se vuelvan a introducir en el siguiente turno.

AI Guard analiza solo el último mensaje en cada llamada de evaluación y utiliza los mensajes anteriores como contexto. Esto incluye un mensaje del usuario, una respuesta del asistente, argumentos de llamada de herramienta o el resultado de una llamada de herramienta cuando es el último mensaje que se está evaluando. Los mensajes anteriores en la conversación no se vuelven a analizar, por lo que el resultado contiene la conversación completa que usted envió con solo el último mensaje redactado. La aplicación de reemplazos no modifica los objetos de mensaje que pertenecen a su aplicación.

La forma en que usted lee la conversación redactada depende del lenguaje del SDK:

- [Python][3]
- [JavaScript][4]
- [Java][5]

Para desactivar la redacción en el tracer mientras mantiene la detección y la generación de informes, configure `DD_AI_GUARD_REDACTION_ENABLED=false` en el entorno de su aplicación. La evaluación sigue ejecutándose y los hallazgos se siguen reportando, pero el SDK devuelve los mensajes sin cambios.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard
[2]: https://app.datadoghq.com/security/ai-guard/settings/services
[3]: /es/security/ai_guard/setup/sdk/?prog_lang=python#example-apply-sensitive-data-redaction-python
[4]: /es/security/ai_guard/setup/sdk/?prog_lang=node_js#example-apply-sensitive-data-redaction-node-js
[5]: /es/security/ai_guard/setup/sdk/?prog_lang=java#example-apply-sensitive-data-redaction-java