---
is_beta: true
private: true
title: Visibilidad entre organizaciones
---

{{< callout url="#" header="false" btn_hidden="true">}}
  La visibilidad entre organizaciones está en <strong>fase beta privada</strong> para los clientes con planes Enterprise. Si estás interesado en tener esta función, ponte en contacto con tu gestor técnico de cuentas o gestor de éxito del cliente.
{{< /callout >}} 


## Información general

Algunas empresas recurren a varias [organizaciones][1] de Datadog para aislar los datos por motivos de conformidad u otros.

La visibilidad entre organizaciones permite a los clientes compartir datos entre diferentes organizaciones en la misma cuenta y mostrar información de varias organizaciones en un solo lugar.

En este documento, se explica lo siguiente: 
- Qué [permite] la visibilidad entre organizaciones (#capabilities) 
- Cómo [exponer](#create-a-connection) datos entre organizaciones
- Cómo crear un [widget de dashboard y notebook](#create-a-widget-with-cross-organization-data) con datos de otras organizaciones

## Funcionalidades

### Conexión de la organización

Una organización _de origen_ expone datos a una organización _de destino_ a través de una _conexión de organización_. Las organizaciones de Datadog de origen y de destino deben estar en la misma [cuenta][1]. Una organización de origen puede tener varios destinos, y una organización de destino puede tener varios orígenes.

Después de configurar una conexión de organización, los datos expuestos siguen viviendo en la organización de origen y no se mueven al destino. En su lugar, la organización de destino consulta los datos desde el origen. Las conexiones no duplican los datos y no incurren en gastos adicionales. La organización de destino puede consultar los datos de origen desde cualquier intervalo de tiempo admitido por los datos de origen, incluso antes de la fecha de creación de la conexión. Si eliminas la conexión, el destino ya no podrá acceder a ningún dato del origen.

### Contexto

La visibilidad entre organizaciones admite la telemetría de métricas en [widgets de dashboard y notebook] privados[2].

Se admiten todos los tipos de métricas, incluidas [métricas personalizadas][3], [métricas de trazas][4] y [métricas generadas a partir de logs][5].

## Configurar conexiones

### Lista de conexiones

Para examinar las conexiones, ve a la [página de visibilidad entre organizaciones][6] en Parámetros de organización. La tabla enumera todas tus conexiones entre organizaciones.

### Crear una conexión

La creación de una conexión entre organizaciones permite consultar métricas desde la organización de origen en la organización de destino.

1. Asegúrate de haber iniciado sesión en la organización _de origen_ que contiene los datos que deseas exponer.
1. En la [página de visibilidad entre organizaciones][6], haz clic en **New Connection** (Nueva conexión). Aparece el cuadro de diálogo **New Connection** (Nueva conexión).
1. En el menú desplegable, selecciona la organización _de destino_ en la que deseas ver los datos.
1. Haz clic en **Connect** (Conectar).

### Eliminar una conexión

Al eliminar una conexión, se desactiva la consulta entre organizaciones desde la organización de destino de las métricas de la organización de origen.

1. Navega hasta la [página de visibilidad entre organizaciones][6] en Parámetros de organización.
1. Sitúa el cursor sobre la conexión que deseas eliminar. Aparecerá un icono de papelera (**Eliminar**) a la derecha.
1. Haz clic en el icono de la papelera (**Eliminar**) sobre la conexión que deseas suprimir. Aparecerá el mensaje **Are you sure?** (¿Estás seguro?).
1. Haz clic en **Eliminar**.

### En la API

Para Configurar conexiones mediante la API, consulta la [API de conexiones entre organizaciones][7].

## Crear una widget con datos entre organizaciones

Los [widgets de dashboard y notebook][2] entre organizaciones están disponibles para las organizaciones de Datadog que existen como organización _de destino_ para al menos una [conexión](#configure-connections).

Cada consulta en un widget puede mostrar datos de una sola organización. Puedes combinar consultas en una fórmula de consulta entre organizaciones.

### En la interfaz de usuario

Los widgets de dashboard y notebook te permiten crear consultas entre organizaciones cuando se cumplen las siguientes condiciones:

- Tienes habilitada la visibilidad entre organizaciones en tu organización
- Existe al menos una conexión en la que la organización actual es el destino

Si se cumplen las condiciones anteriores, aparecerá un selector desplegable de organización entre los menús desplegables de tipo de datos y nombre de métrica. Utiliza el selector desplegable de organización para elegir una organización de origen para tu consulta.

En la siguiente captura de pantalla, se muestra un ejemplo de consulta de fórmula entre organizaciones. El widget representa gráficamente el número de eventos incorporados por servicio. Para obtener el número total de eventos, la fórmula de consulta entre organizaciones suma los datos de la organización A (en la consulta **a**) y la organización B (en la consulta **b**).

{{< img src="account_management/org_settings/cross_org_visibility/cross_org_query.png" alt="Captura de pantalla que muestra la configuración de un widget de dashboard con una consulta entre organizaciones" >}}

### En la API

<div class="alert alert-info">
El <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs">proveedor de Datadog Terraform</a> no admite consultas entre organizaciones.
</div>

Puedes definir consultas entre organizaciones en el siguiente endpoint:
- [Series temporales][8]

Cuando definas un widget en la API de dashboard, utiliza el parámetro `cross_org_uuids` en la carga de definición del widget de JSON, con el fin de identificar la organización de origen en una consulta entre organizaciones.

El parámetro `cross_org_uuids` es opcional. Si omites `cross_org_uuids`, la consulta se ejecuta en la misma organización en la que definiste el widget.

### Ejemplo de definición de widget de JSON

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

Observa el parámetro `cross_org_uuids` en la carga de la definición del widget de JSON.
- Este parámetro es opcional. Si se omite, la consulta se ejecuta en la organización en la que se ha definido el widget.
- Utiliza el identificador de organización, que puedes recuperar del [endpoint Organizaciones][9], para identificar la organización en la que se ejecuta la consulta.
- Aunque este parámetro acepta una matriz, ésta debe contener un solo elemento. Si se añaden varios elementos a la matriz `cross_org_uuids`, se produce un error 400.

[1]: /es/account_management/multi_organization/
[2]: /es/dashboards/widgets
[3]: /es/metrics/custom_metrics/#overview
[4]: /es/tracing/metrics/metrics_namespace/
[5]: /es/logs/log_configuration/logs_to_metrics/
[6]: https://app.datadoghq.com/organization-settings/cross-org-visibility
[7]: /es/account_management/org_settings/cross_org_visibility_api
[8]: /es/api/latest/metrics/#query-timeseries-data-across-multiple-products
[9]: /es/api/latest/organizations/#list-your-managed-organizations