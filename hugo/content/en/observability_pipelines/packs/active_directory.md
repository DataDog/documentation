---
title: Active Directory
description: Learn more about the Active Directory pack.
---

## Overview

{{< img src="observability_pipelines/packs/active_directory.png" alt="The Active Directory pack" style="width:25%;" >}}

This pack processes Active Directory Domain Services events, including Kerberos authentication, directory-service changes, and DCSync replication abuse.

What this pack does:

- Parses Kerberos events
- Flags DCSync replication
- Drops routine renewals
