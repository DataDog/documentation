---
description: Aprenda cómo Datadog autoriza Private Actions mediante Políticas de ejecución
  y Conexiones.
disable_toc: false
further_reading:
- link: actions/private_actions/
  tag: Documentación
  text: Descripción general de Private Actions
- link: actions/private_actions/enroll_runner/
  tag: Documentación
  text: Inscripción y propiedad
- link: actions/private_actions/set_up_agent_based/
  tag: Documentación
  text: Configurar un ejecutor de Private Actions
- link: actions/private_actions/execution_policies/
  tag: Documentación
  text: Políticas de ejecución
- link: actions/connections/
  tag: Documentación
  text: Conexiones
title: Autorizar Private Actions
---
## Descripción general {#overview}

Cuando sus flujos de trabajo y aplicaciones utilizan Private Actions, Datadog decide si la acción está permitida y, luego, su **runner de Private Actions** la ejecuta. Antes de que se envíe una tarea a un ejecutor, Datadog verifica si el usuario que realiza la solicitud tiene permiso para actuar en ese ejecutor. Si no está permitida, la tarea nunca se envía.

Esta página explica cómo se toma esa decisión de autorización. Cubre los modelos que Datadog utiliza para permitir o denegar una acción, y qué modelo se aplica a su ejecutor.

## Encuentre su modelo de autorización {#find-your-authorization-model}

Un runner se autoriza mediante uno de dos modelos: [**Políticas de ejecución**](#execution-policies) o [**Conexiones**](#connections). El modelo está determinado por la propiedad del runner, establecida una vez cuando el runner se inscribe. Un runner determinado utiliza exactamente uno de estos modelos durante toda su vida útil; no puede combinar ambos en el mismo runner. Debido a que la propiedad se establece por runner, una sola flota basada en el Agent puede incluir runners sin propietario y con propietario, cada uno autorizado por su propio modelo.

- **El runner en el Datadog Agent** depende de cómo se inscribió. Un runner de Agent sin propietario utiliza [Políticas de ejecución](#execution-policies); un runner de Agent con propietario utiliza [Conexiones](#connections).
- **El runner independiente** siempre tiene propietario, por lo que siempre utiliza [Conexiones](#connections).

Para saber cómo la inscripción establece la propiedad de un runner, consulte [Inscripción y propiedad][1].

## Compare los dos modelos {#compare-the-two-models}

|   | Políticas de ejecución | Conexiones |
|---|---|---|
| **Funciona con** | Runners solo en el Datadog Agent | Tanto runners independientes como runners en el Datadog Agent |
| **Cómo se otorga el acceso** | Las Agent tags apuntan a uno o más conjuntos de runners, por lo que una política gestiona el acceso a través de una flota en lugar de una conexión separada por integración por runner | Una conexión almacena credenciales y las empareja con un solo runner |
| **Credenciales** | Las políticas de ejecución no almacenan credenciales; el acceso se otorga mediante etiquetas de agente. Las acciones que requieren credenciales (por ejemplo, HTTP, GitLab y MongoDB) no son compatibles. | La conexión contiene las credenciales utilizadas para ejecutar la acción |
| **Control** | Detallado: permite o deniega acciones específicas o conjuntos de acciones, además de alcances específicos de la integración, como los espacios de nombres de Kubernetes de destino para una acción de Kubernetes | Por runner: una conexión apunta a un runner específico |

## Políticas de ejecución {#execution-policies}

**Las políticas de ejecución** son un modelo de autorización para runners en el Datadog Agent. Cada política gestiona el acceso a través de uno o más conjuntos de runners a la vez. En lugar de una conexión independiente por integración por runner, usted utiliza **Agent tags** para definir los Agent de destino. Luego, les adjunta una regla de permitir o denegar.

Las políticas de ejecución también proporcionan un control detallado. Una política puede permitir o denegar acciones específicas o conjuntos de acciones. También puede aplicar alcances específicos de la integración, como los espacios de nombres de Kubernetes de destino para una acción de Kubernetes. El acceso se otorga a través de Agent tags en lugar de credenciales almacenadas, por lo que las políticas de ejecución no almacenan credenciales y son utilizadas por runners sin propietario en el Agent.

Para obtener más información sobre las políticas de ejecución y cómo configurarlas (objetivos, reglas, control de acceso y uso de políticas de ejecución en flujos de trabajo), consulte [Políticas de ejecución][2].

## Conexiones {#connections}

Las conexiones funcionan tanto para runners independientes como para runners en el Datadog Agent, y son el modelo utilizado por runners propios.

Una conexión hace dos cosas:

- **Hace referencia a las credenciales** necesarias para ejecutar una acción en su servicio. Las credenciales en sí (por ejemplo, un token de API o un nombre de usuario y contraseña) se almacenan localmente con el runner, en un archivo de credenciales en su servidor o contenedor; la conexión apunta a ellas.
- **Empareja esas credenciales con un único runner.** Una conexión apunta a un runner, por lo que las credenciales solo son utilizadas por el runner que usted pretende.

Para usar una conexión en un flujo de trabajo o aplicación, necesita el permiso adecuado para esa conexión. El acceso a una conexión puede restringirse para que solo las personas que la necesiten puedan usarla en sus flujos de trabajo y aplicaciones.

Para obtener las instrucciones de configuración completas (creación, edición y restricción de conexiones, etiquetas de identificador de conexión y grupos de conexión), consulte [Conexiones][3].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/private_actions/enroll_runner/
[2]: /es/actions/private_actions/execution_policies/
[3]: /es/actions/connections/