---
aliases:
- /es/security/vulnerability_pipeline
further_reading:
- link: /security/automation_pipelines/mute
  tag: Documentación
  text: Reglas de la opción silenciar
- link: /security/automation_pipelines/security_inbox
  tag: Documentación
  text: Añadir a las reglas de la bandeja de entrada de seguridad
- link: /security/automation_pipelines/set_due_date
  tag: Documentación
  text: Definir reglas de vencimiento
title: Automation Pipelines
---

{{< callout btn_hidden="true">}}
  Automation Pipelines está en vista previa. Para inscribirte y acceder a las reglas automatizadas, debes registrarte en cada conjunto de reglas por separado:
  <ul><li><a href="https://www.datadoghq.com/product-preview/security-automation-pipelines/">Silenciar y asignar fecha límite</a></li>
  <li><a href="https://www.datadoghq.com/product-preview/customize-your-security-inbox/">Añadir a la bandeja de entrada de seguridad</a></li></ul>
{{< /callout >}} 

Automation Pipelines te permite configurar reglas automatizadas para las vulnerabilidades recién detectadas, acelerando los esfuerzos de clasificación y corrección a escala.

{{< img src="security/automation_pipelines/vulnerabilities_settings.png" alt="Página de configuración de vulnerabilidades de la automatización" width="100%">}}

## Disponibilidad

Automation Pipelines está disponible para:

- Errores de configuración
- Rutas de ataque
- Riesgos de identidad
- Vulnerabilidades

## Cómo funciona

Automation Pipelines funciona mediante un sistema basado en reglas que permite automatizar la gestión de nuevas vulnerabilidades. Así es como funciona:

- **Configuración de reglas**: cada regla consta de múltiples criterios, diseñados para filtrar vulnerabilidades basándose en atributos específicos. Dentro de una regla, la combinación de estos criterios opera como un AND lógico; sin embargo, si algún criterio incluye múltiples valores, esos valores operan como un OR lógico. Esta estructura te ofrece la flexibilidad necesaria para crear reglas que se ajusten con precisión a tus necesidades.
- **Coincidencia de reglas**: Automation Pipelines evalúa las vulnerabilidades comparándolas con tus reglas en el orden en que las hayas enumerado. A medida que se procesa cada vulnerabilidad, Automation Pipelines recorre la lista hasta que encuentra una regla coincidente, momento en el que se activa la acción especificada, como silenciar los problemas no urgentes o resaltar las amenazas críticas.

## Casos prácticos

### Silencia los hallazgos no urgentes para poder dar prioridad a las amenazas inmediatas

Mitiga la sobrecarga de información silenciando los hallazgos no urgentes, para que puedas centrarte en las amenazas críticas. Esto te permite:

- **Descartar proactivamente los hallazgos no urgentes**: filtra automáticamente los escenarios conocidos que no requieren una acción inmediata, como falsos positivos o riesgos aceptados, sin intervención manual.
- **Centrarte en los verdaderos riesgos**: prioriza y aborda las amenazas genuinas, asegurándote de que tu atención se dirige a remediar problemas reales y urgentes.
- **Agilizar las alertas de seguridad**: elimina el ruido de las alertas de seguridad relacionadas con:
  - Falsos positivos conocidos
  - Recursos considerados no críticos o sin importancia
  - Vulnerabilidades intencionadas en controles entornos
  - Recursos efímeros que se agotan de forma natural sin plantear problemas a largo plazo

### Personaliza la bandeja de entrada de seguridad para resaltar lo que es importante para tu organización

Personaliza la bandeja de entrada de seguridad definiendo condiciones específicas que determinen qué problemas de seguridad se resaltan. Esto te permite:

- **Resaltar los problemas que no se detectan por defecto**: resalta los problemas que podrían pasar desapercibidos por las reglas de detección personalizadas o predefinidas, garantizando que no se pase por alto ningún problema crítico.
- **Reforzar el cumplimiento de la normativa y abordar los principales problemas de los sistemas**: aborda los problemas que afectan al cumplimiento de la normativa o a sistemas empresariales importantes, independientemente de su gravedad.
- **Priorizar los riesgos actuales**: céntrate en las amenazas inmediatas, como los riesgos de identidad tras una incidencia o las vulnerabilidades de todo el sector.

### Define fechas de vencimiento para las vulnerabilidades a fin de alinearlas con tus objetivos estratégicos de seguridad.

Asigna plazos para la corrección de vulnerabilidades a fin de garantizar el cumplimiento y mejorar la rendición de cuentas del equipo. Esto te permite:

- **Alineación con los marcos de cumplimiento**: Define automáticamente fechas de vencimiento que se ajusten a normativas del sector como FedRAMP o PCI.
- **Mejora de la rendición de cuentas**: Utiliza los SLOs de seguridad para responsabilizar a los equipos de la corrección oportuna de las vulnerabilidades, reduciendo la carga administrativa de los seguimientos y los checks de estado.
- **Simplificación de la gestión proactiva de riesgos**: Incentiva la toma de acciones rápidas con respecto a las vulnerabilidades para mitigar el riesgo de explotación, aprovechando los SLOs como herramienta estratégica para priorizar y agilizar las tareas de seguridad.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}