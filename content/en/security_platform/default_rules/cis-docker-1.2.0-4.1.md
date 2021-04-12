---
aliases:
- qbp-5k8-mec
control: '4.1'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: A user for the container has been created
type: security_rules
---

## Description

Containers should run as a non-root user.

## Rationale

It is good practice to run the container as a non-root user, where possible. This can be done either via the USER directive in the Dockerfile or through [gosu][1] or similar where used as part of the CMD or ENTRYPOINT directives.

## Remediation

Ensure that the Dockerfile for each container image contains `USER <username or ID>`

In this case, the user name or ID refers to the user that was found in the container base image. If there is no specific user created in the container base image, then make use of the `useradd` command to add a specific user before the USER instruction in the Dockerfile. 

For example, add the below lines in the Dockerfile to create a user in the container:
`RUN useradd -d /home/username -m -s /bin/bash username USER username`

**Note**: If there are users in the image that are not needed, you should consider deleting them. After deleting those users, commit the image and then generate new instances of the containers. Alternatively, if it is not possible to set the USER directive in the Dockerfile, a script running as part of the CMD or ENTRYPOINT sections of the Dockerfile should be used to ensure that the container process switches to a non-root user.

## Impact

Running as a non-root user can present challenges when binding mount volumes from the underlying host. In this case, ensure that the user running the contained process can read and write to the bound directory, according to their requirements.

## Default Value

By default, containers are run with root privileges and also run as the root user inside the container.

## References

1. https://github.com/docker/docker/issues/2918
2. https://github.com/docker/docker/pull/4572
3. https://github.com/docker/docker/issues/7906

## CIS Controls

Version 6

5.1 Minimize And Sparingly Use Administrative Privileges Minimize administrative privileges and only use administrative accounts when they are required. Implement focused auditing on the use of administrative privileged functions and monitor for anomalous behavior.

[1]: https://github.com/tianon/gosu
