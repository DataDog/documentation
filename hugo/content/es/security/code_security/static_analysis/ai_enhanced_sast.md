---
aliases:
- /es/security/code_security/static_analysis/malicious_pr_protection/
description: Utilice IA para aumentar la toma de decisiones de seguridad en todo el
  ciclo de vida del análisis estático.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/open-source-ai-sast/
  tag: Blog
  text: Presentamos nuestro SAST de código abierto y nativo de IA
- link: https://www.datadoghq.com/blog/ai-native-sast-detect-llm-vulnerabilities/
  tag: Blog
  text: Detecte vulnerabilidades en aplicaciones LLM con el SAST nativo de IA de Datadog
- link: https://www.datadoghq.com/blog/using-llms-to-filter-out-false-positives
  tag: Blog
  text: Uso de LLMs para filtrar falsos positivos del análisis estático de código
- link: https://www.datadoghq.com/blog/sast-triage-agentic-evaluation-bits-memories/
  tag: Blog
  text: Reduzca los falsos positivos de SAST con evaluación agentica y Bits Memories
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: Blog
  text: Presentamos Bits Code para Code Security
title: Análisis de código estático mejorado con IA
---
El análisis de código estático (SAST) utiliza IA para automatizar la detección, validación y remediación en todo el ciclo de vida de gestión de vulnerabilidades.

| Fase del ciclo de vida | Funcionalidad                                                                                                                  | Punto de activación                            | Impacto                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| Detección       | [Protección contra PR maliciosas](#malicious-pr-protection) detecta cambios potencialmente maliciosos o diferencias sospechosas.                                        | En el momento de la PR                                | Marca las PR que introducen código nuevo y arriesgado.                                       |
| Detección               | [SAST nativo de IA](#ai-native-sast) utiliza análisis de contaminación basado en LLM para detectar vulnerabilidades de seguridad con mayor precisión.                          | En el momento del escaneo (solo escaneos alojados en Datadog)  | Identifica vulnerabilidades contextualmente complejas que el análisis basado en reglas pasa por alto. |
| Validación     | [Filtrado de falsos positivos](#false-positive-filtering) desprioriza los hallazgos de baja probabilidad.                                                            | Después del escaneo                                | Reduce el ruido, permite centrarse en el problema real.                                   |
| Validación | [Filtrado de falsos positivos agentico](#agentic-false-positive-filtering) desprioriza los hallazgos de baja probabilidad para un subconjunto de reglas relacionadas con la inyección utilizando contexto entre archivos. | Después del escaneo                        | Reduce los falsos positivos que dependen del comportamiento entre archivos, para las categorías de reglas soportadas. |
| Remediación                  | [Remediación](#remediation) utiliza Bits Code para generar correcciones sugeridas de forma manual o automática.        | Después del escaneo                                | Reduce el esfuerzo del desarrollador, acelera el ciclo de corrección.                              |

## Detección {#detection}

Las capacidades de detección incluyen la identificación de intenciones potencialmente maliciosas en PR y el uso de LLMs para buscar vulnerabilidades en su base de código. 

### Protección contra PR maliciosas {#malicious-pr-protection}

{{< callout url="https://www.datadoghq.com/product-preview/malicious-pr-protection/" >}}
La protección contra PR maliciosas está en versión preliminar y solo es compatible con repositorios de GitHub.
{{< /callout >}}

La protección contra PR maliciosas utiliza LLMs para escanear las PR enviadas a las ramas predeterminadas de sus repositorios en busca de cambios de código dañinos, que incluyen:

- Inyección de código
- Intentos de exfiltración de secretos
- Envío de paquetes maliciosos
- Compromiso del flujo de trabajo de CI

Para ver ejemplos, consulte la [brecha de tj-actions/changed-files (marzo de 2025)][2], los [paquetes npm maliciosos ofuscados (septiembre de 2025)][3] y la [publicación del blog sobre el anuncio de la protección contra PR maliciosas][1].

En el [Explorador de señales de seguridad][4], encuentre detecciones de PR maliciosas restringiendo la faceta {{< ui >}}Source{{< /ui >}} o {{< ui >}}Scope{{< /ui >}} a `datadog-code-security`. Filtre por veredictos maliciosos o benignos utilizando la faceta {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Scan Verdict{{< /ui >}}, o realice una búsqueda directa:

- `source:datadog-code-security`
- `@pr_security.scan.verdict:malicious`
- `@pr_security.scan.verdict:benign`

Para cualquier vulnerabilidad, puede asignar señales para investigación, crear una incidencia de seguridad, declarar un incidente o ejecutar un flujo de trabajo.
  
### SAST nativo de IA {#ai-native-sast}

SAST nativo de IA solo está disponible para escaneos alojados en Datadog.

SAST nativo de IA utiliza LLMs para detectar vulnerabilidades de seguridad razonando sobre cómo fluyen los datos a través de su código. A diferencia del análisis estático basado en reglas, SAST nativo de IA puede identificar vulnerabilidades contextualmente utilizando un enfoque de dos fases:

1. **Detección**: Un LLM escanea cada archivo y razona sobre si los datos controlados por el usuario pueden llegar a una operación peligrosa sin ser saneados.
2. **Verificación**: Un segundo LLM reevalúa de forma independiente cada hallazgo candidato mediante análisis de contaminación, confirmando o descartando cada hallazgo para reducir los falsos positivos.

Para habilitar SAST nativo de IA, en la configuración de integración de su gestión de código fuente, active {{< ui >}}Enable AI SAST{{< /ui >}}. Puede habilitarlo para todos los repositorios o para repositorios específicos.

Si está habilitado, el SAST nativo de IA se ejecuta en paralelo con el análisis estático basado en reglas, y sus hallazgos tienen prioridad para los tipos de vulnerabilidad que ambos métodos cubren.

SAST nativo de IA es compatible con estos lenguajes:

- C#
- C++
- Dart
- Elixir
- Go
- Java
- JavaScript
- Kotlin
- PHP
- Python
- Ruby
- Rust
- Swift
- TypeScript

{{% collapse-content title="CWEs compatibles" level="h4" expanded=false id="ai-native-sast-cwes" %}}
SAST nativo de IA detecta estos tipos de vulnerabilidades:

- [CWE-89: Inyección SQL](https://cwe.mitre.org/data/definitions/89.html)
- [CWE-78: Inyección de comandos](https://cwe.mitre.org/data/definitions/78.html)
- [CWE-79: Cross-Site Scripting (XSS)](https://cwe.mitre.org/data/definitions/79.html)
- [CWE-643: Inyección de XPath](https://cwe.mitre.org/data/definitions/643.html)
- [CWE-22: Recorrido de ruta](https://cwe.mitre.org/data/definitions/22.html)
- [CWE-73: Zip Slip](https://cwe.mitre.org/data/definitions/73.html)
- [CWE-74: Manejo inadecuado de la salida](https://cwe.mitre.org/data/definitions/74.html)
- [CWE-502: Deserialización insegura](https://cwe.mitre.org/data/definitions/502.html)
- [CWE-327: Criptografía rota](https://cwe.mitre.org/data/definitions/327.html)
- [CWE-328: Hashing débil](https://cwe.mitre.org/data/definitions/328.html)
- [CWE-330: Aleatoriedad débil](https://cwe.mitre.org/data/definitions/330.html)
- [CWE-614: Cookie insegura](https://cwe.mitre.org/data/definitions/614.html)
- [CWE-90: Inyección LDAP](https://cwe.mitre.org/data/definitions/90.html)
- [CWE-94: Inyección de código](https://cwe.mitre.org/data/definitions/94.html)
- [CWE-117: Inyección de registro](https://cwe.mitre.org/data/definitions/117.html)
- [CWE-190: Desbordamiento o ajuste de enteros](https://cwe.mitre.org/data/definitions/190.html)
- [CWE-200: Divulgación de información confidencial](https://cwe.mitre.org/data/definitions/200.html)
- [CWE-209: Exposición de información a través de un mensaje de error](https://cwe.mitre.org/data/definitions/209.html)
- [CWE-250: Agencia excesiva](https://cwe.mitre.org/data/definitions/250.html)
- [CWE-501: Violación del límite de confianza](https://cwe.mitre.org/data/definitions/501.html)
- [CWE-284: Access Control roto (IDOR)](https://cwe.mitre.org/data/definitions/284.html)
- [CWE-345: Envenenamiento de datos y modelos](https://cwe.mitre.org/data/definitions/345.html)
- [CWE-349: Debilidades de vectores e incrustaciones](https://cwe.mitre.org/data/definitions/349.html)
- [CWE-400: Consumo ilimitado](https://cwe.mitre.org/data/definitions/400.html)
- [CWE-540: Fuga de instrucciones del sistema](https://cwe.mitre.org/data/definitions/540.html)
- [CWE-601: Redirección abierta](https://cwe.mitre.org/data/definitions/601.html)
- [CWE-829: Vulnerabilidad en la cadena de suministro](https://cwe.mitre.org/data/definitions/829.html)
- [CWE-1321: Contaminación de prototipos](https://cwe.mitre.org/data/definitions/1321.html)
- [CWE-1426: Desinformación](https://cwe.mitre.org/data/definitions/1426.html)
- [CWE-1427: Inyección de prompts](https://cwe.mitre.org/data/definitions/1427.html)
  {{% /collapse-content %}}

SAST nativo de IA utiliza conjuntos de reglas específicos del lenguaje (por ejemplo, `python-ai_sast`) en la configuración de Code Security `sast`. Para obtener la lista completa de nombres de conjuntos de reglas y cómo seleccionarlos o excluirlos para los escaneos alojados en Datadog, consulte [Configuración de análisis de código estático (SAST)][15].

## Validación {#validation}

El filtrado de falsos positivos ocurre después de que se completa un escaneo. Hay dos capas de filtrado disponibles: filtrado de falsos positivos de referencia y filtrado de falsos positivos agéntico que recopila contexto entre archivos para un subconjunto de reglas.

### Filtrado de falsos positivos {#false-positive-filtering}

[Bits AI][9] revisa los hallazgos de SAST y evalúa si es probable que sean verdaderos o falsos positivos, e incluye una breve explicación de su razonamiento.

Para reducir su lista de triaje en [Code Security SAST Vulnerabilities][6], habilite {{< ui >}}Filter out false positives{{< /ui >}}, que aplica la consulta `-bitsAssessment:"False Positive"`.

### Filtrado de falsos positivos agéntico {#agentic-false-positive-filtering}

El filtrado de falsos positivos agéntico es una versión mejorada del filtrado de falsos positivos de referencia. En lugar de evaluar solo el código que tiene delante, Bits AI recopila contexto entre archivos. Lee archivos relacionados, busca símbolos e inspecciona la estructura de directorios cercana.

El filtrado de falsos positivos agéntico se aplica solo a las reglas de SAST relacionadas con inyecciones, como la inyección SQL y la inyección de comandos. 

### Contexto personalizado {#custom-context}

*Contexto personalizado* le permite agregar orientación específica de la regla que Bits AI utiliza al evaluar los hallazgos para todo el filtrado de falsos positivos. Utilice el contexto personalizado para describir marcos de trabajo, sanitizadores, patrones de validación o detalles de la base de código específicos de la organización.

El contexto personalizado se aplica a nivel de organización y de regla, y solo a las reglas de la categoría de seguridad SAST en los conjuntos de reglas predeterminados de Datadog, no a las reglas personalizadas. Revise o agregue contexto personalizado en el panel lateral para las reglas SAST.

## Corrección {#remediation}

[Bits Code][10] genera correcciones de código para vulnerabilidades, ya sea como una corrección única o como una automatización.

1. En [Code Security SAST Vulnerabilities][6], seleccione una vulnerabilidad para abrir un panel lateral con detalles sobre el hallazgo y el código afectado.
2. En la barra lateral {{< ui >}}Next Steps{{< /ui >}}, haga clic en {{< ui >}}Remediate with AI{{< /ui >}}, luego elija una opción:
    - {{< ui >}}Single fix{{< /ui >}}: Revise una diferencia propuesta, haga preguntas de seguimiento, edite el parche y cree una solicitud de extracción para remediar una sola vulnerabilidad. Si ya se ha generado una corrección, seleccione {{< ui >}}View fix and create PR{{< /ui >}} para ver la sesión de remediación existente.
    - {{< ui >}}Create automation{{< /ui >}}: Genere correcciones automáticamente a medida que se encuentran o según un horario. Seleccionar esta opción abre un modal con la acción {{< ui >}}Remediate SAST vulnerabilities{{< /ui >}} prellenada. Complete el formulario, incluyendo la especificación de un activador y una salida, luego haga clic en {{< ui >}}Create Automation{{< /ui >}}. 

Puede revisar y validar los cambios antes de fusionarlos viendo los detalles de la sesión, incluyendo:

- El hallazgo de seguridad original y el cambio de código propuesto.
- Una explicación de cómo y por qué Bits Code generó la corrección.
- Resultados de CI (si están habilitados) para validar que el parche es seguro de implementar.
- Opciones para refinar la corrección o {{< ui >}}Create PR{{< /ui >}} para aplicar los cambios a su repositorio de código fuente.

<div class="alert alert-tip">Visualice los detalles de la sesión examinando las vulnerabilidades. Visualice todas las sesiones de Bits Code en {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Sessions{{< /ui >}}. Visualice todas las automatizaciones de Bits Code en {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Automations{{< /ui >}}.</div>


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/engineering/malicious-pull-requests/
[2]: https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-tj-actionschanged-files-cve-2025-30066-and-reviewdogaction
[3]: https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem
[4]: https://app.datadoghq.com/security
[6]: https://app.datadoghq.com/security/code-security/sast
[9]: /es/bits_ai/
[10]: /es/bits_ai/bits_code
[15]: /es/security/code_security/static_analysis/configuration/#configure-ai-native-sast