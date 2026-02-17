---
algolia:
  tags:
  - rum logs
further_reading:
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Real User Monitoring
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guide
  text: Diagnostics simplifiés grâce à la mise en corrélation entre produits
title: Connecter le RUM et les logs
---

{{< img src="real_user_monitoring/correlate_rum_and_logs/rum_browser_logs.png" alt="Logs du navigateur dans une action du RUM" style="width:100%;" >}}

## Section Overview

L'intégration RUM avec les logs vous permet d'avoir une visibilité complète sur l'état de votre application.

Utilisez les données frontend du RUM ainsi que les informations backend, d'infrastructure et de logs pour identifier les problèmes à tous les niveaux de votre stack et comprendre l'expérience de vos utilisateurs.

Pour commencer à envoyer des événements du RUM à Datadog, consultez la page [Real User Monitoring][1].

## Comment le RUM est-il corrélé avec les logs ?

Les événements du RUM et les logs sont automatiquement corrélés. La corrélation entre vos logs et le RUM facilite également l'utilisation d'[une stratégie d'échantillonnage agressive sans perte de cohérence au niveau des entités][2], grâce à des attributs comme `session_id` et `view.id`.

Pour en savoir plus, consultez la page [Facturation de RUM et Session Replay][3]. 
Pour garantir une corrélation correcte des **logs du navigateur**, vous devez [faire correspondre les configurations entre le SDK Browser RUM et le SDK Logs][4].

## Instructions de configuration

Pour accéder aux pages de configuration de Logs, suivez les liens ci-dessous en fonction de votre plateforme :

{{< partial name="rum/rum-correlate-rum-and-logs.html" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/
[2]: /fr/logs/guide/ease-troubleshooting-with-cross-product-correlation/#correlate-frontend-products
[3]: /fr/account_management/billing/rum/#how-do-you-view-logs-from-the-browser-collector-in-rum
[4]: /fr/logs/log_collection/javascript/#initialization-parameters