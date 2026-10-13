---
disable_toc: false
further_reading:
- link: /data_security/
  tag: Documentation
  text: Consulter les principales catégories de données envoyées à Datadog
- link: /data_security/pci_compliance/
  tag: Documentation
  text: Configurer une organisation Datadog conforme à la norme PCI
title: Sécurité des données Cloud SIEM
---
<div class="alert alert-info">Cette page concerne la sécurité des données envoyées à Datadog. Si vous recherchez des produits et fonctionnalités de sécurité cloud et applicative, consultez la section <a href="/security/" target="_blank">Sécurité</a>.</div>

## Présentation {#overview}

Datadog génère un signal de sécurité lorsqu'au moins un cas défini dans une règle de détection est mis en correspondance sur une période donnée. Vous pouvez personnaliser les règles de détection pour fournir des messages de notification contenant des informations spécifiques sur le signal (par exemple, l'ID utilisateur, les adresses IP, etc.) et les valeurs de regroupement déclenchantes du signal. Les règles de sécurité peuvent également utiliser des webhooks pour envoyer des notifications à des services tiers.

Comme les données envoyées à Datadog peuvent contenir des informations sensibles, ce document passe en revue ces fonctionnalités de notification et la marche à suivre si vous ne souhaitez pas que vos utilisateurs y aient accès.

## Les règles de sécurité peuvent utiliser des variables de modèle de message {#security-rules-can-use-message-template-variables}

Lorsque vous créez une règle de détection, vous pouvez personnaliser le message de notification avec des [variables de notification][1], ce qui ajoute des informations spécifiques liées au signal. Par exemple, si l'objet JSON suivant est associé à un signal de sécurité :

```
{
  "network": {
    "client": {
      "ip": "1.2.3.4"
    }
  },
  "user": {
    "id": "user@domain.com"
  },
  "used_mfa": "false"
}
```
L'utilisation de `{{@network.client.ip}}` dans le message de notification afficherait l'adresse IP associée au signal.

Contactez le [support][2] si vous souhaitez empêcher les utilisateurs d'ajouter des variables de modèle aux messages de notification.

## Les règles de sécurité peuvent inclure des valeurs de regroupement déclenchantes dans le titre de la notification {#security-rules-can-include-triggering-group-by-values-in-the-notification-title}

Dans les sections {{< ui >}}Describe your playbook{{< /ui >}} pour les [règles de détection][3], vous pouvez ajouter des valeurs de regroupement dans le titre de la notification. Par exemple, si vous effectuez un regroupement par `service`, le nom du service s'affiche dans le titre. Décochez {{< ui >}}Include triggering group-by values in notification title{{< /ui >}} pour empêcher les valeurs de regroupement d'apparaître dans le titre.

Contactez le [support][2] si vous souhaitez supprimer l'option {{< ui >}}Include triggering group-by values in notification title{{< /ui >}}.

## Les règles de sécurité peuvent utiliser des webhooks {#security-rules-can-use-webhooks}

<div class="alert alert-warning">Si votre organisation avait activé HIPAA en 2024 ou avant, contactez le <a href = "https://docs.datadoghq.com/help/">support Datadog</a> pour activer les webhooks pour les règles de sécurité.</a></div>

Les notifications de sécurité peuvent être envoyées à des [intégrations][4], telles que Jira, PagerDuty et des [webhooks][5]. Contactez le [support][2] pour empêcher les utilisateurs d'envoyer des notifications à des services tiers via des webhooks.

## Lectures complémentaires {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/notifications/variables/?tab=cloudsiem#template-variables
[2]: /fr/help/
[3]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule#describe-your-playbook
[4]: /fr/security/notifications/#integrations
[5]: /fr/integrations/webhooks/