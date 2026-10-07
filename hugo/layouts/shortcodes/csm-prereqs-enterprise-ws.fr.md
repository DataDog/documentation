* Agent Datadog 7.44 ou version ultérieure.
* La collecte de données étant basée sur eBPF, votre plateforme doit utiliser la version 4.15.0 du kernel Linux au minimum, ou les fonctionnalités eBPF doivent avoir été backportées. CSM Threats prend en charge les distributions Linux suivantes :
  * Ubuntu LTS (18.04, 20.04 et 22.04)
  * Debian 10+
  * Amazon Linux 2 (kernels 4.15, 5.4 et 5.10) et 2023
  * SUSE Linux Enterprise Server 12 et 15
  * Red Hat Enterprise Linux 7, 8 et 9
  * Oracle Linux 7, 8 et 9
  * CentOS 7
  * Les builds de kernel personnalisés ne sont pas pris en charge.
* Pour vérifier la compatibilité d'un plug-in réseau Kubernetes personnalisé, comme Cilium ou Calico, consultez la [page relative au dépannage][15].

[15]: /security/cloud_security_management/troubleshooting