---
aliases:
- /fr/security/agentless_scanning
- /fr/security/cloud_security_management/agentless_scanning
further_reading:
- link: /security/vulnerabilities
  tag: Documentation
  text: En savoir plus sur les vulnérabilités de Cloud Security
- link: /security/sensitive_data_scanner/setup/cloud_storage
  tag: Documentation
  text: Configurer Sensitive Data Scanner pour Cloud Storage
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: Documentation
  text: Mise à jour d'Agentless Scanning
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: Documentation
  text: Dépannage d'Agentless Scanning
title: Agentless Scanning Cloud Security
---

## Présentation

Agentless Scanning offre une visibilité sur les vulnérabilités qui existent dans votre infrastructure cloud AWS, Azure et GCP, sans nécessiter l'installation de l'Agent Datadog. Datadog recommande d'activer Agentless Scanning comme première étape pour obtenir une visibilité complète sur vos ressources cloud, puis d'installer l'Agent Datadog sur vos ressources principales au fil du temps pour un contexte de sécurité et d'observabilité plus approfondi. 

<div class="alert alert-info">Agentless Scanning exclut les ressources sur lesquelles l'Agent Datadog est installé.</div> 

## Fonctionnement

Le diagramme suivant illustre le fonctionnement du Agentless Scanning :

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Diagramme illustrant le fonctionnement d'Agentless Scanning" width="90%" >}}

1. Datadog programme des scans automatisés toutes les 12 heures et envoie les ressources à scanner via [Remote Configuration][2].
   - Si vous avez configuré des [filtres d'évaluation Cloud Security][15], Agentless Scanning respecte ces filtres et scanne uniquement les ressources qui correspondent aux critères configurés.
2. Pour les fonctions serverless (telles qu'AWS Lambda), les scanners récupèrent le code de la fonction.
3. Le scanner crée des snapshots des volumes utilisés dans les instances de VM en cours d'exécution. À partir des snapshots ou du code de la fonction, le scanner génère un SBOM (une liste de packages et de dépendances).
4. Le SBOM et les métadonnées du host sont transmis à Datadog. Toutes les autres données, notamment les snapshots, le contenu des disques et les images de conteneur, restent dans votre infrastructure. Les snapshots sont supprimés.
5. Datadog utilise le SBOM pour identifier les vulnérabilités connues dans vos ressources.

Cette architecture offre :
- **Confidentialité des données** : le contenu de vos disques, les images de conteneur et les données sensibles restent dans votre compte cloud. Seules les métadonnées des packages (le SBOM) sont transmises à Datadog.
- **Résidence des données** : aucune donnée ne franchit les limites d'un compte pour pénétrer dans l'infrastructure de Datadog, ce qui simplifie la conformité aux exigences de souveraineté des données.
- **Conformité** : les auditeurs peuvent vérifier que les données de scan restent dans votre périmètre.

Pour plus d'informations sur la confidentialité des données, consultez la section [Données envoyées à Datadog](#données-envoyées-à-datadog).

<div class="alert alert-info">
  <ul>
    <li>Le scanner fonctionne en tant que machine virtuelle distincte au sein de votre infrastructure, ce qui garantit un impact minimal sur les systèmes et ressources existants.</li> 
    <li>Pour AWS, les instances de scanner s'adaptent automatiquement en fonction de la charge de travail. Lorsqu'il n'y a aucune ressource à scanner, les scanners se réduisent à zéro pour minimiser les coûts liés au fournisseur cloud.</li>
    <li>Le scanner collecte en toute sécurité une liste de packages depuis vos hosts sans transmettre d'informations personnelles confidentielles ou privées en dehors de votre infrastructure.</li>
    <li>Le scanner limite son utilisation de l'API du fournisseur cloud pour éviter d'atteindre les limites de débit et applique un backoff exponentiel si nécessaire.</li>
    <li>Les instances de scanner font l'objet d'une rotation automatique toutes les 24 heures, ce qui garantit l'exécution des dernières images.</li>
  </ul>
</div>

## Données envoyées à Datadog

Plutôt que de copier des snapshots de disque en dehors de votre environnement à des fins d'analyse, Datadog déploie une infrastructure de scan légère **au sein de votre compte cloud** pour préserver la confidentialité de vos données. Agentless Scanning crée des snapshots de vos ressources et les analyse localement, puis les supprime une fois les analyses terminées. Seul le software bill of materials (SBOM) résultant, qui contient une liste de packages et de dépendances, est envoyé à Datadog. Vos données brutes, le contenu de vos disques et les images de conteneur ne quittent jamais votre environnement.

Le scanner sans Agent utilise le format [cycloneDX][3] d'OWASP pour transmettre une liste de paquets à Datadog. Aucune information confidentielle ou personnelle privée n'est jamais transmise en dehors de votre infrastructure.

Datadog n'envoie **pas** :
- Les configurations des systèmes et paquets
- Les clés de chiffrement et certificats
- Les logs et pistes d'audit
- Les données métier sensibles

## Coût du fournisseur de services cloud

Dans la mesure où Agentless Scanning s'exécute dans votre compte cloud, les coûts de calcul et de réseau apparaissent sur la facture de votre fournisseur cloud. Tandis que les fournisseurs qui effectuent les scans dans leur propre infrastructure intègrent les coûts de calcul dans leurs frais SaaS, le fait de conserver les données dans votre environnement signifie que vous voyez directement les coûts d'infrastructure. 

Pour réduire les coûts :
- Déployez un scanner dans chaque région où vous avez plus de 150 hosts. Un scanner régional évite les transferts de données inter-régions, ce qui est plus économique que de scanner ces hosts depuis une région distante.
- Utilisez la [configuration recommandée][13] avec Terraform pour déployer un scanner par région.
- Pour les déploiements multi-régions de grande envergure, consultez la section [Déploiement d'Agentless Scanning][16] pour obtenir des conseils sur le choix d'une topologie de déploiement.

## Restreindre l'accès au scanner

Les instances de scanner nécessitent des [autorisations][4] pour créer et copier des snapshots et décrire les volumes. Datadog recommande de suivre les directives suivantes pour sécuriser vos scanners :

- Limitez l'accès aux instances de scanner aux utilisateurs administrateurs.
- Définissez les autorisations du scanner en appliquant le principe du moindre privilège, limité au minimum requis pour le scan.
- Chiffrez toutes les transmissions de données entre le scanner et Datadog avec HTTPS.
- Activez les mises à jour de sécurité automatiques et faites tourner les instances automatiquement toutes les 24 heures.
- N'autorisez pas l'accès entrant aux instances de scanner (groupe de sécurité restreint).

## Scanning du stockage cloud

Vous pouvez activer [Sensitive Data Scanner][8] pour vos ressources Agentless Scanning lors du déploiement ou après la configuration. Sensitive Data Scanner catalogue et classe les données sensibles de votre stockage cloud (par exemple, les compartiments Amazon S3). Il lit uniquement les datastores et leurs fichiers dans votre environnement, sans envoyer de données sensibles à Datadog.

## Scanning à la demande

Par défaut, Agentless Scanning scanne automatiquement vos ressources toutes les 12 heures. Pour AWS, vous pouvez également déclencher un scan immédiat d'une ressource spécifique (host, conteneur, fonction Lambda ou compartiment S3) via l'API On-Demand Scanning. Pour plus d'informations, consultez la documentation relative à l'[API On-Demand Scanning][14].

## Pour aller plus loin

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