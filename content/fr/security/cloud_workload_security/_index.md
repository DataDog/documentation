---
description: Documentation relative au schéma JSON de l'événement backend CWS
disable_edit: true
kind: documentation
title: Formats des événements Cloud Workload Security (CWS)
---
<!-- CE FICHIER EST GÉNÉRÉ AUTOMATIQUEMENT. VEUILLEZ LE MODIFIER DANS LE DOSSIER SCRIPTS/MODÈLES -->

Lorsqu'une activité correspond à une [expression d'Agent][2] [Cloud Workload Security][1] (CWS), un log CWS contenant toutes les informations de contexte pertinentes sur l'activité est recueilli à partir du système.

Ce log est transmis à Datadog, où il est analysé. En fonction de cette analyse, les logs CWS peuvent déclencher des signaux de sécurité où être stockés en tant que logs à des fins d'audit ou de détection des menaces.

Les logs CWS respectent le schéma JSON suivant :


{{< code-block lang="json" collapsible="true" filename="BACKEND_EVENT_JSON_SCHEMA" >}}
{
    "$id": "https://github.com/DataDog/datadog-agent/pkg/security/probe/event",
    "$defs": {
        "BPFEvent": {
            "properties": {
                "cmd": {
                    "type": "string",
                    "description": "BPF command"
                },
                "map": {
                    "$ref": "#/$defs/BPFMap",
                    "description": "BPF map"
                },
                "program": {
                    "$ref": "#/$defs/BPFProgram",
                    "description": "BPF program"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "cmd"
            ],
            "description": "BPFEventSerializer serializes a BPF event to JSON"
        },
        "BPFMap": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Name of the BPF map"
                },
                "map_type": {
                    "type": "string",
                    "description": "Type of the BPF map"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "BPFMapSerializer serializes a BPF map to JSON"
        },
        "BPFProgram": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Name of the BPF program"
                },
                "tag": {
                    "type": "string",
                    "description": "Hash (sha1) of the BPF program"
                },
                "program_type": {
                    "type": "string",
                    "description": "Type of the BPF program"
                },
                "attach_type": {
                    "type": "string",
                    "description": "Attach type of the BPF program"
                },
                "helpers": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "List of helpers used by the BPF program"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "BPFProgramSerializer serializes a BPF map to JSON"
        },
        "BindEvent": {
            "properties": {
                "addr": {
                    "$ref": "#/$defs/IPPortFamily",
                    "description": "Bound address (if any)"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "addr"
            ],
            "description": "BindEventSerializer serializes a bind event to JSON"
        },
        "ContainerContext": {
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Container ID"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "ContainerContextSerializer serializes a container context to JSON"
        },
        "DDContext": {
            "properties": {
                "span_id": {
                    "type": "integer",
                    "description": "Span ID used for APM correlation"
                },
                "trace_id": {
                    "type": "integer",
                    "description": "Trace ID used for APM correlation"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "DDContextSerializer serializes a span context to JSON"
        },
        "DNSEvent": {
            "properties": {
                "id": {
                    "type": "integer",
                    "description": "id is the unique identifier of the DNS request"
                },
                "question": {
                    "$ref": "#/$defs/DNSQuestion",
                    "description": "question is a DNS question for the DNS request"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "id"
            ],
            "description": "DNSEventSerializer serializes a DNS event to JSON"
        },
        "DNSQuestion": {
            "properties": {
                "class": {
                    "type": "string",
                    "description": "class is the class looked up by the DNS question"
                },
                "type": {
                    "type": "string",
                    "description": "type is a two octet code which specifies the DNS question type"
                },
                "name": {
                    "type": "string",
                    "description": "name is the queried domain name"
                },
                "size": {
                    "type": "integer",
                    "description": "size is the total DNS request size in bytes"
                },
                "count": {
                    "type": "integer",
                    "description": "count is the total count of questions in the DNS request"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "class",
                "type",
                "name",
                "size",
                "count"
            ],
            "description": "DNSQuestionSerializer serializes a DNS question to JSON"
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
                "name": {
                    "type": "string",
                    "description": "File basename"
                },
                "path_resolution_error": {
                    "type": "string",
                    "description": "Error message from path resolution"
                },
                "inode": {
                    "type": "integer",
                    "description": "File inode number"
                },
                "mode": {
                    "type": "integer",
                    "description": "File mode"
                },
                "in_upper_layer": {
                    "type": "boolean",
                    "description": "Indicator of file OverlayFS layer"
                },
                "mount_id": {
                    "type": "integer",
                    "description": "File mount ID"
                },
                "filesystem": {
                    "type": "string",
                    "description": "File filesystem name"
                },
                "uid": {
                    "type": "integer",
                    "description": "File User ID"
                },
                "gid": {
                    "type": "integer",
                    "description": "File Group ID"
                },
                "user": {
                    "type": "string",
                    "description": "File user"
                },
                "group": {
                    "type": "string",
                    "description": "File group"
                },
                "attribute_name": {
                    "type": "string",
                    "description": "File extended attribute name"
                },
                "attribute_namespace": {
                    "type": "string",
                    "description": "File extended attribute namespace"
                },
                "flags": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "File flags"
                },
                "access_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "File access time"
                },
                "modification_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "File modified time"
                },
                "change_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "File change time"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "uid",
                "gid"
            ],
            "description": "FileSerializer serializes a file to JSON"
        },
        "FileEvent": {
            "properties": {
                "path": {
                    "type": "string",
                    "description": "File path"
                },
                "name": {
                    "type": "string",
                    "description": "File basename"
                },
                "path_resolution_error": {
                    "type": "string",
                    "description": "Error message from path resolution"
                },
                "inode": {
                    "type": "integer",
                    "description": "File inode number"
                },
                "mode": {
                    "type": "integer",
                    "description": "File mode"
                },
                "in_upper_layer": {
                    "type": "boolean",
                    "description": "Indicator of file OverlayFS layer"
                },
                "mount_id": {
                    "type": "integer",
                    "description": "File mount ID"
                },
                "filesystem": {
                    "type": "string",
                    "description": "File filesystem name"
                },
                "uid": {
                    "type": "integer",
                    "description": "File User ID"
                },
                "gid": {
                    "type": "integer",
                    "description": "File Group ID"
                },
                "user": {
                    "type": "string",
                    "description": "File user"
                },
                "group": {
                    "type": "string",
                    "description": "File group"
                },
                "attribute_name": {
                    "type": "string",
                    "description": "File extended attribute name"
                },
                "attribute_namespace": {
                    "type": "string",
                    "description": "File extended attribute namespace"
                },
                "flags": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "File flags"
                },
                "access_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "File access time"
                },
                "modification_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "File modified time"
                },
                "change_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "File change time"
                },
                "destination": {
                    "$ref": "#/$defs/File",
                    "description": "Target file information"
                },
                "new_mount_id": {
                    "type": "integer",
                    "description": "New Mount ID"
                },
                "group_id": {
                    "type": "integer",
                    "description": "Group ID"
                },
                "device": {
                    "type": "integer",
                    "description": "Device associated with the file"
                },
                "fstype": {
                    "type": "string",
                    "description": "Filesystem type"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "uid",
                "gid"
            ],
            "description": "FileEventSerializer serializes a file event to JSON"
        },
        "IPPort": {
            "properties": {
                "ip": {
                    "type": "string",
                    "description": "IP address"
                },
                "port": {
                    "type": "integer",
                    "description": "Port number"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "ip",
                "port"
            ],
            "description": "IPPortSerializer is used to serialize an IP and Port context to JSON"
        },
        "IPPortFamily": {
            "properties": {
                "family": {
                    "type": "string",
                    "description": "Address family"
                },
                "ip": {
                    "type": "string",
                    "description": "IP address"
                },
                "port": {
                    "type": "integer",
                    "description": "Port number"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "family",
                "ip",
                "port"
            ],
            "description": "IPPortFamilySerializer is used to serialize an IP, port, and address family context to JSON"
        },
        "MMapEvent": {
            "properties": {
                "address": {
                    "type": "string",
                    "description": "memory segment address"
                },
                "offset": {
                    "type": "integer",
                    "description": "file offset"
                },
                "length": {
                    "type": "integer",
                    "description": "memory segment length"
                },
                "protection": {
                    "type": "string",
                    "description": "memory segment protection"
                },
                "flags": {
                    "type": "string",
                    "description": "memory segment flags"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "address",
                "offset",
                "length",
                "protection",
                "flags"
            ],
            "description": "MMapEventSerializer serializes a mmap event to JSON"
        },
        "MProtectEvent": {
            "properties": {
                "vm_start": {
                    "type": "string",
                    "description": "memory segment start address"
                },
                "vm_end": {
                    "type": "string",
                    "description": "memory segment end address"
                },
                "vm_protection": {
                    "type": "string",
                    "description": "initial memory segment protection"
                },
                "req_protection": {
                    "type": "string",
                    "description": "new memory segment protection"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "vm_start",
                "vm_end",
                "vm_protection",
                "req_protection"
            ],
            "description": "MProtectEventSerializer serializes a mmap event to JSON"
        },
        "ModuleEvent": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "module name"
                },
                "loaded_from_memory": {
                    "type": "boolean",
                    "description": "indicates if a module was loaded from memory, as opposed to a file"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "name"
            ],
            "description": "ModuleEventSerializer serializes a module event to JSON"
        },
        "NetworkContext": {
            "properties": {
                "device": {
                    "$ref": "#/$defs/NetworkDevice",
                    "description": "device is the network device on which the event was captured"
                },
                "l3_protocol": {
                    "type": "string",
                    "description": "l3_protocol is the layer 3 protocol name"
                },
                "l4_protocol": {
                    "type": "string",
                    "description": "l4_protocol is the layer 4 protocol name"
                },
                "source": {
                    "$ref": "#/$defs/IPPort",
                    "description": "source is the emitter of the network event"
                },
                "destination": {
                    "$ref": "#/$defs/IPPort",
                    "description": "destination is the receiver of the network event"
                },
                "size": {
                    "type": "integer",
                    "description": "size is the size in bytes of the network event"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "l3_protocol",
                "l4_protocol",
                "source",
                "destination",
                "size"
            ],
            "description": "NetworkContextSerializer serializes the network context to JSON"
        },
        "NetworkDevice": {
            "properties": {
                "netns": {
                    "type": "integer",
                    "description": "netns is the interface ifindex"
                },
                "ifindex": {
                    "type": "integer",
                    "description": "ifindex is the network interface ifindex"
                },
                "ifname": {
                    "type": "string",
                    "description": "ifname is the network interface name"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "netns",
                "ifindex",
                "ifname"
            ],
            "description": "NetworkDeviceSerializer serializes the network device context to JSON"
        },
        "PTraceEvent": {
            "properties": {
                "request": {
                    "type": "string",
                    "description": "ptrace request"
                },
                "address": {
                    "type": "string",
                    "description": "address at which the ptrace request was executed"
                },
                "tracee": {
                    "$ref": "#/$defs/ProcessContext",
                    "description": "process context of the tracee"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "request",
                "address"
            ],
            "description": "PTraceEventSerializer serializes a mmap event to JSON"
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
                "tid": {
                    "type": "integer",
                    "description": "Thread ID"
                },
                "uid": {
                    "type": "integer",
                    "description": "User ID"
                },
                "gid": {
                    "type": "integer",
                    "description": "Group ID"
                },
                "user": {
                    "type": "string",
                    "description": "User name"
                },
                "group": {
                    "type": "string",
                    "description": "Group name"
                },
                "path_resolution_error": {
                    "type": "string",
                    "description": "Description of an error in the path resolution"
                },
                "comm": {
                    "type": "string",
                    "description": "Command name"
                },
                "tty": {
                    "type": "string",
                    "description": "TTY associated with the process"
                },
                "fork_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Fork time of the process"
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
                "credentials": {
                    "$ref": "#/$defs/ProcessCredentials",
                    "description": "Credentials associated with the process"
                },
                "executable": {
                    "$ref": "#/$defs/File",
                    "description": "File information of the executable"
                },
                "interpreter": {
                    "$ref": "#/$defs/File",
                    "description": "File information of the interpreter"
                },
                "container": {
                    "$ref": "#/$defs/ContainerContext",
                    "description": "Container context"
                },
                "argv0": {
                    "type": "string",
                    "description": "First command line argument"
                },
                "args": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "Command line arguments"
                },
                "args_truncated": {
                    "type": "boolean",
                    "description": "Indicator of arguments truncation"
                },
                "envs": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "Environment variables of the process"
                },
                "envs_truncated": {
                    "type": "boolean",
                    "description": "Indicator of environments variable truncation"
                },
                "is_thread": {
                    "type": "boolean",
                    "description": "Indicates whether the process is considered a thread (that is, a child process that hasn't executed another program)"
                },
                "is_kworker": {
                    "type": "boolean",
                    "description": "Indicates whether the process is a kworker"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "uid",
                "gid"
            ],
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
                "tid": {
                    "type": "integer",
                    "description": "Thread ID"
                },
                "uid": {
                    "type": "integer",
                    "description": "User ID"
                },
                "gid": {
                    "type": "integer",
                    "description": "Group ID"
                },
                "user": {
                    "type": "string",
                    "description": "User name"
                },
                "group": {
                    "type": "string",
                    "description": "Group name"
                },
                "path_resolution_error": {
                    "type": "string",
                    "description": "Description of an error in the path resolution"
                },
                "comm": {
                    "type": "string",
                    "description": "Command name"
                },
                "tty": {
                    "type": "string",
                    "description": "TTY associated with the process"
                },
                "fork_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Fork time of the process"
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
                "credentials": {
                    "$ref": "#/$defs/ProcessCredentials",
                    "description": "Credentials associated with the process"
                },
                "executable": {
                    "$ref": "#/$defs/File",
                    "description": "File information of the executable"
                },
                "interpreter": {
                    "$ref": "#/$defs/File",
                    "description": "File information of the interpreter"
                },
                "container": {
                    "$ref": "#/$defs/ContainerContext",
                    "description": "Container context"
                },
                "argv0": {
                    "type": "string",
                    "description": "First command line argument"
                },
                "args": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "Command line arguments"
                },
                "args_truncated": {
                    "type": "boolean",
                    "description": "Indicator of arguments truncation"
                },
                "envs": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "Environment variables of the process"
                },
                "envs_truncated": {
                    "type": "boolean",
                    "description": "Indicator of environments variable truncation"
                },
                "is_thread": {
                    "type": "boolean",
                    "description": "Indicates whether the process is considered a thread (that is, a child process that hasn't executed another program)"
                },
                "is_kworker": {
                    "type": "boolean",
                    "description": "Indicates whether the process is a kworker"
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
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "uid",
                "gid"
            ],
            "description": "ProcessContextSerializer serializes a process context to JSON"
        },
        "ProcessCredentials": {
            "properties": {
                "uid": {
                    "type": "integer",
                    "description": "User ID"
                },
                "user": {
                    "type": "string",
                    "description": "User name"
                },
                "gid": {
                    "type": "integer",
                    "description": "Group ID"
                },
                "group": {
                    "type": "string",
                    "description": "Group name"
                },
                "euid": {
                    "type": "integer",
                    "description": "Effective User ID"
                },
                "euser": {
                    "type": "string",
                    "description": "Effective User name"
                },
                "egid": {
                    "type": "integer",
                    "description": "Effective Group ID"
                },
                "egroup": {
                    "type": "string",
                    "description": "Effective Group name"
                },
                "fsuid": {
                    "type": "integer",
                    "description": "Filesystem User ID"
                },
                "fsuser": {
                    "type": "string",
                    "description": "Filesystem User name"
                },
                "fsgid": {
                    "type": "integer",
                    "description": "Filesystem Group ID"
                },
                "fsgroup": {
                    "type": "string",
                    "description": "Filesystem Group name"
                },
                "cap_effective": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "Effective Capability set"
                },
                "cap_permitted": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "Permitted Capability set"
                },
                "destination": {
                    "description": "Credentials after the operation"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "uid",
                "gid",
                "euid",
                "egid",
                "fsuid",
                "fsgid",
                "cap_effective",
                "cap_permitted"
            ],
            "description": "ProcessCredentialsSerializer serializes the process credentials to JSON"
        },
        "SELinuxBoolChange": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "SELinux boolean name"
                },
                "state": {
                    "type": "string",
                    "description": "SELinux boolean state ('on' or 'off')"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "SELinuxBoolChangeSerializer serializes a SELinux boolean change to JSON"
        },
        "SELinuxBoolCommit": {
            "properties": {
                "state": {
                    "type": "boolean",
                    "description": "SELinux boolean commit operation"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "SELinuxBoolCommitSerializer serializes a SELinux boolean commit to JSON"
        },
        "SELinuxEnforceStatus": {
            "properties": {
                "status": {
                    "type": "string",
                    "description": "SELinux enforcement status (one of 'enforcing', 'permissive' or 'disabled')"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "SELinuxEnforceStatusSerializer serializes a SELinux enforcement status change to JSON"
        },
        "SELinuxEvent": {
            "properties": {
                "bool": {
                    "$ref": "#/$defs/SELinuxBoolChange",
                    "description": "SELinux boolean operation"
                },
                "enforce": {
                    "$ref": "#/$defs/SELinuxEnforceStatus",
                    "description": "SELinux enforcement change"
                },
                "bool_commit": {
                    "$ref": "#/$defs/SELinuxBoolCommit",
                    "description": "SELinux boolean commit"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "SELinuxEventSerializer serializes a SELinux context to JSON"
        },
        "SignalEvent": {
            "properties": {
                "type": {
                    "type": "string",
                    "description": "signal type"
                },
                "pid": {
                    "type": "integer",
                    "description": "signal target pid"
                },
                "target": {
                    "$ref": "#/$defs/ProcessContext",
                    "description": "process context of the signal target"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "type",
                "pid"
            ],
            "description": "SignalEventSerializer serializes a signal event to JSON"
        },
        "SpliceEvent": {
            "properties": {
                "pipe_entry_flag": {
                    "type": "string",
                    "description": "Entry flag of the fd_out pipe passed to the splice syscall"
                },
                "pipe_exit_flag": {
                    "type": "string",
                    "description": "Exit flag of the fd_out pipe passed to the splice syscall"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "pipe_entry_flag",
                "pipe_exit_flag"
            ],
            "description": "SpliceEventSerializer serializes a splice event to JSON"
        },
        "UserContext": {
            "properties": {
                "id": {
                    "type": "string",
                    "description": "User name"
                },
                "group": {
                    "type": "string",
                    "description": "Group name"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "UserContextSerializer serializes a user context to JSON"
        }
    },
    "properties": {
        "evt": {
            "$ref": "#/$defs/EventContext"
        },
        "file": {
            "$ref": "#/$defs/FileEvent"
        },
        "selinux": {
            "$ref": "#/$defs/SELinuxEvent"
        },
        "bpf": {
            "$ref": "#/$defs/BPFEvent"
        },
        "mmap": {
            "$ref": "#/$defs/MMapEvent"
        },
        "mprotect": {
            "$ref": "#/$defs/MProtectEvent"
        },
        "ptrace": {
            "$ref": "#/$defs/PTraceEvent"
        },
        "module": {
            "$ref": "#/$defs/ModuleEvent"
        },
        "signal": {
            "$ref": "#/$defs/SignalEvent"
        },
        "splice": {
            "$ref": "#/$defs/SpliceEvent"
        },
        "dns": {
            "$ref": "#/$defs/DNSEvent"
        },
        "network": {
            "$ref": "#/$defs/NetworkContext"
        },
        "bind": {
            "$ref": "#/$defs/BindEvent"
        },
        "exit": {
            "$ref": "#/$defs/ExitEvent"
        },
        "usr": {
            "$ref": "#/$defs/UserContext"
        },
        "process": {
            "$ref": "#/$defs/ProcessContext"
        },
        "dd": {
            "$ref": "#/$defs/DDContext"
        },
        "container": {
            "$ref": "#/$defs/ContainerContext"
        },
        "date": {
            "type": "string",
            "format": "date-time"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "EventSerializer serializes an event to JSON"
}

{{< /code-block >}}

| Paramètre | Type | Description |
| --------- | ---- | ----------- |
| `evt` | $ref | Voir la section [EventContext](#eventcontext) |
| `file` | $ref | Voir la section [FileEvent](#fileevent) |
| `selinux` | $ref | Voir la section [SELinuxEvent](#selinuxevent) |
| `bpf` | $ref | Voir la section [BPFEvent](#bpfevent) |
| `mmap` | $ref | Voir la section [MMapEvent](#mmapevent) |
| `mprotect` | $ref | Voir la section [MProtectEvent](#mprotectevent) |
| `ptrace` | $ref | Voir la section [PTraceEvent](#ptraceevent) |
| `module` | $ref | Voir la section [ModuleEvent](#moduleevent) |
| `signal` | $ref | Voir la section [SignalEvent](#signalevent) |
| `splice` | $ref | Voir la section [SpliceEvent](#spliceevent) |
| `dns` | $ref | Voir la section [DNSEvent](#dnsevent) |
| `network` | $ref | Voir la section [NetworkContext](#networkcontext) |
| `bind` | $ref | Voir la section [BindEvent](#bindevent) |
| `exit` | $ref | Voir la section [ExitEvent](#exitevent) |
| `usr` | $ref | Voir la section [UserContext](#usercontext) |
| `process` | $ref | Voir la section [ProcessContext](#processcontext) |
| `dd` | $ref | Voir la section [DDContext](#ddcontext) |
| `container` | $ref | Voir la section [ContainerContext](#containercontext) |
| `date` | chaîne |  |

## `BPFEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "cmd": {
            "type": "string",
            "description": "BPF command"
        },
        "map": {
            "$ref": "#/$defs/BPFMap",
            "description": "BPF map"
        },
        "program": {
            "$ref": "#/$defs/BPFProgram",
            "description": "BPF program"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "cmd"
    ],
    "description": "BPFEventSerializer serializes a BPF event to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `cmd` | Commande BPF |
| `map` | Carte BPF |
| `program` | Programme BPF |

| Références |
| ---------- |
| [BPFMap](#bpfmap) |
| [BPFProgram](#bpfprogram) |

## `BPFMap`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "Name of the BPF map"
        },
        "map_type": {
            "type": "string",
            "description": "Type of the BPF map"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "BPFMapSerializer serializes a BPF map to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `name` | Nom de la carte BPF |
| `map_type` | Type de carte BPF |


## `BPFProgram`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "Name of the BPF program"
        },
        "tag": {
            "type": "string",
            "description": "Hash (sha1) of the BPF program"
        },
        "program_type": {
            "type": "string",
            "description": "Type of the BPF program"
        },
        "attach_type": {
            "type": "string",
            "description": "Attach type of the BPF program"
        },
        "helpers": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "List of helpers used by the BPF program"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "BPFProgramSerializer serializes a BPF map to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `name` | Nom du programme BPF |
| `tag` | Hash (sha1) du programme BPF |
| `program_type` | Type de programme BPF |
| `attach_type` | Type d'association du programme BPF |
| `helpers` | Liste des helpers utilisés par le programme BPF |


## `BindEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "addr": {
            "$ref": "#/$defs/IPPortFamily",
            "description": "Bound address (if any)"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "addr"
    ],
    "description": "BindEventSerializer serializes a bind event to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `addr` | Adresse de bind (le cas échéant) |

| Références |
| ---------- |
| [IPPortFamily](#ipportfamily) |

## `ContainerContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "id": {
            "type": "string",
            "description": "Container ID"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "ContainerContextSerializer serializes a container context to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `id` | ID du conteneur |


## `DDContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "span_id": {
            "type": "integer",
            "description": "Span ID used for APM correlation"
        },
        "trace_id": {
            "type": "integer",
            "description": "Trace ID used for APM correlation"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "DDContextSerializer serializes a span context to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `span_id` | ID de span utilisé pour la corrélation avec les données APM |
| `trace_id` | ID de trace utilisé pour la corrélation avec les données APM |


## `DNSEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "id": {
            "type": "integer",
            "description": "id is the unique identifier of the DNS request"
        },
        "question": {
            "$ref": "#/$defs/DNSQuestion",
            "description": "question is a DNS question for the DNS request"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "id"
    ],
    "description": "DNSEventSerializer serializes a DNS event to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `id` | L'identifiant unique de la requête DNS |
| `question` | Une question DNS pour la requête DNS |

| Références |
| ---------- |
| [DNSQuestion](#dnsquestion) |

## `DNSQuestion`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "class": {
            "type": "string",
            "description": "class is the class looked up by the DNS question"
        },
        "type": {
            "type": "string",
            "description": "type is a two octet code which specifies the DNS question type"
        },
        "name": {
            "type": "string",
            "description": "name is the queried domain name"
        },
        "size": {
            "type": "integer",
            "description": "size is the total DNS request size in bytes"
        },
        "count": {
            "type": "integer",
            "description": "count is the total count of questions in the DNS request"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "class",
        "type",
        "name",
        "size",
        "count"
    ],
    "description": "DNSQuestionSerializer serializes a DNS question to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `class` | La classe recherchée par la question DNS |
| `type` | Un code de deux octets spécifiant le type de question DNS |
| `name` | Le nom de domaine interrogé |
| `size` | La taille totale de la requête DNS en octets |
| `count` | Le nombre total de questions au sein de la requête DNS |


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
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "EventContextSerializer serializes an event context to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `name` | Nom de l'événement |
| `category` | Catégorie de l'événement |
| `outcome` | Résultat de l'événement |
| `async` | True si l'événement était asynchrone |


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

| Champ | Description |
| ----- | ----------- |
| `cause` | Cause de l'arrêt du processus (EXITED, SIGNALED ou COREDUMPED) |
| `code` | Code de sortie du processus ou numéro du signal ayant entraîné l'arrêt du processus |


## `File`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "path": {
            "type": "string",
            "description": "File path"
        },
        "name": {
            "type": "string",
            "description": "File basename"
        },
        "path_resolution_error": {
            "type": "string",
            "description": "Error message from path resolution"
        },
        "inode": {
            "type": "integer",
            "description": "File inode number"
        },
        "mode": {
            "type": "integer",
            "description": "File mode"
        },
        "in_upper_layer": {
            "type": "boolean",
            "description": "Indicator of file OverlayFS layer"
        },
        "mount_id": {
            "type": "integer",
            "description": "File mount ID"
        },
        "filesystem": {
            "type": "string",
            "description": "File filesystem name"
        },
        "uid": {
            "type": "integer",
            "description": "File User ID"
        },
        "gid": {
            "type": "integer",
            "description": "File Group ID"
        },
        "user": {
            "type": "string",
            "description": "File user"
        },
        "group": {
            "type": "string",
            "description": "File group"
        },
        "attribute_name": {
            "type": "string",
            "description": "File extended attribute name"
        },
        "attribute_namespace": {
            "type": "string",
            "description": "File extended attribute namespace"
        },
        "flags": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "File flags"
        },
        "access_time": {
            "type": "string",
            "format": "date-time",
            "description": "File access time"
        },
        "modification_time": {
            "type": "string",
            "format": "date-time",
            "description": "File modified time"
        },
        "change_time": {
            "type": "string",
            "format": "date-time",
            "description": "File change time"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "uid",
        "gid"
    ],
    "description": "FileSerializer serializes a file to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `path` | Chemin d'accès au fichier |
| `name` | Basename du fichier |
| `path_resolution_error` | Message d'erreur issu de la résolution du chemin |
| `inode` | Inode du fichier |
| `mode` | Mode du fichier |
| `in_upper_layer` | Indicateur de la couche OverlayFS du fichier |
| `mount_id` | ID de montage du fichier |
| `filesystem` | Nom du système de fichiers du fichier |
| `uid` | ID utilisateur du fichier |
| `gid` | ID de groupe du fichier |
| `user` | Utilisateur du fichier |
| `group` | Groupe du fichier |
| `attribute_name` | Nom de l'attribut étendu du fichier |
| `attribute_namespace` | Espace de nommage de l'attribut étendu du fichier |
| `flags` | Flags du fichier |
| `access_time` | Date d'accès au fichier |
| `modification_time` | Date de modification du fichier |
| `change_time` | Date de changement du fichier |


## `FileEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "path": {
            "type": "string",
            "description": "File path"
        },
        "name": {
            "type": "string",
            "description": "File basename"
        },
        "path_resolution_error": {
            "type": "string",
            "description": "Error message from path resolution"
        },
        "inode": {
            "type": "integer",
            "description": "File inode number"
        },
        "mode": {
            "type": "integer",
            "description": "File mode"
        },
        "in_upper_layer": {
            "type": "boolean",
            "description": "Indicator of file OverlayFS layer"
        },
        "mount_id": {
            "type": "integer",
            "description": "File mount ID"
        },
        "filesystem": {
            "type": "string",
            "description": "File filesystem name"
        },
        "uid": {
            "type": "integer",
            "description": "File User ID"
        },
        "gid": {
            "type": "integer",
            "description": "File Group ID"
        },
        "user": {
            "type": "string",
            "description": "File user"
        },
        "group": {
            "type": "string",
            "description": "File group"
        },
        "attribute_name": {
            "type": "string",
            "description": "File extended attribute name"
        },
        "attribute_namespace": {
            "type": "string",
            "description": "File extended attribute namespace"
        },
        "flags": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "File flags"
        },
        "access_time": {
            "type": "string",
            "format": "date-time",
            "description": "File access time"
        },
        "modification_time": {
            "type": "string",
            "format": "date-time",
            "description": "File modified time"
        },
        "change_time": {
            "type": "string",
            "format": "date-time",
            "description": "File change time"
        },
        "destination": {
            "$ref": "#/$defs/File",
            "description": "Target file information"
        },
        "new_mount_id": {
            "type": "integer",
            "description": "New Mount ID"
        },
        "group_id": {
            "type": "integer",
            "description": "Group ID"
        },
        "device": {
            "type": "integer",
            "description": "Device associated with the file"
        },
        "fstype": {
            "type": "string",
            "description": "Filesystem type"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "uid",
        "gid"
    ],
    "description": "FileEventSerializer serializes a file event to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `path` | Chemin d'accès au fichier |
| `name` | Basename du fichier |
| `path_resolution_error` | Message d'erreur issu de la résolution du chemin |
| `inode` | Inode du fichier |
| `mode` | Mode du fichier |
| `in_upper_layer` | Indicateur de la couche OverlayFS du fichier |
| `mount_id` | ID de montage du fichier |
| `filesystem` | Nom du système de fichiers du fichier |
| `uid` | ID utilisateur du fichier |
| `gid` | ID de groupe du fichier |
| `user` | Utilisateur du fichier |
| `group` | Groupe du fichier |
| `attribute_name` | Nom d'attribut étendu du fichier |
| `attribute_namespace` | Espace de nommage de l'attribut étendu du fichier |
| `flags` | Flags du fichier |
| `access_time` | Date d'accès au fichier |
| `modification_time` | Date de modification du fichier |
| `change_time` | Date de changement du fichier |
| `destination` | Informations sur le fichier cible |
| `new_mount_id` | Nouvel ID de montage |
| `group_id` | ID du groupe |
| `device` | Appareil associé au fichier |
| `fstype` | Type de système de fichiers |

| Références |
| ---------- |
| [File](#file) |

## `IPPort`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "ip": {
            "type": "string",
            "description": "IP address"
        },
        "port": {
            "type": "integer",
            "description": "Port number"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "ip",
        "port"
    ],
    "description": "IPPortSerializer is used to serialize an IP and Port context to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `ip` | Adresse IP |
| `port` | Numéro de port |


## `IPPortFamily`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "family": {
            "type": "string",
            "description": "Address family"
        },
        "ip": {
            "type": "string",
            "description": "IP address"
        },
        "port": {
            "type": "integer",
            "description": "Port number"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "family",
        "ip",
        "port"
    ],
    "description": "IPPortFamilySerializer is used to serialize an IP, port, and address family context to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `family` | Famille d'adresses |
| `ip` | Adresse IP |
| `port` | Numéro de port |


## `MMapEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "address": {
            "type": "string",
            "description": "memory segment address"
        },
        "offset": {
            "type": "integer",
            "description": "file offset"
        },
        "length": {
            "type": "integer",
            "description": "memory segment length"
        },
        "protection": {
            "type": "string",
            "description": "memory segment protection"
        },
        "flags": {
            "type": "string",
            "description": "memory segment flags"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "address",
        "offset",
        "length",
        "protection",
        "flags"
    ],
    "description": "MMapEventSerializer serializes a mmap event to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `address` | Adresse du segment de mémoire |
| `offset` | Décalage du fichier |
| `length` | Longueur du segment de mémoire |
| `protection` | Protection du segment de mémoire |
| `flags` | Flags du segment de mémoire |


## `MProtectEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "vm_start": {
            "type": "string",
            "description": "memory segment start address"
        },
        "vm_end": {
            "type": "string",
            "description": "memory segment end address"
        },
        "vm_protection": {
            "type": "string",
            "description": "initial memory segment protection"
        },
        "req_protection": {
            "type": "string",
            "description": "new memory segment protection"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "vm_start",
        "vm_end",
        "vm_protection",
        "req_protection"
    ],
    "description": "MProtectEventSerializer serializes a mmap event to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `vm_start` | Adresse de début du segment de mémoire |
| `vm_end` | Adresse de fin du segment de mémoire |
| `vm_protection` | Protection du segment mémoire initial |
| `req_protection` | Protection du nouveau segment de mémoire |


## `ModuleEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "module name"
        },
        "loaded_from_memory": {
            "type": "boolean",
            "description": "indicates if a module was loaded from memory, as opposed to a file"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "name"
    ],
    "description": "ModuleEventSerializer serializes a module event to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `name` | Nom du module |
| `loaded_from_memory` | Indique si un module a été chargé depuis la mémoire et non depuis un fichier |


## `NetworkContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "device": {
            "$ref": "#/$defs/NetworkDevice",
            "description": "device is the network device on which the event was captured"
        },
        "l3_protocol": {
            "type": "string",
            "description": "l3_protocol is the layer 3 protocol name"
        },
        "l4_protocol": {
            "type": "string",
            "description": "l4_protocol is the layer 4 protocol name"
        },
        "source": {
            "$ref": "#/$defs/IPPort",
            "description": "source is the emitter of the network event"
        },
        "destination": {
            "$ref": "#/$defs/IPPort",
            "description": "destination is the receiver of the network event"
        },
        "size": {
            "type": "integer",
            "description": "size is the size in bytes of the network event"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "l3_protocol",
        "l4_protocol",
        "source",
        "destination",
        "size"
    ],
    "description": "NetworkContextSerializer serializes the network context to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `device` | Le périphérique réseau sur lequel l'événement a été capturé |
| `l3_protocol` | Le nom du protocole de couche 3 |
| `l4_protocol` | Le nom du protocole de couche 4 |
| `source` | L'émetteur de l'événement réseau |
| `destination` | Le destinataire de l'événement réseau |
| `size` | La taille en octets de l'événement réseau |

| Références |
| ---------- |
| [NetworkDevice](#networkdevice) |
| [IPPort](#ipport) |
| [IPPort](#ipport) |

## `NetworkDevice`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "netns": {
            "type": "integer",
            "description": "netns is the interface ifindex"
        },
        "ifindex": {
            "type": "integer",
            "description": "ifindex is the network interface ifindex"
        },
        "ifname": {
            "type": "string",
            "description": "ifname is the network interface name"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "netns",
        "ifindex",
        "ifname"
    ],
    "description": "NetworkDeviceSerializer serializes the network device context to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `netns` | L'ifindex de l'interface |
| `ifindex` | L'ifindex de l'interface réseau |
| `ifname` | Le nom de l'interface réseau |


## `PTraceEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "request": {
            "type": "string",
            "description": "ptrace request"
        },
        "address": {
            "type": "string",
            "description": "address at which the ptrace request was executed"
        },
        "tracee": {
            "$ref": "#/$defs/ProcessContext",
            "description": "process context of the tracee"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "request",
        "address"
    ],
    "description": "PTraceEventSerializer serializes a mmap event to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `request` | Requête ptrace |
| `address` | Adresse à laquelle la requête ptrace a été exécutée |
| `tracee` | Contexte du processus tracé |

| Références |
| ---------- |
| [ProcessContext](#processcontext) |

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
        "tid": {
            "type": "integer",
            "description": "Thread ID"
        },
        "uid": {
            "type": "integer",
            "description": "User ID"
        },
        "gid": {
            "type": "integer",
            "description": "Group ID"
        },
        "user": {
            "type": "string",
            "description": "User name"
        },
        "group": {
            "type": "string",
            "description": "Group name"
        },
        "path_resolution_error": {
            "type": "string",
            "description": "Description of an error in the path resolution"
        },
        "comm": {
            "type": "string",
            "description": "Command name"
        },
        "tty": {
            "type": "string",
            "description": "TTY associated with the process"
        },
        "fork_time": {
            "type": "string",
            "format": "date-time",
            "description": "Fork time of the process"
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
        "credentials": {
            "$ref": "#/$defs/ProcessCredentials",
            "description": "Credentials associated with the process"
        },
        "executable": {
            "$ref": "#/$defs/File",
            "description": "File information of the executable"
        },
        "interpreter": {
            "$ref": "#/$defs/File",
            "description": "File information of the interpreter"
        },
        "container": {
            "$ref": "#/$defs/ContainerContext",
            "description": "Container context"
        },
        "argv0": {
            "type": "string",
            "description": "First command line argument"
        },
        "args": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "Command line arguments"
        },
        "args_truncated": {
            "type": "boolean",
            "description": "Indicator of arguments truncation"
        },
        "envs": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "Environment variables of the process"
        },
        "envs_truncated": {
            "type": "boolean",
            "description": "Indicator of environments variable truncation"
        },
        "is_thread": {
            "type": "boolean",
            "description": "Indicates whether the process is considered a thread (that is, a child process that hasn't executed another program)"
        },
        "is_kworker": {
            "type": "boolean",
            "description": "Indicates whether the process is a kworker"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "uid",
        "gid"
    ],
    "description": "ProcessSerializer serializes a process to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `pid` | ID du processus |
| `ppid` | ID du processus parent |
| `tid` | ID du thread |
| `uid` | ID de l'utilisateur |
| `gid` | ID du groupe |
| `user` | Nom de l'utilisateur |
| `group` | Nom du groupe |
| `path_resolution_error` | Description d'une erreur dans la résolution du chemin |
| `comm` | Nom de la commande |
| `tty` | TTY associé au processus |
| `fork_time` | Temps de fork du processus |
| `exec_time` | Temps d'exécution du processus |
| `exit_time` | Temps de sortie du processus |
| `credentials` | Identifiants associés au processus |
| `executable` | Informations sur le fichier de l'exécutable |
| `interpreter` | Informations sur le fichier de l'interpréteur |
| `container` | Contexte du conteneur |
| `argv0` | Premier argument de ligne de commande |
| `args` | Arguments de ligne de commande |
| `args_truncated` | Indicateur d'arguments tronqués |
| `envs` | Variables d'environnement du processus |
| `envs_truncated` | Indicateur de variables d'environnement tronquées |
| `is_thread` | Indique si le processus est considéré comme un thread (autrement dit, un processus enfant n'ayant pas exécuté un autre programme) |
| `is_kworker` | Indique si le processus est un kworker |

| Références |
| ---------- |
| [ProcessCredentials](#processcredentials) |
| [File](#file) |
| [File](#file) |
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
        "tid": {
            "type": "integer",
            "description": "Thread ID"
        },
        "uid": {
            "type": "integer",
            "description": "User ID"
        },
        "gid": {
            "type": "integer",
            "description": "Group ID"
        },
        "user": {
            "type": "string",
            "description": "User name"
        },
        "group": {
            "type": "string",
            "description": "Group name"
        },
        "path_resolution_error": {
            "type": "string",
            "description": "Description of an error in the path resolution"
        },
        "comm": {
            "type": "string",
            "description": "Command name"
        },
        "tty": {
            "type": "string",
            "description": "TTY associated with the process"
        },
        "fork_time": {
            "type": "string",
            "format": "date-time",
            "description": "Fork time of the process"
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
        "credentials": {
            "$ref": "#/$defs/ProcessCredentials",
            "description": "Credentials associated with the process"
        },
        "executable": {
            "$ref": "#/$defs/File",
            "description": "File information of the executable"
        },
        "interpreter": {
            "$ref": "#/$defs/File",
            "description": "File information of the interpreter"
        },
        "container": {
            "$ref": "#/$defs/ContainerContext",
            "description": "Container context"
        },
        "argv0": {
            "type": "string",
            "description": "First command line argument"
        },
        "args": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "Command line arguments"
        },
        "args_truncated": {
            "type": "boolean",
            "description": "Indicator of arguments truncation"
        },
        "envs": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "Environment variables of the process"
        },
        "envs_truncated": {
            "type": "boolean",
            "description": "Indicator of environments variable truncation"
        },
        "is_thread": {
            "type": "boolean",
            "description": "Indicates whether the process is considered a thread (that is, a child process that hasn't executed another program)"
        },
        "is_kworker": {
            "type": "boolean",
            "description": "Indicates whether the process is a kworker"
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
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "uid",
        "gid"
    ],
    "description": "ProcessContextSerializer serializes a process context to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `pid` | ID du processus |
| `ppid` | ID du processus parent |
| `tid` | ID du thread |
| `uid` | ID de l'utilisateur |
| `gid` | ID du groupe |
| `user` | Nom de l'utilisateur |
| `group` | Nom du groupe |
| `path_resolution_error` | Description d'une erreur dans la résolution du chemin |
| `comm` | Nom de la commande |
| `tty` | TTY associé au processus |
| `fork_time` | Temps de fork du processus |
| `exec_time` | Temps d'exécution du processus |
| `exit_time` | Temps de sortie du processus |
| `credentials` | Identifiants associés au processus |
| `executable` | Informations sur le fichier exécutable |
| `interpreter` | Informations sur le fichier de l'interpréteur |
| `container` | Contexte du conteneur |
| `argv0` | Premier argument de ligne de commande |
| `args` | Arguments de ligne de commande |
| `args_truncated` | Indicateur d'arguments tronqués |
| `envs` | Variables d'environnement du processus |
| `envs_truncated` | Indicateur de variables d'environnement tronquées |
| `is_thread` | Indique si le processus est considéré comme un thread (autrement dit, un processus enfant n'ayant pas exécuté un autre programme) |
| `is_kworker` | Indique si le processus est un kworker |
| `parent` | Processus parent |
| `ancestors` | Ancêtres du processus |

| Références |
| ---------- |
| [ProcessCredentials](#processcredentials) |
| [File](#file) |
| [File](#file) |
| [ContainerContext](#containercontext) |
| [Process](#process) |

## `ProcessCredentials`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "uid": {
            "type": "integer",
            "description": "User ID"
        },
        "user": {
            "type": "string",
            "description": "User name"
        },
        "gid": {
            "type": "integer",
            "description": "Group ID"
        },
        "group": {
            "type": "string",
            "description": "Group name"
        },
        "euid": {
            "type": "integer",
            "description": "Effective User ID"
        },
        "euser": {
            "type": "string",
            "description": "Effective User name"
        },
        "egid": {
            "type": "integer",
            "description": "Effective Group ID"
        },
        "egroup": {
            "type": "string",
            "description": "Effective Group name"
        },
        "fsuid": {
            "type": "integer",
            "description": "Filesystem User ID"
        },
        "fsuser": {
            "type": "string",
            "description": "Filesystem User name"
        },
        "fsgid": {
            "type": "integer",
            "description": "Filesystem Group ID"
        },
        "fsgroup": {
            "type": "string",
            "description": "Filesystem Group name"
        },
        "cap_effective": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "Effective Capability set"
        },
        "cap_permitted": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "Permitted Capability set"
        },
        "destination": {
            "description": "Credentials after the operation"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "uid",
        "gid",
        "euid",
        "egid",
        "fsuid",
        "fsgid",
        "cap_effective",
        "cap_permitted"
    ],
    "description": "ProcessCredentialsSerializer serializes the process credentials to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `uid` | ID de l'utilisateur |
| `user` | Nom de l'utilisateur |
| `gid` | ID du groupe |
| `group` | Nom du groupe |
| `euid` | ID d'utilisateur effectif |
| `euser` | Nom d'utilisateur effectif |
| `egid` | ID de groupe effectif |
| `egroup` | Nom de groupe effectif |
| `fsuid` | ID utilisateur du système de fichiers |
| `fsuser` | Nom d'utilisateur du système de fichiers |
| `fsgid` | ID de groupe du système de fichiers |
| `fsgroup` | Nom de groupe du système de fichiers |
| `cap_effective` | Ensemble de capacités effectives |
| `cap_permitted` | Ensemble de capacités autorisées du processus |
| `destination` | Identifiants après l'opération |


## `SELinuxBoolChange`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "SELinux boolean name"
        },
        "state": {
            "type": "string",
            "description": "SELinux boolean state ('on' or 'off')"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "SELinuxBoolChangeSerializer serializes a SELinux boolean change to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `name` | Nom du booléen SELinux |
| `state` | État du booléen SELinux (on ou off) |


## `SELinuxBoolCommit`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "state": {
            "type": "boolean",
            "description": "SELinux boolean commit operation"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "SELinuxBoolCommitSerializer serializes a SELinux boolean commit to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `state` | Opération de commit du booléen SELinux |


## `SELinuxEnforceStatus`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "status": {
            "type": "string",
            "description": "SELinux enforcement status (one of 'enforcing', 'permissive' or 'disabled')"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "SELinuxEnforceStatusSerializer serializes a SELinux enforcement status change to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `status` | Statut de l'application de SELinux (enforcing, permissive ou disabled) |


## `SELinuxEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "bool": {
            "$ref": "#/$defs/SELinuxBoolChange",
            "description": "SELinux boolean operation"
        },
        "enforce": {
            "$ref": "#/$defs/SELinuxEnforceStatus",
            "description": "SELinux enforcement change"
        },
        "bool_commit": {
            "$ref": "#/$defs/SELinuxBoolCommit",
            "description": "SELinux boolean commit"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "SELinuxEventSerializer serializes a SELinux context to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `bool` | Opération du booléen SELinux |
| `enforce` | Changement de l'application de SELinux |
| `bool_commit` | Commit du booléen SELinux |

| Références |
| ---------- |
| [SELinuxBoolChange](#selinuxboolchange) |
| [SELinuxEnforceStatus](#selinuxenforcestatus) |
| [SELinuxBoolCommit](#selinuxboolcommit) |

## `SignalEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "type": {
            "type": "string",
            "description": "signal type"
        },
        "pid": {
            "type": "integer",
            "description": "signal target pid"
        },
        "target": {
            "$ref": "#/$defs/ProcessContext",
            "description": "process context of the signal target"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "type",
        "pid"
    ],
    "description": "SignalEventSerializer serializes a signal event to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `type` | Type de signal |
| `pid` | PID de la cible du signal |
| `target` | Contexte de processus de la cible du signal |

| Références |
| ---------- |
| [ProcessContext](#processcontext) |

## `SpliceEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "pipe_entry_flag": {
            "type": "string",
            "description": "Entry flag of the fd_out pipe passed to the splice syscall"
        },
        "pipe_exit_flag": {
            "type": "string",
            "description": "Exit flag of the fd_out pipe passed to the splice syscall"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "pipe_entry_flag",
        "pipe_exit_flag"
    ],
    "description": "SpliceEventSerializer serializes a splice event to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `pipe_entry_flag` | Flag d'entrée du canal fd_out transmis à l'appel système splice |
| `pipe_exit_flag` | Flag de sortie du canal fd_out transmis à l'appel système splice |


## `UserContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "id": {
            "type": "string",
            "description": "User name"
        },
        "group": {
            "type": "string",
            "description": "Group name"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "UserContextSerializer serializes a user context to JSON"
}

{{< /code-block >}}

| Champ | Description |
| ----- | ----------- |
| `id` | Nom de l'utilisateur |
| `group` | Nom du groupe |



[1]: /fr/security_platform/cloud_workload_security/
[2]: /fr/security_platform/cloud_workload_security/agent_expressions