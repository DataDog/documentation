---
title: Google Cloud Audit
description: Learn more about the Google Cloud Audit pack.
---

## Overview

{{< img src="observability_pipelines/packs/google_cloud_audit.png" alt="The Google Cloud Audit pack" style="width:25%;" >}}

Google Cloud Audit logs capture admin activity and policy violations.

What this pack does:

- Extracts principal, caller IP, and API method
- Tags IAM, secret, and firewall changes as high-risk
- Samples routine read-only operations
