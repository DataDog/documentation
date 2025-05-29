---
aliases:
- /fr/real_user_monitoring/dashboards/frustration_signals_dashboard
- /fr/real_user_monitoring/dashboards/user_sessions_dashboard
- /fr/real_user_monitoring/platform/dashboards/frustration_signals_dashboard
- /fr/real_user_monitoring/platform/dashboards/user_sessions_dashboard
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: En savoir plus sur le RUM Explorer
title: Dashboard relatif à l'utilisation du RUM
---

## Utilisation Web


Le dashboard Utilisation Web de l'app du RUM fournit des informations sur la façon dont vos clients utilisent votre application. Il montre les éléments suivants :

- **Application usage**:
  Consultez des graphiques sur la durée moyenne des sessions, les consultations de pages par session, les actions par session et les erreurs par session. Les tableaux ci-dessous énumèrent les métriques d'utilisation en fonction de la première et la dernière page visitée.
- **User journeys**:
  Voyez sur quelles pages vos utilisateurs passent le plus de temps et où ils commencent et terminent leur parcours dans votre application.
- **Engagement matrix**:
  Voyez les actions qui sont effectuées par certaines proportions d'utilisateurs.
- **User demographics**:
  Observez le nombre de sessions par pays et les principaux pays, appareils et systèmes d'exploitation pour votre application. Vous pouvez également consulter un graphique des principales parts d'utilisation des navigateurs.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-web-app.png" alt="Dashboards RUM sur l'utilisation web des apps prêts à l'emploi" style="width:100%" >}}

Pour en savoir plus sur les données affichées, consultez la section [Données Browser RUM recueillies][1].

## Utilisation mobile


Le dashboard Utilisation mobile de l'app du RUM fournit des informations sur la façon dont vos clients utilisent votre application.

- **Application usage**:
  Comprenez davantage le comportement de vos utilisateurs en identifiant la version de l'application, le SDK Datadog et le navigateur qu'ils utilisent. Comparez les sessions de la semaine actuelle et de la semaine précédente. Consultez le taux de rebond global.
- **User journeys**:
  Voyez sur quelles pages vos utilisateurs passent le plus de temps et où ils commencent et terminent leur parcours dans votre application.
- **Engagement matrix**:
  Voyez les actions qui sont effectuées par certaines proportions d'utilisateurs.
- **User demographics**:
  Observez le nombre de sessions par pays et les principaux pays, appareils et systèmes d'exploitation pour votre application. Vous pouvez également consulter un graphique des principales parts d'utilisation des navigateurs.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-web-app.png" alt="Dashboards RUM sur l'utilisation mobile des apps prêts à l'emploi" style="width:100%" >}}

Pour en savoir plus sur les données affichées, consultez notre documentation relative à chaque plateforme : [RUM iOS][2], [RUM Android][3], [RUM React Native][4], et [RUM Flutter][5].

## Démographie des utilisateurs


Le dashboard RUM Démographie des utilisateurs vous donne un aperçu de l'adoption géographique de votre application.

- **Global Data**: 
  Obtenez une vue globale de vos utilisateurs et voyez quels pays, régions et villes utilisent le plus votre application.
- **Compare Continents and Compare Countries**:
  Observez l'utilisation de votre application par les utilisateurs en fonction de leur continent et de leur pays.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-user-demographics.png" alt="Dashboards RUM sur la démographie des apps prêts à l'emploi" style="width:100%" >}}

Pour en savoir plus sur les données affichées, consultez la section [Sécurité des données de Real User Monitoring][6].

## Signaux de frustration


Le dashboard RUM Signaux de frustration vous permet d'identifier les problèmes de vos utilisateurs dans leur travail. Les signaux de frustration sont divisés en trois types différents :

- **Clic de colère** :
  Lorsqu'un utilisateur clique sur le même bouton plus de 3 fois dans une fenêtre glissante d'une seconde.
- **Clic d'erreur** :
  Lorsqu'un utilisateur clique sur un élément et qu'il rencontre une erreur JavaScript.
- **Clic mort** :
  Lorsqu'un utilisateur clique sur un élément statique qui n'entraîne aucune action sur la page.

{{< img src="real_user_monitoring/dashboards/dashboard-usage-frustration-signals.png" alt="Dashboards RUM sur les signaux de frustration prêts à l'emploi" style="width:100%" >}}

Pour en savoir plus sur les données affichées, consultez la section [Sécurité des données de Real User Monitoring][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/data_collected/
[2]: /fr/real_user_monitoring/mobile_and_tv_monitoring/ios/data_collected/
[3]: /fr/real_user_monitoring/mobile_and_tv_monitoring/android/data_collected/
[4]: /fr/real_user_monitoring/mobile_and_tv_monitoring/react_native/data_collected/
[5]: /fr/real_user_monitoring/mobile_and_tv_monitoring/flutter/data_collected/
[6]: /fr/data_security/real_user_monitoring/