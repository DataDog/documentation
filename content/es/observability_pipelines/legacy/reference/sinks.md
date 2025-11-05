---
aliases:
- /es/observability_pipelines/reference/sinks/
legacy: true
title: Sumideros
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipelines no está disponible en el sitio US1-FED Datadog.</div>
{{< /site-region >}}

Un sumidero es un destino para eventos. El diseño y el método de transmisión de cada sumidero vienen determinados por el servicio descendente con el que interactúa. Por ejemplo, el sumidero `socket` transmite eventos individuales, mientras que el sumidero `aws_s3` almacena datos en buffer y los descarga.