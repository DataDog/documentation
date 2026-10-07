---
aliases:
- /es/security/workload_protection/setup/agent
- /es/security/workload_protection/supported_linux_distributions
- /es/security/threats/supported_linux_distributions
description: Habilite Workload Protection en Datadog y, a continuación, implemente
  el Datadog Agent en las cargas de trabajo que desea proteger.
disable_toc: false
title: Configuración de Workload Protection
---
{{< partial name="security-platform/WP-billing-note.html" >}}

Workload Protection recopila la actividad en tiempo de ejecución a través del Datadog Agent. Configurarlo significa habilitar el producto en Datadog y, a continuación, implementar el Agent en las cargas de trabajo que desea proteger.

Una vez que el Agent esté en ejecución, puede probar Workload Protection de forma segura utilizando los scripts de prueba. La aplicación de políticas (Enforcement), que permite al Agent actuar sobre las amenazas que detecta, requiere un acceso independiente.

Para saber qué sucede con la actividad que recopila el Agent, consulte [Cómo funciona Workload Protection][6].

## Requisitos {#requirements}

Workload Protection depende del Datadog Agent para hacer un seguimiento de sus cargas de trabajo y recopilar eventos relevantes para la seguridad, con el fin de detectar amenazas y hacer un seguimiento de la postura de seguridad.

<div class="alert alert-info">Datadog no recomienda ejecutar Workload Protection en una organización o suborganización que no tenga habilitado Infrastructure Monitoring.</div>

### Opciones del Agent {#agent-options}

Workload Protection ofrece 3 variantes diferentes según su entorno y sistema operativo:
- En **Linux**, instale **el agente eBPF**. Ofrece el mejor rendimiento y compatibilidad con funciones.
- En **AWS Fargate**, instale el Datadog Agent como sidecar e instrumente las cargas de trabajo con el **tracer cws-instrumentation**. Fargate no proporciona acceso a eBPF, por lo que este tracer utiliza ptrace en su lugar.
- En **Windows**, el Agent de Workload Protection instala un controlador de Windows para recopilar eventos y telemetría.

### Compatibilidad con Linux {#linux-support}

En Linux, debe consultar la versión del kernel de Linux y la versión de la distribución, así como el entorno de nube subyacente (cuando corresponda), ya que algunos servicios de computación en la nube impiden el acceso a eBPF.

#### Distribuciones de Linux compatibles {#supported-linux-distributions}

| Distribuciones de Linux                                           | Versiones compatibles                    |
|---------------------------------------------------------------|---------------------------------------|
| Ubuntu LTS                                                    | 18.04, 20.04, 22.04, 24.04 y superior |
| Debian                                                        | 10 y superior                         |
| Amazon Linux 2                                                | Kernels 4.14 y superior               |
| Amazon Linux 2023                                             | Todas las versiones                          |
| SUSE Linux Enterprise Server                                  | 12 y 15                             |
| Red Hat Enterprise Linux                                      | 7, 8 y 9                           |
| Oracle Linux                                                  | 7, 8 y 9                           |
| CentOS                                                        | 7                                     |
| Google Container Optimized OS (predeterminado en GKE)                | 93 y superior                         |

**Notas:**

- Las compilaciones de kernel personalizadas podrían modificar puntos de enlace críticos que el Agent requiere para funcionar correctamente. No se garantiza el soporte.
- Workload Protection requiere la versión 4.14.0 o superior del kernel de Linux.
- En distribuciones con una versión de kernel más antigua, Workload Protection puede ejecutarse si las funciones de eBPF requeridas han sido adaptadas (backported). Sin embargo, operará en un modo degradado, ya que algunas funciones pueden requerir una versión de kernel más reciente. Por ejemplo, CentOS/RHEL 7 utiliza el kernel 3.10 con funciones de eBPF adaptadas y es compatible, pero algunas funciones, como el seguimiento de red, están deshabilitadas.
- Para problemas de compatibilidad con un complemento de red de Kubernetes personalizado como Cilium o Calico, consulte [Solución de problemas de Workload Protection][2].

#### Entornos de nube compatibles {#supported-cloud-environments}

| Entornos de nube                      | Compatibles |
|-----------------------------------------|----------------------|
| Amazon Elastic Compute Cloud (EC2)      | ✅                    |
| Amazon Elastic Kubernetes Service (EKS) | ✅                    |
| Amazon Elastic Container Service (ECS)  | ✅                    |
| AWS Fargate                             | ✅ (utilizando el tracer cws-instrumentation)                    |
| Azure Virtual Machines (Azure VMs)      | ✅                    |
| Google Compute Engine (GCE)             | ✅                    |
| Google Kubernetes Engine (GKE)          | ✅                    |

**Notas:**

- La distribución de Linux y la configuración del sistema subyacentes utilizadas por estos entornos de nube son los factores principales que determinan si Workload Protection es compatible.
- Para entornos de nube donde puede elegir la distribución de Linux y la versión del kernel, seleccione una configuración que cumpla con los requisitos enumerados anteriormente.

### Compatibilidad con Windows {#windows-support}

El agente de Windows de Workload Protection es compatible con Windows Server 2019 y versiones superiores.

## Habilite Workload Protection en Datadog {#enable-workload-protection-in-datadog}

Para comenzar con Workload Protection, debe habilitar el producto Workload Protection en Datadog. Para hacerlo, inicie sesión en su cuenta de Datadog y haga clic en [Get Started][1]. Puede seguir los pasos de implementación del Agent en Datadog o volver a esta página para obtener más detalles.

<div class="alert alert-info">La activación de Workload Protection requiere el <a href="https://docs.datadoghq.com/account_management/rbac/permissions/">permiso</a> de Org Management.</div>

## Implemente el Datadog Agent {#deploy-the-datadog-agent}

### Linux {#linux}

Utilice las siguientes instrucciones para habilitar el agente eBPF de Workload Protection en el Datadog Agent.

{{< card-grid card_width="225px" image_width="200" >}}
  {{< image-card href="/security/workload_protection/setup/kubernetes/" src="integrations_logos/kubernetes.png" alt="Kubernetes" >}}
  {{< image-card href="/security/workload_protection/setup/docker/" src="integrations_logos/docker.png" alt="Docker" >}}
  {{< image-card href="/security/workload_protection/setup/ecs_ec2/" src="integrations_logos/amazon_ecs.png" alt="ECS EC2" >}}
  {{< image-card href="/security/workload_protection/setup/linux_ebpf/" src="integrations_logos/linux.png" alt="Linux eBPF" >}}
{{< /card-grid >}}

### AWS Fargate {#aws-fargate}

Utilice las siguientes instrucciones para configurar el tracer cws-instrumentation de Workload Protection en AWS Fargate.

{{< card-grid card_width="225px" image_width="200" >}}
  {{< image-card href="/security/workload_protection/setup/fargate/" src="integrations_logos/amazon_fargate.png" alt="Amazon Fargate" >}}
{{< /card-grid >}}

### Windows {#windows}

Utilice las siguientes instrucciones para habilitar el agente de Windows de Workload Protection en el Datadog Agent.

{{< card-grid card_width="225px" image_width="200" >}}
  {{< image-card href="/security/workload_protection/setup/windows/" src="integrations_logos/windows.png" alt="Windows" >}}
{{< /card-grid >}}

## Próximos pasos {#next-steps}

Después de la configuración, puede explorar Workload Protection, configurar el Agent para su entorno o solicitar acceso a la respuesta automatizada.

### Explorar Workload Protection {#explore-workload-protection}

Datadog ofrece un entorno de pruebas para descubrir Workload Protection y conocer sus capacidades. El entorno de pruebas ofrece varios escenarios que puede ejecutar de forma segura en un entorno de prueba, simulando amenazas y ataques del mundo real que Workload Protection puede detectar y de los cuales puede protegerlo. Consulte el [repositorio del entorno de pruebas][3] para comenzar.

### Configure el Agent {#configure-the-agent}

La [página de configuración avanzada del Agent][5] describe cómo configurar y ajustar el Agent para que se adapte mejor a su entorno y necesidades.

### Habilitar respuesta automatizada {#enable-automated-response}

<div class="alert alert-danger">Comuníquese con el <a href="https://docs.datadoghq.com/help/">Soporte de Datadog</a> para habilitar la respuesta automatizada.</div>

Una vez que se le otorgue acceso a la respuesta automatizada, consulte la página de [Respuesta automatizada][4].

[1]: https://app.datadoghq.com/security/workload-protection/onboarding
[2]: /es/security/workload_protection/troubleshooting/threats
[3]: https://github.com/DataDog/datadog-security-playground
[4]: /es/security/workload_protection/respond_and_report/#automated-response
[5]: /es/security/workload_protection/setup/advanced_configuration
[6]: /es/security/workload_protection/#evaluating-activity