---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/detection-as-code-cloud-siem/
  tag: Blog
  text: Créez, testez et mettez à l'échelle les détections en tant que code avec Datadog
    Cloud SIEM
- link: https://www.datadoghq.com/blog/cloud-siem-mitre-attack-map/
  tag: Blog
  text: Identifiez les lacunes pour renforcer la couverture de détection avec la carte
    MITRE ATT&CK de Datadog Cloud SIEM
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: Blog
  text: Mettre en place une couverture de sécurité suffisante pour votre environnement
    dans le cloud
- link: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/
  tag: Blog
  text: Bonnes pratiques pour la création de règles de détection personnalisées avec
    Datadog Cloud SIEM
- link: https://learn.datadoghq.com/courses/cloud-siem-detect-investigate-threats
  tag: Centre d'apprentissage
  text: Détectez et enquêtez sur les menaces avec Cloud SIEM
- link: https://learn.datadoghq.com/courses/cloud-siem-custom-rules
  tag: Centre d'apprentissage
  text: Écrivez des règles de détection Cloud SIEM personnalisées
title: Détectez et surveillez
---
## Présentation {#overview}

Surveillez votre télémétrie Datadog et utilisez des [règles de détection prêtes à l'emploi](#out-of-the-box-detection-rules) ou [créez des règles personnalisées](#custom-detection-rules) pour détecter les menaces. Lorsqu'une menace est détectée, un signal de sécurité est généré. De plus, vous pouvez ajouter des [suppressions](#suppressions) pour affiner les règles de détection afin qu'un signal ne soit pas généré dans des conditions spécifiques. Cela peut améliorer la précision et la pertinence des signaux de sécurité générés.

{{< img src="security/security_monitoring/detection_rules/detection_rule_side_panel.png" alt="Le panneau latéral d'une règle de détection affichant les conditions qui déclenchent un signal" style="width:100%;" >}}

## Règles de détection {#detection-rules}

### Règles de détection prêtes à l'emploi {#out-of-the-box-detection-rules}

Cloud SIEM vous fournit une liste étendue de [règles de détection prêtes à l'emploi][1]. Une fois que vous avez activé et configuré les packs de contenu Cloud SIEM, les règles de détection prêtes à l'emploi commencent automatiquement à analyser vos logs, vos événements Audit Trail et vos événements provenant d'Event Management.

Vous pouvez modifier les règles de détection prêtes à l'emploi et effectuer les actions suivantes :

- Modifier le nom de la règle.
- Étendre la requête. La requête d'origine ne peut pas être modifiée, mais vous pouvez y ajouter une requête personnalisée.
- Modifier le paramètre de gravité dans la section {{< ui >}}Set conditions{{< /ui >}}.
- Modifier le playbook.

### Règles de détection personnalisées {#custom-detection-rules}

Les règles de détection prêtes à l'emploi couvrent la majorité des scénarios de menace, mais vous pouvez également créer des règles de détection personnalisées pour vos cas d'utilisation spécifiques. Pour les règles de détection personnalisées, utilisez la syntaxe de recherche de logs pour créer et joindre des requêtes de logs afin de cibler des services, des comptes ou des événements individuels que vous souhaitez surveiller. Vous pouvez également enrichir ces requêtes avec des informations telles que la géolocalisation d'une adresse IP ou le code d'état d'une requête HTTP.

Pour les logs qui correspondent à la requête, vous pouvez définir des conditions pour déterminer s'il s'agit d'une menace et si un signal de sécurité doit être généré, ainsi qu'indiquer la gravité de la menace. Les signaux de sécurité fournissent des détails sur la menace et incluent un playbook personnalisable, qui fournit des informations telles que les politiques de sécurité et les étapes de remédiation.

Consultez [Règles de détection personnalisées][2] pour plus d'informations.

### Dépréciation de la règle {#rule-deprecation}

Des audits réguliers de toutes les règles de détection prêtes à l'emploi sont effectués afin de maintenir une haute fidélité de la qualité des signaux. Les règles obsolètes sont remplacées par une règle améliorée.

Le processus d'obsolescence des règles suit différentes étapes :

1. Un avertissement indiquant la date de dépréciation figure sur la règle. Dans l'interface utilisateur, l'avertissement s'affiche dans :
    - Panneau latéral des signaux, section {{< ui >}}Rule Details{{< /ui >}} > {{< ui >}}Playbook{{< /ui >}}
    - [Éditeur de règles][3] pour cette règle spécifique
2. Une fois la règle dépréciée, une période de 15 mois s'écoule avant que la règle ne soit supprimée. Ceci est dû à la période de rétention des signaux de 15 mois. Pendant cette période, vous pouvez réactiver la règle en [clonant la règle][3] dans l'interface utilisateur.
3. Une fois la règle supprimée, vous ne pouvez plus la cloner ni la réactiver.

## Suppressions {#suppressions}

Les signaux de sécurité vous avertissent des menaces potentielles pesant sur votre infrastructure, mais des faux positifs peuvent également être générés. Par exemple, un grand nombre de signaux de sécurité peuvent être déclenchés si un afflux soudain de requêtes est généré par le test de charge d'une application. Pour réduire les faux positifs dans de tels scénarios, vous pouvez définir une requête de suppression dans une règle de détection qui empêche la génération d'un signal. Vous pouvez également créer des règles de suppression pour définir des conditions de suppression générales sur plusieurs règles de détection.

Consultez [Suppressions][4] pour plus d'informations.

## Gravité dynamique {#dynamic-severity}

Vous pouvez ajuster la gravité des signaux de sécurité en fonction des actifs qu'ils affectent. Vous pouvez personnaliser les niveaux de gravité, appliquer des étiquettes personnalisées et isoler les modifications apportées à des règles spécifiques.

Consultez [Gravité dynamique][6] pour plus d'informations.

## Carte MITRE ATT&CK {#mitre-attck-map}

Après avoir configuré vos règles de détection, utilisez la [Carte MITRE ATT&CK][5] de Cloud SIEM pour explorer et visualiser vos règles par rapport au framework MITRE ATT&CK afin d'avoir une visibilité sur les techniques des attaquants.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/default_rules/#cat-cloud-siem-log-detection
[2]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules
[3]: /fr/security/detection_rules/#clone-a-rule
[4]: /fr/security/cloud_siem/detect_and_monitor/suppressions
[5]: /fr/security/cloud_siem/detection_rules/mitre_attack_map/
[6]: /fr/security/cloud_siem/detect_and_monitor/dynamic_severity