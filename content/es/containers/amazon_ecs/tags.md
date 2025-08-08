---
aliases:
- /es/agent/amazon_ecs/tags
further_reading:
- link: /getting_started/tagging/
  tag: Documentación
  text: Empezando con las etiquetas
- link: /getting_started/tagging/using_tags/
  tag: Documentación
  text: Uso de etiquetas con Datadog
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limitar la recopilación de datos a un subconjunto de contenedores
title: Extracción de etiquetas (tags) de Amazon ECS
---

## Información general

El Datadog Agent puede crear y asignar etiquetas a todas las métricas, trazas (traces) y logs emitidos por un contenedor en base a sus etiquetas o variables de entorno.

## Etiquetas predefinidas

El Agent puede detectar automáticamente y adjuntar etiquetas a todos los datos emitidos por la tarea completa o por un contenedor individual dentro de esta tarea. La lista de etiquetas que se adjunta automáticamente depende de la [configuración de la cardinalidad][1] del Agent.

<div style="overflow-x: auto;">

  | Etiqueta                  | Cardinalidad          | Origen               |
  |---------------------------------------|----------------------------------|---------------------------------|
  | `container_name`             | Alta             | Docker                |
  | `container_id`                | Alta             | Docker                |
  | `docker_image`               | Baja            | Docker                |
  | `image_name`                | Baja            | Docker                |
  | `short_image`                | Baja             | Docker                |
  | `image_tag`                  | Baja             | Docker               |
  | `ecs_cluster_name`            | Baja            | API ECS              |
  | `ecs_container_name`         | Baja             | API ECS              |
  | `task_arn`                    | Orchestrator    | API ECS              |
  | `task_family`                 | Baja             | API ECS              |
  | `task_name`                  | Baja             | API ECS              |
  | `task_version`                | Baja             | API ECS              |

</div>

## Etiquetado de servicios unificado

Como práctica recomendada para entornos contenedorizados, Datadog recomienda utilizar el etiquetado unificado de servicios al asignar etiquetas. El etiquetado unificado de servicios une la telemetría de Datadog mediante el uso de tres etiquetas estándar: `env`, `service` y `version`. Para saber cómo configurar tu entorno con el etiquetado unificado, consulta la [documentación del etiquetado unificado de servicios de Amazon ECS][2].

## Recopilación de etiquetas de recursos

Si no tienes el etiquetado unificado de servicios habilitado, completa los siguientes pasos para recopilar etiquetas de recursos ECS:

1. Comprueba que tus [instancias de contenedor de Amazon ECS][3] están asociadas a un rol IAM. Esto se puede hacer al crear un nuevo clúster con el asistente de creación de clústeres ECS o en la configuración de lanzamiento utilizada por un grupo de escalado automático.
2. Actualiza el rol IAM utilizado por tus [instancias de contenedor de Amazon ECS][3] con: `ecs:ListTagsForResource`.
3. Actualiza tu archivo [datadog-agent-ecs.json][4] ([datadog-agent-ecs1.json][5], si estás utilizando una AMI original Amazon Linux), para habilitar la recopilación de etiquetas de recursos añadiendo la siguiente variable de entorno:

    {{< code-block lang="json" >}}
    {
      "name": "DD_ECS_COLLECT_RESOURCE_TAGS_EC2",
      "value": "true"
    }
    {{< /code-block >}}

### Notas

- Asegúrate de que el rol IAM está asociado a tus [instancias de contenedor de Amazon ECS][3] y no al rol de la tarea del contenedor del Datadog Agent.
- Las etiquetas de recursos ECS se pueden recopilar de instancias EC2, pero no de AWS Fargate.
- Esta función requiere las versiones 6.17, 7.17 o posteriores del Datadog Agent.
- El Agent admite la recopilación de etiquetas ECS de los recursos ECS `tasks`, `services` y `container instances`.
- Si no aparecen etiquetas AWS en Datadog, asegúrate de que estas se aplican tanto a la instancia como al recurso en la nube AWS correspondiente.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/assigning_tags/?tab=containerizedenvironments#environment-variables
[2]: /es/getting_started/tagging/unified_service_tagging/?tab=ecs#containerized-environment
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_instances.html
[4]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs.json
[5]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs1.json