---
aliases:
- /es/bits_ai/bits_ai_dev_agent/setup/
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/bits-code/
  tag: Blog
  text: Convierta los hallazgos de Datadog en correcciones de código automatizadas
    con Bits Code
title: Configuración de Bits Code
---
## Descripción general {#overview}

[Bits Code][8] se integra con [proveedores de código fuente][11] para abrir, actualizar e iterar en solicitudes de extracción o fusión basadas en problemas detectados en Datadog. Después de completar la configuración, puede [comenzar a usar Bits Code][7].

## Requisitos previos {#prerequisites}

Para configurar Bits Code, necesita el [permiso `Bits Code Write` (`bits_dev_write`)][1]. Este permiso está incluido en roles gestionados de Datadog, como el rol estándar de Datadog.

Si su organización utiliza roles personalizados, un administrador debe agregar este permiso manualmente. Para obtener más detalles, consulte [Access Control][1].

## Configuración {#setup}

Configure Bits Code para uno de los [proveedores de código fuente compatibles][11].

{{< tabs >}}

{{% tab "GitHub" %}}
1. Instale la [integración de GitHub][1]. Para conocer los pasos completos de instalación y configuración, consulte la [guía de integración de GitHub][2].
1. En su cuenta de GitHub, navegue a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Apps{{< /ui >}} > {{< ui >}}Datadog{{< /ui >}} para configurar los permisos de GitHub.
   1. Para habilitar la funcionalidad básica de Bits Code, establezca los siguientes permisos:
      - {{< ui >}}Repository permissions{{< /ui >}}
        - Contenido del repositorio: Lectura y escritura
        - Solicitudes de extracción: Lectura y escritura
      - {{< ui >}}Subscribe to events{{< /ui >}}
        - Push
   1. (Opcional) Para permitir que Bits Code utilice registros de CI al iterar en solicitudes de extracción, debe enviar los registros de CI a Datadog y habilitar la función [auto-push](#enable-auto-push). Esto requiere permisos adicionales:  
       - {{< ui >}}Repository permissions{{< /ui >}}
         - Verificaciones: Lectura  
         - Estados de confirmación: Solo lectura 
       - {{< ui >}}Subscribe to events{{< /ui >}}
         - Ejecución de verificación
         - Conjunto de verificaciones  
         - Comentario de incidencia  
         - Estado

[1]: https://app.datadoghq.com/integrations/github
[2]: /es/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}
1. Instale la [integración de código fuente de GitLab][1]. Para conocer los pasos completos de instalación y configuración, consulte la [guía de integración de código fuente de GitLab][2].
1. Verifique que la [cuenta de servicio][3] de GitLab cumpla con los siguientes requisitos:
   - La cuenta de servicio debe tener el [rol de desarrollador][4] en el proyecto. Este rol puede heredarse de un [grupo][5].
   - El [token de acceso personal][7] de la cuenta de servicio debe tener los siguientes [ámbitos][6]: `api`, `write_repository` y `read_user`. 

   <div class="alert alert-warning">No puede modificar los ámbitos de un token de acceso personal de GitLab existente. Si necesita crear un token que incluya los ámbitos anteriores, agregue <a href="/integrations/gitlab-source-code/#required-gitlab-scopes"> todos los ámbitos requeridos </a> por otros productos de Datadog que utilicen la integración de código fuente de GitLab.</div>

[1]: https://app.datadoghq.com/integrations/gitlab-source-code
[2]: /es/integrations/gitlab-source-code/
[3]: https://docs.gitlab.com/user/profile/service_accounts/
[4]: https://docs.gitlab.com/user/permissions/#default-roles
[5]: https://docs.gitlab.com/user/permissions/#groups
[6]: https://docs.gitlab.com/user/profile/personal_access_tokens/#personal-access-token-scopes
[7]: https://docs.gitlab.com/user/profile/personal_access_tokens/
{{% /tab %}}

{{% tab "Azure DevOps" %}}
1. Instale la [integración de código fuente de Azure DevOps][101]. Para conocer los pasos completos de instalación y configuración, consulte la [guía de integración de código fuente de Azure DevOps][102].
2. Verifique que la entidad de servicio de la aplicación de Microsoft Entra sea un Colaborador del proyecto en cada proyecto, o que pertenezca a un grupo personalizado con los siguientes [permisos de repositorio][103]:
   - Contribuir
   - Contribuir a las solicitudes de extracción
   - Crear rama
   - Leer

Si la [validación de correo electrónico del autor de la confirmación][104] está habilitada, agregue `no-reply@dtdg.co` a las direcciones de correo electrónico permitidas. Bits Code utiliza esta dirección para las confirmaciones que crea.

[101]: https://app.datadoghq.com/integrations/azure-devops-source-code
[102]: /es/integrations/azure-devops-source-code/
[103]: https://learn.microsoft.com/en-us/azure/devops/repos/git/set-git-repository-permissions
[104]: https://learn.microsoft.com/en-us/azure/devops/repos/git/repository-settings#commit-author-email-validation-policy
{{% /tab %}}

{{< /tabs >}}

## Configuración adicional {#additional-configuration}

Estas configuraciones opcionales le ayudan a aprovechar al máximo Bits Code.

### Configurar el etiquetado de telemetría {#configure-telemetry-tagging}

Bits Code utiliza las etiquetas de telemetría `service` y `version` para hacer coincidir los problemas detectados (como errores o vulnerabilidades) con la versión del código que se estaba ejecutando en ese momento.  

Para configurar el etiquetado de telemetría, consulte [Etiquete su telemetría de APM con información de Git][4]. 

También puede configurar la asignación de servicio a repositorio manualmente en la configuración de Bits Code en [{{< ui >}}Repositories{{< /ui >}}][5] > {{< ui >}}Service Repository Mapping{{< /ui >}}.

### Habilitar auto-push {#enable-auto-push}

Auto-push permite que Bits Code cree ramas, envíe código y abra PR o MR cuando detecta algo con lo que puede ayudarle. Auto-push solo abre PR o MR y envía cambios; nunca fusiona código. Cuando auto-push está deshabilitado, debe revisar el código en Datadog antes de que se envíe.

Para habilitar auto-push, navegue a {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}General{{< /ui >}}][6].


#### Consideraciones de seguridad{#security-considerations}

Permitir que cualquier herramienta basada en IA lea datos no confiables puede permitir que los atacantes influyan en su resultado. El comportamiento de auto-push depende del tipo de datos con los que trabaja Bits Code: los flujos de trabajo que solo usan código operan sobre el código fuente que el Agent puede inspeccionar directamente, mientras que los flujos de trabajo basados en telemetría (como errores o trazas) pueden incluir entradas de tiempo de ejecución no confiables.

Para equilibrar la seguridad y la automatización, puede configurar el comportamiento de auto-push en [Datadog][6] (por ejemplo, limitando auto-push a flujos de trabajo que solo usan código o requiriendo una revisión cuando hay telemetría involucrada). Datadog escanea todo el código generado por el Agent antes de enviar los cambios, pero estas medidas de seguridad no son infalibles.

### Configurar instrucciones personalizadas{#configure-custom-instructions}

Bits Code ingiere archivos de instrucciones personalizadas desde su repositorio, incluyendo:

- `AGENTS.md`
- `CLAUDE.md`
- `agent.md`
- `.cursorrules`
- `.windsurfrules`
- `copilot-instructions.md`

También puede definir instrucciones personalizadas globales que se apliquen a todas las sesiones de Bits Code en {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}General{{< /ui >}}][6], en la sección {{< ui >}}Global Agent Instructions{{< /ui >}}.

Un archivo de instrucciones personalizadas es un buen lugar para mencionar las [habilidades personalizadas][12] que le gustaría que Bits Code utilizara.

## Configuración del entorno {#environment-setup}

Configure el entorno de ejecución de Bits Code, incluidas las políticas de acceso a la red y las herramientas específicas del repositorio.

### Configurar el acceso a internet {#configure-internet-access}

De forma predeterminada, Bits Code **no tiene acceso a internet** durante la ejecución del agente. Para configurar a qué dominios externos pueden acceder los agentes, navegue a {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}General{{< /ui >}}][6] y busque la sección {{< ui >}}Internet Access{{< /ui >}}. Elija entre las siguientes políticas de acceso: {{< ui >}}No Internet Access{{< /ui >}}, {{< ui >}}Default Allowlist{{< /ui >}}, {{< ui >}}Custom + Default Allowlist{{< /ui >}} o {{< ui >}}Custom Allowlist{{< /ui >}}.

La lista de permitidos predeterminada incluye los siguientes dominios. Esta lista evolucionará con el tiempo según los comentarios de los usuarios y los cambios en el ecosistema. Para evitar cambios, configure una lista de permitidos personalizada.

| Lenguaje | Dominios |
|---|---|
| Clojure/JVM | `repo.clojars.org` |
| Go | `pkg.go.dev`, `proxy.golang.org`, `sum.golang.org`, `vuln.go.dev` |
| Java/JVM | `repo1.maven.org` |
| JavaScript/TypeScript | `registry.npmjs.org`, `registry.yarnpkg.com`, `repo.yarnpkg.com` |
| .NET/C# | `api.nuget.org` |
| PHP | `packagist.org`, `repo.packagist.org` |
| Python | `files.pythonhosted.org`, `pypi.org`, `pypi.python.org`, `pythonhosted.org` |
| Ruby | `api.rubygems.org`, `index.rubygems.org`, `rubygems.org` |
| Rust | `index.crates.io`, `static.crates.io` |
| Ubuntu | `archive.ubuntu.com`, `ports.ubuntu.com`, `security.ubuntu.com` |

### Configurar el entorno del repositorio {#configure-repository-environment}

Configure un entorno personalizado para que Bits Code instale las dependencias, formateadores, linters y herramientas de compilación que se necesitan para su base de código. Cada repositorio se ejecuta en su propio sandbox aislado, y el entorno define la configuración para ese sandbox. 

Para configurar un entorno de repositorio:

1. Vaya a {{< ui >}}Bits Code{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Repositories{{< /ui >}}][5], y busque la sección {{< ui >}}Environments{{< /ui >}}.
1. Haga clic en {{< ui >}}Add Environment{{< /ui >}} para crear una configuración de repositorio:
   1. Seleccione un repositorio de la lista desplegable.
   1. (Opcional) En {{< ui >}}Pre-installed Languages{{< /ui >}}, haga clic en {{< ui >}}Select Versions{{< /ui >}} para especificar las versiones de lenguaje que debe usar el sandbox.
   1. (Opcional) Defina variables de entorno y secretos. Las variables de entorno están disponibles tanto durante la configuración del entorno como durante la ejecución de Bits Code. Los secretos están disponibles como variables de entorno solo durante la configuración del entorno.
   1. (Opcional) Agregue un script de shell con comandos de configuración para ejecutar (por ejemplo: `pip install -r requirements.txt`).
1. Ejecute el comando de configuración para asegurarse de que se ejecute correctamente.
1. Guarde la configuración.

Bits Code ejecuta el comando de configuración al inicio y puede usar cualquier herramienta instalada en su entorno. El comando de configuración se ejecuta con acceso a la red habilitado para descargar dependencias. Después de completar la configuración, su política de [acceso a internet](#configure-internet-access) controla el acceso a la red saliente durante la ejecución del agente. Debido a que los comandos de configuración se ejecutan en el código de su repositorio, habilítelos solo si confía en el código del repositorio.

**Nota**: Para obtener mejores resultados, agregue un [archivo de instrucciones personalizadas](#configure-custom-instructions) (como `claude.md`) a su repositorio con instrucciones sobre cómo compilar y probar su código.

## Solución de problemas {#troubleshooting}

### La creación de PR de GitHub falla inesperadamente {#creation-of-github-prs-fails-unexpectedly}

En algunos casos, especialmente en repositorios con muchas ramas, GitHub no ejecuta la verificación de permisos al crear una rama para la sesión. Si utiliza una aplicación de GitHub personalizada, puede solucionar este problema agregando el permiso `workflows:write` a su aplicación en la [integración de GitHub][2].

**Nota**: Este permiso permite que Bits AI cree flujos de trabajo en su repositorio y tiene implicaciones de seguridad.

[1]: /es/account_management/rbac/permissions/#bits-ai
[2]: https://app.datadoghq.com/integrations/github
[4]: /es/integrations/guide/source-code-integration/?tab=go#tag-your-apm-telemetry-with-git-information
[5]: https://app.datadoghq.com/code/settings?tab=repositories
[6]: https://app.datadoghq.com/code/settings
[7]: /es/bits_ai/bits_code/#start-a-session
[8]: /es/bits_ai/bits_code/
[11]: /es/bits_ai/bits_code/#supported-source-code-providers
[12]: /es/bits_ai/bits_code/#custom-agent-skills-and-instructions

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}