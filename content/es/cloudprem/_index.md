---
description: Aprende a desplegar y gestionar Datadog CloudPrem, una solución de gestión
  de logs autoalojada para una ingesta, procesamiento, indexación y capacidades de
  búsqueda rentables de logs.
private: true
title: CloudPrem
---

<div class="alert alert-danger">CloudPrem está en Vista previa.</div>

## Información general

{{< img src="/cloudprem/overview_diagram_cloudprem.png" alt="Información general de la arquitectura de CloudPrem en la que se muestra cómo fluyen los logs desde sources (fuentes) a través de CloudPrem a la plataforma de Datadog" style="width:100%;" >}}

Datadog CloudPrem es una solución autoalojada de gestión de logs que permite una ingesa, procesamiento, indexación y capacidades de búsqueda rentables de logs en tu propia infraestructura. Creada para cumplir los requisitos de residencia de datos, seguridad estricta y gran volumen, CloudPrem se integra con la plataforma Datadog para proporcionar análisis, visualización y alertas de logs, todo ello manteniendo tus datos de logs en reposo dentro de los límites de tu infraestructura.

## Para empezar

{{< whatsnext >}}
   {{< nextlink href="/cloudprem/installation/" >}}Instalar CloudPrem y Enviar logs con el Agent {{< /nextlink >}}
   {{< nextlink href="/cloudprem/ingress/" >}}Configurar CloudPrem Ingress{{< /nextlink >}}
   {{< nextlink href="/cloudprem/aws_config" >}}Configurar AWS{{< /nextlink >}}
   {{< nextlink href="/cloudprem/processing/" >}}Configurar el procesamiento de logs de CloudPrem{{< /nextlink >}}
   {{< nextlink href="/cloudprem/cluster/" >}}Más información sobre dimensionamiento de clústeres y operaciones{{< /nextlink >}}
   {{< nextlink href="/cloudprem/architecture/" >}}Más información sobre la arquitectura de CloudPrem{{< /nextlink >}}   
   {{< nextlink href="/cloudprem/troubleshooting/" >}}Solucionar problemas{{< /nextlink >}}
{{< /whatsnext >}}


[1]: https://kubernetes-sigs.github.io/aws-load-balancer-controller/latest/deploy/installation/
[2]: /es/cloudprem/installation/
[3]: /es/cloudprem/processing/
[4]: /es/cloudprem/architecture/