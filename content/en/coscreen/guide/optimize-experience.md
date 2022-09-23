---
title: Optimizing Your CoScreen Experience
kind: guide
is_beta: false
---

### How can I optimize my screen sharing quality and remote control latency?

You can influence a few key factors behind the quality of the windows you and your peers share.

#### Network bandwidth and stability

* Make sure you that every participant has a fast and stable internet connection with at least 5Mbps up- and download (test your connection here: https://www.speedtest.net).
* Make sure your system does not have a packet loss of more than 2% as video conferencing quickly becomes unstable above that threshold no matter the provider. Check it out using https://packetlosstest.com and if you see issues, try restarting your wifi router/modem, getting closer to your wifi router or test it with an alternative internet connection.
* CoScreen usually works the fastest if there are only two participants who can connect peer-to-peer (i.e. directly, without having a corporate proxy or firewall between them). As soon as there are 3 or more participants or a direct connection cannot be established, the traffic will be routed via our globally distributed video infrastructure which ensures connectivity in all circumstances.

#### Screen resolution
CoScreen will support crystal-clear screen sharing even if you and your peers have ultra high display resolutions of 4k and above. Please make sure that your network bandwidth and CPU can handle the corresponding load (see #1). In case you run into issues, try out lower resolutions on both ends and let us know in case you don't get the quality you need.

#### CPU
Sharing windows can take up to 60% of one CPU core on older systems because CoScreen captures them at a much higher quality than most other tools. Check your CPU allocation by going to the Activity Monitor (more) and let us know if you face any unexpected issues: hello@coscreen.co.

### Troubleshooting on macOS

#### The side panel UI is greyed out, and a connection is never established

You may encounter a problem where the UI is stuck in the greyed out joining phase, but you never receive the "Unable to connect to CoScreen" dialog. Because coscreen expects to live on a single non-fixed desktop, if you have configured the application to reside specifically on one more desktops, this problem may occur.

To resolve this issue, right-click on the CoScreen application icon and go to _Options_. Ensure that _Assign To_ is set to _None_. Then, leave and rejoin the CoScreen.

<!-- {{< img src="coscreen/assign-to-none.png" alt="Facet creation for custom tag" style="width:60%;" >}} -->

### Troubleshooting on Windows 10

#### The CoScreen UI appears small

If the CoScreen UI appears to be smaller than that of other apps on your Windows 10 computer, it is related to the scaling factor configured under display settings and how it interacts with CoScreen. You can decrease the scaling and resolution of your screen to improve the experience.

<!-- video: https://www.loom.com/share/221e5a22f8d340469d2f7bb601e1c39e?t=117 -->

#### My voice is hard to understand, or sounds robotic

Some devices use a Realtek voice recognition feature that may cause your voice to sound robotic when using CoScreen, or another video conferencing application. If you are experiencing issues with the audibility of your voice, open the Realtek Audio Console and untick the option **Voice Recognition** to see if the situation improves.

<!-- {{< img src="coscreen/windows_screenshot.png" alt="Facet creation for custom tag" style="width:60%;" >}} -->