---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-security-graph/
  tag: Blog
  text: Visualizar relaciones de seguridad en la nube con Datadog Security Graph
title: Visualizar relaciones con Security Graph
---

{{< callout url="https://www.datadoghq.com/product-preview/security-graph" header="Únete a la vista previa">}}
  Security Graph tiene una disponibilidad limitada.
{{< /callout >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Security Graph no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Uno de los retos más persistentes de la seguridad en la nube es comprender cómo interactúan entre sí los componentes de cálculo, almacenamiento, identidad y redes. Con Security Graph, puedes modelar tu entorno de nube como un gráfico de relaciones. Visualiza y consulta las conexiones entre tus recursos en la nube, como instancias EC2, roles IAM, buckets S3 y grupos de seguridad, combinando datos de tus análisis en la nube basados en el Agent y sin el Agent. Investiga estas relaciones para poder descubrir rutas de acceso indirectas, evaluar los riesgos de identidad y responder con mayor eficacia a las amenazas emergentes.

**Nota**: Security Graph solo admite recursos de AWS.

{{< img src="security/csm/security_graph.png" alt="Security Graph que muestra una instancia EC2" width="100%">}}

## Seleccionar o crear una consulta

Existen dos formas de especificar los tipos de recursos y las relaciones que quieres ver en Security Graph:
<!-- - Escribir una consulta en lenguaje natural (por ejemplo, "Los roles IAM que no son de administrador pueden asumir roles IAM de administrador"") -->
- Selecciona una consulta preelaborada en la página de inicio.
- Crea tu propia consulta, especificando los tipos de recursos y las relaciones entre ellos.

<!-- Si utilizas une lenguaje natural o una consulta preelaborada, los detalles técnicos se rellenan automáticamente en la consulta Puedes modificar la consulta para afinar tus resultados. -->

Si utilizas una consulta preelaborada, los detalles técnicos se rellenan automáticamente en la consulta. Puedes modificar la consulta para afinar tus resultados.

### Crear y modificar consultas

Tanto si utilizas una consulta generada automáticamente como si creas la tuya propia, puedes utilizar el generador de consultas para afinar los resultados.

1. En **Build your own query** (Crear tu propia consulta), junto a **Search for** (Buscar), selecciona un tipo de recurso de la lista.
1. (Opcional) Para añadir detalles adicionales sobre el tipo de recurso seleccionado, haz clic en **+** y luego en **Where** (Dónde). En el campo que aparece, selecciona una etiqueta (tag) e introduce un valor para esa etiqueta por el que filtrar.
1. (Opcional) Para filtrar por un tipo de recurso adicional, haz clic en **+** y luego en **That** (Ese). En el campo que aparece, selecciona la relación que quieres que tenga el tipo de recurso adicional con el anterior. Si aparece otro campo **Where** (Dónde), especifica valores de etiqueta adicionales para este tipo de recurso.
1. Añade tipos de recursos y valores de etiqueta adicionales según sea necesario. También puedes hacer clic en el icono **Delete** (Borrar), para eliminar una condición, o en **Clear query** (Eliminar consulta), para empezar de nuevo.

A medida que modificas la consulta, Security Graph se actualiza automáticamente para mostrar los recursos pertinentes. Junto a **View** (Vista), puedes hacer clic en **Graph** (Gráfico), para ver los recursos en un gráfico de relaciones, o en **Table** (Tabla), para verlos en una tabla.

## Más información sobre un recurso

- Cuando visualices recursos en un gráfico, puedes hacer clic en uno de ellos para ver más información:
  - Copiar información clave sobre el recurso, como el ID, la cuenta o el equipo.
  - Filtrar los recursos de la consulta actual por un valor de etiqueta específico.
  - Ver más detalles sobre el recurso.
  - Ver resultados de seguridad asociados al recurso.
- Cuando visualices recursos en una tabla, puedes hacer clic en uno de ellos para ver información adicional en el panel lateral.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}