---
further_reading:
- link: /security/cloud_security_management/setup/agentless_scanning
  tag: Documentation
  text: Configuration de l'analyse Agentless
- link: /security/cloud_security_management/setup/agentless_scanning/deployment_methods
  tag: Documentation
  text: Déploiement de Agentless Scanning
title: Dépannage de l'analyse Agentless
---
## Présentation {#overview}

Si vous rencontrez des problèmes avec l'analyse Agentless, utilisez les directives de dépannage suivantes. Si vous avez besoin d'une assistance supplémentaire, contactez [Datadog Support][1].

## Aucun résultat après le déploiement {#no-results-after-deployment}

Après le déploiement de l'analyse Agentless, les résultats n'apparaissent pas immédiatement. Les premiers résultats apparaissent généralement dans les 30 minutes suivant le déploiement. Dans de rares cas, tels que des problèmes de configuration IAM, cela peut prendre jusqu'à deux heures.

Si aucun résultat n'apparaît après deux heures :

- Vérifiez que l'infrastructure du scanner a été déployée. Dans la console de votre fournisseur cloud, vérifiez que les instances du scanner sont en cours d'exécution.
- Confirmez que [Remote Configuration][3] est activé sur la clé d'API que vous avez utilisée pour configurer l'analyse Agentless. Les scanners reçoivent leurs instructions de scan via Remote Configuration.
- Vérifiez que l'intégration cloud est correctement configurée. Sur la page [{{< ui >}}Cloud Security Setup{{< /ui >}}][4], vérifiez que votre compte cloud apparaît avec l'analyse Agentless activée.

## GCP : Échec de la création du bucket d'état (storage.buckets.create 403) {#gcp-failed-to-create-state-bucket-storagebucketscreate-403}

Si la configuration de GCP Cloud Shell échoue à **"{{< ui >}}Setting up Terraform state storage{{< /ui >}}"** avec une erreur telle que :

```
Failed to create state bucket: datadog-agentless-tfstate-<project>
HTTPError 403: ... does not have storage.buckets.create access to the Google Cloud project.
```

l'identité exécutant le script n'a pas l'autorisation de créer ou de gérer des buckets GCS dans le projet du scanner.

**Correctif (choisissez-en un) :**

1. **Accordez les autorisations de stockage** sur le projet du scanner à l'utilisateur (ou au compte de service) exécutant le script. Par exemple, accordez **Storage Admin** (`roles/storage.admin`) sur ce projet, ou un rôle personnalisé qui inclut `storage.buckets.create`, `storage.buckets.get` et `storage.buckets.update`.
2. **Réutiliser un bucket existant :** Utilisez un bucket qui existe déjà (créez-le avec une identité disposant des autorisations de stockage si nécessaire), puis définissez `TF_STATE_BUCKET` sur ce nom de bucket lors de l'exécution du script. Le script utilisera le bucket existant pour l'état Terraform et n'essaiera pas d'en créer un.

## Le déploiement échoue en raison de restrictions de création de VPC {#deployment-fails-due-to-vpc-creation-restrictions}

Si votre organisation utilise Terraform et des politiques de contrôle de service (SCP) qui restreignent la création de Virtual Private Cloud (VPC), le déploiement du scanner échoue car le scanner crée un nouveau VPC par défaut.

Pour corriger cela, utilisez l'option [**custom VPC**][8] lors de la configuration pour déployer le scanner dans un VPC existant au lieu d'en créer un nouveau.

## Les instances de scanner apparaissent comme des hosts vulnérables {#scanner-instances-appear-as-vulnerable-hosts}

Les instances de scanner Agentless sont des instances EC2 éphémères (ou équivalentes) déployées au sein de votre compte cloud pour effectuer des scans. Parce qu'elles exécutent une image de système d'exploitation standard (par exemple, la dernière version Ubuntu LTS), elles peuvent apparaître dans les résultats de vulnérabilités liés aux paquets du système d'exploitation.

Ces résultats reflètent des vulnérabilités identifiées dans l'image de système d'exploitation sous-jacente et n'indiquent pas une mauvaise configuration de votre environnement.

Si vous le souhaitez, vous pouvez utiliser le filtrage basé sur les tags dans [{{< ui >}}Cloud Security Vulnerabilities Explorer{{< /ui >}}][2] pour exclure les instances de scanner gérées par Datadog de vos vues de vulnérabilités.

## Les hosts avec le Datadog Agent ne sont pas scannés {#hosts-with-the-datadog-agent-are-not-scanned}

C'est un comportement attendu. L'analyse Agentless exclut les hosts sur lesquels le Datadog Agent est installé avec [Cloud Security Vulnerabilities][6] activé. Cela évite les scans en double.

Les hosts sur lesquels le Datadog Agent est installé **sans** les fonctionnalités de vulnérabilités activées sont toujours scannés par l'analyse Agentless.

## Coûts de scan inter-régions inattendus {#unexpected-cross-region-scanning-costs}

Dans certains déploiements, le transfert de données inter-régions peut contribuer aux coûts réseau du fournisseur cloud, selon la manière dont les scanners et les ressources sont répartis entre les régions.

Pour optimiser la localité du trafic, envisagez de déployer des scanners dans les régions qui contiennent un nombre important de hosts. En règle générale, Datadog recommande de déployer un scanner dans chaque région contenant plus de 150 hosts.

Consultez [Deploying Agentless Scanning][7] pour obtenir des conseils détaillés sur les topologies de déploiement recommandées.

## Non disponible pour GovCloud et FIPS {#unavailable-for-govcloud-and-fips}

L'analyse Agentless n'est pas disponible dans GovCloud et n'est pas conforme FIPS.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: https://app.datadoghq.com/security/csm/vm
[3]: /fr/remote_configuration
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: /fr/security/cloud_security_management/setup/agentless_scanning/deployment_methods#enterprise-networking-considerations
[6]: /fr/security/cloud_security_management/vulnerabilities
[7]: /fr/security/cloud_security_management/setup/agentless_scanning/deployment_methods
[8]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples/custom_vpc