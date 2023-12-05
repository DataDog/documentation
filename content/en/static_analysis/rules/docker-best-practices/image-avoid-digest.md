---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: docker-best-practices/image-avoid-digest
  language: Docker
  severity: Warning
title: Do not use the digest to pull an image
---
## Metadata
**ID:** `docker-best-practices/image-avoid-digest`

**Language:** Docker

**Severity:** Warning

**Category:** Security

## Description
Do not use a digest to pull an image. A digest is immutable and if a vulnerability is found in this image, your container is likely to be impacted.

A tag is mutable and any security fixes are applied when you rebuild the image.

## Non-Compliant Code Examples
```docker
FROM image@sha256:239898ab989898
```

## Compliant Code Examples
```docker
FROM image:tag
```
