---
title: Datadog Live Process Monitoring
kind: documentation
aliases:
  - /guides/process
  - /infrastructure/process/
further_reading:
- link: "/graphing/infrastructure/hostmap"
  tag: "Graphing"
  text: See all of your hosts together on one screen with the hostmap
- link: "/graphing/infrastructure/livecontainers"
  tag: "Graphing"
  text: Get real-time visibility of all of the containers across your environment
---

## Introduction

Datadog Process Monitoring allows for real-time visibility of the most granular elements in a deployment.  Taking inspiration from bedrock tools like `htop`, this centralized view, combined with existing tagging capabilities, allows you to understand what is going on at any level of your system and drill all the way down into the most fine details.

{{< img src="graphing/infrastructure/process/live_process_preview.png" alt="live process preview" responsive="true" popup="true">}}

## Installation

### Standard Agent Configuration
 
Refer to the instructions for standard [Agent installation](https://app.datadoghq.com/account/settings#agent) for platform-specific details.

Once the Datadog Agent is installed, enable Live Processes collection by editing the [configuration file](/agent/#configuration-file) at :

```
/etc/dd-agent/datadog.yaml
```

and adding the following:
```
process_config:
  enabled: ‘true’
```

After configuration is complete, [restart the Agent](/agent/faq/agent-commands).  

### Docker Process collection

Follow the instructions for [docker-dd-agent](/agent/basic_agent_usage/docker/#run-the-docker-agent), passing in the following attributes, in addition to any other custom settings as appropriate:

```
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_AGENT_ENABLED=true
```

**Note**: To collect container information in the standard install, the dd-agent user needs to have permissions to access docker.sock.

### Kubernetes Daemonset

In the [dd-agent.yaml](https://app.datadoghq.com/account/settings#agent/kubernetes) manifest used to create the daemonset, add the following environmental variables, volume mount, and volume:

```
 env:
    - name: DD_PROCESS_AGENT_ENABLED
      value: "true"
  volumeMounts:
    - name: passwd
      mountPath: /etc/passwd
      readOnly: true
  volumes:
    - hostPath:
        path: /etc/passwd
      name: passwd    
```

Refer to the standard [daemonset installation](/integrations/kubernetes/#installation-via-daemonsets-kubernetes-110) and the [docker-dd-agent](https://github.com/DataDog/docker-dd-agent) information pages for further documentation.

## Searching, Filtering, and Pivoting

### String Search

Processes and containers are by their nature extremely high cardinality objects.  Our fuzzy string search gives you a view into exactly what you want.  Below is our Demo environment, filtered with the string `postgres /9.`.  
**Note**: `/9.` has matched in the command path, and `postgres` matches the command itself.

{{< img src="graphing/infrastructure/process/postgres.png" alt="Postgres" responsive="true" popup="true" style="width:80%;">}}

### Filtering and Pivoting

Making sense of hundreds of thousands or millions of processes can seem overwhelming!  Using tagging makes navigation easy.  In addition to all existing host-level tags, processes are tagged by `user`. 

First, we can filter down to role:McNulty-Query, which is our front end query service, in order to narrow our search.  Then we can search for our NGINX master processes, and pivot the table by Availability-Zone, to be confident about that service staying highly available.

{{< img src="graphing/infrastructure/process/mcnultynginx.png" alt="mcnulty nginx" responsive="true" popup="true" style="width:80%;">}}

Here, I am checking the Elasticsearch processes for an individual feature team.  I've also added metrics for voluntary and involuntary context switches, available in the gear menu on the upper-right of the table.

{{< img src="graphing/infrastructure/process/burritoelasticsearch.png" alt="burrito elasticsearch" responsive="true" popup="true" style="width:80%;">}}

Below, we have searched for ssh processes and pivoted by `user` to understand who is logged into which hosts.

{{< img src="graphing/infrastructure/process/sshusers.png" alt="ssh users" responsive="true" popup="true" style="width:80%;">}}

Ok, so I guess that one is less exciting after redaction!

## Enriched Live Containers view

Live Processes adds extra visibility to your container deployments.  The [Live Containers](https://docs.datadoghq.com/infrastructure/livecontainers/) feature gives you a similarly comprehensive view of your container and orcestrator environment.  When Live Processes is enabled, the process tree for each container is included in the container inspection panel on that page.

{{< img src="graphing/infrastructure/process/containerinspect.png" alt="container inspect" responsive="true" popup="true" style="width:80%;">}}

## Real-time monitoring

While actively working with the Live Processes, metrics are collected at 2s resolution.  This is very important for highly volatile metrics such as CPU.  In the background, for historical context, metrics are collected at 10s resolution.  

## Notes and frequently asked questions

- Requires Linux.

- Collection of open files and current working directory is limited based on the level of privilege of the user running dd-process-agent. In the event that dd-process-agent is able to access these fields, they are collected automatically.

- Real-time (2s) data collection is turned off after 30 minutes. To resume real-time collection, refresh the page.

- The Process Agent is available for the default Debian docker-dd-agent image only.  It is not included in the Alpine image.

- In container deployments, the `/etc/passwd` file mounted into the docker-dd-agent is necessary to collect usernames for each process.  This is a public file and the Process Agent does not use any fields except the username.  All features except the `user` metadata field will function without access to this file.
  - Note:  Live Processes only uses the host `passwd` file and will not perform username resolution for users created within containers.

[1]: https://app.datadoghq.com/account/settings#agent
[4]: /integrations/kubernetes/
[5]: https://github.com/DataDog/docker-dd-agent

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
