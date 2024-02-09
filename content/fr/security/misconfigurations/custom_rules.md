---
aliases:
- /fr/security/cspm/custom_rules
cascade:
  algolia:
    rank: 30
    subcategory: Cloud Security Posture Management
further_reading:
- link: security/cloud_security_management/guide/writing_rego_rules
  tag: Guide
  text: Commencer à rédiger ses propres règles Rego
- link: security/default_rules
  tag: Documentation
  text: Découvrir les règles de conformité de configuration cloud CMS Misconfigurations
    par défaut
- link: security/application_security/threats/protection/
  tag: Documentation
  text: En savoir plus sur les frameworks et les benchmarks de l'industrie
is_beta: true
kind: documentation
title: Règles personnalisées
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution Cloud Security Management Misconfigurations n'est pas disponible pour le <a href="/getting_started/site">site Datadog</a> ({{< region-param key="dd_site_name" >}}) que vous avez sélectionné.</div>
{{< /site-region >}}

## Présentation

Afin d'améliorer l'efficacité des règles appliquées à votre environnement servant à évaluer votre posture de sécurité, vous pouvez dupliquer des règles de conformité dans le but de les modifier. Il est également possible de créer vos propres règles à partir de zéro. Pour afficher la liste des types de ressources disponibles pour vos règles personnalisées, consultez la section relative au [schéma des ressources cloud][8].

## Dupliquer des règles

Pour dupliquer une règle, procédez comme suit :

1. Suivez l'une des méthodes ci-dessous pour trouver la règle à dupliquer :
   - Accédez à [**Security** > **Configuration** > **Cloud Security Management** > **Compliance Rules**][1], puis sélectionnez la règle à dupliquer pour ouvrir la page comportant ses détails.
   - Accédez à [**Security** > **Cloud Security Management** > **Explorer** > **Misconfigurations**][2], sélectionnez un problème de configuration pour afficher ses détails, puis sélectionnez l'option **Edit Rule** depuis le menu **Rule**.
2. Apportez les modifications de votre choix à la nouvelle règle.
3. Faites défiler la page des détails vers le bas, puis cliquez sur **Clone Rule**.

## Créer des règles

Pour créer une règle à partir de zéro, procédez comme suit :

1. Accédez à [**Security** > **Configuration** > **Cloud Security Management** > **Compliance Rules**][1].
2. Cliquez sur **New Rule** en haut à droite.
3. Sélectionnez le type de règle **Cloud Configuration**.
4. Spécifiez les types de ressources cloud pour lesquels vous rédigez la règle.
5. Rédigez la logique de la règle à l'aide de [Rego][3], un langage policy-as-code, en partant de zéro ou en vous basant sur le modèle Datadog. Lisez la section [Écrire des règles personnalisées avec Rego][4] pour en savoir plus. Veuillez noter que vous devez attribuer un statut « pass », « fail » ou « skip » aux ressources. Le cas contraire, les ressources sont ignorées.

   {{< img src="security/cspm/custom_rules/custom_rules_first_half.png" alt="Étapes des règles personnalisées" width="100%">}}

6. Ignorez les activités inutiles en spécifiant des requêtes, afin d'inclure ou d'exclure certaines ressources des problèmes de configuration.
7. Pour valider la logique de votre règle, sélectionnez des ressources et cliquez sur **Test Rule**. Examinez les ressources qui ont réussi ou échoué, ainsi que les tags de ressource correspondants.
8. Spécifiez une gravité (`Critical`, `High`, `Medium`, `Low` ou `Info`) pour la règle.
9. Sélectionnez une facette (par exemple, pour chaque type de ressource ou pour chaque ID de compte) et [spécifiez une cible][5] à partir de laquelle des notifications sont envoyées.
10. Dans la section **Say what's happening**, décrivez la notification et expliquez comment utiliser les options de notification pour en tirer profit. Lisez la section [Notifications][6] pour en savoir plus.
11. Spécifiez les tags à appliquer aux problèmes de configuration obtenus. Consultez la rubrique [Appliquer des tags aux problèmes de configuration](#appliquer-des-tags-aux-problemes-de-configuration) pour en savoir plus.
12. Cliquez sur **Save Rule**.

    {{< img src="security/cspm/custom_rules/custom_rules_second_half.png" alt="Étapes des règles personnalisées" width="100%">}}

## Appliquer des tags aux problèmes de configuration

Lorsque vous créez, dupliquez ou modifiez des règles de conformité CSM Misconfigurations, vous pouvez spécifier des tags à appliquer aux problèmes de configuration, afin de pouvoir les regrouper, filtrer et rechercher à l'aide de ces tags. Lors de la duplication d'une règle, certains tags sont conservés, tandis que d'autres sont supprimés (voir le tableau ci-dessous).

Vous pouvez attribuer pratiquement n'importe quelle paire key-value sous forme de tag. Le tableau suivant indique les tags utiles dans la plupart des scénarios de sécurité.

| Clé     | Valeurs valides    | Description |
| ------  | --------------- | ----------- |
| `scored` | `true`, `false` | Indique si la règle doit être incluse lors du score de posture global de l'organisation. Ce tag est automatiquement ajouté aux règles dupliquées. |
| `security` | `compliance` | Attribue une catégorie aux problèmes de configuration sur la [page Security Signals][7]. Ce tag ne peut pas être supprimé. |
| `requirement` | Chaîne | Interdit pour les règles personnalisées. Indique une exigence liée à un framework de conformité. N'ajoutez pas ce tag aux règles ne faisant pas partie d'un framework de conformité. |
| `cloud_provider` | `aws`, `gcp`, `azure` | Ce tag ne peut pas être supprimé. Il est défini automatiquement en fonction du type de ressource.  |
| `control` | Chaîne | Interdit pour les règles personnalisées. Indique un contrôle lié à un framework de conformité. N'ajoutez pas ce tag aux règles ne faisant pas partie d'un framework de conformité. |
| `source` | Chaîne provenant d'un ensemble défini qui est fourni par les fournisseurs cloud, tel que répertoriés dans la [facette source du Misconfigurations Explorer][2]. | Ce tag ne peut pas être supprimé. Il est ajouté automatiquement aux règles dupliquées. Il simplifie le regroupement des règles par fournisseur cloud. |
| `framework` | Chaîne | Interdit pour les règles personnalisées. Indique le framework de conformité auquel la règle appartient. Ce tag n'est pas automatiquement ajouté aux règles dupliquées. |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/rules?product=cspm&query=type%3A%28cloud_configuration%20OR%20infrastructure_configuration%29&all=false&product=cspm&sort=rule_name
[2]: https://app.datadoghq.com/security/compliance
[3]: https://www.openpolicyagent.org/docs/latest/
[4]: /fr/security/cloud_security_management/guide/writing_rego_rules/
[5]: /fr/security/misconfigurations/compliance_rules#set-notification-targets-for-compliance-rules
[6]: /fr/security/notifications/
[7]: https://app.datadoghq.com/security/
[8]: /fr/infrastructure/resource_catalog/schema/