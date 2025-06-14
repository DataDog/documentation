---
title: Cloud Security Vulnerabilities Hosts and Containers Compatibility
---

## Operating systems

Cloud Security Vulnerabilities supports vulnerability scanning for hosts and containers running the following operating system versions:

| Operating System         | Supported Versions                                  | Package Managers / Source | Agentless support | Agent support     |
|--------------------------|-----------------------------------------------------|---------------------------|-------------------|-------------------|
| Alpine Linux             | 2.2-2.7, 3.0-3.19 (edge is not supported)           | apk                       | {{< X >}}         | {{< X >}}         |
| Wolfi Linux              | N/A                                                 | apk                       | {{< X >}}         | {{< X >}}         |
| Chainguard               | N/A                                                 | apk                       | {{< X >}}         | {{< X >}}         |
| Red Hat Enterprise Linux | 6, 7, 8                                             | dnf/yum/rpm               | {{< X >}}         | {{< X >}}         |
| CentOS                   | 6, 7, 8                                             | dnf/yum/rpm               | {{< X >}}         | {{< X >}}         |
| AlmaLinux                | 8, 9                                                | dnf/yum/rpm               | {{< X >}}         | {{< X >}}         |
| Rocky Linux              | 8, 9                                                | dnf/yum/rpm               | {{< X >}}         | {{< X >}}         |
| Oracle Linux             | 5, 6, 7, 8                                          | dnf/yum/rpm               | {{< X >}}         | {{< X >}}         |
| CBL-Mariner              | 1.0, 2.0                                            | dnf/yum/rpm               | {{< X >}}         | {{< X >}}         |
| Amazon Linux             | 1, 2, 2023                                          | dnf/yum/rpm               | {{< X >}}         | {{< X >}}         |
| openSUSE Leap            | 42, 15                                              | zypper/rpm                | {{< X >}}         | {{< X >}}         |
| SUSE Enterprise Linux    | 11, 12, 15                                          | zypper/rpm                | {{< X >}}         | {{< X >}}         |
| Photon OS                | 1.0, 2.0, 3.0, 4.0                                  | tndf/yum/rpm              | {{< X >}}         | {{< X >}}         |
| Debian GNU/Linux         | 7, 8, 9, 10, 11, 12 (unstable/sid is not supported) | apt/dpkg                  | {{< X >}}         | {{< X >}}         |
| Ubuntu                   | All versions supported by Canonical                 | apt/dpkg                  | {{< X >}}         | {{< X >}}         |
| Windows                  | Windows Server 2016/2019/2022, Windows 10 and later | Windows OS                | {{< X >}}         | {{< X >}}         |

{{% collapse-content title="Windows limitations" level="h4" %}}
- Datadog detects vulnerabilities in Windows by identifying the Windows version and installed security knowledge base (KB) updates to address vulnerabilities associated with that version. However, some KB updates are cumulative and contain other KB updates, which might cause Datadog to misidentify which updates have been installed.
- Datadog can't track vulnerability fixes that Windows applies outside of KB updates.
- Datadog can't track vulnerabilities associated with third-party software.
{{% /collapse-content %}} 

## Application libraries

Cloud Security Vulnerabilities supports vulnerability scanning for the following application languages and libraries on containers and Lambda instances:

| Language | Supported Package Manager | Supported Files                                                      | Agentless support | Agent support     |
|----------|---------------------------|----------------------------------------------------------------------|-------------------|-------------------|
| Ruby     | bundler                   | Gemfile.lock, gemspec                                                | {{< X >}}         | {{< X >}}         |
| .NET     | nuget                     | packages.lock.json, packages.config, .deps.json, *packages.props     | {{< X >}}         | {{< X >}}         |
| Go       | mod                       | Binaries built by Go, go.mod                                         | {{< X >}}         | {{< X >}}         |
| Java     | Gradle, Maven             | pom.xml, *gradle.lockfile, JAR/WAR/PAR/EAR (with pom.properties)     | {{< X >}}         | {{< X >}}         |
| Node.js  | npm, pnpm, yarn           | package-lock.json, yarn.lock, pnpm-lock.yaml, package.json           | {{< X >}}         | {{< X >}}         |
| PHP      | composer                  | composer.lock                                                        | {{< X >}}         | {{< X >}}         |
| Python   | pip, poetry               | pipfile.lock, poetry.lock, egg package, wheel package, conda package | {{< X >}}         | {{< X >}}         |

**Note**: Agent-based vulnerability management in application libraries is available in Agent versions [7.64 or newer][2].


[1]: /security/code_security/software_composition_analysis/
[2]: https://github.com/DataDog/datadog-agent/releases
