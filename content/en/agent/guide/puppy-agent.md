---
title: Puppy Agent
kind: guide
disable_toc: true
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
---

## Overview

The Puppy Agent is a lightweight version of the Datadog Agent that can be compiled to different platforms. The main use case for the puppy agent is IoT devices or other devices with limited resource availability.

The Puppy Agent is [building the core Agent binary][1] with the `--puppy` flag that only installs a limited number of modules into the Agent. The Puppy Agent only installs [the `zlib` module][2].

Here is the command that would be used to build the puppy agent:

```
invoke agent.build --puppy
```

Features included (not an exhaustive list):

* [Core checks][3]
* [Log Collection][4]
* [DogStatsD][5]

Note: Python is not included by default in the Puppy Agent and thus any python-based integrations aren't available.

## Custom Puppy Agent

To create a custom Puppy Agent, the following modules are available when building the Agent according yo your needs:

| Module    | Description                                            |
| -----     | ---------                                              |
| `apm`     | Make the APM agent execution available.                |
| `consul`  | Enable consul as a configuration store.                |
| `python`  | Embed the Python interpreter.                          |
| `docker`  | Add Docker support (required by AutoDiscovery).        |
| `ec2`     | Enable EC2 hostname detection and metadata collection. |
| `etcd`    | Enable Etcd as a configuration store.                  |
| `gce`     | Enable GCE hostname detection and metadata collection. |
| `jmx`     | Enable the JMX-fetch bridge.                           |
| `kubelet` | Enable kubelet tag collection.                         |
| `log`     | Enable the Agent log collection.                       |
| `process` | Enable the Agent process data collection.              |
| `zk`      | Enable Zookeeper as a configuration store.             |
| `zstd`    | Use Zstandard instead of Zlib.                         |
| `systemd` | Enable systemd journal log collection.                 |


Choose at build time which components of the Agent you want to find in the final artifact. By default, all the components are picked up, so if you want to replicate the same configuration of the Agent distributed via system packages, run `invoke agent.build`.

To pick only certain components invoke the task like this:

```
invoke agent.build --build-include=<MODULE_NAME_1>,<MODULE_NAME_2>
```

For instance to include `zstd`, `etcd`, and `python` modules, run:

```
invoke agent.build --build-include=zstd,etcd,python
```

You can also exclude only a subset of modules:

```
invoke agent.build --build-exclude=<MODULE_NAME_1>,<MODULE_NAME_2>
```

Note: You may need to provide some extra dependencies in your dev environment to build certain bits (see the [development environment][6] documentation to learn more).

### Additional details

The Agent build uses `pkg-config` to make compilers and linkers aware of Python. If you need to adjust the build for your specific configuration, add or edit the files within the `pkg-config` folder.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /agent/basic_agent_usage/source/?tab=agentv6
[2]: https://github.com/DataDog/datadog-agent/blob/6.11.x/tasks/build_tags.py#L32
[3]: /getting_started/agent/?tab=datadogussite#metrics
[4]: /logs/log_collection
[5]: /developers/dogstatsd
[6]: https://github.com/DataDog/datadog-agent/blob/master/docs/dev/agent_dev_env.md
