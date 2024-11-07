---
description: Graba los pasos de un test de navegador con una cadena user-agent personalizada.
further_reading:
- link: /synthetics/browser_tests/actions
  tag: Documentación
  text: Pasos de tests de navegador
- link: /synthetics/browser_tests/advanced_options/
  tag: Documentación
  text: Configurar las opciones avanzadas de los pasos
title: Grabar pasos con una cadena user-agent personalizada
---

## Información general

En algunas implementaciones, las aplicaciones se muestran de una manera determinada solo cuando se utiliza una cadena `User-Agent` concreta; por ejemplo, una cadena `User-Agent` para dispositivos móviles. En esos casos, tienes que personalizar el encabezado `User-Agent` para poder grabar los pasos de los tests de navegador en tu aplicación. Para ello, haz lo siguiente:

1. Abre la aplicación en una ventana emergente haciendo clic en la opción **Open in Popup** (Abrir en una ventana emergente) de la herramienta de grabación de tests de navegador.
2. Abre las herramientas de desarrollo de Chrome.
3. Haz clic en el botón de los tres puntos verticales para abrir el menú.
4. Selecciona **More tools - Network conditions** (Más herramientas - Condiciones de la red).
5. Ve a la pestaña **Network conditions** (Condiciones de la red) y desactiva la opción **Select automatically** (Seleccionar automáticamente).
6. Elige **Custom** (Personalizar) e introduce la cadena `User-Agent` que quieras.

**Nota:** Siempre puedes anular la [cadena `User-Agent` predeterminada][1] cuando vayas a ejecutar el test añadiéndola como encabezado en la configuración. 

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/guide/identify_synthetics_bots/?tab=apitests#default-headers