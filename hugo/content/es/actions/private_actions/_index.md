---
aliases:
- /es/service_management/workflows/private_actions/
- /es/service_management/app_builder/private_actions/
description: Ejecute acciones contra servicios en su red privada desde productos de
  Datadog, utilizando un ejecutor de acciones privado como capa de ejecución y autorización
  para acciones locales.
disable_toc: false
further_reading:
- link: actions/private_actions/set_up_agent_based
  tag: Documentación
  text: Configure un ejecutor de acciones privado
- link: actions/private_actions/enroll_runner
  tag: Documentación
  text: Inscripción y propiedad
- link: /actions/private_actions/authorize_private_actions/
  tag: Documentación
  text: Autorizar Private Actions
title: Private Actions
---
## Descripción general {#overview}

Private Actions le permiten ejecutar acciones contra servicios en su red privada, como clústeres de Kubernetes, hosts internos, bases de datos y API internas, sin exponer esos servicios a la internet pública. Usted las ejecuta a través de un ejecutor de acciones privado que despliega en su entorno, ya sea dentro del Datadog Agent (recomendado) o como un ejecutor independiente. Los productos de Datadog que utilizan Private Actions incluyen Workflow Automation, App Builder, Datadog MCP y Bits AI investigations.

Private Actions dependen de dos capas:

- [**El ejecutor de acciones privado**](#private-action-runner) ejecuta las acciones. Se ejecuta en su red, recibe tareas de acción de Datadog, ejecuta cada tarea contra el servicio de destino y devuelve el resultado a Datadog.
- [**La capa de autorización**](#authorization-models) se gestiona en Datadog. Define qué usuarios y productos pueden ejecutar qué acciones en qué ejecutores, y concede o deniega cada acción antes de que llegue a un ejecutor. Las acciones que un ejecutor tiene permitido realizar también están restringidas en el lado del Datadog Agent, mediante la lista de permitidos de acciones en la configuración del Datadog Agent (`datadog.yaml`).

## Ejecutor de acciones privado {#private-action-runner}

El ejecutor de acciones privado es el componente que usted despliega en su entorno para ejecutar Private Actions. Abre una conexión saliente hacia Datadog, sondea para obtener tareas de acción, ejecuta cada tarea contra el servicio de destino y devuelve el resultado.

El ejecutor de acciones privado está disponible en dos formas: un ejecutor independiente que usted despliega y gestiona por su cuenta, o un ejecutor integrado en el Datadog Agent.

| | Ejecutor en el Datadog Agent | Ejecutor independiente |
|---|---|---|
| **Qué es** | Un componente del Datadog Agent, que se activa con un solo indicador de configuración. | Un contenedor dedicado que puede instalar y administrar independientemente del Datadog Agent. |
| **Ideal cuando** | Ya ejecuta el Datadog Agent y desea administrar el ejecutor a través del ciclo de vida del Datadog Agent. | Necesita una integración que aún no está disponible en el Datadog Agent. |
| **Estado** | Recomendado para nuevas implementaciones. | Soportado (modo de mantenimiento). |

<div class="alert alert-tip">Datadog recomienda ejecutar el ejecutor de acciones privadas en el Datadog Agent</div>

Para conocer los pasos de instalación, consulte [Set up a private action runner in the Datadog Agent][1] o [Set up a standalone runner][2].

## Modelos de autorización {#authorization-models}

Datadog ofrece dos modelos de autorización. El modelo que utiliza un ejecutor se establece cuando se inscribe el ejecutor y depende de la propiedad del mismo. Para obtener más información, consulte [Enrollment and ownership][3].

- **Las políticas de ejecución** se aplican a los ejecutores en el Datadog Agent y están diseñadas para administrar el acceso a escala. En lugar de crear una conexión independiente para cada integración en cada ejecutor, usted utiliza etiquetas del Datadog Agent para dirigirse a uno o más conjuntos de ejecutores. Las políticas de ejecución también le brindan un control detallado: puede permitir o denegar acciones específicas o conjuntos de acciones, y aplicar alcances específicos de la integración, como los espacios de nombres de Kubernetes de destino para una acción de Kubernetes.
- **Las conexiones** están disponibles tanto para el ejecutor en el Datadog Agent como para el ejecutor independiente. Se pueden adjuntar a un máximo de un solo ejecutor. Una conexión puede almacenar credenciales para un servicio.

Para comparar los dos modelos y decidir cuál se aplica a su ejecutor, consulte [Authorize private actions][4].

## Próximos pasos {#next-steps}

- **¿Es nuevo en Private Actions?**: Siga [Getting started with private actions][7] para implementar un ejecutor y ejecutar su primera acción.
- **Tiene un ejecutor en el Datadog Agent y desea control de acceso para toda la flota**: autorícelo con [Execution Policies][5].
- **Tiene un ejecutor en el Datadog Agent o un ejecutor independiente y desea autorizar un solo ejecutor**: autorícelo con [Connections][6].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/private_actions/set_up_agent_based/
[2]: /es/actions/private_actions/set_up_standalone/
[3]: /es/actions/private_actions/enroll_runner/
[4]: /es/actions/private_actions/authorize_private_actions/
[5]: /es/actions/private_actions/execution_policies/
[6]: /es/actions/connections/
[7]: /es/actions/private_actions/getting_started/