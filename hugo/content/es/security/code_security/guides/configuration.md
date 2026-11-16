---
description: Referencia para la configuración de Datadog Code Security, incluyendo
  el esquema, las ubicaciones de configuración y la precedencia.
disable_toc: false
further_reading:
- link: /security/code_security/static_analysis/configuration/
  tag: Documentación
  text: Configuración del Análisis de código estático (SAST)
- link: /security/code_security/software_composition_analysis/configuration/
  tag: Documentación
  text: Configuración de Software Composition Analysis (SCA)
- link: /security/code_security/iac_security/configuration/
  tag: Documentación
  text: Configuración de seguridad de infraestructura como código (IaC)
- link: /security/code_security/secret_scanning/configuration/
  tag: Documentación
  text: Configuración de Secret Scanning
title: La referencia de configuración de Code Security
---
Datadog Code Security puede configurarse en Datadog, en un archivo en la raíz de su repositorio o en ambas ubicaciones.

## Esquema de configuración {#configuration-schema}

El archivo de configuración debe comenzar con una clave `schema-version`, seguida de las claves de nivel superior para cada producto que desee configurar. Utilice la versión del esquema que coincida con los productos que desea configurar:

| Versión del esquema | Productos compatibles |
|---|---|
| `v1.0` | SAST |
| `v1.1` | SAST, SCA |
| `v1.2` | SAST, SCA, IaC Security |
| `v1.3` | SAST, SCA, IaC Security |
| `v1.4` | SAST, SCA, IaC Security |
| `v1.5` | SAST, SCA, IaC Security, Secret Scanning |

Use `schema-version: v1.5` para todas las configuraciones nuevas. Es compatible con los mismos productos que `v1.4` y añade Secret Scanning. La versión `v1.4` añadió `arguments` por regla para las reglas de IaC, y la `v1.3` añadió opciones de configuración de IaC como el alcance de ruta por regla, anulaciones de gravedad por regla y filtros de plataforma. Consulte [configuración de seguridad de infraestructura como código (IaC)][3] para los campos específicos de IaC y [Secret Scanning Configuration][4] para los campos específicos de Secret Scanning.

El siguiente ejemplo muestra la estructura de nivel superior:

```yaml
schema-version: v1.5
sast:
  # Static Code Analysis (SAST) configuration
sca:
  # Software Composition Analysis (SCA) configuration
iac:
  # Infrastructure as Code (IaC) Security configuration
secrets:
  # Secret Scanning configuration
```

Las secciones `sast`, `sca`, `iac` y `secrets` son opcionales. Cualquier ubicación de configuración, incluido el nivel de organización, el nivel de repositorio o el archivo del repositorio, puede incluir una o más secciones. La sección `sast` también controla los conjuntos de reglas SAST nativos de IA para los escaneos alojados en Datadog. La sección `secrets` controla qué archivos se escanean en busca de secretos; las reglas en sí se configuran en Datadog. Para obtener el esquema completo de cada sección, consulte [SAST Configuration][1], [Software Composition Analysis (SCA) Configuration][2], [IaC Security Configuration][3] y [Secret Scanning Configuration][4]. La página SAST también lista los nombres de los conjuntos de reglas SAST nativos de IA.

## Dónde definir configuraciones {#where-to-define-configurations}

Existen tres niveles de configuración:

* Configuración a nivel de organización (Datadog)
* Configuración a nivel de repositorio (Datadog)
* Configuración a nivel de repositorio (archivo del repositorio)

Las tres ubicaciones utilizan el mismo esquema YAML y se combinan en orden (consulte [Cómo se combinan las configuraciones](#how-configurations-merge)).

### Configuración a nivel de organización {#org-level-configuration}

{{< img src="/security/code_security/org-level-configuration.png" alt="El editor de configuración a nivel de organización de Datadog Code Security." style="width:100%;" >}}

Las configuraciones a nivel de organización se aplican a todos los repositorios de su organización. Utilice configuraciones a nivel de organización para definir reglas para toda la organización y especificar rutas o archivos globales que ignorar.

### Configuración a nivel de repositorio {#repository-level-configuration}

{{< img src="/security/code_security/repo-level-configuration.png" alt="El editor de configuración a nivel de repositorio de Datadog Code Security." style="width:100%;" >}}

Las configuraciones a nivel de repositorio se aplican solo al repositorio seleccionado y tienen prioridad sobre las configuraciones a nivel de organización. Se combinan con la configuración de la organización, y los ajustes del repositorio prevalecen sobre los valores predeterminados de la organización. Utilice configuraciones a nivel de repositorio para definir anulaciones específicas del repositorio o añadir reglas que se apliquen únicamente a ese repositorio.

### Configuración a nivel de repositorio (archivo) {#repository-level-configuration-file}

El archivo `code-security.datadog.yaml` almacena la configuración en la raíz de un repositorio. Tiene prioridad sobre las configuraciones a nivel de organización y a nivel de repositorio definidas en Datadog.

## Cómo se combinan las configuraciones {#how-configurations-merge}

Las configuraciones se combinan en el siguiente orden, de menor a mayor precedencia:

1. **A nivel de organización**
1. **A nivel de repositorio**
1. **Archivo a nivel de repositorio** (`code-security.datadog.yaml`)

Para cada campo en una configuración, el comportamiento de combinación depende del tipo de campo:

| Tipo de campo | Comportamiento de combinación | Campos de ejemplo |
|---|---|---|
| Listas | Concatenadas, con duplicados eliminados | `use-rulesets`, `ignore-rulesets`, `ignore-rules`, `ignore-paths`, `only-paths`, `ignore-platforms`, `only-platforms` |
| Valores escalares (cadenas, números, booleanos) | Se utiliza el valor de la configuración de mayor precedencia | `use-default-rulesets`, `use-gitignore`, `max-file-size-kb`, `category` |
| Mapas | Combinados de forma recursiva | `ruleset-configs`, `rule-configs`, `arguments` |

Para obtener la lista completa de campos, consulte [Configuración de SAST][1], [Configuración de Software Composition Analysis (SCA)][2] y [configuración de seguridad como código (IaC)][3].

El siguiente ejemplo muestra cómo se combinan las configuraciones:

#### A nivel de organización {#org-level}

```yaml
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - A
  ruleset-configs:
    A:
      rule-configs:
        foo:
          ignore-paths:
            - "path/to/ignore"
          arguments:
            maxCount: 10
sca:
  ignore-paths:
    - "vendor/"
iac:
  ignore-rules:
    - A
  global-config:
    ignore-paths:
      - "examples/"
```

#### A nivel de repositorio {#repo-level}

```yaml
schema-version: v1.4
sast:
  use-rulesets:
    - B
  ignore-rulesets:
    - C
  ruleset-configs:
    A:
      rule-configs:
        foo:
          arguments:
            maxCount: 22
        bar:
          only-paths:
            - "src"
sca:
  ignore-paths:
    - "third_party/"
iac:
  ignore-rules:
    - B
  global-config:
    ignore-paths:
      - "generated/"
```

#### Resultado combinado {#merged-result}

```yaml
schema-version: v1.4
sast:
  use-default-rulesets: false
  use-rulesets:
    - A
    - B
  ignore-rulesets:
    - C
  ruleset-configs:
    A:
      rule-configs:
        foo:
          ignore-paths:
            - "path/to/ignore"
          arguments:
            maxCount: 22
        bar:
          only-paths:
            - "src"
sca:
  ignore-paths:
    - "vendor/"
    - "third_party/"
iac:
  ignore-rules:
    - A
    - B
  global-config:
    ignore-paths:
      - "examples/"
      - "generated/"
```

El ejemplo demuestra cada regla de combinación de la tabla anterior:

- **Las listas se concatenan**: `use-rulesets` se combina con `[A, B]`; el SCA `ignore-paths` se combina con `["vendor/", "third_party/"]`; el IaC `ignore-rules` se combina con `[A, B]`.
- **Los escalares usan el valor de mayor precedencia**: `maxCount: 22` (nivel de repositorio) anula a `maxCount: 10` (nivel de organización).
- **Los mapas se combinan de forma recursiva**: La configuración de regla `foo` mantiene `ignore-paths` del nivel de organización mientras aplica `maxCount: 22` del nivel de repositorio. Las nuevas entradas como `bar` se agregan desde el nivel de repositorio.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/code_security/static_analysis/configuration/
[2]: /es/security/code_security/software_composition_analysis/configuration/
[3]: /es/security/code_security/iac_security/configuration/
[4]: /es/security/code_security/secret_scanning/configuration/