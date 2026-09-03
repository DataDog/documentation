---
algolia:
  tags:
  - cross org
  - cross-org
  - entre organizaciones
description: Comparte datos y realiza consultas entre distintas organizaciones en
  la misma cuenta.
title: Visibilidad entre organizaciones
---

## Información general

Algunas empresas recurren a varias [organizaciones][1] de Datadog para separar los datos por motivos de cumplimiento u otros.

La visibilidad entre organizaciones permite a los clientes compartir datos entre diferentes organizaciones en la misma cuenta y mostrar información de varias organizaciones en un solo lugar.

En este documento, se explica lo siguiente: 
- Qué [permite] la visibilidad entre organizaciones (#capabilities) 
- Cómo [compartir](#create-a-connection) datos en todas tus organizaciones
- Cómo crear un [widget de Dashboard and notebook](#create-a-widget-with-cross-organization-data) con datos de tus otras organizaciones

## Funcionalidades

### Conexión de la organización

Una organización _fuente_ expone datos a una organización _destino_ a través de una _conexión de organización_. Una organización source (fuente) puede tener varios destinos y una organización de destino puede tener varias fuentes.

Las siguientes limitaciones se aplican a las conexiones de la organización:
- Las organizaciones source (fuente) y de destino deben estar en la misma [cuenta][1]
- Las organizaciones source (fuente) y de destino deben estar en el mismo [sitio][11].
- Las organizaciones no empresariales pueden compartir con un máximo de otras 5 organizaciones.

**Nota**: Una vez establecida la connection (conexión), la organización de destino puede consultar los datos de la organización source (fuente) de la misma manera que puede consultar sus propios datos. Esto significa que los datos de la organización source (fuente), incluidos los datos confidenciales, pueden consultarse y mostrarse según lo permita el control de acceso y otros ajustes de la _organización de destino_. Esto puede incluir, por ejemplo, la capacidad de la organización de destino para crear [Dashboards públicos][10] utilizando los datos de la organización source (fuente), incluso si los propios ajustes de la organización source (fuente) no permiten la creación de Dashboards públicos.

Después de configurar una connection (conexión) de la organización, los datos expuestos siguen almacenados en la organización source (fuente) y no se trasladan al destino. En su lugar, la organización de destino consulta los datos desde source (fuente). Las conexiones no duplican los datos y no incurren en gastos adicionales. La organización de destino puede consultar los datos de source (fuente) a partir de cualquier intervalo de tiempo admitido por los datos de source (fuente), incluso antes de la fecha de creación de la connection (conexión). Si eliminas la connection (conexión), el destino ya no podrá acceder a ningún dato de source (fuente) y es posible que las consultas o los Dashboards creados a partir de los datos de la organización source (fuente) dejen de funcionar.

### Contexto

La visibilidad entre organizaciones admite la siguiente telemetría en [widgets de Dashboard y notebook][2]:
* Métricas (todos los tipos admitidos, incluidas [métricas personalizadas][3], [métricas de traces (trazas)][4] y [métricas generadas a partir de logs][5])
* Logs
* Pipelines de CI Visibility
* Tests de Test Optimization (optimización de tests)

## Configurar conexiones

### Lista de conexiones

Para examinar las conexiones, ve a la [página de visibilidad entre organizaciones][6] en Parámetros de organización. La tabla enumera todas tus conexiones entre organizaciones.

### Crear una connection (conexión)

La creación de una conexión entre organizaciones permite consultar métricas desde la organización de origen en la organización de destino.

1. Asegúrate de haber iniciado sesión en la organización _fuente_ que contiene los datos que deseas exponer.
1. En la [página de visibilidad entre organizaciones][6], haz clic en **New Connection** (Nueva conexión). Aparece el cuadro de diálogo **New Connection** (Nueva conexión).
1. En el menú desplegable, selecciona la organización _de destino_ en la que deseas ver los datos.
1. Haz clic en **Connect** (Conectar).

### Actualizar una conexión

La actualización de una connection (conexión) existente entre organizaciones te permite cambiar los tipos de datos que se comparten desde la organización source (fuente) en la organización de destino.

1. Asegúrate de haber iniciado sesión en la organización _source (fuente)_ de la connection (conexión) existente.
1. Pasa el ratón sobre la connection (conexión) que desees actualizar. Aparecerá un icono de lápiz (**Edit**) (Editar) a la derecha.
1. Haz clic en el icono del lápiz (**Edit**) (Editar) sobre la connection (conexión) que desees actualizar. Aparecerá el cuadro de diálogo **Edit Connection** (Editar connection (conexión).
1. Selecciona las casillas de verificación de los tipos de datos que desees incluir.
1. Haz clic en **Save** (Guardar).

### Eliminar una connection (conexión)

Al eliminar una conexión, se desactiva la consulta entre organizaciones desde la organización de destino de las métricas de la organización de origen.

1. Ve a la [página de visibilidad entre organizaciones][6] en Parámetros de organización.
1. Sitúa el cursor sobre la connection (conexión) que deseas eliminar. Aparecerá un icono de la papelera (**Eliminar**) a la derecha.
1. Haz clic en el icono de la papelera (**Eliminar**) sobre la connection (conexión) que deseas suprimir. Aparecerá el mensaje **Are you sure?** (¿Estás seguro?).
1. Haz clic en **Delete** (Borrar).

### En la API

Para Configurar conexiones mediante la API, consulta la [API de conexiones entre organizaciones][7].

## Crear una widget con datos entre organizaciones

Los [widgets de dashboard y notebook][2] entre organizaciones están disponibles para las organizaciones de Datadog que existen como organización _de destino_ para al menos una [conexión](#configure-connections).

Cada consulta en un widget puede mostrar datos de una sola organización. Puedes combinar consultas en una fórmula de consulta entre organizaciones.

### En la interfaz de usuario

Los widgets de dashboard y notebook te permiten crear consultas entre organizaciones cuando se cumplen las siguientes condiciones:

- Tienes habilitada la visibilidad entre organizaciones en tu organización
- Existe al menos una connection (conexión) en la que la organización actual es el destino

Si se cumplen las condiciones anteriores, aparecerá un selector desplegable de organización entre los menús desplegables de tipo de datos y nombre de métrica. Utiliza el selector desplegable de organización para elegir una organización source (fuente) para tu consulta.

En la siguiente captura de pantalla, se muestra un ejemplo de consulta de fórmula entre organizaciones. El widget representa gráficamente el número de eventos incorporados por servicio. Para obtener el número total de eventos, la fórmula de consulta entre organizaciones suma los datos de la organización A (en la consulta **a**) y la organización B (en la consulta **b**).

{{< img src="account_management/org_settings/cross_org_visibility/cross_org_query-1.png" alt="Captura de pantalla que muestra la configuración de un widget de dashboard con una consulta entre organizaciones" >}}

### En la API

<div class="alert alert-info">
El <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs">proveedor Terraform de Datadog </a> no admite la creación de conexiones entre organizaciones. Sin embargo, puedes gestionar un dashboard que contenga widgets con consultas entre organizaciones a través de Terraform exportando el dashboard a JSON.
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
- Aunque este parámetro acepta una matriz, esta debe contener un solo elemento. Si se añaden varios elementos a la matriz `cross_org_uuids`, se produce un error 400.

## Permisos
En forma predeterminada, solo los usuarios asociados a roles con el permiso _Lectura de connection (conexión) de organizaciones_ pueden ver la lista de conexiones entre organizaciones. Los usuarios asociados a roles con el permiso _Escritura de connection (conexión) de organizaciones_ pueden crear y eliminar conexiones entre organizaciones. 

### Controles de acceso detallados
Utiliza [controles de acceso granular][12] para limitar los equipos, roles o usuarios que pueden editar o consultar una connection (conexión) entre organizaciones. Estos controles de acceso rigen:
- Desde la organización source (fuente): quién puede editar la connection (conexión).
- Desde la organización de destino: quién puede ver los datos compartidos y quién puede editar la connection (conexión).

Las conexiones desde la organización source (fuente) heredan los permisos de acceso a los datos del creador de la connection (conexión). Si el creador tiene restringido el acceso a los datos mediante [Control de acceso a datos][13] o [Consultas de restricción de logs][14], estos datos no son accesibles desde la organización de destino. 

**Nota:** Las conexiones creadas desde organizaciones habilitadas por la HIPAA pueden permitir el intercambio de información sanitaria protegida (PHI) con las organizaciones de destino. Los clientes son responsables de cualquier dato confidencial transferido, incluida la PHI.

1. Ve a la [página de visibilidad entre organizaciones][6] en Parámetros de organización.
1. Pasa el ratón sobre la connection (conexión) entre organizaciones en la que deseas establecer permisos granulares. Los iconos **Permissions** (Permisos) y **Delete** (Borrar) aparecen a la derecha.
1. Haz clic en el icono del candado (**Permissions**) (Permisos).
1. Selecciona **Restrict Access** (Restringir el acceso).
1. El cuadro de diálogo se actualiza para mostrar que los miembros de tu organización tienen por omisión el permiso de acceso **Viewer** (Visualización).
1. Utiliza el menú desplegable para seleccionar uno o más equipos, roles o usuarios que puedan editar la connection (conexión) entre organizaciones.
1. Haz clic en **Add** (Añadir).
1. El cuadro de diálogo se actualiza para indicar que el rol que has seleccionado tiene el permiso **Editor** (Edición).
1. Haz clic en **Save** (Guardar).

**Nota**: Para mantener tu acceso de edición a la connection (conexión) entre organizaciones, el sistema requiere que incluyas al menos un rol o equipo del que seas miembro antes de guardar.

Para restaurar el acceso general a una connection (conexión) entre organizaciones con acceso restringido, sigue los pasos que se indican a continuación:

1. En la page (página) de visibilidad entre organizaciones, pasa el ratón sobre la connection (conexión) entre organizaciones a la que deseas restaurar el acceso general. Los iconos **Permissions** (Permisos) y **Delete** (Borrar) aparecen a la derecha.
1. Haz clic en el icono del candado (**Permissions**) (Permisos).
1. Haz clic en **Restore Full Access** (Restablecer acceso completo).
1. Haz clic en **Save** (Guardar).

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