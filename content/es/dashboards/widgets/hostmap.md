---
aliases:
- /es/graphing/widgets/hostmap/
description: Visualiza el mapa de host de Datadog en tus dashboards.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
kind: documentación
title: Widget del mapa de host
widget_type: Mapa de host
---

El widget del mapa de host representa gráficamente cualquier métrica a través de tus hosts utilizando la misma visualización disponible en la página principal del [Mapa de host][1]:

{{< img src="dashboards/widgets/hostmap/hostmap.png" alt="Mapa de host" >}}

## Configuración

{{< img src="dashboards/widgets/hostmap/hostmap_setup.png" alt="Configuración del Mapa de host" >}}

### Configuración

La configuración del widget de mapa de host es similar a la página principal del [mapa de host][1]:

1. **Tipo**: elige mostrar `hosts` o `containers`.
2. **Filtrar por**: elige los hosts o contenedores que deseas visualizar.
3. **Agrupar por**: agrupa tus hosts o contenedores por una o varias etiquetas (tags).
4. **Rellenar por**: elige una métrica para rellenar tus elementos del mapa de host o contenedor.
5. **Tamaño por** (opcional): elige una métrica para dimensionar tus elementos del mapa de host o contenedor.
6. **Paleta** (opcional): elige una paleta de colores.
7. **Valores** (opcional): define los valores mínimo y máximo de relleno de la paleta de colores.

**Nota**: La búsqueda de texto libre no está disponible para el widget de mapa de host.

### Opciones

#### Enlaces contextuales

Los [enlaces contextuales][2] están activados por defecto; puedes activarlos o desactivarlos. Los enlaces contextuales conectan widgets de dashboard con otras páginas (en Datadog o páginas de terceros).

## API

Este widget puede utilizarse con la **[API de dashboards][3]**. Consulta la siguiente tabla para la [definición del esquema de widget JSON][4]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/infrastructure/hostmap/
[2]: /es/dashboards/guide/context-links/
[3]: /es/api/latest/dashboards/
[4]: /es/dashboards/graphing_json/widget_json/