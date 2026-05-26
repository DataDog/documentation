---
algolia:
  tags:
  - site
  - datadog site
description: Découvrez les différents sites Datadog pour votre région et vos exigences
  en matière de sécurité, y compris les options conformes aux réglementations gouvernementales.
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
## Aperçu {#overview}

Datadog propose différents sites à travers le monde. Chaque site est complètement indépendant, et vous ne pouvez pas partager de données entre les sites. Chaque site vous offre des avantages (par exemple, les réglementations de sécurité gouvernementales) ou vous permet de stocker vos données dans des emplacements spécifiques à travers le monde.

## Responsabilité partagée {#shared-responsibility}

La responsabilité de la sécurisation des données des utilisateurs est partagée entre Datadog et les développeurs qui utilisent les produits Datadog.

Datadog est responsable de :
- Fournir un produit fiable qui gère les données de manière sécurisée lorsqu'elles sont transmises et stockées sur la plateforme Datadog.
- S'assurer que les problèmes de sécurité sont identifiés conformément aux politiques internes.

Les développeurs sont responsables de :
- Exploiter les valeurs de configuration et les options de confidentialité des données fournies par Datadog.
- Assurer l'intégrité du code au sein de leurs environnements.

## Accédez au site Datadog {#access-the-datadog-site}

| Site    | URL du site                    | Paramètre du site      | Emplacement |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | US       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | US       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | US       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | EU (Allemagne) |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | US       |
| US2-FED | `https://us2.ddog-gov.com`  | `us2.ddog-gov.com`  | US       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | Japon |
| AP2     | `https://ap2.datadoghq.com` | `ap2.datadoghq.com` | Australie |

Si vous avez un domaine personnalisé, tel que `demo.datadoghq.com`, vous pouvez trouver votre site répertorié en haut de la page **Mes Préférences**.

{{< img src="getting_started/site/site-in-preferences.png" alt="Le haut de la page Mes Préférences dans Datadog, affichant le nom de l'organisation et l'URL du site." style="width:80%" >}}

Pour naviguer vers **Mes Préférences**, cliquez sur votre avatar de profil dans le coin inférieur gauche, puis sélectionnez **Mes Préférences** dans le menu.

{{< img src="getting_started/site/my-preferences-menu.png" alt="Le menu de compte Datadog, accessible en cliquant sur votre avatar de profil dans la navigation en bas à gauche, affichant l'option Mes Préférences sous Paramètres Personnels." style="width:80%" >}}

Pour envoyer des données vers plus d'une destination via plusieurs points de terminaison, consultez le guide [Dual Shipping][2].

## Domaines SDK {#sdk-domains}

Consultez les [endpoints pris en charge pour les domaines du SDK][3].

## Naviguer dans la documentation Datadog par site {#navigate-the-datadog-documentation-by-site}

Différents sites Datadog peuvent prendre en charge différentes fonctionnalités en fonction des exigences de sécurité de l'instance. Par conséquent, la documentation peut varier d'un site à l'autre. Vous pouvez utiliser le menu déroulant de sélection de site sur le côté droit de n'importe quelle page de la documentation Datadog pour sélectionner le site Datadog dont vous souhaitez voir les informations.

{{< img src="getting_started/site/site-selector-gs-with-tags.png" alt="Le menu déroulant de sélection de site sur le côté droit du site de documentation." style="width:100%" >}}

Par exemple, pour voir la documentation pour les sites Datadog pour le gouvernement, sélectionnez **US1-FED** ou **US2-FED**.

## Accéder aux sites Datadog pour le gouvernement {#access-the-datadog-for-government-sites}

### US1-FED {#us1-fed}

Le site Datadog pour le gouvernement (US1-FED) est le site autorisé FedRAMP Moderate de Datadog. US1-FED est destiné à permettre aux agences gouvernementales et aux partenaires américains de surveiller leurs applications et leur infrastructure. Pour des informations sur les contrôles de sécurité et de conformité d'US1-FED et sur la manière dont il prend en charge FedRAMP, consultez la [Security page][1].

### US2-FED {#us2-fed}

Le site Datadog pour le gouvernement (US2-FED) est en cours d'autorisation IL5. US2-FED est destiné à permettre aux agences gouvernementales et aux partenaires américains de surveiller leurs applications et leur infrastructure. Pour plus d'informations, envoyez un courriel à [fedramp@datadoghq.com][4].

## Lectures complémentaires : {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/security/
[2]: /fr/agent/configuration/dual-shipping/
[3]: /fr/real_user_monitoring/#supported-endpoints-for-sdk-domains
[4]: mailto:fedramp@datadoghq.com