---
algolia:
  tags:
  - Flujo de eventos
  - flujo de logs
description: Muestra listas filtrables de eventos y problemas de logs, RUM, eventos
  y otras fuentes en widgets de dashboard.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
- link: /notebooks/
  tag: Documentación
  text: Notebooks
title: Widget de lista
widget_type: list_stream
---

El widget de lista muestra una lista de eventos y problemas, que pueden proceder de diversas fuentes como Logs, RUM, o Events. Buscar y realizar consultas entre las fuentes para delimitar los eventos que deseas que el widget destaque y muestre.

_Widget de lista que muestra los problemas de seguimiento de errores_.

{{< img src="dashboards/widgets/list/list_overview.png" alt="Widget de lista que muestra una lista de errores, su recuento de errores y volumen." style="width:50%;">}}

## Configuración

{{< img src="dashboards/widgets/list/list_setup.png" alt="Modalidad de configuración del widget de lista" style="width:100%;">}}

### Configuración

1. Elige el tipo de datos para graficar. Puedes crear un widget de lista a partir de Issues, Logs, Audit Trail, Watchdog Alerts o Events en función de los productos disponibles para tu organización.

2. Establece las preferencias de visualización. En los screenboards y notebooks, elige si tu widget tiene un marco temporal personalizado o utiliza el marco temporal global.

3. Opcional: da un título a tu gráfico (o deja en blanco el título sugerido).

### Opciones

Cada tipo de widget de lista tiene su propia configuración.

### Problemas

#### Clasificación por

Para problemas, puedes clasificar por:

* Número de errores (por defecto)
* Visto por primera vez
* Sesiones afectadas

**Nota:** Cambiar la selección de "Ordenar por" no cambia las columnas mostradas. Si cambias tu lista para ordenar por sesiones afectadas, y quieres ver esto en tu widget, también debes seleccionar o añadir "Sesiones afectadas" al editor de gráficos.

### Logs

#### Agrupación por

En logs, puedes agrupar por:

* Patrones
* Transacciones

### Opciones de lista de evento RUM

#### Clasificación por

Para RUM, puedes clasificar por:

* Tipo de sesión
* Tiempo empleado
* Ver recuento
* Recuento de errores
* Recuento de acciones
* Recuento de frustraciones de la sesión
* Nombre de la vista inicial
* Último nombre de la vista

Ascendente o descendente

### Eventos

#### Tamaño del formato del informe:

En Events, puedes elegir cómo se muestran en el widget:

* Pequeño (solo título)
* Grande (evento completo)

### Incidentes

#### Clasificación por

Para incidentes, puedes clasificar por:

* Hora de creación
* Gravedad
* Estado

Ascendente o descendente

### Despliegues CD

#### Clasificación por

Para despliegues CD, puedes clasificar por:

* Estado del despliegue
* Servicio
* Nombre del despliegue
* Entorno
* Duración
* Valor de revisión
* URL del repositorio
* Marca de tiempo

Ascendente o descendente

### Pipelines CI

#### Clasificación por

Para pipelines CI, puedes clasificar por:

* Estado de CI
* Nombre del pipeline
* Duración
* ID del pipeline
* Rama
* Marca de tiempo

Ascendente o descendente

## API

Este widget se puede utilizar con la **[API de dashboards][1]**. Consulta la siguiente tabla para obtener la [definición del esquema JSON del widget)][2]:

{{< dashboards-widgets-api >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/dashboards/
[2]: /es/dashboards/graphing_json/widget_json/