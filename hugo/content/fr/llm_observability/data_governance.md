---
aliases:
- /fr/llm_observability/data_privacy_security_and_rbac/
- /fr/llm_observability/data_security_and_rbac/
description: Contrôlez l'accès aux données sensibles d'Agent Observability grâce aux
  contrôles d'accès aux données et au RBAC, masquez les données avec des processeurs
  de spans et découvrez combien de temps Agent Observability conserve chaque type
  de données.
further_reading:
- link: /account_management/rbac/data_access
  tag: Documentation
  text: En savoir plus sur les contrôles d'accès aux données
- link: /llm_observability/improve/datasets/
  tag: Documentation
  text: Travailler avec des jeux de données et des versions de jeux de données
- link: /data_security/data_retention_periods/
  tag: Documentation
  text: Voir les périodes de rétention de données par défaut pour les produits Datadog
- link: https://www.datadoghq.com/pricing/?product=llm-observability#products
  tag: Tarification
  text: Tarification d'Agent Observability
title: Gouvernance des données
---
{{< whatsnext desc=" ">}}
  {{< nextlink href="https://datadoghq.com/legal/hipaa-eligible-services">}}<u>Services éligibles HIPAA</u> : liste des services éligibles HIPAA de Datadog Legal{{< /nextlink >}}
{{< /whatsnext >}}

## Contrôle d'accès aux données {#data-access-control}

Agent Observability vous permet de restreindre l'accès aux données potentiellement sensibles associées à vos applications d'IA à certaines équipes et certains rôles uniquement au sein de votre organisation. Ceci est particulièrement important lorsque vos applications d'IA traitent des informations sensibles telles que des données personnelles, des informations commerciales propriétaires ou des interactions utilisateur confidentielles.

Les contrôles d'accès dans Agent Observability reposent sur la fonctionnalité [Data Access Control][11] de Datadog, qui vous permet de réguler l'accès aux données jugées sensibles. Vous pouvez utiliser la balise `ml_app` pour identifier et restreindre l'accès à des applications d'IA spécifiques au sein de votre organisation.

Vous pouvez également restreindre des projets Agent Observability individuels, y compris leurs expériences, jeux de données, enregistrements de jeux de données et files d'attente d'annotation. Consultez [Data Access Control in Agent Observability][14].

## Masquage de données avec des processeurs de spans {#redacting-data-with-span-processors}

Vous pouvez masquer ou modifier des données sensibles au niveau de l'application avant qu'elles ne soient envoyées à Datadog. Utilisez les processeurs de spans dans le SDK Agent Observability pour modifier conditionnellement les données d'entrée et de sortie sur les spans, ou empêcher totalement l'émission de spans.

Ceci est utile pour :
- Supprimer des informations sensibles des prompts ou des réponses
- Filtrer les workflows internes ou les données de test
- Masquer conditionnellement des données en fonction de balises ou d'autres critères

Pour des exemples d'implémentation détaillés et des modèles d'utilisation, consultez la [section Span Processing dans la référence du SDK][12].

## Intégration de Sensitive Data Scanner {#sensitive-data-scanner-integration}

Agent Observability s'intègre à [Sensitive Data Scanner][13], ce qui aide à prévenir les fuites de données en identifiant et en masquant toute information sensible (telle que des données personnelles, des détails financiers ou des informations propriétaires) pouvant être présente à n'importe quelle étape de votre application d'IA.

En recherchant de manière proactive les données sensibles, Agent Observability aide à garantir que les conversations restent sécurisées et conformes aux réglementations sur la protection des données. Cette couche de sécurité supplémentaire renforce l'engagement de Datadog à maintenir la confidentialité et l'intégrité des interactions des utilisateurs avec vos applications d'IA.

## Rétention des données {#data-retention}

Les périodes de rétention dans Agent Observability dépendent du type de données et de votre plan. Les traces de vos applications instrumentées suivent la période de rétention des spans de votre plan, tandis que les expériences, les jeux de données et les prompts ont leurs propres périodes.

| Données                                         | Période de rétention                                                                          |
| -------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Traces et spans                             | 15 jours ; 30, 60 ou 90 jours avec un module complémentaire de rétention                                       |
| Expériences                                  | Offre gratuite et plans à la demande : 15 jours. Plans avec engagement : 90 jours. Avec un module complémentaire de rétention : 6, 9 ou 12 mois |
| Interactions annotées et libellés            | 90 jours à compter de l'annotation, ou votre période de rétention des spans si celle-ci est plus longue      |
| Enregistrements de jeux de données                              | Version actuelle : 3 ans. Versions précédentes : 90 jours, réinitialisés lors de l'utilisation                     |
| Prompts dans le registre de prompts               | 3 ans, prolongés à chaque fois que le prompt est extrait                                          |
| `ml_obs.*`Métriques                           | 15 mois                                                                                 |

### Traces et spans {#traces-and-spans}

Les traces et spans de vos applications instrumentées sont conservés par défaut pendant **15 jours** sur tous les plans. Cela s'applique à tout ce qui est stocké sur le span, y compris les données opérationnelles par span telles que le coût, le nombre de jetons, la latence et les erreurs, ainsi que les scores d'évaluation attachés aux spans.

Un module complémentaire de rétention étend cette durée à **30, 60 ou 90 jours**. Les modules complémentaires ne sont pas disponibles avec l'offre gratuite. Voir [Modifier votre période de rétention](#changing-your-retention-period).

La rétention s'applique aux spans bruts que vous interrogez dans l'explorateur de traces (Trace Explorer). Les métriques dérivées de ces spans sont conservées séparément, plus longtemps. Voir [Métriques](#metrics).

### Experiments {#experiments}

Sur les plans avec engagement, les [expériences][3] sont conservées plus longtemps que les traces de production.

| Plan                                | Rétention des expériences |
| ----------------------------------- | -------------------- |
| Offre gratuite                        | 15 jours             |
| À la demande                          | 15 jours             |
| Avec engagement (mensuel ou annuel)   | 90 jours             |
| Module complémentaire de rétention 30 jours | 6 mois               |
| Module complémentaire de rétention 60 jours | 9 mois               |
| Module complémentaire de rétention 90 jours | 12 mois              |

Si votre organisation dispose d'un contrat personnalisé, vos périodes de rétention peuvent ne pas correspondre à ce tableau. Contactez votre représentant de compte Datadog pour confirmer vos périodes.

### Modifier votre période de rétention {#changing-your-retention-period}

La durée de rétention affecte votre facturation, car une période plus longue signifie que Datadog stocke davantage de vos données. Pour connaître les tarifs, consultez la [page de tarification d'Agent Observability][10].

Les modules complémentaires de rétention sont mis en place par votre équipe de compte plutôt que d'être activés depuis la Datadog UI. Pour demander une période de rétention plus longue, contactez votre représentant de compte Datadog ou le [support Datadog][1].

Lorsque vous ajoutez ou étendez un module complémentaire de rétention, la période plus longue s'applique **rétroactivement à chaque span qui n'a pas encore expiré**. Les spans qui ont expiré au cours de votre période précédente ne sont pas récupérables.

Par exemple, si vous utilisez la rétention par défaut de 15 jours et que vous ajoutez un module complémentaire de 60 jours aujourd'hui, les spans des 15 derniers jours bénéficient de la période de 60 jours, mais tout ce qui est plus ancien a déjà disparu.

Lorsque vous passez à une période de rétention plus courte, les spans antérieurs à la nouvelle période ne sont plus disponibles.

### Interactions annotées {#annotated-interactions}

L'annotation d'une interaction étend sa rétention. Lorsque vous appliquez une étiquette d'annotation ou une note à une trace, un span ou une session — que ce soit directement ou via une [file d'attente d'annotation][2] — Datadog conserve l'interaction annotée pendant **90 jours** à compter du moment de l'annotation, même si votre période de rétention des spans est plus courte. L'annotation d'un span conserve l'intégralité de sa trace parente, et l'annotation d'une trace appartenant à une session conserve l'intégralité de la session.

Les étiquettes d'annotation sont conservées pendant la même période que les interactions qu'elles annotent.

L'extension de la rétention par l'annotation d'une interaction n'entraîne pas de frais supplémentaires.

### Enregistrements de jeux de données {#dataset-records}

Les enregistrements de la version actuelle d'un [dataset][4] sont conservés pendant **3 ans**, indépendamment de votre période de rétention des spans.

Les enregistrements des versions précédentes d'un jeu de données sont conservés pendant **90 jours**. Cette période est réinitialisée à chaque utilisation d'une version précédente, par exemple lorsqu'une expérience lit cette version. Après 90 jours consécutifs sans utilisation, une version précédente devient éligible à une suppression permanente. Pour plus de détails, consultez [Dataset versioning][5].

### Prompts {#prompts}

Les prompts du [prompt registry][9] sont conservés pendant **3 ans**. Cette période est prolongée à chaque fois que le prompt est extrait par votre application, de sorte qu'un prompt en cours d'utilisation reste disponible. Un prompt qui n'est pas extrait pendant 3 ans peut être supprimé définitivement.

### Métriques {#metrics}

Les `ml_obs.*` métriques générées à partir de vos spans sont des [métriques Datadog][6] standard et suivent la [rétention standard des métriques Datadog][7] : 15 mois avec une granularité complète. Elles sont conservées selon ce planning indépendamment de votre période de rétention des spans. Vous pouvez donc créer des dashboards et des monitors à long terme sur le nombre de spans, l'utilisation des jetons, le coût, la latence et les taux d'erreur, même après l'expiration des spans sous-jacents.

Pour obtenir la liste complète des métriques disponibles, consultez les [métriques d'Agent Observability][8].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: /fr/llm_observability/investigate/annotation_queues/
[3]: /fr/llm_observability/improve/experiments/
[4]: /fr/llm_observability/improve/datasets/
[5]: /fr/llm_observability/improve/datasets/#dataset-versioning
[6]: /fr/metrics/
[7]: /fr/data_security/data_retention_periods/
[8]: /fr/llm_observability/investigate/metrics/
[9]: /fr/llm_observability/configure/prompt_management/
[10]: https://www.datadoghq.com/pricing/?product=llm-observability#products
[11]: /fr/account_management/rbac/data_access
[12]: /fr/llm_observability/instrument/sdk/#span-processing
[13]: /fr/security/sensitive_data_scanner/
[14]: /fr/llm_observability/improve/access_control/