---
description: Aprenda a hacer un seguimiento de las implementaciones desde proveedores
  de CI en Datadog CD Visibility.
further_reading:
- link: /continuous_delivery/deployments
  tag: Documentación
  text: Aprenda sobre Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentación
  text: Aprenda a consultar y visualizar implementaciones
is_beta: true
title: Hacer un seguimiento de las implementaciones de proveedores de CI
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility está en visión preliminar. El acceso está limitado a las organizaciones ya inscritas.
{{< /callout >}}

## Descripción general {#overview}

Las [implementaciones][10] pueden realizarse en sus pipelines de integración continua (CI). Normalmente, estos pipelines tienen un paso de implementación que se ejecuta después de que se prueba el código fuente y se crea la imagen.

Si está ejecutando implementaciones mediante un proveedor de CI, puede hacer un seguimiento de sus implementaciones con Deployment Visibility. Asegúrese de que se cumplan los siguientes requisitos:

1. Está utilizando [Pipeline Visibility][1] para hacer un seguimiento de sus pipelines de CI.
2. Su proveedor de CI admite la función **Custom tags and measures at runtime**, que le permite añadir [etiquetas de texto y numéricas definidas por el usuario][2] a pipelines y trabajos en Pipeline Visibility.
3. Está ejecutando implementaciones en un trabajo de CI (o un [nivel relacionado][9] en su proveedor de CI). El concepto de trabajo de CI puede variar según su proveedor. Para obtener más información sobre cómo Datadog define un trabajo de CI, consulte la [sección de terminología][9].

## Configuración {#setup}

<div class="alert alert-info">
La configuración requiere <a href="https://www.npmjs.com/package/@datadog/datadog-ci"> <code>datadog-ci</code> Versión de la CLI </a> <code>2.26.0</code> o posterior.
</div>

Para configurar CD Visibility, utilice el comando `datadog-ci deployment mark` dentro del trabajo de CI que realiza la implementación.

Se requieren dos variables de entorno:

1. `DD_API_KEY`: Configure esta variable para que apunte a su [clave de API de Datadog][4].
2. `DD_BETA_COMMANDS_ENABLED`: Establézcala en 1.

Opcionalmente, puede establecer la variable de entorno `DD_SITE` en un [sitio de Datadog][3] específico. Su sitio es {{< region-param key="dd_site" code="true" >}}.

Puede enriquecer el evento de implementación que genera el comando `datadog-ci deployment mark` utilizando los siguientes parámetros:

| Parámetro       | Descripción                                                                                                                             |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `--env`         | El entorno en el que se realiza esta implementación. Por ejemplo, `prod`.                                                             |
| `--service`     | El nombre del servicio que se está implementando. Por ejemplo, `transaction-service`. Esta opción requiere la versión `2.31.1` o posterior de `datadog-ci` |
| `--revision`    | La revisión o versión que se está implementando. Por ejemplo, `1.0.0` o `v123-456`.                                                     |
| `--is-rollback` | Especifica que la implementación es una reversión.                                                                                            |
| `--tags`        | Una matriz de pares clave-valor en el formato `key:value`. Estas etiquetas se agregan al evento de implementación que se muestra en Datadog.                   |

Use `--no-fail` (predeterminado: `false`) para evitar que el comando de implementación falle si hay problemas al enviar los datos.

Si utiliza GitHub Actions como su proveedor de CI, consulte la [sección a continuación][11] para obtener consideraciones adicionales.

Una vez que haya agregado el comando a un trabajo de CI, la [página **Deployments**][5] y la [página Deployment Executions][6] se completarán con datos después de que se ejecuten los pipelines.
Para obtener más información, consulte [Explore CD Visibility Deployments][8].

### Ejemplos {#examples}

Este conjunto de comandos especifica que el trabajo de CI ejecuta una implementación en el entorno `prod` con la versión `1.0.0`:

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --revision 1.0.0
```

Este conjunto de comandos especifica que el trabajo de CI realiza una implementación de reversión en el entorno `prod`:

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --is-rollback
```

Este conjunto de comandos especifica que el trabajo de CI ejecuta una implementación en el entorno `prod` y agrega las etiquetas `team:backend` y `reason:scheduled` al evento de implementación:

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --tags team:backend --tags reason:scheduled
```

## Marcar trabajos de GitHub Actions como implementaciones {#mark-github-actions-jobs-as-deployments}


A partir de la versión `4.1.1` de `datadog-ci`, no se requiere ninguna acción adicional, incluso al usar nombres personalizados o estrategias de matriz.

{{% collapse-content title="Para versiones de datadog-ci anteriores a la 4.1.1" level="h3" expanded=false %}}

Si está utilizando una versión de `datadog-ci` entre `2.29.0` y `4.1.0` y el nombre del trabajo no coincide con la entrada definida en el archivo de configuración del flujo de trabajo (el [ID de trabajo][12] de GitHub), es necesario exponer la variable de entorno `DD_GITHUB_JOB_NAME` para que apunte al nombre del trabajo. Por ejemplo:

1. Si el nombre del trabajo se cambia usando la [propiedad name][13]:
    ```yaml
    jobs:
      deploy:
        name: My deployment job name
        env:
          DD_GITHUB_JOB_NAME: My deployment job name
        steps:
        - run: datadog-ci deployment mark ...
    ```
2. Si se utiliza la [estrategia de matriz][14], GitHub genera varios nombres de trabajo añadiendo los valores de la matriz al final del nombre del trabajo,
   entre paréntesis. La variable de entorno `DD_GITHUB_JOB_NAME` debería entonces estar condicionada a los valores de la matriz:

    ```yaml
    jobs:
      deployment:
        strategy:
          matrix:
            env: [dev, staging]
        env:
          DD_GITHUB_JOB_NAME: deployment (${{ matrix.env }})
        steps:
        - run: datadog-ci deployment mark ...
    ```

{{% /collapse-content %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/continuous_integration/pipelines/
[2]: /es/continuous_integration/pipelines/custom_tags_and_measures/
[3]: /es/getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://app.datadoghq.com/ci/deployments
[6]: https://app.datadoghq.com/ci/deployments/executions
[7]: /es/continuous_delivery/search
[8]: /es/continuous_delivery/explorer
[9]: /es/continuous_integration/pipelines/#terminology
[10]: /es/continuous_delivery/deployments
[11]: /es/continuous_delivery/deployments/ciproviders#mark-github-actions-jobs-as-deployments
[12]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_id
[13]: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#name
[14]: https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs#using-a-matrix-strategy