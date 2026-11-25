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
  text: Configurer le Sensitive Data Scanner pour Cloud Storage
- link: /security/cloud_security_management/setup/agentless_scanning/update
  tag: Documentation
  text: Mise à jour de Agentless Scanning
- link: /security/cloud_security_management/troubleshooting/agentless_scanning
  tag: Documentation
  text: Dépannage de l'analyse Agentless
title: Cloud Security Agentless Scanning
---
## Présentation {#overview}

Agentless Scanning offre une visibilité sur les vulnérabilités qui existent au sein de votre infrastructure cloud AWS, Azure et Google Cloud, sans nécessiter l'installation de Datadog Agent. Datadog recommande d'activer Agentless Scanning comme première étape pour obtenir une visibilité complète sur vos ressources cloud, puis d'installer le Datadog Agent sur vos actifs principaux au fil du temps pour un contexte de sécurité et d'observabilité plus approfondi.

Vous pouvez exécuter les scanners Agentless de deux manières :

- **Hébergé par Datadog (SaaS)** : Datadog exécute les scanners et vous accordez à Datadog les autorisations pour analyser votre compte. Prend en charge AWS uniquement.
- **Auto-hébergé** : Les scanners s'exécutent dans votre propre compte cloud.

Les deux modes utilisent le même moteur d'analyse et produisent les mêmes résultats.

<div class="alert alert-info">Agentless Scanning ignore les hôtes sur lesquels le Datadog Agent s'exécute avec les fonctionnalités Cloud Security Vulnerabilities et Misconfigurations activées. Pour les autres hôtes équipés de l'Agent, Agentless Scanning couvre uniquement les fonctionnalités que l'Agent ne couvre pas. Voir <a href="/security/cloud_security_management/troubleshooting/agentless_scanning#hosts-with-the-datadog-agent-are-not-scanned">Dépannage</a>.</div>

## Choisir où les scanners s'exécutent {#choose-where-scanners-run}

{{< callout url="https://www.datadoghq.com/product-preview/agentless-saas-mode/" header="L'Agentless Scanning hébergé par Datadog (SaaS) est en préversion" respect-site-support="false" >}}
L'analyse hébergée par Datadog prend uniquement en charge les comptes AWS.
{{< /callout >}}

| | Hébergé par Datadog (SaaS) | Auto-hébergé |
|---|---|---|
| Où le scanner s'exécute | Dans l'infrastructure de Datadog | Dans votre compte cloud |
| Ce que vous déployez | Une politique IAM gérée et la politique gérée AWS `SecurityAudit`, attachées à votre rôle d'intégration Datadog existant. La pile CloudFormation crée également une fonction Lambda qui appelle la Datadog API lors du déploiement de la pile. | Instances de scanner et leur configuration réseau ; pour AWS, cela comprend des instances EC2 dans un groupe de mise à l'échelle automatique, un VPC et une passerelle NAT |
| Où le contenu du disque est lu | Dans un environnement d'analyse Datadog, dans la région de votre site Datadog (voir [résidence des données hébergées par Datadog](#datadog-hosted-data-residency)) | Dans votre compte cloud |
| Fournisseurs cloud pris en charge | AWS | AWS, Azure, Google Cloud |
| Mises à jour du scanner | Datadog met à jour le scanner automatiquement | Vous mettez à jour le scanner |
| Coût de l'infrastructure du fournisseur cloud | Aucun | Les coûts de calcul et de réseau apparaissent sur votre facture de fournisseur cloud |
| Moteur d'analyse et résultats | Identique dans les deux modes | Identique dans les deux modes |
| Fréquence d'analyse | Toutes les 12 heures | Toutes les 12 heures |
| Couverture des ressources AWS | Identique dans les deux modes | Identique dans les deux modes |
| Sensitive Data Scanner pour Amazon S3 | Pris en charge | Pris en charge |
| Analyse à la demande | Non pris en charge | Pris en charge pour AWS |
| Facturation Datadog | Identique dans les deux modes | Identique dans les deux modes |

### Quand utiliser Agentless Scanning hébergé par Datadog (SaaS) {#when-to-use-datadog-hosted-saas-agentless-scanning}

Utilisez l'analyse hébergée par Datadog si l'un des cas suivants s'applique :

- Vous souhaitez commencer l'analyse sans déployer de ressources de calcul ou de réseau dans votre compte.
- Vous ne souhaitez pas maintenir, mettre à jour ou surveiller les instances de scanner.
- Vous souhaitez éviter les coûts d'infrastructure liés à l'exécution de scanners dans chaque région.
- Vous souhaitez que les nouveaux types de ressources soient pris en charge automatiquement, sans mettre à jour de scanner.

### Quand utiliser Agentless Scanning auto-hébergé {#when-to-use-self-hosted-agentless-scanning}

Utilisez l'analyse auto-hébergée si l'un des cas suivants s'applique :

- Vous devez analyser des ressources Azure ou Google Cloud.
- Vos politiques exigent que le contenu des disques reste dans votre propre compte cloud.
- Vos politiques restreignent la région ou le fournisseur cloud pouvant traiter vos données. L'analyse hébergée par Datadog traite les données dans la région de votre site Datadog, qui peut différer de la région et du fournisseur cloud de vos ressources.
- Vous souhaitez un contrôle direct sur les versions du scanner ou la planification des analyses.

### Utilisez les deux modes {#use-both-modes}

Vous pouvez choisir un mode pour chaque compte AWS au lieu d'un mode pour l'ensemble de votre organisation. Par exemple, vous pouvez utiliser l'analyse hébergée par Datadog dans la plupart des comptes et des scanners auto-hébergés lorsque le contenu des disques doit rester dans votre compte cloud.

Pour basculer un compte qui utilise déjà un scanner auto-hébergé, consultez [Déplacer un compte d'Agentless Scanning auto-hébergé vers Agentless Scanning hébergé par Datadog (SaaS)][17].

## Agentless Scanning hébergé par Datadog (SaaS) {#datadog-hosted-scanning}

Datadog exécute les scanners dans sa propre infrastructure. Ce mode est en préversion et prend uniquement en charge AWS. Pour les instructions de configuration, consultez [Activation d'Agentless Scanning][19].

### Fonctionnement de l'analyse hébergée par Datadog {#datadog-hosted-how-it-works}

1. Datadog découvre vos ressources via les API des fournisseurs cloud. Cette étape lit uniquement les métadonnées.
2. Dans votre compte AWS, Datadog crée un instantané de chaque volume à analyser. L'instantané reste dans votre compte. Datadog ne partage jamais l'instantané avec un compte AWS Datadog et ne le copie jamais dans celui-ci.
3. Datadog lit les blocs de l'instantané via HTTPS en utilisant les API directes Amazon EBS.
4. Datadog présente les blocs à un bac à sable d'analyse en tant qu'appareil de blocs, et le bac à sable monte les partitions en lecture seule.
5. Les scanners analysent les systèmes de fichiers montés et envoient les résultats et les SBOM à Datadog.
6. Datadog supprime l'instantané et détruit le bac à sable.

Chaque analyse s'exécute dans une nouvelle microVM isolée au niveau matériel avec son propre noyau, que Datadog détruit à la fin de l'analyse. Datadog n'exécute jamais de code sur vos instances.

### Ce que l'analyse hébergée par Datadog envoie à Datadog {#datadog-hosted-what-data-is-sent-to-datadog}

Datadog lit le contenu de votre disque dans son environnement d'analyse à la demande et ne conserve **pas** de copie de ce contenu. Seuls les résultats et les SBOM persistent dans Datadog.

### Résidence des données hébergées par Datadog {#datadog-hosted-data-residency}

Les analyses s'exécutent dans la région du site Datadog que votre organisation utilise, et non dans la région où vos ressources sont situées. Par exemple, si votre organisation utilise le site Datadog EU1, Datadog analyse vos ressources dans l'UE, quelle que soit la région AWS dans laquelle se trouvent vos ressources.

Si vos ressources se trouvent dans une région différente de celle de votre site Datadog, l'analyse peut impliquer un transfert de données transfrontalier. Examinez vos exigences en matière de confidentialité avant d'activer l'analyse pour ces comptes. Si vos données doivent être traitées dans votre propre compte cloud ou votre propre région, utilisez l'analyse auto-hébergée.

### Coût du fournisseur cloud pour l'analyse hébergée par Datadog {#datadog-hosted-cost}

Il n'y a aucun coût d'infrastructure de scanner sur votre facture de fournisseur cloud et aucun coût Datadog supplémentaire.

### Analyse du stockage cloud hébergée par Datadog {#datadog-hosted-cloud-storage-scanning}

Vous pouvez activer [Sensitive Data Scanner][8] pour les compartiments Amazon S3 lors de la configuration. Sensitive Data Scanner catalogue et classifie les données sensibles dans votre stockage cloud.

Avec l'analyse hébergée par Datadog, Datadog lit le contenu de vos compartiments S3 dans son environnement d'analyse, de la même manière que le contenu des disques. Datadog ne conserve **pas** le contenu de vos objets ni les données correspondantes. Pour chaque correspondance, Datadog stocke uniquement l'emplacement : le compartiment, le chemin de l'objet, la règle de correspondance et la position dans l'objet. Comme les compartiments contiennent souvent davantage de données sensibles que les disques, examinez vos exigences en matière de traitement des données avant d'activer Sensitive Data Scanner.

Sensitive Data Scanner est facultatif. Vous pouvez le désactiver et continuer à utiliser l'analyse hébergée par Datadog pour détecter les vulnérabilités. Pour le désactiver après la configuration :

- **CloudFormation** : Désactivez Sensitive Data Scanner dans Datadog. Pour obtenir des instructions, consultez [Set up Sensitive Data Scanner][20].
- **Terraform** : Dans la ressource `datadog_agentless_scanning_aws_scan_options`, définissez `sensitive_data` sur `false`, puis appliquez la configuration.

### Analyse à la demande hébergée par Datadog {#datadog-hosted-on-demand-scanning}

L'[On-Demand Scanning API][14] n'est pas disponible pour l'analyse hébergée par Datadog. Datadog analyse automatiquement vos ressources toutes les 12 heures.

## Analyse Agentless auto-hébergée {#self-hosted-scanning}

Les scanners s'exécutent dans votre propre compte cloud. Pour les instructions de configuration, consultez [Activation d'Agentless Scanning][18].

### Fonctionnement de l'analyse auto-hébergée {#how-it-works}

Le diagramme suivant illustre le fonctionnement de l'analyse Agentless auto-hébergée :

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Diagramme illustrant le fonctionnement de l'analyse Agentless auto-hébergée" width="90%" >}}

<!-- TODO(DOCS-16346): Replace with side-by-side diagram of both modes when available. -->

1. Datadog planifie des analyses automatisées à des intervalles de 12 heures et envoie les ressources à analyser via [Remote Configuration][2].
   - Si vous avez configuré des [Cloud Security Evaluation Filters][15], l'analyse Agentless respecte ces filtres et n'analyse que les ressources qui correspondent aux critères configurés.
2. Pour les fonctions serverless (telles qu'AWS Lambda), les scanners récupèrent le code de la fonction.
3. Le scanner crée des snapshots des volumes utilisés dans les instances de VM en cours d'exécution. À l'aide des snapshots ou du code de la fonction, le scanner génère une SBOM (une liste de paquets et de dépendances).
4. La SBOM et les métadonnées de l'host sont transmises à Datadog. Toutes les autres données — y compris les snapshots, le contenu des disques et les images de conteneurs — restent dans votre infrastructure. Les snapshots sont supprimés.
5. Datadog utilise la SBOM pour identifier les vulnérabilités connues dans vos ressources.

Cette architecture fournit :
- **Confidentialité des données** : Le contenu de vos disques, vos images de conteneurs et vos données sensibles restent au sein de votre compte cloud. Seules les métadonnées des paquets (la SBOM) et les métadonnées de l'host sont transmises à Datadog.
- **Résidence des données** : Les snapshots et le contenu des disques ne quittent jamais votre compte cloud, ce qui simplifie la conformité aux exigences de souveraineté des données.
- **Compliance** : Les auditeurs peuvent vérifier que les données d'analyse restent au sein de votre périmètre.

Pour plus d'informations sur la confidentialité des données, consultez [Ce que l'analyse auto-hébergée envoie à Datadog](#what-data-is-sent-to-datadog).

<div class="alert alert-info">
  <ul>
    <li>Le scanner fonctionne en tant que VM distincte au sein de votre infrastructure, ce qui minimise l'impact sur les systèmes et ressources existants.</li>
    <li>Pour AWS, les instances de scanner s'adaptent automatiquement en fonction de la charge de travail. Lorsqu'il n'y a aucune ressource à analyser, le nombre de scanners est réduit à zéro pour minimiser les coûts du fournisseur cloud.</li>
    <li>Le scanner collecte de manière sécurisée une liste de paquets sur vos hosts sans transmettre d'informations confidentielles ni de données personnelles en dehors de votre infrastructure.</li>
    <li>Le scanner limite son utilisation de l'API du fournisseur cloud pour éviter d'atteindre les limites de débit et applique une temporisation exponentielle si nécessaire.</li>
    <li>Les instances de scanner sont automatiquement renouvelées toutes les 24 heures, garantissant qu'elles exécutent les dernières images.</li>
  </ul>
</div>

### Ce que l'analyse auto-hébergée envoie à Datadog {#what-data-is-sent-to-datadog}

Plutôt que de copier des snapshots de disque en dehors de votre environnement pour analyse, afin de garder vos données privées, Datadog déploie une infrastructure d'analyse légère **au sein de votre compte cloud**. Agentless Scanning crée des snapshots de vos ressources et les analyse localement, puis supprime les snapshots une fois les analyses terminées. Il envoie uniquement à Datadog les métadonnées du host et la nomenclature logicielle (SBOM) résultante, qui répertorie les paquets et les dépendances. Vos données brutes, le contenu des disques et les images de conteneurs ne quittent jamais votre environnement.

Le scanner Agentless utilise le format OWASP [cycloneDX][3] pour transmettre une liste de paquets à Datadog. Aucune information confidentielle ni donnée personnelle n'est transmise en dehors de votre infrastructure.

Le scanner ne transmet **pas** :
- Configurations système et de paquets
- Clés de chiffrement et certificats
- Logs et Audit Trails
- Données d'entreprise sensibles

### Coût du fournisseur cloud pour l'analyse auto-hébergée {#cloud-service-provider-cost}

Les scanners auto-hébergés s'exécutent au sein de votre compte cloud, de sorte que les coûts de calcul et de mise en réseau apparaissent sur votre facture de fournisseur cloud.

Pour réduire les coûts :
- Déployez un scanner dans chaque région où vous avez plus de 150 hosts. Un scanner régional évite le transfert de données entre régions, ce qui est plus rentable que l'analyse de ces hosts depuis une région distante.
- Utilisez la [configuration recommandée][13] avec Terraform pour déployer un scanner par région.
- Pour les déploiements multirégion à grande échelle, consultez [Déploiement d'Agentless Scanning][16] pour obtenir des conseils sur le choix d'une topologie de déploiement.

### Restreindre l'accès au scanner {#restrict-scanner-access}

Les instances de scanner nécessitent des [autorisations][4] pour créer et copier des snapshots et décrire les volumes. Datadog recommande de suivre les directives suivantes pour assurer la sécurité de vos scanners :

- Restreignez l'accès aux instances de scanner aux utilisateurs administratifs.
- Configurez les autorisations du scanner pour respecter le principe du moindre privilège, en les limitant au minimum requis pour l'analyse.
- Chiffrez toutes les transmissions de données entre le scanner et Datadog avec HTTPS.
- Activez les mises à jour de sécurité automatiques et renouvelez automatiquement les instances toutes les 24 heures.
- N'autorisez pas l'accès entrant aux instances du scanner (groupe de sécurité restreint).

### Analyse auto-hébergée du stockage cloud {#cloud-storage-scanning}

Vous pouvez activer [Sensitive Data Scanner][8] pour vos ressources d'analyse Agentless lors du déploiement ou après la configuration. Sensitive Data Scanner catalogue et classifie les données sensibles dans votre stockage cloud (comme les compartiments Amazon S3). Il lit uniquement les magasins de données et leurs fichiers dans votre environnement, sans envoyer de données sensibles à Datadog.

### Analyse à la demande auto-hébergée {#on-demand-scanning}

Par défaut, Agentless Scanning analyse automatiquement vos ressources toutes les 12 heures. Pour AWS, vous pouvez également déclencher une analyse immédiate d'une ressource spécifique (host, conteneur, fonction Lambda ou compartiment S3) en utilisant l'On-Demand Scanning API. Pour plus d'informations, consultez la documentation de [On-Demand Scanning API][14].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_security_management/setup/agentless_scanning#setup
[2]: /fr/remote_configuration
[3]: https://cyclonedx.org/
[4]: /fr/security/cloud_security_management/setup/agentless_scanning/enable?agentless_scanner_hosting=self_hosted#prerequisites
[5]: https://app.datadoghq.com/security/csm/vm
[6]: #terraform
[7]: mailto:success@datadoghq.com
[8]: /fr/security/sensitive_data_scanner
[9]: /fr/security/cloud_security_management
[10]: /fr/remote_configuration
[11]: /fr/security/sensitive_data_scanner/scanning_rules/library_rules/
[13]: /fr/security/cloud_security_management/setup/agentless_scanning/deployment_methods?agentless_scanner_hosting=self_hosted
[14]: /fr/api/latest/agentless-scanning/#create-aws-on-demand-task
[15]: /fr/security/cloud_security_management/guide/resource_evaluation_filters
[16]: /fr/security/cloud_security_management/setup/agentless_scanning/deployment_methods?agentless_scanner_hosting=self_hosted
[17]: /fr/security/cloud_security_management/setup/agentless_scanning/deployment_methods?agentless_scanner_hosting=datadog_hosted#move-an-account-from-self-hosted-to-datadog-hosted-scanning
[18]: /fr/security/cloud_security_management/setup/agentless_scanning/enable?agentless_scanner_hosting=self_hosted
[19]: /fr/security/cloud_security_management/setup/agentless_scanning/enable?agentless_scanner_hosting=datadog_hosted
[20]: /fr/security/sensitive_data_scanner/setup/