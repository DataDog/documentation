---
title: Autodiscovery Template Variables
kind: documentation
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: "Collect your logs"
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: "Collect your processes"
- link: "tracing"
  tag: "Documentation"
  text: "Collect your traces"
---

The following template variables are supported by the Agent:

## Container IP



- Container IP: `host`
  - `"%%host%%"`: auto-detect the network. For single-network containers, returns its corresponding IP; falls back to `bridge` network IP.
  - `"%%host_<NETWORK NAME>%%"`: specify the network name to use, when attached to multiple networks (e.g. `"%%host_bridge%%"`, `"%%host_myredisnetwork%%"`, ...); behaves like `"%%host%%"` if the network name specified was not found.

- Container port: `port`
  - `"%%port%%"`: use the highest exposed port **sorted numerically and in ascending order** (eg. 8443 for a container that exposes ports 80, 443, and 8443)
  - `"%%port_0%%"`: use the first port **sorted numerically and in ascending order** (for the same container, `"%%port_0%%` refers to port 80, `"%%port_1%%"` refers to 443
  - If your target port is constant, directly specify it without using the `port` variable

- Container PID: `pid`
  - `"%%pid%%"`: retrieves the container process ID as returned by `docker inspect --format '{{.State.Pid}}' <container>`

- Container hostname: `hostname` (added in Agent 6.4, Docker listener only)
  - `"%%hostname%%"`: retrieves the `hostname` value from the container configuration. Only use it if the `"%%host%%"` variable cannot fetch a reliable IP (example: [ECS awsvpc mode][1]

- Environment variable: `env` (added in Agent 6.1)
  - `"%%env_MYENVVAR%%"`: use the contents of the `$MYENVVAR` environment variable **as seen by the Agent process**
[1]: 
