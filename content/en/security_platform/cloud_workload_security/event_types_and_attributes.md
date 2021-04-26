---
title: Event Types and Attributes
kind: documentation
description: "A list of supported event types and attributes for Cloud Workload Security"
further_reading:
- link: "/security_platform/cloud_workload_security/getting_started/"
  tag: "Documentation"
  text: "Get started with Datadog Cloud Workload Security"
---

## Chmod

Chmod events can be used to detect changes in the file permissions of a file or a directory. It is possible to filter those events based on multiple attributes including the original and target mode of chmod.

### Input

```json
SCHEMA HERE
```

### Output

```json
SCHEMA HERE
```

### Reference

| SECL accessor        | Type             | Exported JSON  | Definition                            | Agent Version |
|----------------------|------------------|----------------|---------------------------------------|---------------|
| `chmod.file.uid`     | number           | file.uid       | User ID of the file / directory       | 7.27          |
| `chmod.file.user`    | string           | file.user      | Resolved user of the file / directory | 7.27          |

## SECL legacy support

### Input

```json
SCHEMA HERE
```

### Output

```json
SCHEMA HERE
```

### Reference

| SECL accessor        | Now alias of             | Was introduced in |
|----------------------|--------------------------|-------------------|
| `chown.filename`     | `chown.file.path`        | 7.25              |
| `chown.filename`     | `chown.overlay_numlower` | 7.25              |

## Chown

Chown events can be used to detect ownership changes on a file or a directory. It is possible to filter those events based on multiple attributes including the original and target user / group of chown.

### Input

```json
SCHEMA HERE
```

### Output

```json
SCHEMA HERE
```

### Reference

| SECL accessor        | Type             | Exported JSON  | Definition                                                          | Agent Version |
|----------------------|------------------|----------------|---------------------------------------------------------------------|---------------|
| `chown.file.uid`     | number           | file.uid       | User ID of the file / directory before the execution of chown       | 7.27          |
| `chown.file.user`    | string           | file.user      | Resolved user of the file / directory before the execution of chown | 7.27          |
