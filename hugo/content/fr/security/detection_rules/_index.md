---
aliases:
- /fr/security_monitoring/detection_rules/
- /fr/cloud_siem/detection_rules/
- /fr/security_platform/detection_rules/
- /fr/security/security_monitoring/log_detection_rules/
further_reading:
- link: /security/default_rules/#all
  tag: Documentation
  text: Explorer les règles de détection par défaut
- link: /security/notifications/
  tag: Documentation
  text: En savoir plus sur les notifications de sécurité
- link: https://www.datadoghq.com/blog/detect-abuse-of-functionality-with-datadog/
  tag: Blog
  text: Détection des abus de fonctionnalité avec Datadog
- link: https://www.datadoghq.com/blog/impossible-travel-detection-rules/
  tag: Blog
  text: Détecter les activités de connexion suspectes grâce aux règles de détection
    de voyage impossible
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: app-sec
  name: Protection des applications et des API
  url: /security/application_security/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
title: Règles de détection
---
{{< product-availability >}}

Les règles de détection définissent la logique conditionnelle appliquée à tous les logs et configurations cloud ingérés. Lorsqu'au moins un cas défini dans une règle correspond, sur une période donnée, un signal de sécurité est généré. Vous pouvez consulter ces signaux dans le [Signals Explorer][1].

## Règles de détection prêtes à l'emploi {#out-of-the-box-detection-rules}

Datadog fournit des [règles de détection prêtes à l'emploi][2] pour signaler les techniques d'attaquants et les erreurs de configuration potentielles. Lorsque de nouvelles règles de détection sont publiées, elles sont automatiquement importées dans votre compte, votre bibliothèque de protection des applications et des API, et l'Agent, selon votre configuration.

Les règles de détection prêtes à l'emploi sont disponibles pour les solutions de sécurité suivantes :

- [Cloud SIEM][3] utilise la détection de logs pour analyser les logs ingérés en temps réel.
- Cloud Security :
    - [Cloud Security Misconfigurations][4] utilise des règles de détection de configuration cloud et d'infrastructure pour analyser l'état de votre environnement cloud.
    - [Cloud Security Identity Risks][6] utilise des règles de détection pour détecter les risques basés sur IAM dans votre infrastructure cloud.
- [Workload Protection][5] utilise le Datadog Agent et des règles de détection pour surveiller et évaluer activement l'activité du système.
- [App and API protection][7] (AAP) exploite [APM][8] de Datadog, le [Datadog Agent][9] et des règles de détection pour détecter les menaces dans votre environnement applicatif.

## Carte MITRE ATT&CK {#mitre-attck-map}

{{< product-availability names="Cloud SIEM,App and API Protection,Workload Protection" >}}

MITRE ATT&CK est un framework qui aide les organisations à comprendre comment les cyberattaquants opèrent. Il cartographie les éléments suivants :

- **Tactiques :** Le « pourquoi » d'une attaque. Il s'agit des objectifs de haut niveau, comme obtenir un accès initial, exécuter du code malveillant ou voler des données.
- **Techniques :** Le « comment » d'une attaque. Il s'agit des actions spécifiques qu'un attaquant entreprend pour atteindre une tactique, comme utiliser le phishing pour pénétrer dans un système ou exploiter une vulnérabilité dans un logiciel.

En cartographiant les tactiques et les techniques, MITRE ATT&CK fournit aux équipes de sécurité un langage commun pour communiquer sur les menaces et mieux préparer les défenses.

Pour utiliser la carte MITRE ATT&CK, procédez comme suit :

1. Ouvrez les règles de détection dans [SIEM][16] ou [Workload Protection][17].
2. Sélectionnez {{< ui >}}MITRE ATT&CK map{{< /ui >}}.
3. Sélectionnez un ou plusieurs produits dans le filtre <i class="icon-filter"></i>.
4. Examinez la carte pour les éléments suivants :
   - Évaluation de la couverture : Déterminez quelles techniques d'attaque sont bien couvertes et lesquelles sont sous-surveillées.
   - Priorisation de la création de règles : Concentrez-vous sur la création de règles de détection pour les techniques présentant une couverture faible ou nulle.
   - Rationalisation de la gestion des règles : Gérez et mettez à jour les règles de détection, en vous assurant qu'elles s'alignent sur les dernières informations concernant les menaces.
La carte MITRE ATT&CK est disponible dans SIEM ou Workload Protection, mais vous pouvez sélectionner Application and API Protection dans le filtre. La protection des applications et des API est incluse dans la carte MITRE ATT&CK pour une couverture de sécurité complète.

## Règles de détection bêta {#beta-detection-rules}

L'équipe de recherche en sécurité de Datadog ajoute continuellement de nouvelles règles de détection de sécurité prêtes à l'emploi. Bien que l'objectif soit de fournir des détections de haute qualité avec la publication d'intégrations ou d'autres nouvelles fonctionnalités, les performances de la détection à grande échelle doivent souvent être observées avant de rendre la règle généralement disponible. Cela donne à l'équipe de recherche en sécurité de Datadog le temps d'affiner ou de supprimer les opportunités de détection qui ne répondent pas à nos normes.

## Règles de détection personnalisées {#custom-detection-rules}

Il peut y avoir des situations où vous devez personnaliser une règle en fonction de votre environnement ou de votre charge de travail. Par exemple, si vous utilisez AAP, vous souhaiterez peut-être personnaliser une règle de détection qui détecte les utilisateurs effectuant des actions sensibles depuis une géolocalisation où votre entreprise n'opère pas.

Pour [créer des règles personnalisées](#create-detection-rules), vous pouvez cloner les règles par défaut et modifier les copies, ou créer vos propres règles à partir de zéro.

## Rechercher et filtrer les règles de détection {#search-and-filter-detection-rules}

Pour afficher les règles de détection prêtes à l'emploi et personnalisées dans Datadog, accédez à la page [{{< ui >}}Security Settings{{< /ui >}}][10]. Les règles sont répertoriées sur des pages distinctes pour chaque produit (App and API Protection, Cloud Security et Cloud SIEM).

Pour rechercher et filtrer les règles, utilisez la zone de recherche et les facettes pour effectuer une requête par valeur. Par exemple, pour n'afficher que les règles d'un type donné, survolez le type de règle et sélectionnez `only`. Vous pouvez également filtrer par des facettes telles que `source` et `severity` lors de l'examen et du tri des problèmes entrants.

{{< img src="security/default_detection_rules.png" alt="La page Configuration affiche les règles de détection Cloud SIEM par défaut et personnalisées." width="100%">}}

## Créer des règles de détection {#create-detection-rules}

Pour créer une règle de détection personnalisée, cliquez sur le bouton {{< ui >}}New Rule{{< /ui >}} dans le coin supérieur droit de la page Règles de détection. Vous pouvez également [cloner une règle par défaut ou personnalisée existante](#clone-a-rule) et l'utiliser comme modèle.

Pour obtenir des instructions détaillées, consultez la documentation relative aux solutions suivantes :

- [Cloud SIEM][11]
- [AAP][12]
- [Cloud Security Misconfigurations][13]
- [Workload Protection][14]

## Gérer les règles de détection {#manage-detection-rules}

Vous pouvez gérer les règles de détection depuis les pages [SIEM][16] ou [Workload Protection][17] dans Datadog. Ces instructions décrivent comment effectuer ces actions depuis ces pages, mais ces options sont également disponibles lorsque vous cliquez sur une règle de détection pour l'ouvrir dans un panneau latéral.

### Activer ou désactiver des règles {#enable-or-disable-rules}

Pour activer ou désactiver une règle, cliquez sur le bouton en regard du nom de la règle.

Vous pouvez également activer ou désactiver plusieurs règles à la fois :

1. Cliquez sur {{< ui >}}Select Rules{{< /ui >}}.
1. Sélectionnez les règles que vous souhaitez activer ou désactiver.
1. Cliquez sur le menu déroulant {{< ui >}}Bulk Actions{{< /ui >}}.
1. Sélectionnez {{< ui >}}Enable Rules{{< /ui >}} ou {{< ui >}}Disable Rules{{< /ui >}}.

### Modifier une règle {#edit-a-rule}

Vous pouvez modifier les règles de détection standard et personnalisées. Si vous souhaitez conserver la règle d'origine au lieu de la modifier directement, vous pouvez [cloner la règle](#clone-a-rule), apporter des modifications à la règle clonée et [désactiver la règle d'origine](#enable-or-disable-rules).

Pour modifier une règle, cliquez sur le menu à trois points verticaux de la règle et sélectionnez {{< ui >}}Edit default rule{{< /ui >}} ou {{< ui >}}Edit rule{{< /ui >}}, selon le type de règle.

### Cloner une règle {#clone-a-rule}

Pour cloner une règle, cliquez sur le menu à trois points verticaux de la règle et sélectionnez {{< ui >}}Clone rule{{< /ui >}}.

Le clonage d'une règle est utile si vous souhaitez dupliquer une règle existante et modifier légèrement les paramètres pour couvrir d'autres domaines de détection. Par exemple, vous pourriez dupliquer une règle de détection de log et la modifier de {{< ui >}}Threshold{{< /ui >}} à {{< ui >}}Anomaly{{< /ui >}} pour ajouter une nouvelle dimension à la détection des menaces en utilisant les mêmes requêtes et déclencheurs.

### Supprimez une règle {#delete-a-rule}

Pour supprimer une règle, cliquez sur le menu à trois points verticaux de la règle et sélectionnez {{< ui >}}Delete rule{{< /ui >}}.

Vous pouvez également supprimer des règles en masse :

1. Cliquez sur {{< ui >}}Select Rules{{< /ui >}}.
1. Sélectionnez les règles que vous souhaitez supprimer.
1. Cliquez sur le menu déroulant {{< ui >}}Bulk Actions{{< /ui >}}.
1. Sélectionnez {{< ui >}}Delete Rules{{< /ui >}}.

### Consulter l'historique des versions d'une règle {#see-the-version-history-for-a-rule}

{{< img src="/security/security_monitoring/detection_rules/rule_version_history_20250207.png" alt="L'historique des versions pour une compromission de jeton d'accès OAuth GitHub montrant" style="width:80%;" >}}

Utilisez l'historique des versions de règle pour :
- Consulter les versions précédentes d'une règle de détection et comprendre les changements au fil du temps.
- Voir qui a effectué les changements pour une meilleure collaboration.
- Comparer les versions avec des différences pour analyser les modifications et l'impact des changements.

Pour consulter l'historique des versions d'une règle :
1. Accédez à la page [Security Settings][15]. Dans le panneau de navigation de gauche :
    - Pour AAP : Cliquez sur {{< ui >}}App and API Protection{{< /ui >}} puis cliquez sur {{< ui >}}Detection Rules{{< /ui >}}.
    - Pour Cloud Security : Cliquez sur {{< ui >}}Cloud Security{{< /ui >}} puis cliquez sur {{< ui >}}Threat Detection Rules{{< /ui >}}.
    - Pour Cloud SIEM : Cliquez sur {{< ui >}}Cloud SIEM{{< /ui >}} puis cliquez sur {{< ui >}}Detection Rules{{< /ui >}}.
1. Cliquez sur la règle qui vous intéresse, puis cliquez sur {{< ui >}}Edit rule{{< /ui >}}.
1. Dans l'éditeur de règles, cliquez sur {{< ui >}}Version History{{< /ui >}} pour voir les modifications passées :
   - Cliquez sur une version spécifique pour voir quelles modifications ont été apportées.
   - Cliquez sur {{< ui >}}Open Version Comparison{{< /ui >}} pour voir ce qui a changé entre les versions, puis sélectionnez les deux versions que vous souhaitez comparer. Cliquez sur {{< ui >}}Unified{{< /ui >}} si vous souhaitez voir la comparaison dans le même panneau.
     - Les données surlignées en rouge indiquent des données qui ont été modifiées ou supprimées.
     - Les données surlignées en vert indiquent des données qui ont été ajoutées.

### Restreindre les autorisations de modification {#restrict-edit-permissions}

{{% security-products/detection-rules-granular-access %}}

### Afficher les signaux générés {#view-generated-signals}

Pour afficher les signaux de sécurité d'une règle dans l'[Signals Explorer][1], cliquez sur le menu vertical à trois points et sélectionnez {{< ui >}}View generated signals{{< /ui >}}. Ceci est utile pour corréler les signaux provenant de plusieurs sources par règle, ou lors de la réalisation d'un audit de règles.

### Exporter une règle {#export-a-rule}

Pour exporter une copie d'une règle, cliquez sur la règle pour l'ouvrir dans le panneau latéral. Cliquez sur {{< ui >}}Export{{< /ui >}}, puis sélectionnez {{< ui >}}Export rule to JSON{{< /ui >}} ou {{< ui >}}Export rule to Terraform{{< /ui >}}.

Vous pouvez également exporter des règles en masse :

1. Cliquez sur {{< ui >}}Select Rules{{< /ui >}}.
1. Sélectionnez les règles que vous souhaitez exporter.
1. Cliquez sur le menu déroulant {{< ui >}}Bulk Actions{{< /ui >}}.
1. Sélectionnez {{< ui >}}Export to JSON{{< /ui >}} ou {{< ui >}}Export to Terraform{{< /ui >}}.

## Obsolescence de la règle {#rule-deprecation}

Des audits réguliers de toutes les règles de détection sont effectués afin de maintenir une qualité de signal élevée. Les règles obsolètes sont remplacées par une règle améliorée.

Le processus d'obsolescence des règles suit différentes étapes :

- Un avertissement indiquant la date d'obsolescence figure sur la règle. Dans l'interface utilisateur, l'avertissement s'affiche dans :
    - Panneau latéral des signaux, section {{< ui >}}Rule Details{{< /ui >}} > {{< ui >}}Playbook{{< /ui >}}
    - Panneau latéral des erreurs de configuration (Cloud Security Misconfigurations uniquement)
    - [Éditeur de règles][10] pour cette règle spécifique
- Une fois la règle obsolète, une période de 15 mois s'écoule avant sa suppression. Ceci est dû à la période de rétention des signaux de 15 mois. Pendant cette période, vous pouvez réactiver la règle en [clonant la règle](#clone-a-rule) dans l'interface utilisateur.
- Une fois la règle supprimée, vous ne pouvez plus la cloner ni la réactiver.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security
[2]: /fr/security/default_rules/
[3]: /fr/security/cloud_siem/
[4]: /fr/security/cloud_security_management/misconfigurations/
[5]: /fr/security/workload_protection/
[6]: /fr/security/cloud_security_management/identity_risks/
[7]: /fr/security/application_security/
[8]: /fr/tracing/
[9]: /fr/agent/
[10]: https://app.datadoghq.com/security/configuration/
[11]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/
[12]: /fr/security/application_security/policies/custom_rules/
[13]: /fr/security/cloud_security_management/misconfigurations/custom_rules
[14]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-a-custom-detection-rule
[15]: https://app.datadoghq.com/security/configuration/
[16]: https://app.datadoghq.com/security/siem/rules
[17]: https://app.datadoghq.com/security/workload-protection/detection-rules