---
disable_toc: false
title: Configuración de Workload Protection
---

Para empezar a utilizar Workload Protection, sigue los pasos de [Empezar][1] con Workload Protection en tu cuenta de Datadog.

<div class="alert alert-info">Para activar Workload Protection se requiere el <a href="https://docs.datadoghq.com/account_management/rbac/permissions/">permiso</a> de gestión de organizaciones.</div>


## Configuración remota

Puedes activar la [configuración remota][3] para Workload Protection.

La configuración remota puede utilizarse para:
- Mantenerse automáticamente al día con las últimas detecciones de seguridad
- Bloquear atacantes y ataques

La configuración remota puede configurarse utilizando los pasos de [Empezar][1] con Workload Protection en tu cuenta de Datadog.

<div class="alert alert-info">Para activar la configuración remota, solicita a tu administrador el permiso de <strong>escritura de claves de API</strong>.</div>

## Opciones de configuración del Agent para Workload Protection

Workload Protection admite **despliegues basados únicamente en el Agent**.

## Tipos de despliegue compatibles

La siguiente tabla resume Workload Protection en relación con los tipos de despliegues.

|          | Docker    | Kubernetes | Linux     | Amazon ECS/EKS | Windows   | AWS Fargate ECS/EKS | Cuenta de AWS | Cuenta de Azure | Cuenta de GCP | Terraform |
|------------------------|-----------|------------|-----------|----------------|-----------|---------------------|-------------|---------------|-------------|-----------|
| Agent obligatorio (v7.46 o posterior) | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}}      | {{< X >}} | {{< X >}}           |             |               |             |           |
| Workload Protection    | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}}      | {{< X >}} | {{< X >}}           |             |               |             |           |


## Distribuciones de Linux compatibles

Workload Protection es compatible con las siguientes distribuciones de Linux:

| Distribuciones Linux                                           | Versiones compatibles      |
|---------------------------------------------------------------|-------------------------|
| Ubuntu LTS                                                    | 18.04, 20.04, 22.04     |
| Debian                                                        | 10 o posterior             |
| Amazon Linux v2                                                | Kernels 4.14 y versiones posteriores |
| Amazon Linux 2023                                             | Todas las versiones            |
| SUSE Linux Enterprise Server                                  | 12 y 15               |
| Red Hat Enterprise Linux                                      | 7, 8 y 9             |
| Oracle Linux                                                  | 7, 8 y 9             |
| CentOS                                                        | 7                       |
| Google Container Optimized OS (por defecto GKE) (Vista previa)      | 93 y posterior           |

**Notas:**

- No se admiten compilaciones personalizadas del kernel.
- La [solución Workload Protection eBPF-less para entornos eBPF desactivados][8] utiliza un Agent basado en ptrace. El Agent basado en ptrace es compatible con las versiones del kernel de Linux a partir de la v3.4.43 hasta la v4.9.85.
- Para ver la compatibilidad con un complemento de red personalizado de Kubernetes, como Cilium o Calico, consulta la página [Solucionar problemas de Workload Protection][9].
- La recopilación de datos se realiza mediante eBPF, por lo que Datadog requiere, como mínimo, plataformas que tengan versiones del kernel de Linux subyacente de 4.14.0+ o que tengan las características de eBPF compatibles (por ejemplo, CentOS/RHEL 7 con kernel 3.10 tiene las características de eBPF compatibles, por lo que es compatible).


## Despliegue del Agent

Puedes activar Workload Protection en el Agent utilizando [múltiples herramientas y sistemas][6].

## Variables del Agent para Workload Protection

El Datadog Agent tiene varias [variables de entorno][7] que pueden ser habilitadas para Workload Protection. Este artículo describe el propósito de cada variable de entorno.

[1]: https://app.datadoghq.com/security/workload-protection/onboarding
[2]: /es/account_management/rbac/permissions/
[3]: /es/agent/remote_config/?tab=configurationyamlfile
[6]: /es/security/workload_protection/setup/agent
[7]: /es/security/workload_protection/setup/agent_variables
[8]: /es/security/workload_protection/guide/ebpf-free-agent
[9]: /es/security/workload_protection/troubleshooting/threats