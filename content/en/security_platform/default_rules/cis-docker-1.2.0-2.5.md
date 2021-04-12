---
aliases:
- xci-3xk-aim
control: '2.5'
disable_edit: true
framework: cis-docker
kind: documentation
rule_category:
- Runtime Agent
scope: docker
security: compliance
source: docker
title: aufs storage driver is not used
type: security_rules
---

## Description

Do not use `aufs` as the storage driver for your Docker instance.

## Rationale

The `aufs` storage driver is the oldest storage driver used on Linux systems. It is based on a Linux kernel patch-set that is unlikely in future to be merged into the main OS kernel. The `aufs` driver is also known to cause some serious kernel crashes. `aufs` has only legacy support within systems using Docker. Most importantly, `aufs` is not a supported driver in many Linux distributions using latest Linux kernels.

## Audit

Verify that `aufs` is not used as storage driver by running this command and ensuring `aufs` is not listed: 
```
docker info --format 'Storage Driver: {{ .Driver }}' 
```

## Remediation

Do not explicitly use `aufs` as storage driver. For example, do not start Docker daemon with the `--storage-driver aufs` flag.

## Impact

`aufs` is the only storage driver that allows containers to share executable and shared library memory. It might be useful if you are running thousands of containers with the same program or libraries. However, you should review its use with respect to your organization's security policy.

## Default Value

By default, Docker uses `devicemapper` as the storage driver on most of the platforms. The default storage driver can vary based on your OS vendor. You should use the storage driver that is recommended by your preferred vendor and which is in line with policy around the applications which are being deployed.

## References

1. [https://docs.docker.com/engine/userguide/storagedriver/selectadriver/#supported-backing-filesystems][1]
2. [http://muehe.org/posts/switching-docker-from-aufs-to-devicemapper/][2]
3. [http://jpetazzo.github.io/assets/2015-03-05-deep-dive-into-docker-storage-drivers.html#1][3]
4. [https://docs.docker.com/engine/userguide/storagedriver/][4]

## CIS Controls

Version 6.18 Application Software Security                

[1]: https://docs.docker.com/engine/userguide/storagedriver/selectadriver/#supported-backing-filesystems 
[2]: http://muehe.org/posts/switching-docker-from-aufs-to-devicemapper/ 
[3]: http://jpetazzo.github.io/assets/2015-03-05-deep-dive-into-docker-storage-drivers.html#1 
[4]: https://docs.docker.com/engine/userguide/storagedriver/
