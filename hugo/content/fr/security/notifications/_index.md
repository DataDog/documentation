---
aliases:
- /fr/security_platform/notifications/
further_reading:
- link: /security/notifications/rules/
  tag: Documentation
  text: Définir et configurer des règles de notification
- link: /security/notifications/variables/
  tag: Documentation
  text: Découvrir comment utiliser des variables de notification pour personnaliser
    des notifications
- link: /security/detection_rules/
  tag: Documentation
  text: Explorer les règles de détection
title: Notifications
---

## Présentation

Lorsqu'une menace est détectée par le système de sécurité de Datadog, un signal de sécurité est généré. Il est alors possible d'envoyer des notifications pour en informer votre équipe.

Vous pouvez définir des notifications pour certaines [règles de détection](#notifications-des-regles-de-detection) ou pour des [règles de notification](#regles-de-notification) plus larges. Consultez la section relative aux [variables de notification][1] pour découvrir comment personnaliser des notifications en fonction de la gravité du signal et du contexte spécifique de la menace.

## Canaux de notification

Envoyez des notifications par e-mail, sur Slack, Jira ou PagerDuty, ou via un webhook.

### E-mail

{{% notifications-email %}}

### Intégrations

{{% notifications-integrations %}}

## Notifications des règles de détection

Lorsque vous [créez ou modifiez une règle de détection][2], vous pouvez définir les notifications à envoyer à partir des sections **Set rule case** et **Say what's happening**.

### Définir un scénario de règle

Depuis la section **Set rule case**, ajoutez des scénarios de règle afin de définir les conditions pour lesquelles une règle de détection doit déclencher un signal de sécurité, ainsi que la gravité de ce dernier. Le menu déroulant **Notify** vous permet d'envoyer les notifications de signal générées par le scénario pertinent aux [destinataires sélectionnés](#canaux-de-notification).

### Section Say what's happening

La section **Say what's happening** vous permet de déterminer le contenu des signaux générés.

#### Nom du scénario

Attribuez un nom au scénario pour votre règle de détection. Ce nom est affiché dans la liste **Detection Rules**. Il s'agit également du titre du signal associé.

#### Message

Utilisez le format Markdown standard ainsi que des [variables de notification][1] pour ajouter des attributs d'événement et des tags, et ainsi fournir des détails spécifiques à propos du signal.

#### Tags

Le menu déroulant **Tag resulting signals** vous permet d'appliquer différents tags à vos signaux. Vous pouvez par exemple ajouter le tag `attack:sql-injection-attempt`.

## Règles de notification

Les règles de notification vous permettent de définir des préférences générales en matière d'alertes. Vous n'avez ainsi pas besoin de définir des paramètres de notification pour chaque règle de détection. Par exemple, vous pouvez définir une règle de notification qui envoie une notification lorsqu'un signal avec la gravité `CRITICAL` ou `HIGH` est déclenché. Pour en savoir plus sur la définition et la configuration des règles de notification, consultez la [documentation dédiée][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/notifications/variables/
[2]: /fr/security/detection_rules/#creating-and-managing-detection-rules
[3]: /fr/security/notifications/rules/