---
aliases:
- /es/product_analytics/guide/action_management/
description: Etiquete las acciones capturadas automáticamente desde sus aplicaciones
  web y móviles usando Action Management.
further_reading:
- link: https://learn.datadoghq.com/courses/define-user-behavior-with-labeled-actions-in-product-analytics
  tag: Centro de aprendizaje
  text: Defina el comportamiento del usuario con acciones etiquetadas en Product Analytics
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'Del rendimiento al impacto: conectando a los equipos de frontend a través
    de un contexto compartido.'
- link: https://www.datadoghq.com/blog/product-analytics-faster-decisions
  tag: Blog
  text: Tome decisiones de producto más rápidas y mejores con Datadog Product Analytics
- link: https://www.datadoghq.com/blog/product-data-best-practices
  tag: Blog
  text: Lo que los datos de su producto realmente dicen
title: Action Management
---
## Descripción general {#overview}
Action Management es un método sin código para etiquetar acciones capturadas automáticamente desde sus aplicaciones web y móviles. Las partes interesadas del producto y del negocio pueden usarlo para crear y cambiar el nombre de eventos sin cambios de código.

Utilice acciones etiquetadas para:
- Realice el seguimiento de un elemento que aún no está instrumentado al seleccionar un selector CSS.
- Combinar varias acciones capturadas automáticamente bajo un solo nombre cuando representan una acción de usuario significativa.
- Cambie el nombre de una acción capturada automáticamente para que coincida con la terminología comercial de su equipo.

Después de crear una acción etiquetada, Datadog aplica el nombre de forma retroactiva a todas las interacciones coincidentes en sus datos registrados. Esto incluye las interacciones históricas, no solo las nuevas de ahora en adelante.

Las acciones etiquetadas funcionan en todos los gráficos de Product Analytics y ayudan a mejorar la confianza en su conjunto de datos y la eficiencia en su análisis.

Hay dos métodos de etiquetado disponibles:
- [**Etiquetado visual**](#visual-labeling): Una interfaz de apuntar y hacer clic para etiquetar acciones en páginas web. Requiere la extensión de Chrome del grabador de pruebas de Datadog.
- [**Etiquetado manual**](#manual-labeling): Etiquete acciones para aplicaciones web y móviles sin una extensión de navegador.

## Etiquetado visual {#visual-labeling}

El etiquetado visual requiere [la extensión de Chrome del grabador de pruebas de Datadog][1]. Si no puede agregar la extensión a través de la tienda web de Chrome, consulte las [instrucciones manuales][2] para la instalación de la extensión, o utilice [etiquetado manual](#manual-labeling) en su lugar.

1. Vaya a la página [Actions][3] en Datadog y seleccione su aplicación.
2. Seleccione {{< ui >}}Visual Labeler{{< /ui >}}. Los elementos que ya tienen una acción etiquetada están marcados con un punto azul. Para mostrar los nombres de estas acciones etiquetadas automáticamente, seleccione la casilla de verificación en el menú.

   {{< img src="product_analytics/action_management/pana-visual-labeler-toolbar.png" alt="Barra de herramientas de Visual Labeler que muestra los modos Navigate Site y Label Actions, y una casilla de verificación para mostrar los nombres de las cinco acciones etiquetadas en la página." style="width:90%;">}}

3. Utilice el modo {{< ui >}}Navigate Site{{< /ui >}} para navegar a la ubicación de la acción o acciones que desea etiquetar.
4. Cambie al modo {{< ui >}}Label Actions{{< /ui >}} cuando esté listo para etiquetar una acción.

### Cree una acción etiquetada {#create-a-labeled-action}

1. Haga clic en el elemento que desea etiquetar. Datadog muestra cuántas veces los usuarios activaron el elemento durante los últimos 7 días.
2. Opcional: Haga clic en elementos adicionales para que la etiqueta los capture a todos juntos. Para eliminar un elemento de la acción etiquetada, seleccione el icono de papelera junto a él.
3. Datadog sugiere un nombre para la acción etiquetada basado en el elemento. Edite el nombre según sea necesario.
4. De forma predeterminada, Datadog rastrea los clics en el elemento solo en la página actual. Para rastrear coincidencias del selector CSS del elemento en todas las páginas, abra los detalles de la etiqueta y seleccione la casilla de verificación {{< ui >}}Target all pages{{< /ui >}}.
5. Opcional: Edite el selector CSS directamente si desea cambiar o refinar qué elementos coinciden con la etiqueta.
6. Haga clic en {{< ui >}}Save labeled action{{< /ui >}}.

{{< img src="product_analytics/action_management/pana-create-labeled-action-2.png" alt="Panel de acción etiquetada con el nombre New Chart CTA Click from Home, un elemento rastreado llamado main navigation, la casilla de verificación Target all pages, el selector CSS para el elemento y el botón Save labeled action." style="width:60%;">}}

### Actualice una acción etiquetada existente {#update-an-existing-labeled-action}

1. Haga clic en un elemento que ya tenga una acción etiquetada asociada (marcado con un punto azul).
2. Seleccione {{< ui >}}Edit{{< /ui >}}.
3. Agregue o elimine elementos rastreados y actualice el nombre o el selector CSS según sea necesario.
4. Haga clic en {{< ui >}}Save labeled action{{< /ui >}}.

Después de definir una acción, esta aparece en la lista de acciones etiquetadas en la página [Actions][3], y puede usarla en cualquier gráfico de Product Analytics.

## Etiquetado manual {#manual-labeling}

El etiquetado manual está disponible tanto para aplicaciones web como móviles y no requiere la extensión de Chrome.

1. Vaya a la página [Actions][3] en Datadog y seleccione su aplicación. 
2. Seleccione {{< ui >}}Add Labeled Action{{< /ui >}}, luego seleccione {{< ui >}}Create manually{{< /ui >}}.
3. Agregue un nombre de etiqueta, una descripción (opcional) y etiquetas (opcional).
4. En {{< ui >}}Definition{{< /ui >}}, defina uno o más eventos para realizar el seguimiento:
   - {{< ui >}}Action Type{{< /ui >}}: `click` o `custom` eventos. Para eventos `click`, puede especificar un selector CSS personalizado para realizar el seguimiento de clics, o usar el generador de CSS para etiquetar eventos, para obtener mayor control y granularidad. 
   - {{< ui >}}Action Name{{< /ui >}}: Utilice el menú desplegable para seleccionar una acción
   - {{< ui >}}Page Location{{< /ui >}}: Utilice el menú desplegable para seleccionar una o más páginas
   Seleccione {{< ui >}}Add New Definition{{< /ui >}} para agregar una definición.
5. Seleccione **Guardar**.

Después de definir una acción, esta aparece en la lista de acciones etiquetadas en la página [Actions][3], y puede usarla en cualquier gráfico de Product Analytics.

## Recupere sus acciones {#retrieve-your-actions}
Después de definir una acción, puede encontrarla en la página [Actions][3]. 

{{< img src="product_analytics/action_management/pana-action-list-2.png" alt="Lista de sus acciones etiquetadas." style="width:90%;">}}

## Limitaciones conocidas {#known-limitations}
- El etiquetado visual solo está disponible para páginas web. Utilice el etiquetado manual para aplicaciones móviles.
- No puede etiquetar acciones que están ocultas detrás de un efecto hover. Si esta limitación afecta sus casos de uso, comparta ejemplos con su Gerente de Éxito del Cliente para informar futuras mejoras.
- Eliminar una acción etiquetada también la elimina de los paneles donde se está utilizando.

[1]: https://chromewebstore.google.com/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[2]: https://docs.datadoghq.com/es/synthetics/guide/manually-adding-chrome-extension/
[3]: https://app.datadoghq.com/product-analytics/data-management

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}