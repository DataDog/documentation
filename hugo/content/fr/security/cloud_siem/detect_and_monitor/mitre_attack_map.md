---
aliases:
- /fr/security/cloud_siem/detection_rules/attack_map
- /fr/security/cloud_siem/detection_rules/mitre_attack_map
disable_toc: false
further_reading:
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/
  tag: Documentation
  text: Créer des règles de détection personnalisées
- link: https://www.datadoghq.com/blog/cloud-siem-mitre-attack-map/
  tag: Blog
  text: Identifiez les lacunes pour renforcer la couverture de détection avec la carte
    MITRE ATT&CK de Datadog Cloud SIEM
title: Carte MITRE ATT&CK
---
## Présentation {#overview}

<div class="alert alert-danger">La carte MITRE ATT&CK ne couvre que <a href="https://attack.mitre.org/matrices/enterprise/">MITRE ATT&CK Enterprise.</a></div>

Le framework MITRE ATT&CK est une base de connaissances utilisée pour développer des modèles et des méthodologies de menace spécifiques. Utilisez la carte Cloud SIEM MITRE ATT&CK pour explorer et visualiser le framework MITRE ATT&CK par rapport aux règles prêtes à l'emploi de Datadog et à vos règles de détection personnalisées. La carte MITRE ATT&CK affiche la densité des règles de détection sous forme de carte thermique pour offrir une visibilité sur les techniques des attaquants. Vos équipes de sécurité peuvent utiliser la carte thermique pour évaluer les lacunes de couverture pertinentes pour leur organisation ou leur équipe et prioriser les améliorations de leurs défenses basées sur les règles de détection.

## Afficher les règles de détection dans la carte MITRE ATT&CK {#view-detection-rules-in-the-mitre-attck-map}

Pour afficher les règles de détection par rapport au framework MITRE ATT&CK :
1. Accédez à la page [Detection Rules][1].
1. Cliquez sur le bouton {{< ui >}}MITRE ATT&CK Map{{< /ui >}} situé à côté de {{< ui >}}Rules List{{< /ui >}}.
1. Activez le bouton de redimensionnement en bas à gauche de la page pour basculer entre une vue développée et une vue condensée.

La vue par défaut de la carte affiche toutes les règles Datadog prêtes à l'emploi et personnalisées pour les sources actives, réparties selon différentes techniques d'attaque. Les sources actives sont les sources de logs trouvées et analysées dans l'index Cloud SIEM.

**Remarque** : Pour [Cloud SIEM Legacy][5], tous les logs ingérés sont analysés par Cloud SIEM, sauf si des [Security Filters][2] ont été configurés.

Pour afficher la carte pour toutes les sources, dans le menu déroulant {{< ui >}}Visualize{{< /ui >}}, sélectionnez {{< ui >}}All Sources{{< /ui >}}. Cela affiche toutes les règles prêtes à l'emploi, y compris celles qui ne sont pas actuellement utilisées pour détecter des menaces à partir de vos logs.

Cliquez sur les boutons de densité de règles pour visualiser la carte pour un nombre spécifique de règles. Par exemple, si vous cliquez sur {{< ui >}}High 7+{{< /ui >}}, seules les tuiles qui ont plus de sept règles activées sont affichées sur la carte.

### Afficher les informations d'une technique d'attaquant et les règles associées {#view-an-attacker-techniques-information-and-related-rules}

Pour afficher plus d'informations sur une technique et les règles surveillant cette technique :

1. Sur la page [MITRE ATT&CK Map][3], cliquez sur une tuile de technique.
1. Cliquez sur {{< ui >}}Create Custom Rule{{< /ui >}} si vous souhaitez créer une règle personnalisée pour cette technique. Consultez [Detection Rules][4] pour plus d'informations sur la création de règles personnalisées. **Remarque** : Pour que la règle personnalisée s'affiche dans les sources actives, le tag de source approprié doit être défini dans la règle de détection.
1. Dans la section {{< ui >}}Rules monitoring this Technique{{< /ui >}}, vous pouvez :
	1. Saisissez une requête de recherche pour filtrer des règles spécifiques.
  1. Triez par date de création, type de règle, nom de règle, source ou gravité la plus élevée.
  1. Activez {{< ui >}}Show deprecated rules{{< /ui >}} pour voir les règles obsolètes pour cette technique.

### Ajoutez des tags de technique et de tactique d'attaquant aux règles personnalisées {#add-attacker-technique-and-tactic-tags-to-custom-rules}

Les règles personnalisées ne s'affichent sur la carte que si elles sont taguées dans l'éditeur de règles avec la tactique et la technique MITRE correctes. La tactique et la technique doivent également être associées correctement. Si le format et l'association corrects ne sont pas utilisés, la règle ne s'affiche pas sur la carte lorsque vous utilisez la barre de recherche pour filtrer cette règle.

Voici un exemple du format que vous devez utiliser pour taguer les règles personnalisées et de l'association correcte des tags de tactique et de technique :

- `tactic:<tactic number>-<tactic name>`
    - Par exemple : `tactic:TA0001-Initial-Access`
- `technique:<technique number>-<technique name>`
    - Par exemple : `technique:T1566-Phishing`

Notez les détails de formatage suivants :
- Le préfixe de tag (`tactic` ou `technique`) **doit être en minuscules**
- Le numéro de la technique n'est pas sensible à la casse
    - Par exemple : `TA0001` ou `ta0001`
- Les tirets et les traits de soulignement sont interchangeables
    - Par exemple : `technique:T1566-Phishing` ou `technique:T1566_Phishing`

**Remarque** : La tactique et la technique doivent être basées sur la version de MITRE ATT&CK indiquée sur la page [MITRE ATT&CK Map][3].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/rules
[2]: /fr/security/cloud_siem/guide/customize-which-logs-cloud-siem-analyzes/
[3]: https://app.datadoghq.com/security/siem/rules?query=product=siem&sort=date&viz=attck-map
[4]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/?tab=threshold
[5]: /fr/security/cloud_siem/guide/determine-cloud-siem-product/