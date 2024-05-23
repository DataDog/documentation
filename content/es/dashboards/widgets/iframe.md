---
aliases:
- /es/graphing/widgets/iframe/
description: Incluye un Iframe en tus dashboards de Datadog.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
kind: documentación
title: Widget Iframe
widget_type: iframe
---

Un marco en línea (iframe) es un elemento HTML que carga otra página HTML dentro del documento. El widget de iframe te permite integrar un fragmento de cualquier otra página web en tu dashboard.

## Configuración

{{< img src="dashboards/widgets/iframe/iframe_setup.png" alt="Configuración de Iframe" style="width:80%;">}}

Introduce la URL de la página que deseas mostrar dentro del iframe. Si no utilizas una URL HTTPS, es posible que debas configurar tu navegador para permitir contenido no seguro.

## API

Este widget puede utilizarse con la **[API de dashboards][1]**. Consulta la siguiente tabla para la [definición del esquema de widget JSON][2]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/dashboards/
[2]: /es/dashboards/graphing_json/widget_json/