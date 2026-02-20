---
aliases:
- /fr/security/agentless_scanning
- /fr/security/cloud_security_management/agentless_scanning
further_reading:
- link: /security/vulnerabilities
  tag: Documentation
  text: En savoir plus sur les vulnérabilités de Cloud Security
title: Scanning sans Agent Cloud Security
---

## Section Overview

Le scanning sans Agent offre une visibilité sur les vulnérabilités qui existent dans votre infrastructure cloud, sans nécessiter l'installation de l'Agent Datadog. Datadog recommande d'activer le scanning sans Agent comme première étape pour obtenir une visibilité complète sur vos ressources cloud, puis d'installer l'Agent Datadog sur vos ressources principales au fil du temps pour un contexte de sécurité et d'observabilité plus approfondi. 

## Fonctionnement

Après avoir [configuré le scanning sans Agent][1] pour vos ressources, Datadog planifie des scans automatisés toutes les 12 heures via la [Configuration à distance][2]. Lors d'un cycle de scan, les scanners sans Agent recueillent les dépendances du code Lambda et créent des instantanés de vos instances de VM. Avec ces instantanés, les scanners sans Agent scannent, génèrent et transmettent une liste de paquets à Datadog pour rechercher les vulnérabilités, ainsi que les dépendances du code Lambda. Lorsque les scans d'un instantané sont terminés, l'instantané est supprimé. Aucune information confidentielle ou personnelle privée n'est jamais transmise en dehors de votre infrastructure. 

Si vous avez configuré des [filtres d'évaluation Cloud Security][15], le scanning sans Agent respecte ces filtres et scanne uniquement les ressources qui correspondent aux critères configurés.

Le diagramme suivant illustre le fonctionnement du scanning sans Agent :

{{< img src="/security/agentless_scanning/how_agentless_works.png" alt="Diagramme montrant le fonctionnement du scanning sans Agent" width="90%" >}}

1. Datadog planifie un scan et envoie les ressources à scanner via la Configuration à distance.

    **Note** : Les analyses programmées ne tiennent pas compte des hôtes sur lesquels est déjà installé [Datadog Agent avec Cloud Security activé] (#agentless-scanning-with-existing-agent-installations). Datadog planifie une ré-analyse continue des ressources toutes les 12 heures afin de fournir des informations actualisées sur les vulnérabilités et les faiblesses potentielles.

2. Pour les fonctions Lambda, les scanners récupèrent le code de la fonction.
3. Le scanner crée des instantanés des volumes utilisés dans les instances de VM en cours d'exécution. Ces instantanés servent de base pour effectuer les scans. À l'aide des instantanés ou du code, le scanner génère une liste de paquets.
4. Une fois le scan terminé, la liste des paquets et les informations relatives aux hosts collectés sont transmises à Datadog, toutes les autres données restant dans votre infrastructure. Les instantanés créés pendant le cycle de scan sont supprimés.
5. En exploitant la liste de paquets collectée ainsi que l'accès de Datadog à la base de données de vulnérabilités Trivy, Datadog détecte les vulnérabilités affectées correspondantes dans vos ressources et votre code.

**Remarques** :
- Le scanner fonctionne comme une instance de VM distincte au sein de votre infrastructure, garantissant un impact minimal sur les systèmes et ressources existants.
- Pour AWS, les instances de scanner sont automatiquement mises à l'échelle en fonction de la charge de travail. Lorsqu'il n'y a aucune ressource à scanner, les scanners se réduisent à zéro pour minimiser les coûts du fournisseur de cloud.
- Le scanner collecte de manière sécurisée une liste de paquets depuis vos hosts sans transmettre aucune information confidentielle ou personnelle privée en dehors de votre infrastructure.
- Le scanner limite son utilisation de l'API du fournisseur de cloud pour éviter d'atteindre une limite de taux, et utilise un backoff exponentiel si nécessaire.

## Scanning à la demande

Par défaut, le scanning sans Agent scanne automatiquement vos ressources toutes les 12 heures. Vous pouvez également déclencher un scan immédiat d'une ressource spécifique (host, conteneur, fonction Lambda ou compartiment S3) à l'aide de l'API de scanning à la demande.

Cela est utile lorsque vous devez :
- Vérifier qu'une vulnérabilité a été corrigée
- Obtenir des résultats immédiats pour des ressources nouvellement déployées
- Valider la posture de sécurité avant le déploiement en production

Pour plus d'informations, consultez la [documentation de l'API de scanning à la demande][14].

## Données envoyées à Datadog
Le scanner sans Agent utilise le format [cycloneDX][3] d'OWASP pour transmettre une liste de paquets à Datadog. Aucune information confidentielle ou personnelle privée n'est jamais transmise en dehors de votre infrastructure.

Datadog n'envoie **pas** :
- Les configurations des systèmes et paquets
- Les clés de chiffrement et certificats
- Les logs et pistes d'audit
- Les données métier sensibles

## Considérations relatives à la sécurité

Étant donné que les instances de scanner accordent des [autorisations][4] pour créer et copier des instantanés, et décrire des volumes, Datadog conseille de restreindre l'accès à ces instances uniquement aux utilisateurs administratifs.

Pour atténuer davantage ce risque, Datadog met en œuvre les mesures de sécurité suivantes :

- Le scanner Datadog fonctionne _au sein_ de votre infrastructure, garantissant que toutes les données, y compris les instantanés et la liste des paquets, restent isolées et sécurisées.
- Toutes les transmissions de données entre le scanner et Datadog sont chiffrées à l'aide de protocoles standard de l'industrie (tels que HTTPS) pour garantir la confidentialité et l'intégrité des données.
- Le scanner Datadog fonctionne selon le principe du moindre privilège. Cela signifie qu'il ne reçoit que les autorisations minimales nécessaires pour effectuer efficacement ses fonctions prévues.
- Datadog examine et limite soigneusement les autorisations accordées au scanner pour s'assurer qu'il peut effectuer des scans sans accès inutile aux données ou ressources sensibles.
- Les mises à jour de sécurité sans surveillance sont activées sur les instances de scanner de Datadog. Cette fonctionnalité automatise le processus d'installation des correctifs et mises à jour de sécurité critiques sans nécessiter d'intervention manuelle.
- Les instances de scanner Datadog sont automatiquement renouvelées toutes les 24 heures. Ce renouvellement garantit que les instances de scanner sont continuellement mises à jour avec les dernières images Ubuntu.
- L'accès aux instances de scanner est étroitement contrôlé par l'utilisation de groupes de sécurité. Aucun accès entrant au scanner n'est autorisé, limitant ainsi la possibilité de compromettre l'instance.
- Aucune information confidentielle ou personnelle privée n'est jamais transmise en dehors de votre infrastructure.

## Scanning sans Agent avec des installations existantes de l'Agent

Lorsqu'il est installé, l'Agent Datadog offre une visibilité approfondie en temps réel sur les risques et vulnérabilités qui existent dans vos charges de travail cloud. Il est recommandé d'installer complètement l'Agent Datadog.

Par conséquent, le scanning sans Agent exclut de ses scans les ressources sur lesquelles l'Agent Datadog est installé et configuré pour la [gestion des vulnérabilités][5]. De cette manière, Cloud Security offre une visibilité complète de votre paysage de risques sans annuler les avantages reçus de l'installation de l'Agent Datadog avec la gestion des vulnérabilités.

Le diagramme suivant illustre le fonctionnement du scanning sans Agent avec des installations existantes de l'Agent :

{{< img src="/security/agentless_scanning/agentless_existing.png" alt="Diagramme montrant le fonctionnement du scanning sans Agent lorsque l'Agent est déjà installé avec la gestion des vulnérabilités Cloud Security" width="90%" >}}

## Scanning du stockage cloud

{{< callout url="https://www.datadoghq.com/product-preview/data-security" >}}
  La prise en charge du scanning pour les compartiments Amazon S3 et les instances RDS est en version Preview. Pour vous inscrire, cliquez sur <strong>Request Access</strong>. {{< /callout >}}

Si vous avez activé le [Sensitive Data Scanner][8], vous pouvez cataloguer et classifier les données sensibles dans vos compartiments Amazon S3.

Le Sensitive Data Scanner recherche les données sensibles en déployant des [scanners sans Agent][1] dans vos environnements cloud. Ces instances de scanning récupèrent une liste de tous les compartiments S3 via la [Configuration à distance][10], et ont des instructions définies pour scanner les fichiers texte, tels que les CSV et JSON au fil du temps. Le Sensitive Data Scanner exploite l'ensemble de sa [bibliothèque de règles][11] pour trouver des correspondances. Lorsqu'une correspondance est trouvée, l'emplacement de la correspondance est envoyé à Datadog par l'instance de scanning. Les magasins de données et leurs fichiers sont uniquement lus dans votre environnement : aucune donnée sensible n'est renvoyée à Datadog. 

En plus d'afficher les correspondances de données sensibles, le Sensitive Data Scanner fait apparaître tous les problèmes de sécurité détectés par [Cloud Security][9] affectant les magasins de données sensibles. Vous pouvez cliquer sur n'importe quel problème pour poursuivre le triage et la remédiation dans Cloud Security.

## Coût du fournisseur de services cloud

Lors de l'utilisation du scanning sans Agent, des coûts supplémentaires du fournisseur de cloud s'appliquent pour l'exécution des scanners et le scanning de vos environnements cloud.

Votre configuration cloud affecte les coûts de votre fournisseur de cloud. Généralement, en utilisant la [configuration recommandée][13], ceux-ci se situent dans la fourchette de 1 USD par host scanné par an. Vous devez consulter les informations de votre fournisseur de cloud pour connaître les montants exacts, qui sont susceptibles de changer sans l'intervention de Datadog.

Pour les charges de travail cloud volumineuses réparties sur plusieurs régions, Datadog recommande de configurer le [scanning sans Agent avec Terraform][6] pour éviter la mise en réseau inter-régions.


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