---
aliases:
- /fr/security/cloud_siem/investigate_security_signals
disable_toc: false
further_reading:
- link: /cloud_siem/detection_rules/
  tag: Documentation
  text: En savoir plus sur la logique conditionnelle des règles de sécurité
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Surveiller 1Password avec Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026
  tag: Blog
  text: 'Nouveautés dans Cloud SIEM : enquêtes assistées par IA, renseignement sur
    les menaces amélioré et opérations de sécurité évolutives'
- link: /bits_ai/bits_security_analyst/
  tag: Documentation
  text: Bits Security Analyst
title: Enquêter sur les signaux de sécurité
---
## Présentation {#overview}

Un signal de sécurité Cloud SIEM est créé lorsque Datadog détecte une menace lors de l'analyse des logs par rapport aux règles de détection. Affichez, recherchez, filtrez et corrélez les signaux de sécurité dans le Signals Explorer sans avoir besoin d'apprendre un langage de requête dédié. Vous pouvez également vous attribuer des signaux de sécurité ou les attribuer à un autre utilisateur sur la plateforme Datadog. En plus du Signals Explorer, vous pouvez configurer des [Règles de notification][1] pour envoyer des signaux à des personnes ou des équipes spécifiques afin de les tenir informées des problèmes.

Vous devez disposer de l'autorisation `Security Signals Write` pour modifier un signal de sécurité, comme changer l'état et afficher l'historique des actions sur le signal dans [Audit Trail][2]. Consultez [Contrôle d'accès basé sur les rôles][3] pour plus d'informations sur les rôles par défaut de Datadog et les autorisations de contrôle d'accès basé sur les rôles granulaires disponibles pour Datadog Security dans Cloud Security.

Si vous souhaitez utiliser un agent IA autonome qui enquête sur les signaux de sécurité Cloud SIEM, consultez [Bits Security Analyst][14].

## Signals Explorer {#signals-explorer}

Dans le Signals Explorer, utilisez le panneau des facettes ou la barre de recherche pour regrouper et filtrer vos signaux. Par exemple, vous pouvez afficher les signaux par [leur sévérité](#view-signals-by-severity), [règles de détection](#view-signals-by-detection-rules) et [MITRE ATT&CK](#view-signals-by-mitre-attck). Une fois que vous avez filtré vos signaux selon votre cas d'utilisation, créez une [vue enregistrée][4] afin de pouvoir recharger votre requête ultérieurement.

### Afficher les signaux par sévérité {#view-signals-by-severity}

Pour afficher tous les signaux avec des sévérités spécifiques, par exemple `HIGH` et `CRITICAL`, qui sont dans l'état de triage `open` ou `under review`, effectuez l'une des opérations suivantes :

- Dans la section {{< ui >}}Severity{{< /ui >}} du panneau des facettes, sélectionnez {{< ui >}}Critical{{< /ui >}}, {{< ui >}}High{{< /ui >}} et {{< ui >}}Medium{{< /ui >}}. Dans la section {{< ui >}}Signal State{{< /ui >}}, assurez-vous que seuls {{< ui >}}open{{< /ui >}} et {{< ui >}}under_reviewed{{< /ui >}} sont sélectionnés.
- Dans la barre de recherche, saisissez `status:(high OR critical OR medium) @workflow.triage.state:(open OR under_review)`.

Pour ajouter la colonne {{< ui >}}Signal State{{< /ui >}}, sélectionnez le bouton {{< ui >}}Options{{< /ui >}} dans le coin supérieur droit au-dessus du tableau et ajoutez la facette : `@workflow.triage.state`. Cela affiche le statut du signal et vous permet de trier par statut via l'en-tête.

Utilisez différentes visualisations pour enquêter sur l'activité de menace dans votre environnement. Par exemple, dans le champ {{< ui >}}Visualize by{{< /ui >}}, vous pouvez regrouper les signaux par :

- {{< ui >}}Rules List{{< /ui >}} pour voir le volume et les tendances d'alerte à travers les différentes règles de détection.
- {{< ui >}}Timeseries{{< /ui >}} pour visualiser les tendances des signaux au fil du temps.
- {{< ui >}}Top List{{< /ui >}} pour voir les signaux avec le nombre d'occurrences le plus élevé au plus bas.
- {{< ui >}}Table{{< /ui >}} pour voir les signaux par la clé de tag spécifiée (par exemple, `source`, `technique`, et ainsi de suite).
- {{< ui >}}Pie Chart{{< /ui >}} pour voir le volume relatif de chacune des règles de détection.

{{< img src="security/security_monitoring/investigate_security_signals/signal_list2.png" alt="Le Signals Explorer affichant les signaux classés par règles de détection" style="width:100%;" >}}

### Afficher les signaux par règles de détection {#view-signals-by-detection-rules}

Pour afficher vos signaux basés sur les règles de détection, cliquez sur {{< ui >}}Rules List{{< /ui >}} dans le champ {{< ui >}}Visualize as{{< /ui >}} sous la barre de recherche. Cliquez sur une règle pour voir les signaux liés à cette règle. Cliquez sur un signal pour voir les détails du signal.

### Afficher les signaux par MITRE ATT&CK {#view-signals-by-mitre-attck}

Pour afficher vos signaux par tactique et technique MITRE ATT&CK :
1. Sélectionnez {{< ui >}}Table{{< /ui >}} dans le champ {{< ui >}}Visualize as{{< /ui >}} sous la barre de recherche, et groupez par {{< ui >}}Tactic{{< /ui >}}.
1. Cliquez sur l'icône plus à côté du premier groupe `by` pour ajouter un second groupe `by`, et sélectionnez {{< ui >}}Technique{{< /ui >}} pour celui-ci.
1. Dans le tableau, cliquez sur l'une des tactiques ou techniques pour voir les options permettant d'approfondir l'investigation et de filtrer les signaux. Par exemple, vous pouvez afficher les signaux liés à la tactique et à la technique et rechercher ou exclure des tactiques et techniques spécifiques.

{{< img src="security/security_monitoring/investigate_security_signals/tactics_techniques.png" alt="Le tableau du Signals Explorer affichant une liste de tactiques et de techniques" style="width:100%;" >}}

### Triez un signal unique {#triage-a-single-signal}

1. Dans Datadog, accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > [{{< ui >}}Signals{{< /ui >}}][5].
1. Cliquez sur un signal de sécurité dans le tableau.
1. Dans la section {{< ui >}}What Happened{{< /ui >}}, consultez les logs qui correspondent à la requête. Survolez la requête pour voir les détails de celle-ci.
    - Vous pouvez également voir des informations spécifiques comme le nom d'utilisateur ou l'adresse IP réseau. Dans {{< ui >}}Rule Details{{< /ui >}}, cliquez sur l'icône en forme d'entonnoir pour créer une règle de suppression ou ajouter les informations à une suppression existante. Consultez [Créer une règle de suppression][11] pour plus de détails.
1. Dans la section {{< ui >}}Next Steps{{< /ui >}} :
   1. Sous {{< ui >}}Triage{{< /ui >}}, cliquez sur le menu déroulant pour modifier le statut de triage du signal. Le statut par défaut est `OPEN`.
      - `Open` : Datadog Security a déclenché une détection basée sur une règle, et le signal résultant n'est pas encore résolu.
      - `Under Review` : Pendant une enquête active, modifiez le statut de triage à `Under Review`. Depuis l'état `Under Review`, vous pouvez faire passer le statut sur `Archived` ou `Open` selon vos besoins.
      - `Archived` : Lorsque la détection ayant causé le signal a été résolue, mettez à jour le statut sur `Archived`. Lorsqu'un signal est archivé, vous pouvez indiquer une raison et une description pour référence ultérieure. Si un problème archivé refait surface, ou si une enquête plus approfondie est nécessaire, le statut peut être rétabli sur `Open`. Tous les signaux sont verrouillés 30 jours après leur création.</ul>
   1. Cliquez sur {{< ui >}}Assign Signal{{< /ui >}} pour vous assigner un signal ou l'assigner à un autre utilisateur Datadog.
   1. Sous {{< ui >}}Take Action{{< /ui >}}, vous pouvez créer un cas, déclarer un incident, modifier des suppressions ou exécuter des workflows. La création d'un cas définit automatiquement le statut de triage sur `Under Review`. Pour plus d'informations sur l'association de cas aux signaux, consultez [Case Management](#case-management).

{{< img src="security/security_monitoring/investigate_security_signals/signal_side_panel.png" alt="Le panneau latéral de signal d'une clé d'accès utilisateur AWS IAM compromise affichant deux adresses IP et leurs emplacements" style="width:90%;" >}}

### Trier plusieurs signaux {#triage-multiple-signals}

Utilisez les actions groupées pour trier plusieurs signaux. Pour utiliser les actions groupées, recherchez et filtrez d'abord vos signaux dans le Signals Explorer, puis :

1. Cliquez sur la case à cocher à gauche des signaux sur lesquels vous souhaitez effectuer une action groupée. Pour sélectionner tous les signaux dans la liste du Signals Explorer, cochez la case à côté de l'en-tête de colonne {{< ui >}}Status{{< /ui >}}.
1. Cliquez sur le menu déroulant {{< ui >}}Bulk Actions{{< /ui >}} au-dessus du tableau des signaux et sélectionnez l'action que vous souhaitez effectuer.

**Remarque** : Le Signals Explorer cesse de se mettre à jour dynamiquement lors de l'exécution d'une action groupée.

{{< img src="security/security_monitoring/investigate_security_signals/bulk_actions2.png" alt="Le Signals Explorer affichant l'option d'action groupée" style="width:55%;" >}}

### Exécuter Workflow Automation {#run-workflow-automation}

Utilisez Workflow Automation pour effectuer des actions vous aidant à enquêter sur un signal et à y remédier. Ces actions peuvent inclure :
- Bloquer une adresse IP de votre environnement.
- Désactiver un compte utilisateur.
- Rechercher une adresse IP auprès d'un fournisseur de renseignements sur les menaces tiers.
- Envoyer des messages Slack à vos collègues pour obtenir de l'aide dans votre enquête.

Cliquez sur l'onglet {{< ui >}}Workflows{{< /ui >}} dans le panneau latéral du signal pour voir quels workflows ont été déclenchés pour le signal et les workflows suggérés à exécuter. Si vous souhaitez exécuter un workflow suggéré, cliquez sur {{< ui >}}Run Workflow{{< /ui >}}. Consultez [Comment les workflows suggérés sont sélectionnés](#how-suggested-workflows-are-selected) pour plus d'informations. Si le workflow nécessite des variables d'entrée supplémentaires, une boîte de dialogue apparaît et vous invite à saisir les valeurs requises avant de continuer.

Si vous ne voyez pas le workflow que vous souhaitez exécuter dans la liste, cliquez sur {{< ui >}}Search and Run Workflow{{< /ui >}}. Dans le navigateur de workflow, recherchez et sélectionnez un workflow à exécuter.

Alternativement, vous pouvez également sélectionner {{< ui >}}Run Workflows{{< /ui >}} dans la section {{< ui >}}Next Steps{{< /ui >}} pour rechercher et exécuter un workflow.

Pour déclencher automatiquement un workflow pour tout signal de sécurité, consultez [Déclencher un workflow à partir d'un signal de sécurité][8] et [Automatiser les workflows de sécurité avec Workflow Automation][9] pour plus d'informations.

#### Comment les workflows suggérés sont sélectionnés {#how-suggested-workflows-are-selected}

Pour rationaliser la réponse aux incidents et réduire les frictions lors du triage, Cloud SIEM suggère des workflows pertinents pour le signal. Les workflows suggérés sont sélectionnés en fonction de ceux qui présentent la plus grande similarité de tags avec le signal. Cloud SIEM utilise les informations suivantes pour suggérer des workflows pour un signal :

- **Tags ajoutés automatiquement à partir de Blueprints, qui sont des flux préconfigurés**<br>
Les workflows sont un ensemble d'actions pertinentes pour la plateforme, telles qu'AWS CloudTrail. Les workflows créés à partir d'un Blueprint se voient automatiquement appliquer des tags basés sur la source. Par exemple, une action de workflow telle que « Arrêter la machine virtuelle sur AWS » possède le tag `source` AWS CloudTrail.
- **Tags que vous avez ajoutés manuellement**<br>
Vous pouvez personnaliser les workflows prioritaires en ajoutant manuellement des tags aux workflows dérivés de Blueprints et aux workflows personnalisés. Pour garantir une correspondance contextuelle correcte, ces tags doivent correspondre à ceux trouvés sur le signal, aux logs ayant généré l'alerte ou à la règle de détection elle-même.
- **Stratégie de tagging**<br>
Pour garantir qu'un workflow apparaisse pour un signal donné, le workflow doit inclure des tags similaires à ceux du signal. Un tag de signal courant est la source ou le service du signal. Par exemple, les signaux provenant de ressources AWS sont généralement tagués avec `source:cloudtrail`. En taguant un workflow avec `source:cloudtrail`, le workflow est associé aux signaux liés à l'activité AWS.<br>
Si vous souhaitez qu'un workflow soit suggéré pour une règle de détection spécifique, ajoutez le tag avec l'ID de cette règle de détection (par exemple, `ruleId:abc-123-xyz`).

Lorsqu'un signal est créé :

- **Les signaux et les workflows sont mis en correspondance à l'aide de tags**<br>
Lorsqu'un signal de sécurité est créé, Cloud SIEM vérifie les tags du signal et les fait correspondre aux tags définis dans vos workflows existants.
- **Des suggestions pertinentes sont faites**<br>
Une section {{< ui >}}Suggested Workflows{{< /ui >}} apparaît dans le panneau latéral. Elle affiche les trois principaux workflows basés sur les tags qui correspondent le plus étroitement aux tags du signal. Cela garantit que les actions suggérées sont contextuelles et opérationnellement pertinentes.

## Investigate {#investigate}

Un signal contient des informations importantes pour déterminer si la menace détectée est malveillante. De plus, vous pouvez ajouter un signal à un cas dans [Case Management](#case-management) pour une enquête plus approfondie.

### Logs {#logs}

Cliquez sur l'onglet {{< ui >}}Logs{{< /ui >}} pour afficher les logs liés au signal. Cliquez sur {{< ui >}}View All Related Logs{{< /ui >}} pour voir les logs associés dans Log Explorer.

### Entités {#entities}

Pour enquêter sur les entités :

1. Cliquez sur l'onglet {{< ui >}}Entities{{< /ui >}} pour voir les entités liées au signal, telles que les utilisateurs ou les adresses IP.
1. Cliquez sur la flèche vers le bas à côté de {{< ui >}}View Related Logs{{< /ui >}} et :
    - Sélectionnez {{< ui >}}View IP Dashboard{{< /ui >}} pour voir plus d'informations sur l'adresse IP dans le dashboard d'investigation IP.
    - Sélectionnez {{< ui >}}View Related Signals{{< /ui >}} pour ouvrir le Signals Explorer et voir les autres signaux associés à l'adresse IP.
1. Pour les entités d'environnement cloud, telles qu'un rôle assumé ou un utilisateur IAM, affichez le graphique d'activité pour voir quelles autres actions l'utilisateur a effectuées. Cliquez sur {{< ui >}}View in Investigator{{< /ui >}} pour accéder à l'Investigator afin de voir plus de détails.

### Signaux associés {#related-signals}

Cliquez sur l'onglet {{< ui >}}Related Signals{{< /ui >}} pour voir les signaux et informations associés, tels que les champs et attributs, que les signaux partagent. Cliquez sur {{< ui >}}View All Related Activity{{< /ui >}} pour voir les signaux dans le Signals Explorer.

### Suppressions {#suppressions}

Pour afficher les règles de suppression de la règle de détection qui a généré le signal, effectuez l'une des opérations suivantes :

- Dans la section {{< ui >}}What Happened{{< /ui >}}, survolez l'icône en forme d'entonnoir avec votre souris, puis cliquez sur {{< ui >}}Add Suppression{{< /ui >}}.
- Dans la section {{< ui >}}Next Steps{{< /ui >}}, cliquez sur {{< ui >}}Edit Suppressions{{< /ui >}} pour voir la section de suppression de cette règle dans l'éditeur de règles de détection.
- Cliquez sur l'onglet {{< ui >}}Suppressions{{< /ui >}} pour voir une liste des suppressions, s'il y en a. Cliquez sur {{< ui >}}Edit Suppressions{{< /ui >}} pour accéder à l'éditeur de règles de détection afin de voir la section de suppression de cette règle.

## Collaborate {#collaborate}

### Case Management {#case-management}

Il est parfois nécessaire d'obtenir plus d'informations que ce qui est disponible dans un seul signal pour enquêter sur celui-ci. Utilisez [Case Management][6] pour collecter plusieurs signaux, créer des chronologies, discuter avec des collègues et tenir un notebook d'analyse et de conclusions.

#### Créer et gérer des cas depuis le Signals Explorer {#create-and-manage-cases-from-the-signals-explorer}

Dans le [Signals Explorer][5], lorsque vous utilisez la visualisation {{< ui >}}List{{< /ui >}}, la colonne {{< ui >}}Cases{{< /ui >}} contient des informations sur les cas associés aux signaux. Vous pouvez utiliser cette colonne pour gérer ces cas :
- Pour gérer les cas d'un seul signal, utilisez la colonne {{< ui >}}Cases{{< /ui >}} :
  - Si le signal a des cas associés, vous pouvez survoler l'ID du cas pour afficher des informations à leur sujet, les ouvrir dans une nouvelle fenêtre ou les dissocier du signal.
  - Si aucun cas n'est associé au signal, cliquez sur l'icône {{< ui >}}Create Case{{< /ui >}} pour créer un cas ou sélectionner un cas existant à associer au signal. La fenêtre Créer un cas s'ouvre.
    - Pour créer un cas, dans la fenêtre {{< ui >}}Create Case{{< /ui >}}, saisissez {{< ui >}}Project{{< /ui >}}, {{< ui >}}Title{{< /ui >}}, {{< ui >}}Description{{< /ui >}} et {{< ui >}}Assignee{{< /ui >}}, puis cliquez sur {{< ui >}}Create Case{{< /ui >}}.
    - Pour sélectionner un cas existant, dans la fenêtre {{< ui >}}Create Case{{< /ui >}}, cliquez sur l'onglet {{< ui >}}Add to Existing Case{{< /ui >}}. Sélectionnez un cas et cliquez sur {{< ui >}}Attach to an Existing Case{{< /ui >}}.
- Pour gérer les cas pour plusieurs signaux :
  1. Sélectionnez les signaux que vous souhaitez lier à un cas.
  1. Dans la liste {{< ui >}}Bulk Actions{{< /ui >}} qui s'affiche, cliquez sur {{< ui >}}Create a Case{{< /ui >}} ou {{< ui >}}Add to Existing Case{{< /ui >}}. La fenêtre Créer un cas s'ouvre.
     - Pour créer un cas, dans la fenêtre {{< ui >}}Create Case{{< /ui >}}, saisissez {{< ui >}}Project{{< /ui >}}, {{< ui >}}Title{{< /ui >}}, {{< ui >}}Description{{< /ui >}} et {{< ui >}}Assignee{{< /ui >}}, puis cliquez sur {{< ui >}}Create Case{{< /ui >}}.
     - Pour sélectionner un cas existant, dans la fenêtre {{< ui >}}Create Case{{< /ui >}}, cliquez sur l'onglet {{< ui >}}Add to Existing Case{{< /ui >}}. Sélectionnez un cas et cliquez sur {{< ui >}}Attach to an Existing Case{{< /ui >}}.

Lorsqu'un utilisateur crée un cas, les modifications automatiques suivantes s'appliquent par défaut :
- Le statut de triage est automatiquement défini sur `Under Review`.
- Le responsable est défini sur cet utilisateur.

Pour modifier ces paramètres par défaut, consultez [Gérer le comportement par défaut des signaux et des cas de sécurité](#manage-default-behavior-for-signals-and-security-cases).

**Remarque** : Si un cas est jugé critique après une enquête plus approfondie, cliquez sur {{< ui >}}Declare Incident{{< /ui >}} dans le cas pour l'escalader en incident.

#### Gérer les cas liés à la sécurité {#manage-security-related-cases}

La page [Cases][12] vous permet de visualiser les cas spécifiques à vos projets de sécurité. Vous pouvez filtrer les cas afin de ne voir que ceux qui vous sont assignés ou que vous avez créés, ou les cas ayant un statut spécifique ou appartenant à un projet spécifique. Vous pouvez également ajouter des projets aux favoris pour faciliter la navigation.

Dans la section {{< ui >}}Security Signals{{< /ui >}} d'un cas, vous pouvez visualiser les signaux qui y sont associés et cliquer sur {{< ui >}}Add Signals{{< /ui >}} pour rechercher des filtres à associer au cas.

#### Gérer le comportement par défaut des signaux et des cas de sécurité {#manage-default-behavior-for-signals-and-security-cases}

Sur la page des paramètres [Security cases][13] de Cloud SIEM, vous pouvez gérer le comportement par défaut des signaux et des cas de sécurité, afin de gagner du temps lorsque vous connectez manuellement ou automatiquement des signaux et des cas de sécurité entre eux. Les paramètres que vous choisissez prennent effet immédiatement pour tous les signaux et cas de sécurité à venir ; ils n'ont aucun effet rétroactif.

- **Case Project Settings**

  Sélectionnez votre projet de cas de sécurité Cloud SIEM par défaut, ainsi que d'autres projets de sécurité parmi lesquels choisir :
  - **Default SIEM Security Case Project** : Sélectionnez le projet qui apparaîtra par défaut lorsque vous connecterez des cas de sécurité à un projet. Ce projet apparaît également comme projet par défaut sur la page [Cases][12] de Cloud SIEM.
  - **Security Case project scoping** : Sélectionnez jusqu'à 20 projets de cas de sécurité parmi lesquels vous pouvez choisir pour connecter des cas de sécurité.

- **Case Creation Defaults**

  Lorsque vous créez un cas à partir d'un ou plusieurs signaux, vous pouvez choisir d'utiliser les valeurs du signal pour le cas, de laisser les valeurs vides ou de leur attribuer des valeurs statiques, selon le champ du cas.
  <div class="alert alert-tip">Cliquez sur <strong>Show signal to case correlation scheme</strong> pour voir comment Datadog mappe le statut du signal au statut du cas, et la sévérité du signal à la priorité du cas.</div>

- **Signal Attachment Settings**

  Lorsque vous joignez des signaux à un cas, sélectionnez les valeurs par défaut à attribuer à ces signaux.
  <div class="alert alert-tip">Cliquez sur <strong>Show case to signal archive reason mapping</strong> pour voir comment Datadog mappe la raison de résolution du cas à la raison d'archivage du signal.</div>

  - **Lors de la jointure à un cas** :
    - **Statut du signal** et **Responsable du signal** : Lorsque vous joignez des signaux à un cas, choisissez soit de conserver le statut et le responsable du signal, soit de leur attribuer des valeurs spécifiques.
    - **Allow Override** : Activez ce commutateur pour permettre le remplacement des valeurs existantes dans ces champs. Si ce commutateur est désactivé, le statut et le responsable sélectionnés ne s'appliquent que lorsque ces champs sont vides.
  - **Lors de la mise à jour d'un cas** :
    - **Statut du signal** : Choisissez soit d'attribuer au signal un statut correspondant à celui du cas, soit de le laisser tel quel.

### Déclarer un incident {#declare-an-incident}

Qu'il soit basé sur un seul signal ou suite à l'investigation d'un cas, certaines activités malveillantes exigent une réponse. Vous pouvez déclarer des incidents dans Datadog pour réunir les équipes de développement, d'exploitation et de sécurité afin de traiter un événement de sécurité critique. [Incident Management][7] fournit un cadre et un workflow pour aider les équipes à identifier et à atténuer efficacement les incidents.

Pour déclarer un incident dans le panneau de signaux :

1. Cliquez sur {{< ui >}}Declare Incident{{< /ui >}} dans la section {{< ui >}}Next Steps{{< /ui >}}.
1. Remplissez le modèle d'incident.

Si vous souhaitez ajouter le signal à un incident, cliquez sur la flèche vers le bas à côté de {{< ui >}}Declare Incident{{< /ui >}} et sélectionnez l'incident auquel vous souhaitez ajouter le signal. Cliquez sur {{< ui >}}Confirm{{< /ui >}}.

### Renseignement sur les menaces {#threat-intelligence}

Datadog Cloud SIEM propose un renseignement sur les menaces intégré, fourni par nos partenaires en renseignement sur les menaces. Ces flux sont constamment mis à jour pour inclure des données sur les activités suspectes connues (par exemple, les adresses IP connues pour être utilisées par des acteurs malveillants), afin que vous puissiez identifier rapidement les menaces potentielles à traiter.

Datadog enrichit automatiquement tous les logs ingérés avec des indicateurs de compromission (IOCs) provenant de ses flux de renseignement sur les menaces. Si un log contient une correspondance avec un IOC connu, un attribut `threat_intel` est ajouté à l'événement de log pour fournir des informations supplémentaires basées sur le renseignement disponible.

La requête pour voir toutes les correspondances de renseignement sur les menaces dans le Security Signals Explorer est `@threat_intel.indicators_matched:*`. Voici des attributs supplémentaires pour interroger le renseignement sur les menaces :

- Pour `@threat_intel.results.category` : attack, corp_vpn, cryptomining, malware, residential_proxy, tor, scanner
- Pour `@threat_intel.results.intention` : malicious, suspicious, benign, unknown

{{< img src="security/security_monitoring/investigate_security_signals/threat_intel_results_categories.png" alt="Le Signals Explorer affichant un graphique à barres des signaux ventilés par catégories de renseignement sur les menaces : residential proxy, corp_vpn, cryptomining et malware" style="width:80%;" >}}

Consultez la documentation [Threat Intelligence][10] pour plus d'informations sur les flux de renseignement sur les menaces.

### Rechercher par attributs IP réseau {#search-by-network-ip-attributes}

Lorsqu'une activité suspecte est détectée à partir de vos logs, déterminez si l'acteur suspect a interagi avec vos systèmes en recherchant son IP réseau. Utilisez la requête suivante pour effectuer une recherche par attributs IP dans le Log Explorer : `@network.ip.list:<IP address>`. La requête recherche les adresses IP n'importe où dans les logs, y compris dans les champs des tags, des attributs, des erreurs et des messages.

Vous pouvez également lancer cette requête directement depuis le panneau des signaux :
1. Cliquez sur l'adresse IP dans la section {{< ui >}}IPS{{< /ui >}}.
2. Sélectionnez {{< ui >}}View Logs with @network.client.ip:<ip_address>{{< /ui >}}.

{{< img src="security/security_monitoring/investigate_security_signals/search_logs_by_ip.png" alt="Le panneau des signaux affichant les options de menace pour l'adresse IP sélectionnée" style="width:90%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/notifications/rules/
[2]: /fr/account_management/audit_trail/events/#cloud-security-platform-events
[3]: /fr/account_management/rbac/
[4]: /fr/logs/explorer/saved_views/
[5]: https://app.datadoghq.com/security/siem/signals
[6]: /fr/incident_response/work_management/
[7]: /fr/incident_response/incident_management/
[8]: /fr/actions/workflows/trigger/#trigger-a-workflow-from-a-security-signal
[9]: /fr/security/cloud_security_management/workflows/
[10]: /fr/security/threat_intelligence
[11]: /fr/security/suppressions/#create-a-suppression-rule
[12]: https://app.datadoghq.com/security/siem/cases
[13]: https://app.datadoghq.com/security/configuration/siem/case-management
[14]: /fr/bits_ai/bits_security_analyst/