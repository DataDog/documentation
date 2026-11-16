---
description: Restreignez l'accès aux données de télémétrie à l'aide de Data Access
  Control.
further_reading:
- link: /account_management/rbac/data_access
  tag: Documentation
  text: Data Access Control
- link: /security/sensitive_data_scanner/
  tag: Documentation
  text: Sensitive Data Scanner
- link: /administrators_guide/plan/#resource-tagging
  tag: Documentation
  text: 'Guide de l''administrateur : Tagging'
- link: /tracing/configure_data_security/
  tag: Documentation
  text: Sécurité des données
title: Protection des données sensibles
---
## Présentation {#overview}

Alors que [Protecting Assets][1] couvre qui peut modifier ou consulter les dashboards, les monitors et d'autres objets, cette section couvre *télémétrie* : les données sous-jacentes qui transitent par Datadog. Toutes les organisations n'ont pas besoin de restrictions au niveau des données, mais celles qui traitent des données sensibles ou réglementées ont besoin de [Data Access Control][2]. Data Access Control vous permet de créer des restrictions au niveau des lignes sur vos données, définies par des valeurs de tag, et appliquées dans chaque vue où ces données pourraient apparaître.

Cette section vous aide à identifier vos modèles de sensibilité des données et à choisir l'approche appropriée pour restreindre l'accès.

## Identification de vos modèles de sensibilité des données {#identifying-your-data-sensitivity-patterns}

Pour les restrictions sur les données sensibles, il existe trois modèles courants. Vous pouvez en utiliser un ou une combinaison des trois.

### Modèle 1 : Basé sur le type de données {#pattern-1-based-on-the-type-of-data}

Toutes les données d'un certain type sont sensibles, quelle que soit leur origine.

*Par exemple, les utilisateurs disposant de faibles privilèges ne devraient jamais pouvoir consulter les données de Logs, car elles contiennent toujours des informations sensibles. Ou un prestataire ne devrait pas avoir accès aux sessions RUM, car elles peuvent contenir des informations personnelles identifiables (PII) d'utilisateurs finaux.*

**Approche recommandée :** Créez un [rôle personnalisé][3] sans les autorisations de lecture pertinentes. Attribuez ce rôle à tous les utilisateurs, tels que les prestataires tiers, qui ne devraient pas pouvoir consulter ce type de données. Il s'agit d'une restriction au niveau des autorisations, et non d'une restriction liée à Data Access Control.

### Modèle 2 : Basé sur le service, l'infrastructure ou le propriétaire {#pattern-2-based-on-the-service-infrastructure-or-owner}

La sensibilité des données est déterminée par qui ou quoi produit les données, et non par le type de données lui-même. Certains services ou composants d'infrastructure génèrent des données qui devraient être restreintes à des équipes spécifiques.

*Par exemple, un service de traitement des paiements génère des traces APM, des Logs et des données RUM qui ne devraient être visibles que par l'équipe Paiements et les administrateurs principaux. Toute la télémétrie provenant de ce service est sensible, quel que soit son type.*

**Approche recommandée :** Utilisez [Data Access Control][2] pour créer des jeux de données restreints basés sur le tag (tel que `service:payment-processor`) parmi les types de télémétrie pertinents. Attribuez l'accès à l'équipe responsable et à tous les autres rôles ou équipes autorisés.

### Modèle 3 : Basé sur des classes de données protégées au sein d'un service {#pattern-3-based-on-protected-classes-of-data-within-a-service}

Les données sensibles sont mélangées à des données non sensibles provenant de la même source et du même type de télémétrie. Ceci est courant dans les secteurs réglementés où seuls certains enregistrements au sein d'un flux de données sont sensibles.

*Par exemple, dans une organisation de santé, un service peut générer des Logs opérationnels de routine qui peuvent être consultés par n'importe qui dans l'organisation, parallèlement à des données protégées par la loi HIPAA qui doivent être restreintes. Ou dans une institution financière, les données de trading via APM, les Logs et RUM doivent être restreints aux utilisateurs approuvés par la conformité, tandis que les données d'infrastructure générales provenant du même environnement sont largement accessibles.*

**Approche recommandée :** Utilisez Data Access Control pour créer des jeux de données restreints basés sur un tag de classification (tel que `data_sensitivity:hipaa` ou `data_classification:trading`) parmi les types de télémétrie concernés. Attribuez l'accès aux rôles ou aux équipes autorisés à consulter cette catégorie de données.

## Sensitive Data Scanner {#sensitive-data-scanner}

[Sensitive Data Scanner][4] fournit un filet de sécurité automatisé pour les situations où des données sensibles apparaissent de manière imprévisible. Par exemple, les développeurs peuvent enregistrer par inadvertance des numéros de carte de crédit, des adresses e-mail ou des numéros de sécurité sociale.

Sensitive Data Scanner est utile comme mesure de défense en profondeur parallèlement à Data Access Control, surtout lorsque vous ne pouvez pas garantir que les données sensibles sont taguées de manière cohérente lors de l'ingestion.

## Choisir le paramètre d'accès pour les données en dehors des jeux de données restreints {#choosing-the-access-setting-for-data-outside-restricted-datasets}

Utilisez le paramètre par défaut **Non restreint** pour appliquer les restrictions progressivement : toutes les données sont visibles par défaut, et vous créez des jeux de données restreints pour limiter l'accès à des données spécifiques. Ce modèle fonctionne bien lorsque les données sensibles sont l'exception, et non la règle.

Pour les organisations ayant des exigences réglementaires strictes (par exemple, la défense) ou les organisations qui collaborent avec plusieurs partenaires commerciaux externes dans le même tenant Datadog, Datadog propose le [**Restreint** paramètre][6] pour les données ne figurant pas dans les jeux de données restreints. Avec ce paramètre, les données sont masquées par défaut et les utilisateurs ne peuvent voir que les données auxquelles ils ont explicitement reçu l'accès. Au lieu de restreindre le sous-ensemble sensible, vous devez explicitement autoriser l'accès à tout.

Le paramètre **Restreint** est l'exception, et non la règle. Utilisez-le uniquement si votre cadre réglementaire ou juridique exige un modèle de refus par défaut pour l'accès à la télémétrie.

## Recommandations {#recommendations}

- **Identifiez le modèle qui vous correspond** avant de créer des jeux de données. De nombreuses organisations utilisent le modèle 2 (restrictions basées sur le service) comme modèle principal, avec le modèle 1 (restrictions basées sur le type via des rôles) en complément.
- **Utilisez les tags de manière cohérente.** Les restrictions de Data Access Control ne sont efficaces que si votre tagging l'est aussi. Assurez-vous que les services, l'infrastructure et les classifications de données sont tagués de manière cohérente lors de l'ingestion. Travaillez avec votre stratégie de tagging (voir le [Guide de l'administrateur][5]) pour vous assurer que les bons tags sont présents.
- **Commencez par vos données les plus sensibles.** N'essayez pas de créer des jeux de données pour tout en même temps. Identifiez les 3 à 5 services ou classes de données les plus sensibles et restreignez-les en priorité.
- **Conservez le paramètre par défaut Non restreint, sauf si vous avez une raison réglementaire de restreindre les données en dehors des jeux de données.** Le refus par défaut crée une charge opérationnelle importante et ne doit être utilisé que lorsque l'environnement réglementaire l'exige.
- **Combinez Data Access Control avec Sensitive Data Scanner** comme mesure de défense en profondeur, en particulier pour les Logs.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/access_for_enterprises/protecting_assets/
[2]: /fr/account_management/rbac/data_access
[3]: /fr/getting_started/access_for_enterprises/permissions/#custom-roles
[4]: /fr/sensitive_data_scanner/
[5]: /fr/administrators_guide/plan/#resource-tagging
[6]: /fr/account_management/rbac/data_access/#strict-mode