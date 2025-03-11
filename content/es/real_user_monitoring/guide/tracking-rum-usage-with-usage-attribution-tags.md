---
aliases:
- /es/real_user_monitoring/guide/track-rum-usage-with-attribution-tags/
beta: true
description: Aprende a rastrear el uso de RUM con etiquetas (tags) de atribución personalizadas
further_reading:
- link: /account_management/billing/usage_attribution/
  tag: Documentación
  text: Planificación y ajustes de uso
title: Rastrear el uso de RUM con etiquetas de atribución de uso
---

## Información general

La página [Atribución de uso][1] brinda información y funciones relacionadas con el uso de datos y los tipos de uso. Por defecto, el uso de datos se puede ver y filtrar por categorías más amplias como producto, organización o claves de etiqueta. En esta guía, se describe cómo configurar la atribución del uso de RUM para que pueda visualizarse por categorías personalizadas en la página Atribución del uso (con una precisión de +/- 20% del valor real). Esto puede ayudar a realizar un rastreo de las sesiones y los costes de RUM para diferentes departamentos, productos u otras categorías, en lugar de ver un único número agregado. 

A modo de ejemplo, en esta guía se explica cómo realizar un rastreo del uso de RUM por departamento.

## Establecer la atribución del uso de RUM

### Comprobar tus etiquetas

Las categorías de uso se determinan por etiquetas. Antes de configurar la atribución de uso de RUM, asegúrate de que las etiquetas que deseas utilizar están configuradas en la página Atribución de uso. Haz clic en **Edit tags** (Editar etiquetas), luego selecciona las etiquetas que deseas utilizar para ver el uso y haz clic en **Save** (Guardar). En este ejemplo, hemos añadido "departamento" como etiqueta.

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/rum-use-attribution-tags-1.jpeg" alt="Comprueba tus etiquetas en la página Atribución de uso" style="width:100%;">}}

### Añadir etiquetas a tus sesiones RUM
Una vez configuradas tus etiquetas de atribución de uso etiquetas, puedes etiquetar tus sesiones RUM con ellas.

Para configurar etiquetas para **sesiones de navegador**, configura el contexto global RUM al inicio de la sesión (justo después de llamar a `datadogRum.init`) utilizando el método [`setGlobalContextProperty`][2]. Por ejemplo, así es como podríamos etiquetar sesiones para que puedan ser rastreadas para el departamento de marketing: 

```javascript
datadogRum.setGlobalContextProperty('department', 'marketing');
```

Para configurar etiquetas para **sesiones móviles**, utiliza el método [`addAttribute`][5]. He aquí un ejemplo:

```
//Android
GlobalRumMonitor.get().addAttribute("department", "marketing")

//iOS
RumMonitor.shared().addAttribute(forKey: "department", value: "marketing")
```

**Nota**: Unas pocas etiquetas están incluidas por defecto (`service`, `env`, `version`, `application.id` y `application.name`). Para cualquier otra cosa, establece el contexto global utilizando el método anterior.

Una vez que hayas desplegado este paso, las nuevas sesiones RUM se rastrean de acuerdo con las etiquetas que has añadido.

## Ver el uso de RUM
Las sesiones recién etiquetadas se muestran en la página [Atribución de uso][3]. Cuando se revisan las columnas RUM con Session Replay Sessions y sesiones RUM, se puede ver el número de sesiones por departamento.

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/rum-use-attribution-tags-3.png" alt="Ver el uso de RUM por departamento" style="width:100%;">}}

La información de uso también está disponible a través del endpoint [`GetHourlyUsageAttribution`][4].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/usage-attribution
[2]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context
[3]: https://app.datadoghq.com/billing/usage-attribution
[4]: /es/api/latest/usage-metering/#get-hourly-usage-attribution-v1
[5]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tab=kotlin#track-attributes