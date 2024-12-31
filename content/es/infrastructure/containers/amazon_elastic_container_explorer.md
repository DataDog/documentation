---
title: Explorador de Amazon Elastic Container (ECS)
---

{{< img src="infrastructure/livecontainers/orch_ecs_ex.png" alt="Explorador de ECS que muestra tareas de ECS." style="width:80%;">}}

## Información general

El Datadog Agent y la integración de Datadog con Amazon ECS pueden recuperar recursos de ECS para el [explorador de ECS][1]. Esta función te permite monitorizar el estado de las tareas de EC2 y Fargate, los servicios y otros componentes de ECS en todas tus cuentas de AWS. Puedes ver las especificaciones de recursos de las tareas en un servicio y correlacionarlas con logs, métricas, perfiles relacionados y más.

### {{< learning-center-callout header="Join an enablement webinar session" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/session/synthetics/">}}
  Explore y regístrese en las sesiones de Foundation Enablement. Descubra cómo Datadog Sintético Monitorización es una solución proactiva Monitorización que le permite crear pruebas de API, navegador y móvil sin código para simular automáticamente los flujos y las solicitudes de los usuarios a sus aplicaciones, puntos finales clave y capas red.
{{< /learning-center-callout >}}

* **[Recopilación de recursos de AWS][10]**: requerido para recopilar recursos de ECS.
* **[Integración de EC2 en ECS][2]**: requerido para monitorizar clústeres que usan el tipo de lanzamiento de EC2.
* **[Integración de ECS en Fargate][3]**: requerido para monitorizar clústeres que usan el tipo de lanzamiento de Fargate.
* **Versión 7.58.0 o posterior del Datadog Agent**: recomendada para una frecuencia de actualización más corta en la página del explorador de ECS.

## Configuración

Asegúrate de haber habilitado la [recopilación de recursos de AWS][10], la [integración de ECS en EC2][2] y la [integración de ECS en Fargate][3].

**Nota**: El intervalo de recopilación para estas integraciones es de aproximadamente 24 horas. Para lograr un intervalo de recopilación más corto de 15 segundos, se recomienda instalar el Datadog Agent en tu clúster de ECS.

{{< tabs >}}
{{% tab "Definición de tareas" %}}

Si usas la [definición de tareas para instalar el Datadog Agent][4], añade esta variable de entorno al contenedor del Datadog Agent a fin de activar esta función.

```yaml
{
  "containerDefinitions": [
    {
      "name": "datadog-agent",
      "environment": [
        {
          "name": "DD_ECS_TASK_COLLECTION_ENABLED",
          "value": "true"
        }
        # (...)
      ]
      # (...)
    }
  ],
# (...)
}
```

[4]: /es/containers/amazon_ecs/?tab=awscli#setup

{{% /tab %}}
{{% tab "Archivo de configuración" %}}
Para la configuración manual, incluye la siguiente línea en el archivo de configuración del Datadog Agent.

```yaml
ecs_task_collection_enabled: true
```
{{% /tab %}}
{{< /tabs >}}

## Utilización

### Vistas

Usa el menú desplegable **Select Resources** (Seleccionar recursos) en la esquina superior izquierda de la página para alternar entre **Tasks** (Tareas), **Services** (Servicios), **Clusters** (Clústeres) y otros recursos de ECS.

Cada vista incluye una tabla de datos para organizar la información por campos como estado, nombre y etiquetas (tags) de AWS, junto con un mapa de clústeres detallado a fin de proporcionar información general sobre tus tareas y clústeres de ECS.

Consulta [Detalles del filtro de consulta](#query-filter-details) para obtener información sobre cómo filtrar estas vistas.

#### Agrupar por funcionalidad y facetas

Agrupa las tareas por etiquetas para obtener una vista agregada que te ayude a encontrar información de manera más eficiente. Puedes agrupar las tareas con la barra **Group by** (Agrupar por) en la parte superior derecha de la página, o al hacer clic en una etiqueta específica y buscar la función Agrupar por en el menú contextual, como se ilustra a continuación.

{{< img src="infrastructure/livecontainers/orch_ecs_ex_groupby.png" alt="Ejemplo de agrupación por tipo de lanzamiento" style="width:80%;">}}

Además, usa las facetas del lado izquierdo de la página para filtrar o agrupar recursos en función de tus intereses, como las tareas con el tipo de lanzamiento de Fargate.

{{< img src="infrastructure/livecontainers/fargate.mp4" alt="Ejemplo de agrupación de tareas de Fargate" video=true style="width:80%;">}}

### Mapa de clústeres

El mapa de clústeres ofrece una vista completa de tus tareas y clústeres de ECS, lo que te permite ver todos los recursos en una pantalla con grupos y filtros personalizables. También puedes seleccionar qué métricas colorear en los nodos.

Para examinar recursos del mapa de clústeres, haz clic en cualquier círculo o grupo a fin de mostrar un panel detallado.

{{< img src="infrastructure/livecontainers/ecs-cluster-map.mp4" alt="Mapa de clústeres con grupos y filtros personalizados" video=true style="width:80%;">}}

### Panel de información

Haz clic en cualquier fila de la tabla u objeto del mapa de clústeres para mostrar información detallada sobre un recurso específico en un panel lateral.

{{< img src="infrastructure/livecontainers/orch_ecs_ex_panel.png" alt="Vista de recursos en el panel lateral que muestra recursos relacionados." style="width:80%;">}}

En la pestaña **Task Definition** (Definición de tareas) en el panel lateral se muestra la definición de tareas completa.

Para las definiciones de tareas, también proporciona un historial de siete días, lo que te permite ver todas las revisiones de definiciones de tareas que han usado las tareas en ejecución durante la última semana y comparar los cambios entre ellas.

{{< img src="infrastructure/livecontainers/orch_ecs_ex_manifest_history.png" alt="Vista de detalles de recursos en el panel lateral que resalta la función de historial de definición de tareas" style="width:80%;">}}

Otras pestañas proporcionan información adicional para solucionar problemas del recurso seleccionado:

* **Related Resources** (Recursos relacionados): consulta todos los recursos relacionados en una estructura de árbol.
* [**Logs**][5]: accede a los logs de tu contenedor o recurso. Haz clic en cualquier entrada de log para ver los detalles completos del log en el explorador de logs.
* [**Metrics**][6] (Métricas): visualiza métricas en vivo de tu contenedor o recurso. Puedes maximizar cualquier gráfica para verla en pantalla completa, compartir una snapshot o exportarla desde esta pestaña.
* [**APM**][7]: accede a trazas (traces) de tu contenedor o recurso, incluidos detalles como la fecha, servicio, duración, método y código de estado.
* **Processes** (Procesos): consulta todos los procesos que se ejecutan en los contenedores del recurso.
* **Network** (Red): consulta las métricas de rendimiento de la red de un contenedor o recurso, incluidos el origen y el destino, el volumen enviado y recibido, y el rendimiento. Usa el campo **Destination** (Destino) para filtrar por etiquetas como `DNS` o `ip_type`, o usa el filtro **Group by** (Agrupar por) a fin de agrupar los datos de la red por etiquetas, como `task_name` o `service`.
* **Monitors** (Monitores): consulta monitores etiquetados, delimitados o agrupados para este recurso.

## Detalles del filtro de consulta

Puedes refinar los recursos que se muestran al ingresar una consulta en la barra de búsqueda **Filter by** (Filtrar por) en la parte superior izquierda de la página. El filtrado de consultas funciona de manera similar al filtrado en el [explorador de Kubernetes][8].

### Etiquetas de AWS

En el explorador de ECS, puedes usar `tag#` para buscar en etiquetas de Datadog y AWS.

### Etiquetas extraídas

Además de las etiquetas que has [configurado][9] en tu Datadog Agent, Datadog genera etiquetas adicionales basadas en atributos de recursos, que pueden ayudarte con tus necesidades de búsqueda y agrupación. Estas etiquetas se añaden de manera condicional a los recursos cuando es relevante.

#### Todos los recursos

Todos los recursos incluyen las siguientes etiquetas:

* `aws_account`: ID de cuenta de AWS
* `region`: región de cuenta de AWS
* `<resource_name>_arn`: etiquetas de recurso de ARN, como `task_arn`, `task_definition_arn`, `service_arn` y más.
* `ecs_<resource_name>`: etiquetas de nombre de recurso, como `ecs_task`, `ecs_task_definition`, `ecs_service` y más.

#### Relaciones

Los recursos relacionados se encuentran etiquetados entre sí. Algunos ejemplos incluyen:

- Una tarea perteneciente al servicio «XYZ», con un ARN de `XYZ-ARN`, puede tener las etiquetas `ecs_service:xyz` y `service_arn:xyz-arn`.
- Un servicio que forma parte del clúster «XYZ», identificado por el ARN `XYZ-ARN`, puede tener las etiquetas `ecs_cluster:xyz` y `cluster_arn:xyz-arn`.

> **Sugerencia:** Usa la función de autocompletar consultas de filtro para explorar las etiquetas de recursos relacionados disponibles. Escribe `ecs_` para ver los resultados sugeridos.

#### Etiquetas específicas de recursos

Algunos recursos tienen etiquetas específicas. Además de las etiquetas compartidas que se mencionan anteriormente, también se encuentran disponibles las siguientes.

| Recurso | Etiquetas extraídas |
|---|---|
| **Tarea** | `task_family`<br>`task_version`<br>`task_launch_type` |
| **Definición de tareas** | `task_family`<br>`task_version`<br>`task_launch_type`<br>`task_definition_status` |
| **Servicio** | `task_family`<br>`task_version`<br>`task_launch_type`<br>`service_status` |

## Notas y problemas conocidos

* La instalación del Datadog Agent en tu clúster afecta la frecuencia con la que se actualiza el explorador de ECS:

| **Recurso**        | **Con el Datadog Agent** | **Sin el Datadog Agent** |
|---------------------|------------------------|--------------------------|
| **Clúster**         | ~15 minutos             | ~15 minutos               |
| **Tarea**            | ~15 segundos             | ~24 horas                 |
| **Definición de tareas** | ~15 segundos             | ~24 horas                 |
| **Servicio**         | ~24 horas               | ~24 horas                 |

[1]: https://app.datadoghq.com/orchestration/explorer/ecsTask
[2]: /es/integrations/amazon_ecs
[3]: /es/integrations/ecs_fargate
[5]: /es/logs
[6]: /es/metrics
[7]: /es/tracing
[8]: /es/infrastructure/containers/orchestrator_explorer/?tab=manual#query-filter-details
[9]: /es/getting_started/tagging/assigning_tags/?tab=containerizedenvironments
[10]: /es/integrations/amazon_web_services/#resource-collection