---
aliases:
- /es/metrics/guide/agent-filtering-for-dogstatsd-custom-metrics/
description: Filtre las Custom Metrics que no se utilicen en el Datadog Agent para
  reducir el volumen de métricas ingeridas e indexadas.
further_reading:
- link: /metrics/custom_metrics/
  tag: Documentación
  text: Más información sobre Custom Metrics
- link: /account_management/billing/custom_metrics/?tab=countrate
  tag: Documentación
  text: Facturación de Custom Metrics
- link: /metrics/metrics-without-limits/
  tag: Documentación
  text: Metrics without Limits™
- link: /metrics/volume/
  tag: Documentación
  text: Gestión del volumen de métricas
- link: https://www.datadoghq.com/blog/custom-metrics-governance/
  tag: Blog
  text: Prácticas recomendadas para la gobernanza integral de Custom Metrics
title: Filtrado del Agent para Custom Metrics
---
{{< callout url="https://www.datadoghq.com/product-preview/agent-side-filtering-for-custom/" >}} El filtrado del Agent para Custom Metrics está en versión preliminar. Si le interesa esta función, complete este formulario. {{< /callout >}}

## Descripción general {#overview}

El filtrado del Agent le permite filtrar Custom Metrics no utilizadas o no deseadas (tanto de DogStatsD como de integraciones del Agent) directamente en el Datadog Agent, antes de enviarlas a Datadog. Esto puede reducir significativamente el volumen de Custom Metrics tanto indexadas como ingeridas.

El filtrado se realiza a nivel del Agent, pero se gestiona de forma centralizada a través de la interfaz de usuario de Datadog, lo que brinda a los equipos visibilidad y control totales. Puede crear, actualizar y gestionar políticas de filtrado en Datadog, lo que agiliza la gobernanza de métricas mientras mantiene la transparencia.

La creación y actualización de políticas de filtrado requiere el permiso de RBAC [`metric_tags_write`][1]. Todos los usuarios pueden visualizar las políticas de filtrado.

## Requisitos previos {#prerequisites}

- Actualice a Datadog Agent v7.67.0 o superior.
    - Se recomienda usar la v7.70.0 o superior para filtrar métricas de DogStatsD. 
    - Se requiere usar la v7.74.0 o superior para las métricas de integraciones del Agent.
- Con los permisos [`org_management`][2], habilite [Remote Configuration][3] para su organización.
- Con los permisos [`api_keys_write`][4], habilite [capacidad de Remote Configuration en las claves de API][5] que utilizan sus Agents. Después de habilitar Remote Configuration en una clave de API, reinicie sus Agents para que el cambio surta efecto.

{{<img src="agent/remote_config/RC_Key_updated.png" alt="Botón Habilitar propiedades de clave de API con capacidad de Remote Configuration." width="90%" style="center">}}

## Crear una política de filtrado de métricas {#create-a-metric-filtering-policy}

Puede crear una política de filtrado de métricas desde la [página Configuración de métricas][7] o la [página Metrics Summary][6].

Las políticas de filtrado de métricas se aplican a todos los Agents v7.67.0+ (v7.74.0+ para métricas de Agent Integration) con Remote Configuration habilitado. Las versiones de Agent más antiguas, o los Agents con Remote Configuration deshabilitado, no aplican políticas de filtrado.

Las actualizaciones de políticas se implementan en los Agents en 1-2 minutos.

### Desde la página Configuración de métricas {#from-the-metrics-settings-page}

1. Haga clic en {{< ui >}}\+ Create Policy{{< /ui >}}.
2. Haga clic en {{< ui >}}Filter metrics{{< /ui >}}.
3. Proporcione una descripción para la nueva política.
4. Seleccione las métricas para filtrar desde el menú desplegable {{< ui >}}Metrics to Filter{{< /ui >}}, o haga clic en {{< ui >}}Upload CSV{{< /ui >}}.
   - Si elige cargar un CSV, seleccione el archivo y haga clic en {{< ui >}}Open{{< /ui >}}. Puede usar varios archivos CSV para crear la política.
5. Cuando esté satisfecho con la lista de métricas para filtrar, haga clic en {{< ui >}}Save and Filter{{< /ui >}}.

### Desde la página Metrics Summary {#from-the-metrics-summary-page}

Cree una política de filtrado de métricas desde la página Metrics Summary usando cualquiera de los siguientes métodos:

{{< tabs >}}
{{% tab "Desde una consulta de métricas" %}}

1. Ingrese una consulta de métricas en la barra de búsqueda.
2. Haga clic en el botón de tres puntos verticales en el lado derecho de la pantalla.
3. Haga clic en {{< ui >}}Filter metrics{{< /ui >}}.
4. En el menú desplegable {{< ui >}}Choose policy{{< /ui >}}, haga clic en {{< ui >}}New Policy{{< /ui >}}. Proporcione una descripción para la política.
5. Revise {{< ui >}}Metrics to Filter{{< /ui >}}. Haga clic en `X` en el lado derecho de cualquier fila para eliminar una métrica de la lista, o haga clic en {{< ui >}}\+ Include More Metrics{{< /ui >}} para agregar métricas a la lista.
6. Haga clic en {{< ui >}}Save and Filter{{< /ui >}}.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/create_policy_from_metric_query.mp4" alt="Creación de una política de filtrado de métricas a partir de una consulta de métrica" video="true" >}}

{{% /tab %}}
{{% tab "Desde el editor de políticas" %}}

1. Haga clic en el botón de tres puntos verticales en el lado derecho de la pantalla.
2. Haga clic en {{< ui >}}Filter metrics{{< /ui >}}.
3. En el menú desplegable {{< ui >}}Choose policy{{< /ui >}}, haga clic en {{< ui >}}New Policy{{< /ui >}}. Proporcione una descripción para la política.
4. Ingrese una consulta de métrica en el campo {{< ui >}}Metrics to Filter{{< /ui >}}, o seleccione métricas individualmente desde el menú desplegable. Haga clic en `X` en el lado derecho de cualquier fila para eliminar una métrica de la lista.
5. Haga clic en {{< ui >}}Save and Filter{{< /ui >}}.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/create_policy_with_policy_editor.mp4" alt="Creación de una política de filtrado de métricas desde el editor de políticas" video="true" >}}

{{% /tab %}}
{{% tab "Desde la carga de CSV" %}}

1. Haga clic en el botón de tres puntos verticales en el lado derecho de la pantalla.
2. Haga clic en {{< ui >}}Filter metrics{{< /ui >}}.
3. En el menú desplegable {{< ui >}}Choose policy{{< /ui >}}, haga clic en {{< ui >}}New Policy{{< /ui >}}. Proporcione una descripción para la política.
4. Haga clic en {{< ui >}}Upload CSV{{< /ui >}} a la derecha del campo {{< ui >}}Metrics to Filter{{< /ui >}}.
5. Seleccione el archivo CSV y haga clic en {{< ui >}}Open{{< /ui >}}.
6. Revise las métricas enumeradas. Haga clic en `X` en el lado derecho de cualquier fila para eliminar una métrica de la lista. Si es necesario, cargue archivos CSV adicionales o agregue métricas a través del campo {{< ui >}}Metrics to Filter{{< /ui >}}.
7. Haga clic en {{< ui >}}Save and Filter{{< /ui >}}.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/create_policy_with_csv_upload.mp4" alt="Creación de una política de filtrado de métricas con una carga de archivo CSV" video="true" >}}

{{% /tab %}}
{{< /tabs >}}

## Edite una política de filtrado de métricas {#edit-a-metric-filtering-policy}

Puede editar una política de filtrado de métricas desde la [página de Configuración de métricas][1] o la [página de Metrics Summary][2].

### Desde la página Configuración de métricas {#from-the-metrics-settings-page-1}

1. Haga clic en la política para editarla.
2. Haga clic en {{< ui >}}Edit{{< /ui >}}.
3. Seleccione las métricas para filtrar desde el menú desplegable {{< ui >}}Metrics to Filter{{< /ui >}}, o haga clic en {{< ui >}}Upload CSV{{< /ui >}}.
   - Si elige cargar un CSV, seleccione el archivo y haga clic en {{< ui >}}Open{{< /ui >}}.
4. Haga clic en {{< ui >}}Save and Filter{{< /ui >}}.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/edit_policy_from_metrics_settings.mp4" alt="Edición de una política de filtrado de métricas desde la página de Configuración de métricas" video="true" >}}

### Desde la página de Metrics Summary {#from-the-metrics-summary-page-1}

Edite una política de filtrado de métricas desde la página de Metrics Summary utilizando cualquiera de los siguientes métodos:

{{< tabs >}}
{{% tab "Desde una consulta de métricas" %}}

1. Ingrese una consulta de métricas en la barra de búsqueda.
2. Haga clic en el botón de tres puntos verticales en el lado derecho de la pantalla.
3. Haga clic en {{< ui >}}Filter metrics{{< /ui >}}.
4. En el menú desplegable {{< ui >}}Choose policy{{< /ui >}}, seleccione la política que desea editar.
5. Revise las listas {{< ui >}}Metrics to Filter{{< /ui >}} y {{< ui >}}Existing metrics in policy{{< /ui >}}. Haga clic en `X` en el lado derecho de cualquier fila para eliminar una métrica de la lista, o haga clic en {{< ui >}}\+ Include More Metrics{{< /ui >}} para agregar métricas a la lista.
6. Haga clic en {{< ui >}}Save and Filter{{< /ui >}}.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/edit_policy_with_metric_query.mp4" alt="Edición de una política de filtrado de métricas con una consulta de métricas" video="true" >}}

{{% /tab %}}
{{% tab "Desde el editor de políticas" %}}

1. Haga clic en el botón de tres puntos verticales en el lado derecho de la pantalla.
2. Haga clic en {{< ui >}}Filter metrics{{< /ui >}}.
3. En el menú desplegable {{< ui >}}Choose policy{{< /ui >}}, seleccione la política que desea editar.
4. Seleccione las métricas individualmente desde el menú desplegable {{< ui >}}Metrics to Filter{{< /ui >}}. Haga clic en `X` en el lado derecho de cualquier fila para eliminar una métrica de la lista.
5. Haga clic en {{< ui >}}Save and Filter{{< /ui >}}.

{{% /tab %}}
{{% tab "Desde la carga de CSV" %}}

1. Haga clic en el botón de tres puntos verticales en el lado derecho de la pantalla.
2. Haga clic en {{< ui >}}Filter metrics{{< /ui >}}.
3. En el menú desplegable {{< ui >}}Choose policy{{< /ui >}}, seleccione la política que desea editar.
4. Haga clic en {{< ui >}}Upload CSV{{< /ui >}} a la derecha del campo {{< ui >}}Metrics to Filter{{< /ui >}}.
5. Seleccione el archivo CSV y haga clic en {{< ui >}}Open{{< /ui >}}.
6. Revise las listas {{< ui >}}Metrics to Filter{{< /ui >}} y {{< ui >}}Existing metrics in policy{{< /ui >}}. Haga clic en `X` en el lado derecho de cualquier fila para eliminar una métrica de la lista, o haga clic en {{< ui >}}\+ Include More Metrics{{< /ui >}} para agregar métricas a la lista.
7. Haga clic en {{< ui >}}Save and Filter{{< /ui >}}.

{{% /tab %}}
{{< /tabs >}}

## Visualizar todas las políticas y métricas filtradas {#view-all-policies-and-filtered-metrics}

Puede visualizar todas sus políticas y métricas filtradas desde la [página de Configuración de métricas][1].

Haga clic en el [botón de configuración][1]: 

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/settings_from_summary.png" alt="El botón de configuración en la página de Metrics Summary" style="width:100%;" >}}

Haga clic en {{< ui >}}Metrics{{< /ui >}} en la barra de navegación y vaya directamente a la configuración:

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/settings_from_nav.png" alt="La opción de configuración del panel de Metrics expandido en Datadog" style="width:100%;" >}}

### Visualizar todas las políticas {#view-all-policies}

Seleccione la pestaña {{< ui >}}Policies{{< /ui >}} de la barra lateral para ver una lista de todas sus políticas. Si no ve la barra lateral, haga clic en el botón {{< ui >}}Show Sidebar{{< /ui >}} {{< img src="metrics/guide/agent_filtering_for_custom_metrics/show_sidebar.png" inline="true" width="22" >}}.

Haga clic en cualquier política de filtrado de métricas para abrir y visualizar su detalle, para editarla o eliminarla.

### Visualizar todas las métricas filtradas {#view-all-filtered-metrics}

Seleccione la pestaña {{< ui >}}Filtered Metrics{{< /ui >}} de la barra lateral para ver una lista de todas sus métricas filtradas. Si no ve la barra lateral, haga clic en el botón {{< ui >}}Show Sidebar{{< /ui >}} {{< img src="metrics/guide/agent_filtering_for_custom_metrics/show_sidebar.png" inline="true" width="22" >}}.

Haga clic en las políticas adjuntas de una métrica filtrada en la columna {{< ui >}}ATTACHED POLICIES{{< /ui >}} para editarlas o eliminarlas.

## Eliminar políticas {#delete-policies}

Puede eliminar políticas de filtrado de métricas desde la [página de Configuración de métricas][1].

1. Haga clic en la política de filtrado de métricas para eliminar.
2. Seleccione {{< ui >}}Delete{{< /ui >}} en la esquina superior derecha de la página.

{{< img src="metrics/guide/agent_filtering_for_custom_metrics/delete_policy.png" alt="El botón de eliminar política en una vista de detalles de política de filtrado de métricas" style="width:100%;" >}}

## Administrar políticas de filtrado de métricas a través de la API {#manage-metric-filtering-policies-through-the-api}

<div class="alert alert-danger">Estos puntos de conexión están sujetos a cambios mientras el filtrado del lado del Agent para métricas personalizadas esté en versión preliminar.</div>

Estos puntos de conexión requieren una clave de Datadog API y una clave de aplicación válidas. Consulte [Introducción][8] en la Referencia de la API para obtener más información.

### Crear una política de métricas filtradas {#create-a-filtered-metric-policy}

La URL base para su [sitio de Datadog][9] seleccionado es: {{<region-param key="dd_api" code="true">}}

Sustituya `<BASE_URL>` en el ejemplo a continuación con la URL base.

**POST** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies`

#### Cuerpo del ejemplo {#example-body}

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "filtered_metrics",
    "attributes": {
      "policy_name": "my policy",
      "metric_names": [
        "metric.name.one",
        "metric.name.two"
      ]
    }
  }
}
{{< /code-block >}}

### Actualizar una política de métricas filtradas (actualización parcial) {#update-a-filtered-metric-policy-partial-update}

La URL base para su [sitio de Datadog][9] seleccionado es: {{<region-param key="dd_api" code="true">}}

Sustituya `<BASE_URL>` en el ejemplo a continuación con la URL base.

**PATCH** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### Cuerpo del ejemplo {#example-body-1}

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "filtered_metrics",
    "attributes": {
      "policy_name": "my policy",
      "metrics_to_add": [
        "metric.name.three",
        "metric.name.four"
      ],
      "metrics_to_remove": [
        "metric.name.five",
        "metric.name.six"
      ]
    }
  }
}
{{< /code-block >}}

### Actualizar una política de métricas filtradas (reemplazo completo) {#update-a-filtered-metric-policy-full-replace}

La URL base para su [sitio de Datadog][9] seleccionado es: {{<region-param key="dd_api" code="true">}}

Sustituya `<BASE_URL>` en el ejemplo a continuación con la URL base.

**PUT** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### Cuerpo del ejemplo {#example-body-2}

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
  "data": {
    "type": "filtered_metrics",
    "attributes": {
      "policy_name": "my policy",
      "metric_names": [
        "metric.name.seven",
        "metric.name.eight"
      ]
    }
  }
}
{{< /code-block >}}

### Eliminar una política {#delete-a-policy}

La URL base para su [sitio de Datadog][9] seleccionado es: {{<region-param key="dd_api" code="true">}}

Sustituya `<BASE_URL>` en el ejemplo a continuación con la URL base.

**DELETE** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

### Obtener una política de métricas filtradas {#get-a-filtered-metric-policy}

La URL base para su [sitio de Datadog][9] seleccionado es: {{<region-param key="dd_api" code="true">}}

Sustituya `<BASE_URL>` en el ejemplo a continuación con la URL base.

**GET** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### Cuerpo de respuesta de ejemplo {#example-response-body}

{{< code-block lang="json" disable_copy="true" collapsible="true" >}}
{
  "data": [
    {
      "type": "filtered_metrics",
      "id": "metric.name.one",
      "attributes": {
        "updated_timestamp": 1745954352
      }
    },
    {
      "type": "filtered_metrics",
      "id": "metric.name.two"
      "attributes": {
        "updated_timestamp": 1745954389
      }
    }
    // ... up to ~10,000 entries
  ],
  "links": {
    "self": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=200&page[limit]=100",
    "next": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=300&page[limit]=100",
    "prev": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=100&page[limit]=100",
    "first": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=0&page[limit]=100",
    "last": "/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}?page[offset]=9900&page[limit]=100"
  },
  "meta": {
    "agent_coverage_percent": 100,
    "agents_with_latest_policy_count": 4,
    "deployment_failure": {
        "failed_agent_count": 0,
        "failure_message": ""
    },
    "deployment_status": "Deployed to all Agents",
    "deployment_strategy": "all",
    "policy_name": "test_policy_1",
    "total": 7,
    "total_agent_count": 4,
    "updated_by": "user@datadoghq.com",
    "updated_timestamp": 1758912365
  }
}
{{< /code-block >}}

### Listar políticas de métricas filtradas {#list-filtered-metric-policies}

La URL base para su [sitio de Datadog][9] seleccionado es: {{<region-param key="dd_api" code="true">}}

Sustituya `<BASE_URL>` en el ejemplo a continuación con la URL base.

**GET** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies`

#### Cuerpo de respuesta de ejemplo {#example-response-body-1}

{{< code-block lang="json" disable_copy="true" collapsible="true" >}}
{
    "data": [
        {
            "id": "06b-fab-47e",
            "type": "filtered_metrics",
            "attributes": {
                "count": 85,
                "deployment_status": "Deployed to all Agents",
                "deployment_strategy": "all",
                "policy_name": "policy one",
                "updated_by": "user@datadoghq.com",
                "updated_timestamp": 1758547485,
                "version": 4            
            }
        },
        {
            "id": "07b-201-47e",
            "type": "filtered_metrics",
            "attributes": {
                "count": 8,
                "deployment_status": "Deployed to all Agents",
                "deployment_strategy": "all",
                "policy_name": "policy two",
                "updated_by": "user@datadoghq.com",
                "updated_timestamp": 1758547212,
                "version": 1
            }
        }
    ]
}
{{< /code-block >}}

## Limitaciones de la versión preliminar {#preview-limitations}

Esta versión preliminar inicial incluye las siguientes limitaciones:

- Se puede filtrar un máximo de 10,000 nombres de métricas.
- El impacto del uso de recursos en el Agent se limita hasta 10MB de memoria (RSS), y no hay aumento en el uso de CPU.
- Solo se admiten métricas personalizadas recibidas de DogStatsD o de integraciones del Agent.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/rbac/permissions/#metrics
[2]: /es/account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/remote-config
[4]: /es/account_management/rbac/permissions#api-and-application-keys
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/metric/summary
[7]: https://app.datadoghq.com/metric/settings/policies                                            
[8]: /es/api/latest/#getting-started
[9]: /es/getting_started/site/