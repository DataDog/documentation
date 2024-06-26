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

La widget de imagen te permite integrar una imagen en tu dashboard. Una imagen puede ser un PNG, JPG o GIF animado, alojada en un lugar accesible para la URL.

{{< img src="dashboards/widgets/image/image.mp4" alt="Imagen" video="true" style="width:80%;" >}}

## Configuración

{{< img src="dashboards/widgets/image/image_setup.png" alt="Configuración de imagen" style="width:80%;">}}

1. Introduce la URL de tu imagen.
2. Elige una apariencia:
    * Ampliar la imagen para cubrir todo el título
    * Ajustar imagen en el cuadro
    * Centrar imagen en el cuadro

## API

Este widget puede utilizarse con la **[API de dashboards][1]**. Consulta la siguiente tabla para la [definición del esquema de widget JSON][2]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/dashboards/
[2]: /es/dashboards/graphing_json/widget_json/