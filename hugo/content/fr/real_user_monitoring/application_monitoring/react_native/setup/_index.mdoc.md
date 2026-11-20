---
aliases:
- /fr/real_user_monitoring/react-native/
- /fr/real_user_monitoring/reactnative/
- /fr/real_user_monitoring/mobile_and_tv_monitoring/setup/reactnative
- /fr/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup
- /fr/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/reactnative/
- /fr/real_user_monitoring/application_monitoring/react_native/setup/expo/
- /fr/real_user_monitoring/reactnative/expo/
- /fr/real_user_monitoring/reactnative-expo/
- /fr/real_user_monitoring/mobile_and_tv_monitoring/setup/expo
- /fr/real_user_monitoring/mobile_and_tv_monitoring/expo/setup
- /fr/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup/expo/
content_filters:
- label: Setup Method
  option_group_id: rum_react_native_framework_options
  trait_id: platform
description: Collectez des données de RUM et de suivi des erreurs à partir de vos
  projets React Native.
further_reading:
- link: /real_user_monitoring/application_monitoring/react_native/advanced_configuration
  tag: Documentation
  text: Configuration avancée du RUM pour React Native
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Code source
  text: Code source pour dd-sdk-reactnative
- link: https://www.datadoghq.com/blog/react-native-monitoring/
  tag: Blog
  text: Surveillez les applications React Native
- link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
  tag: Documentation
  text: Surveillez les applications hybrides React Native
- link: real_user_monitoring/explorer/
  tag: Documentation
  text: Apprendre à explorer vos données RUM
title: Configuration de la surveillance React Native
---
Cette page décrit comment instrumenter vos applications pour le [Suivi des utilisateurs réels (RUM)][1] avec le SDK React Native. Le RUM inclut le suivi des erreurs par défaut, mais si vous avez acheté le suivi des erreurs en tant que produit autonome, consultez le [guide de configuration du suivi des erreurs][2] pour des étapes spécifiques.

La version minimale prise en charge pour le SDK React Native est React Native v0.65+. La compatibilité avec les versions antérieures n'est pas garantie par défaut.

## Configuration {% #setup %}

<!-- React Native -->
{% if equals($platform, "react_native") %}
{% partial file="sdk/setup/react-native.mdoc.md" /%}
{% /if %}

<!-- Expo -->
{% if equals($platform, "expo") %}
{% partial file="sdk/setup/react-native-expo.mdoc.md" /%}
{% /if %}

## Envoi de données lorsque l'appareil est hors ligne {% #sending-data-when-device-is-offline %}

Le SDK React Native aide à rendre les données disponibles lorsque le dispositif de l'utilisateur est hors ligne. Dans les zones à faible réseau, ou lorsque la batterie de l'appareil est trop faible, tous les événements sont d'abord stockés sur l'appareil local par lots. Ils sont envoyés dès que le réseau est disponible et que la batterie est suffisamment chargée pour que le SDK React Native n'affecte pas l'expérience de l'utilisateur final. Si le réseau n'est pas disponible avec votre application en cours d'exécution au premier plan, ou si un téléchargement de données échoue, le lot est conservé jusqu'à ce qu'il puisse être envoyé avec succès.

Cela signifie que même si les utilisateurs ouvrent votre application en étant hors ligne, aucune donnée ne sera perdue.

**Remarque** : Les données sur le disque sont automatiquement supprimées si elles deviennent trop anciennes afin que le SDK React Native n'utilise pas trop d'espace disque.

## Suivre les événements en arrière-plan {% #track-background-events %}

{% alert level="info" %}
Le suivi des événements en arrière-plan peut entraîner des sessions supplémentaires, ce qui peut avoir un impact sur la facturation. Pour des questions, [contactez le support Datadog][12].
{% /alert %}

Vous pouvez suivre des événements tels que des plantages et des requêtes réseau lorsque votre application est en arrière-plan (par exemple, lorsqu'aucune vue active n'est disponible).

Ajoutez l'extrait suivant lors de l'initialisation dans votre configuration Datadog :

```javascript
rumConfiguration.trackBackgroundEvents = true;
```

[1]: /fr/real_user_monitoring/
[2]: /fr/error_tracking/
[12]: https://docs.datadoghq.com/fr/help/