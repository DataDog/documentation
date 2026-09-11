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

La página [Atribución de uso][1] proporciona información y funciones relacionadas con el uso de datos y los tipos de uso. Por defecto, el uso de datos se puede ver y filtrar por categorías más amplias como producto, organización o claves de etiqueta. Puedes definir hasta tres etiquetas de atribución de uso por organización y gestionarlas directamente desde la interfaz de usuario para cada aplicación RUM.

Esta guía describe cómo hacer lo siguiente:

- Configura la atribución de uso de RUM para que pueda visualizarse por categorías personalizadas en la página Atribución de uso (con una precisión de +/- 20% del valor real). Esto puede ayudarte a realizar un seguimiento de las sesiones y los costes de RUM de diferentes departamentos, productos u otras categorías, en lugar de visualizar una única cifra agregada.
- Impón la configuración de etiquetas a nivel de la organización (recomendado).

A modo de ejemplo, en esta guía se explica cómo realizar un rastreo del uso de RUM por departamento.

## Configurar la atribución de uso de RUM

Puedes configurar etiquetas de atribución de uso de RUM a nivel del SDK.

### Comprobar tus etiquetas

Las categorías de uso se determinan por etiquetas. Antes de configurar la atribución de uso de RUM, asegúrate de que las etiquetas que deseas utilizar están configuradas en la página Atribución de uso. Haz clic en **Edit tags** (Editar etiquetas), luego selecciona las etiquetas que deseas utilizar para ver el uso y haz clic en **Save** (Guardar). En este ejemplo, hemos añadido "departamento" como etiqueta.

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/rum-use-attribution-tags-1.jpeg" alt="Comprueba tus etiquetas en la página Atribución de uso" style="width:100%;">}}

Para configurar etiquetas para **sesiones de navegador**, configura el contexto global RUM al inicio de la sesión (justo después de llamar a `datadogRum.init`) utilizando el método [`setGlobalContextProperty`][3]. Por ejemplo, así es como podrías etiquetar sesiones para que puedan ser rastreadas por el departamento de marketing: 

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

**Nota**: Unas pocas etiquetas están incluidas por defecto (`service`, `env`, `version`, `application.id` y `application.name`). Para cualquier otra cosa, define el contexto global utilizando el método anterior.

Una vez realizado este paso, las nuevas sesiones RUM se rastrearán en función de las etiquetas que hayas añadido.

## Ver el uso de RUM
Las sesiones recientemente etiquetadas se muestran en la página [Atribución de uso][1]. Cuando se revisa RUM con sesiones Session Replay y con columnas de sesiones RUM, es posible ver el número de sesiones por departamento.

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/rum-use-attribution-tags-3.png" alt="Ver el uso de RUM por departamento" style="width:100%;">}}

La información de uso también está disponible a través del endpoint [`GetHourlyUsageAttribution`][5].

## Imponer la configuración de etiquetas a nivel de la organización

Impón etiquetas de atribución de uso en aplicaciones RUM para realizar un seguimiento de su contribución a tu factura de Datadog. Esta configuración puede aplicarse sin necesidad de instrumentar o volver a instrumentar tu aplicación. Cuando esta configuración está activa, las etiquetas deben definirse al crear o actualizar aplicaciones RUM en Datadog.

**Nota**: Cuando las etiquetas de atribución se definen tanto a nivel de los datos (en eventos recopilados por el SDK), como a nivel de la aplicación, Datadog utiliza la información definida a nivel de la aplicación.

En un entorno Datadog con organizaciones principales y secundarias, donde la configuración se impone en ambas, debes definir etiquetas de atribución para cada una de ellas. Por ejemplo, si la organización principal requiere tres etiquetas y la secundaria dos, la organización secundaria hereda la etiqueta de la organización principal, con lo que se llega a un total de cinco etiquetas por aplicación en la organización secundaria (en este ejemplo, una aplicación en la organización principal sólo requeriría tres etiquetas).

**Nota**: Aunque las etiquetas no se impongan a la organización principal, la organización secundaria sigue heredando las etiquetas de la organización principal.

1. Asegúrate de que dispones del permiso de escritura de parámetros RUM.
2. Ve a **Digital Experience** > **Real User Monitoring** > **Manage Applications** > **Enforce Usage Attribution** (Experiencia digital > Real User Monitoring > Gestionar aplicaciones > Imponer atribución de uso).
3. Haz clic en el conmutador para **Imponer etiquetas de atribución de uso en todas las aplicaciones**. Con esta opción activada, las aplicaciones sólo podrán crearse o actualizarse si todas las etiquetas están configuradas.

   {{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/enforce-usage-attribution-toggle-1.png" alt="Activa el parámetro Imponer etiquetas de atribución de uso a nivel de la aplicación." style="width:100%;">}}

   Una vez activada esta opción, las aplicaciones creadas anteriormente tendrán valores de etiqueta vacíos, por lo que tendrás que rellenar los valores manualmente.

### Gestionar etiquetas de atribución de uso en tus aplicaciones RUM
Después de que tus etiquetas de atribución de uso hayan sido impuestas y configuradas, podrás etiquetar tus sesiones RUM con ellas.

Para gestionar etiquetas de atribución de uso para tu aplicación en la interfaz de usuario:

1. Ve a la página [Gestión de aplicaciones RUM][2].
2. Al crear una nueva aplicación o actualizar una, podrás ver cuántas de las etiquetas necesarias se añadieron.
3. Haz clic en **Edit tags** (Editar etiquetas) para asignar las [etiquetas de atribución de uso configuradas][6].
4. Haz clic en **Save Changes** (Guardar cambios).

{{< img src="real_user_monitoring/guide/rum-usage-attribution-tags/enforce-usage-attribution-tags.png" alt="Mensaje donde se pide añadir las etiquetas de atribución de uso necesarias luego de imponerlas." style="width:60%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/billing/usage-attribution
[2]: https://app.datadoghq.com/rum/list
[3]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context
[4]: /es/api/latest/usage-metering/#get-hourly-usage-attribution-v1
[5]: /es/real_user_monitoring/mobile_and_tv_monitoring/android/advanced_configuration/?tab=kotlin#track-attributes
[6]: /es/real_user_monitoring/guide/tracking-rum-usage-with-usage-attribution-tags/#check-your-tags