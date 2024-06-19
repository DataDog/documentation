---
disable_toc: false
further_reading:
- link: /dashboards/guide/powerpacks-best-practices/
  tag: Guía
  text: Expertos en gráficos a escala con Powerpacks
- link: https://www.datadoghq.com/blog/standardize-dashboards-powerpacks-datadog/
  tag: Blog
  text: Guarda los widgets de dashboard en grupos reutilizables con Powerpacks
- link: /dashboards/widgets/group/
  tag: Documentación
  text: Widget de grupo
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
title: Widget Powerpack
---

## Información general

<div class="alert alert-info">Los widgets Powerpack no son compatibles con screenboards.</div>

Los Powerpacks son grupos de widgets con plantillas que escalan la experiencia gráfica como bloques de construcción de cuadros de mando reutilizables. Los Powerpacks pueden ser preestablecidos (creados por Datadog, disponibles para todos los clientes) o personalizados (creados por un usuario y solo disponibles dentro de tu organización). Para obtener más información sobre las mejores prácticas de Powerpack, consulta la guía [Scale Graphing expertise with Powerpacks (Experiencia en gráficos a escala con Powerpacks)][1].

## Configuración

### Creación de un Powerpack

Crear un Powerpack a partir de un grupo existente en dashboard: 

{{< img src="dashboards/widgets/powerpack/group_header_icons.png" alt="Iconos de la cabecera del grupo del dashboard que elevan la opción Guardar como icono de Powerpack." style="width:80%;" >}}

1. En la cabecera de un grupo dashboard, haz clic en el icono "Guardar como Powerpack". 
1. Rellena los datos para que tu organización pueda descubrir el Powerpack. 
1. Añade etiquetas (tags) en "Añadir categorías de búsqueda" para organizar tus Powerpacks. Esto permite a los miembros del equipo encontrar el Powerpack correcto para añadir a su dashboard.
1. Elige qué filtros deben ser configurables para los usuarios del Powerpack. 

**Nota**: Después de crear un Powerpack, el grupo original se sustituye por una instancia del Powerpack.

### Actualización de un Powerpack

Los cambios realizados en un Powerpack se sincronizan en todos los dashboards en los que se utilice el Powerpack.

Para modificar el aspecto o el diseño de un Powerpack:
1. Pasa el cursor por encima de la cabecera y haz clic en el menú kebab.
1. Selecciona **Edit Powerpack Layout** (Editar diseño de Powerpack) en el menú Acciones de Powerpack.
1. Realiza los cambios que desees en el diseño del Powerpack o en cualquier widget individual y selecciona **Confirm Changes** (Confirmar cambios).
1. Si este Powerpack se utiliza en varios dashboards, se abrirá un mensaje para verificar las instancias del Powerpack afectadas por esta actualización.

{{< img src="dashboards/widgets/powerpack/powerpack_actions_menu.png" alt="Opciones del menú de acciones para actualizar un Powerpack y la instancia Powerpack a la que se accede a través de kebab en la cabecera del Powerpack." style="width:80%;" >}}

Para realizar cambios en los Detalles del Powerpack:
1. Pasa el cursor por encima de la cabecera y haz clic en el menú kebab.
1. Selecciona **Edit Powerpack Details** (Editar detalles del Powerpack) en el menú Acciones del Powerpack.
1. Realiza cambios en la información de Powerpack, en las categorías de búsqueda o en el filtro configuración y selecciona **Update Powerpack** (Actualizar Powerpack).
1. Si este Powerpack se utiliza en varios dashboards, se abrirá un mensaje para verificar las instancias del Powerpack afectadas por esta actualización.

**Nota**: Debes tener [edit permissions (permisos de edición)](#powerpack-permissions) para realizar cualquier actualización en el Powerpack o para modificar los permisos.

## Utilizar Powerpacks

### Añadir una instancia Powerpack
Después de crear un Powerpack, puedes añadir una instancia de ese Powerpack a múltiples dashboards.

Para añadir una instancia de Powerpack al dashboard:
1. Haz clic en la pestaña "Powerpacks" de la bandeja widget para encontrar los Powerpacks disponibles. Puedes buscar con texto, así como las etiquetas predefinidas. 
1. Haz clic en el Powerpack que desees añadir a tu dashboard para abrir la configuración de la instancia del Powerpack.
1. Selecciona los valores de los filtros y cómo se controlan.
    * Filtros Powerpack - el valor seleccionado se aplica a widgets dentro de la instancia Powerpack.
    * Filtros de dashboard - controlados por variables de plantilla de dashboard.
1. Haz clic en **Confirm** (Confirmar). 

### Personalizar una instancia de Powerpack

Los cambios en una instancia de Powerpack **no** se aplican a otras instancias de Powerpack en otros dashboards. 

Para personalizar las instancias de Powerpack que aparecen en su dashboard:
1. Haz clic en el menú kebab de la cabecera de la instancia.
1. Selecciona **Edit Display Options** (Editar opciones de visualización) en el menú Acciones de la instancia.
1. Elige nuevas opciones de estilo para la cabecera, actualiza el título del grupo o configura los filtros utilizados por tu Powerpack.
1. Configurar los valores de etiqueta de tu instancia Powerpack. Verifica **Add to dashboard** (Añadir a dashboard), para utilizar esto como una variable de plantilla de dashboard.

{{< img src="dashboards/widgets/powerpack/instance_configuration_modal.png" alt="Opciones de configuración de una instancia de Powerpack" style="width:100%;" >}}

## Permisos Powerpack

Para realizar cambios en los permisos de edición de un Powerpack:
1. Pasa el cursor por encima de la cabecera y haz clic en el menú kebab.
1. Selecciona **Modify Permissions** (Modificar permisos) en el menú Acciones de Powerpack.
1. Actualizar qué usuarios tienen permisos de edición para el Powerpack.

## API

Este widget puede utilizarse con la **[API de dashboards][2]**. Ve la siguiente tabla para la [definición de esquema de JSON de widget][3]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/guide/powerpacks-best-practices/
[2]: /es/api/latest/dashboards/
[3]: /es/dashboards/graphing_json/widget_json/