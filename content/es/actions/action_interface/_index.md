---
title: Interfaz de acciones
---

{{< callout url="https://www.datadoghq.com/product-preview/action-interface/" btn_hidden="false" header="Únete a la vista previa" >}}
La interfaz de acciones está en vista previa.     Haz clic en <b>Solicitar acceso</b> y completa la solicitud del programa de vista previa del producto de Datadog.
{{< /callout >}}

La interfaz de acciones es una interfaz de chat AI en la que puedes configurar y ejecutar acciones desde el [Action Catalog][1] utilizando indicaciones. Por ejemplo, `I want to update an ECS service to scale capacity` o `I want to create a service to run tasks`. 

{{< img src="/service_management/action_interface/action_interface_landing.png" alt="Página de inicio de la interfaz de acciones" style="width:100%;" >}}

La interfaz de acciones te guía a través de los pasos necesarios y solicita cualquier dato adicional, como los detalles de autenticación a través de [Conexiones][2], antes de confirmar y ejecutar la acción. Los usuarios reciben en tiempo real el estado de estas ejecuciones, incluidas notificaciones de finalización, próximos pasos y errores. Todo el proceso se gestiona a través de una conversación intuitiva. 

## Interfaz de acciones en el paquete de Acciones

Mientras que App Builder proporciona aplicaciones de autoservicio y Workflow Automation construye procesos integrales, la interfaz de acciones elimina la necesidad de navegar por la interfaz de usuario o las orquestaciones de estos productos para ejecutar acciones. La interfaz de acciones está diseñada para interactuar rápidamente con tus datos y sistemas, y es accesible para todos los usuarios.

## La interfaz de acciones utiliza Bits AI

Bits AI es un agente de IA para toda la plataforma de Datadog que te ayuda a interactuar con tus aplicaciones e infraestructura. Puedes consultar Bits AI en la aplicación web de Datadog, la aplicación móvil de Datadog y en Slack.

La interfaz de acciones utiliza Bits AI para responder a tus indicaciones e interactuar con las acciones.

Para más información, consulta [Bits AI][3].

## La interfaz de acciones no tiene estado

- Los chats de la interfaz de acciones no se guardan.
- Las acciones activadas por la interfaz de acciones se ejecutan una vez y no se guardan, pero las acciones se registran en Datadog [Audit Trail][4]. 

## Requisitos previos

Las acciones que se ejecutan en la interfaz de acciones requieren [credenciales de acción][5] estándar, ya sea a través de [Cuadros de integración][7] o [Conexiones][2]:

- Algunas acciones que se ejecutan en la interfaz de acciones requieren tanto una conexión como [Credenciales de conexión][6]. 
  - Las conexiones garantizan que un usuario no pueda activar un acción a menos que tenga acceso a una conexión con las credenciales necesarias.
- Otras acciones se configuran mediante cuadros de integración (por ejemplo, PagerDuty).
  - Los cuadros de integración están configurados con los roles y permisos apropiados en tu organización de Datadog.

## Ejemplo de la interfaz de acciones

Puedes realizar una acción utilizando la interfaz de acciones. Veamos un ejemplo en el que se comprueba el estado de un clúster de ECS.

1. Ve a la [Interfaz de acciones][8].  
  {{< img src="/service_management/action_interface/action_interface_landing.png" alt="Página de inicio de la Interfaz de acciones" >}}
2. Ingresa la indicación, `List ECS clusters`, y pulsa **Enter** (Intro).
  Bits AI responde a una solicitud de la región de AWS.
3. Introduce una región.
    Bits AI responde con algo como `Here's a Datadog acción to address your request. Review and click 'Execute acción' to proceed.`
4. Haz clic en la acción **List ECS cluster** (Enumerar clúster de ECS).
5. En la acción, en **Connection** (Conexión), selecciona la conexión a la cuenta de AWS que desees utilizar. Las conexiones se establecen en [Action Catalog][1].
  Bits AI seguirá utilizando la misma conexión mientras dure la sesión de chat.
1. En **Region** (Región), selecciona la región de AWS en la que están alojados los clústeres.
2. En **Limit** (Límite), introduce `5`.
3. Haz clic en **Run** (Ejecutar).
  Bits AI ejecuta la acción. En este ejemplo, responde con una lista de nombres de clientes y ARNs.

  Bits AI también sugiere indicaciones adicionales relacionadas con los clústeres que ha recuperado.

## Solucionar problemas

Puedes confiar en que la interfaz de acciones te informará si tu acción no está configurada correctamente o si tus entradas superan los [límites de acción][9].

[1]: /es/actions/actions_catalog/
[2]: /es/actions/connections/?tab=workflowautomation
[3]: /es/bits_ai/
[4]: /es/account_management/audit_trail/
[5]: /es/actions/workflows/access/#action-credentials
[6]: /es/actions/connections/#connection-credentials
[7]: /es/getting_started/integrations/#permissions
[8]: https://app.datadoghq.com/actions/ai
[9]: /es/actions/workflows/limits/