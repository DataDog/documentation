---
aliases:
- /es/graphingjson/
- /es/graphing/miscellaneous/graphingjson
- /es/graphing/graphing_json/
- /es/dashboards/graphing_json/
- /es/dashboards/graphing_json/request_json/
- /es/dashboards/graphing_json/widget_json/
further_reading:
- link: https://docs.datadoghq.com/api/latest/dashboards/
  tag: API
  text: API de dashboard
- link: /dashboards/widgets/
  tag: Documentación
  text: Widgets
kind: documentation
title: Crear gráficas con JSON
---

## Información general

{{< img src="/dashboards/graphing_json/json_editor.png" alt="Configurar un widget de series temporales con el editor JSON" style="width:100%;" >}}

Además del [editor de gráficos GUI][6], puedes utilizar el editor JSON en tus widgets de dashboard para configurar tus visualizaciones. El esquema mostrado en el editor JSON refleja el esquema del cuerpo de la solicitud de la API de dashboard. Para obtener más información sobre los parámetros JSON y los campos obligatorios, consulta la [ documentación de la API de dashboard][2]. 

## Esquema JSON de widget

Busca el tipo widget que quieres añadir a tu dashboard y aplica los campos JSON enumerados en la documentación correspondiente. Para obtener la lista completa de tipos de widgets, consulta el [índice de widgets][7].

### Esquema del eje Y

Los controles del eje Y de Datadog te permiten:

*   Recortar el eje Y según rangos específicos
*   Filtrar series especificando un porcentaje o un valor absoluto
*   Cambiar la escala del eje Y de lineal a log, sqrt o potencia

### Esquema de marcadores

Los marcadores te permiten añadir un formato visual condicional a tus gráficos. Por ejemplo, ALERTA, ADVERTENCIA u OK.

{{< img src="dashboards/graphing_json/markers.png" alt="Marcadores" style="width:80%;">}}

## Esquema de variables de plantilla

Las variables de plantilla de dashboard aplicar un nuevo contexto a uno o más gráficos de tu dashboard. Esto te permite explorar dinámicamente métricas en diferentes conjuntos de etiquetas (tags) utilizando variables en lugar de etiquetas específicas. Más información sobre [variables de plantilla en la interfaz de usuario (UI) de Datadog][4].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/#timeboards
[2]: /es/api/v1/dashboards/
[3]: /es/dashboards/graphing_json/widget_json/
[4]: /es/dashboards/template_variables/
[6]: /es/dashboards/querying/#graphing-editor
[7]: /es/dashboards/widgets/