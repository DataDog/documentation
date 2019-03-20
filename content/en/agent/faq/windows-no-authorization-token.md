### `No Authorization Token` error 
**Description of issue:** When launching the GUI in IE a blank page is displayed with the message `No Authorization Token`. 

<img alt="no auth_token error" src="https://d2ddoduugvun08.cloudfront.net/items/3s162m1C3i410w1b1C30/Image%202018-12-12%20at%201.15.11%20PM.png?X-CloudApp-Visitor-Id=3110024&v=198b092c" width="600">

This error is commonly seen when IE's security settings are set too strict and it's blocking connecting to the Agent on `localhost`.

Your first step would be to verify that there is an auth token in the user's hidden `ProgramData` folder.

<img alt="verifying the auth_token exists" src="http://f.cl.ly/items/2C3K1M2B1Z0c2N0x2V3p/%5B3ab550e77230e4b9aba7d84a6077cfff%5D_Image%202018-09-25%20at%2011.46.53%20AM.png" width="600">

Make sure you don't have additional browser extensions installed, go to your IE `settings` and whitelist the `localhost`:

<img alt="go to IT internet options in setting" src="https://d2ddoduugvun08.cloudfront.net/items/1X2R3z1p0R1l3R3Y1H36/%5B55fd9bc06c5be42ed21e32f44461b7fe%5D_Image+2018-10-31+at+1.46.42+PM.png?X-CloudApp-Visitor-Id=3110024&v=262aa23a" width="300">

In the `Security tab` the local host address `http://127.0.0.1` should be added to the trusted sites whitelist:

<img alt="go to the security tab and then whitelist localhost in trusted sites" src="https://d2ddoduugvun08.cloudfront.net/items/071P383z0k3I1H1r2s3w/%5Be8e3a85ef7e1042bcc52829e57fe4bb6%5D_Image+2018-10-31+at+1.49.32+PM.png?X-CloudApp-Visitor-Id=3110024&v=d823d152" width="300">

<img alt="add http://12.7.0.0.1 to the whitelist" src="https://d2ddoduugvun08.cloudfront.net/items/0h1V2o272i1h171Q263e/%5B5184aa50d91ec5978da7aed1a30ec7fe%5D_Image+2018-10-31+at+1.57.17+PM.png?X-CloudApp-Visitor-Id=3110024&v=e50aae96" width="300">

In the `Privacy tab` the settings should be set to `MEDIUM` or `MED-HIGH` at the highest:

<img alt="setting security in the privacy tab" src="https://d2ddoduugvun08.cloudfront.net/items/1m303J2h2M1x3r2t3r0t/%5B13cc64537a17996d1751d0c7d06ba366%5D_Image+2018-11-02+at+9.47.09+AM.png?X-CloudApp-Visitor-Id=3110024&v=3bebdc20" width="300">

Restart the browser.
