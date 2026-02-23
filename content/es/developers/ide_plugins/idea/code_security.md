---
further_reading:
- link: /security/code_security/
  tag: Documentación
  text: Más información sobre Code Security
title: Code Security
type: documentación
---

## Información general
La integración de  [Code Security][4] en el complemento de Datadog para entornos de desarrollo integrados (IDE) de JetBrains promueve una mejor seguridad al marcar las vulnerabilidades de las bibliotecas y las vulnerabilidades del código en tiempo de ejecución. El analizador de código local comprueba los cambios en el código a medida que se edita para detectar problemas de calidad y seguridad antes de confirmarlos.

Esta función es compatible con cualquier repositorio de código source (fuente) que esté integrado en [Code Security de Datadog][1].

## Vulnerabilidades
El complemento de Datadog informa de las vulnerabilidades de las bibliotecas y del código de tiempo de ejecución resaltando los problemas directamente en el editor source (fuente):

{{< img src="/developers/ide_plugins/idea/code_security/library-vulnerability.png" alt="Una vulnerabilidad de biblioteca resaltada en el editor source (fuente)" style="width:80%;" >}}

Los detalles completos de cada vulnerabilidad se muestran en la ventana de la herramienta de Datadog en las pestañas **File Insights** (Información del archivo) y **Project Insights** (Información del project (proyecto). 

{{< img src="/developers/ide_plugins/idea/code_security/library-vulnerability-tool-window.png" alt="Una vulnerabilidad de biblioteca mostrada en la ventana de herramienta de Datadog" style="width:100%;" >}}

Haz clic en el enlace de la sección **Code Links** (Enlaces de código) para ir a la ubicación source (fuente) o haz clic en la descripción de la vulnerabilidad para abrir el resumen en Datadog.

## Análisis del código local

### Edición de archivos
Al editar los archivos source (fuente), el complemento de Datadog comprueba el contenido (localmente) comparándolo con un conjunto de [reglas][2] para detectar y marcar problemas de calidad y seguridad antes de confirmar los cambios.

El motor de análisis local admite todos los tipos de archivos enumerados en [Reglas de análisis estático][3]. Los problemas se muestran en el editor de código source (fuente) con el sistema de inspección JetBrains y puedes aplicar directamente las correcciones sugeridas.

{{< img src="/developers/ide_plugins/idea/code_security/local-code-analysis.png" alt="Violación del análisis estático en el editor source (fuente)" style="width:100%;" >}}

Además, todos los problemas detectados por esta función se enumeran en la vista estándar **Problems** (Problemas).

### Análisis de varios archivos
Puedes ejecutar el análisis de código local en varios archivos. En el menú **Code** (Código), selecciona **Analyze Code** (Analizar código) → **Run Inspection by Name...** (Ejecutar inspección por nombre) y selecciona `Datadog Static Analysis`:

{{< img src="/developers/ide_plugins/idea/code_security/inspection-by-name.png" alt="Inspección de análisis estático de Datadog" style="width:60%;" >}}

Selecciona el ámbito, haz clic en **OK** (Aceptar) y revisa los problemas marcados en la vista **Problems** (Problemas).

### Configuración
El analizador de código se ejecuta automáticamente si se cumplen las siguientes dos condiciones:

- Tu repositorio se ha incorporado en [Code Security de Datadog][1].
- Has iniciado sesión en Datadog para que los datos de la configuración remota estén disponibles.

Para ver los datos de la configuración en tu IDE, ejecuta la acción **Show Datadog Static Analyzer Config** (Mostrar la configuración del analizador estático de Datadog):

{{< img src="/developers/ide_plugins/idea/code_security/show-sa-config.png" alt="Acción para mostrar la configuración del analizador estático" style="width:80%;" >}}

Puedes guardar un archivo de configuración local (`static-analysis.datadog.yml`) en la raíz del repositorio y tus parámetros se fusionarán con la configuración remota. Cuando no hay ninguna configuración remota disponible, el archivo de configuración local se utiliza por sí solo.

<div class="alert alert-tip">Utilizar un archivo de configuración local es una buena forma de probar la función y funciona incluso sin un inicio de sesión en Datadog.</div>

{{< img src="/developers/ide_plugins/idea/code_security/local-config.png" alt="Una configuración local para análisis estático" style="width:100%;" >}}

Más información sobre cómo [personalizar la configuración][5].

### Configuración
El analizador estático de Datadog puede activarse y desactivarse en los parámetros del IDE en **Editor** → **Inspections** (Inspecciones).

{{< img src="/developers/ide_plugins/idea/code_security/inspections-settings.png" alt="Parámetros para activar y desactivar el análisis estático" style="width:80%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: /es/security/code_security/static_analysis/setup/?tab=github
[3]: /es/security/code_security/static_analysis/static_analysis_rules/
[4]: /es/security/code_security/
[5]: /es/security/code_security/static_analysis/setup/?tab=github#customize-your-configuration