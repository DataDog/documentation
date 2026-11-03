---
aliases:
- /fr/synthetics/guide/synthetic-test-monitors/
description: Créez et gérez des monitors pour les tests Synthetic afin de recevoir
  des notifications lorsque les tests Web et API échouent ou présentent des performances
  médiocres.
further_reading:
- link: /monitors/manage/
  tag: Documentation
  text: Apprendre à générer les monitors
- link: /synthetics/notifications/
  tag: Documentation
  text: En savoir plus sur les notifications de Synthetic Monitoring
title: Monitors synthétiques
---
## Présentation {#overview}

Lorsque vous créez un test Synthetic, Datadog crée automatiquement un monitor associé. Vous pouvez configurer des notifications lorsque le monitor de test Synthetic envoie une alerte.

## Créer un monitor de test Synthetic {#create-a-synthetic-test-monitor}

<div class="alert alert-info">Vous pouvez uniquement créer des <strong>monitors de test Synthetic</strong> dans la section <a href="https://app.datadoghq.com/synthetics/tests">Synthetic Monitoring</a> de l'application. La page générale <a href="https://app.datadoghq.com/monitors">Monitors</a> est utilisée pour créer d'autres types de moniteurs, tels que ceux basés sur des métriques, des logs ou des processus.</div>

Créez un monitor dans la section {{< ui >}}Monitor{{< /ui >}} d'un test Synthetic nouveau ou existant pour envoyer des notifications lorsqu'un test de Synthetic Monitoring échoue. Les monitors sont associés au test Synthetic que vous créez et sont liés aux conditions d'alerte définies dans la configuration de votre test Synthetic. Pour utiliser des attributs de monitor et des variables de tag, créez un [moniteur de métrique][1].

Les messages de moniteur dans Synthetic Monitoring se composent de :

- {{< ui >}}Title{{< /ui >}} : Le nom du monitor.
- {{< ui >}}Custom message{{< /ui >}} : Texte facultatif rédigé lors de la création du monitor.
- {{< ui >}}Auto-appended summary{{< /ui >}} : Inclut les emplacements en échec, les messages d'erreur et les liens vers le test.
- {{< ui >}}Footer{{< /ui >}} : Inclut les détails de la dernière exécution de test ayant échoué. </br><br>

{{< img src="synthetics/guide/synthetics_test_monitors/configure_the_monitor_for_this_test_2.png" alt="Création d'un monitor dans votre test Synthetic" style="width:90%;">}}

## Afficher et gérer les monitors Synthetic {#view-and-manage-synthetic-monitors}

- Personnalisez le nom du monitor pour le rechercher sur la page [{{< ui >}}Manage Monitors{{< /ui >}}][2]. Pour trouver un monitor de test Synthetic, filtrez sur `type:synthetics` dans la barre de recherche. Vous pouvez utiliser des [variables conditionnelles][3] de monitor pour caractériser le message de notification en fonction de l'état du test. 

- Le monitor de test Synthetic s'intègre aux canaux de notification tels que l'e-mail, Slack, Pagerduty et Microsoft Teams. Pour plus d'informations, consultez [Notifications][4].

- Si vous avez plusieurs niveaux de notifications (par exemple, notifier davantage d'équipes au fur et à mesure que l'alerte d'un test Synthetic se prolonge), Datadog recommande d'activer la [renotification][5] sur vos monitors Synthetic.

## Balises ajoutées automatiquement {#automatically-added-tags}

En plus des balises personnalisées que vous ajoutez, Datadog ajoute les tags suivants à un monitor de test Synthetic en fonction de la configuration du test. Utilisez ces balises pour rechercher et filtrer sur la page [{{< ui >}}Manage Monitors{{< /ui >}}][2] ou dans la liste des tests de Synthetic Monitoring.

| Clé de tag             | Valeurs disponibles                                                                 | Ce que le tag capture                                                                                                    |
|----------------------|-----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `check_type`         | `api`, `browser`, `api-ssl`, `api-dns`, `api-tcp`, `api-icmp`, `api-grpc`, `api-udp`, `api-websocket`, `api-multi`, `mobile` | Le type de test et, le cas échéant, son sous-type. Le sous-type `http` est omis des tests `api` par souci de concision.        |
| `check_status`       | `live`, `paused`                                                                   | Indique si le test est actif ou en pause.                                                                              |
| `probe_dc`           | `aws:us-east-1`, `aws:eu-west-1` et d'autres emplacements gérés ou privés          | Les emplacements depuis lesquels le test s'exécute. Les tests multi-emplacements ont un tag `probe_dc` pour chaque emplacement attribué.         |
| `ci_execution_rule`  | `blocking`, `non_blocking`                                                         | La règle d'exécution CI/CD du test. Le tag est ajouté lorsque le test est utilisé comme quality gate dans un pipeline CI/CD.              |

Ces balises se mettent à jour automatiquement lorsque vous modifiez le test, afin que les recherches restent précises à mesure que les tests changent d'emplacement, sont mis en pause ou modifient leur configuration CI/CD. Recherchez des balises en utilisant la facette `tag` et en mettant entre guillemets la paire `key:value` complète. Exemple :

- `type:synthetics tag:"check_status:live"` trouve tous les monitors de test Synthetic actifs.
- `type:synthetics tag:("probe_dc:aws:us-east-1" AND "probe_dc:aws:ap-northeast-1")` trouve les tests s'exécutant depuis les deux emplacements.
- `type:synthetics tag:"ci_execution_rule:blocking"` trouve les tests configurés pour bloquer un pipeline CI/CD en cas d'échec.

### Personnalisez les notifications de monitor {#tailor-monitor-notifications}

Selon votre stratégie de gestion des incidents, vous pouvez souhaiter impliquer plusieurs équipes lorsqu'un test Synthetic déclenche une alerte. Pour notifier l'équipe B uniquement lors des alertes ultérieures après la première alerte, entourez la notification à l'équipe B avec `{{#is_renotify}}` and `{{/is_renotify}}`. Utilisez des [variables conditionnelles][3] pour caractériser davantage le message de notification en fonction des attributs du monitor. 

{{< img src="synthetics/guide/synthetics_test_monitors/renotification_toggle_2.png" alt="Sélectionnez la durée pendant laquelle le monitor d'alerte doit renvoyer une notification" style="width:90%;">}}

Pour activer la renotification, activez {{< ui >}}Enable renotification{{< /ui >}} et sélectionnez un intervalle de temps dans le menu déroulant.

Pour plus d'informations sur la façon dont les notifications de Synthetic Monitoring évaluent les résultats des tests et déclenchent des alertes, consultez [Comprendre l'alerte du monitor Synthetic][7].

## Notifications améliorées {#enhanced-notifications}

Utilisez et enrichissez les monitors de test Synthetic pour envoyer des notifications plus détaillées lorsqu'un test de Synthetic Monitoring échoue. Les fonctionnalités suivantes sont disponibles :

Messages de monitor préremplis
: Les messages de monitor préremplis fournissent un point de départ structuré pour les alertes de test Synthetic. Chaque message comprend un titre, un résumé et un pied de page standardisés contenant les métadonnées du test, ce qui facilite la compréhension de l'alerte en un coup d'œil.

Template variables
: Les variables de modèle vous permettent d'injecter dynamiquement des données spécifiques au test dans les notifications de monitor. Ces variables proviennent de l'objet `synthetics.attributes`.

Utilisation avancée
: L'utilisation avancée inclut des techniques pour faire ressortir des informations de test plus approfondies ou structurer des messages complexes à l'aide de modèles Handlebars.

Alertes conditionnelles
: Les alertes conditionnelles vous permettent de modifier le contenu d'une notification de monitor en fonction de résultats de test ou de conditions d'échec spécifiques.

Pour plus d'informations, consultez [Notifications de Synthetic Monitoring][6].

## Lancer Bits Investigation {#launch-a-bits-investigation}

Lorsqu'un monitor de test Synthetic Browser ou API passe à l'état d'alerte, vous pouvez lancer une [Bits Investigation][8] pour identifier la cause première. Bits Investigation analyse les résultats de test, les traces, les logs et les métriques pour faire ressortir une cause première et signaler si l'échec est dû à une régression ou à une mauvaise configuration. Vous pouvez également activer {{< ui >}}Auto-Investigate{{< /ui >}} sur un monitor de test Synthetic pour lancer automatiquement des investigations lorsqu'il déclenche une alerte.

## Bonnes pratiques {#best-practices}

- Incluez toujours une `@notification` par défaut (en dehors de toute condition) pour éviter les messages perdus.
- Évitez la logique complexe pour les outils d'appel comme PagerDuty, qui nécessitent un routage cohérent pour le rétablissement.
- Utilisez la logique conditionnelle pour remplacer le texte d'alerte, modifier la priorité ou répartir les notifications entre les équipes.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/types/metric/
[2]: /fr/monitors/manage/
[3]: /fr/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: /fr/monitors/notify/#notification-recipients
[5]: /fr/monitors/notify/#renotify
[6]: /fr/synthetics/notifications
[7]: /fr/synthetics/guide/how-synthetics-monitors-trigger-alerts/
[8]: /fr/bits_ai/bits_investigation/investigate_issues/