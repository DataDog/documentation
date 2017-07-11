---
title: Datadog Process Monitoring
kind: guide
listorder: 16
beta: true
---
**Beta - For support or to report any issues, contact [process-support@datadoghq.com](mailto:process-support@datadoghq.com).**

### Introduction

The new Datadog Process Monitor allows for real time process-level visibility. After installing a small secondary agent, information from a host’s /proc file system will be streamed into Datadog and presented in a table at [https://app.datadoghq.com/process](https://app.datadoghq.com/process).

The table can be searched and filtered and processes can be aggregated on tags associated with the hosts that they are running on.

Each row in the table can be expanded for more contextual information about an individual process.

Checking “show summary graphs” at the top of the page will graph metrics for all processes that are shown in the table.

{{< img src="process/live_process_preview.png" >}}

### One-step Installation

Supports: **Amazon Linux, CentOS, Debian, RHEL, Ubuntu**

    $ sudo DD_API_KEY=<YOUR-API-KEY> bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-process-agent-install/master/install_agent.sh)"

### Usage

To start the Agent:

    $ sudo /etc/init.d/dd-process-agent start

To stop the Agent:

    $ sudo /etc/init.d/dd-process-agent stop

To check if the Agent is running:

    $ sudo /etc/init.d/dd-process-agent status

### Updating

**Amazon Linux, RHEL, CentOS**

    $ sudo yum makecache
    $ sudo yum update dd-process-agent

**Debian, Ubuntu**

    $ sudo apt-get update
    $ sudo apt-get upgrade dd-process-agent

### Removing

**Amazon Linux, RHEL, CentOS**

    $ sudo yum remove dd-process-agent

**Debian, Ubuntu**

    $ sudo apt-get remove dd-process-agent

### Docker container
Installing in a container will run the dd-process-agent and the standard dd-agent. The dd-process-agent container inherits from the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) container and you should refer to the documentation on that page for custom overrides and options.

**Update to the latest image**

    $ docker pull datadoghq/dd-process-agent

**Standard installation**

    $ docker run -d --name dd-agent \
      -v /var/run/docker.sock:/var/run/docker.sock:ro \
      -v /proc/:/host/proc/:ro \
      -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
      -v /etc/passwd:/etc/passwd \
      -e HOST_PROC=/host/proc \
      -e HOST_SYS=/host/sys \
      -e API_KEY=<YOUR-API-KEY> \
      -e SD_BACKEND=docker \
      datadoghq/dd-process-agent

**Amazon Linux Installation**

    $ docker run -d --name dd-agent \
      -v /var/run/docker.sock:/var/run/docker.sock:ro \
      -v /proc/:/host/proc/:ro \
      -v /cgroup/:/host/sys/fs/cgroup:ro \
      -v /etc/passwd:/etc/passwd \
      -e API_KEY=<YOUR-API-KEY> \
      -e HOST_PROC=/host/proc \
      -e HOST_SYS=/host/sys \
      -e SD_BACKEND=docker \
      datadoghq/dd-process-agent

### Kubernetes Daemonset

Installing with the daemonset will deploy the dd-process-agent and the standard dd-agent on your Kubernetes cluster. These will run together in a single pod so there's no need to run a dd-agent daemonset separately.

Refer to the standard [daemonset installation](http://docs.datadoghq.com/integrations/kubernetes/#installation-via-daemonsets-kubernetes-110) and the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) information pages for further documentation.

1. Create a manifest from the template at [dd-process-agent.yml](https://github.com/DataDog/dd-process-agent-install/blob/master/kubernetes/dd-process-agent.yml) with your API key.
2. (optional) Modify any other settings in the yml file based on the standard [daemonset installation](http://docs.datadoghq.com/integrations/kubernetes/#installation-via-daemonsets-kubernetes-110).
3. Create the daemonset and get the Agent running in the cluster:

       $ kubectl create -f dd-process-agent.yml

You can confirm the Agent pod is running with

    $ kubectl get daemonsets

### Proxy Configuration

The dd-process-agent supports an HTTP proxy.  The configuration will not be shared with the standard dd-agent and is defined in the config file at

    /etc/dd-agent/dd-process-agent.ini

by appending or uncommenting the line

    proxy = http://<user>:<password>@<host>:<port>

For installation in a container, use the `PROXY_HOST`, `PROXY_PORT`, `PROXY_USER` and `PROXY_PASSWORD` environment variables.  In a container, this will also configure the proxy for the standard Agent and only has to be set once.

### Notes/known issues

- `dd-agent` must be running when `dd-process-agent` is started for a host’s process information to appear in the “Live Processes” table.

- `dd-process-agent` must install as a privileged user. Not doing so will not correctly initialize /etc/dd-agent/dd-process-agent.ini.

- Collection of open files and current working directory is limited based on the level of privilege of the user running dd-process-agent. In the event that dd-process-agent is able to access these fields, they will be collected automatically.

- To change the user that dd-process-agent runs under, change the argument passed to --user on line 36 in /etc/init.d/dd-process-agent and stop/start the agent.

- Real-time (2s) data collection will be turned off after 30 minutes. To resume real-time collection, refresh the page.
