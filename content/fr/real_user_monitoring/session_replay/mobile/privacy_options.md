---
aliases: null
description: Configurer des options de confidentialité pour Mobile Session Replay.
further_reading:
- link: /real_user_monitoring/session_replay/mobile
  tag: Documentation
  text: Session Replay sur mobile
- link: /real_user_monitoring/session_replay/mobile/app_performance
  tag: Documentation
  text: Impact de Mobile Session Replay sur les performances des applications
- link: /real_user_monitoring/session_replay/mobile/setup_and_configuration
  tag: Documentation
  text: Installer et configurer Mobile Session Replay
- link: /real_user_monitoring/session_replay/mobile/troubleshooting
  tag: Documentation
  text: Dépanner Mobile Session Replay
- link: /real_user_monitoring/session_replay
  tag: Documentation
  text: Session Replay
title: Options de confidentialité de Mobile Session Replay
---

## Présentation

Les paramètres de confidentialité de la fonctionnalité Session Replay permettent aux organisations de toute taille de masquer les données personnelles ou sensibles. Les données sont stockées sur des instances cloud gérées par Datadog et sont chiffrées au repos.

Les options de confidentialité par défaut de Session Replay protègent la vie privée des utilisateurs finaux et empêchent la collecte de données sensibles sur les organisations.

En activant Mobile Session Replay, vous pouvez automatiquement masquer les éléments sensibles pour qu'ils ne soient pas enregistrés par le SDK RUM Mobile. Lorsque les données sont masquées, elles ne sont pas collectées dans leur forme originale par les SDK de Datadog et ne sont donc pas envoyées au backend.

## Configuration des modes de masquage

En utilisant les modes de masquage ci-dessous, vous pouvez remplacer la configuration par défaut pour chaque application.

### Masquer tous les éléments de texte

Par défaut, le réglage `mask` est activé pour toutes les données. Lorsque ce réglage est activé, tout le contenu textuel à l'écran est masqué, comme illustré ci-dessous.

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-mask-all-2.png" alt="Lʼécran de votre ordinateur lorsque `mask` est activé." style="width:50%;">}}

{{< tabs >}}
{{% tab "Android" %}}

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   // masquer tous les éléments textuels
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
       .setPrivacy(SessionReplayPrivacy.MASK)
       .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

    // masquer tous les éléments textuels
    SessionReplay.enable(
        with: SessionReplay.Configuration(
            replaySampleRate: sampleRate,
            defaultPrivacyLevel: .mask
        )
    )

   {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Masquer uniquement les éléments de saisie

Lorsque le réglage `mask user input` est activé, tout champ de saisie est remplacé par un texte anonyme. 

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-user-input-2.png" alt="Lʼécran de votre ordinateur lorsque les champs de saisie sont masqués." style="width:50%;">}}

{{< tabs >}}
{{% tab "Android" %}}

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   // masquer uniquement les éléments de saisie
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
       .setPrivacy(SessionReplayPrivacy.MASK_USER_INPUT)
       .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}

   // masquer uniquement les éléments de saisie
    SessionReplay.enable(
        with: SessionReplay.Configuration(
            replaySampleRate: sampleRate,
            defaultPrivacyLevel: .maskUserInput
        )
    )

   {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

### Autoriser (pas de masque)

Lorsque le réglage `allow` est activé, lʼensemble du texte est affiché.

{{< img src="real_user_monitoring/session_replay/mobile/masking-mode-allow-all-2.png" alt="Lʼécran de votre application lorsque `allow` est activé." style="width:50%;">}}

**Remarque** : même si cette option est activée, les champs de texte sensibles, tels que les mots de passe, les courriels, les numéros de téléphone et les adresses sont toujours masqués. Pour en savoir plus, référez-vous aux [définitions du masquage de texte](#definitions-du-masquage-de-texte).

{{< tabs >}}
{{% tab "Android" %}}

   {{< code-block lang="javascript" filename="build.gradle" disable_copy="false" collapsible="true" >}}

   // aucun masque ; lʼensemble du texte est affiché
   val sessionReplayConfig = SessionReplayConfiguration.Builder([sampleRate])
      .setPrivacy(SessionReplayPrivacy.ALLOW)
      .build()
   SessionReplay.enable(sessionReplayConfig)
   {{< /code-block >}}

{{% /tab %}}
{{% tab "iOS" %}}

   {{< code-block lang="swift" filename="AppDelegate.swift" disable_copy="false" collapsible="true" >}}
   // no masking; all text is revealed
    SessionReplay.enable(
        with: SessionReplay.Configuration(
            replaySampleRate: sampleRate,
            defaultPrivacyLevel: .allow
        )
    )

   {{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

## Quelles données sont masquées et comment

Cette section décrit comment l'enregistreur Datadog gère le masquage en fonction du type de données et comment ces données sont définies. 
### Stratégies de masquage de texte

Selon la manière dont vous avez configuré vos paramètres de confidentialité, le type de texte et la sensibilité des données, les règles de masquage de Datadog appliquent des stratégies différentes aux différents types de champs de texte.

| Stratégie de masquage de texte | Rôle | Exemple |
|-----------------------|-------------|---------|
| Pas de masque | Le texte sʼaffiche dans le replay de la session | `"Hello world"` → `"Hello world"` |
| Masque préservant l'espace | Chaque caractère visible est remplacé par un « x » minuscule | `"Hello world"` → `"xxxxx xxxxx"` |
| Masque de longueur fixe | L'ensemble du champ de texte est remplacé par une constante de trois astérisques (***). | `"Hello world"` → `"***"`

En gardant à l'esprit les stratégies textuelles ci-dessus, plusieurs options sʼoffrent à vous si vous souhaitez remplacer la règle de confidentialité par défaut de `mask` dans votre configuration.

Le graphique suivant montre comment Datadog applique différentes stratégies de masquage de texte aux types de texte ci-dessous, en utilisant les règles que vous avez définies dans votre configuration.

| Type | Tout autoriser | Tout masquer | Masquer la saisie de l'utilisateur |
|------|-------------|------------|-------------------|
| [Texte sensible](#texte-sensible) | Masque de longueur fixe | Masque de longueur fixe | Masque de longueur fixe |
| [Texte de saisie et des options](#texte-de-saisie-et-des-options) | Pas de masque | Masque de longueur fixe | Masque de longueur fixe |
| [Texte statique](#texte-statique) | Pas de masque | Masque préservant l'espace | Pas de masque |
| [Texte dʼindication](#texte-de-l-indice) | Pas de masque | Masque de longueur fixe | Pas de masque |

### Définitions du masquage de texte

Vous trouverez ci-dessous une description de la manière dont l'enregistreur de Datadog traite chaque type de texte.

#### Texte sensible
On considère comme texte sensible les mots de passe, les courriels et les numéros de téléphone marqués d'une manière spécifique à chaque plate-forme
et d'autres formes de sensibilité du texte disponibles pour chaque plateforme.

Il s'agit notamment des mots de passe, des courriels et des numéros de téléphone :

- Champ de texte (iOS)
- Affichage du texte (iOS)
- Modification de texte (Android)
- Informations sur l'adresse (iOS + Android)
- Numéros de carte de crédit (iOS)
- Codes à usage unique (iOS)

#### Texte de saisie et des options

Lorsque lʼon parle de texte de saisie et des options, il sʼagit du texte saisi par l'utilisateur à l'aide d'un clavier ou d'un autre dispositif de saisie de texte, ou dʼune valeur personnalisée (non générique) dans les éléments de sélection.

Cela inclut les éléments ci-dessous.

- Texte saisi par l'utilisateur dans :
  - Champ de texte (iOS)
  - Affichage du texte (iOS)
  - Modification de texte (Android)
- Options sélectionnées par l'utilisateur dans :
  - Sélecteur de valeurs (iOS + Android)
  - Segment (iOS)
  - Liste déroulante (Android)
- Exclusions notables :
  - Texte des placeholders (indications) dans le champ de texte, l'affichage du texte et la modification de texte (non saisis par l'utilisateur)
  - Textes non modifiables en affichage du texte (iOS).
  - Etiquettes du mois, du jour et de l'année dans le sélecteur de date (valeurs génériques)

#### Texte statique
Le texte statique est tout texte qui n'est pas directement saisi par l'utilisateur. Il s'agit notamment des éléments suivants.

Tous les textes dans :

- Les titres des cases à cocher et des boutons radio (Android)
- Les textes dans l'affichage de texte non modifiable (iOS)
- Les étiquettes du mois, du jour et de l'année dans le sélecteur de date et d'heure
- Les valeurs mises à jour en réponse aux interactions gestuelles avec les éléments de saisie, comme la valeur actuelle du curseur.
- D'autres commandes, qui ne sont pas considérées comme des « éléments de saisie de l'utilisateur », comme les étiquettes, la barre onglet et la barre de navigation (iOS) ou les onglets (Android)

#### Texte dʼindication
Le texte d'indication est un texte statique dans les éléments de texte modifiables ou les sélecteurs d'options qui s'affiche lorsqu'aucune valeur n'est donnée. Il s'agit notamment des éléments suivants :

- Placeholders dans les champs de texte (iOS), lʼaffichage de texte (iOS)
- Indications dans la modification de texte (Android)
- Invites dans les listes déroulantes (Android)

### Masquage de l'aspect

Le graphique suivant montre comment nous appliquons différentes stratégies pour le masquage de lʼaspect aux types de texte ci-dessous, en utilisant les règles que vous avez définies dans votre configuration.

| Type | Tout autoriser | Tout masquer | Masquer la saisie de l'utilisateur |
|------|-------------|------------|-------------------|
| [Attributs révélateurs](#attributs-revelateurs) |  | {{< X >}} | {{< X >}} |
| [Autres attributs](#autres-attributs) |  |  |  |

#### Attributs révélateurs
Les attributs révélateurs sont des attributs qui peuvent révéler ou suggérer la valeur des éléments de saisie et qui peuvent être utilisés pour déduire une saisie ou une sélection d'un utilisateur.

Ceci inclut :

**Formes**
- LʼArrière-plan de l'option sélectionnée dans Segment (iOS)
- Le cercle entourant la date sélectionnée dans un sélecteur de date (iOS)
- La marque de sélection dans une case à cocher (Android)
- Le thumb d'un curseur (iOS et Android)

**Attributs de texte**
- La couleur d'une étiquette affichant la date sélectionnée dans le sélecteur de date (iOS)
- La position de la première et de la dernière option dans le sélecteur de valeur (iOS et Android).

### Interactions tactiles

Le graphique suivant montre comment nous appliquons différentes stratégies pour les interactions tactiles aux types de texte ci-dessous, en utilisant les règles que vous avez définies dans votre configuration. Toute interaction avec le clavier à l'écran est masquée, mais les interactions avec d'autres éléments ne le sont pas.

| Type | Tout autoriser | Tout masquer | Masquer la saisie de l'utilisateur |
|------|-------------|------------|-------------------|
| [Autres attributs](#autres-attributs) |  |  |  |
| [Clavier à l'écran](#clavier-a-l'ecran) | {{< X >}} | {{< X >}} | {{< X >}} |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}