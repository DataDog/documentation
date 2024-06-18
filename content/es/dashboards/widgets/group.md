---
aliases:
- /es/graphing/widgets/group/
description: Agrupa tus widgets en un widget de dashboard.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentación
  text: Creación de dashboards con JSON
title: Widget de grupo
widget_type: grupo
---

## Información general
<div class="alert alert-info">Los widgets de screenboard no pueden colocarse en grupos. </a></div>

Los widget de grupo te permiten mantener juntos gráficos similares en tu dashboard. Cada grupo tiene un encabezado personalizado, puede contener de uno a varios gráficos y es plegable. Utiliza los grupos para organizar los widgets en tu dashboard.

## Configuración

1. Añada varios widgets a tu dashboard.
2. Selecciona varios widgets con la función clic y arrastrar, o pulsa Mayús y haz clic.
3. Haz clic en la opción **Group** (Grupo).
  {{< img src="dashboards/widgets/group/widget-group-button.png" alt="Opción de grupo que aparece después de seleccionar varios widgets" style="width:100%;" >}}
4. Haz clic en el icono del lápiz en la esquina superior derecha de tu grupo para elegir un nombre y aplicar un estilo a tu grupo.

## API
<div class="alert alert-info">Los widgets de screenboard no pueden colocarse en grupos. </a></div>

Este widget se puede utilizar con la **[API de dashboards][2]**. Consulta la siguiente tabla para la [definición del esquema del widget JSON][3]:

{{< dashboards-widgets-api >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/#timeboards
[2]: /es/api/latest/dashboards/
[3]: /es/dashboards/graphing_json/widget_json/