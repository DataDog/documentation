---
description: Documentación de referencia para la configuración de Datadog Software
  Composition Analysis (SCA), incluida la exclusión de ruta, ecosistema y paquete.
further_reading:
- link: /security/code_security/software_composition_analysis/
  tag: Documentación
  text: Software Composition Analysis
- link: /security/code_security/guides/configuration/
  tag: Documentación
  text: La referencia de configuración de Code Security
title: Configuración de Software Composition Analysis (SCA)
---
Datadog Software Composition Analysis (SCA) detecta bibliotecas de código abierto y sus vulnerabilidades en su código. Puede excluir rutas, ecosistemas o paquetes específicos del análisis de Static SCA. Configure estos ajustes bajo la clave `sca` en la configuración de Code Security, ya sea en Datadog o en un archivo `code-security.datadog.yaml`.

La clave `sca` se introdujo en `schema-version: v1.1` y admite los siguientes campos. Cada campo tiene su propio `schema-version` mínimo, así que utilice la versión más alta requerida por los campos que configure:

| **Propiedad** | **Tipo** | **Descripción** | **Predeterminado** | **Mínimo `schema-version`** |
| --- | --- | --- | --- | --- |
| `ignore-paths` | Matriz | Rutas de archivo o patrones glob para excluir del análisis de Static SCA. | Ninguno | `v1.1` |
| `ignore-ecosystems` | Matriz | Ecosistemas, tales como `npm`, `Go`, `PyPI`, para excluir del análisis de Static SCA. | Ninguno | `v1.7` |
| `ignore-packages` | Matriz | Paquetes para excluir del análisis de Static SCA, independientemente de la versión. Cada entrada utiliza el formato `<ecosystem>:<name>`, tal como `npm:lodash`. | Ninguno | `v1.7` |

Ejemplo:

{{< code-block lang="yaml" >}}
schema-version: v1.7
sca:
  ignore-paths:
    - "vendor/"
    - "**/node_modules/**"
    - "third_party/"
  ignore-ecosystems:
    - "npm"
  ignore-packages:
    - "Go:golang.org/x/text"
{{< /code-block >}}

<div class="alert alert-warning">Los nombres de ecosistemas y paquetes en <code>ignore-ecosystems</code> y <code>ignore-packages</code> se comparan distinguiendo entre mayúsculas y minúsculas. Por ejemplo, <code>go:golang.org/x/text</code> no coincide con el <code>Go</code> ecosistema, y <code>npm:Lodash</code> no coincide con el <code>lodash</code> Paquete.</div>

Si ejecuta el escáner SCA directamente desde la CLI, las banderas `--exclude`, `--exclude-ecosystem` y `--exclude-package` equivalentes se unen con las exclusiones configuradas anteriormente.

Para obtener información sobre las ubicaciones de configuración, la precedencia y la combinación, consulte [Referencia de configuración de Code Security][1].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/code_security/guides/configuration/