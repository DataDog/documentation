---
description: Aprende cómo monitorizar despliegues de proveedores de CI en Datadog
  CD Visibility.
further_reading:
- link: /continuous_delivery/deployments
  tag: Documentación
  text: Más información sobre Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentación
  text: Aprende a consultar y visualizar los despliegues
is_beta: true
title: Monitorizar los despliegues de proveedores de CI
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Únete a la vista previa" >}}
CD Visibility para los despliegues del proveedor de CI está en vista previa. Si estás interesado en esta función, completa el formulario para solicitar acceso.
{{< /callout >}}

## Información general

Los [Despliegues][10] pueden realizarse en tus pipelines de integración continua (CI). Típicamente, estos pipelines tienen un paso de despliegue que se ejecuta después de que el código fuente se testea y la imagen se construye.

Si estás ejecutando despliegues utilizando un proveedor de CI, puedes monitorizar tus despliegues con Deployment Visibility. Asegúrate de que se cumplen los siguientes requisitos:

1. Estás utilizando [Pipeline Visibility][1] para monitorizar tus pipelines de CI.
2. Tu proveedor de CI admite la función **Etiquetas y medidas personalizadas en tiempo de ejecución**, que te permite añadir [etiquetas numéricas y de texto definidas por el usuario][2] a pipelines y trabajos en Pipeline Visibility.
3. Estás ejecutando despliegues en un trabajo de CI (o un [nivel relacionado][9] en tu proveedor de CI). El concepto de un trabajo de CI puede variar dependiendo de tu proveedor. Para más información sobre cómo Datadog define un trabajo de CI, consulta la [sección Terminología][9].

## Configurar

<div class="alert alert-info">
La configuración requiere la versión <a href="https://www.npmjs.com/package/@datadog/datadog-ci"> <code>de la CLI</code> de datadog-ci</a> `2.26.0` o posterior.
</div>

Para configurar CD Visibility, utiliza el comando `datadog-ci deployment mark` dentro del trabajo de CI que está realizando el despliegue.

Se necesitan dos variables de entorno:

1. `DD_API_KEY`: dirigida a tu [clave de API de Datadog][4].
2. `DD_BETA_COMMANDS_ENABLED`: establecida en 1.

Opcionalmente, puedes establecer la variable de entorno `DD_SITE` a un [sitio de Datadog][3] específico. Tu sitio es {{< region-param key="dd_site" code="true" >}}.

Puedes mejorar el evento de despliegue que genera el comando `datadog-ci deployment mark` utilizando los siguientes parámetros:

| Parámetro       | Descripción                                                                                                                             |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| `--env`         | El entorno en el que se realiza este despliegue. Por ejemplo, `prod`.                                                             |
| `--service`     | El nombre del servicio que se está desplegando. Por ejemplo, `transaction-service`. Esta opción requiere `datadog-ci` versión `2.31.1` o posterior. |
| `--revision`    | La revisión o versión que se está desplegando. Por ejemplo, `1.0.0` o `v123-456`.                                                     |
| `--is-rollback` | Especifica que el despliegue es un rollback (reversión).                                                                                            |
| `--tags`        | Una matriz de pares clave-valor en el formato `key:value`. Estas etiquetas se añaden al evento de despliegue mostrado en Datadog.                   |

Utiliza `--no-fail` (por defecto: `false`) para evitar que el comando de despliegue falle si hay problemas al enviar los datos.

Si estás utilizando acciones de GitHub como tu proveedor de CI, consulta la [sección siguiente][11] para consideraciones adicionales.

Una vez que hayas añadido el comando a un trabajo de CI, la [página **Despliegues**][5] y la [página Ejecuciones de despliegue][6] se rellenan con datos después de que se ejecuten pipelines.
Para obtener más información, consulta [Explorar despliegues de CD Visibility][8].

### Ejemplos

Este conjunto de comandos especifica que el trabajo de CI ejecute un despliegue en el entorno `prod` con la versión `1.0.0`:

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --revision 1.0.0
```

Este conjunto de comandos especifica que el trabajo de CI realiza un despliegue rollback (reversión) al entorno `prod`:

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --is-rollback
```

Este conjunto de comandos especifica que el trabajo de CI ejecute un despliegue en el entorno `prod` y añada las etiquetas `team:backend` y `reason:scheduled` al evento de despliegue:

```shell
export DD_BETA_COMMANDS_ENABLED=1
export DD_API_KEY="<YOUR_API_KEY>"
export DD_SITE={{< region-param key="dd_site" >}}

datadog-ci deployment mark --env prod --tags team:backend --tags reason:scheduled
```

## Marcar trabajos de acciones de GitHub como despliegues

Para marcar los trabajos de GitHub como despliegues, se requiere la versión `datadog-ci CLI` `2.29.0` o posterior.
Si el nombre del trabajo no coincide con la entrada definida en el archivo de configuración del flujo de trabajo (el [ID del trabajo][12] de GitHub),
la variable de entorno `DD_GITHUB_JOB_NAME` necesita ser expuesta, apuntando al nombre del trabajo. Por ejemplo:
1. Si se cambia el nombre del trabajo utilizando la [propiedad name][13]:
    ```yaml
    jobs:
      deploy:
        name: My deployment job name
        env:
          DD_GITHUB_JOB_NAME: My deployment job name
        steps:
        - run: datadog-ci deployment mark ...
    ```
2. Si se utiliza la [estrategia de matriz][14], GitHub genera varios nombres de tarea añadiendo los valores de matriz al final del nombre de la tarea,
   entre paréntesis. La variable de entorno `DD_GITHUB_JOB_NAME` debe entonces ser condicional a los valores de la matriz:

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

## Referencias adicionales

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