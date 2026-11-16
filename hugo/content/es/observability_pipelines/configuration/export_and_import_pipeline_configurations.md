---
aliases:
- /es/observability_pipelines/configuration/export_pipeline_configuration/
description: Aprenda a exportar la configuración de una canalización en borrador o
  implementada a JSON o Terraform, e importe una configuración JSON en la Observability
  Pipelines UI.
disable_toc: false
further_reading:
- link: observability_pipelines/configuration/set_up_pipelines/
  tag: Documentación
  text: Configure un pipeline
- link: observability_pipelines/configuration/update_existing_pipelines/
  tag: Documentación
  text: Actualizar una pipeline existente
- link: https://docs.datadoghq.com/api/latest/observability-pipelines/
  tag: Documentación
  text: API de Observability Pipelines
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
  tag: Documentación
  text: Recurso de Terraform de Observability Pipelines
title: Exportar e importar una configuración de canalización
---
## Descripción general {#overview}

Configurar y actualizar una canalización con Terraform o la API puede llevar mucho tiempo, ser manual y propenso a errores de sintaxis. En su lugar, puede crear una canalización o actualizar una existente en la UI, y luego exportar la configuración a JSON o Terraform para crear o actualizar la canalización mediante programación. Además, puede importar la configuración de una canalización en JSON a la UI.


## Exportar la configuración de una canalización en modo borrador {#export-the-configuration-of-a-pipeline-in-draft-mode}

Al crear una canalización que aún no se ha implementado, puede configurarla en la UI y, luego, exportar la configuración de la canalización a JSON o Terraform para crearla mediante programación.

1. Navegue a [Observability Pipelines][1].
1. [Configure una canalización][2] agregando fuente, procesadores y destinos.
1. Después de haber configurado su canalización, haga clic en {{< ui >}}Export Pipeline{{< /ui >}}.
   {{< img src="observability_pipelines/export_pipeline/export_draft_pipeline.png" alt="El botón de exportación resaltado en la UI de la canalización." style="width:100%;" >}}
1. Haga clic en el botón de copiar o descargar para exportar la configuración como JSON o Terraform.
   {{< img src="observability_pipelines/export_pipeline/export_json_modal.png" alt="El modal de exportación que muestra la configuración de la canalización en JSON" style="width:100%;" >}}
1. Implemente la configuración de la canalización utilizando la [API][3] o [Terraform][4].
1. [Instale el Observability Pipelines Worker][7] para comenzar a enviar y procesar datos a través de la canalización.

## Exportar la configuración de una canalización implementada {#export-the-configuration-of-a-deployed-pipeline}

Una canalización implementada tiene un Observability Pipelines Worker instalado para enviar datos a través de la canalización y puede estar activa o inactiva.

### Exportar la configuración de una canalización {#export-a-pipelines-configuration}

Al ver una canalización implementada en la UI, puede exportar su configuración a JSON o Terraform para crearla mediante programación.

1. Navegue a [Observability Pipelines][1].
1. Seleccione una canalización implementada (el estado puede ser `active` o `inactive`) para visualizar la configuración.
1. Haga clic en {{< ui >}}Export Pipeline{{< /ui >}}.
   {{< img src="observability_pipelines/export_pipeline/export_deployed_pipeline.png" alt="El botón de exportación en una página de canalización implementada" style="width:100%;" >}}
1. Haga clic en el botón de copiar o descargar para exportar la configuración como JSON o Terraform.
1. Actualice la configuración de JSON o Terraform para cualquier cambio adicional que desee realizar y luego implemente la configuración mediante programación.
   - [Documentación de la API][5]
   - [Documentación de Terraform][4]

### Exportar la configuración de una canalización después de realizar ediciones en la canalización {#export-a-pipelines-configuration-after-making-edits-to-the-pipeline}

Al editar una canalización implementada, puede agregar nuevos componentes como [Packs][6] o actualizar las reglas de control de volumen en la UI y exportar la configuración a JSON o Terraform para implementar los cambios mediante programación.

1. Navegue a [Observability Pipelines][1].
1. Seleccione una canalización implementada (el estado puede ser `active` o `inactive`) para visualizar la configuración.
1. Realice cambios en su fuente, destinos o procesadores.
1. Antes de salir de la canalización, haga clic en {{< ui >}}Export Pipeline{{< /ui >}}.
   {{< img src="observability_pipelines/export_pipeline/export_deployed_pipeline_edit.png" alt="El botón de exportación resaltado en la página de edición de la canalización" style="width:100%;" >}}
1. Haga clic en el botón de copiar o descargar para exportar la configuración como JSON o Terraform.
   - **Nota**: Después de realizar actualizaciones en su canalización en la UI, la configuración exportada incluye los cambios más recientes, incluso si no ha guardado o implementado los cambios.
   {{< img src="observability_pipelines/export_pipeline/export_terraform_modal.png" alt="El modal de exportación que muestra la configuración de la canalización en Terraform" style="width:100%;" >}}
1. Haga clic en el logotipo de Observability Pipelines en la parte superior izquierda de la página para salir de la canalización sin guardar los cambios realizados en la UI.
   {{< img src="observability_pipelines/export_pipeline/exit_export_deployed_pipeline.png" alt="El registro de Observability Pipelines resaltado en la página de la canalización" style="width:100%;" >}}
1. Utilice la configuración copiada o descargada para actualizar su canalización mediante programación.
   - [Documentación de la API][5]
   - [Documentación de Terraform][4]

## Importar la configuración JSON de una canalización a la UI {#import-a-pipelines-json-configuration-to-the-ui}

Para ayudar a crear sus canalizaciones y transferir configuraciones de canalización entre organizaciones de Datadog, también puede importar el JSON de una canalización a la UI.

1. Navegue a [Observability Pipelines][1].
1. Seleccione una canalización de borrador para visualizar la configuración.
1. Haga clic en settings y seleccione {{< ui >}}Import Pipeline{{< /ui >}}
   {{< img src="observability_pipelines/export_pipeline/import_access.png" alt="El menú de settings que muestra Import Pipeline" style="width:100%;" >}}
1. Elija una configuración de canalización como archivo JSON desde su computadora.
   {{< img src="observability_pipelines/export_pipeline/import_select.png" alt="El modal de importación que ofrece la opción de seleccionar un archivo JSON" style="width:100%;" >}}
1. Haga clic en {{< ui >}}Import{{< /ui >}}. Esto reemplaza su configuración de canalización actual con la configuración de canalización del JSON importado.
1. [Instale el Observability Pipelines Worker y despliegue su canalización usando la UI][8].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines/
[2]: /es/observability_pipelines/configuration/set_up_pipelines/?tab=logs#set-up-a-pipeline-in-the-ui
[3]: https://docs.datadoghq.com/es/api/latest/observability-pipelines/#create-a-new-pipeline
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/observability_pipeline
[5]: https://docs.datadoghq.com/es/api/latest/observability-pipelines/#update-a-pipeline
[6]: /es/observability_pipelines/packs/
[7]: /es/observability_pipelines/configuration/install_the_worker/#api-or-terraform-pipeline-setup
[8]: https://docs.datadoghq.com/es/observability_pipelines/configuration/install_the_worker/?interface=ui&platform=docker&secrets_source=secrets_management