---
title: Seguimiento de esquemas
---

{{% site-region region="gov,ap1" %}}
<div class="alert alert-danger">
Data Streams Monitoring no está disponible para el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

<div class="alert alert-info">El Seguimiento de esquemas está en <b>fase beta</b> para los servicios Java que utilizan Protobuf y Avro. Si te interesan otros lenguajes y esquemas, ponte en contacto <a href="https://www.datadoghq.com/private-beta/schema-tracking/">aquí</a>. </div>

Data Streams Monitoring proporciona una visibilidad de los esquemas utilizados por productores y consumidores y de cómo los problemas de esquema afectan a los servicios posteriores. Puedes realizar un seguimiento de los nuevos esquemas añadidos, los esquemas con errores y las evoluciones de esquemas para gestionar las migraciones de esquemas e identificar problemas.

Cambiar un esquema producido por un servicio sin actualizar el consumidor puede provocar que el consumidor tenga problemas para procesar cargas útiles, bloqueando el flujo de datos aguas abajo. Comprender los cambios de esquema garantiza la compatibilidad de los datos entre productores y consumidores y, en última instancia, evita problemas.

## Requisitos previos

Debes tener [Data Streams Monitoring instalado][1] en tus servicios de productores y consumidores Java.

El seguimiento de esquemas requiere la versión v1.36.0 o posterior de [dd-trace-java][2] para Protobuf o Avro.

## Ver esquemas

### Lista de esquemas

En la [lista de esquemas][3], puedes ver todos los esquemas utilizados en tus pipelines.

{{< img src="data_streams/schema_list.png" alt="Vista de lista de los tres esquemas" style="width:100%;" >}}

Para cada esquema, la tabla muestra lo siguiente:
- Tipo
- Nombre
- Primera y última vez que fue visto
- Índice de producción, índice de consumo y el índice de error en el intervalo de tiempo seleccionado
- Todos los productores y consumidores del esquema
- Demora del consumidor: demora máxima de Kafka para todos los consumidores de un esquema específico

Al seleccionar un esquema en la lista se muestra el rendimiento del esquema por servicio, los errores por servicio y el esquema completo.

{{< img src="data_streams/schema_panel.png" alt="Vista de lista de esquemas con un panel lateral abierto que muestra información detallada de un esquema" style="width:100%;" >}}

Sigue estos pasos para ver información detallada de un esquema:
1. Ve a [Data Streams Monitoring][4].
1. Haz clic en la pestaña **Esquemas**.
1. Selecciona el intervalo de tiempo.
1. Utiliza los filtros rápidos para filtrar los esquemas nuevos (vistos por primera vez en las últimas 3 horas), los esquemas con altos índices de error o los esquemas activos.
1. Seleccione un esquema. Se abre un panel lateral con información detallada de ese esquema.

### A nivel de servicio 

Para cada servicio que rastrees en Data Streams Monitoring, puedes ver información sobre los esquemas que utiliza.

Para ver la información del esquema a nivel de servicio:
1. Ve a [Data Streams Monitoring][4].
1. Asegúrate de que está seleccionada la pestaña **Explorar**.
1. Haz clic en un servicio. Aparecerá el panel lateral con los detalles del servicio.
1. Selecciona la pestaña **Esquemas**.

En la pestaña Esquemas, puedes:
- Ver el rendimiento de entrada por esquema.
- Ver la lista de todos los esquemas detectados en el intervalo de tiempo seleccionado, junto con la primera y la última vez que se vieron, su tipo (esquema de entrada o de salida), el índice de error y el rendimiento.
- Expande un esquema para ver todos sus campos.

[1]: /es/data_streams/java/
[2]: https://github.com/DataDog/dd-trace-java
[3]: https://app.datadoghq.com/data-streams/schemas
[4]: https://app.datadoghq.com/data-streams/