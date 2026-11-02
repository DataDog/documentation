---
disable_toc: false
title: Voyage impossible
---
## Présentation {#overview}

La méthode de voyage impossible détecte les accès depuis des emplacements différents dont la distance est supérieure à la distance qu'un humain peut parcourir dans le temps séparant les deux événements d'accès.

Consultez [Créer une règle][1] pour des instructions détaillées sur la façon de créer une règle de voyage impossible.

## Comment fonctionne la méthode de voyage impossible {#how-the-impossible-travel-method-works}

### Emplacements utilisateur de référence {#baseline-user-locations}

{{< img src="security/security_monitoring/detection_rules/impossible_travel_baseline_location.png" alt="Requête d'une règle de voyage impossible avec l'option des emplacements de référence mise en surbrillance" style="width:100%;" >}}

Lorsque vous configurez une requête pour votre règle de voyage impossible, vous pouvez activer {{< ui >}}Baseline User Locations{{< /ui >}} si vous souhaitez que Datadog apprenne les emplacements courants de chaque utilisateur avant que la règle ne commence à créer des signaux.

#### Emplacements utilisateur de référence désactivés {#baseline-user-locations-disabled}

Lorsque {{< ui >}}Baseline User Locations{{< /ui >}} est désactivé (par défaut) :

- Chaque log est évalué pour déterminer s'il contient un emplacement vers lequel il est impossible de voyager depuis un emplacement déjà rencontré.

- Le voyage est impossible entre deux emplacements si la vitesse de déplacement est supérieure à 1000 km/h et que la distance est supérieure à 500 km.

#### Emplacements utilisateur de référence activés {#baseline-user-locations-enabled}

Lorsque {{< ui >}}Baseline User Locations{{< /ui >}} est activé :

- Il existe une période d'apprentissage de 24 heures pour chaque utilisateur. Pendant cette période, Datadog apprend les emplacements courants (ville et pays) de chaque utilisateur et aucun signal n'est créé.
- Les emplacements rencontrés sont oubliés après 30 jours s'ils n'ont pas été rencontrés à nouveau.
- Si un nouvel emplacement est rencontré, Datadog :
    - Vérifie si l'emplacement fait partie des emplacements courants. S'il s'agit de l'un des emplacements courants, Datadog passe au log ou à l'événement suivant.
    - Vérifie s'il s'agit d'une situation de voyage impossible.
        - S'il ne s'agit pas d'une situation de voyage impossible, Datadog passe au log ou à l'événement suivant.
        - S'il s'agit d'une situation de voyage impossible, Datadog vérifie s'il existe un modèle de transition IP. Par exemple, si un utilisateur voyage d'un emplacement A à un emplacement B et que ce modèle de voyage s'est déjà produit par le passé, aucun signal n'est déclenché.

[1]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=impossible_travel