---
is_beta: false
title: Optimisation et dépannage de CoScreen
---

### Comment optimiser la qualité du partage d'écran ainsi que la latence du contrôle à distance ?

Vous pouvez influer sur un certain nombre de facteurs clés qui déterminent la qualité des fenêtres que vous et d'autres personnes partagez.

#### Bande passante et stabilité du réseau

* Assurez-vous que chaque participant dispose d'une connexion Internet rapide et stable, avec un débit ascendant et descendant d'au moins 5 Mbit/s.
* Assurez-vous que votre système n'enregistre pas une perte de paquets de plus de 2 %. Au-delà de ce seuil, les vidéoconférences deviennent instables, peu importe le fournisseur d'accès. Exécutez un [test de perte de paquets][1]. Si des problèmes sont détectés, essayez de redémarrer votre routeur ou modem, rapprochez-vous de votre routeur ou effectuez un test avec une autre connexion Internet.
* CoScreen offre des performances optimales si seulement deux participants établissent une connexion de pair à pair (c'est-à-dire, sans passer par un proxy d'entreprise ou un pare-feu). S'il y a trois participants ou plus, ou si une connexion directe ne peut pas être établie, le trafic passe par une infrastructure vidéo globalement distribuée de manière à garantir la connectivité en toutes circonstances.

#### Résolution de l'écran
CoScreen prend en charge le partage d'écrans haute résolution, même si vos pairs et vous-même disposez d'écrans ultra haute résolution de 4K ou plus. Vérifiez que votre bande passante réseau et votre CPU sont capables de gérer la charge correspondante. En cas de problèmes, essayez une résolution inférieure des deux côtés.

#### CPU
Le partage de fenêtres peut solliciter jusqu'à 60 % d'un coeur de CPU sur d'anciens systèmes, car CoScreen les capture avec un niveau de qualité nettement supérieur à celui de nombreux autres outils. Vérifiez la répartition de votre CPU.

### Pare-feux et SSL
Si votre organisation a recours à un pare-feu d'entreprise ou à une inspection SSL, le client CoScreen peut ne pas être en mesure de se connecter au serveur CoScreen, et donc d'établir une connexion entre vous et les membres de votre équipe. Contactez l'équipe d'assistance pour obtenir une liste des URL à ajouter à votre liste d'autorisation.

### Dépannage sous macOS

#### L'interface du panneau latéral est grisée et il est impossible d'établir une connexion

Il se peut que l'interface soit bloquée à la phase de connexion grisée, et qu'aucune boîte de dialogue « Impossible de se connecter à CoScreen » ne s'affiche. En effet, CoScreen doit normalement résider sur un seul et même bureau non fixe. Ce problème peut survenir si vous avez configuré l'application pour qu'elle réside sur plusieurs bureaux.

Pour résoudre ce problème, procédez comme suit :

1. Faites un clic droit sur l'icône de l'application CoScreen, puis accédez à _Options_.
2. Vérifiez que _Assign To_ est défini sur _None_.
3. Quittez _Options_ et relancez CoScreen.

{{< img src="coscreen/assign-to-none.png" alt="Capture d'écran du dock macOS. Faites un clic droit sur l'app CoScreen pour afficher un menu, puis placez la souris sur 'Options' pour ouvrir un deuxième menu. Sous 'Assign To', l'utilisateur a sélectionné 'None.'" style="width:60%;" >}}

### Dépannage sous Windows 10

#### L'interface de CoScreen s'affiche en taille réduite

Si l'interface de CoScreen s'affiche en taille réduite par rapport aux autres applications sur votre ordinateur Windows 10, le problème se situe au niveau du facteur d'échelle configuré sous les paramètres d'affichage et de son interaction avec CoScreen. Vous pouvez diminuer la mise à l'échelle et la résolution de votre écran pour améliorer l'expérience utilisateur.

#### Ma voix est difficilement compréhensible ou ressemble à celle d'un robot

Certains appareils utilisent une fonctionnalité de reconnaissance vocale de Realtek qui peut altérer votre voix et donner l'impression que vous parlez comme un robot lorsque vous utilisez CoScreen. Si votre voix est difficile à entendre, ouvrez la console audio Realtek et décochez l'option **Reconnaissance vocale** pour voir si la situation s'améliore.

{{< img src="coscreen/windows_screenshot.png" alt="Capture d'écran de la boîte de dialogue Windows pour la console audio Realtek. L'option 'Reconnaissance vocale' est décochée." style="width:70%;" >}}

[1]: https://packetlosstest.com/