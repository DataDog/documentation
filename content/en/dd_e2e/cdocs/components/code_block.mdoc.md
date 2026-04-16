---
title: Code block
draft: true
---

## Overview

This page contains examples of the code block component.


## Examples

### Basic code block

```javascript {% filename="example.js" collapsible=false disable_copy=false wrap=false %}
const greeting = "Hello, world!";
console.log(greeting);
```

### Collapsible

```python {% filename="long_script.py" collapsible=true disable_copy=false wrap=false %}
import requests

def fetch_metrics(api_key, app_key):
    url = "https://api.datadoghq.com/api/v1/metrics"
    headers = {
        "DD-API-KEY": api_key,
        "DD-APPLICATION-KEY": app_key,
    }
    response = requests.get(url, headers=headers)
    return response.json()

if __name__ == "__main__":
    data = fetch_metrics("YOUR_API_KEY", "YOUR_APP_KEY")
    print(data)
```

### Copy disabled

```bash {% filename="dangerous_command.sh" collapsible=false disable_copy=true wrap=false %}
# This command is shown for reference only
dd-agent stop && rm -rf /etc/datadog-agent && dd-agent start
```

### Wrap enabled

```text {% filename="log_output.txt" collapsible=false disable_copy=false wrap=true %}
2024-01-15T10:30:45.123Z [INFO] datadog.agent - Successfully connected to the Datadog intake endpoint at https://agent-intake.logs.datadoghq.com:443 with API key ending in ...abcd
```

### All options combined

```yaml {% filename="datadog.yaml" collapsible=true disable_copy=true wrap=true %}
api_key: YOUR_API_KEY
site: datadoghq.com
logs_enabled: true
logs_config:
  container_collect_all: true
  auto_multi_line_detection: true
process_config:
  process_collection:
    enabled: true
```

### Multiple languages

```go {% filename="main.go" collapsible=false disable_copy=false wrap=false %}
package main

import (
    "fmt"
    "github.com/DataDog/datadog-go/statsd"
)

func main() {
    client, err := statsd.New("127.0.0.1:8125")
    if err != nil {
        fmt.Println(err)
        return
    }
    client.Gauge("example.gauge", 42, nil, 1)
}
```

```ruby {% filename="example.rb" collapsible=false disable_copy=false wrap=false %}
require 'datadog/statsd'

statsd = Datadog::Statsd.new('localhost', 8125)
statsd.increment('example.counter')
statsd.gauge('example.gauge', 42)
```
