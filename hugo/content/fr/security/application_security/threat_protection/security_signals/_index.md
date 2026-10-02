---
aliases:
- /fr/security/application_security/security_signals/
- /fr/security/application_security/threats/security_signals
further_reading:
- link: /security/default_rules/?category=cat-application-security#cat-application-security
  tag: Documentation
  text: Explorer les règles de détection des menaces AAP prêtes à l'emploi
- link: /security/application_security/threat_protection/policies/custom_rules/
  tag: Documentation
  text: Configurer des règles personnalisées de détection des menaces AAP
- link: /security/application_security/how-it-works/threat-intelligence/
  tag: Documentation
  text: Intelligence sur les menaces AAP
title: Enquêter sur les signaux de sécurité
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}

## Vue d'ensemble {#overview}

Les signaux de sécurité AAP sont créés lorsque Datadog détecte une menace basée sur une règle de détection. Affichez, recherchez, filtrez et examinez les signaux de sécurité dans [Signals Explorer][2], ou configurez des [Règles de notification][8] pour envoyer des signaux à des outils tiers.

<!-- {{< img src="security/application_security/threats/security_signals/appsec-threat-signals.png" alt="Présentation de l'analyse des menaces dans Signals Explorer avec le panneau latéral des détails">}} -->

## Colonnes de Signals Explorer {#signals-explorer-columns}

Signals Explorer affiche les colonnes suivantes.

{{< ui >}}Severity{{< /ui >}}
: Il existe cinq niveaux de gravité: {{< ui >}}Info{{< /ui >}}, {{< ui >}}Low{{< /ui >}}, {{< ui >}}Medium{{< /ui >}}, {{< ui >}}High{{< /ui >}} et {{< ui >}}Critical{{< /ui >}}. {{< ui >}}High{{< /ui >}} et {{< ui >}}Critical{{< /ui >}} indiquent un impact majeur sur la disponibilité du service ou une compromission active.

{{< ui >}}Title{{< /ui >}}
: Le nom du signal. Les titres peuvent être mis à jour lorsque de nouvelles données sont corrélées, modifiant ainsi l'impact évalué de l'attaque.

{{< ui >}}Service/Env{{< /ui >}}
: Le service et l'environnement identifiés dans l'attaque. Survolez le nom du service pour accéder à la page du service et au dépôt de code, et pour voir qui est d'astreinte pour ce service.

{{< ui >}}Entities{{< /ui >}}
: Les attaquants et les victimes d'une attaque. Les attaquants sont identifiés par des adresses IP. Les victimes sont identifiées en tant qu'utilisateurs authentifiés. Survolez la liste IP, puis cliquez sur une IP pour voir des détails tels que {{< ui >}}Threat Intelligence{{< /ui >}} et {{< ui >}}Security Activity{{< /ui >}}.

{{< ui >}}Triage State{{< /ui >}}
: Vous pouvez assigner un responsable et définir un état de tri pour le signal. Les états disponibles sont {{< ui >}}Open{{< /ui >}}, {{< ui >}}Under Review{{< /ui >}} et {{< ui >}}Archived{{< /ui >}}.

{{< ui >}}Creation Date{{< /ui >}}
 : La date à laquelle le signal a été créé pour la première fois. Les signaux sont triés par date par défaut.

## Filtrer les signaux de sécurité {#filter-security-signals}

Pour filtrer les signaux de sécurité dans [Signals Explorer][2], utilisez la requête de recherche `@workflow.triage.state:<status>`, où `<status>` est l'état sur lequel vous souhaitez filtrer (`open`, `under_review` ou `archived`). Vous pouvez également utiliser la facette {{< ui >}}Signal State{{< /ui >}} dans le panneau des facettes.

## Trier un signal {#triage-a-signal}

Vous pouvez trier un signal en l'attribuant à un utilisateur pour une enquête plus approfondie. L'utilisateur assigné peut ensuite suivre son examen en mettant à jour le statut du signal.

1. Sur la page [Signals Explorer][2], cliquez sur l'icône de profil utilisateur dans la colonne {{< ui >}}Triage State{{< /ui >}}.
2. Sélectionnez un utilisateur pour assigner le signal.
3. Pour mettre à jour le statut du signal de sécurité, cliquez sur le menu déroulant du statut de tri et sélectionnez un statut. Le statut par défaut est {{< ui >}}Open{{< /ui >}}.
    - {{< ui >}}Open{{< /ui >}} : Le signal n'a pas encore été résolu.
    - {{< ui >}}Under Review{{< /ui >}} : Le signal fait l'objet d'une enquête active. Depuis l'état {{< ui >}}Under Review{{< /ui >}}, vous pouvez faire passer le signal à {{< ui >}}Archived{{< /ui >}} ou {{< ui >}}Open{{< /ui >}} selon vos besoins.
    - {{< ui >}}Archived{{< /ui >}} : La détection à l'origine du signal a été résolue. Depuis l'état {{< ui >}}Archived{{< /ui >}}, vous pouvez ramener le signal à {{< ui >}}Open{{< /ui >}} s'il se situe dans les 30 jours suivant la détection initiale du signal.

**Remarque** : Pour modifier les signaux de sécurité, vous devez disposer de l'autorisation `security_monitoring_signals_write`. Consultez [Role Based Access Control][9] pour plus d'informations sur les rôles par défaut de Datadog et les autorisations de contrôle d'accès basé sur les rôles granulaires disponibles pour App and API Protection.

## Déclarer un incident {#declare-an-incident}

Utilisez [Incident Management][4] pour créer un incident pour un signal de sécurité.

Déclarez un incident si :

- Un problème impacte ou pourrait impacter les clients.
- Vous estimez qu'un problème (même s'il est interne) doit être traité en urgence.

Si vous ne savez pas si vous devez déclarer un incident, informez les autres utilisateurs et augmentez la gravité de manière appropriée.

1. Sur la page [Signals Explorer][2], sélectionnez un signal de sécurité pour ouvrir son panneau de détails.
2. Sur le panneau du signal, cliquez sur {{< ui >}}Declare Incident{{< /ui >}} ou sélectionnez la flèche du menu déroulant et choisissez {{< ui >}}Add to an existing incident{{< /ui >}}.
3. Lorsque vous déclarez un nouvel incident, dans les paramètres {{< ui >}}Declare Incident{{< /ui >}}, configurez l'incident en précisant des détails tels que le niveau de gravité et le responsable de l'incident.
   1. Estimez l'impact. Les niveaux de gravité vont de SEV-1 (critique) à SEV-5 (impact mineur). En cas de doute, choisissez toujours la gravité la plus élevée.
4. Cliquez sur {{< ui >}}Declare Incident{{< /ui >}}.

## Exécutez un workflow {#run-a-workflow}

Utilisez [Workflow Automation][5] pour déclencher manuellement un workflow pour un signal de sécurité.

1. Assurez-vous que le workflow que vous souhaitez exécuter dispose d'un déclencheur de sécurité.
2. Sur la page [Signals Explorer][2], ouvrez un signal de sécurité.
3. Dans la section {{< ui >}}Respond{{< /ui >}}, cliquez sur {{< ui >}}Run Workflow{{< /ui >}}.
4. Dans {{< ui >}}Run a workflow{{< /ui >}}, sélectionnez le workflow que vous souhaitez exécuter ou cliquez sur {{< ui >}}New Workflow{{< /ui >}}.
   - Selon le workflow que vous sélectionnez, il se peut que vous deviez saisir des paramètres d'entrée supplémentaires.
   - Si vous avez sélectionné {{< ui >}}New Workflow{{< /ui >}}, la fenêtre Run a Security Workflow s'ouvre. Pour en savoir plus sur les workflows, consultez [Workflow Automation][5].
5. Cliquez sur {{< ui >}}Run{{< /ui >}}.

## Examinez et corrigez {#review-and-remediate}

1. Sur la page [Signals Explorer][2], ouvrez un signal de sécurité.
2. Dans les détails du signal, affichez chacune des sections, telles que {{< ui >}}What Happened{{< /ui >}}, {{< ui >}}Activity Summary{{< /ui >}} et {{< ui >}}Detection Rule{{< /ui >}}.
3. Examinez {{< ui >}}Next Steps{{< /ui >}} et prenez des mesures :
    -  Cliquez sur {{< ui >}}Block all Attacking IPs{{< /ui >}} (pour une durée spécifique ou de façon permanente).
    -  Cliquez sur {{< ui >}}Automated Attacker Blocking{{< /ui >}} (basé sur les règles de [détection][10]). Ce paramètre nécessite l'autorisation `Protect Write` App and API Protection.
    -  Cliquez sur [{{< ui >}}Block with Edge WAF{{< /ui >}}][11].

## Actions groupées {#bulk-actions}

Lorsque vous sélectionnez un ou plusieurs signaux, vous pouvez utiliser {{< ui >}}Bulk Actions{{< /ui >}} pour effectuer les opérations suivantes.

### Définir l'état {#set-state}

Définissez l'état de triage sur {{< ui >}}Open{{< /ui >}}, {{< ui >}}Under Review{{< /ui >}} ou {{< ui >}}Archived{{< /ui >}}.

### Attribuer le signal aux utilisateurs {#assign-the-signal-to-users}

Sélectionnez {{< ui >}}Assign selection{{< /ui >}}, puis sélectionnez le ou les utilisateurs à attribuer au signal.

Sélectionnez {{< ui >}}Remove all assignments{{< /ui >}} pour réinitialiser l'affectation du signal sur aucun.

### Gestion des cas {#case-management}

Datadog [Case Management][6] offre un emplacement centralisé pour trier, suivre et résoudre les problèmes détectés par Datadog et les intégrations tierces.

1. Sur la page [Signals Explorer][2], sélectionnez un signal de sécurité.
2. Dans {{< ui >}}Bulk Actions{{< /ui >}}, sélectionnez {{< ui >}}Create a case{{< /ui >}}.
3. Sélectionnez {{< ui >}}Create a case{{< /ui >}} ou {{< ui >}}Add to an existing case{{< /ui >}} pour ajouter le signal à un cas existant.
4. Saisissez un titre et une description facultative.
5. Cliquez sur {{< ui >}}Create Case{{< /ui >}}.

Lorsque vous cliquez sur {{< ui >}}Create Case{{< /ui >}}, vous êtes redirigé vers Case Management et le projet que vous avez sélectionné.

## Vues enregistrées {#saved-views}

Vous pouvez enregistrer différentes configurations de Signals Explorer en tant que vues. Par exemple, vous pouvez filtrer l'Explorer pour afficher tous les signaux non affectés, puis enregistrer cela en tant que vue.

Lorsqu'une configuration est enregistrée en tant que vue, vous et vos collaborateurs pouvez l'utiliser ultérieurement.

Une vue contient les sélections actuelles de l'Explorer pour :

- Heure et requête :
- Colonnes affichées et tri :
- Paramètres d'agrégation analytique :
- Visibilité de la chronologie :
- Facettes affichées :
- Agrégé par règle de détection :

1. Pour enregistrer une vue, configurez l'Explorer afin d'afficher la vue souhaitée, puis cliquez sur {{< ui >}}Save{{< /ui >}}.
2. Saisissez un nom pour la vue, puis sélectionnez les équipes avec lesquelles vous souhaitez partager cette vue.
3. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Pour voir toutes les vues enregistrées, cliquez sur {{< ui >}}Views{{< /ui >}} à côté du titre de la page {{< ui >}}Signals Explorer{{< /ui >}}.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/services?lens=Security
[2]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&viz=stream&start=1694726477747&end=1695331277747&paused=false
[4]: /fr/incident_response/incident_management/
[5]: /fr/actions/workflows/
[6]: /fr/incident_response/work_management/
[7]: https://app.datadoghq.com/security/appsec?
[8]: /fr/security/notifications/rules/
[9]: /fr/account_management/rbac/permissions/#cloud-security-platform
[10]: /fr/security/application_security/threat_protection/policies/#respond-to-threats-in-real-time-by-automating-attacker-blocking
[11]: /fr/security/application_security/threat_protection/policies/#blocking-attack-attempts-with-in-app-waf