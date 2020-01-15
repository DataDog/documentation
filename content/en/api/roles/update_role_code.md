---
title: Update role
type: apicode
order: 37.04
external_redirect: /api/#update-role
---

**SIGNATURE**:

`PATCH /v2/roles/<ROLE_UUID>`

**REQUIRED PAYLOAD**:

`type="roles"`<br>
`id="ROLE_UUID"`<br>
`attributes["name"]`

**EXAMPLE REQUEST**:

{{< code-snippets basename="api-update-role" >}}

**EXAMPLE RESPONSE**:

{{< code-snippets basename="result.api-update-role" >}}
