---
further_reading:
- etiqueta: Documentation
  link: /metrics/custom_metrics/
  text: Learn more about Custom Metrics
- etiqueta: Documentation
  link: /account_management/billing/custom_metrics/?tab=countrate
  text: Custom Metrics Billing
- etiqueta: Documentation
  link: /metrics/metrics-without-limits/
  text: Metrics without LimitsTM
- etiqueta: Documentation
  link: /metrics/volume/
  text: Metrics Volume Management
- link: https://www.datadoghq.com/blog/custom-metrics-governance/
  tag: Blog
  text: Best practices for end-to-end custom metrics governance
private: true
title: Agent-Side Filtering for DogStatsD Custom Metrics
---

{{< callout url="https://www.datadoghq.com/" btn_hidden="true" header="false" >}}
El filtrado del lado del Agent para las métricas personalizadas de DogStatsD está en vista previa.
{{< /callout >}} 

## Información general

El filtrado del lado del Agent te permite filtrar las métricas personalizadas no utilizadas o no deseadas de DogStatsD directamente en el Datadog Agent, antes de enviarlas a Datadog. Esto puede reducir significativamente el volumen de métricas personalizadas indexadas e ingeridas.

El filtrado se realiza a nivel del Agent, pero se gestiona de forma centralizada a través de la interfaz de usuario de Datadog, lo que proporciona a los equipos una visibilidad y un control totales. Puedes crear, actualizar y gestionar las políticas de filtrado en Datadog, agilizando la gobernanza de las métricas, al tiempo que mantienes la transparencia.

La creación y actualización de políticas de filtrado requiere el permiso [`metric_tags_write`][1] RBAC. Todos los usuarios pueden ver las políticas de filtrado.

## Requisitos previos

- Actualiza al Datadog Agent v7.67.0 o posterior (se recomienda v7.70.0 o posterior).
- Con permisos [`org_management`][2], habilita [Remote Configuration][3] para tu organización.
- Con permisos [`api_keys_write`][4], activa la [Capacidad de Remote Configuration en las claves de API][5] utilizadas por tus Agents. Después de activar Remote Configuration en una clave de API, reinicia tus Agents para que el cambio surta efecto.

{{<img src="agent/remote_config/RC_Key_updated.png" alt="API Key properties with Remote Configuration capability Enable button." width="90%" style="center">}}

## Crear una política de filtrado de métricas

Puedes crear una política de filtrado de métricas desde la [página de Configuración de métricas][6] o la [página de Resumen de métricas][7].

Las políticas de filtrado de métricas se aplican a todos los Agents v7.67.0+ con Remote Configuration activada. Las versiones anteriores del Agent, o Agents con Remote Configuration desactivada, no aplican políticas de filtrado.

Las actualizaciones de las políticas se despliegan en Agents en 1-2 minutos.

### Desde la página de Configuración de métricas

1. Haz clic en **+ Create Policy** (+ Crear política).
2. Haz clic en **Filter metrics** (Filtrar métricas).
3. Brinda una descripción para la nueva política.
4. Selecciona las métricas a filtrar en el desplegable **Metrics to Filter** (Métricas a filtrar), o haz clic en **Upload CSV** (Cargar CSV).
   - Si eliges cargar un CSV, selecciona el archivo y haz clic en **Open** (Abrir). Puedes utilizar varios CSV para crear la política.
5. Cuando estés satisfecho con la lista de métricas a filtrar, haz clic en **Save and Filter** (Guardar y filtrar).

### De la página Resumen de métricas

Crea una política de filtrado de métricas desde la página Resumen de métricas utilizando cualquiera de los siguientes métodos:

{{< tabs >}}
{{% tab "From a metric query" %}}

1. Introduce una consulta de métrica en la barra de búsqueda.
2. Haz clic en el botón de los tres puntos verticales situado a la derecha de la pantalla.
3. Haz clic en **Filter metrics** (Filtrar métricas).
4. En el menú desplegable **Choose policy** (Elegir política), haz clic en **New Policy** (Nueva política). Introduce una descripción para la política.
5. Revisa las **Metrics to Filter** (Métricas a filtrar). Haz clic en `X` a la derecha de cualquier fila para eliminar una métrica de la lista, o haz clic en `+ Include More Metrics` para añadir métricas a la lista.
6. Haz clic en **Save and Filter** (Guardar y filtrar).

{{< img src="metrics/guide/agent_filtering_for_dogstatsd_custom_metrics/create_policy_from_metric_query.mp4" alt="Crear una política de filtrado de métricas desde una consulta de métrica" video="true" >}}

{{% /tab %}}
{{% tab "From the policy editor" %}}

1. Haz clic en el botón de los tres puntos verticales situado a la derecha de la pantalla.
2. Haz clic en **Filter metrics** (Filtrar métricas).
3. En el menú desplegable **Choose policy** (Elegir política), haz clic en **New Policy** (Nueva política). Introduce una descripción para la política.
4. Introduce una consulta de métricas en el campo **Metrics to Filter** (Métricas a filtrar), o selecciona métricas individualmente en el desplegable. Haz clic en `X` a la derecha de cualquier fila para eliminar una métrica de la lista.
5. Haz clic en **Save and Filter** (Guardar y filtrar).

{{< img src="metrics/guide/agent_filtering_for_dogstatsd_custom_metrics/create_policy_with_policy_editor.mp4" alt="Crear una política de filtrado de métricas desde el editor de políticas" video="true" >}}

{{% /tab %}}
{{% tab "From CSV upload" %}}

1. Haz clic en el botón de los tres puntos verticales situado a la derecha de la pantalla.
2. Haz clic en **Filter metrics** (Filtrar métricas).
3. En el menú desplegable **Choose policy** (Elegir política), haz clic en **New Policy** (Nueva política). Introduce una descripción para la política.
4. Haz clic en **Upload CSV** (Cargar CSV) a la derecha del campo **Metrics to Filter** (Métricas a filtrar).
5. Selecciona el archivo CSV y haz clic en **Open** (Abrir).
6. Revisa las métricas de la lista. Haz clic en `X` a la derecha de cualquier fila para eliminar una métrica de la lista. Si es necesario, carga los archivos CSV adicionales o añade métricas a través del campo **Metrics to filter** (Métricas a filtrar).
7. Haz clic en **Save and Filter** (Guardar y filtrar).

{{< img src="metrics/guide/agent_filtering_for_dogstatsd_custom_metrics/create_policy_with_csv_upload.mp4" alt="Crear una política de filtrado de métricas con una carga de archivo CSV" video="true" >}}

{{% /tab %}}
{{< /tabs >}}

## Editar una política de filtrado de métricas

Puedes editar una política de filtrado de métricas desde la [página de Configuración de métricas][1] o la [página de Resumen de métricas][2].

### Desde la página de Configuración de métricas

1. Haz clic en la política que desees editar.
2. Haz clic en **Edit** (Editar).
3. Selecciona las métricas a filtrar en el desplegable **Metrics to Filter** (Métricas a filtrar), o haz clic en **Upload CSV** (Cargar CSV).
   - Si elige cargar un CSV, seleccione el archivo y haga clic en **Abrir**.
4. Haz clic en **Save and Filter** (Guardar y filtrar).

{{< img src="metrics/guide/agent_filtering_for_dogstatsd_custom_metrics/edit_policy_from_metrics_settings.mp4" alt="Editar una política de filtrado de métricas desde la página de Configuración de métricas" video="true" >}}

### De la página Resumen de métricas

Edita una política de filtrado de métricas desde la página Resumen de métricas utilizando cualquiera de los siguientes métodos:

{{< tabs >}}
{{% tab "From a metric query" %}}

1. Introduce una consulta de métrica en la barra de búsqueda.
2. Haz clic en el botón de los tres puntos verticales situado a la derecha de la pantalla.
3. Haz clic en **Filter metrics** (Filtrar métricas).
4. En el menú desplegable **Choose policy** (Elegir política), selecciona la política que deseas editar.
5. Revisa las **Metrics to Filter** (Métricas a filtrar) y las listas **Existing metrics in policy** (Métricas existentes en la política). Haz clic en `X` a la derecha de cualquier fila para eliminar una métrica de la lista, o haz clic en `+ Include More Metrics` para añadir métricas a la lista.
6. Haz clic en **Save and Filter** (Guardar y filtrar).

{{< img src="metrics/guide/agent_filtering_for_dogstatsd_custom_metrics/edit_policy_with_metric_query.mp4" alt="Editar una política de filtrado de métricas con una consulta de métricas" video="true" >}}

{{% /tab %}}
{{% tab "From the policy editor" %}}

1. Haz clic en el botón de los tres puntos verticales situado a la derecha de la pantalla.
2. Haz clic en **Filter metrics** (Filtrar métricas).
3. En el menú desplegable **Choose policy** (Elegir política), selecciona la política que deseas editar.
4. Selecciona las métricas individualmente en el desplegable **Metrics to Filter** (Métricas a filtrar). Haz clic en `X` a la derecha de cualquier fila para eliminar una métrica de la lista.
5. Haz clic en **Save and Filter** (Guardar y filtrar).

{{% /tab %}}
{{% tab "From CSV upload" %}}

1. Haz clic en el botón de los tres puntos verticales situado a la derecha de la pantalla.
2. Haz clic en **Filter metrics** (Filtrar métricas).
3. En el menú desplegable **Choose policy** (Elegir política), selecciona la política que deseas editar.
4. Haz clic en **Upload CSV** (Cargar CSV) a la derecha del campo **Metrics to Filter** (Métricas a filtrar).
5. Selecciona el archivo CSV y haz clic en **Open** (Abrir).
6. Revisa las **Metrics to Filter** (Métricas a filtrar) y las listas **Existing metrics in policy** (Métricas existentes en la política). Haz clic en `X` a la derecha de cualquier fila para eliminar una métrica de la lista, o haz clic en `+ Include More Metrics` para añadir métricas a la lista.
7. Haz clic en **Save and Filter** (Guardar y filtrar).

{{% /tab %}}
{{< /tabs >}}

## Ver todas las políticas y métricas filtradas

Puedes ver todas tus políticas y métricas filtradas desde la [página de Configuración de métricas][1].

**Haz clic en el [botón de configuración][1]**: 

{{< img src="metrics/guide/agent_filtering_for_dogstatsd_custom_metrics/settings_from_summary.png" alt="El botón de configuración de la página de resumen de métricas" style="width:100%;" >}}

**Haz clic en Métricas en la barra de navegación** y ve directamente a la configuración:

{{< img src="metrics/guide/agent_filtering_for_dogstatsd_custom_metrics/settings_from_nav.png" alt="La opción de configuración del panel de Métricas expandido en Datadog" style="width:100%;" >}}

### Ver todas las políticas

Selecciona la pestaña **Polocies** (Políticas) de la barra lateral para ver una lista de todas tus políticas. Si no ves la barra lateral, haz clic en el botón **Show Sidebar** (Mostrar barra lateral) {{< img src="metrics/guide/agent_filtering_for_dogstatsd_custom_metrics/show_sidebar.png" alt="El botón Mostrar barra lateral" inline="true" >}}.

Haz clic en cualquier política de filtrado de métricas para abrir su vista detallada para editarla o eliminarla.

### Ver todas las métricas filtradas

Selecciona la pestaña **Filtered Metrics** (Métricas filtradas) de la barra lateral para ver una lista de todas tus métricas filtradas. Si no ves la barra lateral, haz clic en el botón **Show Sidebar** (Mostrar barra lateral) {{< img src="metrics/guide/agent_filtering_for_dogstatsd_custom_metrics/show_sidebar.png" alt="El botón Mostrar barra lateral" inline="true" >}}.

Haz clic en las políticas adjuntas de una métrica filtrada en la columna **ATTACHED POLICIES** (POLÍTICAS ADJUNTAS) para editarlas o eliminarlas.

## Eliminar políticas 

Puedes eliminar las políticas de filtrado de métricas desde la [página de Configuración de métricas][1].

1. Haz clic en la política de filtrado de métricas que desees eliminar.
2. Selecciona **Delete** (Borrar) en la esquina superior derecha de la página.

{{< img src="metrics/guide/agent_filtering_for_dogstatsd_custom_metrics/delete_policy.png" alt="El botón Eliminar política en una vista detallada de la política de filtrado de métricas" style="width:100%;" >}}

## Gestionar las políticas de filtrado de métricas a través de la API

<div class="alert alert-danger">Estos endpoints están sujetos a cambios mientras el filtrado del lado del Agent para las métricas personalizadas de DogStatsD se encuentra en fase de vista previa.</div>

Estos endpoints requieren una clave de API de Datadog y una clave de aplicación válidas. Consulta [Primeros pasos][8] en la Referencia de la API para obtener más información.

### Crear una política de métricas filtradas

La URL base para tu [sitio de Datadog][9] seleccionado es: {{<region-param key="dd_api" code="true">}}

Sustituye `<BASE_URL>` en el ejemplo siguiente por la URL base.

**POST** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies`

#### Ejemplo de cuerpo

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

### Actualizar una política de métricas filtradas (actualización parcial)

La URL base para tu [sitio de Datadog][9] seleccionado es: {{<region-param key="dd_api" code="true">}}

Sustituye `<BASE_URL>` en el ejemplo siguiente por la URL base.

**PATCH** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### Ejemplo de cuerpo

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

### Actualizar una política de métricas filtradas (sustitución completa)

La URL base para tu [sitio de Datadog][9] seleccionado es: {{<region-param key="dd_api" code="true">}}

Sustituye `<BASE_URL>` en el ejemplo siguiente por la URL base.

**PUT** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### Ejemplo de cuerpo

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

### Eliminar una política

La URL base para tu [sitio de Datadog][9] seleccionado es: {{<region-param key="dd_api" code="true">}}

Sustituye `<BASE_URL>` en el ejemplo siguiente por la URL base.

**DELETE** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

### Obtener una política de métricas filtradas

La URL base para tu [sitio de Datadog][9] seleccionado es: {{<region-param key="dd_api" code="true">}}

Sustituye `<BASE_URL>` en el ejemplo siguiente por la URL base.

**GET** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies/{policy-id}`

#### Ejemplo de cuerpo de respuesta

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

### Lista de políticas métricas filtradas

La URL base para tu [sitio de Datadog][9] seleccionado es: {{<region-param key="dd_api" code="true">}}

Sustituye `<BASE_URL>` en el ejemplo siguiente por la URL base.

**GET** `<BASE_URL>/api/unstable/remote_config/products/metric_control/filtered_metrics/policies`

#### Ejemplo de cuerpo de respuesta

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

## Limitaciones de la vista previa

Esta versión preliminar inicial incluye las siguientes limitaciones:

- Se puede filtrar un máximo de 10.000 nombres de métricas.
- El impacto en el uso de recursos en el Agent se limita a un máximo de 10 MB de memoria (RSS), y no aumenta el uso de la CPU.
- Solo se admiten las métricas de DogStatsD.

## Referencias adicionales

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