L'Agent Datadog version `7.46` ou ultérieure doit être installé sur vos hosts ou conteneurs.

La solution CSM Threats prend en charge les distributions LInux suivantes :
| Distribution Linux                 | Versions prises en charge                               |
| ---------------------------------- | ------------------------------------------------- |
| Ubuntu LTS                         | 18.04, 20.04 et 22.04                              |
| Debian                             | 10 ou ultérieur                                      |
| Amazon Linux 2                     | Kernels 4.15, 5.4, 5.10 et 2023                 |
| SUSE Linux Enterprise Server       | 12 et 15                                        |
| Red Hat Enterprise Linux           | 7, 8 et 9                                      |
| Oracle Linux                       | 7, 8 et 9                                      |
| CentOS                             | 7                                               |

**Remarques** : 

* [CSM Threats est disponible pour Windows en version bêta][103].
* Les builds de kernel personnalisés ne sont pas pris en charge.
* La collecte de données étant basée sur eBPF, votre plateforme doit utiliser la version 4.15.0 du kernel Linux au minimum, ou les fonctionnalités eBPF doivent avoir été backportées.
* Pour vérifier la compatibilité avec un plugin de réseau Kubernetes personnalisé tel que Cilium ou Calico, consultez la  [page relative au dépannage][102].

[102]: /security/cloud_security_management/troubleshooting
[103]: /security/cloud_security_management/setup/windows