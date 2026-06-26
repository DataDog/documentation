---
title: Compatibilidad de hosts y contenedores de CSM Vulnerabilities
---

Cloud Security Management Vulnerabilities admite el análisis de vulnerabilidades para hosts y contenedores que ejecuten las siguientes versiones del sistema operativo:

| Sistema operativo         | Versiones compatibles                                  | Gestores de paquetes/Fuente |
|--------------------------|-----------------------------------------------------|---------------------------|
| Alpine Linux             | 2.2-2.7, 3.0-3.19 (edge no compatible)           | apk                       |
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
| Debian GNU/Linux         | 7, 8, 9, 10, 11, 12 (unstable/sid no es compatible) | apt/dpkg                  |
| Ubuntu                   | Todas las versiones compatibles con Canonical                 | apt/dpkg                  |
| Windows                  | Windows Server 2016, 2019, 2022                     | Windows OS                |