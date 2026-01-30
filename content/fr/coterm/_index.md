---
description: Datadog CoTerm est un utilitaire CLI qui peut enregistrer les sessions
  de terminal et ajouter une couche de validation à vos commandes de terminal.
further_reading:
- link: https://www.datadoghq.com/blog/introducing-coterm/
  tag: Blog
  text: Diffuser en direct, enregistrer et journaliser les sessions de terminal avec
    Datadog CoTerm
title: Datadog CoTerm
---

Datadog CoTerm est un utilitaire CLI qui permet d'enregistrer les sessions de terminal et d'ajouter une couche de validation à vos commandes de terminal.

{{< img src="coterm/hero.png" alt="Dans Datadog, une page intitulée Terminal Session. Une vidéo intégrée montrant une session de terminal. Une barre de défilement contrôle la lecture de la vidéo." style="width:100%;" >}}

Avec CoTerm, vous pouvez :

- **Enregistrer des sessions de terminal et analyser ces enregistrements dans Datadog**. 

   L'examen des sessions de terminal fournit un contexte sur la manière dont les incidents système et de sécurité ont été causés et résolus.
- **Protéger contre l'exécution accidentelle de commandes de terminal dangereuses**.

   CoTerm peut intercepter les commandes de terminal et vous avertir avant d'exécuter une commande risquée. Pour une surveillance encore plus importante, vous pouvez utiliser CoTerm avec la [gestion des cas Datadog][3] pour exiger des approbations pour les commandes particulièrement impactantes.

Pour votre sécurité, CoTerm utilise [Sensitive Data Scanner][2] pour détecter et masquer les données sensibles, telles que les mots de passe et les clés d'API.

## Prise en main

{{< whatsnext desc=Cette section contient les pages suivantes :">}}
  {{< nextlink href="/coterm/install">}}<u>Installation</u>: installer CoTerm et l'autoriser à accéder à votre compte Datadog.{{< /nextlink >}}
  {{< nextlink href="/coterm/usage">}}<u>Usage</u>: utiliser la CLI CoTerm, configurer l'enregistrement automatique et se protéger contre les commandes dangereuses. {{< /nextlink >}}
  {{< nextlink href="/coterm/rules">}}<u>Règles de configuration</u>: définir des règles hautement configurables pour la manière dont CoTerm gère des commandes spécifiques.{{< /nextlink >}}
{{< /whatsnext >}}

## Consulter les sessions de terminal dans Datadog

Vous pouvez consulter vos sessions de terminal enregistrées et les données de processus dans Datadog :

- **Sous forme de replays** : regarder les [sessions de terminal][6] dans un lecteur de type vidéo.
- **Sous forme d'événements** : dans l'[explorateur d'événements][4], chaque commande enregistrée apparaît comme un événement.
- **Sous forme de logs** : dans l'[explorateur de logs][5], vous pouvez effectuer des recherches en texte intégral et des requêtes de sessions de terminal sous forme de logs multilignes.

## Limites connues

- La durée maximale d'une session enregistrée est d'environ 24 heures.
- La [suppression de données sensibles][2] peut échouer si les données sensibles sont réparties sur plusieurs lignes.
- Sur Linux, le traçage basé sur `seccomp` vous empêche d'élever vos autorisations pendant un enregistrement.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/security/sensitive_data_scanner/
[3]: /fr/incident_response/case_management/
[4]: http://app.datadoghq.com/event/explorer?query=source%3Acoterm_process_info
[5]: https://app.datadoghq.com/logs?query=service%3Addcoterm
[6]: https://app.datadoghq.com/terminal-streams