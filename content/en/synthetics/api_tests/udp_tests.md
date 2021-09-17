---
title: UDP Tests
kind: documentation
description: 
further_reading:
- link: "https://www.datadoghq.com/blog/introducing-synthetic-monitoring/"
  tag: "Blog"
  text: "Introducing Datadog Synthetic Monitoring"
---
## Overview

## Configuration

After choosing to create an [`UDP` Test][1], define your test's request.

### Define request

### Specify test frequency

### Define assertions

### Define alert conditions

### Notify your team

## Variables

### Create local variables

### Use variables

## Test failure

## Permissions

By default, only users with the Datadog Admin and Datadog Standard roles can create, edit, and delete Synthetic UDP tests. To get create, edit, and delete access to Synthetic UDP tests, upgrade your user to one of those two [default roles][2].

If you have access to the [custom role feature][3], add your user to any custom role that includes `synthetics_read` and `synthetics_write` permissions for Synthetic Monitoring.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/udp_tests/
[2]: /account_management/rbac/
[3]: /account_management/rbac#custom-roles
