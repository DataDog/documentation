---
further_reading:
- link: /security/ai_guard/
  tag: Documentación
  text: AI Guard
- link: /security/ai_guard/onboarding/
  tag: Documentación
  text: Comience con AI Guard
title: Configurar AI Guard
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard no está disponible en el {{< region-param key="dd_site_name" >}} sitio.</div>
{{< /site-region >}}

Complete los siguientes pasos para configurar AI Guard:

## 1. Verifique los requisitos previos {#1-check-prerequisites}

Antes de configurar AI Guard, asegúrese de tener todo lo que necesita:
- Mientras AI Guard esté en versión preliminar (Preview), Datadog necesita habilitar una bandera de función de backend para cada organización en la versión preliminar. Comuníquese con el [soporte de Datadog][1] con uno o más nombres de organizaciones y regiones de Datadog para habilitarlo.
- Ciertos pasos de configuración requieren permisos específicos de Datadog. Es posible que un administrador deba crear un nuevo rol con los permisos requeridos y asignárselo a usted:
  | Permiso                                    | Tipo  | Descripción                                                                                                                                                                                                     |
  |-----------------------------------------------|-------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | **AI Guard Evaluate** (`ai_guard_evaluate`)   | Escritura | Necesario para llamar a la API de evaluación de AI Guard y para crear una clave de aplicación con el contexto `ai_guard_evaluate` .                                                                                                 |
  | **AI Guard View** (`ai_guard_view`)           | Lectura  | Necesario para visualizar la interfaz de usuario de AI Guard, incluyendo señales, spans y configuraciones de solo lectura (políticas de bloqueo de servicios, sensibilidad de evaluación, políticas de herramientas, lista de permitidos de herramientas). También es necesario para reportar falsos positivos. |
  | **AI Guard Write** (`ai_guard_write`)         | Escritura | Necesario para modificar la configuración de AI Guard, incluyendo políticas de bloqueo, escaneo de datos sensibles, políticas de herramientas, bloqueo de herramientas, lista de permitidos de herramientas y umbrales de sensibilidad de evaluación.                           |
  | **User Access Manage** (`user_access_manage`) | Escritura | Necesario para crear un conjunto de datos restringido que [limita el acceso a los spans de AI Guard](#limit-access) con Access Control.                                                                                         |

### Límites de uso {#usage-limits}

La API del evaluador de AI Guard tiene los siguientes límites de uso:
- 1 mil millones de tokens evaluados por día.
- 12,000 solicitudes por minuto, por IP.

Si supera estos límites, o espera superarlos pronto, comuníquese con el [soporte de Datadog][1] para analizar posibles soluciones.

## 2. Cree claves de API y de aplicación {#create-keys}

Para usar AI Guard, necesita al menos una clave de API y una clave de aplicación configuradas en sus servicios de Agent, generalmente mediante variables de entorno. Siga las instrucciones en [API and Application Keys][2] para crear ambas.

Al agregar [scopes][3] para la **clave de aplicación**, agregue el contexto `ai_guard_evaluate`. El usuario que crea la clave de aplicación debe tener el permiso [AI Guard Evaluate](#1-check-prerequisites).

## 3. Instrumente su aplicación {#instrumentation}

Elija un enfoque de instrumentación basado en su framework y lenguaje:

### SDK {#sdk}

El [AI Guard SDK][12] proporciona bibliotecas específicas para cada lenguaje (Python, JavaScript, Java, Ruby) para llamar a la API REST de AI Guard y hacer un seguimiento de la actividad en tiempo real en Datadog.

### Integraciones automáticas {#automatic-integrations}

[Automatic integrations][10] proporcionan protección de AI Guard lista para usar en los frameworks compatibles. Cuando ejecuta su aplicación con el SDK de Datadog, las evaluaciones de AI Guard se realizan automáticamente sin necesidad de realizar cambios en el código.

| Lenguaje | Frameworks compatibles         |
|----------|------------------------------|
| Python   | LangChain, OpenAI, Anthropic |
| Node.js  | AI SDK, OpenAI, Anthropic    |
| Ruby     | RubyLLM                      |

### Integraciones manuales {#manual-integrations}

[Integraciones manuales][11] requieren configuración adicional para habilitar la protección de AI Guard para los frameworks compatibles.

| Lenguaje   | Frameworks compatibles           |
|------------|--------------------------------|
| Python     | Amazon Strands, LiteLLM Proxy  |

### HTTP API {#http-api}

La [AI Guard HTTP API][13] le permite llamar al punto de conexión de la JSON:API de AI Guard directamente con cualquier cliente HTTP, para lenguajes o entornos que el SDK no cubre.

## 4. Crear un filtro de retención personalizado {#retention-filter}

Para visualizar las evaluaciones de AI Guard en Datadog, cree un [filtro de retención][5] personalizado para los spans generados por AI Guard. Siga las instrucciones vinculadas para crear un filtro de retención con la siguiente configuración:
- {{< ui >}}Retention query{{< /ui >}}: `resource_name:ai_guard`
- {{< ui >}}Span rate{{< /ui >}}: 100%
- {{< ui >}}Trace rate{{< /ui >}}: 100%

## 5. Configurar políticas de AI Guard {#configure-policies}

AI Guard proporciona ajustes para controlar cómo se aplican las evaluaciones, qué tan sensible es la detección de amenazas y si el escaneo de datos confidenciales está habilitado.

### Configurar políticas de servicio {#service-policies}

En la página {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][6], puede configurar políticas que determinan qué acciones debe tomar AI Guard cuando detecta contenido inseguro. Para cada política, usted determina:
- [{{< ui >}}Enforcement mode{{< /ui >}}](#blocking-policy): Solo hacer un seguimiento o bloquear solicitudes inseguras
- [{{< ui >}}Sensitive data scanning{{< /ui >}}](#sensitive-data-scanning): Si AI Guard debe escanear y redactar datos confidenciales
- [{{< ui >}}Evaluation context{{< /ui >}}](#evaluation-context): Información adicional sobre el servicio que AI Guard utiliza durante la evaluación para reducir los falsos positivos

Junto a {{< ui >}}Default policy{{< /ui >}}, haga clic en {{< ui >}}Edit{{< /ui >}} para establecer el comportamiento predeterminado de AI Guard. Para anular el comportamiento predeterminado, haga clic en {{< ui >}}Add Service Policy{{< /ui >}}, seleccione el servicio y el entorno al que desea que se aplique su anulación y, luego, configure la política más especializada.

#### Política de bloqueo {#blocking-policy}

De forma predeterminada, AI Guard evalúa las conversaciones y devuelve una acción (`ALLOW`, `DENY` o `ABORT`), pero no bloquea las solicitudes. Para habilitar el bloqueo de modo que las acciones `DENY` y `ABORT` eviten activamente que continúen las interacciones inseguras, configure la política de bloqueo para sus servicios.

Puede configurar el bloqueo en diferentes niveles de granularidad, con configuraciones más específicas que tienen prioridad:
- **En toda la organización**: Aplique una política de bloqueo predeterminada a todos los servicios y entornos.
- **Por entorno**: Anule el valor predeterminado de la organización para un entorno específico.
- **Por servicio**: Anule el valor predeterminado de la organización para un servicio específico.
- **Por servicio y entorno**: Anule todo lo anterior para un servicio específico en un entorno específico (por ejemplo, habilite el bloqueo en producción pero no en staging).

#### Escaneo de datos confidenciales {#sensitive-data-scanning}

AI Guard puede detectar información de identificación personal (PII) como direcciones de correo electrónico, números de teléfono y números de seguro social, así como secretos como claves de API y tokens, en conversaciones de LLM. Cuando crea o edita una política para un servicio, puede configurar el escaneo de datos confidenciales en {{< ui >}}Disabled{{< /ui >}}, {{< ui >}}Scanning{{< /ui >}} o {{< ui >}}Scanning and redacting{{< /ui >}}.

Cuando el escaneo está habilitado, AI Guard escanea el último mensaje en cada llamada de evaluación, incluyendo los prompts del usuario, las respuestas del asistente, los argumentos de llamadas a herramientas y los resultados de llamadas a herramientas. Los hallazgos aparecen en las trazas de APM para su visibilidad. Con {{< ui >}}Scanning and redacting{{< /ui >}}, AI Guard también devuelve el reemplazo para cada valor confidencial que una regla muta. La redacción solo es compatible con la integración manual del SDK: consulte [Sensitive Data Redaction][20] para configurarla y aplicar los reemplazos.

De forma predeterminada, AI Guard escanea un conjunto estándar de secretos, como claves de AWS y claves de Datadog API. Para personalizar qué [reglas de escaneo][14] utiliza AI Guard, vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}Sensitive Data Scanner{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > [{{< ui >}}AI Guard{{< /ui >}}][15], donde puede habilitar o deshabilitar reglas individuales y crear grupos de escaneo con reglas personalizadas, limitadas específicamente a las evaluaciones de AI Guard.

### Bloquear herramientas específicas {#block-specific-tools}

Puede configurar AI Guard para bloquear solicitudes de herramientas específicas, para servicios y entornos específicos. Para hacerlo, vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Tool Blocklist{{< /ui >}}][8]. Haga clic en {{< ui >}}Add Tool Blocking Configuration{{< /ui >}}, seleccione el servicio, el entorno y la herramienta, y elija si AI Guard debe seguir la política de servicio predeterminada o bloquear todas las solicitudes para la herramienta.

### Sensibilidad de evaluación {#evaluation-sensitivity}

AI Guard asigna una puntuación de confianza a cada categoría de amenaza que detecta (por ejemplo, inyección de prompt o jailbreaking). Puede controlar la puntuación de confianza mínima requerida para que AI Guard marque una amenaza yendo a {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Evaluation Sensitivity{{< /ui >}}][7].

La sensibilidad de evaluación es un valor entre 0.0 y 1.0, con un valor predeterminado de 0.5.
- Un valor **más bajo** **aumenta** la sensibilidad: AI Guard marca las amenazas incluso cuando la confianza es baja, detectando más ataques potenciales pero también más falsos positivos.
- Un valor **más alto** **disminuye** la sensibilidad: AI Guard solo marca las amenazas cuando la confianza es alta, reduciendo el ruido pero potencialmente omitiendo algunos ataques.

### Agregar contexto de evaluación {#evaluation-context}

Puede proporcionar a AI Guard contexto adicional sobre un servicio, como su propósito y el tipo de datos que procesa. AI Guard utiliza este contexto durante la evaluación para distinguir mejor el comportamiento legítimo del agente de las amenazas reales, lo que ayuda a reducir los falsos positivos.

Para agregar contexto de evaluación para un servicio, vaya a {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][6]. Haga clic en {{< ui >}}Edit{{< /ui >}} junto a la política predeterminada, o agregue o edite una política de servicio, luego ingrese su contexto en el campo {{< ui >}}Evaluation context{{< /ui >}} (hasta 1,000 caracteres). Por ejemplo:

```text
This is a fintech app. Requests to query account balances or initiate transfers are expected and authorized.
```

Al igual que con la [política de bloqueo](#blocking-policy), el contexto de evaluación sigue la misma precedencia, con configuraciones más específicas que tienen prioridad: a nivel de organización, por entorno, por servicio, y luego por servicio y entorno.

Utilice el [AI Guard Playground][19] para probar cómo el contexto de evaluación afecta el resultado de una evaluación antes de aplicarlo a un servicio. El Playground tiene su propio campo {{< ui >}}Evaluation Context{{< /ui >}} que se aplica solo a la conversación que está probando, por lo que puede experimentar sin cambiar ninguna política de servicio. Importe una carga útil existente al Playground, luego agregue contexto de evaluación para ver cómo cambia el resultado de la evaluación.

### Agregue contexto con su prompt del sistema {#system-prompt-context}

AI Guard evalúa la conversación completa, incluido su prompt del sistema, al evaluar las amenazas. Agregar contexto sobre el propósito de su Agent, los datos que maneja y las herramientas que está autorizado a usar ayuda a AI Guard a distinguir las operaciones legítimas de las amenazas reales, reduciendo los falsos positivos sin reducir la cobertura de seguridad.

<div class="alert alert-info">Para agregar este tipo de contexto sin modificar el código de su aplicación, utilice el campo <a href="#evaluation-context">Contexto de evaluación</a> en la configuración de su servicio.</div>

#### Qué incluir {#what-to-include}

En su mensaje del sistema, describa:
- **Propósito del Agent**: El rol del Agent y su alcance previsto.
- **Datos autorizados**: Las categorías de datos que se espera que el agente lea, escriba o exporte.
- **Authorized tools**: Las herramientas y operaciones que el Agent tiene permitido llamar.

#### Ejemplo {#example}

Un mensaje del sistema con un contexto mínimo tiene más probabilidades de generar falsos positivos para operaciones legítimas:

```text
You are a helpful assistant.
```

Un mensaje del sistema con contexto explícito ayuda a AI Guard a evaluar la intención con precisión:

```
You are a financial data analyst assistant for internal employees. You are authorized to:
- Query internal financial databases (read-only) using the `sql_query` tool.
- Export query results to CSV or PDF using the `file_export` tool.
- Retrieve and summarize internal financial reports.

Do not access external systems or process requests unrelated to financial reporting.
```

Con este contexto, AI Guard trata las consultas SQL y las exportaciones de archivos como operaciones esperadas y autorizadas, y es menos probable que las marque como exfiltración de datos o llamadas a herramientas destructivas.

#### Limitaciones {#limitations}

No utilice el mensaje del sistema para anular los controles de seguridad de AI Guard ni para dar instrucciones directamente a AI Guard. AI Guard evalúa el mensaje del sistema como parte del contexto de la conversación e ignora las instrucciones que intentan deshabilitar o debilitar sus propios controles de seguridad.

## 6. (Opcional) Limitar el acceso a los spans de AI Guard {#limit-access}

Para restringir el acceso a los spans de AI Guard para usuarios específicos, puede usar [Access Control][9]. Siga las instrucciones vinculadas para crear un conjunto de datos restringido, limitado a **datos de APM**, con el filtro `resource_name:ai_guard` aplicado. Luego, puede otorgar acceso al conjunto de datos a roles o equipos específicos.

## Deshabilitar el rastreo de APM {#disable-apm-tracing}

Para deshabilitar el rastreo de APM en el trazador mientras mantiene AI Guard habilitado, configure `DD_APM_TRACING_ENABLED=false`:

{{< code-block lang="bash" >}}
DD_AI_GUARD_ENABLED=true
DD_APM_TRACING_ENABLED=false
DD_SERVICE=<YOUR_SERVICE_NAME>
DD_ENV=<YOUR_ENVIRONMENT>
{{< /code-block >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help
[2]: /es/account_management/api-app-keys/
[3]: /es/account_management/api-app-keys/#scopes
[4]: /es/agent/?tab=Host-based
[5]: /es/tracing/trace_pipeline/trace_retention/#create-your-own-retention-filter
[6]: https://app.datadoghq.com/security/ai-guard/settings/services
[7]: https://app.datadoghq.com/security/ai-guard/settings/evaluation-sensitivity
[8]: https://app.datadoghq.com/security/ai-guard/settings/tools
[9]: https://app.datadoghq.com/organization-settings/data-access-controls/
[10]: /es/security/ai_guard/setup/automatic_integrations/
[11]: /es/security/ai_guard/setup/manual_integrations/
[12]: /es/security/ai_guard/setup/sdk/
[13]: /es/security/ai_guard/setup/http_api/
[14]: /es/security/sensitive_data_scanner/scanning_rules/
[15]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard
[19]: https://app.datadoghq.com/security/ai-guard/playground
[20]: /es/security/ai_guard/setup/sensitive_data_redaction/