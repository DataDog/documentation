---
further_reading:
- link: /security/automation_pipelines/security_inbox
  tag: Documentation
  text: Ajouter des règles à Security Inbox
- link: /security/automation_pipelines/set_due_date
  tag: Documentation
  text: Fixer des règles pour les dates d'échéance
- link: /security/cloud_security_management
  tag: Documentation
  text: En savoir plus sur Cloud Security
- link: /security/code_security/
  tag: Documentation
  text: En savoir plus sur Code Security
- link: /security/application_security/
  tag: Documentation
  text: En savoir plus sur la protection des applications et des API
- link: /security/default_rules/#all
  tag: Documentation
  text: Règles de détection prêtes à l'emploi
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: Blog
  text: Comment Datadog Security Inbox priorise les risques de sécurité
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: Protection des applications et des API
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Security Inbox
---
{{< product-availability >}}

La boîte de réception Security fournit une liste consolidée et exploitable de vos découvertes de sécurité les plus importantes. Elle corrèle et contextualise les découvertes provenant de l'ensemble des produits de sécurité Datadog — vulnérabilités, erreurs de configuration, risques liés à l'identité et vecteurs d'attaque — dans une vue unique et hiérarchisée du travail qui réduit le plus les risques dans votre environnement.

La boîte de réception Security répond à trois questions :

- **Sur quoi mon équipe doit-elle travailler ensuite ?** Les découvertes sont classées par gravité, puis par risque corrélé, puis par le nombre de ressources et de services qu'elles affectent.
- **Qu'est-ce qui est en retard ?** Les règles de date d'échéance associent des délais de remédiation aux découvertes, afin que vous puissiez suivre les progrès par rapport aux accords de niveau de service (SLA) auxquels votre organisation s'engage.
- **Pourquoi cette découverte se trouve-t-elle dans ma boîte de réception ?** Chaque découverte arrive dans la boîte de réception via une règle de boîte de réception. Vous pouvez examiner les règles par défaut, désactiver celles qui ne correspondent pas à votre organisation et créer les vôtres.

{{< img src="security/security_inbox_8.png" alt="La boîte de réception Security affiche les découvertes de sécurité hiérarchisées avec des résumés de la gravité, du statut de triage et des SLA de remédiation" width="100%">}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">Certains produits qui alimentent la boîte de réception Security ne sont pas disponibles sur ce site ({{< region-param key="dd_site_name" >}}). Les découvertes de Code Security n'atteignent pas la boîte de réception et Linear n'est pas disponible pour la gestion des tickets.</div>
{{% /site-region %}}

{{% site-region region="gov2" %}}
<div class="alert alert-danger">Certains produits qui alimentent la boîte de réception Security ne sont pas disponibles sur ce site ({{< region-param key="dd_site_name" >}}). Les découvertes de Code Security et de protection des applications et des API n'atteignent pas la boîte de réception. La gestion des tickets Linear, Datadog Case Management et la gestion des assignataires sont également indisponibles.</div>
{{% /site-region %}}

## Ce qui apparaît dans la boîte de réception Security {#what-appears-in-security-inbox}

Les règles de la boîte de réception contrôlent quelles découvertes atteignent la boîte de réception Security. Datadog fournit un ensemble de règles de boîte de réception par défaut, compilées par l'équipe de recherche en sécurité de Datadog, qui font ressortir les résultats les plus susceptibles de représenter un risque réel. Vous pouvez examiner ces règles, désactiver des règles individuelles et ajouter vos propres règles.

Les règles sont évaluées dans l'ordre. Pour chaque découverte, Datadog vérifie vos règles depuis le haut jusqu'à ce que l'une d'elles corresponde, puis s'arrête. Si aucune règle ne correspond, la découverte n'entre pas dans la boîte de réception.

Pour voir les règles qui alimentent votre boîte de réception, cliquez sur **Customize inbox** dans la barre de filtre de la boîte de réception Security, ou accédez à **Security** > **Settings** > [**Findings Automation**][24].

### Types de constatations pris en charge {#supported-finding-types}

Type de découverte Source

| Type de constatation | Source |
|---|---|
| [Erreur de configuration][2] | Cloud Security |
| [Risque lié à l'identité][3] | Cloud Security |
| [Chemin d'attaque][1] | Cloud Security |
| [Vulnérabilité du host][14] | Cloud Security |
| [Vulnérabilité de l'image de conteneur][14] | Cloud Security |
| [Activité de la charge de travail][15] | Workload Protection |
| [Vulnérabilité de bibliothèque][4] | Code Security |
| [Vulnérabilité de code statique][16] | Code Security |
| [Vulnérabilité de code d'exécution][5] | Code Security |
| [Infrastructure en tant que code][17] | Code Security |
| [Secret][18] | Code Security |
| [Sécurité des API][19] | Protection des applications et des API |

Security Inbox affiche uniquement les types de constatations que vous avez l'autorisation de lire. Une constatation que vous ne pouvez pas ouvrir dans son propre Explorer n'apparaît pas dans votre boîte de réception.

### Risques détectés {#detected-risks}

Security Inbox prend en compte les risques détectés suivants lors de l'évaluation d'une constatation :

- **Accessibilité publique** : Les ressources exposées publiquement présentent un risque élevé, surtout si elles contiennent des vulnérabilités ou des erreurs de configuration. Pour en savoir plus, consultez [Comment Datadog détermine si les ressources sont accessibles publiquement][6].
- **Accès privilégié** : Les ressources bénéficiant d'un accès privilégié présentent un risque élevé car elles accordent des autorisations élevées susceptibles d'élargir la surface d'attaque.
- **Sous attaque** : Les ressources qui font l'objet d'une activité de sécurité suspecte présentent des risques élevés. Les ressources sont signalées comme « Sous attaque » si un signal de sécurité a été détecté sur la ressource au cours des 15 derniers jours.
- **Exploit disponible** : Les vulnérabilités pour lesquelles des exploits publics sont disponibles présentent des risques élevés. La disponibilité d'un exploit public est vérifiée auprès de différentes bases de données d'exploits, telles que [cisa.gov][7], [exploit-db.com][8] et [nvd.nist.gov][9].
- **En production** : Les vulnérabilités dans les environnements de production présentent des risques élevés. L'environnement est calculé à partir des tags `env` et `environment`.

## Fonctionnement de la priorisation dans Security Inbox{#how-security-inbox-prioritization-works}

Security Inbox classe les découvertes en tenant compte d'abord de leur gravité, puis du nombre de risques corrélés, et enfin du nombre de ressources et de services impactés.

- **Gravité (Critique, Élevée, Moyenne et Faible)** : La gravité est déterminée par le [Datadog Security Scoring Framework][10] pour les erreurs de configuration cloud et les risques liés à l'identité, et par le score CVSS 3.1 pour les vulnérabilités.
- **Nombre de risques détectés** : Lorsque deux découvertes ont la même gravité, celle qui présente le plus grand nombre de risques détectés est priorisée.
- **Nombre de ressources et de services impactés** : Si deux découvertes partagent à la fois la même gravité et le même nombre de risques détectés, celle qui impacte un plus grand nombre de ressources et de services est priorisée.

**Remarque** : Le type de découverte, le risque détecté ou la ressource impactée n'influencent pas la priorisation.

## Suivre la remédiation par rapport aux dates d'échéance {#track-remediation-against-due-dates}

[Règles de date d'échéance][12] attribuent une date limite de remédiation à un résultat en fonction de sa gravité et de son type. Lorsque les dates d'échéance sont configurées, la carte **Remediation SLA** en haut de la boîte de réception Security rapporte la progression par rapport à celles-ci :

| Statut | Signification |
|---|---|
| En retard | La découverte a dépassé sa date d'échéance de remédiation. |
| Échéance proche | La découverte est due dans les sept prochains jours. |
| Pas encore due | La découverte est due dans plus de sept jours. |

Cliquez sur un statut pour filtrer la liste sur ces découvertes. Vous pouvez également filtrer sur le **Statut En retard** depuis la barre de filtre.

Deux autres cartes résument le même ensemble de découvertes :

- **Gravité** : Le nombre de découvertes Critiques et Élevées.
- **Statut** :
  - **En attente de triage** : Le nombre de découvertes sans ticket ni responsable.
  - **En cours** : Le nombre de découvertes qui en ont au moins une.

## Examiner les résultats {#investigate-findings}

### Filtrer et grouper {#filter-and-group}

Appliquez des filtres pour restreindre la boîte de réception selon n'importe quelle facette du schéma des découvertes, y compris l'équipe, la gravité, le type de découverte, le service et la ressource. Pour filtrer sur un attribut qui n'est pas proposé en tant que facette, saisissez son nom dans le menu **Modifier les filtres** et ajoutez-le en tant que filtre personnalisé.

Utilisez **Grouper par** pour agréger les découvertes jusqu'à deux champs simultanément. La boîte de réception groupe par défaut par titre de découverte, ce qui regroupe chaque occurrence du même problème sous-jacent en une seule ligne. Réglez **Grouper par** sur **Aucun** pour voir une ligne par découverte.

### Modifier les colonnes {#change-the-columns}

Cliquez sur l'icône d'engrenage au-dessus du tableau pour ajouter, supprimer ou réorganiser les colonnes. Les colonnes par défaut sont le type de découverte, le titre, la gravité, les risques, la ressource et le statut de triage.

<div class="alert alert-info">Les options de colonne sont disponibles sur les tableaux non groupés et sur les tableaux à l'intérieur de groupes développés. Elles ne sont pas disponibles sur le tableau externe d'une vue groupée.</div>

### Vues enregistrées {#saved-views}

Enregistrez la combinaison actuelle de filtres, de regroupements et de colonnes en tant que vue enregistrée, afin de pouvoir y revenir plus tard ou la partager avec votre équipe. Les vues enregistrées sont répertoriées dans la barre latérale **Vues**.

### Exporter {#export}

Cliquez sur **Exporter** au-dessus du tableau pour exporter vos résultats vers d'autres outils :

- **Exporter vers Sheets** : Envoyez les résultats vers [Datadog Sheets][21] pour une exploration plus approfondie et un reporting plus détaillé.
- **Ouvrir dans l'éditeur DDSQL** : Ouvrez la requête équivalente dans l'[éditeur DDSQL][22] pour des agrégations complexes et une analyse personnalisée.
- **Télécharger au format CSV** : Téléchargez les résultats sous forme de fichier CSV.
- **Copier en tant que cURL** : Copiez la requête API équivalente dans votre presse-papiers.

## Triage et remédiation {#triage-and-remediate}

La colonne **Triage** contient des actions pour un seul résultat. Cliquez sur **Assign** pour définir un [assignee][23], ou sur **Add Ticket** pour créer ou lier un ticket, sans quitter le tableau.

Pour agir sur plusieurs résultats à la fois, sélectionnez-les et utilisez :

- **Gestion des tickets** : Créez un ticket Jira, un incident ServiceNow, un ticket Linear ou un cas de sécurité Datadog pour les résultats sélectionnés ; ou dissociez-en un existant. Pour la configuration et la synchronisation bidirectionnelle, consultez [Intégrations de gestion des tickets][20].
- **Assignee** : Définissez ou effacez le [assignee][23] sur les résultats sélectionnés.
- **Muting** : Mettez en sourdine les résultats que vous avez évalués et acceptés.
- **Severity** : Ajustez la sévérité des résultats sélectionnés.

La sélection en masse est disponible sur les tableaux non regroupés et à l'intérieur des groupes développés. Cliquez sur n'importe quel résultat pour ouvrir son panneau latéral, qui affiche les détails complets de la détection et les conseils de remédiation pour ce type de résultat.

## Rapport sur votre boîte de réception {#report-on-your-inbox}

L'onglet **Reporting** affiche un dashboard des tendances de Security Inbox au fil du temps, afin que vous puissiez suivre si la remédiation suit le rythme de la détection.

## Utilisez la carte de contexte de sécurité pour identifier et atténuer les vulnérabilités {#use-the-security-context-map-to-identify-and-mitigate-vulnerabilities}

La carte de contexte de sécurité pour [Chemins d'attaque](#supported-finding-types) fournit une vue complète pour aider à identifier et à traiter les points de rupture potentiels. Il cartographie les erreurs de configuration, les lacunes en matière d'autorisations et les vulnérabilités interconnectées que les attaquants pourraient exploiter.

Les fonctionnalités clés incluent :

- **Évaluation des risques** : La carte permet aux équipes de sécurité d'évaluer l'impact plus large des vulnérabilités et des erreurs de configuration. Cela inclut l'évaluation de la nécessité de mettre à jour les politiques de sécurité---telles que les chemins d'accès et les autorisations---et la compréhension des implications de l'exposition en matière de conformité, en particulier lorsque des données sensibles sont menacées dans le rayon d'impact.
- **Contexte exploitable pour une réponse immédiate** : La carte inclut des informations sur la propriété des services et d'autres contextes pertinents, permettant aux équipes de prendre des décisions éclairées en temps réel. Les équipes peuvent agir directement depuis la carte en exécutant des workflows intégrés, en partageant des liens vers des problèmes de sécurité et en accédant à la vue de la console AWS des ressources pour une remédiation efficace, le tout sans changer d'outil.

{{< img src="security/security_context_map.png" alt="La carte de contexte de sécurité montrant une instance AWS EC2 accessible publiquement avec une erreur de configuration critique" width="100%">}}

## Customize Security Inbox {#customize-security-inbox}

[Automation Pipelines][13] vous permettent de configurer les règles qui déterminent ce qui atteint votre boîte de réception et quand les remédiations sont dues pour chaque résultat. Utilisez les automatisations pour :

- **Faire remonter les constatations non capturées par défaut** : Utilisez des règles personnalisées pour mettre en évidence les constatations que les règles par défaut ne détectent pas, afin de garantir que les constatations critiques ne soient pas négligées.
- **Renforcer la conformité et traiter les préoccupations clés du système** : Traitez les préoccupations affectant la conformité réglementaire ou les systèmes commerciaux importants, quelle que soit leur gravité.
- **Prioriser les risques actuels** : Concentrez-vous sur les menaces immédiates, telles que les risques liés à l'identité après un incident ou les vulnérabilités à l'échelle de l'industrie.
- **Imposer des délais de remédiation** : Associez des dates d'échéance en fonction de la sévérité, afin que le travail en retard soit visible par toute l'équipe.

Pour plus d'informations, consultez [Add to Security Inbox Rules][11] et [Set Due Date Rules][12].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/default_rules/?category=all#all
[2]: /fr/security/cloud_security_management/misconfigurations/
[3]: /fr/security/cloud_security_management/identity_risks/
[4]: /fr/security/code_security/software_composition_analysis
[5]: /fr/security/code_security/iast
[6]: /fr/security/cloud_security_management/guide/public-accessibility-logic/
[7]: https://www.cisa.gov/
[8]: https://www.exploit-db.com/
[9]: https://nvd.nist.gov/
[10]: /fr/security/cloud_security_management/severity_scoring/#cloud-security-severity-scoring-framework
[11]: /fr/security/automation_pipelines/security_inbox
[12]: /fr/security/automation_pipelines/set_due_date
[13]: /fr/security/automation_pipelines/
[14]: /fr/security/cloud_security_management/vulnerabilities/
[15]: /fr/security/workload_protection/
[16]: /fr/security/code_security/static_analysis/
[17]: /fr/security/code_security/iac_security/
[18]: /fr/security/code_security/secret_scanning/
[19]: /fr/security/application_security/api_posture/
[20]: /fr/security/ticketing_integrations/
[21]: /fr/sheets/
[22]: /fr/ddsql_editor/
[23]: /fr/security/assignee_management/
[24]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=add_to_inbox