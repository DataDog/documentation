---
description: Découvrez comment fonctionne la méthode de détection de séquence.
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: Blog
  text: 'Datadog Cloud SIEM : stimuler l''innovation dans les opérations de sécurité'
title: Séquence
---
## Présentation {#overview}

La méthode de séquence vous permet de détecter des attaques en plusieurs phases en identifiant des modèles ordonnés d'événements liés, tels que l'accès initial, l'élévation de privilèges et l'exfiltration de données.

Vous pouvez définir une séquence d'étapes qui doivent se produire dans un laps de temps défini et à travers des entités liées, telles qu'un utilisateur, un host ou une adresse IP. Chaque séquence peut combiner des conditions provenant de plusieurs logs ou signaux pour identifier une activité coordonnée qui pourrait être manquée par des règles individuelles.

Voir [Créer une règle][1] pour obtenir des instructions sur la façon de configurer une règle de séquence.

{{< img src="security/security_monitoring/detection_rules/sequence/preview.png" alt="Page de l'éditeur de séquence montrant un aperçu des étapes" style="width:100%;" >}}

## Comment fonctionne la méthode de séquence {#how-the-sequence-method-works}

### Logique de détection {#detection-logic}

{{< img src="security/security_monitoring/detection_rules/sequence/steps.png" alt="Page de l'éditeur de séquence montrant trois étapes" style="width:100%;" >}}

La détection de séquence évalue une série définie d'étapes qui représentent des phases distinctes de comportement suspect. Chaque étape correspond à :

- Une condition telle qu'un seuil sur une requête de log ou une correspondance de signal
- Des transitions qui définissent l'ordre et les contraintes temporelles entre les étapes

La règle est déclenchée lorsque toutes les étapes se produisent dans l'ordre spécifié et dans les fenêtres temporelles configurées.

### Liaison d'entités {#linking-entities}

{{< img src="security/security_monitoring/detection_rules/sequence/linked_entities.png" alt="Page de l'éditeur de séquence montrant une étape avec le champ de regroupement mis en évidence" style="width:100%;" >}}

La séquence d'étapes peut être corrélée entre les utilisateurs, les comptes, les adresses IP et d'autres champs pour suivre automatiquement les entités liées via des champs `group by`. Cela vous permet de suivre le chemin d'un attaquant à travers différentes identités et systèmes.

### Fenêtre d'évaluation {#evaluation-window}

{{< img src="security/security_monitoring/detection_rules/sequence/evaluation_window.png" alt="Page de l'éditeur de séquence montrant la fenêtre d'évaluation en surbrillance" style="width:100%;" >}}

Chaque transition entre les étapes dispose d'une fenêtre d'évaluation configurable qui détermine combien de temps la règle attend que l'étape suivante se produise. Par exemple, une règle peut se déclencher lorsque `user login from an unusual location` est suivi dans les 20 minutes par un `privilege escalation`, où l'utilisateur peut être passé d'un rôle standard à un rôle d'administrateur.

## Options de configuration {#configuration-options}

Lorsque vous [créez une règle de détection de séquence][1], vous pouvez configurer ces options :

| Paramètre | Description | Impact |
|---------|-------------|--------|
| {{< ui >}}Data type{{< /ui >}} | Spécifiez si chaque requête évalue des logs, des signaux ou des règles. | Définit les sources de données pour la détection. |
| {{< ui >}}Steps{{< /ui >}} | Définissez chaque condition de détection, y compris la requête et le seuil. | Détermine quels comportements sont surveillés. |
| {{< ui >}}Step transitions{{< /ui >}} | Définissez l'ordre et la relation temporelle entre les étapes. | Contrôle le moment où une séquence est qualifiée pour un signal. |
| {{< ui >}}Evaluation window{{< /ui >}} | Après qu'une étape s'est produite, le temps (en secondes) à attendre pour l'étape suivante. | Des fenêtres plus grandes augmentent la couverture de détection, mais peuvent entraîner plus de bruit. |
| {{< ui >}}Group by fields{{< /ui >}} | Champs utilisés pour lier l'activité entre les étapes (par exemple, `@usr.email`, `@ip`). | Détermine comment les entités sont corrélées entre les requêtes. |

## Limites {#limits}

- La détection de séquence prend en charge jusqu'à 10 étapes par règle et une fenêtre d'évaluation totale de 24 heures.
- Les étapes doivent être dans une séquence linéaire.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=sequence