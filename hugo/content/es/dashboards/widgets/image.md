---
aliases:
- /es/graphing/widgets/image/
description: Incluye una imagen o un gif en tus dashboards de Datadog.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
title: Widget de imagen
widget_type: imagen
---

El widget de imagen te permite integrar una imagen en tu dashboard. Una imagen puede subirse a Datadog o alojarse donde pueda accederse a ella por URL. Se admiten los formatos de archivo PNG, JPG y GIF.

{{< img src="dashboards/widgets/image/image.mp4" alt="Imagen" video="true" style="width:80%;" >}}

## Configuración

{{< img src="dashboards/widgets/image/image_setup2.png" alt="Configuración de imagen" style="width:80%;">}}

1. Sube tu imagen o introduce la URL de tu imagen.
2. Selecciona una plantilla predefinida o personaliza las opciones de visualización.

## API

Este widget se puede utilizar con la **[API de dashboards][1]**. Consulta la siguiente tabla para obtener la [definición del esquema JSON del widget)][2]:

{{< dashboards-widgets-api >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/dashboards/
[2]: /es/dashboards/graphing_json/widget_json/