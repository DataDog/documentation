---
description: Conecte sus repositorios de Git a Datadog a través de Integrations de
  proveedores de gestión de código fuente (SCM).
further_reading:
- link: /integrations/github/
  tag: Documentación
  text: Obtenga información sobre la integración con GitHub
- link: /integrations/gitlab-source-code/
  tag: Documentación
  text: Obtenga información sobre GitLab Source Code Integration
- link: /integrations/azure-devops-source-code/
  tag: Documentación
  text: Obtenga información sobre Azure DevOps Source Code Integration
- link: /integrations/bitbucket-source-code/
  tag: Documentación
  text: Obtenga información sobre Bitbucket Source Code Integration
title: Proveedores de gestión de código fuente
---
## Descripción general {#overview}

Para utilizar la mayoría de las funciones relacionadas con el código fuente, debe conectar sus repositorios de Git a Datadog a través de Integrations de proveedores de gestión de código fuente (SCM) propias de Datadog. Después de conectar sus repositorios, Datadog puede almacenar el contenido de sus repositorios durante un máximo de 7 días para reducir las solicitudes repetidas al repositorio y respaldar el rendimiento de las funciones.

## Proveedores de gestión de código fuente {#source-code-management-providers}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">La integración GitLab Source Code no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}). En GovCloud, utilice la <a href="/integrations/github/">integración de GitHub</a> para la conectividad del código fuente.</div>
{{< /site-region >}}

Datadog admite las siguientes funciones para los proveedores de SCM enumerados a continuación. Consulte [Features][1] para obtener más detalles sobre cada función:

| Función | GitHub | GitLab | Azure DevOps | Bitbucket |
|---|---|---|---|---|
| **Connect SaaS Instance** | Sí <br />(GitHub.com y GitHub Enterprise Cloud) | Sí <br />(GitLab.com) | Sí <br />(Azure DevOps Services) | Sí <br />(Bitbucket Cloud Premium) |
| **Connect On-Prem Instance** | Sí <br />(GitHub Enterprise Server) | Sí <br />(GitLab Self-Managed o Dedicated) | No <br />(Azure DevOps Server) | No <br />(Bitbucket Data Center o Server)|
| **Context Links** | Sí | Sí | Sí | Sí |
| **Code Snippets** | Sí | Sí | Sí | Sí |
| **PR Comments** | Sí | Sí | Sí | Sí |

{{< tabs >}}
{{% tab "GitHub (SaaS y On-Prem)" %}}

<div class="alert alert-info">
Los repositorios de instancias de GitHub son compatibles con GitHub.com, GitHub Enterprise Cloud (SaaS) y GitHub Enterprise Server (On-Prem). Para GitHub Enterprise Server, su instancia debe ser accesible desde internet. Si es necesario, puede agregar las direcciones IP <a href="https://docs.datadoghq.com/api/latest/ip-ranges/">de Datadog <code>webhooks</code> </a> a la lista de permitidos para que Datadog pueda conectarse a su instancia.</br>Si su instancia está alojada en una red interna o privada, pero está expuesta mediante un alias de DNS público (recomendado), configure la integración con el nombre de host público y, luego, <a href="/help">comuníquese con Datadog Support</a> e indique tanto el nombre de host público como el interno para habilitar el uso de alias de nombres de host.
</div>

Instale la [integración de GitHub][101] de Datadog mediante el [mosaico de integración][102] o durante la configuración inicial de otros productos de Datadog para conectarse a sus repositorios de GitHub.

[101]: https://docs.datadoghq.com/es/integrations/github/
[102]: https://app.datadoghq.com/integrations/github/

{{% /tab %}}
{{% tab "GitLab (SaaS y On-Prem)" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">La integración GitLab Source Code no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}). En GovCloud, utilice la <a href="/integrations/github/">integración de GitHub</a> para la conectividad del código fuente.</div>
{{< /site-region >}}

<div class="alert alert-info">
Los repositorios de instancias de GitLab son compatibles tanto para GitLab.com (SaaS) como para GitLab Self-Managed/Dedicated (On-Prem). Para GitLab Self-Managed, su instancia debe ser accesible desde internet. Si es necesario, puede agregar las direcciones IP <a href="https://docs.datadoghq.com/api/latest/ip-ranges/">de Datadog <code>webhooks</code> </a> a la lista de permitidos para que Datadog pueda conectarse a su instancia.</br>Si su instancia está alojada en una red interna o privada, pero está expuesta mediante un alias de DNS público (recomendado), configure la integración con el nombre de host público y, luego, <a href="/help">comuníquese con Datadog Support</a> e indique tanto el nombre de host público como el interno para habilitar el uso de alias de nombres de host.
</div>

Instale la [integración GitLab Source Code][101] de Datadog mediante el [mosaico de integración][102] o durante la configuración inicial de otros productos de Datadog para conectarse a sus repositorios de GitLab.

[101]: https://docs.datadoghq.com/es/integrations/gitlab-source-code/
[102]: https://app.datadoghq.com/integrations/gitlab-source-code/

{{% /tab %}}
{{% tab "Azure DevOps (solo SaaS)" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">La integración Azure DevOps Source Code no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}). En GovCloud, utilice la <a href="/integrations/github/">integración de GitHub</a> para la conectividad del código fuente.</div>
{{< /site-region >}}

<div class="alert alert-warning">
Los repositorios de organizaciones de Azure DevOps son compatibles con Azure DevOps Services (SaaS). Azure DevOps Server (On-Prem) <strong>no</strong> es compatible.
</div>

Instale la integración Azure DevOps Source Code de Datadog usando el [mosaico de integración][101] o durante la incorporación de otros productos de Datadog para conectarse a sus repositorios de Azure DevOps.

[101]: https://app.datadoghq.com/integrations/azure-devops-source-code/

{{% /tab %}}
{{% tab "Bitbucket (solo SaaS)" %}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">La integración Bitbucket Cloud Source Code no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}). En GovCloud, utilice la <a href="/integrations/github/">integración de GitHub</a> para la conectividad del código fuente.</div>
{{< /site-region >}}

<div class="alert alert-warning">
Los repositorios de espacios de trabajo de Bitbucket son compatibles con Bitbucket Cloud (SaaS). Bitbucket Server y Bitbucket Data Center (On-Prem) <strong>no</strong> son compatibles.
</div>

La [integración de Bitbucket][103] recopila eventos del repositorio.

Instale la [integración Bitbucket Cloud Source Code][102] de Datadog usando el [mosaico de integración][101] o durante la incorporación de otros productos de Datadog para conectarse a sus repositorios de Bitbucket Cloud.

[101]: https://app.datadoghq.com/integrations/bitbucket-source-code/
[102]: /es/integrations/bitbucket-source-code/
[103]: /es/integrations/bitbucket/

{{% /tab %}}
{{% tab "Otros proveedores de SCM" %}}

<div class="alert alert-danger">
Los repositorios en instancias autohospedadas o URLs privadas no son compatibles de forma predeterminada. Para habilitar esta función, <a href="/help">comuníquese con Support</a>.
</div>

Si está utilizando cualquier otro proveedor de SCM, aún puede vincular manualmente la telemetría con su código fuente. Para hacerlo, cargue los metadatos de su repositorio con el comando [`datadog-ci git-metadata upload`][1]. Se requiere `datadog-ci v2.10.0` o una versión posterior.

Cuando ejecuta `datadog-ci git-metadata upload` dentro de un repositorio de Git, Datadog recibe la URL del repositorio, el SHA de confirmación de la rama actual y una lista de rutas de archivos rastreados.

Ejecute este comando para cada confirmación que necesite sincronizar con Datadog.

### Validación {#validation}

Para asegurarse de que los datos se estén recopilando, ejecute `datadog-ci git-metadata upload` en su canalización de CI.

Puede esperar ver el siguiente resultado:

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@my-git-server.com:my-org/my-repository.git.
180 tracked file paths will be reported.
Successfully uploaded tracked files in 1.358 seconds.
Syncing GitDB...
Successfully synced git DB in 3.579 seconds.
✅ Uploaded in 5.207 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/source_code/features/