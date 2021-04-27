---
title: Event Attributes
kind: documentation
description: "Event format, schema, and attributes for Cloud Workload Security"
further_reading:
- link: "/security_platform/cloud_workload_security/getting_started/"
  tag: "Documentation"
  text: "Get started with Datadog Cloud Workload Security"
---

## Base Event Format

All Cloud Workload Security (CWS) events share a basic event format. CWS events include metadata about event types, and policy/rule information, followed by three core sets of context: file process, and user.

### Base Event Format
All events have `agent`, `evt`, `file`, `process`, and `user` contexts. Optionally, if activity is associated with a container, then there will also be a `container` context.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "base-payload.json",
  "type": "object",
  "anyOf": [
        {
            "allOf": [
                {
                    "$ref": "file:///event.json"
                },
                {
                    "$ref": "file:///file.json"
                },
                {
                    "$ref": "file:///usr.json"
                },
                {
                    "$ref": "file:///process_context.json"
                },
                {
                    "$ref": "file:///container_context.json"
                }
            ]
        },
        {
            "allOf": [
                {
                    "$ref": "file:///event.json"
                },
                {
                    "$ref": "file:///file.json"
                },
                {
                    "$ref": "file:///usr.json"
                },
                {
                    "$ref": "file:///process_context.json"
                }
            ]
        }
    ],
    "allOf": [
        {
            "if": {
                "properties": {
                    "file": {
                        "type": "object",
                        "required": [
                            "container_path"
                        ]
                    }
                }
            },
            "then": {
                "required": [
                    "container"
                ]
            }
        },
        {
            "if": {
                "required": [
                    "container"
                ]
            },
            "then": {
                "properties": {
                    "file": {
                        "type": "object",
                        "required": [
                            "container_path"
                        ]
                    }
                }
            }
        }
    ] 
}
```

### Event Context
The event context contains information about the type of activity that triggered a rule. This includes activity category, name, and whether or not the activity was successful (i.e a process failing or succeeding to execute).

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "event.json",
    "type": "object",
    "properties": {
        "evt": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "category": {
                    "type": "string"
                },
                "outcome": {
                    "type": "string"
                }
            },
            "required": [
                "name",
                "category",
                "outcome"
            ]
        },
        "date": {
            "type": "string"
        }
    },
    "required": [
        "evt",
        "date"
    ]
}
```

### Agent Context
Agent context contains information about what policy is running on the given agent, which version of that policy, and which specific rule from the policy was matched to trigger the event in question.

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "agent.json",
    "type": "object",
    "properties": {
        "agent": {
            "type": "object",
            "properties": {
                "policy_name": {
                    "type": "string"
                },
                "policy_version": {
                    "type": "string"
                },
                "rule_id": {
                    "type": "string"
                }
            },
            "required": [
                "policy_name",
                "policy_version",
                "rule_id"
            ]
        }
    },
    "required": [
        "agent"
    ]
}
```

### File Context
File context includes all of the information known about a file. This includes the files path, flags, inode, mount, and more. If the file is associated with a container, then the container mount path is also included.

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "file.json",
    "type": "object",
    "properties": {
        "file": {
            "type": "object",
            "properties": {
                "path": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "container_path": {
                    "$ref": "file:///container_path.json"
                },
                "inode": {
                    "type": "integer"
                },
                "mode": {
                    "type": "integer"
                },
                "mount_id": {
                    "type": "integer"
                },
                "filesystem": {
                    "type": "string"
                },
                "user": {
                    "type": "string"
                },
                "group": {
                    "type": "string"
                },
                "modification_time": {
                    "type": "string"
                },
                "change_time": {
                    "type": "string"
                }
            },
            "required": [
                "path",
                "name",
                "inode",
                "mode",
                "mount_id",
                "filesystem",
                "user",
                "group",
                "modification_time",
                "change_time"
            ]
        }
    }
}
```

#### Process Context
Process context includes all information known about the process associated with the activity in question. This includes process-specific information, as well as a full process ancestory tree, container information if available, and specific parent process information.

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "process_context.json",
    "type": "object",
    "properties": {
        "process": {
            "allOf": [
                {
                    "$ref": "file:///process.json"
                },
                {
                    "properties": {
                        "parent": {
                            "$ref": "file:///process.json"
                        },
                        "ancestors": {
                            "type": "array",
                            "items": {
                                "$ref": "file:///process.json"
                            }
                        },
                        "container": {
                            "$ref": "file:///container.json"
                        }
                    },
                    "required": [
                        "parent",
                        "ancestors"
                    ]
                }
            ]
        }
    },
    "required": [
        "process"
    ]
```

#### Process
Cloud Worload Security collects highly detailed process information, such as the process path, name, arguments, environment variable keys, tty, user/group information, and kernel capabilities (effective and permitted). Note: some information is not collected for ancestors, such and arguments, and environment variables

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "process.json",
    "type": "object",
    "properties": {
        "tid": {
            "type": "integer"
        },
        "uid": {
            "type": "integer"
        },
        "gid": {
            "type": "integer"
        },
        "user": {
            "type": "string"
        },
        "group": {
            "type": "string"
        },
        "executable_container_path": {
            "$ref": "file:///container_path.json"
        },
        "executable_path": {
            "type": "string"
        },
        "comm": {
            "type": "string"
        },
        "executable_inode": {
            "type": "integer"
        },
        "executable_mount_id": {
            "type": "integer"
        },
        "tty": {
            "type": "string"
        },
        "credentials": {
            "type": "object",
            "properties": {
                "uid": {
                    "type": "integer"
                },
                "user": {
                    "type": "string"
                },
                "gid": {
                    "type": "integer"
                },
                "group": {
                    "type": "string"
                },
                "euid": {
                    "type": "integer"
                },
                "euser": {
                    "type": "string"
                },
                "egid": {
                    "type": "integer"
                },
                "egroup": {
                    "type": "string"
                },
                "fsuid": {
                    "type": "integer"
                },
                "fsuser": {
                    "type": "string"
                },
                "fsgid": {
                    "type": "integer"
                },
                "fsgroup": {
                    "type": "string"
                },
                "cap_effective": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "uniqueItems": true
                },
                "cap_permitted": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    },
                    "uniqueItems": true
                }
            },
            "required": [
                "uid",
                "gid",
                "euid",
                "euser",
                "egid",
                "egroup",
                "fsuid",
                "fsuser",
                "fsgid",
                "fsgroup",
                "cap_effective",
                "cap_permitted"
            ]
        },
        "executable": {
            "type": "object",
            "properties": {
                "path": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "container_path": {
                    "$ref": "file:///container_path.json"
                },
                "inode": {
                    "type": "integer"
                },
                "mode": {
                    "type": "integer"
                },
                "mount_id": {
                    "type": "integer"
                },
                "filesystem": {
                    "type": "string"
                },
                "uid": {
                    "type": "integer"
                },
                "gid": {
                    "type": "integer"
                },
                "modification_time": {
                    "type": "string"
                },
                "change_time": {
                    "type": "string"
                }
            },
            "required": [
                "path",
                "name",
                "inode",
                "mode",
                "mount_id",
                "filesystem",
                "uid",
                "gid",
                "modification_time",
                "change_time"
            ]
        },
        "container": {
            "$ref": "file:///container.json"
        }
    },
    "oneOf": [
        {
            "properties": {
                "pid": {
                    "type": "integer",
                    "enum": [1]
                }
            },
            "required": ["pid"]
        },
        {
            "properties": {
                "pid": {
                    "type": "integer",
                    "minimum": 2
                },
                "ppid": {
                    "type": "integer"
                }
            },
            "required": ["pid", "ppid"]
        }
    ],
    "required": [
        "tid",
        "uid",
        "gid",
        "executable_path",
        "comm",
        "executable_inode",
        "executable_mount_id",
        "credentials",
        "executable"
    ],
    "dependencies": {
        "executable_container_path": ["container"],
        "container": ["executable_container_path"]
    }
}
```

#### User Context
User context includes the resolved user and group information of the executing process. Note: This information is resolved at the time of collection. Therefore, it is possible for resolved users and groups to have changed since the activity took place, or after the activity is collected. 

```json

{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "file.json",
    "type": "object",
    "properties": {
        "usr": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "group": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "group"
            ]
        }
    }
}
```
