---
aliases:
- /fr/security/infrastructure_vulnerabilities/
further_reading:
- link: /security/cloud_security_management/setup/csm_pro/?tab=aws#configurer-l-agent-pour-les-conteneurs
  tag: Documentation
  text: Configurer les vulnérabilités au niveau des images de conteneur
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: Documentation
  text: Configurer les vulnérabilités au niveau des hosts
- link: /infrastructure/containers/container_images
  tag: Documentation
  text: Vue des images de conteneur
- link: /security/vulnerabilities/troubleshooting
  tag: Documentation
  text: Dépannage de CSM Vulnerabilities
- link: https://www.datadoghq.com/blog/csm-vulnerability-management/
  tag: Blog
  text: Réduire les vulnérabilités en matière d'infrastructure avec Datadog Cloud Security Management
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: Blog
  text: Améliorer votre workflow de dépannage avec les images de conteneur dans Datadog Container Monitoring
kind: documentation
title: Cloud Security Management Vulnerabilities
---

## Présentation

Cloud Security Management Vulnerabilities (CSM Vulnerabilities) vous aide à sécuriser votre infrastructure cloud préventivement en détectant, priorisant et gérant les vulnérabilités sur l'ensemble de vos images de conteneur et hosts. La fonctionnalité tire parti d'un [contexte d'observabilité][6] étendu ainsi que des informations du secteur pour vous aider à corriger les vulnérabilités les plus critiques à un instant T.

**Remarque** : si vous cherchez à gérer les vulnérabilités au niveau des bibliothèques de votre application et du code personnalisé de celle-ci, consultez la section [Application Vulnerability Management][5].

## Explorer les vulnérabilités
Le [Vulnerabilities Explorer][1] affiche une liste exhaustive des vulnérabilités détectées sur l'ensemble de votre infrastructure et les classe selon leur niveau de gravité. Il propose également des fonctionnalités de regroupement, de filtrage et de triage afin que vous puissiez étudier les problèmes, les attribuer et les résoudre.

{{< img src="security/vulnerabilities/csm_vulnerabilities_3.png" alt="
La page CSM  Vulnerability triée en fonction des vulnérabilités uniques, avec un volet latéral" width="100%">}}

Sélectionnez une vulnérabilité spécifique pour afficher les détails associés, notamment les conteneurs et hosts affectés, le score du niveau de gravité ainsi que les étapes de remédiation recommandées.
Le niveau de gravité d'une vulnérabilité est modifié à partir du score de base et tient compte des éléments suivants :

- Selon que l'infrastructure sous-jacente est ou non exécutée et selon l'ampleur de l'impact.
- L'environnement au sein duquel l'infrastructure sous-jacente est exécutée. Par exemple, le niveau de gravité est moindre si l'environnement n'est pas en production.
- Selon qu'il existe ou non une faille pour une vulnérabilité donnée provenant de sources telles que le [catalogue KEV de la CISA][9].

{{< img src="security/vulnerabilities/container_vulnerability_3.png" alt="Détails d'une vulnérabilité spécifique mettant en évidence les étapes suivantes et une analyse du niveau de gravité" width="100%">}}

Vous pouvez également consulter les vulnérabilités présentes dans vos images de conteneur sur la page des [images de conteneur][2]. Triez par **source**, **image tag**, **repo digest**, et plus encore. Affichez des détails supplémentaires concernant n'importe quelle vulnérabilité en cliquant sur l'image de conteneur et en examinant l'onglet **Vulnerabilities**.

{{< img src="security/vulnerabilities/container_images.png" alt="L'onglet Container Images mettant en évidence les vulnérabilités et la fonctionnalité de tri par la colonne conteneur." width="100%">}}

Dans la fenêtre des détails, vous pouvez également consulter les ressources affectées dans CSM afin de mieux comprendre le risque global encouru.

{{< img src="security/vulnerabilities/container_vulnerability_side_panel.png" alt="Les détails du volet latéral des images de conteneur dans l'onglet des vulnérabilités" width="100%">}}

Toutes les vulnérabilités incluent un ensemble de liens et de références vers des sites web ou des sources d'information qui vous aident à cerner le contexte au sein duquel s'inscrit chaque vulnérabilité.

## Trier et corriger

Le [Vulnerabilities Explorer][1] offre également des options de triage des vulnérabilités détectées qui vous permettent de modifier le statut d'une vulnérabilité et de l'attribuer à des membres spécifiques de votre équipe pour qu'ils en assurent le suivi et la corrigent.

**Remarque** : pour vous aider à prioriser les plus critiques, les vulnérabilités sont traitées automatiquement pour une infrastructure qui n'est plus exécutée ou qui contient la version corrigée du package auparavant vulnérable.

{{< img src="security/vulnerabilities/csm_remediate.png" alt="Détails d'une vulnérabilité spécifique, avec les étapes de correction et d'attribution à un membre de l'équipe mises en évidence" width="100%">}}


[1]: https://app.datadoghq.com/security/csm/vm
[2]: https://app.datadoghq.com/containers/images
[3]: https://app.datadoghq.com/security/csm
[4]: https://app.datadoghq.com/security/infra-vulnerability?query=asset_type%3AHost&group=none
[5]: /fr/security/application_security/vulnerability_management/
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[9]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}