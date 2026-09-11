---
description: Descubre cómo CD Visibility detecta los cambios en el código.
further_reading:
- link: /continuous_delivery/deployments/
  tag: Documentación
  text: Más información sobre Deployment Visibility
- link: /continuous_delivery/explorer
  tag: Documentación
  text: Aprende a consultar y visualizar los despliegues
title: Detección de cambios en el código
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="Únete a la vista previa" >}}
CD Visibility está en Vista previa. Si te interesa esta función, rellena el formulario para solicitar acceso.
{{< /callout >}}

## Información general

La detección de cambios en el código permite a Datadog identificar las confirmaciones introducidas como parte de un despliegue. Esto es particularmente valioso para:
- Comprende dónde se han desplegado cambios específicos, como el seguimiento de cuándo llegan las actualizaciones al entorno `production`.
- Diagnostica los incidentes relacionados con un despliegue proporcionando visibilidad de los cambios exactos introducidos. Esto ayuda a los equipos a identificar rápidamente las posibles causas raíz y acelerar la resolución de problemas.

Para detectar los cambios en el código desplegado, Datadog ejecuta el [`git log`][1] entre el SHA de la confirmación de despliegue actual y el SHA de la confirmación de despliegue anterior. Las confirmaciones de fusión se excluyen del cálculo.

Los cambios de código desplegados son visibles dentro de cualquier ejecución de despliegue de la [página de Ejecuciones de despliegue][2]. La pestaña **Code Changes** (Cambios de código) muestra el despliegue anterior tomado en consideración, y los cambios de código detectados entre ambos.

{{< img src="continuous_delivery/features/code_changes_tab.png" alt="Pestaña Cambios de código para la función de detección de cambios" style="width:100%;">}}

Además, la columna **Deployments** (Despliegues) de la página [Cambios recientes en el código][3] muestra los detalles de servicio y entorno de todos los despliegues que incluyen una confirmación específica. Esta vista proporciona una forma rápida de entender si los cambios de código se han desplegado y dónde.
Al pasar el ratón por encima del valor del servicio, se muestra si el despliegue ha llegado a todos los entornos esperados, en función de dónde se despliega normalmente el servicio.

{{< img src="continuous_delivery/features/recent_code_changes_deployments.png" alt="Se muestran los despliegues en la página Cambios de código más recientes" style="width:100%;">}}

Los cambios de código solo se detectan para los despliegues que:
- Tienen un servicio (`@deployment.service`) con especificaciones de ruta de archivo definidas en el Software Catalog (ver las [instrucciones de instalación](#specify-service-file-path-patterns) para más información).
- Disponen de un entorno (`@deployment.env`).
- Tienen una URL de repositorio (`@deployment.git.repository_url`) y un SHA de confirmación (`@deployment.git.commit.sha`).

## Configurar

Para permitir la Detección de cambios de código en tus despliegues, se requieren dos pasos:
1. [Sincronizar los metadatos de tu repositorio con Datadog](#synchronize-repository-metadata-to-datadog).
2. [Especificar la ruta del archivo de código fuente para tus servicios](#specify-service-file-path-patterns).

### Sincronizar los metadatos del repositorio con Datadog

<!--
Las siguientes pestañas se copiaron principalmente desde los documentos de la integración del código fuente hasta que encontremos una manera de comprobar esto en una página compartida
https://docs.datadoghq.com/integrations/guide/source-code-integration/?tab=github#synchronize-your-repository-metadata
-->

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
Los procesos de GitHub que ejecutan el activador<a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> <code>pull_request</code> no </a> con compatibles con la integración de GitHub.
Si usas el activador <code>pull_request</code>, usa el método alternativo.
</div>

Si la [integración de GitHub][1] no está ya instalada, puedes instalarla en el [ícono de integración de GitHub][2].

Al configurar la aplicación de GitHub:
1. Selecciona al menos permisos de **Lectura** del repositorio para **Contenido** y **Solicitudes de extracción**.
2. Suscríbete al menos a los eventos **Push**, **PullRequest** y **PullRequestReview**.

Para confirmar que la configuración es válida, selecciona tu aplicación de GitHub en el [cuadro de integración de GitHub][2] y comprueba que, en la tabla **Datadog Features** (Funciones de Datadog), la función **Pull Request Information** (Información de solicitudes pull) está marcada como válida.

[1]: https://docs.datadoghq.com/es/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}

Sigue las instrucciones [de incorporación dentro de la aplicación][1] para configurar la integración del código fuente de GitLab.

**Nota**: El alcance del token de acceso personal de la cuenta de servicio debe ser al menos `read_api`.

[1]: https://app.datadoghq.com/integrations/gitlab-source-code?subPath=configuration
{{% /tab %}}

{{% tab "Other Git Providers" %}}

Puedes cargar los metadatos de tu repositorio de Git con el comando [`datadog-ci git-metadata upload`][1].
Cuando se ejecuta este comando, Datadog recibe la URL del repositorio, el SHA de confirmación de la rama actual y una lista de rutas de archivos rastreados.

Ejecuta este comando en CI para cada nueva confirmación. Cuando se ejecuta un despliegue para un SHA de confirmación específico, asegúrate de que el comando `datadog-ci git-metadata upload` se ejecute para esa confirmación **antes** de que se envíe el evento del despliegue.

<div class="alert alert-danger">
No proporciones la opción <code>--no-gitsync</code> al comando <code>datadog-ci git-metadata upload</code>.
Cuando se incluye esa opción, la información de confirmación no se envía a Datadog y no se detectan los cambios.
</div>

Puedes validar la configuración correcta del comando comprobando la salida del comando. Un ejemplo de una salida correcta es el siguiente:
```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

### Especificar patrones de ruta de archivos de servicio

Para comprender correctamente los cambios de código que ha introducido un despliegue, solo deben tenerse en cuenta las confirmaciones que afectan al servicio específico que se está desplegando.

Esto se puede hacer en [Software Catalog][5] especificando, para los servicios interesados, los patrones de ruta del archivo glob del código fuente en la [definición del servicio][4].

Si la definición del servicio contiene una URL **completa** de GitHub o GitLab a la carpeta de la aplicación, se utilizará automáticamente un patrón de ruta único. El tipo de enlace debe ser **repo** y el nombre del enlace debe ser "source" o el nombre del servicio (`shopist` en los ejemplos siguientes).

Si tu repositorio contiene un único servicio y deseas que se tengan en cuenta todos los directorios para los cambios de código, puedes omitir este paso. Si despliegas dos o más servicios desde un repositorio, es necesario especificar los patrones de ruta del código fuente.

**Ejemplo (versión del esquema v2.2):**

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

La detección de cambios en el código para los despliegues del servicio `shopist` solo tendrá en cuenta las confirmaciones de Git que incluyan cambios dentro de la ruta `src/apps/shopist/**`. Puedes configurar un control más detallado utilizando `extensions[datadoghq.com/cd-visibility]` o `extensions[datadoghq.com/dora-metrics]`. Si se detectan ambas extensiones, se utiliza `extensions[datadoghq.com/cd-visibility]`.

**Ejemplo (versión del esquema v2.2):**

```yaml
extensions:
  datadoghq.com/cd-visibility:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

La detección de cambios en el código para los despliegues del servicio `shopist` solo tendrá en cuenta las confirmaciones de Git que incluyan cambios en las rutas `src/apps/shopist/**` o `src/libs/utils/**`.

Si los patrones de código fuente para un servicio se definen tanto en un enlace como en una extensión, al filtrar las confirmaciones solo se tiene en cuenta la extensión.

#### Utiliza patrones de ruta de archivos de servicio para realizar un seguimiento de los cambios en todo el repositorio.
Para detectar cambios en todo el repositorio, utiliza los patrones de ruta de archivos adecuados. Por ejemplo, `"**"` coincide con todos los archivos.

**Ejemplo (versión del esquema v2.2):**

```yaml
extensions:
  datadoghq.com/cd-visibility:
    source_patterns:
      - "**"
```

En este caso, la detección de cambios de código para despliegues del servicio `shopist` considerará las confirmaciones de Git que incluyan cambios en todo el árbol de repositorios.

<div class="alert alert-danger">Si un patrón es exactamente <code>**</code> o comienza con él, enciérralo entre comillas, ya que <code>*</code> está reservado en YAML para los anclajes.</div>


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://git-scm.com/docs/git-log
[2]: https://app.datadoghq.com/ci/deployments/executions
[3]: https://app.datadoghq.com/ci/commits
[4]: /es/tracing/software_catalog/adding_metadata
[5]: /es/tracing/software_catalog