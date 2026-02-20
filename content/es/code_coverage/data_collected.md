---
description: Conozca los datos recopilados por Code Coverage, incluidos los webhooks
  de proveedores de código fuente, los informes de cobertura y los metadatos git.
further_reading:
- link: /code_coverage
  tag: Documentación
  text: Cobertura de código
- link: /code_coverage/setup
  tag: Documentación
  text: Configurar Code Coverage
title: Datos recopilados sobre Code Coverage
---

## Integración del proveedor de código fuente

Los datos exactos que recibe Datadog dependen de tu tipo de proveedor de códigos fuente:

{{< tabs >}}
{{% tab "GitHub" %}}

Code Coverage se basa en los siguientes webhooks de GitHub:
* Solicitud pull
* Revisión de solicitudes pull
* Comentario de revisión de la solicitud pull
* Push

Ninguno de los webhooks incluye el contenido de tu código fuente; solo incluyen metadatos sobre la solicitud pull, como título, descripción, autor, etiquetas y SHAs de confirmación.

Consulta la [documentación de eventos y cargas útiles de webhooks][1] de GitHub para obtener una descripción detallada de los datos enviados por estos webhooks.

[1]: https://docs.github.com/en/webhooks/webhook-events-and-payloads

{{% /tab %}}
{{% tab "Gitlab" %}}

Code Coverage se basa en webhooks de Gitlab. Los webhooks no incluyen el contenido de tu código fuente. Solo incluyen metadatos sobre la solicitud de fusión, como el título, la descripción, el autor, las etiquetas y los SHAs de confirmación.

Consulta la [documentación de eventos y cargas útiles de webhooks][1] de GitLab para obtener una descripción detallada de los datos enviados por estos webhooks.

[1]: https://docs.gitlab.com/user/project/integrations/webhook_events/

{{% /tab %}}
{{% tab "Azure DevOps" %}}

Code Coverage se basa en los webhooks de Azure DevOps. Los webhooks no incluyen el contenido de tu código fuente. Solo incluyen metadatos sobre la solicitud pull, como el título, la descripción, el autor, las etiquetas y los SHAs de confirmación.

Consulta la [documentación de eventos y cargas útiles de webhooks][1] de Azure DevOps para obtener una descripción detallada de los datos enviados por webhooks.

[1]: https://learn.microsoft.com/en-us/azure/devops/service-hooks/events?view=azure-devops#git.pullrequest.created

{{% /tab %}}
{{< /tabs >}}

Por defecto, al sincronizar tus repositorios, Datadog no almacena el contenido real de los archivos de tu repositorio, solo los objetos commit y tree de Git.

Consulta la [Integración de código fuente de Datadog][1] para obtener más información sobre cómo Datadog se integra con tu proveedor de código fuente.

## Carga del informe de Code Coverage

El comando `datadog-ci coverage upload` envía los siguientes datos a Datadog:
- **Informes de cobertura**: los archivos de informe, que contienen los datos de cobertura de tu base de código. Los datos dependen de la herramienta de cobertura y del formato de informe que estés utilizando, y normalmente incluyen rutas de archivos, números de línea y porcentajes de cobertura.
- **Metadatos de Git**: URL del repositorio Git, nombre de la rama, SHA de confirmación, marca temporal, información del autor y lista de rutas de archivos que se modificaron en la confirmación. Puedes desactivar la carga de metadatos de Git añadiendo `--skip-git-metadata-upload=1` al comando.
- **Resumen de diferencia de Git**: lista de rutas de archivos que se cambiaron en la confirmación, junto con los números de líneas añadidas y eliminadas. Puedes desactivar la carga de datos de diferencia añadiendo `--upload-git-diff=0` al comando.
- **Metadatos de CI**: información sobre el entorno de CI, como el proveedor CI, ID de trabajo e ID de pipeline.

No se carga ningún código fuente en Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/guide/source-code-integration