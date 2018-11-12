# ui-driver-sakuracloud
Rancher UI driver for [SakuraCloud](https://cloud.sakura.ad.jp) docker-machine drivers

## Using

* Add a Machine Driver in Rancher 2.0 (Global -> Node Drivers)
  * Name: Your `SakuraCloud` (see above).
  * Download URL: `https://sacloud.github.io/ui-driver-sakuracloud/docker-machine-driver-sakuracloud_linux-amd64.zip`
  * Custom UI URL: `https://sacloud.github.io/ui-driver-sakuracloud/component.js`
  * Custom UI URL: `https://sacloud.github.io/ui-driver-sakuracloud/component.js`
  * Whitelist Domains: `sacloud.github.io`
* Go to Clusters -> Add Cluster, your driver and custom UI should show up.
