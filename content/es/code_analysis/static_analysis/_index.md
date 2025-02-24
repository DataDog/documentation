---
algolia:
  tags:
  - análisis estático
  - análisis estático de datadog
  - calidad del código
  - SAST
aliases:
- /es/continuous_integration/static_analysis
- /es/static_analysis
description: Obtén información sobre el análisis estático de Datadog para escanear
  código en busca de problemas de calidad y vulnerabilidades de seguridad antes de
  que tu código llegue a producción.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Monitorizar todos tus pipelines de CI con Datadog
- link: /integrations/guide/source-code-integration/
  tag: Documentación
  text: Más información sobre la integración del código fuente
is_beta: false
title: Análisis estático (SAST)
---

{{< callout url="#" btn_hidden="true" header="¡Obtén la versión preliminar!" >}}
Code Analysis se encuentra en versión preliminar.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis no se encuentra disponible para el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}


## Información general

El análisis estático (SAST) es una técnica para realizar tests de software de caja transparente que analiza el código de preproducción de un programa sin la necesidad de ejecutar el programa, lo que significa que el programa es estático porque no se está ejecutando. 

El análisis estático te ayuda a identificar problemas de mantenimiento y vulnerabilidades de seguridad en las primeras etapas del ciclo de vida del desarrollo de software (SDLC) para garantizar que solo el código más seguro y de mayor calidad llegue a producción. Las herramientas de análisis estático que buscan vulnerabilidades de seguridad también se suelen conocer como herramientas de pruebas de seguridad de aplicaciones estáticas (SAST).

El uso del análisis estático proporciona a las organizaciones los siguientes beneficios:

* El análisis estático elimina las conjeturas sobre el cumplimiento de los estándares de código de una organización, lo que permite que tu equipo de desarrollo entregue código compatible sin impactos significativos en la velocidad de los desarrolladores.
* Las aplicaciones de una organización son menos vulnerables a las brechas de seguridad a lo largo del tiempo, debido a que las vulnerabilidades nuevas se detectan a través de los escaneos de SAST antes de que el código llegue a producción.
* Los desarrolladores nuevos de una organización pueden incorporarse con mayor rapidez porque el análisis estático permite a la organización mantener una base de código más legible a lo largo del tiempo.
* El software de una organización se vuelve confiable con el tiempo en virtud de que el código es más fácil de mantener porque se minimiza el riesgo de que un desarrollador le introduzca fallos nuevos.

## Configurar el análisis estático

El análisis estático permite escanear en busca de prácticas de codificación deficientes y vulnerabilidades de seguridad en los siguientes lenguajes y tecnologías:

{{< partial name="code_analysis/languages-getting-started.html" >}}

</br> 

Para comenzar, puedes configurar el análisis estático en la [página de **Code Analysis**][1] o consultar la [documentación de configuración][9].

## Integrar el análisis estático en el ciclo de vida del desarrollo de software

### Proveedores de CI
{{< whatsnext desc="Puedes ejecutar el análisis estático en cualquier proveedor de plataforma de CI que elijas. Consulta la documentación específica del proveedor para configurar el análisis estático en tus pipelines de CI:">}}
    {{< nextlink href="code_analysis/static_analysis/circleci_orbs" >}}CircleCI Orbs{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/github_actions" >}}GitHub Actions{{< /nextlink >}}
    {{< nextlink href="code_analysis/static_analysis/generic_ci_providers" >}}Otros proveedores de CI{{< /nextlink >}}
{{< /whatsnext >}}

### Gestión del código fuente
{{< whatsnext desc="Durante las revisiones de código en GitHub, Datadog puede marcar de manera automática las infracciones del análisis estático en las solicitudes pull al añadir comentarios de revisión en línea en las líneas de código relevantes. Cuando corresponde, Datadog también proporciona soluciones sugeridas que se pueden aplicar directamente en la solicitud pull. También puedes abrir una solicitud pull directamente desde Datadog para solucionar una vulnerabilidad o un problema de calidad." >}}
    {{< nextlink href="static_analysis/github_pull_requests" >}}Solicitudes pull de GitHub{{< /nextlink >}}
{{< /whatsnext >}}

### IDEs
{{< whatsnext desc="Puedes identificar vulnerabilidades del código en tiempo real a la vez que editas un archivo en tu entorno de desarrollo integrado (IDE). Consulta la documentación específica de la integración para obtener más información:">}}
    {{< nextlink href="developers/ide_plugins/idea/" >}}Complemento de Datadog para IDEs de JetBrains{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/vscode/#static-analysis" >}}Extensión de Datadog para Visual Studio Code{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/visual_studio/#static-analysis" >}}Extensión de Datadog para Visual Studio{{< /nextlink >}}
{{< /whatsnext >}}

## Buscar y filtrar resultados

Después de configurar tus pipelines de CI para ejecutar el analizador estático de Datadog, las infracciones se resumen por repositorio en la página de [**Repositorios de Code Analysis**][1]. Haz clic en un repositorio para analizar los resultados de **Code Vulnerabilities** (Vulnerabilidades del código) y **Code Quality** (Calidad del código) del análisis estático. 

* La pestaña **Code Vulnerabilities** (Vulnerabilidades del código) contiene las infracciones que se encuentran en las reglas de Datadog en la [categoría de seguridad][2].
* La pestaña **Code Quality** (Calidad del código) contiene las infracciones que se encuentran en las reglas de Datadog en las categorías [Prácticas recomendadas, Estilo de código, Propensión a errores o Rendimiento][3].

Para filtrar los resultados, usa las facetas que se encuentran a la izquierda de la lista o realiza una búsqueda. Los resultados se pueden filtrar por facetas de servicio o equipo. Para obtener más información sobre cómo se vinculan los resultados a los servicios y equipos de Datadog, consulta [Empezando con Code Analysis][11].

Cada fila representa una infracción. Cada infracción está asociada con la confirmación y la rama específicas que se seleccionan en los filtros en la parte superior de la página (de manera predeterminada, los resultados se muestran para la última confirmación en la rama predeterminada del repositorio que estás viendo).

Haz clic en una infracción para abrir un panel lateral que contiene información sobre el contexto de la infracción y dónde se originó.
{{< img src="code_analysis/static_analysis/static-analysis-violation.png" alt="Panel lateral de una infracción de análisis estático" style="width:80%;">}} 

El contenido de la infracción se muestra en pestañas:

- **Details** (Detalles): una descripción de la infracción y las líneas de código que la provocaron. Para ver el fragmento de código infractor, configura la [aplicación de GitHub con Datadog][4].
- **Remediation** (Corrección): una o más soluciones de código que pueden resolver la infracción, con opciones de corrección.
- **Event** (Evento): metadatos JSON relacionados con el evento de infracción del análisis estático.

### Uso de soluciones sugeridas
{{< img src="code_analysis/static_analysis/static-analysis-fixes.png" alt="Pestaña de soluciones de una infracción de análisis estático" style="width:80%;">}}

En el análisis estático de Datadog, hay dos tipos de soluciones sugeridas:

1. **Solución sugerida predeterminada**: para infracciones simples, como problemas de linting, el analizador de reglas proporciona de manera automática soluciones basadas en plantillas.
2. **Solución sugerida por IA**: en el caso de infracciones complejas, las soluciones normalmente no se encuentran disponibles de antemano. En su lugar, puedes usar las soluciones sugeridas por IA, que usan GPT-4 de OpenAI para generar una solución sugerida. Puedes elegir entre soluciones de «texto» y «diferencia unificada», que generan instrucciones de texto sin formato o un cambio de código para resolver la infracción, respectivamente.

Los dos tipos de soluciones se distinguen visualmente en la interfaz de usuario con etiquetas diferentes.

*Soluciones sugeridas predeterminadas:*
{{< img src="code_analysis/static_analysis/static-analysis-default-fix.png" alt="Indicador visual de una solución sugerida de análisis estático predeterminado" style="width:60%;">}}

*Soluciones sugeridas por IA:*
{{< img src="code_analysis/static_analysis/static-analysis-ai-fix.png" alt="Indicador visual de una solución sugerida por un análisis estático de IA" style="width:60%;">}}

<div class="alert alert-warning">Las soluciones sugeridas por IA se encuentran en versión preliminar. Para solicitar acceso, ponte en contacto con el <a href="/help/">servicio de asistencia.</div>

### Solución de un problema de calidad o vulnerabilidad directamente desde Datadog
{{< img src="ci/sast_one_click_light.png" alt="Ejemplo de corrección con un solo clic para Code Analysis" style="width:90%;" >}}

Puedes impulsar un cambio de código para solucionar un problema detectado por Code Analysis directamente desde un resultado en Datadog de dos maneras.

#### Abrir una solicitud pull 
Si el permiso **Solicitudes pull** de tu aplicación de GitHub se ha configurado en **Lectura y escritura**, se habilita la solución con un solo clic para todos los hallazgos del análisis estático con una solución sugerida disponible. Para obtener más información sobre cómo configurar la integración de GitHub, consulta [Solicitudes pull de GitHub][10].

Sigue estos pasos para solucionar una vulnerabilidad y abrir una solicitud pull:
1. Ve un resultado específico en Code Analysis.
2. Haz clic en ***Fix Violation** (Solucionar infracción) en el panel lateral del resultado. 
3. Selecciona **Open a Pull Request** (Abrir una solicitud pull).
4. Ingresa un título para la solicitud pull y un mensaje de confirmación.
5. Haz clic en **Create PR** (Crear solicitud pull).

#### Confirmar directamente en la rama actual
También puedes solucionar una vulnerabilidad al confirmar el resultado directamente en la rama donde se encontró. 

Para confirmar una solución sugerida:

1. Ve un resultado específico en Code Analysis.
2. Haz clic en ***Fix Violation** (Solucionar infracción) en el panel lateral del resultado.
3. Haz clic en **Commit to current branch** (Confirmar en la rama actual).

### Personalización de la configuración

Para personalizar qué reglas del análisis estático se han configurado en tus repositorios, consulta la [documentación de configuración][8].

### Notificación de falsos positivos
Si crees que una infracción específica es un falso positivo, puedes marcarla como tal con un motivo, lo que envía un informe a Datadog. Los envíos se revisan de manera periódica para mejorar la calidad del conjunto de reglas con el tiempo.

{{< img src="code_analysis/static_analysis/flag-false-positive.png" alt="Botón para informar una infracción del análisis estático como un falso positivo" style="width:60%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/ci/code-analysis
[2]: /es/code_analysis/static_analysis_rules?categories=Security
[3]: /es/code_analysis/static_analysis_rules?categories=Best+Practices&categories=Code+Style&categories=Error+Prone&categories=Performance
[4]: /es/integrations/github/
[6]: https://en.wikipedia.org/wiki/Camel_case
[7]: https://en.wikipedia.org/wiki/Snake_case
[8]: /es/code_analysis/static_analysis/setup/#customize-your-configuration
[9]: /es/code_analysis/static_analysis/setup
[10]: /es/code_analysis/github_pull_requests/
[11]: /es/getting_started/code_analysis/?tab=datadoghosted#linking-services-to-code-violations-and-libraries