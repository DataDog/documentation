---
title: Argo CD
description: Learn more about the Argo CD pack.
---

## Overview

{{< img src="observability_pipelines/packs/argo_cd.png" alt="The Argo CD pack" style="width:25%;" >}}

This pack processes Argo CD sync, health, and RBAC events from the application controller and API server.

What this pack does:

- Parses sync status
- Extracts RBAC denials
- Drops healthy sync noise
