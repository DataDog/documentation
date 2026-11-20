---
description: Analice y comprenda segmentos de su base de usuarios.
further_reading:
- link: /product_analytics/
  tag: Documentación
  text: Product Analytics
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: Centro de aprendizaje
  text: Introducción a Product Analytics
- link: https://www.datadoghq.com/blog/product-analytics-account-segments/
  tag: Blog
  text: Investigue el riesgo de abandono a nivel de cuenta con los segmentos de cuenta
    de Product Analytics.
title: Segmentos
---
## Descripción general {#overview}

La segmentación le ayuda a enfocarse en grupos específicos de usuarios o cuentas según sus características o comportamientos. Esto le permite descubrir información, identificar tendencias y tomar decisiones basadas en datos sobre su producto.

Por ejemplo, puede segmentar a los usuarios por monto de compra, por actividad dentro de un país específico o por estado del período de prueba. También puede segmentar cuentas por atributos como los ingresos recurrentes anuales (ARR) o la fecha de inicio.

Después de crear un segmento, puede reutilizarlo en gráficos y Dashboards para comparar cómo se comportan los diferentes grupos.

## Crear un segmento {#build-a-segment}

Para crear un segmento:

1. Vaya a [{{< ui >}}Digital Experience Monitoring{{</ ui >}} > {{< ui >}}Product Analytics{{</ ui >}} > {{< ui >}}Users{{</ ui >}} > {{< ui >}}Segments{{</ ui >}}][1] y haga clic en {{< ui >}}Create Segment{{< /ui >}}.
1. Reemplace {{< ui >}}New Segment{{< /ui >}} con un nombre para el segmento. Opcionalmente, haga clic en {{< ui >}}Add a description{{< /ui >}}.
1. Junto a {{< ui >}}Show{{< /ui >}}, use el interruptor para elegir el tipo de perfiles que desea incluir en el segmento:
   - {{< ui >}}Users{{< /ui >}}: Cree un segmento de usuarios individuales.
   - {{< ui >}}Accounts{{< /ui >}}: Cree un segmento de cuentas (organizaciones). Consulte la sección [Segmentos de cuenta](#segment-accounts).

   <div class="alert alert-info">Un segmento devuelve perfiles de usuario o de cuenta, no ambos.</div>

1. Agregue uno o más filtros:
   - {{< ui >}}Add Property{{< /ui >}}: Haga coincidir usuarios o cuentas por atributo, como correo electrónico, última actividad o cualquier atributo personalizado que haya importado. Consulte la sección [Filtrar por propiedades y eventos](#segment-pana).
   - {{< ui >}}Add Event{{< /ui >}}: Haga coincidir usuarios o cuentas según lo que hicieron durante el período de tiempo que elija. Utilice un solo evento o un embudo de varios pasos que los usuarios hayan completado o abandonado. Consulte [Filtrar por propiedades y eventos](#segment-pana).
   - {{< ui >}}Import CSV{{< /ui >}}: Haga coincidir una lista que ya tenga cargando un archivo CSV de identificadores para incluir o excluir. Consulte la sección [Importar un archivo CSV](#segment-csv).

   Los filtros se combinan con AND. Para excluir coincidencias, cambie el operador de cualquier filtro, por ejemplo, de **did** a **did not**.

   {{< img src="product_analytics/segmentation/segment_editor.png" alt="La página Create Segment con un campo para el nombre del segmento, la configuración Show y botones para agregar una propiedad, un evento o una importación de CSV." style="width:100%;">}}

1. Haga clic en {{< ui >}}Save Segment{{< /ui >}}.

{{% collapse-content title="Filtrar por propiedades y eventos" level="h3" expanded=false id="segment-pana" %}}

Combine filtros de propiedades y eventos para centrarse en los usuarios que le interesan:

- **Los filtros de propiedades** hacen coincidir a los usuarios por atributo, como país, plan o fecha de registro, incluidos los atributos personalizados que haya importado. Por ejemplo, `have the property plan is premium`. Para importar atributos personalizados, consulte [Perfiles de usuarios y cuentas][3].
- **Los filtros de eventos** hacen coincidir a los usuarios según lo que hicieron durante un período de tiempo que usted elija. Utilice un solo evento o haga clic en {{< ui >}}Add step{{< /ui >}} para crear un embudo de varios pasos que los usuarios hayan completado o abandonado. Por ejemplo, `did convert after Sign up → Start trial`. Para limitar un evento por sus atributos, como el país o el tipo de dispositivo, haga clic en {{< ui >}}Add filter{{< /ui >}}.

A medida que agrega filtros, la vista previa {{< ui >}}Dynamic segment{{< /ui >}} enumera los usuarios que coinciden.

Por ejemplo, para segmentar a los usuarios en Brasil que hicieron clic en el botón **In Stock** en los últimos tres meses:

1. Haga clic en {{< ui >}}Add Event{{< /ui >}} y seleccione la acción `"In Stock" Clicked`.
1. Establezca el marco de tiempo en {{< ui >}}Past 3 Months{{< /ui >}}.
1. Haga clic en {{< ui >}}Add filter{{< /ui >}} y filtre por `Country is Brazil`.

{{< img src="product_analytics/segmentation/pana_example_checkout_brazil.png" alt="Un segmento de usuarios en Brasil que hicieron clic en In Stock en los últimos tres meses, con una vista previa de los usuarios coincidentes." style="width:100%;">}}

#### Ejemplo: Encuentre usuarios que se fueron antes de comprar {#example-find-users-who-left-before-buying}

Para encontrar usuarios móviles que vieron su carrito pero no finalizaron la compra:

1. Haga clic en {{< ui >}}Add Event{{< /ui >}} y seleccione la vista `Cart`.
1. Haga clic en {{< ui >}}Add step{{< /ui >}}, elija {{< ui >}}then did not{{< /ui >}} y seleccione la acción `Checkout Button Clicked`.
1. Establezca el marco de tiempo, por ejemplo, dentro de **1 Day**, en cualquier momento en {{< ui >}}Past 1 Day{{< /ui >}}.
1. Haga clic en {{< ui >}}Add Property{{< /ui >}} y filtre por `Last Device Type is Mobile`.

{{< img src="product_analytics/segmentation/user_profile_example_3.png" alt="Un segmento de usuarios móviles que vieron Cart pero no hicieron clic en checkout en el plazo de un día, con una vista previa de los usuarios coincidentes." style="width:100%">}}

También puede comenzar desde la página [{{< ui >}}User Profiles{{< /ui >}}][2]. Filtre a sus usuarios y luego haga clic en {{< ui >}}Create Segment{{< /ui >}}. El editor de segmentos se abre con sus filtros ya aplicados.

{{% /collapse-content %}}

{{% collapse-content title="Importar un archivo CSV" level="h3" expanded=false id="segment-csv" %}}

Si tiene una lista de usuarios de una encuesta, experimento o CRM, súbala como un archivo CSV para convertirla en un segmento.

Para crear un segmento a partir de su propio archivo:

1. Haga clic en {{< ui >}}Import CSV{{< /ui >}} y suba su archivo CSV.
1. Junto a {{< ui >}}column{{< /ui >}}, seleccione la columna de su archivo que contiene los ID de usuario o correos electrónicos, como `id`.
1. Junto a {{< ui >}}with{{< /ui >}}, seleccione el atributo de Product Analytics que desea hacer coincidir, como {{< ui >}}User Id (@usr.id){{< /ui >}}.
1. Para excluir a los usuarios del archivo, haga clic en {{< ui >}}matching{{< /ui >}} y seleccione {{< ui >}}not matching{{< /ui >}} para convertir el filtro en una exclusión.

El archivo necesita una columna con ID de usuario o correos electrónicos de usuario que coincidan con el atributo `usr.id` o `usr.email` en Product Analytics.

{{< img src="product_analytics/segmentation/segment_link_csv_1.png" alt="Un filtro de importación CSV que dice: usuarios que coinciden con la columna id de segment-test-users.csv mediante User Id (@usr.id). El filtro está resaltado." style="width:100%">}}

{{% /collapse-content %}}

{{% collapse-content title="Segmentos de cuenta" level="h3" expanded=false id="segment-accounts" %}}

Los segmentos de cuenta agrupan cuentas, como organizaciones o empresas, según sus atributos o los eventos que realizaron sus usuarios. Úselos para analizar grupos como cuentas con un ARR superior a una cantidad específica o cuentas que adoptaron una función específica.

Para crear un segmento de cuenta:

1. Junto a {{< ui >}}Show{{< /ui >}}, cambie el interruptor de {{< ui >}}Users{{< /ui >}} a {{< ui >}}Accounts{{< /ui >}}.
1. Agregue uno o más filtros:
   - {{< ui >}}Add Property{{< /ui >}}: Filtre por propiedades de cuenta como ARR, fecha de inicio, ID de cuenta o cualquier atributo de cuenta importado. Para importar atributos personalizados, consulte [Perfiles de usuarios y cuentas][3].
   - {{< ui >}}Add Event{{< /ui >}}: Incluya cuentas donde al menos un usuario haya realizado el evento especificado.
   - {{< ui >}}Import CSV{{< /ui >}}: Cargue un archivo CSV con una columna de ID de cuenta. Los ID se asignan al atributo de ID de cuenta en Product Analytics.
1. Haga clic en {{< ui >}}Save Segment{{< /ui >}}.

{{% /collapse-content %}}

## Use segmentos en todo Product Analytics {#use-segments-across-product-analytics}

Puede filtrar cualquier vista de Product Analytics por un segmento, incluyendo Pathways, Analytics Explorer, Funnels y Retention.

Para filtrar una vista por un segmento:
1. Haga clic en {{< ui >}}Add filter{{< /ui >}}.
2. Seleccione la pestaña {{< ui >}}Segments{{< /ui >}} y elija un segmento. Si un segmento no aparece en la lista, haga clic en {{< ui >}}Create new segment{{< /ui >}}.

{{< img src="product_analytics/segmentation/segments_from_pana.png" alt="El menú Add filter abierto en una página de Product Analytics, con la pestaña Segments resaltada y una lista de segmentos guardados para elegir." style="width:80%;">}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/segments
[2]: https://app.datadoghq.com/product-analytics/profiles
[3]: /es/product_analytics/profiles