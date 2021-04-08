"use strict";

define("nodes/components/driver-sakuracloud/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogICAge3shLS0gVGhpcyBsaW5lIHNob3dzIHRoZSBkcml2ZXIgdGl0bGUgd2hpY2ggeW91IGRvbid0IGhhdmUgdG8gY2hhbmdlIGl0IC0tfX0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgbWItMjAiPjxzcGFuPnt7ZHJpdmVyT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+CgogICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbQogICAgICB0aXRsZT0iQVBJIEtleSBTZXR0aW5ncyIKICAgICAgZGV0YWlsPSJTYWt1cmFDbG91ZCBBUEkga2V5cyIKICAgICAgZXhwYW5kQWxsPWV4cGFuZEFsbAogICAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgICAgZXhwYW5kT25Jbml0PXRydWUKICAgIH19CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+QWNjZXNzIFRva2VuIHt7ZmllbGQtcmVxdWlyZWR9fTwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiIGNsYXNzPSJmb3JtLWNvbnRyb2wiIHZhbHVlPWNvbmZpZy5hY2Nlc3NUb2tlbiBwbGFjZWhvbGRlcj0iWW91ciBTYWt1cmFDbG91ZCBBUEkgQWNjZXNzIFRva2VuIn19CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+QWNjZXNzIFRva2VuIFNlY3JldCB7e2ZpZWxkLXJlcXVpcmVkfX08L2xhYmVsPgogICAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IiBjbGFzcz0iZm9ybS1jb250cm9sIiB2YWx1ZT1jb25maWcuYWNjZXNzVG9rZW5TZWNyZXQgcGxhY2Vob2xkZXI9IllvdXIgU2FrdXJhQ2xvdWQgQVBJIEFjY2VzcyBUb2tlbiBTZWNyZXQifX0KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KCiAgICB7eyNhY2NvcmRpb24tbGlzdC1pdGVtCiAgICAgIHRpdGxlPSJTZXJ2ZXIgT3B0aW9ucyIKICAgICAgZGV0YWlsPSJDb25maWd1cmUgc2VydmVyIHNwZWMgb3B0aW9uIgogICAgICBleHBhbmRBbGw9ZXhwYW5kQWxsCiAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgICBleHBhbmRPbkluaXQ9dHJ1ZQogICAgfX0KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5ab25lPC9sYWJlbD4KICAgICAgICAgIHt7bmV3LXNlbGVjdCBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIGNvbnRlbnQ9em9uZXMgb3B0aW9uTGFiZWxQYXRoPSd2YWx1ZScgb3B0aW9uVmFsdWVQYXRoPSd2YWx1ZScgdmFsdWU9Y29uZmlnLnpvbmV9fQogICAgICAgIDwvZGl2PgoKICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5PUyBUeXBlPC9sYWJlbD4KICAgICAgICAgIHt7bmV3LXNlbGVjdCBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIGNvbnRlbnQ9b3NUeXBlcyBvcHRpb25MYWJlbFBhdGg9J25hbWUnIG9wdGlvblZhbHVlUGF0aD0ndmFsdWUnIHZhbHVlPWNvbmZpZy5vc1R5cGV9fQogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KCiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+Q1BVczwvbGFiZWw+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cCI+CiAgICAgICAgICAgIHt7bmV3LXNlbGVjdCBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIGNvbnRlbnQ9c2VydmVyUGxhbnMgb3B0aW9uTGFiZWxQYXRoPSdjb3JlJyBvcHRpb25WYWx1ZVBhdGg9J2NvcmUnIHZhbHVlPWNvbmZpZy5jb3JlfX0KICAgICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+Y29yZXM8L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgoKICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5NZW1vcnk8L2xhYmVsPgogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAgICB7e25ldy1zZWxlY3QgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIiBjb250ZW50PW1lbW9yeVNpemVzIG9wdGlvbkxhYmVsUGF0aD0ndmFsdWUnIG9wdGlvblZhbHVlUGF0aD0ndmFsdWUnIHZhbHVlPWNvbmZpZy5tZW1vcnl9fQogICAgICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cC1hZGRvbiBiZy1kZWZhdWx0Ij5HQjwvZGl2PgogICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgoKICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5EaXNrIFBsYW48L2xhYmVsPgogICAgICAgICAge3tuZXctc2VsZWN0IGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIgY29udGVudD1kaXNrUGxhbnMgb3B0aW9uTGFiZWxQYXRoPSduYW1lJyBvcHRpb25WYWx1ZVBhdGg9J3ZhbHVlJyB2YWx1ZT1jb25maWcuZGlza1BsYW59fQogICAgICAgIDwvZGl2PgoKICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5EaXNrIFNpemU8L2xhYmVsPgogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAgICB7e25ldy1zZWxlY3QgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIiBjb250ZW50PWRpc2tTaXplcyBvcHRpb25MYWJlbFBhdGg9J3ZhbHVlJyBvcHRpb25WYWx1ZVBhdGg9J3ZhbHVlJyB2YWx1ZT1jb25maWcuZGlza1NpemV9fQogICAgICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cC1hZGRvbiBiZy1kZWZhdWx0Ij5HQjwvZGl2PgogICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAge3svYWNjb3JkaW9uLWxpc3QtaXRlbX19CgogICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbQogICAgICB0aXRsZT0iU2VjdXJpdHkgT3B0aW9ucyIKICAgICAgZGV0YWlsPSJDb25maWd1cmUgc2VydmVyIHNlY3VyaXR5IG9wdGlvbnMiCiAgICAgIGV4cGFuZEFsbD1leHBhbmRBbGwKICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgIGV4cGFuZE9uSW5pdD1mYWxzZQogICAgfX0KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5QYXNzd29yZDwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InBhc3N3b3JkIiBjbGFzcz0iZm9ybS1jb250cm9sIiB2YWx1ZT1jb25maWcucGFzc3dvcmQgcGxhY2Vob2xkZXI9IklmIGVtcHR5LCBnZW5lcmF0ZSByYW5kb20gdmFsdWUifX0KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5QYWNrZXQgRmlsdGVyPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQgdHlwZT0idGV4dCIgY2xhc3M9ImZvcm0tY29udHJvbCIgdmFsdWU9Y29uZmlnLnBhY2tldEZpbHRlciBwbGFjZWhvbGRlcj0iUGFja2V0IEZpbHRlciBJRCJ9fQogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5FbmFibGUgUGFzc3dvcmQgQXV0aCB2aWEgU1NIPC9sYWJlbD4KICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgIHt7aW5wdXQgdHlwZT0iY2hlY2tib3giIGNoZWNrZWQ9Y29uZmlnLmVuYWJsZVBhc3N3b3JkQXV0aH19CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CgogICAge3svYWNjb3JkaW9uLWxpc3QtaXRlbX19CgogICAge3shLS0gVGhpcyBmb2xsb3dpbmcgY29udGFpbnMgdGhlIE5hbWUsIExhYmVscyBhbmQgRW5naW5lIE9wdGlvbnMgZmllbGRzIC0tfX0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIiPjxzcGFuPnt7dGVtcGxhdGVPcHRpb25zVGl0bGV9fTwvc3Bhbj48L2Rpdj4KCiAgICB7e2Zvcm0tbmFtZS1kZXNjcmlwdGlvbgogICAgICBtb2RlbD1tb2RlbAogICAgICBuYW1lUmVxdWlyZWQ9dHJ1ZQogICAgfX0KCiAgICB7e2Zvcm0tdXNlci1sYWJlbHMKICAgICAgaW5pdGlhbExhYmVscz1sYWJlbFJlc291cmNlLmxhYmVscwogICAgICBzZXRMYWJlbHM9KGFjdGlvbiAnc2V0TGFiZWxzJykKICAgICAgZXhwYW5kQWxsPWV4cGFuZEFsbAogICAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgIH19CgogICAge3tmb3JtLWVuZ2luZS1vcHRzCiAgICAgIG1hY2hpbmU9bW9kZWwKICAgICAgc2hvd0VuZ2luZVVybD1zaG93RW5naW5lVXJsCiAgICB9fQogIHt7L2FjY29yZGlvbi1saXN0fX0KCiAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgZXJyb3JzIHByb2R1Y2VkIGJ5IHZhbGlkYXRlKCkgaW4gdGhlIGNvbXBvbmVudCAtLX19CiAge3t0b3AtZXJyb3JzIGVycm9ycz1lcnJvcnN9fQoKICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyB0aGUgQ3JlYXRlIGFuZCBDYW5jZWwgYnV0dG9ucyAtLX19CiAge3tzYXZlLWNhbmNlbCBzYXZlPShhY3Rpb24gInNhdmUiKSBjYW5jZWw9KGFjdGlvbiAiY2FuY2VsIikgZWRpdGluZz1lZGl0aW5nfX0KPC9zZWN0aW9uPg==";
  (0, _nodeDriver.registerDisplayLocation)('sakuracloud', 'config.zone');
  (0, _nodeDriver.registerDisplaySize)('sakuracloud', function () {
    return `${get(this, 'config.memory')} GB, ${get(this, 'config.core')} Core`;
  });
  const computed = Ember.computed;
  const on = Ember.on;
  const get = Ember.get;
  const set = Ember.set;
  const alias = Ember.computed.alias;
  const observer = Ember.observer;
  const ZONES = [{
    value: "is1a"
  }, {
    value: "is1b"
  }, {
    value: "tk1a"
  }, {
    value: "tk1b"
  }];
  const OS_TYPES = [{
    name: "ContainerLinux",
    value: "coreos"
  }, {
    name: "RancherOS",
    value: "rancheros"
  }, {
    name: "Ubuntu",
    value: "ubuntu"
  }, {
    name: "CentOS",
    value: "centos"
  }];
  const DISK_PLANS = [{
    value: "ssd",
    name: "SSD",
    sizes: [{
      value: "20"
    }, {
      value: "40"
    }, {
      value: "100"
    }, {
      value: "250"
    }, {
      value: "500"
    }, {
      value: "1024"
    }, {
      value: "2048"
    }, {
      value: "4096"
    }, {
      value: "8192"
    }, {
      value: "12288"
    }]
  }, {
    value: "hdd",
    name: "HDD",
    sizes: [{
      value: "40"
    }, {
      value: "60"
    }, {
      value: "80"
    }, {
      value: "100"
    }, {
      value: "250"
    }, {
      value: "500"
    }, {
      value: "750"
    }, {
      value: "1024"
    }, {
      value: "2048"
    }, {
      value: "4096"
    }, {
      value: "8192"
    }, {
      value: "12288"
    }]
  }];
  const SERVER_PLANS = [{
    "core": "1",
    "memory": [{
      value: "1"
    }, {
      value: "2"
    }, {
      value: "3"
    }, {
      value: "4"
    }, {
      value: "5"
    }]
  }, {
    "core": "2",
    "memory": [{
      value: "1"
    }, {
      value: "2"
    }, {
      value: "3"
    }, {
      value: "4"
    }, {
      value: "5"
    }, {
      value: "6"
    }]
  }, {
    "core": "3",
    "memory": [{
      value: "1"
    }, {
      value: "2"
    }, {
      value: "3"
    }, {
      value: "4"
    }, {
      value: "5"
    }, {
      value: "6"
    }, {
      value: "8"
    }, {
      value: "12"
    }]
  }, {
    "core": "4",
    "memory": [{
      value: "2"
    }, {
      value: "3"
    }, {
      value: "4"
    }, {
      value: "5"
    }, {
      value: "6"
    }, {
      value: "8"
    }, {
      value: "12"
    }, {
      value: "16"
    }, {
      value: "24"
    }]
  }, {
    "core": "5",
    "memory": [{
      value: "3"
    }, {
      value: "4"
    }, {
      value: "5"
    }, {
      value: "6"
    }, {
      value: "8"
    }, {
      value: "12"
    }, {
      value: "16"
    }, {
      value: "24"
    }, {
      value: "32"
    }]
  }, {
    "core": "6",
    "memory": [{
      value: "4"
    }, {
      value: "5"
    }, {
      value: "6"
    }, {
      value: "8"
    }, {
      value: "12"
    }, {
      value: "16"
    }, {
      value: "24"
    }, {
      value: "32"
    }, {
      value: "48"
    }]
  }, {
    "core": "8",
    "memory": [{
      value: "5"
    }, {
      value: "6"
    }, {
      value: "8"
    }, {
      value: "12"
    }, {
      value: "16"
    }, {
      value: "24"
    }, {
      value: "32"
    }, {
      value: "48"
    }, {
      value: "64"
    }]
  }, {
    "core": "10",
    "memory": [{
      value: "6"
    }, {
      value: "8"
    }, {
      value: "12"
    }, {
      value: "16"
    }, {
      value: "24"
    }, {
      value: "32"
    }, {
      value: "48"
    }, {
      value: "64"
    }, {
      value: "96"
    }]
  }, {
    "core": "12",
    "memory": [{
      value: "8"
    }, {
      value: "12"
    }, {
      value: "16"
    }, {
      value: "24"
    }, {
      value: "32"
    }, {
      value: "48"
    }, {
      value: "64"
    }, {
      value: "96"
    }, {
      value: "128"
    }, {
      value: "160"
    }]
  }, {
    "core": "16",
    "memory": [{
      value: "12"
    }, {
      value: "16"
    }, {
      value: "24"
    }, {
      value: "32"
    }, {
      value: "48"
    }, {
      value: "64"
    }, {
      value: "96"
    }, {
      value: "128"
    }, {
      value: "160"
    }, {
      value: "192"
    }]
  }, {
    "core": "20",
    "memory": [{
      value: "16"
    }, {
      value: "24"
    }, {
      value: "32"
    }, {
      value: "48"
    }, {
      value: "64"
    }, {
      value: "96"
    }, {
      value: "128"
    }, {
      value: "160"
    }, {
      value: "192"
    }, {
      value: "224"
    }]
  }];
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'sakuracloud',
    config: alias('model.sakuracloudConfig'),
    zones: ZONES,
    osTypes: OS_TYPES,
    diskPlans: DISK_PLANS,
    diskSizes: null,
    serverPlans: SERVER_PLANS,
    memorySizes: null,

    init() {
      const decodedLayout = window.atob(LAYOUT);
      const template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-sakuracloud/template'
      });
      set(this, 'layout', template);

      this._super(...arguments);
    },

    coreChoiced: function () {
      let coreChoice = get(this, 'config.core');
      let memories = get(this, 'serverPlans').findBy('core', coreChoice).memory;
      let current = memories.findBy('value', get(this, 'config.memory'));
      set(this, 'memorySizes', memories);
      set(this, 'config.memory', current ? current.value : memories[0].value);
    },
    diskPlanChoiced: function () {
      let diskPlanChoice = get(this, 'config.diskPlan');
      let disks = get(this, 'diskPlans').findBy('value', diskPlanChoice).sizes;
      let current = disks.findBy('value', get(this, 'config.diskSize'));
      set(this, 'diskSizes', disks);
      set(this, 'config.diskSize', current ? current.value : disks[0].value);
    },
    coreObserver: on('init', observer('config.core', function () {
      this.coreChoiced();
    })),
    diskPlanObserver: on('init', observer('config.diskPlan', function () {
      this.diskPlanChoiced();
    })),
    bootstrap: function () {
      let config = get(this, 'globalStore').createRecord({
        type: 'sakuracloudConfig',
        zone: 'is1a',
        accessToken: '',
        accessTokenSecret: '',
        core: '2',
        memory: '4',
        osType: 'coreos',
        diskSize: '40',
        diskPlan: 'ssd'
      });
      const model = get(this, 'model');
      set(model, 'sakuracloudConfig', config);
    },

    validate() {
      this._super();

      var errors = get(this, 'errors') || [];

      if (!get(this, 'model.name')) {
        errors.push('Name is required');
      }

      if (!get(this, 'config.accessToken')) {
        errors.push('Access Token is required');
      }

      if (!get(this, 'config.accessTokenSecret')) {
        errors.push('Access Token Secret is required');
      }

      if (!get(this, 'config.zone')) {
        errors.push('Zone is required');
      }

      if (!get(this, 'config.core')) {
        errors.push('CPUs is required');
      }

      if (!get(this, 'config.memory')) {
        errors.push('Memory is required');
      }

      if (!get(this, 'config.diskPlan')) {
        errors.push('DiskPlan is required');
      }

      if (!get(this, 'config.diskSize')) {
        errors.push('DiskSize is required');
      }

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    }

  });
});;
"use strict";

define("ui/components/driver-sakuracloud/component", ["exports", "nodes/components/driver-sakuracloud/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});