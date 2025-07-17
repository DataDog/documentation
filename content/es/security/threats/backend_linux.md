---
description: Documentación del esquema JSON del evento de backend CSM Threats en Linux
disable_edit: true
title: Formatos de eventos CSM Threats en Linux
---
<!--  FUENTE https://github.com/DataDog/datadog-agent -->


<!-- ESTE ARCHIVO SE GENERA AUTOMÁTICAMENTE. EDÍTALO EN LA CARPETA SCRIPTS/PLANTILLAS -->

Los eventos CSM Threats para sistemas Linux tiene el siguiente esquema JSON:


{{< code-block lang="json" collapsible="true" filename="BACKEND_EVENT_JSON_SCHEMA" >}}
{
    "$id": "https://github.com/DataDog/datadog-agent/tree/main/pkg/security/serializers",
    "$defs": {
        "AWSIMDSEvent": {
            "properties": {
                "is_imds_v2": {
                    "type": "boolean",
                    "description": "is_imds_v2 reports if the IMDS event follows IMDSv1 or IMDSv2 conventions"
                },
                "security_credentials": {
                    "$ref": "#/$defs/AWSSecurityCredentials",
                    "description": "SecurityCredentials holds the scrubbed data collected on the security credentials"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "is_imds_v2"
            ],
            "description": "AWSIMDSEventSerializer serializes an AWS IMDS event to JSON"
        },
        "AWSSecurityCredentials": {
            "properties": {
                "code": {
                    "type": "string",
                    "description": "code is the IMDS server code response"
                },
                "type": {
                    "type": "string",
                    "description": "type is the security credentials type"
                },
                "access_key_id": {
                    "type": "string",
                    "description": "access_key_id is the unique access key ID of the credentials"
                },
                "last_updated": {
                    "type": "string",
                    "description": "last_updated is the last time the credentials were updated"
                },
                "expiration": {
                    "type": "string",
                    "description": "expiration is the expiration date of the credentials"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "code",
                "type",
                "access_key_id",
                "last_updated",
                "expiration"
            ],
            "description": "AWSSecurityCredentialsSerializer serializes the security credentials from an AWS IMDS request"
        },
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
        "CGroupContext": {
            "properties": {
                "id": {
                    "type": "string",
                    "description": "CGroup ID"
                },
                "manager": {
                    "type": "string",
                    "description": "CGroup manager"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "CGroupContextSerializer serializes a cgroup context to JSON"
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
        "DDContext": {
            "properties": {
                "span_id": {
                    "type": "string",
                    "description": "Span ID used for APM correlation"
                },
                "trace_id": {
                    "type": "string",
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
                "id",
                "question"
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
                "package_name": {
                    "type": "string",
                    "description": "System package name"
                },
                "package_version": {
                    "type": "string",
                    "description": "System package version"
                },
                "hashes": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "List of cryptographic hashes of the file"
                },
                "hash_state": {
                    "type": "string",
                    "description": "State of the hashes or reason why they weren't computed"
                },
                "mount_path": {
                    "type": "string",
                    "description": "MountPath path of the mount"
                },
                "mount_source": {
                    "type": "string",
                    "description": "MountSource source of the mount"
                },
                "mount_origin": {
                    "type": "string",
                    "description": "MountOrigin origin of the mount"
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
                "package_name": {
                    "type": "string",
                    "description": "System package name"
                },
                "package_version": {
                    "type": "string",
                    "description": "System package version"
                },
                "hashes": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "List of cryptographic hashes of the file"
                },
                "hash_state": {
                    "type": "string",
                    "description": "State of the hashes or reason why they weren't computed"
                },
                "mount_path": {
                    "type": "string",
                    "description": "MountPath path of the mount"
                },
                "mount_source": {
                    "type": "string",
                    "description": "MountSource source of the mount"
                },
                "mount_origin": {
                    "type": "string",
                    "description": "MountOrigin origin of the mount"
                },
                "destination": {
                    "$ref": "#/$defs/File",
                    "description": "Target file information"
                },
                "new_mount_id": {
                    "type": "integer",
                    "description": "New Mount ID"
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
        "IMDSEvent": {
            "properties": {
                "type": {
                    "type": "string",
                    "description": "type is the type of IMDS event"
                },
                "cloud_provider": {
                    "type": "string",
                    "description": "cloud_provider is the intended cloud provider of the IMDS event"
                },
                "url": {
                    "type": "string",
                    "description": "url is the url of the IMDS request"
                },
                "host": {
                    "type": "string",
                    "description": "host is the host of the HTTP protocol"
                },
                "user_agent": {
                    "type": "string",
                    "description": "user_agent is the user agent of the HTTP client"
                },
                "server": {
                    "type": "string",
                    "description": "server is the server header of a response"
                },
                "aws": {
                    "$ref": "#/$defs/AWSIMDSEvent",
                    "description": "AWS holds the AWS specific data parsed from the IMDS event"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "type",
                "cloud_provider"
            ],
            "description": "IMDSEventSerializer serializes an IMDS event to JSON"
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
        "ModuleEvent": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "module name"
                },
                "loaded_from_memory": {
                    "type": "boolean",
                    "description": "indicates if a module was loaded from memory, as opposed to a file"
                },
                "argv": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array"
                },
                "args_truncated": {
                    "type": "boolean"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "name"
            ],
            "description": "ModuleEventSerializer serializes a module event to JSON"
        },
        "MountEvent": {
            "properties": {
                "mp": {
                    "$ref": "#/$defs/File",
                    "description": "Mount point file information"
                },
                "root": {
                    "$ref": "#/$defs/File",
                    "description": "Root file information"
                },
                "mount_id": {
                    "type": "integer",
                    "description": "Mount ID of the new mount"
                },
                "parent_mount_id": {
                    "type": "integer",
                    "description": "Mount ID of the parent mount"
                },
                "bind_src_mount_id": {
                    "type": "integer",
                    "description": "Mount ID of the source of a bind mount"
                },
                "device": {
                    "type": "integer",
                    "description": "Device associated with the file"
                },
                "fs_type": {
                    "type": "string",
                    "description": "Filesystem type"
                },
                "mountpoint.path": {
                    "type": "string",
                    "description": "Mount point path"
                },
                "source.path": {
                    "type": "string",
                    "description": "Mount source path"
                },
                "mountpoint.path_error": {
                    "type": "string",
                    "description": "Mount point path error"
                },
                "source.path_error": {
                    "type": "string",
                    "description": "Mount source path error"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "mount_id",
                "parent_mount_id",
                "bind_src_mount_id",
                "device"
            ],
            "description": "MountEventSerializer serializes a mount event to JSON"
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
                "user_session": {
                    "$ref": "#/$defs/UserSessionContext",
                    "description": "Context of the user session for this event"
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
                "is_exec_child": {
                    "type": "boolean",
                    "description": "Indicates whether the process is an exec following another exec"
                },
                "source": {
                    "type": "string",
                    "description": "Process source"
                },
                "syscalls": {
                    "$ref": "#/$defs/SyscallsEvent",
                    "description": "List of syscalls captured to generate the event"
                },
                "aws_security_credentials": {
                    "items": {
                        "$ref": "#/$defs/AWSSecurityCredentials"
                    },
                    "type": "array",
                    "description": "List of AWS Security Credentials that the process had access to"
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
                "user_session": {
                    "$ref": "#/$defs/UserSessionContext",
                    "description": "Context of the user session for this event"
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
                "is_exec_child": {
                    "type": "boolean",
                    "description": "Indicates whether the process is an exec following another exec"
                },
                "source": {
                    "type": "string",
                    "description": "Process source"
                },
                "syscalls": {
                    "$ref": "#/$defs/SyscallsEvent",
                    "description": "List of syscalls captured to generate the event"
                },
                "aws_security_credentials": {
                    "items": {
                        "$ref": "#/$defs/AWSSecurityCredentials"
                    },
                    "type": "array",
                    "description": "List of AWS Security Credentials that the process had access to"
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
                "auid": {
                    "type": "integer",
                    "description": "Login UID"
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
                "auid",
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
        "SecurityProfileContext": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Name of the security profile"
                },
                "version": {
                    "type": "string",
                    "description": "Version of the profile in use"
                },
                "tags": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "List of tags associated to this profile"
                },
                "event_in_profile": {
                    "type": "boolean",
                    "description": "True if the corresponding event is part of this profile"
                },
                "event_type_state": {
                    "type": "string",
                    "description": "State of the event type in this profile"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "name",
                "version",
                "tags",
                "event_in_profile",
                "event_type_state"
            ],
            "description": "SecurityProfileContextSerializer serializes the security profile context in an event"
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
        "Syscall": {
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Name of the syscall"
                },
                "id": {
                    "type": "integer",
                    "description": "ID of the syscall in the host architecture"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "required": [
                "name",
                "id"
            ],
            "description": "SyscallSerializer serializes a syscall"
        },
        "SyscallArgs": {
            "properties": {
                "path": {
                    "type": "string",
                    "description": "Path argument"
                },
                "flags": {
                    "type": "integer",
                    "description": "Flags argument"
                },
                "mode": {
                    "type": "integer",
                    "description": "Mode argument"
                },
                "uid": {
                    "type": "integer",
                    "description": "UID argument"
                },
                "gid": {
                    "type": "integer",
                    "description": "GID argument"
                },
                "dirfd": {
                    "type": "integer",
                    "description": "Directory file descriptor argument"
                },
                "destination_path": {
                    "type": "string",
                    "description": "Destination path argument"
                },
                "fs_type": {
                    "type": "string",
                    "description": "File system type argument"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "SyscallArgsSerializer args serializer"
        },
        "SyscallContext": {
            "properties": {
                "chmod": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "chown": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "chdir": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "exec": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "open": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "unlink": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "link": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "rename": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "utimes": {
                    "$ref": "#/$defs/SyscallArgs"
                },
                "mount": {
                    "$ref": "#/$defs/SyscallArgs"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "SyscallContextSerializer serializes syscall context"
        },
        "SyscallsEvent": {
            "items": {
                "$ref": "#/$defs/Syscall"
            },
            "type": "array",
            "description": "SyscallsEventSerializer serializes the syscalls from a syscalls event"
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
        },
        "UserSessionContext": {
            "properties": {
                "id": {
                    "type": "string",
                    "description": "Unique identifier of the user session on the host"
                },
                "session_type": {
                    "type": "string",
                    "description": "Type of the user session"
                },
                "k8s_username": {
                    "type": "string",
                    "description": "Username of the Kubernetes \"kubectl exec\" session"
                },
                "k8s_uid": {
                    "type": "string",
                    "description": "UID of the Kubernetes \"kubectl exec\" session"
                },
                "k8s_groups": {
                    "items": {
                        "type": "string"
                    },
                    "type": "array",
                    "description": "Groups of the Kubernetes \"kubectl exec\" session"
                },
                "k8s_extra": {
                    "additionalProperties": {
                        "items": {
                            "type": "string"
                        },
                        "type": "array"
                    },
                    "type": "object",
                    "description": "Extra of the Kubernetes \"kubectl exec\" session"
                }
            },
            "additionalProperties": false,
            "type": "object",
            "description": "UserSessionContextSerializer serializes the user session context to JSON"
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
        "cgroup": {
            "$ref": "#/$defs/CGroupContext"
        },
        "network": {
            "$ref": "#/$defs/NetworkContext"
        },
        "dd": {
            "$ref": "#/$defs/DDContext"
        },
        "security_profile": {
            "$ref": "#/$defs/SecurityProfileContext"
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
        "imds": {
            "$ref": "#/$defs/IMDSEvent"
        },
        "bind": {
            "$ref": "#/$defs/BindEvent"
        },
        "mount": {
            "$ref": "#/$defs/MountEvent"
        },
        "syscalls": {
            "$ref": "#/$defs/SyscallsEvent"
        },
        "usr": {
            "$ref": "#/$defs/UserContext"
        },
        "syscall": {
            "$ref": "#/$defs/SyscallContext"
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
| `agent` | $ref | Consultar [AgentContext](#agentcontext) |
| `title` | cadena |  |
| `evt` | $ref | Consultar [EventContext](#eventcontext) |
| `date` | cadena |  |
| `file` | $ref | Consultar [FileEvent](#fileevent) |
| `exit` | $ref | Consultar [ExitEvent](#exitevent) |
| `process` | $ref | Consultar [ProcessContext](#processcontext) |
| `container` | $ref | Consultar [ContainerContext](#containercontext) |
| `cgroup` | $ref | Consultar [CGroupContext](#cgroupcontext) |
| `network` | $ref | Consultar [NetworkContext](#networkcontext) |
| `dd` | $ref | Consultar [DDContext](#ddcontext) |
| `security_profile` | $ref | Consultar [SecurityProfileContext](#securityprofilecontext) |
| `selinux` | $ref | Consultar [SELinuxEvent](#selinuxevent) |
| `bpf` | $ref | Consultar [BPFEvent](#bpfevent) |
| `mmap` | $ref | Consultar [MMapEvent](#mmapevent) |
| `mprotect` | $ref | Consultar [MProtectEvent](#mprotectevent) |
| `ptrace` | $ref | Consultar [PTraceEvent](#ptraceevent) |
| `module` | $ref | Consultar [ModuleEvent](#moduleevent) |
| `signal` | $ref | Consultar [SignalEvent](#signalevent) |
| `splice` | $ref | Consultar [SpliceEvent](#spliceevent) |
| `dns` | $ref | Consultar [DNSEvent](#dnsevent) |
| `imds` | $ref | Consultar [IMDSEvent](#imdsevent) |
| `bind` | $ref | Consultar [BindEvent](#bindevent) |
| `mount` | $ref | Consultar [MountEvent](#mountevent) |
| `syscalls` | $ref | Consultar [SyscallsEvent](#syscallsevent) |
| `usr` | $ref | Consultar [UserContext](#usercontext) |
| `syscall` | $ref | Consultar [SyscallContext](#syscallcontext) |

## `AWSIMDSEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "is_imds_v2": {
            "type": "boolean",
            "description": "is_imds_v2 reports if the IMDS event follows IMDSv1 or IMDSv2 conventions"
        },
        "security_credentials": {
            "$ref": "#/$defs/AWSSecurityCredentials",
            "description": "SecurityCredentials holds the scrubbed data collected on the security credentials"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "is_imds_v2"
    ],
    "description": "AWSIMDSEventSerializer serializes an AWS IMDS event to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `is_imds_v2` | is_imds_v2 indica si el evento IMDS sigue las convenciones de IMDSv1 o IMDSv2 |
| `security_credentials` | SecurityCredentials contiene los datos depurados recopilados de las credenciales de seguridad. |

| Referencias |
| ---------- |
| [AWSSecurityCredentials](#awssecuritycredentials) |

## `AWSSecurityCredentials`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "code": {
            "type": "string",
            "description": "code is the IMDS server code response"
        },
        "type": {
            "type": "string",
            "description": "type is the security credentials type"
        },
        "access_key_id": {
            "type": "string",
            "description": "access_key_id is the unique access key ID of the credentials"
        },
        "last_updated": {
            "type": "string",
            "description": "last_updated is the last time the credentials were updated"
        },
        "expiration": {
            "type": "string",
            "description": "expiration is the expiration date of the credentials"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "code",
        "type",
        "access_key_id",
        "last_updated",
        "expiration"
    ],
    "description": "AWSSecurityCredentialsSerializer serializes the security credentials from an AWS IMDS request"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `code` | code es el código de respuesta del servidor IMDS |
| `type` | type es el tipo de credenciales de seguridad |
| `access_key_id` | access_key_id es el ID único de la clave de acceso de las credenciales |
| `last_updated` | last_updated es la última vez que se actualizaron las credenciales |
| `expiration` | expiration es la fecha de expiración de las credenciales |


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

| Campo | Descripción |
| ----- | ----------- |
| `cmd` | Comando BPF |
| `map` | Mapa BPF |
| `program` | Programa BPF |

| Referencias |
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

| Campo | Descripción |
| ----- | ----------- |
| `name` | Nombre del mapa BPF |
| `map_type` | Tipo de mapa BPF |


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

| Campo | Descripción |
| ----- | ----------- |
| `name` | Nombre del programa BPF |
| `tag` | Hash (sha1) del programa BPF |
| `program_type` | Tipo de programa BPF |
| `attach_type` | Tipo de adjunto del programa BPF |
| `helpers` | Lista de ayudantes utilizados por el programa BPF |


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

| Campo | Descripción |
| ----- | ----------- |
| `addr` | Dirección de destino (si existe) |

| Referencias |
| ---------- |
| [IPPortFamily](#ipportfamily) |

## `CGroupContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "id": {
            "type": "string",
            "description": "CGroup ID"
        },
        "manager": {
            "type": "string",
            "description": "CGroup manager"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "CGroupContextSerializer serializes a cgroup context to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `id` | ID de CGroup |
| `manager` | Gestor de CGroup |


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

## `DDContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "span_id": {
            "type": "string",
            "description": "Span ID used for APM correlation"
        },
        "trace_id": {
            "type": "string",
            "description": "Trace ID used for APM correlation"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "DDContextSerializer serializes a span context to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `span_id` | ID de tramo (span) utilizado para la correlación APM  |
| `trace_id` | ID de rastreo utilizado para la correlación APM |


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
        "id",
        "question"
    ],
    "description": "DNSEventSerializer serializes a DNS event to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `id` | id es el identificador único de la solicitud DNS |
| `question` | question es una pregunta DNS para la solicitud DNS |

| Referencias |
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

| Campo | Descripción |
| ----- | ----------- |
| `class` | class es la clase buscada por la pregunta DNS |
| `type` | type es un código de dos octetos que especifica el tipo de pregunta DNS |
| `name` | name es el nombre del dominio consultado |
| `size` | size es el tamaño total de la solicitud DNS en bytes |
| `count` | count es el número total de preguntas de la solicitud DNS |


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
| `matched_rules` | Lista de reglas con las que coincidió el evento (sólo válido en el contexto de una anomalía) |
| `variables` | Valores de variables |

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
| `cause` | Causa de finalización del proceso (una de EXITED, SIGNALED, COREDUMPED) |
| `code` | Código de salida del proceso o número de señal que provocó la finalización del proceso  |


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
        },
        "package_name": {
            "type": "string",
            "description": "System package name"
        },
        "package_version": {
            "type": "string",
            "description": "System package version"
        },
        "hashes": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "List of cryptographic hashes of the file"
        },
        "hash_state": {
            "type": "string",
            "description": "State of the hashes or reason why they weren't computed"
        },
        "mount_path": {
            "type": "string",
            "description": "MountPath path of the mount"
        },
        "mount_source": {
            "type": "string",
            "description": "MountSource source of the mount"
        },
        "mount_origin": {
            "type": "string",
            "description": "MountOrigin origin of the mount"
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

| Campo | Descripción |
| ----- | ----------- |
| `path` | Ruta del archivo |
| `name` | Nombre base del archivo |
| `path_resolution_error` | Mensaje de error de resolución de ruta |
| `inode` | Número de inodo del archivo |
| `mode` | Modo de archivo |
| `in_upper_layer` | Indicador de capa de archivo OverlayFS |
| `mount_id` | ID de montaje del archivo |
| `filesystem` | Nombre del sistema de archivos |
| `uid` | ID del usuario de archivo |
| `gid` | ID del grupo de archivos |
| `user` | Usuario del archivo |
| `group` | Grupo de archivos |
| `attribute_name` | Nombre del atributo ampliado del archivo |
| `attribute_namespace` | Espacio de nombres del atributo ampliado del archivo |
| `flags` | Marcadores de archivos |
| `access_time` | Tiempo de acceso a los archivos |
| `modification_time` | Hora de modificación del archivo |
| `change_time` | Hora de cambio del archivo |
| `package_name` | Nombre del paquete del sistema |
| `package_version` | Versión del paquete del sistema |
| `hashes` | Lista de hashes criptográficos del archivo |
| `hash_state` | Estado de los hashes o motivo por el que no se computaron |
| `mount_path` | Ruta del montaje |
| `mount_source` | Fuente del montaje |
| `mount_origin` | Origen del montaje |


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
        "package_name": {
            "type": "string",
            "description": "System package name"
        },
        "package_version": {
            "type": "string",
            "description": "System package version"
        },
        "hashes": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "List of cryptographic hashes of the file"
        },
        "hash_state": {
            "type": "string",
            "description": "State of the hashes or reason why they weren't computed"
        },
        "mount_path": {
            "type": "string",
            "description": "MountPath path of the mount"
        },
        "mount_source": {
            "type": "string",
            "description": "MountSource source of the mount"
        },
        "mount_origin": {
            "type": "string",
            "description": "MountOrigin origin of the mount"
        },
        "destination": {
            "$ref": "#/$defs/File",
            "description": "Target file information"
        },
        "new_mount_id": {
            "type": "integer",
            "description": "New Mount ID"
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

| Campo | Descripción |
| ----- | ----------- |
| `path` | Ruta del archivo |
| `name` | Nombre base del archivo |
| `path_resolution_error` | Mensaje de error de resolución de ruta |
| `inode` | Número de inodo del archivo |
| `mode` | Modo de archivo |
| `in_upper_layer` | Indicador de capa de archivo OverlayFS |
| `mount_id` | ID de montaje del archivo |
| `filesystem` | Nombre del sistema de archivos |
| `uid` | ID del usuario de archivo |
| `gid` | ID del grupo de archivos |
| `user` | Usuario del archivo |
| `group` | Grupo de archivos |
| `attribute_name` | Nombre del atributo ampliado del archivo |
| `attribute_namespace` | Espacio de nombres del atributo ampliado del archivo |
| `flags` | Marcadores de archivos |
| `access_time` | Hora de cambio del archivo |
| `modification_time` | Hora de modificación del archivo |
| `change_time` | Hora de cambio del archivo |
| `package_name` | Nombre del paquete del sistema |
| `package_version` | Versión del paquete del sistema |
| `hashes` | Lista de hashes criptográficos del archivo |
| `hash_state` | Estado de los hashes o motivo por el que no se computaron |
| `mount_path` | Ruta del montaje |
| `mount_source` | Fuente del montaje |
| `mount_origin` | Origen del montaje |
| `destination` | Información del archivo de destino |
| `new_mount_id` | ID del nuevo montaje |
| `device` | Dispositivo asociado al archivo |
| `fstype` | Tipo de sistema de archivos |

| Referencias |
| ---------- |
| [Archivo](#file) |

## `IMDSEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "type": {
            "type": "string",
            "description": "type is the type of IMDS event"
        },
        "cloud_provider": {
            "type": "string",
            "description": "cloud_provider is the intended cloud provider of the IMDS event"
        },
        "url": {
            "type": "string",
            "description": "url is the url of the IMDS request"
        },
        "host": {
            "type": "string",
            "description": "host is the host of the HTTP protocol"
        },
        "user_agent": {
            "type": "string",
            "description": "user_agent is the user agent of the HTTP client"
        },
        "server": {
            "type": "string",
            "description": "server is the server header of a response"
        },
        "aws": {
            "$ref": "#/$defs/AWSIMDSEvent",
            "description": "AWS holds the AWS specific data parsed from the IMDS event"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "type",
        "cloud_provider"
    ],
    "description": "IMDSEventSerializer serializes an IMDS event to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `type` | type es el tipo de evento IMDS |
| `cloud_provider` | cloud_provider es el proveedor de nube previsto del evento IMDS |
| `url` | url es la url de la solicitud IMDS |
| `host` | host es el host del protocolo HTTP |
| `user_agent` | user_agent es el Agent de usuario del cliente HTTP |
| `server` | server es la cabecera del servidor de una respuesta |
| `aws` | AWS contiene datos específicos de AWS analizados del evento IMDS |

| Referencias |
| ---------- |
| [AWSIMDSEvent](#awsimdsevent) |

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

| Campo | Descripción |
| ----- | ----------- |
| `ip` | Dirección IP |
| `port` | Número de puerto |


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

| Campo | Descripción |
| ----- | ----------- |
| `family` | Familia de direcciones |
| `ip` | Dirección IP |
| `port` | Número de puerto |


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

| Campo | Descripción |
| ----- | ----------- |
| `address` | dirección del segmento de memoria |
| `offset` | offset del archivo |
| `length` | longitud de segmentos de memoria |
| `protection` | protección de segmentos de memoria |
| `flags` | indicadores de segmentos de memoria |


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

| Campo | Descripción |
| ----- | ----------- |
| `vm_start` | dirección de inicio de segmentos de memoria |
| `vm_end` | dirección final de segmentos de memoria |
| `vm_protection` | protección inicial de segmentos de memoria |
| `req_protection` | nueva protección de segmentos de memoria |


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
| `policy_version` | Versión de política que introdujo la regla |


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
        },
        "argv": {
            "items": {
                "type": "string"
            },
            "type": "array"
        },
        "args_truncated": {
            "type": "boolean"
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

| Campo | Descripción |
| ----- | ----------- |
| `name` | nombre del módulo |
| `loaded_from_memory` | indica si un módulo se cargó desde la memoria, en lugar de desde un archivo |


## `MountEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "mp": {
            "$ref": "#/$defs/File",
            "description": "Mount point file information"
        },
        "root": {
            "$ref": "#/$defs/File",
            "description": "Root file information"
        },
        "mount_id": {
            "type": "integer",
            "description": "Mount ID of the new mount"
        },
        "parent_mount_id": {
            "type": "integer",
            "description": "Mount ID of the parent mount"
        },
        "bind_src_mount_id": {
            "type": "integer",
            "description": "Mount ID of the source of a bind mount"
        },
        "device": {
            "type": "integer",
            "description": "Device associated with the file"
        },
        "fs_type": {
            "type": "string",
            "description": "Filesystem type"
        },
        "mountpoint.path": {
            "type": "string",
            "description": "Mount point path"
        },
        "source.path": {
            "type": "string",
            "description": "Mount source path"
        },
        "mountpoint.path_error": {
            "type": "string",
            "description": "Mount point path error"
        },
        "source.path_error": {
            "type": "string",
            "description": "Mount source path error"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "mount_id",
        "parent_mount_id",
        "bind_src_mount_id",
        "device"
    ],
    "description": "MountEventSerializer serializes a mount event to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `mp` | Información del archivo de punto de montaje |
| `root` | Información del archivo raíz |
| `mount_id` | ID de montaje del nuevo montaje |
| `parent_mount_id` | ID de montaje del montaje principal |
| `bind_src_mount_id` | ID de montaje de la fuente de un montaje de enlace |
| `device` | Dispositivo asociado al archivo |
| `fs_type` | Tipo de sistema de archivos |
| `mountpoint.path` | Ruta del punto de montaje |
| `source.path` | Ruta de origen del montaje |
| `mountpoint.path_error` | Error en la ruta del punto de montaje |
| `source.path_error` | Error en la ruta de origen del montaje |

| Referencias |
| ---------- |
| [Archivo](#file) |

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

| Campo | Descripción |
| ----- | ----------- |
| `device` | device es el dispositivo de red en el que se capturó el evento |
| `l3_protocol` | l3_protocol es el nombre del protocolo de la capa 3 |
| `l4_protocol` | l4_protocol es el nombre del protocolo de la capa 4 |
| `source` | source es el emisor del evento de red |
| `destination` | destination es el receptor del evento de red |
| `size` | size es el tamaño en bytes del evento de red |

| Referencias |
| ---------- |
| [NetworkDevice](#networkdevice) |
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

| Campo | Descripción |
| ----- | ----------- |
| `netns` | netns es el ifindex de la interfaz |
| `ifindex` | ifindex es el ifindex de la interfaz de red |
| `ifname` | ifname es el nombre de la interfaz de red  |


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

| Campo | Descripción |
| ----- | ----------- |
| `request` | solicitud ptrace |
| `address` | dirección en la que se ejecutó la solicitud ptrace |
| `tracee` | contexto del proceso de la traza |

| Referencias |
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
        "user_session": {
            "$ref": "#/$defs/UserSessionContext",
            "description": "Context of the user session for this event"
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
        "is_exec_child": {
            "type": "boolean",
            "description": "Indicates whether the process is an exec following another exec"
        },
        "source": {
            "type": "string",
            "description": "Process source"
        },
        "syscalls": {
            "$ref": "#/$defs/SyscallsEvent",
            "description": "List of syscalls captured to generate the event"
        },
        "aws_security_credentials": {
            "items": {
                "$ref": "#/$defs/AWSSecurityCredentials"
            },
            "type": "array",
            "description": "List of AWS Security Credentials that the process had access to"
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

| Campo | Descripción |
| ----- | ----------- |
| `pid` | ID del proceso |
| `ppid` | ID del proceso principal |
| `tid` | ID del subproceso |
| `uid` | ID del usuario |
| `gid` | ID del grupo |
| `user` | Nombre de usuario |
| `group` | Nombre del grupo |
| `path_resolution_error` | Descripción de un error en la resolución de la ruta |
| `comm` | Nombre del comando |
| `tty` | TTY asociado al proceso |
| `fork_time` | Tiempo de bifurcación del proceso |
| `exec_time` | Tiempo de ejecución del proceso |
| `exit_time` | Hora de salida del proceso |
| `credentials` | Credenciales asociadas al proceso |
| `user_session` | Contexto de la sesión de usuario de este evento |
| `executable` | Información de archivo del ejecutable |
| `interpreter` | Información de archivo del intérprete |
| `container` | Contexto de contenedor |
| `argv0` | Primer argumento de la línea de comandos |
| `args` | Argumentos de la línea de comandos |
| `args_truncated` | Indicador del truncamiento de argumentos |
| `envs` | Variables de entorno del proceso |
| `envs_truncated` | Indicador de truncamiento de variables de entornos |
| `is_thread` | Indica si el proceso se considera un subproceso (es decir, un proceso secundario que no ejecutó otro programa) |
| `is_kworker` | Indica si el proceso es un kworker |
| `is_exec_child` | Indica si proceso es un exec que sigue a otro exec |
| `source` | Fuente del proceso |
| `syscalls` | Lista de syscalls capturadas para generar el evento |
| `aws_security_credentials` | Lista de credenciales de seguridad de AWS a las que tuvo acceso el proceso  |

| Referencias |
| ---------- |
| [ProcessCredentials](#processcredentials) |
| [UserSessionContext](#usersessioncontext) |
| [File](#file) |
| [ContainerContext](#containercontext) |
| [SyscallsEvent](#syscallsevent) |

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
        "user_session": {
            "$ref": "#/$defs/UserSessionContext",
            "description": "Context of the user session for this event"
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
        "is_exec_child": {
            "type": "boolean",
            "description": "Indicates whether the process is an exec following another exec"
        },
        "source": {
            "type": "string",
            "description": "Process source"
        },
        "syscalls": {
            "$ref": "#/$defs/SyscallsEvent",
            "description": "List of syscalls captured to generate the event"
        },
        "aws_security_credentials": {
            "items": {
                "$ref": "#/$defs/AWSSecurityCredentials"
            },
            "type": "array",
            "description": "List of AWS Security Credentials that the process had access to"
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
    "required": [
        "uid",
        "gid"
    ],
    "description": "ProcessContextSerializer serializes a process context to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `pid` | ID del proceso |
| `ppid` | ID del proceso principal |
| `tid` | ID del subproceso |
| `uid` | ID del usuario |
| `gid` | ID del grupo |
| `user` | Nombre de usuario |
| `group` | Nombre del grupo |
| `path_resolution_error` | Descripción de un error en la resolución de la ruta |
| `comm` | Nombre del comando |
| `tty` | TTY asociado al proceso |
| `fork_time` | Tiempo de bifurcación del proceso |
| `exec_time` | Tiempo de ejecución del proceso |
| `exit_time` | Hora de salida del proceso |
| `credentials` | Credenciales asociadas al proceso |
| `user_session` | Contexto de la sesión de usuario de este evento |
| `executable` | Información de archivo del ejecutable |
| `interpreter` | Información de archivo del intérprete |
| `container` | Contexto de contenedor |
| `argv0` | Primer argumento de la línea de comandos |
| `args` | Argumentos de la línea de comandos |
| `args_truncated` | Indicador del truncamiento de argumentos |
| `envs` | Variables de entorno del proceso |
| `envs_truncated` | Indicador de truncamiento de variables de entornos |
| `is_thread` | Indica si el proceso se considera un subproceso (es decir, un proceso secundario que no ejecutó otro programa) |
| `is_kworker` | Indica si el proceso es un kworker |
| `is_exec_child` | Indica si proceso es un exec que sigue a otro exec |
| `source` | Fuente del proceso |
| `syscalls` | Lista de syscalls capturadas para generar el evento |
| `aws_security_credentials` | Lista de credenciales de seguridad de AWS a las que tuvo acceso el proceso  |
| `parent` | Proceso principal |
| `ancestors` | Procesos ancestros |
| `variables` | Valores de variables |
| `truncated_ancestors` | True, si la lista de ancestros se truncó porque era demasiado grande |

| Referencias |
| ---------- |
| [ProcessCredentials](#processcredentials) |
| [UserSessionContext](#usersessioncontext) |
| [File](#file) |
| [ContainerContext](#containercontext) |
| [SyscallsEvent](#syscallsevent) |
| [Process](#process) |
| [Variables](#variables) |

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
        "auid": {
            "type": "integer",
            "description": "Login UID"
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
        "auid",
        "cap_effective",
        "cap_permitted"
    ],
    "description": "ProcessCredentialsSerializer serializes the process credentials to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `uid` | ID del usuario |
| `user` | Nombre de usuario |
| `gid` | ID del grupo |
| `group` | Nombre del grupo |
| `euid` | ID de usuario efectivo |
| `euser` | Nombre de usuario efectivo |
| `egid` | ID de grupo efectivo |
| `egroup` | Nombre de grupo efectivo |
| `fsuid` | ID de usuario del sistema de archivos |
| `fsuser` | Nombre de usuario del sistema de archivos |
| `fsgid` | ID de grupo del sistema de archivos |
| `fsgroup` | Nombre de grupo del sistema de archivos |
| `auid` | UID de inicio de sesión |
| `cap_effective` | Conjunto de capacidades efectivas |
| `cap_permitted` | Conjunto de capacidades permitidas |
| `destination` | Credenciales tras la operación |


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

| Campo | Descripción |
| ----- | ----------- |
| `name` | Nombre booleano SELinux |
| `state` | Estado booleano SELinux ('on' o 'off') |


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

| Campo | Descripción |
| ----- | ----------- |
| `state` | Operación de commit booleano SELinux |


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

| Campo | Descripción |
| ----- | ----------- |
| `status` | Estado de aplicación de SELinux (uno de los siguientes: 'enforcing', 'permissive' o 'disabled') |


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

| Campo | Descripción |
| ----- | ----------- |
| `bool` | Operación booleana SELinux |
| `enforce` | Cambio de aplicación de SELinux |
| `bool_commit` | Commit booleano SELinux |

| Referencias |
| ---------- |
| [SELinuxBoolChange](#selinuxboolchange) |
| [SELinuxEnforceStatus](#selinuxenforcestatus) |
| [SELinuxBoolCommit](#selinuxboolcommit) |

## `SecurityProfileContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "Name of the security profile"
        },
        "version": {
            "type": "string",
            "description": "Version of the profile in use"
        },
        "tags": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "List of tags associated to this profile"
        },
        "event_in_profile": {
            "type": "boolean",
            "description": "True if the corresponding event is part of this profile"
        },
        "event_type_state": {
            "type": "string",
            "description": "State of the event type in this profile"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "name",
        "version",
        "tags",
        "event_in_profile",
        "event_type_state"
    ],
    "description": "SecurityProfileContextSerializer serializes the security profile context in an event"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `name` | Nombre del perfil de seguridad |
| `version` | Versión del perfil en uso |
| `tags` | Lista de etiquetas asociadas a este perfil |
| `event_in_profile` | True, si el evento correspondiente forma parte de este perfil |
| `event_type_state` | Estado del tipo evento en este perfil |


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

| Campo | Descripción |
| ----- | ----------- |
| `type` | tipo de señal |
| `pid` | pid de destino de la señal |
| `target` | contexto del proceso de destino de la señal |

| Referencias |
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

| Campo | Descripción |
| ----- | ----------- |
| `pipe_entry_flag` | Marcador de entrada de la canalización fd_out pasado a la llamada al sistema de splice |
| `pipe_exit_flag` | Marcador de salida de la canalización fd_out pasada llamada al sistema de splice |


## `Syscall`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "name": {
            "type": "string",
            "description": "Name of the syscall"
        },
        "id": {
            "type": "integer",
            "description": "ID of the syscall in the host architecture"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "required": [
        "name",
        "id"
    ],
    "description": "SyscallSerializer serializes a syscall"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `name` | Nombre de la llamada al sistema |
| `id` | ID de la llamada al sistema en la arquitectura del host |


## `SyscallArgs`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "path": {
            "type": "string",
            "description": "Path argument"
        },
        "flags": {
            "type": "integer",
            "description": "Flags argument"
        },
        "mode": {
            "type": "integer",
            "description": "Mode argument"
        },
        "uid": {
            "type": "integer",
            "description": "UID argument"
        },
        "gid": {
            "type": "integer",
            "description": "GID argument"
        },
        "dirfd": {
            "type": "integer",
            "description": "Directory file descriptor argument"
        },
        "destination_path": {
            "type": "string",
            "description": "Destination path argument"
        },
        "fs_type": {
            "type": "string",
            "description": "File system type argument"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "SyscallArgsSerializer args serializer"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `path` | Argumento de la ruta |
| `flags` | Argumento de los marcadores |
| `mode` | Argumento del modo |
| `uid` | Argumento de UID |
| `gid` | Argumento de GID |
| `dirfd` | Argumento descriptor de archivos del directorio |
| `destination_path` | Argumento de la ruta de destino |
| `fs_type` | Argumento del tipo de sistema de archivos |


## `SyscallContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "chmod": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "chown": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "chdir": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "exec": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "open": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "unlink": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "link": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "rename": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "utimes": {
            "$ref": "#/$defs/SyscallArgs"
        },
        "mount": {
            "$ref": "#/$defs/SyscallArgs"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "SyscallContextSerializer serializes syscall context"
}

{{< /code-block >}}


| Referencias |
| ---------- |
| [SyscallArgs](#syscallargs) |

## `SyscallsEvent`


{{< code-block lang="json" collapsible="true" >}}
{
    "items": {
        "$ref": "#/$defs/Syscall"
    },
    "type": "array",
    "description": "SyscallsEventSerializer serializes the syscalls from a syscalls event"
}

{{< /code-block >}}



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

| Campo | Descripción |
| ----- | ----------- |
| `id` | Nombre de usuario |
| `group` | Nombre del grupo |


## `UserSessionContext`


{{< code-block lang="json" collapsible="true" >}}
{
    "properties": {
        "id": {
            "type": "string",
            "description": "Unique identifier of the user session on the host"
        },
        "session_type": {
            "type": "string",
            "description": "Type of the user session"
        },
        "k8s_username": {
            "type": "string",
            "description": "Username of the Kubernetes \"kubectl exec\" session"
        },
        "k8s_uid": {
            "type": "string",
            "description": "UID of the Kubernetes \"kubectl exec\" session"
        },
        "k8s_groups": {
            "items": {
                "type": "string"
            },
            "type": "array",
            "description": "Groups of the Kubernetes \"kubectl exec\" session"
        },
        "k8s_extra": {
            "additionalProperties": {
                "items": {
                    "type": "string"
                },
                "type": "array"
            },
            "type": "object",
            "description": "Extra of the Kubernetes \"kubectl exec\" session"
        }
    },
    "additionalProperties": false,
    "type": "object",
    "description": "UserSessionContextSerializer serializes the user session context to JSON"
}

{{< /code-block >}}

| Campo | Descripción |
| ----- | ----------- |
| `id` | Identificador único de la sesión de usuario en el host |
| `session_type` | Tipo de sesión de usuario |
| `k8s_username` | Nombre de usuario de la sesión "kubectl exec" de Kubernetes |
| `k8s_uid` | UID de la sesión "kubectl exec" de Kubernetes |
| `k8s_groups` | Grupos de la sesión "kubectl exec" de Kubernetes |
| `k8s_extra` | Extra de la sesión "kubectl exec" de Kubernetes |


## `Variables`


{{< code-block lang="json" collapsible="true" >}}
{
    "type": "object",
    "description": "Variables serializes the variable values"
}

{{< /code-block >}}




[1]: /es/security/threats/
[2]: /es/security/threats/agent