---
aliases:
- 8r2-zyy-shg
control: '2.1'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Network traffic is restricted between containers on the default bridge
type: security_rules
---

## Description

By default, all network traffic is allowed between containers on the same host on the default network bridge. You can restrict all inter-container communication and link specific containers together that require communication. Or, you can create a custom network and only join containers that need to communicate to that custom network.

## Rationale

By default, unrestricted network traffic is enabled between all containers on the same host on the default network bridge. Each container has the potential of reading all packets across the container network on the same host. This might lead to an unintended and unwanted disclosure of information to other containers. Hence, restrict inter-container communication on the default network bridge.

## Audit

Verify that the default network bridge has been configured to restrict inter-container communication by running:
```
docker network ls --quiet | xargs docker network inspect --format '{{ .Name }}: {{ .Options }}' 
```
Check that it returns `com.docker.network.bridge.enable_icc:false` for the default network bridge.

## Remediation

Edit the Docker daemon configuration file to ensure that inter-container communication is disabled:

```
"icc": false
```

Alternatively, run the Docker daemon directly and pass `--icc=false` as an argument:

```
dockerd --icc=false 
```

Follow the Docker documentation and create a custom network, and only join containers that need to communicate to that custom network. The `--icc` parameter only applies to the default docker bridge. If you use a custom network, adopt the segmenting networks approach instead.

## Impact

Inter-container communication is disabled on the default network bridge. If any communication between containers on the same host is desired, it needs to be explicitly defined using container linking or custom networks.

## Default Value

By default, all inter-container communication is allowed on the default network bridge.

## References

1. [https://docs.docker.com/engine/userguide/networking/][1]
2. [https://docs.docker.com/engine/userguide/networking/default_network/container-communication/#communication-between-containers][2]

## CIS Controls

None                

[1]: https://docs.docker.com/engine/userguide/networking/ 
[2]: https://docs.docker.com/engine/userguide/networking/default_network/container-communication/#communication-between-containers
