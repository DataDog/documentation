---
title: Dynamic Instrumentation Senstive Data Scrubbing
kind: documentation
private: false
---
## Overview

Dynamic Instrumentation allows users to craft arbitrary expressions that will be evaluated at runtime, where the result of that evaluation will be used as part of a log message, or added dynamically as a span tag. As such, there is a very serious risk of both intentional and unintentional leakage of data.

* Redact based on keys, not values Dynamic Instrumentation (DI) requires the ability to redact values based on keys in the json structure. 
  * Redacts any value that is associated with the key “password” or “accessToken“
* Redaction should happens in the customer’s infrastructure, before the data is uploaded to datadog.
* Redaction rules are customizable.
