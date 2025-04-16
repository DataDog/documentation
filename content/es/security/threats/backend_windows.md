---
description: Documentación del esquema JSON del evento de backend CSM Threats en Windows
disable_edit: true
title: Formatos de eventos de CSM Threats en Windows
---
<!--  EXTRAÍDO DE https://github.com/DataDog/datadog-agent -->


<!-- ESTE ARCHIVO SE GENERA AUTOMÁTICAMENTE. EDÍTALO EN LA CARPETA SCRIPTS/PLANTILLAS -->

El evento de CSM Threats para Windows tiene el siguiente esquema JSON:


{{< code-block lang="json" collapsible="true" filename="BACKEND_EVENT_JSON_SCHEMA" >}}
{
    "$id": "https://github.com/DataDog/datadog-agent/tree/main/pkg/security/serializers",
    "$defs": {
        "AgentContext": {
            "properties": {
                "rule_id": {
                    "type": "string"
                },
                "rule_version": {
                    "type": "string"
                },
                "rule_actions": {
                    "items": true,
                    "type": "array"
                },
                "policy_name": {
                    "type": "string"
                },
                "policy_version": {
                    "type": "string"
                },
                "version": {
                    "type": "string"
                },
                "os": {
                    "type": "string"
                },
                "arch": {
                    "type": "string"
                },
                "origin": {
                    "type": "string"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "rule_id"
            ]
        },
        "ChangePermissionEvent": {
            "properties": {
                "username": {
                    "type": "string",
                    "description": "User name"
                },
                "user_domain": {
                    "type": "string",
                    "description": "User domain"
                },
                "path": {
                    "type": "string",
                    "description": "Object name"
                },
                "type": {
                    "type": "string",
                    "description": "Object type"
                },
                "old_sd": {
                    "type": "string",
                    "description": "Original Security Descriptor"
                },
                "new_sd": {
                    "type": "string",
                    "description": "New Security Descriptor"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "ChangePermissionEventSerializer serializes a permission change event to JSON"
        },
        "ContainerContext": {
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Container ID"
                },
                "created_at": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Creation time of the container"
                },
                "variables": {
                    "$ref": "#/$defs/Variables",
                    "description": "Variables values"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "ContainerContextSerializer serializes a container context to JSON"
        },
        "EventContext": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Event name"
                },
                "category": {
                    "type": "string",
                    "description": "Event category"
                },
                "outcome": {
                    "type": "string",
                    "description": "Event outcome"
                },
                "async": {
                    "type": "boolean",
                    "description": "True if the event was asynchronous"
                },
                "matched_rules": {
                    "items": {
                        "$ref": "#/$defs/MatchedRule"
                    },
                    "type": "array",
                    "description": "The list of rules that the event matched (only valid in the context of an anomaly)"
                },
                "variables": {
                    "$ref": "#/$defs/Variables",
                    "description": "Variables values"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "EventContextSerializer serializes an event context to JSON"
        },
        "ExitEvent": {
            "properties": {
                "cause": {
                    "type": "string",
                    "description": "Cause of the process termination (one of EXITED, SIGNALED, COREDUMPED)"
                },
                "code": {
                    "type": "integer",
                    "description": "Exit code of the process or number of the signal that caused the process to terminate"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "cause",
                "code"
            ],
            "description": "ExitEventSerializer serializes an exit event to JSON"
        },
        "File": {
            "properties": {
                "path": {
                    "type": "string",
                    "description": "File path"
                },
                "device_path": {
                    "type": "string",
                    "description": "File device path"
                },
                "name": {
                    "type": "string",
                    "description": "File basename"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "FileSerializer serializes a file to JSON"
        },
        "FileEvent": {
            "properties": {
                "path": {
                    "type": "string",
                    "description": "File path"
                },
                "device_path": {
                    "type": "string",
                    "description": "File device path"
                },
                "name": {
                    "type": "string",
                    "description": "File basename"
                },
                "destination": {
                    "$ref": "#/$defs/File",
                    "description": "Target file information"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "FileEventSerializer serializes a file event to JSON"
        },
        "MatchedRule": {
            "properties": {
                "id": {
                    "type": "string",
                    "description": "ID of the rule"
                },
                "version": {
                    "type": "string",
                    "description": "Version of the rule"
                },
                "tags": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "Tags of the rule"
                },
                "policy_name": {
                    "type": "string",
                    "description": "Name of the policy that introduced the rule"
                },
                "policy_version": {
                    "type": "string",
                    "description": "Version of the policy that introduced the rule"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "MatchedRuleSerializer serializes a rule"
        },
        "Process": {
            "properties": {
                "pid": {
                    "type": "integer",
                    "description": "Process ID"
                },
                "ppid": {
                    "type": "integer",
                    "description": "Parent Process ID"
                },
                "exec_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Exec time of the process"
                },
                "exit_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Exit time of the process"
                },
                "executable": {
                    "$ref": "#/$defs/File",
                    "description": "File information of the executable"
                },
                "container": {
                    "$ref": "#/$defs/ContainerContext",
                    "description": "Container context"
                },
                "cmdline": {
                    "type": "string",
                    "description": "Command line arguments"
                },
                "user": {
                    "type": "string",
                    "description": "User name"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "ProcessSerializer serializes a process to JSON"
        },
        "ProcessContext": {
            "properties": {
                "pid": {
                    "type": "integer",
                    "description": "Process ID"
                },
                "ppid": {
                    "type": "integer",
                    "description": "Parent Process ID"
                },
                "exec_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Exec time of the process"
                },
                "exit_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Exit time of the process"
                },
                "executable": {
                    "$ref": "#/$defs/File",
                    "description": "File information of the executable"
                },
                "container": {
                    "$ref": "#/$defs/ContainerContext",
                    "description": "Container context"
                },
                "cmdline": {
                    "type": "string",
                    "description": "Command line arguments"
                },
                "user": {
                    "type": "string",
                    "description": "User name"
                },
                "parent": {
                    "$ref": "#/$defs/Process",
                    "description": "Parent process"
                },
                "ancestors": {
                    "items": {
                        "$ref": "#/$defs/Process"
                    },
                    "type": "array",
                    "description": "Ancestor processes"
                },
                "variables": {
                    "$ref": "#/$defs/Variables",
                    "description": "Variables values"
                },
                "truncated_ancestors": {
                    "type": "boolean",
                    "description": "True if the ancestors list was truncated because it was too big"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "ProcessContextSerializer serializes a process context to JSON"
        },
        "RegistryEvent": {
            "properties": {
                "key_name": {
                    "type": "string",
                    "description": "Registry key name"
                },
                "key_path": {
                    "type": "string",
                    "description": "Registry key path"
                },
                "value_name": {
                    "type": "string",
                    "description": "Value name of the key value"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "RegistryEventSerializer serializes a registry event to JSON"
        },
        "UserContext": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "User name"
                },
                "sid": {
                    "type": "string",
                    "description": "Owner Sid"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "UserContextSerializer serializes a user context to JSON"
        },
        "Variables": {
            "type": "object",
            "description": "Variables serializes the variable values"
        }
    },
    "properties": {
        "agent": {
            "$ref": "#/$defs/AgentContext"
        },
        "title": {
            "type": "string"
        },
        "evt": {
            "$ref": "#/$defs/EventContext"
        },
        "date": {
            "type": "string",
            "format": "date-time"
        },
        "file": {
            "$ref": "#/$defs/FileEvent"
        },
        "exit": {
            "$ref": "#/$defs/ExitEvent"
        },
        "process": {
            "$ref": "#/$defs/ProcessContext"
        },
        "container": {
            "$ref": "#/$defs/ContainerContext"
        },
        "registry": {
            "$ref": "#/$defs/RegistryEvent"
        },
        "usr": {
            "$ref": "#/$defs/UserContext"
        },
        "permission_change": {
            "$ref": "#/$defs/ChangePermissionEvent"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "agent",
        "title"
    ]
}

{{< /code-block >}}

| Parámetro | Tipo | Descripción |
| --------- | ---- | ----------- |
| `agent` | $ref | Consulta [AgentContext](#agentcontext) |
| `title` | cadena |  |
| `evt` | $ref | Consulta [EventContext](#eventcontext) |
| `date` | cadena |  |
| `file` | $ref | Consulta [FileEvent](#fileevent) |
| `exit` | $ref | Consulta [ExitEvent](#exitevent) |
| `process` | $ref | Consulta [ProcessContext](#processcontext) |
| `container` | $ref | Consulta [ContainerContext](#containercontext) |
| `registry` | $ref | Consulta [RegistryEvent](#registryevent) |
| `usr` | $ref | Consulta [UserContext](#usercontext) |
| `permission_change` | $ref | Consulta [ChangePermissionEvent](#changepermissionevent) |

## `AgentContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "rule_id": {
            "type": "string"
        },
        "rule_version": {
            "type": "string"
        },
        "rule_actions": {
            "items": true,
            "type": "array"
        },
        "policy_name": {
            "type": "string"
        },
        "policy_version": {
            "type": "string"
        },
        "version": {
            "type": "string"
        },
        "os": {
            "type": "string"
        },
        "arch": {
            "type": "string"
        },
        "origin": {
            "type": "string"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "rule_id"
    ]
}

{{< /code-block >}}



## `ChangePermissionEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "username": {
            "type": "string",
            "description": "User name"
        },
        "user_domain": {
            "type": "string",
            "description": "User domain"
        },
        "path": {
            "type": "string",
            "description": "Object name"
        },
        "type": {
            "type": "string",
            "description": "Object type"
        },
        "old_sd": {
            "type": "string",
            "description": "Original Security Descriptor"
        },
        "new_sd": {
            "type": "string",
            "description": "New Security Descriptor"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "ChangePermissionEventSerializer serializes a permission change event to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `username` | Nombre de usuario |
| `user_domain` | Dominio de usuario |
| `path` | Nombre del objeto |
| `type` | Tipo de objeto |
| `old_sd` | Descriptor de seguridad original |
| `new_sd` | Nuevo descriptor de seguridad |


## `ContainerContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "id": {
            "type": "string",
            "description": "Container ID"
        },
        "created_at": {
            "type": "string",
            "format": "date-time",
            "description": "Creation time of the container"
        },
        "variables": {
            "$ref": "#/$defs/Variables",
            "description": "Variables values"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "ContainerContextSerializer serializes a container context to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `id` | ID del contenedor |
| `created_at` | Hora de creación del contenedor |
| `variables` | Valores de las variables |

| Referencias |
| ---------- |
| [Variables](#variables) |

## `EventContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "Event name"
        },
        "category": {
            "type": "string",
            "description": "Event category"
        },
        "outcome": {
            "type": "string",
            "description": "Event outcome"
        },
        "async": {
            "type": "boolean",
            "description": "True if the event was asynchronous"
        },
        "matched_rules": {
            "items": {
                "$ref": "#/$defs/MatchedRule"
            },
            "type": "array",
            "description": "The list of rules that the event matched (only valid in the context of an anomaly)"
        },
        "variables": {
            "$ref": "#/$defs/Variables",
            "description": "Variables values"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "EventContextSerializer serializes an event context to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `name` | Nombre del evento |
| `category` | Categoría del evento |
| `outcome` | Resultado del evento |
| `async` | True, si el evento era asíncrono |
| `matched_rules` | Lista de las normas con las que ha coincidido el evento (sólo válido en el contexto de una anomalía) |
| `variables` | Valores de las variables |

| Referencias |
| ---------- |
| [Variables](#variables) |

## `ExitEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "cause": {
            "type": "string",
            "description": "Cause of the process termination (one of EXITED, SIGNALED, COREDUMPED)"
        },
        "code": {
            "type": "integer",
            "description": "Exit code of the process or number of the signal that caused the process to terminate"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "cause",
        "code"
    ],
    "description": "ExitEventSerializer serializes an exit event to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `cause` | Causa de finalización del proceso (EXITED, SIGNALED, COREDUMPED) |
| `code` | Código de salida del proceso o número de señal que provocó la finalización del proceso |


## `File`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "path": {
            "type": "string",
            "description": "File path"
        },
        "device_path": {
            "type": "string",
            "description": "File device path"
        },
        "name": {
            "type": "string",
            "description": "File basename"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "FileSerializer serializes a file to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `path` | Ruta del archivo |
| `device_path` | Ruta del dispositivo de archivo |
| `name` | Nombre base del archivo |


## `FileEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "path": {
            "type": "string",
            "description": "File path"
        },
        "device_path": {
            "type": "string",
            "description": "File device path"
        },
        "name": {
            "type": "string",
            "description": "File basename"
        },
        "destination": {
            "$ref": "#/$defs/File",
            "description": "Target file information"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "FileEventSerializer serializes a file event to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `path` | Ruta del archivo |
| `device_path` | Ruta del dispositivo de archivo |
| `name` | Nombre base del archivo |
| `destination` | Información del archivo de destino |

| Referencias |
| ---------- |
| [Archivo](#file) |

## `MatchedRule`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "id": {
            "type": "string",
            "description": "ID of the rule"
        },
        "version": {
            "type": "string",
            "description": "Version of the rule"
        },
        "tags": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "Tags of the rule"
        },
        "policy_name": {
            "type": "string",
            "description": "Name of the policy that introduced the rule"
        },
        "policy_version": {
            "type": "string",
            "description": "Version of the policy that introduced the rule"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "MatchedRuleSerializer serializes a rule"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `id` | ID de la regla |
| `version` | Versión de la regla |
| `tags` | Etiquetas (tags) de la regla |
| `policy_name` | Nombre de la política que introdujo la regla |
| `policy_version` | Versión de la política que introdujo la regla |


## `Process`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "pid": {
            "type": "integer",
            "description": "Process ID"
        },
        "ppid": {
            "type": "integer",
            "description": "Parent Process ID"
        },
        "exec_time": {
            "type": "string",
            "format": "date-time",
            "description": "Exec time of the process"
        },
        "exit_time": {
            "type": "string",
            "format": "date-time",
            "description": "Exit time of the process"
        },
        "executable": {
            "$ref": "#/$defs/File",
            "description": "File information of the executable"
        },
        "container": {
            "$ref": "#/$defs/ContainerContext",
            "description": "Container context"
        },
        "cmdline": {
            "type": "string",
            "description": "Command line arguments"
        },
        "user": {
            "type": "string",
            "description": "User name"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "ProcessSerializer serializes a process to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `pid` | ID del proceso |
| `ppid` | ID del proceso principal |
| `exec_time` | Hora de ejecución del proceso |
| `exit_time` | Hora de salida del proceso |
| `executable` | Información de archivo del ejecutable |
| `container` | Contexto del contenedor |
| `cmdline` | Argumentos de la línea de comandos |
| `user` | Nombre de usuario |

| Referencias |
| ---------- |
| [Archivo](#file) |
| [ContainerContext](#containercontext) |

## `ProcessContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "pid": {
            "type": "integer",
            "description": "Process ID"
        },
        "ppid": {
            "type": "integer",
            "description": "Parent Process ID"
        },
        "exec_time": {
            "type": "string",
            "format": "date-time",
            "description": "Exec time of the process"
        },
        "exit_time": {
            "type": "string",
            "format": "date-time",
            "description": "Exit time of the process"
        },
        "executable": {
            "$ref": "#/$defs/File",
            "description": "File information of the executable"
        },
        "container": {
            "$ref": "#/$defs/ContainerContext",
            "description": "Container context"
        },
        "cmdline": {
            "type": "string",
            "description": "Command line arguments"
        },
        "user": {
            "type": "string",
            "description": "User name"
        },
        "parent": {
            "$ref": "#/$defs/Process",
            "description": "Parent process"
        },
        "ancestors": {
            "items": {
                "$ref": "#/$defs/Process"
            },
            "type": "array",
            "description": "Ancestor processes"
        },
        "variables": {
            "$ref": "#/$defs/Variables",
            "description": "Variables values"
        },
        "truncated_ancestors": {
            "type": "boolean",
            "description": "True if the ancestors list was truncated because it was too big"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "ProcessContextSerializer serializes a process context to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `pid` | ID del proceso |
| `ppid` | ID del proceso principal |
| `exec_time` | Hora de ejecución del proceso |
| `exit_time` | Hora de salida del proceso |
| `executable` | Información de archivo del ejecutable |
| `container` | Contexto del contenedor |
| `cmdline` | Argumentos de la línea de comandos |
| `user` | Nombre de usuario |
| `parent` | Proceso principal |
| `ancestors` | Procesos antecesores |
| `variables` | Valores de las variables |
| `truncated_ancestors` | True, si la lista de antecesores se truncó porque era demasiado grande |

| Referencias |
| ---------- |
| [Archivo](#file) |
| [ContainerContext](#containercontext) |
| [Proceso](#process) |
| [Variables](#variables) |

## `RegistryEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "key_name": {
            "type": "string",
            "description": "Registry key name"
        },
        "key_path": {
            "type": "string",
            "description": "Registry key path"
        },
        "value_name": {
            "type": "string",
            "description": "Value name of the key value"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "RegistryEventSerializer serializes a registry event to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `key_name` | Nombre de la clave de registro |
| `key_path` | Ruta de la clave de registro |
| `value_name` | Nombre del valor de la clave |


## `UserContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "User name"
        },
        "sid": {
            "type": "string",
            "description": "Owner Sid"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "UserContextSerializer serializes a user context to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `name` | Nombre de usuario |
| `sid` | Sid del propietario |


## `Variables`


{{< code-block lang="json" collapsible="true" >}}
{
    "type": "object",
    "description": "Variables serializes the variable values"
}

{{< /code-block >}}




[1]: /es/security/threats/
[2]: /es/security/threats/agent