---
aliases:
- /es/getting_started/code_analysis/
title: Empezando con Code Security
---

## Información general

Datadog Code Security te ayuda a proteger y mantener el código de origen de tus aplicaciones y las bibliotecas de código abierto desde el desarrollo hasta la producción.

Te ofrece un conjunto de herramientas para ayudarte a proteger tu código a lo largo del ciclo de vida de desarrollo del software:

- **Static Code Analysis (SAST)** utiliza un método de test estático de seguridad de las aplicaciones para analizar tus repositorios en búsqueda de problemas de seguridad y calidad en el código de origen, y te ofrece sugerencias de corrección para evitar que estos problemas lleguen a la producción.
- **Software Composition Analysis (SCA)** detecta las bibliotecas de código abierto vulnerables que están presentes en tus repositorios y que afectan a tus servicios en tiempo de ejecución, y te ayuda a proteger y mantener tu cadena de suministro de software.
- **Runtime Code Analysis (IAST)** utiliza un método de test interactivo de seguridad de las aplicaciones para detectar vulnerabilidades que afectan a tus servicios en tiempo de ejecución.

## Configurar Code Security

### Bibliotecas de código abierto

Datadog Software Composition Analysis detecta vulnerabilidades de librería y cataloga las dependencias en tu base de código y tus servicios en ejecución.

Consulta [Software Composition Analysis][1] para configurar la detección estática de vulnerabilidades o bibliotecas en tiempo de ejecución.

### Código de origen

{{< whatsnext desc="Existen dos maneras de proteger y mantener tu código de origen con Datadog:">}}
    {{< nextlink href="security/code_security/static_analysis/setup/" >}}Configuración de Static Code Analysis (SAST){{< /nextlink >}}
    {{< nextlink href="security/code_security/iast/setup/" >}}Configuración de Runtime Code Analysis (IAST){{< /nextlink >}}
{{< /whatsnext >}}

## Integraciones de herramientaa para desarrolladores

### Activar comentarios en solicitudes de extracción

Datadog puede actuar como un revisor automático de código para señalar vulnerabilidades e infracciones de calidad en las solicitudes de extracción de GitHub. Para obtener más información, consulta [Solicitudes de extracción de GitHub][2].

{{< img src="/security/application_security/code_security/github_suggestion.png" alt="Revisión del código de Datadog en Github" style="width:100%;" >}}

### Instalar integraciones IDE

Instala los [complementos IDE de Datadog][5] para ejecutar análisis de Static Code Analysis (SAST) localmente y ver los resultados directamente en tu editor de código. Puedes detectar y corregir problemas como vulnerabilidades de seguridad, problemas de mantenibilidad o errores en tu código antes de confirmar los cambios.

Para empezar a ejecutar análisis de código en tu IDE, consulta la documentación correspondiente al editor de código de tu elección.

{{< whatsnext desc="Consulta la documentación para ver información sobre las siguientes integraciones:">}}
    {{< nextlink href="developers/ide_plugins/idea/#static-analysis" >}}<u>IDE de JetBrains</u>: IntelliJ IDEA, GoLand, PyCharm, WebStorm y PhpStorm{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/vscode/#static-analysis" >}}<u>Visual Studio Code</u>{{< /nextlink >}}
    {{< nextlink href="developers/ide_plugins/visual_studio/#static-analysis" >}}<u>Visual Studio</u>{{< /nextlink >}}
{{< /whatsnext >}}

### Personalizar la configuración de tu repositorio
En [parámetros de Code Security][3], puedes gestionar qué repositorios tienen los comentarios en solicitudes de extracción habilitados, así como [personalizar la configuración][11] de qué reglas de Static Code Analysis (SAST) se aplican a través o dentro de los repositorios. Para conocer todas las reglas por defecto proporcionadas por Datadog, consulta [Reglas SAST][4].

### Configurar Puertas de calidad

Datadog proporciona [Puertas de calidad][6] como una funcionalidad de la plataforma para ayudarte a mantener y hacer cumplir las normas de seguridad y calidad en los cambios introducidos en tu base de código. Para obtener más información, consulta [Configuración de puertas de calidad][7].

## Priorizar las vulnerabilidades con el contexto del tiempo de ejecución

Code Security ofrece **vistas centradas en las vulnerabilidades** de todas las vulnerabilidades de librería y código detectadas, tanto a partir del análisis estático de repositorios como de la detección de servicios en tiempo de ejecución.

### Explorar las vulnerabilidades

Para las vulnerabilidades de librería, cada fila de la tabla representa una vulnerabilidad específica que afecta a una versión de librería. En función de si tienes activada la detección estática o en tiempo de ejecución, la columna **Detectado en** muestra los repositorios o servicios específicos afectados por esta vulnerabilidad.

En el panel lateral de una única vulnerabilidad de librería en SCA, además de los detalles sobre la vulnerabilidad, Datadog muestra:

- Un **desglose de la gravedad** de la instancia de mayor gravedad de esta vulnerabilidad observada en tus repositorios y servicios. Para cada localización detectada de la vulnerabilidad en tus repositorios o servicios, Datadog ajusta la puntuación de la gravedad de base de la vulnerabilidad basándose en factores del entorno. Para obtener más información, consulta [Puntuación de la gravedad de Datadog][8].
- Una tabla **Repositorios** de todas las instancias en las que se detectó la vulnerabilidad en tus repositorios. Para cada instancia, Datadog muestra si la dependencia está clasificada como directa o transitiva, el estado de corrección de la vulnerabilidad, así como los pasos específicos de la corrección.
- Una tabla **Servicios afectados** de todos los servicios en ejecución afectados por esta vulnerabilidad de librería. Un servicio está afectado por una vulnerabilidad de librería si la librería fue cargada en tiempo de ejecución y detectada por bibliotecas de rastreo de aplicaciones de Datadog.

 La gravedad se puntúa de la siguiente manera:
| Puntuación CVSS    | Calificación cualitativa
| --------------| -------------------|
|   `0.0`         | Sin gravedad                |
|   `0.1 - 3.9`   | Baja                 |
|   `4.0 - 6.9`   | Media              |
| `7.0 - 8.9` | Alta |
| `9.0 - 10.0` | Crítica |

### Explorar resultados por repositorio

Code Security también ofrece **vistas centradas en los repositorios** de los resultados de los análisis estáticos, lo que permite un filtrado granular de todas las ramas y confirmaciones de los repositorios analizados.

Haz clic en un repositorio en la página **Repositorios** para acceder a una vista más detallada donde puedes personalizar la consulta de búsqueda por rama (primero aparece la rama por defecto) y por commit (empezando por el más reciente).

{{< tabs >}}
{{% tab "Static Code Analysis (SAST)" %}}

Puedes utilizar las siguientes facetas predefinidas para crear una consulta de búsqueda a fin de identificar y solucionar malas prácticas de codificación, en la pestaña **Calidad del código**, o riesgos de seguridad, en la pestaña **Vulnerabilidades de código**.

| Nombre de la faceta                        | Descripción                                                             |
|-----------------------------------|-------------------------------------------------------------------------|
| Estado del resultado                     | Filtra los resultados en función del estado de finalización del análisis.         |
| ID de regla                           | Normas específicas que activaron los hallazgos.                             |
| Nombre de la herramienta                         | Determina qué herramientas contribuyeron al análisis.                     |
| CWE (Common Weakness Enumeration) | Filtra los resultados por categorías de vulnerabilidad reconocidas.                |
| Tiene correcciones                         | Filtra los problemas para los que existen correcciones sugeridas.                 |
| Mensaje de resultado                    | Contiene descripciones concisas o mensajes asociados a los resultados. |
| Descripción de la regla                  | Contiene la justificación de cada regla.                                |
| Fuente de origen                       | Contiene los archivos en los que se detectaron problemas.                          |
| Versión de la herramienta                      | Filtra los resultados por la versión de las herramientas utilizadas.                       |

Puedes acceder a las correcciones sugeridas directamente desde los resultados para abordar las vulnerabilidades de seguridad o mejorar las prácticas de calidad del código.

{{< img src="/getting_started/code_analysis/suggested_fix.png" alt="Corrección de código sugerida en la pestaña Correcciones de un resultado de Code Analysis" style="width:100%" >}}

{{% /tab %}}
{{% tab "Software Composition Analysis" %}}

Puedes utilizar las siguientes facetas predefinidas para crear una consulta de búsqueda a fin de identificar y tratar los riesgos de seguridad en bibliotecas de terceros en la pestaña **Vulnerabilidades de librerías** o revisar tu inventario de librerías en la pestaña **Catálogo de librerías**.

| Nombre de la faceta         | Descripción                                                    |
|--------------------|----------------------------------------------------------------|
| Nombre de la dependencia    | Identifica las bibliotecas por sus nombres.                              |
| Versión de la dependencia | Filtros por versiones específicas de librerías.                     |
| Lenguaje           | Ordena bibliotecas por el lenguaje de programación.                   |
| Puntuación              | Ordena la puntuación de riesgo o calidad de las dependencias.           |
| Gravedad           | Filtra las vulnerabilidades en función de su gravedad.        |
| Plataforma           | Distingue bibliotecas por la plataforma a la que van destinadas. |

Puedes acceder a los informes sobre vulnerabilidades y localizar los archivos fuente en los que se detectó la vulnerabilidad en tus proyectos, junto con información sobre los propietarios de código del archivo.

{{< img src="/security/application_security/code_security/sci_vulnerabilities.png" alt="Enlace al código fuente directamente en GitHub, a partir de una vulnerabilidad de librería detectada" style="width:100%" >}}

{{% /tab %}}
{{< /tabs >}}

## Notificar, corregir e informar

Code Security te ayuda a configurar flujos de trabajo para realizar un seguimiento y gestionar la corrección de los hallazgos:

- Configura [reglas de notificación][9] para notificar a tu(s) equipo(s) los nuevos hallazgos a través de Slack, Jira, correo electrónico, etc.
- Haz un seguimiento de las vulnerabilidades por servicio y por equipo en la página **Resumen de Code Security**.

## Vincular resultados a servicios y equipos de Datadog

### Vincular resultados a servicios
Datadog asocia los resultados del análisis del código y de la librería con los servicios pertinentes mediante los siguientes mecanismos:

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


#### Detección de patrones de uso de archivos

Datadog detecta el uso de archivos en productos adicionales como Error Tracking y asocia
archivos al servicio de tiempo de ejecución. Por ejemplo, si un servicio llamado `foo` tiene
una entrada de log o una traza (trace) de stack tecnológico que contiene un archivo con una ruta `/modules/foo/bar.py`,
se asocian los archivos `/modules/foo/bar.py` al servicio `foo`.

#### Detección de nombres de servicios en rutas y nombres de repositorios

Datadog detecta nombres de servicios en rutas y nombres de repositorios y asocia el archivo al servicio, si se encuentra una coincidencia.

Para una coincidencia de repositorios, si existe un servicio llamado `myservice` y
la URL del repositorio es `https://github.com/myorganization/myservice.git`,
se asocia `myservice` a todos los archivos del repositorio.

Si no se encuentra ninguna coincidencia de repositorios, Datadog intenta encontrar una coincidencia en la
`path` del archivo. Si existe un servicio llamado `myservice` y la ruta es `/path/to/myservice/foo.py`, el archivo se asocia a `myservice` ya que el nombre del servicio forma parte de la ruta. Si hay dos servicios presentes
en la ruta, se selecciona el nombre del servicio más cercano al nombre del archivo.


### Vincular resultados a equipos

Datadog asocia automáticamente el equipo adjunto a un servicio cuando se detecta una infracción o vulnerabilidad. Por ejemplo, si el archivo `domains/ecommerce/apps/myservice/foo.py`
está asociado a `myservice`, entonces el equipo `myservice` se asociará a cualquier infracción
detectada en este archivo.

Si no se encuentra ningún servicio o equipo, Datadog utiliza el archivo `CODEOWNERS` de tu repositorio. El archivo `CODEOWNERS` determina a qué equipo pertenece un archivo en tu proveedor Git.

**Nota**: Para que esta característica funcione correctamente, debes [asignar con precisión][13] tus equipos de proveedores Git a tus [equipos de Datadog][10].

[1]: /es/security/code_security/software_composition_analysis/
[2]: /es/security/code_security/dev_tool_int/github_pull_requests/
[3]: https://app.datadoghq.com/security/configuration/code-security/setup
[4]: /es/security/code_security/static_analysis/static_analysis_rules/
[5]: /es/security/code_security/dev_tool_int/ide_plugins/
[6]: /es/quality_gates/
[7]: /es/quality_gates/setup
[8]: /es/security/code_security/software_composition_analysis/#datadog-severity-score
[9]: https://app.datadoghq.com/security/configuration/notification-rules
[10]: /es/account_management/teams/
[11]: /es/security/code_security/static_analysis/setup/#customize-your-configuration
[12]: https://docs.datadoghq.com/es/software_catalog/service_definitions/v3-0/
[13]: /es/integrations/github/#connect-github-teams-to-datadog-teams
