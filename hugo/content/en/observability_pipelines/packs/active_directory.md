---
title: Active Directory
description: Learn more about the Active Directory pack.
further_reading:
- link: "https://www.datadoghq.com/blog/observability-pipelines-exabeam-packs/"
  tag: "Blog"
  text: "Process and route critical security logs to Exabeam with Observability Pipelines"
---

## Overview

{{< img src="observability_pipelines/packs/active_directory.png" alt="The Active Directory pack" style="width:25%;" >}}

This pack processes Active Directory Domain Services events, including Kerberos authentication, directory-service changes, and DCSync replication abuse.

What this pack does:

- Parses Kerberos events
- Flags DCSync replication
- Drops routine renewals

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
