---
algolia:
  tags:
  - static analysis
  - ci pipeline
  - SAST
  - secret scanning
description: Configure las reglas de Datadog Secret Scanning y los archivos que se
  analizan.
title: Configuración
---
De forma predeterminada, Datadog Secret Scanning analiza los repositorios habilitados con todas las [reglas en la categoría Secrets & Credentials de Sensitive Data Scanner][1]. Puede personalizar qué reglas se ejecutan, modificar las reglas predeterminadas y crear reglas personalizadas en la [{{< ui >}}Code{{< /ui >}} página de configuración][2] en SDS.

Las reglas, los grupos de escaneo y las reglas personalizadas descritos en esta página se configuran en Datadog. Un archivo de configuración en su repositorio añade un control independiente sobre qué archivos se escanean. Consulte [Configuración de archivos](#file-configuration).
## Grupos de escaneo {#scanning-groups}
Existen dos grupos de escaneo que configuran las reglas de Secret Scanning.
### Grupo de escaneo administrado {#managed-scanning-group}
El grupo de escaneo administrado es gestionado por el equipo de seguridad de Datadog. Recibe automáticamente nuevas reglas y actualizaciones de reglas, y está habilitado de forma predeterminada para todas las organizaciones.

{{< img src="/code_security/secret_scanning/managed_scanning_group_not_customized.png" alt="Grupo de escaneo administrado" style="width:100%;">}}

### Grupo de escaneo de reglas personalizadas {#custom-rule-scanning-group}
El grupo de escaneo personalizado es gestionado por las organizaciones de usuario. Puede [crear y probar reglas de regex personalizadas][3] o agregar reglas desde la biblioteca de reglas de SDS.

{{< img src="/code_security/secret_scanning/custom_scanning_group.png" alt="Grupo de escaneo personalizado" style="width:100%;">}}

## Configuración de reglas {#configuring-rules}
### Personalización de reglas predeterminadas {#customizing-default-rules}
Para personalizar la gravedad y las palabras clave de una regla predeterminada administrada, pase el cursor sobre la regla y haga clic en el icono de lápiz a la derecha.
{{< img src="/code_security/secret_scanning/customize_default_rule.png" alt="Editar regla" style="width:100%;">}}

Se abre el cuadro de diálogo de edición.
{{< img src="/code_security/secret_scanning/configure_default_rule.png" alt="Ventana emergente de edición de regla" style="width:100%;">}}

Después de editar la regla y hacer clic en {{< ui >}}Update{{< /ui >}} en la parte inferior derecha, la regla modificada aparece como {{< ui >}}Customized{{< /ui >}} en el grupo de escaneo administrado.

{{< img src="/code_security/secret_scanning/disable_rule.png" alt="Regla personalizada de Secret Scanning en el grupo de escaneo administrado" style="width:100%;">}}

<div class="alert alert-info">Las reglas personalizadas no reciben automáticamente actualizaciones de gravedad/palabras clave predeterminadas del equipo de seguridad de Datadog. Para restaurar una regla a su estado administrado, coloque el cursor sobre una regla personalizada y haga clic en el icono de restaurar a la derecha. </div>

### Creación de reglas personalizadas{#creating-custom-rules}
Para crear una regla personalizada, vaya al grupo de escaneo personalizado y haga clic en {{< ui >}}Add scanning rule{{< /ui >}} en la parte inferior o en {{< ui >}}Add rule{{< /ui >}} en la parte superior derecha. Cree su regla de regex, luego configure la gravedad y las palabras clave. Una vez habilitados, sus repositorios se analizan con las nuevas reglas en la siguiente confirmación.

{{< img src="/code_security/secret_scanning/add_to_custom.png" alt="Agregar regla al grupo de escaneo personalizado" style="width:100%;">}}

Para actualizar una regla personalizada, coloque el cursor sobre la regla y haga clic en el icono de lápiz a la derecha.

### Deshabilitar reglas{#disabling-rules}
Deshabilite una regla haciendo clic en el interruptor azul a la derecha.

<div class="alert alert-info">Después de deshabilitar una regla específica, los hallazgos existentes de esa regla se cierran automáticamente en Secret Scanning en la siguiente confirmación.</div>

## Configuración de archivos{#file-configuration}

Las reglas se configuran en Datadog como se describe en la sección [Configuración de reglas](#configuring-rules). Los archivos que lee Secret Scanning se configuran bajo la clave `secrets` en la configuración de Code Security. Defínalo en Datadog o en un archivo `code-security.datadog.yaml` en la raíz de su repositorio.

Para obtener información sobre las ubicaciones de configuración, la precedencia y la combinación, consulte [Referencia de configuración de Code Security][4].

La configuración debe comenzar con `schema-version: v1.5`, seguido de una clave `secrets` que contenga un objeto `global-config`. El objeto `global-config` controla la configuración de todo el repositorio:

| **Propiedad** | **Tipo** | **Descripción** | **Predeterminado** |
| --- | --- | --- | --- |
| `only-paths` | Matriz | Rutas de archivo o patrones glob. Solo se analizan los archivos que coinciden. | Ninguno |
| `ignore-paths` | Matriz | Rutas de archivo o patrones glob para excluir. Los archivos que coinciden no se analizan. | Ninguno |
| `use-gitignore` | Booleano | Si se deben incluir entradas del archivo `.gitignore` en `ignore-paths`. | `true` |
| `ignore-generated-files` | Booleano | Si se deben incluir patrones de archivos generados comunes en `ignore-paths`. | `true` |
| `max-file-size-kb` | Número | Tamaño máximo de archivo (en kB) a analizar. Los archivos más grandes se ignoran. | `10240` |

### Ejemplo de configuración {#example-configuration}

{{< code-block lang="yaml" >}}
schema-version: v1.5
secrets:
  global-config:
    # Only analyze the following paths/files
    only-paths:
      - "src"
      - "**/*.py"
    # Do not analyze the following paths/files
    ignore-paths:
      - "tests"
      - "**/*.lock"
    use-gitignore: true
    ignore-generated-files: true
    max-file-size-kb: 10240
{{< /code-block >}}

[1]: /es/security/sensitive_data_scanner/scanning_rules/library_rules/?category=Secrets+and+credentials
[2]: https://app.datadoghq.com/sensitive-data-scanner/configuration/code
[3]: /es/security/sensitive_data_scanner/scanning_rules/custom_rules/
[4]: /es/security/code_security/guides/configuration/