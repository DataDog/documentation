---
description: Configurez et installez Datadog en tant qu'administrateur pour éviter
  les problèmes courants.
further_reading:
- link: /getting_started/application/
  tag: Documentation
  text: Découvrez les fonctionnalités disponibles dans Datadog
title: Guide de l'administrateur
---

Ce guide de l'administrateur s'adresse aux entreprises qui ont adopté la plateforme d'observabilité de Datadog et souhaitent en tirer pleinement parti. Il vous accompagne dans l'exploitation de Datadog pour obtenir une visibilité complète sur la santé et les performances de votre infrastructure, de vos services et de vos applications. Vous y trouverez des recommandations pour concevoir, déployer et gérer une installation Datadog à l'échelle de l'entreprise, adaptée à vos besoins. En complément de la [documentation][1] principale, ce guide fournit des bonnes pratiques, des conseils concrets et des exemples pour configurer un environnement de production aligné sur vos charges de travail et vos objectifs d'installation.

Une fois Datadog installé à l'échelle de votre organisation à l'aide de ce guide, vous pourrez gérer votre environnement efficacement sans avoir à vous préoccuper des renouvellements de matériel, des correctifs système, des mises à jour des serveurs ou du rééquilibrage des clusters. Vous serez ainsi libre de vous concentrer sur les bénéfices d'une plateforme d'observabilité complète, tels que :

- La diminution des coûts liés à votre infrastructure et à vos environnements cloud.
- La réduction de la gravité, de la fréquence et du temps moyen de résolution des incidents.
- La centralisdation de la collecte, du traitement et de la corrélation des données d'observabilité et de sécurité de l'ensemble de votre stack.
- L'automatisation de la remédiation et la possibilité d'intervenir directement depuis Datadog, avec une visibilité complète sur vos données d'observabilité.

## Avantages de ce guide

Ce guide expose les concepts clés de Datadog et fournit des étapes concrètes pour prévenir les problèmes courants, tels que des modèles de données fragmentés, des regroupements d'utilisateurs désorganisés, une utilisation non maîtrisée de la plateforme ou une valeur ajoutée insuffisamment exploitée.

## Comment utiliser ce guide

Ce guide est organisé en trois sections qui présentent les concepts clés, les plans, les tâches et les structures pour créer et rationaliser votre expérience de gestion de Datadog :

* **[Planifier][2]** : identifier les fonctionnalités de Datadog pertinentes pour votre usage, consolider votre base de connaissances, acquérir une première expérience concrète, organiser l'installation et appliquer les meilleures pratiques de configuration.  
* **[Déployer][3]** : déterminer les composants à installer et élaborer une stratégie de déploiement précise pour créer un environnement Datadog adapté à vos objectifs.  
* **[Exploiter][4]** : assurer le bon fonctionnement de Datadog, optimiser son utilisation au quotidien et gérer les besoins d'assistance à long terme.  

{{< img src="/administrators_guide/plan_build_run_2.png" alt="Diagramme des phases planifier, déployer et exploiter" style="width:80%;">}}

## Étapes suivantes

Tout au long de ce guide, vous découvrirez comment tirer le meilleur parti de Datadog en explorant la base de connaissances, en testant les fonctionnalités du produit et en concevant une architecture adaptée à votre environnement. Pour bien commencer, consultez la page [Débuter][5], qui vous explique comment contacter l'assistance Datadog, suivre les formations gratuites et créer un environnement de test.

{{< whatsnext desc="Cette section contient les rubriques suivantes :" >}} 
  {{< nextlink href="/administrators_guide/getting_started">}}<u>Débuter</u> : découvrez comment envoyer une Flare à l'assistance, vous inscrire aux formations Datadog et créer un environnement de test.{{< /nextlink >}} 
  {{< nextlink href="/administrators_guide/plan">}}<u>Planifier</u> : préparez votre installation Datadog en définissant un profil de dimensionnement, en établissant des bonnes pratiques et en optimisant la collecte des données.{{< /nextlink >}} 
  {{< nextlink href="/administrators_guide/build">}}<u>Déployer</u> : mettez en place votre environnement Datadog en priorisant les fonctionnalités, en structurant un système d'assistance interne et en provisionnant votre architecture.{{< /nextlink >}} 
  {{< nextlink href="/administrators_guide/run">}}<u>Exploiter</u> : assurez le fonctionnement continu de votre installation Datadog en créant des dashboards, en intégrant de nouvelles infrastructures et en mettant à jour l'Agent Datadog.{{< /nextlink >}} 
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/fr/
[2]: /fr/administrators_guide/plan
[3]: /fr/administrators_guide/build
[4]: /fr/administrators_guide/run
[5]: /fr/administrators_guide/getting_started