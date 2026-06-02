---
description: Découvrir comment configurer et personnaliser votre déploiement CloudPrem
  pour des performances et une sécurité optimales
further_reading:
- link: /cloudprem/install/
  tag: Documentation
  text: Installer CloudPrem
- link: /cloudprem/operate/sizing/
  tag: Documentation
  text: Dimensionner votre cluster
title: Configurer CloudPrem
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation

Après avoir installé CloudPrem, vous pouvez configurer votre déploiement pour répondre à vos exigences en matière d'environnement, de sécurité et de performances. Les principaux domaines de configuration incluent l'intégration des comptes, la configuration des ressources cloud, le dimensionnement des clusters, l'ingress et les options de traitement. Ces paramètres vous permettent d'adapter CloudPrem à vos besoins spécifiques.

Si vous ne voyez pas l'entrée CloudPrem dans le menu Logs, cela signifie que CloudPrem n'est pas activé sur votre compte. Rejoignez la [préversion de CloudPrem][1] pour activer CloudPrem sur votre compte.

{{< whatsnext desc="Personnaliser votre déploiement CloudPrem :">}}
   {{< nextlink href="/cloudprem/configure/indexes/" >}}Configurer les index{{< /nextlink >}}
   {{< nextlink href="/cloudprem/configure/pipelines/" >}}Configurer le traitement{{< /nextlink >}}
   {{< nextlink href="/cloudprem/configure/ingress/" >}}Configurer l'ingress{{< /nextlink >}}
   {{< nextlink href="/cloudprem/configure/lambda/" >}}Lambda Search Offloading{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/product-preview/cloudprem/