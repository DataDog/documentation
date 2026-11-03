---
aliases:
- /es/security/workload_protection/agent_expressions
- /es/security/threats/agent_expressions
- /es/security/workload_protection/secl_auth_guide
- /es/security/workload_protection/guide/custom-rules-guidelines
description: Escriba expresiones de reglas del Workload Protection Agent con el Datadog
  Security Language (SECL).
disable_toc: false
title: Guía SECL
---
Datadog SECL es un lenguaje de dominio específico personalizado que se utiliza para crear expresiones y políticas del Agent dentro de Datadog Workload Protection. SECL permite a los equipos de seguridad definir reglas de detección de amenazas en tiempo real especificando condiciones, operadores y patrones que los agentes de seguridad pueden hacer un seguimiento en servidores, contenedores, aplicaciones e infraestructura en la nube.

## Cómo encajan las reglas SECL {#how-secl-rules-fit-together}

Piense en SECL como un filtro local: se ejecuta dentro del Agent en cada servidor, observando los eventos del kernel y del SO. Cuando un evento coincide con su expresión SECL, el Agent genera una detección.

Las reglas de detección de amenazas de Datadog actúan como lógica de backend: combinan una o más reglas del Agent (usando `@agent.rule_id`), agregan umbrales, suprimen el ruido y deciden cómo se enrutan las alertas.

En resumen, la regla del Agent encuentra el comportamiento sin procesar y la regla de detección lo convierte en historias de ataques de extremo a extremo.

<div class="alert alert-info">Esta guía describe cómo crear expresiones de reglas manualmente, pero Workload Protection también proporciona el asistente <b>Creador de reglas asistido</b> para guiarlo en la creación de las reglas del Agent y de detección juntas. Consulte <a href="/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together">Crear las reglas personalizadas del Agent y de detección juntas</a>.</div>

## Sintaxis de expresiones SECL {#secl-expression-syntax}

El formato estándar de una expresión SECL es:

{{< code-block lang="javascript" >}}
<event-type>.<event-attribute> <operator> <value> [<operator> <event-type>.<event-attribute>] ...
{{< /code-block >}}

Usando este formato, un ejemplo de regla para un sistema Linux se ve así:

{{< code-block lang="javascript" >}}
open.file.path == "/etc/shadow" && process.file.path not in ["/usr/sbin/vipw"]
{{< /code-block >}}

### Operadores {#operators}

Los operadores SECL se utilizan para combinar atributos de eventos en una expresión completa. Los siguientes operadores están disponibles:

| Operador SECL         |  Definición                              | Versión del Agent |
|-----------------------|------------------------------------------|---------------|
| `==`                  | Igual                                    | 7.27          |
| `!=`                  | No es igual                                | 7.27          |
| `>`                   | Mayor que                                  | 7.27          |
| `>=`                  | Mayor o igual                            | 7.27          |
| `<`                   | Menor                                    | 7.27          |
| `<=`                  | Menor o igual                            | 7.27          |
| `!` o `not`          | No                                       | 7.27          |
| `^`                   | NOT binario                              | 7.27          |
| `in [elem1, ...]`     | El elemento está contenido en la lista   | 7.27          |
| `not in [elem1, ...]` | El elemento no está contenido en la lista| 7.27          |
| `=~`                  | Coincidencia de cadena                   | 7.27          |
| `!~`                  | Sin coincidencia de cadena               | 7.27          |
| `&`                   | AND binario                              | 7.27          |
| `\|`                  | OR binario                               | 7.27          |
| `&&` o `and`         | AND lógico                               | 7.27          |
| `\|\|` o `or`        | OR lógico                                | 7.27          |
| `in CIDR`             | El elemento está en el rango IP          | 7.37          |
| `not in CIDR`         | El elemento no está en el rango IP       | 7.37          |
| `allin CIDR`          | Todos los elementos están en el rango IP | 7.37          |
| `in [CIDR1, ...]`     | El elemento está en los rangos IP        | 7.37          |
| `not in [CIDR1, ...]` | El elemento no está en los rangos IP     | 7.37          |
| `allin [CIDR1, ...]`  | Todos los elementos están en los rangos IP| 7.37          |

### Patrones y expresiones regulares {#patterns-and-regular-expressions}

Se pueden usar patrones o expresiones regulares en las expresiones SECL. Se pueden usar con los operadores `in`, `not in`, `=~` y `!~`.

| Formato           |  Ejemplo             | Campos admitidos   | Versión del Agent |
|------------------|----------------------|--------------------|---------------|
| `~"pattern"`     | `~"httpd.*"`         | Todo                | 7.27          |
| `r"regexp"`      | `r"rc[0-9]+"`        | Todo excepto `.path` | 7.27          |

Los patrones en los campos `.path` se usan como Glob. `*` coincide con archivos y carpetas al mismo nivel. `**`, introducido en 7.34, se puede usar al final de una ruta para coincidir con todos los archivos y subcarpetas.

### Duraciones {#durations}

Puede usar SECL para escribir reglas basadas en duraciones, las cuales se activan ante eventos que ocurren durante un periodo de tiempo específico. Por ejemplo, activar ante un evento donde se accede a un archivo secreto después de que haya transcurrido más de cierta cantidad de tiempo desde que se creó un proceso.
Dicha regla podría escribirse de la siguiente manera:

{{< code-block lang="javascript" >}}
open.file.path == "/etc/secret" && process.file.name == "java" && process.created_at > 5s
{{< /code-block >}}

Las duraciones son números con un sufijo de unidad. Los sufijos admitidos son "s", "m", "h".

### Sintaxis específica de la plataforma {#platform-specific-syntax}

Las expresiones SECL admiten varias plataformas. Puede usar la documentación a continuación para ver qué atributos y ayudantes están disponibles para cada una.

- [Linux][1]
- [Windows][2]

## Consejos para la creación de reglas {#rule-authoring-tips}

- Establezca siempre el sistema operativo (SO).
- Ancle en la ascendencia para reducir el ruido. Utilice `process.ancestors.file.name`.
- Utilice duraciones (por ejemplo, `> 5s`, `10m`, `2h`) para apuntar a ventanas de ejecución estrechas.
- Utilice la coincidencia exacta (`==`) siempre que sea posible, ya que resulta en el menor ruido.
- La pertenencia a una lista (`in [...]`) es mejor para listas de permitidos o conjuntos controlados de valores.
- Utilice una coincidencia glob (`~"/path/*"`) para familias de rutas, ya que es más segura y rápida que regex.
- Utilice regex (`=~`) solo cuando no se puedan usar globs/listas. Mantenga la expresión regex lo más estrecha posible. Como regla general, comience con `==` o `in [...]`. Recurra a regex solo como último recurso.
- Utilice la negación (`not in [...]`, `!~`) para definir excepciones explícitamente (por ejemplo, herramientas confiables).
- Utilice operadores CIDR (`in CIDR`, `not in CIDR`) para límites de red.
- Nombre las reglas según el comportamiento, con un formato que siga *Qué + Quién + Contexto*.
- Etiquete generosamente: `team`, `app`, `env`, `MITRE`, `severity`.

### Evite errores comunes {#avoid-common-mistakes}

| Patrón                   | Explicación                                 |
| ------------------------- | -------------------------------------------- |
| `open.file.path == "/etc/passwd"`, `exec.comm != ""` | Demasiado amplio. Coincide con muchos casos de uso válidos.  |
| `container.id != ""`      | Útil solo si se limita con un campo más específico. |

## Biblioteca de ejemplo {#example-library}

<div class="alert alert-info">Puede encontrar ejemplos más detallados en la política predeterminada que se incluye lista para usar con el agente. Consulte <a href="https://github.com/DataDog/security-agent-policies/blob/master/runtime/default.policy">Política predeterminada de Workload Protection.</a></div>

En los archivos de política del Agent, cada regla incluye un `id` y un `expression`. También puede agregar `actions` opcionales. Consulte [Variables y acciones][3] para obtener más información.

### Linux {#linux}

#### Acceso a archivos confidenciales (lista de permitidos de herramientas seguras) {#access-to-sensitive-files-allowlist-safe-tools}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: access_sensitive_files
    expression: >-
      open.file.path in ["/etc/shadow", "/etc/sudoers"] &&
      process.file.path not in ["/usr/sbin/vipw", "/usr/sbin/visudo"]
    filters:
      - os == "linux"
{{< /code-block >}}

#### NGINX o PHP generando bash {#nginx-or-php-spawning-bash}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: nginx_php_spawn_bash
    expression: >-
      exec.file.path == "/usr/bin/bash" &&
      (
        process.ancestors.file.name == "nginx" ||
        process.ancestors.file.name =~ "php*"
      )
    filters:
      - os == "linux"
{{< /code-block >}}

#### Acceso sospechoso a IMDS desde un contenedor {#suspicious-imds-access-from-container}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: suspicious_imds_access
    expression: >-
      connect &&
      network.destination.ip in ["169.254.169.254"] &&
      container.id != ""
    filters:
      - os == "linux"
{{< /code-block >}}

#### Carga de módulo del kernel fuera de la ventana de mantenimiento {#kernel-module-loads-outside-maintenance-window}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: kernel_module_load
    expression: >-
      load_module &&
      process.user != "root" &&
      process.ancestors.file.name not in ["modprobe", "insmod"]
    filters:
      - os == "linux"
{{< /code-block >}}

#### Lectura de archivo confidencial poco después del inicio {#sensitive-file-read-shortly-after-start}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: sensitive_file_read_after_start
    expression: >-
      open.file.path == "/etc/secret" &&
      process.file.name == "java" &&
      process.created_at > 5s
    filters:
      - os == "linux"
{{< /code-block >}}

#### Salida a IP no corporativas (lista CIDR de permitidos) {#outbound-to-non-corporate-ips-cidr-allowlist}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: outbound_non_corporate_ips
    expression: >-
      connect &&
      network.destination.ip not in [10.0.0.0/8, 192.168.0.0/16, 172.16.0.0/12]
    filters:
      - os == "linux"
{{< /code-block >}}

### Windows {#windows}

#### Persistencia en el registro a través de una clave de ejecución {#registry-persistence-through-a-run-key}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: registry_run_key_persistence
    expression: >-
      set_key_value &&
      open_key.registry.key_path =~ "*\\Software\\Microsoft\\Windows\\CurrentVersion\\Run*"
    filters:
      - os == "windows"
{{< /code-block >}}

#### Binario sin firmar iniciando PowerShell {#unsigned-binary-launching-powershell}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: unsigned_binary_powershell
    expression: >-
      exec.file.path =~ "*\\WindowsPowerShell\\v1.0\\powershell.exe" &&
      process.parent.file.path !~ "*\\Program Files*" &&
      process.user_sid != "S-1-5-18"
    filters:
      - os == "windows"
{{< /code-block >}}

### Multiplataforma {#cross-platform}

#### Indicadores de criptomineros {#crypto-miner-indicators}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: crypto_miner_indicators
    expression: >-
      exec.args_flags in ["cpu-priority", "donate-level", ~"randomx-1gb-pages"] ||
      exec.args in [~"*stratum+tcp*", ~"*nicehash*", ~"*yespower*"]
{{< /code-block >}}

[1]: /es/security/workload_protection/linux_expressions
[2]: /es/security/workload_protection/windows_expressions
[3]: /es/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions