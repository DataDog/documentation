---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-security-graph/
  tag: blog
  text: Visualice las relaciones de seguridad en la nube con Datadog Security Graph
- link: https://www.datadoghq.com/blog/security-graph-attack-paths
  tag: blog
  text: Rastree las rutas de exposición entre recursos con Datadog Cloud Security
title: Visualice las relaciones con Security Graph
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Security Graph no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Uno de los desafíos más persistentes en la seguridad de la nube es comprender cómo interactúan entre sí los componentes de cómputo, almacenamiento, identidad y redes. Con Security Graph, puede modelar su entorno de nube como un gráfico de relaciones. Visualice y consulte las conexiones entre sus recursos de nube, como instancias EC2, roles de IAM, buckets de S3 y grupos de seguridad, combinando datos de sus escaneos de nube Agentless y Agent. Investigue estas relaciones para que pueda detectar rutas de acceso indirectas, evaluar riesgos de identidad y responder de manera más efectiva a las amenazas emergentes.

**Nota**: Security Graph solo admite recursos de AWS.

{{< img src="security/csm/security_graph.png" alt="Security Graph que muestra un ejemplo de instancia de EC2" width="100%">}}

## Seleccione o cree una consulta {#select-or-create-a-query}

Existen dos formas de especificar los tipos de recursos y relaciones que desea ver en Security Graph:
<!-- - Write a query in natural language (for example, "Non-admin IAM roles that can assume admin IAM roles") -->
- Seleccione una consulta predefinida desde la página de inicio.
- Cree su propia consulta especificando los tipos de recursos y las relaciones entre ellos.

<!-- If you use a natural language or pre-made query, the technical details automatically populate in the query. You can modify the query to fine-tune your results. -->

Si utiliza una consulta predefinida, los detalles técnicos se completan automáticamente en la consulta. Puede modificar la consulta para ajustar sus resultados.

### Cree y modifique consultas {#create-and-modify-queries}

Ya sea que utilice una consulta generada automáticamente o cree una usted mismo, puede usar el generador de consultas para refinar sus resultados.

1. En **Cree su propia consulta**, junto a **Buscar**, seleccione un tipo de recurso de la lista.
1. (Opcional) Para agregar detalles adicionales sobre el tipo de recurso que seleccionó, haga clic en **+**, luego haga clic en **Donde**. En el campo que aparece, seleccione una etiqueta e ingrese un valor para esa etiqueta con el fin de filtrar.
1. (Opcional) Para filtrar por un tipo de recurso adicional, haga clic en **+**, luego haga clic en **Que**. En el campo que aparece, seleccione una relación que desee que el tipo de recurso adicional tenga con el de arriba. Si aparece otro campo **Donde**, especifique valores de etiqueta adicionales para este tipo de recurso.
1. Agregue tipos de recursos y valores de etiqueta adicionales según sea necesario. También puede hacer clic en el icono **Eliminar** para eliminar una condición, o hacer clic en **Borrar consulta** para comenzar de nuevo.

A medida que modifica la consulta, Security Graph se actualiza automáticamente para mostrar los recursos relevantes. Junto a **Visualizar**, puede hacer clic en **Gráfico** para visualizar los recursos en un gráfico de relaciones, o hacer clic en **Tabla** para verlos en una tabla en su lugar.

## Obtenga más información sobre un recurso {#learn-more-about-a-resource}

- Cuando visualice recursos en un gráfico, puede hacer clic en un recurso para ver más información:
  - Copie información clave sobre el recurso, como el ID, la cuenta o el equipo.
  - Filtre los recursos en su consulta actual por un valor de etiqueta específico.
  - Visualice más detalles sobre el recurso.
  - Visualice los hallazgos de seguridad asociados con el recurso.
- Cuando esté viendo recursos en una tabla, puede hacer clic en un recurso para visualizar información adicional en el panel lateral.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}