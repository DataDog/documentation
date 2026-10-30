---
description: Revise los roles, permisos y políticas de restricción que controlan el
  acceso a los recorridos y sus activos vinculados.
further_reading:
- link: /journey_monitoring/
  tag: Documentación
  text: Obtenga información sobre Journey Monitoring
- link: /journey_monitoring/configuring_journeys/
  tag: Documentación
  text: Configure recorridos en Datadog Journey Monitoring
- link: /account_management/rbac/permissions/
  tag: Documentación
  text: Revise la lista completa de permisos de roles de Datadog
title: Roles y permisos de Journey
---
## Descripción general {#overview}

Un recorrido puede incluir activos de [Product Analytics][2], [Real User Monitoring (RUM)][3] y [Synthetic Monitoring & Testing][4]. Para administrar un recorrido o uno de sus activos, necesita los [Journey Monitoring permissions][1] correspondientes y los permisos del producto.

## Crear y editar recorridos {#create-and-edit-journeys}

| Acción | Acceso requerido |
|--------|-----------------|
| Crear o editar un recorrido | Journey Monitoring write |
| Crear el [conjunto de pruebas Synthetic][5] de un recorrido | Journey Monitoring write y Synthetic Monitoring write |
| Vincular o editar [RUM operations][6] | Journey Monitoring write y RUM write |

El acceso Journey Monitoring write es suficiente para crear un recorrido. Datadog crea su conjunto de pruebas Synthetic solo si también tiene acceso Synthetic Monitoring write. De lo contrario, Datadog crea el recorrido sin un conjunto de pruebas. Agregue un conjunto de pruebas más tarde con el acceso requerido.

## Visualizar recorridos y activos vinculados {#view-journeys-and-linked-assets}

| Acción | Acceso requerido |
|--------|-----------------|
| Visualizar un recorrido basado en eventos y sus detalles | Journey Monitoring read y RUM read en la aplicación de RUM del recorrido |
| Visualizar un recorrido solo de Synthetics | Journey Monitoring read |
| Visualizar un conjunto de pruebas, sus pruebas y el [uptime SLO][7] | Synthetic Monitoring read y una política de restricción de lectura en el conjunto de pruebas |
| Visualizar operaciones de RUM vinculadas | Journey Monitoring read y RUM read |
| Visualizar el SLO de una operación | SLO read |
| Visualizar las [Session Replays][8] de un recorrido | RUM read, sujeto a los controles de acceso a datos de RUM |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/#digital-experience-monitoring
[2]: /es/product_analytics/
[3]: /es/real_user_monitoring/
[4]: /es/synthetics/
[5]: /es/synthetics/test_suites/
[6]: /es/real_user_monitoring/operations_monitoring/
[7]: /es/synthetics/test_suites/#service-level-objectives
[8]: /es/session_replay/