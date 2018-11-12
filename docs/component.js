define('nodes/components/driver-sakuracloud/component', ['exports', 'shared/mixins/node-driver'], function (exports, _nodeDriver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHx9fQogICAge3shLS0gVGhpcyBsaW5lIHNob3dzIHRoZSBkcml2ZXIgdGl0bGUgd2hpY2ggeW91IGRvbid0IGhhdmUgdG8gY2hhbmdlIGl0IC0tfX0KICAgIDxkaXYgY2xhc3M9Im92ZXItaHIgbWItMjAiPjxzcGFuPnt7ZHJpdmVyT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+CgogICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbQogICAgICB0aXRsZT0iQVBJIEtleSBTZXR0aW5ncyIKICAgICAgZGV0YWlsPSJTYWt1cmFDbG91ZCBBUEkga2V5cyIKICAgICAgZXhwYW5kQWxsPWV4cGFuZEFsbAogICAgICBleHBhbmQ9KGFjdGlvbiBleHBhbmRGbikKICAgICAgZXhwYW5kT25Jbml0PXRydWUKICAgIH19CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+QWNjZXNzIFRva2VuIHt7ZmllbGQtcmVxdWlyZWR9fTwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiIGNsYXNzPSJmb3JtLWNvbnRyb2wiIHZhbHVlPWNvbmZpZy5hY2Nlc3NUb2tlbiBwbGFjZWhvbGRlcj0iWW91ciBTYWt1cmFDbG91ZCBBUEkgQWNjZXNzIFRva2VuIn19CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+QWNjZXNzIFRva2VuIFNlY3JldCB7e2ZpZWxkLXJlcXVpcmVkfX08L2xhYmVsPgogICAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IiBjbGFzcz0iZm9ybS1jb250cm9sIiB2YWx1ZT1jb25maWcuYWNjZXNzVG9rZW5TZWNyZXQgcGxhY2Vob2xkZXI9IllvdXIgU2FrdXJhQ2xvdWQgQVBJIEFjY2VzcyBUb2tlbiBTZWNyZXQifX0KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KCiAgICB7eyNhY2NvcmRpb24tbGlzdC1pdGVtCiAgICAgIHRpdGxlPSJTZXJ2ZXIgT3B0aW9ucyIKICAgICAgZGV0YWlsPSJDb25maWd1cmUgc2VydmVyIHNwZWMgb3B0aW9uIgogICAgICBleHBhbmRBbGw9ZXhwYW5kQWxsCiAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgICBleHBhbmRPbkluaXQ9ZmFsc2UKICAgIH19CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+Wm9uZTwvbGFiZWw+CiAgICAgICAgICB7e25ldy1zZWxlY3QgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIiBjb250ZW50PXpvbmVzIG9wdGlvbkxhYmVsUGF0aD0ndmFsdWUnIG9wdGlvblZhbHVlUGF0aD0ndmFsdWUnIHZhbHVlPWNvbmZpZy56b25lfX0KICAgICAgICA8L2Rpdj4KCiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+T1MgVHlwZTwvbGFiZWw+CiAgICAgICAgICB7e25ldy1zZWxlY3QgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIiBjb250ZW50PW9zVHlwZXMgb3B0aW9uTGFiZWxQYXRoPSduYW1lJyBvcHRpb25WYWx1ZVBhdGg9J3ZhbHVlJyB2YWx1ZT1jb25maWcub3NUeXBlfX0KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CgogICAgICA8ZGl2IGNsYXNzPSJyb3ciPgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkNQVXM8L2xhYmVsPgogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAgICB7e25ldy1zZWxlY3QgY2xhc3NOYW1lcz0iZm9ybS1jb250cm9sIiBjb250ZW50PXNlcnZlclBsYW5zIG9wdGlvbkxhYmVsUGF0aD0nY29yZScgb3B0aW9uVmFsdWVQYXRoPSdjb3JlJyB2YWx1ZT1jb25maWcuY29yZX19CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwLWFkZG9uIGJnLWRlZmF1bHQiPmNvcmVzPC9kaXY+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KCiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+TWVtb3J5PC9sYWJlbD4KICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwIj4KICAgICAgICAgICAge3tuZXctc2VsZWN0IGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIgY29udGVudD1tZW1vcnlTaXplcyBvcHRpb25MYWJlbFBhdGg9J3ZhbHVlJyBvcHRpb25WYWx1ZVBhdGg9J3ZhbHVlJyB2YWx1ZT1jb25maWcubWVtb3J5fX0KICAgICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+R0I8L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KCiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+RGlzayBQbGFuPC9sYWJlbD4KICAgICAgICAgIHt7bmV3LXNlbGVjdCBjbGFzc05hbWVzPSJmb3JtLWNvbnRyb2wiIGNvbnRlbnQ9ZGlza1BsYW5zIG9wdGlvbkxhYmVsUGF0aD0nbmFtZScgb3B0aW9uVmFsdWVQYXRoPSd2YWx1ZScgdmFsdWU9Y29uZmlnLmRpc2tQbGFufX0KICAgICAgICA8L2Rpdj4KCiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+RGlzayBTaXplPC9sYWJlbD4KICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwIj4KICAgICAgICAgICAge3tuZXctc2VsZWN0IGNsYXNzTmFtZXM9ImZvcm0tY29udHJvbCIgY29udGVudD1kaXNrU2l6ZXMgb3B0aW9uTGFiZWxQYXRoPSd2YWx1ZScgb3B0aW9uVmFsdWVQYXRoPSd2YWx1ZScgdmFsdWU9Y29uZmlnLmRpc2tTaXplfX0KICAgICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAtYWRkb24gYmctZGVmYXVsdCI+R0I8L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KICAgIHt7L2FjY29yZGlvbi1saXN0LWl0ZW19fQoKICAgIHt7I2FjY29yZGlvbi1saXN0LWl0ZW0KICAgICAgdGl0bGU9IlNlY3VyaXR5IE9wdGlvbnMiCiAgICAgIGRldGFpbD0iQ29uZmlndXJlIHNlcnZlciBzZWN1cml0eSBvcHRpb25zIgogICAgICBleHBhbmRBbGw9ZXhwYW5kQWxsCiAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgICBleHBhbmRPbkluaXQ9ZmFsc2UKICAgIH19CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+UGFzc3dvcmQ8L2xhYmVsPgogICAgICAgICAge3tpbnB1dCB0eXBlPSJwYXNzd29yZCIgY2xhc3M9ImZvcm0tY29udHJvbCIgdmFsdWU9Y29uZmlnLnBhc3N3b3JkIHBsYWNlaG9sZGVyPSJJZiBlbXB0eSwgZ2VuZXJhdGUgcmFuZG9tIHZhbHVlIn19CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+UGFja2V0IEZpbHRlcjwvbGFiZWw+CiAgICAgICAgICB7e2lucHV0IHR5cGU9InRleHQiIGNsYXNzPSJmb3JtLWNvbnRyb2wiIHZhbHVlPWNvbmZpZy5wYWNrZXRGaWx0ZXIgcGxhY2Vob2xkZXI9IlBhY2tldCBGaWx0ZXIgSUQifX0KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+RW5hYmxlIFBhc3N3b3JkIEF1dGggdmlhIFNTSDwvbGFiZWw+CiAgICAgICAgICA8ZGl2PgogICAgICAgICAgICB7e2lucHV0IHR5cGU9ImNoZWNrYm94IiBjaGVja2VkPWNvbmZpZy5lbmFibGVQYXNzd29yZEF1dGh9fQogICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgoKICAgIHt7L2FjY29yZGlvbi1saXN0LWl0ZW19fQoKICAgIHt7IS0tIFRoaXMgZm9sbG93aW5nIGNvbnRhaW5zIHRoZSBOYW1lLCBMYWJlbHMgYW5kIEVuZ2luZSBPcHRpb25zIGZpZWxkcyAtLX19CiAgICA8ZGl2IGNsYXNzPSJvdmVyLWhyIj48c3Bhbj57e3RlbXBsYXRlT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+CgogICAge3tmb3JtLW5hbWUtZGVzY3JpcHRpb24KICAgICAgbW9kZWw9bW9kZWwKICAgICAgbmFtZVJlcXVpcmVkPXRydWUKICAgIH19CgogICAge3tmb3JtLXVzZXItbGFiZWxzCiAgICAgIGluaXRpYWxMYWJlbHM9bGFiZWxSZXNvdXJjZS5sYWJlbHMKICAgICAgc2V0TGFiZWxzPShhY3Rpb24gJ3NldExhYmVscycpCiAgICAgIGV4cGFuZEFsbD1leHBhbmRBbGwKICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICB9fQoKICAgIHt7Zm9ybS1lbmdpbmUtb3B0cwogICAgICBtYWNoaW5lPW1vZGVsCiAgICAgIHNob3dFbmdpbmVVcmw9c2hvd0VuZ2luZVVybAogICAgfX0KICB7ey9hY2NvcmRpb24tbGlzdH19CgogIHt7IS0tIFRoaXMgY29tcG9uZW50IHNob3dzIGVycm9ycyBwcm9kdWNlZCBieSB2YWxpZGF0ZSgpIGluIHRoZSBjb21wb25lbnQgLS19fQogIHt7dG9wLWVycm9ycyBlcnJvcnM9ZXJyb3JzfX0KCiAge3shLS0gVGhpcyBjb21wb25lbnQgc2hvd3MgdGhlIENyZWF0ZSBhbmQgQ2FuY2VsIGJ1dHRvbnMgLS19fQogIHt7c2F2ZS1jYW5jZWwgc2F2ZT0ic2F2ZSIgY2FuY2VsPSJjYW5jZWwifX0KPC9zZWN0aW9uPg==";


  (0, _nodeDriver.registerDisplayLocation)('sakuracloud', 'config.zone');
  (0, _nodeDriver.registerDisplaySize)('sakuracloud', function () {
    return get(this, 'config.memory') + ' GB, ' + get(this, 'config.core') + ' Core';
  });

  var computed = Ember.computed;
  var get = Ember.get;
  var set = Ember.set;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  var observer = Ember.observer;
  var scheduleOnce = Ember.run.scheduleOnce;

  var defaultRadix = 10;
  var defaultBase = 1024;

  var ZONES = [{ value: "is1a" }, { value: "is1b" }, { value: "tk1a" }];

  var OS_TYPES = [{
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

  var DISK_PLANS = [{
    value: "ssd",
    name: "SSD",
    sizes: [{ value: "20" }, { value: "40" }, { value: "100" }, { value: "250" }, { value: "500" }, { value: "1024" }, { value: "2048" }, { value: "4096" }]
  }, {
    value: "hdd",
    name: "HDD",
    sizes: [{ value: "40" }, { value: "60" }, { value: "80" }, { value: "100" }, { value: "250" }, { value: "500" }, { value: "750" }, { value: "1024" }, { value: "2048" }, { value: "4096" }]
  }];

  var SERVER_PLANS = [{
    "core": "1",
    "memory": [{ value: "1" }, { value: "2" }, { value: "3" }, { value: "4" }, { value: "5" }]
  }, {
    "core": "2",
    "memory": [{ value: "1" }, { value: "2" }, { value: "3" }, { value: "4" }, { value: "5" }, { value: "6" }]
  }, {
    "core": "3",
    "memory": [{ value: "1" }, { value: "2" }, { value: "3" }, { value: "4" }, { value: "5" }, { value: "6" }, { value: "8" }, { value: "12" }]
  }, {
    "core": "4",
    "memory": [{ value: "2" }, { value: "3" }, { value: "4" }, { value: "5" }, { value: "6" }, { value: "8" }, { value: "12" }, { value: "16" }, { value: "24" }]
  }, {
    "core": "5",
    "memory": [{ value: "3" }, { value: "4" }, { value: "5" }, { value: "6" }, { value: "8" }, { value: "12" }, { value: "16" }, { value: "24" }, { value: "32" }]
  }, {
    "core": "6",
    "memory": [{ value: "4" }, { value: "5" }, { value: "6" }, { value: "8" }, { value: "12" }, { value: "16" }, { value: "24" }, { value: "32" }, { value: "48" }]
  }, {
    "core": "8",
    "memory": [{ value: "5" }, { value: "6" }, { value: "8" }, { value: "12" }, { value: "16" }, { value: "24" }, { value: "32" }, { value: "48" }, { value: "64" }]
  }, {
    "core": "10",
    "memory": [{ value: "6" }, { value: "8" }, { value: "12" }, { value: "16" }, { value: "24" }, { value: "32" }, { value: "48" }, { value: "64" }, { value: "96" }]
  }, {
    "core": "12",
    "memory": [{ value: "8" }, { value: "12" }, { value: "16" }, { value: "24" }, { value: "32" }, { value: "48" }, { value: "64" }, { value: "96" }, { value: "128" }, { value: "160" }]
  }, {
    "core": "16",
    "memory": [{ value: "12" }, { value: "16" }, { value: "24" }, { value: "32" }, { value: "48" }, { value: "64" }, { value: "96" }, { value: "128" }, { value: "160" }, { value: "192" }]
  }, {
    "core": "20",
    "memory": [{ value: "16" }, { value: "24" }, { value: "32" }, { value: "48" }, { value: "64" }, { value: "96" }, { value: "128" }, { value: "160" }, { value: "192" }, { value: "224" }]
  }];

  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'sakuracloud',
    config: alias('model.sakuracloudConfig'),
    app: service(),

    zones: ZONES,
    osTypes: OS_TYPES,
    diskPlans: DISK_PLANS,
    diskSizes: null,
    serverPlans: SERVER_PLANS,
    memorySizes: null,

    init: function init() {
      var _this = this;

      var decodedLayout = window.atob(LAYOUT);
      var template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-sakuracloud/template'
      });
      set(this, 'layout', template);

      this._super.apply(this, arguments);

      scheduleOnce('afterRender', function () {
        _this.coreChoiced(true);
        set(_this, 'config.memory', '4');

        _this.diskPlanChoiced();
        set(_this, 'config.diskSize', '40');
      });
    },


    coreChoiced: function coreChoiced() {
      var coreChoice = get(this, 'config.core');
      var memories = get(this, 'serverPlans').findBy('core', coreChoice).memory;
      set(this, 'memorySizes', memories);
      set(this, 'config.memory', memories[0].value);
    },

    diskPlanChoiced: function diskPlanChoiced() {
      var diskPlanChoice = get(this, 'config.diskPlan');
      var disks = get(this, 'diskPlans').findBy('value', diskPlanChoice).sizes;
      set(this, 'diskSizes', disks);
      set(this, 'config.diskSize', disks[0].value);
    },

    coreObserver: observer('config.core', function () {
      this.coreChoiced();
    }),

    diskPlanObserver: observer('config.diskPlan', function () {
      this.diskPlanChoiced();
    }),

    bootstrap: function bootstrap() {
      var config = get(this, 'globalStore').createRecord({
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

      set(this, 'model.sakuracloudConfig', config);
    }

  });
});;
define('ui/components/driver-sakuracloud/component', ['exports', 'nodes/components/driver-sakuracloud/component'], function (exports, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});