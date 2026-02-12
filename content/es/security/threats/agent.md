---
description: Atributos y operadores de expresión del Agent para las reglas de CSM
  Threats
disable_edit: true
further_reading:
- link: /security/cloud_workload_security/getting_started/
  tag: Documentación
  text: Empezando con Datadog CSM Threats
title: Creación de expresiones de reglas del Agent
---
<!--  EXTRAÍDO DE https://github.com/DataDog/datadog-agent -->


## Creación de reglas personalizadas con el creador de reglas asistido

La opción **Creador de reglas asistido** te ayuda a crear conjuntamente el Agent y las reglas de detección dependientes, y garantiza que se haga referencia a la regla del Agent en las reglas de detección. El uso de esta herramienta es más rápido que el método avanzado de creación del Agent y de las reglas de detección por separado.

Para obtener más detalles, consulta [Creación de reglas de detección personalizadas][1].

## Sintaxis de expresiones del Agent
Cloud Security Management Threats (CSM Threats) evalúa primero la actividad en el Datadog Agent con respecto a las expresiones del Agent para decidir qué actividad recopilar. Esta parte de una regla de CSM Threats se denomina expresión del Agent. Las expresiones del Agent utilizan el Lenguaje de seguridad de Datadog (SECL). El formato estándar de una expresión SECL es el siguiente:

{{< code-block lang="javascript" >}}
<event-type>.<event-attribute> <operator> <value> [<operator> <event-type>.<event-attribute>] ...

{{< /code-block >}}

Cuando se utiliza este formato, una regla de ejemplo de un sistema Linux tiene el siguiente aspecto:

{{< code-block lang="javascript" >}}
open.file.path == "/etc/shadow" && process.file.path not in ["/usr/sbin/vipw"]

{{< /code-block >}}

## Operadores
Los operadores SECL se utilizan para combinar atributos de evento en una expresión completa. Están disponibles los siguientes operadores:

| Operador SECL         | Tipos            |  Definición                              | Versión del Agent |
|-----------------------|------------------|------------------------------------------|---------------|
| `==`                  | Process          | Igual                                    | 7.27          |
| `!=`                  | Archivo             | No es igual                                | 7.27          |
| `>`                   | Archivo             | Mayor                                  | 7.27          |
| `>=`                  | Archivo             | Mayor o igual                         | 7.27          |
| `<`                   | Archivo             | Menor                                   | 7.27          |
| `<=`                  | Archivo             | Menor o igual                          | 7.27          |
| `!`                   | Archivo             | No                                      | 7.27          |
| `^`                   | Archivo             | Binario not                               | 7.27          |
| `in [elem1, ...]`     | Archivo             | El elemento está contenido en una lista             | 7.27          |
| `not in [elem1, ...]` | Archivo             | El elemento no está contenido en una lista         | 7.27          |
| `=~`                  | Archivo             | Coincidencia de cadenas                          | 7.27          |
| `!~`                  | Archivo             | Cadena no coincidente                      | 7.27          |
| `&`                   | Archivo             | Binario and                               | 7.27          |
| `\|`                  | Archivo             | Binario or                                | 7.27          |
| `&&`                  | Archivo             | Lógica and                              | 7.27          |
| `\|\|`                | Archivo             | Lógica or                               | 7.27          |
| `in CIDR`             | Red          | El elemento está en el rango de IP               | 7.37          |
| `not in CIDR`         | Red          | El elemento no está en el rango de IP           | 7.37          |
| `allin CIDR`          | Red          | Todos los elementos están en el rango de IP     | 7.37          |
| `in [CIDR1, ...]`     | Red          | El elemento se encuentra en los rangos de IP              | 7.37          |
| `not in [CIDR1, ...]` | Red          | El elemento no está en los rangos de IP          | 7.37          |
| `allin [CIDR1, ...]`  | Red          | Todos los elementos están en los rangos de IP    | 7.37          |

## Patrones y expresiones regulares
En las expresiones SECL pueden utilizarse patrones o expresiones regulares. Pueden utilizarse con los operadores `in`, `not in`, `=~` y `!~`.

| Formato           |  Ejemplo             | Campos admitidos   | Versión del Agent |
|------------------|----------------------|--------------------|---------------|
| `~"pattern"`     | `~"httpd.*"`         | Todos                | 7.27          |
| `r"regexp"`      | `r"rc[0-9]+"`        | Todos excepto `.path` | 7.27          |

Los patrones de los campos `.path` se utilizarán como Glob. `*` coincidirá con archivos y carpetas del mismo nivel. `**`, introducido en 7.34, puede utilizarse al final de una ruta para que coincida con todos los archivos y subcarpetas.

## Duración
Puedes utilizar SECL para escribir reglas basadas en duraciones, que activan eventos que ocurren durante un periodo específico. Por ejemplo, activar un evento donde se accede a un archivo durante un mayor periodo después de que se crea un proceso.
Una regla de este tipo podría escribirse de la siguiente manera:

{{< code-block lang="javascript" >}}
open.file.path == "/etc/secret" && process.file.name == "java" && process.created_at > 5s

{{< /code-block >}}

Las duraciones son números con un sufijo de unidad. Los sufijos admitidos son "s", "m", "h".

## Sintaxis específica de la plataforma

Las expresiones SECL admiten varias plataformas. Puedes utilizar la documentación siguiente para ver qué atributos y ayudantes están disponibles para cada una.

* [Linux][2]
* [Windows][3]

[1]: /es/security/workload_protection/workload_security_rules/custom_rules
[2]: /es/security/threats/linux_expressions
[3]: /es/security/threats/windows_expressions