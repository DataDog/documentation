---
aliases:
- /fr/security/cloud_security_management/review_remediate/jira
description: Intégrations de gestion des tickets de sécurité
further_reading:
- link: /security/assignee_management/
  tag: Documentation
  text: Gestion des personnes assignées
- link: /incident_response/work_management/
  tag: Documentation
  text: Work Management
- link: /api/latest/security-monitoring/#create-cases-for-security-findings
  tag: API
  text: API d'intégration de gestion des tickets
- link: https://www.datadoghq.com/blog/work-management/
  tag: Blog
  text: Centralisez le travail humain et celui effectué par des agents avec Datadog
    Work Management
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: App and API protection
  url: /security/application_security/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
site_support_id: case_management
title: Intégrations de gestion des tickets
---
{{< product-availability >}}

Vous pouvez utiliser [Datadog Work Management][1] pour gérer les tickets dans des outils tiers comme [Jira][2], [ServiceNow][21] et [Linear][23]. Pour plus de détails, consultez [Intégration de Work Management avec des outils de gestion des tickets tiers][3].

Cette page traite de l'utilisation de Datadog Security avec Datadog Work Management pour la gestion des tickets.

Pour assigner un utilisateur Datadog à une découverte sans créer de ticket, consultez [Assignee Management][30].


## Produits Work Management et de sécurité {#work-management-and-security-products}

Work Management est pris en charge pour tous les produits de sécurité qui utilisent des signaux ou des découvertes :

- Code Security (dans [Findings][5])
- Cloud Security (dans [Findings][11])
- Cloud SIEM (dans [Signals][4])
- App and API protection (dans [Signals][6] et [Findings][12])
- Workload Protection (dans [Signals][7] et [Findings][13])

Ouvrez n'importe quel signal ou découverte dans ces produits ou effectuez une sélection en masse de découvertes dans les explorateurs, et utilisez le bouton {{< ui >}}Create Ticket{{< /ui >}} pour créer un cas dans Datadog.


## Synchronisation bidirectionnelle des tickets {#bidirectional-ticket-syncing}

La synchronisation bidirectionnelle vous permet de mettre à jour automatiquement les tickets lorsque des changements surviennent dans Datadog, et de mettre à jour certaines informations Datadog lorsque des changements surviennent dans votre outil de gestion des tickets.

### Produits pris en charge {#supported-products}

La synchronisation bidirectionnelle est prise en charge pour les catégories de découvertes de Code Security et Cloud Security suivantes :

- Bibliothèques (SCA)
- Code statique (SAST)
- Code d'exécution (IAST)
- Secret Scanning 
- Infrastructure as Code (IaC)
- Mauvaises configurations
- Risques liés aux identités
- Vulnérabilités des hosts et des conteneurs
- App and API protection
- Workload Protection

### Source unique de vérité {#single-source-of-truth}

La synchronisation bidirectionnelle vous permet de synchroniser les tickets avec les cas Datadog. Cependant, Datadog constitue la source unique de vérité pour la détection et la résolution des problèmes.

Le ticket associé à une découverte Datadog peut être fermé manuellement. Cependant, la découverte Datadog reste ouverte si Datadog ne peut pas confirmer que le problème est résolu. Cette restriction permet de garantir qu'une découverte n'est pas fermée et supprimée lorsque quelqu'un ferme un ticket associé.

La fermeture d'un cas Datadog sans remédiation ne ferme pas non plus la découverte.

La remédiation de la découverte dans Datadog ou la définition d'une exception en [désactivant la découverte][14] sont les seuls moyens de fermer une découverte. Une fois la découverte corrigée, ses cas et tickets associés sont fermés.

### Configurer la synchronisation bidirectionnelle {#set-up-bidirectional-syncing}

{{< tabs >}}

{{% tab "Jira" %}}

Les étapes suivantes permettent de configurer la synchronisation bidirectionnelle avec Jira et de vérifier que la configuration est réussie.

1. Configurez les prérequis suivants dans votre compte Datadog, ou vérifiez qu'ils sont déjà configurés. Les prérequis sont listés dans leur ordre de configuration.
   1. L'[intégration Datadog Jira][2].
   2. Un [webhook pour l'intégration Jira][8]. La configuration d'un webhook permet aux cas créés dans Work Management de créer automatiquement des tickets dans Jira et de maintenir les deux ressources synchronisées.
   3. Un [nouveau projet Work Management][9]. Un projet est un objet conteneur qui contient un ensemble de cas.
   4. L'[intégration Jira est configurée au sein du projet][3].
      1. Activez l'option {{< ui >}}Sync data between Work Management and Jira{{< /ui >}}.
      2. Dans {{< ui >}}Title{{< /ui >}}, sélectionnez {{< ui >}}Two-way sync{{< /ui >}}.
      3. Terminez les réglages restants, puis cliquez sur {{< ui >}}Save changes{{< /ui >}}.
2. Vérifiez que l'intégration bidirectionnelle de Work Management avec Jira fonctionne :
   1. Ouvrez [tout produit prenant en charge la synchronisation bidirectionnelle des tickets][20].
   2. Localisez l'option de menu déroulant de gestion des tickets dans l'Explorer ou dans la page de découvertes et sélectionnez {{< ui >}}Jira{{< /ui >}}. Le bouton ouvre une modale {{< ui >}}Jira Ticket{{< /ui >}}.
   3. Vérifiez que la section {{< ui >}}Work Management  ↔ Jira Integration{{< /ui >}} existe et que la synchronisation bidirectionnelle est activée.

{{< img src="security/jira_modal-1.png" alt="Modale utilisée pour créer un ticket Jira pour une découverte Security, avec la synchronisation bidirectionnelle activée." responsive="true" style="width:50%;">}}

Vous êtes prêt à commencer à créer des tickets Work Management bidirectionnels.

Si vous ne voyez pas la section {{< ui >}}Work Management  ↔ Jira Integration{{< /ui >}}, vérifiez que vous avez rempli les prérequis.

[2]: /fr/integrations/jira/
[3]: /fr/incident_response/work_management/notifications_integrations/#third-party-tickets
[8]: /fr/integrations/jira/#configure-a-jira-webhook
[9]: /fr/incident_response/work_management/projects/
[20]: /fr/security/ticketing_integrations/#supported-products

{{% /tab %}}

{{% tab "ServiceNow" %}}

Les étapes suivantes permettent de configurer la synchronisation bidirectionnelle avec ServiceNow et de vérifier que la configuration est réussie.

1. Configurez les prérequis suivants dans votre compte Datadog, ou vérifiez qu'ils sont déjà configurés. Les prérequis sont listés dans leur ordre de configuration.
   1. L'[intégration Datadog ServiceNow][21].
      1. Accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}ServiceNow{{< /ui >}} > {{< ui >}}Work Management{{< /ui >}}.
      2. Choisissez `Datadog Cases ITSM` comme table de cas pour la synchronisation bidirectionnelle. 
   2. Un [projet Work Management][9] à lier à votre groupe d'affectation. Un projet est un objet conteneur qui contient un ensemble de cas liés à votre table ServiceNow. S'il n'y a pas de projet lié, Datadog crée un projet lorsque vous créez un ticket.
   3. Pour la synchronisation bidirectionnelle ITSM, assurez-vous que les utilisateurs ServiceNow qui mettent à jour les incidents possèdent au moins le rôle `itil`. Voir [Configuration ServiceNow ITOM/ITSM][22] pour plus de détails.
2. Vérifiez que l'intégration bidirectionnelle de Work Management avec ServiceNow fonctionne :
   1. Ouvrez [tout produit prenant en charge la synchronisation bidirectionnelle des tickets][20].     
   2. Localisez l'option de menu déroulant de gestion des tickets dans l'Explorer ou dans la page de découvertes et sélectionnez {{< ui >}}ServiceNow{{< /ui >}}. Le bouton ouvre une modale {{< ui >}}ServiceNow Ticket{{< /ui >}}.
   3. Vérifiez que la synchronisation bidirectionnelle est activée pour les {{< ui >}}Instance{{< /ui >}} et {{< ui >}}Assignment Group{{< /ui >}} configurés.

{{< img src="security/servicenow_modal.png" alt="Modale utilisée pour créer un ticket ServiceNow pour une découverte Security, avec synchronisation bidirectionnelle et mappage des statuts activés." responsive="true" style="width:50%;">}}

Vous êtes prêt à commencer à créer des tickets Work Management bidirectionnels.

Si vous ne voyez pas la section {{< ui >}}Work Management ↔ ServiceNow Integration{{< /ui >}}, vérifiez que vous avez rempli les prérequis.

[3]: /fr/incident_response/work_management/notifications_integrations/#third-party-tickets
[9]: /fr/incident_response/work_management/projects/
[20]: /fr/security/ticketing_integrations/#supported-products
[21]: /fr/integrations/servicenow/
[22]: /fr/integrations/guide/servicenow-itom-itsm-setup/

{{% /tab %}}

{{% tab "Linear" %}}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">L'intégration de gestion des tickets Linear n'est pas disponible sur le {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

Les étapes suivantes permettent de configurer la synchronisation bidirectionnelle avec Linear et de vérifier que la configuration est réussie.

1. Configurez les prérequis suivants dans votre compte Datadog, ou vérifiez qu'ils sont déjà configurés. Les prérequis sont listés dans leur ordre de configuration.
   1. L'[intégration Datadog Linear][23].
   2. Un [webhook pour l'intégration Linear][24]. La configuration d'un webhook permet de maintenir synchronisés les cas créés dans Work Management et leurs issues Linear.
   3. Un [nouveau projet Work Management][9]. Un projet est un objet conteneur qui contient un ensemble de cas.
   4. L'[intégration Linear est configurée au sein du projet][3].
      1. Activez Linear pour le projet, puis sélectionnez un compte et une équipe Linear pour la création d'issues.
      2. Pour chaque champ que vous souhaitez maintenir synchronisé, sélectionnez {{< ui >}}Two-way sync{{< /ui >}}.
      3. Terminez les paramètres restants, puis enregistrez vos modifications.
2. Vérifiez que l'intégration bidirectionnelle de Work Management avec Linear fonctionne :
   1. Ouvrez [tout produit prenant en charge la synchronisation bidirectionnelle des tickets][20].
   2. Localisez l'option de menu déroulant de gestion des tickets dans l'Explorer ou dans la page de découvertes et sélectionnez {{< ui >}}Linear{{< /ui >}}. Le bouton ouvre une modale {{< ui >}}Linear Issue{{< /ui >}}.
   3. Vérifiez que la section {{< ui >}}Work Management ↔ Linear Integration{{< /ui >}} existe et que la synchronisation bidirectionnelle est activée.

{{< img src="security/linear_modal.png" alt="Modale utilisée pour créer une issue Linear pour une découverte Security, avec la synchronisation bidirectionnelle activée." responsive="true" style="width:50%;">}}

Vous êtes prêt à commencer à créer des tickets Work Management bidirectionnels.

Si vous ne voyez pas la section {{< ui >}}Work Management ↔ Linear Integration{{< /ui >}}, vérifiez que vous avez rempli les prérequis.

[3]: /fr/incident_response/case_management/notifications_integrations/#third-party-tickets
[9]: /fr/incident_response/case_management/projects/
[20]: /fr/security/ticketing_integrations/#supported-products
[23]: /fr/integrations/linear/
[24]: /fr/integrations/linear/#configure-a-linear-webhook

{{% /tab %}}

{{< /tabs >}}

### Créer des tickets bidirectionnels {#create-bidirectional-tickets}

Les étapes suivantes permettent de créer un ticket bidirectionnel pour une découverte Security.

1. Ouvrez [tout produit prenant en charge la synchronisation bidirectionnelle des tickets][20].
2. Localisez l'option de menu déroulant de l'icône {{< ui >}}Ticketing{{< /ui >}} pour une découverte dans l'Explorer ou sous {{< ui >}}Next Steps{{< /ui >}} dans la page de découvertes.
3. Vous pouvez également sélectionner jusqu'à 50 découvertes à la fois pour créer plusieurs tickets ou un seul ticket pour plusieurs découvertes.
4. Sélectionnez l'outil tiers dans la liste déroulante.
5. Créez un ticket pour tout outil tiers pris en charge (voir les sections ci-dessous).

{{% collapse-content title="Ticket Jira" level="h4" expanded=false %}}
1. Ouvrez la modale {{< ui >}}Jira Ticket{{< /ui >}}. Vous pouvez utiliser un nouveau ticket ou un ticket existant. Examinons la création d'un nouveau ticket Jira.
2. Remplissez les paramètres suivants :
   1. {{< ui >}}Jira account{{< /ui >}} :** sélectionnez le compte Jira où vous souhaitez que le ticket soit créé.
   2. {{< ui >}}Jira Project{{< /ui >}} :** sélectionnez le projet Jira à utiliser.
   3. {{< ui >}}Jira work type{{< /ui >}} :** sélectionnez le type de travail Jira à créer.
   4. {{< ui >}}Assignee and Priority{{< /ui >}} :** sélectionnez, éventuellement, l'utilisateur assigné et la priorité.
3. Pour ajouter plus de champs au ticket Jira créé par Datadog, utilisez {{< ui >}}Add Optional Field{{< /ui >}} pour ajouter les champs.
4. Consultez {{< ui >}}Data Sync Settings{{< /ui >}} pour examiner et mettre à jour le projet Work Management lié et les paramètres de synchronisation bidirectionnelle par champ.
5. Cliquez sur {{< ui >}}Create{{< /ui >}}.

**Remarques** :
- La synchronisation bidirectionnelle avec Jira est disponible pour certains attributs de ticket Jira, tels que le statut, le responsable et les commentaires, mais tous les champs Jira ne sont pas disponibles.
{{% /collapse-content %}}

{{% collapse-content title="Ticket ServiceNow" level="h4" expanded=false %}}
1. Ouvrez la modale {{< ui >}}ServiceNow Ticket{{< /ui >}}. Vous pouvez utiliser un nouveau ticket ou un ticket existant. Examinons la création d'un nouveau ticket ServiceNow.
2. Remplissez les paramètres suivants :
   1. {{< ui >}}Instance{{< /ui >}} :** sélectionnez l'instance ServiceNow où vous souhaitez que le ticket soit créé.
   2. {{< ui >}}Assignment group{{< /ui >}} :** sélectionnez le groupe ServiceNow auquel attribuer le ticket.
3. Si vous créez un ticket pour plusieurs résultats, choisissez un mode de création :
   - {{< ui >}}Single Ticket{{< /ui >}} :** crée un ticket agrégé unique lié à tous les résultats sélectionnés.
   - {{< ui >}}Multiple Tickets{{< /ui >}} :** crée un ticket individuel pour chaque résultat sélectionné.
4. Consultez {{< ui >}}Data Sync Settings{{< /ui >}} pour examiner et mettre à jour le projet Work Management lié et les paramètres de synchronisation bidirectionnelle par champ.
5. Cliquez sur {{< ui >}}Create{{< /ui >}}.

**Remarques** :
- La synchronisation bidirectionnelle est prise en charge pour le mode `ITSM` uniquement. `ITOM` Les événements ne prennent pas en charge la synchronisation bidirectionnelle.
- Le rattachement à un ticket existant est pris en charge pour le mode `ITSM` uniquement.
- Seules les URL d'incident ServiceNow sont prises en charge. Les URL de problème et de demande de changement ne sont pas acceptées.
{{% /collapse-content %}}

{{% collapse-content title="Problème Linear" level="h4" expanded=false %}}
{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">L'intégration de gestion des tickets Linear n'est pas disponible sur le {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

1. Ouvrez la modale {{< ui >}}Linear Issue{{< /ui >}}. Vous pouvez utiliser un problème nouveau ou existant.
2. Remplissez les paramètres suivants :
   1. {{< ui >}}Linear account{{< /ui >}}:** sélectionnez le compte Linear où vous souhaitez créer le ticket.
   2. {{< ui >}}Linear team{{< /ui >}}:** sélectionnez l'équipe Linear dans laquelle créer le ticket.
3. Définissez éventuellement un projet Linear, des étiquettes, un responsable et une priorité.
4. Consultez {{< ui >}}Data Sync Settings{{< /ui >}} pour examiner et mettre à jour le projet Work Management lié et les paramètres de synchronisation bidirectionnelle par champ.
5. Cliquez sur {{< ui >}}Create{{< /ui >}}.

**Remarques** :
- La synchronisation bidirectionnelle avec Linear est disponible pour les attributs de ticket tels que le statut, le responsable, le titre, la description, la priorité et les commentaires.
- Pour utiliser un ticket existant, fournissez l'URL du ticket Linear.
{{% /collapse-content %}}

### Gérer les tickets Work Management bidirectionnels {#manage-bidirectional-work-management-tickets}

**Remarque** : Pour obtenir de l'aide sur la résolution des problèmes de synchronisation bidirectionnelle, consultez [Work Management troubleshooting][24].

{{< tabs >}}

{{% tab "Jira" %}}

Les tickets Jira bidirectionnels existants sont répertoriés dans les sections {{< ui >}}Ticketing{{< /ui >}} ou {{< ui >}}Next Steps{{< /ui >}} du résultat.

Voici un exemple provenant d'un résultat d'analyse de code statique (SAST) :

{{< img src="security/bidir-jira-existing-1.png" alt="résultat avec un ticket Jira existant : dans la section Next Steps, sous Ticket Created, une pastille avec le logo Jira et le texte « CJT-16 »" responsive="true" style="width:100%;">}}

Survolez le ticket Jira pour voir ses détails.

{{< img src="security/bidir-jira-existing-hover-1.png" alt="État au survol de la souris pour la pastille dans l'image précédente. Fenêtre modale avec les détails du ticket Jira." responsive="true" style="width:100%;">}}

Des détails tels que le responsable et le statut sont fournis, ainsi qu'une chronologie des modifications du ticket Jira et du cas Datadog.

Les tickets Jira fermés sont verts.

Dans {{< ui >}}Datadog Associated Case{{< /ui >}}, le cas Datadog associé est fourni. Cliquez sur le nom du cas pour l'ouvrir dans [Work Management][1].

[1]: /fr/incident_response/work_management/
{{% /tab %}}

{{% tab "ServiceNow" %}}

Les tickets ServiceNow bidirectionnels existants sont répertoriés dans les sections {{< ui >}}Ticketing{{< /ui >}} ou {{< ui >}}Next Steps{{< /ui >}} du résultat.

{{< img src="security/bidir-servicenow-existing.png" alt="Résultat avec un ticket ServiceNow existant : dans la section Étapes suivantes, sous Suivi, une pastille « Voir l'incident ServiceNow »." responsive="true" style="width:100%;">}}

Survolez le ticket ServiceNow pour voir ses détails, y compris le statut et une chronologie des modifications synchronisées entre ServiceNow et Datadog.

{{< img src="security/bidir-servicenow-existing-hover.png" alt="Info-bulle sur une pastille de ticket ServiceNow affichant le numéro d'incident, le statut et une chronologie des modifications synchronisées entre ServiceNow et Datadog." responsive="true" style="width:100%;">}}

Dans {{< ui >}}Datadog Associated Case{{< /ui >}}, le cas Datadog associé est fourni. Cliquez sur le nom du cas pour l'ouvrir dans [Work Management][1].

[1]: /fr/incident_response/case_management/
{{% /tab %}}

{{% tab "Linear" %}}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">L'intégration de gestion des tickets Linear n'est pas disponible sur le {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

Les tickets Linear bidirectionnels existants sont répertoriés dans les sections {{< ui >}}Ticketing{{< /ui >}} ou {{< ui >}}Next Steps{{< /ui >}} du résultat.

{{< img src="security/bidir-linear-existing.png" alt="Résultat avec un ticket Linear existant dans la section Étapes Suivantes." responsive="true" style="width:100%;">}}

Survolez le ticket Linear pour voir ses détails, y compris le statut, le responsable et une chronologie des modifications synchronisées entre Linear et Datadog.

{{< img src="security/bidir-linear-existing-hover.png" alt="Info-bulle sur une pastille de ticket Linear affichant le statut du ticket, le responsable et une chronologie des modifications synchronisées entre Linear et Datadog." responsive="true" style="width:100%;">}}

Dans {{< ui >}}Datadog Associated Case{{< /ui >}}, le cas Datadog associé est fourni. Cliquez sur le nom du cas pour l'ouvrir dans [Work Management][1].

[1]: /fr/incident_response/work_management/
{{% /tab %}}

{{< /tabs >}}

#### Détachement automatique et ouverture/fermeture de ticket {#automatic-detachment-and-ticket-openingclosing}

L'archivage d'un cas ne supprime pas les tickets associés, mais la suppression d'un projet de cas détache tous les tickets des résultats Security associés.

Le détachement d'un ticket d'un résultat Security ne le supprime pas.

S'il ne reste aucun résultat ouvert attaché à un ticket (parce qu'ils sont tous détachés, résolus ou mis en sourdine), il est automatiquement fermé.
De même, si au moins un résultat ouvert est attaché à un ticket fermé (parce qu'il a été attaché, détecté à nouveau ou réactivé), il est automatiquement rouvert.

### Facettes de gestion du travail bidirectionnelles {#bidirectional-work-management-facets}

Il existe plusieurs facettes de gestion du travail sous {{< ui >}}Triage{{< /ui >}}, notamment :

- Clé de cas
- Clé Jira
- Statut Jira
- Clé de ticket Linear
- Statut Linear
- État du cas
- Possède un ticket associé

Vous pouvez interroger des attributs et créer des dashboards à l'aide de ces facettes.

## API d'intégration de gestion des tickets {#ticketing-integration-api}

Le lien entre les cas Datadog et les résultats Security existants peut être géré avec l'API publique.

Des endpoints dédiés permettent aux utilisateurs de [créer un cas Datadog pour des résultats de sécurité existants][15], [associer des résultats de sécurité à un cas Datadog existant][16] et [dissocier des résultats de sécurité de leur cas][17].

Les utilisateurs peuvent également [créer des tickets Jira pour des résultats de sécurité][18] et [associer des résultats de sécurité à un ticket Jira][19].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/incident_response/work_management/
[2]: /fr/integrations/jira/
[3]: /fr/incident_response/work_management/notifications_integrations/#third-party-tickets
[4]: https://app.datadoghq.com/security/siem/signals
[5]: https://app.datadoghq.com/security/code-security
[6]: https://app.datadoghq.com/security/appsec/signals
[7]: https://app.datadoghq.com/security/workload-protection/signals
[8]: /fr/integrations/jira/#configure-a-jira-webhook
[9]: /fr/incident_response/work_management/projects/
[10]: /fr/security/ticketing_integrations/#prerequisites
[11]: https://app.datadoghq.com/security/compliance
[12]: https://app.datadoghq.com/security/appsec/inventory/finding
[13]: https://app.datadoghq.com/security/workload-protection/findings
[14]: https://app.datadoghq.com/security/automation_pipelines/mute
[15]: /fr/api/latest/security-monitoring/#create-cases-for-security-findings
[16]: /fr/api/latest/security-monitoring/#attach-security-findings-to-a-case
[17]: /fr/api/latest/security-monitoring/#detach-security-findings-from-their-case
[18]: /fr/api/latest/security-monitoring/#create-jira-issues-for-security-findings
[19]: /fr/api/latest/security-monitoring/#attach-security-findings-to-a-jira-issue
[20]: /fr/security/ticketing_integrations/#supported-products
[21]: /fr/integrations/servicenow/
[22]: /fr/integrations/guide/servicenow-itom-itsm-setup/
[23]: /fr/integrations/linear/
[24]: /fr/incident_response/case_management/troubleshooting/
[30]: /fr/security/assignee_management/