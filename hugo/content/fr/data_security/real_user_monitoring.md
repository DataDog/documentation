---
aliases:
- /fr/real_user_monitoring/security/
further_reading:
- link: /data_security/
  tag: Documentation
  text: Consulter les principales catégories de données envoyées à Datadog
- link: /data_security/synthetics/
  tag: Documentation
  text: Sécurité des données liées à la surveillance Synthetic
- link: /session_replay/browser/privacy_options/
  tag: Documentation
  text: Options de confidentialité de Session Replay
- link: https://www.datadoghq.com/blog/default-privacy-session-replay/
  tag: Blog
  text: Obfusquer les données utilisateur avec les paramètres de confidentialité par
    défaut de Session Replay
title: Sécurité des données Real User Monitoring
---

<div class="alert alert-info">Cette page est consacrée à la sécurité des données transmises à Datadog. Si vous cherchez des fonctionnalités et solutions relatives à la sécurité des applications et du cloud, consultez la section <a href="/security/" target="_blank">Sécurité</a>.</div>

## Présentation
Real User Monitoring (RUM) fournit des contrôles pour la mise en œuvre des exigences de confidentialité et garantit que les organisations de toute taille n'exposent pas d'informations sensibles ou personnelles. Les données sont stockées sur des instances cloud gérées par Datadog et chiffrées au repos. Les comportements par défaut et les options configurables décrits sur cette page sont conçus pour protéger la confidentialité des utilisateurs finaux et empêcher la collecte d'informations organisationnelles sensibles. Pour en savoir plus, consultez la section [Confidentialité chez Datadog][1].

## Responsabilité partagée

La responsabilité de la sécurité des données des utilisateurs est partagée entre Datadog et les développeurs qui utilisent les SDK RUM.

Datadog est tenu :

- de fournir un produit fiable qui traite les données en toute sécurité lorsqu'elles sont transmises et stockées sur la plate-forme Datadog.
- de veiller à ce que les problèmes de sécurité soient identifiés conformément aux politiques internes.

Les développeurs sont tenus :
- dʼexploiter les valeurs de configuration et les options pour la confidentialité des données fournies par Datadog.
- dʼassurer l'intégrité du code au sein de leur environnements.

## Frameworks de conformité
Le RUM peut être configuré pour la conformité à de nombreuses normes et référentiels réglementaires, notamment :

- RGPD
- HIPAA
- ISO
- CCPA/CPRA

## Restrictions de confidentialité
Par défaut, certaines restrictions de confidentialité sont en place pour protéger les données des utilisateurs et faciliter la conformité aux référentiels réglementaires et normatifs.

### Utilisation des cookies par le RUM Browser
Le RUM Browser nécessite l'activation des cookies first-party dans le navigateur de l'utilisateur final pour collecter des données. Si les juridictions dans lesquelles vous opérez l'exigent, il vous incombe de configurer vos pages pour vous conformer aux lois de ces juridictions, notamment en obtenant le consentement pour la collecte des cookies avant l'initialisation de RUM.

### Gestion du consentement pour le RUM mobile
Le suivi RUM mobile n'est exécuté qu'avec le consentement de l'utilisateur. Si l'utilisateur final accepte le suivi RUM, Datadog suit son activité et son expérience de session. Si l'utilisateur refuse le suivi RUM, Datadog ne suit pas son activité et son expérience de session.

## Options de confidentialité
Vous disposez de plusieurs options et outils pour la collecte et la suppression des données capturées par le RUM.

### Token client
Le [token client][2] du RUM Browser est utilisé pour associer les données du navigateur de l'utilisateur final à une application RUM spécifique dans Datadog. Il n'est pas chiffré et est visible côté client d'une application.

Le token client étant uniquement utilisé pour envoyer des données à Datadog, ce token ne présente aucun risque de perte de données ; cependant, Datadog recommande une bonne gestion du token client pour éviter d'autres types d'utilisation abusive, notamment :

- [Faire régulièrement tourner le token client][3] pour s'assurer qu'il n'est utilisé que par votre application
- [Filtrer automatiquement les bots][4] lors de la capture des données RUM

#### Proxy authentifié
L'utilisation du token client pour filtrer les bots via un proxy authentifié est l'une des méthodes disponibles. Dans cette méthode, une chaîne de remplacement est substituée au `clientToken` lors de l'initialisation du RUM Browser SDK Datadog. Le proxy connaît le vrai token client, mais pas l'utilisateur final.

Le proxy est configuré pour vérifier les informations utilisateur valides avant de transmettre les données de session à Datadog, confirmant ainsi qu'un vrai utilisateur est connecté et transmet du trafic à surveiller. Lors de la réception du trafic, le proxy vérifie que les données contiennent la chaîne de remplacement et la remplace par le vrai `clientToken` avant de transmettre les données à Datadog.

### Suivi des événements
Un [événement][5] est une interaction d'un utilisateur avec des éléments spécifiques de votre site ou application. Les événements peuvent être capturés automatiquement via le SDK ou envoyés via des actions personnalisées. Vous pouvez désactiver le suivi automatique des interactions des utilisateurs et des pages vues pour ne capturer que les interactions de votre choix. Par défaut, RUM utilise le contenu cible pour générer des noms d'actions à partir des actions collectées automatiquement par le SDK. Vous pouvez [remplacer explicitement][6] ce comportement par n'importe quel nom donné.

Les données que nous suivons automatiquement contiennent principalement des informations techniques, dont une grande partie ne comprend pas d'informations personnellement identifiables. Les données capturées par RUM peuvent être davantage supprimées avant d'être envoyées et stockées dans Datadog grâce à des options de configuration avancées pour les méthodes suivantes :

- [API beforeSend][7]
- [iOS][8]
- [Android][9]
- [Flutter][10]
- [React Native][11]

### Transmettre les événements du RUM via un serveur proxy
Vous pouvez transmettre tous les événements RUM via votre propre [serveur proxy][12] afin que les appareils des utilisateurs finaux ne communiquent jamais directement avec Datadog.

### Suivi de l'identité des utilisateurs
Par défaut, **aucun suivi de l'identité des utilisateurs** n'est effectué. Chaque session est associée à un `session.id` unique qui anonymise les données tout en vous permettant de comprendre les tendances. Vous avez la possibilité d'écrire du code pour capturer des [données utilisateur][13] telles que le nom et l'adresse e-mail, puis d'utiliser ces données pour [enrichir et modifier][13] les sessions RUM, mais cela n'est pas obligatoire.

### Conservation des données
Une fois la capture des événements configurée, les événements sont stockés dans Datadog. Vous pouvez décider de la durée de conservation de vos événements et propriétés capturés dans Datadog.

Par défaut, la rétention des données pour les environnements de production est :

- 30 jours pour les sessions, vues, actions, erreurs et enregistrements de session.
- 15 jours pour les ressources et les tâches longues.

Pour prolonger la rétention de vos données afin d'analyser les comportements des utilisateurs sur des périodes plus longues (sessions, vues et actions uniquement), vous pouvez soumettre une demande pour [rejoindre Product Analytics][20].

#### Contrôle d'accès basé sur les rôles
Datadog fournit un contrôle d'accès basé sur les rôles (RBAC) pour gérer qui consulte les données RUM capturées. Les paramètres par défaut pour l'accès aux données dépendent du rôle auquel un utilisateur est ajouté. Il existe trois types de rôles Datadog : Administrateur, Standard et Lecture seule. Des autorisations RUM plus granulaires sont définies dans les [autorisations des rôles Datadog][15]. Par exemple, vous pouvez accorder ou révoquer l'accès à la consultation des Session Replays.

### Suppression des données
Si vous devez supprimer des données stockées par Datadog, par exemple si des données potentiellement sensibles ont été divulguées dans des événements RUM, vous pouvez effectuer une suppression définitive des données dans un intervalle de temps donné. Avec une suppression définitive, **toutes** les données sont supprimées ; il n'est pas possible de cibler une application spécifique. Si vous avez besoin de supprimer des données, contactez [l'équipe d'assistance Datadog][14].

### Suppression des données personnelles et sensibles
Vous disposez de plusieurs options pour supprimer les informations personnellement identifiables (PII) et les données sensibles, notamment les adresses IP et la géolocalisation. Voici quelques scénarios dans lesquels des PII peuvent apparaître dans RUM :

- Noms d'actions sur les boutons (par exemple, "Afficher le numéro complet de la carte de crédit")
- Noms affichés dans les URL
- Événements de suivi personnalisés instrumentés par les développeurs de l'application

#### Masquer les noms d'actions
Par défaut, pour masquer tous les noms d'actions, vous pouvez utiliser l'option `enablePrivacyForActionName` conjointement avec le paramètre de confidentialité `mask`. Cette opération substitue automatiquement tous les noms d'actions non remplacés par l'espace réservé `Masked Element`. Ce paramètre est également conçu pour être compatible avec les [attributs de remplacement HTML][16] existants.

#### Données non structurées
Les PII incluses par inadvertance dans des données non structurées, telles que le nom d'un individu dans une zone de texte, ne peuvent être supprimées que via une demande de suppression de données pour un intervalle de temps spécifié.

En ce qui concerne les URL, vous avez la possibilité de suivre les pages vues manuellement pour supprimer toute PII ou d'utiliser beforeSend pour modifier le texte de l'URL.

Vous pouvez également transmettre tous les événements RUM via votre propre serveur (proxy) afin que les appareils des utilisateurs finaux ne communiquent jamais directement avec Datadog.

#### Adresse IP
Après avoir initialisé votre application RUM, vous pouvez choisir d'inclure ou non les données d'adresse IP ou de géolocalisation depuis l'onglet **Collecte des données utilisateur** :

{{< img src="data_security/data-security-rum-privacy-compliance-user-data-collection-1.png" alt="Vous pouvez inclure ou exclure les données de géolocalisation et d'adresse IP client depuis la page de gestion de l'application RUM" style="width:100%;" >}}

Après avoir désactivé la collecte des données IP, la modification est appliquée immédiatement. Les événements collectés avant la désactivation ne voient pas leurs données IP supprimées. Cette opération est effectuée au niveau du backend, ce qui signifie que le Browser SDK continue d'envoyer des données, mais que les adresses IP sont omises par les pipelines backend Datadog et supprimées au moment du traitement.

#### Géolocalisation
En plus de supprimer les adresses IP client, vous pouvez également choisir de désactiver la collecte de géolocalisation (pays, ville, comté), ou GeoIP, pour toutes les données collectées ultérieurement. Si vous décochez la case **Collecter les données de géolocalisation**, la modification est appliquée immédiatement. Les événements collectés avant la désactivation ne voient pas leurs données de géolocalisation supprimées. L'omission des données est effectuée au niveau du backend, ce qui signifie que le Browser SDK continue d'envoyer des données, mais que les données de géolocalisation sont omises par les pipelines backend Datadog et supprimées au moment du traitement.

### Rechercher proactivement des données sensibles avec Sensitive Data Scanner
[Sensitive Data Scanner][17] vous permet de rechercher et de nettoyer proactivement les données sensibles lors de l'ingestion par Datadog. Les événements RUM sont analysés sur le flux avant que les données ne soient stockées dans Datadog. Cet outil est capable de nettoyer, hacher ou masquer partiellement les données PII avant leur stockage. Il fonctionne en appliquant des règles de correspondance de modèles prêtes à l'emploi ou développées par le client. Si vous avez activé cette fonctionnalité, vous pouvez la trouver sur la [page **Gérer les données sensibles**][18].

## Options de confidentialité spécifiques à Session Replay
Consultez la section [options de confidentialité spécifiques à Session Replay][19].

### Pour aller plus loin

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
[16]: /fr/session_replay/browser/privacy_options/#override-an-html-element
[17]: /fr/security/sensitive_data_scanner/
[18]: https://app.datadoghq.com/organization-settings/sensitive-data-scanner/configuration
[19]: /fr/session_replay/browser/privacy_options
[20]: https://www.datadoghq.com/private-beta/product-analytics/