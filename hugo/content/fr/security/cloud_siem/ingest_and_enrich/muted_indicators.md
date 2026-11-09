---
description: Mettez en sourdine les indicateurs de compromission qui sont bénins pour
  votre organisation afin que Cloud SIEM les classe comme bénins. Explique comment
  la mise en sourdine modifie l'enrichissement des logs, présente les indicateurs
  mis en sourdine gérés par Datadog et décrit comment mettre en sourdine, examiner
  et réactiver les indicateurs.
disable_toc: false
further_reading:
- link: /security/cloud_siem/triage_and_investigate/ioc_explorer/
  tag: Documentation
  text: Enquêtez sur les indicateurs avec l'IOC Explorer
- link: /security/threat_intelligence/
  tag: Documentation
  text: Renseignements sur les menaces dans Datadog Security
- link: /security/cloud_siem/ingest_and_enrich/threat_intelligence/
  tag: Documentation
  text: Apportez vos propres renseignements sur les menaces à Cloud SIEM
title: Muted Indicators
---
## Présentation {#overview}

Les flux de renseignement sur les menaces peuvent signaler un indicateur inoffensif pour votre organisation, tel que l'adresse IP de sortie de votre VPN d'entreprise, un pool de minage de cryptomonnaie autorisé ou le domaine d'un outil interne. Mettre un indicateur en sourdine indique à Cloud SIEM de le classer comme `benign` pour votre organisation, afin que votre équipe n'ait plus à examiner les mêmes faux positifs.

La mise en sourdine ne supprime pas le renseignement sur les menaces. Les indicateurs mis en sourdine conservent leur enrichissement et restent visibles dans l'[IOC Explorer][1], afin que vous puissiez toujours les rechercher et voir pourquoi ils ont été signalés.

Les indicateurs peuvent être mis en sourdine de deux manières :

- **Gérés par Datadog** : Datadog maintient une liste d'indicateurs connus comme bénins, tels que des domaines largement utilisés, et les met en sourdine pour chaque organisation. Cette liste est en lecture seule.
- **Mis en sourdine par votre organisation** : Indicateurs que votre équipe met en sourdine. Ces mises en sourdine s'appliquent uniquement à votre organisation, et vous pouvez réactiver les indicateurs concernés à tout moment.

## Fonctionnement de la mise en sourdine {#how-muting-works}

Lorsqu'un indicateur est mis en sourdine, Cloud SIEM modifie la façon dont il enrichit les nouveaux logs correspondant à l'indicateur :

- L'[intention][2] de chaque résultat de renseignement sur les menaces éligible passe à `benign`.
- Le log conserve le reste de son enrichissement de renseignement sur les menaces, tel que la source et la catégorie, et porte la mention `has_been_muted: true`.
- Le score IOC de l'indicateur reste le même.

La mise en sourdine s'applique aux logs que Cloud SIEM traite après sa prise d'effet. Les logs qui ont déjà été traités conservent leur enrichissement d'origine.

### Quand une mise en sourdine ou une réactivation prend effet {#when-a-mute-or-unmute-takes-effect}

- **IOC Explorer** : Affiche immédiatement le nouvel état de mise en sourdine.
- **Enrichissement des logs** : Peut prendre jusqu'à une heure avant de s'appliquer. Pendant ce temps, les nouveaux logs et les détections qui en découlent peuvent encore utiliser l'évaluation d'origine.

### Renseignements sur les menaces que la mise en sourdine ne modifie pas {#threat-intelligence-that-muting-does-not-change}

La mise en sourdine des indicateurs de votre organisation ne modifie pas les évaluations provenant de :

- Renseignements sur les menaces que vous apportez vous-même via [tables de référence][3]
- Intégrations de Threat Intelligence Platform (TIP) : MISP, OpenCTI et Anomali ThreatStream

## Prérequis {#prerequisites}

- Votre organisation doit être abonnée à Cloud SIEM
- Vous avez besoin des [autorisations][4] suivantes :
  - Pour afficher les indicateurs mis en sourdine : `security_monitoring_signals_read`
  - Pour mettre en sourdine ou réactiver des indicateurs : `security_monitoring_signals_write`

## Limites {#limits}

| Limite | Valeur |
|---|---|
| Mises en sourdine actives par organisation | 10,000 |
| Indicateurs par action de mise en sourdine ou de réactivation | 100 |
| Longueur du motif | 100 caractères |
| Types d'indicateurs pris en charge | Adresse IP, domaine, hachage de fichier SHA-256 |

Lorsque votre organisation atteint 10,000 mises en sourdine actives, réactivez les indicateurs dont vous n'avez plus besoin avant d'en mettre de nouveaux en sourdine.

## Mettre des indicateurs en sourdine {#mute-indicators}

Vous pouvez mettre en sourdine des adresses IP, des domaines et des hachages de fichier SHA-256. Mettez en sourdine uniquement des valeurs individuelles. Les plages CIDR ne peuvent pas être mises en sourdine ; mettez donc en sourdine les adresses IP individuelles.

### Mettre un indicateur en sourdine {#mute-an-indicator}

1. Accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > {{< ui >}}Investigate{{< /ui >}} > [{{< ui >}}IOC Explorer{{< /ui >}}][5].
1. Cliquez sur un indicateur pour ouvrir son panneau latéral.
1. Cliquez sur {{< ui >}}Mute This IoC{{< /ui >}}.
1. Si vous le souhaitez, saisissez un motif de mise en sourdine, tel que `Corporate VPN egress`. Le motif peut comporter jusqu'à 100 caractères et apparaît sur la page Muted Indicators.
1. Cliquez sur {{< ui >}}Mute{{< /ui >}}.

### Mettre plusieurs indicateurs en sourdine {#mute-multiple-indicators}

1. Accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > {{< ui >}}Investigate{{< /ui >}} > [{{< ui >}}IOC Explorer{{< /ui >}}][5].
1. Cochez les cases en regard des indicateurs que vous souhaitez mettre en sourdine. Vous pouvez mettre jusqu'à 100 indicateurs en sourdine à la fois.
1. Dans le menu des actions groupées, cliquez sur {{< ui >}}Mute{{< /ui >}}.
1. Si vous le souhaitez, saisissez un motif de mise en sourdine. Le motif s'applique à chaque indicateur sélectionné.
1. Confirmez l'action.

Les indicateurs sélectionnés qui sont déjà mis en sourdine, par votre organisation ou par Datadog, ne sont pas modifiés par une seconde action de mise en sourdine.

## Examiner les indicateurs mis en sourdine {#review-muted-indicators}

La page Muted Indicators répertorie toutes les mises en sourdine actives, provenant de Datadog et de votre organisation. Pour l'ouvrir, effectuez l'une des opérations suivantes :

- Accédez à {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > [{{< ui >}}Muted Indicators{{< /ui >}}][6].
- Dans l'[IOC Explorer][5], cliquez sur {{< ui >}}Muted Indicators{{< /ui >}}. La liste s'ouvre dans un panneau latéral. Cliquez sur {{< ui >}}Open full page{{< /ui >}} pour accéder à la page des paramètres.

Pour chaque indicateur, la liste affiche le type d'indicateur, le périmètre et le motif. Les lignes correspondant aux indicateurs gérés par Datadog affichent le flux source. Les lignes mises en sourdine par votre organisation indiquent qui a mis l'indicateur en sourdine et quand. Utilisez la barre de recherche pour filtrer par indicateur, type d'indicateur, périmètre (votre organisation ou indicateurs gérés par Datadog), source ou motif.

### Trouver les indicateurs mis en sourdine dans l'IOC Explorer {#find-muted-indicators-in-the-ioc-explorer}

Dans l'[IOC Explorer][5], la colonne {{< ui >}}Custom mute{{< /ui >}} affiche {{< ui >}}Muted{{< /ui >}} pour les indicateurs que votre organisation a mis en sourdine. Pour afficher uniquement ces indicateurs, filtrez avec la facette {{< ui >}}Muted{{< /ui >}}.

La colonne et la facette reflètent uniquement les mises en sourdine de votre organisation. Les indicateurs mis en sourdine uniquement par Datadog n'apparaissent pas comme mis en sourdine dans cette colonne ou cette facette. Pour voir toutes les mises en sourdine, utilisez la [page Muted Indicators](#review-muted-indicators).

### Afficher l'historique des mises en sourdine {#view-mute-history}

L'onglet {{< ui >}}Conversation{{< /ui >}} dans le panneau latéral d'un indicateur répertorie chaque événement de mise en sourdine et de réactivation, ainsi que la personne qui a effectué l'action et le moment où elle l'a fait. Ces événements apparaissent aux côtés des commentaires et des changements de triage de l'indicateur.

## Réactiver des indicateurs {#unmute-indicators}

Vous pouvez réactiver les indicateurs que votre organisation a mis en sourdine. Les mises en sourdine gérées par Datadog sont en lecture seule.

Pour réactiver des indicateurs, effectuez l'une des opérations suivantes :

- Dans l'[IOC Explorer][5], ouvrez le panneau latéral de l'indicateur et cliquez sur {{< ui >}}Un-mute This IoC{{< /ui >}}.
- Sur la [page Muted Indicators][6], cliquez sur {{< ui >}}Un-mute{{< /ui >}} sur la ligne de l'indicateur.
- Sur la page Muted Indicators, sélectionnez jusqu'à 100 indicateurs et cliquez sur {{< ui >}}Un-mute{{< /ui >}}.

Si Datadog met également l'indicateur en sourdine, sa réactivation supprime uniquement la mise en sourdine de votre organisation. L'indicateur reste classé comme `benign`.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/cloud_siem/triage_and_investigate/ioc_explorer/
[2]: /fr/security/threat_intelligence/#threat-intelligence-intents
[3]: /fr/security/cloud_siem/ingest_and_enrich/threat_intelligence/
[4]: /fr/account_management/rbac/permissions/#cloud-security-platform
[5]: https://app.datadoghq.com/security/siem/ioc-explorer
[6]: https://app.datadoghq.com/security/configuration/siem/muted-indicators