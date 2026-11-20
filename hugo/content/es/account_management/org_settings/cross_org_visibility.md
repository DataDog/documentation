---
algolia:
  tags:
  - cross org
  - cross-org
  - cross organization
description: Comparta datos y realice consultas entre diferentes organizaciones en
  la misma cuenta.
title: Visibilidad entre organizaciones
---
## Descripción general {#overview}

Algunas empresas dependen de múltiples [organizaciones][1] de Datadog para separar los datos por motivos de cumplimiento u otras razones.

La visibilidad entre organizaciones permite a los clientes compartir datos entre diferentes organizaciones en la misma cuenta y mostrar información de múltiples organizaciones en un solo lugar.

Este documento explica:
- Qué [permite](#capabilities) la visibilidad entre organizaciones
- Cómo [compartir](#create-a-connection) datos entre sus organizaciones
- Cómo crear un [widget de Dashboard y Notebook](#create-a-widget-with-cross-organization-data) o una [consulta de API](#in-the-api-1) con datos de sus otras organizaciones

## Capacidades {#capabilities}

### Conexión entre organizaciones {#organization-connection}

Una organización _fuente_ expone datos a una organización _de destino_ a través de una _conexión entre organizaciones_. Una organización fuente puede tener múltiples destinos, y una organización de destino puede tener múltiples fuentes.

Las siguientes limitaciones se aplican a las conexiones entre organizaciones:
- Las organizaciones fuente y de destino deben estar en la misma [cuenta][1]
- Las organizaciones fuente y de destino deben estar en el mismo [sitio][11].
- Las organizaciones Pro pueden compartir con un máximo de 5 organizaciones más. Las organizaciones Enterprise no tienen límite. Las organizaciones en otros planes, como los planes Free, Trial y Startup, no pueden compartir con otras organizaciones.

**Nota**: Una vez establecida la conexión, la organización de destino puede consultar los datos de la organización fuente de la misma manera que puede consultar sus propios datos. Esto significa que los datos de la organización fuente, incluidos los datos confidenciales, pueden ser consultados y mostrados según lo permitan el control de acceso y otras configuraciones de la _organización de destino_. Esto puede incluir, por ejemplo, la capacidad de la organización de destino para crear [Dashboards públicos][10] utilizando los datos de la organización fuente, incluso si la propia configuración de la organización fuente no permite la creación de Dashboards públicos.

Después de configurar una conexión entre organizaciones, los datos expuestos siguen almacenados en la organización fuente y no se mueven al destino. En su lugar, la organización de destino consulta los datos de la organización fuente. Las conexiones no duplican los datos y no generan cargos adicionales. La organización de destino puede consultar los datos de la fuente de cualquier período admitido por esos datos, incluso si es anterior a la fecha de creación de la conexión. Si elimina la conexión, el destino ya no podrá acceder a ningún dato de la fuente y es posible que las consultas o los Dashboards creados a partir de los datos de la organización fuente ya no funcionen.

### Contexto {#scope}

La visibilidad entre organizaciones admite la siguiente telemetría en [widgets de Dashboard y Notebook][2]:
* Métricas (todos los tipos admitidos, incluidas [Custom Metrics][3], [métricas de traza][4] y [métricas generadas a partir de registros][5])
* Logs
* Pipelines de CI Visibility
* Pruebas de Test Optimization
* Audit Trail

## Configurar conexiones {#configure-connections}

### Listar conexiones {#list-connections}

Para explorar las conexiones, navegue a la [página de visibilidad entre organizaciones][6] en Organization Settings. La tabla enumera todas sus conexiones entre organizaciones.

### Crear una conexión {#create-a-connection}

Crear una conexión entre organizaciones le permite consultar métricas de la organización fuente en la organización de destino.

<div class="alert alert-info">Datadog recomienda usar una <a href="/account_management/org_settings/service_accounts/">cuenta de servicio</a> para crear y administrar conexiones entre organizaciones. Las conexiones están vinculadas a la cuenta de su creador: si la cuenta del creador se desactiva, la conexión se elimina, lo que puede interrumpir el flujo de datos. Las cuentas de servicio no están vinculadas a usuarios individuales y evitan este riesgo operativo. Las claves de aplicación de la cuenta de servicio también se pueden usar con <a href="/account_management/org_settings/cross_org_visibility_api/">Cross-Org Connections API</a> para crear y administrar conexiones mediante programación.</div>

1. Asegúrese de haber iniciado sesión en la organización _fuente_ que contiene los datos que desea exponer.
1. En la [página de visibilidad entre organizaciones][6], haga clic en {{< ui >}}New Connection{{< /ui >}}. Aparece el cuadro de diálogo {{< ui >}}New Connection{{< /ui >}}.
1. En el menú desplegable, seleccione la organización de _destino_ donde desea ver los datos.
1. Haga clic en {{< ui >}}Connect{{< /ui >}}.

### Actualizar una conexión {#update-a-connection}

Actualizar una conexión entre organizaciones existente le permite cambiar los tipos de datos de la organización fuente que se comparten con la organización de destino.

1. Asegúrese de haber iniciado sesión en la organización _fuente_ de la conexión existente.
1. Pase el cursor sobre la conexión que desea actualizar. Aparece un icono de lápiz ({{< ui >}}Edit{{< /ui >}}) a la derecha.
1. Haga clic en el icono de lápiz ({{< ui >}}Edit{{< /ui >}}) en la conexión que desea actualizar. Aparece el cuadro de diálogo {{< ui >}}Edit Connection{{< /ui >}}.
1. Seleccione las casillas de verificación de los tipos de datos que desea incluir.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

### Eliminar una conexión {#delete-a-connection}

Eliminar una conexión impide que la organización de destino consulte las métricas de la organización fuente mediante consultas entre organizaciones.

1. Navegue a la [página de visibilidad entre organizaciones][6] en Organization Settings.
1. Pase el cursor sobre la conexión que desea eliminar. Aparece un icono de papelera ({{< ui >}}Delete{{< /ui >}}) a la derecha.
1. Haga clic en el icono de papelera ({{< ui >}}Delete{{< /ui >}}) en la conexión que desea eliminar. Aparece el aviso {{< ui >}}Are you sure?{{< /ui >}}.
1. Haga clic en {{< ui >}}Delete{{< /ui >}}.

### En la API {#in-the-api}

Para configurar conexiones mediante la API, consulte la [API de conexiones entre organizaciones][7].

## Crear un widget con datos entre organizaciones {#create-a-widget-with-cross-organization-data}

Los [widgets de Dashboard y Notebook][2] entre organizaciones están disponibles para las organizaciones de Datadog que existen como organización _destino_ para al menos una [conexión](#configure-connections).

Cada consulta en un widget puede mostrar datos de una sola organización. Puede combinar consultas en una consulta de fórmula entre organizaciones.

### En la UI {#in-the-ui}

Los widgets de Dashboard y Notebook le permiten crear consultas entre organizaciones cuando se cumplen las siguientes condiciones:

- Tiene habilitada la visibilidad entre organizaciones en su organización
- Existe al menos una conexión donde la organización actual es el destino

Si se cumplen las condiciones anteriores, aparece un selector desplegable de organización entre los menús desplegables para el tipo de datos y el nombre de la métrica. Utilice el selector desplegable de organización para elegir una organización fuente para su consulta.

La siguiente captura de pantalla muestra un ejemplo de una consulta de fórmula entre organizaciones. El widget grafica el número de eventos ingeridos por servicio. Para obtener el número total de eventos, la consulta de fórmula entre organizaciones suma los datos de la organización A (en la consulta **a**) y la organización B (en la consulta **b**).

{{< img src="account_management/org_settings/cross_org_visibility/cross_org_query-1.png" alt="Captura de pantalla que muestra la configuración de un widget de Dashboard con una consulta entre organizaciones" >}}

### En la API {#in-the-api-1}

<div class="alert alert-info">
El <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs">Datadog Terraform Provider</a> no admite la creación de conexiones entre organizaciones. Sin embargo, puede administrar un dashboard que contenga widgets con consultas entre organizaciones a través de Terraform exportando el dashboard a JSON.
</div>

Puede incluir datos entre organizaciones en el JSON de los widgets de Dashboard y Notebook con el campo `cross_org_uuids`. El mismo campo está disponible en los endpoints de consulta de fórmula de Metrics API:
- [Consultar datos de series temporales en múltiples productos][8]
- [Consultar datos escalares en múltiples productos][15]

Cuando defina un widget en Dashboard API o envíe una solicitud de consulta de fórmula de Metrics API, utilice el parámetro `cross_org_uuids` en cada objeto de consulta. El parámetro identifica la organización fuente en una consulta entre organizaciones.

El parámetro `cross_org_uuids` es opcional. Si omite `cross_org_uuids`, la consulta se ejecuta en la misma organización en la que definió el widget.

### Ejemplo de definición de widget JSON {#example-json-widget-definition}

{{< highlight json "hl_lines=21 27" >}}
{
    "viz": "timeseries",
    "requests": [
        {
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            },
            "type": "line",
            "formulas": [
                {
                    "formula": "query2 + query1"
                }
            ],
            "queries": [
                {
                    "name": "query2",
                    "data_source": "metrics",
                    "query": "sum:datadog.estimated_usage.events.ingested_events{env:prod} by {service}.as_count()",
                    "cross_org_uuids": ["6434abde-xxxx-yyyy-zzzz-da7ad0900001"]
                },
                {
                    "name": "query1",
                    "data_source": "metrics",
                    "query": "sum:datadog.estimated_usage.events.ingested_events{env:prod} by {service}.as_count()",
                    "cross_org_uuids": ["74edde28-xxxx-yyyy-zzzz-da7ad0900001"]
                }
            ],
            "response_format": "timeseries"
        }
    ]
}
{{< /highlight >}}

Observe el parámetro `cross_org_uuids` en la carga útil de la definición del widget JSON.
- Este parámetro es opcional. Si se omite, la consulta se ejecuta en la organización en la que está definido el widget.
- Utilice el identificador de la organización, que puede recuperar desde el [punto de conexión Organizations][9], para identificar la organización en la que se ejecuta la consulta.
- Aunque este parámetro acepta una matriz, la matriz debe contener solo un elemento. Agregar múltiples elementos a la matriz `cross_org_uuids` resulta en un error 400.

## Permisos {#permissions}
De forma predeterminada, solo los usuarios asignados a roles con el permiso _Org Connection Read_ pueden ver la lista de conexiones entre organizaciones. Los usuarios asignados a roles con el permiso _Org Connection Write_ pueden crear y eliminar conexiones entre organizaciones.

### Controles de acceso granulares {#granular-access-controls}
Utilice [controles de acceso granulares][12] para limitar los Teams, roles o usuarios que pueden editar o consultar una conexión entre organizaciones. Estos controles de acceso rigen:
- Desde la organización fuente: quién puede editar la conexión.
- Desde la organización de destino: quién puede ver los datos compartidos y quién puede editar la conexión.

Las conexiones desde la organización fuente heredan los permisos de acceso a datos del creador de la conexión. Si al creador se le restringe la visualización de cualquier dato mediante [Data Access Control][13] o [Log Restriction Queries][14], estos datos no serán accesibles desde la organización de destino. Si la cuenta del creador se desactiva, la conexión se elimina. Esto interrumpe el flujo de datos pero no crea un riesgo de seguridad: eliminar una conexión no elimina las restricciones de acceso.

**Nota:** Las conexiones creadas desde organizaciones habilitadas para HIPAA pueden permitir el intercambio de información de salud protegida (PHI) con organizaciones de destino. Los clientes son responsables de cualquier dato sensible transferido, incluida la PHI.

1. Vaya a la [página de visibilidad entre organizaciones][6] en Organization Settings.
1. Coloque el cursor sobre la conexión entre organizaciones en la que desea establecer permisos granulares. Los iconos {{< ui >}}Permissions{{< /ui >}} y {{< ui >}}Delete{{< /ui >}} aparecen a la derecha.
1. Haga clic en el icono de candado ({{< ui >}}Permissions{{< /ui >}}).
1. Seleccione {{< ui >}}Restrict Access{{< /ui >}}.
1. El cuadro de diálogo se actualiza para mostrar que los miembros de su organización tienen acceso {{< ui >}}Viewer{{< /ui >}} de forma predeterminada.
1. Use el menú desplegable para seleccionar uno o más Teams, roles o usuarios que puedan editar la conexión entre organizaciones.
1. Haga clic en {{< ui >}}Add{{< /ui >}}.
1. El cuadro de diálogo se actualiza para mostrar que el rol que seleccionó tiene el permiso {{< ui >}}Editor{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

**Nota**: Para mantener su acceso de edición a la conexión entre organizaciones, el sistema requiere que incluya al menos un rol o equipo del que usted sea miembro antes de guardar.

Para restaurar el acceso general a una conexión entre organizaciones con acceso restringido, siga los pasos a continuación:

1. En la página de visibilidad entre organizaciones, coloque el cursor sobre la conexión entre organizaciones a la que desea restaurar el acceso general. Los iconos {{< ui >}}Permissions{{< /ui >}} y {{< ui >}}Delete{{< /ui >}} aparecen a la derecha.
1. Haga clic en el icono de candado ({{< ui >}}Permissions{{< /ui >}}).
1. Haga clic en {{< ui >}}Restore Full Access{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

[1]: /es/account_management/multi_organization/
[2]: /es/dashboards/widgets
[3]: /es/metrics/custom_metrics/#overview
[4]: /es/tracing/metrics/metrics_namespace/
[5]: /es/logs/log_configuration/logs_to_metrics/
[6]: https://app.datadoghq.com/organization-settings/cross-org-visibility
[7]: /es/account_management/org_settings/cross_org_visibility_api
[8]: /es/api/latest/metrics/#query-timeseries-data-across-multiple-products
[9]: /es/api/latest/organizations/#list-your-managed-organizations
[10]: /es/dashboards/sharing/shared_dashboards/#public-shared-dashboards
[11]: /es/getting_started/site
[12]: /es/account_management/rbac/granular_access
[13]: /es/account_management/rbac/data_access/
[14]: /es/logs/guide/logs-rbac-permissions/?tab=ui#create-a-restriction-query
[15]: /es/api/latest/metrics/#query-scalar-data-across-multiple-products