---
aliases:
- /fr/security_platform/notifications/
further_reading:
- link: /security/notifications/rules/
  tag: Documentation
  text: Configurez et paramétrez les règles de notification
- link: /security/notifications/variables/
  tag: Documentation
  text: Découvrez les variables de notification pour personnaliser les notifications
- link: /security/detection_rules/
  tag: Documentation
  text: Explorer les règles de détection
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: app-sec
  name: Protection des applications et des API
  url: /security/application_security/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Notifications
---
{{< product-availability >}}

## Présentation {#overview}

Les notifications vous aident à tenir votre équipe informée lorsqu'un constat ou un signal de sécurité est détecté. Les constats et les signaux de sécurité sont générés lorsqu'au moins un cas défini dans une [règle de détection][2] est satisfait au cours d'une période donnée. En alertant rapidement votre équipe, les notifications garantissent qu'une action immédiate peut être entreprise pour résoudre tout problème de sécurité potentiel, améliorant ainsi la posture de sécurité globale de votre organisation.

## Types de notification {#notification-types}

Les notifications peuvent être configurées pour des [règles de détection](#detection-rules) individuelles, ainsi que de manière plus large avec des [règles de notification](#notification-rules).

### Règles de détection {#detection-rules}

Lorsque vous [créez ou modifiez une règle de détection][2], vous pouvez définir les notifications qui sont envoyées. Par exemple, vous pouvez ajouter des cas de règle pour déterminer quand une règle de détection déclenche un signal de sécurité. 

Vous pouvez également personnaliser le message de notification à l'aide du Markdown et de [variables de notification][1]. Cela vous permet de fournir des détails supplémentaires sur le signal en faisant référence à ses tags et à ses attributs d'événement. Vous pouvez également ajouter des tags au signal généré, par exemple `attack:sql-injection-attempt`.

### Règles de notification {#notification-rules}

Les règles de notification vous permettent de définir des préférences d'alerte générales qui s'appliquent à plusieurs règles de détection, constats et signaux, au lieu de devoir configurer des préférences de notification pour chaque règle de détection individuelle. Par exemple, vous pouvez configurer une règle de notification pour envoyer une notification si un signal de gravité `CRITICAL` ou `HIGH` est déclenché. Consultez [Règles de notification][3] pour plus d'informations sur la configuration et le paramétrage.

## Canaux de notification {#notification-channels}

Les notifications peuvent être envoyées à des personnes et à des équipes via Slack, Jira, PagerDuty, des webhooks, des dossiers, des e-mails et bien d'autres canaux. Vous pouvez également utiliser le [routage dynamique][6] pour envoyer automatiquement les notifications de constat à l'équipe responsable en fonction du tag `team` associé au constat.

### Integrations {#integrations}

{{% notifications-integrations %}}

#### Créez un webhook pour l'automatisation de la sécurité {#create-a-webhook-for-security-automation}

Vous pouvez utiliser des webhooks pour envoyer des alertes vers d'autres plateformes, telles que les plateformes SOAR. Pour configurer un webhook :

1. Accédez à l'intégration [Webhooks][4].
1. Cliquez sur {{< ui >}}\+ New{{< /ui >}} dans la section {{< ui >}}Webhooks{{< /ui >}}.
1. Saisissez un nom pour le webhook.
1. Saisissez l'URL du webhook.
1. Dans la section {{< ui >}}Payload{{< /ui >}}, sélectionnez {{< ui >}}Security Signal{{< /ui >}}.
  {{< img src="security/security_signal_payload.png" alt="La charge utile de sécurité du signal des webhooks" style="width:100%;" >}}
1. Consultez la documentation [intégration Webhooks][5] pour plus d'informations sur l'ajout de variables, de variables personnalisées, d'en-têtes personnalisés et l'encodage sous forme de formulaire.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Pour utiliser le webhook, ajoutez `@webhook-<WEBHOOK_NAME>` à la section de notification de la règle.

### Teams {#teams}

{{% notifications-teams %}}

### Cas {#cases}

{{% notifications-cases %}}

Vous pouvez également ajouter des signaux associés à un dossier existant, au lieu de créer un nouveau dossier pour chaque signal. Consultez [Regrouper les signaux dans des dossiers][7].

### E-mail {#email}

{{% notifications-email %}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/notifications/variables/
[2]: /fr/security/detection_rules/#creating-and-managing-detection-rules
[3]: /fr/security/notifications/rules/
[4]: https://app.datadoghq.com/integrations/webhooks
[5]: /fr/integrations/webhooks/
[6]: /fr/security/notifications/rules/#dynamic-routing
[7]: /fr/security/cloud_siem/triage_and_investigate/signal_grouping/