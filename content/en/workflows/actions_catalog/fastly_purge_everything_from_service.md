---
bundle: com.datadoghq.fastly
bundle_title: Fastly
description: Instant Purge everything from a service. Purging effectively removes
  an object from the Fastly cache, prompting future requests that would otherwise
  hit that cached object to proceed to origin as a cache miss. Read more about purging
  in Fastly [here](https://developer.fastly.com/learning/concepts/purging).
icon:
  integration_id: fastly
  type: integration_logo
input: '#/$defs/PurgeEverythingFromServiceInputs'
inputFieldOrder:
- serviceId
output: '#/$defs/PurgeEverythingFromServiceOutputs'
source: fastly
title: Purge everything from service
---

Instant Purge everything from a service. Purging effectively removes an object from the Fastly cache, prompting future requests that would otherwise hit that cached object to proceed to origin as a cache miss. Read more about purging in Fastly [here](https://developer.fastly.com/learning/concepts/purging).

{{< workflows >}}
