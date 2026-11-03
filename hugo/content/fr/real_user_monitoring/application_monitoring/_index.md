---
aliases:
- /fr/real_user_monitoring/mobile_and_tv_monitoring/
- /fr/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/
- /fr/real_user_monitoring/mobile_and_tv_monitoring/data_collected/
- /fr/real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/
- /fr/real_user_monitoring/mobile_and_tv_monitoring/other_frameworks/
- /fr/real_user_monitoring/mobile_and_tv_monitoring/setup/
- /fr/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/
description: Collectez les données RUM de vos applications sur navigateur, mobiles
  et TV.
further_reading:
- link: /session_replay/
  tag: Documentation
  text: Session Replay
title: Surveillance des applications
---
## Présentation {#overview}

Datadog Real User Monitoring (RUM) offre une vision approfondie des performances frontend de votre application. Surveillez les données réelles des utilisateurs afin d'optimiser leur expérience web et de leur offrir une expérience utilisateur exceptionnelle. Corrélez les tests Synthetic, les métriques backend, les traces et les logs en un seul endroit pour identifier et résoudre les problèmes de performance sur l'ensemble de la pile.

Datadog vous aide à comprendre le niveau actuel de l'expérience utilisateur, à identifier les domaines à améliorer et à mesurer le succès de chaque changement et/ou déploiement. Utilisez ces informations pour identifier et résoudre les problèmes frontend inattendus avant que les utilisateurs ne soient impactés afin d'offrir la meilleure expérience possible.

La responsabilité de maintenir la sécurité des données des utilisateurs est partagée entre Datadog et les développeurs qui utilisent les SDK RUM. En savoir plus sur la [responsabilité partagée][1].

## Démarrez {#get-started}

Sélectionnez une plateforme pour commencer à collecter des données RUM sur votre application :

{{< card-grid image_width="200" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/setup" src="integrations_logos/javascript_large.svg" alt="browser" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_large.svg" alt="android" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_tv_large.svg" alt="android tv" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/cpp/setup/" src="integrations_logos/cpp_large.svg" alt="C / C++" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/flutter/setup/" src="integrations_logos/flutter_large.svg" alt="flutter" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup/" src="integrations_logos/ios_large.svg" alt="ios" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup/" src="integrations_logos/tv_os_large.svg" alt="tv OS" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/" src="integrations_logos/kotlin-multiplatform_large.svg" alt="kotlin-multiplatform" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/maui/setup/" src="integrations_logos/maui_large.svg" alt=".NET MAUI" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/" src="integrations_logos/react-native_large.svg" alt="react-native" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/codepush/" src="integrations_logos/react-codepush_large.svg" alt="react-codepush" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/expo/" src="integrations_logos/rum-expo_large.svg" alt="rum-expo" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/roku/setup/" src="integrations_logos/roku_large.svg" alt="Roku" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/unity/setup" src="integrations_logos/rum-unity_large.svg" alt="rum-unity" >}}
{{< /card-grid >}}

[1]: /fr/data_security/real_user_monitoring/#shared-responsibility