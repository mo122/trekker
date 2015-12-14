Trekker.controller('TopHelpCtrl', TopHelpCtrl);

TopHelpCtrl.$inject = [];

function TopHelpCtrl() {
  var vm = this;

  vm.treks = [
    {
      name: 'bug',
      steps: ['found', 'fixed'],
      description: ''
    }, {
      name: 'question',
      steps: ['asked', 'answered'],
      description: ''
    }, {
      name: 'feature',
      steps: ['described', 'delivered'],
      description: ''
    }, {
      name: 'task',
      steps: ['needed', 'done'],
      description: ''
    }, {
      name: 'idea',
      steps: ['invented', 'vetted'],
      description: ''
    }
  ];

  vm.flags = [
    {
      name: 'debt',
      description: ''
    }, {
      name: 'fire',
      description: ''
    }
  ]
}
