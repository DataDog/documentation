---
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: En savoir plus sur le RUM Explorer
- link: /logs/log_collection/javascript/
  tag: Documentation
  text: Découvrir comment utiliser le SDK Browser Datadog pour les logs
kind: documentation
title: Surveillance Browser avec RUM
---

## Présentation

Real User Monitoring (RUM) de Datadog permet dʼobtenir des informations détaillées sur les performances frontend de votre application. Surveillez les données réelles des utilisateurs pour optimiser votre expérience Web et proposer les meilleures expériences utilisateur possibles. Mettez en corrélation les tests Synthetic, les métriques de backend, les traces, et les logs en un seul endroit pour identifier et résoudre les problèmes de performance sur l'ensemble de la pile.

Datadog vous aide à comprendre le niveau actuel de l'expérience utilisateur, à identifier les domaines à améliorer et à mesurer le succès de chaque changement et/ou déploiement. Utilisez ces informations pour identifier et résoudre les problèmes frontend imprévus avant que les utilisateurs ne soient affectés, afin de proposer la meilleure expérience possible.

Avec le SDK Browser RUM de Datadog, vous pouvez également :

- Surveiller les consultations de pages et les performances de votre application afin d'étudier les éventuels problèmes
- Obtenir une visibilité complète, de bout en bout, sur les ressources et les requêtes (comme les images, les fichiers CSS, les ressources JavaScript et les fichiers de polices).
- Collecter et surveiller automatiquement tous les événements intéressants avec lʼensemble du contexte pertinent, et collecter manuellement les erreurs qui ne sont pas automatiquement suivies.
- Suivre les interactions des utilisateurs au cours de leur utilisation afin d'obtenir des informations sur leur comportement tout en respectant les exigences en matière de confidentialité.
- Mettre en évidence les difficultés des utilisateurs à l'aide de signaux de frustration.
- Identifier la cause d'une erreur au niveau de la ligne de code pour la résoudre.

{{< img src="real_user_monitoring/browser/rum-browser-overview.png" alt="Dashboard de synthèse des performances RUM" style="width:100%;">}}

## Prise en main

Pour commencer à utiliser le SDK Browser RUM, suivez les étapes pour [la création dʼune application RUM JavaScript][1].

À partir de là, vous pouvez modifier les [données et le contexte][2] que le SDK Browser RUM collecte pour les adapter à vos besoins spécifiques. Apprenez à remplacer les paramètres par défaut dans la section [Configuration avancée][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/setup/#setup
[2]: /fr/real_user_monitoring/browser/data_collected/
[3]: /fr/real_user_monitoring/browser/advanced_configuration/