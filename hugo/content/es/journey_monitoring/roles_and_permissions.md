---
description: Revise los roles, permisos y políticas de restricción que controlan el
  acceso a los recorridos y sus activos vinculados.
further_reading:
- link: /journey_monitoring/
  tag: Documentación
  text: Obtenga información sobre Journey Monitoring
- link: /journey_monitoring/guide/configuring_journeys/
  tag: Documentación
  text: Configure recorridos en Datadog Journey Monitoring
- link: /account_management/rbac/permissions/
  tag: Documentación
  text: Revise la lista completa de permisos de roles de Datadog
title: Roles y Permisos
---
## Descripción general {#overview}

Un recorrido conecta activos de Product Analytics, RUM y Synthetic Monitoring. La mayoría de las acciones requieren tanto un permiso de Journey Monitoring como el permiso para el activo subyacente que afecta la acción.

## Crear y editar recorridos {#create-and-edit-journeys}

| Acción | Acceso requerido |
|--------|-----------------|
| Crear o editar un recorrido | [Journey Monitoring write][perms] |
| Crear el conjunto de pruebas Synthetic de un recorrido | [Journey Monitoring write][perms] y Synthetic Monitoring write |
| Agregar o editar el monitor de tasa de conversión | [Journey Monitoring write][perms] y monitor write |
| Agregar o editar el SLO del recorrido | [Journey Monitoring write][perms] y SLO write |
| Editar operaciones de RUM fuertemente vinculadas | [Journey Monitoring write][perms] y RUM write |

La creación de activos es de mejor esfuerzo: crear un recorrido tiene éxito solo con acceso [Journey Monitoring write][perms]. Datadog crea un activo vinculado, como el conjunto de pruebas, solo cuando usted también tiene el permiso para dicho activo. De lo contrario, Datadog lo omite y usted puede agregarlo más tarde. Un recorrido sin un conjunto de pruebas es un estado válido.

## Visualizar recorridos y activos vinculados {#view-journeys-and-linked-assets}

| Acción | Acceso requerido |
|--------|-----------------|
| Visualizar un recorrido y sus detalles | [Journey Monitoring read][perms] y lea el RUM en la aplicación de RUM de recorrido |
| Visualizar un conjunto de pruebas, sus pruebas y el SLO de tiempo de actividad | [Synthetic Monitoring read] y una política de restricción de lectura en el conjunto de pruebas |
| Visualizar operaciones de RUM fuertemente vinculadas | [Journey Monitoring read][perms] and RUM read |
| Visualizar el SLO de una operación | SLO read |
| Visualizar reproducciones de sesiones de recorrido | RUM read, sujeto a los controles de acceso a datos de RUM |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[perms]: /account_management/rbac/permissions/#digital-experience-monitoring