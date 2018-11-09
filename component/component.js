/*!!!!!!!!!!!Do not change anything between here (the DRIVERNAME placeholder will be automatically replaced at buildtime)!!!!!!!!!!!*/
import NodeDriver , { registerDisplayLocation, registerDisplaySize } from 'shared/mixins/node-driver';

// do not remove LAYOUT, it is replaced at build time with a base64 representation of the template of the hbs template
// we do this to avoid converting template to a js file that returns a string and the cors issues that would come along with that
const LAYOUT;
/*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/

registerDisplayLocation('%%DRIVERNAME%%', 'config.zone');
registerDisplaySize('%%DRIVERNAME%%', function(){return `${ get(this, 'config.memory') } GB, ${ get(this, 'config.core')  } Core`;});

/*!!!!!!!!!!!GLOBAL CONST START!!!!!!!!!!!*/
// EMBER API Access - if you need access to any of the Ember API's add them here in the same manner rather then import them via modules, since the dependencies exist in rancher we dont want to expor the modules in the amd def
const computed     = Ember.computed;
const get          = Ember.get;
const set          = Ember.set;
const alias        = Ember.computed.alias;
const service      = Ember.inject.service;
const observer     = Ember.observer;
const scheduleOnce = Ember.run.scheduleOnce;

const defaultRadix = 10;
const defaultBase  = 1024;

const ZONES =
  [
    { value: "is1a"},
    { value: "is1b"},
    { value: "tk1a"}
  ];

const OS_TYPES =
  [
    {
      name: "ContainerLinux",
      value: "coreos"
    },
    {
      name: "RancherOS",
      value: "rancheros"
    },
    {
      name: "Ubuntu",
      value: "ubuntu"
    },
    {
      name: "CentOS",
      value: "centos"
    }
  ];

const DISK_PLANS =
  [
    {
      value : "ssd",
      name: "SSD",
      sizes: [
        {value: "20"},
        {value: "40"},
        {value: "100"},
        {value: "250"},
        {value: "500"},
        {value: "1024"},
        {value: "2048"},
        {value: "4096"}
      ]
    },
    {
      value: "hdd",
      name: "HDD",
      sizes: [
        {value: "40"},
        {value: "60"},
        {value: "80"},
        {value: "100"},
        {value: "250"},
        {value: "500"},
        {value: "750"},
        {value: "1024"},
        {value: "2048"},
        {value: "4096"}
      ]
    }
  ]

const SERVER_PLANS = [
  {
    "core": "1",
    "memory": [
      { value: "1"},
      { value: "2"},
      { value: "3"},
      { value: "4"},
      { value: "5"}
    ]
  },
  {
    "core": "2",
    "memory": [
      { value: "1"},
      { value: "2"},
      { value: "3"},
      { value: "4"},
      { value: "5"},
      { value: "6"}
    ]
  },
  {
    "core": "3",
    "memory": [
      { value: "1"},
      { value: "2"},
      { value: "3"},
      { value: "4"},
      { value: "5"},
      { value: "6"},
      { value: "8"},
      { value: "12"}
    ]
  },
  {
    "core": "4",
    "memory": [
      { value: "2"},
      { value: "3"},
      { value: "4"},
      { value: "5"},
      { value: "6"},
      { value: "8"},
      { value: "12"},
      { value: "16"},
      { value: "24"}
    ]
  },
  {
    "core": "5",
    "memory": [
      { value: "3"},
      { value: "4"},
      { value: "5"},
      { value: "6"},
      { value: "8"},
      { value: "12"},
      { value: "16"},
      { value: "24"},
      { value: "32"}
    ]
  },
  {
    "core": "6",
    "memory": [
      { value: "4"},
      { value: "5"},
      { value: "6"},
      { value: "8"},
      { value: "12"},
      { value: "16"},
      { value: "24"},
      { value: "32"},
      { value: "48"}
    ]
  },
  {
    "core": "8",
    "memory": [
      { value: "5"},
      { value: "6"},
      { value: "8"},
      { value: "12"},
      { value: "16"},
      { value: "24"},
      { value: "32"},
      { value: "48"},
      { value: "64"}
    ]
  },
  {
    "core": "10",
    "memory": [
      { value: "6"},
      { value: "8"},
      { value: "12"},
      { value: "16"},
      { value: "24"},
      { value: "32"},
      { value: "48"},
      { value: "64"},
      { value: "96"}
    ]
  },
  {
    "core": "12",
    "memory": [
      { value: "8"},
      { value: "12"},
      { value: "16"},
      { value: "24"},
      { value: "32"},
      { value: "48"},
      { value: "64"},
      { value: "96"},
      { value: "128"},
      { value: "160"}
    ]
  },
  {
    "core": "16",
    "memory": [
      { value: "12"},
      { value: "16"},
      { value: "24"},
      { value: "32"},
      { value: "48"},
      { value: "64"},
      { value: "96"},
      { value: "128"},
      { value: "160"},
      { value: "192"}
    ]
  },
  {
    "core": "20",
    "memory": [
      { value: "16"},
      { value: "24"},
      { value: "32"},
      { value: "48"},
      { value: "64"},
      { value: "96"},
      { value: "128"},
      { value: "160"},
      { value: "192"},
      { value: "224"}
    ]
  }
]


/*!!!!!!!!!!!GLOBAL CONST END!!!!!!!!!!!*/



/*!!!!!!!!!!!DO NOT CHANGE START!!!!!!!!!!!*/
export default Ember.Component.extend(NodeDriver, {
  driverName: '%%DRIVERNAME%%',
  config:     alias('model.%%DRIVERNAME%%Config'),
  app:        service(),

  zones:      ZONES,
  osTypes:    OS_TYPES,
  diskPlans:  DISK_PLANS,
  diskSizes: null,
  serverPlans: SERVER_PLANS,
  memorySizes: null,

  init() {
    // This does on the fly template compiling, if you mess with this :cry:
    const decodedLayout = window.atob(LAYOUT);
    const template      = Ember.HTMLBars.compile(decodedLayout, {
      moduleName: 'nodes/components/driver-%%DRIVERNAME%%/template'
    });
    set(this,'layout', template);

    this._super(...arguments);

    scheduleOnce('afterRender', () => {
      this.coreChoiced(true);
      set(this, 'config.memory', '4');

      this.diskPlanChoiced();
    set(this, 'config.diskSize', '40');
    });

  },
  /*!!!!!!!!!!!DO NOT CHANGE END!!!!!!!!!!!*/

  coreChoiced: function() {
      let coreChoice = get(this, 'config.core');
      let memories = get(this, 'serverPlans').findBy('core', coreChoice).memory;
      set(this, 'memorySizes', memories);
      set(this, 'config.memory', memories[0].value)
  },

  diskPlanChoiced: function() {
      let diskPlanChoice = get(this, 'config.diskPlan');
      let disks = get(this, 'diskPlans').findBy('value', diskPlanChoice).sizes;
      set(this, 'diskSizes', disks);
      set(this, 'config.diskSize', disks[0].value)
  },

  coreObserver: observer('config.core', function() {
    this.coreChoiced();
  }),

  diskPlanObserver: observer('config.diskPlan', function(){
    this.diskPlanChoiced();
  }),

  // Write your component here, starting with setting 'model' to a machine with your config populated
  bootstrap: function() {
    // bootstrap is called by rancher ui on 'init', you're better off doing your setup here rather then the init function to ensure everything is setup correctly
    let config = get(this, 'globalStore').createRecord({
      type: '%%DRIVERNAME%%Config',
      zone                : 'is1a',
      accessToken         : '',
      accessTokenSecret   : '',
      core                : '2',
      memory              : '4',
      osType              : 'coreos',
      diskSize            : '40',
      diskPlan            : 'ssd',
    });

    set(this, 'model.%%DRIVERNAME%%Config', config);
  },

});
