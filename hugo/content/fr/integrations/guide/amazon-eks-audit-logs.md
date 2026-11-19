---
description: Activez la collecte des logs d'audit Amazon EKS pour surveiller les actions
  du cluster avec Datadog Cloud SIEM.
title: Collecte de logs d'audit Amazon EKS
---
## Présentation {#overview}

Les logs d'audit Amazon EKS donnent aux administrateurs de cluster un aperçu des actions au sein d'un cluster EKS. Une fois la collecte de vos logs d'audit Amazon EKS activée, vous pouvez configurer et utiliser [Datadog Cloud SIEM][1] pour surveiller les actions injustifiées ou les menaces immédiates dès qu'elles surviennent au sein de votre cluster EKS.

## Configuration {#setup}

### Logs d'audit Amazon EKS {#amazon-eks-audit-logs}

#### Nouveau cluster {#new-cluster}

1. Si vous n'avez pas de cluster Amazon EKS, créez-en un en suivant la documentation [Création d'un cluster Amazon EKS][2].
1. Pendant la configuration, sur la page Configure logging, activez **Audit logs**.

#### Cluster existant {#existing-cluster}

1. Si vous avez déjà un cluster Amazon EKS configuré, accédez à votre cluster dans la [console Amazon EKS][2].
1. Cliquez sur votre cluster EKS.
1. Cliquez sur l'onglet **Logging**.
1. Cliquez sur le bouton **Manage logging**.
1. Réglez l'option **Audit** sur **Enabled**, puis cliquez sur le bouton **Save changes**.

### Intégration AWS Datadog {#datadog-aws-integration}

Ensuite, configurez l'intégration AWS. Suivez la documentation [Configuration de l'intégration AWS][3].

### Datadog Forwarder {#datadog-forwarder}

Une fois la configuration de votre intégration AWS terminée, installez et configurez le Datadog Forwarder. Suivez la documentation [Installation du Datadog Forwarder][4].

**Remarque** : l'ARN Lambda est requis pour l'étape [Configuration des déclencheurs][5]. Votre ARN Lambda est disponible en accédant à [Lambda > Functions > `Your_Function_Name`][6] dans la console AWS. Le Function ARN figure dans la section Function overview.

## Log Explorer {#log-explorer}

Une fois la configuration des logs d'audit Amazon EKS, de l'intégration Datadog/AWS et du Datadog Forwarder terminée, vous pouvez visualiser vos logs d'audit depuis le [Log Explorer Datadog][7].

**Remarque** : quelques secondes peuvent s'écouler avant que les logs commencent à arriver dans Log Explorer.

Pour afficher uniquement les logs d'audit EKS dans Log Explorer, saisissez `source:kubernetes.audit` dans la barre de recherche de Log Explorer ou, sous **Source** dans le panneau des facettes, sélectionnez la facette `kubernetes.audit` pour filtrer les logs d'audit EKS.

## Cloud SIEM {#cloud-siem}

La solution Datadog Cloud SIEM vous permet de détecter les problèmes de configuration potentiels et les attaques ciblant vos clusters EKS.

Pour commencer à surveiller vos logs d'audit Amazon EKS avec Cloud SIEM, commencez par configurer Cloud SIEM. Créez ensuite une [règle de détection des logs][8] personnalisée qui génère un [signal de sécurité][9] dans le [Security Signals Explorer][10] chaque fois que la solution détecte un problème de configuration ou une menace.

### Configuration {#setup-1}

Configurez Cloud SIEM. Consultez les [instructions de configuration de Cloud SIEM][1] dans l'application.

Une fois Cloud SIEM configuré, vous pouvez créer de toute pièce une règle Cloud SIEM ou exporter une requête du Log Explorer afin de l'utiliser pour une règle.

### Examinez les Security Monitoring Rules {#review-security-monitoring-rules}

Consultez les [règles de détection Cloud SIEM][11] prêtes à l'emploi qui détectent les menaces dans votre environnement. Pour plus d'informations sur la recherche, la modification et le clonage de ces règles, consultez [création et gestion des règles de détection][12].

### Créer une nouvelle règle Cloud SIEM {#create-a-new-cloud-siem-rule}

Pour créer une règle, accédez à la page [Rule Setup and Configuration][13] dans l'application. Pour terminer votre configuration, consultez la [documentation sur les règles de détection de logs][14].

### Exporter une requête vers une règle dans Log Explorer {#export-a-query-to-a-rule-in-log-explorer}

1. Dans Log Explorer, créez une requête dans la barre de recherche. Par exemple, filtrez par `source:kubernetes.audit @objectRef.resource:pods @objectRef.subresource:exec @http.method:create @http.status_code:[101 TO 299]`.
1. Cliquez sur le bouton **Export** et sélectionnez **Export to detection rule**.
1. Cette fonctionnalité exporte votre requête et la définit dans la deuxième étape de la configuration de la règle de détection de logs. Sélectionnez une méthode de détection. Dans ce cas, sélectionnez **New Value**. Sélectionnez l'attribut `@usr.name` dans le menu déroulant Detect new value. Vous recevez une alerte la première fois qu'un utilisateur exécute une commande dans un pod via exec. Après la première alerte, Datadog ne vous enverra plus d'alerte pour ce même utilisateur. Alternativement, pour détecter quand ces événements dépassent un seuil défini par l'utilisateur, utilisez **règle de seuil** comme méthode de détection.
1. Suivez la [documentation sur les règles de détection de logs][14] pour apprendre à terminer le reste de la configuration de votre règle.

[1]: /fr/security/cloud_siem/
[2]: https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html
[3]: /fr/integrations/amazon_web_services/?tab=roledelegation#setup
[4]: /fr/logs/guide/forwarder/
[5]: /fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
[6]: https://console.aws.amazon.com/lambda/home#/functions
[7]: https://app.datadoghq.com/logs
[8]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/
[9]: /fr/getting_started/cloud_siem/#phase-2-signal-exploration
[10]: https://app.datadoghq.com/security
[11]: /fr/security/default_rules/#cat-cloud-siem
[12]: /fr/security/detection_rules/#creating-and-managing-detection-rules
[13]: https://app.datadoghq.com/security/configuration/rules/new?product=siem
[14]: /fr/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/#create-a-rule