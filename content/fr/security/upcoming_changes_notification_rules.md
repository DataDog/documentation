---
further_reading:
- link: /security/notifications/rules/
  tag: Documentation
  text: Présentation des notifications
- link: /security/notifications/
  tag: Documentation
  text: Règles de notification
is_beta: true
title: Changements à venir dans les règles des notifications de sécurité
---

Cet article présente les changements à venir dans la configuration des [règles de notification][1]. Bien que les changements les plus importants s'appliquent à [Cloud Security Management (CSM)][4], ils ont également un impact sur [Application Security Management][5] et [Cloud SIEM][6].

## Obsolescence des signaux pour CSM Misconfigurations

Actuellement, les notifications pour [CSM Misconfigurations][2] ne peuvent être configurées que pour les règles de détection dont les signaux sont activés, comme le montre le diagramme suivant :

**Workflow actuel** :

{{< img src="security/csm/notification_rules_old_workflow.png" alt="Diagramme affichant le workflow actuel pour l'activation des notifications pour CSM Misconfigurations" width="80%">}}

Dans le cadre des changements à venir dans les règles de notification, vous n'êtes plus obligé d'activer les signaux pour générer des notifications. Le nouveau workflow est illustré dans le diagramme suivant :

**Nouveau workflow** :

{{< img src="security/csm/notification_rules_new_workflow.png" alt="Diagramme affichant le workflow actuel pour l'activation des notifications pour CSM Misconfigurations" width="100%">}}

Cette modification a l'impact suivant sur la façon dont les notifications sont générées pour CSM Misconfigurations :

1. Vous pourrez désormais spécifier une mauvaise configuration comme type de source lors de la création des règles de notification.
2. Les signaux ne sont plus générés pour CSM Misconfigurations. Cela signifie également que les notifications ne peuvent plus être activées pour les règles de détection individuelles.

<div class="alert alert-warning">En raison de ce changement de comportement, vous remarquerez peut-être une augmentation du nombre de notifications générés. Si les conditions définies dans une règle de notification entraînent un nombre élevé de notifications, un message d'avertissement s'affiche dans le volet <strong>Preview of Matching Results</strong>.</div>

3. Les signaux de CSM Misconfigurations ne seront plus pris en charge fin 2024. Les anciens signaux seront conservés pendant 15 mois à compter de leur date de déclenchement (gratuitement).

## Sélecteur de types de sources de règles de notifications

Lorsque vous créez une règle de notification, vous devez désormais choisir entre deux types de source : Vulnérabilité ou Menace (Signal).

- Une vulnérabilité représente une faille de sécurité potentielle dans votre infrastructure.
- Une menace (signal) représente une activité suspecte qui constitue une menace active pour votre infrastructure.

{{< img src="security/csm/notification_rules_new_selectors_2.png" alt="Nouveaux types de source pour les règles de notification" width="75%">}}

## Autres changements

- Des règles de notification peuvent désormais être configurées pour les risques liés à l'identité et les chemins d'attaque.
- Les notifications de CSM Misconfigurations contiennent désormais l'intégralité des métadonnées des résultats. Auparavant, les notifications ne contenaient qu'un nombre limité de métadonnées sur les signaux.
- Les règles de détection personnalisées terraformées utilisant l'ancien attribut des notifications ne seront plus prises en charge.

## Comment migrer les notifications existantes

### Notifications des règles de détection

Pour migrer les notifications qui sont configurées pour des règles de détection individuelles :

1. Sur la [page relative aux règles des mauvaises configurations][1], sélectionnez une règle de détection pour laquelle les notifications sont activées.
2. Dans la bannière affichée dans la section **Set severity and notifications**, cliquez sur **Update in 1-Click**.

   La page d'édition **Notification Rules** s'affiche et montre les champs pré-remplis avec les informations de la règle.

3. Modifiez les paramètres, si vous le souhaitez.
4. Cliquez sur **Save and Activate**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/notifications/rules/
[2]: /fr/security/misconfigurations
[3]: https://app.datadoghq.com/security/configuration/compliance/rules
[4]: /fr/security/cloud_security_management/
[5]: /fr/security/application_security/
[6]: /fr/security/cloud_siem/
