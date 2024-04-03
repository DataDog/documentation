---
description: L'extension Datadog pour les développeurs .NET
disable_toc: false
further_reading:
- link: /getting_started/profiler/
  tag: Documentation
  text: Premiers pas avec le profileur en continu
is_beta: true
kind: documentation
title: Extension Datadog pour Visual Studio
---

{{< callout url="#" btn_hidden="true">}}
  L'extension Datadog pour Visual Studio est disponible en version bêta publique. Elle est destinée aux développeurs .NET qui utilisent le <a href="https://docs.datadoghq.com/profiler/#pagetitle">profileur en continu</a> pour leurs services .NET. Si l'extension cesse subitement de fonctionner, vérifiez qu'elle est à jour ou <a href=#feedback>contactez l'équipe d'assistance</a>.
{{< /callout >}}

## Présentation

L'extension Datadog pour Visual Studio permet d'améliorer les performances de vos logiciels. Elle intègre à votre IDE des informations pertinentes au niveau du code basées sur des données d'observabilité en temps réel.

La vue **Code Insights** fournit des données sur ce qui suit :

- Les problèmes issus du [suivi des erreurs][5]
- Les rapports de [vulnérabilité][6] générés par la solution Application Security Management
- Les insights relatifs au profiling provenant de la solution [Watchdog Insights][7]

Pour vous permettre de limiter votre latence et de réduire vos coûts liés au cloud, le **profileur en continu** met en avant les lignes de code qui :

- consomment le plus de ressources CPU ;
- allouent le plus de mémoire ;
- consacrent le plus de temps aux blocages, E/S de disque et E/S de socket.

## Prérequis

- Windows 10 ou version ultérieure
- .NET Framework 4.7.2 ou version ultérieure
- Visual Studio 2022 édition Community, Professional ou Entreprise (64 bits)
- **Compte Datadog** : un compte Datadog est nécessaire pour utiliser l'extension. Si vous commencez tout juste à utiliser Datadog, rendez-vous sur le [site Web de Datadog][3] pour en savoir plus sur les outils d'observabilité de Datadog et inscrivez-vous pour profiter d'un essai gratuit.
- **Profileur en continu** : pour pouvoir afficher des insights et des données de profiling, vous devez utiliser le profileur en continu afin de configurer l'extension pour vos services. Pour en savoir plus, consultez la section [Premiers pas avec le profileur en continu][2].

## Prise en main

### Télécharger et installer l'extension

1. Depuis Visual Studio, accédez à **Extensions** > **Manage Extensions**.
2. Recherchez `Datadog`.
3. Cliquez sur **Download**.
4. Redémarrez Visual Studio.

Sinon, vous pouvez également installer l'extension via le [Marketplace officiel de Visual Studio][4].

### Se connecter avec un compte Datadog

1. Depuis Visual Studio, accédez à **Tools** > **Options** > **Datadog**.
2. Cliquez sur **Sign In**.
3. Dans la fenêtre du navigateur qui s'ouvre, sélectionnez votre site et votre organisation, puis autorisez l'accès à la plateforme.

### Associer les services

1. Ouvrez un fichier solution .NET avec Visual Studio.
2. Accédez à **Extensions** > **Datadog** > **Linked Services**.
3. Cliquez sur **Add Service**.
4. Sélectionnez les services en lien avec votre solution .NET.
5. Enregistrez le fichier solution .NET.

## Commentaires

Donnez-nous votre avis sur l'extension ! Faites part de vos retours sur notre [forum de discussion][1] ou envoyez un e-mail à l'adresse `team-ide-integration@datadoghq.com`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-for-visual-studio/discussions
[2]: /fr/getting_started/profiler/
[3]: https://www.datadoghq.com/
[4]: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
[5]: https://docs.datadoghq.com/fr/tracing/error_tracking/
[6]: https://docs.datadoghq.com/fr/security/application_security/vulnerability_management/
[7]: https://docs.datadoghq.com/fr/watchdog/insights