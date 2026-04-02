---
title: Variables del Agent para Workload Protection
---

El Agent tiene varias variables entorno que pueden ser habilitadas para Workload Protection. Este artículo describe el propósito de cada variable de entorno.

| Variable                                      | Descripción                                                                                                            |
|-----------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| `DD_RUNTIME_SECURITY_CONFIG_ENABLED`          | Activa Workload Protection. Debe activarse tanto para [System Probe][1] como para [Security Agent][2].                  |
| `DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED` | Habilita la configuración remota de las actualizaciones automáticas de reglas predeterminadas del Agent y el despliegue automática de reglas personalizadas del Agent. |

[1]: /es/glossary/#system-probe
[2]: /es/glossary/#security-agent