---
title: CSM Vulnerabilities Hosts and Containers Compatibility
---

Cloud Security Management Vulnerabilities supports vulnerability scanning for hosts and containers running the following host operating system versions:

| Operating System         | Supported Versions                                  | Package Managers / Source |
|--------------------------|-----------------------------------------------------|---------------------------|
| Alpine Linux             | 2.2-2.7, 3.0-3.19 (edge is not supported)           | apk                       |
| Wolfi Linux              | N/A                                                 | apk                       |
| Chainguard               | N/A                                                 | apk                       |
| Red Hat Enterprise Linux | 6, 7, 8                                             | dnf/yum/rpm               |
| CentOS                   | 6, 7, 8                                             | dnf/yum/rpm               |
| AlmaLinux                | 8, 9                                                | dnf/yum/rpm               |
| Rocky Linux              | 8, 9                                                | dnf/yum/rpm               |
| Oracle Linux             | 5, 6, 7, 8                                          | dnf/yum/rpm               |
| CBL-Mariner              | 1.0, 2.0                                            | dnf/yum/rpm               |
| Amazon Linux             | 1, 2, 2023                                          | dnf/yum/rpm               |
| openSUSE Leap            | 42, 15                                              | zypper/rpm                |
| SUSE Enterprise Linux    | 11, 12, 15                                          | zypper/rpm                |
| Photon OS                | 1.0, 2.0, 3.0, 4.0                                  | tndf/yum/rpm              |
| Debian GNU/Linux         | 7, 8, 9, 10, 11, 12 (unstable/sid is not supported) | apt/dpkg                  |
| Ubuntu                   | All versions supported by Canonical                 | apt/dpkg                  |
| Windows                  | Windows server 2016, 2019, 2022                     | Windows OS                |


Cloud Security Management Vulnerabilities supports scanning for containers from running the following container runtimes:

| Container Runtime        | Supported Versions                                  | 
|--------------------------|-----------------------------------------------------|
| containerd               | v1.5.9+                                                 |
| Docker                   | All                                                 |
| Cri-O                    | Not Supported                                       |
| Podman                   | Not Supported                                       |
