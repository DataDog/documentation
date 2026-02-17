---
aliases:
- /es/continuous_integration/setup_pipelines/azure
further_reading:
- link: https://www.datadoghq.com/blog/azure-pipelines-ci-visibility/
  tag: Blog
  text: Monitorizar pipelines de Azure con Datadog CI Visibility
- link: /continuous_integration/troubleshooting/
  tag: Documentación
  text: Solucionar problemas de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentación
  text: Amplía la visibilidad de los pipelines añadiendo medidas y etiquetas (tags)
    personalizadas
title: Configurar el rastreo en un pipeline de Azure
---

<div class="alert alert-danger">
Azure DevOps Server no ofrece una compatibilidad oficial.
</div>

## Información general

[Azure Pipelines][1] es un servicio de integración y entrega continua que admite cualquier lenguaje, plataforma o nube.

Configura el rastreo en Azure Pipelines para obtener información en tiempo real de tus flujos de trabajo de CI/CD, realizar un seguimiento del rendimiento de los pipelines, analizar las ineficiencias y gestionar tus operaciones de despliegue.

### Compatibilidad

| Visibilidad de pipelines | Plataforma | Definición
|---|---|---|
| [Etiquetas (tags)][10] [y medidas en tiempo de ejecución personalizadas][11] | Etiquetas y medidas en tiempo de ejecución personalizadas | Configura [etiquetas y medidas][6] en tiempo de ejecución personalizadas. |
| [Tramos (spans) personalizados][15] | Tramos personalizados | Configura tramos personalizados para tus pipelines. |

## Configurar la integración Datadog

La integración Datadog para [Azure Pipelines][16] utiliza [hooks de servicios][2] para enviar datos a Datadog.

1. Instala la extensión [Datadog CI Visibility][8] de Azure Marketplace. Hay varias extensiones que comienzan con **Datadog**. Asegúrate de que estás instalando la extensión [Datadog CI Visibility][8].

2. Para cada proyecto, ve a **Project settings > Service hooks** (Configuración del proyecto > Hooks de servicios) en Azure DevOps y selecciona el icono verde más (+) para crear una suscripción.

3. Crea una suscripción al servicio `Datadog CI Visibility` para cada uno de los siguientes tipos de webhooks. Estos tipos de eventos son necesarios y deben habilitarse individualmente.

    - Estado de ejecución modificado
    - Estado de etapa de ejecución modificado
    - Estado de trabajo en ejecución modificado
    - Aprobación de etapa de ejecución completada
    - Etapa de ejecución en espera de aprobación

4. Haz clic en **Next** (Siguiente) para continuar con el siguiente paso y configura lo siguiente:

    - **Sitio Datadog**: `{{< region-param key="dd_site" >}}`
    - **Clave de API Datadog**: Tu [clave de API Datadog][3].

5. Haz clic en **Finish** (Finalizar).

## Configuración avanzada

### Configurar varios proyectos en bloque

Datadog ofrece un [script][12] para ayudarte a habilitar hooks de servicios en varios de tus proyectos Azure, o en todos ellos, utilizando la API Azure. El script requiere Python v3 y el paquete`requests`.

Para ejecutar el script, necesitas:

- Un nombre de usuario de Azure DevOps
- Un [token de API] de Azure DevOps[13]
- Un nombre de organización de Azure DevOps


El script admite las variables de entorno `DD_API_KEY` y `DD_SITE` y los parámetros de marcadores `--dd-api-key` y `--dd-site`.

Para obtener más información, puedes ejecutar el siguiente comando:

```shell
./service_hooks.py --help
```

#### Todos los proyectos Azure

Ejemplo de habilitación de hooks en todos los proyectos:

```shell
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    --threads 4
```

#### Proyectos Azure específicos

Ejemplo de habilitación de hooks en proyectos específicos:

```shell
./service_hooks.py \
    --dd-api-key ******************** \
    --az-user "John Doe" \
    --az-token ********************** \
    --az-org datadoghq \
    projectName1 projectName2
```


### Configurar etiquetas (tags) personalizadas

Puedes configurar etiquetas personalizadas en todos los tramos de pipelines y trabajos de tus proyectos Azure para mejorar la trazabilidad. Para obtener más información, consulta [Etiquetas y medidas personalizadas][6].

### Recopilar logs de trabajos

<div class="alert alert-info">La Recopilación de logs de Azure está en Vista previa. Para solicitar acceso, rellena <a href="https://forms.gle/vXEQQcPLARdSDLd27">este formulario</a>.</div>

Datadog admite la recopilación de logs para tus pipelines de Azure DevOps.

Para habilitar la recopilación de logs de trabajos:

1. Instala un registro de la aplicación Datadog en tu consola Azure. Sigue los pasos indicados en el [cuadro de la integración Azure][14].

2. Añade el registro de la aplicación Datadog a tu organización Azure DevOps:  
  a. Ve a **Parámetros de organización** en tu consola DevOps.  
  b. Haz clic en **Users** (Usuarios) en el panel lateral izquierdo y luego en **Add Users** (Añadir usuarios).
  **Nota**: Si no ves el botón **Add Users** (Añadir usuarios), es posible que no tengas los permisos necesarios.

Para habilitar la recopilación de logs, añada el registro de tu aplicación como usuario con nivel de acceso básico a cada proyecto. También puedes hacer clic en **Add to all projects** (Añadir a todos los proyectos) para configurar todos los proyectos en bloque.

Los logs se facturan por separado de CI Visibility. La conservación, la exclusión y los índices de logs se configuran en [Gestión de Logs][18]. Los logs de trabajos de Azure se pueden identificar por las etiquetas `datadog.product:cipipeline` y `source:azurepipelines`.

## Visualizar datos de pipelines en Datadog

Las páginas [**Lista de pipelines CI**][4] y [**Ejecuciones**][5] se rellenan con datos una vez finalizados los flujos de trabajo.

La página **Lista de pipelines CI** muestra datos sólo para la rama por defecto de cada repositorio. Para obtener más información, consulta [Buscar y gestionar pipelines CI][17].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://azure.microsoft.com/en-us/products/devops/pipelines
[2]: https://learn.microsoft.com/en-us/azure/devops/service-hooks/services/webhooks?view=azure-devops
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://app.datadoghq.com/ci/pipelines
[5]: https://app.datadoghq.com/ci/pipeline-executions
[6]: /es/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: https://marketplace.visualstudio.com/items?itemName=Datadog.ci-visibility
[9]: https://learn.microsoft.com/en-us/azure/devops/pipelines/process/approvals?view=azure-devops&tabs=check-pass#approvals
[10]: /es/glossary/#custom-tag
[11]: /es/glossary/#custom-measure
[12]: https://raw.githubusercontent.com/DataDog/ci-visibility-azure-pipelines/main/service_hooks.py
[13]: https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows#create-a-pat
[14]: https://app.datadoghq.com/integrations/azure
[15]: /es/glossary/#custom-span
[16]: /es/integrations/azure_devops/
[17]: /es/continuous_integration/search/#search-for-pipelines
[18]: /es/logs/guide/best-practices-for-log-management/