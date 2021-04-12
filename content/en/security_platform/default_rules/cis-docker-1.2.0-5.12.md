---
aliases:
- byb-wyq-f3q
control: '5.12'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: Container's root filesystem is mounted as read only
type: security_rules
---

## Description

The container's root filesystem should be treated as a 'golden image' by using Docker run's `--read-only` option. This prevents any writes to the container's root filesystem at container runtime and enforces the principle of immutable infrastructure.

## Rationale

Enabling this option forces containers at runtime to explicitly define their data writing strategy to persist or not persist their data. This also reduces security attack vectors since the container instance's filesystem cannot be tampered with or written to unless it has explicit read-write permissions on its filesystem folder and directories.

## Audit

Run this command on the docker host: `docker ps --quiet --all | xargs docker inspect --format '{{ .Id }}: ReadonlyRootfs={{ .HostConfig.ReadonlyRootfs }}'` 

If this command returns `true`, it means the container's root filesystem is mounted read-only. If the above command returns `false`, it means the container's root filesystem is writeable.

## Remediation

Add a `--read-only` flag at a container's runtime to enforce the container's root filesystem being mounted as read only. For example, `docker run <Run arguments> --read-only <Container Image Name or ID> <Command>`

Enabling the `--read-only` option at a container's runtime should be used by administrators to force a container's executable processes to only write container data to explicit storage locations during its lifetime. 

Examples of explicit storage locations during a container's runtime include, but are not limited to:

1. Using the `--tmpfs` option to mount a temporary file system for non-persistent data writes. `docker run --interactive --tty --read-only --tmpfs "/run" --tmpfs "/tmp" centos /bin/bash`
2. Enabling Docker rw mounts at a container's runtime to persist container data directly on the Docker host filesystem. For example, `docker run --interactive --tty --read-only -v /opt/app/data:/run/app/data:rw centos /bin/bash`

3. Utilizing the Docker shared-storage volume plugin for Docker data volume to persist container data. For example, `docker volume create -d convoy --opt o=size=20GB my-named-volume docker run --interactive --tty --read-only -v my-named-volume:/run/app/data centos /bin/bash`

3. Transmitting container data outside of the Docker controlled area during the container's runtime for container data in order to ensure that it is persistent. Examples include hosted databases, network file shares and APIs.

## Impact

Enabling `--read-only` at container runtime may break some container OS packages if a data writing strategy is not defined. You should define what the container's data should and should not persist at runtime in order to decide which strategy to use. Example: Enable use `--tmpfs` for temporary file writes to /tmp Use Docker shared data volumes for persistent data writes

## Default Value

By default, a container has its root filesystem writeable, allowing all container processes to write files owned by the container's actual runtime user.

## References

1. http://docs.docker.com/reference/commandline/cli/#run
2. https://docs.docker.com/engine/tutorials/dockervolumes/
3. http://www.projectatomic.io/blog/2015/12/making-docker-images-write-only-in-production/
4. https://docs.docker.com/engine/reference/commandline/run/#mount-tmpfs-tmpfs
5. https://docs.docker.com/engine/tutorials/dockervolumes/#creating-and-mounting-a-data-volume-container

## CIS Controls

Version 6

14 Controlled Access Based on the Need to Know Controlled Access Based on the Need to Know
