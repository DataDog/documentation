---
algolia:
  tags:
  - análisis estático
  - análisis estático de datadog
  - calidad del código
  - SAST
aliases:
- /es/code_analysis/static_analysis
description: Obtén información acerca de Datadog Static Code Analysis para analizar
  el código en busca de problemas de calidad y vulnerabilidades de seguridad antes
  de que tu código llegue a producción.
is_beta: false
title: Static Code Analysis (SAST)
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Security no está disponible para el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}


## Información general

Static Code Analysis es la funcionalidad de Static Application Security Testing (SAST) de Datadog. SAST es una técnica de test de software clear-box que analiza el código de preproducción de un programa sin necesidad de ejecutarlo.

Static Code Analysis te ayuda a identificar las vulnerabilidades de seguridad y los problemas de mantenimiento en una fase temprana del ciclo de vida de desarrollo del software (SDLC) para garantizar que sólo el código más seguro y de mayor calidad llegue a la producción. Proporciona a las organizaciones las siguientes ventajas:

* Las aplicaciones son menos vulnerables a las brechas de seguridad con el paso del tiempo, debido a que las nuevas vulnerabilidades se detectan a través de las exploraciones SAST antes de que el código llegue a la producción.
* Elimina las conjeturas a la hora de adherirte a los estándares de código de una organización, lo que permite a tu equipo de desarrollo enviar código conforme sin impactos significativos en la velocidad de desarrollo.
* Incorpora desarrolladores más rápidamente, ya que Static Code Analysis permite a una organización mantener una base de código más legible a lo largo del tiempo.

## Configurar Static Code Analysis

Static Code Analysis permite buscar vulnerabilidades de seguridad y malas prácticas de codificación en los siguientes lenguajes y tecnologías:

{{< partial name="code_security/languages-getting-started.html" >}}

<!-- </br>  -->
Los análisis se pueden ejecutar a través de tus pipelines CI/CD o directamente en Datadog a través del análisis alojado (sólo GitHub).
Para empezar, ve a la [página de configuración de **Code Security**][12] o consulta la [documentación de configuración][9].

## Integración en el ciclo de vida del desarrollo

### Gestión de código fuente
{{< whatsnext desc="Durante las revisiones de código en GitHub, Datadog puede marcar automáticamente infracciones de Static Code Analysis en solicitudes de extracción, agregando comentarios de revisión en línea en las línea(s) relevante(s) del código. Cuando corresponda, Datadog también puede proporcionar correcciones sugeridas que se pueden aplicar directamente en las solicitudes de extracción. También puedes abrir una solicitud de extracción directamente desde Datadog, para corregir una vulnerabilidad o un problema de calidad" >}}
    {{< nextlink href="static_analysis/github_pull_requests" >}}Solicitudes de extracción GitHub{{< /nextlink >}}
{{< /whatsnext >}}

### IDE
{{< whatsnext desc="Puedes identificar vulnerabilidades del código en tiempo real a medida que editas un archivo en tu entorno de desarrollo integrado (IDE) Para obtener más información, consulta la documentación específica de la integración:">}}
    {{< nextlink href="developers/ide_plugins/idea/" >}}Complemento Datadog para los IDE de JetBrains{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/vscode/#static-analysis" >}}Extensión Datadog para Visual Studio Code{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/visual_studio/#static-analysis" >}}Extensión Datadog para Visual Studio{{< /nextlink >}}
{{< /whatsnext >}}

## Buscar y filtrar resultados
Después de la configuración de Static Code Analysis, se ejecuta un análisis de cada commit de un repositorio analizado. En la [página Repositorios de seguridad del código][1] se muestra un resumen de infracciones por repositorio. Haz clic en un repositorio para analizar los resultados de **Vulnerabilidades del código** y **Calidad del código** de Static Code Analysis. 

* La pestaña **Vulnerabilidades del código** contiene las infracciones encontradas por las reglas de Datadog en la [categoría Seguridad][2].
* La pestaña **Calidad del código** contiene las infracciones encontradas por las reglas de Datadog en las [categorías Prácticas recomendadas, Estilo de código, Tendencia a errores o Rendimiento][3].

Para filtrar tus resultados, utiliza las facetas a la izquierda de la lista o realiza una búsqueda. Los resultados se pueden filtrar por facetas de servicio o equipo. Para obtener más información sobre cómo los resultados se vinculan a servicios y equipos de Datadog, consulta [Empezando con la Seguridad del código][11].

Cada fila representa una infracción. Cada infracción se asocia a un commit y rama específicos seleccionados en los filtros de la parte superior de la página (por defecto, los resultados del commit más reciente se muestran en la rama por defecto del repositorio que estás visualizando).

Haz clic en una infracción para abrir un panel lateral que contenga información sobre el contexto de la infracción y dónde se originó.

<!-- {{< img src="code_security/static_analysis/static-analysis-violation.png" alt="Panel lateral de una infracción de análisis estático" style="width:80%;">}}  -->

El contenido de la infracción se muestra en pestañas:

- **Detalles**: Descripción de la infracción y de las líneas de código que la causaron. Para ver el fragmento de código infractor, configura la [aplicación GitHub Datadog][4].
- **Solución**: Una o más correcciones de código que pueden resolver la infracción, con opciones de corrección.
- **Evento**: Metadatos JSON relativos a la infracción.

## Personalizar tu configuración
Para personalizar qué reglas de Static Code Analysis se configuran en tus repositorios o en toda tu organización, consulta la [documentación de configuración][8].

## Vincular los resultados a servicios y equipos de Datadog


### Aplicar las correcciones sugeridas
<!-- {{< img src="code_security/static_analysis/static-analysis-fixes.png" alt="Pestaña Correcciones de una infracción de análisis estático" style="width:80%;">}} -->

En Datadog Static Code Analysis, hay dos tipos de correcciones sugeridas:

1. **Corrección determinista sugerida:** Para infracciones simples, como problemas de linting, el analizador de reglas proporciona automáticamente plantillas de corrección.
2. **Corrección sugerida por la IA:** En el caso de infracciones complejas, las correcciones no suelen estar disponibles de antemano. En su lugar, puedes utilizar las correcciones sugeridas por la IA, que utilizan GPT-4 de OpenAI para generar una corrección sugerida. Puedes elegir entre correcciones de "Texto" y "Diferencia unificada", que generan instrucciones de texto sin formato o un cambio de código para resolver la infracción, respectivamente. *Esta función es opcional*.

<!-- {{< img src="code_security/static_analysis/static-analysis-default-fix.png" alt="Indicador visual de una corrección sugerida de análisis estático por defecto" style="width:60%;">}}

{{< img src="code_security/static_analysis/static-analysis-ai-fix.png" alt="Indicador visual de una corrección sugerida de análisis estático por IA" style="width:60%;">}} -->

### Solucionar una vulnerabilidad o un problema de calidad directamente desde Datadog

<!-- {{< img src="ci/sast_one_click_light.png" alt="Ejemplo de corrección en un clic de Code Security" style="width:90%;" >}} -->

Puedes introducir un cambio en el código para corregir un problema detectado por Static Code Analysis directamente desde un resultado de Datadog de dos maneras.

#### Abrir una solicitud pull

Si el permiso **Solicitudes de extracción** de tu aplicación GitHub está configurado como **Leer y escribir**, se habilita la corrección en un clic para todos los hallazgos de Static Code Analysis con una solución sugerida disponible. Para obtener más información sobre la configuración de la integración GitHub, consulta [Solicitudes de extracción GitHub Pull][10].

Sigue estos pasos para solucionar una vulnerabilidad y abrir una solicitud pull:
1. Visualiza un resultado SAST específico en Code Security.
2. Haz clic en ***Fix Violation** (Solucionar infracción) en el panel lateral del resultado. 
3. Selecciona **Open a Pull Request** (Abrir una solicitud pull).
4. Ingresa un título para la solicitud pull y un mensaje de confirmación.
5. Haz clic en **Create PR** (Crear solicitud pull).

#### Confirmar directamente en la rama actual
También puedes solucionar una vulnerabilidad al confirmar el resultado directamente en la rama donde se encontró. 

Para confirmar una solución sugerida:

1. Visualiza un resultado SAST específico en Code Security.
2. Haz clic en ***Fix Violation** (Solucionar infracción) en el panel lateral del resultado.
3. Haz clic en **Commit to current branch** (Confirmar en la rama actual).

## Notificar falsos positivos
Si crees que una infracción específica es un falso positivo, puedes marcarla como falso positivo con un motivo de marcado, lo que envía un informe directamente a Datadog. Los envíos se revisan periódicamente para mejorar la calidad del conjunto de normas a lo largo del tiempo.

<!-- {{< img src="code_security/static_analysis/flag-false-positive.png" alt="Botón para informar una infracción de Static Code Analysis como un falso positivo" style="width:60%;">}} -->

<!-- ## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}} -->

[1]: https://app.datadoghq.com/ci/code-analysis
[2]: /es/security/code_security/static_analysis_rules?categories=Security
[3]: /es/security/code_security/static_analysis_rules?categories=Best+Practices&categories=Code+Style&categories=Error+Prone&categories=Performance
[4]: /es/integrations/github/
[6]: https://en.wikipedia.org/wiki/Camel_case
[7]: https://en.wikipedia.org/wiki/Snake_case
[8]: /es/security/code_security/static_analysis/setup/#customize-your-configuration
[9]: /es/security/code_security/static_analysis/setup
[10]: /es/security/code_security/dev_tool_int/github_pull_requests/
[11]: /es/getting_started/code_security/
[12]: https://app.datadoghq.com/security/configuration/code-security/setup