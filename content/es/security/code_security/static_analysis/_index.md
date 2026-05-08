---
algolia:
  tags:
  - análisis estático
  - análisis estático de datadog
  - calidad del código
  - SAST
aliases:
- /es/code_analysis/static_analysis
description: Obtén información acerca de Static Code Analysis de Datadog para analizar
  el código en busca de problemas de calidad y vulnerabilidades de seguridad antes
  de que tu código llegue a producción.
is_beta: false
title: Static Code Analysis (SAST)
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Security no está disponible para el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}


## Información general

Static Code Analysis es la capacidad de Prueba Estática de Seguridad de Aplicaciones (SAST) de Datadog. SAST es una técnica de prueba de software de caja blanca que analiza el código de preproducción de un programa sin necesidad de ejecutarlo.

Static Code Analysis te ayuda a identificar las vulnerabilidades de seguridad y los problemas de mantenimiento en una fase temprana del ciclo de vida de desarrollo del software (SDLC) para garantizar que sólo el código más seguro y de mayor calidad llegue a la producción. Proporciona a las organizaciones las siguientes ventajas:

* Las aplicaciones son menos vulnerables a las brechas de seguridad con el paso del tiempo, debido a que las nuevas vulnerabilidades se detectan a través de las exploraciones SAST antes de que el código llegue a la producción.
* Elimina las conjeturas a la hora de adherirte a los estándares de código de una organización, lo que permite a tu equipo de desarrollo enviar código conforme sin impactos significativos en la velocidad de desarrollo.
* Incorpora desarrolladores más rápidamente, ya que Static Code Analysis permite a una organización mantener una base de código más legible a lo largo del tiempo.

## Configurar Static Code Analysis

Static Code Analysis permite buscar vulnerabilidades de seguridad y malas prácticas de codificación en los siguientes lenguajes y tecnologías:

{{< partial name="code_security/languages-getting-started.html" >}}

<!-- </br>  -->
Las exploraciones pueden ejecutarse a través de tus pipelines de Continuous Integration Continuous Delivery o directamente en Datadog con exploraciones alojadas.  
Para empezar, ve a la [page (página) de configuración de **Code Security**][12] o consulta la [Documentación de configuración][9].

## Integración en el ciclo de vida del desarrollo

### Gestión del código source (fuente)
{{< whatsnext desc="Durante las revisiones de código, Datadog puede marcar automáticamente infracciones de Static Code Analysis en solicitudes de incorporación de cambios añadiendo comentarios de revisión en línea en las líneas de código pertinentes. Cuando corresponda, Datadog también brinda correcciones sugeridas que se pueden aplicar directamente en la solicitud de incorporación de cambios." >}}
    {{< nextlink href="static_analysis/github_pull_requests" >}}Solicitudes de incorporación de cambios{{< /nextlink >}}
{{< /whatsnext >}}

### IDE
{{< whatsnext desc="Puedes identificar vulnerabilidades del código en tiempo real mientras editas un archivo en tu Entorno de desarrollo integrado (IDE). Consulta la documentación de integración específica para obtener más información:">}}
    {{< nextlink href="developers/ide_plugins/idea/" >}}Complemento de Datadog para IDE de JetBrains{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/vscode/#static-analysis" >}}Extensión de Datadog para Visual Studio Code{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/visual_studio/#static-analysis" >}}Extensión de Datadog para Visual Studio{{< /nextlink >}}
{{< /whatsnext >}}

## Buscar y filtrar resultados
Después de configurar Static Code Analysis, se ejecuta una exploración en cada confirmación de un repositorio explorado. Las infracciones se resumen por repositorio en la [page (página) **Code Security Repositories** (Repositorios de Code Security)][1]. Haz clic en un repositorio para analizar los resultados de **Code Vulnerabilities** (Vulnerabilidades del Código) y **Code Quality** (Calidad del código) desde Static Code Analysis.

* La pestaña **Code Vulnerabilities** (Vulnerabilidades del código) contiene las violaciones encontradas por las reglas de Datadog en la [categoría Seguridad][2].
* La pestaña **Code Quality** (Calidad del código) contiene las infracciones encontradas por las reglas de Datadog en las categorías [Prácticas recomendadas, Estilo de código, Tendencia a errores o Rendimiento][3].

Para filtrar tus resultados, utiliza las facetas situadas a la izquierda de la lista o realiza una búsqueda. Los resultados pueden [filtrarse por facetas de servicio o equipo][13].

Cada fila representa una infracción. Cada infracción está asociada a la confirmación y rama específicas seleccionadas en los filtros de la parte superior de la page (página) (en forma predeterminada, los resultados se muestran para la última confirmación en la rama predeterminada del repositorio que estás viendo).

Haz clic en una infracción para abrir un panel lateral que contiene información sobre el alcance de la infracción y dónde se originó.

<!-- {{< img src="code_security/static_analysis/static-analysis-violation.png" alt="Panel lateral de una infracción de análisis estático" style="width:80%;">}}  -->

El contenido de la infracción se muestra en pestañas:

- **Detalles**: Una descripción de la infracción y las líneas de código que la causaron. Para ver el fragmento de código infractor, configura la integración del código source (fuente) correspondiente para tu proveedor (GitHub[4], GitLab[5]).
- **Solución**: Una o más correcciones de código que pueden resolver la infracción, con opciones de corrección.
- **Evento**: Metadatos JSON relativos a la infracción.

### Filtrar los falsos positivos
Para un subconjunto de vulnerabilidades de pruebas de seguridad de aplicaciones estáticas (SAST), Bits AI puede revisar el contexto del resultado y evaluar si es más probable que sea un verdadero o falso positivo, junto con una breve explicación del razonamiento. Selecciona el conmutador "Filtrar falsos positivos" en el [Explorer de vulnerabilidades de las pruebas de seguridad de aplicaciones estáticas (SAST)](https://app.datadoghq.com/security/code-security/sast) para reducir rápidamente tu lista inicial para el triaje. 

Para cada resultado, puedes proporcionar a Bits AI comentarios sobre su evaluación.

{{% collapse-content title="Advertencias admitidas" level="h4" expanded=true id="id-for-anchoring" %}}
El filtrado de falsos positivos es compatible con los siguientes CWE:
- [CWE-89: Inserción de SQL](https://cwe.mitre.org/data/definitions/89.html)
- [CWE-78: Inserción de comandos del sistema operativo](https://cwe.mitre.org/data/definitions/78.html)
- [CWE-90: Inserción de LDAP](https://cwe.mitre.org/data/definitions/90.html)
- [CWE-22: Cruce de ruta](https://cwe.mitre.org/data/definitions/22.html)
- [CWE-501: Infracción de límites de confianza](https://cwe.mitre.org/data/definitions/501.html)
- [CWE-79: Scripting entre sitios](https://cwe.mitre.org/data/definitions/79.html)
- [CWE-614: Cookie insegura](https://cwe.mitre.org/data/definitions/614.html)
- [CWE-327: Algoritmo criptográfico defectuoso o de riesgo](https://cwe.mitre.org/data/definitions/327.html)
- [CWE-643: Inserción de XPath](https://cwe.mitre.org/data/definitions/643.html)
- [CWE-94: Inserción de código](https://cwe.mitre.org/data/definitions/94.html)
- [CWE-284: Control de acceso inadecuado](https://cwe.mitre.org/data/definitions/284.html)
- [CWE-502: Deserialización de datos no fiables](https://cwe.mitre.org/data/definitions/502.html)
{{% /collapse-content %}}

## Personalizar tu configuración
Para personalizar qué reglas de Static Code Analysis se configuran en tus repositorios o en toda tu organización, consulta la [documentación de configuración][8].

## Vincular resultados a servicios y equipos de Datadog

### Vincular resultados a servicios
Datadog asocia los resultados del análisis del código y de la biblioteca con los servicios pertinentes mediante los siguientes mecanismos:

1. [Identificación de la localización del código asociado a un servicio mediante el Catálogo de software](#identifying-the-code-location-in-the-software-catalog)
2. [Detección de patrones de uso de archivos en productos adicionales de Datadog.](#detecting-file-usage-patterns)
3. [Búsqueda del nombre del servicio en la ruta del archivo o el repositorio](#detecting-service-name-in-paths-and-repository-names)

Si un método tiene éxito, no se realizan más intentos de asignación. A continuación se detalla cada método de asignación.

#### Identificación de la localización del código en el Catálogo de software

La [versión del esquema `v3`][12] y posteriores del Catálogo de software te permiten añadir la asignación del código de localización de tu servicio. La sección `codeLocations` especifica la localización del repositorio que contiene el código y sus rutas asociadas.

El atributo `paths` es una lista de globs que deben coincidir con las rutas del repositorio.

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: service
metadata:
name: my-service
datadog:
codeLocations:
- repositoryURL: https://github.com/myorganization/myrepo.git
paths:
- path/to/service/code/**
{{< /code-block >}}

### Vincular resultados a equipos
Datadog asocia los resultados de la exploración con el equipo asociado a un servicio. Por ejemplo, si el archivo `domains/ecommerce/apps/myservice/foo.py`
está asociado a `myservice`, entonces el equipo `myservice` se asociará a cualquier infracción
detectada en este archivo.

Si no se encuentra ningún servicio o equipo, Datadog utiliza el archivo `CODEOWNERS` de tu repositorio. El archivo `CODEOWNERS` determina a qué equipo pertenece un archivo en tu proveedor Git.

**Nota**: Debe [asignar con precisión][15] tu equipo de proveedores de Git a tus [equipos de Datadog][14] para que esta función funcione correctamente.

## Aplicar las correcciones sugeridas
<!-- {{< img src="code_security/static_analysis/static-analysis-fixes.png" alt="Pestaña Correcciones de una infracción de análisis estático" style="width:80%;">}} -->

En Datadog Static Code Analysis, hay dos tipos de correcciones sugeridas:

1. **Corrección determinista sugerida:** Para infracciones simples, como problemas de linting, el analizador de reglas proporciona automáticamente plantillas de corrección.
2. **Corrección sugerida por la IA.** En el caso de infracciones complejas, las correcciones no suelen estar disponibles de antemano. En su lugar, puedes utilizar las correcciones sugeridas por la IA, que utilizan la GPT-4 de OpenAI para generar una corrección sugerida. Puedes elegir entre correcciones de "Texto" y "Diferencia unificada", que generan instrucciones de texto sin formato o un cambio de código para resolver la infracción, respectivamente.

<!-- {{< img src="code_security/static_analysis/static-analysis-default-fix.png" alt="Indicador visual de una corrección sugerida de análisis estático por defecto" style="width:60%;">}}

{{< img src="code_security/static_analysis/static-analysis-ai-fix.png" alt="Indicador visual de una corrección sugerida de análisis estático por IA" style="width:60%;">}} -->

### Solucionar una vulnerabilidad o un problema de calidad directamente desde Datadog

<!-- {{< img src="ci/sast_one_click_light.png" alt="Ejemplo de corrección en un clic de Code Security" style="width:90%;" >}} -->

Si GitHub es tu gestor de código source (fuente), puede enviar un cambio de código para solucionar un problema de pruebas de seguridad de aplicaciones estáticas (SAST) directamente desde Datadog de dos maneras.

#### Abrir una solicitud pull
Si el permiso **Solicitudes de extracción** de tu aplicación GitHub está configurado como **Lectura y escritura**, se habilita la corrección en un clic para todos los hallazgos de Static Code Analysis con una corrección sugerida disponible.

Sigue estos pasos para corregir una vulnerabilidad y abrir una solicitud de extracción:
1. Visualiza un resultado SAST específico en Code Security.
2. Haz clic en ***Fix Violation** (Solucionar infracción) en el panel lateral del resultado.
3. Selecciona **Abrir una solicitud pull**.
4. Introduce el título de la solicitud y el mensaje de confirmación.
5. Haz clic en **Create PR** (Crear solicitud pull).

#### Confirmar directamente en la rama actual
También puedes corregir una vulnerabilidad confirmándola directamente en la rama en la que se encontró el resultado.

Para confirmar una corrección sugerida:

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
[5]: /es/integrations/gitlab-source-code/
[6]: https://en.wikipedia.org/wiki/Camel_case
[7]: https://en.wikipedia.org/wiki/Snake_case
[8]: /es/security/code_security/static_analysis/setup/#customize-your-configuration
[9]: /es/security/code_security/static_analysis/setup
[10]: /es/security/code_security/dev_tool_int/github_pull_requests/
[11]: /es/getting_started/code_security/
[12]: https://app.datadoghq.com/security/configuration/code-security/setup
[13]: https://docs.datadoghq.com/es/security/code_security/static_analysis/#link-results-to-datadog-services-and-teams
[14]: /es/account_management/teams/
[15]: /es/integrations/github/#connect-github-teams-to-datadog-teams