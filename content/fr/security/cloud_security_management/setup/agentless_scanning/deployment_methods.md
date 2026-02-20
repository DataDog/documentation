---
aliases:
- /fr/security/cloud_security_management/agentless_scanning/deployment_methods
further_reading:
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentation
  text: Agentless Scanning Cloud Security
title: Déploiement d'Agentless Scanning
---

Il existe deux méthodes recommandées pour déployer les Agentless scanners dans votre environnement : soit en utilisant le scanning inter-comptes, soit le scanning dans le même compte.

{{< tabs >}}
{{% tab "Cross-account scanning" %}}

Avec le scanning inter-comptes, les Agentless scanners sont déployés dans plusieurs régions au sein d'un seul compte cloud. Les Agentless scanners déployés bénéficient d'une visibilité sur plusieurs comptes sans avoir besoin d'effectuer des scans inter-régions, qui sont coûteux en pratique.

Pour les comptes plus importants avec 250 hosts ou plus, il s'agit de l'option la plus rentable car elle évite les scans inter-régions et réduit les frictions liées à la gestion de vos Agentless scanners. Vous pouvez soit créer un compte dédié pour vos Agentless scanners, soit en choisir un existant. Le compte où se trouvent les Agentless scanners peut également être scanné.

Le diagramme suivant illustre le fonctionnement d'Agentless Scanning lorsqu'il est déployé dans un compte cloud central :

{{< img src="/sensitive_data_scanner/setup/cloud_storage/central-scanner.png" alt="Diagramme d'Agentless Scanning montrant que Agentless scanner est déployé dans un compte cloud central" width="90%" >}}

{{% /tab %}}
{{% tab "Same account scanning" %}}

Avec le scanning dans le même compte, un seul Agentless scanner est déployé par compte. Bien que cela puisse entraîner des coûts plus élevés, car chaque Agentless scanner doit effectuer des scans inter-régions par compte, Datadog recommande cette option si vous ne souhaitez pas accorder d'autorisations inter-comptes.

Le diagramme suivant illustre le fonctionnement d'Agentless Scanning lorsqu'il est déployé dans chaque compte cloud :

{{< img src="/sensitive_data_scanner/setup/cloud_storage/scanner-in-each-account.png" alt="Diagramme d'Agentless Scanning montrant que Agentless scanner est déployé dans chaque compte cloud" width="90%" >}}

[3]: https://app.datadoghq.com/security/csm/vm
[4]: /fr/remote_configuration

{{% /tab %}}
{{< /tabs >}}

## Configuration recommandée
Agentless Scanning entraîne des [coûts supplémentaires du fournisseur de services cloud][2] pour l'exécution des scanners dans vos environnements cloud. Pour gérer les coûts tout en garantissant des scans fiables toutes les 12 heures, Datadog recommande de configurer Agentless Scanning avec Terraform comme modèle par défaut. Terraform permet de déployer un scanner par région, ce qui évite la mise en réseau inter-régions.
Pour améliorer l'efficacité du scanner, assurez-vous que votre configuration respecte ces directives :

- Déployer les scanners dans un seul compte AWS
- Déployer un scanner dans chaque région comptant plus de 250 hosts
- Déployer un scanner dans toute région contenant un magasin de données si vous utilisez le [scanning du stockage cloud][1]

Datadog planifie automatiquement les scans vers la bonne région pour minimiser les coûts inter-régions.

**Remarque** : les données scannées réelles restent dans votre infrastructure, et seules la liste collectée de paquets ainsi que les informations relatives aux hosts collectés (noms de host/instances EC2) sont renvoyées à Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_security_management/agentless_scanning#cloud-storage-scanning
[2]: /fr/security/cloud_security_management/agentless_scanning#cloud-service-provider-cost