---
algolia:
  tags:
  - site
  - datadog site
description: Découvrez les différents sites Datadog adaptés à votre région et à vos
  exigences de sécurité, y compris les options conformes aux réglementations gouvernementales.
further_reading:
- link: https://learn.datadoghq.com/courses/dashboards-slos
  tag: Centre d'apprentissage
  text: Créer des informations vitales pour l'entreprise à l'aide de dashboards et
    de SLO
- link: /agent/configuration/dual-shipping/
  tag: Guide
  text: Transmission multiple
title: Débuter avec les sites Datadog
---
## Présentation {#overview}

Datadog propose différents sites à travers le monde. Chaque site est totalement indépendant et vous ne pouvez pas partager de données entre les sites. Chaque site vous offre des avantages (par exemple, la conformité aux réglementations gouvernementales en matière de sécurité) ou vous permet de stocker vos données dans des emplacements spécifiques à travers le monde.

## Responsabilité partagée {#shared-responsibility}

La responsabilité de la sécurisation des données des utilisateurs est partagée entre Datadog et les développeurs qui utilisent les produits Datadog.

Datadog est responsable de :
- Fournir un produit fiable qui traite les données de manière sécurisée lorsqu'elles sont transmises à la plateforme Datadog et y sont stockées.
- Veiller à ce que les problèmes de sécurité soient identifiés conformément aux politiques internes.

Les développeurs sont responsables de :
- Exploiter les valeurs de configuration et les options de confidentialité des données fournies par Datadog.
- Assurer l'intégrité du code au sein de leurs environnements.

## Accédez au site Datadog {#access-the-datadog-site}

| Site    | URL du site                    | Paramètre du site      | Emplacement |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | États-Unis       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | États-Unis       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | États-Unis       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | EU (Allemagne) |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | États-Unis       |
| US2-FED | `https://us2.ddog-gov.com`  | `us2.ddog-gov.com`  | États-Unis       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | Japon |
| AP2     | `https://ap2.datadoghq.com` | `ap2.datadoghq.com` | Australie |
| UK1     | `https://uk1.datadoghq.com` | `uk1.datadoghq.com` | Royaume-Uni        |

Si vous disposez d'un domaine personnalisé, tel que `demo.datadoghq.com`, vous trouverez votre site répertorié en haut de la page {{< ui >}}My Preferences{{< /ui >}}.

{{< img src="getting_started/site/site-in-preferences.png" alt="Le haut de la page My Preferences dans Datadog, affichant le nom de l'organisation et l'URL du site" style="width:80%" >}}

Pour accéder à {{< ui >}}My Preferences{{< /ui >}}, cliquez sur l'avatar de votre profil dans le coin inférieur gauche, puis sélectionnez {{< ui >}}My Preferences{{< /ui >}} dans le menu.

{{< img src="getting_started/site/my-preferences-menu.png" alt="Le menu de compte Datadog, accessible en cliquant sur l'avatar de votre profil dans la navigation en bas à gauche, affichant l'option My Preferences sous Personal Settings" style="width:80%" >}}

Pour envoyer des données vers plusieurs destinations via de multiples points de terminaison, consultez le guide [Dual Shipping][2].

## Domaines des SDK {#sdk-domains}

Consultez les [endpoints pris en charge pour les domaines du SDK][3].

## Naviguez dans la documentation Datadog par site {#navigate-the-datadog-documentation-by-site}

Différents sites Datadog peuvent prendre en charge différentes fonctionnalités en fonction des exigences de sécurité de l'instance. Par conséquent, la documentation peut varier d'un site à l'autre. Vous pouvez utiliser le menu déroulant de sélection de site situé sur le côté droit de n'importe quelle page de la documentation Datadog pour sélectionner le site Datadog sur lequel vous souhaitez obtenir des informations.

{{< img src="getting_started/site/site-selector-gs-with-tags.png" alt="Le menu déroulant de sélection de site sur le côté droit du site de documentation" style="width:100%" >}}

Par exemple, pour voir la documentation des sites Datadog for Government, sélectionnez {{< ui >}}US1-FED{{< /ui >}} ou {{< ui >}}US2-FED{{< /ui >}}.

## Accédez aux sites Datadog for Government {#access-the-datadog-for-government-sites}

Pour commencer avec Datadog for Government, envoyez un e-mail à [fed-sales@datadoghq.com][4]. Pour obtenir des informations sur les contrôles et cadres de sécurité et de conformité, consultez la [page Security][1].

### US1-FED {#us1-fed}

Le site Datadog for Government (US1-FED) est le site certifié FedRAMP High de Datadog. US1-FED est destiné à permettre aux agences gouvernementales américaines et à leurs partenaires de surveiller leurs applications et leur infrastructure.

### US2-FED {#us2-fed}

Le site Datadog for Government (US2-FED) est en cours de procédure d’autorisation IL5. US2-FED est destiné à permettre aux agences gouvernementales américaines et à leurs partenaires de surveiller leurs applications et leur infrastructure.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/security/
[2]: /fr/agent/configuration/dual-shipping/
[3]: /fr/real_user_monitoring/#supported-endpoints-for-sdk-domains
[4]: mailto:fed-sales@datadoghq.com