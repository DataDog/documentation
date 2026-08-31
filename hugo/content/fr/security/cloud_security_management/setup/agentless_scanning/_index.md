---
aliases:
- /fr/security/agentless_scanning
- /fr/security/cloud_security_management/agentless_scanning
further_reading:
- link: /security/vulnerabilities
  tag: Documentation
  text: En savoir plus sur Cloud Security Vulnerabilities
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: Documentation
  text: Configurer Sensitive Data Scanner pour Cloud Storage
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: Documentation
  text: Mise à jour d'Agentless Scanning
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: Documentation
  text: Dépannage d'Agentless Scanning
title: Cloud Security Agentless Scanning
---
## Présentation {#overview}

Agentless Scanning offre une visibilité sur les vulnérabilités qui existent au sein de votre infrastructure cloud AWS, Azure et GCP, sans nécessiter l'installation de Datadog Agent. Datadog recommande d'activer Agentless Scanning comme première étape pour obtenir une visibilité complète sur vos ressources cloud, puis d'installer Datadog Agent sur vos actifs principaux au fil du temps pour un contexte de sécurité et d'observabilité plus approfondi.

<div class="alert alert-info">Agentless Scanning exclut les ressources sur lesquelles le Datadog Agent est installé.</div>

## Fonctionnement {#how-it-works}

Le diagramme suivant illustre le fonctionnement d'Agentless Scanning :

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Diagramme illustrant le fonctionnement d'Agentless Scanning" width="90%" >}}

1. Datadog planifie des analyses automatisées à des intervalles de 12 heures et envoie les ressources à analyser via [Remote Configuration][2].
   - Si vous avez configuré des [Cloud Security Evaluation Filters][15], Agentless Scanning respecte ces filtres et n'analyse que les ressources correspondant aux critères configurés.
2. Pour les fonctions serverless (telles qu'AWS Lambda), les scanners récupèrent le code de la fonction.
3. Le scanner crée des instantanés des volumes utilisés dans les instances de VM en cours d'exécution. À l'aide des instantanés ou du code de la fonction, le scanner génère une SBOM (une liste de paquets et de dépendances).
4. La SBOM et les métadonnées de l'host sont transmises à Datadog. Toutes les autres données, y compris les instantanés, le contenu des disques et les images de conteneur, restent dans votre infrastructure. Les instantanés sont supprimés.
5. Datadog utilise la SBOM pour identifier les vulnérabilités connues dans vos ressources.

Cette architecture fournit :
- **Confidentialité des données** : Le contenu de vos disques, vos images de conteneurs et vos données sensibles restent au sein de votre compte cloud. Seules les métadonnées des paquets (la SBOM) sont transmises à Datadog.
- **Résidence des données** : Aucune donnée ne franchit la limite d'un compte vers l'infrastructure de Datadog, simplifiant la conformité avec les exigences de souveraineté des données.
- **Compliance** : Les auditeurs peuvent vérifier que les données d'analyse restent au sein de votre périmètre.

Pour plus d'informations sur la confidentialité des données, consultez [Quelles données sont envoyées à Datadog](#what-data-is-sent-to-datadog).

<div class="alert alert-info">
  <ul>
    <li>Le scanner fonctionne comme une machine virtuelle distincte au sein de votre infrastructure, garantissant un impact minimal sur les systèmes et ressources existants.</li>
    <li>Pour AWS, les instances de scanner s'adaptent automatiquement en fonction de la charge de travail. Lorsqu'il n'y a aucune ressource à analyser, les scanners se réduisent à zéro pour minimiser les coûts du fournisseur cloud.</li>
    <li>Le scanner collecte de manière sécurisée une liste de paquets depuis vos hôtes sans transmettre aucune information personnelle confidentielle ou privée en dehors de votre infrastructure.</li>
    <li>Le scanner limite son utilisation de l'API du fournisseur cloud pour éviter d'atteindre toute limite de débit, et utilise un backoff exponentiel si nécessaire.</li>
    <li>Les instances de scanner sont automatiquement renouvelées toutes les 24 heures, garantissant qu'elles exécutent les dernières images.</li>
  </ul>
</div>

## Quelles données sont envoyées à Datadog {#what-data-is-sent-to-datadog}

Plutôt que de copier des instantanés de disque en dehors de votre environnement pour analyse, afin de garder vos données privées, Datadog déploie une infrastructure d'analyse légère **à l'intérieur de votre compte cloud**. Agentless Scanning crée des instantanés de vos ressources, les analyse localement et supprime les instantanés une fois les analyses terminées. Il envoie uniquement à Datadog le SBOM résultant, qui contient une liste de paquets et de dépendances. Vos données brutes, le contenu des disques et les images de conteneurs ne quittent jamais votre environnement.

Agentless Scanning utilise le format OWASP [cycloneDX][3] pour transmettre une liste de paquets à Datadog. Aucune information personnelle confidentielle ou privée n'est jamais transmise en dehors de votre infrastructure.

Datadog n'**envoie** pas :
- Configurations système et de paquets
- Clés de chiffrement et certificats
- Logs et Audit Trails
- Données commerciales sensibles

## Coût du fournisseur de services cloud {#cloud-service-provider-cost}

Comme Agentless Scanning s'exécute dans votre compte cloud, les coûts de calcul et de mise en réseau apparaissent sur la facture de votre fournisseur cloud. Alors que les fournisseurs qui effectuent des analyses dans leur propre infrastructure intègrent les coûts de calcul dans leurs frais SaaS, le maintien des données dans votre environnement signifie que vous voyez directement le coût de l'infrastructure.

Pour réduire les coûts :
- Déployez un scanner dans chaque région où vous avez plus de 150 hôtes. Un scanner régional évite le transfert de données inter-régions, ce qui est plus rentable que l'analyse de ces hôtes depuis une région distante.
- Utilisez la [configuration recommandée][13] avec Terraform pour déployer un scanner par région.
- Pour les grands déploiements multi-régions, consultez [Deploying Agentless Scanning][16] pour obtenir des conseils sur le choix d'une topologie de déploiement.

## Restreignez l'accès au scanner {#restrict-scanner-access}

Les instances de scanner nécessitent des [autorisations][4] pour créer et copier des instantanés et décrire les volumes. Datadog recommande de suivre les directives suivantes pour assurer la sécurité de vos scanners :

- Restreignez l'accès aux instances de scanner aux utilisateurs administratifs.
- Définissez les autorisations du scanner pour suivre le principe du moindre privilège, limité au minimum requis pour l'analyse.
- Chiffrez toute transmission de données entre le scanner et Datadog avec HTTPS.
- Activez les mises à jour de sécurité automatiques et faites pivoter les instances automatiquement toutes les 24 heures.
- N'autorisez pas l'accès entrant aux instances de scanner (groupe de sécurité restreint).

## Analyse de Cloud Storage {#cloud-storage-scanning}

Vous pouvez activer le [Sensitive Data Scanner][8] pour vos ressources Agentless Scanning lors du déploiement ou après la configuration. Sensitive Data Scanner catalogue et classifie les données sensibles dans votre stockage cloud (tels que les compartiments Amazon S3). Il lit uniquement les magasins de données et leurs fichiers dans votre environnement, sans envoyer de données sensibles à Datadog.

## On-Demand Scanning {#on-demand-scanning}

Par défaut, Agentless Scanning analyse automatiquement vos ressources toutes les 12 heures. Pour AWS, vous pouvez également déclencher une analyse immédiate d'une ressource spécifique (host, conteneur, fonction Lambda ou compartiment S3) en utilisant l'On-Demand Scanning API. Pour plus d'informations, consultez la documentation de l'[On-Demand Scanning API][14].

## Lectures complémentaires : {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_security_management/setup/agentless_scanning#setup
[2]: /fr/remote_configuration
[3]: https://cyclonedx.org/
[4]: /fr/security/cloud_security_management/setup/agentless_scanning/enable#prerequisites
[5]: https://app.datadoghq.com/security/csm/vm
[6]: #terraform
[7]: mailto:success@datadoghq.com
[8]: /fr/security/sensitive_data_scanner
[9]: /fr/security/cloud_security_management
[10]: /fr/remote_configuration
[11]: /fr/security/sensitive_data_scanner/scanning_rules/library_rules/
[13]: /fr/security/cloud_security_management/setup/agentless_scanning/deployment_methods#recommended-configuration
[14]: /fr/api/latest/agentless-scanning/#create-aws-on-demand-task
[15]: /fr/security/cloud_security_management/guide/resource_evaluation_filters
[16]: /fr/security/cloud_security_management/setup/agentless_scanning/deployment_methods