---
algolia:
  tags:
  - automation pipelines
  - findings automation
  - findings pipelines
  - finding automation
aliases:
- /es/security/vulnerability_pipeline
further_reading:
- link: /security/automation_pipelines/modify_severity
  tag: Documentación
  text: Reglas de modificador de gravedad
- link: /security/automation_pipelines/mute
  tag: Documentación
  text: Silenciar reglas
- link: /security/automation_pipelines/set_due_date
  tag: Documentación
  text: Establecer reglas de fecha de vencimiento
- link: /security/automation_pipelines/security_inbox
  tag: Documentación
  text: Agregar a las reglas de Security Inbox
- link: /security/automation_pipelines/create_ticket
  tag: Documentación
  text: Reglas de creación de tickets
- link: https://www.datadoghq.com/blog/datadog-iac-security/
  tag: Blog
  text: Evite que las configuraciones erróneas de la nube lleguen a producción con
    Datadog IaC Security
title: Pipelines de automatización de hallazgos
---
Automation Pipelines le permite configurar reglas automatizadas para hallazgos recién descubiertos, acelerando así los esfuerzos de triaje y remediación a escala.

## Disponibilidad {#availability}

Automation Pipelines está disponible para:

- Vulnerabilidades de código en tiempo de ejecución
- Vulnerabilidades de código estático
- Vulnerabilidades de biblioteca
- Secretos
- Infraestructura como código
- Vulnerabilidades de imagen de contenedor
- Vulnerabilidades de servidor
- Configuraciones incorrectas
- Rutas de ataque
- Riesgos de identidad
- Seguridad de API
- Actividad de carga de trabajo

## Cómo funciona {#how-it-works}

Automation Pipelines funciona a través de un sistema basado en reglas que le permite automatizar cómo se gestionan los nuevos hallazgos. Así es como funciona:

- **Configuración de reglas**: Cada regla consta de múltiples criterios, diseñados para filtrar hallazgos basados en atributos específicos. Dentro de una regla, la combinación de estos criterios opera como un AND lógico; sin embargo, si algún criterio incluye múltiples valores, esos valores operan como un OR lógico. Esta estructura le brinda la flexibilidad para crear reglas que se ajusten precisamente a sus necesidades.
- **Coincidencia de reglas**: Automation Pipelines evalúa los hallazgos frente a sus reglas en el orden en que los ha enumerado. A medida que se procesa cada hallazgo, Automation Pipelines recorre la lista hasta encontrar una regla coincidente, momento en el cual se activa la acción especificada, como silenciar problemas no urgentes o resaltar amenazas críticas. Las reglas de Automation Pipelines se aplican inmediatamente a los nuevos hallazgos. Para los hallazgos existentes, las actualizaciones pueden tardar hasta dos horas.

## Casos de uso {#use-cases}

### Ajuste la gravedad de los hallazgos para reflejar el contexto de su negocio {#adjust-finding-severities-to-reflect-your-business-context}

Anule la gravedad predeterminada de los hallazgos para que coincida con el perfil de riesgo de su organización. Esto le permite:

- **Reduzca la gravedad de los hallazgos de bajo riesgo**: Disminuya la gravedad de los hallazgos en entornos aislados, los cuales representan un riesgo limitado en el mundo real.
- **Mejore los objetivos de alto valor**: Aumente la gravedad de los hallazgos en sistemas críticos, como bases de datos que contienen información de identificación personal o servicios con requisitos de cumplimiento elevados.
- **Calibre la gravedad según las prioridades de su organización**: Establezca estándares de gravedad consistentes para reflejar las prioridades de su organización, en lugar de depender únicamente de la puntuación predeterminada.

### Silencie los hallazgos no urgentes para concentrarse en lo que importa {#mute-non-urgent-findings-to-focus-on-what-matters}

Reduzca la fatiga por alertas y priorice las amenazas críticas silenciando automáticamente los hallazgos no urgentes. Esto le permite:

- **Ignore automáticamente los problemas de baja prioridad**: Suprima los falsos positivos conocidos, los riesgos aceptados y otros hallazgos que no requieran una acción inmediata. No se necesita una revisión manual.
- **Priorice las amenazas reales**: Mantenga su atención en las alertas de alto impacto que requieren investigación y remediación.
- **Despeje su flujo de alertas**: Elimine el ruido de falsos positivos, recursos no críticos, entornos de prueba o ensayo, y recursos de corta duración que activan alertas pero no representan un riesgo a largo plazo.

### Establezca fechas de vencimiento para los hallazgos a fin de alinearlos con sus SLA de seguridad {#set-due-dates-for-findings-to-align-with-your-security-slas}

Asigne plazos de remediación a los hallazgos para mejorar la responsabilidad y cumplir con sus políticas de seguridad. Esto le permite:

- **Manténgase conforme por diseño**: Aplique automáticamente fechas de vencimiento que se alineen con los estándares de la industria, como FedRAMP, PCI y otros.
- **Impulse la responsabilidad en todos los equipos**: Utilice los SLA para garantizar una remediación oportuna sin seguimientos constantes, brindando a seguridad e ingeniería expectativas claras.
- **Promueva la gestión proactiva de riesgos**: Fomente tiempos de respuesta más rápidos y reduzca la exposición mediante el uso de SLA para priorizar y realizar un seguimiento de los esfuerzos de remediación.

### Personalice el Security Inbox para resaltar lo que es importante para su organización {#customize-the-security-inbox-to-highlight-whats-important-to-your-organization}

Datadog proporciona un conjunto de reglas de inbox predeterminadas que completan el Security Inbox. Usted puede revisar esas reglas, deshabilitar las que no se ajusten a su organización y agregar sus propias reglas que definan qué hallazgos se resaltan. Esto le permite:

- **Vuelva a mostrar hallazgos no capturados de forma predeterminada**: Utilice reglas personalizadas para resaltar los hallazgos que las reglas predeterminadas no detectan, para asegurarse de que no se pasen por alto los hallazgos críticos.
- **Fortalezca el cumplimiento y aborde las preocupaciones clave del sistema**: Aborde las preocupaciones que afectan el cumplimiento normativo o los sistemas comerciales importantes, independientemente de su gravedad.
- **Priorice los riesgos actuales**: Enfóquese en las amenazas inmediatas, como los riesgos de identidad después de un incidente o los hallazgos de toda la industria.

### Cree tickets automáticamente para dirigir los hallazgos a los flujos de trabajo de ingeniería {#automatically-create-tickets-to-route-findings-into-engineering-workflows}

Dirija los hallazgos de seguridad directamente a Jira o a Case Management tan pronto como se descubran. Esto le permite:

- **Elimine el triaje manual**: Genere tickets automáticamente para los hallazgos que cumplan con sus criterios, eliminando la necesidad de que los equipos de seguridad creen tickets manualmente.
- **Integre con los flujos de trabajo de ingeniería existentes**: Reúnase con los equipos de ingeniería donde ya trabajan dirigiendo el trabajo de seguridad hacia las mismas herramientas que utilizan para otras tareas.
- **Reduzca el tiempo de remediación**: Ingrese los hallazgos en las colas de ingeniería inmediatamente después de la detección, eliminando el retraso entre el descubrimiento y la asignación.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}