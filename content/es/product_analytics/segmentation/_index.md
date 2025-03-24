---
description: Analiza y comprende grupos o segmentos específicos de tu base de usuarios.
further_reading:
- link: /product_analytics/
  tag: Documentación
  text: Análisis de productos
title: Segmentación
---

## Información general

La segmentación es una función del Análisis de productos que te permite analizar y comprender grupos o segmentos específicos de tu base de usuarios. Al segmentar a tus usuarios en función de diversas características y comportamientos, puedes descubrir información valiosa, identificar tendencias y tomar decisiones basadas en datos para optimizar tu producto y la experiencia del usuario. Por ejemplo, puedes segmentar a los usuarios por importe de compra, usuarios activos en un país determinado, usuarios en periodo de prueba o usuarios en periodo de prueba que luego se convirtieron a una organización de pago.

## Crear un segmento

Para crear un nuevo segmento, ve a **[Digital Experience Monitoring > Product Analytics > User Segments][1]** (Monitorización de experiencia digital > Análisis de productos > Segmentos de usuarios) desde la navegación. Puedes elegir entre dos fuentes para crear un nuevo segmento:

- Datos de análisis de productos
- Datos externos (cargar una tabla de referencia)

{{< img src="product_analytics/segmentation/segmentation-1.png" alt="Crea un segmento de usuarios en función del Análisis de productos o datos externos.">}}

### Uso de los datos del Análisis de productos

Para crear un nuevo segmento utilizando datos del Análisis de productos:

1. Elige el atributo de usuario con el que deseas conectar tus datos. En el ejemplo siguiente es `usr.id`, pero puedes utilizar cualquier atributo de usuario disponible, como `usr.email` o `usr.name`.

2. En la sección **Filter your segment** (Filtrar tu segmento), puedes filtrar en función de cualquier atributo recopilado por el SDK, o atributos personalizados que hayas añadido para crear un segmento de usuarios detallado.

   En el siguiente ejemplo, el segmento se filtra a todos los usuarios que estuvieron en la página `/cart` y luego hicieron clic en el botón de pago (y lo hicieron desde Brasil):

   {{< img src="product_analytics/segmentation/segmentation-2.png" alt="Filtro para todos los usuarios de Brasil que estaban en la página `/cart` e hicieron clic en el botón de compra.">}}

### Uso de datos externos o de terceros

Para crear un segmento utilizando datos externos o de terceros:

1. Consulta la documentación de [Tablas de referencia][2] para saber cómo cargar y crear una Tabla de referencia.
2. Asegúrate de conectar correctamente el tipo de datos (por ejemplo, `usr.id`, `usr.name` o `usr.email`) con el nombre de la columna.
3. Para mayor precisión, asegúrate de que existen datos en el Análisis de productos para los usuarios del segmento.

## Aprovechar los segmentos a través del Análisis de productos

### En sankeys

En la página de Sankey, puedes filtrar los datos en la visualización para reflejar un segmento seleccionado de usuarios. Esto te permite observar la experiencia y los patrones de tráfico de un conjunto particular de usuarios en un segmento determinado. El siguiente ejemplo muestra un diagrama de Sankey sólo para los usuarios del segmento "Usuarios prémium".

{{< img src="product_analytics/segmentation/segmentation-3.png" alt="Filtrar la visualización de Sankey para mostrar un segmento seleccionado de usuarios.">}}

### En Analytics Explorer

Puedes filtrar los datos en el Analytics Explorer para reflejar un conjunto seleccionado de usuarios que se encuentran en un segmento determinado. El ejemplo siguiente muestra una lista de usuarios en el segmento "Usuarios prémium" que estuvieron activos en el último mes, organizados por el número de sesiones que tuvieron.

{{< img src="product_analytics/segmentation/segmentation-4.png" alt="Muestra una lista de los usuarios en el segmento Usuarios prémium que estuvieron activos en el último mes, organizada por la cantidad de sesiones que tuvieron.">}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/segments
[2]: /es/integrations/guide/reference-tables/?tab=manualupload#validation-rules