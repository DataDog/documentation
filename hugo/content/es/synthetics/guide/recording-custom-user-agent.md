---
description: Grabe los pasos de la prueba de navegador con una cadena de User-Agent
  personalizada
further_reading:
- link: /synthetics/browser_tests/test_steps
  tag: Documentación
  text: Obtenga información sobre los pasos para las pruebas de navegador
- link: /synthetics/browser_tests/advanced_options/
  tag: Documentación
  text: Configure opciones avanzadas para pasos
title: Grabe pasos con un User-Agent personalizado
---
## Descripción general {#overview}

Algunas implementaciones hacen que las aplicaciones se rendericen de cierta manera solo cuando se utiliza una cadena `User-Agent` específica (por ejemplo, al usar un `User-Agent` móvil). En estos casos, debe establecer el encabezado `User-Agent` en una cadena personalizada para poder grabar los pasos de sus pruebas de navegador en su aplicación. Para hacerlo:

1. Abra su aplicación en una ventana emergente haciendo clic en {{< ui >}}Open in Popup{{< /ui >}} en su grabador de pruebas de navegador.
2. Abra Chrome Developer Tools.
3. Haga clic en el botón de menú con los tres puntos verticales.
4. Seleccione la opción {{< ui >}}More tools - Network conditions{{< /ui >}}.
5. Vaya a la pestaña {{< ui >}}Network conditions{{< /ui >}} y deshabilite la opción {{< ui >}}Select automatically{{< /ui >}}.
6. Elija {{< ui >}}Custom{{< /ui >}} e ingrese la cadena `User-Agent` de interés.

**Nota:** Puede anular la [cadena `User-Agent` predeterminada][1] al momento de la ejecución de la prueba agregándola como un encabezado en la configuración de su prueba. 

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/guide/identify_synthetics_bots/?tab=browsertests#user-agent