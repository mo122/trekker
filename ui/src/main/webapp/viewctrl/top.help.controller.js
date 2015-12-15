Trekker.controller('TopHelpCtrl', TopHelpCtrl);

TopHelpCtrl.$inject = [];

function TopHelpCtrl() {
  var vm = this;

  vm.treks = [
    {
      name: 'feature',
      steps: ['described', 'designed', 'implemented', 'verified', 'delivered'],
      description: 'Features capture the creation and expansion of total functionality. ' +
      'Features found the business value of a project.'
    }, {
      name: 'bug',
      steps: ['found', 'reproduced', 'addressed', 'verified', 'fixed'],
      description: 'Bugs are unexpected outcomes, usually a fault in assumptions or ' +
      'the translation of intent into logic.'
    }, {
      name: 'task',
      steps: ['needed', 'done'],
      description: 'A general catch-all for tasks which need to be done but do not fall ' +
      'squarely into any of the other treks. Ad-hoc or one-time efforts often fall into ' +
      'this trek of miscellany.'
    }, {
      name: 'debt',
      steps: ['accrued', 'paid'],
      description: 'Debts are the neglected siblings of Features. They address the ongoing cost ' +
      'or drag of existing functionality. Debts frequently spawn from low-gain, high up-front ' +
      'cost portions of Features or Bugs, but are also realized over time. Refactorings and ' +
      'cleanups typically fall here.'
    }, {
      name: 'question',
      steps: ['asked', 'answered'],
      description: 'Questions encompass situations where a task may or may not be created ' +
      'due to a lack of knowledge of relevant subject matter. Questions may be simple queries ' +
      'or may require discussion. Answers can lead to converting the task to another trek or ' +
      'creating new tasks.'
    }, {
      name: 'idea',
      steps: ['invented', 'vetted'],
      description: 'Ideas are a sanctuary for latent creativity as team members come up ' +
      'with ideas during other pursuits. Ideas may warrant further research, discussion, ' +
      'and implementation.'
    }
  ];

  vm.flags = [
    {
      name: 'fire',
      description: 'Extreme risk or cost until addressed. Team resources should be maxed out ' +
      '(without being wasteful) in moving this task out of a fire state. The flag should be ' +
      'removed when the risk or cost wanes from extreme levels.'
    }, {
      name: 'blocked',
      description: 'This task is not actionable by the team for some reason, usually due ' +
      'to hangups in upstream dependencies. The flag should be removed when the task ' +
      'can continue its progress.'
    }
  ]
}
