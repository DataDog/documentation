---
title: Cloud Security Management Agentless Scanning Compatibility Matrix
kind: documentation
---

## Operating systems

Agentless Scanning supports the following operating systems for hosts and containers:

| Operating System         | Supported Versions                                  | Package Managers | Security Advisories                                                                                                                                                                               |
|--------------------------|-----------------------------------------------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Alpine Linux             | 2.2 - 2.7, 3.0 - 3.19 (edge is not supported)       | apk              | [https://secdb.alpinelinux.org/](https://secdb.alpinelinux.org/)                                                                                                                                  |
| Wolfi Linux              | (n/a)                                               | apk              | [https://packages.wolfi.dev/os/security.json](https://packages.wolfi.dev/os/security.json)                                                                                                        |
| Chainguard               | (n/a)                                               | apk              | [https://packages.cgr.dev/chainguard/security.json](https://packages.cgr.dev/chainguard/security.json)                                                                                            |
| Red Hat Enterprise Linux | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/](https://www.redhat.com/security/data/metrics/) and [https://www.redhat.com/security/data/oval/v2/](https://www.redhat.com/security/data/oval/v2/) |
| CentOS                   | 6, 7, 8                                             | dnf/yum/rpm      | [https://www.redhat.com/security/data/metrics/](https://www.redhat.com/security/data/metrics/) and [https://www.redhat.com/security/data/oval/v2/](https://www.redhat.com/security/data/oval/v2/) |
| AlmaLinux                | 8, 9                                                | dnf/yum/rpm      | [https://errata.almalinux.org/](https://errata.almalinux.org/)                                                                                                                                    |
| Rocky Linux              | 8, 9                                                | dnf/yum/rpm      | [https://download.rockylinux.org/pub/rocky/](https://download.rockylinux.org/pub/rocky/)                                                                                                          |
| Oracle Linux             | 5, 6, 7, 8                                          | dnf/yum/rpm      | [https://linux.oracle.com/security/oval/](https://linux.oracle.com/security/oval/)                                                                                                                |
| CBL-Mariner              | 1.0, 2.0                                            | dnf/yum/rpm      | [https://github.com/microsoft/CBL-MarinerVulnerabilityData/](https://github.com/microsoft/CBL-MarinerVulnerabilityData/)                                                                          |
| Amazon Linux             | 1, 2, 2023                                          | dnf/yum/rpm      | [https://alas.aws.amazon.com/](https://alas.aws.amazon.com/)                                                                                                                                      |
| openSUSE Leap            | 42, 15                                              | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/](http://ftp.suse.com/pub/projects/security/cvrf/)                                                                                                |
| SUSE Enterprise Linux    | 11, 12, 15                                          | zypper/rpm       | [http://ftp.suse.com/pub/projects/security/cvrf/](http://ftp.suse.com/pub/projects/security/cvrf/)                                                                                                |
| Photon OS                | 1.0, 2.0, 3.0, 4.0                                  | tdnf/yum/rpm     | [https://packages.vmware.com/photon/photon_cve_metadata/](https://packages.vmware.com/photon/photon_cve_metadata/)                                                                                |
| Debian GNU/Linux         | 7, 8, 9, 10, 11, 12 (unstable/sid is not supported) | apt/dpkg         | [https://security-tracker.debian.org/tracker/](https://security-tracker.debian.org/tracker/) and [https://www.debian.org/security/oval/](https://www.debian.org/security/oval/)                   |
| Ubuntu                   | All versions supported by Canonical                 | apt/dpkg         | [https://ubuntu.com/security/cve](https://ubuntu.com/security/cve)                                                                                                                                |

## Software Composition Analysis

Agentless Scanning supports the following languages for Software Composition Analysis scans on containers and Lambda instances:

| Language | Supported Package Manager | Supported Files                                                      |
|----------|---------------------------|----------------------------------------------------------------------|
| Ruby     | bundler                   | Gemfile.lock, gemspec                                                |
| C#       | nuget                     | packages.lock.json, packages.config, .deps.json, \*Packages.props    |
| Go       | mod                       | Binaries built by Go, go.mod                                         |
| JVM      | Gradle, Maven             | pom.xml, \*gradle.lockfile, JAR/WAR/PAR/EAR (with pom.properties)    |
| Node.js  | npm, pnpm, yarn           | package-lock.json, yarn.lock, pnpm-lock.yaml, package.json           |
| PHP      | composer                  | composer.lock                                                        |
| Python   | pip, poetry               | pipfile.lock, poetry.lock, egg package, wheel package, conda package |

## Container runtimes

Agentless Scanning supports the following container runtimes:

- containerd - v1.5.6 or later
- Docker

**Note for container observations**: Agentless Scanning requires uncompressed container image layers. Workaround: set the configuration option `discard_unpacked_layers=false` in the containerd configuration file.