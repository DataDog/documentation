---
further_reading:
- link: /monitors/
  tag: Documentation
  text: Créer des monitors
- link: /monitors/notify/
  tag: Documentation
  text: Notifications de monitor
kind: documentation
title: Politiques de tagging de monitor
---

{{< beta-callout url="#" btn_hidden="true" >}}
La fonctionnalité Politiques de tagging de monitor est en version bêta privée. Pour en bénéficier, contactez l'assistance à l'adresse support@datadoghq.com.
{{< /beta-callout >}}

Les politiques de tagging de monitor vous permettent d'imposer la présence de certains tags et de certaines valeurs de tag sur vos monitors Datadog. Cette fonctionnalité est idéale pour optimiser l'attribution tout en faisant en sorte que les alertes passent par les systèmes et les workflows adéquats en vue de leur triage et de leur traitement.

Une fois configurées, les politiques de tagging s'appliquent à **tous** les monitors et tests Synthetic Datadog.

- Lorsque vous créez un monitor, celui-ci doit respecter les politiques de tagging de votre organisation.
- Les monitors existants qui enfreignent les politiques de tagging de votre organisation continuent de générer des alertes et des notifications, mais devront être mis à jour pour les rendre conformes si vous souhaitez modifier d'autres paramètres.

## Configurer des politiques de tagging de monitor

Pour configurer des politiques de tagging, accédez à la page **Monitors** > **Settings**. Cette page est uniquement disponible lorsque les politiques de tagging de monitor sont activées pour votre compte. Les politiques de tagging peuvent être utilisées de trois façons différentes :

- Imposer des tags avec des valeurs obligatoires
- Imposer des tags uniquement
- Tags facultatifs avec valeurs obligatoires

### Imposer des tags avec des valeurs obligatoires

Pour imposer un tag avec des valeurs obligatoires, cochez l'option **Required**, indiquez la clé de tag et saisissez les valeurs correspondantes. Dans cet exemple, le tag `cost_center` doit obligatoirement être appliqué aux monitors et la valeur doit être définie sur `cc1`, `cc2` ou `cc3`.

{{< img src="monitors/settings/monitor_tag_enforcement_key_and_value.png" alt="La page des paramètres des monitors affiche une politique de tagging imposant un tag avec des valeurs obligatoires"  >}}

### Imposer des tags uniquement

Vous avez également la possibilité d'imposer un tag, mais de laisser les utilisateurs spécifier les valeurs de leur choix. Dans cet exemple, le tag `product_id` doit obligatoirement être appliqué aux monitors. La valeur peut être choisie librement par l'utilisateur.

{{< img src="monitors/settings/monitor_tag_enforcement_key_only.png" alt="La page des paramètres des monitors affiche une politique de tagging imposant uniquement un certain tag"  >}}

### Tag facultatif avec valeurs obligatoires

Pour rendre un tag facultatif mais imposer l'utilisation de valeurs spécifiques lorsque le tag est appliqué à des monitors, saisissez les valeurs du tag dans le champ **Values**. Dans cet exemple, le tag `env` est facultatif. Toutefois, si un monitor utilise ce tag, la valeur doit être définie sur `dev`, `staging` ou `prod`.

{{< img src="monitors/settings/monitor_tag_enforcement_optional_key_with_values.png" alt="La page des paramètres des monitors affiche une politique de tagging avec un tag facultatif et des valeurs obligatoires"  >}}

## Autorisations

Pour configurer des politiques de tagging de monitor, vous devez disposer d'un rôle bénéficiant de l'autorisation `MONITOR_CONFIG_POLICY_WRITE_PERMISSION`.

Pour en savoir plus, consultez les sections [Contrôle d'accès à base de rôles (RBAC)][2] et [Autorisations des rôles Datadog][3].

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /fr/account_management/rbac/
[3]: /fr/account_management/rbac/permissions/