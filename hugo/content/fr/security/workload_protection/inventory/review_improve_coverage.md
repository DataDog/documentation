---
description: Identifiez et comblez les lacunes de couverture de Workload Protection,
  dépannez les problèmes de déploiement de l'Agent et des règles, et examinez la couverture
  de détection dans l'ensemble de votre environnement.
disable_toc: false
title: Examinez et améliorez la couverture
---
Utilisez les procédures de cette page pour réduire les angles morts, vérifier l'alignement des politiques et aider Workload Protection à détecter et à répondre aux menaces dans l'ensemble de votre environnement. Vous pouvez intégrer ces vérifications dans les revues de conformité, de CI/CD et d'infrastructure.

Pour plus d'informations sur les vues et les statuts de Coverage, consultez [Coverage][1].

## Ordre d'examen recommandé {#recommended-review-order}

Utilisez cet ordre pour examiner la couverture dans l'ensemble de votre environnement :

1. Examinez l'environnement complet pour établir une base de référence. Validez que les ressources apparaissant comme entièrement couvertes disposent de politiques, de règles et d'Agents fonctionnels pour découvrir les échecs silencieux avant de traiter les lacunes visibles.
2. Identifiez les charges de travail non protégées ou partiellement protégées, puis hiérarchisez les ressources ayant le plus fort impact et la plus grande exposition pour l'entreprise.
3. Vérifiez le déploiement des politiques et des règles sur les ressources prioritaires, et recherchez les Agents obsolètes ou défectueux sur toutes les charges de travail restantes.
4. Mappez la couverture de détection sur MITRE ATT&CK, puis déployez ou mettez à jour les règles de détection pour combler les lacunes.
5. Réévaluez la couverture pour confirmer que vos modifications ont pris effet.
6. Enregistrez l'état final pour la conformité, les audits, la référence aux incidents et les comparaisons futures.

## Widget de couverture {#coverage-widget}

Le widget en haut de la page Couverture affiche le pourcentage de vos ressources sécurisées avec Workload Protection, ainsi que toutes les conclusions. Utilisez ses boutons pour enquêter sur les charges de travail non protégées et les Agents obsolètes ou incomplets.

{{< img src="security/workload_protection/coverage_page/coverage_top_widgets.png" alt="Widgets en haut de la page Couverture affichant la couverture des ressources, le statut de chargement des règles, l'adoption de Workload Protection et le déploiement de la configuration à distance" width="100%">}}

## Rechercher les charges de travail sans protection {#find-workloads-without-protection}

- {{< ui >}}View without WP{{< /ui >}} : Hosts exécutant le Datadog Agent sans Workload Protection activé. Ceci ouvre Fleet Automation, où vous pouvez [configurer Workload Protection][3].
- {{< ui >}}View without Agents{{< /ui >}} : Hosts n'exécutant pas le Datadog Agent, qui ne peuvent pas être évalués par Workload Protection. Ceci ouvre le catalogue d'infrastructure.

## Corrigez les erreurs de déploiement de politique ou de règle {#fix-policy-or-rule-deployment-errors}

Pour rechercher et corriger les ressources présentant des erreurs de règle :

1. Dans l'Explorer, filtrez par gravité {{< ui >}}Error{{< /ui >}}, ou dans la carte, sélectionnez un {{< ui >}}Error{{< /ui >}} hexagone.
2. Sélectionnez une ressource défaillante pour ouvrir son panneau latéral et examiner ses politiques. Les politiques avec des règles défaillantes affichent un statut de {{< ui >}}Error{{< /ui >}}.
3. Examinez le verdict d'une règle défaillante (par exemple, `syntax_error` ou `unknown`) et le message d'erreur pour comprendre pourquoi elle a échoué.
4. [Modifiez la règle][4] si nécessaire.
5. Redéployez et confirmez la correction dans la couverture.

## Recherchez les Agents obsolètes ou incomplets {#find-outdated-or-incomplete-agents}

- {{< ui >}}View outdated{{< /ui >}} : Ressources exécutant une version d'Agent antérieure à la version minimale prise en charge (`7.65.0`), qui pourrait ne pas prendre en charge les dernières fonctionnalités de Workload Protection.
- {{< ui >}}View incomplete{{< /ui >}} : Ressources signalant des données incomplètes ou non valides.

Mettez à jour ou déployez le Datadog Agent, puis confirmez que les ressources concernées signalent des données de couverture complètes.

## Examinez la couverture de détection {#review-detection-coverage}

Utilisez les facettes de l'Explorer sous les groupes {{< ui >}}Rule{{< /ui >}} et {{< ui >}}Policy{{< /ui >}} pour filtrer les ressources par contenu de détection appliqué. Filtrez par tactiques et techniques MITRE ATT&CK pour voir quelles parties du framework sont couvertes dans votre infrastructure.

Pour plus d'informations sur la carte MITRE ATT&CK disponible dans Cloud SIEM ou Workload Protection, consultez [Carte MITRE ATT&CK][2].

## Confirmez que les nouvelles règles sont chargées {#confirm-that-new-rules-are-loaded}

Vous pouvez utiliser Coverage pour tester et itérer sur des règles de sécurité personnalisées :

1. Rédigez et déployez une [nouvelle règle personnalisée][4].
2. Dans Coverage, recherchez la règle par ID de règle, ID de politique ou nom de host.
3. Confirmez que l'Agent a chargé la règle avec succès.
4. Si des erreurs apparaissent, examinez le verdict, corrigez la règle et redéployez.

[1]: /fr/security/workload_protection/inventory/
[2]: /fr/security/detection_rules/#mitre-attck-map
[3]: /fr/security/workload_protection/setup/
[4]: /fr/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules