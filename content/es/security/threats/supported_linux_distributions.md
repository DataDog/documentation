---
title: Distribuciones de Linux compatibles con CSM Threads
---

Cloud Security Management Threats es compatible con las siguientes distribuciones de Linux:

| Distribuciones de Linux          | Versiones compatibles                      |
|------------------------------|-----------------------------------------|
| Ubuntu LTS                   | 18.04, 20.04, 22.04                     |
| Debian                       | 10 o posterior                             |
| Amazon Linux 2               | Kernels 4.14 y versiones posteriores                 |
| Amazon Linux 2023            | Todas las versiones                            |
| SUSE Linux Enterprise Server | 12 y 15                               |
| Red Hat Enterprise Linux     | 7, 8 y 9                             |
| Oracle Linux                 | 7, 8 y 9                             |
| CentOS                       | 7                                       |

**Notas:**

- No se admiten compilaciones personalizadas del kernel.
- Para la compatibilidad con un complemento de red personalizado de Kubernetes como Cilium o Calico, consulta la página [solucionar problemas de Cloud Security Management Threats][1].
- La recopilación de datos se realiza mediante eBPF, por lo que Datadog requiere, como mínimo, plataformas que tengan versiones del kernel de Linux subyacente de 4.14.0+ o que tengan las características de eBPF compatibles (por ejemplo, CentOS/RHEL 7 con kernel 3.10 tiene las características de eBPF compatibles, por lo que es compatible).

[1]: /es/security/cloud_security_management/troubleshooting/threats