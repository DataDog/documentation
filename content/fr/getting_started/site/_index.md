---
algolia:
  tags:
  - site
  - datadog site
further_reading:
- link: https://learn.datadoghq.com/courses/dashboards-slos
  tag: Centre d'apprentissage
  text: Créer des informations vitales pour l'entreprise à l'aide de dashboards et
    de SLO
- link: /agent/configuration/dual-shipping/
  tag: Guide
  text: Transmission multiple
kind: documentation
title: Débuter avec les sites Datadog
---

## Présentation

Datadog propose différents sites disponibles dans le monde entier. Les sites sont tous indépendants. Il n'est pas possible de partager des données entre un site et un autre. Chaque site vous offre des avantages (par exemple, des réglementations gouvernementales en matière de sécurité) ou vous permet de stocker vos données dans des régions spécifiques.

## Responsabilité partagée

La responsabilité de la sécurisation des données des utilisateurs est partagée entre Datadog et les développeurs qui utilisent les produits Datadog.

Datadog est tenu :
- de fournir un produit fiable qui traite les données en toute sécurité lorsqu'elles sont transmises et stockées sur la plate-forme Datadog.
- de veiller à ce que les problèmes de sécurité soient identifiés conformément aux politiques internes.

Les développeurs sont tenus :
- dʼexploiter les valeurs de configuration et les options pour la confidentialité des données fournies par Datadog.
- dʼassurer l'intégrité du code au sein de leur environnements.

## Accéder au site Datadog

Vous pouvez identifier le site que vous utilisez en comparant l'URL du site Web Datadog à l'URL du site dans le tableau ci-dessous.

{{< img src="getting_started/site/site.png" alt="L'URL du site dans l'onglet d'un navigateur" style="width:40%" >}}

| Site    | URL du site                    | Paramètre du site      | Emplacement |
|---------|-----------------------------|---------------------|----------|
| US1     | `https://app.datadoghq.com` | `datadoghq.com`     | US       |
| US3     | `https://us3.datadoghq.com` | `us3.datadoghq.com` | US       |
| US5     | `https://us5.datadoghq.com` | `us5.datadoghq.com` | US       |
| EU1     | `https://app.datadoghq.eu`  | `datadoghq.eu`      | UE (Allemagne) |
| US1-FED | `https://app.ddog-gov.com`  | `ddog-gov.com`      | US       |
| AP1     | `https://ap1.datadoghq.com` | `ap1.datadoghq.com` | Japon |

**Remarque** : pour envoyer des données à plusieurs destinations via plusieurs endpoints, consultez le guide dédié à la [transmission multiple][2].

## Domaines du SDK

Consultez les [endpoints pris en charge pour les domaines du SDK][3].

## Accéder à la documentation Datadog pour un site précis

Les sites Datadog ne prennent pas tous en charge les mêmes fonctionnalités, en raison des différentes exigences en matière de sécurité. Ainsi, la documentation n'est pas la même pour chaque site. Vous pouvez utiliser le menu déroulant de sélection de site situé sur la droite de chaque page de documentation pour afficher les informations pertinentes selon votre site Datadog.

{{< img src="getting_started/site/site-selector-gs-with-tags.png" alt="Le menu déroulant de sélection de site situé à droite du site de documentation" style="width:100%" >}}

Par exemple, pour afficher la documentation Datadog pour le site gouvernemental, sélectionnez **US1-FED**.

{{% site-region region="gov" %}}

## Accéder au site gouvernemental de Datadog

Le site gouvernemental de Datadog (US1-FED) est destiné aux agences et partenaires gouvernementaux américains qui surveillent leurs applications et leur infrastructure. Pour en savoir plus sur les frameworks ainsi que sur les contrôles de sécurité et de conformité de ce site, et pour découvrir comment le site soutient le programme FedRAMP, consultez la [page relative à la sécurité][1].

[1]: https://www.datadoghq.com/security/
{{< /site-region >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[2]: /fr/agent/configuration/dual-shipping/
[3]: /fr/real_user_monitoring/#supported-endpoints-for-sdk-domains