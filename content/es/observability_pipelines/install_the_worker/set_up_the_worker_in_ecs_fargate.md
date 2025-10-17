---
disable_toc: false
title: Configurar el Worker en ECS Fargate
---

## Información general

Este documento muestra una de las formas de configurar el Observability Pipelines Worker en ECS Fargate.

## Configuración

La configuración de este ejemplo consiste en una tarea Fargate, un servicio Fargate y un balanceador de carga.

{{< img src="observability_pipelines/worker_fargate_architecture.png" alt="Diagrama de arquitectura con logs que se dirigen al balanceador de carga de una aplicación, a una tarea del PO Worker y al servicio Fargate" style="width:100%;" >}}

## Configurar la definición de la tarea

[Crea una definición de tarea][1]. La definición de la tarea describe qué contenedores ejecutar, la configuración (como las variables de entorno y los puertos) y los recursos de CPU y de memoria asignados a la tarea.

Las tareas deben desplegarse como una réplica con el escalado automático activado, donde el número mínimo de contenedores debería basarse en tu volumen de logs y el número máximo de contenedores debería ser capaz de absorber cualquier pico o aumento en el volumen de logs. Consulta [Prácticas recomendadas para el escalado de Observability Pipelines][5] para ayudarte a determinar cuántos recursos de CPU y de memoria asignar.

**Notas**:
- La guía para la asignación de CPU y de memoria no es para una única instancia de la tarea, sino para el número total de tareas. Por ejemplo, si quieres enviar 3 TB de logs al Worker, podrías desplegar tres réplicas con una vCPU cada una o desplegar una réplica con tres vCPU.
- Datadog recomienda habilitar balanceadores de carga para el conjunto de tareas de replicación.

Configura la variable de entorno `DD_OP_SOURCE_*` en función de la configuración del pipeline y las asignaciones de puertos. `DD_OP_API_ENABLED` y `DD_OP_API_ADDRESS` permiten al balanceador de carga realizar checks de estado del Observability Pipelines Worker.

Un ejemplo de definición de tarea:

```json
{
  "family": "my-opw",
  "containerDefinitions": [
    {
      "name": "my-opw",
      "image": "datadog/observability-pipelines-worker",
      "cpu": 0,
      "portMappings": [
        {
          "name": "my-opw-80-tcp",
          "containerPort": 80,
          "hostPort": 80,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "command": [
        "run"
      ],
      "environment": [
        {
          "name": "DD_OP_API_ENABLED",
          "value": "true"
        },
        {
          "name": "DD_API_KEY",
          "value": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        },
        {
          "name": "DD_SITE",
          "value": "datadoghq.com"
        },
        {
          "name": "DD_OP_API_ADDRESS",
          "value": "0.0.0.0:8181"
        },
        {
          "name": "DD_OP_SOURCE_HTTP_SERVER_ADDRESS",
          "value": "0.0.0.0:80"
        },
        {
          "name": "DD_OP_PIPELINE_ID",
          "value": "xxxxxxx-xxxx-xxxx-xxxx-xxxx"
        }
      ],
      "mountPoints": [],
      "volumesFrom": [],
      "systemControls": []
    }
  ],
  "tags": [
    {
      "key": "PrincipalId",
      "value": "AROAYYB64AB3JW3TEST"
    },
    {
      "key": "User",
      "value": "username@test.com"
    }
  ],
  "executionRoleArn": "arn:aws:iam::60142xxxxxx:role/ecsTaskExecutionRole",
  "networkMode": "awsvpc",
  "volumes": [],
  "placementConstraints": [],
  "requiresCompatibilities": [
    "FARGATE"
  ],
  "cpu": "xxx",
  "memory": "xxx"
}
```

## Configurar el servicio ECS

[Crea un servicio ECS][2]. La configuración del servicio define el número de réplicas del Worker a ejecutar y la política de escalado. En este ejemplo, la política de escalado se define para buscar un uso medio de CPU del 70% con un mínimo de dos réplicas y un máximo de cinco réplicas.

## Configurar el balanceo de carga

Dependiendo de tu caso de uso, configura un [balanceador de carga para aplicaciones][3] o un [balanceador de carga para redes][4] para que apunte al grupo de tareas de Fargate que definiste anteriormente. Configura el check de estado con el puerto de la API de Observability Pipelines configurado en la definición de la tarea.

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-task-definition.html
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-service-console-v2.html
[3]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-application-load-balancer.html
[4]: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/create-network-load-balancer.html
[5]: /es/observability_pipelines/best_practices_for_scaling_observability_pipelines/