---
title: CoScreen Optimization and Troubleshooting
kind: guide
is_beta: false
---

### How can I optimize my screen sharing quality and remote control latency?

You can influence a few key factors behind the quality of the windows you and your peers share.

#### Network bandwidth and stability

* Make sure that every participant has a fast and stable internet connection with at least 5Mbps upload and download.
* Make sure your system does not have a packet loss of more than 2 percent. Video conferencing becomes unstable above that threshold, regardless of provider. as video conferencing quickly becomes unstable above that threshold no matter the provider. Run a [packet loss test][1]. If you see issues, try restarting your router or modem, move closer to your router, or test with an alternative internet connection.
* CoScreen works fastest if there are only two participants who can connect peer-to-peer (that is: directly, without having a corporate proxy or firewall between them). As soon as there are three or more participants, or a direct connection cannot be established, the traffic is routed through a globally distributed video infrastructure which ensures connectivity in all circumstances.

#### Screen resolution
CoScreen supports high-resolution screen sharing, even if you and your peers have ultra-high display resolutions of 4k or above. Ensure that your network bandwidth and CPU can handle the corresponding load. If there are issues, try lower resolutions on both ends.

#### CPU
Sharing windows can take up to 60 percent of one CPU core on older systems because CoScreen captures them at a much higher quality than many other tools. Check your CPU allocation.

### Firewalls and SSL
If your organization uses a corporate firewall or SSL inspection, the CoScreen client might not be able to connect to the CoScreen server and would therefore be unable to establish a connection between you and your team members. Contact support for a list of URLs to whitelist.

### Troubleshooting on macOS

#### The side panel UI is grayed out, and a connection is never established

You may encounter a problem where the UI is stuck in the grayed out joining phase, but you never receive the "Unable to connect to CoScreen" dialog. Because CoScreen expects to live on a single non-fixed desktop, if you have configured the application to reside specifically on one more desktops, this problem may occur.

To resolve this issue, right-click on the CoScreen application icon and go to _Options_. Ensure that _Assign To_ is set to _None_. Then, leave and rejoin the CoScreen.

{{< img src="coscreen/assign-to-none.png" alt="Facet creation for custom tag" style="width:60%;" >}}

### Troubleshooting on Windows 10

#### The CoScreen UI appears small

If the CoScreen UI appears to be smaller than that of other apps on your Windows 10 computer, it is related to the scaling factor configured under display settings and how it interacts with CoScreen. You can decrease the scaling and resolution of your screen to improve the experience.

<!-- video: https://www.loom.com/share/221e5a22f8d340469d2f7bb601e1c39e?t=117 -->

#### My voice is hard to understand, or sounds robotic

Some devices use a Realtek voice recognition feature that may cause your voice to sound robotic when using CoScreen, or another video conferencing application. If you are experiencing issues with the audibility of your voice, open the Realtek Audio Console and untick the option **Voice Recognition** to see if the situation improves.

{{< img src="coscreen/windows_screenshot.png" alt="Facet creation for custom tag" style="width:60%;" >}}

[1]: https://packetlosstest.com/
