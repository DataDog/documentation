---
title: Reasignador
---

## Información general

El procesador de reasignación reasigna cualquier atributo  o etiqueta de origen a otro atributo o etiqueta de destino. Por ejemplo, reasigna `user` por `firstname` para orientar tus logs en el Events Explorer:

{{< img src="logs/procesar/processors/attribute_post_remapping.png" alt="Atributo tras la reasignación" style="width:60%;">}}

No se permiten restricciones adicionales, como `:` o `,`, en el nombre del atributo o etiqueta de destino.

Si el objetivo del reasignador es un atributo, el reasignador también puede intentar convertir el valor a un nuevo tipo (`String`, `Integer` o `Double`). Si la conversión no es posible, se conserva el tipo original.

**Nota**: El separador decimal para `Double` debe ser `.`.


Define el procesador del reasignador en la [página de **Pipelines**][1]. Por ejemplo, reasigna `user` a `user.firstname`.

{{< img src="logs/log_configuration/processor/remapper.png" alt="Procesador del reasignador de atributos" style="width:80%;" >}}

[1]: https://app.datadoghq.com/event/settings/pipelines