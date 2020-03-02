---
title: Getting Started with Tracing
kind: documentation
aliases:
    - /getting_started/tracing/distributed-tracing
further_reading:
    - link: '/tracing/setup/'
      tag: 'Documentation'
      text: 'Select your application language'
    - link: '/tracing/visualization/'
      tag: 'Documentation'
      text: 'Use the APM UI'
    - link: 'https://learn.datadoghq.com/enrol/index.php?id=4'
      tag: 'Learning Center'
      text: 'Learn Application Performance Monitoring with Docker'
---

## Overview

Datadog Application Performance Monitoring (APM or tracing) is used to collect [traces][1] from your back-end application code. This beginners guide shows you how get your first trace into Datadog.

**Note**: Datadog APM is available for many languages and frameworks. See the documentation on [Instrumenting Your Application][2]

## Datadog account

If you haven't already, create a [Datadog account][3].

## Datadog Agent

Before installing the Datadog Agent, set up a [Vagrant Ubuntu 16.04 virtual machine][4] using the following commands. For more information about Vagrant, see their [Getting Started][5] page.

```text
vagrant init ubuntu/xenial64
vagrant up
vagrant ssh
```

To install the Datadog Agent on a host, use the [one line install command][6] updated with your [Datadog API key][7]:

```shell
DD_API_KEY=<DATADOG_API_KEY> bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

### Validation

Verify the Agent is running with the [status command][8]:

```shell
sudo datadog-agent status
```

After a few minutes, verify the Agent is connected to your account by checking the [Infrastructure List][9] in Datadog.

## APM Agent

### Enable APM

On the latest version of Agent v6, APM is enabled by default. You can see this in the Agent [`datadog.yaml` configuration file][10]:

```yaml
# apm_config:
#   Whether or not the APM Agent should run
#   enabled: true
```

And in `trace-agent.log`:

```shell
# /var/log/datadog/trace-agent.log:
2019-03-25 20:33:18 INFO (run.go:136) - trace-agent running on host ubuntu-xenial
2019-03-25 20:33:18 INFO (api.go:144) - listening for traces at http://localhost:8126
2019-03-25 20:33:28 INFO (api.go:341) - no data received
2019-03-25 20:34:18 INFO (service.go:63) - total number of tracked services: 0
```

### Environment name

(Optional) - Name your environment by updating `datadog.yaml` to set `env` under `apm_config`, for example:

```yaml
apm_config:
    enabled: true
    env: hello_world
```

Then, [restart][11] the Datadog Agent:

```shell
sudo service datadog-agent restart
```

## APM application

### Installation

Before setting up the application, install `pip` then `flask` and `ddtrace` on your Ubuntu VM:

```shell
sudo apt-get install python-pip
pip install flask
pip install ddtrace
```

### Create

On the Ubuntu VM, create the application `hello.py` with the following content:

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'hello world'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)
```

### Run

Run `hello.py` with `ddtrace` which automatically instruments your application in Datadog:

```shell
ddtrace-run python hello.py
```

You should see a similar output to:

```shell
* Serving Flask app "hello" (lazy loading)
  ...
* Running on http://0.0.0.0:5050/ (Press CTRL+C to quit)
```

### Test

Test your application and send your traces to Datadog using `curl`. Your application should be running (as shown above). In a separate command prompt run:

```text
vagrant ssh
curl http://0.0.0.0:5050/
```

This outputs:

```text
hello world
```

After a few minutes, your trace displays in Datadog under the `flask` service. Check the [services page][12] or [trace list][13].

{{< img src="getting_started/tracing-services-list.png" alt="Tracing Services List" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/#terminology
[2]: https://docs.datadoghq.com/tracing/setup/
[3]: https://www.datadoghq.com
[4]: https://app.vagrantup.com/ubuntu/boxes/xenial64
[5]: https://www.vagrantup.com/intro/getting-started/index.html
[6]: https://app.datadoghq.com/account/settings#agent/ubuntu
[7]: https://app.datadoghq.com/account/settings#api
[8]: /agent/guide/agent-commands/#agent-information
[9]: https://app.datadoghq.com/infrastructure
[10]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[11]: /agent/guide/agent-commands/#restart-the-agent
[12]: https://app.datadoghq.com/apm/services
[13]: https://app.datadoghq.com/apm/traces
