---
aliases:
- /es/service_management/case_management/automation_rules/
- /es/incident_response/case_management/automation_rules/
further_reading:
- link: /incident_response/work_management
  tag: Documentación
  text: Obtenga más información sobre la Gestión de trabajo
title: Reglas de automatización de elementos de trabajo
---
## Descripción general {#overview}

Las reglas de automatización de elementos de trabajo agilizan su flujo de trabajo de gestión de incidentes al activar automáticamente acciones cuando se cumplen condiciones específicas, lo que permite a Teams estandarizar sus procesos de respuesta.

Puede definir acciones automatizadas basadas en cuatro activadores clave:
- **Creación de elementos de trabajo** - Asigne automáticamente nuevos elementos de trabajo a los miembros de Teams de guardia
- **Cambios de estado** - Active acciones de seguimiento cuando los elementos de trabajo se muevan entre estados
- **Cambios de atributos** - Responda al instante cuando se modifiquen propiedades de elementos de trabajo como la prioridad
- **Aprobaciones de elementos de trabajo** - Active flujos de trabajo cuando los elementos de trabajo reciban aprobaciones o rechazos

Estas capacidades ofrecen tiempos de respuesta más rápidos mientras reducen el esfuerzo manual. Teams pueden enfocarse en la resolución de problemas en lugar de en la gestión de elementos de trabajo, asegurando un manejo consistente de los elementos de trabajo con total transparencia de auditoría para el cumplimiento y la visibilidad.

## Configuración de reglas de automatización {#configuring-automation-rules}

Para configurar reglas de automatización:
1. Navegue a **[Work Management > Settings][1]**.
1. Seleccione el proyecto para el cual desea crear reglas de automatización.
1. Seleccione **Automation**.
1. Haga clic en **New Rule**.

Agregue lo siguiente a su configuración:

1. **Defina un activador** - Elija cuándo debe ejecutarse una regla de automatización:
    1. Al crear un elemento de trabajo
    1. Cuando cambia el estado de un elemento de trabajo
    1. Cuando se agrega o elimina un atributo de elemento de trabajo
    1. Cuando un elemento de trabajo recibe una aprobación o un rechazo
1. **Seleccione un flujo de trabajo** - Use [Workflow Automation][2] para automatizar acciones como:
    1. Asignar el elemento de trabajo a un miembro de Teams
    1. Agregar comentarios
    1. Cerrar un elemento de trabajo resuelto
1. **Habilite y nombre su regla** - Establezca un nombre descriptivo para la regla y elija habilitarla o deshabilitarla.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work/settings
[2]: /es/actions/workflows/