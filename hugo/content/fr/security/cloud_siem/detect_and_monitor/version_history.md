---
disable_toc: false
further_reading:
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
  tag: Documentation
  text: Créez une règle personnalisée
title: Historique des versions
---
## Présentation {#overview}

{{< img src="/security/security_monitoring/detection_rules/rule_version_history_20250207.png" alt="L'historique des versions pour une compromission de jeton d'accès OAuth GitHub montrant" style="width:80%;" >}}

Utilisez l'historique des versions de règle pour :

- Consulter les versions précédentes d'une règle de détection et comprendre les changements au fil du temps.
- Voir qui a effectué les changements pour une meilleure collaboration.
- Comparer les versions avec des différences pour analyser les modifications et l'impact des changements.

## Consultez l'historique des versions d'une règle {#see-version-history-of-a-rule}

Pour consulter l'historique des versions d'une règle :
1. Accédez à [Detection Rules][1].
1. Cliquez sur la règle qui vous intéresse.
1. Dans l'éditeur de règles, cliquez sur {{< ui >}}Version History{{< /ui >}} pour voir les modifications passées.
1. Cliquez sur une version spécifique pour voir les modifications apportées.
1. Cliquez sur {{< ui >}}Open Version Comparison{{< /ui >}} pour voir ce qui a changé entre les versions.
1. Sélectionnez les deux versions que vous souhaitez comparer.
    - Les données surlignées en rouge indiquent des données qui ont été modifiées ou supprimées.
    - Les données surlignées en vert indiquent des données qui ont été ajoutées.
1. Cliquez sur {{< ui >}}Unified{{< /ui >}} si vous souhaitez voir la comparaison dans le même panneau.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/rules