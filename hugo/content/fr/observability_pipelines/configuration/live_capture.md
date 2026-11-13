---
aliases:
- /fr/observability_pipelines/live_capture/
description: Apprenez à utiliser Live Capture pour voir les données qu'une source
  reçoit et les données qu'un processeur envoie via un pipeline Observability Pipelines.
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: Documentation
  text: Configurez des pipelines
- link: https://www.datadoghq.com/blog/observability-pipelines-google-secops/
  tag: Blog
  text: Normalisez les logs de sécurité vers Google SecOps UDM avec Observability
    Pipelines.
- link: https://www.datadoghq.com/blog/mitre-attack-enrichment-packs-observability-pipelines/
  tag: Blog
  text: Enrichissez automatiquement les logs de sécurité avec le contexte MITRE ATT&CK
    avant qu'ils n'atteignent votre SIEM
products:
- icon: logs
  name: Logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
- icon: metrics
  name: Métriques
  url: /observability_pipelines/configuration/?tab=metrics#pipeline-types
title: Live Capture
---
{{< product-availability >}}

## Présentation {#overview}

Utilisez Live Capture pour voir les données qu'une source envoie via le pipeline ainsi que les données qu'un processeur reçoit et envoie.
Plus précisément, les informations suivantes sont affichées :
- L'horodatage du moment où les données ont été reçues
- Les données qui ont été envoyées et si elles ont été :
    - Modifié
    - Non modifiées
    - Supprimées
    - Réduites

Un exemple de Live Capture montrant le champ `message` du log avant et après son traitement par le processeur Parse JSON.

{{< img src="observability_pipelines/live_capture_parse_json.png" alt="La colonne d'entrée affiche les valeurs du champ de message d'origine et la colonne de sortie affiche les valeurs analysées en tant que JSON" style="width:100%;" >}}

## Autorisations {#permissions}

Seuls les utilisateurs disposant de l'autorisation `Observability Pipelines Live Capture Write` peuvent configurer des captures. Les utilisateurs disposant de l'autorisation `Observability Pipelines Live Capture Read` peuvent uniquement consulter les événements qui ont déjà été capturés. Consultez [Observability Pipelines Permissions][1] pour obtenir la liste des autorisations relatives aux ressources Observability Pipelines.

Les administrateurs disposent par défaut des autorisations de lecture et d'écriture. Les utilisateurs standard disposent par défaut uniquement de l'autorisation de lecture. Consultez [Access Control][2] pour plus d'informations sur les rôles Datadog par défaut et sur la façon de créer des rôles personnalisés.

### Ajouter des domaines à la liste d'autorisation du pare-feu {#add-domains-to-firewall-allowlist}

Si vous souhaitez utiliser Live Capture et que vous utilisez un pare-feu, vous devez ajouter ces domaines à la liste d'autorisation :

- `api.{{< region-param key="dd_site" >}}`
- `obpipeline-intake.{{< region-param key="dd_site" >}}`
- `config.{{< region-param key="dd_site" >}}`

## Capturer des événements {#capture-events}

1. Accédez à [Observability Pipelines][3].
1. Sélectionnez votre pipeline.
1. Cliquez sur la roue dentée correspondant à la source ou au processeur pour lequel vous souhaitez capturer des événements.
1. Sélectionnez {{< ui >}}Capture and view events{{< /ui >}} dans le panneau latéral.
1. Cliquez sur {{< ui >}}Capture{{< /ui >}}.
1. **Configurations facultatives** :
  {{< img src="observability_pipelines/live_capture_optional_config.png" alt="La fenêtre modale de configuration facultative de Live Capture affichant la requête de filtre, la durée de capture et les options de sélection des Workers" style="width:60%;" >}}
  **Remarque** : Les configurations facultatives ne sont disponibles que si tous les Workers actifs sont en version 2.13 ou ultérieure.
    1. Saisissez une requête pour spécifier les événements que vous souhaitez capturer. Pour plus d'informations, consultez [Syntaxe de recherche pour les logs][4] ou [Syntaxe de recherche pour les métriques][5].
    1. Saisissez une durée de capture (en secondes ou en minutes) pour définir la durée pendant laquelle vous souhaitez capturer les événements.
        - Durée minimale (par défaut si aucune durée n'est spécifiée) : 30 secondes
        - Durée maximale : 300 secondes (5 minutes)
    1. Sélectionnez les Workers à partir desquels vous souhaitez capturer des événements. Si aucun Worker n'est sélectionné, un Worker aléatoire est choisi.
1. Cliquez sur {{< ui >}}Capture{{< /ui >}} pour commencer à capturer les événements.<br>**Remarque** : Il peut s'écouler jusqu'à 60 secondes avant que les événements capturés n'apparaissent dans l'interface utilisateur. Les données capturées sont visibles par tous les utilisateurs disposant d'un accès en lecture et sont stockées sur la plateforme Datadog pendant 72 heures.
1. Une fois la capture terminée :
    1. Cliquez sur un événement capturé spécifique pour voir les données reçues et envoyées. Vous pouvez également rechercher des événements spécifiques dans la barre de recherche. Utilisez le menu déroulant à côté de la barre de recherche pour afficher les événements en fonction de leur statut (`MODIFIED`, `UNMODIFIED`, `DROPPED` et `REDUCED`).
    1. Dans la section {{< ui >}}Workers - Capture Execution Details{{< /ui >}}, cliquez sur {{< ui >}}View Logs{{< /ui >}} pour voir les logs du Worker pour la capture.
1. Pour voir d'autres captures pour le même composant, cliquez sur {{< ui >}}Captures{{< /ui >}} en haut à gauche du panneau latéral. **Remarque** : La visualisation d'autres captures ne s'applique que si tous les Workers actifs sont en version 2.13 ou ultérieure.
   - Vous pouvez filtrer les captures par ID d'événement de capture, requête de filtre, version de pipeline ou statut (`in_progress` ou `completed`).
   - Pour la colonne {{< ui >}}Total Events{{< /ui >}}, le nombre maximal d'événements capturés par Worker est de 200, en incluant à la fois l'entrée et la sortie d'un événement.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/permissions/#observability-pipelines
[2]: /fr/account_management/rbac/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /fr/observability_pipelines/search_syntax/logs
[5]: /fr/observability_pipelines/search_syntax/metrics