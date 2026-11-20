---
aliases:
- /fr/security_monitoring/guide/monitor-authentication-logs-for-security-threats/
- /fr/security_platform/guide/monitor-authentication-logs-for-security-threats/
further_reading:
- link: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
  tag: GitHub
  text: En savoir plus sur la surveillance des logs d'authentification
title: Surveillance des logs d'authentification pour identifier les menaces de sécurité
---

## Présentation

Pour identifier les menaces de sécurité et garantir la conformité des dossiers client, il est essentiel de pouvoir enregistrer, surveiller et analyser tous les événements d'authentification. Puisque vos logs d'authentification proviennent de différentes sources et de plusieurs éléments de votre environnement, il est probable que leur format varie, qu'ils soient gérés par plusieurs équipes ou encore qu'ils soient enregistrés à l'aide de plusieurs services tiers.

Ce guide vous présente les meilleures pratiques et recommandations à appliquer à la gestion et à la mise en forme de vos logs d'authentification. Vous pourrez ainsi utiliser les données de vos logs pour détecter et surveiller les menaces de sécurité grâce aux fonctionnalités de [surveillance de la sécurité et de la conformité de Datadog][1].

## Prérequis

Pour utiliser les fonctionnalités de surveillance de la sécurité et de la conformité, la collecte de logs doit être activée. Nous vous commandons également d'activer la collecte de logs [au niveau des applications][2].

## Gérer et mettre en forme des logs d'authentification

Avant de commencer la surveillance des menaces de sécurité, suivez les meilleures pratiques ci-dessous pour vérifier que vous importez suffisamment de données de log dans Datadog.

### Enregistrer les événements de tous les flux de connexion

Pour visualiser en détail l'ensemble de vos activités d'authentification, assurez-vous que vos événements de log sont enregistrés pour tous les flux de connexion au niveau des applications. Cette vérification vous permet non seulement de réduire les angles morts, mais également de contrôler la méthode d'enregistrement de vos événements d'authentification ainsi que les données recueillies.

### Vérifier que vos logs contiennent des données utiles

Lorsque vous enregistrez tous les événements d'authentification au niveau des applications, vous pouvez vérifier que vos logs contiennent des données pertinentes vous aidant à [détecter et à surveiller les menaces de sécurité](#detecter-et-surveiller-les-menaces-de-securite).

{{< code-block lang="bash" >}}
2020-01-01 12:00:01 google oauth login success by John Doe from 1.2.3.4
{{< /code-block >}}

Les logs qui indiquent l'identité de l'utilisateur (John Doe), le résultat de l'authentification (login success) et la date (2020-01-01 12:00:01) de l'événement vous offrent tous les détails dont vous avez besoin pour effectuer des analyses complexes dans Datadog.

### Enregistrer les authentifications dans un format standard analysable

Vérifiez que votre application rédige des logs au format key/value avec le séparateur `=`. Ce format permet à un parser key/value, tel que le [parser Grok][3] de Datadog, de les traiter. Prenons l'exemple d'un log au format suivant :

{{< code-block lang="bash" >}}
INFO 2020-01-01 12:00:01 usr.id="John Doe" evt.category=authentication evt.name="google oauth" evt.outcome=success network.client.ip=1.2.3.4
{{< /code-block >}}

Datadog peut alors le parser afin d'obtenir le JSON suivant :

{{< code-block lang="json" >}}
{
  "usr": {
    "id": "John Doe"
  },
  "evt": {
    "category": "authentication",
    "name": "google oauth",
    "outcome": "success",
  },
  "network": {
    "client": {
      "ip": "1.2.3.4"
    }
  }
}
{{< /code-block >}}

Il est important d'utiliser une [convention de nommage standard][4] pour les attributs de vos logs. Cela vous permet de rechercher et d'analyser les données pour l'ensemble des attributs, peu importe leur origine. Nous vous recommandons d'inclure dans vos logs d'authentification les [attributs standard][5] suivants :

- [`usr.id`][6]
- [`evt.category`][7]
- [`evt.name`][7]
- [`evt.outcome`][7]
- [`network.client.ip`][8]

Lorsque vous mettez en place un format unique pour tous vos logs d'authentification, vous pouvez utiliser les attributs de log afin de filtrer et d'organiser efficacement vos données de log dans Datadog. Par exemple, avec les attributs standard, vous pouvez découvrir les utilisateurs (`usr.id`) qui possèdent le plus grand nombre d'échecs de connexion (`evt.outcome:failure`).

Le format key/value facilite également l'ajout d'attributs personnalisés dans les logs. Vous pouvez ainsi ajouter, par exemple, un score [reCAPTCHA v3][9] afin d'identifier les activités provenant potentiellement de robots. Utilisez des guillemets autour des valeurs d'attribut qui peuvent contenir des espaces. Ainsi, vous enregistrez toute la valeur et pouvez la parser.

## Détecter et surveiller les menaces de sécurité

Pour détecter et surveiller de façon adéquate les menaces de sécurité, vous devez identifier des schémas clés. Par exemple, si vous découvrez un nombre important de tentatives de connexion erronées de la part d'un seul utilisateur sur une courte période, il peut s'agir d'une [**attaque par force brute**][10]. Si ces échecs sont suivis par une connexion réussie, il est possible qu'une personne malveillante ait mis la main sur un compte, ce qui nécessite une enquête immédiate.

Le [**credential stuffing**][11] constitue également une technique d'attaque courante. Cette pratique consiste à combiner des informations de connexion publiquement divulguées afin de tenter de trouver des paires d'identifiants réellement utilisées. Pour détecter ce type d'attaque, recherchez les connexions utilisant plusieurs valeurs `usr.id` et provenant toutes du même `network.client.ip`.

Datadog propose des [règles de détection][12] préconfigurées capables d'analyser vos logs ingérés en temps réel afin d'identifier certaines techniques d'attaque courantes, comme les deux précédemment décrites. Lorsqu'un log déclenche l'une de ces erreurs, Datadog génère automatiquement un [signal de sécurité][13]. Ce signal inclut des données importantes sur l'événement, telles que le type d'attaque détecté et des suggestions de mesure. Vous pouvez consulter, filtrer et trier tous vos signaux de sécurité dans le Security Signals Explorer. Cette vue vous permet ainsi de classifier vos signaux et ainsi de concentrer vos efforts sur les plus importants.

Pour les signaux déclenchés à partir de la règle de détection `Credential Stuffing Attack`, il existe un [runbook par défaut][14] vous aidant à prendre des mesures correctrices. Ce runbook vous accompagne tout au long de votre enquête afin de déterminer s'il s'agit ou non d'une tentative de credential stuffing. Il inclut également des graphiques représentant les logs connexes. Pour utiliser ce runbook, enregistrez une copie et définissez l'intervalle, prenez note de l'avancement de votre enquête au format Markdown et partagez le runbook avec les membres de votre équipe [afin qu'ils puissent le commenter][15].

### Utiliser des dashboards pour des enquêtes

Datadog propose des dashboards prêts à l'emploi, tels que le [dashboard d'analyse des adresses IP][16] ou le [dashboard d'analyse des utilisateurs][17]. Ces dashboards mettent en corrélation des données essentielles provenant de vos logs d'authentification avec des données pertinentes récupérées à partir du reste de votre environnement. Ils visent à faciliter vos enquêtes.

Par exemple, si une adresse IP ou un utilisateur précis déclenche plusieurs signaux de sécurité, vous pouvez cliquer sur l'adresse IP ou l'utilisateur dans une liste de dashboards ou dans un graphique et sélectionner l'option **View related Security Signals**. Cela affiche alors tous les signaux de sécurité déclenchés par l'adresse IP ou l'utilisateur en question dans le Security Signals Explorer. Si vos données sont concluantes, cette vue vous aide à mettre en corrélation une adresse IP avec un utilisateur, et vice versa. Vous pouvez alors passer en revue chaque règle pour prendre les mesures adéquates. Cliquez sur une règle et consultez les informations de triage et de réponse dans l'onglet **Rule Details** pour évaluer efficacement l'ampleur du problème et le corriger.

Vous pouvez également créer des dashboards personnalisés pour visualiser des données d'authentification essentielles, telles que le nombre de connexions par source et par résultat. Ces dashboards vous offrent une vue d'ensemble des activités pour tous vos utilisateurs. Ils vous aident également à visualiser les tendances afin de détecter les pics d'activité anormaux devant faire l'objet d'une enquête.

### Utiliser la fonctionnalité Log Rehydration&trade; pour vos prochaines enquêtes

Datadog ingère et analyse [tous vos logs][18] afin de détecter les menaces concernant l'ensemble de votre environnement. Vous pouvez archiver les logs que [vous ne souhaitez pas indexer][19], puis les [réintégrer][20] facilement par la suite à des fins d'enquête, d'audit et de conformité.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloud_siem/
[2]: /fr/logs/log_collection/?tab=http#application-log-collection
[3]: /fr/logs/log_configuration/processors/#grok-parser
[4]: https://www.datadoghq.com/blog/logs-standard-attributes/
[5]: /fr/logs/log_configuration/attributes_naming_convention
[6]: /fr/logs/log_configuration/attributes_naming_convention/#user-related-attributes
[7]: /fr/logs/log_configuration/attributes_naming_convention/#events
[8]: /fr/logs/log_configuration/attributes_naming_convention/#network
[9]: https://developers.google.com/recaptcha/docs/v3
[10]: https://app.datadoghq.com/security/configuration/rules?product=siem&query=brute%20force%20attack&sort=rule
[11]: https://app.datadoghq.com/security/configuration/rules?product=siem&query=credential%20stuffing%20attack&sort=rule
[12]: /fr/cloud_siem/default_rules/
[13]: /fr/cloud_siem/explorer
[14]: https://app.datadoghq.com/notebook/credentialstuffingrunbook
[15]: /fr/notebooks/#commenting
[16]: https://app.datadoghq.com/screen/integration/security-monitoring-ip-investigation
[17]: https://app.datadoghq.com/screen/integration/security-monitoring-user-investigation
[18]: https://www.datadoghq.com/blog/logging-without-limits/
[19]: /fr/logs/indexes/#exclusion-filters
[20]: https://www.datadoghq.com/blog/efficient-log-rehydration-with-datadog/