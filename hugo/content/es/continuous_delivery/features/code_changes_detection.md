---
description: Aprenda cómo CD Visibility detecta cambios en el código.
further_reading:
- link: /continuous_delivery/deployments/
  tag: Documentación
  text: Aprenda sobre Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentación
  text: Aprenda a consultar y visualizar implementaciones
title: Detección de cambios en el código
---
{{< callout btn_hidden="true" header="false" >}}
CD Visibility está en visión preliminar. El acceso está limitado a las organizaciones ya inscritas.
{{< /callout >}}

## Descripción general {#overview}

Code Changes Detection permite a Datadog identificar los commits introducidos como parte de una implementación. Esto es particularmente valioso para:
- Entender dónde se han implementado cambios específicos, como realizar un seguimiento de cuándo llegan las actualizaciones al entorno `production`.
- Diagnosticar incidentes relacionados con una implementación proporcionando visibilidad sobre los cambios exactos introducidos. Esto ayuda a los equipos a identificar rápidamente las posibles causas raíz y acelerar la resolución de problemas.

Para detectar los cambios de código implementados, Datadog ejecuta [`git log`][1] entre el SHA del commit de implementación actual y el SHA del commit de implementación anterior. Los commits de fusión se excluyen del cálculo.

Los cambios de código implementados son visibles dentro de cualquier ejecución de implementación de la [página Deployment Executions][2]. La pestaña {{< ui >}}Code Changes{{< /ui >}} muestra la implementación anterior tomada en consideración y los cambios de código detectados entre ambas.

{{< img src="continuous_delivery/features/code_changes_tab.png" alt="Pestaña Code Changes para la función Code Changes Detection" style="width:100%;">}}

Además, la columna {{< ui >}}Deployments{{< /ui >}} de la página [Recent Code Changes][3] muestra los detalles del servicio y el entorno para todas las implementaciones que incluyeron un commit específico. Esta vista proporciona una forma rápida de entender si sus cambios de código están implementados y dónde.
Al pasar el cursor sobre el valor del servicio se revela si la implementación ha llegado a todos los entornos esperados, según dónde se implementa normalmente el servicio.

{{< img src="continuous_delivery/features/recent_code_changes_deployments.png" alt="Implementaciones en la página Recent Code Changes" style="width:100%;">}}

Los cambios de código solo se detectan para las implementaciones que:
- Tienen un servicio (`@deployment.service`) con especificaciones de ruta de archivo definidas en Catalog (consulte las [instrucciones de configuración](#specify-service-file-path-patterns) para obtener más información).
- Tienen un entorno (`@deployment.env`).
- Tienen una URL de repositorio (`@deployment.git.repository_url`) y un SHA de commit (`@deployment.git.commit.sha`).

## Configuración {#setup}

Para habilitar Code Changes Detection en sus implementaciones, se requieren dos pasos:
1. [Sincronice los metadatos de su repositorio con Datadog](#synchronize-repository-metadata-to-datadog).
2. [Especifique la ruta del archivo de código fuente para sus servicios](#specify-service-file-path-patterns).

### Sincronice los metadatos del repositorio con Datadog {#synchronize-repository-metadata-to-datadog}

<!--
The Following tabs were mostly copied from the Source Code Integration docs until we find a way to document this in a shared page
https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=github#synchronize-your-repository-metadata
-->

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
Los flujos de trabajo de GitHub que ejecutan el <a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> <code>pull_request</code> activador </a> no son compatibles con la integración de GitHub.
Si está utilizando el <code>pull_request</code> activador, utilice el método alternativo.
</div>

Si la [integración de GitHub][1] aún no está instalada, instálelo en el [mosaico de integración de GitHub][2].

Al configurar GitHub App:
1. Seleccione al menos {{< ui >}}Read{{< /ui >}} permisos de repositorio para {{< ui >}}Contents{{< /ui >}} y {{< ui >}}Pull Requests{{< /ui >}}.
2. Suscríbase al menos a los eventos {{< ui >}}Push{{< /ui >}}, {{< ui >}}PullRequest{{< /ui >}} y {{< ui >}}PullRequestReview{{< /ui >}}.

Para confirmar que la configuración es válida, seleccione su GitHub App en el [mosaico de integración de GitHub][2] y verifique que, en la tabla {{< ui >}}Datadog Features{{< /ui >}}, la función {{< ui >}}Pull Request Information{{< /ui >}} esté marcada como válida.

[1]: https://docs.datadoghq.com/es/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}

Siga la [guía de configuración en la aplicación][1] para configurar la integración GitLab Source Code.

**Nota**: El contexto del token de acceso personal de la cuenta de servicio debe ser al menos `read_api`.

[1]: https://app.datadoghq.com/integrations/gitlab-source-code?subPath=configuration
{{% /tab %}}

{{% tab "Otros proveedores de Git" %}}

Puede cargar los metadatos de su repositorio de Git con el comando [`datadog-ci git-metadata upload`][1].
Cuando se ejecuta este comando, Datadog recibe la URL del repositorio, el SHA de confirmación de la rama actual y una lista de rutas de archivos rastreados.

Ejecute este comando en CI para cada nueva confirmación. Cuando se ejecuta una implementación para un SHA de commit específico, asegúrese de que el comando `datadog-ci git-metadata upload` se ejecute para ese commit **antes** de que se envíe el evento de implementación.

<div class="alert alert-danger">
No proporcione la <code>--no-gitsync</code> opción a la <code>datadog-ci git-metadata upload</code> comando.
Cuando se incluye esa opción, la información del commit no se envía a Datadog y los cambios no se detectan.
</div>

Puede validar la configuración correcta del comando verificando la salida del comando. Un ejemplo de una salida correcta es:

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

### Especifique los patrones de ruta de archivo del servicio {#specify-service-file-path-patterns}

Para comprender correctamente los cambios de código que ha introducido una implementación, solo se deben considerar los commits que afectan al servicio específico que se está implementando.

Esto se puede hacer en [Catalog][5] especificando, para los servicios correspondientes, los patrones glob de rutas de archivos de código fuente en la [definición del servicio][4].

Si la definición del servicio contiene una URL **completa** de GitHub o GitLab a la carpeta de la aplicación, se utiliza automáticamente un único patrón de ruta. El tipo de enlace debe ser **repo** y el nombre del enlace debe ser "Source" o el nombre del servicio (`shopist` en los ejemplos a continuación).

Si su repositorio contiene un solo servicio y desea que se consideren todos los directorios para los cambios de código, puede omitir este paso. Si implementa dos o más servicios desde un repositorio, es necesario especificar los patrones de ruta del código fuente.

**Ejemplo (versión de esquema v2.2):**

{{< tabs >}}
{{% tab "GitHub" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: github
    url: https://github.com/organization/example-repository/tree/main/src/apps/shopist
```

{{% /tab %}}

{{% tab "GitLab" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: gitlab
    url: https://gitlab.com/organization/example-repository/-/tree/main/src/apps/shopist?ref_type=heads
```

{{% /tab %}}
{{< /tabs >}}

Code Changes Detection para las implementaciones del servicio `shopist` solo considerará los commits de Git que incluyan cambios dentro de la ruta `src/apps/shopist/**`. Puede configurar un control más detallado utilizando `extensions[datadoghq.com/cd-visibility]` o `extensions[datadoghq.com/dora-metrics]`. Si se detectan ambas extensiones, se utiliza `extensions[datadoghq.com/cd-visibility]`.**Ejemplo (versión de esquema v2.2):**

```yaml
extensions:
  datadoghq.com/cd-visibility:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

Code Changes Detection para las implementaciones del servicio `shopist` solo considerará los commits de Git que incluyan cambios dentro de la ruta `src/apps/shopist/**` o la ruta `src/libs/utils/**`.

Si los patrones de código fuente para un servicio se definen tanto en un enlace como en una extensión, solo se considera la extensión al filtrar los commits.

#### Utilice patrones de ruta de archivo de servicio para realizar un seguimiento de los cambios en todo el repositorio {#use-service-file-path-patterns-to-track-changes-across-the-entire-repository}
Para detectar cambios en todo el repositorio, utilice los patrones de ruta de archivo adecuados. Por ejemplo, `"**"` coincide con todos los archivos.**Ejemplo (versión de esquema v2.2):**

```yaml
extensions:
  datadoghq.com/cd-visibility:
    source_patterns:
      - "**"
```

En este caso, Code Changes Detection para las implementaciones del servicio `shopist` considerará los commits de Git que incluyan cambios en todo el árbol del repositorio.

<div class="alert alert-danger">Si un patrón es exactamente <code>**</code> o comienza con él, enciérrelo entre comillas, ya que <code>*</code> está reservado en YAML para anclas.</div>


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://git-scm.com/docs/git-log
[2]: https://app.datadoghq.com/ci/deployments/executions
[3]: https://app.datadoghq.com/ci/commits
[4]: /es/internal_developer_portal/catalog/entity_model/
[5]: /es/internal_developer_portal/catalog/