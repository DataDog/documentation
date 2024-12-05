---
description: CWS バックエンドイベントの JSON スキーマドキュメント
disable_edit: true
title: クラウドワークロードセキュリティ (CWS) イベント形式
---
<!-- このファイルは自動生成されています。scripts/templates フォルダーにあるファイルを編集してください -->

アクティビティが[クラウドワークロードセキュリティ][1] (CWS) [Agent 式][2]に一致する場合、アクティビティに関するすべての関連コンテキストを含む CWS ログがシステムから収集されます。

このログは Datadog に送信され、そこで分析されます。分析に基づき、CWS ログはセキュリティシグナルのトリガーとなったり、監査や脅威の調査目的でログとして保存されたりします。

CWS のログは、以下の JSON スキーマを持ちます。


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

| パラメーター | タイプ | 説明 |
| --------- | ---- | ----------- |
| `evt` | $ref | [EventContext](#eventcontext) をご覧ください。 |
| `file` | $ref | [FileEvent](#fileevent) をご覧ください。 |
| `selinux` | $ref | [SELinuxEvent](#selinuxevent) をご覧ください。 |
| `bpf` | $ref | [BPFEvent](#bpfevent) をご覧ください。 |
| `mmap` | $ref | [MMapEvent](#mmapevent) をご覧ください。 |
| `mprotect` | $ref | [MProtectEvent](#mprotectevent) をご覧ください。 |
| `ptrace` | $ref | [PTraceEvent](#ptraceevent) をご覧ください。 |
| `module` | $ref | [ModuleEvent](#moduleevent) をご覧ください。 |
| `signal` | $ref | [SignalEvent](#signalevent) をご覧ください。 |
| `splice` | $ref | [SpliceEvent](#spliceevent) をご覧ください。 |
| `dns` | $ref | [DNSEvent](#dnsevent) をご覧ください。 |
| `network` | $ref | [NetworkContext](#networkcontext) をご覧ください。 |
| `bind` | $ref | [BindEvent](#bindevent) をご覧ください。 |
| `exit` | $ref | [ExitEvent](#exitevent) をご覧ください。 |
| `usr` | $ref | [UserContext](#usercontext) をご覧ください。 |
| `process` | $ref | [ProcessContext](#processcontext) をご覧ください。 |
| `dd` | $ref | [DDContext](#ddcontext) をご覧ください。 |
| `container` | $ref | [ContainerContext](#containercontext) をご覧ください。 |
| `date` | 文字列 |  |

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

| フィールド | 説明 |
| ----- | ----------- |
| `cmd` | BPF コマンド |
| `map` | BPF マップ |
| `program` | BPF プログラム |

| リファレンス |
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

| フィールド | 説明 |
| ----- | ----------- |
| `name` | BPF マップの名前 |
| `map_type` | BPF マップのタイプ |


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

| フィールド | 説明 |
| ----- | ----------- |
| `name` | BPF プログラムの名前 |
| `tag` | BPF プログラムのハッシュ (sha1) |
| `program_type` | BPF プログラムのタイプ |
| `attach_type` | BPF プログラムのアタッチタイプ |
| `helpers` | BPF プログラムで使用するヘルパーのリスト |


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

| フィールド | 説明 |
| ----- | ----------- |
| `addr` | バウンドアドレス (ある場合) |

| リファレンス |
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

| フィールド | 説明 |
| ----- | ----------- |
| `id` | コンテナ ID |


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

| フィールド | 説明 |
| ----- | ----------- |
| `span_id` | APM 相関に使用するスパン ID |
| `trace_id` | APM 相関に使用するトレース ID |


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

| フィールド | 説明 |
| ----- | ----------- |
| `id` | id は DNS リクエストの一意な識別子です |
| `question` | question は、DNS リクエストに対する DNS 質問です |

| リファレンス |
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

| フィールド | 説明 |
| ----- | ----------- |
| `class` | class は DNS の質問で調べたクラスです |
| `type` | type は DNS の質問タイプを指定する 2 オクテットのコードです |
| `name` | name はクエリしたドメイン名です |
| `size` | size は、DNS リクエストの合計サイズ (バイト) です |
| `count` | count は DNS リクエストの質問数の合計です |


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

| フィールド | 説明 |
| ----- | ----------- |
| `name` | イベント名 |
| `category` | イベントカテゴリー |
| `outcome` | イベント結果 |
| `async` | イベントが非同期の場合、true |


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

| フィールド | 説明 |
| ----- | ----------- |
| `cause` | プロセス終了の原因 (EXITED、SIGNALED、COREDUMPED のいずれか 1 つ) |
| `code` | プロセスの終了コード、またはプロセスを終了させたシグナルの番号 |


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

| フィールド | 説明 |
| ----- | ----------- |
| `path` | ファイルパス |
| `name` | ファイルベース名 |
| `path_resolution_error` | パス解決時のエラーメッセージ |
| `inode` | ファイルの inode 番号 |
| `mode` | ファイルモード |
| `in_upper_layer` | ファイル OverlayFS レイヤーのインジケーター |
| `mount_id` | ファイルマウント ID |
| `filesystem` | ファイルの filesystem 名 |
| `uid` | ファイルユーザー ID |
| `gid` | ファイルグループ ID |
| `user` | ファイルユーザー |
| `group` | ファイルグループ |
| `attribute_name` | ファイル拡張属性名 |
| `attribute_namespace` | ファイル拡張属性ネームスペース |
| `flags` | ファイルフラグ |
| `access_time` | ファイルアクセス時間 |
| `modification_time` | ファイル更新時間 |
| `change_time` | ファイル変更時間 |


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

| フィールド | 説明 |
| ----- | ----------- |
| `path` | ファイルパス |
| `name` | ファイルベース名 |
| `path_resolution_error` | パス解決時のエラーメッセージ |
| `inode` | ファイルの inode 番号 |
| `mode` | ファイルモード |
| `in_upper_layer` | ファイル OverlayFS レイヤーのインジケーター |
| `mount_id` | ファイルマウント ID |
| `filesystem` | ファイルの filesystem 名 |
| `uid` | ファイルユーザー ID |
| `gid` | ファイルグループ ID |
| `user` | ファイルユーザー |
| `group` | ファイルグループ |
| `attribute_name` | ファイル拡張属性名 |
| `attribute_namespace` | ファイル拡張属性ネームスペース |
| `flags` | ファイルフラグ |
| `access_time` | ファイルアクセス時間 |
| `modification_time` | ファイル更新時間 |
| `change_time` | ファイル変更時間 |
| `destination` | ターゲットファイル情報 |
| `new_mount_id` | 新規マウント ID |
| `group_id` | グループ ID |
| `device` | ファイルに関連するデバイス |
| `fstype` | Filesystem タイプ |

| リファレンス |
| ---------- |
| [ファイル](#file) |

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

| フィールド | 説明 |
| ----- | ----------- |
| `ip` | IP アドレス |
| `port` | ポート番号 |


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

| フィールド | 説明 |
| ----- | ----------- |
| `family` | アドレスファミリー |
| `ip` | IP アドレス |
| `port` | ポート番号 |


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

| フィールド | 説明 |
| ----- | ----------- |
| `address` | メモリセグメントアドレス |
| `offset` | ファイルオフセット |
| `length` | メモリセグメント長 |
| `protection` | メモリセグメント保護 |
| `flags` | メモリセグメントフラグ |


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

| フィールド | 説明 |
| ----- | ----------- |
| `vm_start` | メモリセグメント開始アドレス |
| `vm_end` | メモリセグメント終了アドレス |
| `vm_protection` | 初期メモリセグメント保護 |
| `req_protection` | 新規メモリセグメント保護 |


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

| フィールド | 説明 |
| ----- | ----------- |
| `name` | モジュール名 |
| `loaded_from_memory` | モジュールがファイルではなく、メモリからロードされたかどうかを示します |


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

| フィールド | 説明 |
| ----- | ----------- |
| `device` | device はイベントがキャプチャされたネットワークデバイスです |
| `l3_protocol` | l3_protocol はレイヤー 3 プロトコル名です |
| `l4_protocol` | l4_protocol はレイヤー 4 プロトコル名です |
| `source` | source は、ネットワークイベントの発信元です |
| `destination` | destination は、ネットワークイベントの受信者です |
| `size` | size は、ネットワークイベントのバイト数です |

| リファレンス |
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

| フィールド | 説明 |
| ----- | ----------- |
| `netns` | netns はインターフェイス ifindex です |
| `ifindex` | ifindex はネットワークインターフェース ifindex です |
| `ifname` | ifname はネットワークインターフェース名です |


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

| フィールド | 説明 |
| ----- | ----------- |
| `request` | ptrace リクエスト |
| `address` | ptrace リクエストが実行されたアドレス |
| `tracee` | tracee のプロセスコンテキスト |

| リファレンス |
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

| フィールド | 説明 |
| ----- | ----------- |
| `pid` | プロセス ID |
| `ppid` | 親プロセス ID |
| `tid` | スレッド ID |
| `uid` | ユーザー ID |
| `gid` | グループ ID |
| `user` | ユーザー名 |
| `group` | グループ名 |
| `path_resolution_error` | パス解決に伴うエラーの説明 |
| `comm` | コマンド名 |
| `tty` | プロセスに関連する TTY |
| `fork_time` | プロセスのフォーク時間 |
| `exec_time` | プロセスの実行時間 |
| `exit_time` | プロセスの終了時間 |
| `credentials` | プロセスに関連する認証情報 |
| `executable` | 実行ファイルのファイル情報 |
| `interpreter` | インタープリターのファイル情報 |
| `container` | コンテナコンテキスト |
| `argv0` | コマンドライン第一引数 |
| `args` | コマンドライン引数 |
| `args_truncated` | 引数の切り捨てのインジケーター |
| `envs` | プロセスの環境変数 |
| `envs_truncated` | 環境変数の切り捨てのインジケーター |
| `is_thread` | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |
| `is_kworker` | プロセスが kworker であるかどうかを示します |

| リファレンス |
| ---------- |
| [ProcessCredentials](#processcredentials) |
| [ファイル](#file) |
| [ファイル](#file) |
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

| フィールド | 説明 |
| ----- | ----------- |
| `pid` | プロセス ID |
| `ppid` | 親プロセス ID |
| `tid` | スレッド ID |
| `uid` | ユーザー ID |
| `gid` | グループ ID |
| `user` | ユーザー名 |
| `group` | グループ名 |
| `path_resolution_error` | パス解決に伴うエラーの説明 |
| `comm` | コマンド名 |
| `tty` | プロセスに関連する TTY |
| `fork_time` | プロセスのフォーク時間 |
| `exec_time` | プロセスの実行時間 |
| `exit_time` | プロセスの終了時間 |
| `credentials` | プロセスに関連する認証情報 |
| `executable` | 実行ファイルのファイル情報 |
| `interpreter` | インタープリターのファイル情報 |
| `container` | コンテナコンテキスト |
| `argv0` | コマンドライン第一引数 |
| `args` | コマンドライン引数 |
| `args_truncated` | 引数の切り捨てのインジケーター |
| `envs` | プロセスの環境変数 |
| `envs_truncated` | 環境変数の切り捨てのインジケーター |
| `is_thread` | プロセスがスレッド (他のプログラムを実行していない子プロセス) とみなされているかどうかを示します |
| `is_kworker` | プロセスが kworker であるかどうかを示します |
| `parent` | 親プロセス |
| `ancestors` | 祖先プロセス |

| リファレンス |
| ---------- |
| [ProcessCredentials](#processcredentials) |
| [ファイル](#file) |
| [ファイル](#file) |
| [ContainerContext](#containercontext) |
| [プロセス](#process) |

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

| フィールド | 説明 |
| ----- | ----------- |
| `uid` | ユーザー ID |
| `user` | ユーザー名 |
| `gid` | グループ ID |
| `group` | グループ名 |
| `euid` | 有効なユーザー ID |
| `euser` | 有効なユーザー名 |
| `egid` | 有効なグループ ID |
| `egroup` | 有効なグループ名 |
| `fsuid` | Filesystem ユーザー ID |
| `fsuser` | Filesystem ユーザー名 |
| `fsgid` | Filesystem グループ ID |
| `fsgroup` | Filesystem グループ名 |
| `cap_effective` | 有効な Capability セット |
| `cap_permitted` | 許可された Capability セット |
| `destination` | 操作後の認証情報 |


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

| フィールド | 説明 |
| ----- | ----------- |
| `name` | SELinux ブール値名 |
| `state` | SELinux のブール値状態（'on' または 'off') |


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

| フィールド | 説明 |
| ----- | ----------- |
| `state` | SELinux のブールコミット演算 |


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

| フィールド | 説明 |
| ----- | ----------- |
| `status` | SELinux の実行ステータス (’enforcing'、’permissive'、’disabled' のいずれか 1 つ) |


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

| フィールド | 説明 |
| ----- | ----------- |
| `bool` | SELinux のブール演算 |
| `enforce` | SELinux の強制力の変更 |
| `bool_commit` | SELinux のブールコミット |

| リファレンス |
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

| フィールド | 説明 |
| ----- | ----------- |
| `type` | シグナルタイプ |
| `pid` | シグナルターゲット pid |
| `target` | シグナルターゲットのプロセスコンテキスト |

| リファレンス |
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

| フィールド | 説明 |
| ----- | ----------- |
| `pipe_entry_flag` | splice syscall に渡された fd_out パイプのエントリフラグ |
| `pipe_exit_flag` | splice syscall に渡された fd_out パイプの終了フラグ |


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

| フィールド | 説明 |
| ----- | ----------- |
| `id` | ユーザー名 |
| `group` | グループ名 |



[1]: /ja/security_platform/cloud_workload_security/
[2]: /ja/security_platform/cloud_workload_security/agent_expressions