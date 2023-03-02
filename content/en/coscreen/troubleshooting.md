---
title: CoScreen Optimization and Troubleshooting
kind: guide
is_beta: false
---

### How can I optimize my screen sharing quality and remote control latency?

You can influence a few key factors behind the quality of the windows you and your peers share.

#### Network bandwidth and stability

* Make sure every participant has a fast and stable internet connection with at least 5Mbps upload and download.
* Make sure your system does not have a packet loss of more than 2 percent. Video conferencing becomes unstable above that threshold, regardless of provider. Run a [packet loss test][1]. If you see issues, try restarting your router or modem, move closer to your router, or test with an alternative internet connection.
* CoScreen works fastest if only two participants can connect peer-to-peer (that is, directly, without having a corporate proxy or firewall between them). As soon as there are three or more participants, or a direct connection cannot be established, the traffic is routed through a globally distributed video infrastructure, ensuring connectivity in all circumstances.

#### Screen resolution
CoScreen supports high-resolution screen sharing, even if you and your peers have ultra-high display resolutions of 4k or above. Ensure that your network bandwidth and CPU can handle the corresponding load. If there are issues, try lower resolutions on both ends.

#### CPU
Sharing windows can take up to 60 percent of one CPU core on older systems because CoScreen captures them at a much higher quality than many other tools. Check your CPU allocation.

### Firewalls and SSL
If your organization uses a corporate firewall or SSL inspection, the CoScreen client might not be able to connect to the CoScreen server and would therefore be unable to establish a connection between you and your team members. Contact support for a list of URLs to allowlist.

### Troubleshooting on macOS

#### The side panel UI is grayed out, and a connection is never established

You may encounter a problem where the UI is stuck in the grayed out joining phase, but you never receive the "Unable to connect to CoScreen" dialog. Because CoScreen expects to live on a single non-fixed desktop. This problem may occur if you have configured the application to reside specifically on more than one desktop.

To resolve this issue:

1. Right-click on the CoScreen application icon and go to _Options_.
2. Ensure that _Assign To_ is set to _None_.
3. Exist _Options_ and rejoin the CoScreen.

{{< img src="coscreen/assign-to-none.png" alt="Screenshot of macOS dock. Right-clicking on the CoScreen brings up a menu, and hovering over 'Options' opens up a second menu. Under 'Assign To', the user has selected 'None.'" style="width:60%;" >}}

### Troubleshooting on Windows 10

#### The CoScreen UI appears small

If the CoScreen UI appears to be smaller than other apps on your Windows 10 computer, it is related to the scaling factor configured under display settings and how it interacts with CoScreen. You can decrease the scaling and resolution of your screen to improve the experience.

#### My voice is hard to understand, or sounds robotic

Some devices use a Realtek voice recognition feature that may cause your voice to sound robotic when using CoScreen. If you are experiencing issues with the audibility of your voice, open the Realtek Audio Console and untick the option **Voice Recognition** to see if the situation improves.

{{< img src="coscreen/windows_screenshot.png" alt="Screenshot of Windows dialog for Realtek Audio Console. The 'Voice Recognition' toggle is set to off." style="width:70%;" >}}

[1]: https://packetlosstest.com/
