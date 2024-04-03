---
bundle: com.datadoghq.http
bundle_title: HTTP
description: Makes an HTTP request
icon:
  icon_name: Api
  type: icon
input: '#/$defs/RequestInputs'
inputFieldOrder:
- verb
- url
- body
- requestHeaders
- urlParams
- formData
- followRedirect
- allowExpiredCertificate
- errorOnStatus
- responseParsing
- responseEncoding
output: '#/$defs/RequestOutputs'
source: ''
title: Make request
---

Makes an HTTP request

{{< workflows >}}
