---
title: Debugging
kind: documentation
---

## NodeJS

Debug mode is disabled by default, to enable it:

```javascript
const tracer = require('dd-trace').init({
  debug: true
})
```

For more tracer settings, check out the [API documentation][nodejs api doc].


## Java

To return debug level application logs, enable debug mode with the flag `-Ddatadog.slf4j.simpleLogger.defaultLogLevel=debug` when starting the JVM.

[nodejs api doc]: https://datadog.github.io/dd-trace-js/#tracer-settings