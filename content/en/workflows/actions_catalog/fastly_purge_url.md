---
bundle: com.datadoghq.fastly
bundle_title: Fastly
description: Instant Purge a url. Purging effectively removes an object from the Fastly
  cache, prompting future requests that would otherwise hit that cached object to
  proceed to origin as a cache miss. Read more about purging in Fastly [here](https://developer.fastly.com/learning/concepts/purging).
icon:
  integration_id: fastly
  type: integration_logo
input: '#/$defs/PurgeUrlInputs'
inputFieldOrder:
- cachedUrl
- softPurge
output: '#/$defs/PurgeUrlOutputs'
source: fastly
title: Purge a url
---

Instant Purge a url. Purging effectively removes an object from the Fastly cache, prompting future requests that would otherwise hit that cached object to proceed to origin as a cache miss. Read more about purging in Fastly [here](https://developer.fastly.com/learning/concepts/purging).

{{< workflows >}}
