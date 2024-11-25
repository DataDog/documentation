---
title: CSM Vulnerabilities Hosts and Containers Compatibility
---

Cloud Security Management Vulnerabilities supports vulnerability scanning for hosts and containers running the following operating system versions:

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
| Windows                  | Windows Server 2016/2019/2022, Windows 10 and later | Windows OS                |                   | {{< X >}}         |
