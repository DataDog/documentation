---
aliases:
- /fr/real_user_monitoring/security/
further_reading:
- link: /data_security/
  tag: Documentation
  text: Consulter les principales catégories de données envoyées à Datadog
- link: /data_security/synthetics/
  tag: Documentation
  text: Sécurité des données de Synthetic Monitoring
- link: /session_replay/privacy_options?platform=browser
  tag: Documentation
  text: Options de confidentialité de Session Replay
- link: https://www.datadoghq.com/blog/default-privacy-session-replay/
  tag: Blog
  text: Obfusquer les données utilisateur avec les paramètres de confidentialité par
    défaut de Session Replay
title: Sécurité des données Real User Monitoring (RUM)
---
<div class="alert alert-info">Cette page concerne la sécurité des données envoyées à Datadog. Si vous recherchez des produits et fonctionnalités de sécurité cloud et applicative, consultez la section <a href="/security/" target="_blank">Sécurité</a>.</div>

## Présentation {#overview}
Real User Monitoring (RUM) fournit des contrôles pour mettre en œuvre les exigences de confidentialité et garantir que les organisations de toute taille n'exposent pas d'informations sensibles ou personnelles. Les données sont stockées sur des instances cloud gérées par Datadog et chiffrées au repos. Les comportements par défaut et les options configurables décrits sur cette page sont conçus pour protéger la confidentialité des utilisateurs finaux et empêcher la collecte d'informations organisationnelles sensibles. En savoir plus sur [la confidentialité chez Datadog][1].

## Responsabilité partagée {#shared-responsibility}

La responsabilité de maintenir la sécurité des données des utilisateurs est partagée entre Datadog et les développeurs qui utilisent les SDK RUM.

Datadog est responsable de :

- Fournir un produit fiable qui traite les données de manière sécurisée lorsqu'elles sont transmises à la plateforme Datadog et y sont stockées.
- Veiller à ce que les problèmes de sécurité soient identifiés conformément aux politiques internes.

Les développeurs sont responsables de :
- Exploiter les valeurs de configuration et les options de confidentialité des données fournies par Datadog.
- Assurer l'intégrité du code au sein de leurs environnements.

## Cadres de compliance{#compliance-frameworks}
RUM peut être configuré pour assurer la conformité avec de nombreuses normes et cadres réglementaires, notamment, mais sans s'y limiter :

- RGPD
- HIPAA
- ISO
- CCPA/CPRA

## Restrictions de confidentialité {#privacy-restrictions}
Par défaut, certaines restrictions de confidentialité sont en place pour protéger les données des utilisateurs afin d'aider à se conformer aux cadres réglementaires et normatifs.

### Utilisation des cookies par RUM pour navigateur {#browser-rum-use-of-cookies}
RUM pour navigateur nécessite que les first-party cookies soient activés sur le navigateur de l'utilisateur final pour collecter des données. Si les juridictions dans lesquelles vous opérez l'exigent, il vous incombe de configurer vos pages pour vous conformer aux lois de ces juridictions, y compris l'obtention du consentement pour collecter des cookies avant l'initialisation de RUM.

### Gestion du consentement RUM pour mobile {#mobile-rum-consent-management}
Le suivi RUM pour mobile n'est exécuté qu'après le consentement de l'utilisateur. Si l'utilisateur final accepte le suivi RUM, Datadog suit son activité et son expérience de session. Si l'utilisateur refuse le suivi RUM, Datadog ne suit pas son activité ni son expérience de session.

## Options de confidentialité {#privacy-options}
Vous disposez de plusieurs options et outils pour collecter et masquer les données capturées par RUM.

### Jeton client {#client-token}
Le [jeton client][2] RUM du navigateur est utilisé pour faire correspondre les données du navigateur de l'utilisateur final à une application RUM spécifique dans Datadog. Il n'est pas chiffré et est visible depuis le côté client d'une application.

Comme le jeton client est uniquement utilisé pour envoyer des données à Datadog, il n'y a aucun risque de perte de données dû à ce jeton ; cependant, Datadog recommande une bonne gestion du jeton client pour éviter d'autres types d'utilisation abusive, notamment :

- [Rotation régulière du jeton client][3] pour garantir qu'il n'est utilisé que par votre application
- [Filtrage automatique des bots][4] lors de la capture des données RUM

#### Proxy authentifié {#authenticated-proxy}
Une méthode pour utiliser le jeton client afin de filtrer les bots est un proxy authentifié. Dans cette méthode, une chaîne d'espace réservé est substituée au `clientToken` lors de l'initialisation du SDK Datadog RUM Browser. Le proxy connaît le véritable jeton client, mais l'utilisateur final ne le connaît pas.

Le proxy est configuré pour vérifier la validité des informations utilisateur avant de transmettre les données de session à Datadog, confirmant ainsi qu'un utilisateur réel est connecté et transmet du trafic à surveiller. Lors de la réception du trafic, le proxy vérifie que les données incluent la chaîne d'espace réservé et la remplace par le `clientToken` réel avant de transférer les données à Datadog.

### Suivi des événements {#event-tracking}
Un [événement][5] est une interaction utilisateur avec des éléments spécifiques de votre site ou application. Les événements peuvent être capturés automatiquement via le SDK ou envoyés via des actions personnalisées. Vous pouvez désactiver le suivi automatique des interactions utilisateur et des pages vues pour ne capturer que l'interaction de votre choix. Par défaut, RUM utilise le contenu cible pour générer automatiquement des noms d'action à partir des actions collectées par le SDK. Vous pouvez [explicitement remplacer][6] ce comportement par n'importe quel nom.

Les données que nous suivons automatiquement contiennent principalement des informations techniques, dont la plupart n'incluent pas d'informations personnellement identifiables. Les données capturées par RUM peuvent être davantage expurgées avant d'être envoyées et stockées dans Datadog grâce à des options de configuration avancées pour les méthodes suivantes :

- [beforeSend API][7]
- [iOS][8]
- [Android][9]
- [Flutter][10]
- [React Native][11]

### Transmettre les événements RUM via un serveur proxy {#transmit-rum-events-through-a-proxy-server}
Vous pouvez transmettre tous les événements RUM via votre propre [serveur proxy][12] afin que les appareils des utilisateurs finaux ne communiquent jamais directement avec Datadog.

### Suivi de l'identité des utilisateurs {#user-identity-tracking}
Par défaut, il n'y a **aucun suivi de l'identité des utilisateurs**. Chaque session est associée à un `session.id` unique, ce qui anonymise les données tout en vous permettant de comprendre les tendances. Vous avez la possibilité d'écrire du code pour capturer les [données utilisateur][13] telles que le nom et l'adresse e-mail, puis d'utiliser ces données pour [enrichir et modifier][13] les sessions RUM, mais cela n'est pas obligatoire.

### Rétention des données{#data-retention}
Une fois que vous avez configuré la capture d'événements, les événements sont stockés dans Datadog. Vous pouvez décider de la durée pendant laquelle vos événements et propriétés capturés restent dans Datadog.

Par défaut, la rétention des données pour les environnements de production est :

- 30 jours pour les sessions, les vues, les actions, les erreurs et les enregistrements de session.
- 15 jours pour les ressources et les tâches longues.

Pour étendre la rétention de vos données afin d'analyser les comportements des utilisateurs sur des périodes plus longues (sessions, vues et actions uniquement), vous pouvez soumettre une demande pour [rejoindre Product Analytics][20].

#### Contrôle d'accès basé sur les rôles{#role-based-access-control}
Datadog fournit un contrôle d'accès basé sur les rôles (RBAC) pour gérer qui peut voir les données RUM capturées. Les paramètres par défaut pour l'accès aux données dépendent du rôle auquel un utilisateur est ajouté. Il existe trois types de rôles Datadog disponibles : les rôles Administrateur, Standard et Lecture seule. Des autorisations RUM plus granulaires sont définies dans les [autorisations de rôle Datadog][15]. Par exemple, vous pouvez accorder ou révoquer l'accès à la visualisation de Session Replays.

### Suppression de données{#data-deletion}
Si vous devez supprimer des données stockées par Datadog, par exemple si des données potentiellement sensibles ont été divulguées dans des événements RUM, vous pouvez supprimer définitivement les données dans un intervalle de temps donné. Avec une suppression définitive, **toutes** les données sont supprimées ; elle ne peut pas être ciblée sur une application spécifique. Si vous avez besoin de supprimer des données, contactez l'[équipe de support Datadog][14].

### Suppression des données personnelles et sensibles{#personal-and-sensitive-data-removal}
Vous disposez de plusieurs options pour supprimer les informations personnellement identifiables (PII) et les données sensibles, y compris les adresses IP et la géolocalisation. Quelques scénarios où des PII pourraient apparaître dans RUM :

- Noms d'action sur les boutons (par exemple, « Voir le numéro de carte de crédit complet »)
- Noms affichés dans les URL
- Événements suivis personnalisés instrumentés par les développeurs de l'application

#### Masquer les noms d'action {#mask-action-names}
Par défaut, si vous souhaitez masquer tous les noms d'action, vous pouvez utiliser l'option `enablePrivacyForActionName` conjointement avec le paramètre de confidentialité `mask`. Cette opération remplace automatiquement tous les noms d'action non remplacés par l'espace réservé `Masked Element`. Ce paramètre est également conçu pour être compatible avec les [HTML override attributes][16] existants.

#### Données non structurées {#unstructured-data}
Les PII incluses par inadvertance dans des données non structurées, comme le nom d'une personne dans une zone de texte, ne peuvent être supprimées que par une demande de suppression de données pour une période donnée.

En ce qui concerne les URL, vous avez la possibilité de suivre les pages vues manuellement pour supprimer toute PII ou d'utiliser beforeSend pour modifier le texte de l'URL.

Vous pouvez également transmettre tous les événements RUM via votre propre serveur (proxy) afin que les appareils des utilisateurs finaux ne communiquent jamais directement avec Datadog.

#### Adresse IP {#ip-address}
Une fois votre application RUM initialisée, vous pouvez choisir d'inclure ou non les données IP ou de géolocalisation depuis l'onglet {{< ui >}}User Data Collection{{< /ui >}} :

{{< img src="data_security/data-security-rum-privacy-compliance-user-data-collection-1.png" alt="Vous pouvez inclure ou exclure les données de géolocalisation et l'adresse IP du client depuis la page de gestion de l'application RUM" style="width:100%;" >}}

Une fois que vous avez désactivé la collecte des données IP, la modification est appliquée immédiatement. Les événements collectés avant la désactivation n'entraînent pas la suppression des données IP. Cela est effectué sur le backend, ce qui signifie que le SDK Browser envoie toujours des données, mais les adresses IP sont omises par les pipelines backend de Datadog et supprimées au moment du traitement.

#### Géolocalisation {#geolocation}
En plus de supprimer les adresses IP des clients, vous pouvez également choisir de désactiver la collecte de la géolocalisation (pays, ville, comté), ou GeoIP, pour toutes les données collectées ultérieurement. Si vous décochez la case {{< ui >}}Collect geolocation data{{< /ui >}}, la modification est appliquée immédiatement. Les événements collectés avant la désactivation n'entraînent pas la suppression des données de géolocalisation correspondantes. L'omission des données est effectuée au niveau du backend, ce qui signifie que le SDK Browser continue d'envoyer des données, mais que les données de géolocalisation sont omises par les pipelines backend de Datadog et supprimées au moment du traitement.

### Recherchez de manière proactive les données sensibles avec Sensitive Data Scanner {#proactively-search-for-sensitive-data-with-sensitive-data-scanner}
[Sensitive Data Scanner][17] vous permet de rechercher et de nettoyer de manière proactive les données sensibles lors de leur ingestion par Datadog. Les événements RUM sont analysés sur le flux avant que toute donnée ne soit stockée dans Datadog. L'outil a la capacité de nettoyer, de hacher ou de masquer partiellement les données PII avant qu'elles ne soient stockées. Il fonctionne en appliquant des règles de correspondance de modèles prêtes à l'emploi ou développées par le client. Si vous avez activé cette fonctionnalité, vous pouvez la trouver sur la [{{< ui >}}Manage Sensitive Data{{< /ui >}} page][18].

## Options de confidentialité spécifiques à Session Replay {#session-replay-specific-privacy-options}
Consultez les [options de confidentialité spécifiques à Session Replay][19]. Le masquage dans Session Replay est permanent : les valeurs masquées ne quittent jamais l'appareil et ne peuvent pas être démasquées ultérieurement. Cela diffère du [masquage par Sensitive Data Scanner][21], qui obfusque les valeurs correspondantes lors de l'ingestion mais permet aux utilisateurs disposant de l'autorisation `Data Scanner Unmask` de voir la valeur d'origine.

### Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/privacy/
[2]: /fr/real_user_monitoring/application_monitoring/browser/setup/#configuration
[3]: /fr/account_management/api-app-keys/#add-an-api-key-or-client-token
[4]: /fr/real_user_monitoring/guide/identify-bots-in-the-ui/#filter-out-bot-sessions-on-intake
[5]: /fr/real_user_monitoring/explorer/search/
[6]: /fr/real_user_monitoring/application_monitoring/browser/tracking_user_actions/#declare-a-name-for-click-actions
[7]: /fr/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event#event-and-context-structure
[8]: /fr/real_user_monitoring/ios/advanced_configuration/?tab=swift#modify-or-drop-rum-events
[9]: /fr/real_user_monitoring/application_monitoring/android/advanced_configuration/?tab=kotlin#modify-or-drop-rum-events
[10]: /fr/real_user_monitoring/application_monitoring/flutter/advanced_configuration/#modify-or-drop-rum-events
[11]: /fr/real_user_monitoring/reactnative/advanced_configuration/#modify-or-drop-rum-events
[12]: /fr/real_user_monitoring/guide/proxy-rum-data/?tab=npm
[13]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#user-session
[14]: /fr/help/
[15]: /fr/account_management/rbac/permissions/#real-user-monitoring
[16]: /fr/session_replay/privacy_options?platform=browser#override-an-html-element
[17]: /fr/security/sensitive_data_scanner/
[18]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[19]: /fr/session_replay/privacy_options?platform=browser
[20]: https://www.datadoghq.com/private-beta/product-analytics/
[21]: /fr/security/sensitive_data_scanner/setup/telemetry_data/?tab=logs#mask-action