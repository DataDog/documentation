---
title: Programming lang wrapper
---

## Expected .md output

These are treated as tabs (see `tabs.md`).

## Example input

{{< programming-lang-wrapper langs="python,ruby,PHP" >}}

{{< programming-lang lang="python" >}}
Info about how to do this with Python.
 ```python
from datadog import initialize, statsd
```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
Info about how to do this with Ruby.
 ```ruby
require 'datadog/statsd'
```
{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}
Info about how to do this with PHP.
 ```php
<?php

require __DIR__ . '/vendor/autoload.php';
```
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}