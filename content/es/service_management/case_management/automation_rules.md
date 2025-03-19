---
further_reading:
- link: /service_management/case_management
  tag: Documentación
  text: Más información sobre la gestión de casos
title: Reglas de automatización de casos
---

## Información general

Con las reglas de automatización de casos, puedes automatizar acciones basadas en reglas predefinidas, reducir el esfuerzo manual, mejorar los tiempos de respuesta y garantizar la coherencia en todos los flujos de trabajo de casos.

## Configuración de reglas de automatización

Para configurar reglas de automatización:
1. Ve a **[Gestión de Casos > Configuración][1]**.
1. Selecciona el proyecto para el que deseas crear reglas de automatización.
1. Selecciona **Automatización**.
1. Haz clic en **New Rule** (Nueva regla).

{{< img src="/service_management/case_management/automation_rules/create_case_automation_rule.png" alt="Captura de pantalla del diálogo de la creación de reglas de automatización en un sistema de gestión de casos. El diálogo incluye pasos para configurar cuándo evaluar la regla, especificar un flujo de trabajo para la coincidencia de reglas, dar un nombre a la regla y configurar su estado." style="width:100%;" >}}

Añade lo siguiente a tu configuración:

1. **Define un activador** - Elige cuándo debe ejecutarse una regla de automatización:
    1. Al crear el caso
    1. Cuando cambia el estado de un caso
    1. Cuando se añade o se elimina un atributo del caso
1. **Selecciona un flujo de trabajo** - Aprovecha la [Automatización del flujo de trabajo][2] para automatizar acciones como las siguientes:
    1. Asignación del caso a un miembro del equipo
    1. Añadir comentarios
    1. Cerrar un caso resuelto
1. **Habilitar y dar un nombra tu regla** - Establece un nombre descriptivo para la regla y elige habilitarla o inhabilitarla.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases/settings
[2]: /es/service_management/workflows/